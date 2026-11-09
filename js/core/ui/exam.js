// 마법서 시험: 문제 + 두 답. 고르면 정답/오답 소리. 틀리면 다시 고를 수 있다.
// 문제 내용은 js/data/exams.js
class ExamScreen {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const img = MANIFEST.ui.images.exam_blank;
    const R = MANIFEST.ui.regions.exam;
    const ox = (1920 - img.width) / 2, oy = (1080 - img.height) / 2;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(620).setVisible(false);
    layer.add(c);
    this.container = c;
    const backdrop = scene.add.rectangle(0, 0, 1920, 1080, 0x05070d, 0.75).setOrigin(0, 0).setInteractive();
    const bg = scene.add.image(ox, oy, img.key).setOrigin(0, 0);
    // 양피지 안쪽 칸 (그림에서 잰 값: 가로 150~1385, 세로 210~660, 위 가운데 모래시계 장식은 690~850까지 내려옴)
    // 글자는 이 칸 안 여백에만 놓는다 (총괄지시 수정목록 9번)
    const IN = { x0: 190, x1: 1345, y0: 236, y1: 640 };
    this.inner = IN;
    this.header = UIKit.text(scene, ox + IN.x0, oy + IN.y0, '', { fontSize: '30px', fontStyle: 'bold', color: UIKit.INK })
      .setOrigin(0, 0);
    this.counter = UIKit.text(scene, ox + IN.x1, oy + IN.y0, '', { fontSize: '28px', color: '#7a5528' }).setOrigin(1, 0);
    this.question = UIKit.text(scene, ox + IN.x0, oy + IN.y0 + 64, '', {
      fontSize: '34px', color: UIKit.INK, lineSpacing: 10, wordWrap: { width: IN.x1 - IN.x0, useAdvancedWrap: true },
    });
    // 정답 해설(녹색): 문제 아래, 양피지 안. 길면 줄바꿈하고 그래도 넘치면 글자를 줄인다 (fitFeedback)
    this.feedback = UIKit.text(scene, ox + (IN.x0 + IN.x1) / 2, oy + IN.y1, '', {
      fontSize: '30px', fontStyle: 'bold', align: 'center', lineSpacing: 6, wordWrap: { width: IN.x1 - IN.x0 - 40, useAdvancedWrap: true },
    }).setOrigin(0.5, 1);
    this.oy = oy;
    this.answers = [R.answer_left, R.answer_right].map(([ax, ay, aw, ah], i) => {
      const hit = scene.add.rectangle(ox + ax, oy + ay, aw, ah, 0xffffff, 0).setOrigin(0, 0)
        .setInteractive({ useHandCursor: true });
      const label = UIKit.text(scene, ox + ax + aw / 2, oy + ay + ah / 2, '', {
        fontSize: '34px', color: UIKit.INK, align: 'center', wordWrap: { width: aw - 20, useAdvancedWrap: true },
      }).setOrigin(0.5);
      hit.on('pointerover', () => { if (!this.locked) hit.setFillStyle(0xfff3c0, 0.35); });
      hit.on('pointerout', () => hit.setFillStyle(0xffffff, 0));
      hit.on('pointerdown', () => this.choose(i));
      // 키보드 번호는 보기 글과 떼어 보기 그림 틀의 왼쪽 위 구석에 작게 (그림에서 잰 틀 위치) ("1 1m"처럼 숫자 답과 섞여 보이지 않게)
      const key = UIKit.text(scene, ox + [180, 836][i], oy + ay + 12, `${i + 1}번`, { fontSize: '24px', fontStyle: 'bold', color: '#7a5528' });
      return { hit, label, key, w: aw - 20, h: ah - 12 };
    });
    const close = UIKit.button(scene, 1890, 30, '닫기', () => this.close(false), { originX: 1, originY: 0 });
    // 정답 해설을 다 읽고 넘어가도록 시간이 아니라 버튼으로 (팀장검토 L2)
    this.nextBtn = UIKit.button(scene, 960, 1032, '다음 ▶  (Space)', () => this.next(), { fontSize: 32, width: 360, bg: '#1f6b2a', hover: '#2c8f3a' }).setVisible(false);
    c.add([backdrop, bg, this.header, this.counter, this.question, this.feedback,
      ...this.answers.flatMap((a) => [a.hit, a.label, a.key]), close, this.nextBtn]);
    // 같은 키 입력으로 뒤 장면 동작(돌 던지기 등)까지 실행되지 않게 다음 프레임에 넘어간다
    const nextKey = () => { if (this.isOpen && this.waitingNext) scene.time.delayedCall(1, () => this.next()); };
    scene.input.keyboard.on('keydown-SPACE', nextKey);
    scene.input.keyboard.on('keydown-ENTER', nextKey);
    // 보기도 키보드 1·2로 고른다 (게임 내내 키보드를 쓰다 시험만 마우스였다 — 평가단 제안). 다른 장면의 1·2 키는 시험 중 멈춘다(isBlocked)
    const pickKey = (i) => () => { if (this.isOpen && !this.locked && !this.waitingNext) this.choose(i); };
    scene.input.keyboard.on('keydown-ONE', pickKey(0));
    scene.input.keyboard.on('keydown-TWO', pickKey(1));
  }

  // questions: [{ question, choices: [왼쪽, 오른쪽], answer: 0|1, explain }]
  open(questions, onDone) {
    if (!questions || questions.length === 0) return;
    this.questions = questions;
    this.index = 0;
    this.onDone = onDone;
    this.isOpen = true;
    this.prevBgm = Sound.currentBgm();
    Sound.playBgm('bgm_exam');
    this.header.setText(MANIFEST.ui.examTitle + ` · 제${(this.scene.info && this.scene.info.act) || 1}막`);   // 지금 장면의 막
    this.container.setVisible(true);
    this.show();
  }

  show() {
    const q = this.questions[this.index];
    this.locked = false;
    this.waitingNext = false;
    this.nextBtn.setVisible(false);
    this.counter.setText(`${this.index + 1} / ${this.questions.length}`);
    this.question.setText(q.question);
    this.answers.forEach((a, i) => { a.label.setText(q.choices[i]).setColor(UIKit.INK); a.hit.setFillStyle(0xffffff, 0); this.fitAnswer(a); });
    this.feedback.setText('').setFontSize(30);
  }

  choose(i) {
    if (this.locked) return;
    const q = this.questions[this.index];
    const a = this.answers[i];
    if (i === q.answer) {
      this.locked = true;
      Sound.play('sfx_exam_correct');
      a.hit.setFillStyle(0x7fd27f, 0.45);
      this.feedback.setText('정답! ' + (q.explain || '')).setColor('#1f6b2a');
      this.fitFeedback();
      this.waitingNext = true;
      this.nextBtn.setVisible(true);
    } else {
      Sound.play('sfx_exam_wrong');
      a.hit.setFillStyle(0xe07a7a, 0.4);
      this.feedback.setText('다시 생각해 보자').setColor('#8a2a2a');
      this.fitFeedback();
      this.scene.tweens.add({ targets: a.label, x: a.label.x + 8, yoyo: true, repeat: 3, duration: 50 });
    }
  }

  next() {
    if (!this.isOpen || !this.waitingNext) return;
    this.waitingNext = false;
    this.index += 1;
    if (this.index >= this.questions.length) this.close(true); else this.show();
  }

  // 보기 글이 칸보다 크면 글자를 줄여 칸 안에 맞춘다 (34 → 20px, 총괄지시 48번)
  fitAnswer(a) {
    for (let size = 34; size >= 20; size -= 2) {
      a.label.setFontSize(size);
      if (a.label.height <= a.h && a.label.width <= a.w + 4) break;
    }
  }

  // 해설이 문제 글자와 겹치지 않고 양피지 아래 선 안에 들어가게: 넘치면 글자 크기를 줄인다
  fitFeedback() {
    const top = this.question.y + this.question.height + 16;
    for (let size = 30; size >= 20; size -= 2) {
      this.feedback.setFontSize(size);
      if (this.feedback.y - this.feedback.height >= top) break;
    }
  }

  close(passed) {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.waitingNext = false;
    this.container.setVisible(false);
    if (this.scene.updateMusic) this.scene.updateMusic();   // 챕터 장면: 원래 규칙대로 다시 고른다
    else if (this.prevBgm) Sound.playBgm(this.prevBgm);
    else Sound.stopBgm();
    const cb = this.onDone;
    this.onDone = null;
    if (cb) cb(passed);
  }
}
window.ExamScreen = ExamScreen;
