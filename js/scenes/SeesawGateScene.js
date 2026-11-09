// 1-1 성문의 저울 (ACT1_PLAN 2단계 3번) — 배경 01, 받침점 x=1477
//
// 성문은 시소 저울과 연결되어 있어, 이안과 가론이 양쪽에 올라서서 저울이 수평이 되면 열린다.
// - 저주 상태: 무게만 같으면 평형 (거리를 무시하는 오개념) → 가론 100kg ≠ 이안 50kg 이라 영영 가론 쪽으로 기운다
// - 진실의 원: 작은 저울로 실험 — 무거운 돌은 받침점 가까이, 가벼운 돌은 멀리 놓으면 평형
// - 해방 상태: 돌림힘 = 힘(무게) × 받침점까지 거리가 양쪽에서 같으면 평형 → 가론 1000N × 1m = 이안 500N × 2m
// 저울 위에서는 0.5m 칸마다 선다(손을 떼면 가장 가까운 칸으로).
class SeesawGateScene extends ChapterScene {
  constructor() {
    super('Ch1_1');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.seesawGate;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    this.pivotX = cfg.pivotX;
    const fulcrum = O.seesaw_fulcrum, plank = O.seesaw_plank;
    this.halfLen = plank.width / 2;                         // 325px = 2.6m
    this.pivotY = this.groundY - fulcrum.height + cfg.plankSeat; // 판자 아랫면이 받침대에 얹히는 높이
    this.plankTopY = this.pivotY - plank.height;             // 판자 윗면 (기울지 않았을 때)

    const add = (name, x, y, depth) => {
      const o = O[name];
      const img = this.add.image(x, y, o.key).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };
    add('seesaw_fulcrum', this.pivotX, this.groundY, -1);
    // 판자는 받침점(윗면 가운데 아래) 둘레로 돈다
    this.plank = this.add.image(this.pivotX, this.pivotY - plank.height / 2, plank.key).setDepth(0);
    this.worldLayer.add(this.plank);
    this.angle = 0;

    // 성문 (수평이 되면 위로 열린다)
    this.gateX = cfg.gateX * PX;
    this.gate = add('castle_gate', this.gateX, this.groundY + 4, -1);
    this.gateOpen = false;
    this.balanceT = 0;

    // 진실의 원 (작은 저울 실험대)
    this.circle = this.curse.addTruthCircle({
      centerX: cfg.circleX, groundY: this.groundY, diameter: 3.6, domeHeight: 2.6,
    });
    // 저주 상태에서는 저울에서 한 번 실패한 뒤(garon_heavy)에야 원이 빛난다 (1-2 회랑과 같은 순서)
    this.curse.setCircleActive(this.circle, !this.curse.cursed);
    this.circleHint = UIKit.text(this, cfg.circleX * PX, this.groundY - 300, 'Z: 작은 저울로 실험', {
      fontSize: '26px', color: UIKit.SKY, backgroundColor: '#0b1320cc', padding: { x: 10, y: 6 },
    }).setOrigin(0.5).setVisible(false);
    this.worldLayer.add(this.circleHint);

    // 이안·가론
    const P = GAME_CONFIG.physics;
    this.chars = {
      ian: { id: 'ian', name: '이안', mass: P.ian.mass, sprite: Characters.create(this, 'ian', cfg.ianStartX * PX, this.groundY) },
      garon: { id: 'garon', name: '가론', mass: P.garon.mass, sprite: Characters.create(this, 'garon', cfg.garonStartX * PX, this.groundY) },
    };
    this.chars.ian.sprite.setDepth(4);
    this.chars.garon.sprite.setDepth(3);
    this.worldLayer.add([this.chars.ian.sprite, this.chars.garon.sprite]);
    this.control = 'ian';
    this.player = this.chars.ian.sprite;
    this.bounds = { x: 0, y: 0, width: this.worldW, height: this.worldH };
    this.curse.followTarget(this.player, this.bounds);

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT', tab: 'TAB', act: 'Z' });
    kb.addCapture(['TAB', 'Z']);
    this.keys.tab.on('down', () => { if (!this.isBlocked()) this.switchControl(); });
    this.keys.act.on('down', () => { if (!this.isBlocked()) this.tryExperiment(); });
    this.flags = {};
    this.lab = new BalanceLab(this, this.uiLayer);
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  onReady() {
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '← → 걷기 (저울 위에서는 0.5m 칸)   Tab 이안/가론   Z 실험   M 마법서', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '← → 걸어서 저울 판 위로 올라서기 · Tab 이안/가론 바꾸기', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1000, 150);   // 돌림힘 줄이 길어 판이 넓어지므로 조금 왼쪽으로
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 무게만 같으면 어디에 서도 평형 (거리는 상관없다?)'
      : '진짜 법칙: 돌림힘 = 힘 × 받침점까지 거리 — 양쪽 돌림힘이 같으면 평형';
  }

