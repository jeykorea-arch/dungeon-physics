// 최종 보스 — 뒤틀림의 마법사 (ACT3_PLAN 6단계 6번). 저주 문장과 보기는 js/data/boss_curses.js, 값은 config.js 의 act3.finalBoss
//   1·2단계(BossQuizScene): 저주가 걸리면 화면이 보랏빛, 배너에 저주 문장. 8초 안에 진짜 법칙을 고르면 저주가 깨지고 마법사가 4초 멈춘다 → 그 틈에 빛 화살.
//   3단계(FinalBoss3Scene): 마법사가 전차로 달아난다. 땅에서 볼 때 화살은 c, 전차는 0.76c라 화살이 항상 따라잡는다. 3번 맞히면 끝.
//      이안·가론은 땅에 서서 쏘고, 전차를 따라가는 화면에서 왼쪽으로 멀어진다 (총괄지시 74번, 승인대기 [79]).
//   단계가 바뀔 때는 지금 마디가 끝나는 순간 다음 곡의 같은 자리로 넘어간다.
class FinalBossBase extends ChapterScene {
  startCursed() { return false; }   // 저주는 장면 안에서 걸었다 풀었다 한다

  // 현재 마디가 끝나는 순간 sfx_phase_shift와 함께 다음 단계로. 다음 곡은 같은 자리에서 시작한다
  nextPhase() {
    if (this.leavingPhase) return;
    this.leavingPhase = true;
    const b = Sound.bgm, s = b && MANIFEST.sounds[b.id], next = SceneFlow.nextOf(this.scene.key);
    const nb = (SceneFlow.info(next) || {}).bgm;
    let wait = 0.3;
    if (s && s.barSamples) {
      const bar = s.barSamples / GAME_CONFIG.act3.finalBoss.sampleRate, t = b.el.currentTime || 0;
      wait = bar - (t % bar);
      if (nb) Sound.positions['explore:' + nb.freed] = t + wait;
    }
    this.time.delayedCall(wait * 1000, () => {
      Sound.play('sfx_phase_shift');
      this.goNext();
    });
  }

  makeBase() {
    this.keysIn = this.input.keyboard.addKeys({ left: 'LEFT', right: 'RIGHT', fire: 'X' });
    this.input.keyboard.addCapture(['X']);
    this.helpText = UIKit.text(this, 1900, 1070, '', { fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 } })
      .setOrigin(1, 1).setScrollFactor(0).setDepth(300);
    this.uiLayer.add(this.helpText);
    this.message = UIKit.text(this, 960, 330, '', {
      fontSize: '30px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1130, 400);
  }

  curseRuleText() { return this.curse.cursed ? '마법사가 법칙을 뒤틀었다 — 진짜 법칙을 고르자' : '진짜 법칙이 돌아왔다'; }

  teacherNumbers() {
    const R = Relativity;
    return [`지금: 빛 화살 ${R.arrowSpeed()} px/s, 전차 ${Math.round(R.chariotSpeed())} px/s, γ = ${R.gamma().toFixed(2)}`];
  }
}

// ------------------------------------------------------------------ 1·2단계
class BossQuizScene extends FinalBossBase {
  constructor(key, phase) {
    super(key);
    this.phase = phase;
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act3.finalBoss, g = this.groundY, PX = this.PX;
    this.cfg = cfg;
    this.curses = BOSS_CURSES[this.phase];
    this.ian = Characters.create(this, 'ian', cfg.ianX, g).setDepth(5);
    this.garon = Characters.create(this, 'garon', cfg.ianX - 90, g).setDepth(4);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    this.wizard = Characters.create(this, 'wizard', cfg.ianX + cfg.wizardDist * PX, g, 'idle').setDepth(5).setFlipX(false);
    this.curse.uncursedLayer.add(this.wizard);
    this.arrows = [];
    this.index = 0;
    this.state = 'intro';
    this.fireT = 0;
    this.actT = 0;
    this.ianHp = 1;
    this.quiz = new BossQuizView(this, this.uiLayer);
    this.input.keyboard.on('keydown-ONE', () => this.choose(0));
    this.input.keyboard.on('keydown-TWO', () => this.choose(1));
  }

  onReady() {
    this.makeBase();
    this.helpText.setText('← → 걷기   1·2 진짜 법칙 고르기   X 빛 화살 (마법사가 멈췄을 때)   M 마법서');
    this.say(this.phase === 1 ? 'phase1_start' : 'phase2_start', () => this.nextCurse());
  }

