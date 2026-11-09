// 3-3 너무 작은 룬 문자의 방 (ACT3_PLAN 3단계) — 배경 abyss_3 (2400px). 점 찍기는 js/physics/act3/dots.js, 값은 config.js 의 act3.dots·ch3_3
//   저주: 돋보기로 봐도 룬이 흐릿하다. 감광판은 점 없이 그림 전체가 고르게 밝아지고, 전자는 틈 뒤에 띠 두 개로만 쌓인다.
//   진실의 원: 약한 빛은 한 점씩 찍혀 그림이 되고, 전자는 하나씩 쏴도 쌓이면 간섭무늬가 된다.
//   해방: 전자의 눈으로 보면 룬이 또렷하다 → 감광판에 빛 알갱이를 모아 그림 완성 → 그림자 벌레 전투(전자의 눈으로만 보인다) → 시험 15 → 오른쪽 끝으로 3-4.
class DualityScene extends ChapterScene {
  constructor() {
    super('Ch3_3');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act3.ch3_3, O = MANIFEST.objects, PX = this.PX, g = this.groundY;
    this.cfg = cfg;
    this.plateRun = null;
    this.sampler = null;
    this.realizing = false;
    const saved = Save.chapter(this.scene.key);
    this.tried = { tablet: !!saved.triedTablet, plate: !!saved.triedPlate, electron: !!saved.triedElectron };
    this.runeRead = !!saved.runeRead;
    this.plateDone = !!saved.plateDone;
    const place = (o, x, y, state, depth) => {
      const img = this.add.image(x, y, o.states[state || Object.keys(o.states)[0]]).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };
    this.tablet = place(O.rune_tablet, cfg.tabletX, cfg.wallTop, this.runeRead ? 'sharp' : 'blurred', 1);
    place(O.photo_plate, cfg.plateX, cfg.wallTop, null, 1);
    place(O.electron_apparatus, cfg.apparatusX, g, null, 1);
    // 감광판 투영 자리: 해방은 점을 찍는 캔버스, 저주는 그림 전체가 고르게 밝아진다
    const R = O.photo_plate.photosensitive_region, px = cfg.plateX - O.photo_plate.pivot.x + R[0], py = cfg.wallTop + R[1];
    this.plateW = R[2] - R[0];
    this.plateH = R[3] - R[1];
    this.plateCanvas = new DotCanvas(this, 'duality_plate', this.plateW, this.plateH);
    this.plateImg = this.add.image(px, py, 'duality_plate').setOrigin(0, 0).setDepth(2);
    this.glowImg = this.add.image(px, py, O.photo_target.states.default).setOrigin(0, 0).setDisplaySize(this.plateW, this.plateH).setDepth(2).setAlpha(0);
    this.worldLayer.add([this.plateImg, this.glowImg]);
    this.plateCount = 0;
    this.plateCarry = 0;
    this.lightT = 0;
    if (this.plateDone) this.glowImg.setAlpha(1);

    this.circle = this.curse.addTruthCircle({ centerX: cfg.circleX / PX, groundY: g, diameter: 2, domeHeight: 2.6 });
    this.curse.setCircleActive(this.circle, !this.curse.cursed || !!saved.circleLit);

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, g).setDepth(5);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, g).setDepth(4);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    this.held = new HeldItems(this, this.ian, { items: this.curse.cursed ? ['light_eye'] : ['light_eye', 'electron_eye'] });

    const kb = this.input.keyboard;
    this.keysIn = kb.addKeys({ left: 'LEFT', right: 'RIGHT', act: 'Z', fire: 'X', skip: 'SPACE' });
    kb.addCapture(['Z', 'X']);
    this.keysIn.act.on('down', () => this.interact());
    this.flags = {};
    this.actT = 0;
    this.lab = new DualityLab(this, this.uiLayer);
    this.electronView = new ElectronView(this, this.uiLayer);
    this.eye = new ElectronEyeView(this, this.uiLayer);
  }

  addPrompts() {
    const c = this.cfg, free = () => !this.battle && !this.plateRun && !this.electronView.running;
    this.addPrompt({ key: 'Z', text: '돋보기로 룬 보기', x: c.tabletX, range: c.tabletReach * this.PX, when: () => free() && !this.runeRead });
    this.addPrompt({ key: 'Z', text: () => (this.curse.cursed ? '감광판에 빛 비추기' : '빛 알갱이 모으기'), x: c.plateX, range: c.plateReach * this.PX,
      when: () => free() && !this.plateDone });
    this.addPrompt({ key: 'Z', text: '전자 쏘기', x: c.apparatusX, range: c.apparatusReach * this.PX, when: () => free() });
    this.addPrompt({ key: 'Z', text: '빛과 전자 실험', x: c.circleX, range: 1.0 * this.PX,
      when: () => this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x) });
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  helpNormal() {
    return `← → 걷기   ${this.curse.cursed ? '1 돋보기' : '1 돋보기  2 전자의 눈'}   Z 살펴보기·실험   M 마법서`;
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
    if (this.curse.cursed && !this.circle.active) this.message.setText('1: 빛의 돋보기를 들고 룬 석판 앞에서 Z');
    if (saved.battleDone && !saved.examPassed) {
      this.battle = { done: true, enemies: [] };
      this.examBtn = this.showExamIntro(() => this.startExam());
    }
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 빛은 파동이기만 하고(점으로 찍히지 않는다), 전자는 알갱이이기만 하다(간섭무늬가 없다)?'
      : '진짜 법칙: 빛과 물질 모두 파동성과 입자성을 가진다 — 전자를 쓰면 더 작은 것을 본다';
  }

  canLeave() {
    return !!Save.chapter(this.scene.key).examPassed;
  }

  near(x, m) {
    return Math.abs(this.ian.x - x) <= m * this.PX;
  }

  teacherNumbers() {
    return [`지금: 감광판 찍힌 점 ${this.plateDone ? Dots.cfg().total : this.plateCount}개 / 교사용 "답 보기"를 켜면 전자 화면에 이론 분포를 겹쳐 보인다`];
  }

  // ------------------------------------------------------------------ Z
  interact() {
    if (this.isBlocked() || this.realizing || this.plateRun || this.electronView.running) return;
    if (this.battle && !this.battle.done) return;
    const c = this.cfg;
    if (this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x)) {
      const open = () => this.lab.open(() => this.onLabDone());
      if (this.flags.labTalked) { open(); return; }
      this.flags.labTalked = true;
      this.say('lab_start', open);
      return;
    }
    if (this.near(c.tabletX, c.tabletReach)) { this.lookTablet(); return; }
    if (this.near(c.plateX, c.plateReach)) { this.usePlate(); return; }
    if (this.near(c.apparatusX, c.apparatusReach)) this.useApparatus();
  }

  lookTablet() {
    const cur = this.held.current;
    if (!cur) { this.message.setText(this.curse.cursed ? '1: 빛의 돋보기를 먼저 들자' : '1 돋보기 또는 2 전자의 눈을 들고 보자').setColor('#ffd27a'); return; }
    if (cur === 'light_eye') {
      if (this.curse.cursed) {
        this.message.setText('돋보기로 봐도 룬이 흐릿하다').setColor('#ffe08a');
        if (!this.tried.tablet) { this.say('tablet_blur'); this.markTried('tablet', 'triedTablet'); }
      } else this.message.setText('큰 문양은 돋보기로도 보이지만, 작은 룬은 흐릿하다 — 2: 전자의 눈으로').setColor('#ffd27a');
    }
  }

  markTried(k, saveKey) {
    this.tried[k] = true;
    Save.setChapter(this.scene.key, { [saveKey]: true });
    this.checkCircle();
  }

  // 감광판과 전자 장치를 모두 해 본 뒤 진실의 원이 나타난다
  checkCircle() {
    if (!this.curse.cursed || this.circle.active || !this.tried.plate || !this.tried.electron) return;
    const show = () => {
      if (this.dialogue.active || this.plateRun || this.electronView.running) { this.time.delayedCall(400, show); return; }
      Save.setChapter(this.scene.key, { circleLit: true });
      this.message.setText('감광판과 전자 장치 사이 바닥에 진실의 원이 나타났다! 가 보자').setColor(UIKit.SKY);
      this.curse.setCircleActive(this.circle, true);
      this.say('circle_found');
    };
    show();
  }

  usePlate() {
    if (this.plateDone) return;
    if (this.curse.cursed) {
      this.plateRun = { cursed: true, t: 0 };
      this.message.setText('약한 빛을 비춘다…').setColor('#ffe08a');
      return;
    }
    if (!this.runeRead) { this.message.setText('먼저 룬을 읽자 — 2: 전자의 눈을 들고 룬 석판 앞으로').setColor('#ffd27a'); return; }
    this.glowImg.setAlpha(0);
    if (!this.sampler) this.sampler = Dots.fromTexture(this, MANIFEST.objects.photo_target.states.default);
    this.plateCount = 0;
    this.plateCarry = 0;
    this.plateCanvas.clear();
    this.plateRun = { cursed: false, tick: 0 };
    this.message.setText('약한 빛을 비춘다 — 빛 알갱이가 한 점씩 찍힌다 (Space를 누르고 있으면 빠르게)').setColor(UIKit.SKY);
  }

  updatePlate(dt) {
    const R = this.plateRun, c = this.cfg;
    if (!R) return;
    if (R.cursed) {
      R.t += dt;
      this.glowImg.setAlpha(Math.min(c.cursedGlow, R.t / c.cursedGlowSeconds * c.cursedGlow));
      if (R.t >= c.cursedGlowSeconds) {
        this.plateRun = null;
        this.message.setText('점 없이 그림 전체가 고르게 밝아졌다').setColor('#ffe08a');
        if (!this.tried.plate) { this.say('plate_cursed'); this.markTried('plate', 'triedPlate'); }
      }
      return;
    }
    const mul = this.keysIn.skip.isDown ? c.skipSpeed : 1;
    const r = Dots.dotsThisFrame(this.plateCount, dt * mul, this.plateCarry);
    this.plateCarry = r.carry;
    for (let i = 0; i < r.n; i++) {
      const p = this.sampler.sample();
      this.plateCanvas.dot(p.x * this.plateW / this.sampler.w, p.y * this.plateH / this.sampler.h, '#f6fff2', 3);
    }
    this.plateCount += r.n;
    R.tick -= dt;
    if (r.n) {
      this.plateCanvas.refresh();
      if (R.tick <= 0) { Sound.play('sfx_dot_tick'); R.tick = c.tickEvery; }
    }
    if (this.plateCount >= Dots.cfg().total) {
      this.plateRun = null;
      this.plateDone = true;
      Save.setChapter(this.scene.key, { plateDone: true });
      Sound.play('sfx_rune_reveal');
      this.message.setText('빛 알갱이가 모여 펼친 마법서와 열쇠 그림이 드러났다!').setColor(UIKit.SKY);
      this.say('plate_done', () => this.time.delayedCall(500, () => this.startBattle()));
    }
  }

  useApparatus() {
    const cursed = this.curse.cursed;
    this.electronView.run(cursed, () => {
      if (cursed) {
        this.message.setText('전자가 틈 뒤에 띠 두 개로만 쌓였다').setColor('#ffe08a');
        if (!this.tried.electron) { this.say('electron_cursed'); this.markTried('electron', 'triedElectron'); }
      } else this.message.setText('전자도 쌓이면 간섭무늬를 만든다').setColor(UIKit.SKY);
    });
  }

  onLabDone() {
    this.realizing = true;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.held.setItems(['light_eye', 'electron_eye']);
        this.helpText.setText(this.helpNormal());
        this.glowImg.setAlpha(0);
        this.message.setText('전자의 눈을 얻었다! 2를 눌러 들고 룬 석판으로').setColor(UIKit.SKY);
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
      this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * c.walkSpeed * PX * dt, 60, this.worldW - 60);
      this.ian.setFlipX(dir < 0);
    }
    if (!this.realizing && this.actT <= 0) Characters.play(this.ian, dir ? 'walk' : (this.held.pose() || 'idle'));
    this.updateGaron(dt);
    this.updatePlate(dt);
    this.updateTablet();
    this.updateBattle(dt);
    if (this.plateDone && !this.battle && !this.dialogue.active && !this.canLeave() && !this.flags.battleQueued) {
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

  // 전자의 눈을 들고 석판 앞에 서면 룬이 또렷하다 (전자의 물질파 파장이 빛보다 훨씬 짧아서)
  updateTablet() {
    const c = this.cfg, O = MANIFEST.objects.rune_tablet;
    const sharp = !this.curse.cursed && this.held.current === 'electron_eye' && this.near(c.tabletX, c.tabletReach);
    const want = O.states[sharp || this.runeRead ? 'sharp' : 'blurred'];
    if (this.tablet.texture.key !== want) this.tablet.setTexture(want);
    if (sharp && !this.runeRead && !this.dialogue.active) {
      this.runeRead = true;
      Save.setChapter(this.scene.key, { runeRead: true });
      Sound.play('sfx_electron_eye_on');
      Sound.play('sfx_rune_reveal');
      this.message.setText('룬이 또렷하게 읽힌다! 감광판으로 가자').setColor(UIKit.SKY);
      this.say('rune_read');
    }
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
      this.curse.cursed ? '빛: 파동이기만 하다?   전자: 알갱이이기만 하다?' : '빛도 전자도 파동성과 입자성을 모두 가진다',
      `룬: ${this.runeRead ? '읽음' : '흐릿함'}   감광판: ${this.plateDone ? '그림 완성' : this.plateRun && !this.curse.cursed ? `점 ${this.plateCount}개` : '비어 있음'}`,
    ]);
  }

  // ------------------------------------------------------------------ 그림자 벌레 전투
  startBattle() {
    if (this.battle) return;
    if (this.dialogue.active) { this.time.delayedCall(500, () => this.startBattle()); return; }
    this.battle = { wave: 0, enemies: [], done: false };
    this.ianHp = 1;
    this.fireT = 0;
    this.setMusicMode('midboss');
    this.helpText.setText('← → 걷기   2 전자의 눈 켜기·끄기   X 공격 (눈으로 본 벌레만)   M 마법서');
    this.beamG = this.add.graphics().setDepth(7);
    this.markG = this.add.graphics().setDepth(7);   // 전자의 눈에 잡힌 벌레 표시 (어두운 벌레가 바닥에 묻히지 않게)
    this.worldLayer.add([this.beamG, this.markG]);
    this.say('battle_start', () => {
      this.introKey('2', '전자의 눈 — 시야는 좁아지지만 그림자 벌레가 보인다');
      this.spawnWave();
    });
  }

  spawnWave() {
    const B = this.cfg.battle, BT = this.battle, PX = this.PX;
    for (const e of BT.enemies) if (e.s.active) e.s.destroy();
    BT.enemies = [];
    BT.wave += 1;
    if (BT.wave > B.waves.length) { this.endBattle(); return; }
    Sound.startLoop('sfx_bug_swarm');
    for (let i = 0; i < B.waves[BT.wave - 1]; i++) {
      const side = i % 2 ? -1 : 1;
      const x = Phaser.Math.Clamp(this.ian.x + side * (B.spawnDist + i * 0.6) * PX, 100, this.worldW - 100);
      const s = Characters.create(this, 'shadow_bug', x, this.groundY, 'crawl').setDepth(6).setVisible(false);
      this.worldLayer.add(s);
      BT.enemies.push({ s, hp: B.hp, cool: 1 + i * 0.5 });
    }
  }

  endBattle() {
    this.battle.done = true;
    Sound.stopLoop('sfx_bug_swarm');
    this.beamG.clear();
    this.markG.clear();
    this.eye.setOn(false);
    if (this.held.current === 'electron_eye') this.held.select(null);
    this.setMusicMode(null);
    this.helpText.setText('← → 걷기   M 마법서');
    Save.setChapter(this.scene.key, { battleDone: true });
    this.say('battle_done', () => {
      this.message.setText('그림자 벌레를 모두 물리쳤다!').setColor(UIKit.SKY);
      this.examBtn = this.showExamIntro(() => this.startExam());
    });
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      if (this.examBtn) this.examBtn.setVisible(false);
      Save.setChapter(this.scene.key, { examPassed: true });
      this.message.setText('3-3 빛과 물질의 이중성 — 마법서 시험 통과! 오른쪽 끝으로 가 다음 방으로').setColor(UIKit.SKY);
    });
  }

  eyeOn() {
    return this.held.current === 'electron_eye';
  }

  // 시야 안(원 안)에 있는가
  inEye(s) {
    const E = this.eye.center();
    return Math.hypot(s.x - this.cameras.main.scrollX - E.x, s.y - 60 - E.y) <= this.eye.radius;
  }

  updateBattle(dt) {
    const BT = this.battle;
    if (!BT || BT.done || !BT.wave) return;
    const B = this.cfg.battle, PX = this.PX, on = this.eyeOn();
    this.eye.setOn(on);
    if (on) this.eye.follow();
    this.fireT = Math.max(0, this.fireT - dt);
    this.beamT = Math.max(0, (this.beamT || 0) - dt);
    if (this.beamT <= 0) this.beamG.clear();
    if (this.keysIn.fire.isDown && !this.isBlocked()) this.fireElectron();
    this.markG.clear();
    for (const e of BT.enemies) {
      if (e.gone) continue;
      const d = this.ian.x - e.s.x;
      e.s.setFlipX(d > 0);
      e.s.setVisible(on && this.inEye(e.s));   // 평소에는 그리기만 끈다 — 움직임은 그대로
      if (e.s.visible) this.markG.lineStyle(3, 0x9fe0ff, 0.9).strokeCircle(e.s.x, e.s.y - 18, 34);
      if (Math.abs(d) > B.attackRange * PX) {
        e.s.x += Math.sign(d) * B.speed * PX * dt;
        if (!e.s.anims.isPlaying) Characters.play(e.s, 'crawl');
      } else {
        e.cool -= dt;
        if (e.cool <= 0) {
          e.cool = B.attackEvery;
          Characters.play(e.s, 'attack', false);
          this.ianHp = Math.max(0, this.ianHp - B.damage);
          if (this.hud) this.hud.set('health', this.ianHp);
          Sound.play('sfx_ian_hurt');
          if (!on) this.message.setText('보이지 않는 무언가가 문다! 2: 전자의 눈을 켜자').setColor('#ff9a9a');
          if (this.ianHp <= 0) { this.battleLost(); return; }
        }
      }
    }
    if (!BT.waiting && BT.enemies.length && BT.enemies.every((e) => e.gone)) {
      BT.waiting = true;
      Sound.stopLoop('sfx_bug_swarm');
      this.time.delayedCall(1200, () => { BT.waiting = false; this.spawnWave(); });
    }
  }

  // X: 전자의 눈 시야 안의 가장 가까운 벌레를 금빛으로
  fireElectron() {
    const B = this.cfg.battle;
    if (this.fireT > 0 || this.actT > 0) return;
    if (!this.eyeOn()) { this.message.setText('벌레가 보이지 않는다 — 2: 전자의 눈을 켜자').setColor('#ffd27a'); this.fireT = B.every; return; }
    this.fireT = B.every;
    const e = this.battle.enemies.filter((o) => !o.gone && this.inEye(o.s))
      .sort((a, b) => Math.abs(a.s.x - this.ian.x) - Math.abs(b.s.x - this.ian.x))[0];
    Characters.play(this.ian, 'attack_light', false);
    this.actT = 0.3;
    Sound.play('sfx_bolt_thin');
    if (!e) return;
    this.ian.setFlipX(e.s.x < this.ian.x);
    this.beamG.clear().lineStyle(8, 0xffe9a0, 0.45).lineBetween(this.ian.x, this.ian.y - 120, e.s.x, e.s.y - 40).lineStyle(3, 0xfffbe6, 1).lineBetween(this.ian.x, this.ian.y - 120, e.s.x, e.s.y - 40);
    this.beamT = 0.12;
    e.hp -= B.damageDealt;
    if (e.hp <= 0) {
      e.gone = true;
      Characters.play(e.s, 'defeat', false);
      Sound.play('sfx_bug_defeat');
      this.time.delayedCall(500, () => { if (e.s.active) e.s.setVisible(false); });
    }
  }

  battleLost() {
    const BT = this.battle;
    for (const e of BT.enemies) if (e.s.active) e.s.destroy();
    BT.enemies = [];
    BT.wave -= 1;
    this.ianHp = 1;
    this.beamG.clear();
    Sound.stopLoop('sfx_bug_swarm');
    if (this.hud) this.hud.set('health', 1);
    this.message.setText('이안이 쓰러졌다… 이 무리를 처음부터').setColor('#ff9a9a');
    this.cameras.main.flash(400, 40, 0, 0);
    this.time.delayedCall(1500, () => this.spawnWave());
  }

  updateBattleText() {
    const BT = this.battle, B = this.cfg.battle, alive = BT.enemies.filter((e) => !e.gone).length;
    this.speedPanel.setLines([
      `그림자 벌레: ${this.eyeOn() ? `${alive}마리 남음` : '보이지 않는다'}`,
      '전자의 눈으로는 빛으로 못 보는 작은 것까지 보인다',
      `무리 ${Math.max(1, BT.wave)} / ${B.waves.length}`,
    ]);
  }
}
window.DualityScene = DualityScene;

