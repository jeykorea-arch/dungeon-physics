// 3-4 바코드 등불의 방 (ACT3_PLAN 4단계) — 배경 abyss_4 (2400px). 선 계산은 js/physics/act3/spectrum.js, 값은 config.js 의 act3.spectrum·ch3_4
//   저주: 분광 수정으로 어느 등불을 봐도 무지개처럼 연속된 띠만 보인다.
//   진실의 원(에너지 계단): 공은 계단 위에만 선다. n = 3·4·5·6 → 2로 떨어질 때 그 차이에 맞는 색의 빛만 나온다.
//   해방: 원소마다 정해진 선만. 문 위 바코드(수은)와 같은 등불을 문 앞 받침으로 옮기면 문이 열린다.
//   전투: 겉모습이 비슷한 원소 정령 — 분광 수정으로 바코드를 보고, 표와 비교해 맞는 봉인(2~5)을 쓴다 → 시험 16 → 문으로 3-5.
class SpectrumScene extends ChapterScene {
  static NAMES = { hydrogen: '수소', sodium: '나트륨', neon: '네온', mercury: '수은' };
  static SEALS = ['hydrogen', 'sodium', 'neon', 'mercury'];

  constructor() {
    super('Ch3_4');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act3.ch3_4, O = MANIFEST.objects, PX = this.PX, g = this.groundY;
    this.cfg = cfg;
    this.dooring = false;
    this.realizing = false;
    const saved = Save.chapter(this.scene.key);
    this.looked = new Set(saved.looked || []);
    this.doorOpen = !!saved.doorOpen;
    this.place = (o, x, y, state, depth) => {
      const img = this.add.image(x, y, o.states[state || Object.keys(o.states)[0]]).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };
    this.place(O.energy_stairs, cfg.stairsX, g, null, 1);
    this.door = this.place(O.spectrum_door, cfg.doorX, g, this.doorOpen ? 'opening_04' : 'closed', 1);
    // 문 위 바코드 판: 수은의 선
    this.place(O.barcode_panel, cfg.doorX, cfg.barcodeY, null, 2);
    const bar = this.add.graphics().setDepth(3);
    this.worldLayer.add(bar);
    const B = [cfg.doorX - 86, cfg.barcodeY + 14, cfg.doorX + 86, cfg.barcodeY + 46];
    bar.fillStyle(0x05080c, 1).fillRect(B[0], B[1], B[2] - B[0], B[3] - B[1]);
    Spectrum.drawStrip(bar, B, Spectrum.cfg().doorElement, { lineWidth: 2 });
    this.barcodeG = bar;
    // 받침 넷 + 문 앞 받침, 등불
    cfg.pedestals.forEach((x) => this.place(O.lamp_pedestal, x, g, null, 1));
    this.place(O.lamp_pedestal, cfg.doorPedestalX, g, null, 1);
    const top = g - O.lamp_pedestal.height - O.spectrum_lamp.height;
    this.lampTop = top;
    this.lamps = Spectrum.cfg().lampOrder.map((el, i) => {
      const go = O[`spectrum_lamp_${el}_glow`];
      const glow = this.place(go, cfg.pedestals[i], top, null, 2).setBlendMode('ADD');
      const img = this.place(O.spectrum_lamp, cfg.pedestals[i], top, el, 3);
      return { el, img, glow, home: cfg.pedestals[i] };
    });
    if (this.doorOpen) { const L = this.lampOf(Spectrum.cfg().doorElement); this.setLampX(L, cfg.doorPedestalX); L.placed = true; }
    this.carried = null;

    this.circle = this.curse.addTruthCircle({ centerX: cfg.stairsX / PX, groundY: g, diameter: 3, domeHeight: 2.6 });
    this.curse.setCircleActive(this.circle, !this.curse.cursed || !!saved.circleLit);

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, g).setDepth(5);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, g).setDepth(4);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    this.held = new HeldItems(this, this.ian, { items: ['spectroscope'] });

    const kb = this.input.keyboard;
    this.keysIn = kb.addKeys({ left: 'LEFT', right: 'RIGHT', act: 'Z' });
    kb.addCapture(['Z']);
    this.keysIn.act.on('down', () => this.interact());
    ['TWO', 'THREE', 'FOUR', 'FIVE'].forEach((k, i) => kb.on('keydown-' + k, () => this.useSeal(SpectrumScene.SEALS[i])));
    this.flags = {};
    this.actT = 0;
    this.lab = new StairsLab(this, this.uiLayer);
    this.view = new SpectroView(this, this.uiLayer);
    this.sealPanel = new SealPanel(this, this.uiLayer);
  }

  lampOf(el) {
    return this.lamps.find((l) => l.el === el);
  }

  setLampX(L, x) {
    L.img.x = x;
    L.glow.x = x;
  }

  nearLamp() {
    return this.lamps.filter((l) => !l.placed && l !== this.carried && Math.abs(this.ian.x - l.img.x) <= this.cfg.reach * this.PX)[0] || null;
  }

  addPrompts() {
    const c = this.cfg, free = () => !this.battle;
    const lampX = () => { const l = this.nearLamp(); return l ? l.img.x : null; };
    this.addPrompt({ key: 'Z', text: () => (this.held.current || this.curse.cursed ? '분광 수정으로 보기' : '등불 들기'), x: lampX, range: c.reach * this.PX,
      y: this.lampTop - 40, when: () => free() && !this.carried && !this.view.isOpen && !this.doorOpen });
    this.addPrompt({ key: 'Z', text: '문 앞 받침에 놓기', x: c.doorPedestalX, range: c.reach * this.PX, when: () => !!this.carried });
    this.addPrompt({ key: 'Z', text: '에너지 계단 실험', x: c.stairsX, range: 1.4 * this.PX,
      when: () => this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x) });
    this.addPrompt({ key: 'Z', text: '문으로 들어가기', x: c.doorX, range: 1.2 * this.PX, when: () => this.doorOpen && this.canLeave() });
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  helpNormal() {
    return '← → 걷기   1 분광 수정 들기·내리기   Z 등불 보기·들기·실험   M 마법서';
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
    if (this.curse.cursed && !this.circle.active) this.message.setText('1: 분광 수정을 들고 등불 앞에서 Z');
    if (saved.battleDone && !saved.examPassed) {
      this.battle = { done: true, enemies: [] };
      this.examBtn = this.showExamIntro(() => this.startExam());
    }
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 원자는 아무 에너지나 내놓는다? (무지개처럼 연속 스펙트럼)'
      : '진짜 법칙: 에너지 준위는 띄엄띄엄 정해져 있어, 원소마다 정해진 색의 선만 나온다';
  }

  canLeave() {
    return !!Save.chapter(this.scene.key).examPassed;
  }

  // ------------------------------------------------------------------ Z
  interact() {
    if (this.isBlocked() || this.realizing || this.dooring) return;
    if (this.view.isOpen) { this.view.close(); return; }
    if (this.battle && !this.battle.done) { this.scanSpirit(); return; }
    const c = this.cfg;
    if (this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x)) {
      const open = () => this.lab.open(() => this.onLabDone());
      if (this.flags.labTalked) { open(); return; }
      this.flags.labTalked = true;
      this.say('lab_start', open);
      return;
    }
    if (this.carried) {
      if (Math.abs(this.ian.x - c.doorPedestalX) <= c.reach * this.PX) this.placeLamp();
      else this.dropLamp();
      return;
    }
    if (this.doorOpen) {
      if (this.canLeave() && Math.abs(this.ian.x - c.doorX) <= 1.2 * this.PX && !this.flags.leaving) {
        this.flags.leaving = true;
        this.cameras.main.fadeOut(600, 0, 0, 0);
        this.time.delayedCall(650, () => this.goNext());
      }
      return;
    }
    const L = this.nearLamp();
    if (!L) return;
    if (this.held.current === 'spectroscope') { this.lookLamp(L); return; }
    if (this.curse.cursed) { this.message.setText('1: 분광 수정을 먼저 들자').setColor('#ffd27a'); return; }
    this.carried = L;
    Sound.play('sfx_ui_click');
    this.message.setText(`${SpectrumScene.NAMES[L.el]} 등불을 들었다 — 문 앞 받침으로 (Z: 놓기)`).setColor('#ffe08a');
  }

  lookLamp(L) {
    const cursed = this.curse.cursed;
    Sound.play('sfx_spectro_look');
    if (!cursed) Sound.play('sfx_spectrum_' + L.el);
    this.view.open(L.el, { cursed, title: cursed ? '분광 수정으로 본 등불' : `${SpectrumScene.NAMES[L.el]} 등불의 선`, compare: !cursed });
    this.looked.add(L.el);
    Save.setChapter(this.scene.key, { looked: [...this.looked] });
    if (cursed && !this.flags.lookTalked) {
      this.flags.lookTalked = true;
      this.say('cursed_look');
    } else if (cursed && this.looked.size >= this.cfg.lookNeeded && !this.circle.active) {
      this.view.close();
      this.say('cursed_same', () => {
        Save.setChapter(this.scene.key, { circleLit: true });
        this.message.setText('에너지 계단 앞 바닥에 진실의 원이 나타났다! 가 보자').setColor(UIKit.SKY);
        this.curse.setCircleActive(this.circle, true);
        this.say('circle_found');
      });
    } else if (cursed) this.message.setText('다른 등불도 봐 보자').setColor('#ffe08a');
  }

  dropLamp() {
    const L = this.carried;
    this.carried = null;
    this.setLampX(L, L.home);
    L.img.y = this.lampTop;
    L.glow.y = this.lampTop;
    this.message.setText('등불을 제자리에 돌려놓았다').setColor('#ffe08a');
  }

  placeLamp() {
    const L = this.carried, c = this.cfg;
    if (!Spectrum.matchesDoor(L.el)) {
      Sound.play('sfx_exam_wrong');
      this.dropLamp();
      this.message.setText('문이 반응하지 않는다 — 바코드가 다르다. 분광 수정으로 비교해 보자').setColor('#ffd27a');
      return;
    }
    this.carried = null;
    L.placed = true;
    this.setLampX(L, c.doorPedestalX);
    L.img.y = this.lampTop;
    L.glow.y = this.lampTop;
    this.dooring = true;
    Sound.play('sfx_spectrum_' + L.el);
    this.message.setText('바코드가 일치한다! 문이 열린다').setColor(UIKit.SKY);
    this.doorOpen = true;
    Save.setChapter(this.scene.key, { doorOpen: true });
    Sound.play('sfx_door_open');
    const O = MANIFEST.objects.spectrum_door;
    ['opening_01', 'opening_02', 'opening_03', 'opening_04'].forEach((s, i) => this.time.delayedCall(250 * (i + 1), () => this.door.setTexture(O.states[s])));
    this.time.delayedCall(1400, () => { this.dooring = false; this.say('door_open', () => this.time.delayedCall(400, () => this.startBattle())); });
  }

  onLabDone() {
    this.realizing = true;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.message.setText('분광 수정으로 등불을 다시 보자 — 문 위 바코드와 같은 등불은?').setColor(UIKit.SKY);
        this.say('after_free');
      }));
    });
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const k = this.keysIn, PX = this.PX, c = this.cfg;
    this.actT = Math.max(0, this.actT - dt);
    const dir = this.actT > 0 || this.realizing ? 0 : (k.right.isDown ? 1 : 0) - (k.left.isDown ? 1 : 0);
    if (dir) {
      this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * c.walkSpeed * PX * dt, 60, this.doorOpen ? c.doorX + 40 : c.doorX - 180);
      this.ian.setFlipX(dir < 0);
      if (this.view.isOpen && !this.battle) this.view.close();
    }
    if (!this.realizing && this.actT <= 0) {
      Characters.play(this.ian, dir ? 'walk' : (this.carried ? 'hold_front' : this.held.pose() || 'idle'));
    }
    if (this.carried) {   // 등불을 들고 다닌다 (이안 앞 위쪽)
      const f = this.ian.flipX ? -1 : 1;
      this.setLampX(this.carried, this.ian.x + f * 50);
      this.carried.img.y = this.ian.y - 190;
      this.carried.glow.y = this.ian.y - 190;
    }
    this.updateGaron(dt);
    this.updateBattle(dt);
    if (this.doorOpen && !this.battle && !this.dialogue.active && !this.canLeave() && !this.dooring && !this.flags.battleQueued) {
      this.flags.battleQueued = true;
      this.time.delayedCall(800, () => this.startBattle());
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
    this.speedPanel.setLines([
      this.curse.cursed ? '등불의 빛: 무지개처럼 이어진 띠?' : '등불의 빛: 원소마다 정해진 선',
      `본 등불: ${[...this.looked].length}개   문: ${this.doorOpen ? '열림' : '닫힘'}`,
    ]);
  }

  // ------------------------------------------------------------------ 원소 정령 전투
  startBattle() {
    if (this.battle) return;
    if (this.dialogue.active) { this.time.delayedCall(500, () => this.startBattle()); return; }
    this.battle = { wave: 0, enemies: [], done: false };
    this.ianHp = 1;
    this.view.close();
    this.setMusicMode('midboss');
    this.helpText.setText('← → 걷기   1 분광 수정 들기   Z 정령 보기   2~5 봉인 쓰기   M 마법서');
    this.beamG = this.add.graphics().setDepth(7);
    this.tagG = this.add.graphics().setDepth(8);
    this.worldLayer.add([this.beamG, this.tagG]);
    this.sealPanel.show();
    this.say('battle_start', () => {
      this.introKey('2~5', '봉인 — 정령의 바코드를 표와 비교해 맞는 봉인을 쓴다');
      this.spawnWave();
    });
  }

  spawnWave() {
    const B = this.cfg.battle, BT = this.battle, PX = this.PX;
    for (const e of BT.enemies) { if (e.s.active) e.s.destroy(); if (e.glow.active) e.glow.destroy(); }
    BT.enemies = [];
    BT.wave += 1;
    if (BT.wave > B.waves.length) { this.endBattle(); return; }
    B.waves[BT.wave - 1].forEach((el, i) => {
      const side = this.ian.x > 1100 ? -1 : 1;
      const x = Phaser.Math.Clamp(this.ian.x + side * (B.spawnAhead + i * B.spawnGap) * PX, 200, 2250);
      const s = Characters.create(this, 'elemental_' + el, x, B.floatY, 'float').setDepth(6);
      const G = MANIFEST.characters['elemental_' + el].glow;
      const glow = this.add.image(x, B.floatY, G.key).setDepth(5).setBlendMode('ADD');
      this.worldLayer.add([glow, s]);
      BT.enemies.push({ s, glow, el, hp: B.hp, max: B.hp, t: 2 + i * 1.5, phase: i * 1.3, known: false });
    });
  }

  endBattle() {
    this.battle.done = true;
    this.beamG.clear();
    this.tagG.clear();
    this.sealPanel.hide();
    this.setMusicMode(null);
    this.helpText.setText('← → 걷기   M 마법서');
    Save.setChapter(this.scene.key, { battleDone: true });
    this.say('battle_done', () => {
      this.message.setText('원소 정령을 모두 봉인했다!').setColor(UIKit.SKY);
      this.examBtn = this.showExamIntro(() => this.startExam());
    });
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      if (this.examBtn) this.examBtn.setVisible(false);
      Save.setChapter(this.scene.key, { examPassed: true });
      this.message.setText('3-4 선스펙트럼과 에너지 준위 — 마법서 시험 통과! 열린 문으로 들어가자 (Z)').setColor(UIKit.SKY);
    });
  }

  alive() {
    return this.battle.enemies.filter((e) => !e.gone);
  }

  nearestSpirit(range) {
    return this.alive().filter((e) => Math.abs(e.s.x - this.ian.x) <= range * this.PX)
      .sort((a, b) => Math.abs(a.s.x - this.ian.x) - Math.abs(b.s.x - this.ian.x))[0] || null;
  }

  // Z: 분광 수정으로 가장 가까운 정령을 본다 → 머리 위에 바코드
  scanSpirit() {
    if (this.held.current !== 'spectroscope') { this.message.setText('1: 분광 수정을 들자').setColor('#ffd27a'); return; }
    const e = this.nearestSpirit(this.cfg.battle.scanRange);
    if (!e) { this.message.setText('정령이 멀다 — 더 가까이').setColor('#ffd27a'); return; }
    this.ian.setFlipX(e.s.x < this.ian.x);
    Sound.play('sfx_spectro_look');
    if (!e.known) {
      e.known = true;
      Sound.play('sfx_identity_reveal');
      Sound.play('sfx_spectrum_' + e.el);
    }
    this.message.setText('바코드가 보인다! 왼쪽 표와 비교해 맞는 봉인을 쓰자 (2~5)').setColor(UIKit.SKY);
  }

  // 2~5: 봉인. 맞으면 큰 피해, 틀리면 거의 통하지 않는다
  useSeal(el) {
    if (!this.battle || this.battle.done || !this.battle.wave || this.isBlocked() || this.actT > 0) return;
    const B = this.cfg.battle, e = this.nearestSpirit(B.sealRange);
    if (!e) { this.message.setText('봉인이 닿지 않는다 — 더 가까이').setColor('#ffd27a'); return; }
    this.ian.setFlipX(e.s.x < this.ian.x);
    Characters.play(this.ian, 'attack_light', false);
    this.actT = 0.3;
    const right = e.el === el, col = 0xffe9a0;
    this.beamG.clear().lineStyle(8, col, 0.45).lineBetween(this.ian.x, this.ian.y - 120, e.s.x, e.s.y).lineStyle(3, 0xfffbe6, 1).lineBetween(this.ian.x, this.ian.y - 120, e.s.x, e.s.y);
    this.beamT = 0.15;
    e.hp -= right ? B.sealRight : B.sealWrong;
    if (right) {
      e.known = true;
      Sound.play('sfx_spectrum_' + el);
      this.message.setText(`${SpectrumScene.NAMES[el]} 봉인이 먹혔다! 피해 ${B.sealRight}`).setColor(UIKit.SKY);
    } else {
      Sound.play('sfx_spirit_deflect');
      this.message.setText(`${SpectrumScene.NAMES[el]} 봉인이 거의 통하지 않는다 — 바코드를 다시 보자`).setColor('#ffd27a');
    }
    if (e.hp <= 0) {
      e.gone = true;
      Characters.play(e.s, 'vanish', false);
      e.glow.setVisible(false);
      Sound.play('sfx_spirit_melt');
    } else Characters.play(e.s, 'hurt', false);
  }

  updateBattle(dt) {
    const BT = this.battle;
    if (!BT || BT.done || !BT.wave) return;
    const B = this.cfg.battle, PX = this.PX, T = this.tagG;
    this.beamT = Math.max(0, (this.beamT || 0) - dt);
    if (this.beamT <= 0) this.beamG.clear();
    T.clear();
    for (const e of BT.enemies) {
      if (e.gone) continue;
      const d = this.ian.x - e.s.x;
      e.phase += dt;
      e.s.setFlipX(d > 0);   // 그림은 왼쪽을 본다
      e.s.y = B.floatY + Math.sin(e.phase * Math.PI) * B.bob;
      if (Math.abs(d) > B.keepDist * PX) e.s.x += Math.sign(d) * B.speed * PX * dt;
      e.glow.setPosition(e.s.x, e.s.y);
      if (e.known) {   // 머리 위 바코드
        const r = [e.s.x - 110, e.s.y - 130, e.s.x + 110, e.s.y - 102];
        T.fillStyle(0x05080c, 0.95).fillRect(r[0] - 3, r[1] - 3, 226, 34);
        Spectrum.drawStrip(T, r, e.el, { lineWidth: 2 });
      }
      if (!e.s.anims.isPlaying) Characters.play(e.s, 'float');
      e.t -= dt;
      if (e.t <= 0.4 && !e.charging) { e.charging = true; Characters.play(e.s, 'attack', false); }
      if (e.t <= 0) {
        e.t = B.attackEvery;
        e.charging = false;
        const col = MANIFEST.characters['elemental_' + e.el].emissionColor, c = (col[0] << 16) | (col[1] << 8) | col[2];
        this.beamG.clear().lineStyle(8, c, 0.45).lineBetween(e.s.x, e.s.y, this.ian.x, this.ian.y - 110).lineStyle(3, 0xffffff, 0.9).lineBetween(e.s.x, e.s.y, this.ian.x, this.ian.y - 110);
        this.beamT = 0.2;
        Sound.play('sfx_spirit_attack');
        this.ianHp = Math.max(0, this.ianHp - B.damage);
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
    for (const e of BT.enemies) { if (e.s.active) e.s.destroy(); if (e.glow.active) e.glow.destroy(); }
    BT.enemies = [];
    BT.wave -= 1;
    this.ianHp = 1;
    this.beamG.clear();
    this.tagG.clear();
    if (this.hud) this.hud.set('health', 1);
    this.message.setText('이안이 쓰러졌다… 이 무리를 처음부터').setColor('#ff9a9a');
    this.cameras.main.flash(400, 40, 0, 0);
    this.time.delayedCall(1500, () => this.spawnWave());
  }

  updateBattleText() {
    const BT = this.battle, B = this.cfg.battle;
    this.speedPanel.setLines([
      ...this.alive().map((e, i) => `원소 정령 ${i + 1}: ${Math.ceil(e.hp)} / ${e.max}${e.known ? ' — 바코드 봄' : ''}`),
      `맞는 봉인 피해 ${B.sealRight}, 틀린 봉인 ${B.sealWrong}`,
      `무리 ${Math.max(1, BT.wave)} / ${B.waves.length}`,
    ]);
  }
}
window.SpectrumScene = SpectrumScene;

// ------------------------------------------------------------------ 분광 수정 화면 (spectroscope_view): 등불의 빛을 띠로
class SpectroView {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const U = MANIFEST.ui.act3.spectroscope_view, V = GAME_CONFIG.act3.ch3_4.view;
    this.U = U;
    this.V = V;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(330).setVisible(false);
    layer.add(c);
    this.container = c;
    this.x0 = V.x - U.width / 2;
    this.y0 = V.y - U.height / 2;
    c.add(scene.add.image(V.x, V.y, U.key));
    this.g = scene.add.graphics();
    c.add(this.g);
    this.title = UIKit.text(scene, V.x, this.y0 + 40, '', { fontSize: '28px', fontStyle: 'bold', color: UIKit.SKY, backgroundColor: '#0b1320cc', padding: { x: 10, y: 4 } }).setOrigin(0.5);
    c.add(this.title);
    this.cmpText = UIKit.text(scene, this.x0 + U.strip_rect[0], this.y0 + U.height + 12, '문 위 바코드 (비교)', { fontSize: '22px', color: '#ffe08a', backgroundColor: '#0b1320cc', padding: { x: 8, y: 3 } });
    c.add(this.cmpText);
  }

  open(el, { cursed = false, title = '', compare = false } = {}) {
    const R = this.U.strip_rect, x = this.x0, y = this.y0;
    this.isOpen = true;
    this.container.setVisible(true);
    this.title.setText(title);
    this.g.clear();
    const rect = [x + R[0], y + R[1], x + R[2], y + R[3]];
    this.g.fillStyle(0x05080c, 1).fillRect(rect[0], rect[1], rect[2] - rect[0], rect[3] - rect[1]);
    Spectrum.drawStrip(this.g, rect, el, { cursed, lineWidth: 4 });
    this.cmpText.setVisible(compare);
    if (compare) {
      const c2 = [rect[0], y + this.U.height + 50, rect[2], y + this.U.height + 100];
      this.g.fillStyle(0x05080c, 1).fillRect(c2[0], c2[1], c2[2] - c2[0], c2[3] - c2[1]);
      Spectrum.drawStrip(this.g, c2, Spectrum.cfg().doorElement, { lineWidth: 4 });
    }
  }

  close() {
    this.isOpen = false;
    this.container.setVisible(false);
  }
}
window.SpectroView = SpectroView;

