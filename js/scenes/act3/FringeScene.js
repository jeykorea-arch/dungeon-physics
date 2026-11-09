// 3-1 어두운 줄무늬의 벽 (ACT3_PLAN 1단계) — 배경 abyss_1 (2400px). 밝기 계산은 js/physics/act3/interference.js, 값은 config.js 의 act3.ch3_1·interference
//   저주: 두 틈을 지난 빛이 그냥 더해져 스크린 벽 전체가 고르게 밝다. 광원을 세게 하면 더 밝아지기만 한다.
//   진실의 원(물결 수조): 두 파원의 물결이 겹쳐 크게 출렁이는 곳과 잔잔한 곳이 생긴다. 한쪽만 켜면 줄무늬가 사라진다.
//   해방: 밝은 줄·어두운 줄. 같은 광원을 더 세게 해도 어두운 줄은 그대로(따로 타는 횃불은 간섭하지 않으니 쓰지 않는다). 틈 판을 바꾸면 줄 간격이 바뀌고, gap_mid일 때만 룬이 어두운 줄 안에 든다.
//   룬을 찾으면 빛의 망령 전투 → 시험 13 → 오른쪽 끝으로 3-2.
class FringeScene extends ChapterScene {
  static PLATES = ['gap_narrow', 'gap_mid', 'gap_wide'];
  static PLATE_NAMES = { gap_narrow: '좁음', gap_mid: '중간', gap_wide: '넓음' };