// ------------------------------------------------------------------ 점을 찍는 캔버스 (Phaser 텍스처)
class DotCanvas {
  constructor(scene, key, w, h, bg = '#0a0d12') {
    if (scene.textures.exists(key)) scene.textures.remove(key);
    this.tex = scene.textures.createCanvas(key, w, h);
    this.ctx = this.tex.context;
    this.w = w;
    this.h = h;
    this.bg = bg;
    this.clear();
  }

  clear() {
    this.ctx.fillStyle = this.bg;
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.tex.refresh();
  }

  dot(x, y, color, size = 2) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, size, size);
  }

  refresh() { this.tex.refresh(); }
}
window.DotCanvas = DotCanvas;

// ------------------------------------------------------------------ 전자 실험 장치 앞의 작은 창: 전자가 한 점씩 쌓인다
class ElectronView {
  constructor(scene, layer) {
    this.scene = scene;
    this.running = false;
    const V = GAME_CONFIG.act3.ch3_3.electronView;
    this.V = V;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(330).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(V.x, V.y, V.w + 40, V.h + 90, 0x0b1320, 0.94).setStrokeStyle(3, 0x9fe0ff));
    this.title = UIKit.text(scene, V.x, V.y - V.h / 2 - 38, '전자 화면', { fontSize: '24px', color: UIKit.SKY }).setOrigin(0.5, 0);
    c.add(this.title);
    this.canvas = new DotCanvas(scene, 'duality_electron', V.w, V.h);
    c.add(scene.add.image(V.x, V.y + 10, 'duality_electron'));
    this.theory = scene.add.graphics();   // 교사용: 이론 분포 겹쳐 보기
    c.add(this.theory);
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  run(cursed, onDone) {
    const V = this.V;
    this.running = true;
    this.onDone = onDone;
    this.count = 0;
    this.carry = 0;
    this.tick = 0;
    this.sampler = Dots.electronSampler(V.w, V.h, { cursed });
    this.canvas.clear();
    this.title.setText('전자를 하나씩 두 틈에 쏜다');
    this.theory.clear();
    if (this.scene.answersShown()) {   // 교사용: 이론 분포
      this.theory.lineStyle(2, 0xffe08a, 0.9);
      const pts = [];
      for (let x = 0; x <= V.w; x += 2) pts.push({ x: V.x - V.w / 2 + x, y: V.y + 10 + V.h / 2 - Dots.electronDensity(x / V.w * 2 - 1, { cursed }) * V.h * 0.8 });
      this.theory.strokePoints(pts);
    }
    this.container.setVisible(true);
    Characters.play(this.scene.ian, 'idle');
  }