// ------------------------------------------------------------------ 전투 때 왼쪽 표: 봉인 키 + 원소 이름 + 바코드
class SealPanel {
  constructor(scene, layer) {
    const P = GAME_CONFIG.act3.ch3_4.sealPanel;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(310).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(P.x, P.y, P.w, P.rowH * 4 + 50, 0x0b1320, 0.92).setOrigin(0, 0).setStrokeStyle(2, 0x9fd8ff, 0.6));
    c.add(UIKit.text(scene, P.x + 12, P.y + 8, '봉인 표', { fontSize: '22px', fontStyle: 'bold', color: UIKit.SKY }));
    const g = scene.add.graphics();
    c.add(g);
    SpectrumScene.SEALS.forEach((el, i) => {
      const y = P.y + 42 + i * P.rowH;
      c.add(UIKit.text(scene, P.x + 12, y + 4, `${i + 2} ${SpectrumScene.NAMES[el]}`, { fontSize: '22px' }));
      const r = [P.x + 130, y, P.x + P.w - 12, y + P.rowH - 8];
      g.fillStyle(0x05080c, 1).fillRect(r[0], r[1], r[2] - r[0], r[3] - r[1]);
      Spectrum.drawStrip(g, r, el, { lineWidth: 2 });
    });
  }

  show() { this.container.setVisible(true); }

  hide() { this.container.setVisible(false); }
}
window.SealPanel = SealPanel;

