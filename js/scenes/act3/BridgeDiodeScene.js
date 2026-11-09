// 3-5 수정 다리 (ACT3_PLAN 5단계) — 배경 abyss_5 (3000px). 회로 판정은 js/physics/act3/diode.js, 값은 config.js 의 act3.diode·ch3_5
//   저주: 유리도 전기가 흐르고 LED가 방향과 상관없이 켜진다. 대신 마법사의 저주 마력이 귀환선을 거꾸로 타고 들어와 다리가 무너진다.
//   진실의 원: 에너지띠 그림 + p-n 접합. 순방향일 때만 전류가 흐른다.
//   해방: LED는 + 줄과 − 줄 사이에 따로따로(병렬) 이어져 ▶ 쪽이 + 줄을 향할 때만 켜진다. 모두 켜고 귀환선 다이오드를 바르게 끼우면 다리가 단단해진다.
//   전투: 저주 파동 — 다이오드 방패의 방향이 맞으면 막고, 거꾸로면 통과해 피해 2배 → 시험 17 → 오른쪽 출구로 3-6.
class BridgeDiodeScene extends ChapterScene {
  static MATERIALS = ['metal', 'silicon', 'glass'];
  static NAMES = { metal: '금속', silicon: '규소 수정', glass: '유리' };

  constructor() {
    super('Ch3_5');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act3.ch3_5, O = MANIFEST.objects, PX = this.PX, g = this.groundY;
    this.cfg = cfg;
    this.collapse = null;
    this.realizing = false;
    const saved = Save.chapter(this.scene.key);
    this.solid = !!saved.solid;
    this.tested = new Set(saved.tested || []);
    this.powerTried = !!saved.powerTried;
    this.diode = saved.diode || null;   // 귀환선 다이오드: null / 'forward'(저주 방향으로 통과) / 'reverse'(막음)
    const place = (o, x, y, state, depth) => {
      const img = this.add.image(x, y, o.states[state || Object.keys(o.states)[0]]).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };
    place(O.power_crystal, cfg.crystalX, g, null, 2);
    // 전도 시험기 + 시험 판
    this.tester = place(O.tester_lamp, cfg.testerX, g, 'off', 3);
    this.testGlow = { dim: place(O.tester_lamp_dim_glow, cfg.testerX, g, null, 2).setBlendMode('ADD').setVisible(false),
      bright: place(O.tester_lamp_bright_glow, cfg.testerX, g, null, 2).setBlendMode('ADD').setVisible(false) };
    this.sampleImg = place(O.bridge_tile_metal, cfg.testerX - 70, g, null, 3).setVisible(false);
    this.sampleI = -1;
    // 다리 판: 금속 → 유리 → 규소
    const seq = ['metal', 'glass', 'silicon'];
    this.tiles = [];
    for (let i = 0; i < cfg.tileCount; i++) {
      const m = seq[Math.floor(i / (cfg.tileCount / 3))];
      const img = place(O['bridge_tile_' + m], cfg.bridgeX + 62 + i * 125, g + O['bridge_tile_' + m].height, null, 2);
      this.tiles.push({ img, y0: img.y, off: 0, m });
    }
    // + 줄·− 줄·귀환선
    this.wires = this.add.graphics().setDepth(1);
    this.worldLayer.add(this.wires);
    this.drawWires();
    // LED: 1 m마다, + 줄과 − 줄 사이에 따로따로 (병렬)
    const dirs = saved.ledDirs;
    this.leds = [];
    for (let i = 0; i < cfg.ledCount; i++) {
      const x = cfg.bridgeX + 62 + i * 125;
      const glow = place(O.led_crystal_glow, x, g, null, 2).setBlendMode('ADD').setVisible(false);
      const img = place(O.led_crystal, x, g, 'off', 3).setInteractive({ useHandCursor: true });
      const led = { i, x, img, glow, dir: dirs ? dirs[i] : (i % 2 ? 'forward' : 'reverse'), lit: false };
      img.on('pointerdown', () => { if (!this.isBlocked() && !this.battle && !this.collapse) this.flipLed(led); });
      this.leds.push(led);
    }
    this.symG = this.add.graphics().setDepth(4);
    this.worldLayer.add(this.symG);
    // 귀환선 다이오드 자리
    this.diodeImg = place(O.diode_crystal, cfg.diodeX, g - cfg.diodeHeight, null, 4);
    this.diodeG = this.add.graphics().setDepth(5);
    this.worldLayer.add(this.diodeG);
    // 역류 (보라)
    this.flowImg = place(O.curse_backflow, cfg.bridgeEnd, g - cfg.diodeHeight, '01', 6).setVisible(false);
    this.flowT = 0;
    this.power = !this.curse.cursed;
    this.circle = this.curse.addTruthCircle({ centerX: cfg.circleX / PX, groundY: g, diameter: 2.2, domeHeight: 2.6 });
    this.curse.setCircleActive(this.circle, !this.curse.cursed || !!saved.circleLit);

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, g).setDepth(5);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, g).setDepth(4);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    this.held = new HeldItems(this, this.ian, { items: [] });

    const kb = this.input.keyboard;
    this.keysIn = kb.addKeys({ left: 'LEFT', right: 'RIGHT', act: 'Z', flip: 'C' });
    kb.addCapture(['Z', 'C']);
    this.keysIn.act.on('down', () => this.interact());
    this.keysIn.flip.on('down', () => this.flipShield());
    this.flags = {};
    this.actT = 0;
    this.lab = new JunctionLab(this, this.uiLayer);
    this.refreshLeds(true);
  }

  drawWires() {
    const c = this.cfg, G = this.wires, y = this.groundY, x0 = c.crystalX, x1 = c.bridgeX + 62 + (c.ledCount - 1) * 125;
    G.clear();
    G.lineStyle(5, 0xff6a5a, 1).lineBetween(x0, y - c.plusY, x1 + 20, y - c.plusY);
    G.lineStyle(5, 0x5aa0ff, 1).lineBetween(x0, y - c.minusY, x1 + 20, y - c.minusY);
    G.lineStyle(4, 0x8a6ab0, 0.9).lineBetween(x0, y - c.diodeHeight, c.bridgeEnd, y - c.diodeHeight);
  }

  addPrompts() {
    const c = this.cfg, free = () => !this.battle && !this.collapse;
    this.addPrompt({ key: 'Z', text: () => (this.sampleI < 0 ? '재질 시험하기' : '다음 재질 시험'), x: c.testerX, range: 0.6 * this.PX, when: free });
    this.addPrompt({ key: 'Z', text: '마력 수정 켜기', x: c.crystalX, range: 0.7 * this.PX,
      when: () => free() && this.curse.cursed && !this.circle.active });
    this.addPrompt({ key: 'Z', text: '에너지띠 실험', x: c.circleX, range: 1.1 * this.PX,
      when: () => this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x) });
    this.addPrompt({ key: 'Z', text: 'LED 돌리기', x: () => { const l = this.nearLed(); return l ? l.x : null; }, range: 0.5 * this.PX, y: this.groundY - 140,
      when: () => free() && !this.curse.cursed && !this.solid && !!this.nearLed() });
    this.addPrompt({ key: 'Z', text: () => (this.diode ? '다이오드 뒤집기' : '다이오드 끼우기'), x: c.diodeX, range: 0.45 * this.PX, y: this.groundY - 190,
      when: () => free() && !this.curse.cursed && !this.solid });
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  helpNormal() {
    return '← → 걷기   Z 시험·수정·LED·다이오드 (LED는 클릭도)   M 마법서';
  }

  onReady() {
    this.addPrompts();
    this.helpText = UIKit.text(this, 1900, 1070, this.helpNormal(), {
      fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(300);
    this.uiLayer.add(this.helpText);
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1130, 170);
    const saved = Save.chapter(this.scene.key);
    if (this.curse.cursed && !this.circle.active) this.message.setText('Z: 전도 시험기로 다리 재질을 시험해 보자');
    if (saved.battleDone && !saved.examPassed) {
      this.battle = { done: true, enemies: [] };
      this.examBtn = this.showExamIntro(() => this.startExam());
    }
    this.drawSymbols();
    this.drawDiode();
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 전기는 어떤 물질이든, 어느 방향이든 똑같이 흐른다?'
      : '진짜 법칙: 도체·반도체·부도체는 에너지띠가 다르고, p-n 접합(다이오드)은 한 방향으로만 전류를 흘린다';
  }

  canLeave() {
    return !!Save.chapter(this.scene.key).examPassed;
  }

  near(x, m) {
    return Math.abs(this.ian.x - x) <= m * this.PX;
  }

  teacherNumbers() {
    return [`지금: LED 순방향 ${this.leds.filter((l) => l.dir === 'forward').length} / ${this.leds.length}, 귀환선 다이오드 ${this.diode || '없음'}, 역류 ${Diode.backflow(this.diode, { cursed: this.curse.cursed }) ? '있음' : '막힘'}`];
  }

  // ------------------------------------------------------------------ LED
  nearLed() {
    return this.leds.filter((l) => Math.abs(l.x - this.ian.x) <= 0.5 * this.PX)
      .sort((a, b) => Math.abs(a.x - this.ian.x) - Math.abs(b.x - this.ian.x))[0] || null;
  }

  flipLed(led) {
    if (this.solid) return;
    led.dir = Diode.flip(led.dir);
    Sound.play('sfx_ui_click');
    Save.setChapter(this.scene.key, { ledDirs: this.leds.map((l) => l.dir) });
    this.refreshLeds();
    this.drawSymbols();
    this.checkSolid();
  }

  // 가지마다 따로 판정한다 (병렬)
  refreshLeds(silent) {
    const on = Diode.solve(this.leds.map((l) => [l.dir]), { cursed: this.curse.cursed });
    const O = MANIFEST.objects.led_crystal;
    this.leds.forEach((l, i) => {
      const lit = this.power && on[i];
      if (lit && !l.lit && !silent) this.ledSound();
      l.lit = lit;
      l.img.setTexture(O.states[lit ? 'on' : 'off']);
      l.glow.setVisible(lit && this.tiles[l.i].off < 40);
    });
  }

  // 켜질수록 음을 올린다 (ACT3_PLAN)
  ledSound() {
    if (!Sound.unlocked) return;
    const n = this.leds.filter((l) => l.lit).length, el = Sound.makeAudio('sfx_led_on', false);
    if (!el) return;
    el.preservesPitch = false;
    el.playbackRate = Math.min(2, 1 + n / this.leds.length);
    el.play().catch(() => {});
  }

  // LED 위 기호: ▼ + 막대 = 삼각형이 + 줄 쪽, 막대가 − 줄 쪽 (순방향). 거꾸로면 위아래가 바뀐다
  drawSymbols() {
    const G = this.symG, c = this.cfg, y = this.groundY - c.symbolY;
    G.clear();
    if (this.solid) return;
    for (const l of this.leds) {
      const off = this.tiles[l.i].off;
      if (off > 40) continue;
      const fw = l.dir === 'forward', col = fw ? 0x9fe0ff : 0xffb070, x = l.x + 30;
      const tip = fw ? y + 9 : y - 9, base = fw ? y - 9 : y + 9;
      G.fillStyle(col, 1).fillTriangle(x - 9, base, x + 9, base, x, tip).fillRect(x - 10, tip + (fw ? 0 : -3), 20, 3);
    }
  }

  // 귀환선 다이오드 기호: 저주는 왼쪽으로 흘러든다. 'reverse' = ▶| (막음), 'forward' = |◀ (통과)
  drawDiode() {
    const G = this.diodeG, c = this.cfg, x = c.diodeX, y = this.groundY - c.diodeHeight - 42;
    G.clear();
    this.diodeImg.setAlpha(this.diode ? 1 : 0.35);
    if (!this.diode) return;
    const right = this.diode === 'reverse', tip = right ? x + 14 : x - 14, base = right ? x - 14 : x + 14;
    G.fillStyle(right ? 0x9fe0ff : 0xffb070, 1).fillTriangle(base, y - 14, base, y + 14, tip, y).fillRect(tip + (right ? 0 : -4), y - 15, 4, 30);
  }

  checkSolid() {
    if (this.curse.cursed || this.solid) return;
    const blocked = !Diode.backflow(this.diode);
    if (!Diode.allOn(this.leds.map((l) => [l.dir])) || !blocked) return;
    this.solid = true;
    Save.setChapter(this.scene.key, { solid: true });
    this.flowImg.setVisible(false);
    for (const t of this.tiles) { t.off = 0; t.img.y = t.y0; }
    this.drawSymbols();
    Sound.play('sfx_diode_block');
    this.message.setText('모든 LED가 켜지고 역류가 막혔다! 다리가 단단해졌다').setColor(UIKit.SKY);
    this.say('bridge_solid', () => this.time.delayedCall(500, () => this.startBattle()));
  }

  // ------------------------------------------------------------------ Z
  interact() {
    if (this.isBlocked() || this.realizing || this.collapse) return;
    if (this.battle && !this.battle.done) return;
    const c = this.cfg;
    if (this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x)) {
      const open = () => this.lab.open(() => this.onLabDone());
      if (this.flags.labTalked) { open(); return; }
      this.flags.labTalked = true;
      this.say('lab_start', open);
      return;
    }
    if (this.near(c.testerX, 0.6)) { this.testNext(); return; }
    if (this.curse.cursed && this.near(c.crystalX, 0.7)) { this.powerCursed(); return; }
    if (this.curse.cursed || this.solid) return;
    if (this.near(c.diodeX, 0.45)) { this.turnDiode(); return; }
    const l = this.nearLed();
    if (l) this.flipLed(l);
  }

  testNext() {
    const M = BridgeDiodeScene.MATERIALS, O = MANIFEST.objects;
    this.sampleI = (this.sampleI + 1) % M.length;
    const m = M[this.sampleI], r = Diode.conduct(m, { cursed: this.curse.cursed });
    this.sampleImg.setTexture(O['bridge_tile_' + m].states.default).setVisible(true);
    this.tester.setTexture(O.tester_lamp.states[r]);
    this.testGlow.dim.setVisible(r === 'dim');
    this.testGlow.bright.setVisible(r === 'bright');
    Sound.play('sfx_tester_beep');
    const word = { bright: '밝게 켜진다', dim: '희미하게 켜진다', off: '켜지지 않는다' }[r];
    this.message.setText(`${BridgeDiodeScene.NAMES[m]}: ${word}`).setColor(this.curse.cursed ? '#ffe08a' : UIKit.SKY);
    this.tested.add(m);
    Save.setChapter(this.scene.key, { tested: [...this.tested] });
    if (this.curse.cursed && this.tested.size === M.length && !this.flags.testTalked) {
      this.flags.testTalked = true;
      this.say('test_cursed', () => this.message.setText('Z: 마력 수정을 켜 보자').setColor('#ffe08a'));
    }
  }

  // 저주: LED가 모두 켜지지만 역류로 다리가 무너진다
  powerCursed() {
    this.power = true;
    this.refreshLeds();
    Sound.play('sfx_switch_flip');
    this.message.setText('LED가 방향과 상관없이 모두 켜졌다!').setColor('#ffe08a');
    this.say('power_cursed', () => {
      this.collapse = { t: 0, phase: 'flow' };
      this.flowImg.setPosition(this.cfg.bridgeEnd, this.groundY - this.cfg.diodeHeight).setVisible(true);
      Sound.play('sfx_curse_backflow');
      this.message.setText('심연 끝에서 저주 마력이 귀환선을 거꾸로 타고 들어온다!').setColor('#ff9a9a');
    });
  }

  updateCollapse(dt) {
    const C = this.collapse, c = this.cfg;
    if (!C) return;
    C.t += dt;
    if (C.phase === 'flow') {
      const k = Math.min(1, C.t / c.flowSeconds);
      this.flowImg.x = c.bridgeEnd + (c.bridgeX - c.bridgeEnd) * k;
      this.animateFlow(dt);
      this.tiles.forEach((t, i) => {
        const on = (c.bridgeX + 62 + i * 125) >= this.flowImg.x;
        t.off = on ? Math.sin(C.t * 22 + i) * 5 : 0;
      });
      if (k >= 1) { C.phase = 'fall'; C.t = 0; this.flowImg.setVisible(false); }
    } else if (C.phase === 'fall') {
      this.tiles.forEach((t, i) => {
        const tt = Math.max(0, C.t - (this.tiles.length - i) * 0.06);
        t.off = 900 * tt * tt;
      });
      if (C.t > c.fallSeconds) {
        C.phase = 'back';
        this.power = false;
        this.collapse = null;
        this.powerTried = true;
        this.tiles.forEach((t) => { t.off = 0; });
        Save.setChapter(this.scene.key, { powerTried: true, circleLit: true });
        this.say('collapse', () => {
          this.message.setText('마력 수정 앞 바닥에 진실의 원이 나타났다! 가 보자').setColor(UIKit.SKY);
          this.curse.setCircleActive(this.circle, true);
          this.say('circle_found');
        });
      }
    }
    this.applyTiles();
    this.refreshLeds(true);
    this.drawSymbols();
  }

  applyTiles() {
    for (const t of this.tiles) t.img.y = t.y0 + t.off;
    for (const l of this.leds) l.img.y = this.groundY + this.tiles[l.i].off;
    this.wires.setAlpha(this.tiles[0].off > 40 ? 0 : 1);
  }

  animateFlow(dt) {
    this.flowT += dt;
    this.flowImg.setTexture(MANIFEST.objects.curse_backflow.states[String(1 + Math.floor(this.flowT * 10) % 4).padStart(2, '0')]);
  }

  turnDiode() {
    this.diode = !this.diode ? 'forward' : Diode.flip(this.diode);
    Save.setChapter(this.scene.key, { diode: this.diode });
    this.drawDiode();
    const blocked = !Diode.backflow(this.diode);
    Sound.play(blocked ? 'sfx_diode_block' : 'sfx_diode_pass');
    this.message.setText(blocked ? '역류가 막혔다! 저주 마력이 다이오드를 넘어오지 못한다' : '역류가 계속된다 — 다이오드 방향이 거꾸로다. 다시 Z').setColor(blocked ? UIKit.SKY : '#ffd27a');
    this.checkSolid();
  }

  onLabDone() {
    this.realizing = true;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.power = true;
        this.refreshLeds(true);
        this.drawSymbols();
        this.message.setText('이제 LED는 순방향일 때만 켜진다! 다리를 건너며 꺼진 LED를 돌리자 (Z)').setColor(UIKit.SKY);
        this.say('after_free');
      }));
    });
  }

  // 할 일 카드와 다음 물건 위 화살표 (총괄지시 73번)
  updateGuide() {
    const c = this.cfg, g = this.groundY;
    if (this.dialogue.active || this.collapse || this.battle) { this.pointArrow(null); return; }
    if (this.curse.cursed) {
      if (!this.flags.cardCursed && !this.circle.active) {
        this.flags.cardCursed = true;
        this.showTaskCard(['① 전도 시험기 앞에서 Z — 재질 셋 시험하기', '② 마력 수정 앞에서 Z — 켜 보기']);
      }
      if (this.circle.active) this.pointArrow(c.circleX, g - 150);
      else if (this.tested.size < 3) this.pointArrow(c.testerX, g - 110);
      else this.pointArrow(c.crystalX, g - 140);
      return;
    }
    if (this.solid) { this.pointArrow(null); return; }
    if (!this.flags.cardFreed) {
      this.flags.cardFreed = true;
      this.showTaskCard(['① 꺼진 LED 앞에서 Z (또는 클릭) — 돌리기', '② 다리 끝 다이오드 앞에서 Z — 끼우기']);
    }
    const off = this.leds.filter((l) => !l.lit).sort((a, b) => Math.abs(a.x - this.ian.x) - Math.abs(b.x - this.ian.x))[0];
    if (off) this.pointArrow(off.x, g - c.symbolY - 30);
    else this.pointArrow(c.diodeX, g - c.diodeHeight - 70);
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const k = this.keysIn, PX = this.PX, c = this.cfg;
    this.actT = Math.max(0, this.actT - dt);
    this.updateGuide();
    this.updateCollapse(dt);
    const dir = this.actT > 0 || this.realizing || this.collapse ? 0 : (k.right.isDown ? 1 : 0) - (k.left.isDown ? 1 : 0);
    if (dir) {
      const hi = this.curse.cursed ? c.bridgeX - 20 : (this.solid ? this.worldW - 60 : c.bridgeEnd - 40);
      this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * c.walkSpeed * PX * dt, 60, hi);
      this.ian.setFlipX(dir < 0);
    }
    if (!this.realizing && this.actT <= 0) Characters.play(this.ian, dir ? 'walk' : (this.held.pose() || 'idle'));
    this.updateGaron(dt);
    // 해방 뒤 아직 단단하지 않은 다리: 역류로 살짝 흔들린다
    if (!this.curse.cursed && !this.solid) {
      this.flowT += dt;
      const shake = Diode.backflow(this.diode) ? 3 : 1;
      this.tiles.forEach((t, i) => { t.off = Math.sin(this.flowT * 3 + i * 0.7) * shake; });
      this.applyTiles();
      if (Diode.backflow(this.diode)) {   // 역류가 귀환선을 타고 반복해서 들어온다
        this.flowImg.setVisible(true);
        const span = c.bridgeEnd - c.crystalX;
        this.flowImg.x = c.bridgeEnd - ((this.flowT * c.flowLoopSpeed) % span);
        this.animateFlow(dt);
      } else this.flowImg.setVisible(false);
    }
    this.updateBattle(dt);
    if (this.solid && !this.battle && !this.dialogue.active && !this.canLeave() && !this.flags.battleQueued) {
      this.flags.battleQueued = true;
      this.time.delayedCall(800, () => this.startBattle());
    }
    if (this.canLeave() && this.ian.x >= c.exitX && !this.flags.leaving) {
      this.flags.leaving = true;
      this.cameras.main.fadeOut(600, 0, 0, 0);
      this.time.delayedCall(650, () => this.goNext());
    }
    if (this.battle && !this.battle.done) this.updateBattleText();
    else this.updatePanel();
  }

  updateGaron(dt) {
    const g = this.garon, c = this.cfg, PX = this.PX;
    const d = this.ian.x - g.x, walk = Math.abs(d) > c.garonFollow * PX && !(this.battle && !this.battle.done);
    if (walk) {
      g.x += Math.sign(d) * c.walkSpeed * PX * dt;
      g.setFlipX(d < 0);
    }
    Characters.play(g, walk ? 'walk' : 'idle');
  }

  updatePanel() {
    const n = this.leds.filter((l) => l.lit).length;
    this.speedPanel.setLines([
      `시험한 재질: ${[...this.tested].map((m) => BridgeDiodeScene.NAMES[m]).join(', ') || '없음'}`,
      `LED ${n} / ${this.leds.length} 켜짐 (LED는 따로따로 이어져 있다)`,
      this.curse.cursed ? '역류: 막을 수 없다' : `귀환선 역류: ${Diode.backflow(this.diode) ? '들어오는 중' : '막힘'}`,
    ]);
  }

  // ------------------------------------------------------------------ 저주 파동 전투 (다이오드 방패)
  startBattle() {
    if (this.battle) return;
    if (this.dialogue.active) { this.time.delayedCall(500, () => this.startBattle()); return; }
    this.battle = { wave: 0, enemies: [], done: false, i: 0 };
    this.ianHp = 1;
    this.setMusicMode('midboss');
    this.held.setItems(['diode_shield']);
    this.helpText.setText('← → 걷기   1 다이오드 방패 들기·내리기   C 방패 방향 뒤집기   M 마법서');
    this.waveImgs = [];
    const B = this.cfg.battle;
    this.wizard = Characters.create(this, 'wizard', Math.min(this.ian.x + B.wizardDist * this.PX, this.worldW - 80), this.groundY, 'idle').setDepth(5);
    this.worldLayer.add(this.wizard);
    this.say('battle_start', () => {
      this.introKey('1', '다이오드 방패 — 파동이 오는 쪽으로 방향을 맞춘다');
      this.time.delayedCall(3300, () => this.introKey('C', '방패 방향 뒤집기 — 거꾸로면 그대로 통과해 피해 2배'));
      this.spawnWave();
    });
  }

  // 첫 파동 시작 (checkBattleStall도 이것을 부른다). 이후 파동은 updateBattle이 차례로 낸다
  spawnWave() {
    if (this.battle.wave === 0) {
      this.battle.wave = 1;
      this.battle.next = 2;
    }
  }

  endBattle() {
    const BT = this.battle;
    BT.done = true;
    for (const w of this.waveImgs) w.img.destroy();
    this.waveImgs = [];
    this.setMusicMode(null);
    this.held.setItems([]);
    this.helpText.setText('← → 걷기   M 마법서');
    Save.setChapter(this.scene.key, { battleDone: true });
    Characters.play(this.wizard, 'teleport', false);
    Sound.play('sfx_wizard_cast');
    this.time.delayedCall(450, () => { if (this.wizard.active) this.wizard.setVisible(false); });
    this.say('battle_done', () => {
      this.message.setText('저주 파동을 모두 막아 냈다!').setColor(UIKit.SKY);
      this.examBtn = this.showExamIntro(() => this.startExam());
    });
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      if (this.examBtn) this.examBtn.setVisible(false);
      Save.setChapter(this.scene.key, { examPassed: true });
      this.message.setText('3-5 에너지띠와 다이오드 — 마법서 시험 통과! 오른쪽 출구로').setColor(UIKit.SKY);
    });
  }

  flipShield() {
    if (!this.battle || this.battle.done || this.isBlocked() || !this.held.current) return;
    this.held.toggleReversed();
    Sound.play('sfx_ui_click');
  }

  updateBattle(dt) {
    const BT = this.battle;
    if (!BT || BT.done || !BT.wave) return;
    const B = this.cfg.battle, PX = this.PX, O = MANIFEST.objects.curse_backflow;
    this.animateWaves(dt, O);
    BT.t = (BT.t ?? 1.5) - dt;
    if (BT.t <= 0 && BT.i < B.sequence.length) {
      const side = B.sequence[BT.i++];
      BT.t = B.every;
      const x = Phaser.Math.Clamp(this.ian.x + side * B.wizardDist * PX, 80, this.worldW - 80);
      if (Math.abs(this.wizard.x - x) > 200 && Math.sign(this.wizard.x - this.ian.x) !== side) {   // 반대쪽으로 순간 이동
        Characters.play(this.wizard, 'teleport', false);
        this.message.setText(`마법사가 ${side > 0 ? '오른쪽' : '왼쪽'}으로 옮겨 갔다!`).setColor('#ffd27a');
      }
      this.wizard.setPosition(x, this.groundY).setFlipX(side < 0 ? false : false);
      this.wizard.setFlipX(this.ian.x > x);
      Characters.play(this.wizard, 'cast', false);
      Sound.play('sfx_wizard_cast');
      const img = this.add.image(x, this.groundY - B.waveHeight, O.states['01']).setDepth(7);
      this.worldLayer.add(img);
      this.waveImgs.push({ img, dir: side > 0 ? -1 : 1, x });
    }
    if (!this.wizard.anims.isPlaying) Characters.play(this.wizard, 'idle');
    for (const w of this.waveImgs) {
      w.x += w.dir * B.speed * PX * dt;
      w.img.setPosition(w.x, this.groundY - B.waveHeight).setFlipX(w.dir > 0);
      if (!w.hit && Math.abs(w.x - this.ian.x) < B.hitRange) {
        w.hit = true;
        const r = this.held.receive({ kind: 'wave', dir: w.dir });
        BT.done2 = (BT.done2 || 0) + 1;
        if (r.blocked) this.message.setText('막아 냈다! ▶| 방향이 파동과 반대라 전류가 흐르지 못한다').setColor(UIKit.SKY);
        else {
          this.ianHp = Math.max(0, this.ianHp - B.damage * r.damageScale);
          if (this.hud) this.hud.set('health', this.ianHp);
          Sound.play('sfx_ian_hurt');
          Characters.play(this.ian, 'hurt', false);
          this.actT = 0.3;
          this.message.setText(r.damageScale > 1 ? '방패가 거꾸로다! 순방향이라 그대로 통과해 피해 2배 — C로 뒤집자' : '파동에 맞았다! 1: 방패를 들자').setColor('#ff9a9a');
          if (this.ianHp <= 0) { this.battleLost(); return; }
        }
        w.img.destroy();
      }
    }
    this.waveImgs = this.waveImgs.filter((w) => !w.hit && w.x > -100 && w.x < this.worldW + 100);
    if (BT.i >= B.sequence.length && !this.waveImgs.length && !BT.waiting) {
      BT.waiting = true;
      this.time.delayedCall(800, () => this.endBattle());
    }
  }

  animateWaves(dt, O) {
    this.flowT += dt;
    const st = O.states[String(1 + Math.floor(this.flowT * 10) % 4).padStart(2, '0')];
    for (const w of this.waveImgs) w.img.setTexture(st);
  }

  battleLost() {
    const BT = this.battle;
    for (const w of this.waveImgs) w.img.destroy();
    this.waveImgs = [];
    BT.i = 0;
    BT.t = 2;
    BT.done2 = 0;
    this.ianHp = 1;
    if (this.hud) this.hud.set('health', 1);
    this.message.setText('이안이 쓰러졌다… 처음부터 다시').setColor('#ff9a9a');
    this.cameras.main.flash(400, 40, 0, 0);
  }

  updateBattleText() {
    const BT = this.battle, B = this.cfg.battle, cur = this.held.current;
    this.speedPanel.setLines([
      `저주 파동 ${Math.min(BT.done2 || 0, B.sequence.length)} / ${B.sequence.length}`,
      cur ? `방패 ▶ 방향: ${this.held.arrow() > 0 ? '오른쪽' : '왼쪽'} (파동과 반대로)` : '방패를 들자 (1)',
      `거꾸로 들면 피해 ${Diode.cfg().shieldWrongDamage}배`,
    ]);
  }
}
window.BridgeDiodeScene = BridgeDiodeScene;

