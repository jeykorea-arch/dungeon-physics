// 교사용 메뉴 (F1): 챕터 바로 가기, 저주/해방 전환, 눈금·속력 표시, 물리 값 보기, 시험 보기, 저장 지우기
class TeacherMenu {
  constructor(scene, layer) {
    this.scene = scene;
    this.layer = layer;
    this.isOpen = false;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(900).setVisible(false);
    layer.add(c);
    this.container = c;
    const backdrop = scene.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.6).setOrigin(0, 0).setInteractive();
    const panel = scene.add.rectangle(960, 540, 1240, 1000, 0x0e1626, 0.97).setStrokeStyle(3, 0x9fd8ff, 0.8);
    const title = UIKit.text(scene, 960, 75, '교사용 메뉴 (F1로 닫기)', { fontSize: '40px', fontStyle: 'bold', color: UIKit.SKY })
      .setOrigin(0.5);
    c.add([backdrop, panel, title]);

    // 챕터 바로 가기: 막별 탭 (장면이 많아 한 번에 다 들어가지 않는다). 처음엔 지금 장면이 있는 막
    c.add(UIKit.text(scene, 380, 125, '챕터 바로 가기', { fontSize: '30px', fontStyle: 'bold' }));
    const acts = [...new Set(SCENE_LIST.map((s) => s.act || 1))];
    this.actLists = {};
    this.actTabs = acts.map((act, i) => UIKit.button(scene, 640 + i * 150, 122, `${act}막`, () => this.showAct(act),
      { originX: 0, originY: 0, width: 130, fontSize: 24 }));
    c.add(this.actTabs);
    for (const act of acts) {
      this.actLists[act] = SCENE_LIST.filter((s) => (s.act || 1) === act).map((s, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        const b = UIKit.button(scene, 380 + col * 295, 172 + row * 62, s.title, () => {
          this.close();
          SceneFlow.go(this.scene, s.key);
        }, { originX: 0, originY: 0, width: 260, fontSize: 24 });
        c.add(b);
        return b;
      });
    }
    this.showAct((scene.info && scene.info.act) || 1);