  nextCurse() {
    this.state = 'curse';
    this.timer = this.cfg.answerSeconds;
    const c = this.curses[this.index];
    this.curse.set(true);
    this.onCurseChanged();
    Characters.play(this.wizard, 'cast', false);
    Sound.play('sfx_wizard_cast');
    this.quiz.show(c, `${this.index + 1} / ${this.curses.length}`);
    this.message.setText('');
  }

  choose(i) {
    if (this.state !== 'curse' || this.isBlocked()) return;
    const right = this.quiz.pick(i);
    if (right) this.breakBossCurse();
    else this.wrong('틀렸다! 저주가 이안을 친다');
  }

  wrong(msg) {
    const c = this.cfg;
    this.ianHp = Math.max(0, this.ianHp - c.wrongDamage);
    if (this.hud) this.hud.set('health', this.ianHp);
    Sound.play('sfx_ian_hurt');
    Sound.play('sfx_exam_wrong');
    Characters.play(this.ian, 'hurt', false);
    this.actT = 0.3;
    this.message.setText(msg).setColor('#ff9a9a');
    if (this.ianHp <= 0) {
      this.ianHp = 1;
      if (this.hud) this.hud.set('health', 1);
      this.index = 0;
      this.message.setText('이안이 쓰러졌다… 이 단계를 처음부터').setColor('#ff9a9a');
      this.cameras.main.flash(400, 40, 0, 0);
    }
    this.state = 'wait';
    this.quiz.hide();
    this.time.delayedCall(c.retrySeconds * 1000, () => this.nextCurse());
  }

  breakBossCurse() {
    const c = this.cfg;
    this.quiz.hide();
    Sound.play('sfx_curse_break');
    this.curse.fadeTo(false, 0.5);
    this.onCurseChanged();
    this.state = 'stun';
    this.stunT = c.stunSeconds;
    this.hits = 0;
    Characters.play(this.wizard, 'hurt', false);
    this.message.setText(`저주가 깨졌다! 마법사가 멈췄다 — X로 빛 화살을 ${c.hitsPerCurse}번 맞히자`).setColor(UIKit.SKY);
  }

  fire() {
    const c = this.cfg;
    if (this.fireT > 0 || this.actT > 0) return;
    this.fireT = c.fireEvery;
    const dir = this.wizard.x > this.ian.x ? 1 : -1;
    this.ian.setFlipX(dir < 0);
    Characters.play(this.ian, 'attack_light', false);
    this.actT = 0.25;
    Sound.play('sfx_bolt_thin');
    const O = MANIFEST.objects.light_arrow, img = this.add.image(this.ian.x + dir * 60, this.ian.y - 120, O.states['01']).setDepth(6).setFlipX(dir < 0);
    this.worldLayer.add(img);
    this.arrows.push({ img, dir, t: 0 });
  }

  updateWorld(dt) {
    const k = this.keysIn, c = this.cfg, PX = this.PX, O = MANIFEST.objects.light_arrow;
    this.actT = Math.max(0, this.actT - dt);
    this.fireT = Math.max(0, this.fireT - dt);
    const dir = this.actT > 0 ? 0 : (k.right.isDown ? 1 : 0) - (k.left.isDown ? 1 : 0);
    if (dir) {
      this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * c.walkSpeed * PX * dt, c.arena[0], this.wizard.x - 200);
      this.ian.setFlipX(dir < 0);
    }
    if (this.actT <= 0) Characters.play(this.ian, dir ? 'walk' : 'idle');
    Characters.play(this.garon, 'idle');
    if (!this.wizard.anims.isPlaying) Characters.play(this.wizard, 'idle');
    if (k.fire.isDown) this.fire();
    for (const a of this.arrows) {
      a.t += dt;
      a.img.x += a.dir * Relativity.arrowSpeed() * dt;
      a.img.setTexture(O.states[String(1 + Math.floor(a.t * 12) % 4).padStart(2, '0')]);
      if (Math.abs(a.img.x - this.wizard.x) < 70) {
        a.hit = true;
        a.img.destroy();
        Sound.play('sfx_light_arrow_hit');
        if (this.state === 'stun') {
          this.hits += 1;
          Characters.play(this.wizard, 'hurt', false);
        } else if (this.state === 'curse' || this.state === 'wait') this.message.setText('저주 속의 마법사에게는 통하지 않는다 — 먼저 저주를 깨자').setColor('#ffd27a');
      }
    }
    this.arrows = this.arrows.filter((a) => !a.hit);
    if (this.state === 'curse') {
      this.timer -= dt;
      this.quiz.setTime(this.timer / c.answerSeconds);
      if (this.timer <= 0) this.wrong('시간이 지났다! 저주가 이안을 친다');
    } else if (this.state === 'stun') {
      this.stunT -= dt;
      if (this.hits >= c.hitsPerCurse) {
        this.index += 1;
        this.message.setText('명중!').setColor(UIKit.SKY);
        if (this.index >= this.curses.length) {
          this.state = 'done';
          this.say(this.phase === 1 ? 'phase1_end' : 'phase2_end', () => this.nextPhase());
        } else {
          this.state = 'wait';
          this.time.delayedCall(c.retrySeconds * 1000, () => this.nextCurse());
        }
      } else if (this.stunT <= 0) {
        this.state = 'wait';
        this.message.setText('마법사가 다시 일어났다! 같은 저주를 또 건다').setColor('#ffd27a');
        this.time.delayedCall(c.retrySeconds * 1000, () => this.nextCurse());
      }
    }
    this.speedPanel.setLines([
      `저주 ${Math.min(this.index + 1, this.curses.length)} / ${this.curses.length}`,
      this.state === 'stun' ? `마법사 멈춤 ${Math.ceil(this.stunT)}초 — 빛 화살 ${this.hits} / ${c.hitsPerCurse}` : '두 답 중 진짜 법칙을 고르자',
    ]);
  }
}

