// 1-5 거친 돌바닥 (ACT1_PLAN 5단계 1~4번) — 배경 07 (왼쪽 9.72m는 얼음, 그 오른쪽은 거친 돌바닥)
//
// 왼쪽 벽의 용수철 범퍼가 돌 수레(50kg)를 얼음 위로 밀어 보낸다: ½kx² = 운동 에너지.
// 얼음 위에서는 속력 그대로, 거친 돌바닥에 들어서면 마찰력 μmg로 느려져 멈춘다.
//   멈출 때까지 미끄러진 거리 d = 운동 에너지 ÷ (μmg), 마찰이 한 일 μmg × d = 줄어든 운동 에너지
// 저주: 수레는 똑같이 느려지지만 아무것도 뜨거워지지 않는다 → "에너지가 닳아 없어졌다".
// 해방: 마찰이 한 일이 열이 된다. 돌바닥 틈의 얼어붙은 웅덩이(1m 칸마다 하나)는 그 위를 수레가 미끄러지며
//   생긴 열이 쌓이는 만큼 녹는다(melting_ice_hole 1~4단계). 열쇠는 3~4m 칸의 얼음 속에 있다.
// 진실의 원 실험: 추(10kg)가 2m 내려가며 물속 날개를 돌리면 물(0.1kg)이 조금씩 따뜻해진다.
class RoughFloorScene extends ChapterScene {
  constructor() {
    super('Ch1_5');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.roughFloor;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    this.boundary = RAW_JSON.act1_objects.scene_layout['1-5'].floor_material_boundary_x_px;

    // 얼어붙은 웅덩이 칸 (처음 얼음 frozen_puddle = 0단계, 녹는 모습은 melting_ice_hole 1~4단계 — 요청서 06)
    this.cells = [];
    for (let i = 0; i < cfg.cellCount; i++) {
      const x = this.boundary + (i + 0.5) * PX;
      const y = this.groundY + cfg.puddleY;
      const ice = this.add.image(x, y, O.frozen_puddle.key).setScale(cfg.holeScale).setDepth(-1);
      const hole = this.add.image(x, y, O.melting_ice_hole_01.key).setScale(cfg.holeScale).setDepth(-1).setVisible(false);
      this.worldLayer.add([ice, hole]);
      this.cells.push({ i, x, y, heat: 0, stage: 0, ice, hole });
    }
    // 열쇠 (얼음 속에 흐릿하게 보인다)
    const kc = this.cells[cfg.keyCell];
    this.key = this.add.image(kc.x, kc.y, O.frozen_key.key).setScale(cfg.holeScale).setDepth(-0.5).setAlpha(0.35);
    this.worldLayer.add(this.key);
    this.keyFree = false;
    this.hasKey = false;

    // 범퍼와 수레 (왼쪽 벽, 얼음 위)
    this.bumper = this.add.image(0, this.groundY, O.spring_bumper.key).setOrigin(0, 1).setDepth(1);
    this.cartStartX = O.spring_bumper.width + O.stone_cart.width / 2;
    this.cart = this.add.image(this.cartStartX, this.groundY, O.stone_cart.key).setOrigin(0.5, 1).setDepth(2);
    this.cartLabel = UIKit.text(this, 0, 0, `${cfg.cartMass}kg`, {
      fontSize: '22px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 6, y: 2 },
    }).setOrigin(0.5, 1).setDepth(5);
    this.worldLayer.add([this.bumper, this.cart, this.cartLabel]);
    this.compress = 0;
    this.run = null;
    this.glow = this.add.graphics().setDepth(1);
    this.worldLayer.add(this.glow);

    // 이안(거친 돌바닥 위에서 걷는다)·가론(범퍼 옆)
    this.curse.addTruthCircle({ centerX: cfg.circleX, groundY: this.groundY, diameter: 3.0, domeHeight: 2.6 });
    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, this.groundY).setDepth(4);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, this.groundY).setDepth(3);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    // 카메라: 이안을 따라가되 이안이 화면 오른쪽에 있을 때까지는 왼쪽 끝(범퍼·수레)이 보이게 (총괄지시 수정목록 6번)
    this.camFocus = this.add.rectangle(960, this.worldH / 2, 1, 1).setVisible(false);
    this.worldLayer.add(this.camFocus);
    this.curse.followTarget(this.camFocus, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    this.circleHint = UIKit.text(this, cfg.circleX * PX, this.groundY - 300, 'Z: 물 데우기 실험', {
      fontSize: '26px', color: UIKit.SKY, backgroundColor: '#0b1320cc', padding: { x: 10, y: 6 },
    }).setOrigin(0.5).setVisible(false);
    this.worldLayer.add(this.circleHint);

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT' });
    kb.addCapture(['UP', 'DOWN', 'Z']);
    kb.on('keydown-UP', () => this.setCompress(1));
    kb.on('keydown-DOWN', () => this.setCompress(-1));
    kb.on('keydown-SPACE', () => this.launch());
    kb.on('keydown-Z', () => this.act());
    this.flags = {};
    this.realizing = false;
    this.lab = new HeatLab(this, this.uiLayer);
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  onReady() {
    this.setMusicMode('puzzle');
    this.speedPanel.moveTo(560, 140);
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '← → 걷기   ↑ ↓ 범퍼 누르기   Space 수레 보내기   Z 실험·열쇠 줍기   M 마법서', {
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
      ? '얼음 속에 열쇠가 보인다… 수레를 보내 봐도 돌바닥은 차갑기만 하다'
      : '마찰이 한 일은 열이 된다 — ↑ ↓ 범퍼 누르기 · Space 수레 보내기').setColor(this.curse.cursed ? '#ffe08a' : UIKit.SKY);
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 거친 바닥에서 에너지가 닳아 없어진다?'
      : '줄어든 운동 에너지 = 마찰이 한 일 = 생긴 열';
  }

  onCurseChanged() {
    super.onCurseChanged();
    if (this.message) this.setMessage();
  }

  // ------------------------------------------------------------------ 범퍼·수레
  setCompress(dir) {
    if (this.isBlocked() || this.run || this.hasKey) return;
    const c = this.cfg;
    this.compress = Phaser.Math.Clamp(Math.round((this.compress + dir * c.compressStep) / c.compressStep) * c.compressStep, 0, c.maxCompress);
    this.placeBumper(MANIFEST.objects.spring_bumper.width - this.compress * this.PX);
    this.cart.x = this.bumper.x + this.bumper.displayWidth + MANIFEST.objects.stone_cart.width / 2;   // 수레는 눌린 판에 붙어 함께 밀려난다
    Sound.play('sfx_ui_click');
  }

  // 범퍼 폭(px): 눌린 만큼 짧아지고, 놓으면 수레를 밀며 다시 펴진다
  placeBumper(w) {
    const W = MANIFEST.objects.spring_bumper.width;
    this.bumper.setScale(Phaser.Math.Clamp(w, 20, W) / W, 1);
  }

  launch() {
    if (this.isBlocked() || this.run || this.hasKey) return;
    const c = this.cfg;
    if (this.compress <= 0) { this.message.setText('범퍼를 먼저 눌러야(↑) 수레가 나간다').setColor('#ffd27a'); return; }
    const ke = 0.5 * c.springK * this.compress * this.compress;
    const v0 = Math.sqrt(2 * ke / c.cartMass);
    Sound.play('sfx_spring_bumper');
    this.run = { v: v0, v0, ke0: ke, slid: 0, heat: 0, x: this.cart.x, done: false };
    this.message.setText(`범퍼 ${this.compress.toFixed(1)}m → 운동 에너지 ${ke.toFixed(0)}J, ${v0.toFixed(2)} m/s`).setColor(this.curse.cursed ? '#c79bff' : UIKit.SKY);
  }

  updateCart(dt) {
    const c = this.cfg, PX = this.PX, g = GAME_CONFIG.physics.g;
    const r = this.run;
    if (!r || r.done) return;
    const friction = c.mu * c.cartMass * g;                // 마찰력 (N)
    let dx = r.v * dt;                                     // 이번에 움직이는 거리 (m)
    const onRough = r.x >= this.boundary;
    // 얼음에서 돌바닥으로 넘어가는 프레임은 경계에서 멈춰 다음 프레임부터 마찰을 받는다 (열이 1칸 앞에서 새지 않게)
    if (!onRough && r.x + dx * PX > this.boundary) dx = (this.boundary - r.x) / PX;
    if (onRough) {
      // 등가속도 감속: 남은 운동 에너지로 갈 수 있는 거리를 넘지 않게
      const a = friction / c.cartMass;
      const stopDist = r.v * r.v / (2 * a);
      dx = Math.min(dx, stopDist);
      r.v = Math.sqrt(Math.max(0, r.v * r.v - 2 * a * dx));
      r.slid += dx;
      const w = friction * dx;                             // 마찰이 한 일
      r.heat += w;
      if (!this.curse.cursed) {
        // 이번에 지나간 구간을 1m 칸 경계로 나눠, 칸마다 지나간 길이만큼 열을 나눠 준다
        const x0 = (r.x - this.boundary) / PX, x1 = x0 + dx;
        for (const cell of this.cells) {
          const len = Math.min(x1, cell.i + 1) - Math.max(x0, cell.i);
          if (len > 0) this.addHeat(cell, friction * len);
        }
      }
      Sound.startLoop('sfx_rough_scrape_loop');
    }
    r.x += dx * PX;
    this.cart.x = r.x;
    if (r.v <= 1e-4 && onRough) {
      r.done = true;
      Sound.stopLoop('sfx_rough_scrape_loop');
      this.message.setText(this.curse.cursed
        ? `${r.slid.toFixed(2)}m 미끄러져 멈췄다. 운동 에너지 ${r.ke0.toFixed(0)}J은… 사라졌다?`
        : `${r.slid.toFixed(2)}m 미끄러져 멈췄다: 운동 에너지 ${r.ke0.toFixed(0)}J → 마찰이 한 일 ${r.heat.toFixed(0)}J → 열`)
        .setColor(this.curse.cursed ? '#c79bff' : UIKit.SKY);
      // 잠시 뒤 가론이 수레를 처음 자리로 끌어 온다
      this.time.delayedCall(c.resetDelay * 1000, () => {
        this.run = null;
        this.compress = 0;
        this.placeBumper(MANIFEST.objects.spring_bumper.width);
        this.cart.x = this.cartStartX;
        if (!this.hasKey) this.setMessage();
      });
    }
    if (r.x >= this.worldW - 160) { r.v = 0; r.x = this.worldW - 160; }
  }

  addHeat(cell, w) {
    const c = this.cfg;
    cell.heat += w;
    const stage = Math.min(4, Math.floor(cell.heat / (c.meltHeat / 4) + 1e-6));
    if (stage !== cell.stage) {
      cell.stage = stage;
      if (stage > 0) {
        const n = String(stage).padStart(2, '0');
        cell.hole.setTexture(MANIFEST.objects[`melting_ice_hole_${n}`].key).setVisible(true);
        cell.ice.setVisible(false);       // 녹기 시작하면 녹은 홈 그림으로 바뀐다
        Sound.play('sfx_ice_sizzle');
      }
      if (cell.i === c.keyCell && stage === 4 && !this.keyFree) {
        this.keyFree = true;
        this.key.setAlpha(1).setDepth(3);
        this.message.setText('얼음이 다 녹아 열쇠가 드러났다! 이안으로 가서 Z').setColor(UIKit.SKY);
      }
    }
  }

  // ------------------------------------------------------------------ 이안
  act() {
    if (this.isBlocked()) return;
    const kc = this.cells[this.cfg.keyCell];
    if (this.keyFree && !this.hasKey && Math.abs(this.ian.x - kc.x) < this.cfg.pickReach * this.PX) {
      this.hasKey = true;
      this.key.setVisible(false);
      Sound.play('sfx_weapon_unlock');
      Save.setChapter(this.scene.key, { key: true, freed: true });
      this.message.setText('열쇠를 얻었다!').setColor(UIKit.SKY);
      this.say('key', () => {
        this.uiLayer.add(UIKit.button(this, 960, 985, '다음 ▶', () => this.goNext(), { fontSize: 30 })
          .setScrollFactor(0).setDepth(320));
      });
      return;
    }
    this.tryExperiment();
  }

  tryExperiment() {
    if (this.run || !this.curse.cursed || !this.curse.inCircle(this.ian.x)) return;
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

  updateWorld(dt) {
    const c = this.cfg, PX = this.PX;
    const dir = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    if (!this.realizing) {
      this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * GAME_CONFIG.iceCorridor.walkSpeed * PX * dt,
        this.boundary + 0.4 * PX, this.worldW - 0.5 * PX);
      if (dir) this.ian.setFlipX(dir < 0);
      Characters.play(this.ian, dir ? 'walk' : 'idle');
    }
    Characters.play(this.garon, 'idle');
    this.updateCart(dt);
    // 놓은 범퍼는 수레 뒤를 따라 다시 펴진다 (판이 수레를 미는 모습)
    if (this.run && !this.run.done) this.placeBumper(this.cart.x - MANIFEST.objects.stone_cart.width / 2 - this.bumper.x);
    this.camFocus.x = Math.max(960, this.ian.x - 540);
    this.cartLabel.setPosition(this.cart.x, this.cart.y - 140);
    // 해방 상태에서 수레가 돌바닥을 긁는 동안 바퀴 아래가 붉게 달아오른다
    this.glow.clear();
    const r = this.run;
    if (r && !r.done && !this.curse.cursed && r.x >= this.boundary) {
      this.glow.fillStyle(0xff7a2a, 0.45).fillEllipse(this.cart.x, this.groundY - 4, 220, 22);
    }
    this.circleHint.setVisible(this.curse.cursed && this.curse.inCircle(this.ian.x) && !this.isBlocked());
    this.updatePanel();
  }

  updatePanel() {
    const c = this.cfg, g = GAME_CONFIG.physics.g;
    const r = this.run;
    const ke = r ? 0.5 * c.cartMass * r.v * r.v : 0;
    const lines = [
      `범퍼 ${this.compress.toFixed(1)}m → ${(0.5 * c.springK * this.compress * this.compress).toFixed(0)}J   수레 ${c.cartMass}kg  마찰력 ${(c.mu * c.cartMass * g).toFixed(0)}N`,
    ];
    if (r) {
      lines.push(`속력 ${r.v.toFixed(2)} m/s  돌바닥에서 ${r.slid.toFixed(2)}m`);
      lines.push(this.curse.cursed
        ? `운동 에너지 ${ke.toFixed(0)}J  (줄어든 ${(r.ke0 - ke).toFixed(0)}J은 어디로?)`
        : `운동 에너지 ${ke.toFixed(0)}J + 열 ${r.heat.toFixed(0)}J = ${(ke + r.heat).toFixed(0)}J`);
    }
    const kc = this.cells[c.keyCell];
    lines.push(`열쇠 칸(${c.keyCell}~${c.keyCell + 1}m) 얼음이 받은 열 ${Math.min(kc.heat, c.meltHeat).toFixed(0)} / ${c.meltHeat}J`);
    this.speedPanel.setLines(lines);
  }
}
window.RoughFloorScene = RoughFloorScene;

