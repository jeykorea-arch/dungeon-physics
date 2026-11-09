// 2-3 탑 3층 번개 문 (ACT2_PLAN 3단계) — 배경 tower_f3 (2400px)
//
// 이번 묶음: 방 배치 + 축전기 상자 4종 들고 다니기 + 충전대 + 철문에 내보내기.
//   상자 4종(판 small/large × 간격 close/wide): 모을 수 있는 양 ∝ 판 넓이 ÷ 간격 (js/physics/act2/capacitor.js)
//   Z: 상자 앞이면 들기, 충전대 앞이면 전지에 연결(충전), 철문 앞이면 한꺼번에 내보내기, 그 밖이면 내려놓기
//   저주: 연결을 떼는 순간 상자가 비워진다 (전기는 저장할 수 없다는 오개념) — 문까지 들고 갈 수 없다
//   해방: 떼어도 모은 전하가 그대로 — 철문은 한꺼번에 기준값(9) 이상 흘러야 열린다 → large_close만
//   (저주 이야기·진실의 원 실험·터치 석판·차지 공격·시험은 다음 묶음)
class BoxScene extends ChapterScene {
  constructor() {
    super('Ch2_3');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act2.ch2_3;
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
    // 큰 철문 (JSON 자리)
    this.door = place('iron_door', cfg.door.x, this.groundY, -1, 'closed');
    this.doorOpen = false;
    // 터치 석판: 철문의 잠금장치 — 맨손(전기가 통함)만 반응, 고무 장갑·나무 막대는 반응 없음
    this.slab = place('touch_slab', cfg.slab.x, 590, -1, 'off');
    this.slabGlow = place('touch_slab_glow', cfg.slab.x, 590, -1, 'off').setBlendMode('ADD');
    this.slabOn = !!Save.chapter(this.scene.key).slabOn;
    if (this.slabOn) this.setSlab('on');
    // 충전대: 돌 받침(엔진) 위의 번개 전지
    const g = this.add.graphics().setDepth(0);
    g.fillStyle(0x4a4038, 1).fillRect(cfg.chargerX - 34, this.groundY - 60, 68, 60);
    g.fillStyle(0x6b5a48, 1).fillRect(cfg.chargerX - 40, this.groundY - 66, 80, 10);
    this.worldLayer.add(g);
    if (O.battery_cell) place('battery_cell', cfg.chargerX, this.groundY - 64, 1).setScale(0.9);   // 번개 전지 (받침 위)
    else place('mana_stone', cfg.chargerX, this.groundY - 92, 1);
    this.chargeLine = this.add.graphics().setDepth(2);
    this.worldLayer.add(this.chargeLine);
    // 축전기 상자 4종 + 충전 빛
    this.boxes = Object.entries(cfg.boxSlots).map(([type, x]) => {
      const body = place('lightning_box', x, this.groundY, 2, type);
      const glow = place('box_charge_glow_' + type, x, this.groundY, 3, '00').setBlendMode('ADD');
      const label = UIKit.text(this, x, this.groundY - 150, '', { fontSize: '20px', color: '#cfe3f5', backgroundColor: '#0b1320aa' }).setOrigin(0.5, 1);
      this.worldLayer.add(label);
      return { type, body, glow, label, x, fill: 0, onCharger: false };
    });
    this.carried = null;
    this.circle = this.curse.addTruthCircle({ centerX: cfg.circleX, groundY: this.groundY, diameter: 3.6, domeHeight: 2.6 });
    this.curse.setCircleActive(this.circle, !this.curse.cursed);
    this.bolt = this.add.graphics().setDepth(6);
    this.worldLayer.add(this.bolt);

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, this.groundY).setDepth(4);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, this.groundY).setDepth(3);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT', act: 'Z' });
    kb.addCapture(['Z']);
    this.keys.act.on('down', () => this.interact());
    kb.on('keydown-TWO', () => this.touchSlab('glove'));
    kb.on('keydown-THREE', () => this.touchSlab('stick'));
    this.flags = {};
    this.lab = new CapLab(this, this.uiLayer);
  }

  addPrompts() {
    const c = this.cfg, PX = this.PX;
    const nearBox = () => { const b = this.boxes.filter((o) => !o.onCharger || true).sort((p, q) => Math.abs(p.x - this.ian.x) - Math.abs(q.x - this.ian.x))[0]; return b ? b.x : null; };
    this.addPrompt({ key: 'Z', text: '축전기 상자 실험', x: () => this.cfg.circleX * this.PX, range: 1.8 * this.PX,
      when: () => this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x) });
    this.addPrompt({ key: 'Z', text: () => (this.boxes.find((o) => Math.abs(o.x - this.ian.x) <= c.reach * PX && o.onCharger) ? '충전대에서 떼어 들기' : '상자 들기'), x: nearBox, when: () => !this.carried && !this.battle });
    this.addPrompt({ key: 'Z', text: '충전대에 연결 (충전)', x: c.chargerX + 90, when: () => !!this.carried });
    this.addPrompt({ key: 'Z', text: '철문에 한꺼번에 내보내기', x: c.door.x, when: () => !!this.carried && !this.doorOpen });
    this.addPrompt({ key: 'Z', text: '철문으로 들어가기', x: c.door.exitX, when: () => this.doorOpen && this.canLeave() });
    this.addPrompt({ key: 'Z', text: '맨손으로 대기  ·  2 고무 장갑  ·  3 나무 막대', x: c.slab.x, newKeyName: '2·3', newKey: '석판에 고무 장갑(2)이나 나무 막대(3)를 대 본다' });
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  onReady() {
    this.addPrompts();
    this.uiLayer.add(UIKit.text(this, 1900, 1070, '← → 걷기   Z 상자·충전대·철문·석판(맨손)   석판 앞 2 고무 장갑 · 3 나무 막대   X 길게 누르기: 모았다가 쏘기   M 마법서', {
      fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1136, 150);
    this.message.setText(this.curse.cursed ? 'Z: 축전기 상자를 들어 충전대(번개 전지)에 연결해 보자' : '');   // 해방된 장에 다시 들어오면 저주 때 안내를 띄우지 않는다 (총괄지시 2막리뷰 44번 — 목표 줄이 해방 상태 안내)
    this.teacherExtra = {
      label: () => '상자 저장량 숫자 ' + (this.showAmounts ? '숨기기' : '보이기'),
      toggle: () => { this.showAmounts = !this.showAmounts; },
    };
    this.showAmounts = true;
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 전기는 저장할 수 없다? (연결을 끊는 순간 상자가 비워진다)'
      : '진짜 법칙: 축전기는 전기 에너지를 저장한다 — 같은 전압에서 판이 넓고 간격이 좁을수록 더 많이';
  }

  near(x) {
    return Math.abs(this.ian.x - x) <= this.cfg.reach * this.PX;
  }

  // ------------------------------------------------------------------ Z
  interact() {
    if (this.isBlocked()) return;
    const cfg = this.cfg;
    // 진실의 원 안(저주): 축전기 실험
    if (this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x)) {
      if (this.carried) this.putDown(this.carried, this.ian.x - 70, false);   // 들고 있던 상자는 내려놓고 바로 실험 (총괄지시 2막리뷰 33번)
      const open = () => this.lab.open(() => this.onLabDone());
      if (this.flags.labTalked) { open(); return; }
      this.flags.labTalked = true;
      this.say('lab_start', open);
      return;
    }
    // 석판 앞에서 Z = 맨손으로 대기
    if (this.near(cfg.slab.x)) { this.touchSlab('hand'); return; }   // 상자를 들고 있어도 다른 손으로
    // 열린 철문 앞에서 (빈손으로) Z: 문으로 들어가 다음 방 (전투·시험은 다음 묶음에서 이 앞에 넣는다)
    if (this.doorOpen && this.canLeave() && this.near(cfg.door.exitX)) {   // 들고 있던 상자는 문 앞에 내려놓고 들어간다
      if (this.carried) this.putDown(this.carried, cfg.door.exitX - 140, false);
      this.enterDoor();
      return;
    }
    if (!this.carried) {
      const b = this.boxes.find((o) => this.near(o.x));
      if (b) this.pickUp(b);
      return;
    }
    const b = this.carried;
    if (this.near(cfg.chargerX + 90)) { this.putDown(b, cfg.chargerX + 90, true); return; }
    if (this.near(cfg.door.x) && !this.doorOpen) { this.release(b); return; }
    this.putDown(b, this.ian.x + (this.ian.flipX ? -1 : 1) * 60, false);
  }

  pickUp(b) {
    if (b.onCharger) {
      b.onCharger = false;
      Sound.stopLoop('sfx_box_charge');
      // 떼는 순간: 저주면 비워지고, 해방이면 그대로 (capacitor.charge, connected = false)
      b.fill = Capacitor.charge(b.fill, 0, { connected: false, cursed: this.curse.cursed });
      if (this.curse.cursed && !this.flags.cursedEmpty) {
        this.flags.cursedEmpty = true;
        this.message.setText('떼자마자 상자가 텅 비었다… 전기는 모아 둘 수 없는 걸까?').setColor('#c79bff');
        this.time.delayedCall(1200, () => this.say('garon_empty', () => { this.lightCircle(); this.say('circle_found'); }));
      }
    }
    this.carried = b;
    Sound.play('sfx_ui_click');
    if (!this.curse.cursed && b.fill > 0) this.message.setText(`떼어도 전하가 그대로 남아 있다: ${Capacitor.stored(b.type, b.fill).toFixed(1)}`).setColor(UIKit.SKY);   // 해방 뒤라 숫자 공개
  }

  putDown(b, x, onCharger) {
    this.carried = null;
    b.x = x;
    b.onCharger = onCharger;
    if (onCharger) { Sound.startLoop('sfx_box_charge'); this.message.setText('충전 중… 상자에 전하가 모인다').setColor('#ffe08a'); }
  }

  // 철문 앞에서 상자의 전하를 한꺼번에 내보낸다
  // 실험(저주 해제) 전에는 상자별 저장량 대신 채운 비율만 (총괄지시 2막리뷰 32번)
  amountsKnown() {
    return !this.curse.cursed || this.answersShown();
  }

  release(b) {
    // 해방 뒤에는 석판 잠금이 풀려야 철문이 전하를 받아들인다 (모은 전하는 그대로 둔다)
    if (!this.curse.cursed && !this.slabOn) {
      this.message.setText('철문이 잠겨 있다 — 옆의 손바닥 석판부터 켜자').setColor('#ffd27a');
      Sound.play('sfx_touch_none');
      return;
    }
    if (!Save.chapter(this.scene.key).doorTried) Save.setChapter(this.scene.key, { doorTried: true });
    const ok = Capacitor.opensDoor(b.type, b.fill);
    const amount = Capacitor.stored(b.type, b.fill);
    Characters.play(this.ian, 'box_charge_release', false);
    this.releaseT = 0.5;
    Sound.play('sfx_box_discharge');
    this.drawBolt(this.ian.x + 60, this.ian.y - 120, this.cfg.door.x, this.groundY - 220, amount);
    b.fill = 0;
    if (ok) {
      this.openDoor();
    } else {
      this.door.setTint(0x9fe0ff);
      this.time.delayedCall(200, () => this.door.clearTint());
      this.message.setText(amount > 0
        ? (this.amountsKnown() ? `번쩍! 그런데 문이 열리지 않는다 — 한꺼번에 흐른 양 ${amount.toFixed(1)} (문을 열려면 ${GAME_CONFIG.act2.capacitor.doorNeed} 이상)`
          : `번쩍! 그런데 문이 열리지 않는다 — 문을 열려면 ${GAME_CONFIG.act2.capacitor.doorNeed} 이상 한꺼번에 흘러야 한다`)
        : '상자가 비어 있다… 아무 일도 없다').setColor('#ffd27a');
    }
  }

  openDoor() {
    this.doorOpen = true;
    const S = MANIFEST.objects.iron_door.states;
    ['opening_01', 'opening_02', 'opening_03', 'opening_04'].forEach((f, i) => this.time.delayedCall(i * 220, () => this.door.setTexture(S[f])));
    Sound.play('sfx_door_electric_open');
    this.message.setText('큰 철문이 열렸다!').setColor(UIKit.SKY);
    Save.setChapter(this.scene.key, { doorOpen: true });
    if (!Save.chapter(this.scene.key).examPassed) this.time.delayedCall(1200, () => this.startBattle());
  }

  // 터치 석판: 맨손만 반응 (전기가 통하는 손가락이 판의 전하 분포를 바꾼다)
  touchSlab(how) {
    if (this.isBlocked() || !this.near(this.cfg.slab.x)) return;
    if (how === 'hand') {
      Characters.play(this.ian, 'push', false);
      this.releaseT = 0.4;
      if (this.slabOn) return;
      this.slabOn = true;
      this.setSlab('on');
      Sound.play('sfx_touch_on');
      Save.setChapter(this.scene.key, { slabOn: true });
      this.message.setText('맨손을 대자 석판이 켜졌다 — 철문 잠금이 풀렸다').setColor(UIKit.SKY);
      if (!this.flags.slabTalk) { this.flags.slabTalk = true; this.say('slab_hand'); }
      return;
    }
    // 고무 장갑(가론이 끼고 누름)·나무 막대: 반응 없음
    if (!this.slabOn) this.setSlab('no_response');
    Sound.play('sfx_touch_none');
    this.time.delayedCall(700, () => { if (!this.slabOn) this.setSlab('off'); });
    if (how === 'glove') {
      this.garon.x = this.cfg.slab.x - 70;
      if (!this.flags.gloveTalk) { this.flags.gloveTalk = true; this.say('slab_glove'); }
      else this.message.setText('고무 장갑으로 누르면 반응이 없다').setColor('#ffd27a');
    } else {
      this.message.setText('나무 막대로 누르면 반응이 없다 — 나무는 전기가 잘 통하지 않는다').setColor('#ffd27a');
    }
  }

  setSlab(state) {
    const O = MANIFEST.objects;
    this.slab.setTexture(O.touch_slab.states[state]);
    this.slabGlow.setTexture(O.touch_slab_glow.states[state]);
  }

  lightCircle() {
    this.curse.setCircleActive(this.circle, true);
    this.circle.image.setAlpha(0);
    this.tweens.add({ targets: this.circle.image, alpha: 1, duration: 1200 });
    Sound.play('sfx_truth_circle_enter');
    this.message.setText('석판 오른쪽 바닥에 진실의 원이 나타났다! 가 보자').setColor('#ffe08a');
  }

  // 실험 뒤: 깨달음 → 저주 풀기(카드 09 + 마법서 9장) → 대사
  onLabDone() {
    this.realizing = true;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.message.setText('이제 진짜 법칙대로! 상자에 모아 철문으로 들고 가자').setColor(UIKit.SKY);
        this.say('after_free');
      }));
    });
  }

  enterDoor() {
    this.leaveRoom();
  }

  drawBolt(x0, y0, x1, y1, amount) {
    const g = this.bolt, thick = Math.min(14, 2 + amount);
    g.clear();
    const pts = [{ x: x0, y: y0 }];
    for (let i = 1; i < 8; i++) pts.push({ x: x0 + (x1 - x0) * i / 8 + (Math.random() - 0.5) * 18, y: y0 + (y1 - y0) * i / 8 + (Math.random() - 0.5) * 40 });
    pts.push({ x: x1, y: y1 });
    g.lineStyle(thick * 2, 0xffe9a0, 0.4).strokePoints(pts);
    g.lineStyle(thick, 0xfffbe6, 1).strokePoints(pts);
    this.time.delayedCall(160, () => g.clear());
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const cfg = this.cfg, PX = this.PX;
    this.releaseT = Math.max(0, (this.releaseT || 0) - dt);
    this.updateBattle(dt);
    const dir = this.releaseT > 0 || this.chargingAttack ? 0 : (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * cfg.walkSpeed * PX * dt, 60, this.worldW - 60);
    if (dir) this.ian.setFlipX(dir < 0);
    if (this.releaseT <= 0 && !this.realizing && !this.chargingAttack) Characters.play(this.ian, dir ? 'walk' : 'idle');
    // 상자: 충전 중이면 차오르고, 들고 있으면 이안 손 앞에
    let charging = null;
    for (const b of this.boxes) {
      if (b.onCharger) { b.fill = Capacitor.charge(b.fill, dt, { connected: true }); charging = b; }
      if (b === this.carried) {
        const f = this.ian.flipX ? -1 : 1;
        b.body.setPosition(this.ian.x + f * 62, this.ian.y - 40).setScale(0.6).setDepth(5);   // 손에 든 상자는 이안 앞에
      } else {
        b.body.setPosition(b.x, this.groundY).setScale(1).setDepth(2);
      }
      b.glow.setPosition(b.body.x, b.body.y).setScale(b.body.scale).setDepth(b.body.depth + 0.5)
        .setTexture(MANIFEST.objects['box_charge_glow_' + b.type].states[Capacitor.glowState(b.fill)]);
      b.label.setPosition(b.body.x, b === this.carried ? this.ian.y - 230 : b.body.y - 135)
        .setText(!this.showAmounts ? '' : this.amountsKnown() ? `${Capacitor.stored(b.type, b.fill).toFixed(1)} / ${Capacitor.capacity(b.type).toFixed(1)}` : `${Math.round(b.fill * 100)}%`);
      if (b.onCharger && b.fill >= 1 && !b.full) { b.full = true; Sound.play('sfx_box_full'); Sound.stopLoop('sfx_box_charge'); }
      if (b.fill < 1) b.full = false;
    }
    // 충전선과 충전음 높이 (찰수록 높게)
    this.chargeLine.clear();
    if (charging && charging.fill < 1) {
      Sound.setLoopRate('sfx_box_charge', 0.8 + 0.6 * charging.fill);
      this.chargeLine.lineStyle(3, 0x9fe0ff, 0.8).lineBetween(cfg.chargerX, this.groundY - 92, charging.x, this.groundY - 60);
    }
    if (this.battle && !this.battle.done) this.updateBattleText(); else this.updatePanel();
  }

  updatePanel() {
    const lines = this.boxes.map((b) => {
      const name = { small_close: '작은 판·좁은 간격', small_wide: '작은 판·넓은 간격', large_close: '큰 판·좁은 간격', large_wide: '큰 판·넓은 간격' }[b.type];
      const amt = this.amountsKnown() ? `${Capacitor.stored(b.type, b.fill).toFixed(1)} / ${Capacitor.capacity(b.type).toFixed(1)}` : `채운 정도 ${Math.round(b.fill * 100)}%`;
      return `${name}: ${amt}${b.onCharger ? ' (충전 중)' : b === this.carried ? ' (들고 있음)' : ''}`;
    });
    if (Save.chapter(this.scene.key).doorTried || this.answersShown()) lines.push(`철문이 열리는 양: ${GAME_CONFIG.act2.capacitor.doorNeed} 이상 (한꺼번에)`);
    this.speedPanel.setLines(lines);
  }

  // ------------------------------------------------------------------ 차지 공격 전투 (ACT2_PLAN 3단계 7번)
  // X를 누르고 있는 동안 큰 판·좁은 간격 상자에 모은다(약 2초에 가득, 그동안 움직일 수 없음). 떼면 한순간에 방출 — 피해 ∝ 모은 양.
  // 짧게 누르면 보통 공격. 불꽃 요정이 쏜 번개를 모으는 자세로 받으면 상자에 저장되어 되돌려 줄 수 있다.
  canLeave() {
    return !!Save.chapter(this.scene.key).examPassed;
  }

  startBattle() {
    if (this.battle) return;
    if (this.carried) this.putDown(this.carried, this.ian.x - 80, false);
    this.battle = { wave: 0, fairies: [], shots: [], done: false };
    this.attackFill = 0;
    this.ianHp = 1;
    this.setMusicMode('battle');
    this.keys.fire = this.input.keyboard.addKey('X');
    this.input.keyboard.addCapture(['X']);
    this.keys.fire.on('down', () => { if (!this.isBlocked() && this.battle && !this.battle.done) { this.chargingAttack = true; this.holdT = 0; } });
    this.keys.fire.on('up', () => this.releaseAttack());
    this.say('battle_start', () => { this.introKey('X', '짧게: 보통 공격  ·  길게 누르기: 상자에 모았다가 떼면 쏘기'); this.spawnWave(); });
  }

  spawnWave() {
    const F = this.cfg.battle.fairies, BT = this.battle;
    BT.wave += 1;
    if (BT.wave > F.waves.length) { this.endBattle(); return; }
    for (let i = 0; i < F.waves[BT.wave - 1]; i++) {
      const id = i % 2 ? 'spark_fairy_positive' : 'spark_fairy_negative';
      const s = Characters.create(this, id, this.worldW - 120 + i * 60, this.groundY - F.flyY - i * 40, 'float').setDepth(5);
      s.setScale(s.scaleX * GAME_CONFIG.act2.fairyScale);
      this.attachChargeSign(s, id.endsWith('positive') ? 1 : -1);
      this.worldLayer.add(s);
      BT.fairies.push({ s, hp: F.hp, cool: 1.5 + i * 0.8, t: i, baseY: this.groundY - F.flyY - i * 40 });
    }
  }

  endBattle() {
    this.battle.done = true;
    Sound.stopAllLoops();   // 전투 중 켜진 반복 소리가 시험·다음 층까지 남지 않게 (총괄지시 61번)
    this.chargingAttack = false;
    this.setMusicMode(null);
    Save.setChapter(this.scene.key, { battleDone: true });
    this.say('battle_done', () => {
      this.message.setText('불꽃 요정을 모두 물리쳤다!').setColor(UIKit.SKY);
      this.examBtn = this.showExamIntro(() => this.startExam());
    });
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      if (this.examBtn) this.examBtn.setVisible(false);
      Save.setChapter(this.scene.key, { examPassed: true });
      this.message.setText('2-3 축전기 — 마법서 시험 통과! 열린 철문으로 들어가자 (Z)').setColor(UIKit.SKY);
    });
  }

  // X를 뗀다: 짧게 눌렀으면 보통 공격, 모았으면 한꺼번에 방출
  releaseAttack() {
    const BT = this.battle;
    if (!BT || BT.done || !this.chargingAttack) return;
    this.chargingAttack = false;
    const B = this.cfg.battle, PX = this.PX, dir = this.ian.flipX ? -1 : 1;
    const tap = this.holdT < B.tapSeconds && this.attackFill < 0.1;
    const range = (tap ? B.tapRange : B.range) * PX;
    const target = BT.fairies.filter((f) => !f.gone && Math.sign(f.s.x - this.ian.x) === dir && Math.abs(f.s.x - this.ian.x) <= range)
      .sort((a, b) => Math.abs(a.s.x - this.ian.x) - Math.abs(b.s.x - this.ian.x))[0];
    const dmg = tap ? B.tapDamage : B.fullDamage * this.attackFill;
    Characters.play(this.ian, tap ? 'attack_light' : 'box_charge_release', false);
    this.releaseT = 0.45;
    Sound.play(tap ? 'sfx_spark_small' : 'sfx_box_discharge');
    Sound.stopLoop('sfx_box_charge');
    const x1 = target ? target.s.x : this.ian.x + dir * range, y1 = target ? target.s.y : this.ian.y - 150;
    this.drawBolt(this.ian.x + dir * 50, this.ian.y - 120, x1, y1, tap ? 1 : 2 + 10 * this.attackFill);
    this.attackFill = 0;
    if (target && dmg > 0) {
      target.hp -= dmg;
      Sound.play('sfx_spark_fairy_hit');
      Characters.play(target.s, 'pushed', false);
      if (target.hp <= 0) { target.gone = true; Characters.play(target.s, 'vanish', false); Sound.play('sfx_spark_fairy_vanish'); target.s.once('animationcomplete', () => target.s.destroy()); }
    }
  }

  updateBattle(dt) {
    const BT = this.battle;
    if (!BT || BT.done) return;
    const B = this.cfg.battle, F = B.fairies, PX = this.PX;
    // 모으는 중: 가득 찰 때까지, 그동안 움직일 수 없다
    if (this.chargingAttack) {
      this.holdT += dt;
      if (this.holdT >= B.tapSeconds) {
        if (this.attackFill < 1) Sound.startLoop('sfx_box_charge');
        this.attackFill = Math.min(1, this.attackFill + dt / B.fullSeconds);
        Sound.setLoopRate('sfx_box_charge', 0.8 + 0.6 * this.attackFill);
        if (this.attackFill >= 1 && !this.fullRang) { this.fullRang = true; Sound.play('sfx_box_full'); Sound.stopLoop('sfx_box_charge'); }
        Characters.play(this.ian, 'box_charge_release');
        this.ian.anims.pause(this.ian.anims.currentAnim.frames[0]);
      }
    } else this.fullRang = false;
    // 요정: 이안과 일정 거리를 두고 떠서 번개를 쏜다
    for (const f of BT.fairies) {
      if (f.gone) continue;
      f.t += dt;
      const d = this.ian.x - f.s.x;
      if (Math.abs(d) > F.keepDist * PX) f.s.x += Math.sign(d) * F.speed * PX * dt;
      f.s.y = f.baseY + Math.sin(f.t * 2.5) * 12;
      f.s.setFlipX(d > 0);
      if (!f.s.anims.isPlaying) Characters.play(f.s, 'float');
      f.cool -= dt;
      if (f.cool <= 0 && Math.abs(d) <= (F.keepDist + 1.5) * PX) {
        f.cool = F.shootEvery;
        Characters.play(f.s, 'attack', false);
        Sound.play('sfx_spark_small');
        BT.shots.push({ x: f.s.x, y: f.s.y, v: Math.sign(d) * F.boltSpeed * PX });
      }
    }
    // 요정 번개: 이안에게 닿으면 — 모으는 자세면 상자에 저장, 아니면 피해
    if (!this.shotG) { this.shotG = this.add.graphics().setDepth(6); this.worldLayer.add(this.shotG); }
    this.shotG.clear();
    BT.shots = BT.shots.filter((sh) => {
      sh.x += sh.v * dt;
      sh.y += ((this.ian.y - 120) - sh.y) * Math.min(1, dt * 2);
      if (Math.abs(sh.x - this.ian.x) < 30) {
        if (this.chargingAttack) {
          this.attackFill = Math.min(1, this.attackFill + B.catchAdd);
          Sound.play('sfx_box_charge');
          this.message.setText('요정의 번개를 상자에 받아 모았다!').setColor(UIKit.SKY);
        } else {
          this.ianHp = Math.max(0, this.ianHp - F.damage);
          if (this.hud) this.hud.set('health', this.ianHp);
          Sound.play('sfx_ian_hurt');
          if (this.ianHp <= 0) this.battleLost();
        }
        return false;
      }
      this.shotG.lineStyle(4, 0xfff2a8, 1).lineBetween(sh.x - Math.sign(sh.v) * 26, sh.y - 6, sh.x, sh.y);
      return sh.x > 0 && sh.x < this.worldW;
    });
    if (!BT.waiting && BT.fairies.length && BT.fairies.every((f) => f.gone)) {
      BT.waiting = true;
      this.time.delayedCall(1000, () => { BT.waiting = false; BT.fairies = []; this.spawnWave(); });
    }
  }

  battleLost() {
    const BT = this.battle;
    for (const f of BT.fairies) if (f.s.active) f.s.destroy();
    BT.fairies = [];
    BT.shots = [];
    BT.wave -= 1;
    this.ianHp = 1;
    this.attackFill = 0;
    this.chargingAttack = false;
    if (this.hud) this.hud.set('health', 1);
    this.message.setText('이안이 쓰러졌다… 이 무리를 처음부터').setColor('#ff9a9a');
    this.cameras.main.flash(400, 40, 0, 0);
    this.time.delayedCall(1500, () => this.spawnWave());
  }

  updateBattleText() {
    const BT = this.battle;
    const max = Capacitor.capacity('large_close');
    this.speedPanel.setLines([
      `차지 공격 (큰 판·좁은 간격 상자): ${(max * this.attackFill).toFixed(1)} / ${max.toFixed(1)}${this.chargingAttack ? ' — 모으는 중 (움직일 수 없음)' : ''}`,
      `방출 피해 = 모은 양에 비례 (가득 ${this.cfg.battle.fullDamage})   짧게 누르면 보통 공격`,
      `불꽃 요정 ${BT.fairies.filter((f) => !f.gone).length}마리 (무리 ${Math.max(1, BT.wave)}/${this.cfg.battle.fairies.waves.length})`,
    ]);
  }
}
window.BoxScene = BoxScene;

