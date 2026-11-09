// 2-2 탑 2층 등불의 방 (ACT2_PLAN 2단계) — 배경 tower_f2 (1920px)
//
// 이번 묶음: 방 배치 + 회로판 화면(부품 끼우기) + 등불 고리 밝기 + 계단.
//   벽의 회로판 앞에서 Z → 회로판 화면(직렬판 / 병렬판을 바꿔 볼 수 있음). 등불·전선·저항 수정을 빈 칸에 끼운다.
//   계산은 js/physics/act2/circuit.js (12V, 등불 6Ω, 5A 넘으면 퓨즈 끊어짐, 4A 이상 달아오름, 합선).
//   방의 등불 고리 1~3 = 회로판 칸 1~3의 등불 밝기, 고리 4 = 계단 등불 (등불 전력 합 48W 이상 + 끊어지지 않으면 켜지고 계단이 나타남).
//   저주: 등불을 이을수록 모두 더 밝아지고 끊어지지 않는다 — 그래도 계단 등불은 반응하지 않는다 (거짓 빛)
//   (저주 이야기·진실의 원 실험·번개 지팡이 전투·시험은 다음 묶음)
class LampScene extends ChapterScene {
  constructor() {
    super('Ch2_2');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act2.ch2_2;
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
    // 벽의 회로판 (지금 판 모양을 보여 준다)
    const B = O.circuit_board;
    this.board = place('circuit_board', (cfg.boardX[0] + cfg.boardX[1]) / 2, 420, -1, 'series');
    if (O.battery_cell) {   // 벽 회로판의 전지 칸 (총괄지시 2막리뷰 28번) — 그림 몸체 가운데(60, 67)를 칸 가운데에
      const sl = B.slot_centers_by_state.series.mana_stone, bc = O.battery_cell;
      const cell = this.add.image(this.board.x - B.pivot.x + sl[0], 420 - B.pivot.y + sl[1], bc.key).setOrigin(60 / bc.width, 67 / bc.height).setScale(0.55).setDepth(-0.5);
      this.worldLayer.add(cell);
    }
    // 등불 고리 4개: 등불 몸체 + 빛 번짐 (같은 기준점)
    this.lamps = cfg.lampRings.map(([x, y]) => ({
      glow: place('lamp_glow', x, y, -1, 'dim').setVisible(false).setBlendMode('ADD'),
      body: place('lamp', x, y, -1, 'off'),
      level: 'off',
    }));
    // 나타나는 계단 (처음엔 없음)
    this.stairs = place('stairs_f2', cfg.stairs.x, this.groundY, -2, '01').setVisible(false);
    this.stairsShown = false;
    // 진실의 원 (실험은 다음 묶음)
    this.circle = this.curse.addTruthCircle({ centerX: cfg.circleX, groundY: this.groundY, diameter: 3.6, domeHeight: 2.6 });
    this.curse.setCircleActive(this.circle, !this.curse.cursed);

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, this.groundY).setDepth(4);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, this.groundY).setDepth(3);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });

    // 회로: 판 모양과 칸 3개 (처음엔 비어 있다)
    this.circuit = { board: 'series', slots: [null, null, null] };
    this.panel = new CircuitPanel(this, this.uiLayer);
    this.lab = new MeterLab(this, this.uiLayer);

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT', act: 'Z', fire: 'X', mode: ACT2_KEYS.staffMode.key });
    kb.addCapture(['Z', 'X', ACT2_KEYS.staffMode.key]);
    this.keys.mode.on('down', () => this.toggleStaff());
    this.bolt = this.add.graphics().setDepth(6);
    this.worldLayer.add(this.bolt);
    this.keys.act.on('down', () => this.interact());
    this.flags = {};
    this.solve();
  }

  isBlocked() {
    return super.isBlocked() || (this.panel && this.panel.isOpen) || (this.lab && this.lab.isOpen);
  }

  onReady() {
    this.addPrompts();
    this.uiLayer.add(UIKit.text(this, 1900, 1070, '← → 걷기   Z 회로판 (마우스로 부품 끼우기)   X 번개   Q 지팡이 직렬/병렬   M 마법서', {
      fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1100, 300);   // 등불 고리(천장 아래 y 135~270)를 가리지 않게
    this.message.setText(this.curse.cursed ? '벽의 회로판 앞에서 Z — 등불을 이어 계단 등불을 켜자' : '');   // 해방된 장에 다시 들어오면 저주 때 안내를 띄우지 않는다 (총괄지시 2막리뷰 44번 — 목표 줄이 해방 상태 안내)
    this.teacherExtra = {
      label: () => '등불마다 전류·전력 ' + (this.showDetail ? '숨기기' : '보이기'),
      toggle: () => { this.showDetail = !this.showDetail; },
    };
    this.showDetail = true;
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 등불을 많이 이을수록 모두 더 밝아지고, 퓨즈는 절대 끊어지지 않는다?'
      : '진짜 법칙: 전류 I = V ÷ R, 전력 P = V × I — 직렬은 어두워지고, 병렬은 밝지만 전체 전류가 커진다';
  }

  onCurseChanged() {
    super.onCurseChanged();
    if (this.circuit) this.solve();
  }

  addPrompts() {
    const c = this.cfg;
    this.addPrompt({ key: 'Z', text: '회로판 열기', x: (c.boardX[0] + c.boardX[1]) / 2, range: (c.boardX[1] - c.boardX[0]) / 2 + 60 });
    this.addPrompt({ key: 'Z', text: '전류계·전력계 실험', x: () => this.cfg.circleX * this.PX, range: 1.8 * this.PX,
      when: () => this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x) });
  }

  interact() {
    if (this.isBlocked()) return;
    const x = this.ian.x;
    // 진실의 원 안(저주 상태): 전류계·전력계 실험
    if (this.curse.cursed && this.circle.active && this.curse.inCircle(x)) {
      const open = () => this.lab.open(() => this.onLabDone());
      if (this.flags.labTalked) { open(); return; }
      this.flags.labTalked = true;
      this.say('lab_start', open);
      return;
    }
    if (x >= this.cfg.boardX[0] - 60 && x <= this.cfg.boardX[1] + 60) this.panel.open();
  }

  // ------------------------------------------------------------------ 회로 계산 → 방의 등불·계단
  solve() {
    const c = this.circuit;
    const prev = this.result;
    const r = this.curse.cursed ? Circuit.solveCursed(c.board, c.slots) : Circuit.solve(c.board, c.slots);
    this.result = r;
    this.board.setTexture(MANIFEST.objects.circuit_board.states[c.board]);
    // 등불 고리 1~3 = 칸 1~3 (등불이 꽂힌 칸만)
    r.parts.forEach((p, i) => this.setLamp(i, p.part === 'lamp' ? p.level : 'off'));
    // 고리 4 = 계단 등불
    this.setLamp(3, r.stairs ? 'bright' : 'off');
    // 소리: 끊어짐·달아오름
    if (r.broken && !(prev && prev.broken)) Sound.play('sfx_wire_snap');
    Sound.stopLoop('sfx_wire_heat');   // 4~5 A(정답 병렬 2개 포함)는 경고음 없이 퓨즈 옆 노란 글만 (총괄지시 2막리뷰 30번)
    if (r.short && r.broken && !(prev && prev.short)) this.onShort();
    // 저주: 등불을 둘 이상 이어 보면 (회로판을 닫은 뒤) 가론의 자랑 → 진실의 원
    if (r.cursed && c.slots.filter((p) => p === 'lamp').length >= 2 && !this.flags.garonSeries) this.flags.seriesPending = true;
    if (r.stairs && !this.stairsShown) this.showStairs();
    this.updatePanelText();
    if (this.panel) this.panel.refresh();
  }

  setLamp(i, level) {
    const L = this.lamps[i], O = MANIFEST.objects;
    if (L.level === level) return;
    const rank = { off: 0, dim: 1, normal: 2, bright: 3 };
    if (rank[level] > rank[L.level]) Sound.play(level === 'bright' ? 'sfx_lamp_on_bright' : 'sfx_lamp_on_dim');
    else if (level === 'off') Sound.play('sfx_lamp_off');
    L.level = level;
    L.body.setTexture(O.lamp.states[level]);
    LampScene.setGlow(L.glow, level);
  }

  // 빛 번짐: 밝기 단계마다 그림 + 크기·진하기 (방 등불·회로판 화면·진실의 원 계기판이 같이 쓴다, 총괄지시 62번)
  static setGlow(glow, level, baseScale = 1) {
    const st = GAME_CONFIG.act2.ch2_2.lampGlow[level];
    glow.setVisible(!!st);
    if (!st) return;
    glow.setTexture(MANIFEST.objects.lamp_glow.states[level]).setScale(baseScale * st.scale).setAlpha(st.alpha);
  }

  onShort() {
    this.message.setText('합선! 전선만 이은 길로 전류가 한꺼번에 몰려 퓨즈가 끊어졌다').setColor('#ff9a9a');
    if (!this.flags.shortTalk) { this.flags.shortTalk = true; this.panel.close(); this.say('short_warn'); }
  }

  // 계단 등불이 켜지면 계단이 4단계로 나타난다 (게임 시계)
  showStairs() {
    this.stairsShown = true;
    const S = MANIFEST.objects.stairs_f2.states;
    this.stairs.setVisible(true);
    ['01', '02', '03', '04'].forEach((f, i) => this.time.delayedCall(i * 250, () => this.stairs.setTexture(S[f])));
    Sound.play('sfx_door_electric_open');
    this.message.setText('계단 등불이 켜지고 계단이 나타났다!').setColor(UIKit.SKY);
    Save.setChapter(this.scene.key, { stairsOpen: true });
    if (!Save.chapter(this.scene.key).examPassed) this.time.delayedCall(1300, () => this.startBattle());
  }

  updatePanelText() {
    const r = this.result;
    if (!this.speedPanel || !r) return;
    const name = { lamp: '등불', wire: '전선', resistor: '저항 수정' };
    const lines = [];
    if (r.cursed) {
      lines.push(`등불 ${this.circuit.slots.filter((p) => p === 'lamp').length}개 — 이을수록 더 밝다?  (계단 등불은 꺼져 있다)`);
    } else {
      lines.push(`${this.circuit.board === 'series' ? '직렬판' : '병렬판'}   전체 전류 ${r.wouldBe.toFixed(2)} A`
        + (r.broken ? ' → 5 A 넘음, 퓨즈 끊어짐' : r.hot ? ' (퓨즈 한계 5 A에 가깝다)' : r.open ? ' (회로가 끊김)' : ''));
      if (this.showDetail) {
        r.parts.forEach((p, i) => {
          if (p.part) lines.push(`칸 ${i + 1} ${name[p.part]}: ${p.amp.toFixed(2)} A, ${p.watt.toFixed(1)} W`);
        });
      }
      lines.push(`등불 전력 합 ${r.lampWatt.toFixed(1)} W / 계단 ${GAME_CONFIG.act2.circuit.stairW} W`);
    }
    this.speedPanel.setLines(lines);
  }

  // ------------------------------------------------------------------ 매 프레임
  // 실험 뒤: 깨달음 동작 → 깨달음 대사 → 저주 풀기(해금 카드 08 + 마법서 8장) → 대사
  onLabDone() {
    this.realizing = true;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.message.setText('이제 진짜 법칙대로! 회로판(Z)에서 계단 등불을 켜 보자').setColor(UIKit.SKY);
        this.say('after_free');
      }));
    });
  }

  lightCircle() {
    this.curse.setCircleActive(this.circle, true);
    this.circle.image.setAlpha(0);
    this.tweens.add({ targets: this.circle.image, alpha: 1, duration: 1200 });
    Sound.play('sfx_truth_circle_enter');
    this.message.setText('회로판 옆 바닥에 진실의 원이 나타났다! 가 보자');
  }

  updateWorld(dt) {
    const cfg = this.cfg, PX = this.PX;
    if (this.flags.seriesPending && !this.panel.isOpen && !this.flags.garonSeries && this.curse.cursed) {
      this.flags.garonSeries = true;
      this.flags.seriesPending = false;
      this.say('garon_series', () => { this.lightCircle(); this.say('circle_found'); });
      return;
    }
    const dir = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    const right = this.stairsShown && this.canLeave() ? this.worldW - 60 : cfg.stairs.x - 220;
    this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * cfg.walkSpeed * PX * dt, 60, right);
    if (dir) this.ian.setFlipX(dir < 0);
    if (!this.realizing) Characters.play(this.ian, dir ? 'walk' : 'idle');
    this.updateBattle(dt);
    // 계단으로 올라가면 다음 방 (전투와 마법서 시험을 마친 뒤)
    if (this.stairsShown && this.canLeave() && this.ian.x >= cfg.stairs.exitX && !this.flags.leaving) {
      this.leaveRoom({ x: cfg.stairs.exitX });
    }
    const nearBoard = this.ian.x >= cfg.boardX[0] - 60 && this.ian.x <= cfg.boardX[1] + 60;
    if (nearBoard && !this.flags.boardHint) { this.flags.boardHint = true; this.message.setText('Z: 회로판 열기'); }
  }

  // ------------------------------------------------------------------ 번개 지팡이 전투 (ACT2_PLAN 2단계 7번)
  // 지팡이(12V)에 저항 수정 2개(각 6Ω): Q로 직렬(12Ω, 1A, 12W, 가는 번개) ↔ 병렬(3Ω, 4A, 48W, 굵은 번개).
  // 피해·마력 소모·과열은 전력에 비례(circuit.staff().power = 1 또는 4). 불꽃 요정 무리(약함) 다음 철갑 기사(단단함, 갑옷 회복).
  canLeave() {
    return !!Save.chapter(this.scene.key).examPassed;
  }

  toggleStaff() {
    if (this.isBlocked() || !this.battle) return;
    this.staffMode = this.staffMode === 'parallel' ? 'series' : 'parallel';
    Sound.play('sfx_switch_flip');
    this.updateBattleText();
  }

  startBattle() {
    if (this.battle) return;
    const B = this.cfg.battle;
    this.battle = { enemies: [], wave: 0, done: false };
    this.staffMode = 'series';
    this.mana = B.manaMax;
    // 전투 중에는 마력 게이지가 "지팡이 전지" (총괄지시 2막리뷰 31번 — 굵은 번개는 전지를 4배 빨리 쓴다)
    if (!this.cellLabel) {
      this.cellLabel = UIKit.text(this, 250, 124, '지팡이 전지', { fontSize: '18px', fontStyle: 'bold', color: '#ffffff', stroke: '#0b1320', strokeThickness: 4 })
        .setOrigin(0.5).setScrollFactor(0).setDepth(310);   // HUD(300) 위
      this.uiLayer.add(this.cellLabel);
    }
    this.cellLabel.setVisible(true);
    this.heat = 0;
    this.lockT = 0;
    this.fireT = 0;
    this.ianHp = 1;
    this.setMusicMode('battle');
    this.say('battle_start', () => {
      this.introKey('X', '번개 지팡이 — 누르고 있으면 계속 쏜다');
      this.time.delayedCall(3300, () => this.introKey(ACT2_KEYS.staffMode.key, '지팡이 저항 수정 직렬 ↔ 병렬 바꾸기'));
      this.spawnWave();
    });
  }

  spawnWave() {
    const B = this.cfg.battle, BT = this.battle;
    BT.wave += 1;
    if (BT.wave === 1) {
      for (let i = 0; i < B.fairies.count; i++) {
        const id = i % 2 ? 'spark_fairy_positive' : 'spark_fairy_negative';
        const s = Characters.create(this, id, B.enemyStartX + i * B.fairies.gap, this.groundY - 170, 'float').setDepth(5);
        s.setScale(s.scaleX * GAME_CONFIG.act2.fairyScale);
        this.attachChargeSign(s, i % 2 ? 1 : -1);
        this.worldLayer.add(s);
        BT.enemies.push({ s, kind: 'fairy', hp: B.fairies.hp, max: B.fairies.hp, speed: B.fairies.speed, cool: 1 + i * 0.4, t: i });
      }
    } else if (BT.wave === 2) {
      const s = Characters.create(this, 'iron_knight', B.enemyStartX, this.groundY, 'walk').setDepth(5);
      this.worldLayer.add(s);
      BT.enemies.push({ s, kind: 'knight', hp: B.knight.hp, max: B.knight.hp, speed: B.knight.speed, cool: 1.5, t: 0 });
      this.time.delayedCall(1500, () => this.say('knight_tip'));
    } else {
      this.endBattle();
      return;
    }
    this.updateBattleText();
  }

  endBattle() {
    this.battle.done = true;
    Sound.stopAllLoops();   // 전투 중 켜진 반복 소리가 시험·다음 층까지 남지 않게 (총괄지시 61번)
    if (this.cellLabel) this.cellLabel.setVisible(false);
    this.bolt.clear();
    this.setMusicMode(null);
    Save.setChapter(this.scene.key, { battleDone: true });
    this.say('battle_done', () => {
      this.message.setText('적을 모두 물리쳤다!').setColor(UIKit.SKY);
      this.examBtn = this.showExamIntro(() => this.startExam());
    });
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      if (this.examBtn) this.examBtn.setVisible(false);
      Save.setChapter(this.scene.key, { examPassed: true });
      this.message.setText('2-2 전류와 전력 — 마법서 시험 통과! 계단으로 올라가자').setColor(UIKit.SKY);
    });
  }

  // X: 가장 가까운 적에게 번개 (사거리 안). 마력·과열을 확인한다
  fire() {
    const B = this.cfg.battle, BT = this.battle, PX = this.PX;
    if (this.lockT > 0 || this.fireT > 0) return;
    const st = Circuit.staff(this.staffMode);
    const cost = B.baseMana * st.power;
    if (this.mana < cost) { this.message.setText('지팡이 전지가 모자란다! 잠깐 기다리거나 직렬(가는 번개)로 아끼자').setColor('#ff9a9a'); return; }
    const dir = this.ian.flipX ? -1 : 1;
    const target = BT.enemies.filter((e) => !e.gone && Math.sign(e.s.x - this.ian.x) === dir && Math.abs(e.s.x - this.ian.x) <= B.boltRange * PX)
      .sort((a, b) => Math.abs(a.s.x - this.ian.x) - Math.abs(b.s.x - this.ian.x))[0];
    this.fireT = B.fireEvery;
    this.mana -= cost;
    this.heat += B.heatPerShot * st.power;
    Characters.play(this.ian, 'attack_lightning', false);
    this.attackT = 0.35;
    Sound.play(this.staffMode === 'parallel' ? 'sfx_bolt_thick' : 'sfx_bolt_thin');
    const x0 = this.ian.x + dir * 40, y0 = this.ian.y - 150;
    const x1 = target ? target.s.x : x0 + dir * B.boltRange * PX, y1 = target ? target.s.y - (target.kind === 'knight' ? 140 : 0) : y0;
    this.drawBolt(x0, y0, x1, y1, this.staffMode === 'parallel');
    if (target) {
      target.hp -= B.baseDamage * st.power;
      Characters.play(target.s, target.kind === 'knight' ? 'hurt' : 'pushed', false);
      if (target.hp <= 0) this.defeatEnemy(target);
    }
    if (this.heat >= 100) {
      this.heat = 100;
      this.lockT = B.overheatLock;
      Sound.play('sfx_overheat_warn');
      this.message.setText('과열! 잠시 쏠 수 없다').setColor('#ff9a3c');
    }
  }

  drawBolt(x0, y0, x1, y1, thick) {
    const g = this.bolt;
    g.clear();
    const pts = [{ x: x0, y: y0 }];
    for (let i = 1; i < 8; i++) {
      const k = i / 8;
      pts.push({ x: x0 + (x1 - x0) * k + (Math.random() - 0.5) * 20, y: y0 + (y1 - y0) * k + (Math.random() - 0.5) * 36 });
    }
    pts.push({ x: x1, y: y1 });
    g.lineStyle(thick ? 16 : 6, 0xffe9a0, 0.45).strokePoints(pts);
    g.lineStyle(thick ? 7 : 2, 0xfffbe6, 1).strokePoints(pts);
    this.boltT = 0.12;
  }

  defeatEnemy(e) {
    e.gone = true;
    if (e.kind === 'knight') {
      Characters.play(e.s, 'defeat', false);
      Sound.play('sfx_push_impact');
    } else {
      Characters.play(e.s, 'vanish', false);
      Sound.play('sfx_spark_fairy_vanish');
      e.s.once('animationcomplete', () => e.s.destroy());
    }
  }

  updateBattle(dt) {
    const BT = this.battle;
    if (!BT || BT.done) return;
    const B = this.cfg.battle, PX = this.PX;
    this.fireT = Math.max(0, this.fireT - dt);
    this.lockT = Math.max(0, this.lockT - dt);
    this.attackT = Math.max(0, (this.attackT || 0) - dt);
    this.boltT = Math.max(0, (this.boltT || 0) - dt);
    if (this.boltT === 0) this.bolt.clear();
    this.heat = Math.max(0, this.heat - B.heatCool * dt);
    this.mana = Math.min(B.manaMax, this.mana + B.manaRegen * dt);
    if (this.keys.fire.isDown && !this.isBlocked()) this.fire();
    for (const e of BT.enemies) {
      if (e.gone) continue;
      e.t += dt;
      if (e.kind === 'knight') e.hp = Math.min(e.max, e.hp + B.knight.regen * dt);   // 갑옷이 스스로 회복
      const d = this.ian.x - e.s.x;
      if (Math.abs(d) > B.attackRange * PX) {
        e.s.x += Math.sign(d) * e.speed * PX * dt;
        if (e.kind === 'knight' && !e.s.anims.isPlaying) Characters.play(e.s, 'walk');
      }
      if (e.kind === 'fairy') { e.s.y = this.groundY - 170 + Math.sin(e.t * 3) * 8; if (!e.s.anims.isPlaying) Characters.play(e.s, 'float'); }
      e.s.setFlipX(d > 0);   // 그림은 왼쪽을 본다 — 이안이 오른쪽에 있으면 뒤집는다
      e.cool -= dt;
      if (e.cool <= 0 && Math.abs(d) <= B.attackRange * PX) {
        e.cool = B.attackEvery;
        Characters.play(e.s, 'attack', false);
        this.ianHp = Math.max(0, this.ianHp - B.damage);
        if (this.hud) this.hud.set('health', this.ianHp);
        Sound.play('sfx_ian_hurt');
        if (this.ianHp <= 0) { this.battleLost(); return; }
      }
    }
    if (this.hud) this.hud.set('mana', this.mana / B.manaMax);
    if (this.attackT > 0) Characters.play(this.ian, 'attack_lightning');
    if (!BT.waiting && BT.enemies.length && BT.enemies.every((e) => e.gone)) {
      BT.waiting = true;
      this.time.delayedCall(1200, () => {
        BT.waiting = false;
        for (const e of BT.enemies) if (e.s.active) e.s.destroy();
        BT.enemies = [];
        this.spawnWave();
      });
    }
    this.updateBattleText();
  }

  battleLost() {
    const BT = this.battle;
    for (const e of BT.enemies) if (e.s.active) e.s.destroy();
    BT.enemies = [];
    BT.wave -= 1;
    this.ianHp = 1;
    this.mana = this.cfg.battle.manaMax;
    this.heat = 0;
    if (this.hud) this.hud.set('health', 1);
    this.message.setText('이안이 쓰러졌다… 이 무리를 처음부터').setColor('#ff9a9a');
    this.cameras.main.flash(400, 40, 0, 0);
    this.time.delayedCall(1500, () => this.spawnWave());
  }

  updateBattleText() {
    const BT = this.battle;
    if (!BT || BT.done || !this.speedPanel) return;
    const st = Circuit.staff(this.staffMode);
    const k = BT.enemies.find((e) => e.kind === 'knight' && !e.gone);
    this.speedPanel.setLines([
      `지팡이 ${this.staffMode === 'parallel' ? '병렬' : '직렬'}: ${st.ohm} Ω · ${st.amp} A · ${st.watt} W → 피해·전지 사용 ×${st.power}  (Q 바꾸기)`,
      `지팡이 전지 ${Math.round(this.mana)} / ${this.cfg.battle.manaMax} — 굵은 번개(${Circuit.staff('parallel').watt} W)는 전지를 ${Circuit.staff('parallel').power}배 빨리 쓴다   과열 ${Math.round(this.heat)}%${this.lockT > 0 ? ' — 식는 중' : ''}`,
      k ? `철갑 기사 ${Math.ceil(k.hp)} / ${k.max} (갑옷이 1초에 ${this.cfg.battle.knight.regen} 회복)` : `불꽃 요정 ${BT.enemies.filter((e) => !e.gone).length}마리`,
    ]);
  }
}
window.LampScene = LampScene;