  switchControl() {
    this.control = this.control === 'ian' ? 'garon' : 'ian';
    this.player = this.chars[this.control].sprite;
    this.curse.followTarget(this.player, this.bounds);
    Sound.play('sfx_ui_click');
  }

  // ------------------------------------------------------------------ 저울
  // 받침점에서 이 캐릭터까지 거리 (m, 오른쪽 +). 저울 위에 없으면 null
  armOf(c) {
    const d = (c.sprite.x - this.pivotX) / this.PX;
    return Math.abs(d) <= this.halfLen / this.PX ? d : null;
  }

  // 저울이 어느 쪽으로 기우나: −1 왼쪽, 0 수평, +1 오른쪽
  tiltSign() {
    let left = 0, right = 0;           // 저주: 무게(N)만 더함 / 진짜: 돌림힘 = 무게(N) × 거리 (N·m)
    for (const c of Object.values(this.chars)) {
      const d = this.armOf(c);
      if (d === null || Math.abs(d) < 0.01) continue;
      const W = c.mass * GAME_CONFIG.physics.g;           // 무게 (N)
      const w = this.curse.cursed ? W : W * Math.abs(d);
      if (d < 0) left += w; else right += w;
    }
    this.sums = { left, right };
    if (Math.abs(left - right) < 1e-6) return 0;
    return left > right ? -1 : 1;
  }

  // 둘 다 저울 위, 서로 다른 쪽에 있는가 (성문이 열리는 조건)
  bothOnOppositeSides() {
    const a = this.armOf(this.chars.ian), b = this.armOf(this.chars.garon);
    return a !== null && b !== null && Math.abs(a) > 0.01 && Math.abs(b) > 0.01 && Math.sign(a) !== Math.sign(b);
  }

  plankY(x) {
    // 기운 판자 윗면 높이 (오른쪽이 내려가면 angle > 0)
    return this.plankTopY + (x - this.pivotX) * Math.tan(this.angle * Math.PI / 180);
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const cfg = this.cfg, PX = this.PX, walk = GAME_CONFIG.iceCorridor.walkSpeed;
    const dir = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    for (const c of Object.values(this.chars)) {
      const s = c.sprite;
      const mine = c.id === this.control;
      const d = mine ? dir : 0;
      s.x = Phaser.Math.Clamp(s.x + d * walk * PX * dt, cfg.wallMargin * PX, this.rightLimit());
      // 저울 위에서 손을 떼면 가장 가까운 0.5m 칸으로 미끄러지듯 선다
      const arm = this.armOf(c);
      if (!d && arm !== null) {
        const snapped = Math.round(arm / cfg.spotStep) * cfg.spotStep;
        const target = this.pivotX + snapped * PX;
        s.x += Phaser.Math.Clamp(target - s.x, -walk * PX * dt, walk * PX * dt);
      }
      if (d) s.setFlipX(d < 0);
      s.y = this.armOf(c) !== null ? this.plankY(s.x) : this.groundY;
      if (!(this.realizing && c.id === 'ian')) Characters.play(s, d ? 'walk' : 'idle');
    }

    // 판자 기울기: 무거운(돌림 효과가 큰) 쪽으로 기운다
    const sign = this.tiltSign();
    const target = sign * cfg.maxTilt;
    const before = this.angle;
    this.angle += Phaser.Math.Clamp(target - this.angle, -cfg.tiltSpeed * dt, cfg.tiltSpeed * dt);
    if (Math.abs(this.angle - before) > 0 && Math.abs(target - this.angle) < 0.01 && sign !== 0) Sound.play('sfx_lever_tilt');
    this.plank.setAngle(this.angle);
    this.plank.setPosition(this.pivotX, this.pivotY - MANIFEST.objects.seesaw_plank.height / 2);

    // 저주 상태에서 둘이 양쪽에 섰는데 가론 쪽으로 쿵 → 가론 대사 (한 번)
    if (this.curse.cursed && this.bothOnOppositeSides() && Math.abs(this.angle - target) < 0.01 && !this.flags.garonTalk) {
      this.flags.garonTalk = true;
      Sound.play('sfx_lever_tilt');
      this.say('garon_heavy', () => this.lightCircle());
    }

    // 수평 + 둘 다 양쪽 → 1초 버티면 성문이 열린다
    if (!this.gateOpen && !this.curse.cursed && sign === 0 && this.bothOnOppositeSides() && Math.abs(this.angle) < 0.05) {
      this.balanceT += dt;
      if (this.balanceT >= cfg.holdSeconds) this.openGate();
    } else {
      this.balanceT = 0;
    }

    // 저주 상태에서 이안이 진실의 원 가까이 가면 "발견" 대사 (한 번)
    const toCircle = Math.abs(this.chars.ian.sprite.x - this.circle.x) - this.circle.r;
    if (this.curse.cursed && this.circle.active && !this.flags.circleFound && toCircle <= 1.0 * PX) {
      this.flags.circleFound = true;
      this.say('circle_found');
    }

    // 진실의 원 안이면 실험 안내
    this.circleHint.setVisible(this.control === 'ian' && this.curse.inCircle(this.chars.ian.sprite.x) && this.curse.cursed);

    // 열린 성문을 지나면 다음 방
    if (this.gateOpen && !this.flags.leaving && this.chars[this.control].sprite.x > this.gateX + 40) {
      this.flags.leaving = true;
      this.cameras.main.fadeOut(600, 0, 0, 0);
      this.time.delayedCall(650, () => this.goNext());
    }
    this.updatePanel();
  }

