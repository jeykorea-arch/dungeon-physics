// 3-2 물웅덩이와 렌즈의 방 (ACT3_PLAN 2단계) — 배경 abyss_2 (2400px). 계산은 js/physics/act3/optics.js, 값은 config.js 의 act3.optics·ch3_2
//   저주: 빛이 똑바로만 가서 보이는 곳 = 실제 위치. 열쇠가 바로 잡히지만 저주 걸린 열쇠는 문에 맞지 않는다.
//   진실의 원: 수면에 비스듬히 빛을 쏘면 스넬 법칙대로 꺾인다 (수직이면 꺾이지 않는다).
//   해방: 열쇠가 겉보기 깊이(실제 ÷ 1.33)에 보이고, 잡을 수 있는 곳은 실제 깊이. 손 깊이를 ↑↓로 조절한다.
//   렌즈 작업대: 문양판(고정)·볼록렌즈·상 받는 판. 선명하고 수정판에 들어갈 만큼 작으면 문양이 새겨진다. 열쇠 + 수정판 → 문이 열린다.
//   전투: 수정 물고기는 겉보기 자리에 그리고 빛의 판정도 겉보기 자리(빛은 온 길을 되돌아간다). 볼록렌즈는 초점거리 근처에서 강하다 → 시험 14 → 문으로 3-3.
class LensScene extends ChapterScene {
  constructor() {
    super('Ch3_2');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act3.ch3_2, O = MANIFEST.objects, PX = this.PX, g = this.groundY;
    this.cfg = cfg;
    this.reach = null;
    this.bench = null;
    this.carryCursed = false;
    this.realizing = false;
    const saved = Save.chapter(this.scene.key);
    this.keyTaken = !!saved.keyTaken;     // 진짜 열쇠를 건졌다
    this.keyUsed = !!saved.keyUsed;       // 문에 꽂았다
    this.engraved = !!saved.engraved;     // 수정판에 문양을 새겼다
    this.carryKey = this.keyTaken && !this.keyUsed;
    const place = (o, x, y, state, depth) => {
      const img = this.add.image(x, y, o.states[state || Object.keys(o.states)[0]]).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };
    // 웅덩이 물 (사람·열쇠·물고기 앞에 반투명으로)
    const W = O.water_body.world_rect;
    this.poolX = [W[0], W[2]];
    place(O.water_body, (W[0] + W[2]) / 2, W[1], null, 6).setAlpha(O.water_body.opacity);
    this.surface = place(O.water_surface, (W[0] + W[2]) / 2, W[1], '01', 6);
    this.surfaceT = 0;
    // 금 열쇠 (보이는 자리에 그린다)
    this.keyImg = place(O.golden_key, cfg.keyX, g, null, 3);
    this.carryImg = this.add.image(0, 0, O.golden_key.states.default).setDepth(8).setVisible(false);
    this.worldLayer.add(this.carryImg);
    // 웅덩이를 건너는 돌다리 (요청서 13). 윗면 = 바닥선
    place(O.pool_bridge, (W[0] + W[2]) / 2, g, null, 5);
    // 레일·문양판·렌즈·상 받는 판·수정판
    place(O.optical_rail, (cfg.railX + cfg.railEnd) / 2, g, null, 1);
    const railTop = g - O.optical_rail.height;
    place(O.pattern_stencil, cfg.railX, railTop - O.pattern_stencil.height, null, 2);
    this.lens = { x: saved.lensX || cfg.lensStart, img: place(O.convex_lens, saved.lensX || cfg.lensStart, railTop, null, 2) };
    this.screen = { x: saved.screenX || cfg.screenStart, img: place(O.lens_screen, saved.screenX || cfg.screenStart, railTop, null, 2) };
    this.plateImg = place(O.crystal_plate, 0, cfg.plateY, this.engraved ? 'engraved' : 'blank', 3);
    this.syncBench();
    // 문
    this.door = place(O.light_door, cfg.doorX, g - O.light_door.height, this.keyUsed && this.engraved ? 'opening_04' : 'closed', 1);
    this.doorOpen = this.keyUsed && this.engraved;

    this.circle = this.curse.addTruthCircle({ centerX: cfg.circleX / PX, groundY: g, diameter: 2.4, domeHeight: 2.6 });
    this.curse.setCircleActive(this.circle, !this.curse.cursed || !!saved.circleLit);

    this.armG = this.add.graphics().setDepth(7);
    this.aimG = this.add.graphics().setDepth(7);
    this.worldLayer.add([this.armG, this.aimG]);
    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, g).setDepth(5);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, g).setDepth(4);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    this.held = new HeldItems(this, this.ian, { items: [] });

    const kb = this.input.keyboard;
    this.keysIn = kb.addKeys({ left: 'LEFT', right: 'RIGHT', up: 'UP', down: 'DOWN', act: 'Z', fire: 'X', swap: 'Q' });
    kb.addCapture(['Z', 'X', 'Q', 'UP', 'DOWN']);
    this.keysIn.act.on('down', () => this.interact());
    this.keysIn.swap.on('down', () => this.swapBench());
    this.flags = {};
    this.actT = 0;
    this.lab = new RefractLab(this, this.uiLayer);
    this.benchUI = new LensBenchView(this, this.uiLayer);
  }

  addPrompts() {
    const c = this.cfg, free = () => !this.battle && !this.reach && !this.bench;
    this.addPrompt({ key: 'Z', text: '웅덩이에 손 넣기', x: c.keyX, range: c.reach * this.PX,
      when: () => free() && !this.keyTaken && !this.carryCursed });
    this.addPrompt({ key: 'Z', text: '빛 실험', x: c.circleX, range: 1.2 * this.PX,
      when: () => this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x) });
    this.addPrompt({ key: 'Z', text: '렌즈 작업대', x: () => Phaser.Math.Clamp(this.ian.x, c.railX, c.railEnd), range: 1.5 * this.PX,
      when: () => free() && !this.curse.cursed && !this.engraved && this.ian.x >= c.railX && this.ian.x <= c.doorX - 90 });
    this.addPrompt({ key: 'Z', text: () => (this.doorOpen ? '문으로 들어가기' : '열쇠 꽂기'), x: c.doorX - 40, range: 1.0 * this.PX,
      when: () => free() && (this.carryKey || this.carryCursed || (this.doorOpen && this.canLeave())) });
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  onReady() {
    this.addPrompts();
    this.helpText = UIKit.text(this, 1900, 1070, '← → 걷기   Z 손 넣기·실험·문   M 마법서', {
      fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(300);
    this.uiLayer.add(this.helpText);
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1130, 170);
    const saved = Save.chapter(this.scene.key);
    if (this.curse.cursed) this.message.setText(this.circle.active ? '' : '다리 가운데에서 Z: 열쇠를 건져 보자');
    if (saved.battleDone && !saved.examPassed) {
      this.battle = { done: true, enemies: [] };
      this.examBtn = this.showExamIntro(() => this.startExam());
    }
    this.placeKey();
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 빛은 어떤 물질에서도 똑바로만 간다? (물속 물체는 보이는 그 자리에 있다)'
      : '진짜 법칙: 빛은 경계에서 꺾인다 — 물속 물체는 실제보다 얕게 보인다. 볼록렌즈: 초점 밖 물체 → 거꾸로 선 상, 초점 안 물체 → 바로 선 큰 모습(돋보기)';
  }

  canLeave() {
    return !!Save.chapter(this.scene.key).examPassed;
  }

  near(x, m) {
    return Math.abs(this.ian.x - x) <= (m ?? this.cfg.reach) * this.PX;
  }

  depthY(d) {
    return this.groundY + d * this.PX;
  }

  teacherNumbers() {
    const a = (this.lens.x - this.cfg.railX) / this.PX, s = (this.screen.x - this.lens.x) / this.PX, im = Optics.image(a, s);
    const lab = this.lab.isOpen ? `입사각 ${Math.round(this.lab.angle)}°, 굴절각 ${Optics.refract(this.lab.angle).toFixed(1)}°   ` : '';
    return [`${lab}지금: a = ${a.toFixed(2)} m, 판까지 ${s.toFixed(2)} m, b = ${im.b === null ? '없음' : im.b.toFixed(2) + ' m'}, 배율 ${im.m === null ? '없음' : im.m.toFixed(2)}, 선명도 ${im.sharpness.toFixed(2)}, 새기기 ${Optics.canEngrave(a, s) ? '가능' : '불가'}`];
  }

  // ------------------------------------------------------------------ 열쇠
  // 열쇠 그림 자리: 저주는 실제 위치(바닥에 놓임), 해방은 겉보기 깊이
  keyShownDepth() {
    const c = this.cfg, real = GAME_CONFIG.act3.optics.keyDepth;
    return this.curse.cursed ? Math.min(real, c.keyRestDepth) : Optics.apparentDepth(real);
  }

  placeKey() {
    this.keyImg.setPosition(this.cfg.keyX, this.depthY(this.keyShownDepth())).setVisible(!this.keyTaken && !this.carryCursed);
  }

  // ------------------------------------------------------------------ Z
  interact() {
    if (this.isBlocked() || this.realizing) return;
    if (this.bench) { this.endBench(); return; }
    if (this.reach) { this.tryGrab(); return; }
    if (this.battle && !this.battle.done) return;
    const c = this.cfg;
    if (this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x)) {
      const open = () => this.lab.open(() => this.onLabDone());
      if (this.flags.labTalked) { open(); return; }
      this.flags.labTalked = true;
      this.say('lab_start', open);
      return;
    }
    if (this.near(c.doorX - 40, 1)) { this.useDoor(); return; }
    if (!this.curse.cursed && !this.engraved && this.ian.x >= c.railX && this.ian.x <= c.doorX - 90) { this.startBench(); return; }
    if (this.near(c.keyX) && !this.keyTaken && !this.carryCursed) this.startReach();
  }

  startReach() {
    if (!this.curse.cursed && !this.flags.garonMissed) {   // 해방 뒤 처음: 가론이 보이는 곳에 손을 넣어 헛손질
      this.flags.garonMissed = true;
      Characters.play(this.garon, 'reach_down', false);
      this.garonActT = 1;
      Sound.play('sfx_hand_splash');
      this.say('garon_miss');
      return;
    }
    this.reach = { depth: 0.2 };
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'reach_down', false);
    Sound.play('sfx_hand_splash');
    this.helpText.setText('↑ ↓ 손 깊이   Z 잡기   ← → 그만두기');
    this.message.setText('↑ ↓ 로 손 깊이를 맞추고 Z로 잡자').setColor('#ffe08a');
  }

  endReach() {
    this.reach = null;
    this.armG.clear();
    this.helpText.setText('← → 걷기   Z 손 넣기·실험·문   M 마법서');
  }

  tryGrab() {
    const c = this.cfg, depth = this.reach.depth;
    const target = this.curse.cursed ? this.keyShownDepth() : GAME_CONFIG.act3.optics.keyDepth;
    if (Math.abs(depth - target) <= c.grabTolerance) {
      Sound.play('sfx_hand_splash');
      this.endReach();
      if (this.curse.cursed) {
        this.carryCursed = true;
        this.placeKey();
        this.message.setText('보이는 자리에서 바로 잡혔다! 문으로 가져가 Z').setColor('#ffe08a');
        this.say('cursed_grab');
      } else {
        this.keyTaken = true;
        this.carryKey = true;
        Save.setChapter(this.scene.key, { keyTaken: true });
        this.placeKey();
        this.message.setText('진짜 열쇠를 건졌다! 문으로 가져가 Z').setColor(UIKit.SKY);
        this.say('real_grab');
      }
      return;
    }
    Sound.play('sfx_water_miss');
    const seen = this.keyShownDepth();
    if (!this.curse.cursed && Math.abs(depth - seen) <= c.grabTolerance) {
      this.message.setText('보이는 자리인데 손에 잡히지 않는다! 열쇠는 어디에 있을까?').setColor('#ffd27a');
      if (!this.flags.seenMiss) { this.flags.seenMiss = true; this.say('hand_miss'); }
    } else this.message.setText('손에 아무것도 닿지 않았다').setColor('#ffd27a');
  }

  useDoor() {
    if (this.doorOpen) {
      if (this.canLeave() && !this.flags.leaving) {
        this.flags.leaving = true;
        this.cameras.main.fadeOut(600, 0, 0, 0);
        this.time.delayedCall(650, () => this.goNext());
      }
      return;
    }
    if (this.carryCursed) {   // 저주 걸린 열쇠는 맞지 않는다
      this.carryCursed = false;
      this.placeKey();
      Sound.play('sfx_exam_wrong');
      this.message.setText('열쇠가 문에 맞지 않는다! 손을 떠나 웅덩이로 돌아갔다').setColor('#ffd27a');
      this.say('key_reject', () => {
        if (this.circle.active) return;
        Save.setChapter(this.scene.key, { circleLit: true });
        this.message.setText('웅덩이와 레일 사이 바닥에 진실의 원이 나타났다! 가 보자').setColor(UIKit.SKY);
        this.curse.setCircleActive(this.circle, true);
        this.say('circle_found');
      });
      return;
    }
    if (this.carryKey) {
      this.carryKey = false;
      this.keyUsed = true;
      Save.setChapter(this.scene.key, { keyUsed: true });
      Sound.play('sfx_switch_flip');
      if (this.engraved) { this.openDoor(); return; }
      this.message.setText('열쇠가 맞았다! 문양을 새긴 수정판도 있어야 한다 — 렌즈 작업대로').setColor(UIKit.SKY);
      this.say('door_key');
    }
  }

  openDoor() {
    if (this.doorOpen) return;
    this.doorOpen = true;
    Sound.play('sfx_door_open');
    const O = MANIFEST.objects.light_door;
    ['opening_01', 'opening_02', 'opening_03', 'opening_04'].forEach((s, i) => this.time.delayedCall(250 * (i + 1), () => this.door.setTexture(O.states[s])));
    this.message.setText('문이 열린다… 웅덩이가 출렁인다!').setColor(UIKit.SKY);
    this.time.delayedCall(1400, () => this.startBattle());
  }

  onLabDone() {
    this.realizing = true;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.placeKey();
        this.message.setText('열쇠가 더 얕은 곳에 보인다! 다리 가운데에서 Z로 건져 보자').setColor(UIKit.SKY);
        this.say('after_free');
      }));
    });
  }

  // ------------------------------------------------------------------ 렌즈 작업대
  startBench() {
    this.bench = { item: 'lens', heldT: 0 };
    this.benchUI.show();
    this.helpText.setText('← → 옮기기 (누르고 있으면 빨라진다)   Q 렌즈 ↔ 상 받는 판   Z 끝내기');
    this.refreshBench();
  }

  endBench() {
    this.bench = null;
    this.benchUI.hide();
    this.helpText.setText('← → 걷기   Z 손 넣기·실험·문   M 마법서');
    Save.setChapter(this.scene.key, { lensX: this.lens.x, screenX: this.screen.x });
  }

  swapBench() {
    if (!this.bench || this.isBlocked()) return;
    this.bench.item = this.bench.item === 'lens' ? 'screen' : 'lens';
    Sound.play('sfx_ui_click');
    this.refreshBench();
  }

  // 문양판 위치 기준 거리
  benchState() {
    const c = this.cfg, a = (this.lens.x - c.railX) / this.PX, s = (this.screen.x - this.lens.x) / this.PX;
    return { a, s, image: Optics.image(a, s) };
  }

  syncBench() {
    const c = this.cfg;
    this.lens.img.x = this.lens.x;
    this.screen.img.x = this.screen.x;
    this.plateImg.setPosition(this.screen.x, c.plateY);
  }

  updateBench(dt) {
    const k = this.keysIn, c = this.cfg, B = this.bench;
    const dir = (k.right.isDown ? 1 : 0) - (k.left.isDown ? 1 : 0);
    if (dir) {
      B.heldT += dt;
      const v = (B.heldT < c.benchSlowSeconds ? c.benchSlow : c.benchFast) * this.PX;
      const it = B.item === 'lens' ? this.lens : this.screen;
      const lo = B.item === 'lens' ? c.railX + c.benchGap : this.lens.x + c.benchGap;
      const hi = B.item === 'lens' ? this.screen.x - c.benchGap : c.railEnd;
      it.x = Phaser.Math.Clamp(it.x + dir * v * dt, lo, hi);
      if (B.heldT === dt) Sound.play('sfx_rail_clack');
      this.syncBench();
      this.refreshBench();
    } else B.heldT = 0;
  }

  refreshBench() {
    const st = this.benchState();
    if (st.image.sharp && !this.bench.wasSharp) Sound.play('sfx_image_sharp');
    this.bench.wasSharp = st.image.sharp;
    this.benchUI.draw(st, this.bench.item);
    if (Optics.canEngrave(st.a, st.s) && !this.engraved) this.engrave();
  }

  engrave() {
    this.engraved = true;
    Save.setChapter(this.scene.key, { engraved: true, lensX: this.lens.x, screenX: this.screen.x });
    this.plateImg.setTexture(MANIFEST.objects.crystal_plate.states.engraved);
    Sound.play('sfx_engrave');
    this.message.setText('선명한 상이 수정판에 새겨졌다!').setColor(UIKit.SKY);
    this.time.delayedCall(1200, () => {
      if (this.bench) this.endBench();
      this.say('engraved', () => {
        if (this.keyUsed) this.openDoor();
        else this.message.setText(this.keyTaken ? '열쇠를 문에 꽂자 (Z)' : '이제 진짜 열쇠를 건져 문에 꽂자').setColor(UIKit.SKY);
      });
    });
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const k = this.keysIn, PX = this.PX, c = this.cfg;
    this.actT = Math.max(0, this.actT - dt);
    this.surfaceT += dt;
    this.surface.setTexture(MANIFEST.objects.water_surface.states[String(1 + Math.floor(this.surfaceT * 4) % 4).padStart(2, '0')]);
    const carrying = this.carryKey || this.carryCursed;
    this.carryImg.setVisible(carrying);
    if (carrying) this.carryImg.setPosition(this.ian.x + (this.ian.flipX ? -40 : 40), this.ian.y - 90);
    this.updateGaron(dt);
    this.updateBattle(dt);
    if (this.battle && !this.battle.done) this.updateBattleText();
    else this.updatePanel();
    if (this.bench) { this.updateBench(dt); Characters.play(this.ian, 'idle'); return; }
    if (this.reach) { this.updateReach(dt); return; }
    const dir = this.actT > 0 || this.realizing ? 0 : (k.right.isDown ? 1 : 0) - (k.left.isDown ? 1 : 0);
    if (dir) {
      this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * c.walkSpeed * PX * dt, 60, this.doorOpen ? this.worldW - 60 : c.doorX - 70);
      this.ian.setFlipX(dir < 0);
    }
    if (!this.realizing && this.actT <= 0) Characters.play(this.ian, dir ? 'walk' : (this.held.pose() || 'idle'));
  }

  updateReach(dt) {
    const k = this.keysIn, c = this.cfg, R = this.reach;
    if (k.left.isDown || k.right.isDown) { this.endReach(); this.message.setText(''); return; }
    const d = (k.down.isDown ? 1 : 0) - (k.up.isDown ? 1 : 0);
    R.depth = Phaser.Math.Clamp(R.depth + d * c.handSpeed * dt, 0.1, c.handMax);
    // 팔: 손이 물속 깊이까지 닿도록 엔진이 늘려 그린다 (보이는 값)
    const A = MANIFEST.characters.ian.animations.reach_down, p = A.handPoints[A.handPoints.length - 1];
    const x = this.ian.x + (p.x - A.pivot.x), y0 = this.ian.y + p.y - A.pivot.y, y1 = this.depthY(R.depth);
    this.armG.clear().lineStyle(14, 0xe0b48c, 1).lineBetween(x, y0, x, y1).fillStyle(0xe0b48c, 1).fillCircle(x, y1, 12);
    this.armG.lineStyle(3, 0x5a3d28, 1).strokeCircle(x, y1, 12);
  }

  updateGaron(dt) {
    const g = this.garon, c = this.cfg, PX = this.PX;
    this.garonActT = Math.max(0, (this.garonActT || 0) - dt);
    if (this.garonActT > 0 || this.dialogue.active && this.flags.garonMissed && !this.flags.garonUp) { this.flags.garonUp = this.garonActT <= 0 && !this.dialogue.active; return; }
    const d = this.ian.x - g.x, walk = Math.abs(d) > c.garonFollow * PX && !(this.battle && !this.battle.done);
    if (walk) {
      g.x += Math.sign(d) * c.walkSpeed * PX * dt;
      g.setFlipX(d < 0);
    }
    Characters.play(g, walk ? 'walk' : 'idle');
  }

  updatePanel() {
    if (this.reach) {
      this.speedPanel.setLines([`손 깊이 ${this.reach.depth.toFixed(2)} m`, this.answersShown() ? `열쇠: 실제 ${GAME_CONFIG.act3.optics.keyDepth} m, 보이는 곳 ${this.keyShownDepth().toFixed(2)} m` : '']);
      return;
    }
    if (this.bench) {
      const st = this.benchState();
      this.speedPanel.setLines([
        st.image.b === null ? '상: 맺히지 않는다 (빛이 퍼진다)' : `상: ${st.image.sharp ? '또렷하다' : '흐리다'} · 거꾸로 · 수정판에 ${st.image.m <= GAME_CONFIG.act3.optics.plateHeight / GAME_CONFIG.act3.optics.stencilHeight + 1e-9 ? '들어간다' : '다 안 들어간다'}`,
      ]);
      return;
    }
    this.speedPanel.setLines([
      this.curse.cursed ? '빛: 물속에서도 똑바로 간다' : '빛: 수면에서 꺾인다 (물 n = 1.33)',
      `열쇠: ${this.keyUsed ? '문에 꽂음' : this.keyTaken ? '건졌다' : '웅덩이 안'}   수정판: ${this.engraved ? '새김' : '비어 있음'}`,
    ]);
  }

  // ------------------------------------------------------------------ 수정 물고기 전투
  startBattle() {
    if (this.battle) return;
    if (this.dialogue.active) { this.time.delayedCall(500, () => this.startBattle()); return; }
    this.battle = { wave: 0, enemies: [], done: false };
    this.ianHp = 1;
    this.fireT = 0;
    this.aimDepth = 0.5;
    this.setMusicMode('midboss');
    this.held.setItems(['convex_lens']);
    this.held.bar.setPosition(-640, 0);   // 물건 칸이 웅덩이를 가리지 않게 왼쪽으로
    this.helpText.setText('← → 걷기   ↑ ↓ 겨누는 깊이   1 볼록렌즈 들기   X 쏘기   M 마법서');
    this.beamG = this.add.graphics().setDepth(7);
    this.worldLayer.add(this.beamG);
    this.say('battle_start', () => {
      this.introKey('1', '볼록렌즈 — 들고 서서 X로 빛을 모은다');
      this.time.delayedCall(3300, () => this.introKey('↑↓', '겨누는 깊이 — 빛은 보이는 곳을 겨누면 맞는다'));
      this.spawnWave();
    });
  }

  spawnWave() {
    const B = this.cfg.battle, BT = this.battle;
    for (const e of BT.enemies) if (e.s.active) e.s.destroy();
    BT.enemies = [];
    BT.wave += 1;
    if (BT.wave > B.waves.length) { this.endBattle(); return; }
    for (let i = 0; i < B.waves[BT.wave - 1]; i++) {
      const x = this.poolX[0] + 90 + i * 300;
      const s = Characters.create(this, 'crystal_fish', x, this.groundY + 100, 'swim').setDepth(3);
      this.worldLayer.add(s);
      BT.enemies.push({ s, x, dir: i % 2 ? -1 : 1, phase: i * 1.7, hp: B.hp, max: B.hp, cool: 2 + i, realDepth: 0.8 });
    }
  }

  endBattle() {
    this.battle.done = true;
    this.beamG.clear();
    this.aimG.clear();
    this.setMusicMode(null);
    this.held.setItems([]);
    this.helpText.setText('← → 걷기   M 마법서');
    Save.setChapter(this.scene.key, { battleDone: true });
    this.say('battle_done', () => {
      this.message.setText('수정 물고기를 모두 물리쳤다!').setColor(UIKit.SKY);
      this.examBtn = this.showExamIntro(() => this.startExam());
    });
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      if (this.examBtn) this.examBtn.setVisible(false);
      Save.setChapter(this.scene.key, { examPassed: true });
      this.message.setText('3-2 빛의 굴절과 렌즈 — 마법서 시험 통과! 열린 문으로 들어가자 (Z)').setColor(UIKit.SKY);
    });
  }

  overWater() {
    return this.ian.x > this.poolX[0] && this.ian.x < this.poolX[1];
  }

  // 렌즈 자리 (이안 손 앞). 빛은 수면에 수직으로 들어가 꺾이지 않는다
  lensY() {
    return this.ian.y - this.cfg.battle.lensHeight;
  }

  updateBattle(dt) {
    const BT = this.battle;
    if (!BT || BT.done || !BT.wave) return;
    const B = this.cfg.battle, k = this.keysIn, PX = this.PX;
    this.fireT = Math.max(0, this.fireT - dt);
    this.beamT = Math.max(0, (this.beamT || 0) - dt);
    if (this.beamT <= 0) this.beamG.clear();
    this.aimDepth = Phaser.Math.Clamp(this.aimDepth + ((k.down.isDown ? 1 : 0) - (k.up.isDown ? 1 : 0)) * B.aimSpeed * dt, 0.05, 1.45);
    // 겨누는 자리 표시 + 초점 자리
    this.aimG.clear();
    if (this.overWater() && this.held.isHeld()) {
      const y = this.depthY(this.aimDepth), fy = this.lensY() + GAME_CONFIG.act3.optics.focal * PX;
      this.aimG.lineStyle(3, 0xffe08a, 1).strokeCircle(this.ian.x, y, 22).lineBetween(this.ian.x - 30, y, this.ian.x + 30, y);
      this.aimG.lineStyle(2, 0xffffff, 0.7).lineBetween(this.ian.x - 40, fy, this.ian.x + 40, fy);
    }
    if (k.fire.isDown && !this.isBlocked()) this.fireLens();
    for (const e of BT.enemies) {
      if (e.gone) continue;
      e.phase += dt;
      e.x += e.dir * B.speed * PX * dt;
      if (e.x < this.poolX[0] + 70 || e.x > this.poolX[1] - 70) e.dir = -e.dir;
      e.realDepth = B.depthMid + B.depthAmp * Math.sin(e.phase * B.depthRate);
      e.s.setPosition(e.x, this.depthY(this.seenDepth(e))).setFlipX(e.dir > 0);   // 그림·빛 판정 모두 겉보기 자리 (빛은 온 길을 되돌아간다), 물기는 실제 자리
      if (!e.s.anims.isPlaying) Characters.play(e.s, 'swim');
      e.cool -= dt;
      if (e.cool <= 0 && this.overWater() && Math.abs(e.x - this.ian.x) < B.biteRange && e.realDepth < B.biteDepth) {
        e.cool = B.biteEvery;
        this.ianHp = Math.max(0, this.ianHp - B.damage);
        if (this.hud) this.hud.set('health', this.ianHp);
        Sound.play('sfx_ian_hurt');
        Characters.play(this.ian, 'hurt', false);
        this.actT = 0.3;
        this.message.setText('물고기가 튀어 올라 물었다!').setColor('#ff9a9a');
        if (this.ianHp <= 0) { this.battleLost(); return; }
      }
    }
    if (!BT.waiting && BT.enemies.length && BT.enemies.every((e) => e.gone)) {
      BT.waiting = true;
      this.time.delayedCall(1200, () => { BT.waiting = false; this.spawnWave(); });
    }
  }

  // X: 볼록렌즈로 빛을 모아 겨눈 깊이로. 맞았는지는 물고기의 실제 깊이로 본다
  fireLens() {
    const B = this.cfg.battle, PX = this.PX;
    if (this.fireT > 0 || this.actT > 0) return;
    if (!this.held.isHeld()) { this.message.setText('볼록렌즈를 들자 (1) — 걷는 동안은 쏠 수 없다').setColor('#ffd27a'); return; }
    if (!this.overWater()) { this.message.setText('다리 위에서 물속을 겨누자').setColor('#ffd27a'); return; }
    this.fireT = B.every;
    const y0 = this.lensY(), y1 = this.depthY(this.aimDepth);
    this.beamG.clear().lineStyle(8, 0xffe9a0, 0.45).lineBetween(this.ian.x, y0, this.ian.x, y1).lineStyle(3, 0xfffbe6, 1).lineBetween(this.ian.x, y0, this.ian.x, y1);
    this.beamT = 0.15;
    const e = this.battle.enemies.filter((o) => !o.gone && Math.abs(o.x - this.ian.x) <= B.hitX && Math.abs(this.seenDepth(o) - this.aimDepth) <= B.hitDepth)[0];
    if (!e) {
      Sound.play('sfx_water_miss');
      const seen = this.battle.enemies.some((o) => !o.gone && Math.abs(o.x - this.ian.x) <= B.hitX);
      if (seen) this.message.setText('빗나갔다! 보이는 물고기를 그대로 겨누자').setColor('#ffd27a');
      return;
    }
    const d = (this.depthY(this.seenDepth(e)) - y0) / PX, scale = this.held.attackScale(d), dmg = B.lensDamage * scale;
    Sound.play('sfx_water_hit');
    Sound.play(scale >= B.burnScale ? 'sfx_lens_burn' : 'sfx_lens_focus');
    e.hp -= dmg;
    this.message.setText(`명중! 피해 ${dmg.toFixed(1)}${scale >= B.burnScale ? ' — 초점에 딱 맞았다!' : ''}`).setColor(UIKit.SKY);
    if (e.hp <= 0) {
      e.gone = true;
      Characters.play(e.s, 'defeat', false);
      return;
    }
    Characters.play(e.s, 'hurt', false);
  }

  // 물고기가 보이는 깊이. 빛으로 쏠 때는 이 자리를 겨누면 실제 물고기에 닿는다 (승인대기 [80])
  seenDepth(e) {
    return Optics.apparentDepth(e.realDepth, { cursed: this.curse.cursed });
  }

  battleLost() {
    const BT = this.battle;
    for (const e of BT.enemies) if (e.s.active) e.s.destroy();
    BT.enemies = [];
    BT.wave -= 1;
    this.ianHp = 1;
    this.beamG.clear();
    this.aimG.clear();
    if (this.hud) this.hud.set('health', 1);
    this.message.setText('이안이 쓰러졌다… 이 무리를 처음부터').setColor('#ff9a9a');
    this.cameras.main.flash(400, 40, 0, 0);
    this.time.delayedCall(1500, () => this.spawnWave());
  }

  updateBattleText() {
    const BT = this.battle, B = this.cfg.battle;
    this.speedPanel.setLines([
      ...BT.enemies.filter((e) => !e.gone).map((e, i) => `수정 물고기 ${i + 1}: ${Math.ceil(e.hp)} / ${e.max}`),
      '보이는 곳을 겨누자 · 흰 줄 = 렌즈의 초점 (가장 강하다)',
      `무리 ${Math.max(1, BT.wave)} / ${B.waves.length}`,
    ]);
  }
}
window.LensScene = LensScene;

