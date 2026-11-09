// 2-1 탑 1층 실험실 (ACT2_PLAN 1단계) — 배경 tower_f1 (2700px)
//
// 이번 묶음: 방 배치 + 저주 체험.
//   C: 털가죽으로 호박 막대를 문지른다(charge_rub) → 막대가 − 전하를 띤다(electric.rodCharge).
//   매달린 깃털에 막대를 가까이 대면:
//     저주 — 떨어져 있으면 아무 일 없고, 닿는 순간에만 튕긴다 (전기력은 닿아야만 작용한다는 오개념)
//     해방 — 닿기 전에도 힘을 받는다: 중성 깃털은 살짝 끌려오고, 막대에 닿아 같은(−) 전하를 받은 깃털은 밀려난다
//   (진실의 원 실험·전기 언덕 퍼즐·불꽃 요정 전투·시험은 다음 묶음에서 만든다)
// 힘은 js/physics/act2/electric.js 가 계산한다. 깃털은 실에 매달린 진자: 각가속도 = 수평 힘 ÷ 길이 − 중력 복원 − 감쇠
class LabScene extends ChapterScene {
  constructor() {
    super('Ch2_1');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act2.ch2_1;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    const place = (name, x, y, depth, state) => {
      const o = O[name];
      const img = this.add.image(x, y, state ? o.states[state] : o.key)
        .setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };

    // 깃털 받침대 (요청서 10 그림, 기준점 = 놋쇠 고리 → 실을 매다는 곳) + 실 + 깃털
    const F = cfg.feather;
    this.hang = { x: F.standX * PX, y: this.groundY - F.hangY, L: F.thread };
    const hx = this.hang.x, hy = this.hang.y;
    if (O.feather_stand) place('feather_stand', hx, hy, 1);
    this.thread = this.add.graphics().setDepth(1);
    this.worldLayer.add(this.thread);
    this.feather = place('feather', hx, hy + F.thread, 2, 'normal').setScale(1.4);   // 작아 보여서 키움 (총괄지시 2막리뷰 35번)
    this.featherQ = 0;            // 깃털 전하 (처음엔 중성)
    this.theta = 0;               // 실의 기울기 (rad, + = 오른쪽)
    this.omega = 0;

    // 탁자의 진공 유리관과 진실의 원 (저주 상태에서는 깃털에 닿아 튕긴 뒤에야 빛난다 — 1막과 같은 순서)
    place('vacuum_tube', cfg.tubeX, this.groundY, 1);
    this.circle = this.curse.addTruthCircle({ centerX: cfg.circleX, groundY: this.groundY, diameter: 3.6, domeHeight: 2.6 });
    this.curse.setCircleActive(this.circle, !this.curse.cursed);
    this.circleHint = UIKit.text(this, cfg.circleX * PX, this.groundY - 330, 'Z: 진공 유리관 실험', {
      fontSize: '26px', color: UIKit.SKY, backgroundColor: '#0b1320cc', padding: { x: 10, y: 6 },
    }).setOrigin(0.5).setVisible(false);
    this.worldLayer.add(this.circleHint);

    this.buildHill();

    // 이안(호박 막대·털가죽을 든다)과 가론
    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, this.groundY).setDepth(4);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, this.groundY).setDepth(3);
    this.rod = place('amber_rod', 0, 0, 5).setAngle(-70).setVisible(false);   // 걸을 때 손에 든 막대
    this.spark = place('spark_small', 0, 0, 6, '01').setVisible(false);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    this.rodAmount = 0;           // 막대의 전하량 (0 = 안 문지름, 1 = 가득) — 부호는 electric.rodCharge(−)
    this.rubT = 0;

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT', rub: ACT2_KEYS.rub.key, act: 'Z', reset: 'R', attack: 'X' });
    kb.addCapture(['X']);
    this.keys.attack.on('down', () => this.strike());
    kb.addCapture(['Z', ACT2_KEYS.rub.key]);
    this.keys.rub.on('down', () => this.rub());
    this.keys.act.on('down', () => { if (!this.tryHill()) this.tryExperiment(); });
    this.keys.reset.on('down', () => { if (!this.isBlocked()) this.clearStones(); });
    ['ONE', 'TWO', 'THREE'].forEach((k, i) => kb.on('keydown-' + k, () => this.pickStone(['plus', 'minus', 'neutral'][i])));
    this.flags = {};
    this.lab = new TubeLab(this, this.uiLayer);
    // 교사용 표시 (ACT2_PLAN 1단계): 두 판 사이 힘의 방향 화살표 켜고 끄기 — 막대-깃털 거리·힘은 숫자판에 늘 보인다
    this.showArrows = true;
    this.arrowG = this.add.graphics().setDepth(6);
    this.worldLayer.add(this.arrowG);
    this.teacherExtra = {
      label: () => '힘 화살표 ' + (this.showArrows ? '끄기' : '켜기'),
      toggle: () => { this.showArrows = !this.showArrows; },
    };
  }

  // 물체 위 키 안내 (총괄지시 2막리뷰 34번) — 진실의 원 안내는 circleHint가 따로 한다
  addPrompts() {
    const H = this.cfg.hill;
    this.addPrompt({ key: 'C', text: '털가죽에 막대 문지르기', x: () => this.ian.x, range: Infinity, y: this.groundY - 330,
      when: () => !this.flags.rubbed && !this.battle, newKey: '문지르기 — 호박 막대를 털가죽에 문질러 전하를 띠게 한다' });
    this.addPrompt({ key: 'Z', text: '전위 바꾸기 (스위치)', x: H.switchX, range: H.reach * this.PX });
    this.addPrompt({ key: 'Z', text: '고른 돌 놓기 (1 + · 2 − · 3 중성)', x: (H.innerLeft + H.innerRight) / 2, range: (H.innerRight - H.innerLeft) / 2 - 20,
      newKeyName: '1·2·3', newKey: '판 사이에 놓을 돌 고르기 (+ · − · 중성), R로 치우기' });
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  onReady() {
    this.addPrompts();
    this.uiLayer.add(UIKit.text(this, 1900, 1070, Act2Help('rub') + '   X 치기   Z 실험·스위치·돌 놓기   1~3 돌   R 돌 치우기', {
      fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1136, 150);
    this.message.setText(this.curse.cursed ? `${ACT2_KEYS.rub.label} · ← → 걸어서 깃털에 막대 대 보기` : '');   // 해방된 장에 다시 들어오면 저주 때 안내를 띄우지 않는다 (총괄지시 2막리뷰 44번 — 목표 줄이 해방 상태 안내)
  }

  onCurseChanged() {
    super.onCurseChanged();
    if (this.plates) this.applyPotential();   // 저주가 풀리면 판의 빛이 켜진다
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 전기력은 닿아야만 작용한다? (떨어져 있으면 아무 일 없음)'
      : '진짜 법칙: 전하는 전기장을 만들어 떨어져 있어도 힘을 준다 — 가까울수록 강하다';
  }

  // ------------------------------------------------------------------ 조작
  rub() {
    if (this.isBlocked() || this.rubT > 0) return;
    this.rubT = 0.9;
    this.rodAmount = GAME_CONFIG.act2.electric.rodFull;
    Characters.play(this.ian, 'charge_rub', false);
    Sound.play('sfx_rub_charge');
    this.time.delayedCall(600, () => Sound.play('sfx_spark_small'));
    if (!this.flags.rubbed) {
      this.flags.rubbed = true;
      this.message.setText('막대가 − 전하를 띠었다 — 깃털에 가까이 대 보자');
    }
  }

  // 진실의 원 안에서 Z: 진공 유리관 실험 (처음 열 때만 이안의 고민 대사)
  tryExperiment() {
    if (this.isBlocked() || !this.curse.cursed || !this.curse.inCircle(this.ian.x) || !this.circle.active) return;
    const open = () => this.lab.open(() => this.onLabDone());
    if (this.flags.labTalked) { open(); return; }
    this.flags.labTalked = true;
    this.say('lab_start', open);
  }

  // 실험 뒤: 깨달음 동작 → 깨달음 대사 → 공통 저주 풀기(해금 카드 07 + 마법서 7장) → 가론 대사
  onLabDone() {
    this.realizing = true;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.featherQ = 0;
        this.feather.setTexture(MANIFEST.objects.feather.states.normal);
        this.message.setText('이제 진짜 법칙대로! 막대를 문질러(C) 깃털에 가까이 대 보자');
        this.say('after_free');
      }));
    });
  }

  // 막대 끝 위치 (px) — 문지른 뒤 손에 든 막대
  rodTip() {
    const f = this.ian.flipX ? -1 : 1, T = this.cfg.rodTip;
    return { x: this.ian.x + f * T.dx, y: this.ian.y - T.dy };
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const cfg = this.cfg, PX = this.PX, E = GAME_CONFIG.act2.electric;
    this.rubT = Math.max(0, this.rubT - dt);
    // 막대 전하는 시간이 지나면 조금씩 줄어든다 (총괄지시 2막리뷰 36번 — 멀리서 힘을 준다고 닳지는 않는다)
    if (this.rodAmount > 0) this.rodAmount = Math.max(0, this.rodAmount - E.rodLossPerSecond * dt);
    if (this.plateEdge) {
      const H = cfg.hill, O = MANIFEST.objects.metal_plate, near = this.ian.x > H.plateLeft - 3 * PX && this.ian.x < H.plateRight + O.width + 3 * PX;
      this.plateEdge.clear();
      if (near) {
        const a = 0.5 + 0.3 * Math.sin(this.time.now / 250);
        for (const p of Object.values(this.plates)) this.plateEdge.lineStyle(4, 0x9fe0ff, a).strokeRect(p.img.x - 4, p.img.y - 4, O.width + 8, O.height + 8);
      }
    }
    const dir = this.rubT > 0 ? 0 : (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * cfg.walkSpeed * PX * dt, 60, this.rightLimit());
    // 두 문이 열린 뒤 계단 입구로 들어가면 다음 방(2-2)
    if (this.hillOpen && this.canLeave() && this.ian.x >= cfg.hill.exitX && !this.flags.leaving) {
      this.leaveRoom({ x: cfg.hill.exitX });
    }
    if (dir) this.ian.setFlipX(dir < 0);
    if (this.rodAmount > 0) this.rodAmount = Electric.rodAfter(this.rodAmount, { seconds: dt });
    if (this.realizing) {
      // 깨달음 동작 중에는 그림을 바꾸지 않는다
    } else if (this.rubT <= 0) {
      if (dir) Characters.play(this.ian, 'walk');
      else if (this.rodAmount > 0) { Characters.play(this.ian, 'charge_rub'); this.ian.anims.pause(this.ian.anims.currentAnim.frames[2]); }
      else Characters.play(this.ian, 'idle');
    }
    // 걸을 때는 손에 든 막대를 따로 그린다 (서 있을 때는 charge_rub 셋째 그림에 막대가 있다)
    const tip = this.rodTip();
    this.rod.setVisible(this.rodAmount > 0 && dir !== 0 && this.rubT <= 0).setPosition(tip.x, tip.y + 12);

    this.updateFeather(dt, tip);
    this.updateHill(dt);
    this.updateFairies(dt, tip);
    this.circleHint.setVisible(this.circle.active && this.curse.cursed && this.curse.inCircle(this.ian.x) && !this.isBlocked());
    this.updatePanel(tip);
  }

  // 깃털: 막대의 전기력(수평) + 실에 매달린 진자
  updateFeather(dt, tip) {
    const cfg = this.cfg, PX = this.PX, E = GAME_CONFIG.act2.electric;
    const fx = this.hang.x + Math.sin(this.theta) * this.hang.L;
    const fy = this.hang.y + Math.cos(this.theta) * this.hang.L;
    const dist = Math.hypot(tip.x - fx, tip.y - fy) / PX;
    const q = this.rodAmount > 0 ? E.rodCharge * this.rodAmount : 0;
    const touching = q !== 0 && dist <= cfg.touchDist;
    const cursed = this.curse.cursed && !this.curse.inCircle(fx);
    // 닿으면 깃털이 막대에서 같은(−) 전하를 나눠 받는다 (저주 상태에서도 — 그래서 튕긴다)
    if (touching && this.featherQ === 0) {
      this.featherQ = E.rodCharge;
      this.feather.setTexture(MANIFEST.objects.feather.states.charged);
      if (cursed) {
        // 저주: 닿는 순간에만 힘 — 깃털이 막대 반대쪽으로 튕긴다
        this.omega += Math.sign(fx - tip.x || 1) * cfg.touchKick;
        Sound.play('sfx_spark_small');
        this.showSpark(fx, fy);
        if (!this.flags.jolted) { this.flags.jolted = true; this.time.delayedCall(900, () => this.afterJolt()); }
      }
    }
    // 수평 힘 (+ = 오른쪽): 저주면 0 (떨어져 있으면 아무 일 없음)
    const F = q ? Electric.forceOn(q, tip.x / PX, this.featherQ, fx / PX, { cursed, touching }) : 0;
    this.lastForce = cursed ? 0 : F;
    this.lastDist = dist;
    const g = GAME_CONFIG.physics.g * PX;
    const alpha = (cursed ? 0 : F * cfg.forceAccel) * Math.cos(this.theta) / this.hang.L
      - g / this.hang.L * Math.sin(this.theta) - cfg.swingDamp * this.omega;
    this.omega += alpha * dt;
    this.theta = Phaser.Math.Clamp(this.theta + this.omega * dt, -1.2, 1.2);
    const nx = this.hang.x + Math.sin(this.theta) * this.hang.L, ny = this.hang.y + Math.cos(this.theta) * this.hang.L;
    this.feather.setPosition(nx, ny).setRotation(-this.theta * 0.6);
    this.thread.clear().lineStyle(2, 0xe8e2d0, 0.9).lineBetween(this.hang.x, this.hang.y, nx, ny);
  }

  showSpark(x, y) {
    const S = MANIFEST.objects.spark_small.states;
    this.spark.setPosition(x, y).setVisible(true);
    ['01', '02', '03', '04'].forEach((f, i) => this.time.delayedCall(i * 70, () => this.spark.setTexture(S[f])));
    this.time.delayedCall(300, () => this.spark.setVisible(false));
  }

  // 저주 상태에서 처음 튕긴 뒤: 가론 "바람 때문이야." → 진실의 원이 빛난다
  afterJolt() {
    if (!this.curse.cursed) return;
    this.say('garon_wind', () => {
      this.curse.setCircleActive(this.circle, true);
      this.circle.image.setAlpha(0);
      this.tweens.add({ targets: this.circle.image, alpha: 1, duration: 1200 });
      Sound.play('sfx_truth_circle_enter');
      this.message.setText('탁자 쪽 바닥에 진실의 원이 나타났다! 가 보자');
      this.say('circle_found');
    });
  }

  // 요정 전투 중: 깃털 대신 가장 가까운 요정까지 거리와 힘 (총괄지시 2막리뷰 45번)
  fairyLine(tip) {
    const B = this.battle;
    if (!B || B.done || !tip) return null;
    const live = B.fairies.filter((f) => !f.gone && !f.held);
    if (!live.length) return null;
    const PX = this.PX, E = GAME_CONFIG.act2.electric;
    const f = live.sort((a, b) => Math.abs(a.sprite.x - tip.x) - Math.abs(b.sprite.x - tip.x))[0];
    const q = this.rodAmount > 0 ? E.rodCharge * this.rodAmount : 0;
    const F = q ? Electric.forceOn(q, tip.x / PX, f.q, f.sprite.x / PX, { cursed: this.curse.cursed }) : 0;
    const away = Math.sign(f.sprite.x - tip.x);
    return `막대 끝 ↔ 가장 가까운 ${f.q > 0 ? '+' : '−'} 요정 ${(Math.abs(f.sprite.x - tip.x) / PX).toFixed(2)} m   전기력 ${Math.abs(F).toFixed(2)}${F ? (Math.sign(F) === away ? ' (밀어냄)' : ' (끌어당김)') : ''}`;
  }

  updatePanel(tip) {
    const E = GAME_CONFIG.act2.electric;
    const lines = [
      `막대 전하 ${this.rodAmount > 0 ? '−' + this.rodAmount.toFixed(2) : '없음 (C로 문지르기)'}   깃털 전하 ${this.featherQ ? '−' : '중성'}`,
      this.fairyLine(tip) || `막대 끝 ↔ 깃털 ${(this.lastDist || 0).toFixed(2)} m   전기력 ${Math.abs(this.lastForce || 0).toFixed(2)}${this.lastForce ? (this.lastForce > 0 ? ' (오른쪽)' : ' (왼쪽)') : ''}`,
    ];
    if (!this.curse.cursed) lines.push(`힘 = ${E.k} × 전하 곱 ÷ 거리² (최대 ${E.maxForce}, 멀어지면 아주 약해진다)`);
    lines.push(`전기 언덕: ${this.highSide === 'left' ? '왼쪽' : '오른쪽'} 판 높은 전위 · 돌 ${this.stones.map((s) => ({ 1: '+', '-1': '−', 0: '0' })[s.q] + (s.F ? (s.F > 0 ? '→' : '←') : '·')).join(' ') || '없음'} · 문 ${this.doors.filter((d) => d.open).length}/2`);
    this.speedPanel.setLines(lines);
  }

  // ------------------------------------------------------------------ 전기 언덕 퍼즐 (ACT2_PLAN 1단계 4번)
  // 두 금속판: 하나는 높은 전위(plus 그림 + 빛), 하나는 낮은 전위(minus). 판 사이에 놓은 대전된 돌은
  // 어디서나 같은 크기의 힘을 받는다(electric.plateForce): + 돌 → 낮은 판, − 돌 → 높은 판, 중성 돌은 그대로.
  // 판 바로 안쪽의 발판 두 개가 계단 입구의 문 두 개를 연다 — 두 문이 함께 열려야 지나갈 수 있다.
  buildHill() {
    const H = this.cfg.hill, O = MANIFEST.objects, g = this.groundY;
    this.plates = {
      left: { img: this.add.image(H.plateLeft, g - O.metal_plate.height, O.metal_plate.key).setOrigin(0, 0).setDepth(1) },
      right: { img: this.add.image(H.plateRight, g - O.metal_plate.height, O.metal_plate.key).setOrigin(0, 0).setDepth(1) },
    };
    // 금속판이 가는 선처럼 보여서, 가까이 가면 테두리가 빛나게 (총괄지시 2막리뷰 35번)
    this.plateEdge = this.add.graphics().setDepth(1);
    this.worldLayer.add(this.plateEdge);
    for (const p of Object.values(this.plates)) {
      p.glow = this.add.image(p.img.x, p.img.y, O.metal_plate_glow.key).setOrigin(0, 0).setDepth(1).setBlendMode('ADD');
      this.worldLayer.add([p.img, p.glow]);
    }
    this.highSide = 'left';
    // 전위 스위치 (2-5의 방향 스위치 그림을 같이 쓴다: left = 왼쪽 판이 높음)
    this.lever = this.makeLever({ x: H.switchX, state: 'left', labels: ['왼쪽 판이 높은 전위', '오른쪽 판이 높은 전위'] });
    // 발판 (엔진 그림 — 판 바로 안쪽 바닥)
    this.pads = [
      { x: H.innerLeft + H.padWidth / 2, on: false },
      { x: H.innerRight - H.padWidth / 2, on: false },
    ];
    this.padG = this.add.graphics().setDepth(1);
    this.worldLayer.add(this.padG);
    // 계단 입구의 문 두 개 (번개 빗장, 엔진 그림)
    this.doors = H.doorsX.map((x) => ({ x, open: false, g: this.add.graphics().setDepth(3) }));
    for (const d of this.doors) this.worldLayer.add(d.g);
    this.stones = [];
    this.pick = 'plus';
    this.hillOpen = false;
    this.applyPotential();
  }

  // 높은 전위 판에 plus 그림·빛, 낮은 판에 minus 그림·빛
  applyPotential() {
    const S = MANIFEST.objects;
    for (const [side, p] of Object.entries(this.plates)) {
      const st = side === this.highSide ? 'plus' : 'minus';
      p.img.setTexture(S.metal_plate.states[st]);
      p.glow.setTexture(S.metal_plate_glow.states[st]).setVisible(!this.curse.cursed);
    }
    if (this.lever && this.lever.state !== this.highSide) this.setLever(this.lever, this.highSide);
  }

  rightLimit() {
    return this.hillOpen && this.canLeave() ? this.worldW - 60 : this.cfg.hill.doorsX[0] - 40;
  }

  // 계단으로 나갈 수 있나: 두 문이 열리고, 요정 전투와 마법서 시험을 마친 뒤 (전에 통과했으면 바로)
  canLeave() {
    return !!Save.chapter(this.scene.key).examPassed;
  }

  pickStone(kind) {
    if (this.isBlocked()) return;
    this.pick = kind;
    Sound.play('sfx_ui_click');
    this.message.setText(`고른 돌: ${{ plus: '+ 돌', minus: '− 돌', neutral: '중성 돌' }[kind]} — 두 판 사이에서 Z로 놓기`);
  }

  // Z: 스위치 앞이면 전위 바꾸기, 두 판 사이면 고른 돌 놓기. 처리했으면 true
  tryHill() {
    if (this.isBlocked()) return false;
    const H = this.cfg.hill, x = this.ian.x;
    if (Math.abs(x - H.switchX) <= H.reach * this.PX) {
      if (this.leverBusy) return true;
      this.leverBusy = true;
      this.rubT = Math.max(this.rubT, 0.45);   // 미는 동안 걷지 않게
      this.pushLever(this.lever, (to) => {
        this.leverBusy = false;
        this.highSide = to;
        this.applyPotential();
        Sound.play('sfx_plate_charge');
        this.message.setText(`전위를 바꿨다: ${this.highSide === 'left' ? '왼쪽' : '오른쪽'} 판이 높은 전위(+)`);
      });
      return true;
    }
    if (x > H.innerLeft + 20 && x < H.innerRight - 20) {
      if (this.stones.length >= 3) { this.message.setText('판 사이에는 돌을 셋까지 — R로 치우기'); return true; }
      const S = MANIFEST.objects.charged_stone, k = 1.4;   // 작아 보여서 1.4배 (총괄지시 2막리뷰 35번)
      // 굴러가며 돌도록 가운데를 기준으로 (발 기준선 위에 반지름만큼 올려 놓는다)
      const img = this.add.image(x, this.groundY - S.height * k / 2, S.states[this.pick]).setOrigin(0.5, 0.5).setDepth(2).setScale(k);
      this.worldLayer.add(img);
      const q = { plus: 1, minus: -1, neutral: 0 }[this.pick];
      this.stones.push({ img, q, v: 0, r: S.width * k / 2 });
      Sound.play('sfx_step_stone');
      return true;
    }
    return false;
  }

  clearStones() {
    for (const s of this.stones) s.img.destroy();
    this.stones = [];
  }

  updateHill(dt) {
    const H = this.cfg.hill;
    for (const s of this.stones) {
      // 저주(진실의 원 밖): 떨어져 있으면 힘이 없다 → 돌은 그대로. 해방: 판 사이 어디서나 같은 힘
      const F = this.curse.cursed ? 0 : Electric.plateForce(s.q, this.highSide);
      s.F = F;
      s.v += F * H.stoneAccel * dt;
      let x = s.img.x + s.v * dt;
      const lo = H.innerLeft + s.r, hi = H.innerRight - s.r;
      // 벽에 닿는 순간에만 부딪힘 소리 — 힘을 받은 채 벽에 기대 있으면 매 프레임 다시 틀어 '지지직' 잡음이 났다 (총괄지시 61번)
      if (x <= lo || x >= hi) { x = Phaser.Math.Clamp(x, lo, hi); if (s.v && !s.atWall) Sound.play('sfx_push_impact'); s.v = 0; s.atWall = true; }
      else s.atWall = false;
      s.img.x = x;
      s.img.rotation += (s.v * dt) / s.r;
    }
    // 발판: 돌이 올라가 있으면 켜짐
    this.pads.forEach((p, i) => {
      const on = this.stones.some((s) => Math.abs(s.img.x - p.x) <= H.padWidth / 2 + 4);
      if (on && !p.on) Sound.play('sfx_touch_on');
      p.on = on;
      this.doors[i].open = on;
    });
    // 교사용: 판 사이 돌마다 받는 힘의 방향 화살표 (중성 돌은 · 표시)
    this.arrowG.clear();
    if (this.showArrows) {
      for (const s of this.stones) {
        const y = s.img.y - s.r - 26, x = s.img.x;
        if (!s.F) { this.arrowG.fillStyle(0xffffff, 0.8).fillCircle(x, y, 5); continue; }
        const d = Math.sign(s.F), len = 46;
        this.arrowG.lineStyle(5, 0x9fe0ff, 1).lineBetween(x - d * len / 2, y, x + d * len / 2, y)
          .fillStyle(0x9fe0ff, 1).fillTriangle(x + d * (len / 2 + 12), y, x + d * len / 2, y - 9, x + d * len / 2, y + 9);
      }
    }
    this.padG.clear();
    for (const p of this.pads) {
      this.padG.fillStyle(p.on ? 0x9fe0ff : 0x5a4a3a, 1).fillRect(p.x - H.padWidth / 2, this.groundY - 6, H.padWidth, 6);
    }
    // 문(번개 빗장): 닫혀 있으면 빛나는 막대 3줄
    const t = this.time.now / 1000;
    for (const d of this.doors) {
      d.g.clear();
      if (d.open && this.hillOpen) continue;
      const a = d.open ? 0.25 : 0.85;
      for (let k = 0; k < 3; k++) {
        const y0 = this.groundY - 380 + k * 6;
        d.g.lineStyle(4, 0x9fe0ff, a * (0.7 + 0.3 * Math.sin(t * 9 + k))).lineBetween(d.x + (k - 1) * 10, y0, d.x + (k - 1) * 10, this.groundY);
      }
    }
    const both = this.doors.every((d) => d.open);
    if (both && !this.hillOpen) {
      this.hillOpen = true;
      Sound.play('sfx_door_electric_open');
      Save.setChapter(this.scene.key, { hillDone: true });
      if (Save.chapter(this.scene.key).examPassed) this.message.setText('두 문이 함께 열렸다! 계단으로 올라가자').setColor(UIKit.SKY);
      else this.time.delayedCall(800, () => this.startBattle());
    }
  }

  // ------------------------------------------------------------------ 불꽃 요정 전투 (ACT2_PLAN 1단계 5번)
  // 문지른 막대(− 전하)를 가까이 대면 electric.js 의 힘으로:
  //   − 요정은 닿지 않고도 밀려난다 → 빠르게(crashSpeed 넘게) 금속판에 부딪히면 쓰러진다
  //   + 요정은 끌려와 막대에 붙잡힌다 → X로 치면 사라진다
  //   저주 상태에서는 막대로 직접 때려야(X) 한다. 막대의 전하는 요정에게 힘을 주는 동안 줄어든다 → C로 다시 문지르기
  startBattle() {
    if (this.battle) return;
    this.battle = { wave: -1, fairies: [] };
    this.say('fairies_arrive', () => { this.introKey('X', '막대로 치기 — 가까이 온 + 요정을 쳐 낸다'); this.nextWave(); });
    this.setMusicMode('battle');
  }

  nextWave() {
    const B = this.battle, F = this.cfg.fairies;
    B.wave += 1;
    if (B.wave >= F.waves.length) { this.endBattle(); return; }
    F.waves[B.wave].forEach((kind, i) => {
      const id = kind === 'plus' ? 'spark_fairy_positive' : 'spark_fairy_negative';
      const sprite = Characters.create(this, id, F.spawnX + i * 90, this.groundY - F.flyY, 'float').setDepth(5);
      sprite.setScale(sprite.scaleX * GAME_CONFIG.act2.fairyScale);
      this.worldLayer.add(sprite);
      this.attachChargeSign(sprite, kind === 'plus' ? 1 : -1);
      B.fairies.push({ sprite, q: kind === 'plus' ? 1 : -1, v: 0, held: false, cool: 1 + i * 0.5, hits: 0, gone: false, t: Math.random() * 6 });
    });
    this.message.setText(`불꽃 요정 ${B.wave + 1}/${F.waves.length}무리 — ${ACT2_KEYS.rub.label} · 막대를 가까이 · X 치기`).setColor('#ffe08a');
  }

  endBattle() {
    this.battle.done = true;
    Sound.stopAllLoops();   // 전투 중 켜진 반복 소리가 시험·다음 층까지 남지 않게 (총괄지시 61번)
    this.setMusicMode(null);
    Save.setChapter(this.scene.key, { fairiesDone: true });
    this.say('fairies_done', () => {
      this.message.setText('불꽃 요정을 모두 물리쳤다!').setColor(UIKit.SKY);
      this.examBtn = this.showExamIntro(() => this.startExam());
    });
  }

  // 2-1의 마지막: 마법서 시험을 다 맞히면 계단으로 (1막처럼 시험 뒤에 다음 장)
  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      if (this.examBtn) this.examBtn.setVisible(false);
      Save.setChapter(this.scene.key, { examPassed: true });
      this.message.setText('2-1 전기력과 전기장 — 마법서 시험 통과! 계단으로 올라가자').setColor(UIKit.SKY);
    });
  }

  // X: 붙잡힌 + 요정을 치거나, 저주 상태에서는 가까운 요정을 직접 때린다
  strike() {
    if (this.isBlocked() || !this.battle || this.battle.done) return;
    const F = this.cfg.fairies, PX = this.PX;
    Characters.play(this.ian, 'attack_light', false);
    this.rubT = Math.max(this.rubT, 0.35);
    Sound.play('sfx_spark_small');
    for (const f of this.battle.fairies) {
      if (f.gone) continue;
      const d = Math.abs(f.sprite.x - this.ian.x) / PX;
      if (f.held) { this.defeat(f); this.rodAmount = Math.max(0, this.rodAmount - GAME_CONFIG.act2.electric.rodLossPerUse); continue; }   // 막대로 쳐도(닿음) 전하가 준다
      if (this.curse.cursed && d <= F.hitRange) {
        f.hits += 1;
        Sound.play('sfx_spark_fairy_hit');
        if (f.hits >= F.hitsCursed) this.defeat(f);
      }
    }
  }

  defeat(f) {
    if (f.gone) return;
    f.gone = true;
    f.held = false;
    Characters.play(f.sprite, 'vanish', false);
    Sound.play('sfx_spark_fairy_vanish');
    f.sprite.once('animationcomplete', () => f.sprite.destroy());
  }

  updateFairies(dt, tip) {
    const B = this.battle;
    if (!B || B.done || B.wave < 0) return;
    const F = this.cfg.fairies, PX = this.PX, E = GAME_CONFIG.act2.electric, H = this.cfg.hill;
    const q = this.rodAmount > 0 ? E.rodCharge * this.rodAmount : 0;
    let pushing = false;
    for (const f of B.fairies) {
      if (f.gone) continue;
      const s = f.sprite;
      f.t += dt;
      s.y = this.groundY - F.flyY + Math.sin(f.t * 3) * 8;
      if (f.held) {                                  // 붙잡힌 + 요정: 막대 끝에 붙어 있다
        s.x = tip.x + (this.ian.flipX ? -1 : 1) * 24;
        continue;
      }
      // 막대의 전기력 (저주: 닿아야만 → 0)
      const Fx = q ? Electric.forceOn(q, tip.x / PX, f.q, s.x / PX, { cursed: this.curse.cursed }) : 0;
      if (Fx) pushing = true;
      f.v += Fx * F.accel * dt;
      f.v -= f.v * F.drag * dt;
      // 이안 쪽으로 천천히 다가온다 (밀려나는 동안은 덜)
      const toIan = Math.sign(this.ian.x - s.x);
      const nx = s.x + (f.v + toIan * F.approach * PX * (Math.abs(f.v) < 40 ? 1 : 0.2)) * dt;
      // 벽(두 금속판, 계단 입구 벽)에 빠르게 부딪히면 쓰러지고, 느리면 튕겨 돌아온다 (손이 닿지 않는 곳으로 가지 않게)
      const wall = Math.abs(f.v) < 1 ? undefined   // 밀리거나 끌리지 않고 떠다닐 때는 벽과 상관없다
        : [H.plateLeft + 9, H.plateRight + 9, F.wallX].find((px) => (s.x - px) * (nx - px) <= 0 && s.x !== px && Math.sign(f.v) === Math.sign(px - s.x));
      if (wall !== undefined) {
        if (Math.abs(f.v) / PX >= F.crashSpeed) { this.showSpark(wall, s.y); Sound.play('sfx_spark_fairy_hit'); this.defeat(f); continue; }
        f.v = -f.v * 0.3;
      } else {
        s.x = Phaser.Math.Clamp(nx, 60, F.wallX);
      }
      // + 요정은 막대 가까이 끌려오면 붙잡힌다
      const d = Math.hypot(s.x - tip.x, s.y - tip.y) / PX;
      if (!this.curse.cursed && f.q > 0 && q && d <= F.holdDist) {
        // + 요정이 막대에 붙으면(닿으면) 막대 전하 일부가 옮겨 간다 (총괄지시 2막리뷰 36번)
        f.held = true; f.v = 0; Characters.play(s, 'pulled', false); Sound.play('sfx_attract_snap');
        this.rodAmount = Math.max(0, this.rodAmount - E.rodLossPerUse);
        continue;
      }
      // 그림: 밀리는 중 / 끌리는 중 / 떠다님
      const away = Math.sign(s.x - tip.x);
      const anim = Math.abs(f.v) > 60 ? (Math.sign(f.v) === away ? 'pushed' : 'pulled') : (f.cool < 0.4 ? 'attack' : 'float');
      if (s.currentAction !== anim) Characters.play(s, anim);
      s.setFlipX(this.ian.x > s.x);
      // 공격: 가까우면 일정 간격으로
      f.cool -= dt;
      if (f.cool <= 0 && Math.abs(s.x - this.ian.x) / PX <= F.attackRange) {
        f.cool = F.attackEvery;
        this.ianHp = Math.max(0, (this.ianHp ?? 1) - F.damage);
        if (this.hud) this.hud.set('health', this.ianHp);
        Sound.play('sfx_ian_hurt');
        if (this.ianHp <= 0) { this.battleLost(); return; }
      }
    }
    // 이 무리를 다 물리치면 잠시 뒤 다음 무리 (한 번만 예약)
    if (!B.waiting && B.fairies.length && B.fairies.every((f) => f.gone)) {
      B.waiting = true;
      this.time.delayedCall(800, () => { B.waiting = false; B.fairies = []; this.nextWave(); });
    }
  }

  // 체력이 다하면: 잠시 어두워졌다가 요정 무리를 처음부터 (체력 회복)
  battleLost() {
    const B = this.battle;
    for (const f of B.fairies) if (!f.gone) { f.gone = true; f.sprite.destroy(); }
    B.fairies = [];
    B.wave = -1;
    this.ianHp = 1;
    if (this.hud) this.hud.set('health', 1);
    this.message.setText('이안이 쓰러졌다… 요정 무리를 처음부터').setColor('#ff9a9a');
    this.cameras.main.flash(400, 40, 0, 0);
    this.time.delayedCall(1500, () => this.nextWave());
  }
}
window.LabScene = LabScene;