  // 저울에서 실패한 뒤: 왼쪽 바닥의 진실의 원이 빛나기 시작한다
  lightCircle() {
    if (this.circle.active || !this.curse.cursed) return;
    this.curse.setCircleActive(this.circle, true);
    this.circle.image.setAlpha(0);
    this.tweens.add({ targets: this.circle.image, alpha: 1, duration: 1200 });
    Sound.play('sfx_truth_circle_enter');
    this.message.setText('왼쪽 바닥에서 빛이 난다! 가 보자');
  }

  rightLimit() {
    return this.gateOpen ? this.worldW - 40 : this.gateX - MANIFEST.objects.castle_gate.width / 2 - 20;
  }

  openGate() {
    this.gateOpen = true;
    Sound.play('sfx_lever_balance');
    Sound.play('sfx_door_open');
    this.tweens.add({ targets: this.gate, y: this.gate.y - 440, duration: 1200, ease: 'Sine.easeIn' });
    Save.setChapter(this.scene.key, { gateOpened: true });
    this.message.setText('수평! 성문이 열렸다 — 오른쪽으로 지나가자').setColor(UIKit.SKY);
    this.say('gate_open');
  }

  // ------------------------------------------------------------------ 진실의 원 실험
  tryExperiment() {
    if (!this.curse.cursed) return;
    // 가론을 움직이는 중이면 아무 반응이 없어 고장으로 오해했다 (평가단 두 팀) → 어떻게 하면 되는지 알려 준다
    if (this.control !== 'ian') {
      if (this.curse.inCircle(this.chars.garon.sprite.x) || this.curse.inCircle(this.chars.ian.sprite.x)) this.toast('실험은 이안이 해요 — Tab으로 이안을 고르세요');
      return;
    }
    if (!this.curse.inCircle(this.chars.ian.sprite.x)) return;
    const open = () => this.lab.open(() => this.onLabBalanced());
    if (this.flags.labTalked) { open(); return; }
    this.flags.labTalked = true;
    this.say('lab_start', open);   // 처음 열 때만 이안의 고민 대사
  }

  onLabBalanced() {
    // 깨달음 동작 → 깨달음 대사 → 공통 저주 풀기(해금 카드 + 마법서 1장) → 가론 대사
    const ian = this.chars.ian;
    this.realizing = true;
    Characters.play(ian.sprite, 'realize', false);
    ian.sprite.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.message.setText('이제 진짜 법칙대로! 저울 위에서 ← →로 0.5 m씩 옮겨 서 보자').setColor(UIKit.SKY);
        this.say('after_free');
      }));
    });
  }

  updatePanel() {
    const step = this.cfg.spotStep;
    const items = [this.chars.garon, this.chars.ian].map((c) => {
      const d = this.armOf(c);
      return { name: c.name, mass: c.mass, d: d === null ? null : Math.round(d / step) * step };
    });
    this.speedPanel.setLines([`조작: ${this.chars[this.control].name} (Tab)`, ...torqueLines(items, this.curse.cursed)]);
  }
}
window.SeesawGateScene = SeesawGateScene;