  constructor() {
    super('Ch3_1');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act3.ch3_1, O = MANIFEST.objects, PX = this.PX, g = this.groundY;
    this.cfg = cfg;
    this.torchWalk = null;
    this.realizing = false;
    const saved = Save.chapter(this.scene.key);
    this.lightOn = !!saved.lightOn;
    this.level = saved.level ?? saved.torches ?? 0;   // 광원 세기 단계
    this.plate = saved.plate || FringeScene.PLATES[0];
    this.runeFound = !!saved.runeFound;
    this.torchTalked = !!saved.torchTalked;   // 해방 뒤 광원을 세게 해 "어두운 줄은 그대로"를 보았나
    // 빛 (벽보다 뒤, 사람보다 뒤)
    this.lightG = this.add.graphics().setDepth(0);
    this.worldLayer.add(this.lightG);
    // 광원·틈 벽·틈 판·스크린 벽·물결 수조
    const place = (o, x, y, state, depth) => {
      const img = this.add.image(x, y, state ? o.states[state] : (o.key || Object.values(o.states)[0])).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };
    this.glow = place(O.light_source_glow, cfg.sourceX, g, null, 1).setVisible(this.lightOn).setBlendMode('ADD');
    this.source = place(O.light_source, cfg.sourceX, g, this.lightOn ? 'on' : 'off', 2);
    place(O.slit_wall, cfg.slitX, cfg.wallTop, null, 1);
    this.plateImg = place(O.slit_plate, cfg.slitX, cfg.wallTop + O.slit_wall.insert_rect[1], this.plate, 2);
    place(O.screen_wall, cfg.screenX, cfg.wallTop, null, 1);
    this.screenG = this.add.graphics().setDepth(2);
    this.worldLayer.add(this.screenG);
    const I = GAME_CONFIG.act3.interference;
    this.rune = place(O.hidden_rune_01, cfg.screenX, I.centerY + I.rune.offset - O.hidden_rune_01.height / 2, 'faint', 3);
    place(O.ripple_tank, cfg.tankX, g, null, 1);
    this.flashT = 0;

    this.circle = this.curse.addTruthCircle({ centerX: cfg.tankX / PX, groundY: g, diameter: 3.6, domeHeight: 2.6 });
    this.curse.setCircleActive(this.circle, !this.curse.cursed || !!saved.circleLit);

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, g).setDepth(5);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, g).setDepth(4);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    // 카메라 왼쪽 끝을 cameraLeft로: 틈 벽 앞에서 틈 판을 바꾸는 동안 스크린 벽(룬)까지 한 화면에 보이게
    this.curse.followTarget(this.ian, { x: cfg.cameraLeft, y: 0, width: this.worldW - cfg.cameraLeft, height: this.worldH });
    this.held = new HeldItems(this, this.ian, { items: [] });

    const kb = this.input.keyboard;
    this.keysIn = kb.addKeys({ left: 'LEFT', right: 'RIGHT', act: 'Z', fire: 'X' });
    kb.addCapture(['Z', 'X']);
    this.keysIn.act.on('down', () => this.interact());
    this.flags = {};
    this.actT = 0;
    this.lab = new RippleLab(this, this.uiLayer);
    this.zoom = new ScreenZoom(this, this.uiLayer);
    this.heldTag = UIKit.text(this, 0, 0, '', { fontSize: '22px', fontStyle: 'bold', color: UIKit.SKY, backgroundColor: '#0b1320cc', padding: { x: 8, y: 3 } }).setOrigin(0.5, 1).setDepth(8).setVisible(false);
    this.chargeG = this.add.graphics().setDepth(8);
    this.worldLayer.add([this.heldTag, this.chargeG]);
  }

  addPrompts() {
    const c = this.cfg, free = () => !this.battle && !this.torchWalk;
    this.addPrompt({ key: 'Z', text: () => (this.lightOn ? '광원 더 세게' : '광원 켜기'), x: c.sourceX, range: c.reach * this.PX,
      when: () => free() && (!this.lightOn || this.level < this.torchLimit()) });
    this.addPrompt({ key: 'Z', text: '틈 판 바꾸기', x: c.slitX, range: c.reach * this.PX, when: () => free() && this.lightOn });
    this.addPrompt({ key: 'Z', text: '물결 실험', x: c.tankX, range: 1.8 * this.PX,
      when: () => this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x) });
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  onReady() {
    this.addPrompts();
    this.helpText = UIKit.text(this, 1900, 1070, '← → 걷기   Z 광원·틈 판·실험   M 마법서', {
      fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(300);
    this.uiLayer.add(this.helpText);
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1130, 170);
    const saved = Save.chapter(this.scene.key);
    if (this.curse.cursed) this.message.setText(this.lightOn ? 'Z: 광원 앞에서 광원을 더 세게 해 보자' : 'Z: 광원을 켜 보자');
    if (saved.battleDone && !saved.examPassed) {
      this.battle = { done: true, enemies: [] };
      this.examBtn = this.showExamIntro(() => this.startExam());
    }
    this.drawLight();
    this.updateRune(true);
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 빛에 빛을 더하면 어디서나 더 밝아진다?'
      : '진짜 법칙: 빛은 파동이라 겹치면 간섭한다 — 마루+마루는 밝게, 마루+골은 어둡게';
  }

  canLeave() {
    return !!Save.chapter(this.scene.key).examPassed;
  }

  near(x) {
    return Math.abs(this.ian.x - x) <= this.cfg.reach * this.PX;
  }

  teacherNumbers() {
    const I = Interference;
    return [`지금: 틈 판 ${this.plate}, 줄무늬 간격 ${Math.round(I.spacing(this.plate))}px, 광원 세기 ${this.level}단계, 룬 ${I.runeVisible(this.plate, { cursed: this.curse.cursed }) ? '보임' : '안 보임'}`];
  }

  // ------------------------------------------------------------------ Z
  interact() {
    if (this.isBlocked() || this.realizing || this.torchWalk) return;
    if (this.battle && !this.battle.done) return;
    const c = this.cfg;
    if (this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x)) {
      const open = () => this.lab.open(() => this.onLabDone());
      if (this.flags.labTalked) { open(); return; }
      this.flags.labTalked = true;
      this.say('lab_start', open);
      return;
    }
    if (this.near(c.sourceX)) {
      if (!this.lightOn) { this.turnOn(); return; }
      if (this.level < this.torchLimit()) this.bringTorch();
      else this.message.setText('광원은 이미 가장 세다').setColor('#ffd27a');
      return;
    }
    if (this.near(c.slitX) && this.lightOn) this.changePlate();
  }

  turnOn() {
    this.lightOn = true;
    this.source.setTexture(MANIFEST.objects.light_source.states.on);
    this.glow.setVisible(true);
    Save.setChapter(this.scene.key, { lightOn: true });
    Sound.play('sfx_switch_flip');
    this.drawLight();
    this.updateRune();
    if (this.curse.cursed) {
      this.message.setText('스크린 벽이 고르게 밝아졌다 — Z: 광원을 더 세게 해 보자').setColor('#ffe08a');
      this.say('light_on');
    } else this.message.setText('Z: 광원을 더 세게 해 보자, 틈 벽 앞에서 틈 판도 바꿀 수 있다').setColor(UIKit.SKY);
  }

  // 저주 때 한 단계, 해방 뒤 한 단계 더 (같은 광원으로 전후를 비교한다)
  torchLimit() {
    return this.curse.cursed ? 1 : this.cfg.maxTorches;
  }

  // 가론이 광원까지 걸어와 같은 수정에 마력을 더 붓는다 (따로 타는 횃불은 다른 빛이라 간섭하지 않는다)
  bringTorch() {
    this.torchWalk = { x: this.cfg.sourceX + (this.garon.x < this.cfg.sourceX ? -110 : 110) };
  }

  torchArrived() {
    this.torchWalk = null;
    const before = this.brightness();
    this.level += 1;
    Save.setChapter(this.scene.key, { level: this.level });
    Sound.play('sfx_torch_add');
    this.flashT = this.cfg.brightness.flashSeconds;   // 0.5초 번쩍
    this.drawLight();
    this.updateRune();
    this.zoom.show(this.plate, before, this.brightness(), this.curse.cursed);
    // 번쩍임과 확대 창을 먼저 보고 나서 대사
    const talk = (key, cb) => this.time.delayedCall(this.cfg.brightness.talkDelay * 1000, () => this.say(key, cb));
    if (this.curse.cursed) {
      talk('torch_more', () => {
        if (this.circle.active) return;
        Save.setChapter(this.scene.key, { circleLit: true });
        this.message.setText('물결 수조 앞 바닥에 진실의 원이 나타났다! 가 보자').setColor(UIKit.SKY);
        this.curse.setCircleActive(this.circle, true);
        this.say('circle_found');
      });
    } else if (!this.torchTalked) {
      this.torchTalked = true;
      Save.setChapter(this.scene.key, { torchTalked: true });
      talk('torch_free', () => this.message.setText('틈 벽 앞에서 Z: 틈 판을 바꿔 흐린 룬을 찾자').setColor(UIKit.SKY));
    }
  }

  changePlate() {
    if (!this.curse.cursed && !this.torchTalked) {   // 룬을 찾으면 전투가 시작되니, "세게 해도 어두운 줄은 그대로"를 먼저 본다
      this.message.setText('먼저 광원 앞에서 광원을 더 세게 해 보자 (Z)').setColor('#ffd27a');
      return;
    }
    const P = FringeScene.PLATES;
    this.plate = P[(P.indexOf(this.plate) + 1) % P.length];
    this.plateImg.setTexture(MANIFEST.objects.slit_plate.states[this.plate]);
    Save.setChapter(this.scene.key, { plate: this.plate });
    Sound.play('sfx_slit_adjust');
    this.message.setText(this.curse.cursed
      ? `틈 간격 ${FringeScene.PLATE_NAMES[this.plate]} — 스크린 벽은 그대로 고르게 밝다`
      : `틈 간격 ${FringeScene.PLATE_NAMES[this.plate]} — 스크린 벽의 줄무늬를 보자`).setColor('#ffe08a');
    this.drawLight();
    this.updateRune();
    this.zoom.show(this.plate, this.brightness(), this.brightness(), this.curse.cursed);
  }

  // ------------------------------------------------------------------ 빛 그리기 (상태가 바뀔 때만)
  brightness() {
    const b = this.cfg.brightness, list = this.curse.cursed ? b.cursed : b.freed;
    return list[Math.min(this.level, list.length - 1)];
  }

  drawLight() {
    const c = this.cfg, G = this.lightG, S = this.screenG, cursed = this.curse.cursed, I = GAME_CONFIG.act3.interference;
    G.clear();
    S.clear();
    // 스크린 벽 그림은 밝은 색이라, 빛이 닿지 않는 곳이 어둡게 보이도록 투영 자리에 어두운 바탕을 깐다
    S.fillStyle(0x10161c, 1).fillRect(c.screenX - 22, c.wallTop + 8, 44, 484);
    if (!this.lightOn) return;
    const col = c.lightColor, br = this.flashT > 0 ? 1 : this.brightness();
    const O = MANIFEST.objects.slit_plate, centers = (O.stateInfo[this.plate] || O).slit_centers;
    const plateTop = c.wallTop + MANIFEST.objects.slit_wall.insert_rect[1];
    const sx = c.slitX + 30, ex = c.screenX - 30, top = c.wallTop + 8, bot = c.wallTop + 492;
    // 광원에서 틈 판까지
    G.fillStyle(col, 0.1 + 0.1 * br).fillTriangle(c.sourceX + 40, c.sourceBeamY, c.slitX - 30, plateTop, c.slitX - 30, plateTop + O.height);
    // 두 틈에서 퍼지는 부채꼴
    for (const p of centers) G.fillStyle(col, (cursed ? 0.12 : 0.035) * (0.6 + br)).fillTriangle(sx, plateTop + p[1], ex, top, ex, bot);
    // 밝은 줄 쪽 빛살 (해방)
    if (!cursed) {
      const d = Interference.spacing(this.plate), mid = plateTop + (centers[0][1] + centers[1][1]) / 2;
      for (const o of Interference.brightOffsets(this.plate, 245)) {
        G.fillStyle(col, 0.16 * (0.5 + br)).fillTriangle(sx, mid, ex, I.centerY + o - d * 0.22, ex, I.centerY + o + d * 0.22);
      }
    }
    // 스크린 벽 (투영 자리 8~52 px)
    for (let y = top; y < bot; y += 4) {
      const a = Interference.intensity(y + 2, this.plate, { cursed }) * br;
      S.fillStyle(col, a).fillRect(c.screenX - 22, y, 44, 4);
      S.fillStyle(col, a * 0.28).fillRect(c.screenX - 62, y, 40, 4);
    }
  }

  // 룬: 어두운 줄 안에 들어와야 또렷이 보인다 (빛이 닿으면 묻힌다)
  updateRune(silent) {
    const O = MANIFEST.objects.hidden_rune_01;
    const seen = this.lightOn && Interference.runeVisible(this.plate, { cursed: this.curse.cursed });
    this.rune.setTexture(O.states[seen ? 'clear' : 'faint']).setAlpha(seen ? 1 : this.lightOn ? 0.12 : 0.3);
    if (seen && !this.runeFound && !silent) {
      this.runeFound = true;
      Save.setChapter(this.scene.key, { runeFound: true });
      Sound.play('sfx_rune_reveal');
      this.message.setText('어두운 줄 안에서 룬이 또렷이 보인다!').setColor(UIKit.SKY);
      this.say('rune_found', () => this.time.delayedCall(500, () => this.startBattle()));
    }
  }

  onLabDone() {
    this.realizing = true;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        // 저주 때 틈 판을 바꿔 두었어도 처음 판으로 — 해방되자마자 룬이 나타나 횃불 비교를 건너뛰지 않게
        this.plate = FringeScene.PLATES[0];
        this.plateImg.setTexture(MANIFEST.objects.slit_plate.states[this.plate]);
        Save.setChapter(this.scene.key, { plate: this.plate });
        this.drawLight();
        this.updateRune();
        this.message.setText('스크린 벽에 줄무늬가 생겼다! 광원 앞에서 Z: 광원을 더 세게 해 보자').setColor(UIKit.SKY);
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
      this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * c.walkSpeed * PX * dt, c.cameraLeft + 60, this.worldW - 60);
      this.ian.setFlipX(dir < 0);
    }
    if (!this.realizing && this.actT <= 0) Characters.play(this.ian, dir ? 'walk' : (this.held.pose() || 'idle'));
    this.updateGaron(dt);
    // 광원 번쩍임이 끝나면 원래 밝기로
    if (this.flashT > 0) {
      this.flashT -= dt;
      this.glow.setScale(1 + Math.max(0, this.flashT) * 1.2);
      if (this.flashT <= 0) { this.glow.setScale(1); this.drawLight(); }
    }
    this.updateHeldTag();
    this.updateBattle(dt);
    if (this.runeFound && !this.battle && !this.dialogue.active && !this.canLeave() && !this.flags.battleQueued) {
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
    if (this.torchWalk) {
      const d = this.torchWalk.x - g.x;
      g.x += Math.sign(d) * Math.min(Math.abs(d), c.walkSpeed * PX * dt);
      if (d) g.setFlipX(d < 0);
      Characters.play(g, Math.abs(d) < 2 ? 'idle' : 'walk');
      if (Math.abs(d) < 2) this.torchArrived();
      return;
    }
    // 이안을 따라다닌다 (전투 중에는 그 자리에 서 있다)
    const d = this.ian.x - g.x, walk = Math.abs(d) > c.garonFollow * PX && !(this.battle && !this.battle.done);
    if (walk) {
      g.x += Math.sign(d) * c.walkSpeed * PX * dt;
      g.setFlipX(d < 0);
    }
    Characters.play(g, walk ? 'walk' : 'idle');
  }

  updatePanel() {
    if (!this.lightOn) { this.speedPanel.setLines(['광원: 꺼짐']); return; }
    this.speedPanel.setLines([
      `틈 간격: ${FringeScene.PLATE_NAMES[this.plate]}   광원 세기: ${this.level}단계`,
      ...(this.curse.cursed ? ['스크린 벽: 어디나 고르게 밝다']
        : this.torchTalked ? ['밝은 줄: 더 밝아짐', '어두운 줄: 그대로 어두움'] : ['스크린 벽: 밝은 줄과 어두운 줄이 번갈아']),
    ]);
  }

  // ------------------------------------------------------------------ 빛의 망령 전투
  startBattle() {
    if (this.battle) return;
    if (this.dialogue.active) { this.time.delayedCall(500, () => this.startBattle()); return; }
    this.battle = { wave: 0, enemies: [], done: false };
    this.ianHp = 1;
    this.fireT = 0;
    this.setMusicMode('midboss');
    this.held.setItems(['film_shield']);
    this.helpText.setText('← → 걷기   1 막 방패 들기·내리기   X 빛 공격   M 마법서');
    this.beamG = this.add.graphics().setDepth(7);
    this.bandG = this.add.graphics().setDepth(1);
    this.worldLayer.add([this.beamG, this.bandG]);
    this.tutorial = 1;   // 첫 무리: 앞 단계를 해야 다음 단계로 (총괄지시 71번)
    this.say('battle_start', () => this.spawnWave());
  }

  spawnWave() {
    const B = this.cfg.battle, BT = this.battle, PX = this.PX;
    for (const e of BT.enemies) if (e.s.active) e.s.destroy();
    BT.enemies = [];
    BT.wave += 1;
    if (BT.wave > B.waves.length) { this.endBattle(); return; }
    const n = B.waves[BT.wave - 1], xs = [];
    for (let i = 0; i < n; i++) {
      const x = Phaser.Math.Clamp(this.ian.x + (B.spawnAhead + i * B.spawnGap) * PX, 900, 2250);
      xs.push(x);
      const s = Characters.create(this, 'light_wraith', x, B.floatY, 'float').setDepth(6);
      this.worldLayer.add(s);
      BT.enemies.push({ s, hp: B.hp, max: B.hp, t: 1.5 + i * B.attackEvery / n, phase: i * 2, charging: false, keep: B.keepDist[i % B.keepDist.length] });
    }
    BT.bandX = xs.reduce((a, b) => a + b, 0) / xs.length;
    this.inDark = false;
    if (n >= 2 && !this.flags.bandTold) {   // 둘이 함께 있을 때 바닥 띠를 한 번 알려 준다
      this.flags.bandTold = true;
      this.setStepText('망령 둘은 같은 수정의 빛을 나눠 쏜다 — 그래서 바닥에 밝고 어두운 띠가 생긴다\n어두운 띠에 서면 덜 아프다');
      this.time.delayedCall(5000, () => { if (this.tutorial === 0) this.setStepText(null); });
    }
  }

  endBattle() {
    this.battle.done = true;
    this.beamG.clear();
    this.bandG.clear();
    this.setMusicMode(null);
    this.held.setItems([]);
    this.helpText.setText('← → 걷기   M 마법서');
    this.tutorial = 0;
    this.setStepText(null);
    this.chargeG.clear();
    this.heldTag.setVisible(false);
    Save.setChapter(this.scene.key, { battleDone: true });
    this.say('battle_done', () => {
      this.message.setText('빛의 망령을 모두 물리쳤다!').setColor(UIKit.SKY);
      this.examBtn = this.showExamIntro(() => this.startExam());
    });
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      if (this.examBtn) this.examBtn.setVisible(false);
      Save.setChapter(this.scene.key, { examPassed: true });
      this.message.setText('3-1 빛의 간섭 — 마법서 시험 통과! 오른쪽 끝으로 가 다음 방으로').setColor(UIKit.SKY);
    });
  }

  aliveWraiths() {
    return this.battle.enemies.filter((e) => !e.gone);
  }

  // 망령 둘이 함께 있을 때만 바닥에 밝고 어두운 띠가 생긴다
  floorScale() {
    if (this.aliveWraiths().length < 2) return 1;
    return Interference.floorDamage(this.ian.x, this.battle.bandX, { cursed: this.curse.cursed });
  }

  updateBattle(dt) {
    const BT = this.battle;
    if (!BT || BT.done || !BT.wave) return;
    const B = this.cfg.battle, PX = this.PX;
    this.fireT = Math.max(0, this.fireT - dt);
    if (this.keysIn.fire.isDown && !this.isBlocked()) this.fireLight();
    this.beamT = Math.max(0, (this.beamT || 0) - dt);
    if (this.beamT <= 0) this.beamG.clear();
    this.drawBands();
    this.updateTutorial();
    this.chargeG.clear();
    const dark = this.floorScale() < 1;
    if (dark !== this.inDark) {
      this.inDark = dark;
      if (dark) {
        Sound.play('sfx_dark_fringe_enter');
        this.message.setText(`어두운 띠 안 — 받는 피해 ${Math.round(GAME_CONFIG.act3.interference.floorBand.darkDamage * 100)}%`).setColor(UIKit.SKY);
      }
    }
    for (const e of BT.enemies) {
      if (e.gone) continue;
      const d = this.ian.x - e.s.x;
      e.phase += dt;
      e.s.setFlipX(d > 0);   // 그림은 왼쪽을 본다
      e.s.y = B.floatY + Math.sin(e.phase * Math.PI) * B.bob;   // 2초 주기로 위아래
      if (Math.abs(d) > e.keep * PX) e.s.x += Math.sign(d) * B.speed * PX * dt;
      if (this.tutorial === 1 || this.tutorial === 2) continue;   // 방패를 들고 설 때까지 기다려 준다
      e.t -= dt;
      if (!e.charging && e.t <= B.chargeSeconds) {
        e.charging = true;
        Characters.play(e.s, 'attack', false);
      }
      if (e.charging) {   // 빛 모으기: 망령 위 "!" + 줄어드는 고리
        const k = Math.max(0, e.t / B.chargeSeconds);
        this.chargeG.lineStyle(4, this.cfg.lightColor, 1).strokeCircle(e.s.x, e.s.y, 20 + k * 60);
        this.chargeG.fillStyle(0xffe08a, 1).fillRect(e.s.x - 5, e.s.y - 150, 10, 34).fillCircle(e.s.x, e.s.y - 104, 6);
      }
      if (e.t <= 0) {
        e.t = B.attackEvery;
        e.charging = false;
        this.fireBeam(e);
        if (!BT.enemies.length) return;   // 이안이 쓰러져 무리를 처음부터
      } else if (!e.charging && !e.s.anims.isPlaying) Characters.play(e.s, 'float');
    }
    if (!BT.waiting && BT.enemies.length && BT.enemies.every((e) => e.gone)) {
      BT.waiting = true;
      this.time.delayedCall(1200, () => { BT.waiting = false; this.spawnWave(); });
    }
  }

  drawBands() {
    const G = this.bandG, BT = this.battle, b = GAME_CONFIG.act3.interference.floorBand;
    G.clear();
    if (this.aliveWraiths().length < 2) return;
    const x0 = Math.max(0, Math.floor(this.cameras.main.scrollX)), x1 = Math.min(this.worldW, x0 + 1920);
    for (let x = x0 - x0 % 10; x < x1; x += 10) {
      const bright = Math.cos(Math.PI * (x + 5 - BT.bandX) / b.spacing) ** 2;
      G.fillStyle(this.cfg.lightColor, bright * 0.55).fillRect(x, this.groundY - 2, 10, 12);
    }
  }

  // 망령의 빛줄기: 손끝(beam_point)에서 이안까지. 막 방패로 맞받으면 그대로 되돌아가 망령이 맞는다
  fireBeam(e) {
    const B = this.cfg.battle, s = e.s, dir = Math.sign(this.ian.x - s.x) || 1;
    const A = MANIFEST.characters.light_wraith.animations.attack, p = A.beamPoints[A.beamPoints.length - 1];
    const x0 = s.x + (s.flipX ? -1 : 1) * (p.x - A.pivot.x), y0 = s.y + p.y - A.pivot.y;
    const x1 = this.ian.x - dir * 40, y1 = this.ian.y - 110;
    Sound.play('sfx_wraith_beam');
    const r = this.held.receive({ kind: 'beam', color: 'green', dir });
    const col = this.cfg.lightColor;
    this.beamG.clear().lineStyle(10, col, 0.35).lineBetween(x0, y0, x1, y1).lineStyle(3, 0xeafff0, 1).lineBetween(x0, y0, x1, y1);
    this.beamT = B.beamSeconds;
    if (r.reflect) {
      this.beamG.lineStyle(6, 0xffffff, 0.8).lineBetween(x1, y1 - 14, x0, y0 - 14);
      this.hitWraith(e, B.reflectDamage);
      this.message.setText(`막 방패가 빛줄기를 튕겨 냈다! 피해 ${B.reflectDamage} — 막 앞뒤의 반사가 보강되었다`).setColor(UIKit.SKY);
      if (this.tutorial === 3) {
        this.tutorial = 4;
        this.setStepText(`튕긴 빛이 망령을 맞혔다! 이렇게 ${B.hp}번`);
        this.time.delayedCall(3000, () => { if (this.tutorial === 4) { this.tutorial = 0; this.setStepText(null); this.introKey('X', '빛 공격 (약하다 — 튕겨 낸 빛줄기가 훨씬 세다)'); } });
      }
      return;
    }
    this.ianHp = Math.max(0, this.ianHp - B.damage * r.damageScale * this.floorScale());
    if (this.hud) this.hud.set('health', this.ianHp);
    Sound.play('sfx_ian_hurt');
    Characters.play(this.ian, 'hurt', false);
    this.actT = 0.3;
    if (this.ianHp <= 0) this.battleLost();
  }

  // 첫 무리 차례 안내: ① 방패 들기 → ② 망령 쪽을 보고 서기 → ③ 빛을 모으면 맞받기 → ④ 튕겨 냄
  updateTutorial() {
    const T = this.tutorial;
    if (!T || T === 4) return;
    const w = this.aliveWraiths()[0];
    if (!w) return;
    const holding = this.held.current === 'film_shield';
    const facing = Math.sign(w.s.x - this.ian.x) === (this.ian.flipX ? -1 : 1);
    if (T === 1) {
      this.setStepText('1을 눌러 막 방패를 들자');
      if (holding) this.tutorial = 2;
    } else if (T === 2) {
      this.setStepText('망령 쪽을 보고 가만히 서 있자\n걸으면 방패를 내린다');
      if (!holding) this.tutorial = 1;
      else if (this.held.isHeld() && facing) { this.standT = (this.standT || 0) + 0.02; if (this.standT >= 0.5) { this.tutorial = 3; w.t = Math.max(w.t, 1.5); } } else this.standT = 0;
    } else if (T === 3) {
      this.setStepText(!holding ? '1을 눌러 막 방패를 들자' : !facing ? '망령 쪽을 보자 — 등 뒤의 빛은 못 막는다' : '망령이 빛을 모은다! 그대로 서서 받아 내자');
    }
  }

  // 방패를 들고 있는지 이안 머리 위에 표시
  updateHeldTag() {
    const on = this.battle && !this.battle.done && this.held.current;
    this.heldTag.setVisible(!!on);
    if (on) this.heldTag.setText(this.held.isHeld() ? '방패 듦' : '걷는 중 — 방패 내림').setColor(this.held.isHeld() ? UIKit.SKY : '#ffd27a').setPosition(this.ian.x, this.ian.y - 215);
  }

  // X: 이안의 빛 공격 (금빛, 약하다)
  fireLight() {
    const S = this.cfg.battle.staff, PX = this.PX;
    if (this.fireT > 0 || this.actT > 0) return;
    this.fireT = S.every;
    const f = this.ian.flipX ? -1 : 1;
    const e = this.aliveWraiths().filter((o) => Math.sign(o.s.x - this.ian.x) === f && Math.abs(o.s.x - this.ian.x) <= S.range * PX)
      .sort((a, b) => Math.abs(a.s.x - this.ian.x) - Math.abs(b.s.x - this.ian.x))[0];
    Characters.play(this.ian, 'attack_light', false);
    this.actT = 0.3;
    Sound.play('sfx_bolt_thin');
    const x0 = this.ian.x + f * 60, y0 = this.ian.y - 130, x1 = e ? e.s.x : x0 + f * S.range * PX, y1 = e ? e.s.y : y0;
    this.beamG.clear().lineStyle(8, 0xffe9a0, 0.45).lineBetween(x0, y0, x1, y1).lineStyle(3, 0xfffbe6, 1).lineBetween(x0, y0, x1, y1);
    this.beamT = 0.12;
    if (e) this.hitWraith(e, S.damage);
  }

  hitWraith(e, dmg) {
    e.hp -= dmg;
    e.charging = false;
    e.t = Math.max(e.t, this.cfg.battle.chargeSeconds + 0.4);
    if (e.hp <= 0) {
      e.gone = true;
      Characters.play(e.s, 'vanish', false);
      Sound.play('sfx_wraith_vanish');
      return;
    }
    Characters.play(e.s, 'hurt', false);
  }

  battleLost() {
    const BT = this.battle;
    for (const e of BT.enemies) if (e.s.active) e.s.destroy();
    BT.enemies = [];
    BT.wave -= 1;
    this.ianHp = 1;
    this.beamG.clear();
    this.bandG.clear();
    this.chargeG.clear();
    if (this.hud) this.hud.set('health', 1);
    this.message.setText('이안이 쓰러졌다… 이 무리를 처음부터').setColor('#ff9a9a');
    this.cameras.main.flash(400, 40, 0, 0);
    this.time.delayedCall(1500, () => this.spawnWave());
  }

  updateBattleText() {
    const BT = this.battle, B = this.cfg.battle;
    this.speedPanel.setLines([
      ...this.aliveWraiths().map((e, i) => `빛의 망령 ${i + 1}: ${Math.ceil(e.hp)} / ${e.max}`),
      `막 방패로 튕기기 ${B.reflectDamage}   X 빛 공격 ${B.staff.damage}`,
      this.aliveWraiths().length >= 2 ? '바닥의 어두운 띠 안에서는 피해가 줄어든다' : '망령이 하나면 띠가 생기지 않는다',
      `무리 ${Math.max(1, BT.wave)} / ${B.waves.length}`,
    ]);
  }
}
window.FringeScene = FringeScene;