// ------------------------------------------------------------------ 진실의 원 실험: 에너지띠 그림 + p-n 접합
class JunctionLab {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 60, '진실의 원 — 에너지띠와 p-n 접합', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    c.add(UIKit.text(scene, 960, 118, 'Space: 전지 방향 뒤집기    Esc: 닫기', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5));
    this.info = UIKit.text(scene, 960, 170, '', { fontSize: '28px', align: 'center' }).setOrigin(0.5, 0);
    c.add(this.info);
    // 왼쪽: 마법서 17장 삽화
    const U = MANIFEST.ui.act3['17_semiconductor'];
    const im = scene.add.image(470, 520, U.key);
    im.setScale(Math.min(780 / im.width, 500 / im.height));
    c.add(im);
    c.add(UIKit.text(scene, 470, 790, '도체 · 반도체 · 부도체의 에너지띠', { fontSize: '24px', color: '#cfe3f5' }).setOrigin(0.5));
    // 오른쪽: 회로 그림
    this.g = scene.add.graphics();
    c.add(this.g);
    this.lbl = {
      plus: UIKit.text(scene, 0, 0, '+', { fontSize: '44px', fontStyle: 'bold', color: '#ff8a7a' }).setOrigin(0.5),
      minus: UIKit.text(scene, 0, 0, '−', { fontSize: '44px', fontStyle: 'bold', color: '#7ab0ff' }).setOrigin(0.5),
    };
    c.add(UIKit.text(scene, 1300, 480, 'p형', { fontSize: '34px', fontStyle: 'bold', color: '#101820' }).setOrigin(0.5));
    c.add(UIKit.text(scene, 1500, 480, 'n형', { fontSize: '34px', fontStyle: 'bold', color: '#101820' }).setOrigin(0.5));
    c.add([this.lbl.plus, this.lbl.minus]);
    this.state = UIKit.text(scene, 1400, 620, '', { fontSize: '32px', fontStyle: 'bold' }).setOrigin(0.5);
    c.add(this.state);
    this.results = UIKit.text(scene, 960, 860, '', { fontSize: '28px', align: 'center', lineSpacing: 8 }).setOrigin(0.5, 0);
    c.add(this.results);
    scene.input.keyboard.on('keydown-SPACE', () => this.isOpen && this.flip());
    scene.input.keyboard.on('keydown-ESC', () => this.close());
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.dir = 'forward';
    this.t = 0;
    this.seen = { forward: 0, reverse: 0 };
    this.container.setVisible(true);
    this.results.setText('');
    this.info.setText('p형과 n형을 붙인 규소 수정에 전지를 이었다 — Space로 전지를 뒤집어 보자').setColor('#ffe08a');
    Sound.play('sfx_truth_circle_enter');
    Sound.play('sfx_diode_pass');
    this.draw();
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  flip() {
    if (this.done) return;
    this.dir = Diode.flip(this.dir);
    Sound.play(this.dir === 'forward' ? 'sfx_diode_pass' : 'sfx_diode_block');
    this.draw();
  }

