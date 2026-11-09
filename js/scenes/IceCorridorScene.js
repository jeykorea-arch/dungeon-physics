// 1-2 얼음 회랑 (1단계 1-A)
//
// 배치(왼쪽부터): 출발 돌바닥 0~3m | 구덩이+외나무다리 3~6.44m | 얼음 ~ 문(앞면 27.52m, 저주의 봉인)
//                진실의 원 9.8m(돌 10kg), 벽 고리 12·20·27m
//
// 움직임 규칙
// - 저주 상태: 어디서나 걷고, 손을 떼면 바로 멈춘다. 물건은 계속 밀어야만 움직인다(밀면 체력이 준다).
// - 진짜 법칙(해방 상태, 또는 저주 상태의 진실의 원 안):
//   · 돌바닥 위에서는 마찰이 있어 보통처럼 걷는다. 수레는 한 번 밀면 2m/s로 굴러간다.
//   · 얼음 위에서는 미끄러지는 중에 손을 떼도, 반대 키를 눌러도 속도가 그대로다.
//     멈추는 방법은 벽 고리 잡기와 벽에 부딪히기뿐이다.
//   · 얼음 위에 서 있으면 밀 것(고리·벽·벽에 붙은 물건)이 있을 때만 2m/s로 출발한다. 없으면 발만 헛디딘다.
//   · 발 디딜 데가 없는 얼음 위에서는 물건을 밀 수 없어서, 물건을 그냥 지나친다.
// - Tab: 이안/가론 바꾸기. 조작하지 않는 쪽은 돌바닥에서만 따라오고 얼음 위에서는 그 자리에 있는다.
//
// 흐름: 입구 대사 → (저주) 수레를 문까지 밀어도 봉인 때문에 안 열림 → 진실의 원에서 돌 실험 → 깨달음
//      → 저주 풀기(공통 연출) → 가론이 수레를 들고 돌바닥으로 돌아오는 연출 → 수레를 한 번 밀면 문까지 가서 문이 열림
//      → 이안이 얼음 쪽(다리까지 7.5초 안)에 있으면 골렘이 문에서 튀어나옴 → 다리를 건너 Z로 걷어차면 골렘이 구덩이로
class IceCorridorScene extends ChapterScene {
  constructor() {
    super('Ch1_2');
  }

  // R(처음부터)은 장면을 저주 상태로 다시 시작한다
  startCursed(saved) {
    return this.sceneData && this.sceneData.forceCursed ? true : !saved.freed;
  }