// 1-1 숫자판: 질량(kg)은 "→ 무게 ○○ N"으로 바꿔 주는 자리에만 쓰고, 비교·계산은 N과 N·m로 (총괄지시 수정목록 1번)
// items: [{ name, mass(kg), d(받침점에서 거리 m, 왼쪽 −, 저울 밖이면 null) }], cursed: 저주 상태면 무게만 비교
window.torqueLines = function (items, cursed) {
  const g = GAME_CONFIG.physics.g;
  const f1 = (x) => x.toFixed(1);
  const lines = items.map((it) => {
    const W = it.mass * g;
    const where = it.d === null ? '저울 밖' : `${it.d < 0 ? '왼쪽' : '오른쪽'} ${f1(Math.abs(it.d))} m`;
    return `${it.name} ${it.mass}kg → 무게 ${W} N   ${where}`;
  });
  const on = items.filter((it) => it.d !== null && Math.abs(it.d) > 0.01);
  if (!on.length) return lines;
  const side = (s) => on.filter((it) => Math.sign(it.d) === s);
  if (cursed) {
    const L = side(-1).reduce((a, it) => a + it.mass * g, 0);
    const R = side(1).reduce((a, it) => a + it.mass * g, 0);
    lines.push(`저주의 저울: 왼쪽 무게 ${L} N · 오른쪽 무게 ${R} N (거리는 상관없다?)`);
    return lines;
  }
  const sum = (s) => side(s).reduce((a, it) => a + it.mass * g * Math.abs(it.d), 0);
  const terms = (s) => side(s).map((it) => `${it.mass * g} N × ${f1(Math.abs(it.d))} m`).join(' + ') || '0';
  const L = sum(-1), R = sum(1);
  const verdict = Math.abs(L - R) < 1e-6 ? '→ 같으면 평형' : L > R ? '→ 왼쪽으로 기운다' : '→ 오른쪽으로 기운다';
  lines.push(`왼쪽 돌림힘  ${terms(-1)} = ${L.toFixed(0)} N·m`);
  lines.push(`오른쪽 돌림힘  ${terms(1)} = ${R.toFixed(0)} N·m   ${verdict}`);
  return lines;
};