class FinalBoss1Scene extends BossQuizScene { constructor() { super('FinalBoss1', 1); } }
class FinalBoss2Scene extends BossQuizScene { constructor() { super('FinalBoss2', 2); } }

// 저주 배너와 두 답
class BossQuizView {
  constructor(scene, layer) {
    this.scene = scene;
    const U = MANIFEST.ui.act3.boss_phase_banner, cfg = GAME_CONFIG.act3.finalBoss.view;
    this.cfg = cfg;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(325).setVisible(false);
    layer.add(c);
    this.container = c;
    // 그림의 판은 가운데 600 px뿐이라(JSON text_rect 750 px보다 작다) 키워서 쓰고, 글자는 판 안쪽 폭에 맞춘다
    c.add(scene.add.image(cfg.bannerX, cfg.bannerY, U.key).setScale(cfg.bannerScale));
    this.text = UIKit.text(scene, cfg.bannerX, cfg.bannerY + 4, '', { fontSize: '28px', fontStyle: 'bold', color: '#f0d8ff', align: 'center', wordWrap: { width: cfg.bannerTextW } }).setOrigin(0.5);
    c.add(this.text);
    this.count = UIKit.text(scene, 1400, cfg.barY, '', { fontSize: '22px', color: '#cfe3f5', backgroundColor: '#0b1320cc', padding: { x: 8, y: 2 } }).setOrigin(0, 0.5);
    c.add(this.count);
    // 시간 막대
    c.add(scene.add.rectangle(960, cfg.barY, 800, 14, 0x0b1320, 0.9).setStrokeStyle(2, 0xd7b6ff));
    this.bar = scene.add.rectangle(560, cfg.barY, 800, 14, 0xd7b6ff, 1).setOrigin(0, 0.5);
    c.add(this.bar);
    this.btns = [0, 1].map((i) => {
      const x = 960 + (i ? 1 : -1) * cfg.choiceDx;
      const bg = scene.add.rectangle(x, cfg.choiceY, cfg.choiceW, 110, 0x1b2a40, 0.96).setStrokeStyle(3, 0x9fd8ff).setInteractive({ useHandCursor: true });
      const t = UIKit.text(scene, x, cfg.choiceY, '', { fontSize: '26px', align: 'center', wordWrap: { width: cfg.choiceW - 30 } }).setOrigin(0.5);
      bg.on('pointerdown', () => scene.choose(i));
      c.add([bg, t]);
      return t;
    });
  }

  show(q, countText) {
    this.rightIndex = Math.random() < 0.5 ? 0 : 1;
    this.text.setText(q.curse);
    this.count.setText('저주 ' + countText);
    this.btns[this.rightIndex].setText(`${this.rightIndex + 1}  ${q.right}`);
    this.btns[1 - this.rightIndex].setText(`${2 - this.rightIndex}  ${q.wrong}`);
    this.setTime(1);
    this.container.setVisible(true);
  }

  hide() { this.container.setVisible(false); }

  setTime(k) { this.bar.width = 800 * Math.max(0, k); }

  pick(i) { return i === this.rightIndex; }
}
window.BossQuizView = BossQuizView;