// ------------------------------------------------------------------ 스크린 벽 확대 창: 띠와 밝기 그래프 (광원 세기·틈 판을 바꾼 순간 2~3초)
class ScreenZoom {
  constructor(scene, layer) {
    this.scene = scene;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(330).setVisible(false);
    layer.add(c);
    this.container = c;
    this.r = { x: 40, y: 170, w: 560, h: 430 };   // 대화창(y 620부터)에 가리지 않게
    const R = this.r;
    c.add(scene.add.rectangle(R.x, R.y, R.w, R.h, 0x0b1320, 0.95).setOrigin(0, 0).setStrokeStyle(3, 0x9fe0ff));
    c.add(UIKit.text(scene, R.x + R.w / 2, R.y + 8, '스크린 벽 확대 — 위아래 밝기', { fontSize: '24px', color: UIKit.SKY }).setOrigin(0.5, 0));
    this.g = scene.add.graphics();
    c.add(this.g);
    this.note = UIKit.text(scene, R.x + R.w / 2, R.y + R.h - 10, '', { fontSize: '20px', color: '#ffe08a', align: 'center', wordWrap: { width: R.w - 24 } }).setOrigin(0.5, 1);
    c.add(this.note);
  }

  show(plate, before, after, cursed) {
    const G = this.g, R = this.r, I = GAME_CONFIG.act3.interference, col = this.scene.cfg.lightColor, wall = this.scene.cfg.wallTop;
    const top = R.y + 44, h = R.h - 110, sx = R.x + 20, sw = 90, gx = sx + sw + 24, gw = R.w - (gx - R.x) - 24;
    G.clear();
    G.fillStyle(0x10161c, 1).fillRect(sx, top, sw, h);
    G.lineStyle(2, 0x5a6a7a, 1).lineBetween(gx, top, gx, top + h).lineBetween(gx, top + h, gx + gw, top + h);
    const line = (br, c, alpha) => {
      const pts = [];
      for (let i = 0; i <= h; i += 3) pts.push({ x: gx + Interference.intensity(wall + 8 + i / h * 484, plate, { cursed }) * br * gw, y: top + i });
      G.lineStyle(3, c, alpha).strokePoints(pts);
    };
    for (let i = 0; i < h; i += 3) {
      G.fillStyle(col, Interference.intensity(wall + 8 + i / h * 484, plate, { cursed }) * after).fillRect(sx, top + i, sw, 3);
    }
    if (before !== after) line(before, 0x8a96a8, 0.9);
    line(after, col, 1);
    this.note.setText(before === after ? (cursed ? '어디나 고르게 밝다' : '틈 간격이 바뀌면 줄 간격도 바뀐다')
      : cursed ? '회색: 전   초록: 후 — 어디나 고르게 더 밝아졌다' : '회색: 전   초록: 후 — 밝은 줄만 더 밝아지고, 어두운 줄은 그대로');
    this.container.setVisible(true);
    if (this.timer) this.timer.remove();
    this.timer = this.scene.time.delayedCall(this.scene.cfg.brightness.zoomSeconds * 1000, () => this.container.setVisible(false));
  }
}
window.ScreenZoom = ScreenZoom;

