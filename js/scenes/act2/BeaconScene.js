// 2-6 탑 꼭대기 봉화대 (ACT2_PLAN 6단계) — 배경 tower_top (3000px)
//
// 이번 묶음: 방 배치(바닥 코일과 작은 등불, 코일 문, 꺼진 봉화, 마을 등불 12곳, 자석 골렘) + 저주 이야기
//   + 진실의 원 실험(막대자석을 코일에 넣었다 뺐다) + 저주 해제. 계산은 js/physics/act2/induction.js
//   Z: 바닥 코일 앞이면 자석 흔들기, 진실의 원 안(저주)이면 실험
//   저주: 자석을 아무리 움직여도 등불이 안 켜진다(전선으로만 전해진다는 저주). 해방: 움직일 때만 켜지고 빠를수록 밝다.
//   학생 화면에는 "속력의 제곱에 비례"라고 쓰지 않는다 (총괄지시 2번)
//   둘째 묶음: 자석 골렘 보스전 — 해방 뒤 시작. 이안이 코일 문 반대편에 서면 골렘이 문을 지나 돌진한다.
//      지날 때마다 운동 에너지의 30%가 봉화로(induction.golemPass), 봉화가 차면 점화 → X 길게 눌러 축전기 상자로 마지막 일격.
//   셋째 묶음: 무선 전달 퍼즐 — 송신·수신 코일을 Z로 옮기고 C로 돌려 전달 정도가 기준을 넘으면 마을 등불 12곳이 차례로 켜진다
//      → 시험 12 → 2막 엔딩(Act2Ending).
class BeaconScene extends ChapterScene {
  constructor() {
    super('Ch2_6');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act2.ch2_6;
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
    // 먼 마을의 등불 12곳 (배경 그림 위 JSON 자리, 지금은 모두 꺼짐)
    const lamps = RAW_JSON && RAW_JSON.act2_objects ? RAW_JSON.act2_objects.scene_placements.tower_top.village_lamps : (cfg.villageLamps || []);
    this.villageLamps = lamps.map((l) => place('village_lamp', l.world_pivot[0], l.world_pivot[1], -2, 'off'));
    // 코일 문, 봉화대(꺼짐)
    this.gate = place('coil_gate', cfg.gateX, this.groundY, -1, 'off');
    this.gateGlow = place('coil_gate_glow', cfg.gateX, this.groundY, 0, 'glow').setBlendMode('ADD').setAlpha(0);
    this.beacon = place('beacon', cfg.beaconX, this.groundY, -1, 'off');
    // 봉화 불꽃(4프레임 반복)과 빛 — 불꽃 밑동을 봉화의 fire_mount_local에
    const fm = O.beacon.fire_mount_local || [100, 35];
    this.beaconFire = place('beacon_fire', cfg.beaconX - O.beacon.pivot.x + fm[0], this.groundY - O.beacon.pivot.y + fm[1], 0, '01').setVisible(false);
    this.beaconGlow = place('beacon_glow', cfg.beaconX, this.groundY, -1, 'on').setBlendMode('ADD').setVisible(false);
    this.fireFrame = 0;
    if (saved.beaconLit) { this.beaconFire.setVisible(true); this.beaconGlow.setVisible(true); }
    // 바닥 코일 + 막대자석 + 작은 등불(기둥은 엔진 그림) + 바늘(검류계, 엔진 그림)
    this.floorCoil = place('coil', cfg.floorCoilX, this.groundY, 1, 'many').setScale(1.4);
    // 자석 가운데 높이 = 코일 가운데 축 (바닥 − (60 − 30) × 1.4), 코일 앞쪽 반투명 사본으로 자석이 코일 속에 들어가 보이게 (총괄지시 51번)
    this.magnet = this.add.image(cfg.floorCoilX - 115, this.groundY - 30 * 1.4, O.bar_magnet_large.key).setDepth(2).setVisible(false);
    this.worldLayer.add(this.magnet);
    this.worldLayer.add(this.add.image(cfg.floorCoilX, this.groundY, O.coil.states.many).setOrigin(O.coil.pivot.x / O.coil.width, O.coil.pivot.y / O.coil.height).setScale(1.4).setDepth(2.5).setAlpha(0.55));
    const post = this.add.graphics().setDepth(0);
    post.lineStyle(4, 0x6b5a48, 1).lineBetween(cfg.floorCoilX + 110, this.groundY, cfg.floorCoilX + 110, this.groundY - 150);
    post.lineStyle(3, 0xb87333, 1).lineBetween(cfg.floorCoilX + 60, this.groundY - 30, cfg.floorCoilX + 110, this.groundY - 40);
    this.worldLayer.add(post);
    this.smallLamp = place('village_lamp', cfg.floorCoilX + 110, this.groundY - 175, 2, 'off').setScale(2.2);
    this.smallGlow = place('village_lamp_glow', cfg.floorCoilX + 110, this.groundY - 175, 3, 'on').setScale(2.2).setBlendMode('ADD').setAlpha(0);
    this.meterG = this.add.graphics().setDepth(3);
    this.worldLayer.add(this.meterG);
    this.current = 0;

    this.golem = Characters.create(this, 'magnet_golem', saved.bossDone ? cfg.boss.minX + 600 : cfg.golemX, this.groundY, saved.bossDone ? 'defeat' : 'idle').setDepth(3);
    this.worldLayer.add(this.golem);

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
    this.lab = new InductionLab(this, this.uiLayer);
    this.buildCoils(saved);
    kb.on('keydown-C', () => this.rotateCoil());
  }