// ------------------------------------------------------------------ 진실의 원 실험: 에너지 계단
// 공은 단 위에만 선다. 3~6단에서 2단으로 떨어질 때 그 차이에 맞는 빛이 나온다. 저주의 미끄럼틀과 나란히 비교한다.
class StairsLab {
  static LEVELS = [2, 3, 4, 5, 6];

  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    const L = GAME_CONFIG.act3.ch3_4.lab, O = MANIFEST.objects;
    this.L = L;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 60, '진실의 원 — 에너지 계단', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    c.add(UIKit.text(scene, 960, 118, '3·4·5·6 공을 그 단으로 올려 떨어뜨리기    Esc 닫기', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5));
    this.info = UIKit.text(scene, 960, 170, '', { fontSize: '28px', align: 'center' }).setOrigin(0.5, 0);
    c.add(this.info);
    c.add(scene.add.image(L.x, L.y, O.energy_stairs.states.default).setOrigin(0, 0).setScale(L.scale));
    StairsLab.LEVELS.forEach((n, i) => {
      const p = L.ball[i];
      c.add(UIKit.text(scene, L.x + p[0] * L.scale, L.y + (p[1] + 30) * L.scale, `n=${n}`, { fontSize: '22px', fontStyle: 'bold', backgroundColor: '#061018cc', padding: { x: 4, y: 2 } }).setOrigin(0.5, 0));
    });
    this.ball = scene.add.image(0, 0, O.energy_ball.states.default).setScale(L.scale * 0.8);
    c.add(this.ball);
    c.add(UIKit.text(scene, L.stripX, L.stripY1 - 40, '저주의 미끄럼틀: 아무 색이나 이어진다', { fontSize: '26px', color: '#d7b6ff' }));
    c.add(UIKit.text(scene, L.stripX, L.stripY2 - 40, '에너지 계단: 정해진 색만 나온다', { fontSize: '26px', color: UIKit.SKY }));
    const g0 = scene.add.graphics();
    c.add(g0);
    Spectrum.drawStrip(g0, [L.stripX, L.stripY1, L.stripX + L.stripW, L.stripY1 + L.stripH], 'hydrogen', { cursed: true });
    g0.fillStyle(0x05080c, 1).fillRect(L.stripX, L.stripY2, L.stripW, L.stripH).lineStyle(2, 0x9fe0ff, 1).strokeRect(L.stripX, L.stripY2, L.stripW, L.stripH);
    this.g = scene.add.graphics();   // 띠 바탕(g0) 뒤에 넣는다 — 앞에 넣으면 검은 바탕이 선을 덮는다 (총괄지시 72번)
    c.add(this.g);
    // 선 아래 글 (가까운 410·434 nm가 겹치지 않게 두 줄로)
    this.lineTexts = {};
    [3, 4, 5, 6].forEach((n, i) => {
      const nm = Spectrum.emittedNm(n), x = Spectrum.xOnStrip(nm, [L.stripX, L.stripY2, L.stripX + L.stripW, L.stripY2 + L.stripH]);
      const t = UIKit.text(scene, x, L.stripY2 + L.stripH + 8 + (i % 2) * 30, `${n}→2  ${Math.round(nm)} nm`, { fontSize: '22px' }).setOrigin(0.5, 0).setVisible(false);
      c.add(t);
      this.lineTexts[n] = t;
    });
    this.results = UIKit.text(scene, 960, 860, '', { fontSize: '28px', align: 'center', lineSpacing: 8 }).setOrigin(0.5, 0);
    c.add(this.results);
    [['THREE', 3], ['FOUR', 4], ['FIVE', 5], ['SIX', 6]].forEach(([k, n]) => scene.input.keyboard.on('keydown-' + k, () => this.isOpen && this.drop(n)));
    scene.input.keyboard.on('keydown-ESC', () => this.close());
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  ballPos(n) {
    const L = this.L, p = L.ball[StairsLab.LEVELS.indexOf(n)];
    return { x: L.x + p[0] * L.scale, y: L.y + p[1] * L.scale };
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.anim = null;
    this.emitted = new Set();
    this.g.clear();
    Object.values(this.lineTexts).forEach((t) => t.setVisible(false));
    this.flash = 0;
    const p = this.ballPos(2);
    this.ball.setPosition(p.x, p.y);
    this.container.setVisible(true);
    this.results.setText('');
    this.info.setText('공은 계단 위에만 설 수 있다. 3~6을 눌러 떨어뜨려 보자').setColor('#ffe08a');
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  drop(n) {
    if (this.done || this.anim) return;
    this.anim = { n, t: 0, from: this.ballPos(2), top: this.ballPos(n) };
  }

  update(dt) {
    if (!this.isOpen) return;
    const a = this.anim, L = this.L;
    if (!a) return;
    a.t += dt;
    const up = L.upSeconds, fall = L.fallSeconds;
    if (a.t < up) {   // 위 단으로 올린다 (단 사이에 멈추지 않고 바로)
      const k = a.t / up;
      this.ball.setPosition(a.from.x + (a.top.x - a.from.x) * k, a.from.y + (a.top.y - a.from.y) * k);
    } else if (a.t < up + L.waitSeconds) this.ball.setPosition(a.top.x, a.top.y);
    else if (a.t < up + L.waitSeconds + fall) {
      const k = (a.t - up - L.waitSeconds) / fall;
      this.ball.setPosition(a.top.x + (a.from.x - a.top.x) * k, a.top.y + (a.from.y - a.top.y) * k * k);
    } else {
      this.ball.setPosition(a.from.x, a.from.y);
      this.emit(a.n);
      this.anim = null;
    }
  }

  // 떨어진 차이에 맞는 빛: 띠에 선이 하나 생긴다
  emit(n) {
    const L = this.L, nm = Spectrum.emittedNm(n), rect = [L.stripX, L.stripY2, L.stripX + L.stripW, L.stripY2 + L.stripH], x = Spectrum.xOnStrip(nm, rect), col = Spectrum.color(nm);
    Sound.play('sfx_ball_step');
    this.emitted.add(n);
    this.redraw();
    const p = this.ballPos(2);
    this.g.lineStyle(5, col, 0.9).lineBetween(p.x, p.y, x, rect[1] + L.stripH / 2);   // 공에서 띠까지 그 색의 빛줄기
    this.scene.time.delayedCall(600, () => this.redraw());
    this.lineTexts[n].setVisible(true);
    this.info.setText(`${n}단 → 2단: ${Math.round(nm)} nm의 빛 — 몇 번을 떨어뜨려도 같은 색이다`).setColor(UIKit.SKY);
    if (this.emitted.size === 4 && !this.done) {
      this.done = true;
      this.results.setText('단 사이에는 멈출 수 없으니, 준위 차이에 맞는 빛만 나온다\n그래서 원소마다 정해진 색의 선만 보인다').setColor(UIKit.SKY);
      UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
    }
  }

  // 빛줄기는 지우고 선만 다시 그린다
  redraw() {
    const L = this.L, rect = [L.stripX, L.stripY2, L.stripX + L.stripW, L.stripY2 + L.stripH];
    this.g.clear();
    for (const n of this.emitted) {
      const nm = Spectrum.emittedNm(n);
      this.g.fillStyle(Spectrum.color(nm), 1).fillRect(Spectrum.xOnStrip(nm, rect) - 3, rect[1], 6, L.stripH);
    }
  }
}
window.StairsLab = StairsLab;