// ------------------------------------------------------------------ 진실의 원 실험: 물결 수조
// 두 손가락(파원)으로 물을 두드린다. 물결의 합은 Interference.rippleHeight — 마루+마루는 크게 출렁이고 마루+골은 잔잔하다.
// 한쪽만 켜면 동심원만 있고 줄무늬가 사라진다. 저해상도 캔버스에 그려 크게 늘린다 (학교 PC·크롬북용).
class RippleLab {
  static W = 180;
  static H = 100;
  static SCALE = 6;

  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 60, '진실의 원 — 물결 수조', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    this.help = UIKit.text(scene, 960, 118, '', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5);
    c.add(this.help);
    this.info = UIKit.text(scene, 960, 170, '', { fontSize: '28px', align: 'center' }).setOrigin(0.5, 0);
    c.add(this.info);
    const { W, H, SCALE } = RippleLab;
    this.ox = 960 - W * SCALE / 2;
    this.oy = 240;
    if (scene.textures.exists('ripple_lab')) scene.textures.remove('ripple_lab');
    this.tex = scene.textures.createCanvas('ripple_lab', W, H);
    this.image = scene.add.image(this.ox, this.oy, 'ripple_lab').setOrigin(0, 0).setScale(SCALE);
    c.add(this.image);
    c.add(scene.add.rectangle(this.ox, this.oy, W * SCALE, H * SCALE).setOrigin(0, 0).setStrokeStyle(4, 0x9fe0ff));
    this.pixels = this.tex.context.createImageData(W, H);
    // 파원 (수조 왼쪽 가운데 위아래로)
    const L = GAME_CONFIG.act3.ch3_1.lab;
    this.sources = [{ x: L.sourceX, y: H * SCALE / 2 - L.sourceGap / 2, on: true }, { x: L.sourceX, y: H * SCALE / 2 + L.sourceGap / 2, on: false }];
    this.dots = this.sources.map((s, i) => {
      const dot = scene.add.circle(this.ox + s.x, this.oy + s.y, 14, 0xffe08a);
      const t = UIKit.text(scene, this.ox + s.x - 30, this.oy + s.y, String(i + 1), { fontSize: '30px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#061018cc', padding: { x: 8, y: 2 } }).setOrigin(1, 0.5);
      c.add([dot, t]);
      return dot;
    });
    // 물 위에 띄운 찌 둘: 두 물결의 길 차이가 0인 곳(마루+마루)과 반 파장인 곳(마루+골)
    const w = GAME_CONFIG.act3.interference.wave.wavelength, px = L.probeX, cy = H * SCALE / 2;
    const diff = (y) => Math.abs(Math.hypot(px - L.sourceX, y - this.sources[0].y) - Math.hypot(px - L.sourceX, y - this.sources[1].y));
    let ny = cy;
    while (ny > 0 && diff(ny) < w / 2) ny -= 1;
    this.probes = [{ x: px, y: cy, label: '크게 출렁인다 (마루+마루)' }, { x: px, y: ny, label: '잔잔하다 (마루+골)' }].map((p) => {
      p.dot = scene.add.circle(this.ox + p.x, this.oy + p.y, 16, 0xffffff).setStrokeStyle(3, 0x0b1320);
      p.text = UIKit.text(scene, this.ox + p.x - 28, this.oy + p.y, p.label, { fontSize: '24px', fontStyle: 'bold', color: '#ffffff', backgroundColor: '#061018cc', padding: { x: 8, y: 4 } }).setOrigin(1, 0.5);
      c.add([p.dot, p.text]);
      return p;
    });
    this.results = UIKit.text(scene, 960, 860, '', { fontSize: '28px', align: 'center', lineSpacing: 8 }).setOrigin(0.5, 0);
    c.add(this.results);
    scene.input.keyboard.on('keydown-SPACE', () => this.isOpen && this.toggle(1));
    scene.input.keyboard.on('keydown-ONE', () => this.isOpen && this.toggle(0));
    scene.input.keyboard.on('keydown-TWO', () => this.isOpen && this.toggle(1));
    scene.input.keyboard.on('keydown-ESC', () => this.close());
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.t = 0;
    this.renderT = 0;
    this.oneT = 0;
    this.bothT = 0;
    this.sources[0].on = true;
    this.sources[1].on = false;
    this.container.setVisible(true);
    this.results.setText('');
    this.help.setText('1 위쪽 파원 · 2 아래쪽 파원 켜고 끄기 (Space: 아래쪽)    Esc: 닫기');
    Sound.play('sfx_truth_circle_enter');
    this.refresh();
    this.render();
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  toggle(i) {
    if (this.done) return;
    this.sources[i].on = !this.sources[i].on;
    this.refresh();
  }

