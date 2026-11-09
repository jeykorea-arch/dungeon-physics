// 1-4 광차 탑 (ACT1_PLAN 4단계 1~5번) — 배경 06 (한 화면)
//
// 광차(100kg)가 왼쪽 발판(5m) 끝에 서 있고, 뒤의 용수철 범퍼가 +x로 민다. 레일은 골짜기로 내려갔다가 오른쪽 발판(6m)으로 오른다.
// 광차는 레일 중심선(act1_objects rail_centerline_px)을 따라 움직인다. 마찰 없음.
// 해방(진짜 법칙): 역학적 에너지 보존 — 위치 에너지 mgh + 운동 에너지 ½mv² 가 레일 어디서나 같다.
//   범퍼를 x만큼 눌렀다 놓으면 ½kx² = ½mv² → 출발 속력 v = x√(k/m) (k = 10000 N/m, m = 100kg → v = 10x)
//   6m 발판을 넘으려면 ½mv² ≥ mg×1m → v ≥ √(2g×1) ≈ 4.47 m/s → 범퍼 0.45m(4.5 m/s)부터 넘는다.
// 저주: 무거운 광차일수록 바닥에서 빠르다 → 내리막에서 빨라지는 정도가 질량에 비례 (100kg은 기준 200kg의 절반),
//   오르막에서는 그대로 느려진다 → 이 광차로는 어떤 범퍼로도 못 넘는다.
// 진실의 원(골짜기 바닥 왼쪽) 실험: 가벼운 광차와 무거운 광차를 같은 5m에서 내려 보내면 바닥에서 똑같이 10 m/s.
class MinecartScene extends ChapterScene {
  constructor() {
    super('Ch1_4');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.minecart;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    const L = RAW_JSON.act1_objects.scene_layout['1-4'];
    this.layout = L;
    this.floorY = L.valley_floor_y_px;

    // 레일 길: 광차가 멈춰 있는 곳(왼쪽 발판 위)부터 → 레일 중심선 → 오른쪽 발판 끝의 멈춤 막대까지
    const rest = L.resting_cart_placement;
    const pts = [[rest.top_left_x_px + O.minecart.width / 2, rest.bottom_y_px], ...L.rail_centerline_px, [cfg.stopperX, L.right_platform_top_y_px]];
    this.path = [];
    let s = 0;
    pts.forEach((p, i) => {
      if (i > 0) s += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]);
      this.path.push({ x: p[0], y: p[1], s });
    });
    this.pathLen = s;
    this.leftEdgeS = this.path[1].s;                                    // 왼쪽 발판 끝 (레일이 내려가기 시작)
    this.rightEdgeS = this.path[this.path.length - 2].s;                 // 오른쪽 발판 시작

    // 물체
    const put = (o, x, y, depth) => {
      const img = this.add.image(x, y, o.key).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };
    put(O.rail_path, 0, 0, -2);
    const B = L.launch_bumper_placement;
    this.bumper = this.add.image(B.top_left_x_px, rest.bottom_y_px, O.spring_bumper.key).setOrigin(0, 1).setDepth(1);
    this.worldLayer.add(this.bumper);
    this.cart = put(O.minecart, 0, 0, 2);
    this.cartLabel = UIKit.text(this, 0, 0, `${cfg.cartMass}kg`, {
      fontSize: '22px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 6, y: 2 },
    }).setOrigin(0.5, 1).setDepth(5);
    this.worldLayer.add(this.cartLabel);
    // 오른쪽 발판 끝의 멈춤 막대 (그림이 없어 엔진으로)
    const g = this.add.graphics().setDepth(1);
    g.fillStyle(0x5a3a22, 1).fillRect(cfg.stopperX + 100, L.right_platform_top_y_px - 60, 18, 60);
    g.fillStyle(0x9fe0ff, 0.9).fillRect(cfg.stopperX + 96, L.right_platform_top_y_px - 66, 26, 8);
    this.worldLayer.add(g);

    // 이안·가론: 골짜기 바닥 왼쪽 (진실의 원)
    this.curse.addTruthCircle({ centerX: cfg.circleX, groundY: this.floorY, diameter: 2.6, domeHeight: 2.4 });
    this.ian = Characters.create(this, 'ian', cfg.circleX * PX, this.floorY).setDepth(4);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, this.floorY).setDepth(3);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.circleHint = UIKit.text(this, cfg.circleX * PX, this.floorY - 260, 'Z: 광차 실험', {
      fontSize: '26px', color: UIKit.SKY, backgroundColor: '#0b1320cc', padding: { x: 10, y: 6 },
    }).setOrigin(0.5).setDepth(6);
    this.worldLayer.add(this.circleHint);

    this.compress = cfg.startCompress;
    this.run = null;            // 달리는 중: { s, v }
    this.solved = false;
    this.clackS = 0;
    this.placeCart(0);

    const kb = this.input.keyboard;
    kb.addCapture(['UP', 'DOWN', 'Z']);
    kb.on('keydown-UP', () => this.setCompress(1));
    kb.on('keydown-DOWN', () => this.setCompress(-1));
    kb.on('keydown-SPACE', () => this.launch());
    kb.on('keydown-Z', () => this.tryExperiment());
    this.flags = {};
    this.realizing = false;
    this.lab = new CartLab(this, this.uiLayer);
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  onReady() {
    this.setMusicMode('puzzle');
    this.speedPanel.moveTo(560, 140);   // 오른쪽 발판(광차가 닿는 곳)을 가리지 않게
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '↑ ↓ 범퍼 누르기   Space 출발   Z 실험 (진실의 원)   M 마법서', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.setMessage();
    if (this.curse.cursed) this.say('intro');
  }

  setMessage() {
    this.message.setText(this.curse.cursed
      ? '↑ ↓ 범퍼 누르기 · Space 출발'
      : '진짜 법칙대로! 범퍼를 얼마나 눌러야 6m 발판을 넘을까?').setColor(this.curse.cursed ? '#ffe08a' : UIKit.SKY);
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 무거운 광차일수록 바닥에서 더 빠르다?'
      : '에너지 보존: 위치 에너지 + 운동 에너지 = 일정';
  }

  onCurseChanged() {
    super.onCurseChanged();
    if (this.message) this.setMessage();
  }

  // ------------------------------------------------------------------ 레일 위치
  at(s) {
    const P = this.path;
    s = Phaser.Math.Clamp(s, 0, this.pathLen);
    let i = 1;
    while (i < P.length - 1 && P[i].s < s) i++;
    const a = P[i - 1], b = P[i];
    const k = b.s > a.s ? (s - a.s) / (b.s - a.s) : 0;
    return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, ang: Math.atan2(b.y - a.y, b.x - a.x) };
  }

  height(s) {           // 골짜기 바닥에서 잰 높이 (m)
    return (this.floorY - this.at(s).y) / this.PX;
  }

  placeCart(s) {
    const p = this.at(s);
    this.cart.setPosition(p.x, p.y).setRotation(p.ang);
    this.cartLabel.setPosition(p.x, p.y - 120);
  }

  // ------------------------------------------------------------------ 범퍼·출발
  setCompress(dir) {
    if (this.isBlocked() || this.run || this.solved) return;
    const c = this.cfg;
    this.compress = Phaser.Math.Clamp(Math.round((this.compress + dir * c.compressStep) / c.compressStep) * c.compressStep, 0, c.maxCompress);
    this.bumper.setScale(1 - this.compress * 0.5, 1);
    Sound.play('sfx_ui_click');
  }

  launchSpeed() {      // ½kx² = ½mv²
    return this.compress * Math.sqrt(this.cfg.springK / this.cfg.cartMass);
  }

  launch() {
    if (this.isBlocked() || this.run || this.solved) return;
    const v0 = this.launchSpeed();
    if (v0 <= 0) { this.message.setText('범퍼를 먼저 눌러야(↑) 광차가 출발한다').setColor('#ffd27a'); return; }
    this.bumper.setScale(1, 1);
    Sound.play('sfx_spring_bumper');
    this.run = { s: 0, v: v0, v0, h0: this.height(0), maxH: this.height(0), turned: false };
    this.clackS = 0;
    this.message.setText(`범퍼 ${this.compress.toFixed(2)}m → 출발 속력 ${v0.toFixed(2)} m/s`).setColor(this.curse.cursed ? '#c79bff' : UIKit.SKY);
  }

  updateWorld(dt) {
    const c = this.cfg, g = GAME_CONFIG.physics.g;
    const r = this.run;
    if (r) {
      // 작은 걸음으로 나눠 레일을 따라 움직인다
      const n = 8;
      for (let i = 0; i < n; i++) {
        const h = dt / n;
        const ds = 2;
        const slope = (this.height(r.s + ds) - this.height(r.s - ds)) / (2 * ds / this.PX);   // dh/ds (m/m)
        let gEff = g;
        // 저주: 내리막에서 빨라지는 정도가 질량에 비례 (기준 질량보다 가벼우면 덜 빨라짐)
        if (this.curse.cursed && slope * Math.sign(r.v || 1) < 0) gEff = g * c.cartMass / c.cursedRefMass;
        r.v += -gEff * slope * h;
        r.s += r.v * h * this.PX;
        if (!this.curse.cursed) {
          // 에너지 보존으로 새 위치의 속력 크기를 맞춘다 (계산 오차가 쌓이지 않게)
          const v2 = r.v0 * r.v0 + 2 * g * (r.h0 - this.height(r.s));
          if (v2 > 0) r.v = Math.sign(r.v || 1) * Math.sqrt(v2);
        }
        if (r.v < 0 && !r.turned) { r.turned = true; r.turnH = this.height(r.s); Sound.play('sfx_minecart_creak'); }
        if (r.v > 0 && r.turned) r.backAgain = true;   // 골짜기에서 다시 앞으로 (저주 땐 왼쪽 발판까지 못 돌아온다)
      }
      r.maxH = Math.max(r.maxH, this.height(r.s));
      // 레일 덜컹 소리: 1.25m마다 (속력이 빠를수록 자주)
      this.clackS += Math.abs(r.v) * dt;
      if (this.clackS >= c.clackEvery) { this.clackS = 0; Sound.play('sfx_rail_clack'); }
      if (r.s >= this.pathLen) {
        // 오른쪽 발판 끝 멈춤 막대
        r.s = this.pathLen;
        this.finish(true);
      } else if ((r.s <= 0 && r.v < 0) || r.backAgain) {
        // 되돌아온 광차: 범퍼가 붙잡는다 / 골짜기에서 오가면 가론이 끌어 올린다
        r.s = 0;
        this.finish(false);
      }
      if (this.run) this.placeCart(r.s);
    }
    this.circleHint.setVisible(this.curse.cursed && !this.isBlocked() && !this.run);
    Characters.play(this.ian, this.realizing ? 'realize' : 'idle');
    this.updatePanel();
  }

  finish(passed) {
    const r = this.run;
    this.run = null;
    this.endV = passed ? r.v : 0;     // 멈춤 막대에 닿을 때의 속력 (숫자판에 남김)
    this.placeCart(passed ? this.pathLen : 0);
    if (passed) {
      this.solved = true;
      Sound.play('sfx_pressure_plate');
      Save.setChapter(this.scene.key, { solved: true });
      this.message.setText(`${r.v0.toFixed(2)} m/s로 출발 → 6m 발판을 넘었다! (오른쪽 발판에서 ${r.v.toFixed(2)} m/s)`).setColor(UIKit.SKY);
      this.say('success', () => {
        this.uiLayer.add(UIKit.button(this, 960, 985, '다음 ▶', () => this.goNext(), { fontSize: 30 })
          .setScrollFactor(0).setDepth(320));
      });
    } else {
      // 되돌아온 광차는 범퍼가 붙잡아 처음 자리에 세운다
      Sound.play('sfx_spring_bumper');
      this.message.setText(`${r.v0.toFixed(2)} m/s로는 오른쪽 언덕 ${(r.turnH ?? r.maxH).toFixed(2)}m까지만 올라감 — 6m를 못 넘고 되돌아왔다`).setColor('#ffd27a');
    }
  }

  // ------------------------------------------------------------------ 진실의 원 실험
  tryExperiment() {
    if (this.isBlocked() || this.run || !this.curse.cursed || !this.curse.inCircle(this.ian.x)) return;
    const open = () => this.lab.open(() => this.onLabDone());
    if (this.flags.labTalked) { open(); return; }
    this.flags.labTalked = true;
    this.say('lab_start', open);
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

  updatePanel() {
    const c = this.cfg, g = GAME_CONFIG.physics.g, m = c.cartMass;
    const s = this.run ? this.run.s : this.solved ? this.pathLen : 0;
    const v = this.run ? this.run.v : this.solved ? this.endV : 0;
    const h = this.height(s);
    const lines = [
      `범퍼 ${this.compress.toFixed(2)}m → 출발 ${this.launchSpeed().toFixed(2)} m/s  (필요 ${Math.sqrt(2 * g * 1).toFixed(2)})`,
      `광차 ${m}kg  높이 ${h.toFixed(2)}m  속력 ${Math.abs(v).toFixed(2)} m/s`,
    ];
    if (!this.curse.cursed) {
      const ep = m * g * h, ek = 0.5 * m * v * v;
      lines.push(`위치 에너지 ${ep.toFixed(0)}J + 운동 에너지 ${ek.toFixed(0)}J = ${(ep + ek).toFixed(0)}J`);
      lines.push(`범퍼가 해 준 일 ½kx² = ${(0.5 * c.springK * this.compress * this.compress).toFixed(0)}J`);
    }
    this.speedPanel.setLines(lines);
  }
}
window.MinecartScene = MinecartScene;