  addPrompts() {
    const c = this.cfg;
    this.addPrompt({ key: 'Z', text: '코일과 막대자석 실험', x: () => this.cfg.circleX * this.PX, range: 1.8 * this.PX,
      when: () => this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x) });
    this.addPrompt({ key: 'Z', text: '자석 흔들기', x: c.floorCoilX + 50, range: 1.4 * this.PX, when: () => !this.boss || this.boss.done });
    this.addPrompt({ key: '', text: () => (this.coils.some((k) => k.carried) ? 'Z: 내려놓기  ·  C: 돌리기' : 'Z: 코일 들기  ·  C: 돌리기'),
      x: () => { const k = this.coils.find((o) => o.carried) || this.nearCoil(); return k ? (k.carried ? this.ian.x : k.x) : null; },
      when: () => this.bossDoneNow() && !this.wirelessDone });
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  onReady() {
    this.addPrompts();
    this.helpText = UIKit.text(this, 1900, 1070, '← → 걷기   Z 바닥 코일(자석 흔들기)   M 마법서', {
      fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(300);
    this.uiLayer.add(this.helpText);
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1136, 150);
    this.message.setText(this.curse.cursed ? 'Z: 바닥 코일 옆에서 자석을 흔들어 보자' : '');
    if (this.bossDoneNow()) this.helpText.setText('← → 걷기   Z 코일 들기·내려놓기   C 코일 돌리기   M 마법서');
    const saved = Save.chapter(this.scene.key);
    // 다시 들어왔을 때 봉화 불꽃 소리는 틀지 않는다 — 계속 들리면 '지지직' 잡음처럼 남았다 (총괄지시 68번)
    if (saved.wirelessDone && !saved.examPassed) this.examBtn = this.showExamIntro(() => this.startExam());
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 에너지와 신호는 전선으로만 전해진다? (코일 옆에서 자석을 움직여도 아무 일 없음)'
      : '진짜 법칙: 코일을 지나는 자기장이 변할 때만 전류가 유도된다 — 빨리 변할수록 크다';
  }

  near(x) {
    return Math.abs(this.ian.x - x) <= this.cfg.reach * this.PX;
  }

  // ------------------------------------------------------------------ Z
  interact() {
    if (this.boss && this.boss.done && this.charging) { this.charging = false; Sound.stopLoop('sfx_box_charge'); }   // 보스전이 끝났는데 모으기 상태가 남아 Z가 안 먹던 경우 (총괄지시 52번)
    if (this.isBlocked() || this.waveT > 0 || this.charging) return;
    const cfg = this.cfg;
    if (this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x)) {
      const open = () => this.lab.open(() => this.onLabDone());
      if (this.flags.labTalked) { open(); return; }
      this.flags.labTalked = true;
      this.say('lab_start', open);
      return;
    }
    if (this.bossDoneNow() && !this.wirelessDone && this.useCoil()) return;
    if (this.near(cfg.floorCoilX) || this.near(cfg.floorCoilX + 110)) this.waveMagnet();
  }

  // 바닥 코일 옆에서 막대자석을 두 번 넣었다 뺀다 (2초)
  waveMagnet() {
    this.waveT = 2;
    this.magnet.setVisible(true);
    Characters.play(this.ian, 'push', false);
    if (this.curse.cursed) {
      this.message.setText('자석을 흔들어도 등불은 꺼진 그대로다…').setColor('#c79bff');
      if (!this.flags.cursedWave) {
        this.flags.cursedWave = true;
        this.time.delayedCall(2300, () => this.say('cursed_wave', () => { this.lightCircle(); this.say('circle_found'); }));
      }
    } else {
      this.message.setText('자석이 움직이는 동안 등불이 깜빡이고 바늘이 흔들린다!').setColor(UIKit.SKY);
    }
  }

  lightCircle() {
    this.curse.setCircleActive(this.circle, true);
    this.circle.image.setAlpha(0);
    this.tweens.add({ targets: this.circle.image, alpha: 1, duration: 1200 });
    Sound.play('sfx_truth_circle_enter');
    Save.setChapter(this.scene.key, { circleLit: true });
    this.message.setText('코일 문 앞 바닥에 진실의 원이 나타났다! 가 보자').setColor('#ffe08a');
  }

