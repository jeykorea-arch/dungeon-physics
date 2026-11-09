// 1-2 무너지는 다리 (1단계 1-B) — 배경 03
//
// 10m 다리 = 판자 10개 (x 447 ~ 1697, 윗면 y 599). 첫발을 디딘 순간부터 4초 뒤 무너진다.
// 돌 5종(10·15·20·40·160kg) 중 하나를 골라, 정지한 돌을 일정한 힘으로 밀며 함께 건넌다.
//   a = F / m (미는 사람의 힘 F: 이안 20N, 가론 80N — 돌의 질량 m), 다리에는 마찰이 없다고 본다.
//   건너는 시간 t = √(2·s·m / F), s = 10m
//   이안: 10kg 3.16초 · 15kg 3.87초 성공 / 20kg 4.47초 실패
//   가론: 40kg 3.16초 성공 / 160kg 6.32초 실패
// 시계는 미는 사람의 발이 첫 판자(x=447)에 닿는 순간 시작하고, 발이 건너편(x=1697)에 닿으면 건넌 것이다.
// (돌은 미는 사람 앞에 있으므로 그때 이미 건너편에 있다)
class BridgeScene extends ChapterScene {
  constructor() {
    super('Ch1_2b');
  }

  // 무너지는 다리는 저주가 풀린 뒤의 방이다
  startCursed() {
    return false;
  }