// ------------------------------------------------------------------ 진실의 원: 진공 유리관 실험 (총괄지시 2번의 순서)
// ① Space: 대전된 막대를 유리관 위 금속 고리(뚜껑)에 대면, 고리와 이어진 깃털이 같은 − 전하를 나눠 받는다
// ② ← →: 막대를 유리관 옆으로 가까이 — 공기가 없는 유리관 안에서도 깃털이 닿기 전에 밀려난다(가까울수록 강하게)
// 힘은 electric.js (진실의 원 안이라 진짜 법칙). 화면 배율: 1m = 200px
class TubeLab {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    this.M = 200;                                   // 이 화면의 1m (px)
    const S = 4.5, T = MANIFEST.objects.vacuum_tube;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    this.cx = 960;
    const bottom = 980, top = bottom - T.height * S;
    this.glassL = this.cx - T.pivot.x * S + 24 * S;  // 유리 안쪽 (그림에서 잰 값: x 24~49, y 54~142)
    this.glassR = this.cx - T.pivot.x * S + 49 * S;
    this.outerL = this.cx - T.pivot.x * S + 20 * S;  // 막대가 더 들어갈 수 없는 유리 바깥
    this.capY = top + 30 * S;
    this.hangY = top + 52 * S;
    this.featherY = this.hangY + 240;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 70, '진실의 원 — 진공 유리관 실험', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    this.help = UIKit.text(scene, 960, 128, '', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5);
    c.add(this.help);
    c.add(scene.add.image(this.cx, bottom, T.key).setOrigin(T.pivot.x / T.width, T.pivot.y / T.height).setScale(S));
    c.add(UIKit.text(scene, this.cx + 190, top + 300, '공기를 뺀\n유리관', { fontSize: '24px', color: '#cfe3f5', align: 'center' }).setOrigin(0, 0.5));
    // 거리 눈금 (유리관 가운데 = 깃털에서 m)
    for (let d = 0.5; d <= 2.0; d += 0.5) {
      const x = this.cx - d * this.M;
      c.add(scene.add.rectangle(x, this.featherY + 120, 3, 16, 0xf3ead6).setOrigin(0.5, 0));
      c.add(UIKit.text(scene, x, this.featherY + 140, `${d}m`, { fontSize: '20px' }).setOrigin(0.5, 0));
    }
    this.thread = scene.add.graphics();
    this.glow = scene.add.ellipse(this.cx, this.featherY, 110, 60, 0x9fe0ff, 0.35).setVisible(false);
    const F = MANIFEST.objects.feather;
    this.feather = scene.add.image(this.cx, this.featherY, F.states.normal).setScale(1.2);
    const R = MANIFEST.objects.amber_rod;
    this.rod = scene.add.image(0, 0, R.key).setOrigin(1, 0.5).setScale(2.5);   // 막대 끝 = 오른쪽 끝
    this.arrow = scene.add.graphics();
    const sp = MANIFEST.objects.spark_small;
    this.spark = scene.add.image(0, 0, sp.states['01']).setScale(1.5).setVisible(false);
    this.info = UIKit.text(scene, 960, 170, '', { fontSize: '28px', align: 'center', lineSpacing: 8, backgroundColor: '#061018' }).setOrigin(0.5, 0).setDepth(1);   // 제목 아래 (유리관과 겹치지 않게)
    c.add([this.thread, this.glow, this.feather, this.rod, this.arrow, this.spark, this.info]);
    const kb = scene.input.keyboard;
    kb.on('keydown-SPACE', () => this.touchRing());
    kb.on('keydown-ESC', () => this.close());
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT' });
    scene.labUpdate((t, delta) => this.update(Math.min(delta, 50) / 1000));
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.container.setVisible(true);
    this.featherQ = 0;
    this.feather.setTexture(MANIFEST.objects.feather.states.normal);
    this.glow.setVisible(false);
    this.disp = 0;
    this.tipX = this.cx - 1.6 * this.M;
    this.anim = null;
    this.holdT = 0;
    this.help.setText('Space: 문지른 막대를 유리관 위 금속 고리에 대기    Esc: 닫기');
    this.info.setText('막대(− 전하)를 유리관 위 금속 고리에 대 보자. 고리는 안의 깃털과 이어져 있다.').setColor('#ffe08a');
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  // ① 막대를 고리에 댄다 (게임 시계로 위로 갔다가 돌아온다)
  touchRing() {
    if (!this.isOpen || this.anim || this.featherQ) return;
    this.anim = { t: 0, from: { x: this.tipX, y: this.featherY }, to: { x: this.cx - 30, y: this.capY } };
  }