  // 실험 뒤: 깨달음 → 저주 풀기(카드 12 + 마법서 12장) → 대사
  onLabDone() {
    this.realizing = true;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.message.setText('이제 진짜 법칙대로! 바닥 코일 옆에서 자석을 움직여 보자').setColor(UIKit.SKY);
        this.say('after_free', () => this.time.delayedCall(800, () => this.startBoss()));
      }));
    });
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const cfg = this.cfg, PX = this.PX;
    const busy = this.waveT > 0 || this.realizing || this.charging || this.actT > 0;
    this.actT = Math.max(0, (this.actT || 0) - dt);
    const dir = busy ? 0 : (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * cfg.walkSpeed * PX * dt, 60, this.worldW - 60);
    if (dir) this.ian.setFlipX(dir < 0);
    if (!busy) Characters.play(this.ian, dir ? 'walk' : 'idle');
    // 자석 흔들기: 위치 = 코일 왼쪽에서 들어갔다 나왔다, 속력 = 위치의 변화
    let v = 0;
    if (this.waveT > 0) {
      this.waveT = Math.max(0, this.waveT - dt);
      const w = Math.PI * 2 / 1.0, t = 2 - this.waveT, amp = cfg.waveSpeed / w;   // 최고 속력 waveSpeed
      v = cfg.waveSpeed * Math.sin(w * t);
      this.magnet.x = cfg.floorCoilX - 115 + amp * (1 - Math.cos(w * t)) * PX;
      if (this.waveT === 0) this.magnet.setVisible(false);
    }
    this.updateBoss(dt);
    // 해방 뒤 처음 들어왔을 때(저장된 상태)도 보스전
    if (!this.curse.cursed && !this.boss && !this.realizing && !this.dialogue.active && !Save.chapter(this.scene.key).bossDone && !this.flags.bossQueued && Save.chapter(this.scene.key).freed) {
      this.flags.bossQueued = true;
      this.time.delayedCall(1000, () => this.startBoss());
    }
    // 골렘이 바닥 코일 가까이서 움직이면 작은 등불도 깜빡인다 (계획서 1번)
    const B = this.cfg.boss;
    let vg = 0;
    if (this.golemV && Math.abs(this.golem.x - cfg.floorCoilX) <= B.flickerRange * PX) vg = this.golemV * B.flickerShare;
    this.current = Induction.coilCurrent(v + vg, { cursed: this.curse.cursed });
    this.drawLamp(this.current);
    // 봉화 불꽃 4프레임
    if (this.beaconFire.visible) {
      this.fireFrame = (this.fireFrame + dt * 8) % 4;
      this.beaconFire.setTexture(MANIFEST.objects.beacon_fire.states['0' + (1 + Math.floor(this.fireFrame))]);
    }
    this.updateCoils(dt);
    if (this.boss && !this.boss.done) this.updateBossText();
    else if (this.bossDoneNow()) this.updateWirelessText();
    else this.updatePanel(v);
  }

  // ------------------------------------------------------------------ 자석 골렘 보스전 (ACT2_PLAN 6단계 5번)
  // 골렘은 이안이 코일 문 반대편에 서 있으면 문을 지나 돌진한다. 문을 지날 때마다 운동 에너지의 일부(passShare)가 봉화로 가고
  // 그만큼 골렘이 느려진다(induction.golemPass — 교사용: 골렘 운동 에너지 + 봉화 에너지 = 처음 운동 에너지).
  // 같은 쪽에 있으면 다가와 주먹을 내리치고, 가끔 이안의 쇠붙이를 끌어당긴다. 봉화가 켜지면 X를 길게 눌러 축전기 상자에 모았다가 떼어 마지막 일격.
  startBoss() {
    if (this.boss) return;
    if (this.dialogue.active) { this.time.delayedCall(500, () => this.startBoss()); return; }
    const I = GAME_CONFIG.act2.induction;
    this.boss = { state: 'wait', t: 1.0, speed: I.golemStartSpeed, e0: Induction.kinetic(I.golemMass, I.golemStartSpeed), beaconE: 0, passes: [], punchT: 1.5, pullT: 5, lit: false, done: false };
    this.ianHp = 1;
    this.fill = 0;
    this.setMusicMode('boss');
    this.helpText.setText('← → 걷기   코일 문 반대편에 서서 골렘을 유인하기   X 길게: 축전기 상자 모으기 → 떼면 방출   M 마법서');
    const kb = this.input.keyboard;
    this.fireKey = kb.addKey('X');
    kb.addCapture(['X']);
    this.fireKey.on('down', () => { if (this.boss && !this.boss.done && !this.isBlocked()) { this.charging = true; this.fill = this.fill || 0; } });
    this.fireKey.on('up', () => this.releaseBox());
    this.bolt = this.add.graphics().setDepth(7);
    this.worldLayer.add(this.bolt);
    Sound.play('sfx_golem_roar');
    this.say('boss_start', () => this.introKey('X', '길게 누르기: 축전기 상자에 모으기 → 떼면 쏘기 (봉화가 켜진 뒤)'));
  }

  side(x) {
    return x < this.cfg.gateX ? -1 : 1;
  }

  // 골렘이 코일 문을 지났다: 에너지 일부가 봉화로, 골렘은 느려진다
  golemPass() {
    const B = this.boss;
    const r = Induction.golemPass(B.speed);
    B.beaconE += r.given;
    B.passes.push({ before: r.before, given: r.given, after: r.after, speedIn: B.speed, speedOut: Math.abs(r.speed) });
    B.speed = Math.abs(r.speed);
    const O = MANIFEST.objects;
    this.gate.setTexture(O.coil_gate.states.glow);
    this.gateGlow.setAlpha(Math.min(1, 0.4 + r.given / 800));
    this.tweens.add({ targets: this.gateGlow, alpha: 0, duration: 1200, delay: 300 });
    this.time.delayedCall(1200, () => this.gate.setTexture(O.coil_gate.states.off));
    Sound.play('sfx_coil_gate');
    this.beaconLevel = Math.min(1, B.beaconE / GAME_CONFIG.act2.induction.beaconFull);
    this.message.setText(`골렘이 코일 문을 지났다! 봉화에 전기가 쌓인다 — 내준 에너지만큼 골렘이 느려졌다`).setColor(UIKit.SKY);
    if (B.passes.length === 1) this.time.delayedCall(800, () => this.say('first_pass'));
    if (!B.lit && B.beaconE >= GAME_CONFIG.act2.induction.beaconFull) this.time.delayedCall(900, () => this.igniteBeacon());
  }

  igniteBeacon() {
    const B = this.boss;
    B.lit = true;
    this.beaconFire.setVisible(true);
    this.beaconGlow.setVisible(true).setAlpha(0);
    this.tweens.add({ targets: this.beaconGlow, alpha: 1, duration: 800 });
    Sound.play('sfx_beacon_ignite');
    // 봉화 불꽃 소리: 켜진 직후 몇 초만 들리고 사라진다 (총괄지시 68번 — 계속 틀어 두면 엔딩까지 '지지직' 잡음으로 남았다)
    const fire = this.cfg.beaconFire;
    this.time.delayedCall(1200, () => {
      Sound.startLoop('sfx_beacon_fire');
      this.time.delayedCall(fire.seconds * 1000, () => Sound.stopLoop('sfx_beacon_fire', fire.fadeSeconds));
    });
    Save.setChapter(this.scene.key, { beaconLit: true });
    this.message.setText('봉화가 켜졌다! 이제 X를 길게 눌러 축전기 상자에 모았다가 골렘에게 떼어 쏘자').setColor(UIKit.SKY);
    this.say('beacon_lit');
  }

  // X를 뗀다: 가득 모았고 골렘이 앞쪽 사거리 안이면 마지막 일격
  releaseBox() {
    const B = this.boss;
    if (!B || B.done || !this.charging) return;
    this.charging = false;
    Sound.stopLoop('sfx_box_charge');
    const F = this.cfg.boss.final, PX = this.PX, dir = this.ian.flipX ? -1 : 1;
    const ahead = Math.sign(this.golem.x - this.ian.x) === dir && Math.abs(this.golem.x - this.ian.x) <= F.range * PX;
    Characters.play(this.ian, 'box_charge_release', false);
    this.actT = 0.5;
    const x1 = ahead ? this.golem.x : this.ian.x + dir * F.range * PX;
    this.drawBossBolt(this.ian.x + dir * 50, this.ian.y - 120, x1, this.golem.y - 160, 2 + 10 * this.fill);
    Sound.play(this.fill > 0.2 ? 'sfx_box_discharge' : 'sfx_spark_small');
    if (!B.lit) {
      this.message.setText('번개가 골렘의 자석 몸에 흩어진다 — 먼저 봉화를 켜야 한다').setColor('#ffd27a');
    } else if (this.fill >= 1 && ahead) {
      this.defeatGolem();
    } else {
      this.message.setText(this.fill < 1 ? '아직 덜 모였다 — X를 더 길게 눌러 가득 모으자' : '골렘이 앞쪽 사거리 밖에 있다').setColor('#ffd27a');
    }
    this.fill = 0;
  }

  drawBossBolt(x0, y0, x1, y1, thick) {
    const g = this.bolt, pts = [{ x: x0, y: y0 }];
    for (let i = 1; i < 8; i++) pts.push({ x: x0 + (x1 - x0) * i / 8 + (Math.random() - 0.5) * 18, y: y0 + (y1 - y0) * i / 8 + (Math.random() - 0.5) * 40 });
    pts.push({ x: x1, y: y1 });
    g.clear().lineStyle(thick * 2, 0xffe9a0, 0.4).strokePoints(pts).lineStyle(thick, 0xfffbe6, 1).strokePoints(pts);
    this.time.delayedCall(180, () => g.clear());
  }

  defeatGolem() {
    const B = this.boss;
    B.done = true;
    B.state = 'down';
    // X를 누르고 있던 중 쓰러져도 축전기 상자 모으기 소리가 남지 않게 (총괄지시 68번)
    this.charging = false;
    this.fill = 0;
    Sound.stopLoop('sfx_box_charge');
    Characters.play(this.golem, 'defeat', false);
    Sound.play('sfx_golem_magnet_step');
    this.cameras.main.shake(500, 0.012);
    this.time.delayedCall(400, () => Sound.play('sfx_golem_magnet_step'));
    this.setMusicMode(null);
    this.helpText.setText('← → 걷기   M 마법서');
    Save.setChapter(this.scene.key, { bossDone: true, beaconLit: true });
    this.time.delayedCall(1500, () => this.say('boss_done', () => {
      this.message.setText('자석 골렘이 무릎을 꿇었다!').setColor(UIKit.SKY);
      this.helpText.setText('← → 걷기   Z 코일 들기·내려놓기   C 코일 돌리기   M 마법서');
      this.say('wireless_start', () => this.introKey('C', '코일 돌리기 (45°씩)'));
    }));
  }

  updateBoss(dt) {
    const B = this.boss;
    if (!B || B.done) return;
    const C = this.cfg.boss, PX = this.PX, g = this.golem;
    // 축전기 상자 모으기 (움직일 수 없음)
    if (this.charging) {
      if (this.fill < 1) Sound.startLoop('sfx_box_charge');
      this.fill = Math.min(1, this.fill + dt / C.final.fullSeconds);
      Sound.setLoopRate('sfx_box_charge', 0.8 + 0.6 * this.fill);
      if (this.fill >= 1 && !this.fullRang) { this.fullRang = true; Sound.play('sfx_box_full'); Sound.stopLoop('sfx_box_charge'); }
      Characters.play(this.ian, 'box_charge_release');
      this.ian.anims.pause(this.ian.anims.currentAnim.frames[0]);
    } else this.fullRang = false;
    const d = this.ian.x - g.x, rate = B.speed / GAME_CONFIG.act2.induction.golemStartSpeed;
    B.t -= dt;
    B.punchT -= dt;
    B.pullT -= dt;
    this.golemV = 0;
    if (B.state === 'charge') {
      const prev = g.x;
      g.x += B.dir * B.speed * PX * dt;
      this.golemV = B.dir * B.speed;
      if (this.side(prev) !== this.side(g.x)) this.golemPass();
      if ((B.stopX - g.x) * B.dir <= 0) { g.x = B.stopX; B.state = 'slow'; B.t = 0.6; Characters.play(g, 'slowing', false); }
    } else if (B.state === 'slow') {
      if (B.t <= 0) { B.state = 'wait'; B.t = C.waitTime; Characters.play(g, 'idle'); }
    } else if (B.state === 'wait' && B.t <= 0) {
      g.setFlipX(d > 0);   // 그림은 왼쪽을 본다
      if (this.side(this.ian.x) !== this.side(g.x)) {
        // 이안이 문 반대편: 문을 지나 돌진 (이안 앞 stopBefore에서 멈춤)
        B.dir = Math.sign(d);
        B.stopX = Phaser.Math.Clamp(this.ian.x - B.dir * C.stopBefore * PX, C.minX, C.maxX);
        B.state = 'charge';
        Characters.play(g, 'walk');
        g.anims.timeScale = Math.max(0.3, rate);
      } else if (Math.abs(d) > C.punch.range * PX) {
        // 같은 쪽: 천천히 다가오고, 가끔 쇠붙이를 끌어당긴다
        const step = Math.sign(d) * Math.min(B.speed, C.approachSpeed) * PX * dt;
        g.x = Phaser.Math.Clamp(g.x + step, C.minX, C.maxX);
        this.golemV = step / PX / dt;
        if (!g.anims.isPlaying || g.anims.currentAnim.key.indexOf('walk') < 0) { Characters.play(g, 'walk'); g.anims.timeScale = Math.max(0.3, rate); }
        if (B.pullT <= 0 && Math.abs(d) <= C.pull.range * PX && !this.charging) {
          B.pullT = C.pull.every;
          Characters.play(g, 'magnet_pull', false);
          Sound.play('sfx_golem_magnet_pull');
          this.tweens.add({ targets: this.ian, x: this.ian.x - Math.sign(d) * C.pull.dist * PX, duration: 500 });
          this.message.setText('골렘이 이안의 지팡이 쇠장식을 끌어당긴다!').setColor('#ff9a9a');
        }
      } else if (B.punchT <= 0) {
        B.punchT = C.punch.every;
        Characters.play(g, 'attack', false);
        this.time.delayedCall(400, () => {
          if (!this.boss || this.boss.done || Math.abs(this.ian.x - g.x) > C.punch.range * PX) return;
          this.ianHp = Math.max(0, this.ianHp - C.punch.damage);
          if (this.hud) this.hud.set('health', this.ianHp);
          Sound.play('sfx_ian_hurt');
          this.cameras.main.shake(200, 0.006);
          if (this.ianHp <= 0) this.bossLost();
        });
      } else if (!g.anims.isPlaying) Characters.play(g, 'idle');
    }
    // 봉화 빛: 쌓인 에너지만큼 (켜지기 전에도 조금씩)
    if (!B.lit) this.beaconGlow.setVisible(this.beaconLevel > 0).setAlpha(0.35 * (this.beaconLevel || 0));
  }

  bossLost() {
    this.ianHp = 1;
    if (this.hud) this.hud.set('health', 1);
    this.golem.x = this.cfg.golemX;
    this.boss.state = 'wait';
    this.boss.t = 2;
    this.ian.x = this.cfg.ianX * this.PX;
    this.message.setText('이안이 쓰러졌다… 다시 코일 문 반대편에서 유인하자 (봉화에 쌓인 전기는 그대로)').setColor('#ff9a9a');
    this.cameras.main.flash(400, 40, 0, 0);
  }

  updateBossText() {
    const B = this.boss, I = GAME_CONFIG.act2.induction;
    const ke = Induction.kinetic(I.golemMass, B.speed);
    const last = B.passes[B.passes.length - 1];
    // 학생 화면: 봉화 에너지만. 교사용(실험 전 답 숫자 보이기)일 때만 통과하는 순간의 에너지 나눔 (총괄지시 2막리뷰 38번 — 멈춘 골렘의 운동 에너지는 0이므로 "합"은 통과 순간 값으로)
    const lines = [
      `봉화 에너지 ${B.beaconE.toFixed(0)} / ${I.beaconFull} J${B.lit ? ' — 켜짐' : ''}`,
      `축전기 상자 ${Math.round(this.fill * 100)}%   코일 문 통과 ${B.passes.length}번`,
    ];
    if (this.answersShown()) {
      lines.push(`(교사용) 돌진 속력 ${B.speed.toFixed(2)} m/s`);
      lines.push(last ? `(교사용) 통과 전 운동 에너지 ${last.before.toFixed(0)} J = 통과 뒤 운동 에너지 ${last.after.toFixed(0)} J + 봉화로 간 에너지 ${last.given.toFixed(0)} J`
        : '(교사용) 아직 코일 문을 지나지 않음');
    }
    this.speedPanel.setLines(lines);
  }

  // ------------------------------------------------------------------ 무선 전달 퍼즐 (ACT2_PLAN 6단계 6번)
  // 송신 코일(봉화 옆)과 수신 코일(옥상 끝)을 Z로 들어 옮기고 C로 45°씩 돌린다.
  // 전달 정도 = 두 코일 축이 마주 보는 정도 × 거리 감쇠 (induction.wireless) — 기준을 넘으면 마을 등불이 하나씩 켜진다.
  buildCoils(saved) {
    const W = this.cfg.wireless, O = MANIFEST.objects;
    const mk = (id, x, angle) => {
      const base = this.add.image(x, this.groundY, O[id].key).setOrigin(O[id].pivot.x / O[id].width, 1).setDepth(2);
      const body = this.add.image(0, 0, O[id + '_body'].key).setDepth(2.5).setAngle(angle);
      this.worldLayer.add([base, body]);
      return { id, base, body, x, angle, carried: false };
    };
    this.coils = [mk('coil_sender', W.senderX, W.senderAngle), mk('coil_receiver', W.receiverX, W.receiverAngle)];
    this.waveG = this.add.graphics().setDepth(2);
    this.worldLayer.add(this.waveG);
    this.wirelessDone = !!saved.wirelessDone;
    if (this.wirelessDone) this.lightVillage(true);
  }

  // 두 코일의 축 각도 차이(0~90°)와 거리(m)
  coilLink() {
    const [a, b] = this.coils;
    let diff = Math.abs(a.angle - b.angle) % 180;
    diff = Math.min(diff, 180 - diff);
    const dist = Math.abs(a.x - b.x) / this.PX;
    return { diff, dist, ...Induction.wireless(diff, dist) };
  }

  // 들 수 있는 코일: 1.5 m 안에서 가장 가까운 것 (놓은 자리와 상관없이 지금 자리 c.x로 — 총괄지시 52번)
  nearCoil() {
    const R = 1.5 * this.PX;
    return this.coils.filter((c) => !c.carried && Math.abs(this.ian.x - c.x) <= R).sort((p, q) => Math.abs(p.x - this.ian.x) - Math.abs(q.x - this.ian.x))[0];
  }

  // Z: 코일 들기·내려놓기
  useCoil() {
    const held = this.coils.find((c) => c.carried);
    if (held) {
      held.carried = false;
      held.x = Phaser.Math.Clamp(this.ian.x + (this.ian.flipX ? -1 : 1) * 70, 80, this.worldW - 80);
      Sound.play('sfx_ui_click');
      this.checkWireless();
      return true;
    }
    const c = this.nearCoil();
    if (!c) { if (!this.near(this.cfg.floorCoilX) && !this.near(this.cfg.floorCoilX + 110)) this.message.setText('코일 가까이 가서 Z를 눌러 들자').setColor('#ffd27a'); return false; }
    c.carried = true;
    Sound.play('sfx_ui_click');
    this.message.setText(`${c.id === 'coil_sender' ? '송신' : '수신'} 코일을 들었다 — 옮겨서 Z로 내려놓자`).setColor('#ffe08a');
    return true;
  }

  // C: 들고 있거나 가까이 있는 코일을 45° 돌린다
  rotateCoil() {
    if (!this.bossDoneNow() || this.wirelessDone || this.isBlocked()) return;
    const c = this.coils.find((k) => k.carried) || this.nearCoil();
    if (!c) return;
    c.angle = (c.angle + this.cfg.wireless.turnStep) % 180;
    c.body.setAngle(c.angle);
    Sound.play('sfx_switch_flip');
    this.checkWireless();
  }

  bossDoneNow() {
    return !!Save.chapter(this.scene.key).bossDone;
  }

  checkWireless() {
    if (this.wirelessDone || this.coils.some((c) => c.carried)) return;
    const L = this.coilLink();
    if (!L.lit) {
      this.message.setText(`신호가 약하다 — 전달 정도 ${Math.round(L.amount * 100)}% (코일을 더 가까이, 축을 마주 보게)`).setColor('#ffd27a');
      return;
    }
    this.wirelessDone = true;
    Save.setChapter(this.scene.key, { wirelessDone: true });
    Sound.play('sfx_wireless_beep');
    this.message.setText('삐— 두 코일 사이로 전선 없이 신호가 건너갔다! 수신 코일의 전선을 따라 마을로').setColor(UIKit.SKY);
    this.lightVillage(false, () => this.say('village_lit', () => { this.examBtn = this.showExamIntro(() => this.startExam()); }));
  }

  // 마을 등불 12곳이 차례로 켜진다 (sfx_village_lamp, 0.2~0.4초 간격)
  lightVillage(instant, onDone) {
    const O = MANIFEST.objects;
    this.villageGlows = this.villageGlows || [];
    let t = 0;
    this.villageLamps.forEach((lamp, i) => {
      const on = () => {
        lamp.setTexture(O.village_lamp.states.on);
        const g = this.add.image(lamp.x, lamp.y, O.village_lamp_glow.states.on).setOrigin(O.village_lamp_glow.pivot.x / O.village_lamp_glow.width, O.village_lamp_glow.pivot.y / O.village_lamp_glow.height)
          .setDepth(-2).setBlendMode('ADD');
        this.worldLayer.add(g);
        this.villageGlows.push(g);
        if (!instant) Sound.play('sfx_village_lamp');
      };
      if (instant) { on(); return; }
      t += 200 + ((i * 37) % 3) * 100;   // 0.2·0.3·0.4초 간격
      this.time.delayedCall(t, on);
    });
    if (instant) return;
    // 등불이 켜지는 동안 카메라가 마을 쪽을 비춘다 (마을은 화면 왼쪽 멀리)
    const bounds = { x: 0, y: 0, width: this.worldW, height: this.worldH };
    const focus = this.add.zone(1000, this.ian.y, 1, 1);
    this.curse.followTarget(focus, bounds, 0.06);
    this.time.delayedCall(t + 900, () => {
      this.curse.followTarget(this.ian, bounds);
      focus.destroy();
      if (onDone) onDone();
    });
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      if (this.examBtn) this.examBtn.setVisible(false);
      Save.setChapter(this.scene.key, { examPassed: true });
      this.message.setText('2-6 전자기 유도 — 마법서 시험 통과! 봉화의 불빛이 마을까지 닿았다').setColor(UIKit.SKY);
      this.time.delayedCall(2500, () => this.goNext());
    });
  }

  updateCoils(dt) {
    if (!this.coils) return;
    const f = this.ian.flipX ? -1 : 1;
    for (const c of this.coils) {
      if (c.carried) c.base.setPosition(this.ian.x + f * 60, this.ian.y - 40).setScale(0.7).setDepth(5);
      else c.base.setPosition(c.x, this.groundY).setScale(1).setDepth(2);
      const O = MANIFEST.objects[c.id], m = O.coil_mount_local, s = c.base.scale;
      c.body.setPosition(c.base.x + (m[0] - O.pivot.x) * s, c.base.y + (m[1] - O.height) * s).setScale(s).setDepth(c.base.depth + 0.5);
    }
    // 신호 물결: 전달 정도만큼 하늘빛 원호
    const g = this.waveG;
    g.clear();
    if (!this.bossDoneNow() || this.coils.some((c) => c.carried)) return;
    const L = this.coilLink();
    if (L.amount < 0.05) return;
    this.waveT = ((this.waveT || 0) + dt) % 1;
    const [a, b] = this.coils, y = this.groundY - 90;
    for (let i = 0; i < 4; i++) {
      const k = (i / 4 + this.waveT) % 1, x = a.x + (b.x - a.x) * k;
      g.lineStyle(3, 0x9fe0ff, Math.min(1, L.amount) * (1 - Math.abs(0.5 - k))).strokeCircle(x, y, 18 + 10 * L.amount);
    }
  }

  updateWirelessText() {
    const L = this.coilLink(), W = GAME_CONFIG.act2.induction.wireless;
    this.speedPanel.setLines([
      `두 코일 축의 각도 차이 ${L.diff}°   거리 ${L.dist.toFixed(1)} m`,
      `전달 정도 = 마주 보는 정도 ${Math.cos(L.diff * Math.PI / 180).toFixed(2)} × 거리 감쇠 ${(1 / (1 + (L.dist / W.near) ** 2)).toFixed(2)} = ${L.amount.toFixed(2)} (기준 ${W.need})`,
      this.wirelessDone ? '마을 등불 12곳이 켜졌다' : `마을 등불: 꺼짐`,
    ]);
  }

  // 작은 등불(밝기 ∝ 유도 전류의 크기)과 바늘(가운데 0, 넣을 때와 뺄 때 반대)
  drawLamp(I) {
    const k = Math.min(1, Math.abs(I) / 1.0);
    this.smallLamp.setTexture(MANIFEST.objects.village_lamp.states[k > 0.15 ? 'on' : 'off']);
    this.smallGlow.setAlpha(k);
    const g = this.meterG, x = this.cfg.floorCoilX - 20, y = this.groundY - 150, r = 34;
    g.clear().fillStyle(0x1a140e, 0.9).fillRect(x - r - 8, y - r - 8, 2 * r + 16, r + 20).lineStyle(2, 0xc9b38a, 1).strokeRect(x - r - 8, y - r - 8, 2 * r + 16, r + 20);
    g.lineStyle(2, 0xf3ead6, 0.8).beginPath().arc(x, y, r, Math.PI * 1.15, Math.PI * 1.85).strokePath();
    g.lineStyle(2, 0xf3ead6, 1).lineBetween(x, y - r, x, y - r + 6);
    const a = -Math.PI / 2 + Phaser.Math.Clamp(I / 1.5, -1, 1) * (Math.PI * 0.35);
    g.lineStyle(3, 0xff8a6a, 1).lineBetween(x, y, x + Math.cos(a) * (r - 4), y + Math.sin(a) * (r - 4));
  }

  updatePanel(v) {
    this.speedPanel.setLines([
      `자석 속력: ${Math.abs(v).toFixed(2)} m/s ${v > 0.01 ? '(넣는 중)' : v < -0.01 ? '(빼는 중)' : '(멈춤)'}`,
      `유도 전류: ${this.current.toFixed(2)} (상대값 — 속력에 비례, 넣을 때 + 뺄 때 −)`,
      this.curse.cursed ? '저주: 전선으로 잇지 않으면 0' : '자석이 멈추면 코일 안에 있어도 0',
    ]);
  }
}
window.BeaconScene = BeaconScene;

