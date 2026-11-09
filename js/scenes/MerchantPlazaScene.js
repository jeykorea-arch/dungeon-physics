// 1-6 상인 광장 (ACT1_PLAN 6단계 1~4번) — 배경 08
//
// 상인 진열대 양옆에 "영원의 바퀴"와 "증기 골렘"이 있다.
// 저주: 바퀴는 한 번 돌면 영원히 돌고, 골렘은 연료 없이 김도 안 내고 끝없이 일하는 것처럼 보인다.
// 진실의 원 실험: 바퀴를 시간 빨리 감기(×10)로 지켜보면 마찰 때문에 일정하게 느려져 결국 멈춘다.
//   바퀴 회전 에너지 ½Iω² 가 마찰로 열이 된다 (마찰 돌림힘 τ = Iα, 생긴 열 = τ × 돈 각도)
// 해방: 광장의 바퀴도 일정하게 느려져 멈추고(F를 누르는 동안 ×10), 골렘은 일할 때마다 연료를 쓰고 흰 김(버려지는 열)을 내뿜다가
//   연료가 떨어지면 압력계·눈빛이 꺼지고 멈춘다(fuel_stop).
// 퍼즐: 진열대(Z)의 기계 다섯 대가 실제로 있을 수 있는지, 없다면 왜 안 되는지 고른다. 모두 맞히면 다음(상인 보스전).
class MerchantPlazaScene extends ChapterScene {
  constructor() {
    super('Ch1_6');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.merchantPlaza;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;

    // 진열대와 상인
    this.displayX = cfg.displayX * PX;
    const D = O.merchant_display;
    this.worldLayer.add(this.add.image(this.displayX, this.groundY, D.key).setOrigin(D.pivot.x / D.width, 1).setDepth(1));
    this.merchant = Characters.create(this, 'merchant', this.displayX + 40, this.groundY - 4).setDepth(0);
    this.worldLayer.add(this.merchant);

    // 영원의 바퀴: 받침대는 고정, 바퀴 층만 축 둘레로 돈다
    const W = MANIFEST.characters.wheel;
    const wx = cfg.wheelX * PX;
    this.worldLayer.add(this.add.image(wx, this.groundY, W.layers.stand).setOrigin(W.pivot.x / W.frameWidth, W.pivot.y / W.frameHeight).setDepth(2));
    this.rotor = this.add.image(wx - W.pivot.x + W.rotorAxis.x, this.groundY - W.pivot.y + W.rotorAxis.y, W.layers.rotor)
      .setOrigin(W.rotorAxis.x / W.frameWidth, W.rotorAxis.y / W.frameHeight).setDepth(2);
    this.worldLayer.add(this.rotor);
    this.wheel = { w: cfg.wheel.omega0, angle: 0, heat: 0, tickAngle: 0 };

    // 증기 골렘
    this.golem = Characters.create(this, 'steam_golem', cfg.golemX * PX, this.groundY).setDepth(2);
    this.worldLayer.add(this.golem);
    this.gs = { fuel: cfg.golem.fuel, work: 0, steam: 0, t: 0, stopped: false, count: 0 };
    this.steam = this.add.graphics().setDepth(6);
    this.worldLayer.add(this.steam);
    this.puffs = [];

    // 진실의 원·이안·가론
    this.curse.addTruthCircle({ centerX: cfg.circleX, groundY: this.groundY, diameter: 3.0, domeHeight: 2.6 });
    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, this.groundY).setDepth(4);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, this.groundY).setDepth(3);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    this.hint = UIKit.text(this, 0, 0, '', { fontSize: '26px', color: UIKit.SKY, backgroundColor: '#0b1320cc', padding: { x: 10, y: 6 } })
      .setOrigin(0.5).setDepth(6).setVisible(false);
    this.worldLayer.add(this.hint);

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT', fast: 'F' });
    kb.addCapture(['Z']);
    kb.on('keydown-Z', () => this.act());
    this.flags = {};
    this.realizing = false;
    this.solved = false;
    this.lab = new WheelLab(this, this.uiLayer);
    this.quiz = new MachineQuiz(this, this.uiLayer);
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen) || (this.quiz && this.quiz.isOpen);
  }

  onReady() {
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '← → 걷기   Z 실험·진열대   F 누르는 동안 시간 빨리 감기(×10)   M 마법서', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(560, 140);
    this.setMessage();
    if (this.curse.cursed) this.say('intro');
  }

  setMessage() {
    this.message.setText(this.curse.cursed
      ? '"한 번 돌리면 영원히 도는 바퀴!" … 정말일까?'
      : this.solved ? '상인의 거짓말을 모두 밝혀냈다!' : '진열대 앞에서 Z: 기계 감정 · F 누르는 동안 빨리 감기')
      .setColor(this.curse.cursed ? '#ffe08a' : UIKit.SKY);
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 한 번 움직이면 에너지 없이도 영원히 움직인다?'
      : '에너지 보존: 기계는 받은 에너지만큼만 일한다 — 마찰·김으로 열이 빠져나간다';
  }

  onCurseChanged() {
    super.onCurseChanged();
    if (this.message) this.setMessage();
  }

  // ------------------------------------------------------------------ Z: 실험·진열대
  act() {
    if (this.isBlocked()) return;
    if (this.curse.cursed && this.curse.inCircle(this.ian.x)) {
      const open = () => this.lab.open(() => this.onLabDone());
      if (this.flags.labTalked) { open(); return; }
      this.flags.labTalked = true;
      this.say('lab_start', open);
      return;
    }
    if (!this.curse.cursed && !this.solved && Math.abs(this.ian.x - this.displayX) < this.cfg.displayReach * this.PX) {
      const open = () => this.quiz.open(() => this.onQuizDone());
      if (this.flags.quizTalked) { open(); return; }
      this.flags.quizTalked = true;
      this.say('quiz_start', open);
    }
  }

  onLabDone() {
    this.realizing = true;
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.setMessage();
        this.say('after_free');
      }));
    });
  }

  onQuizDone() {
    this.solved = true;
    Save.setChapter(this.scene.key, { solved: true });
    Characters.play(this.merchant, 'panic');
    Sound.play('sfx_merchant_panic');
    this.setMessage();
    this.say('quiz_done', () => {
      this.uiLayer.add(UIKit.button(this, 960, 985, '상인과 맞서기 ▶', () => this.goNext(), { fontSize: 30 })
        .setScrollFactor(0).setDepth(320));
    });
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dtReal) {
    const c = this.cfg, PX = this.PX;
    // 이안 걷기
    const dir = (this.keys.left.isDown ? -1 : 0) + (this.keys.right.isDown ? 1 : 0);
    if (!this.realizing) {
      this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * GAME_CONFIG.iceCorridor.walkSpeed * PX * dtReal, 0.6 * PX, this.worldW - 0.6 * PX);
      if (dir) this.ian.setFlipX(dir < 0);
      Characters.play(this.ian, dir ? 'walk' : 'idle');
    }
    Characters.play(this.garon, 'idle');
    // F를 누르는 동안 바퀴·골렘의 시간만 ×10
    const fast = this.keys.fast.isDown ? c.fastForward : 1;
    const dt = dtReal * fast;
    this.updateWheel(dt);
    this.updateGolem(dt, dtReal);
    // 안내 글
    let hint = '';
    if (this.curse.cursed && this.curse.inCircle(this.ian.x)) hint = 'Z: 바퀴 실험';
    else if (!this.curse.cursed && !this.solved && Math.abs(this.ian.x - this.displayX) < c.displayReach * PX) hint = 'Z: 기계 감정하기';
    this.hint.setText(hint).setVisible(!!hint && !this.isBlocked()).setPosition(this.ian.x, this.groundY - 290);
    if (!this.solved) Characters.play(this.merchant, this.curse.cursed ? 'boast' : 'idle');
    this.updatePanel(fast);
  }

  updateWheel(dt) {
    const c = this.cfg.wheel, wh = this.wheel;
    if (this.curse.cursed) {
      wh.w = c.omega0;                                     // 저주: 줄지 않는다
    } else if (wh.w > 0) {
      const dw = Math.min(wh.w, c.alpha * dt);
      const dAngle = (wh.w - dw / 2) * dt;                 // 이번에 돈 각도 (등각가속도)
      wh.heat += c.inertia * c.alpha * dAngle;             // 마찰 돌림힘 × 돈 각도 = 열
      wh.w -= dw;
      wh.angle += dAngle;
      wh.tickAngle += dAngle;
    }
    if (this.curse.cursed) { wh.angle += wh.w * dt; wh.tickAngle += wh.w * dt; }
    // 바퀴살 하나(60°)를 지날 때마다 딸깍 — 느려질수록 간격이 늘어난다
    if (wh.tickAngle >= Math.PI / 3) { wh.tickAngle -= Math.PI / 3; Sound.play('sfx_wheel_tick'); }
    this.rotor.setRotation(wh.angle);
  }

  updateGolem(dt, dtReal) {
    const c = this.cfg.golem, gs = this.gs;
    if (gs.stopped) {
      if (!gs.stopAnim) { gs.stopAnim = true; Characters.play(this.golem, 'fuel_stop', false); Sound.play('sfx_machine_powerdown'); }
    } else {
      gs.t += dt;
      if (gs.t >= c.workEvery) {
        gs.t -= c.workEvery;
        Characters.play(this.golem, 'work', false);
        if (!this.curse.cursed) {
          gs.fuel -= c.fuelPerWork;
          gs.work += c.workPerCycle;
          gs.steam += c.fuelPerWork - c.workPerCycle;
          gs.count++;
          Sound.play('sfx_steam_vent');
          this.puffs.push({ x: this.golem.x + 30, y: this.groundY - 230, t: 0 });
          if (gs.fuel < c.fuelPerWork) gs.stopped = true;
        }
      } else if (!(this.golem.anims.isPlaying && this.golem.currentAction === 'work')) {
        Characters.play(this.golem, 'idle');
      }
    }
    // 흰 김
    const g = this.steam;
    g.clear();
    this.puffs = this.puffs.filter((p) => (p.t += dtReal) < 1.6);
    for (const p of this.puffs) {
      const k = p.t / 1.6;
      for (let i = 0; i < 4; i++) {
        g.fillStyle(0xffffff, 0.55 * (1 - k));
        g.fillCircle(p.x + i * 14 - 20 + k * 30, p.y - 90 * k - i * 10, 18 + 40 * k);
      }
    }
  }

  updatePanel(fast) {
    const c = this.cfg, wh = this.wheel, gs = this.gs;
    const ke = 0.5 * c.wheel.inertia * wh.w * wh.w;
    const lines = [`${fast > 1 ? '빨리 감기 ×' + fast + '   ' : ''}바퀴 ${wh.w.toFixed(2)} rad/s`];
    if (this.curse.cursed) {
      lines.push('바퀴 회전 에너지가 줄지 않는다? 골렘도 연료 없이 일한다?');
    } else {
      lines.push(`바퀴: 회전 에너지 ${ke.toFixed(0)}J + 마찰열 ${wh.heat.toFixed(0)}J = ${(ke + wh.heat).toFixed(0)}J`);
      lines.push(`골렘: 연료 ${gs.fuel}J 남음  한 일 ${gs.work}J + 김(열) ${gs.steam}J${gs.stopped ? '  — 연료가 떨어져 멈춤' : ''}`);
    }
    this.speedPanel.setLines(lines);
  }
}
window.MerchantPlazaScene = MerchantPlazaScene;