// ------------------------------------------------------------------ 3단계: 전차 추격
// 전차와 함께 가는 화면: 땅(배경·이안·가론)은 전차 속력(0.76c)으로 뒤로 흐르고, 화살은 땅에서 본 거리가 c − 0.76c로 줄어든다.
// 화면 밖으로 멀어진 뒤에는 위쪽 "땅에서 본 모습"으로 이안·화살·전차의 자리를 보여 준다 (게임 속도라 거리는 줄여서 그린다).
class FinalBoss3Scene extends FinalBossBase {
  constructor() {
    super('FinalBoss3');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act3.finalBoss.chase, g = this.groundY, C = MANIFEST.characters.chariot, O = MANIFEST.objects, bgKey = MANIFEST.backgrounds.abyss_chase.key;
    this.cfg = cfg;
    this.bgs = [0, 1].map((i) => {
      const b = this.add.image(i * this.worldW, 0, bgKey).setOrigin(0, 0).setDepth(-9).setScrollFactor(0);
      this.worldLayer.add(b);
      return b;
    });
    this.scrollX = 0;
    this.ian = Characters.create(this, 'ian', cfg.ianX, g, 'idle').setDepth(5);
    this.garon = Characters.create(this, 'garon', cfg.ianX - 110, g, 'idle').setDepth(4);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.vehicle = this.add.image(cfg.chariotX, g, C.vehicles.vehicle_contracted).setOrigin(C.pivot.x / C.frameWidth, C.pivot.y / C.frameHeight).setFlipX(true).setDepth(3);
    this.rider = Characters.create(this, 'chariot', cfg.chariotX, g, 'ride').setFlipX(true).setDepth(4);
    this.lines = this.add.image(cfg.chariotX - 300, g - 100, O.speed_lines.states['01']).setDepth(2).setFlipX(true);
    this.worldLayer.add([this.vehicle, this.rider, this.lines]);
    this.hitImg = this.add.image(0, 0, O.light_arrow_hit.states['01']).setDepth(7).setVisible(false);
    this.worldLayer.add(this.hitImg);
    this.arrows = [];
    this.hits = 0;
    this.fireT = 0;
    this.t = 0;
    this.ended = false;
    this.fighting = false;
  }

  onReady() {
    this.makeBase();
    this.message.setY(70);
    this.speedPanel.moveTo(1130, 170);
    this.helpText.setText('X 빛 화살 쏘기   M 마법서');
    this.groundView = new GroundView(this, this.uiLayer);
    Sound.startLoop('sfx_chariot_run');
    this.say('phase3_start', () => { this.fighting = true; this.message.setText('X: 빛 화살을 쏘자! 달아나도 빛은 언제나 c로 따라잡는다').setColor('#ffe08a'); });
  }

  updateWorld(dt) {
    const c = this.cfg, O = MANIFEST.objects, R = Relativity;
    this.t += dt;
    // 땅이 전차 속력으로 뒤로 흐른다 (좌우가 이어지는 3840 px 두 장). 이안·가론은 땅에 서 있어 함께 왼쪽으로 멀어진다
    const flow = this.fighting && !this.ended ? R.chariotSpeed() * dt : 0;
    this.scrollX = (this.scrollX + flow) % this.worldW;
    this.bgs[0].x = -this.scrollX;
    this.bgs[1].x = this.worldW - this.scrollX;
    this.lines.setTexture(O.speed_lines.states[String(1 + Math.floor(this.t * 12) % 3).padStart(2, '0')]);
    Characters.play(this.ian, 'idle');
    Characters.play(this.garon, 'idle');
    this.ian.x -= flow;
    this.garon.x -= flow;
    this.fireT = Math.max(0, this.fireT - dt);
    if (this.fighting && !this.ended && this.keysIn.fire.isDown && this.fireT <= 0) {
      this.fireT = c.fireEvery;
      Sound.play('sfx_bolt_thin');
      const ax = Math.max(this.ian.x + 60, c.arrowStartX);   // 이안이 화면 밖으로 멀어졌으면 왼쪽 끝에서 들어온다
      const img = this.add.image(ax, this.groundY - c.arrowHeight, O.light_arrow.states['01']).setDepth(6);
      const tail = this.add.image(ax, this.groundY - c.arrowHeight, O.light_arrow_tail.states.default).setDepth(5).setBlendMode('ADD');
      this.worldLayer.add([tail, img]);
      this.arrows.push({ img, tail, t: 0 });
    }
    for (const a of this.arrows) {
      a.t += dt;
      // 땅에서 본 화살과 전차 사이 거리가 줄어드는 빠르기 = c − 0.76c (빛의 속력 자체는 누구에게나 c)
      a.img.x += (R.arrowSpeed() - R.chariotSpeed()) * dt;
      a.tail.x = a.img.x - 60;
      a.img.setTexture(O.light_arrow.states[String(1 + Math.floor(a.t * 12) % 4).padStart(2, '0')]);
      if (a.img.x >= c.chariotX - c.hitDist) {
        a.hit = true;
        a.img.destroy();
        a.tail.destroy();
        this.hits += 1;
        Sound.play('sfx_light_arrow_hit');
        this.hitT = 0;
        this.hitImg.setVisible(true).setPosition(c.chariotX - 40, this.groundY - 130);
        this.message.setText(`명중! ${this.hits} / ${c.hitsNeeded} — 전차가 아무리 빨라도 빛은 따라잡는다`).setColor(UIKit.SKY);
        if (this.hits >= c.hitsNeeded) this.endChase();
      }
    }
    this.arrows = this.arrows.filter((a) => !a.hit);
    if (this.hitImg.visible) {
      this.hitT += dt;
      const f = Math.floor(this.hitT * 14);
      if (f > 3) this.hitImg.setVisible(false);
      else this.hitImg.setTexture(O.light_arrow_hit.states[String(f + 1).padStart(2, '0')]);
    }
    this.groundView.draw(this.arrows.map((a) => (a.img.x - c.arrowStartX) / (c.chariotX - c.hitDist - c.arrowStartX)));
    this.speedPanel.setLines([
      '땅에서 본 빛 화살: c   전차: c보다 느리다',
      '땅에서 보면 빛 화살이 전차보다 빨라 거리가 줄어든다',
      '빛의 속력은 누구에게나 c (전차 위에서 재도 c)',
      `명중 ${this.hits} / ${c.hitsNeeded}`,
    ]);
  }