// ------------------------------------------------------------------ 진실의 원 실험: 막대자석을 코일에 넣었다 뺐다 (ACT2_PLAN 6단계 3번)
// Space마다 한 단계(config ch2_6.lab.steps): 천천히 넣기 → 멈춤 → 천천히 빼기 → 빨리 넣기 → 빨리 빼기.
// 등불 밝기 ∝ 유도 전류의 크기, 바늘은 가운데가 0(넣을 때와 뺄 때 반대로 흔들림).
class InductionLab {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const O = MANIFEST.objects;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 60, '진실의 원 — 코일과 막대자석', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    this.help = UIKit.text(scene, 960, 118, '', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5);
    c.add(this.help);
    this.info = UIKit.text(scene, 960, 170, '', { fontSize: '28px', align: 'center' }).setOrigin(0.5, 0);
    c.add(this.info);
    // 코일(가운데)과 막대자석(왼쪽에서 들어간다). 1 m = 300px
    this.coilX = 1080; this.y = 700; this.mPX = 300;
    this.wires = scene.add.graphics();
    c.add(this.wires);
    // 코일 뒤쪽 → 자석 → 코일 앞쪽(반투명) 순서로 겹쳐, 자석이 코일 "속"을 지나며 감은 선 사이로 비쳐 보이게 (총괄지시 51번)
    //   코일 그림(100×60)의 가운데 축은 그림 위에서 30px — 자석 가운데 높이를 여기에 맞춘다
    const coilBottom = this.y + 60, axisY = coilBottom - (60 - 30) * 4;
    c.add(scene.add.image(this.coilX, coilBottom, O.coil.states.many).setOrigin(0.5, 1).setScale(4));
    this.startX = this.coilX - 420;   // 0.8 m 넣으면 자석 앞쪽 절반이 코일 안
    this.magnet = scene.add.image(this.startX, axisY, O.bar_magnet_large.key).setScale(2.5);
    c.add(this.magnet);
    c.add(scene.add.image(this.coilX, coilBottom, O.coil.states.many).setOrigin(0.5, 1).setScale(4).setAlpha(0.55));
    // 등불(위)과 바늘 상자
    this.lampX = 1500; this.lampY = 420;
    this.lamp = scene.add.image(this.lampX, this.lampY, O.village_lamp.states.off).setOrigin(0.5, 0.5).setScale(6);
    this.glow = scene.add.image(this.lampX, this.lampY, O.village_lamp_glow.states.on).setScale(6).setBlendMode('ADD').setAlpha(0);
    c.add([this.lamp, this.glow]);
    this.meter = scene.add.graphics();
    c.add(this.meter);
    c.add(UIKit.text(scene, 560, 470, '전류계 (가운데가 0)', { fontSize: '22px' }).setOrigin(0.5, 0));
    this.results = UIKit.text(scene, 960, 820, '', { fontSize: '24px', align: 'left', lineSpacing: 6 }).setOrigin(0.5, 0);
    c.add(this.results);
    scene.input.keyboard.on('keydown-SPACE', () => this.next());
    scene.input.keyboard.on('keydown-ESC', () => this.close());
    // 직접 조작 (총괄지시 2막리뷰 40번): ← → 를 누르고 있으면 자석이 움직이고, 오래 누를수록 빨라진다
    this.kLeft = scene.input.keyboard.addKey('LEFT');
    this.kRight = scene.input.keyboard.addKey('RIGHT');
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.step = -1;
    this.run = null;
    this.pos = 0;   // 자석이 처음 자리에서 들어간 거리 (m)
    this.I = 0;
    this.lines = [];
    this.holdT = 0;
    this.peak = { I: 0, t: -10 };   // 바늘이 닿은 가장 큰 값 (잔상 1.5초)
    this.seen = {};                 // 직접 해 본 것: in·out·still·fast
    this.results.setText('');
    this.container.setVisible(true);
    this.help.setText('← → 누르고 있기: 자석을 직접 넣고 빼기 (오래 누를수록 빨라짐)    Space: 차례로 보기    Esc: 닫기');
    this.info.setText('자석을 움직이며 등불과 바늘을 지켜보자').setColor('#ffe08a');
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  next() {
    const steps = this.scene.cfg.lab.steps;
    if (!this.isOpen || this.done || this.run || this.waitText) return;
    if (this.step >= steps.length - 1) return;
    this.step += 1;
    this.run = { ...steps[this.step], left: steps[this.step].t, peak: 0 };
    this.info.setText(this.run.text + '…').setColor('#ffe08a');
  }