    // 이 장면 설정
    c.add(UIKit.text(scene, 380, 500, '이 장면', { fontSize: '30px', fontStyle: 'bold' }));
    this.toggles = [
      ['curse', () => this.scene.teacherToggleCurse()],
      ['ruler', () => this.scene.teacherSetRuler(!Save.setting('showRuler'))],
      ['speed', () => this.scene.teacherSetSpeed(!Save.setting('showSpeed'))],
      ['exam', () => { this.close(); this.scene.openExam(); }],
      ['physics', () => this.showPhysics()],
      ['reset', () => { Save.reset(); this.refresh(); this.flash('저장을 지웠어요'); }],
      // 장면마다 다른 켜기/끄기 (예: 썰매 길 표지판 숫자). 장면에 teacherExtra = { label(), toggle() }가 있으면 쓴다
      ['extra', () => { if (this.scene.teacherExtra) { this.scene.teacherExtra.toggle(); this.refresh(); } }],
      // 실험·시험해 보기 전에는 숨기는 답 숫자(2-3 상자 저장량, 2-4 금속 반응 등)를 미리 보이게 (총괄지시 2막리뷰 32번)
      ['answers', () => { Save.setSetting('showAnswers', !Save.setting('showAnswers')); this.refresh(); }],
    ].map(([id, fn], i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const btn = UIKit.button(scene, 380 + col * 393, 548 + row * 62, '', fn,
        { originX: 0, originY: 0, width: 355, fontSize: 24 });
      c.add(btn);
      return { id, btn };
    });
    this.note = UIKit.text(scene, 960, 752, '', { fontSize: '26px', color: '#ffe08a' }).setOrigin(0.5);
    this.physicsText = UIKit.text(scene, 380, 778, '', {
      fontSize: '22px', color: '#d8e6f5', lineSpacing: 4, wordWrap: { width: 1160 },
    });
    c.add([this.note, this.physicsText]);
  }

  showAct(act) {
    this.act = act;
    for (const [a, list] of Object.entries(this.actLists)) list.forEach((b) => b.setVisible(Number(a) === act));
    const acts = Object.keys(this.actLists).map(Number);
    // 고른 탭은 글자에 ● 표시 (버튼 색은 마우스를 올렸다 내리면 원래대로 돌아가서 글자로 구분한다)
    this.actTabs.forEach((b, i) => b.setText((acts[i] === act ? '● ' : '') + `${acts[i]}막`).setColor(acts[i] === act ? UIKit.SKY : '#ffffff'));
  }

  toggle() {
    if (this.isOpen) this.close(); else this.open();
  }

  // 코드 입력 화면: 마우스·터치 숫자판만 쓴다 (숫자 키는 방마다 다른 일에 쓰이므로). 맞히면 창을 새로 고칠 때까지 다시 묻지 않는다
  openGate() {
    const s = this.scene, code = String(GAME_CONFIG.teacherCode);
    this.isOpen = true;
    const c = s.add.container(0, 0).setScrollFactor(0).setDepth(950);
    this.layer.add(c);
    this.gate = c;
    c.add(s.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.75).setOrigin(0, 0).setInteractive());
    c.add(s.add.rectangle(960, 540, 560, 760, 0x0e1626, 0.98).setStrokeStyle(3, 0x9fd8ff, 0.8));
    c.add(UIKit.text(s, 960, 215, '교사용 코드', { fontSize: '40px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    let typed = '';
    const shown = UIKit.text(s, 960, 290, '', { fontSize: '40px' }).setOrigin(0.5);
    c.add(shown);
    const press = (d) => {
      typed += d;
      shown.setText('●'.repeat(typed.length)).setColor('#ffffff');
      if (typed.length < code.length) return;
      if (typed === code) { TeacherMenu.unlocked = true; this.closeGate(); this.open(); return; }
      typed = '';
      shown.setText('다시 입력하세요').setColor('#ffb0b0');
    };
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', ''].forEach((d, i) => {
      if (d) c.add(UIKit.button(s, 800 + (i % 3) * 160, 390 + Math.floor(i / 3) * 110, d, () => press(d), { fontSize: 40, width: 100, padX: 10 }));
    });
    c.add(UIKit.button(s, 960, 850, '닫기 (Esc)', () => this.close(), { fontSize: 28, width: 300 }));
  }

  closeGate() {
    if (this.gate) { this.gate.destroy(); this.gate = null; }
    this.isOpen = false;
  }

  open() {
    if (!TeacherMenu.unlocked && GAME_CONFIG.teacherCode) { this.openGate(); return; }
    this.isOpen = true;
    this.physicsText.setText('');
    this.note.setText('');
    this.refresh();
    this.container.setVisible(true);
  }

  close() {
    this.closeGate();
    this.isOpen = false;
    this.container.setVisible(false);
  }

  flash(msg) {
    this.note.setText(msg);
  }

  refresh() {
    const s = this.scene;
    const labels = {
      curse: s.curse ? (s.curse.cursed ? '해방하기 (지금: 저주)' : '저주 걸기 (지금: 해방)') : '저주/해방 (이 장면 없음)',
      ruler: '눈금 ' + (Save.setting('showRuler') ? '끄기' : '켜기'),
      speed: '속력 표시 ' + (Save.setting('showSpeed') ? '끄기' : '켜기'),
      exam: '마법서 시험 보기',
      physics: '물리 값 보기',
      reset: '저장 지우기',
      extra: s.teacherExtra ? s.teacherExtra.label() : '(이 장면 전용 없음)',
      answers: '실험 전 답 숫자 ' + (Save.setting('showAnswers') ? '숨기기' : '보이기'),
    };
    const enabled = {
      curse: !!s.curse, ruler: !!s.ruler, speed: !!s.speedPanel,
      exam: !!(s.info && s.info.chapter && EXAMS[s.info.chapter]), physics: true, reset: true,
      extra: !!s.teacherExtra, answers: true,
    };
    for (const t of this.toggles) t.btn.setText(labels[t.id]).setDisabled(!enabled[t.id]);
  }

  showPhysics() {
    // 3막: 챕터별 숫자 (js/data/act3_numbers.js) + 장면의 지금 값
    const numbers = window.ACT3_NUMBERS && ACT3_NUMBERS[this.scene.scene.key];
    if (numbers) {
      const now = this.scene.teacherNumbers ? this.scene.teacherNumbers() : [];
      this.physicsText.setText(['이 챕터 숫자 (config.js 의 act3):', ...numbers(), ...now, '', this.predictionLine()].join('\n'));
      return;
    }
    const cfg = GAME_CONFIG;
    const name = this.scene.info && this.scene.info.config;
    const sceneCfg = name ? (cfg[name] || cfg.act2[name] || cfg.act3[name] || null) : null;   // 2·3막 값은 act2·act3 안에 있다
    // { a: 1, b: { c: 2 } } → ['a = 1', 'b.c = 2']
    const flat = (o, prefix = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object'
      ? flat(v, prefix + k + '.') : [`${prefix}${k} = ${v}`]));
    let text = '공통 (config.js 의 physics):\n' + flat(cfg.physics).join('    ');
    if (sceneCfg) text += `\n\n이 장면 (config.js 의 ${this.scene.info.config}):\n` + flat(sceneCfg).join('    ');
    // 실험 전 예측 기록 (총괄지시 2막리뷰 41번)
    if (window.PREDICTIONS) text += '\n\n' + this.predictionLine();
    this.physicsText.setText(text);
  }

  predictionLine() {
    const rows = Object.keys(PREDICTIONS).sort().map((k) => {
      const pr = Save.chapter(k).prediction, n = k.replace('Ch', '').replace('_', '-');
      return `${n} ${pr ? (pr.correct ? '맞음' : '틀림') : '-'}`;
    });
    return '실험 전 예측: ' + rows.join('   ');
  }
}
window.TeacherMenu = TeacherMenu;