// ------------------------------------------------------------------ 렌즈 작업대 화면: 수정판에 맺힌 상 (화면 위쪽 작은 창)
class LensBenchView {
  constructor(scene, layer) {
    this.scene = scene;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(330).setVisible(false);
    layer.add(c);
    this.container = c;
    const S = GAME_CONFIG.act3.ch3_2.benchView, O = MANIFEST.objects;
    this.S = S;
    c.add(scene.add.rectangle(S.x, S.y, S.w, S.h, 0x0b1320, 0.92).setStrokeStyle(3, 0x9fe0ff));
    c.add(UIKit.text(scene, S.x, S.y - S.h / 2 + 8, '상 받는 판에 맺힌 상', { fontSize: '22px', color: UIKit.SKY }).setOrigin(0.5, 0));
    const P = GAME_CONFIG.act3.optics, ph = P.plateHeight * S.pxPerM;
    this.plate = scene.add.rectangle(S.x, S.y + 14, ph, ph, 0x8fd8e8, 0.25).setStrokeStyle(3, 0x9fe0ff);
    c.add(this.plate);
    c.add(UIKit.text(scene, S.x, S.y + 14 + ph / 2 + 6, '네모 안 = 수정판 크기', { fontSize: '18px', color: '#cfe3f5' }).setOrigin(0.5, 0));
    // 상: 문양판 그림을 거꾸로 + 흐리면 여러 겹으로 번지게
    this.copies = [0, 1, 2, 3, 4].map(() => {
      const im = scene.add.image(S.x, S.y + 14, O.pattern_stencil.states.default);
      c.add(im);
      return im;
    });
    this.none = UIKit.text(scene, S.x, S.y + 14, '상이 맺히지 않는다\n(빛이 퍼진다)', { fontSize: '24px', align: 'center', color: '#ffd27a' }).setOrigin(0.5);
    c.add(this.none);
    this.arrow = scene.add.graphics();   // 지금 옮기는 물건 표시
    scene.worldLayer.add(this.arrow);
    this.arrow.setDepth(8);
  }