// ------------------------------------------------------------------ 회로판 화면
// circuit_ui_series / circuit_ui_parallel (1400×800, JSON slot_centers·wire_path_segments).
// 아래 부품 상자에서 부품 아이콘을 끌어다(또는 눌러 집어서) 빈 칸에 놓는다. 꽂힌 부품을 누르면 뺀다.
// 전류가 흐르면 전류 점(current_dot)이 전선 경로를 따라 흐르고, 빠르기는 전류에 비례한다.
// 총괄지시 2막리뷰 28번: 판 그림은 오른쪽 끝에서 선이 끝나므로, 엔진으로 "돌아오는 전선"(오른쪽 끝 → 아래 → 왼쪽 → 전지 − 단자)을 그려
// 닫힌 회로로 만든다. 전류 점은 + 단자 → 등불 → 돌아오는 전선 → − 단자로 흐른다. 전지 바로 뒤 위쪽 전선에 퓨즈(5 A).
class CircuitPanel {
  static RETURN_Y = { series: 610, parallel: 660 };   // 돌아오는 전선이 지나는 높이 (판 그림 좌표) — 병렬판은 아래 갈래 칸(590) 밑으로
  static BATTERY_HALF = 48;   // 전지 아이콘 가운데에서 단자 끝까지 (아이콘 96px)
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    this.ox = 960 - 700;   // 판 그림 왼쪽 위 (화면)
    this.oy = 90;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 0.97).setOrigin(0, 0).setInteractive());
    this.boardImg = scene.add.image(this.ox, this.oy, '__DEFAULT').setOrigin(0, 0);
    this.wireG = scene.add.graphics();
    this.dotsG = scene.add.container(0, 0);
    this.title = UIKit.text(scene, 960, this.oy + 72, '', { fontSize: '34px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5);
    this.instr = UIKit.text(scene, 960, this.oy + 730, '', { fontSize: '26px', color: '#f3ead6', align: 'center' }).setOrigin(0.5);
    c.add([this.boardImg, this.wireG, this.dotsG, this.title, this.instr]);
    const U = MANIFEST.ui.act2;
    // 번개 전지 아이콘(왼쪽 −, 오른쪽 +) — 그림이 없으면 마력석 아이콘에 엔진 글자 + / −
    this.manaIcon = scene.add.image(0, 0, (U.part_icon_battery || U.part_icon_mana_stone).key);
    this.voltText = UIKit.text(scene, 0, 0, '12 V', { fontSize: '24px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0.5, 0);
    this.plusText = UIKit.text(scene, 0, 0, U.part_icon_battery ? '' : '+', { fontSize: '30px', fontStyle: 'bold', color: '#ff8a8a' }).setOrigin(0.5);
    this.minusText = UIKit.text(scene, 0, 0, U.part_icon_battery ? '' : '−', { fontSize: '30px', fontStyle: 'bold', color: '#8ab8ff' }).setOrigin(0.5);
    this.fuseText = UIKit.text(scene, 0, 0, '퓨즈 5 A', { fontSize: '20px', color: '#f3ead6', backgroundColor: '#061018cc' }).setOrigin(0.5, 1);
    this.returnG = scene.add.graphics();
    this.fuseG = scene.add.graphics();
    c.add([this.returnG, this.manaIcon, this.voltText, this.plusText, this.minusText, this.fuseG, this.fuseText]);
    // 칸에 꽂힌 등불 아이콘 뒤 빛 번짐 — 회로판 화면이 방 등불을 가려도 밝기가 보이게 (총괄지시 62번)
    this.slotGlows = [0, 1, 2].map(() => {
      const g = scene.add.image(0, 0, MANIFEST.objects.lamp_glow.states.dim).setBlendMode('ADD').setVisible(false);
      c.add(g);
      return g;
    });
    this.slotIcons = [0, 1, 2].map(() => {
      const img = scene.add.image(0, 0, U.part_icon_lamp.key).setVisible(false).setInteractive({ useHandCursor: true });
      img.on('pointerdown', () => this.removeAt(this.slotIcons.indexOf(img)));
      c.add(img);
      return img;
    });
    this.slotLabels = [0, 1, 2].map(() => {
      const t = UIKit.text(scene, 0, 0, '', { fontSize: '20px', color: '#ffe08a', backgroundColor: '#061018cc' }).setOrigin(0.5, 0);
      c.add(t);
      return t;
    });
    // 부품 상자
    const tray = [['lamp', U.part_icon_lamp, '등불 6Ω'], ['wire', U.part_icon_wire, '전선'], ['resistor', U.part_icon_resistor_crystal, '저항 수정 6Ω']];
    tray.forEach(([part, ic, label], i) => {
      const x = 700 + i * 260, y = 990;
      const img = scene.add.image(x, y, ic.key).setInteractive({ useHandCursor: true });
      img.on('pointerdown', (p) => this.pickUp(part, p));
      c.add([img, UIKit.text(scene, x, y + 56, label, { fontSize: '22px' }).setOrigin(0.5, 0)]);
    });
    this.ghost = scene.add.image(0, 0, U.part_icon_lamp.key).setAlpha(0.8).setVisible(false);
    c.add(this.ghost);
    const sw = UIKit.button(scene, 1700, 990, '직렬판 ↔ 병렬판', () => this.switchBoard(), { fontSize: 26 });
    const clr = UIKit.button(scene, 260, 990, '모두 빼기', () => this.clearAll(), { fontSize: 26 });
    const cls = UIKit.button(scene, 1890, 30, '닫기 (Esc)', () => this.close(), { originX: 1, originY: 0 });
    c.add([sw, clr, cls]);
    scene.input.on('pointermove', (p) => { if (this.held) this.ghost.setPosition(p.x, p.y); });
    scene.input.on('pointerup', (p) => this.drop(p));
    scene.input.keyboard.on('keydown-ESC', () => this.close());
    this.dots = [];
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  layout() {
    return MANIFEST.ui.act2[this.scene.circuit.board === 'series' ? 'circuit_ui_series' : 'circuit_ui_parallel'];
  }

  // 판 그림 좌표: 전지 − 단자, 판 그림 전선의 끝(오른쪽), 퓨즈 가운데
  points() {
    const L = this.layout(), m = L.slot_centers.mana_stone, segs = L.wire_path_segments;
    const end = segs[segs.length - 1][1];
    return { minus: [m[0] - CircuitPanel.BATTERY_HALF, m[1]], plus: [m[0] + CircuitPanel.BATTERY_HALF, m[1]], end,
      fuse: [(segs[0][0][0] + segs[0][1][0]) / 2, segs[0][0][1]] };
  }

  // 돌아오는 전선 조각들 (+ 단자 → 판 전선 시작, 판 전선 끝 → 아래 → 왼쪽 → − 단자)
  extraSegments() {
    const P = this.points(), segs = this.layout().wire_path_segments, y = CircuitPanel.RETURN_Y[this.scene.circuit.board];
    return {
      start: [P.plus, segs[0][0]],
      back: [[P.end, [P.end[0], y]], [[P.end[0], y], [P.minus[0], y]], [[P.minus[0], y], P.minus]],
    };
  }

  drawClosedCircuit(r) {
    const g = this.returnG, ox = this.ox, oy = this.oy, X = this.extraSegments();
    g.clear();
    const inner = r.broken ? 0xff4040 : 0xeeb455;   // 판 전선과 같이 끊어짐 색
    for (const [w, col] of [[10, 0xc68133], [6, inner]]) {   // 판 그림 전선과 같은 색·굵기 (테두리 + 속)
      g.lineStyle(w, col, 1);
      for (const [[x1, y1], [x2, y2]] of [X.start, ...X.back]) g.lineBetween(ox + x1, oy + y1, ox + x2, oy + y2);
    }
    // 퓨즈: 유리관 + 가는 선 (끊어지면 가운데가 벌어지고 빨갛게)
    const P = this.points(), fx = ox + P.fuse[0], fy = oy + P.fuse[1], f = this.fuseG;
    f.clear().fillStyle(0x0b1a28, 0.9).fillRoundedRect(fx - 34, fy - 13, 68, 26, 8).lineStyle(3, 0xcfe3f5, 0.9).strokeRoundedRect(fx - 34, fy - 13, 68, 26, 8);
    f.fillStyle(0xc9a24a, 1).fillRect(fx - 40, fy - 13, 8, 26).fillRect(fx + 32, fy - 13, 8, 26);
    if (r.broken) {
      f.lineStyle(3, 0xff4040, 1).lineBetween(fx - 30, fy, fx - 9, fy + 5).lineBetween(fx + 9, fy - 5, fx + 30, fy);
    } else {
      f.lineStyle(2, 0xf3ead6, 1).lineBetween(fx - 30, fy, fx + 30, fy);
    }
    this.fuseText.setPosition(fx, fy - 18).setColor(r.broken ? '#ff9a9a' : r.hot ? '#ffd27a' : '#f3ead6')
      .setText(r.broken ? '퓨즈 5 A — 끊어짐' : r.hot ? '퓨즈 한계(5 A)에 가깝다 — 아슬아슬!' : '퓨즈 5 A');
  }

  slotPos(i) {
    const s = this.layout().slot_centers.parts[i];
    return { x: this.ox + s[0], y: this.oy + s[1] };
  }

  open() {
    this.isOpen = true;
    this.container.setVisible(true);
    Sound.play('sfx_ui_click');
    this.refresh();
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.held = null;
    this.ghost.setVisible(false);
    this.container.setVisible(false);
  }

  pickUp(part, p) {
    this.held = part;
    const U = MANIFEST.ui.act2;
    this.ghost.setTexture({ lamp: U.part_icon_lamp, wire: U.part_icon_wire, resistor: U.part_icon_resistor_crystal }[part].key)
      .setPosition(p.x, p.y).setVisible(true);
    this.pickedAt = this.scene.time.now;
  }

  // 놓기: 빈 칸 가까이(70px)에서 손을 떼면 끼운다. 집자마자 뗀 것이면(누르기만 함) 계속 들고 있다가 다음 클릭에 놓는다
  drop(p) {
    if (!this.isOpen || !this.held) return;
    const i = [0, 1, 2].find((k) => { const s = this.slotPos(k); return Math.hypot(p.x - s.x, p.y - s.y) <= 70; });
    if (i === undefined) {
      if (this.scene.time.now - this.pickedAt > 250) { this.held = null; this.ghost.setVisible(false); }
      return;
    }
    this.place(i, this.held);
    this.held = null;
    this.ghost.setVisible(false);
  }

  place(i, part) {
    this.scene.circuit.slots[i] = part;
    Sound.play('sfx_switch_flip');
    this.scene.solve();
  }

  removeAt(i) {
    if (!this.scene.circuit.slots[i]) return;
    this.scene.circuit.slots[i] = null;
    Sound.play('sfx_ui_click');
    this.scene.solve();
  }

  clearAll() {
    this.scene.circuit.slots = [null, null, null];
    this.scene.solve();
  }

  switchBoard() {
    const c = this.scene.circuit;
    c.board = c.board === 'series' ? 'parallel' : 'series';
    Sound.play('sfx_switch_flip');
    this.scene.solve();
  }

  refresh() {
    if (!this.isOpen) return;
    const sc = this.scene, r = sc.result, L = this.layout(), U = MANIFEST.ui.act2;
    this.boardImg.setTexture(L.key);
    this.title.setText(sc.circuit.board === 'series' ? '직렬판 — 부품이 한 줄로 이어진다' : '병렬판 — 부품이 세 갈래로 나뉜다');
    const m = L.slot_centers.mana_stone;
    this.manaIcon.setPosition(this.ox + m[0], this.oy + m[1]);
    this.voltText.setPosition(this.ox + m[0], this.oy + m[1] + 40);
    this.plusText.setPosition(this.ox + m[0] + 30, this.oy + m[1] - 40);
    this.minusText.setPosition(this.ox + m[0] - 30, this.oy + m[1] - 40);
    this.drawClosedCircuit(r);
    const icons = { lamp: U.part_icon_lamp, wire: U.part_icon_wire, resistor: U.part_icon_resistor_crystal };
    sc.circuit.slots.forEach((part, i) => {
      const s = this.slotPos(i);
      this.slotIcons[i].setVisible(!!part).setPosition(s.x, s.y);
      if (part) this.slotIcons[i].setTexture(icons[part].key);
      const p = r.parts[i];
      this.slotGlows[i].setPosition(s.x, s.y);
      LampScene.setGlow(this.slotGlows[i], part === 'lamp' ? p.level : 'off', 0.8);
      this.slotLabels[i].setPosition(s.x, s.y + 56)
        .setText(part && !r.cursed && sc.showDetail ? `${p.amp.toFixed(2)} A · ${p.watt.toFixed(1)} W` : '');
    });
    // 퓨즈가 끊어지면 판 전선을 빨갛게 (4~5 A는 퓨즈 옆 노란 글만 — 정답도 여기에 들어서 실패처럼 보이지 않게)
    this.wireG.clear();
    const segs = L.wire_path_segments;
    if (r.broken) {
      const color = r.broken ? 0xff4040 : 0xff9a3c;
      this.wireG.lineStyle(r.broken ? 4 : 8, color, r.broken ? 1 : 0.7);
      for (const [[x1, y1], [x2, y2]] of segs) this.wireG.lineBetween(this.ox + x1, this.oy + y1, this.ox + x2, this.oy + y2);
    }
    this.instr.setText(r.cursed
      ? '등불을 끼우면 이을수록 다 함께 밝아진다…? 그런데 계단 등불은 반응하지 않는다'
      : r.broken ? (r.short ? '합선! 저항 없는 전선 길로 전류가 몰려 퓨즈가 끊어졌다 — 부품을 빼서 다시 잇기' : '전체 전류가 5 A를 넘어 퓨즈가 끊어졌다 — 부품을 빼서 다시 잇기')
        : r.open ? '빈 칸이 있으면 회로가 끊겨 전류가 흐르지 않는다 (빈 칸은 전선으로 잇기)'
          : `전체 전류 ${r.total.toFixed(2)} A · 등불 전력 합 ${r.lampWatt.toFixed(1)} W` + (r.stairs ? ' — 계단 등불이 켜졌다!' : ''));
    this.makeDots();
  }

  // 전류 점: 전선 조각마다 몇 개씩, 빠르기는 그 길을 지나는 전류에 비례 (병렬판은 갈래마다 갈래 전류)
  makeDots() {
    this.dotsG.removeAll(true);
    this.dots = [];
    const sc = this.scene, r = sc.result;
    if (r.cursed || r.broken || r.total <= 0) return;
    const L = this.layout(), key = MANIFEST.ui.act2.current_dot.key;
    const parallel = sc.circuit.board === 'parallel';
    const X = this.extraSegments();
    const segs = [X.start, ...L.wire_path_segments, ...X.back];   // + 단자 → 판 전선 → 돌아오는 전선 → − 단자
    segs.forEach(([[x1, y1], [x2, y2]], k0) => {
      const k = k0 - 1;   // 판 그림 전선의 순서 (JSON)
      // 병렬판: 조각 2·3·4 = 갈래 1~3 앞, 5·6·7 = 갈래 1~3 뒤 (JSON 순서), 나머지는 전체 전류
      let amp = r.total;
      if (parallel && k >= 2 && k <= 7) amp = r.parts[(k - 2) % 3].amp;
      if (parallel && k === 1) return;   // 병렬판 세로 모음선(389, 210~590): 갈래로 나뉘는 곳이라 점을 흘리지 않는다
      if (amp <= 0) return;
      const len = Math.hypot(x2 - x1, y2 - y1);
      for (let n = 0; n < Math.max(1, Math.round(len / 60)); n++) {
        const img = this.scene.add.image(0, 0, key);
        this.dotsG.add(img);
        this.dots.push({ img, x1: this.ox + x1, y1: this.oy + y1, x2: this.ox + x2, y2: this.oy + y2, len, s: (n * 60) % len, v: amp * sc.cfg.dotSpeed });
      }
    });
  }

  update(dt) {
    if (!this.isOpen) return;
    for (const d of this.dots) {
      d.s = (d.s + d.v * dt) % d.len;
      const k = d.s / d.len;
      d.img.setPosition(d.x1 + (d.x2 - d.x1) * k, d.y1 + (d.y2 - d.y1) * k);
    }
  }
}
window.CircuitPanel = CircuitPanel;

// ------------------------------------------------------------------ 진실의 원: 전류계·전력계 실험 (ACT2_PLAN 2단계 5번)
// 등불 1개 → 직렬 2개 → 병렬 2개를 차례로 이어 전류계(전체 전류)와 전력계(등불 하나 전력)의 바늘을 비교한다.
// 바늘 각도: JSON(0 = 210°, 최대 = −30°, 수학 각도), 눈금 최대값은 config act2.ch2_2.meters. 계산은 circuit.js.
// 결과판(result_board 5×5): 연결 방법 | 등불 수 | 전체 전류 | 등불 하나 전력 | 결과 — 실험할 때마다 한 줄씩
class MeterLab {
  static LAMP_SCALE = 0.75;   // 회로도 안 등불 그림 크기
  static TRIALS = [
    { name: '등불 1개', board: 'series', slots: ['lamp', 'wire', 'wire'], n: 1 },
    { name: '직렬 2개', board: 'series', slots: ['lamp', 'lamp', 'wire'], n: 2 },
    { name: '병렬 2개', board: 'parallel', slots: ['lamp', 'lamp', null], n: 2 },
  ];

  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const U = MANIFEST.ui.act2, O = MANIFEST.objects;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 60, '진실의 원 — 전류계·전력계 실험', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    this.help = UIKit.text(scene, 960, 118, 'Space: 다음 연결로 이어 보기    Esc: 닫기', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5);
    c.add(this.help);
    // 계기판 두 개 (바늘은 따로 돌린다)
    this.meters = [['ammeter', 250, 'Ⓐ 전체 전류 (A)'], ['wattmeter', 640, 'Ⓦ 등불 하나의 전력 (W)']]   // 이름표 기호 = 아래 회로도 기호 (총괄지시 69번)
      .map(([k, x, label]) => {
      const M = U[k], N = U[k + '_needle'];
      const y = 380;
      const body = scene.add.image(x, y, M.key).setOrigin(M.pivot[0] / M.width, M.pivot[1] / M.height);
      const needle = scene.add.image(x, y, N.key).setOrigin(N.pivot[0] / N.width, N.pivot[1] / N.height);
      const [vx0, vy0, vx1, vy1] = M.value_text_rect;
      const value = UIKit.text(scene, x - M.pivot[0] + (vx0 + vx1) / 2, y - M.pivot[1] + (vy0 + vy1) / 2, '0', {
        fontSize: '30px', fontStyle: 'bold', color: '#1a0e08',
      }).setOrigin(0.5);
      const cap = UIKit.text(scene, x, y + 200, label, { fontSize: '26px' }).setOrigin(0.5, 0);
      c.add([body, needle, value, cap]);
      return { M, needle, value, angle: M.zero_angle_degrees, target: 0 };
    });
    // 연결 모양과 등불 (밝기)
    this.trialName = UIKit.text(scene, 445, 636, '', { fontSize: '32px', fontStyle: 'bold', color: '#ffe08a' }).setOrigin(0.5);
    c.add(this.trialName);
    // 회로도 안 등불 그림 (밝기 반영) — 자리는 drawDiagram이 정한다 (총괄지시 69번: 기호 ⊗ 대신 등불 그림)
    this.lampImgs = [0, 1].map(() => {
      const L = O.lamp, G = O.lamp_glow;
      const glow = scene.add.image(0, 0, G.states.dim).setBlendMode('ADD').setVisible(false);
      const body = scene.add.image(0, 0, L.states.off).setScale(MeterLab.LAMP_SCALE).setVisible(false);
      c.add([glow, body]);
      return { glow, body };
    });
    // 단계마다 작은 회로도 (전지 + 닫힌 회로, 총괄지시 2막리뷰 42번)
    this.diag = scene.add.graphics();
    this.diagTexts = [UIKit.text(scene, 0, 0, '', { fontSize: '22px', fontStyle: 'bold', color: '#ff8a8a' }).setOrigin(0.5),
      UIKit.text(scene, 0, 0, '', { fontSize: '22px', fontStyle: 'bold', color: '#8ab8ff' }).setOrigin(0.5),
      UIKit.text(scene, 0, 0, '', { fontSize: '20px', color: '#ffe08a' }).setOrigin(1, 0.5)];
    c.add([this.diag, ...this.diagTexts]);
    this.diagLayer = scene.add.container(0, 0);   // 계기 기호 글자(A·W)와 전류 값 — 그릴 때마다 새로
    c.add(this.diagLayer);
    this.lampImgs.forEach((l) => { c.bringToTop(l.glow); c.bringToTop(l.body); });   // 등불 그림은 회로도 전선 위에
    // 결과판
    const R = U.result_board, S = 0.78;
    this.board = { x: 1380 - R.width * S / 2, y: 540 - R.height * S / 2, S, R };
    c.add(scene.add.image(1380, 540, R.key).setScale(S));
    const [tx0, ty0, tx1, ty1] = R.title_text_rect;
    c.add(UIKit.text(scene, this.board.x + (tx0 + tx1) / 2 * S, this.board.y + (ty0 + ty1) / 2 * S, '실험 결과판', {
      fontSize: '30px', fontStyle: 'bold', color: '#1a0e08',
    }).setOrigin(0.5));
    this.cells = R.cell_rects.map((row) => row.map(([x0, y0, x1, y1]) => {
      const t = UIKit.text(scene, this.board.x + (x0 + x1) / 2 * S, this.board.y + (y0 + y1) / 2 * S, '', {
        fontSize: '20px', color: '#1a0e08', align: 'center',
      }).setOrigin(0.5);
      c.add(t);
      return t;
    }));
    ['연결 방법', '등불 수', '전체 전류', '등불 하나 전력', '결과'].forEach((h, i) => this.cells[0][i].setText(h).setFontStyle('bold'));
    this.info = UIKit.text(scene, 960, 1010, '', { fontSize: '28px', align: 'center' }).setOrigin(0.5, 1);
    c.add(this.info);
    scene.input.keyboard.on('keydown-SPACE', () => this.next());
    scene.input.keyboard.on('keydown-ESC', () => this.close());
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.step = -1;
    this.container.setVisible(true);
    for (let r = 1; r < this.cells.length; r++) this.cells[r].forEach((t) => t.setText(''));
    this.meters.forEach((m) => { m.target = 0; });
    this.trialName.setText('');
    this.lampImgs.forEach((l) => { l.body.setVisible(false); l.glow.setVisible(false); });
    this.diag.clear();
    this.diagLayer.removeAll(true);
    this.diagTexts.forEach((t) => t.setText(''));
    this.info.setText('Space를 눌러 첫 번째 연결(등불 1개)부터 이어 보자').setColor('#ffe08a');
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  // Space: 다음 연결을 잇고, 바늘·등불·결과판 한 줄
  next() {
    if (!this.isOpen || this.done || this.waiting) return;
    if (this.step >= MeterLab.TRIALS.length - 1) return;
    this.step += 1;
    const T = MeterLab.TRIALS[this.step];
    const r = Circuit.solve(T.board, T.slots);   // 진실의 원 안: 진짜 법칙
    const lamp = r.parts.find((p) => p.part === 'lamp');
    const M = GAME_CONFIG.act2.ch2_2.meters;
    this.meters[0].target = r.total / M.ampMax;
    this.meters[1].target = lamp.watt / M.wattMax;
    this.meters[0].shown = r.total;
    this.meters[1].shown = lamp.watt;
    this.trialName.setText(T.name);
    this.drawDiagram(T, r);
    Sound.play(lamp.level === 'bright' ? 'sfx_lamp_on_bright' : 'sfx_lamp_on_dim');
    const result = { bright: '밝음', normal: '보통', dim: '어두움' }[lamp.level] + (r.lampWatt >= GAME_CONFIG.act2.circuit.stairW ? `
합 ${r.lampWatt.toFixed(0)} W` : '');
    const row = this.cells[this.step + 1];
    const step = this.step;
    this.info.setText(T.name + ' — 바늘을 지켜보자…').setColor('#ffe08a');
    this.waiting = true;
    // 바늘이 움직이는 것을 1초 먼저 보여 준 뒤 결과판·설명 (총괄지시 2막리뷰 32번)
    this.scene.time.delayedCall(1000, () => {
      this.waiting = false;
      if (!this.isOpen) return;
      [T.name, `${T.n}개`, `${this.fmt(r.total)} A`, `${this.fmt(lamp.watt)} W`, result].forEach((v, i) => row[i].setText(v));
      this.info.setText(tips[step]).setColor(UIKit.SKY);
    });
    const tips = [
      '등불 하나에 12 V가 다 걸린다: 전류 2 A, 전력 24 W',
      '직렬로 둘: 저항이 두 배라 전류가 반(1 A) — 등불 하나 전력은 6 W로 뚝 떨어졌다',
      '병렬로 둘: 등불마다 12 V를 다 받아 각각 24 W — 대신 전체 전류는 4 A로 커졌다',
    ];
    if (this.step === MeterLab.TRIALS.length - 1) {
      this.done = true;
      this.help.setText('');
      UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
    }
  }

  fmt(v) {
    return Number.isInteger(v) ? String(v) : v.toFixed(2);
  }

  // 작은 회로도: 왼쪽 전지(위 +, 아래 −) → 위쪽 전선(퓨즈) → 등불 → 아래쪽 전선 → 전지 −. 직렬은 위쪽 전선에 줄줄이, 병렬은 세로 갈래마다 하나씩
  // 회로도 (총괄지시 69번): 전지 → 퓨즈 → 본선 전류계 Ⓐ(전체 전류) → 등불들. 병렬은 갈래마다 Ⓐ + 등불을 직렬로,
  // 전력계 Ⓦ는 등불 하나의 양 끝에 걸쳐 놓는다. 등불은 등불 그림(밝기 반영)으로 그린다.
  drawDiagram(T, r) {
    const g = this.diag, x0 = 230, top = 700, bot = 870, mid = (top + bot) / 2;
    const parallel = T.board === 'parallel', x1 = parallel ? 630 : 680;
    const wire = (ax, ay, bx, by, w = 4) => g.lineStyle(w, 0xeeb455, 1).lineBetween(ax, ay, bx, by);
    const arrow = (x, y, dx, dy) => g.fillStyle(0x9fe0ff, 1).fillTriangle(x + dx * 9, y + dy * 9, x - dy * 6 - dx * 4, y + dx * 6 - dy * 4, x + dy * 6 - dx * 4, y - dx * 6 - dy * 4);
    const L = this.diagLayer, sc = this.scene;
    const text = (x, y, str, color = '#cfe3f5', size = 20, ox = 0.5, oy = 0.5) =>
      L.add(UIKit.text(sc, x, y, str, { fontSize: `${size}px`, fontStyle: 'bold', color }).setOrigin(ox, oy));
    const meter = (x, y, letter, color) => {   // 계기 기호: 동그라미 안 글자
      g.fillStyle(0x0b1a28, 1).fillCircle(x, y, 17).lineStyle(3, color, 1).strokeCircle(x, y, 17);
      text(x, y, letter, Phaser.Display.Color.IntegerToColor(color).rgba, 22);
    };
    const amps = (a) => `${+a.toFixed(2)} A`;
    g.clear();
    L.removeAll(true);
    // 전지 (세로 전선 가운데: 긴 판 = +, 짧은 굵은 판 = −)
    wire(x0, top, x0, mid - 10); wire(x0, mid + 10, x0, bot);
    g.lineStyle(4, 0xf3ead6, 1).lineBetween(x0 - 22, mid - 10, x0 + 22, mid - 10);
    g.lineStyle(8, 0xf3ead6, 1).lineBetween(x0 - 12, mid + 10, x0 + 12, mid + 10);
    this.diagTexts[0].setPosition(x0 + 36, mid - 18).setText('+');
    this.diagTexts[1].setPosition(x0 + 36, mid + 18).setText('−');
    this.diagTexts[2].setPosition(x0 - 30, mid).setText('12 V');
    // 본선: 위·아래 전선, 퓨즈(전지 바로 뒤), 본선 전류계
    wire(x0, top, x1, top); wire(x0, bot, x1, bot);
    g.fillStyle(0x0b1a28, 1).fillRect(x0 + 34, top - 9, 44, 18).lineStyle(2, 0xcfe3f5, 1).strokeRect(x0 + 34, top - 9, 44, 18).lineStyle(1, 0xf3ead6, 1).lineBetween(x0 + 36, top, x0 + 76, top);
    const mainA = x0 + 130;
    meter(mainA, top, 'A', 0x9fe0ff);
    text(mainA, top - 30, `전체 ${amps(r.total)}`, '#9fe0ff', 22);
    const lamps = r.parts.filter((p) => p.part === 'lamp');
    const LS = MeterLab.LAMP_SCALE, lampH = MANIFEST.objects.lamp.height * LS;
    const putLamp = (i, x, y, level) => {   // 등불 그림: 가운데를 (x, y)에, 빛 번짐도 같은 가운데
      const l = this.lampImgs[i];
      l.body.setVisible(true).setPosition(x, y).setTexture(MANIFEST.objects.lamp.states[level]);
      l.glow.setPosition(x, y);
      LampScene.setGlow(l.glow, level, 0.5);
    };
    // 전력계: 등불 하나의 양 끝(ya, yb 또는 xa, xb)에 걸친 모양
    const wattAcrossV = (x, ya, yb) => {   // 세로로 놓인 등불: 왼쪽에 Ⓦ
      const wx = x - 62, wy = (ya + yb) / 2;
      g.lineStyle(2, 0xffd27a, 1).lineBetween(wx, wy - 17, wx, ya).lineBetween(wx, ya, x, ya).lineBetween(wx, wy + 17, wx, yb).lineBetween(wx, yb, x, yb);
      meter(wx, wy, 'W', 0xffd27a);
    };
    const wattAcrossH = (xa, xb, y) => {   // 가로로 놓인 등불: 아래에 Ⓦ
      const wx = (xa + xb) / 2, wy = y + 70;
      g.lineStyle(2, 0xffd27a, 1).lineBetween(xa, y, xa, wy).lineBetween(xa, wy, wx - 17, wy).lineBetween(xb, y, xb, wy).lineBetween(xb, wy, wx + 17, wy);
      meter(wx, wy, 'W', 0xffd27a);
    };
    this.lampImgs.forEach((l) => { l.body.setVisible(false); l.glow.setVisible(false); });
    if (parallel) {
      // 갈래 둘: 갈래마다 위쪽에 전류계 Ⓐ, 그 아래 등불 (직렬)
      const xs = [470, 630], ay = top + 34, ly = bot - 48;
      xs.forEach((x, i) => {
        wire(x, top, x, bot);
        meter(x, ay, 'A', 0x9fe0ff);
        text(x + 24, ay, amps(lamps[i].amp), '#9fe0ff', 20, 0, 0.5);
        putLamp(i, x, ly, lamps[i].level);
      });
      wattAcrossV(xs[0], ly - lampH / 2 + 4, ly + lampH / 2 - 4);
      arrow(420, top, 1, 0); arrow(420, bot, -1, 0);
    } else {
      // 직렬: 본선 위쪽 전선에 등불을 차례로
      wire(x1, top, x1, bot);
      const xs = T.n === 1 ? [500] : [480, 600];
      xs.forEach((x, i) => putLamp(i, x, top, lamps[i].level));
      wattAcrossH(xs[0] - 34, xs[0] + 34, top);
      arrow(x1, mid, 0, 1); arrow(455, bot, -1, 0);
    }
    arrow(x0, top + 18, 0, -1);
  }

  update(dt) {
    if (!this.isOpen) return;
    for (const m of this.meters) {
      const z = m.M.zero_angle_degrees, mx = m.M.maximum_angle_degrees;
      const want = z + (mx - z) * Math.min(1, m.target);
      m.angle += (want - m.angle) * Math.min(1, dt * 4);
      m.needle.setAngle(90 - m.angle);       // 바늘 그림은 위(수학 90°)를 가리킨다 → 수학 각도 θ로 돌리려면 시계 방향 (90 − θ)°
      m.value.setText(m.shown !== undefined ? this.fmt(m.shown) : '0');
    }
  }
}
window.MeterLab = MeterLab;
