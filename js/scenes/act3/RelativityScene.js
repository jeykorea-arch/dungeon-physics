// 3-6 심연의 끝 (ACT3_PLAN 6단계) — 배경 abyss_end (3000px). 계산은 js/physics/act3/relativity.js, 값은 config.js 의 act3.relativity·ch3_6
//   저주: 전차가 빛 화살보다 빨라 보이고, 두 모래시계는 똑같이 흐른다.
//   진실의 원: 전차는 처음부터 0.76c로 일정하게 한 번 지나간다 (가속 없음 — 총괄지시 74번). 문 A를 지날 때 전차와 땅의 모래시계를 함께 뒤집고,
//      문 B를 지날 때 비교하면 땅은 06, 전차는 04(0.65배). 달리는 전차는 진행 방향으로만 짧아진 것으로 측정된다.
//   해방: 모래시계 문 — 땅에 멈춰 있던 모래시계를 끼우면 열린다 (고를 때는 모래를 가린다) → 시험 18 → 문으로 최종 보스.
class RelativityScene extends ChapterScene {
  constructor() {
    super('Ch3_6');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act3.ch3_6, O = MANIFEST.objects, PX = this.PX, g = this.groundY;
    this.cfg = cfg;
    this.race = null;
    this.realizing = false;
    const saved = Save.chapter(this.scene.key);
    this.tried = { race: !!saved.triedRace, glass: !!saved.triedGlass };
    this.doorOpen = !!saved.doorOpen;
    const D = O.hourglass_door;
    this.door = this.add.image(cfg.doorX, g, D.states[this.doorOpen ? 'opening_04' : 'closed']).setOrigin(D.pivot.x / D.width, 1).setDepth(1);
    this.worldLayer.add(this.door);

    this.circle = this.curse.addTruthCircle({ centerX: cfg.circleX / PX, groundY: g, diameter: 3, domeHeight: 2.6 });
    this.curse.setCircleActive(this.circle, !this.curse.cursed || !!saved.circleLit);

    // 전차와 마법사 (저주 색을 받지 않는다)
    const C = MANIFEST.characters.chariot;
    this.chariot = { x: cfg.chariotX, vehicle: this.add.image(cfg.chariotX, g, C.vehicles.vehicle_normal).setOrigin(C.pivot.x / C.frameWidth, C.pivot.y / C.frameHeight).setDepth(3),
      rider: Characters.create(this, 'chariot', cfg.chariotX, g, 'ride').setDepth(4) };
    this.curse.uncursedLayer.add([this.chariot.vehicle, this.chariot.rider]);
    this.showChariot(this.curse.cursed);

    this.arrowImg = this.add.image(0, 0, O.light_arrow.states['01']).setDepth(6).setVisible(false);
    this.worldLayer.add(this.arrowImg);

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, g).setDepth(5);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, g).setDepth(4);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });

    const kb = this.input.keyboard;
    this.keysIn = kb.addKeys({ left: 'LEFT', right: 'RIGHT', act: 'Z' });
    kb.addCapture(['Z']);
    this.keysIn.act.on('down', () => this.interact());
    kb.on('keydown-ONE', () => this.pickGlass('ground'));
    kb.on('keydown-TWO', () => this.pickGlass('chariot'));
    this.flags = {};
    this.lab = new RelativityLab(this, this.uiLayer);
    this.compare = new HourglassCompare(this, this.uiLayer, 650);
    this.glassRun = null;
    this.choosing = false;
    this.revealing = false;
  }

  showChariot(on) {
    this.chariot.vehicle.setVisible(on);
    this.chariot.rider.setVisible(on);
  }

  addPrompts() {
    const c = this.cfg, busy = () => !!(this.race || this.glassRun || this.choosing);
    this.addPrompt({ key: 'Z', text: () => (!this.tried.race ? '빛 화살 쏘기' : '모래시계 두 개 비교'), x: () => this.ian.x, range: 200, y: this.groundY - 260,
      when: () => this.curse.cursed && !this.circle.active && !busy() });
    this.addPrompt({ key: 'Z', text: '모래시계 실험', x: c.circleX, range: 1.4 * this.PX,
      when: () => this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x) });
    this.addPrompt({ key: 'Z', text: () => (this.doorOpen ? '문으로 들어가기' : '문 홈에 모래시계 끼우기'), x: c.doorX - 60, range: 1.2 * this.PX,
      when: () => !this.curse.cursed && !busy() && (!this.doorOpen || this.canLeave()) });
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  onReady() {
    this.addPrompts();
    this.helpText = UIKit.text(this, 1900, 1070, '← → 걷기   Z 쏘기·비교·실험·문   M 마법서', {
      fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(300);
    this.uiLayer.add(this.helpText);
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1130, 170);
    const saved = Save.chapter(this.scene.key);
    if (this.curse.cursed && !this.circle.active) this.message.setText('Z: 전차에 빛 화살을 쏘아 보자');
    if (this.doorOpen && !saved.examPassed) this.examBtn = this.showExamIntro(() => this.startExam());
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 시간은 누구에게나 똑같이 흐르고, 충분히 빠르면 빛도 따라잡는다?'
      : '진짜 법칙: 빛의 속력은 누구에게나 같다 → 땅에서 보면 지나가는 전차의 시간은 느리게 가고, 길이는 진행 방향으로 짧아진다';
  }

  canLeave() {
    return !!Save.chapter(this.scene.key).examPassed;
  }

  teacherNumbers() {
    const R = Relativity;
    return [`지금: v = ${R.cfg().beta}c, γ = ${R.gamma().toFixed(2)}, 시간 비율 ${R.timeRatio().toFixed(2)}, 전차 길이 비율 ${R.lengthRatio().toFixed(2)}`];
  }

  // ------------------------------------------------------------------ Z
  interact() {
    if (this.isBlocked() || this.realizing || this.race || this.glassRun) return;
    if (this.choosing) { if (!this.revealing) this.closeChoice(); return; }
    const c = this.cfg;
    if (this.curse.cursed) {
      if (this.circle.active) {
        if (!this.curse.inCircle(this.ian.x)) return;
        const open = () => this.lab.open(() => this.onLabDone());
        if (this.flags.labTalked) { open(); return; }
        this.flags.labTalked = true;
        this.say('lab_start', open);
        return;
      }
      if (!this.tried.race) this.startRace();
      else this.startCursedGlass();
      return;
    }
    if (Math.abs(this.ian.x - (c.doorX - 60)) > 1.2 * this.PX) return;
    if (this.doorOpen) {
      if (this.canLeave() && !this.flags.leaving) {
        this.flags.leaving = true;
        this.cameras.main.fadeOut(600, 0, 0, 0);
        this.time.delayedCall(650, () => this.goNext());
      }
      return;
    }
    this.openChoice();
  }

  // 저주: 전차가 빛 화살보다 빠른 것처럼 달아난다
  startRace() {
    const c = this.cfg, x0 = this.ian.x + 60;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'attack_light', false);
    this.race = { ax: x0, cx: this.chariot.x, t: 0 };
    this.arrowImg.setVisible(true).setPosition(x0, this.ian.y - 120);
    this.chariot.vehicle.setFlipX(true);
    this.chariot.rider.setFlipX(true);
    Sound.play('sfx_chariot_launch');
    Sound.play('sfx_wizard_cast');
    this.message.setText('빛 화살을 쐈다 — 전차가 더 빠르다?!').setColor('#ffe08a');
  }

  updateRace(dt) {
    const R = this.race, c = this.cfg, O = MANIFEST.objects.light_arrow;
    if (!R) return;
    R.t += dt;
    R.ax += Relativity.arrowSpeed() * dt;
    R.cx += Relativity.arrowSpeed() * c.cursedChariotRatio * dt;
    this.arrowImg.setPosition(R.ax, this.ian.y - 120).setTexture(O.states[String(1 + Math.floor(R.t * 12) % 4).padStart(2, '0')]);
    this.chariot.vehicle.x = R.cx;
    this.chariot.rider.x = R.cx;
    if (R.t >= c.raceSeconds) {
      this.race = null;
      this.arrowImg.setVisible(false);
      this.chariot.vehicle.setFlipX(false).setPosition(c.chariotX, this.groundY);
      this.chariot.rider.setFlipX(false).setPosition(c.chariotX, this.groundY);
      this.tried.race = true;
      Save.setChapter(this.scene.key, { triedRace: true });
      this.say('race_cursed', () => this.message.setText('Z: 땅과 전차의 모래시계를 비교해 보자').setColor('#ffe08a'));
    }
  }

  // 저주: 두 모래시계가 똑같이 흐른다
  startCursedGlass() {
    this.glassRun = { t: 0, last: ['', ''] };
    this.compare.show('땅의 모래시계 (문 B)', '지나가는 전차의 모래시계');
    this.compare.setStates('01', '01');
    this.message.setText('두 모래시계를 비교한다…').setColor('#ffe08a');
  }

  updateGlass(dt) {
    const G = this.glassRun, c = this.cfg;
    if (!G) return;
    G.t += dt;
    const p = Math.min(1, G.t / c.glassSeconds), a = Relativity.hourglassState(p), b = Relativity.hourglassState(p, { moving: true, cursed: true });
    this.compare.setStates(a, b);
    if (a !== G.last[0]) Sound.play('sfx_hourglass_normal');
    G.last = [a, b];
    if (G.t >= c.glassSeconds + 1) {
      this.glassRun = null;
      this.compare.hide();
      this.tried.glass = true;
      Save.setChapter(this.scene.key, { triedGlass: true, circleLit: true });
      this.say('glass_cursed', () => {
        this.message.setText(`${this.ian.x < this.cfg.circleX ? '오른쪽' : '왼쪽'} 바닥에 진실의 원이 나타났다! 화살표를 따라가자`).setColor(UIKit.SKY);
        this.curse.setCircleActive(this.circle, true);
        this.say('circle_found');
      });
    }
  }

  // ------------------------------------------------------------------ 모래시계 문
  // 고를 때는 모래의 양을 가린다 (그림 맞추기가 아니라 생각해서 고르게 — 총괄지시 74번). 고른 뒤에 보여 준다
  openChoice() {
    this.choosing = true;
    this.compare.show('1 땅에 멈춰 있던\n모래시계 (문 B)', '2 지나가는 전차에\n실렸던 모래시계');
    this.compare.setStates(Relativity.hourglassState(1), Relativity.hourglassState(1, { moving: true }));
    this.compare.setHidden(true);
    this.message.setText('이 문은 땅에서 흐른 시간만큼 모래가 흐른 모래시계만 받는다 — 1 또는 2 (Z: 닫기)').setColor('#ffe08a');
  }

  closeChoice() {
    this.choosing = false;
    this.compare.hide();
  }

  pickGlass(which) {
    if (!this.choosing || this.isBlocked() || this.revealing) return;
    this.revealing = true;
    this.compare.setHidden(false);   // 고른 뒤에 모래를 보여 준다
    const right = which === 'ground';
    Sound.play(right ? 'sfx_hourglass_normal' : 'sfx_exam_wrong');
    this.message.setText(right ? '끝까지 흘렀다 — 땅에 멈춰 있던 모래시계가 맞다!' : '맞지 않는다! 땅에서 보면 전차의 모래시계는 시간이 느리게 가서 덜 흘렀다').setColor(right ? UIKit.SKY : '#ffd27a');
    this.time.delayedCall(GAME_CONFIG.act3.ch3_6.revealSeconds * 1000, () => {
      this.revealing = false;
      this.closeChoice();
      if (!right) return;
      this.doorOpen = true;
      Save.setChapter(this.scene.key, { doorOpen: true });
      Sound.play('sfx_door_open');
      const O = MANIFEST.objects.hourglass_door;
      ['opening_01', 'opening_02', 'opening_03', 'opening_04'].forEach((s, i) => this.time.delayedCall(250 * (i + 1), () => this.door.setTexture(O.states[s])));
      this.message.setText('문이 열린다').setColor(UIKit.SKY);
      this.time.delayedCall(1300, () => this.say('door_open', () => { this.examBtn = this.showExamIntro(() => this.startExam()); }));
    });
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      if (this.examBtn) this.examBtn.setVisible(false);
      Save.setChapter(this.scene.key, { examPassed: true });
      this.message.setText('3-6 특수 상대성 이론 — 마법서 시험 통과! 문으로 들어가 마법사를 쫓자 (Z)').setColor(UIKit.SKY);
    });
  }

  onLabDone() {
    this.realizing = true;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.showChariot(false);
        this.message.setText('마법사가 문 너머로 달아났다! 오른쪽 모래시계 문으로 가자').setColor(UIKit.SKY);
        this.say('after_free');
      }));
    });
  }

  // 할 일 카드와 화살표 (총괄지시 73번)
  updateGuide() {
    const c = this.cfg, g = this.groundY;
    if (this.dialogue.active || this.race || this.glassRun || this.choosing) { this.pointArrow(null); return; }
    if (this.curse.cursed) {
      if (!this.flags.card && !this.circle.active) {
        this.flags.card = true;
        this.showTaskCard(['① Z — 전차에 빛 화살 쏘기 (어디서나)', '② Z — 땅과 전차의 모래시계 비교하기']);
      }
      if (this.circle.active) this.pointArrow(c.circleX, g - 150);
      else this.pointArrow(this.ian.x, g - 300);
      return;
    }
    if (!this.doorOpen) this.pointArrow(c.doorX - 60, g - 240);
    else if (this.canLeave()) this.pointArrow(c.doorX, g - 240);
    else this.pointArrow(null);
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const k = this.keysIn, PX = this.PX, c = this.cfg;
    this.updateGuide();
    this.updateRace(dt);
    this.updateGlass(dt);
    const lock = this.realizing || this.race || this.glassRun || this.choosing;
    const dir = lock ? 0 : (k.right.isDown ? 1 : 0) - (k.left.isDown ? 1 : 0);
    if (dir) {
      this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * c.walkSpeed * PX * dt, 60, this.doorOpen ? c.doorX + 20 : c.doorX - 130);
      this.ian.setFlipX(dir < 0);
    }
    if (!this.realizing && !this.race) Characters.play(this.ian, dir ? 'walk' : 'idle');
    this.updateGaron(dt);
    this.speedPanel.setLines(this.curse.cursed
      ? ['전차: 빛보다 빠르다?', '모래시계: 어디서나 똑같이 흐른다?']
      : ['빛의 속력: 누구에게나 c', `문: ${this.doorOpen ? '열림' : '닫힘'}`]);
  }

  updateGaron(dt) {
    const g = this.garon, c = this.cfg, PX = this.PX;
    const d = this.ian.x - g.x, walk = Math.abs(d) > c.garonFollow * PX;
    if (walk) {
      g.x += Math.sign(d) * c.walkSpeed * PX * dt;
      g.setFlipX(d < 0);
    }
    Characters.play(g, walk ? 'walk' : 'idle');
  }
}
window.RelativityScene = RelativityScene;