  buildWorld() {
    const cfg = GAME_CONFIG.collapsingBridge;
    const L = RAW_JSON.act1_objects.scene_layout['1-2_bridge'];
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    this.left = L.left_edge_x_px;
    this.right = L.right_edge_x_px;
    this.topY = L.top_y_px;
    this.groundY = this.topY;

    // 판자 10개 (금 1단계 → 2단계 → 붕괴)
    this.planks = L.segments.map((s) => {
      const img = this.add.image(s.x_px + s.width_px / 2, this.topY + O.bridge_segment.height, O.bridge_segment.key)
        .setOrigin(O.bridge_segment.pivot.x / O.bridge_segment.width, 1).setDepth(-2);
      // 판자 위를 덮은 얼음 막과 성에 (엔진으로 그림, 판자와 함께 움직인다)
      const ice = this.add.graphics().setDepth(-1);
      const hw = O.bridge_segment.width / 2, top = -O.bridge_segment.height;
      ice.fillStyle(0xcfefff, 0.92).fillRect(-hw, top - 9, hw * 2, 13);
      ice.lineStyle(2, 0xffffff, 0.9).lineBetween(-hw, top - 9, hw, top - 9);
      ice.fillStyle(0xffffff, 0.9).fillRect(-hw + 10, top - 4, 26, 2).fillRect(-hw + 58, top - 3, 18, 2).fillRect(-hw + 95, top - 4, 14, 2);
      ice.fillStyle(0xe8f8ff, 0.9).fillTriangle(-hw + 20, top + 4, -hw + 26, top + 4, -hw + 23, top + 11)
        .fillTriangle(-hw + 80, top + 4, -hw + 85, top + 4, -hw + 82, top + 9);
      ice.setPosition(img.x, img.y);
      this.worldLayer.add([img, ice]);
      return { img, ice, x: img.x };
    });
    // 돌 밑에서 튀는 얼음 가루
    this.dust = this.add.graphics().setDepth(3);
    this.worldLayer.add(this.dust);
    this.dustBits = [];
    this.dustT = 0;
    // 건너편 압력판
    this.plateX = cfg.plateX * PX;
    this.plate = this.add.image(this.plateX, this.topY + 6, O.pressure_plate.key)
      .setOrigin(O.pressure_plate.pivot.x / O.pressure_plate.width, 1).setDepth(-2);
    this.worldLayer.add(this.plate);

    // 썰매 길로 가는 성문 (압력판 뒤, 회랑 오른쪽 끝). 열리면 뒤로 빛나는 통로
    const D = O.corridor_door, gs = cfg.gateScale;
    this.gateX = this.worldW - D.width * gs / 2 - 8;
    this.passage = this.add.graphics().setDepth(-3.5).setAlpha(0);
    const pw = D.width * gs * 0.62, ph = D.height * gs * 0.9;
    for (let i = 0; i < 6; i++) {
      this.passage.fillStyle(0x9fe0ff, 0.12 + i * 0.1)
        .fillRoundedRect(this.gateX - pw / 2 + i * 9, this.topY + 4 - ph + i * 10, pw - i * 18, ph - i * 10, { tl: 70 - i * 8, tr: 70 - i * 8, bl: 0, br: 0 });
    }
    this.gate = this.add.image(this.gateX, this.topY + 4, D.key).setOrigin(D.pivot.x / D.width, D.pivot.y / D.height)
      .setScale(gs).setDepth(-3);
    this.gateY0 = this.gate.y;
    this.doorArrow = UIKit.text(this, this.gateX, this.gate.y - D.height * gs + 30, '▼', { fontSize: '56px', color: UIKit.SKY })
      .setOrigin(0.5, 1).setDepth(6).setVisible(false);
    this.worldLayer.add([this.passage, this.gate, this.doorArrow]);

    // 출발 발판의 돌 비석 안내판 (그림이 올 때까지 엔진으로 그림 — 요청서 08)
    this.sign = this.drawStele(cfg.signX * PX, this.topY, '⚠\n4초');

    // 돌 5개: 고르지 않은 돌은 출발 발판 뒤쪽 줄에 이름표와 함께 놓여 있고, 고른 돌만 다리 앞(미는 사람 앞)으로 굴러 나온다
    const R = cfg.stoneRow;
    let rx = R.startX * PX;
    this.stones = cfg.stones.map((m) => {
      const o = O[`stone_${m}kg`], lb = O[`stone_${m}kg_label`];
      const img = this.add.image(0, 0, o.key).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(0.5);
      const label = this.add.image(0, 0, lb.key).setOrigin(0.5, 1).setDepth(0.5);
      const st = { m, o, img, label, slotX: rx + o.width * R.scale / 2, slotY: this.topY - R.lift };
      rx += o.width * R.scale + R.gap;
      this.worldLayer.add([img, label]);
      return st;
    });
    this.rolls = [];

    // 이안·가론·스톤 할멈
    const P = GAME_CONFIG.physics;
    const I = GAME_CONFIG.iceCorridor;
    this.chars = {
      ian: { id: 'ian', name: '이안', force: P.ian.maxForce, reach: I.ian.pushReach * PX,
        sprite: Characters.create(this, 'ian', 0, this.topY) },
      garon: { id: 'garon', name: '가론', force: P.garon.maxForce, reach: I.garon.pushReach * PX,
        sprite: Characters.create(this, 'garon', 0, this.topY) },
    };
    this.chars.ian.sprite.setDepth(4);
    this.chars.garon.sprite.setDepth(3);
    this.granny = Characters.create(this, 'granny', cfg.grannyX * PX, this.topY).setVisible(false).setDepth(1);
    this.rope = this.add.graphics().setDepth(5);
    this.worldLayer.add([this.chars.ian.sprite, this.chars.garon.sprite, this.granny, this.rope]);

    this.fadeRect = this.add.rectangle(0, 0, 1920, 1080, 0x000000, 0).setOrigin(0, 0).setScrollFactor(0).setDepth(800);
    this.uiLayer.add(this.fadeRect);

    // 가론이 "제일 큰 걸로 간다!" — 처음에는 가론과 160kg 돌로 시작한다
    this.control = 'garon';
    this.bounds = { x: 0, y: 0, width: this.worldW, height: this.worldH };
    this.player = this.chars.garon.sprite;
    this.curse.followTarget(this.player, this.bounds);

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT', tab: 'TAB', reset: 'R' });
    kb.addCapture(['TAB']);
    this.keys.tab.on('down', () => { if (!this.isBlocked() && !this.seq && this.phase === 'ready' && !this.rolls.length) this.switchControl(); });
    this.keys.reset.on('down', () => { if (!this.isBlocked() && !this.seq && !this.leaving) this.resetTry(); }); // 성공한 뒤에도 다른 돌로 다시 해 볼 수 있다
    ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'].forEach((k, i) => kb.on('keydown-' + k, () => this.chooseStone(i)));

    this.fails = 0;
    this.flags = {};
    this.stoneIndex = cfg.stones.length - 1;
    this.stoneOut = false;    // 가론이 "제일 큰 걸로 간다!" 한 뒤에야 첫 돌이 굴러 나온다
    this.seq = null;
    this.firstVisit = !Save.chapter(this.scene.key).signRead;
    this.resetTry();
    if (this.firstVisit) this.chars.ian.sprite.setX(cfg.ianEnterX * PX);
  }