// ------------------------------------------------------------------ 진실의 원: 축전기 실험 (ACT2_PLAN 3단계 3번)
// 같은 전지(같은 전압)에 상자 넷을 하나씩 연결해 가득 채운 뒤 떼어 본다 — 떼어도 빛이 남는다.
// 상자마다 담은 양을 막대 그래프로 비교: 판이 넓을수록, 간격이 좁을수록 많이 (capacitor.js)
class CapLab {
  static ORDER = ['small_wide', 'large_wide', 'small_close', 'large_close'];

  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const O = MANIFEST.objects;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 60, '진실의 원 — 축전기 상자 실험', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    this.help = UIKit.text(scene, 960, 118, '', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5);
    c.add(this.help);
    // 전지
    c.add(O.battery_cell ? scene.add.image(240, 590, O.battery_cell.key).setOrigin(0.5, 88 / 90).setScale(2)
      : scene.add.image(240, 560, O.mana_stone.key).setScale(2));
    c.add(UIKit.text(scene, 240, 620, '번개 전지 (같은 전압)', { fontSize: '22px' }).setOrigin(0.5, 0));
    this.wire = scene.add.graphics();
    c.add(this.wire);
    // 상자 넷과 막대 그래프
    this.items = CapLab.ORDER.map((type, i) => {
      const x = 560 + i * 330, y = 640;
      const body = scene.add.image(x, y, O.lightning_box.states[type]).setOrigin(0.5, 1).setScale(1.6);
      const glow = scene.add.image(x, y, O['box_charge_glow_' + type].states['00']).setOrigin(0.5, 1).setScale(1.6).setBlendMode('ADD');
      const name = { small_wide: '작은 판·넓은 간격', large_wide: '큰 판·넓은 간격', small_close: '작은 판·좁은 간격', large_close: '큰 판·좁은 간격' }[type];
      const cap = UIKit.text(scene, x, y + 14, `${i + 1}  ${name}`, { fontSize: '22px' }).setOrigin(0.5, 0);   // 1~4 키로 고른다
      const bar = scene.add.rectangle(x, 960, 90, 230, 0x9fe0ff, 0.9).setOrigin(0.5, 1).setScale(1, 0);   // 막대는 위로 자란다 (세로 배율)
      const val = UIKit.text(scene, x, 960, '', { fontSize: '24px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5, 1);
      c.add([body, glow, cap, bar, val]);
      return { type, x, y, glow, bar, val, fill: 0 };
    });
    c.add(scene.add.rectangle(400, 962, 1400, 3, 0xf3ead6).setOrigin(0, 0));
    this.info = UIKit.text(scene, 960, 180, '', { fontSize: '28px', align: 'center' }).setOrigin(0.5, 0);
    c.add(this.info);
    scene.input.keyboard.on('keydown-SPACE', () => this.next());
    scene.input.keyboard.on('keydown-ESC', () => this.close());
    ['ONE', 'TWO', 'THREE', 'FOUR'].forEach((k, i) => scene.input.keyboard.on('keydown-' + k, () => this.isOpen && this.charge(i)));
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.step = -1;
    this.charging = null;
    this.container.setVisible(true);
    for (const it of this.items) { it.fill = 0; it.bar.setScale(1, 0); it.val.setText(''); }
    this.help.setText('1~4: 고른 상자를 전지에 연결해 채우기 (Space: 차례로)    Esc: 닫기');
    this.info.setText('같은 전지로 상자 넷을 하나씩 채운 뒤 떼어 보자').setColor('#ffe08a');
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    Sound.stopLoop('sfx_box_charge');
    this.container.setVisible(false);
  }

  // Space: 아직 안 채운 상자를 차례로
  next() {
    const it = this.items.find((x) => x.fill <= 0);
    if (it) this.charge(this.items.indexOf(it));
  }

  // 1~4: 학생이 고른 상자를 충전 (총괄지시 2막리뷰 40번)
  charge(i) {
    if (!this.isOpen || this.done || this.charging) return;
    const it = this.items[i];
    if (!it || it.fill >= 1) { if (it) this.info.setText(`이미 가득 채웠다 — 담은 양 ${Capacitor.stored(it.type, it.fill).toFixed(1)}`).setColor(UIKit.SKY); return; }
    this.step += 1;
    this.charging = it;
    Sound.startLoop('sfx_box_charge');
    this.info.setText('충전 중…').setColor('#ffe08a');
  }

  update(dt) {
    if (!this.isOpen) return;
    const it = this.charging, O = MANIFEST.objects;
    this.wire.clear();
    if (it) {
      it.fill = Capacitor.charge(it.fill, dt, { connected: true });   // 진실의 원 안: 진짜 법칙
      Sound.setLoopRate('sfx_box_charge', 0.8 + 0.6 * it.fill);
      this.wire.lineStyle(4, 0x9fe0ff, 0.9).lineBetween(350, 545, it.x - 60, it.y - 80);   // 전지 + 단자에서
      if (it.fill >= 1) {
        // 가득 차면 떼어 본다 — 떼어도 그대로 (connected = false, 해방 규칙)
        Sound.stopLoop('sfx_box_charge');
        Sound.play('sfx_box_full');
        it.fill = Capacitor.charge(it.fill, 0, { connected: false, cursed: false });
        this.charging = null;
        const amt = Capacitor.stored(it.type, it.fill);
        this.info.setText(`떼어도 빛이 그대로! 담은 양 ${amt.toFixed(1)}`).setColor(UIKit.SKY);
        if (this.items.every((x) => x.fill >= 1) && !this.done) {
          this.done = true;
          this.help.setText('');
          this.info.setText('판이 넓을수록, 간격이 좁을수록 더 많이 담긴다 — 큰 판·좁은 간격이 가장 많다').setColor(UIKit.SKY);
          UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
        }
      }
    }
    const max = Capacitor.capacity('large_close');
    for (const x of this.items) {
      x.glow.setTexture(O['box_charge_glow_' + x.type].states[Capacitor.glowState(x.fill)]);
      const k = Capacitor.stored(x.type, x.fill) / max;
      x.bar.setScale(1, k);
      x.val.setPosition(x.x, 960 - 230 * k - 6).setText(x.fill > 0 ? Capacitor.stored(x.type, x.fill).toFixed(1) : '');
    }
  }
}
window.CapLab = CapLab;