  // ------------------------------------------------------------------ 만들기
  buildWorld() {
    const cfg = GAME_CONFIG.iceCorridor;
    const PX = this.PX;
    const O = MANIFEST.objects;
    this.cfg = cfg;
    this.padEnd = cfg.padEnd * PX;
    this.pitLeft = this.padEnd;
    this.pitRight = this.pitLeft + cfg.pitWidth * PX;
    this.doorFace = cfg.doorX * PX - O.corridor_door.width / 2;
    this.minX = cfg.wallMargin * PX;
    this.doorOpen = false;

    const place = (name, x, y, depth) => {
      const o = O[name];
      const img = this.add.image(x, y, o.key).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };

    // 출발 돌바닥: 윗면이 발 기준선(865), 오른쪽 끝이 외나무다리 왼쪽 끝과 맞닿게
    place('start_stone_floor', this.padEnd - O.start_stone_floor.width, this.groundY, -3);
    // 구덩이와 외나무다리 (다리 윗면도 발 기준선에 맞춘다)
    const pitMid = (this.pitLeft + this.pitRight) / 2;
    this.pitMid = pitMid;
    this.beamY = this.groundY + O.narrow_beam.height;
    this.pitImg = place('pit_opening', pitMid, this.groundY + 60, -3);
    this.beam = place('narrow_beam', pitMid, this.beamY, -2);
    this.beamPresent = true;
    // 벽 고리
    // (총괄지시 수정목록 4번: 지금의 절반 크기, 고리 가운데가 이안 grab_ring 손 높이에 오게)
    const R = cfg.ringLook;
    this.rings = cfg.rings.map((m) => {
      const img = place('wall_ring', m * PX, this.groundY - R.handY + O.wall_ring.height * R.scale / 2, -3).setScale(R.scale);
      return { x: m * PX, img, baseY: img.y };
    });
    // 문과 저주의 봉인. 문 뒤에는 열리면 보이는 빛나는 통로
    this.passage = this.add.graphics().setDepth(-1.5).setAlpha(0);
    const D = O.corridor_door, pw = D.width * 0.62, ph = D.height * 0.9;
    for (let i = 0; i < 6; i++) {
      this.passage.fillStyle(0x9fe0ff, 0.12 + i * 0.1)
        .fillRoundedRect(cfg.doorX * PX - pw / 2 + i * 12, this.groundY + 6 - ph + i * 14, pw - i * 24, ph - i * 14, { tl: 90 - i * 10, tr: 90 - i * 10, bl: 0, br: 0 });
    }
    this.worldLayer.add(this.passage);
    // 골렘이 문을 막고 있는 동안 문 너머는 어둡다 (총괄지시 2차 15번). 골렘이 구덩이에 낀 뒤에 빛나는 통로가 보인다
    this.darkway = this.add.graphics().setDepth(-1.45).setAlpha(0);
    this.darkway.fillStyle(0x05070c, 0.92)
      .fillRoundedRect(cfg.doorX * PX - pw / 2, this.groundY + 6 - ph, pw, ph, { tl: 90, tr: 90, bl: 0, br: 0 });
    // 어둠 속에서 빛나는 골렘 눈
    this.golemEyes = this.add.graphics().setDepth(-1.4).setAlpha(0);
    for (const dx of [-16, 16]) {
      this.golemEyes.fillStyle(0xff7a3d, 0.35).fillCircle(cfg.doorX * PX + dx, this.groundY - 205, 14);
      this.golemEyes.fillStyle(0xffd2a0, 1).fillCircle(cfg.doorX * PX + dx, this.groundY - 205, 6);
    }
    this.worldLayer.add([this.darkway, this.golemEyes]);
    // 문 왼쪽의 돌 비석 안내판 "봉인된 문 — 무거운 것으로 두드려야 열린다" (총괄지시 2차 17번)
    this.signX = cfg.doorX * PX - D.width / 2 - 70;
    this.drawStele(this.signX, this.groundY, '봉인', -1.6);
    this.gate = place('corridor_door', cfg.doorX * PX, this.groundY + 6, -1);
    this.gateTopY = this.gate.y - D.height;     // 문틀 위쪽 선 — 문짝은 이 위로는 그리지 않는다(벽 속으로 들어감)
    // 문으로 가라는 깜빡이는 화살표 (나갈 수 있을 때)
    this.doorArrow = UIKit.text(this, cfg.doorX * PX, this.gateTopY + 40, '▼', { fontSize: '64px', color: UIKit.SKY })
      .setOrigin(0.5, 1).setDepth(6).setVisible(false);
    this.worldLayer.add(this.doorArrow);
    // 저주의 봉인: 문 위에 겹친다. 저주 색 보정을 받지 않는 층에 두어 선명한 보랏빛으로 보이게 한다
    const S = O.curse_seal;
    this.seal = this.curse.addUncursed(this.add.image(cfg.doorX * PX, this.groundY + 6, S.key)
      .setOrigin(S.pivot.x / S.width, S.pivot.y / S.height).setDepth(0));
    this.sealAlpha = this.curse.cursed ? 1 : 0;

    // 진실의 원과 실험용 돌
    this.circle = this.curse.addTruthCircle({
      centerX: cfg.truthCircle.centerX, groundY: this.groundY,
      diameter: cfg.truthCircle.diameter, domeHeight: cfg.truthCircle.domeHeight,
    });
    // 저주 상태에서는 수레를 문까지 밀어 본 뒤에야 진실의 원이 빛난다 ("저기 바닥에서 빛이 나!")
    // (수레 길이 원을 지나므로, 원이 먼저 있으면 원 안에서 발 디딜 데가 없어 수레를 더 밀 수 없다)
    this.curse.setCircleActive(this.circle, !this.curse.cursed);
    const stoneImg = place('stone_10kg', 0, this.groundY, 2);
    const label = place('stone_10kg_label', 0, this.groundY - O.stone_10kg.height - 6, 2);
    const cartImg = place('stone_cart', 0, this.groundY + 4, 2);
    this.stone = { id: 'stone', name: `돌(${cfg.stone.mass}kg)`, img: stoneImg, label, halfW: O.stone_10kg.radius_px,
      pushSpeed: cfg.stone.pushSpeed, rolls: false };
    this.cart = { id: 'cart', name: '수레', img: cartImg, halfW: O.stone_cart.width / 2,
      pushSpeed: cfg.cart.pushSpeed, rolls: true };
    this.objects = [this.cart, this.stone];

    // 이안과 가론
    const P = GAME_CONFIG.physics;
    this.chars = {
      ian: { id: 'ian', name: '이안', sprite: Characters.create(this, 'ian', 0, this.groundY), mass: P.ian.mass,
        reach: cfg.ian.pushReach * PX, slipAnim: 'slide_flail', slideAnim: 'slide_steady', ringAnim: 'grab_ring' },
      garon: { id: 'garon', name: '가론', sprite: Characters.create(this, 'garon', 0, this.groundY), mass: P.garon.mass,
        reach: cfg.garon.pushReach * PX, slipAnim: 'slip', slideAnim: 'slide_steady', ringAnim: 'grab_ring' },
    };
    this.chars.ian.sprite.setDepth(4);
    this.chars.garon.sprite.setDepth(3);
    this.worldLayer.add([this.chars.ian.sprite, this.chars.garon.sprite]);

    // 관성의 골렘 (문 너머에서 기다린다)
    this.golem = { sprite: Characters.create(this, 'inertia_golem', 0, this.groundY), state: 'sleep', v: 0, vy: 0 };
    this.golem.sprite.setDepth(1).setVisible(false);
    this.worldLayer.add(this.golem.sprite);
    // 문이 열리면 골렘은 문 앞에 버티고 선다. 돌진은 지금처럼 다리에서 startDistance(30m) 떨어진 문 안쪽 어둠에서 시작한다
    // (문 앞에서 바로 출발하면 거리·시간이 23m·7.6초로 바뀌므로 — 물리 숫자 유지)
    this.golemStandX = cfg.doorX * PX;
    // 깨어나는 곳을 눈에 보이게: 이안이 다리(돌바닥)까지 (골렘 시간 − 여유) 안에 갈 수 있는 곳 = 다리 ~ 이 선
    const G = cfg.golem;
    this.wakeLineX = this.pitLeft + (G.startDistance / G.speed - G.wakeMargin) * cfg.walkSpeed * PX;
    this.wakeZone = this.add.graphics().setDepth(-2.5).setVisible(false);
    this.wakeZone.fillStyle(0xff8a3d, 0.3).fillRect(this.pitRight, this.groundY - 6, this.wakeLineX - this.pitRight, 56);
    this.wakeZone.fillStyle(0xffb27a, 0.7).fillRect(this.pitRight, this.groundY - 8, this.wakeLineX - this.pitRight, 5);
    for (let i = 0; i < 4; i++) {
      this.wakeZone.fillStyle(0xff8a3d, 0.18 + i * 0.2).fillRect(this.wakeLineX - 14 + i * 4, this.groundY - 150 + i * 6, 28 - i * 8, 200 - i * 6);
    }
    this.worldLayer.add(this.wakeZone);
    // 골렘이 회랑 오른쪽 끝에 서므로 글씨는 골렘 머리 위에서 왼쪽으로 펼친다 (화면 밖으로 잘리지 않게)
    this.golemLabel = UIKit.text(this, this.golemStandX + 120, this.groundY - 330, '빛나는 바닥에 서면 돌진!', {
      fontSize: '30px', fontStyle: 'bold', color: '#ffb27a', backgroundColor: '#1a0e08cc', padding: { x: 14, y: 6 },
    }).setOrigin(1, 1).setDepth(6).setVisible(false);
    this.worldLayer.add(this.golemLabel);
    // 구덩이에 떨어질 때는 구덩이 바닥선 아래를 잘라 내 구덩이 안으로 들어가 보이게 한다 (clipGolem)

    // 화면 전환용 검은 막 (UI 층)
    this.fadeRect = this.add.rectangle(0, 0, 1920, 1080, 0x000000, 0).setOrigin(0, 0).setScrollFactor(0).setDepth(800);
    this.uiLayer.add(this.fadeRect);

    this.control = 'ian';
    this.player = this.chars.ian.sprite;
    this.bounds = { x: 0, y: 0, width: this.worldW, height: this.worldH };
    this.curse.followTarget(this.player, this.bounds);

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT', tab: 'TAB', kick: 'Z', reset: 'R' });
    kb.addCapture(['TAB', 'Z']);
    this.keys.tab.on('down', () => { if (!this.isBlocked()) this.switchControl(); });
    this.keys.kick.on('down', () => { if (!this.isBlocked()) this.tryKick(); });
    this.keys.reset.on('down', () => { if (!this.isBlocked()) this.confirmRestart(() => this.restartCursed()); });

    this.resetPositions();
  }