  draw() {
    const G = this.g, fw = this.dir === 'forward', L = 1100, R = 1700, top = 330, y = 480, flows = Diode.flows(this.dir);
    const wire = flows ? 0xffe08a : 0x4a5a6a;
    G.clear();
    // 전지 → 왼쪽 전선 → p형 → n형 → 오른쪽 전선 → 등불 → 전지 (한 바퀴로 이어진다)
    G.lineStyle(5, wire, 1).lineBetween(L, top, R, top).lineBetween(L, top, L, y).lineBetween(R, top, R, y).lineBetween(L, y, 1200, y).lineBetween(1600, y, R, y);
    // p·n 블록
    G.fillStyle(0xffb0a0, 1).fillRect(1200, y - 60, 200, 120);
    G.fillStyle(0xa0c8ff, 1).fillRect(1400, y - 60, 200, 120);
    G.lineStyle(3, 0x101820, 1).strokeRect(1200, y - 60, 400, 120);
    // 전지 (위쪽 전선 가운데)
    G.fillStyle(0x061018, 1).fillRect(1370, top - 30, 60, 60);
    G.lineStyle(6, 0xf3ead6, 1).lineBetween(fw ? 1388 : 1412, top - 26, fw ? 1388 : 1412, top + 26);
    G.lineStyle(4, 0xf3ead6, 1).lineBetween(fw ? 1412 : 1388, top - 14, fw ? 1412 : 1388, top + 14);
    this.lbl.plus.setPosition(fw ? 1340 : 1460, top - 44);
    this.lbl.minus.setPosition(fw ? 1460 : 1340, top - 44);
    // 등불 (위쪽 전선 오른쪽)
    G.fillStyle(flows ? 0xffe08a : 0x303a44, 1).fillCircle(1580, top, 26);
    G.lineStyle(3, 0xf3ead6, 1).strokeCircle(1580, top, 26);
    this.state.setText(flows ? '순방향: + 쪽에 p형 → 전류가 흐른다' : '역방향: + 쪽에 n형 → 전류가 흐르지 않는다').setColor(flows ? UIKit.SKY : '#ffb070');
  }

  update(dt) {
    if (!this.isOpen || this.done) return;
    const L = GAME_CONFIG.act3.ch3_5.lab;
    this.seen[this.dir] += dt;
    if (this.seen.forward >= L.holdSeconds && this.seen.reverse >= L.holdSeconds) {
      this.done = true;
      this.results.setText('전류는 순방향(p형 쪽이 +)일 때만 흐른다 — 다이오드는 일방통행 문이다\n띠 사이 틈이 좁은 반도체라서 p형·n형을 만들어 이런 일을 할 수 있다').setColor(UIKit.SKY);
      UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
    }
  }
}
window.JunctionLab = JunctionLab;