// ------------------------------------------------------------------ 진실의 원 안의 광차 실험 (실험 화면)
// 가벼운 광차와 무거운 광차를 같은 5m 높이의 비탈에서 함께 내려 보낸다 → 바닥에서 둘 다 10 m/s.
class CartLab {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const cfg = GAME_CONFIG.minecart.lab;
    this.cfg = cfg;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 110, '진실의 원 — 광차 실험', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    c.add(UIKit.text(scene, 960, 170, 'Space: 두 광차를 함께 출발    R: 처음으로    Esc: 닫기', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5));
    // 비탈 두 줄 (위: 가벼운 광차, 아래: 무거운 광차). 높이 5m를 화면에서 줄여 그림 (1m = 50px)
    this.scale = 50;
    this.lanes = cfg.masses.map((m, i) => {
      const top = { x: 300, y: 290 + i * 340 };
      const bottom = { x: 1100, y: top.y + cfg.height * this.scale };
      const gfx = scene.add.graphics();
      gfx.lineStyle(6, 0xbfe6ff, 0.8).lineBetween(top.x, top.y, bottom.x, bottom.y).lineBetween(bottom.x, bottom.y, 1700, bottom.y);
      const cart = scene.add.image(top.x, top.y, MANIFEST.objects.minecart.key).setOrigin(0.5, 1).setScale(i ? 0.7 : 0.5);
      const label = UIKit.text(scene, 0, 0, `${m}kg`, { fontSize: '26px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0.5, 1);
      const info = UIKit.text(scene, 1250, bottom.y - 90, '', { fontSize: '30px' });
      c.add([gfx, cart, label, info]);
      return { m, top, bottom, cart, label, info, len: Math.hypot(bottom.x - top.x, bottom.y - top.y) / this.scale };
    });
    this.result = UIKit.text(scene, 960, 980, '', { fontSize: '32px', fontStyle: 'bold' }).setOrigin(0.5);
    c.add(this.result);
    const kb = scene.input.keyboard;
    kb.on('keydown-SPACE', () => this.go());
    kb.on('keydown-R', () => this.reset());
    kb.on('keydown-ESC', () => this.close());
    scene.labUpdate((t, delta) => this.update(Math.min(delta, 50) / 1000));
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.container.setVisible(true);
    this.reset();
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  reset() {
    if (!this.isOpen) return;
    this.t = null;
    for (const L of this.lanes) { L.d = 0; L.v = 0; this.place(L); L.info.setText(''); }
    this.result.setText(`같은 ${this.cfg.height}m 높이에서 함께 내려 보내면, 바닥에서 누가 더 빠를까? (Space)`).setColor('#ffe08a');
  }

  go() {
    if (!this.isOpen || this.t !== null) return;
    this.t = 0;
    Sound.play('sfx_rail_clack');
  }

  place(L) {
    // d: 비탈 위 이동 거리 (m). 비탈 끝을 지나면 바닥을 따라 간다
    let x, y;
    if (L.d <= L.len) {
      const k = L.d / L.len;
      x = L.top.x + (L.bottom.x - L.top.x) * k; y = L.top.y + (L.bottom.y - L.top.y) * k;
    } else {
      x = L.bottom.x + (L.d - L.len) * this.scale; y = L.bottom.y;
    }
    L.cart.setPosition(Math.min(x, 1700), y);
    L.label.setPosition(L.cart.x, y - 70);
  }

  update(dt) {
    if (!this.isOpen || this.t === null) return;
    const g = GAME_CONFIG.physics.g, H = this.cfg.height;
    this.t += dt;
    for (const L of this.lanes) {
      // 비탈 위: 가속도 g sinθ (질량과 상관없음), 바닥: 그대로
      const a = L.d < L.len ? g * H / L.len : 0;
      L.v += a * dt;
      if (L.d < L.len && L.d + L.v * dt >= L.len) L.v = Math.sqrt(2 * g * H);   // 바닥에 닿는 순간 (에너지 보존 값)
      L.d += L.v * dt;
      this.place(L);
      const h = Math.max(0, H * (1 - L.d / L.len));
      L.info.setText(`${L.m}kg  높이 ${h.toFixed(1)}m  속력 ${L.v.toFixed(1)} m/s`);
    }
    if (this.lanes.every((L) => L.d >= L.len) && !this.done) {
      this.done = true;
      this.result.setText(`둘 다 바닥에서 ${Math.sqrt(2 * g * H).toFixed(0)} m/s! 무게와 상관없이 같은 높이에서 내려오면 같은 속력`).setColor(UIKit.SKY);
      Sound.play('sfx_lever_balance');
      UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
    }
  }
}
window.CartLab = CartLab;