  update(dt) {
    if (!this.isOpen) return;
    const E = GAME_CONFIG.act2.electric;
    let rodY = this.featherY;
    if (this.anim) {
      const a = this.anim;
      a.t += dt;
      const k = a.t < 0.8 ? a.t / 0.8 : Math.max(0, 1 - (a.t - 1.4) / 0.8);   // 0.8초 올라가 0.6초 대고 0.8초 돌아옴
      const e = k * k * (3 - 2 * k);
      this.tipX = a.from.x + (a.to.x - a.from.x) * e;
      rodY = a.from.y + (a.to.y - a.from.y) * e;
      if (a.t >= 0.8 && !a.charged) {
        a.charged = true;
        this.featherQ = E.rodCharge;
        this.feather.setTexture(MANIFEST.objects.feather.states.charged);
        this.glow.setVisible(true);
        Sound.play('sfx_spark_small');
        this.flash(a.to.x, a.to.y);
        this.info.setText('깃털이 − 전하를 띠었다 (금속 고리를 거쳐 막대의 전하를 나눠 받았다)').setColor(UIKit.SKY);
      }
      if (a.t >= 2.2) {
        this.anim = null;
        this.help.setText('← → 막대를 유리관 옆으로 천천히 가까이 대 보기    Esc: 닫기');
      }
    } else if (this.featherQ) {
      const dir = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
      this.tipX = Phaser.Math.Clamp(this.tipX + dir * 0.6 * this.M * dt, this.cx - 2.2 * this.M, this.outerL);
    }
    // 깃털이 받는 힘 (− 막대 ↔ − 깃털: 밀어냄) — 유리관 안에서 기울어진 만큼 보이게
    const dist = (this.cx + this.disp - this.tipX) / this.M;
    const F = this.anim ? 0 : Electric.forceOn(E.rodCharge, this.tipX / this.M, this.featherQ, (this.cx + this.disp) / this.M);
    this.lastF = F;
    this.lastDist = dist;
    const room = (this.glassR - this.glassL) / 2 - 34;
    const target = Phaser.Math.Clamp(F * 10, -room, room);
    this.disp += (target - this.disp) * Math.min(1, dt * 5);
    const fx = this.cx + this.disp;
    this.feather.setPosition(fx, this.featherY).setRotation(this.disp / 120);
    this.glow.setPosition(fx, this.featherY);
    this.thread.clear().lineStyle(2, 0xe8e2d0, 0.9).lineBetween(this.cx, this.hangY, fx, this.featherY - 8);
    this.rod.setPosition(this.tipX, rodY);
    this.arrow.clear();
    if (Math.abs(F) > 0.05) {
      const len = Math.min(140, Math.abs(F) * 40), y = this.featherY - 60;
      this.arrow.lineStyle(6, 0x9fe0ff, 1).lineBetween(fx, y, fx + len, y)
        .fillStyle(0x9fe0ff, 1).fillTriangle(fx + len + 14, y, fx + len, y - 10, fx + len, y + 10);
    }
    if (this.featherQ && !this.anim && !this.done) {
      this.info.setText(`막대 끝 ↔ 깃털 ${dist.toFixed(2)} m    밀어내는 힘 ${Math.abs(F).toFixed(2)}`
        + (dist <= 0.9 ? '\n닿지 않았는데 밀려난다! 유리관 안엔 공기가 없으니 바람 탓이 아니다' : '\n더 가까이 대 보자 — 가까울수록 힘이 세다')).setColor(UIKit.SKY);
      // 충분히 가까이(0.9m 안)에서 1.5초 동안 밀려난 모습을 보면 실험 끝
      this.holdT = dist <= 0.9 && F > 0.5 ? this.holdT + dt : 0;
      if (this.holdT >= 1.5) {
        this.done = true;
        Sound.play('sfx_repel_soft');
        UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
      }
    }
  }

  flash(x, y) {
    const S = MANIFEST.objects.spark_small.states;
    this.spark.setPosition(x, y).setVisible(true);
    ['01', '02', '03', '04'].forEach((f, i) => this.scene.time.delayedCall(i * 70, () => this.spark.setTexture(S[f])));
    this.scene.time.delayedCall(320, () => this.spark.setVisible(false));
  }
}
window.TubeLab = TubeLab;