  show() { this.container.setVisible(true); }

  hide() {
    this.container.setVisible(false);
    this.arrow.clear();
  }

  draw(st, item) {
    const S = this.S, im = st.image, O = MANIFEST.objects.pattern_stencil, sc = this.scene;
    this.none.setVisible(im.b === null);
    const it = item === 'lens' ? sc.lens : sc.screen;
    this.arrow.clear().fillStyle(0xffe08a, 1).fillTriangle(it.x - 14, sc.groundY - 262, it.x + 14, sc.groundY - 262, it.x, sc.groundY - 240);
    this.copies.forEach((c, i) => {
      if (im.b === null) { c.setVisible(false); return; }
      const h = Math.min(GAME_CONFIG.act3.optics.stencilHeight * im.m * S.pxPerM, S.h * 1.1), blur = (1 - im.sharpness) * S.blurPx;
      const off = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]][i];
      c.setVisible(i === 0 || !im.sharp).setDisplaySize(h * O.width / O.height, h).setFlipY(true).setFlipX(true)
        .setPosition(S.x + off[0] * blur, S.y + 14 + off[1] * blur).setAlpha(im.sharp ? 1 : 0.3 + 0.2 * im.sharpness);
    });
  }
}
window.LensBenchView = LensBenchView;

// ------------------------------------------------------------------ 진실의 원 실험: 수면에 비스듬히 쏜 빛 (스넬 법칙)
class RefractLab {
  static PRESETS = [0, 30, 45, 60, 80];

  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    this.angle = 30;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 60, '진실의 원 — 물에 들어가는 빛', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    this.help = UIKit.text(scene, 960, 118, '', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5);
    c.add(this.help);
    this.info = UIKit.text(scene, 960, 170, '', { fontSize: '28px', align: 'center' }).setOrigin(0.5, 0);
    c.add(this.info);
    // 공기·물
    this.cx = 960;
    this.sy = 540;
    c.add(scene.add.rectangle(this.cx, this.sy, 1200, 300, 0x0a1a26, 1).setOrigin(0.5, 1));
    c.add(scene.add.rectangle(this.cx, this.sy, 1200, 300, 0x1c5d80, 1).setOrigin(0.5, 0));
    c.add(UIKit.text(scene, this.cx - 580, this.sy - 40, '공기', { fontSize: '26px' }));
    c.add(UIKit.text(scene, this.cx - 580, this.sy + 12, '물', { fontSize: '26px' }));
    this.g = scene.add.graphics();
    c.add(this.g);
    this.a1 = UIKit.text(scene, 0, 0, '입사각', { fontSize: '24px', color: '#ffe08a', fontStyle: 'bold' }).setOrigin(0.5);
    this.a2 = UIKit.text(scene, 0, 0, '굴절각', { fontSize: '24px', color: '#9fe0ff', fontStyle: 'bold' }).setOrigin(0.5);
    c.add([this.a1, this.a2]);
    c.add(UIKit.text(scene, this.cx + 10, this.sy - 290, '법선', { fontSize: '22px', color: '#cfe3f5' }));
    this.results = UIKit.text(scene, 960, 870, '', { fontSize: '28px', align: 'center', lineSpacing: 8 }).setOrigin(0.5, 0);
    c.add(this.results);
    scene.input.keyboard.on('keydown-SPACE', () => this.isOpen && this.nextPreset());
    scene.input.keyboard.on('keydown-ESC', () => this.close());
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.angle = 30;
    this.sawNormal = 0;
    this.sawSlant = 0;
    this.container.setVisible(true);
    this.results.setText('');
    this.help.setText('← → 입사각 바꾸기   Space 다음 각도   Esc 닫기');
    this.info.setText('빛을 여러 각도로 쏘아 보자 — 수직(0°)으로도 쏘아 보자').setColor('#ffe08a');
    Sound.play('sfx_truth_circle_enter');
    this.draw();
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  nextPreset() {
    const P = RefractLab.PRESETS;
    this.angle = P.find((a) => a > this.angle + 0.5) ?? P[0];
    Sound.play('sfx_ui_click');
    this.draw();
  }