  update(dt) {
    if (!this.running || this.scene.isBlocked()) return;
    const V = this.V, mul = this.scene.keysIn.skip.isDown ? 3 : 1;
    if (this.count < V.count) {
      this.carry += V.perSecond * mul * dt;
      const n = Math.floor(this.carry);
      this.carry -= n;
      for (let i = 0; i < n && this.count < V.count; i++, this.count++) {
        const p = this.sampler.sample();
        this.canvas.dot(p.x, p.y, '#bfe9ff');
      }
      if (n) this.canvas.refresh();
      this.tick -= dt;
      if (n && this.tick <= 0) { Sound.play('sfx_electron_fire'); this.tick = 0.3; }
      return;
    }
    this.running = false;
    this.title.setText(`전자 ${V.count}개가 쌓인 모습`);
    this.scene.time.delayedCall(V.holdSeconds * 1000, () => {
      this.container.setVisible(false);
      if (this.onDone) this.onDone();
    });
  }
}
window.ElectronView = ElectronView;

// ------------------------------------------------------------------ 전자의 눈 시야: 지름 600 px 원 (electron_eye_overlay). 원은 이안을 따라간다
class ElectronEyeView {
  constructor(scene, layer) {
    this.scene = scene;
    const U = MANIFEST.ui.act3.electron_eye_overlay;
    this.radius = U.circle_radius;
    this.on = false;
    this.c = scene.add.container(0, 0).setScrollFactor(0).setDepth(295).setVisible(false);
    layer.add(this.c);
    this.img = scene.add.image(0, 0, U.key);
    // 그림(1920×1080)을 옮기면 비는 쪽을 같은 어둠으로 채운다
    const dark = (ox, oy) => scene.add.rectangle(ox * 1920, oy * 1080, 1920, 1080, 0x141d1b, U.outside_opacity);
    this.fill = [dark(-1, 0), dark(1, 0), dark(0, -1)];
    this.c.add([this.img, ...this.fill]);
  }