// ------------------------------------------------------------------ 진실의 원 안의 바퀴 실험 (시간 빨리 감기)
class WheelLab {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const cfg = GAME_CONFIG.merchantPlaza.wheel;
    this.cfg = cfg;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 110, '진실의 원 — 바퀴 실험', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    c.add(UIKit.text(scene, 960, 170, 'Space: 시간 빨리 감기 켜기/끄기 (×20)    Esc: 닫기', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5));
    const W = MANIFEST.characters.wheel;
    const x = 700, y = 760;
    c.add(scene.add.image(x, y, W.layers.stand).setOrigin(W.pivot.x / W.frameWidth, W.pivot.y / W.frameHeight).setScale(1.6));
    this.rotor = scene.add.image(x + (W.rotorAxis.x - W.pivot.x) * 1.6, y + (W.rotorAxis.y - W.pivot.y) * 1.6, W.layers.rotor)
      .setOrigin(W.rotorAxis.x / W.frameWidth, W.rotorAxis.y / W.frameHeight).setScale(1.6);
    c.add(this.rotor);
    this.graph = scene.add.graphics();
    this.info = UIKit.text(scene, 1100, 300, '', { fontSize: '30px', lineSpacing: 12 });
    c.add([this.graph, this.info]);
    const kb = scene.input.keyboard;
    kb.on('keydown-SPACE', () => { if (this.isOpen) this.fast = !this.fast; });
    kb.on('keydown-ESC', () => this.close());
    scene.labUpdate((t, delta) => this.update(Math.min(delta, 50) / 1000));
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.fast = false;
    this.t = 0;
    this.w = this.cfg.omega0;
    this.angle = 0;
    this.container.setVisible(true);
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  update(dtReal) {
    if (!this.isOpen) return;
    const c = this.cfg;
    const dt = dtReal * (this.fast ? 20 : 1);
    if (this.w > 0) {
      const dw = Math.min(this.w, c.alpha * dt);
      this.angle += (this.w - dw / 2) * dt;
      this.w -= dw;
      this.t += dt;
    }
    this.rotor.setRotation(this.angle);
    const stopT = c.omega0 / c.alpha;
    const ke0 = 0.5 * c.inertia * c.omega0 * c.omega0, ke = 0.5 * c.inertia * this.w * this.w;
    this.info.setText(
      `시간 ${this.t.toFixed(0)}초 ${this.fast ? '(빨리 감기 ×20)' : ''}\n`
      + `회전 빠르기 ${this.w.toFixed(2)} rad/s\n`
      + `회전 에너지 ${ke.toFixed(0)}J / 처음 ${ke0.toFixed(0)}J\n`
      + `마찰로 생긴 열 ${(ke0 - ke).toFixed(0)}J\n`
      + (this.w <= 0 ? `${stopT.toFixed(0)}초 만에 멈췄다! 영원히 도는 바퀴는 없다` : '1초마다 같은 만큼씩 느려진다…'))
      .setColor(this.w <= 0 ? UIKit.SKY : '#ffe08a');
    // 시간–빠르기 그래프 (곧은 선으로 줄어든다)
    const g = this.graph, gx = 1100, gy = 760, gw = 640, gh = 200;
    g.clear();
    g.lineStyle(2, 0xcfe3f5, 0.8).lineBetween(gx, gy, gx + gw, gy).lineBetween(gx, gy, gx, gy - gh);
    g.lineStyle(4, 0x9fe0ff, 1).lineBetween(gx, gy - gh, gx + gw * Math.min(1, this.t / stopT), gy - gh * (this.w / c.omega0));
    if (this.w <= 0 && !this.done) {
      this.done = true;
      Sound.play('sfx_lever_balance');
      UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
    }
  }
}
window.WheelLab = WheelLab;