// ------------------------------------------------------------------ 진실의 원 안의 작은 저울 (실험 화면)
// 무거운 돌과 가벼운 돌을 0.5m 칸에 놓는다. 진짜 법칙: 무게(N) × 거리 = 돌림힘이 양쪽에서 같으면 평형.
// 1·2로 돌을 고르고 ← →로 옮긴다. Esc로 닫는다.
class BalanceLab {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const cfg = GAME_CONFIG.seesawGate.lab;
    const O = MANIFEST.objects;
    this.cfg = cfg;
    const PX = GAME_CONFIG.pxPerMeter;
    this.PX = PX;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    this.cx = 960;
    this.baseY = 760;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 120, '진실의 원 — 작은 저울 실험', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY })
      .setOrigin(0.5));
    c.add(UIKit.text(scene, 960, 180, '1·2: 돌 고르기    ← →: 0.5m씩 옮기기    Esc: 닫기', { fontSize: '26px', color: '#cfe3f5' })
      .setOrigin(0.5));
    const fulcrum = O.seesaw_fulcrum, plank = O.seesaw_plank;
    c.add(scene.add.image(this.cx, this.baseY, fulcrum.key).setOrigin(0.5, 1));
    this.pivotY = this.baseY - fulcrum.height + GAME_CONFIG.seesawGate.plankSeat;
    this.plank = scene.add.image(this.cx, this.pivotY - plank.height / 2, plank.key);
    this.plankH = plank.height;
    c.add(this.plank);
    // 0.5m 칸 눈금
    for (let d = -2.5; d <= 2.51; d += 0.5) {
      const x = this.cx + d * PX;
      c.add(scene.add.rectangle(x, this.baseY + 20, 3, Math.abs(d % 1) < 0.01 ? 22 : 12, 0xf3ead6).setOrigin(0.5, 0));
      if (Math.abs(d % 1) < 0.01) c.add(UIKit.text(scene, x, this.baseY + 46, `${Math.abs(d)}m`, { fontSize: '22px' }).setOrigin(0.5, 0));
    }
    this.stones = cfg.stones.map((s, i) => {
      const o = O[`stone_${s.mass}kg`];
      const img = scene.add.image(0, 0, o.key).setOrigin(0.5, 1);
      const label = UIKit.text(scene, 0, 0, `${i + 1}  ${s.mass}kg (무게 ${s.mass * GAME_CONFIG.physics.g} N)`, { fontSize: '24px', fontStyle: 'bold', color: '#ffe08a' })
        .setOrigin(0.5, 1);
      c.add([img, label]);
      return { mass: s.mass, d: s.startD, img, label, h: o.height };
    });
    this.result = UIKit.text(scene, 960, 900, '', { fontSize: '36px', fontStyle: 'bold' }).setOrigin(0.5);
    c.add(this.result);
    this.angle = 0;
    this.sel = 0;
    const kb = scene.input.keyboard;
    kb.on('keydown-ONE', () => this.select(0));
    kb.on('keydown-TWO', () => this.select(1));
    kb.on('keydown-LEFT', () => this.move(-1));
    kb.on('keydown-RIGHT', () => this.move(1));
    kb.on('keydown-ESC', () => this.close());
    scene.labUpdate((t, delta) => this.update(Math.min(delta, 50) / 1000));
  }

  open(onBalanced) {
    this.onBalanced = onBalanced;
    this.isOpen = true;
    this.done = false;
    this.container.setVisible(true);
    this.select(0);
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  select(i) {
    if (!this.isOpen) return;
    this.sel = i;
    this.stones.forEach((s, j) => s.label.setColor(j === i ? UIKit.SKY : '#ffe08a'));
  }

  move(dir) {
    if (!this.isOpen || this.done) return;
    const s = this.stones[this.sel];
    let d = Math.round((s.d + dir * 0.5) * 2) / 2;
    if (Math.abs(d) < 0.01) d += dir * 0.5;          // 받침점 바로 위에는 놓지 않는다
    d = Phaser.Math.Clamp(d, -2.5, 2.5);
    if (this.stones.some((o) => o !== s && Math.abs(o.d - d) < 0.01)) return; // 한 칸에 하나
    s.d = d;
    Sound.play('sfx_ui_click');
  }

  // 돌림힘 비교: 무게(N) × 거리 (진실의 원 안이라 진짜 법칙)
  sign() {
    let left = 0, right = 0;
    for (const s of this.stones) { const W = s.mass * GAME_CONFIG.physics.g; if (s.d < 0) left += W * -s.d; else right += W * s.d; }
    this.sums = { left, right };
    if (Math.abs(left - right) < 1e-6) return 0;
    return left > right ? -1 : 1;
  }

  update(dt) {
    if (!this.isOpen) return;
    const sign = this.sign();
    const opposite = Math.sign(this.stones[0].d) !== Math.sign(this.stones[1].d);
    const target = sign * GAME_CONFIG.seesawGate.maxTilt;
    this.angle += Phaser.Math.Clamp(target - this.angle, -30 * dt, 30 * dt);
    this.plank.setAngle(this.angle);
    const topY = this.pivotY - this.plankH;
    for (const s of this.stones) {
      const x = this.cx + s.d * this.PX;
      const y = topY + (x - this.cx) * Math.tan(this.angle * Math.PI / 180);
      s.img.setPosition(x, y);
      s.label.setPosition(x, y - 100 - this.stones.indexOf(s) * 36);   // 두 돌이 가까워도 이름표가 겹치지 않게
    }
    const desc = this.stones.map((s) => `${s.mass * GAME_CONFIG.physics.g} N ${s.d < 0 ? '왼쪽' : '오른쪽'} ${Math.abs(s.d).toFixed(1)}m`).join('   ·   ');
    if (sign === 0 && opposite && Math.abs(this.angle) < 0.05) {
      this.result.setText(`평형! ${desc}`).setColor(UIKit.SKY);
      if (!this.done) {
        this.done = true;
        Sound.play('sfx_lever_balance');
        UIKit.labNext(this, () => { this.close(); if (this.onBalanced) this.onBalanced(); });
      }
    } else {
      this.result.setText(`${sign < 0 ? '왼쪽' : sign > 0 ? '오른쪽' : ''}으로 기운다   ${desc}`).setColor('#ffd27a');
    }
  }
}
window.BalanceLab = BalanceLab;