  // 원 중심 (화면 좌표): 이안 몸 가운데
  center() {
    const s = this.scene;
    return { x: s.ian.x - s.cameras.main.scrollX, y: s.groundY - GAME_CONFIG.act3.ch3_3.battle.eyeHeight };
  }

  follow() {
    const E = this.center();
    this.c.setPosition(E.x, E.y);
  }

  setOn(on) {
    if (on === this.on) return;
    this.on = on;
    this.c.setVisible(on);
    Sound.play(on ? 'sfx_electron_eye_on' : 'sfx_electron_eye_off');
  }
}
window.ElectronEyeView = ElectronEyeView;

// ------------------------------------------------------------------ 진실의 원 실험: 약한 빛과 전자 (둘 다 한 점씩)
class DualityLab {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 60, '진실의 원 — 빛과 전자를 하나씩', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    this.help = UIKit.text(scene, 960, 118, 'Space를 누르고 있으면 빠르게    Esc: 닫기', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5);
    c.add(this.help);
    this.info = UIKit.text(scene, 960, 170, '', { fontSize: '28px', align: 'center' }).setOrigin(0.5, 0);
    c.add(this.info);
    const L = GAME_CONFIG.act3.ch3_3.lab, W = L.w, H = L.h, y = 250;
    this.W = W;
    this.H = H;
    this.light = new DotCanvas(scene, 'duality_lab_light', W, H);
    this.elec = new DotCanvas(scene, 'duality_lab_elec', W, H);
    c.add(scene.add.image(L.lightX, y, 'duality_lab_light').setOrigin(0.5, 0));
    c.add(scene.add.image(L.elecX, y, 'duality_lab_elec').setOrigin(0.5, 0));
    c.add(scene.add.rectangle(L.lightX, y, W, H).setOrigin(0.5, 0).setStrokeStyle(3, 0x9fe0ff));
    c.add(scene.add.rectangle(L.elecX, y, W, H).setOrigin(0.5, 0).setStrokeStyle(3, 0x9fe0ff));
    this.lightText = UIKit.text(scene, L.lightX, y + H + 12, '', { fontSize: '26px' }).setOrigin(0.5, 0);
    this.elecText = UIKit.text(scene, L.elecX, y + H + 12, '', { fontSize: '26px' }).setOrigin(0.5, 0);
    c.add([this.lightText, this.elecText]);
    this.results = UIKit.text(scene, 960, 780, '', { fontSize: '28px', align: 'center', lineSpacing: 8 }).setOrigin(0.5, 0);
    c.add(this.results);
    scene.input.keyboard.on('keydown-ESC', () => this.close());
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  open(onDone) {
    const s = this.scene;
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.phase = 'light';
    this.n = 0;
    this.carry = 0;
    this.tick = 0;
    this.light.clear();
    this.elec.clear();
    this.lightSampler = this.lightSampler || Dots.fromTexture(s, MANIFEST.objects.photo_target.states.default);
    this.elecSampler = this.elecSampler || Dots.electronSampler(this.W, this.H, { cursed: false });
    this.container.setVisible(true);
    this.results.setText('');
    this.lightText.setText('아주 약한 빛');
    this.elecText.setText('전자총 (두 틈)');
    this.info.setText('아주 약한 빛을 감광판에 비춘다 — 어떻게 찍힐까?').setColor('#ffe08a');
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  update(dt) {
    if (!this.isOpen || this.done) return;
    const L = GAME_CONFIG.act3.ch3_3.lab, P = L[this.phase], s = this.scene;
    const rate = P.start * (P.end / P.start) ** (this.n / P.count) * (s.keysIn.skip.isDown ? L.skipSpeed : 1);
    this.carry += rate * dt;
    const n = Math.min(Math.floor(this.carry), P.count - this.n);
    this.carry -= n;
    for (let i = 0; i < n; i++) {
      if (this.phase === 'light') {
        const p = this.lightSampler.sample();
        this.light.dot(p.x * this.W / this.lightSampler.w, p.y * this.H / this.lightSampler.h, '#f6fff2', 3);
      } else {
        const p = this.elecSampler.sample();
        this.elec.dot(p.x, p.y, '#bfe9ff');
      }
    }
    this.n += n;
    this.tick -= dt;
    if (n) {
      (this.phase === 'light' ? this.light : this.elec).refresh();
      if (this.tick <= 0) { Sound.play(this.phase === 'light' ? 'sfx_dot_tick' : 'sfx_electron_fire'); this.tick = 0.15; }
    }
    (this.phase === 'light' ? this.lightText : this.elecText).setText(`${this.phase === 'light' ? '빛' : '전자'} ${this.n}개`);
    if (this.phase === 'light' && this.n >= L.light.count * 0.5) this.info.setText('처음엔 무작위 같던 점이 모여 그림이 드러난다 — 빛은 한 점씩 찍힌다').setColor(UIKit.SKY);
    if (this.phase === 'electron' && this.n >= L.electron.count * 0.5) this.info.setText('전자도 쌓이니 3-1의 빛과 같은 줄무늬가 생긴다').setColor(UIKit.SKY);
    if (this.n < P.count) return;
    if (this.phase === 'light') {
      this.phase = 'electron';
      this.n = 0;
      this.carry = 0;
      this.info.setText('이번에는 전자를 하나씩 두 틈에 쏜다 — 두 줄로만 쌓일까?').setColor('#ffe08a');
      return;
    }
    this.done = true;
    this.help.setText('');
    this.results.setText('빛은 점으로 찍히고(입자성), 전자는 쌓이면 간섭무늬를 만든다(파동성)\n빛과 물질 모두 파동성과 입자성을 가진다').setColor(UIKit.SKY);
    UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
  }
}
window.DualityLab = DualityLab;