  refresh() {
    this.sources.forEach((s, i) => this.dots[i].setFillStyle(s.on ? 0xffe08a : 0x4a5a6a));
    const n = this.sources.filter((s) => s.on).length;
    for (const p of this.probes) p.text.setVisible(n === 2);
    if (this.done) return;
    if (n === 2) this.info.setText('두 물결이 겹치는 곳 — 흰 찌가 어떻게 움직이는지 보자').setColor('#ffe08a');
    else if (n === 1) this.info.setText(this.bothT > 0 ? '한쪽만 켜니 줄무늬가 사라졌다' : '손가락 하나로 두드리는 중 — 2를 눌러 아래쪽 파원도 켜 보자').setColor('#ffe08a');
    else this.info.setText('물결이 없다 — 1·2로 파원을 켜 보자').setColor('#ffe08a');
  }

  // 물결 높이를 그린다 (−2 ~ 2, 마루는 밝게 골은 어둡게)
  render() {
    const { W, H, SCALE } = RippleLab, d = this.pixels.data, ctx = this.tex.context;
    let i = 0;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const h = Interference.rippleHeight(x * SCALE + SCALE / 2, y * SCALE + SCALE / 2, this.t, this.sources);
        const v = (h + 2) / 4;   // 0~1
        d[i++] = 20 + v * 130;
        d[i++] = 50 + v * 190;
        d[i++] = 90 + v * 165;
        d[i++] = 255;
      }
    }
    ctx.putImageData(this.pixels, 0, 0);
    this.tex.refresh();
  }

  update(dt) {
    if (!this.isOpen) return;
    this.t += dt;
    this.renderT -= dt;
    if (this.renderT <= 0) { this.renderT = 1 / 15; this.render(); }
    for (const p of this.probes) {
      const h = Interference.rippleHeight(p.x, p.y, this.t, this.sources);
      p.dot.setPosition(this.ox + p.x, this.oy + p.y - h * 12);
    }
    const n = this.sources.filter((s) => s.on).length, L = GAME_CONFIG.act3.ch3_1.lab;
    if (n === 1) this.oneT += dt;
    if (n === 2) this.bothT += dt;
    if (!this.done && this.oneT >= L.oneSeconds && this.bothT >= L.bothSeconds) {
      this.done = true;
      this.help.setText('');
      this.results.setText('마루와 마루가 만나는 곳은 크게 출렁이고, 마루와 골이 만나는 곳은 잔잔하다\n그래서 줄무늬가 생긴다 — 한쪽만 켜면 줄무늬는 사라진다').setColor(UIKit.SKY);
      UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
    }
  }
}
window.RippleLab = RippleLab;