// ------------------------------------------------------------------ 진실의 원 안의 물 데우기 실험 (실험 화면)
// 추가 내려가며 물속 날개를 돌린다 → 추의 위치 에너지 mgh가 물의 열이 된다. 물의 온도 변화 = mgh ÷ (4200 × 물 질량)
class HeatLab {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const cfg = GAME_CONFIG.roughFloor.lab;
    this.cfg = cfg;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 110, '진실의 원 — 물 데우기 실험', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    c.add(UIKit.text(scene, 960, 170, 'Space: 추 떨어뜨리기    Esc: 닫기', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5));
    // 그림: 물통 + 날개 + 도르래 + 추 + 온도계 (엔진으로)
    this.g = scene.add.graphics();
    c.add(this.g);
    this.weight = scene.add.rectangle(1240, 300, 70, 70, 0x8a8f99).setStrokeStyle(3, 0xdfe6ee);
    this.wLabel = UIKit.text(scene, 1240, 300, `${cfg.weightMass}kg`, { fontSize: '24px', fontStyle: 'bold', color: '#1a1a1a' }).setOrigin(0.5);
    this.info = UIKit.text(scene, 960, 900, '', { fontSize: '30px', align: 'center', lineSpacing: 10 }).setOrigin(0.5, 0);
    this.temp = UIKit.text(scene, 560, 280, '', { fontSize: '30px', fontStyle: 'bold', color: '#ffb38a' }).setOrigin(0.5);
    c.add([this.weight, this.wLabel, this.info, this.temp]);
    const kb = scene.input.keyboard;
    kb.on('keydown-SPACE', () => this.drop());
    kb.on('keydown-ESC', () => this.close());
    scene.labUpdate((t, delta) => this.update(Math.min(delta, 50) / 1000));
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.drops = 0;
    this.T = this.cfg.startTemp;
    this.falling = null;
    this.paddle = 0;
    this.weight.y = 300;
    this.container.setVisible(true);
    this.info.setText(`${this.cfg.weightMass}kg 추가 ${this.cfg.dropHeight}m 내려가며 물(${this.cfg.waterMass}kg) 속 날개를 돌린다 (Space)`).setColor('#ffe08a');
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  drop() {
    if (!this.isOpen || this.falling || this.done) return;
    this.falling = { t: 0 };
    Sound.play('sfx_wheel_tick');
  }

