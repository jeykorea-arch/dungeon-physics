// 2-5 탑 5층 승강기와 석상의 방 (ACT2_PLAN 5단계) — 배경 tower_f5 (2400px)
//
// 이번 묶음: 방 배치(승강기 통로·전동기·방향 스위치·전선 옆 나침반·전자석 함정·침묵의 석상) + 저주 이야기
//   + 진실의 원 나침반 실험 + 저주 해제. 계산은 js/physics/act2/magnetism.js (compassAngle, motor)
//   Z: 전동기 앞이면 전류 켜기·끄기, 방향 스위치 앞이면 전류 방향 바꾸기, 진실의 원 안(저주)이면 실험
//   저주: 전류를 흘려도 나침반·전동기가 꿈쩍 않는다. 해방: 전류를 켜면 나침반이 돌고, 방향을 바꾸면 반대로.
//   둘째 묶음: 승강기 퍼즐 — 해방 뒤 전동기 앞 Z로 코일(3·6·12번)과 자석(세기 1·2·4)을 골라 전류를 켠다.
//      힘 = 감은 수 × 자석 세기가 24 이상이고 방향이 맞으면 승강기가 올라간다(빠르기 ∝ 힘 − 24, 최소 빠르기 보장).
//      방향이 반대면 회전자가 거꾸로 돌고 승강기는 바닥에 걸린다. 전류를 끄면 승강기는 천천히 내려온다.
//   셋째 묶음: 석상 스피커 — 해방 뒤 석상 앞 Z로 부품 셋(자석·코일·진동판)을 입 자리에 끼운다. 셋 다 있어야 소리가 난다.
//   넷째 묶음: 승강기와 석상을 마치면 전자석 함정 전투 → 시험 11 → 승강기에 올라 Z로 6층.
class LiftScene extends ChapterScene {
  constructor() {
    super('Ch2_5');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act2.ch2_5;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    const saved = Save.chapter(this.scene.key);
    const place = (name, x, y, depth, state) => {
      const o = O[name];
      const img = this.add.image(x, y, state ? o.states[state] : o.key)
        .setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };
    // 승강기: 바닥(통로 바닥과 같은 높이) + 위로 이어진 줄
    const ev = cfg.elevator;
    this.platform = place('elevator_platform', ev.x, this.groundY, 1);
    this.rope = this.add.tileSprite(ev.x, 0, O.elevator_rope.width, this.groundY - O.elevator_platform.height, O.elevator_rope.key)
      .setOrigin(0.5, 0).setDepth(0);
    this.worldLayer.add(this.rope);
    // 전동기 + 회전자, 방향 스위치
    this.motor = place('motor', cfg.motorX, this.groundY, 1);
    const m = O.motor_rotor.mount_in_motor;
    this.rotor = this.add.image(cfg.motorX - O.motor.pivot.x + m[0], this.groundY - O.motor.pivot.y + m[1], O.motor_rotor.key).setDepth(2);
    this.worldLayer.add(this.rotor);
    this.dir = saved.currentDir || cfg.start.dir;   // +1 오른쪽(승강기가 올라가는 쪽) / −1 왼쪽 (스위치 그림)
    this.lever = this.makeLever({ x: cfg.switchX, state: this.dir > 0 ? 'right' : 'left', labels: ['전류 ←', '전류 →'] });
    // 전선 옆 나침반: 돌 받침(엔진) 위
    const g = this.add.graphics().setDepth(0);
    g.fillStyle(0x4a4038, 1).fillRect(cfg.compassX - 40, this.groundY - 70, 80, 70);
    g.fillStyle(0x6b5a48, 1).fillRect(cfg.compassX - 46, this.groundY - 76, 92, 10);
    this.worldLayer.add(g);
    this.compassY = this.groundY - 120;
    this.compass = this.add.image(cfg.compassX, this.compassY, O.compass.key).setScale(1.5).setDepth(2);
    this.needle = this.add.image(cfg.compassX, this.compassY, O.compass_needle.key).setScale(1.5).setDepth(3);
    this.worldLayer.add([this.compass, this.needle]);
    // 전선: 전동기에서 나침반 바로 위를 지나 스위치로 (엔진 그림), 전류가 흐르면 빛 점이 움직인다
    this.wireY = this.compassY - 62;
    this.wire = this.add.graphics().setDepth(2);
    this.worldLayer.add(this.wire);
    this.power = false;
    // 전자석 함정 (끔), 침묵의 석상
    this.trap = place('electromagnet_trap', cfg.trapX, this.groundY + 50, 1, 'off');
    this.trapGlow = place('electromagnet_trap_glow', cfg.trapX, this.groundY + 50, 1, 'on').setBlendMode('ADD').setVisible(false);   // JSON: 몸체와 같은 기준점
    this.statue = Characters.create(this, 'silent_statue', cfg.statueX, this.groundY, 'silent').setDepth(2).setFlipX(true);
    this.worldLayer.add(this.statue);

    this.circle = this.curse.addTruthCircle({ centerX: cfg.circleX, groundY: this.groundY, diameter: 3.6, domeHeight: 2.6 });
    this.curse.setCircleActive(this.circle, !this.curse.cursed || !!saved.circleLit);

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, this.groundY).setDepth(4);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, this.groundY).setDepth(3);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT', act: 'Z' });
    kb.addCapture(['Z']);
    this.keys.act.on('down', () => this.interact());
    this.flags = {};
    this.turns = saved.turns || cfg.start.turns;
    this.magnet = saved.magnet || cfg.start.magnet;
    this.liftY = 0;                       // 승강기 바닥이 통로 바닥에서 올라간 높이 (m)
    this.liftReady = !!saved.liftReady;   // 한 번이라도 끝까지 끌어올렸나
    this.lab = new CompassLab(this, this.uiLayer);
    this.motorPanel = new MotorPanel(this, this.uiLayer);
    this.speakerPanel = new SpeakerPanel(this, this.uiLayer);
    this.speakerDone = !!saved.speakerDone;
    if (this.speakerDone) Characters.play(this.statue, 'speaker_on');
  }

  addPrompts() {
    const c = this.cfg;
    this.addPrompt({ key: 'Z', text: '전선 옆 나침반 실험', x: () => this.cfg.circleX * this.PX, range: 1.8 * this.PX,
      when: () => this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x) });
    this.addPrompt({ key: 'Z', text: () => (this.curse.cursed ? '전류 켜기·끄기' : this.power ? '전류 끄기' : '코일·자석 고르고 전류 켜기'), x: c.motorX, when: () => !this.battle || this.battle.done });
    this.addPrompt({ key: 'Z', text: '전류 방향 바꾸기', x: c.switchX, when: () => !this.battle || this.battle.done });
    this.addPrompt({ key: 'Z', text: '스피커 부품 끼우기', x: c.statueX, range: 1.4 * this.PX, when: () => !this.curse.cursed && !this.speakerDone });
    this.addPrompt({ key: 'Z', text: '승강기 타고 6층으로', x: c.elevator.x, range: c.elevator.right - c.elevator.x + 40, when: () => this.canLeave() && !this.flags.riding });
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen) || (this.motorPanel && this.motorPanel.isOpen) || (this.speakerPanel && this.speakerPanel.isOpen);
  }

  onReady() {
    this.addPrompts();
    this.helpText = UIKit.text(this, 1900, 1070, '← → 걷기   Z 전동기·방향 스위치·석상·승강기   M 마법서', {
      fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(300);
    this.uiLayer.add(this.helpText);
    const saved = Save.chapter(this.scene.key);
    if (saved.battleDone && !saved.examPassed) {
      this.battle = { done: true, enemies: [] };
      this.examBtn = this.showExamIntro(() => this.startExam());
    }
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1136, 150);
    this.message.setText(this.curse.cursed ? 'Z: 전동기에 전류를 흘려 보자' : '');
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 전기와 자기는 관계없다? (전류를 흘려도 나침반·전동기가 반응 없음)'
      : '진짜 법칙: 전류는 자기장을 만든다 — 나침반이 돌고, 자기장 속 코일에 전류가 흐르면 힘을 받아 돈다';
  }

  near(x) {
    return Math.abs(this.ian.x - x) <= this.cfg.reach * this.PX;
  }

  // ------------------------------------------------------------------ Z
  interact() {
    if (this.isBlocked() || this.flags.riding) return;
    const cfg = this.cfg;
    if (this.battle && !this.battle.done) return;
    // 시험을 통과했으면 승강기에 올라 6층으로
    if (this.canLeave() && this.ian.x <= cfg.elevator.right + 40) { this.rideElevator(); return; }
    if (this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x)) {
      const open = () => this.lab.open(() => this.onLabDone());
      if (this.flags.labTalked) { open(); return; }
      this.flags.labTalked = true;
      this.say('lab_start', open);
      return;
    }
    // 석상: 해방 뒤 스피커 만들기
    if (Math.abs(this.ian.x - cfg.statueX) <= 1.4 * this.PX) { this.useStatue(); return; }
    // 전동기와 스위치 중 더 가까운 쪽
    const dm = Math.abs(this.ian.x - cfg.motorX), ds = Math.abs(this.ian.x - cfg.switchX);
    if (this.near(cfg.motorX) && (dm < 70 || !this.near(cfg.switchX))) {
      // 해방: 전류가 꺼져 있으면 코일·자석 고르기 화면, 켜져 있으면 끈다
      if (!this.curse.cursed && !this.power) { this.motorPanel.open(); return; }
      this.togglePower();
      return;
    }
    if (this.near(cfg.switchX)) { this.flipDir(); return; }
  }

  togglePower() {
    this.power = !this.power;
    Sound.play('sfx_switch_flip');
    Characters.play(this.ian, 'push', false);
    this.actT = 0.4;
    this.spinT = 0;
    this.stalled = false;
    if (!this.power) {
      Sound.stopLoop('sfx_motor_hum');
      this.message.setText('전류를 껐다').setColor('#ffe08a');
      return;
    }
    if (this.curse.cursed) {
      this.message.setText('전선에 전류가 흐르는데… 나침반도 전동기도 꿈쩍하지 않는다').setColor('#c79bff');
      if (!this.flags.cursedPower) {
        this.flags.cursedPower = true;
        this.time.delayedCall(1200, () => this.say('cursed_power', () => { this.lightCircle(); this.say('circle_found'); }));
      }
      return;
    }
    Sound.startLoop('sfx_motor_hum');
    this.message.setText('전류를 켰다 — 나침반 바늘이 돌아간다!').setColor(UIKit.SKY);
  }

  flipDir() {
    if (this.leverBusy) return;
    this.leverBusy = true;
    this.pushLever(this.lever, () => { this.leverBusy = false; });
    this.dir = -this.dir;
    this.spinT = 0;
    this.stalled = false;
    if (this.power && !this.curse.cursed) Sound.startLoop('sfx_motor_hum');
    Save.setChapter(this.scene.key, { currentDir: this.dir });
    this.message.setText(this.curse.cursed || !this.power ? '전류 방향 스위치를 바꿨다'
      : '전류 방향을 바꾸자 나침반 바늘이 반대로 돈다!').setColor(this.curse.cursed ? '#c79bff' : UIKit.SKY);
  }

  lightCircle() {
    this.curse.setCircleActive(this.circle, true);
    this.circle.image.setAlpha(0);
    this.tweens.add({ targets: this.circle.image, alpha: 1, duration: 1200 });
    Sound.play('sfx_truth_circle_enter');
    Save.setChapter(this.scene.key, { circleLit: true });
    this.message.setText('석상 앞 바닥에 진실의 원이 나타났다! 가 보자').setColor('#ffe08a');
  }

  // 실험 뒤: 깨달음 → 저주 풀기(카드 11 + 마법서 11장) → 대사
  onLabDone() {
    this.realizing = true;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.message.setText('이제 진짜 법칙대로! 전동기에 전류를 흘려 보자').setColor(UIKit.SKY);
        this.spinT = 0;   // 전류가 켜져 있었다면 이제부터 진짜로 돈다
        this.stalled = false;
        if (this.power) Sound.startLoop('sfx_motor_hum');
        this.say('after_free');
      }));
    });
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const cfg = this.cfg, PX = this.PX;
    this.actT = Math.max(0, (this.actT || 0) - dt);
    const busy = this.actT > 0 || this.realizing;
    const dir = busy ? 0 : (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    if (this.flags.riding) { this.updateRide(dt); return; }
    const minX = this.canLeave() && this.liftY === 0 ? cfg.elevator.x : cfg.minX;   // 승강기 통로에는 바닥이 없다 — 시험 뒤에는 승강기 바닥에 올라설 수 있다
    this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * cfg.walkSpeed * PX * dt, minX, this.worldW - 60);
    if (dir) this.ian.setFlipX(dir < 0);
    if (!busy) Characters.play(this.ian, dir ? 'walk' : 'idle');
    const cursed = this.curse.cursed;
    // 나침반: 전류가 흐르면 ±90°, 끄면 북쪽(0°) — 천천히 따라간다
    const target = Magnetism.compassAngle(this.power ? this.dir : 0, { cursed });
    const prev = this.needle.angle;
    this.needle.angle += (target - this.needle.angle) * Math.min(1, dt * 4);
    if (Math.abs(target - prev) > 20 && Math.abs(target - this.needle.angle) < 20) Sound.play('sfx_compass_tick');
    // 전동기: 지금 끼워진 코일·자석의 힘. 승강기를 올릴 힘이 모자라면 힘겹게 돌다 멈춘다 (승강기 퍼즐은 다음 묶음)
    const mo = Magnetism.motor(this.turns, this.magnet, this.dir, { cursed });
    this.spinT = (this.spinT || 0) + dt;
    let spin = this.power ? mo.spin : 0;
    if (this.power && !mo.lifts && !cursed) {
      spin *= Math.max(0, 1 - this.spinT / 1.5);
      if (this.spinT >= 1.5 && !this.stalled) {
        this.stalled = true;
        Sound.stopLoop('sfx_motor_hum');
        this.message.setText(`회전자가 힘겹게 돌다 멈췄다 — 힘 ${mo.force} (승강기를 올리려면 ${GAME_CONFIG.act2.magnetism.motor.need} 이상)`).setColor('#ffd27a');
      }
    }
    if (this.power && mo.lifts && mo.speed > 0 && this.liftY >= this.cfg.lift.top) spin = 0;   // 위 끝에 닿으면 멈춤
    this.rotor.angle += spin * 360 * 4 * dt;
    if (spin) Sound.setLoopRate('sfx_motor_hum', 0.6 + Math.abs(spin));
    this.updateLift(dt, mo, cursed);
    this.drawWire(dt, cursed);
    this.updateBattle(dt);
    // 승강기와 석상을 마치면 전투 (대사가 끝난 뒤)
    if (this.liftReady && this.speakerDone && !this.battle && !this.dialogue.active && !this.canLeave() && !this.flags.battleQueued) {
      this.flags.battleQueued = true;
      this.time.delayedCall(1000, () => this.startBattle());
    }
    if (this.battle && !this.battle.done) this.updateBattleText(); else this.updatePanel(mo);
  }

  // 승강기를 타고 올라간다: 이안·가론이 바닥과 함께 — exitHeight에 닿으면 6층
  updateRide(dt) {
    const PX = this.PX;
    this.liftY += this.rideSpeed * dt;
    this.rotor.angle += 360 * 2 * dt;
    const y = this.groundY - this.liftY * PX;
    this.platform.y = y;
    this.rope.height = Math.max(1, y - MANIFEST.objects.elevator_platform.height);
    this.standOnPlatform();
    Characters.play(this.ian, 'idle');
    if (this.liftY >= this.cfg.ride.exitHeight && !this.flags.leaving) {
      this.flags.leaving = true;
      Sound.stopLoop('sfx_motor_hum');
      Sound.play('sfx_elevator_stop');
      this.cameras.main.fadeOut(600, 0, 0, 0);
      this.time.delayedCall(650, () => this.goNext());
    }
  }

  // 승강기: 힘이 충분하면 전동기 빠르기로 오르내린다 (위 끝 lift.top, 아래는 바닥에 걸림). 전류를 끄면 천천히 내려온다
  updateLift(dt, mo, cursed) {
    const L = this.cfg.lift, PX = this.PX;
    const before = this.liftY;
    if (this.power && !cursed && mo.lifts) {
      this.liftY = Phaser.Math.Clamp(this.liftY + mo.speed * dt, 0, L.top);
      if (mo.speed < 0 && this.liftY === 0 && !this.flags.stuckMsg) {
        this.flags.stuckMsg = true;
        this.message.setText('회전자가 거꾸로 돈다 — 승강기가 바닥에 걸려 내려가지 않는다. 방향을 바꿔 보자').setColor('#ffd27a');
      }
      if (this.liftY >= L.top && before < L.top && mo.force > GAME_CONFIG.act2.magnetism.motor.max) {
        // 힘이 너무 크다: 천장에 쾅 부딪히고 전류가 끊겨 천천히 내려온다 (총괄지시 2막리뷰 43번)
        Sound.play('sfx_push_impact');
        Sound.stopLoop('sfx_motor_hum');
        this.cameras.main.shake(350, 0.01);
        this.power = false;
        this.message.setText(`쾅! 너무 빨라 천장에 부딪혔다 — 힘 ${mo.force} (승강기는 ${GAME_CONFIG.act2.magnetism.motor.need} 이상 ${GAME_CONFIG.act2.magnetism.motor.max} 이하에서만 안전하다)`).setColor('#ff9a9a');
      } else if (this.liftY >= L.top && before < L.top) {
        Sound.play('sfx_elevator_stop');
        Sound.stopLoop('sfx_motor_hum');
        this.liftReady = true;
        Save.setChapter(this.scene.key, { liftReady: true, turns: this.turns, magnet: this.magnet, currentDir: this.dir, safeTurns: this.turns, safeMagnet: this.magnet });
        this.message.setText(`승강기가 올라갔다! 힘 ${mo.force} — 빠르기 ${mo.speed.toFixed(2)} m/s`).setColor(UIKit.SKY);
        if (!this.flags.liftTalk) { this.flags.liftTalk = true; this.say('lift_up'); }
      }
    } else if (!this.power || cursed) {
      this.liftY = Math.max(0, this.liftY - L.brake * dt);
      if (before > 0 && this.liftY === 0) Sound.play('sfx_elevator_stop');
    }
    const y = this.groundY - this.liftY * PX;
    this.platform.y = y;
    this.rope.height = Math.max(1, y - MANIFEST.objects.elevator_platform.height);
  }

  // ------------------------------------------------------------------ 전자석 함정 전투 (ACT2_PLAN 5단계 6번)
  // V: 함정 전류 켜기·끄기 — 켜져 있는 동안만 함정 위의 철갑 기사가 붙잡힌다(magnetism.trapHolds). 구리 병사는 안 잡힌다.
  // Q: 함정 전류 방향 바꾸기 — 극이 바뀌어도 철은 계속 끌린다. X: 지팡이 번개.
  canLeave() {
    return !!Save.chapter(this.scene.key).examPassed;
  }

  startBattle() {
    if (this.battle) return;
    if (this.dialogue.active) { this.time.delayedCall(500, () => this.startBattle()); return; }
    if (this.power) this.togglePower();
    this.ian.x = this.cfg.battle.ianX;
    this.ian.setFlipX(false);
    this.garon.x = this.cfg.battle.ianX - 90;
    this.cameras.main.flash(250, 255, 255, 255);
    this.battle = { wave: 0, enemies: [], done: false };
    this.ianHp = 1;
    this.fireT = 0;
    this.trapOn = false;
    this.trapDir = 1;
    this.setMusicMode('battle');
    this.helpText.setText('← → 걷기   X 지팡이 번개   V 전자석 함정 켜기·끄기   Q 함정 전류 방향   M 마법서');
    const kb = this.input.keyboard;
    this.fireKey = kb.addKey('X');
    kb.addCapture(['X', 'V', 'Q']);
    kb.on('keydown-V', () => this.toggleTrap());
    kb.on('keydown-Q', () => this.flipTrap());
    this.boltG = this.add.graphics().setDepth(7);
    this.worldLayer.add(this.boltG);
    this.say('battle_start', () => {
      this.introKey('V', '전자석 함정 켜기·끄기');
      this.time.delayedCall(3300, () => this.introKey('Q', '함정 전류 방향 바꾸기'));
      this.spawnWave();
    });
  }

  spawnWave() {
    const B = this.cfg.battle, BT = this.battle;
    for (const e of BT.enemies) if (e.s.active) e.s.destroy();
    BT.enemies = [];
    BT.wave += 1;
    if (BT.wave > B.waves.length) { this.endBattle(); return; }
    B.waves[BT.wave - 1].forEach((kind, i) => {
      const c = B[kind];
      const s = Characters.create(this, kind === 'knight' ? 'iron_knight' : 'copper_soldier', B.startX + i * B.gap, this.groundY, 'walk').setDepth(5);
      this.worldLayer.add(s);
      BT.enemies.push({ s, kind, hp: c.hp, max: c.hp, cool: 1.5 + i * 0.5, held: false });
    });
  }

  endBattle() {
    this.battle.done = true;
    Sound.stopAllLoops();   // 전투 중 켜진 반복 소리가 시험·다음 층까지 남지 않게 (총괄지시 61번)
    this.boltG.clear();
    if (this.trapOn) this.toggleTrap();
    this.setMusicMode(null);
    this.helpText.setText('← → 걷기   Z 전동기·방향 스위치·석상·승강기   M 마법서');
    Save.setChapter(this.scene.key, { battleDone: true });
    this.say('battle_done', () => {
      this.message.setText('철갑 기사와 구리 병사를 모두 물리쳤다!').setColor(UIKit.SKY);
      this.examBtn = this.showExamIntro(() => this.startExam());
    });
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      if (this.examBtn) this.examBtn.setVisible(false);
      Save.setChapter(this.scene.key, { examPassed: true });
      this.message.setText('2-5 전류의 자기 작용 — 마법서 시험 통과! 승강기에 올라 Z로 6층까지').setColor(UIKit.SKY);
    });
  }

  toggleTrap() {
    if (!this.battle || this.battle.done || this.isBlocked()) return;
    this.trapOn = !this.trapOn;
    const O = MANIFEST.objects;
    this.trap.setTexture(O.electromagnet_trap.states[this.trapOn ? 'on' : 'off']);
    this.trapGlow.setVisible(this.trapOn);
    Sound.play(this.trapOn ? 'sfx_electromagnet_on' : 'sfx_electromagnet_off');
    this.message.setText(this.trapOn ? '전자석 함정 켬 — 철판이 자석이 되었다' : '전자석 함정 끔 — 붙잡혔던 기사가 풀려난다').setColor(this.trapOn ? UIKit.SKY : '#ffd27a');
  }

  flipTrap() {
    if (!this.battle || this.battle.done || this.isBlocked()) return;
    this.trapDir = -this.trapDir;
    Sound.play('sfx_switch_flip');
    const held = this.battle.enemies.some((e) => e.held);
    this.message.setText(this.trapOn ? `함정 전류 방향을 바꿨다 — ${held ? '철갑 기사는 여전히 붙잡혀 있다!' : '철은 극이 바뀌어도 끌린다'}` : '함정 전류 방향을 바꿨다 (지금은 꺼져 있음)').setColor(UIKit.SKY);
    if (this.trapOn && !this.flags.flipTalk) { this.flags.flipTalk = true; this.say('trap_flip'); }
  }

  onTrap(x) {
    const t = this.cfg.trapRange;
    return x >= t[0] && x <= t[1];
  }

  fireStaff() {
    const S = this.cfg.battle.staff, PX = this.PX;
    if (this.fireT > 0 || this.actT > 0) return;
    this.fireT = S.every;
    const dir = this.ian.flipX ? -1 : 1;
    const e = this.battle.enemies.filter((o) => !o.gone && Math.sign(o.s.x - this.ian.x) === dir && Math.abs(o.s.x - this.ian.x) <= S.range * PX)
      .sort((a, b) => Math.abs(a.s.x - this.ian.x) - Math.abs(b.s.x - this.ian.x))[0];
    Characters.play(this.ian, 'attack_lightning', false);
    this.actT = 0.3;
    Sound.play('sfx_bolt_thin');
    const x0 = this.ian.x + dir * 60, y0 = this.ian.y - 130;
    const x1 = e ? e.s.x : x0 + dir * S.range * PX, y1 = e ? e.s.y - 140 : y0;
    const pts = [{ x: x0, y: y0 }];
    for (let i = 1; i < 7; i++) pts.push({ x: x0 + (x1 - x0) * i / 7, y: y0 + (y1 - y0) * i / 7 + (Math.random() - 0.5) * 30 });
    pts.push({ x: x1, y: y1 });
    this.boltG.clear().lineStyle(6, 0xffe9a0, 0.45).strokePoints(pts).lineStyle(2, 0xfffbe6, 1).strokePoints(pts);
    this.time.delayedCall(120, () => this.boltG.clear());
    if (!e) return;
    e.hp -= S.damage;
    if (e.hp <= 0) { e.gone = true; e.held = false; e.s.clearTint(); Characters.play(e.s, 'defeat', false); Sound.play('sfx_push_impact'); return; }
    if (!e.held) Characters.play(e.s, 'hurt', false);
    Sound.play('sfx_troll_hurt');
  }

  updateBattle(dt) {
    const BT = this.battle;
    if (!BT || BT.done || !BT.wave) return;
    const B = this.cfg.battle, PX = this.PX;
    this.fireT = Math.max(0, this.fireT - dt);
    if (this.fireKey.isDown && !this.isBlocked()) this.fireStaff();
    for (const e of BT.enemies) {
      if (e.gone) continue;
      const c = B[e.kind], d = this.ian.x - e.s.x;
      e.s.setFlipX(d > 0);   // 그림은 왼쪽을 본다
      // 함정: 켜져 있는 동안 그 위의 철갑 기사만 붙잡힌다 (방향과 상관없이)
      const held = this.onTrap(e.s.x) && Magnetism.trapHolds(e.kind === 'knight' ? 'iron' : 'copper', { on: this.trapOn });
      if (held !== e.held) {
        e.held = held;
        if (held) { Characters.play(e.s, 'magnet_dragged'); e.s.setTint(0x9fe0ff); Sound.play('sfx_armor_drag'); }
        else { e.s.clearTint(); Characters.play(e.s, 'walk'); e.cool = Math.max(e.cool, 0.8); }
      }
      if (e.held) continue;
      if (this.trapOn && e.kind === 'soldier' && this.onTrap(e.s.x) && !this.flags.copperTrap) {
        this.flags.copperTrap = true;
        this.message.setText('구리 갑옷 병사는 전자석에 붙잡히지 않는다!').setColor('#ffd27a');
      }
      if (Math.abs(d) > c.attackRange * PX) {
        e.s.x += Math.sign(d) * c.speed * PX * dt;
        if (!e.s.anims.isPlaying) Characters.play(e.s, 'walk');
      } else if (!e.s.anims.isPlaying) Characters.play(e.s, 'idle');
      e.cool -= dt;
      if (e.cool <= 0 && Math.abs(d) <= c.attackRange * PX) {
        e.cool = c.attackEvery;
        Characters.play(e.s, 'attack', false);
        this.ianHp = Math.max(0, this.ianHp - c.damage);
        if (this.hud) this.hud.set('health', this.ianHp);
        Sound.play('sfx_ian_hurt');
        if (this.ianHp <= 0) { this.battleLost(); return; }
      }
    }
    if (!BT.waiting && BT.enemies.length && BT.enemies.every((e) => e.gone)) {
      BT.waiting = true;
      this.time.delayedCall(1200, () => { BT.waiting = false; this.spawnWave(); });
    }
  }

  battleLost() {
    const BT = this.battle;
    for (const e of BT.enemies) if (e.s.active) e.s.destroy();
    BT.enemies = [];
    BT.wave -= 1;
    this.ianHp = 1;
    if (this.hud) this.hud.set('health', 1);
    this.message.setText('이안이 쓰러졌다… 이 무리를 처음부터').setColor('#ff9a9a');
    this.cameras.main.flash(400, 40, 0, 0);
    this.time.delayedCall(1500, () => this.spawnWave());
  }

  updateBattleText() {
    const BT = this.battle, B = this.cfg.battle;
    this.speedPanel.setLines([
      `전자석 함정: ${this.trapOn ? `켬 (전류 ${this.trapDir > 0 ? '→' : '←'})` : '끔'} — 켜져 있을 때만 철을 붙잡음, 방향을 바꿔도 철은 끌림`,
      ...BT.enemies.filter((e) => !e.gone).map((e) => (e.kind === 'knight' ? `철갑 기사 (강자성)${e.held ? ' — 붙잡힘' : ''}` : '구리 갑옷 병사 (반자성 — 안 잡힘)') + `: ${Math.ceil(e.hp)} / ${e.max}`),
      `X 지팡이 번개 ${B.staff.damage}   무리 ${Math.max(1, BT.wave)} / ${B.waves.length}`,
    ]);
  }

  // 시험을 통과하면 승강기에 올라 Z — 고른 코일·자석으로 6층까지 올라간다
  rideElevator() {
    if (this.flags.riding) return;
    this.flags.riding = true;
    const sv = Save.chapter(this.scene.key);   // 성공했던(안전한) 코일·자석으로 탄다
    const mo = Magnetism.motor(sv.safeTurns || this.turns, sv.safeMagnet || this.magnet, 1);
    this.rideSpeed = Math.max(mo.lifts ? mo.speed : 0, GAME_CONFIG.act2.magnetism.motor.minSpeed) * 2;   // 이미 올려 본 승강기 — 나가는 연출은 두 배 빠르게
    Sound.startLoop('sfx_motor_hum');
    this.ian.x = this.cfg.elevator.x;
    this.garon.x = this.cfg.elevator.x - 70;
    this.standOnPlatform();
    Characters.play(this.garon, 'idle');
    this.message.setText('승강기를 타고 6층 봉화대로!').setColor(UIKit.SKY);
  }

  // 타는 동안 이안·가론의 발 기준점 = 승강기 바닥 그림의 윗면 (바닥 그림 기준점은 아래 모서리라 그대로 두면 파묻혀 보였다, 총괄지시 67번)
  standOnPlatform() {
    const P = MANIFEST.objects.elevator_platform;
    const top = this.platform.y - P.pivot.y + this.cfg.elevator.topY;
    this.ian.y = top;
    this.garon.y = top;
  }

  // 석상 앞 Z: 저주에서는 입이 텅 빈 석상일 뿐, 해방 뒤에는 스피커 부품을 끼운다
  useStatue() {
    if (this.curse.cursed) { this.message.setText('석상의 입 자리가 텅 비어 있다…').setColor('#c79bff'); return; }
    if (this.speakerDone) { Characters.play(this.statue, 'talk'); Sound.play('sfx_statue_voice'); this.time.delayedCall(1500, () => Characters.play(this.statue, 'speaker_on')); return; }
    const open = () => this.speakerPanel.open(() => this.onSpeakerDone());
    if (this.flags.statueTalked) { open(); return; }
    this.flags.statueTalked = true;
    this.say('statue_silent', open);
  }

  // 스피커 완성: 석상이 입을 열고 말한다 (sfx_statue_voice, 대사는 글로)
  onSpeakerDone() {
    this.speakerDone = true;
    Save.setChapter(this.scene.key, { speakerDone: true });
    Characters.play(this.statue, 'speaker_on');
    this.time.delayedCall(600, () => {
      Characters.play(this.statue, 'talk');
      Sound.play('sfx_statue_voice');
      this.say('statue_talk', () => {
        Characters.play(this.statue, 'speaker_on');
        this.message.setText('석상이 목소리를 되찾았다!').setColor(UIKit.SKY);
      });
    });
  }

  // 코일·자석을 고른 뒤 전류를 켠다 (MotorPanel에서)
  runMotor(turns, magnet) {
    this.turns = turns;
    this.magnet = magnet;
    this.flags.stuckMsg = false;
    Save.setChapter(this.scene.key, { turns, magnet });
    if (!this.power) this.togglePower();
  }

  // 전선과 전류(빛 점이 전류 방향으로 움직인다)
  drawWire(dt, cursed) {
    const cfg = this.cfg, g = this.wire, y = this.wireY;
    const x0 = cfg.motorX + 40, x1 = cfg.compassX + 90;
    g.clear().lineStyle(5, 0xb87333, 1).lineBetween(x0, y, x1, y).lineBetween(x0, y, x0, this.groundY - 60).lineBetween(x1, y, x1, this.groundY);
    if (!this.power) return;
    this.dotT = ((this.dotT || 0) + dt * 0.8) % 1;
    g.fillStyle(cursed ? 0xc79bff : 0xffe08a, 1);
    for (let i = 0; i < 6; i++) {
      const k = (i / 6 + this.dotT * this.dir + 1) % 1;
      g.fillCircle(x0 + (x1 - x0) * k, y, 5);
    }
  }

  updatePanel(mo) {
    const need = GAME_CONFIG.act2.magnetism.motor.need;
    const lines = [
      `전류: ${this.power ? (this.dir > 0 ? '켬 (→ 방향, 승강기 올라가는 쪽)' : '켬 (← 방향, 내려가는 쪽)') : '끔'}`,
      `나침반: ${this.curse.cursed || !this.power ? '전류 없음 — 그대로' : this.dir > 0 ? '오른쪽으로 90° 돌아감' : '왼쪽으로 90° 돌아감'}`,
      `전동기 힘 = 감은 수 × 자석 세기 (전류는 같음) = ${this.turns} × ${GAME_CONFIG.act2.magnetism.motor.magnets[this.magnet]} = ${mo.force} (안전 범위 ${need} ~ ${GAME_CONFIG.act2.magnetism.motor.max})`,
    ];
    if (!this.curse.cursed && mo.force > GAME_CONFIG.act2.magnetism.motor.max) lines.push(`힘이 ${GAME_CONFIG.act2.magnetism.motor.max}을 넘어 너무 빠르다 — 천장에 부딪힌다   승강기 높이 ${this.liftY.toFixed(2)} m`);
    else if (!this.curse.cursed) lines.push(mo.force >= need ? `올라가는 빠르기 = 최소 ${GAME_CONFIG.act2.magnetism.motor.minSpeed}, (힘 − ${need}) × ${GAME_CONFIG.act2.magnetism.motor.speedPerForce} 중 큰 값 = ${Math.abs(Magnetism.motor(this.turns, this.magnet, 1).speed).toFixed(2)} m/s   승강기 높이 ${this.liftY.toFixed(2)} m`
      : `힘이 ${need}보다 작아 승강기를 올리지 못한다   승강기 높이 ${this.liftY.toFixed(2)} m`);
    this.speedPanel.setLines(lines);
  }
}
window.LiftScene = LiftScene;