  update(dt) {
    if (!this.isOpen) return;
    const r = this.run;
    let v = 0;
    if (r) {
      const d = Math.min(dt, r.left);
      r.left -= d;
      v = r.v;
      this.pos += v * d;
      this.I = Induction.coilCurrent(v);   // 진실의 원 안: 진짜 법칙
      r.peak = this.I;
      if (r.left <= 0) {
        this.run = null;
        this.waitText = true;   // 움직임이 끝나고 0.8초 뒤 결과 글 (총괄지시 2막리뷰 32번)
        this.scene.time.delayedCall(800, () => this.showStepResult(r));
      }
    } else if (!this.done && !this.waitText) {
      v = this.manual(dt);
      this.I = Induction.coilCurrent(v);
    } else this.I = 0;
    // 바늘 잔상: 더 큰 값이 나오거나 1.5초가 지나면 새로
    const now = this.scene.time.now;
    if (Math.abs(this.I) > Math.abs(this.peak.I) || now - this.peak.t > 1500) { if (Math.abs(this.I) > 0.05) this.peak = { I: this.I, t: now }; }
    this.drawLab(r || (v ? { v } : null));
  }

  // ← → 직접 조작: 오래 누를수록 빨라진다 (0.3 → 최대 1.8 m/s), 자석은 0 ~ 1.0 m 사이
  manual(dt) {
    const dir = (this.kRight.isDown ? 1 : 0) - (this.kLeft.isDown ? 1 : 0);
    if (!dir) {
      this.holdT = 0;
      if (this.pos > 0.5 && this.seen.in) { this.stillT = (this.stillT || 0) + dt; if (this.stillT > 1.2) this.note('still', '코일 안에 가만히 두면 → 등불 꺼짐, 바늘 0'); }   // 직접 넣어 본 뒤에만
      return 0;
    }
    this.stillT = 0;
    this.holdT += dt;
    let v = dir * Math.min(1.8, 0.3 + 2.0 * this.holdT);
    const next = Phaser.Math.Clamp(this.pos + v * dt, 0, 1.0);
    if (next === this.pos) return 0;
    v = (next - this.pos) / dt;
    this.pos = next;
    if (Math.abs(v) >= 0.2) this.note(v > 0 ? 'in' : 'out', v > 0 ? '직접 넣는 동안 → 바늘 오른쪽' : '직접 빼는 동안 → 바늘 왼쪽');
    if (Math.abs(v) >= 1.2) this.note('fast', '빨리 움직이면 → 등불이 더 밝고 바늘이 더 크게');
    return v;
  }