// ------------------------------------------------------------------ 모래시계 나란히 (hourglass_compare)
class HourglassCompare {
  constructor(scene, layer, y) {
    const U = MANIFEST.ui.act3.hourglass_compare, O = MANIFEST.objects.hourglass;
    this.O = O;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(330).setVisible(false);
    layer.add(c);
    this.container = c;
    const x0 = 960 - U.pivot[0], y0 = y - U.pivot[1];
    c.add(scene.add.image(960, y, U.key));
    this.imgs = U.slot_centers.map((p) => {
      const im = scene.add.image(x0 + p[0], y0 + p[1], O.states['01']).setScale(2.8);
      c.add(im);
      return im;
    });
    // 모래를 가리는 뚜껑 (문 앞에서 고를 때)
    this.covers = U.slot_centers.map((p) => {
      const r = scene.add.rectangle(x0 + p[0], y0 + p[1] + 10, 150, 230, 0x2a1c10, 1).setStrokeStyle(4, 0xc9a24a).setVisible(false);
      const q = UIKit.text(scene, x0 + p[0], y0 + p[1] + 10, '?', { fontSize: '90px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0.5).setVisible(false);
      c.add([r, q]);
      return [r, q];
    });
    this.labels = U.slot_centers.map((p) => {
      const t = UIKit.text(scene, x0 + p[0], y0 + U.height + 10, '', { fontSize: '24px', fontStyle: 'bold', backgroundColor: '#0b1320dd', padding: { x: 10, y: 5 }, align: 'center' }).setOrigin(0.5, 0);
      c.add(t);
      return t;
    });
  }

  show(a, b) {
    this.labels[0].setText(a);
    this.labels[1].setText(b);
    this.container.setVisible(true);
  }

  hide() {
    this.container.setVisible(false);
    this.setHidden(false);
  }

  setHidden(on) {
    this.covers.forEach((pair) => pair.forEach((o) => o.setVisible(on)));
  }

  setStates(a, b) {
    this.imgs[0].setTexture(this.O.states[a]);
    this.imgs[1].setTexture(this.O.states[b]);
  }
}
window.HourglassCompare = HourglassCompare;

// ------------------------------------------------------------------ 진실의 원 실험: 등속으로 한 번 지나가는 전차
// 땅에 문 A·B와 모래시계(미리 시각을 맞춰 둠). 전차는 처음부터 0.76c로 일정하게 달려 왼쪽 → 오른쪽으로 한 번만 지나간다 (가속 없음, 특수 상대성 이론만).
// A를 지나는 순간 전차와 땅의 모래시계를 함께 뒤집고(둘 다 01), B를 지나는 순간 B와 전차의 모래시계를 비교한다: 땅 06, 전차 04.
class RelativityLab {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const L = GAME_CONFIG.act3.ch3_6.lab, C = MANIFEST.characters.chariot, O = MANIFEST.objects;
    this.L = L;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 50, '진실의 원 — 모래시계 두 개', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    this.help = UIKit.text(scene, 960, 104, '', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5);
    c.add(this.help);
    this.info = UIKit.text(scene, 960, 145, '', { fontSize: '28px', align: 'center' }).setOrigin(0.5, 0);
    c.add(this.info);
    this.hud = UIKit.text(scene, 1880, 50, '전차 위에서 잰 빛의 속력: c', { fontSize: '26px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#0b1320dd', padding: { x: 12, y: 6 } }).setOrigin(1, 0.5);
    c.add(this.hud);
    c.add(scene.add.rectangle(960, L.trackY + 4, 1800, 8, 0x5a6a7a).setOrigin(0.5, 0));
    // 땅의 문 A·B와 모래시계 (둘 다 땅에 멈춰 있다)
    const H = O.hourglass, gates = scene.add.graphics();
    c.add(gates);
    this.gates = [L.gateA, L.gateB].map((x, i) => {
      gates.lineStyle(10, 0x8a7a5a, 1).lineBetween(x - 70, L.trackY, x - 70, L.trackY - 190).lineBetween(x + 70, L.trackY, x + 70, L.trackY - 190).lineBetween(x - 80, L.trackY - 190, x + 80, L.trackY - 190);
      c.add(UIKit.text(scene, x, L.trackY - 240, `문 ${i ? 'B' : 'A'}`, { fontSize: '26px', fontStyle: 'bold' }).setOrigin(0.5));
      const im = scene.add.image(x, L.trackY - 196, H.states['01']).setOrigin(0.5, 0).setScale(0.9);
      c.add(im);
      return im;
    });
    // 지나가는 전차 (달리는 내내 수축 그림)
    const W = C.frameWidth, ox = C.pivot.x / W, oy = C.pivot.y / C.frameHeight;
    this.lines = scene.add.image(0, 0, O.speed_lines.states['01']).setFlipX(true);
    this.vehicle = scene.add.image(L.startX, L.trackY, C.vehicles.vehicle_contracted).setOrigin(ox, oy).setFlipX(true);
    this.rider = Characters.create(scene, 'chariot', L.startX, L.trackY, 'ride').setFlipX(true);
    this.carried = scene.add.image(0, 0, H.states['01']).setScale(0.7);   // 전차에 실린 모래시계
    this.lenG = scene.add.graphics();   // 멈춰 있을 때의 길이 표시
    c.add([this.lines, this.vehicle, this.rider, this.carried, this.lenG]);
    this.lenText = UIKit.text(scene, 960, L.trackY + 44, '', { fontSize: '24px', color: '#cfe3f5' }).setOrigin(0.5, 0);
    c.add(this.lenText);
    this.cmp = new HourglassCompare(scene, c, L.compareY);
    this.cmp.container.setDepth(0);
    scene.input.keyboard.on('keydown-SPACE', () => this.isOpen && this.start());
    scene.input.keyboard.on('keydown-ESC', () => this.close());
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  place(x) {
    const L = this.L;
    this.vehicle.setPosition(x, L.trackY);
    this.rider.setPosition(x, L.trackY);
    this.carried.setPosition(x - 20, L.trackY - 150);
    this.lines.setPosition(x - 280, L.trackY - 100);
    // 눈금: 멈춰 있을 때의 길이(수축 전) — 그림 폭 1465 / 1920 × 600
    const len = L.restLength, y = L.trackY + 26;
    this.lenG.clear().lineStyle(3, 0xcfe3f5, 0.9).lineBetween(x - len / 2, y, x + len / 2, y).lineBetween(x - len / 2, y - 8, x - len / 2, y + 8).lineBetween(x + len / 2, y - 8, x + len / 2, y + 8);
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.run = null;
    this.container.setVisible(true);
    this.place(this.L.startX);
    this.setVisibleChariot(false);
    this.gates.forEach((g) => g.setTexture(MANIFEST.objects.hourglass.states['01']));
    this.cmp.show('땅의 모래시계 (문 B)', '지나가는 전차의 모래시계');
    this.cmp.setStates('01', '01');
    this.help.setText('Space: 전차 보내기    Esc: 닫기');
    this.info.setText('땅의 문 A·B에 모래시계를 두고 시각을 맞췄다. 전차는 처음부터 빛에 가까운 속력으로 일정하게 달려 한 번만 지나간다').setColor('#ffe08a');
    this.lenText.setText('');
    Sound.play('sfx_truth_circle_enter');
  }

  setVisibleChariot(on) {
    [this.vehicle, this.rider, this.carried, this.lines, this.lenG].forEach((o) => o.setVisible(on));
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  start() {
    if (this.run || this.done) return;
    this.run = { t: 0, last: ['01', '01'], flipped: false };
    this.help.setText('');
    this.setVisibleChariot(true);
    Sound.play('sfx_chariot_run');
    this.lenText.setText('달리는 전차: 진행 방향으로만 짧아진 것으로 측정된다 (높이는 그대로). 눈금 = 멈췄을 때의 길이');
    this.info.setText('전차가 일정한 속력으로 다가온다').setColor('#ffe08a');
  }

  update(dt) {
    if (!this.isOpen || !this.run || this.done) return;
    const R = this.run, L = this.L, O = MANIFEST.objects, v = (L.gateB - L.gateA) / L.seconds;
    R.t += dt;
    const x = L.startX + v * R.t;
    this.place(x);
    this.lines.setTexture(O.speed_lines.states[String(1 + Math.floor(R.t * 12) % 3).padStart(2, '0')]);
    if (!R.flipped && x >= L.gateA) {   // 문 A를 지나는 순간 함께 뒤집는다
      R.flipped = true;
      R.t0 = R.t;
      Sound.play('sfx_hourglass_normal');
      this.info.setText('문 A를 지나는 순간 — 땅과 전차의 모래시계를 함께 뒤집었다').setColor(UIKit.SKY);
    }
    if (R.flipped) {
      const p = Math.min(1, (R.t - R.t0) / L.seconds);
      const a = Relativity.hourglassState(p), b = Relativity.hourglassState(p, { moving: true });
      this.gates.forEach((g) => g.setTexture(O.hourglass.states[a]));
      this.carried.setTexture(O.hourglass.states[b]);
      if (p < 1 || !R.compared) this.cmp.setStates(a, b);
      if (a !== R.last[0]) Sound.play('sfx_hourglass_normal');
      if (b !== R.last[1]) Sound.play('sfx_hourglass_slow');
      R.last = [a, b];
      if (p >= 1 && !R.compared) {   // 문 B를 지나는 순간 비교
        R.compared = true;
        this.info.setText('문 B를 지나는 순간 비교: 땅의 모래는 끝까지 흘렀는데, 전차의 모래는 덜 흘렀다').setColor(UIKit.SKY);
      }
    }
    if (x > L.endX) {   // 멈추거나 돌아오지 않고 그대로 지나간다
      this.done = true;
      this.setVisibleChariot(false);
      this.lenText.setText('');
      this.info.setText('빛의 속력은 누구에게나 c — 그래서 땅에서 보면 지나가는 전차의 시간이 느리게 간다').setColor(UIKit.SKY);
      UIKit.labNext(this, () => { if (this.isOpen) { this.close(); if (this.onDone) this.onDone(); } });
    }
  }
}
window.RelativityLab = RelativityLab;