  draw() {
    const G = this.g, cx = this.cx, sy = this.sy, L = 270;
    const t1 = this.angle * Math.PI / 180, t2 = Optics.refract(this.angle) * Math.PI / 180;
    G.clear();
    // 법선 (점선)
    for (let y = sy - 280; y < sy + 280; y += 24) G.lineStyle(2, 0xcfe3f5, 0.7).lineBetween(cx, y, cx, y + 12);
    // 수면
    G.lineStyle(3, 0x9fe0ff, 1).lineBetween(cx - 600, sy, cx + 600, sy);
    // 들어오는 빛
    const ix = cx - Math.sin(t1) * L / Math.max(Math.cos(t1), 0.28), iy = sy - Math.min(L, Math.cos(t1) * L / Math.max(Math.cos(t1), 0.28));
    G.lineStyle(6, 0xffe08a, 1).lineBetween(ix, iy, cx, sy);
    // 꺾이지 않았다면 갈 길 (옅게)
    const sx = cx + Math.tan(t1) * Math.min(L, 280);
    if (this.angle > 0.5) for (let k = 0; k < 10; k += 2) G.lineStyle(2, 0xffe08a, 0.45).lineBetween(cx + (sx - cx) * k / 10, sy + 280 * k / 10, cx + (sx - cx) * (k + 1) / 10, sy + 280 * (k + 1) / 10);
    // 꺾인 빛
    G.lineStyle(6, 0xfff6cc, 1).lineBetween(cx, sy, cx + Math.tan(t2) * 280, sy + 280);
    this.a1.setText(`입사각 ${Math.round(this.angle)}°`).setPosition(cx - Math.min(Math.tan(t1), 2.2) * 150 - 110, sy - 150);
    this.a2.setText(`굴절각 ${Optics.refract(this.angle).toFixed(0)}°`).setPosition(cx + Math.tan(t2) * 130 + 110, sy + 130);
  }

  update(dt) {
    if (!this.isOpen) return;
    const k = this.scene.keysIn, d = (k.right.isDown ? 1 : 0) - (k.left.isDown ? 1 : 0), L = GAME_CONFIG.act3.ch3_2.lab;
    if (d && !this.done) {
      this.angle = Phaser.Math.Clamp(this.angle + d * L.turnSpeed * dt, 0, 80);
      this.draw();
    }
    if (this.done) return;
    if (this.angle <= 1) this.sawNormal += dt;
    if (this.angle >= L.slantAngle) this.sawSlant += dt;
    if (this.angle <= 1 && this.sawNormal >= 0.1 && !this.saidNormal) { this.saidNormal = true; this.info.setText('수직으로 들어가면 꺾이지 않는다').setColor(UIKit.SKY); }
    if (this.sawNormal >= L.holdSeconds && this.sawSlant >= L.holdSeconds) {
      this.done = true;
      this.help.setText('');
      this.results.setText('빛은 물에 비스듬히 들어가면 법선 쪽으로 꺾인다 (굴절각 < 입사각)\n수직으로 들어가면 꺾이지 않는다').setColor(UIKit.SKY);
      UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
    }
  }
}
window.RefractLab = RefractLab;