// ------------------------------------------------------------------ 진실의 원 실험: 전선 둘레의 나침반 (ACT2_PLAN 5단계 2번)
// 전류가 흐르는 상태로 시작한다: ① 한 방향 — 둘레의 나침반들이 도선을 빙 둘러싸는 방향으로 선다 ② 방향 바꾸기 — 모두 반대로.
// (총괄지시 66번: 전류가 없을 때 북쪽을 가리키는 장면은 뺀다 — 실제로는 지구 자기장과 합쳐진 방향이라 처음 배울 때 헷갈림)
class CompassLab {
  static STEPS = [
    { current: 1, text: '전류를 흘렸다 → 바늘들이 도선을 빙 둘러싸는 방향으로 섰다' },
    { current: -1, text: '전류 방향을 바꿨다 → 바늘들이 모두 반대로 돌았다' },
  ];
  static COUNT = 6;     // 도선 둘레 나침반 수
  static RING = 230;    // 도선에서 나침반까지 (px)

  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const O = MANIFEST.objects;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 60, '진실의 원 — 전선 둘레의 나침반', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    this.help = UIKit.text(scene, 960, 118, '', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5);
    c.add(this.help);
    // 위에서 내려다본 모습: 바닥을 뚫고 세로로 지나가는 전선(점) 둘레에 나침반을 원 모양으로 놓았다
    //   전류가 화면 안쪽(⊗)으로 흐르면 자기장은 시계 방향, 밖(⊙)으로 흐르면 반시계 방향.
    //   나침반 바늘 = 도선 위쪽 나침반의 각도(Magnetism.compassAngle) + 그 나침반이 놓인 자리만큼 돌린 것
    this.cx = 760; this.cy = 600;
    this.field = scene.add.graphics();
    c.add(this.field);
    this.wireDot = scene.add.graphics();
    c.add(this.wireDot);
    c.add(UIKit.text(scene, this.cx, this.cy - CompassLab.RING - 110, '위에서 내려다본 모습', { fontSize: '26px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0.5));
    this.wireLabel = UIKit.text(scene, this.cx, this.cy + CompassLab.RING + 75, '', { fontSize: '24px' }).setOrigin(0.5, 0);
    c.add(this.wireLabel);
    this.compasses = [];
    for (let i = 0; i < CompassLab.COUNT; i++) {
      const deg = -90 + i * 360 / CompassLab.COUNT;   // 맨 위부터 시계 방향
      const a = Phaser.Math.DegToRad(deg);
      const x = this.cx + Math.cos(a) * CompassLab.RING, y = this.cy + Math.sin(a) * CompassLab.RING;
      c.add(scene.add.image(x, y, O.compass.key).setScale(1.3));
      const needle = scene.add.image(x, y, O.compass_needle.key).setScale(1.3);
      c.add(needle);
      this.compasses.push({ needle, offset: deg + 90 });
    }
    this.results = UIKit.text(scene, 1500, 560, '', { fontSize: '26px', align: 'left', lineSpacing: 12, wordWrap: { width: 520 } }).setOrigin(0.5, 0.5);
    c.add(this.results);
    this.info = UIKit.text(scene, 960, 180, '', { fontSize: '28px', align: 'center' }).setOrigin(0.5, 0);
    c.add(this.info);
    scene.input.keyboard.on('keydown-SPACE', () => this.next());
    scene.input.keyboard.on('keydown-ESC', () => this.close());
    // 직접 조작: 2 방향 바꾸기 (Space도 같음)
    scene.input.keyboard.on('keydown-TWO', () => this.isOpen && this.flip());
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  needleTarget(k) {
    return Magnetism.compassAngle(this.current) + k.offset;   // 진실의 원 안: 진짜 법칙
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.step = 0;
    this.current = CompassLab.STEPS[0].current;   // 전류가 흐르는 상태로 시작
    this.t = 0;
    this.lines = [CompassLab.STEPS[0].text];
    this.compasses.forEach((k) => k.needle.setAngle(this.needleTarget(k)));
    this.container.setVisible(true);
    this.results.setText(this.lines.join('\n'));
    this.help.setText('2 또는 Space: 전류 방향 바꾸기    Esc: 닫기');
    this.info.setText(CompassLab.STEPS[0].text).setColor(UIKit.SKY);
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  next() {
    if (this.isOpen) this.flip();
  }

  // 전류 방향 바꾸기. 한 번 바꿔 보면(두 장면을 다 보면) 실험 끝 — 그 뒤에도 몇 번이든 바꿔 볼 수 있다
  flip() {
    if (!this.isOpen || this.t < 0.6) return false;
    this.current = -this.current;
    this.t = 0;
    Sound.play('sfx_switch_flip');
    this.info.setText('전류 방향을 바꿨다…').setColor('#ffe08a');
    // 바늘이 움직이는 것을 1초 먼저 보여 준 뒤 결과 글 (총괄지시 2막리뷰 32번)
    this.scene.time.delayedCall(1000, () => {
      if (!this.isOpen) return;
      const st = CompassLab.STEPS[1];
      if (this.lines.length < 2) { this.lines.push(st.text); this.results.setText(this.lines.join('\n')); }
      this.info.setText(st.text).setColor(UIKit.SKY);
      if (!this.done) {
        this.done = true;
        this.help.setText('');
        this.scene.time.delayedCall(1600, () => this.info.setText('전류가 흐르는 도선 둘레에는 도선을 빙 둘러싸는 자기장이 생긴다 — 방향을 바꾸면 자기장도 반대로').setColor(UIKit.SKY));
        UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
      }
    });
    return true;
  }

  update(dt) {
    if (!this.isOpen) return;
    const prevT = this.t;
    this.t += dt;
    for (const k of this.compasses) {
      const target = this.needleTarget(k);
      k.needle.angle += Phaser.Math.Angle.ShortestBetween(k.needle.angle, target) * Math.min(1, dt * 4);
    }
    if (prevT < 0.4 && this.t >= 0.4 && this.step >= 0 && prevT > 0) Sound.play('sfx_compass_tick');
    // 전선(점)과 자기장 동심원: 전류 방향에 따라 화살표 방향이 바뀐다
    const g = this.field, w = this.wireDot;
    g.clear();
    w.clear().fillStyle(0xb87333, 1).fillCircle(this.cx, this.cy, 22);
    this.wireLabel.setText(this.current > 0 ? '전선 — ⊗ 전류가 화면 안쪽으로' : '전선 — ⊙ 전류가 화면 밖으로');
    if (this.current > 0) w.lineStyle(4, 0xffe08a, 1).lineBetween(this.cx - 9, this.cy - 9, this.cx + 9, this.cy + 9).lineBetween(this.cx - 9, this.cy + 9, this.cx + 9, this.cy - 9);
    else w.fillStyle(0xffe08a, 1).fillCircle(this.cx, this.cy, 8);
    const spin = this.current * this.t * 0.8;
    for (const r of [110, 170, 300]) {
      g.lineStyle(3, 0x9fe0ff, 0.5).strokeCircle(this.cx, this.cy, r);
      for (let i = 0; i < 4; i++) {
        const a = spin + i * Math.PI / 2, x = this.cx + Math.cos(a) * r, y = this.cy + Math.sin(a) * r;
        const tx = -Math.sin(a) * this.current, ty = Math.cos(a) * this.current;   // 원을 따라가는 방향
        g.fillStyle(0x9fe0ff, 0.9).fillTriangle(x + tx * 14, y + ty * 14, x - ty * 8, y + tx * 8, x + ty * 8, y - tx * 8);
      }
    }
  }
}
window.CompassLab = CompassLab;

// ------------------------------------------------------------------ 전동기 부품 고르기 (ACT2_PLAN 5단계 4번)
// 코일(3·6·12번 감음)과 자석(작음 1 / 중간 2 / 큼 4)을 마우스로 누르거나 1·2·3 / 4·5·6 키로 고르고, Space로 전류를 켠다.
// 힘(= 감은 수 × 자석 세기)은 직접 보여 주지 않고, 감은 수와 자석 세기만 보여 준다 (계산은 학생 몫, 교사용 표시에는 나온다).
class MotorPanel {
  static COILS = [['few', 3], ['normal', 6], ['many', 12]];
  static MAGNETS = [['small', '작음'], ['medium', '중간'], ['large', '큼']];

  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const O = MANIFEST.objects, M = GAME_CONFIG.act2.magnetism.motor;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 0.94).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 70, '전동기 부품 고르기', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    c.add(UIKit.text(scene, 960, 128, '코일과 자석을 고른 뒤 Space로 전류를 켜자 (전류는 늘 같다)    Esc: 닫기', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5));
    const row = (y, title, items, pick, how) => {
      c.add(UIKit.text(scene, 260, y - 18, title, { fontSize: '30px', fontStyle: 'bold' }).setOrigin(0, 0.5));
      c.add(UIKit.text(scene, 260, y + 22, how, { fontSize: '20px', color: '#cfe3f5', wordWrap: { width: 300 } }).setOrigin(0, 0.5));   // 조작 설명 (총괄지시 50번)
      return items.map((it, i) => {
        const x = 760 + i * 380;
        const box = scene.add.rectangle(x, y, 320, 200, 0x0b1a28, 1).setStrokeStyle(3, 0x4a6680).setInteractive({ useHandCursor: true });
        const img = scene.add.image(x, y - 20, it.key).setScale(it.scale);
        const label = UIKit.text(scene, x, y + 70, it.label, { fontSize: '26px' }).setOrigin(0.5);
        box.on('pointerdown', () => pick(i));
        c.add([box, img, label]);
        return box;
      });
    };
    this.coilBoxes = row(330, '코일', MotorPanel.COILS.map(([st, n], i) => ({ key: O.coil.states[st], scale: 2, label: `${i + 1}   ${n}번 감음` })), (i) => this.pickCoil(i), '마우스로 누르거나 1·2·3');
    this.magBoxes = row(600, '자석', MotorPanel.MAGNETS.map(([m, name], i) => ({ key: O['bar_magnet_' + m].key, scale: 2, label: `${i + 4}   ${name} (세기 ${M.magnets[m]})` })), (i) => this.pickMagnet(i), '마우스로 누르거나 4·5·6');
    this.info = UIKit.text(scene, 960, 800, '', { fontSize: '30px', align: 'center' }).setOrigin(0.5);
    c.add(this.info);
    const go = UIKit.text(scene, 960, 900, '전류 켜기 (Space 또는 마우스)', { fontSize: '32px', fontStyle: 'bold', color: '#1a0e08', backgroundColor: '#ffe08a', padding: { x: 24, y: 12 } })
      .setOrigin(0.5).setInteractive({ useHandCursor: true });
    go.on('pointerdown', () => this.run());
    c.add(go);
    const kb = scene.input.keyboard;
    ['ONE', 'TWO', 'THREE'].forEach((k, i) => kb.on('keydown-' + k, () => this.isOpen && this.pickCoil(i)));
    ['FOUR', 'FIVE', 'SIX'].forEach((k, i) => kb.on('keydown-' + k, () => this.isOpen && this.pickMagnet(i)));
    kb.on('keydown-SPACE', () => this.isOpen && this.run());
    kb.on('keydown-ESC', () => this.close());
  }

  open() {
    const s = this.scene;
    this.coil = Math.max(0, MotorPanel.COILS.findIndex(([, n]) => n === s.turns));
    this.mag = Math.max(0, MotorPanel.MAGNETS.findIndex(([m]) => m === s.magnet));
    this.isOpen = true;
    this.justOpened = true;   // 열 때 누른 키로 바로 켜지지 않게
    s.time.delayedCall(150, () => { this.justOpened = false; });
    this.container.setVisible(true);
    Sound.play('sfx_ui_click');
    this.refresh();
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  pickCoil(i) { this.coil = i; Sound.play('sfx_ui_click'); this.refresh(); }
  pickMagnet(i) { this.mag = i; Sound.play('sfx_ui_click'); this.refresh(); }

  refresh() {
    this.coilBoxes.forEach((b, i) => b.setStrokeStyle(i === this.coil ? 6 : 3, i === this.coil ? 0xffe08a : 0x4a6680));
    this.magBoxes.forEach((b, i) => b.setStrokeStyle(i === this.mag ? 6 : 3, i === this.mag ? 0xffe08a : 0x4a6680));
    const M = GAME_CONFIG.act2.magnetism.motor;
    const [, n] = MotorPanel.COILS[this.coil], [m, name] = MotorPanel.MAGNETS[this.mag];
    this.info.setText(`코일 ${n}번 감음 · 자석 ${name}(세기 ${M.magnets[m]})`).setColor('#ffe08a');
  }

  run() {
    if (!this.isOpen || this.justOpened) return;
    const turns = MotorPanel.COILS[this.coil][1], magnet = MotorPanel.MAGNETS[this.mag][0];
    this.close();
    this.scene.runMotor(turns, magnet);
  }
}
window.MotorPanel = MotorPanel;

// ------------------------------------------------------------------ 석상 스피커 만들기 (ACT2_PLAN 5단계 5번)
// 부품 셋(자석·코일·진동판)을 마우스로 끌어 석상 입 자리에 넣는다 (1·2·3 키로도 넣고 빼기). 넣은 부품을 누르면 다시 뺀다.
// Space(또는 단추)로 전기 신호를 보내면 — 셋이 다 있어야 소리가 난다. 하나라도 없으면 잡음조차 나지 않는다.
class SpeakerPanel {
  static PARTS = [['magnet', '자석'], ['coil', '코일'], ['cone', '진동판']];

  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const O = MANIFEST.objects;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 0.94).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 70, '석상의 입 — 스피커 만들기', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    c.add(UIKit.text(scene, 960, 128, '부품을 끌어 입 자리에 넣자 (1·2·3 키로도)  ·  Space: 전기 신호 보내기    Esc: 닫기', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5));
    // 입 자리
    this.slot = new Phaser.Geom.Rectangle(560, 260, 800, 300);
    c.add(scene.add.rectangle(960, 410, 800, 300, 0x0b1a28, 1).setStrokeStyle(4, 0x9fe0ff));
    c.add(UIKit.text(scene, 960, 280, '석상의 입 (스피커 자리)', { fontSize: '24px', color: UIKit.SKY }).setOrigin(0.5, 0));
    this.assembled = scene.add.image(960, 480, O.speaker_assembled.key).setOrigin(0.5, 1).setScale(3).setVisible(false);
    c.add(this.assembled);
    c.add(UIKit.text(scene, 960, 640, '부품 상자 — 마우스로 끌어 넣거나 1·2·3 (다시 누르면 빼기)', { fontSize: '26px', fontStyle: 'bold' }).setOrigin(0.5));
    // 부품: 상자 자리(home)와 입 자리(inX)
    this.parts = SpeakerPanel.PARTS.map(([id, name], i) => {
      const home = { x: 660 + i * 300, y: 760 }, inPos = { x: 720 + i * 240, y: 420 };
      const img = scene.add.image(home.x, home.y, O['speaker_part_' + id].key).setScale(2.4).setInteractive({ useHandCursor: true, draggable: true });
      const label = UIKit.text(scene, home.x, home.y + 80, `${i + 1}   ${name}`, { fontSize: '24px' }).setOrigin(0.5, 0);   // 숫자 키 (총괄지시 50번)
      c.add([img, label]);
      const p = { id, name, img, label, home, inPos, inside: false };
      img.on('drag', (pt, x, y) => img.setPosition(x, y));
      img.on('dragend', () => this.place(p, this.slot.contains(img.x, img.y)));
      img.on('pointerup', (pt) => { if (p.inside && pt.getDistance() < 8) this.place(p, false); });
      return p;
    });
    this.info = UIKit.text(scene, 960, 900, '', { fontSize: '30px', align: 'center' }).setOrigin(0.5);
    c.add(this.info);
    const go = UIKit.text(scene, 960, 990, '전기 신호 보내기 (Space 또는 마우스)', { fontSize: '30px', fontStyle: 'bold', color: '#1a0e08', backgroundColor: '#ffe08a', padding: { x: 24, y: 10 } })
      .setOrigin(0.5).setInteractive({ useHandCursor: true });
    go.on('pointerdown', () => this.signal());
    c.add(go);
    const kb = scene.input.keyboard;
    ['ONE', 'TWO', 'THREE'].forEach((k, i) => kb.on('keydown-' + k, () => { if (this.isOpen && !this.done) this.place(this.parts[i], !this.parts[i].inside); }));
    kb.on('keydown-SPACE', () => this.isOpen && this.signal());
    kb.on('keydown-ESC', () => this.close());
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.justOpened = true;
    this.scene.time.delayedCall(150, () => { this.justOpened = false; });
    this.assembled.setVisible(false);
    for (const p of this.parts) this.place(p, false, true);
    this.info.setText('자석·코일·진동판 — 어떤 부품이 있어야 소리가 날까?').setColor('#ffe08a');
    this.container.setVisible(true);
    Sound.play('sfx_ui_click');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  place(p, inside, quiet) {
    p.inside = inside;
    const pos = inside ? p.inPos : p.home;
    p.img.setPosition(pos.x, pos.y).setVisible(true);
    p.label.setPosition(pos.x, pos.y + 80);
    if (!quiet) Sound.play('sfx_ui_click');
  }

  signal() {
    if (!this.isOpen || this.done || this.justOpened) return;
    Sound.play('sfx_switch_flip');
    const missing = this.parts.filter((p) => !p.inside);
    if (missing.length) {
      // 하나라도 없으면 잡음조차 나지 않는다
      this.info.setText(`전기 신호를 보냈다… 아무 소리도 나지 않는다 (입 자리 부품 ${3 - missing.length}개)`).setColor('#ffd27a');
      return;
    }
    this.done = true;
    for (const p of this.parts) { p.img.setVisible(false); p.label.setVisible(false); }
    this.assembled.setVisible(true);
    Sound.play('sfx_statue_voice');
    this.info.setText('스피커 완성! 전기 신호가 코일을 흔들고, 진동판이 공기를 흔든다').setColor(UIKit.SKY);
    this.scene.time.delayedCall(2200, () => {
      for (const p of this.parts) p.label.setVisible(true);
      this.close();
      if (this.onDone) this.onDone();
    });
  }
}
window.SpeakerPanel = SpeakerPanel;