  onReady() {
    this.setMusicMode('puzzle');
    this.speedPanel.moveTo(1136, 150); // 왼쪽 위는 이안·가론 머리를 가려서 오른쪽으로
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '1~5 돌 고르기   → 누르고 있으면 밀기   Tab 이안/가론   T 결과판   R 다시   M 마법서', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));

    // 돌 고르기 버튼
    this.stoneButtons = this.cfg.stones.map((m, i) => {
      const b = UIKit.button(this, 760 + i * 150, 960, `${i + 1}  ${m}kg`, () => this.chooseStone(i),
        { fontSize: 26, width: 120 }).setScrollFactor(0).setDepth(310);
      this.uiLayer.add(b);
      return b;
    });
    // 결과판: 한 번 밀 때마다 한 줄 (R로 다시 해도 지워지지 않는다)
    this.board = new ResultBoard(this, this.uiLayer, {
      title: '무너지는 다리 결과판', logKey: 'Ch1_2b', columns: [
        { label: '미는 사람', width: 150 }, { label: '힘 (N)', width: 120 }, { label: '돌 질량 (kg)', width: 160 },
        { label: '가속도 (m/s²)', width: 180 }, { label: '예상 시간 (초)\n√(2×10×m/F)', width: 220 },
        { label: '실제 시간 (초)', width: 220 }, { label: '결과', width: 120 },
      ],
    });
    this.timerText = UIKit.text(this, 960, 70, '', {
      fontSize: '40px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 24, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.timerText);
    this.camFocus = this.add.rectangle(960, this.topY - 200, 1, 1).setVisible(false);
    this.worldLayer.add(this.camFocus);
    this.markButtons();
    if (this.firstVisit) this.walkToSign();
    else this.garonPicks();
  }

  // 처음 들어오면 (총괄지시 2차 16번): 이안이 출발 발판의 안내판 앞으로 걸어가 읽는다
  walkToSign() {
    const ian = this.chars.ian, PX = this.PX;
    const from = ian.sprite.x, to = (this.cfg.signX + 0.8) * PX;   // 안내판 오른쪽에 서서 왼쪽을 보고 읽는다
    this.playSequence([
      { dur: Math.abs(from - to) / PX / 1.2, start: () => {
        ian.sprite.setFlipX(true);
        Characters.play(ian.sprite, 'walk');
      }, step: (k) => { ian.sprite.x = from + (to - from) * k; } },
      { dur: 0.4, start: () => Characters.play(ian.sprite, 'idle') },
      { dur: 0.01, start: () => this.readSign() },
    ]);
  }

  // 안내판 글을 대화창 해설로. 대화창을 위로 올리고, 한 줄마다 카메라가 다리 → 압력판·성문 → 출발 발판을 비춘다 (눈금도 보이게)
  readSign() {
    Save.setChapter(this.scene.key, { signRead: true });
    this.dialogue.setTop(true);
    if (this.ruler) this.ruler.setVisible(true);
    this.camFocus.x = this.player.x;
    this.curse.followTarget(this.camFocus, this.bounds, 0.05);
    this.signPan = true;
    this.say('bridge_sign', () => {
      this.signPan = false;
      this.dialogue.setTop(false);
      this.applySettings();
      this.curse.followTarget(this.player, this.bounds);
      // 읽고 나면 기다리는 자리(발판 왼쪽 끝)로 비켜 선다
      const ian = this.chars.ian, from = ian.sprite.x, to = this.cfg.waitX * this.PX;
      this.playSequence([
        { dur: Math.abs(from - to) / this.PX / 1.2, start: () => Characters.play(ian.sprite, 'walk'),
          step: (k) => { ian.sprite.x = from + (to - from) * k; } },
        { dur: 0.01, start: () => { Characters.play(ian.sprite, 'idle'); ian.sprite.setFlipX(false); this.garonPicks(); } },
      ]);
    });
  }

  // 가론 "제일 큰 걸로 간다!" → 160kg 돌이 다리 앞으로 굴러 나온다 (처음 시도는 가론 + 160kg)
  garonPicks() {
    this.say('bridge_before', () => {
      this.stoneOut = true;
      this.chooseStone(this.stoneIndex, true);
    });
  }

  update(time, deltaMs) {
    super.update(time, deltaMs);
    // 안내판을 읽는 동안 (대화창이 떠 있어 세계는 멈춰 있지만) 카메라는 줄마다 다른 곳을 비춘다
    if (this.signPan && this.dialogue.active) {
      const spots = [(this.left + this.right) / 2, this.worldW, this.left];
      this.camFocus.x = spots[Math.min(this.dialogue.index, spots.length - 1)];
    }
  }

  curseRuleText() {
    return '같은 힘으로 밀면 무거울수록 속도가 늦게 붙는다 (a = F / m)';
  }

  // ------------------------------------------------------------------ 준비
  resetTry() {
    const cfg = this.cfg;
    this.phase = 'ready';     // ready → pushing → (crossed | falling) → ready / done
    this.t = 0;               // 첫발 뒤 지난 시간
    this.pushT = null;        // 건넌 시간
    this.stage = 0;           // 판자 금 단계
    this.pusherV = 0;
    this.stoneV = 0;
    this.fallY = 0;
    for (const p of this.planks) {
      p.img.setTexture(MANIFEST.objects.bridge_segment.key).setPosition(p.x, this.topY + 20).setAngle(0).setAlpha(1);
      p.ice.setPosition(p.img.x, p.img.y).setAngle(0).setAlpha(1);
    }
    const pusher = this.chars[this.control];
    const other = this.otherChar();
    if (this.speedPanel) this.speedPanel.moveTo(1136, 150);
    pusher.sprite.setPosition(this.left, this.topY).setFlipX(false).setAngle(0);
    other.sprite.setPosition(cfg.waitX * this.PX, this.topY).setFlipX(false).setAngle(0);
    Characters.play(pusher.sprite, 'idle');
    Characters.play(other.sprite, 'idle');
    this.rope.clear();
    this.plate.clearTint();
    this.placeStone();
    if (this.timerText) this.timerText.setText('');
  }

  otherChar() {
    return this.chars[this.control === 'ian' ? 'garon' : 'ian'];
  }

  stoneMass() {
    return this.cfg.stones[this.stoneIndex];
  }

  stoneInfo() {
    return MANIFEST.objects[`stone_${this.stoneMass()}kg`];
  }

  // 발 중심에서 돌에 닿는 손·방패 끝까지 (px). 그림에서 잰 만큼 회랑의 pushReach보다 안쪽 — 손과 돌 사이가 벌어져 보이지 않게
  handReach(p) {
    return p.reach - (this.cfg.handInset[p.id] || 0);
  }

  // 돌 하나를 (x, y)에 배율 s로 (이름표는 돌 위에)
  // 구르는 동안(angle ≠ 0)은 돌 가운데를 축으로 돈다 (발 기준점으로 돌리면 돌이 바닥 아래로 내려가 보인다)
  setStone(st, x, y, s, angle = 0) {
    const o = st.o;
    if (angle) st.img.setOrigin(0.5, 0.5).setPosition(x, y - (o.pivot.y - o.height / 2) * s);
    else st.img.setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setPosition(x, y);
    st.img.setScale(s).setAngle(angle).setVisible(true);
    st.label.setPosition(x, y - st.o.height * s - 6 * s).setScale(s).setVisible(true);
  }

  // 미는 사람 앞, 다리 위에 놓일 자리 (고른 돌)
  frontX(st) {
    const pusher = this.chars[this.control];
    return pusher.sprite.x + this.handReach(pusher) + st.o.radius_px;
  }

  // 고른 돌은 미는 사람 바로 앞에, 나머지는 뒤쪽 줄 제자리에 (고른 돌이 아직 안 나왔으면 모두 제자리)
  placeStone() {
    const R = this.cfg.stoneRow;
    this.rolls = [];
    this.stones.forEach((st, i) => {
      if (i === this.stoneIndex && this.stoneOut) return;
      this.setStone(st, st.slotX, st.slotY, R.scale);
    });
    const cur = this.stones[this.stoneIndex];
    this.stoneImg = cur.img;
    this.stoneLabel = cur.label;
    this.stoneR = cur.o.radius_px;
    this.stoneX = this.stoneOut ? this.frontX(cur) : cur.slotX;
    this.stoneY = this.stoneOut ? this.topY : cur.slotY;
    if (this.stoneOut) this.syncStone();
  }

  syncStone() {
    this.setStone(this.stones[this.stoneIndex], this.stoneX, this.stoneY, 1, this.stoneImg.angle);
  }

  markButtons() {
    if (this.stoneButtons) this.stoneButtons.forEach((b, j) => b.setBackgroundColor(j === this.stoneIndex ? '#3a6aa0' : '#1d2c44'));
  }

  // 1~5 키·버튼: 고른 돌이 뒤쪽 줄에서 다리 앞으로 굴러 나오고, 앞에 있던 돌은 제자리로 굴러 돌아간다 (게임 시계)
  chooseStone(i, force = false) {
    if (!force && (this.phase !== 'ready' || this.isBlocked() || this.seq || !this.stoneOut || this.rolls.length)) return;
    if (!force && i === this.stoneIndex) return;
    const R = this.cfg.stoneRow;
    const prev = this.stones[this.stoneIndex];
    const wasOut = this.stoneOut && !force;
    this.stoneIndex = i;
    this.markButtons();
    const cur = this.stones[i];
    this.stoneImg = cur.img;
    this.stoneLabel = cur.label;
    this.stoneR = cur.o.radius_px;
    this.stoneX = this.frontX(cur);
    this.stoneY = this.topY;
    const roll = (st, x0, y0, s0, x1, y1, s1) => this.rolls.push({ st, x0, y0, s0, x1, y1, s1, t: 0 });
    if (wasOut && prev !== cur) roll(prev, prev.img.x, prev.img.y, 1, prev.slotX, prev.slotY, R.scale);
    roll(cur, cur.slotX, cur.slotY, R.scale, this.stoneX, this.topY, 1);
    Sound.play('sfx_step_stone');   // 돌 구르는 소리 (발걸음 돌 소리로 대신)
  }

  updateRolls(dt) {
    const T = this.cfg.rollSeconds;
    for (const r of this.rolls) {
      r.t = Math.min(T, r.t + dt);
      const k = r.t / T, e = k * k * (3 - 2 * k);
      const x = r.x0 + (r.x1 - r.x0) * e;
      // 굴러간 거리만큼 돈다 (반지름으로 나눈 각)
      const ang = (x - r.x0) / (r.st.o.radius_px * Math.max(r.s0, r.s1)) * 180 / Math.PI;
      this.setStone(r.st, x, r.y0 + (r.y1 - r.y0) * e, r.s0 + (r.s1 - r.s0) * e, ang % 360);
    }
    this.rolls = this.rolls.filter((r) => r.t < T);
    if (!this.rolls.length) this.stoneImg.setAngle(0);
  }

  switchControl() {
    this.control = this.control === 'ian' ? 'garon' : 'ian';
    this.player = this.chars[this.control].sprite;
    this.curse.followTarget(this.player, this.bounds);
    Sound.play('sfx_ui_click');
    this.resetTry();
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    if (this.seq) { this.runSequence(dt); return; }
    const cfg = this.cfg, PX = this.PX;
    const pusher = this.chars[this.control];
    const holding = this.keys.right.isDown;
    if (this.rolls.length) { this.updateRolls(dt); this.updateHud(); return; }

    // 성공한 뒤: →를 누르면 열린 문으로 걸어 들어가 썰매 길로
    if (this.phase === 'done') {
      if (holding && !this.leaving) {
        pusher.sprite.x = Math.min(this.gateX, pusher.sprite.x + cfg.exitWalkSpeed * PX * dt);
        pusher.sprite.setFlipX(false);
        Characters.play(pusher.sprite, 'walk');
        if (pusher.sprite.x >= this.gateX) {
          this.leaving = true;
          this.playSequence([this.fadeStep(0, 1, 0.6), { dur: 0.01, start: () => this.goNext() }]);
        }
      } else if (!this.leaving) Characters.play(pusher.sprite, 'idle');
      this.syncStone();
      this.updateHud();
      return;
    }

    if (this.phase === 'ready' && holding && this.stoneOut) {
      this.phase = 'pushing';   // 첫발: 시계 시작
      this.t = 0;
    }

    if (this.phase === 'pushing' || this.phase === 'crossed') {
      this.t += dt;
      this.updateCracks();
    }

    if (this.phase === 'pushing') {
      // 일정한 힘 F로 미는 동안 a = F/m. 손을 떼면 돌은 그 속도로 계속 미끄러지고(얼음, 마찰 없음), 미는 사람은 돌에 붙어 함께 간다
      const a = holding ? pusher.force / this.stoneMass() : 0;
      const step = this.stoneV * dt + 0.5 * a * dt * dt; // 등가속도 운동을 그대로 (프레임 간격과 상관없이 정확)
      this.stoneV += a * dt;
      this.stoneX += step * PX;
      this.pusherV = this.stoneV;
      pusher.sprite.x = this.stoneX - this.handReach(pusher) - this.stoneR;
      // 발이 건너편에 닿았다 (돌은 이미 건너편)
      if (pusher.sprite.x >= this.right && this.t <= cfg.collapseSeconds) {
        // 정확한 도착 시각: 마지막 프레임 안에서 x = 1697이 되는 순간을 거꾸로 계산
        const over = (pusher.sprite.x - this.right) / PX;
        this.pushT = this.t - (this.pusherV > 0 ? over / this.pusherV : 0);
        pusher.sprite.x = this.right;
        this.phase = 'crossed';
        this.pusherV = 0;
        this.recordResult(true);
      }
      if (this.t >= cfg.collapseSeconds && this.phase === 'pushing') this.startFall();
      Characters.play(pusher.sprite, holding ? 'push' : 'walk');
    }

    // 건너편에서 돌은 그 속도 그대로 미끄러지다 압력판에 닿으면 멈춘다
    if (this.phase === 'crossed') {
      if (this.stoneX < this.plateX) {
        this.stoneX = Math.min(this.plateX, this.stoneX + this.stoneV * PX * dt);
        if (this.stoneX >= this.plateX) this.onPlate();
      }
      Characters.play(pusher.sprite, 'idle');
    }
    this.syncStone();
    this.updateDust(dt, this.phase === 'pushing' || (this.phase === 'crossed' && this.stoneX < this.plateX));
    this.updateHud();
  }

  // 얼음 위를 미끄러지는 돌 밑에서 얼음 가루가 살짝 튄다 (게임 시계로 퍼지며 사라짐)
  updateDust(dt, sliding) {
    this.dustT -= dt;
    if (sliding && this.stoneV > 0.2 && this.dustT <= 0) {
      this.dustT = 0.05;
      for (let i = 0; i < 2; i++) {
        this.dustBits.push({ x: this.stoneX - this.stoneR * (0.3 + Math.random() * 0.5), y: this.topY - 2,
          vx: -(20 + Math.random() * 40), vy: -(30 + Math.random() * 50), t: 0 });
      }
    }
    const g = this.dust;
    g.clear();
    this.dustBits = this.dustBits.filter((b) => (b.t += dt) < 0.45);
    for (const b of this.dustBits) {
      b.x += b.vx * dt; b.y += b.vy * dt; b.vy += 200 * dt;
      g.fillStyle(0xf2fbff, 0.9 * (1 - b.t / 0.45)).fillCircle(b.x, b.y, 3);
    }
  }

  // 판자: 2초에 금 1단계, 3초에 금 2단계, 4초에 무너짐
  updateCracks() {
    const cfg = this.cfg, O = MANIFEST.objects;
    if (this.stage < 1 && this.t >= cfg.crack1At) {
      this.stage = 1;
      this.planks.forEach((p) => p.img.setTexture(O.bridge_segment_crack_01.key));
      Sound.play('sfx_bridge_crack_1');
    }
    if (this.stage < 2 && this.t >= cfg.crack2At) {
      this.stage = 2;
      this.planks.forEach((p) => p.img.setTexture(O.bridge_segment_crack_02.key));
      Sound.play('sfx_bridge_crack_2');
    }
    if (this.stage < 3 && this.t >= cfg.collapseSeconds) {
      this.stage = 3;
      Sound.play('sfx_bridge_collapse');
      this.collapseT = 0;
    }
    if (this.stage === 3) {
      // 판자가 왼쪽부터 차례로 떨어진다 (보이는 연출)
      this.collapseT += 1 / 50;
      this.planks.forEach((p, i) => {
        const k = Math.max(0, this.collapseT - i * 0.04);
        p.img.setPosition(p.x, this.topY + 20 + 600 * k * k).setAngle((i % 2 ? 1 : -1) * 40 * k).setAlpha(Math.max(0, 1 - k));
        p.ice.setPosition(p.img.x, p.img.y).setAngle(p.img.angle).setAlpha(p.img.alpha);
      });
    }
  }

  onPlate() {
    if (this.phase !== 'crossed') return;
    Sound.play('sfx_pressure_plate');
    this.plate.setTint(0x9fe0ff);
    Save.setChapter(this.scene.key, { bridgeDone: true });
    const p = this.chars[this.control];
    const finish = () => {
      this.phase = 'done';
      this.timerText.setText(`성공! ${p.name} ${p.force}N · ${this.stoneMass()}kg → ${this.pushT.toFixed(2)}초   (R: 다른 돌로 다시)`);
    };
    if (this.flags.plateDone) { finish(); return; }   // 두 번째부터는 대사 없이 결과만
    this.flags.plateDone = true;
    // 카메라가 성문을 비추고, 문짝이 문틀 위로 올라가며 열린다 (게임 시계) → 대사 → 카메라가 돌아온다
    const D = MANIFEST.objects.corridor_door, gs = this.cfg.gateScale, h = this.gate.height;
    this.playSequence([
      { dur: 1.0, start: () => {
        this.speedPanel.moveTo(24, 190);   // 오른쪽 위 숫자판이 성문을 가리지 않게 (다시 하면 제자리로)
        this.camFocus.setPosition(this.gateX, this.topY - 200);
        this.curse.followTarget(this.camFocus, this.bounds, 0.08);
      } },
      { dur: 1.0, start: () => Sound.play('sfx_door_open'), step: (k) => {
        const hidden = h * k * k;
        this.gate.y = this.gateY0 - hidden * gs;
        this.gate.setCrop(0, Math.min(h, hidden), D.width, Math.max(0, h - hidden));
        this.passage.setAlpha(k);
      } },
      { dur: 0.5, start: () => this.gate.setVisible(false) },
      { dur: 0.01, start: () => this.say('bridge_success', () => {
        this.curse.followTarget(this.player, this.bounds);
        finish();
        this.exitHint();
      }) },
    ]);
  }

  // 다음 방으로는 열린 문으로 걸어 들어간다. 아래 버튼은 보조
  exitHint() {
    this.doorArrow.setVisible(true);
    this.tweens.add({ targets: this.doorArrow, alpha: 0.3, yoyo: true, repeat: -1, duration: 500 });
    this.uiLayer.add(UIKit.button(this, 1740, 900, '다음: 썰매 길 ▶', () => this.goNext(), {
      fontSize: 24,
    }).setScrollFactor(0).setDepth(320));
  }

  // ------------------------------------------------------------------ 실패: 떨어짐 → 밧줄로 끌어올림 → 다시
  // 결과판에 한 줄: 미는 사람 | 힘 | 돌 질량 | 가속도 | 예상 시간 | 실제 시간 | 결과
  recordResult(success) {
    const p = this.chars[this.control];
    const m = this.stoneMass();
    const expected = Math.sqrt(2 * 10 * m / p.force);
    const dist = (p.sprite.x - this.left) / this.PX;
    const actual = success ? this.pushT.toFixed(2) : `${this.cfg.collapseSeconds}초에 ${dist.toFixed(2)}m`;
    this.board.addRow([p.name, p.force, m, (p.force / m).toFixed(2), expected.toFixed(2), actual,
      success ? '성공' : '실패'], success ? UIKit.SKY : '#ff9a9a');
  }

  startFall() {
    this.phase = 'falling';
    const pusher = this.chars[this.control];
    this.recordResult(false);
    const whoFailed = this.control;
    this.fails += 1;
    let vy = 0, svy = 0;
    const startX = pusher.sprite.x;
    const helper = this.otherChar();
    const hx0 = helper.sprite.x, hx1 = this.left - 30;   // 동료는 다리 앞 발판 끝까지 달려온다
    const hang = { x: startX, y: this.topY + 420 };
    // 동료 손 → 매달린 사람 손까지 밧줄 (k: 던진 밧줄이 뻗은 정도)
    const drawRope = (k) => {
      const ax = helper.sprite.x + 30, ay = helper.sprite.y - 110;
      const bx = pusher.sprite.x, by = pusher.sprite.y - (pusher.id === 'garon' ? 290 : 225); // rope_hang 그림에서 쥔 손 높이 (px)
      this.rope.clear().lineStyle(5, 0xc8a46a).lineBetween(ax, ay, ax + (bx - ax) * k, ay + (by - ay) * k);
    };
    const fallAnim = pusher.id === 'garon' ? 'ice_fall' : 'fall';
    Characters.play(pusher.sprite, fallAnim);
    this.timerText.setText(`실패: ${this.t.toFixed(1)}초 만에 다리가 무너졌다`);
    this.playSequence([
      { dur: 1.1, step: (k, dt) => {
        // 사람과 돌이 골짜기로 떨어진다 (중력)
        vy += GAME_CONFIG.physics.g * dt;
        svy += GAME_CONFIG.physics.g * dt;
        pusher.sprite.y += vy * this.PX * dt;
        this.stoneY += svy * this.PX * dt;
        this.stoneX += this.stoneV * this.PX * dt;
        this.syncStone();
      } },
      { dur: 0.6, start: () => {
        // 다리 앞에 남은 동료가 발판 끝으로 달려온다
        helper.sprite.setFlipX(false);
        Characters.play(helper.sprite, 'walk');
        this.stoneImg.setVisible(false);
        this.stoneLabel.setVisible(false);
      }, step: (k) => { helper.sprite.x = hx0 + (hx1 - hx0) * k; } },
      { dur: 0.4, start: () => {
        // 동료가 밧줄을 던지고, 떨어진 사람이 잡고 매달린다 (rope_hang 그림)
        Characters.play(helper.sprite, 'idle');
        pusher.sprite.setPosition(hang.x, hang.y);
        Characters.play(pusher.sprite, 'rope_hang', false);
      }, step: (k) => drawRope(k) },
      { dur: 1.6, start: () => {
        // 몸을 뒤로 젖혀 끌어올린다 (밀기 그림을 반대로)
        helper.sprite.setFlipX(true);
        Characters.play(helper.sprite, 'push');
      }, step: (k) => {
        // 밧줄 쪽(발판 끝)으로 끌려오며 올라온다
        pusher.sprite.setPosition(hang.x + (this.left - 60 - hang.x) * k, hang.y - 420 * k);
        drawRope(1);
      } },
      this.fadeStep(0, 1, 0.4),
      { dur: 0.01, start: () => { this.resetTry(); } },
      this.fadeStep(1, 0, 0.4),
      { dur: 0.01, start: () => {
        // 가론이 처음 실패하면 이안이 생각하고, 여러 번 실패하면 스톤 할멈이 힌트를 준다
        if (whoFailed === 'garon' && !this.flags.garonFailTalk) {
          this.flags.garonFailTalk = true;
          this.say('garon_fail');
        } else if (this.fails >= this.cfg.failsBeforeHint && !this.flags.hint) {
          this.flags.hint = true;
          this.granny.setVisible(true);
          Characters.play(this.granny, 'hint', false);
          this.say('granny_hint', () => Characters.play(this.granny, 'idle'));
        }
      } },
    ]);
  }

  // ------------------------------------------------------------------ 연출 순서 (게임 시계)
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
    if (this.stage === 3) this.updateCracks();
    if (k >= 1) this.nextSequenceStep();
  }

  fadeStep(from, to, dur) {
    return { dur, step: (k) => this.fadeRect.setFillStyle(0x000000, from + (to - from) * k) };
  }

  // ------------------------------------------------------------------ 표시
  updateHud() {
    const p = this.chars[this.control];
    const m = this.stoneMass();
    const a = p.force / m;
    const dist = Math.max(0, (p.sprite.x - this.left) / this.PX);
    const lines = [
      '얼음 덮인 다리 — 마찰 없음',
      `미는 사람: ${p.name}  힘 ${p.force} N   (Tab으로 바꾸기)`,
      `돌: ${m} kg   →   가속도 a = F/m = ${a.toFixed(2)} m/s²`,
      `속력 ${this.stoneV.toFixed(2)} m/s   건넌 거리 ${Math.min(10, dist).toFixed(2)} / 10 m`,
    ];
    this.speedPanel.setLines(lines);
    this.timerText.setVisible(this.timerText.text !== '');   // 글이 없을 때 빈 검은 상자가 남지 않게
    if (this.phase === 'pushing') {
      const left = this.cfg.collapseSeconds - this.t;
      this.timerText.setText(`다리가 무너지기까지 ${Math.max(0, left).toFixed(1)}초`);
    } else if (this.phase === 'crossed' && !this.flags.plateDone) {
      this.timerText.setText(`건넜다! ${this.pushT.toFixed(2)}초`);
    } else if (this.phase === 'ready') {
      this.timerText.setText('돌을 고르고 → 를 누르고 있으면 민다');
    }
  }
}

window.BridgeScene = BridgeScene;