  endChase() {
    this.ended = true;
    Sound.stopLoop('sfx_chariot_run');
    const c = this.cfg;
    this.rider.setVisible(false);
    this.lines.setVisible(false);
    const w = Characters.create(this, 'wizard', c.chariotX + 40, this.groundY, 'defeat').setDepth(6).setFlipX(true);
    this.worldLayer.add(w);
    Characters.play(w, 'defeat', false);
    this.time.delayedCall(1500, () => this.say('phase3_end', () => { Sound.stopBgm(0.5); this.goNext(); }));
  }
}
// 추격 때 위쪽 작은 그림: 땅에서 본 이안(제자리)·빛 화살·전차
class GroundView {
  constructor(scene, layer) {
    const V = GAME_CONFIG.act3.finalBoss.chase.groundView, y = V.y;
    this.V = V;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(320);
    layer.add(c);
    const g = scene.add.graphics();
    g.fillStyle(0x0b1320, 0.92).fillRect(V.x0 - 40, y - 70, V.x1 - V.x0 + 80, 150).lineStyle(2, 0x9fd8ff, 0.8).strokeRect(V.x0 - 40, y - 70, V.x1 - V.x0 + 80, 150);
    g.lineStyle(4, 0x8a96a8, 1).lineBetween(V.x0, y + 30, V.x1, y + 30);
    g.fillStyle(0xf3ead6, 1).fillCircle(V.x0 + 10, y + 15, 12);
    g.fillStyle(0xd7b6ff, 1).fillRect(V.x1 - 80, y + 2, 80, 28);
    const txt = (x, yy, m, col) => UIKit.text(scene, x, yy, m, { fontSize: '22px', color: col || '#f3ead6', fontStyle: 'bold' }).setOrigin(0.5);
    c.add([g, txt((V.x0 + V.x1) / 2, y - 50, '땅에서 본 모습', UIKit.SKY), txt(V.x0 + 40, y + 55, '이안 (제자리)'), txt(V.x1 - 40, y + 55, '전차', '#d7b6ff')]);
    this.label = txt(0, y - 16, '빛 화살 c', '#ffe08a').setVisible(false);
    this.arrows = scene.add.graphics();
    c.add([this.arrows, this.label]);
  }

  // fractions: 화살마다 이안(0)에서 전차(1)까지 간 비율
  draw(fractions) {
    const V = this.V, y = V.y + 15, G = this.arrows, span = V.x1 - 80 - V.x0 - 40;
    G.clear();
    this.label.setVisible(fractions.length > 0);
    fractions.forEach((f) => {
      const x = V.x0 + 30 + Math.max(0, Math.min(1, f)) * span;
      G.fillStyle(0xffe08a, 1).fillRect(x - 30, y - 3, 30, 6).fillTriangle(x, y - 11, x, y + 11, x + 16, y);
      this.label.setX(x);
    });
  }
}
window.GroundView = GroundView;
window.FinalBoss1Scene = FinalBoss1Scene;
window.FinalBoss2Scene = FinalBoss2Scene;
window.FinalBoss3Scene = FinalBoss3Scene;