  // 직접 해 본 것 한 줄씩. 넷을 다 해 보면 실험 끝 (Space 차례로 보기를 끝내도 끝)
  note(id, text) {
    if (this.seen[id] || this.done) return;
    this.seen[id] = true;
    this.lines.push(text);
    this.results.setText(this.lines.join('\n'));
    this.info.setText(text).setColor(UIKit.SKY);
    if (['in', 'out', 'still', 'fast'].every((k) => this.seen[k])) this.finish();
  }

  finish() {
    this.done = true;
    this.help.setText('');
    this.scene.time.delayedCall(1800, () => this.info.setText('자석이 움직일 때만 전류가 생긴다 — 빨리 움직일수록 크고, 넣을 때와 뺄 때 방향이 반대').setColor(UIKit.SKY));
    UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
  }

  showStepResult(r) {
    this.waitText = false;
    if (!this.isOpen) return;
    {
      {
        const k = Math.abs(r.peak);
        const text = r.v === 0 ? `${r.text} → 등불 꺼짐, 바늘 0 (코일 안에 있어도)`
          : `${r.text} → 등불 ${k >= 1.2 ? '밝게' : '어둡게'}, 바늘 ${r.peak > 0 ? '오른쪽' : '왼쪽'}`;
        this.lines.push(text);
        this.results.setText(this.lines.join('\n'));
        this.info.setText(text).setColor(UIKit.SKY);
        if (this.step === this.scene.cfg.lab.steps.length - 1 && !this.done) this.finish();
      }
    }
  }