// ------------------------------------------------------------------ 진열대의 기계 감정 (퍼즐)
// 기계마다 "만들 수 있다 / 불가능: 에너지가 저절로 생겨야 한다 / 불가능: 열을 모두 일로 바꿔야 한다" 중 하나를 고른다.
class MachineQuiz {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x1a0e08, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 110, '상인의 진열대 — 기계 감정', { fontSize: '44px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0.5));
    this.counter = UIKit.text(scene, 960, 170, '', { fontSize: '26px', color: '#e6d5b8' }).setOrigin(0.5);
    this.title = UIKit.text(scene, 960, 300, '', { fontSize: '40px', fontStyle: 'bold' }).setOrigin(0.5);
    this.desc = UIKit.text(scene, 960, 400, '', { fontSize: '30px', align: 'center', wordWrap: { width: 1300 } }).setOrigin(0.5, 0);
    this.result = UIKit.text(scene, 960, 900, '', { fontSize: '28px', align: 'center', wordWrap: { width: 1500 } }).setOrigin(0.5, 0);
    c.add([this.counter, this.title, this.desc, this.result]);
    this.buttons = MACHINE_QUIZ.choices.map((label, i) => {
      const b = UIKit.button(scene, 960, 600 + i * 90, `${i + 1}. ${label}`, () => this.choose(i), { fontSize: 28 });
      c.add(b);
      return b;
    });
    const kb = scene.input.keyboard;
    kb.on('keydown-ESC', () => this.close());
    ['ONE', 'TWO', 'THREE'].forEach((k, i) => kb.on('keydown-' + k, () => this.choose(i)));   // 1·2·3 키로도 고른다
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.index = 0;
    this.locked = false;
    this.container.setVisible(true);
    this.show();
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  show() {
    const m = MACHINE_QUIZ.machines[this.index];
    this.counter.setText(`${this.index + 1} / ${MACHINE_QUIZ.machines.length}`);
    this.title.setText(m.name);
    this.desc.setText(`상인: "${m.claim}"`);
    this.result.setText('이 기계는…?').setColor('#e6d5b8');
  }

  choose(i) {
    if (!this.isOpen || this.locked) return;
    const m = MACHINE_QUIZ.machines[this.index];
    if (i === m.answer) {
      Sound.play('sfx_exam_correct');
      this.locked = true;
      this.result.setText(`맞았다! ${m.explain}`).setColor(UIKit.SKY);
      this.scene.time.delayedCall(2600, () => {
        this.locked = false;
        this.index++;
        if (this.index >= MACHINE_QUIZ.machines.length) { this.close(); if (this.onDone) this.onDone(); } else this.show();
      });
    } else {
      Sound.play('sfx_exam_wrong');
      this.result.setText(`다시 생각해 보자. ${m.hint}`).setColor('#ffb38a');
    }
  }
}
window.MachineQuiz = MachineQuiz;