  onReady() {
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '← → 걷기·밀기   Tab 이안/가론   Z 다리 걷어차기   M 마법서   R 처음부터', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.golemText = UIKit.text(this, 960, 70, '', {
      fontSize: '40px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 24, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320).setVisible(false);
    this.exitHint = UIKit.text(this, 960, 70, '→ 문으로 들어가면 무너지는 다리', {
      fontSize: '32px', color: UIKit.SKY, backgroundColor: '#0b1320cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320).setVisible(false);
    this.uiLayer.add([this.golemText, this.exitHint]);
    if (this.curse.cursed) this.readDoorSign();
  }

  // 저주 상태로 들어오면: 카메라가 끝 문 옆 안내판을 비추고(대화창은 위로) 안내판 글 → 돌아와서 이안·가론 문답
  // (방 사이 해설이 끝난 뒤에 시작하도록 빈 대사로 한 번 기다린다)
  readDoorSign() {
    this.say('_', () => {
      if (!this.signFocus) {
        this.signFocus = this.add.rectangle(this.signX - 3 * this.PX, this.groundY - 200, 1, 1).setVisible(false);
        this.worldLayer.add(this.signFocus);
      }
      this.dialogue.setTop(true);
      this.curse.followTarget(this.signFocus, this.bounds, 0.05);
      this.say('entrance_sign', () => {
        this.dialogue.setTop(false);
        this.curse.followTarget(this.player, this.bounds);
        this.say('entrance');
      });
    });
  }

  // 머리 위 짧은 혼잣말 (대화창 없이, 2.5초) — 세계를 멈추지 않는다
  mutter(c, text) {
    if (!this.bubble) {
      this.bubble = UIKit.text(this, 0, 0, '', {
        fontSize: '26px', color: '#1a0e08', backgroundColor: '#f3e6c8ee', padding: { x: 12, y: 6 },
      }).setOrigin(0.5, 1).setDepth(7);
      this.worldLayer.add(this.bubble);
    }
    this.bubble.setText(text).setVisible(true);
    this.bubbleOf = { c, t: 2.5 };
  }

  curseRuleText() {
    if (this.curse.cursed) return '손을 떼면 바로 멈춘다 — 단, 진실의 원 안에서는 진짜 법칙';
    return '얼음 위: 멈추려면 벽 고리(방향키)나 벽. 출발은 돌바닥·고리·벽을 밀고';
  }

  resetPositions() {
    const cfg = this.cfg, PX = this.PX;
    for (const c of Object.values(this.chars)) {
      Object.assign(c, { v: 0, hp: 1, ring: null, wall: 0, slipT: 0, hurtT: 0, kickT: 0, shoveT: 0, shoveLock: false,
        ringLock: false, leftRing: null, launchLock: false, hadFooting: true,
        pushing: null, carry: false });
      c.sprite.setFlipX(false).setAlpha(1);
    }
    this.chars.ian.sprite.x = cfg.ian.startX * PX;
    this.chars.garon.sprite.x = cfg.garon.startX * PX;
    this.cart.img.x = cfg.cart.startX * PX;
    this.stone.img.x = cfg.stone.startX * PX;
    for (const o of this.objects) Object.assign(o, { v: 0, driven: null, lastPusher: null, sawFreeSlide: false,
      anchored: 0, gone: false, img: o.img.setVisible(true).setAlpha(1) });
    // 실험용 돌은 진실의 원과 함께 나타난다 (그 전에 밀려서 원에서 멀어지지 않도록)
    this.showStone(this.circle.active);
    this.flags = {};               // 한 번만 나오는 대사·사건 기록
    this.realizePending = false;
    this.seq = null;
  }

  showStone(show) {
    this.stone.gone = !show;
    this.stone.img.setVisible(show);
    this.stone.label.setVisible(show);
  }

  restartCursed() {
    Sound.play('sfx_puzzle_reset');
    this.scene.restart({ forceCursed: true });
  }

  // ------------------------------------------------------------------ 바닥과 규칙
  onPad(x) { return x < this.padEnd; }
  isFreePhysics(x) { return this.curse.isFree(x); }            // 진짜 법칙이 통하는 곳
  hasFooting(x) { return !this.isFreePhysics(x) || this.onPad(x); } // 발로 밀 수 있는 곳 (저주 땅 또는 돌바닥)
  rightLimit() {
    if (!this.doorOpen) return this.doorFace;
    if (['armed', 'intro', 'hit'].includes(this.golem.state)) return this.golemStandX - 1.5 * this.PX; // 골렘이 문을 막고 있다
    return this.worldW - this.minX;
  }

  // 구덩이를 건널 수 있나: 외나무다리가 있거나, 떨어진 골렘이 끼어 있거나
  pitCrossable() {
    return this.beamPresent || this.golem.state === 'lodged';
  }

  ringNear(x) {
    return this.rings.find((r) => Math.abs(r.x - x) <= this.cfg.ringGrabRange * this.PX);
  }

  // 이 캐릭터가 dir 쪽으로 밀고 있는(맞닿은) 물건
  touchingObject(c, dir) {
    const x = c.sprite.x;
    return this.objects.find((o) => {
      if (o.gone) return false;
      const dx = o.img.x - x;
      const contact = c.reach + o.halfW;
      // 손이 닿는 거리 안이면, 더 깊이 겹쳐 있어도 닿은 것으로 본다 (총괄지시 2차 18번)
      return (Math.sign(dx) === dir || dx === 0) && Math.abs(dx) <= contact + 2;
    });
  }

  // 걸어서(발 디딜 데가 있을 때) 물건을 뚫고 지나가지 못하게: 손이 닿는 자리에서 막는다
  // (진짜 법칙의 얼음 위를 미끄러질 때는 막지 않는다 — 고리까지 미끄러지는 길에 돌이 있다)
  blockByObjects(c, nx) {
    const x = c.sprite.x;
    if (nx === x) return nx;
    const dir = Math.sign(nx - x);
    for (const o of this.objects) {
      if (o.gone || o.driven === c) continue;
      const stop = o.img.x - dir * (c.reach + o.halfW);
      if (dir > 0 && x <= o.img.x && nx > stop) nx = Math.max(x, stop);
      if (dir < 0 && x >= o.img.x && nx < stop) nx = Math.min(x, stop);
    }
    return nx;
  }

  // 얼음 위에 서 있을 때 dir 쪽으로 출발하려면 반대쪽에 밀 것이 있어야 한다: 벽, 또는 벽에 붙어 꿈쩍 못 하는 물건
  hasAnchorBehind(c, dir) {
    if (c.wall === -dir) return true;
    return this.objects.some((o) => !o.gone && o.anchored === -dir
      && Math.sign(o.img.x - c.sprite.x) === -dir && Math.abs(o.img.x - c.sprite.x) <= c.reach + o.halfW + 4);
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    if (this.seq) {
      this.updateDoor(dt);
      if (this.seq.moveObjects) for (const o of this.objects) this.updateObject(o, dt);
      this.runSequence(dt);
      return;
    }
    if (this.wakeZone.visible) this.wakeZone.setAlpha(0.7 + 0.3 * Math.sin(this.time.now / 1000 * 4));
    // 문을 막던 골렘이 구덩이에 끼면 문 너머 어둠이 걷히고 빛나는 통로가 보인다 (0.8초)
    if (this.golem.state === 'lodged' && this.passage.alpha < 1) {
      const a = Math.min(1, this.passage.alpha + dt / 0.8);
      this.passage.setAlpha(a);
      this.darkway.setAlpha(1 - a);
    }
    this.updateDoor(dt);
    const dirInput = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    const ctrl = this.chars[this.control];
    const other = this.chars[this.control === 'ian' ? 'garon' : 'ian'];
    for (const o of this.objects) o.driven = null;

    const locked = this.realizePending || this.realizing;
    this.updateChar(ctrl, locked ? 0 : dirInput, true, dt);
    this.updateChar(other, this.followDir(other, ctrl), false, dt);
    for (const o of this.objects) this.updateObject(o, dt);
    this.updateGolem(dt);
    this.updateBeam(dt);
    this.checkEvents();
    for (const c of Object.values(this.chars)) this.updateAnim(c);
    this.updateSounds();
    this.updateHud(dt);
  }

  // 조작하지 않는 쪽: 둘 다 돌바닥에 있을 때만 따라 걷는다 (물건은 밀지 않는다)
  followDir(c, leader) {
    const x = c.sprite.x, lx = leader.sprite.x;
    if (!this.onPad(x) || !this.onPad(lx) || c.v !== 0 && !this.hasFooting(x)) return 0;
    if (Math.abs(lx - x) < 0.9 * this.PX) return 0;
    const dir = Math.sign(lx - x);
    return this.touchingObject(c, dir) ? 0 : dir;
  }

  updateChar(c, dir, controlled, dt) {
    const cfg = this.cfg, PX = this.PX, walk = cfg.walkSpeed;
    const x = c.sprite.x;
    c.slipT = Math.max(0, c.slipT - dt);
    c.hurtT = Math.max(0, c.hurtT - dt);
    c.kickT = Math.max(0, c.kickT - dt);
    c.shoveT = Math.max(0, c.shoveT - dt);
    c.pushing = null;
    if (dir === 0) { c.shoveLock = false; c.ringLock = false; c.launchLock = false; }
    // 방금 밀고 떠난 고리는 멀어질 때까지 다시 잡지 않는다
    if (c.leftRing && Math.abs(c.leftRing.x - x) > cfg.ringGrabRange * PX) c.leftRing = null;
    let driven = dir !== 0;

    if (c.ring) {
      // 고리를 잡고 있다: (잡을 때 누른 키를 한 번 뗀 뒤) 방향키를 누르면 고리를 밀고 출발
      c.v = 0;
      if (dir !== 0 && controlled && !c.ringLock) {
        c.leftRing = c.ring; c.ring = null; c.v = dir * walk; c.launchLock = true;
      }
    } else if (this.hasFooting(x)) {
      // 발 디딜 데가 있다 (저주 땅 또는 돌바닥)
      const obj = dir !== 0 ? this.touchingObject(c, dir) : null;
      if (obj && controlled && this.isFreePhysics(x)) {
        // 돌바닥에서 한 번 밀기: 수레는 굴러가고, 미는 쪽은 제자리
        c.v = 0;
        if (!c.shoveLock && obj.rolls) {
          obj.v = dir * cfg.cart.launchSpeed;
          obj.lastPusher = c.id;
          c.shoveLock = true;
          c.shoveT = 0.4;
          if (obj === this.cart) this.onCartLaunched();
        } else if (!obj.rolls) {
          c.slipT = 0.3; // 미끄러지는 돌은 돌바닥에서 꿈쩍 않음 (마찰)
        }
      } else if (obj && controlled) {
        // 저주 땅: 계속 밀어야 움직인다 (체력이 준다)
        c.v = dir * obj.pushSpeed;
        obj.driven = c;
        obj.v = c.v;
        obj.lastPusher = c.id;
        c.pushing = obj;
        if (obj === this.cart && obj.anchored !== 1) {
          c.hp = Math.max(0.05, c.hp - (cfg.cart.hpPerMeter[c.id] || 0) * Math.abs(c.v) * dt);
          // 힘들다는 체험: 문까지 가는 길의 40%·75%에서 미는 사람이 혼잣말 (숫자는 그대로)
          const k = (obj.img.x - cfg.cart.startX * PX) / (this.doorFace - obj.halfW - cfg.cart.startX * PX);
          if (k > 0.4 && !this.flags.mutter1) { this.flags.mutter1 = true; this.mutter(c, '헉… 아직 반도 못 왔어'); }
          if (k > 0.75 && !this.flags.mutter2) { this.flags.mutter2 = true; this.mutter(c, '헉, 헉… 조금만 더…'); }
        }
      } else if (c.shoveLock) {
        c.v = 0; // 한 번 민 뒤에는 키를 뗄 때까지 제자리
      } else {
        c.v = dir * walk;
      }
    } else {
      // 진짜 법칙의 얼음 위: 발로 밀 수 없다
      driven = false;
      // 출발할 때 누른 키를 계속 누르고 있으면 고리를 그냥 지나친다 — 고리를 잡으려면 고리 앞에서 새로 누른다
      if (c.hadFooting && dir !== 0) c.launchLock = true;
      if (c.v !== 0) {
        const ring = dir !== 0 && controlled && !c.launchLock ? this.ringNear(x) : null;
        if (ring && ring !== c.leftRing) {
          // 바라보는 쪽 = 미끄러지던 방향 (속도를 0으로 만들기 전에 읽는다). 손은 그쪽으로 뻗는다
          c.grabDir = Math.sign(c.v) || (c.sprite.flipX ? -1 : 1);
          c.sprite.setFlipX(c.grabDir < 0);
          c.v = 0;
          c.ring = ring;
          c.ringLock = true;
          c.sprite.x = ring.x;
          Sound.play('sfx_wall_ring_grab');
          if (c.id === 'ian') Characters.play(c.sprite, 'grab_ring', false);
        }
      } else if (dir !== 0 && controlled) {
        if (this.hasAnchorBehind(c, dir)) {
          c.v = dir * walk;
          c.launchLock = true;
        } else if (c.slipT === 0) {
          c.slipT = 0.45;
          Sound.play('sfx_step_ice');
        }
      }
    }

    c.hadFooting = this.hasFooting(x) && !c.ring;
    // 위치 옮기기 (진실의 원 밖으로 미끄러져 나가는 순간 저주에 멈춘다)
    if (!c.ring) {
      let nx = c.sprite.x + c.v * PX * dt;
      if (this.hasFooting(c.sprite.x)) nx = this.blockByObjects(c, nx);
      if (!driven && this.curse.cursed && this.curse.inCircle(c.sprite.x) && !this.curse.inCircle(nx)) {
        nx = this.curse.circleEdge(c.sprite.x, c.v);
        c.v = 0;
        Sound.play('sfx_cursed_stop');
      }
      c.wall = 0;
      if (!this.pitCrossable()) {
        if (c.sprite.x <= this.pitLeft && nx > this.pitLeft) { nx = this.pitLeft; c.wall = 1; c.v = 0; }
        if (c.sprite.x >= this.pitRight && nx < this.pitRight) { nx = this.pitRight; c.wall = -1; c.v = 0; }
      }
      if (nx <= this.minX) { nx = this.minX; c.wall = -1; c.v = 0; }
      const right = this.rightLimit();
      if (nx >= right) { nx = right; c.wall = 1; c.v = 0; }
      c.sprite.x = nx;
    }
    c.sprite.y = this.groundY - this.backLift(c.sprite.x);
    // 고리를 잡은 동안: 손이 고리에 오게 (이안 grab_ring 손 = 발에서 handDx 앞), 가론은 주먹이 더 높아 그동안만 고리가 주먹 높이로
    const RL = this.cfg.ringLook;
    for (const r of this.rings) {
      const holder = Object.values(this.chars).find((h) => h.ring === r);
      const lift = holder && holder.id === 'garon' ? RL.garonHandY - RL.handY : 0;
      r.img.y += ((r.baseY - lift) - r.img.y) * Math.min(1, dt * 12);
      // 이안의 grab_ring 그림에는 손에 쥔 고리가 그려져 있어, 이안이 잡는 동안은 벽 고리를 감춘다 (고리가 둘로 보이지 않게)
      r.img.setVisible(!(holder && holder.id === 'ian'));
    }
    if (c.ring) c.sprite.x = c.ring.x - (c.grabDir || 1) * RL.handDx[c.id];
  }

  updateObject(o, dt) {
    if (o.gone) return;
    const PX = this.PX;
    const x = o.img.x;
    if (!o.driven) {
      if (!this.isFreePhysics(x)) o.v = 0;                 // 저주: 미는 힘이 없으면 멈춘다
      else if (this.onPad(x) && !o.rolls) o.v = 0;         // 돌바닥 마찰 (바퀴 달린 수레는 굴러간다)
      // 실험 관찰: 저주 상태에서 원 안의 물건이 밀지 않아도 미끄러지는 중
      if (this.curse.cursed && o.v !== 0 && this.curse.inCircle(x)) o.sawFreeSlide = true;
    }
    let nx = x + o.v * PX * dt;
    let stoppedAtEdge = false;
    if (!o.driven && this.curse.cursed && this.curse.inCircle(x) && !this.curse.inCircle(nx)) {
      nx = this.curse.circleEdge(x, o.v);
      o.v = 0;
      stoppedAtEdge = true;
      Sound.play('sfx_cursed_stop');
    }
    // 벽과 문
    o.anchored = 0;
    if (nx - o.halfW <= this.minX) { nx = this.minX + o.halfW; o.v = 0; o.anchored = -1; }
    if (!this.doorOpen && nx + o.halfW >= this.doorFace) {
      nx = this.doorFace - o.halfW;
      if (o === this.cart && !this.curse.cursed && o.v > 0) this.openDoor(); // 굴러와 닿을 때만 열린다
      else { o.v = 0; o.anchored = 1; }
    }
    o.img.x = nx;
    if (o.label) o.label.x = nx;
    if (o.driven) {
      // 미는 사람과 붙어 있게
      const c = o.driven;
      c.sprite.x = nx - Math.sign(o.v || 1) * (c.reach + o.halfW);
    }
    // 수레가 열린 문 안으로 굴러 들어가 사라진다
    if (o === this.cart && this.doorOpen && nx > this.cfg.doorX * PX && !o.gone) {
      o.gone = true;
      o.v = 0;
      this.tweens.add({ targets: o.img, alpha: 0, duration: 400 });
      this.time.delayedCall(400, () => o.img.setVisible(false));
    }
    if (stoppedAtEdge && o.sawFreeSlide && o.lastPusher === 'ian' && !this.realizing) this.realizePending = true;
    if (!this.curse.inCircle(o.img.x)) o.sawFreeSlide = false;
  }

  // ------------------------------------------------------------------ 사건
  checkEvents() {
    const ian = this.chars.ian;
    // 저주 상태: 수레가 봉인된 문에 막힘 → 가론이 밀었으면 "지친" 대사
    if (this.curse.cursed && this.cart.anchored === 1 && !this.flags.cartAtSealedDoor) {
      this.flags.cartAtSealedDoor = true;
      Sound.play('sfx_cursed_stop');
      const lightCircle = () => {
        this.curse.setCircleActive(this.circle, true);
        this.showStone(true);
        this.circle.image.setAlpha(0);
        this.tweens.add({ targets: this.circle.image, alpha: 1, duration: 1200 });
        Sound.play('sfx_truth_circle_enter');
      };
      if (this.cart.lastPusher === 'garon') this.say('garon_tired', lightCircle); else lightCircle();
    }
    // 진실의 원 발견
    const toCircle = Math.abs(ian.sprite.x - this.circle.x) - this.circle.r;
    if (!this.flags.circleNoticed && this.circle.active && this.curse.cursed && toCircle <= this.cfg.circleNoticeDistance * this.PX) {
      this.flags.circleNoticed = true;
      this.say('circle_found');
    }
    // 실험 완료 → 이안이 멈추면 깨달음
    if (this.realizePending && ian.v === 0 && !this.realizing) this.startRealize();
    // 골렘이 깨어날 때인가
    if (this.golem.state === 'armed' && this.canWakeGolem()) this.wakeGolem();
    // 골렘을 물리친 뒤 문을 지나면 다음 방(무너지는 다리)으로
    const ctrl = this.chars[this.control];
    if (this.golem.state === 'lodged' && !this.flags.leaving && ctrl.sprite.x >= this.doorFace - 10) {
      this.flags.leaving = true;
      this.playSequence([this.fadeStep(0, 1, 0.6), { dur: 0.01, start: () => this.goNext() }]);
    }
  }

  onCartLaunched() {
    if (this.flags.afterFree) return;
    this.flags.afterFree = true;
    this.time.delayedCall(1500, () => this.say('after_free'));
  }

  openDoor() {
    if (this.doorOpen) return;
    this.doorOpen = true;
    Sound.play('sfx_door_open');
    this.doorAnim = { t: 0, y0: this.gate.y };       // updateDoor에서 게임 시계로 연다
    this.golem.state = 'intro';
    Save.setChapter(this.scene.key, { doorOpened: true });
    this.playGolemIntro();
  }

  // 문이 열린 뒤 (총괄지시 2차 15번): 카메라가 문으로 → 어둠 속 골렘 눈 → 골렘이 걸어 나와 문 앞에 버티고 섬 → 울부짖음
  // → golem_appear 대사 → 카메라가 돌바닥의 두 사람에게 돌아오고, 깨어나는 곳(빛나는 바닥)이 보인다
  playGolemIntro() {
    const PX = this.PX, g = this.golem, standX = this.golemStandX;
    if (!this.doorFocus) {
      this.doorFocus = this.add.rectangle(standX - 4 * PX, this.groundY - 200, 1, 1).setVisible(false);
      this.worldLayer.add(this.doorFocus);
    }
    this.playSequence([
      { dur: 0.01, start: () => {
        Sound.stopLoop('sfx_ice_slide_loop');
        this.curse.followTarget(this.doorFocus, this.bounds, 0.06);
      } },
      { dur: 2.2 },                                   // 카메라가 문으로 가는 동안 문이 열리고 수레가 굴러 들어간다
      { dur: 1.2, start: () => {
        // 카메라가 문에 있는 동안 두 사람을 돌바닥에 세운다 (얼음 위에 있었더라도)
        const pad = { ian: this.cfg.ian.startX, garon: this.cfg.garon.startX };
        for (const c of Object.values(this.chars)) {
          Object.assign(c, { v: 0, ring: null, wall: 0, slipT: 0, shoveLock: false, launchLock: false, leftRing: null });
          if (!this.onPad(c.sprite.x)) c.sprite.x = pad[c.id] * PX;
          c.sprite.y = this.groundY;
        }
      }, step: (k) => this.golemEyes.setAlpha(k < 0.5 ? k * 2 : 0.6 + 0.4 * Math.cos((k - 0.5) * 12)) },
      { dur: 1.8, start: () => {
        g.sprite.setPosition(standX + 0.6 * PX, this.groundY).setVisible(true).setAlpha(0).setTint(0x303040);
        Characters.play(g.sprite, 'charge');
        g.sprite.anims.timeScale = 0.4;
      }, step: (k) => {
        g.sprite.x = standX + 0.6 * PX * (1 - k);
        g.sprite.setAlpha(Math.min(1, k * 1.5));
        const c = Math.round(0x30 + (0xff - 0x30) * k);
        g.sprite.setTint(Phaser.Display.Color.GetColor(c, c, Math.min(255, c + 16)));
        this.golemEyes.setAlpha(1 - k);
      } },
      { dur: 1.0, start: () => {
        g.sprite.clearTint().setAlpha(1);
        g.sprite.anims.timeScale = 1;
        Characters.play(g.sprite, 'idle');
        Sound.play('sfx_golem_roar');                 // 골렘 울부짖음 (요청서 07)
        this.cameras.main.shake(500, 0.008);
      } },
      // 골렘 머리 위 안내와 빛나는 바닥(깨어나는 곳)을 보여 주며 카메라가 문 → 경계선 → 돌바닥으로 돌아온다
      // (대사창이 화면 아래를 가리므로 대사는 카메라가 두 사람에게 돌아온 뒤에)
      { dur: 1.2, start: () => this.showGolemGuard(true) },
      { dur: 3.0, start: () => { this.panFrom = this.doorFocus.x; }, step: (k) => {
        const e = k * k * (3 - 2 * k);
        this.doorFocus.x = this.panFrom + (this.chars[this.control].sprite.x - this.panFrom) * e;
      } },
      { dur: 0.01, start: () => {
        this.curse.followTarget(this.player, this.bounds);
        this.doorFocus.x = this.golemStandX - 4 * PX;
        this.say('golem_appear', () => { this.golem.state = 'armed'; });
      } },
    ]);
    this.seq.moveObjects = true;
  }

  // 골렘이 문 앞에 서서 기다리는 모습 (깨어나는 곳 표시와 머리 위 안내)
  showGolemGuard(on) {
    const g = this.golem;
    if (on) {
      g.v = 0;
      g.sprite.setPosition(this.golemStandX, this.groundY).setVisible(true).setAlpha(1).clearTint().setCrop();
      Characters.play(g.sprite, 'idle');
    }
    this.wakeZone.setVisible(on);
    this.golemLabel.setVisible(on);
  }

  // 실험 뒤: 놀람 대사 → 깨달음 동작 → 깨달음 대사 → 공통 저주 풀기 연출 → 수레 되돌리기 연출
  startRealize() {
    this.realizePending = false;
    this.realizing = true;
    const ian = this.chars.ian;
    if (this.control !== 'ian') this.switchControl();
    Sound.stopLoop('sfx_ice_slide_loop');
    ian.sprite.setFlipX(this.stone.img.x < ian.sprite.x);
    Characters.play(ian.sprite, 'idle');
    this.say('stone_slides', () => {
      Characters.play(ian.sprite, 'realize');
      ian.sprite.once('animationcomplete', () => {
        this.say('realize', () => this.breakCurse(() => {
          this.realizing = false;
          this.startCartReturn();
        }));
      });
    });
  }

  onCurseChanged() {
    super.onCurseChanged();
    if (this.seal) this.sealTarget = this.curse.cursed ? 1 : 0;
  }

  // ------------------------------------------------------------------ 연출 (게임 시계로 진행)
  // 단계 목록을 차례로 실행한다. 각 단계: { dur, start(), step(k) } (k = 0~1 진행도)
  // (단계의 start()에서 this.dur를 정해도 된다 — 시작할 때 알게 되는 길이)
  playSequence(steps) {
    this.seq = { steps, i: -1, t: 0 };
    this.nextSequenceStep();
  }

  nextSequenceStep() {
    const sq = this.seq;
    sq.i += 1;
    sq.t = 0;
    if (sq.i >= sq.steps.length) { this.seq = null; return; }
    const s = sq.steps[sq.i];
    if (s.start) s.start();
  }

  runSequence(dt) {
    const sq = this.seq;
    const s = sq.steps[sq.i];
    sq.t += dt;
    const k = s.dur ? Math.min(1, sq.t / s.dur) : 1;
    if (s.step) s.step(k, dt);
    if (k >= 1) this.nextSequenceStep();
    for (const c of Object.values(this.chars)) this.updateAnim(c);
  }

  fadeStep(from, to, dur) {
    return { dur, step: (k) => this.fadeRect.setFillStyle(0x000000, from + (to - from) * k) };
  }

  // 저주가 풀린 뒤: 가론이 투덜대며 수레를 들고 출발 돌바닥으로 걸어온다
  startCartReturn() {
    const cfg = this.cfg, PX = this.PX;
    const ian = this.chars.ian, garon = this.chars.garon;
    const cartTarget = cfg.cart.startX * PX;
    const garonTarget = cfg.garon.startX * PX;
    let fromX = 0;
    this.playSequence([
      this.fadeStep(0, 1, 0.5),
      { dur: 0.01, start: () => {
        // 어두운 동안: 이안은 돌바닥으로, 가론은 수레 자리로 (수레를 머리 위로 든다)
        Sound.stopLoop('sfx_ice_slide_loop');
        for (const c of [ian, garon]) Object.assign(c, { v: 0, ring: null, hp: 1, slipT: 0 });
        ian.sprite.x = cfg.ian.startX * PX;
        fromX = Math.max(this.cart.img.x, garonTarget + 1);
        garon.sprite.x = fromX;
        garon.carry = true;
        this.cart.v = 0;
        this.cart.img.setY(this.groundY - 215);
        this.stone.img.x = cfg.stone.startX * PX;
        this.stone.label.x = this.stone.img.x;
        this.stone.v = 0;
        if (this.control !== 'garon') this.switchControl(true);
      } },
      this.fadeStep(1, 0.35, 0.4),
      { start() { fromX = garon.sprite.x; this.dur = Math.max(1.2, (fromX - garonTarget) / PX / 9); }, // 초당 9m로 빨리 걷기
        step: (k) => {
          garon.sprite.x = fromX + (garonTarget - fromX) * k;
          garon.sprite.setFlipX(true);
          this.cart.img.x = garon.sprite.x - 20;
        } },
      this.fadeStep(0.35, 1, 0.3),
      { dur: 0.01, start: () => {
        garon.carry = false;
        garon.sprite.setFlipX(false);
        this.cart.img.setPosition(cartTarget, this.groundY + 4);
        this.switchControl(true, 'ian');
      } },
      this.fadeStep(1, 0, 0.4),
      { dur: 1.4, start: () => Characters.play(garon.sprite, 'embarrassed', false) }, // 투덜투덜
    ]);
  }

  // ------------------------------------------------------------------ Tab: 조작 바꾸기
  switchControl(silent = false, to = null) {
    this.control = to || (this.control === 'ian' ? 'garon' : 'ian');
    const c = this.chars[this.control];
    this.player = c.sprite;
    this.curse.followTarget(c.sprite, this.bounds);
    if (!silent) Sound.play('sfx_ui_click');
  }

  // ------------------------------------------------------------------ 관성의 골렘
  // 이안이 돌바닥(다리를 걷어차는 곳)까지 얼마 만에 갈 수 있나 — 구덩이 오른쪽(얼음 쪽)에 있을 때만 계산
  ianReachTime() {
    const ian = this.chars.ian;
    if (ian.sprite.x <= this.pitRight) return Infinity;               // 돌바닥·다리 위에 있으면 깨어나지 않는다
    const dist = (ian.sprite.x - this.pitLeft) / this.PX;
    if (ian.v < 0) return dist / Math.abs(ian.v);                     // 이미 다리 쪽으로 미끄러지는 중
    if (ian.ring || ian.wall === 1 || (ian.v === 0 && this.hasAnchorBehind(ian, -1))) {
      return dist / this.cfg.walkSpeed;                                // 고리·벽을 밀고 바로 출발할 수 있음
    }
    return Infinity;
  }

  canWakeGolem() {
    const g = this.cfg.golem;
    return this.ianReachTime() <= g.startDistance / g.speed - g.wakeMargin;
  }

  wakeGolem() {
    const g = this.golem, G = this.cfg.golem;
    g.state = 'charge';
    g.v = -G.speed;
    g.vy = 0;
    // 문 앞에 서 있던 골렘이 문 안쪽 어둠으로 물러났다가 도움닫기해 달려 나온다 (다리까지 startDistance — 이때 카메라 밖)
    g.sprite.setPosition(this.pitRight + G.startDistance * this.PX, this.groundY).setVisible(true).setAlpha(1);
    Characters.play(g.sprite, 'charge');
    this.showGolemGuard(false);
    this.setMusicMode('midboss');   // 중간 보스: 관성의 골렘
    Sound.play('sfx_golem_roar');   // 울부짖음 (요청서 07)
    this.cameras.main.shake(400, 0.006);
    Sound.startLoop('sfx_golem_charge_loop');
    // 대사가 떠 있는 동안에도 빈 상자가 아니라 남은 시간이 보이게
    this.golemText.setText(`골렘이 다리까지 ${(G.startDistance / G.speed).toFixed(1)}초`).setVisible(true);
    if (!this.flags.golemCharge) { this.flags.golemCharge = true; this.say('golem_charge'); }
  }

  // 구덩이로 떨어지는 골렘: 구덩이 그림의 바닥선(바닥 기준선 + holeDepth)보다 아래는 그리지 않는다
  clipGolem() {
    const s = this.golem.sprite;
    const top = s.y - s.originY * s.height;
    const cut = this.groundY + this.cfg.golem.holeDepth;
    s.setCrop(0, 0, s.width, Phaser.Math.Clamp(cut - top, 0, s.height));
  }

  updateGolem(dt) {
    const g = this.golem, PX = this.PX;
    if (g.state === 'fall' || g.state === 'lodged') this.clipGolem();
    if (g.state === 'charge' || g.state === 'struggle') {
      g.sprite.x += g.v * PX * dt;
      const left = (g.sprite.x - this.pitRight) / PX / Math.abs(g.v);
      this.golemText.setText(left > 0 ? `골렘이 다리까지 ${left.toFixed(1)}초` : '골렘이 다리에 닿았다!');
      // 다리가 사라진 것을 보면 멈추려고 버둥대지만 얼음 위라 속도는 그대로
      if (!this.beamPresent && g.state === 'charge') { g.state = 'struggle'; Characters.play(g.sprite, 'struggle'); }
      if (!this.beamPresent && g.sprite.x <= this.pitRight) {
        g.state = 'fall';
        Characters.play(g.sprite, 'fall');
        Sound.stopLoop('sfx_golem_charge_loop');
        this.golemText.setVisible(false);
      }
      // 부딪힘
      for (const c of Object.values(this.chars)) {
        if (Math.abs(c.sprite.x - g.sprite.x) < 150 && g.state !== 'fall') { this.golemHit(c); return; }
      }
      if (g.sprite.x < this.minX + 150) this.golemHit(this.chars.ian);
    } else if (g.state === 'fall') {
      // 구덩이에 떨어진다: 옆으로는 그대로 3m/s, 아래로는 중력
      g.vy += GAME_CONFIG.physics.g * dt;
      g.sprite.x += g.v * PX * dt;
      g.sprite.y += g.vy * PX * dt;
      // 등이 바닥 높이에 오는 깊이에서 구덩이에 꽉 낀다 → 골렘의 등이 새 다리가 된다
      const lodgeY = this.groundY + this.cfg.golem.lodgeDepth;
      if (g.sprite.y >= lodgeY) {
        g.state = 'lodged';
        g.v = 0;
        const half = 145; // 골렘 몸 절반 폭(px) — 구덩이 안에 들어가게
        g.sprite.setPosition(Phaser.Math.Clamp(g.sprite.x, this.pitLeft + half, this.pitRight - half), lodgeY);
        // 끼인 모습: 골렘 스프라이트를 숨기고 구덩이 그림을 "골렘이 낀 구덩이" 그림으로 바꾼다
        g.sprite.setVisible(false);
        this.pitImg.setTexture(MANIFEST.objects.pit_with_golem.key);
        Sound.play('sfx_golem_fall_pit');
        this.cameras.main.shake(300, 0.006);
        this.setMusicMode(null);
        Save.setChapter(this.scene.key, { golemDefeated: true });
        this.showLodged();
      }
    }
  }

  // 문짝이 문틀 위 벽 속으로 올라가 사라진다 (문틀 위로 나간 부분은 잘라서 안 보이게), 뒤로 빛나는 통로
  updateDoor(dt) {
    const d = this.doorAnim;
    if (!d || d.done) return;
    d.t += dt;
    const k = Math.min(1, d.t / 0.9), h = this.gate.height;
    const hidden = h * k * k;                                 // 천천히 시작해 빨라진다
    this.gate.y = d.y0 - hidden;
    this.gate.setCrop(0, Math.min(h, hidden), this.gate.width, Math.max(0, h - hidden));
    this.darkway.setAlpha(k);
    if (k >= 1) { d.done = true; this.gate.setVisible(false); }
  }

  // 골렘이 구덩이에 낀 순간: 약 1초 멈추고 카메라가 구덩이를 보여 준다 → 안내 글 → 대사 → 문 안내
  showLodged() {
    const C = this.cfg.golem;
    this.cutscene = true;
    if (!this.pitFocus) {
      this.pitFocus = this.add.rectangle(this.pitMid, this.groundY - 200, 1, 1).setVisible(false);
      this.worldLayer.add(this.pitFocus);
    }
    this.curse.followTarget(this.pitFocus, this.bounds, 0.2);
    this.golemText.setText('골렘이 구덩이에 끼었다! 등을 밟고 건너자').setColor(UIKit.SKY).setVisible(true);
    this.time.delayedCall(C.lodgePause * 1000, () => {
      this.cutscene = false;
      this.curse.followTarget(this.player, this.bounds);
      this.say('golem_fell', () => {
        this.golemText.setVisible(false);
        this.exitHint.setVisible(true);
        this.doorArrow.setVisible(true);
      });
    });
  }

  // 골렘이 낀 구덩이 위에서는 골렘 등 높이로 걷는다 (가장자리에서 서서히 올라감)
  backLift(x) {
    if (this.golem.state !== 'lodged' || this.beamPresent) return 0;
    const ramp = this.cfg.golem.backRamp * this.PX;
    const k = Math.min(x - this.pitLeft, this.pitRight - x) / ramp;
    return this.cfg.golem.backLift * Phaser.Math.Clamp(k, 0, 1);
  }

  // Z: 돌바닥에서 다리 끝 가까이 있으면 외나무다리를 걷어찬다 (골렘이 깨어난 뒤에만)
  tryKick() {
    const c = this.chars[this.control];
    const near = this.onPad(c.sprite.x) && this.pitLeft - c.sprite.x <= this.cfg.golem.kickRange * this.PX;
    if (!this.beamPresent || !near || (this.golem.state !== 'charge')) return;
    this.beamPresent = false;
    c.kickT = 0.5;
    c.sprite.setFlipX(false);
    Sound.play('sfx_beam_kick');
    this.beamFallT = 0; // 다리가 기울며 구덩이로 떨어진다 (updateBeam에서 게임 시계로)
  }

  updateBeam(dt) {
    if (this.beamFallT == null) return;
    this.beamFallT += dt;
    const k = Math.min(1, this.beamFallT / 0.7);
    this.beam.setPosition(this.pitMid + 40 * k, this.beamY + 300 * k * k)
      .setAngle(25 * k).setAlpha(1 - k);
    if (k >= 1) this.beamFallT = null;
  }

  // 골렘에 부딪힘 → 체력이 줄고, 어두워졌다가 골렘 돌진을 다시 (이안은 12m 고리를 잡은 채로)
  golemHit(c) {
    const g = this.golem;
    g.state = 'hit';   // 어두워졌다가 다시 문 앞에 설 때까지는 깨어나지 않는다 (같은 순간 다시 돌진하지 않게)
    g.v = 0;
    Sound.stopLoop('sfx_golem_charge_loop');
    Sound.play('sfx_ian_hurt');
    c.hp = Math.max(0.05, c.hp - this.cfg.golem.hitDamage);
    c.hurtT = 0.6;
    const ian = this.chars.ian;
    this.playSequence([
      { dur: 0.6 },
      this.fadeStep(0, 1, 0.4),
      { dur: 0.01, start: () => {
        this.showGolemGuard(true);
        g.state = 'armed';
        this.golemText.setVisible(false);
        this.beamFallT = null;
        this.beam.setPosition(this.pitMid, this.beamY).setAngle(0).setAlpha(1);
        this.beamPresent = true;
        const ring = this.rings[0]; // 12m 고리
        Object.assign(ian, { v: 0, ring, wall: 0, ringLock: true, leftRing: null });
        ian.sprite.x = ring.x;
        this.chars.garon.sprite.x = this.cfg.garon.startX * this.PX;
        this.chars.garon.v = 0;
        this.switchControl(true, 'ian');
        this.setMusicMode(null);
      } },
      this.fadeStep(1, 0, 0.4),
      { dur: 1.0 },
    ]);
  }

  // ------------------------------------------------------------------ 그림·소리·표시
  updateAnim(c) {
    if (this.realizing && c.id === 'ian') return;
    const s = c.sprite;
    let anim = 'idle';
    if (c.hurtT > 0) anim = 'hurt';
    else if (c.carry) anim = 'walk';
    else if (c.kickT > 0) anim = 'kick';
    else if (c.shoveT > 0) anim = 'push';
    else if (c.ring) anim = c.ringAnim;
    else if (c.slipT > 0) anim = c.slipAnim;
    else if (c.pushing) anim = 'push';
    else if (c.v !== 0 && this.hasFooting(s.x)) anim = 'walk';
    else if (c.v !== 0) anim = c.slideAnim;
    if (this.seq && c.id === 'garon' && s.currentAction === 'embarrassed' && !c.carry) return;
    if (c.v !== 0 && !c.carry) s.setFlipX(c.v < 0);
    // 고리 잡기는 한 번 재생하고 마지막 장면(고리를 쥔 모습)에 머문다 — 다시 처음부터 반복하면 손이 고리에서 벗어나 보인다
    if (anim === c.ringAnim && s.currentAction === anim && !s.anims.isPlaying) return;
    Characters.play(s, anim);
    s.anims.timeScale = c.carry ? 2.5 : 1;
  }

  updateSounds() {
    const sliding = Object.values(this.chars).some((c) => c.v !== 0 && !this.hasFooting(c.sprite.x))
      || this.objects.some((o) => !o.gone && !o.driven && o.v !== 0);
    if (sliding) Sound.startLoop('sfx_ice_slide_loop'); else Sound.stopLoop('sfx_ice_slide_loop');
  }

  updateHud(dt = 0) {
    const ctrl = this.chars[this.control];
    if (this.hud) this.hud.set('health', ctrl.hp);
    if (this.bubbleOf) {
      const b = this.bubbleOf;
      b.t -= dt;
      this.bubble.setPosition(b.c.sprite.x, b.c.sprite.y - 250);
      if (b.t <= 0) { this.bubble.setVisible(false); this.bubbleOf = null; }
    }
    // 저주 상태에서 수레를 미는 동안 미는 사람 머리 위에 체력 막대 (줄어드는 게 눈에 띄게)
    if (!this.hpBar) { this.hpBar = this.add.graphics().setDepth(7); this.worldLayer.add(this.hpBar); }
    this.hpBar.clear();
    const pusher = Object.values(this.chars).find((c) => c.pushing === this.cart && this.curse.cursed);
    if (pusher) {
      const x = pusher.sprite.x - 50, y = pusher.sprite.y - 225;
      this.hpBar.fillStyle(0x1a0e08, 0.85).fillRect(x - 3, y - 3, 106, 18);
      this.hpBar.fillStyle(pusher.hp < 0.4 ? 0xff5a5a : 0xe0463c, 1).fillRect(x, y, 100 * pusher.hp, 12);
    }
    // 저주의 봉인: 보랏빛 고리가 숨 쉬듯 빛난다. 저주가 풀리면 사라진다
    this.sealAlpha += ((this.sealTarget ?? 1) - this.sealAlpha) * 0.05;
    const pulse = 0.8 + 0.2 * Math.sin(this.time.now / 300); // 숨 쉬듯 밝기가 바뀐다
    this.seal.setAlpha(this.doorOpen ? 0 : this.sealAlpha * pulse);
    if (this.doorArrow && this.doorArrow.visible) this.doorArrow.setAlpha(0.35 + 0.65 * Math.abs(Math.sin(this.time.now / 300)));
    const m = (x) => (x / this.PX).toFixed(1);
    const sp = (v) => Math.abs(v).toFixed(2);
    const where = (c) => (c.ring ? ' (고리)' : this.onPad(c.sprite.x) ? ' (돌바닥)' : this.curse.inCircle(c.sprite.x) ? ' (원 안)' : '');
    const lines = [`조작: ${ctrl.name} (Tab으로 바꾸기)`];
    for (const c of Object.values(this.chars)) lines.push(`${c.name} ${sp(c.v)} m/s   위치 ${m(c.sprite.x)} m${where(c)}`);
    for (const o of this.objects) if (!o.gone) lines.push(`${o.name} ${sp(o.v)} m/s   위치 ${m(o.img.x)} m`);
    if (!this.curse.cursed && !this.cart.gone && this.cart.v > 0) {
      lines.push(`수레가 문까지 ${((this.doorFace - this.cart.halfW - this.cart.img.x) / this.PX / this.cart.v).toFixed(1)}초`);
    }
    this.speedPanel.setLines(lines);
  }
}
window.IceCorridorScene = IceCorridorScene;