  drawLab(r) {
    if (r && r.v && Math.abs(this.I) > 0 && !this.ticked) { this.ticked = true; Sound.play(Math.abs(this.I) >= 1.2 ? 'sfx_lamp_on_bright' : 'sfx_lamp_on_dim'); }
    if (!r) this.ticked = false;
    this.magnet.x = this.startX + this.pos * this.mPX;
    const k = Math.min(1, Math.abs(this.I) / 1.5);
    this.lamp.setTexture(MANIFEST.objects.village_lamp.states[k > 0.1 ? 'on' : 'off']);
    this.glow.setAlpha(k);
    // 전선: 코일 → 등불, 바늘 상자
    this.wires.clear().lineStyle(4, 0xb87333, 1).lineBetween(this.coilX + 180, this.y - 58, this.lampX, this.y - 58).lineBetween(this.lampX, this.y - 58, this.lampX, this.y).lineBetween(this.lampX, this.y, this.lampX, this.lampY + 40);
    const g = this.meter, x = 560, y = 420, R = 110;
    g.clear().fillStyle(0x1a140e, 1).fillRect(x - R - 20, y - R - 20, 2 * R + 40, R + 50).lineStyle(3, 0xc9b38a, 1).strokeRect(x - R - 20, y - R - 20, 2 * R + 40, R + 50);
    g.lineStyle(3, 0xf3ead6, 0.8).beginPath().arc(x, y, R, Math.PI * 1.15, Math.PI * 1.85).strokePath();
    g.lineStyle(3, 0xf3ead6, 1).lineBetween(x, y - R, x, y - R + 14);
    // 잔상: 바늘이 닿은 가장 큰 값 (1.5초 동안 옅게)
    const age = this.scene.time.now - this.peak.t;
    if (age < 1500 && this.peak.I) {
      const pa = -Math.PI / 2 + Phaser.Math.Clamp(this.peak.I / 1.5, -1, 1) * (Math.PI * 0.35);
      g.lineStyle(5, 0xffd27a, 0.6 * (1 - age / 1500)).lineBetween(x, y, x + Math.cos(pa) * (R - 8), y + Math.sin(pa) * (R - 8));
    }
    const a = -Math.PI / 2 + Phaser.Math.Clamp(this.I / 1.5, -1, 1) * (Math.PI * 0.35);
    g.lineStyle(5, 0xff8a6a, 1).lineBetween(x, y, x + Math.cos(a) * (R - 8), y + Math.sin(a) * (R - 8));
  }
}
window.InductionLab = InductionLab;