  update(dt) {
    if (!this.isOpen) return;
    const c = this.cfg;
    const top = 300, bottom = 300 + c.dropHeight * 150;      // 화면에서 1m = 150px
    if (this.falling) {
      // 날개가 물을 휘저어 추는 일정한 느린 속력으로 내려간다
      this.falling.t += dt;
      const k = Math.min(1, this.falling.t / c.dropSeconds);
      this.weight.y = top + (bottom - top) * k;
      this.paddle += dt * 10;
      if (k >= 1) {
        this.falling = null;
        this.drops++;
        const e = c.weightMass * GAME_CONFIG.physics.g * c.dropHeight;
        this.T += e / (4200 * c.waterMass);
        this.weight.y = top;                                   // 추를 다시 감아 올린다
        this.info.setText(`추의 위치 에너지 ${c.weightMass}×${GAME_CONFIG.physics.g}×${c.dropHeight} = ${e}J → 물의 열\n`
          + `물 온도 +${(e / (4200 * c.waterMass)).toFixed(2)}°C  (${this.drops}번)`).setColor(UIKit.SKY);
        if (this.drops >= c.dropsToRealize && !this.done) {
          this.done = true;
          Sound.play('sfx_lever_balance');
          UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
        }
      }
    }
    this.wLabel.setPosition(this.weight.x, this.weight.y);
    const g = this.g;
    g.clear();
    // 물통
    g.fillStyle(0x3a76b8, 0.8).fillRect(760, 520, 400, 260);
    g.lineStyle(6, 0xdfe6ee, 1).strokeRect(760, 500, 400, 280);
    // 날개 (회전)
    for (let i = 0; i < 4; i++) {
      const a = this.paddle + i * Math.PI / 2;
      g.lineStyle(10, 0xc9a26a, 1).lineBetween(960, 650, 960 + Math.cos(a) * 110, 650 + Math.sin(a) * 40);
    }
    g.lineStyle(6, 0xc9a26a, 1).lineBetween(960, 440, 960, 650);
    // 도르래와 줄
    g.fillStyle(0x777f8a, 1).fillCircle(1240, 230, 30);
    g.lineStyle(3, 0xdfe6ee, 1).lineBetween(960, 440, 960, 230).lineBetween(960, 230, 1240, 230).lineBetween(1240, 230, 1240, this.weight.y - 35);
    // 온도계
    const t0 = c.startTemp, frac = Phaser.Math.Clamp((this.T - t0) / 3, 0, 1);
    g.fillStyle(0xffffff, 1).fillRect(545, 330, 30, 400).fillCircle(560, 740, 30);
    g.fillStyle(0xe2463a, 1).fillCircle(560, 740, 22).fillRect(552, 720 - 380 * frac, 16, 380 * frac + 10);
    this.temp.setText(`${this.T.toFixed(2)}°C`);
  }
}
window.HeatLab = HeatLab;
