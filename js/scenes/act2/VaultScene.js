// 2-4 탑 4층 자석 금고 (ACT2_PLAN 4단계) — 배경 tower_f4 (2400px)
//
// 이번 묶음: 방 배치 + 열쇠 세 개 + 자석 갈고리(V) + 세 칸 금고 + 저주 이야기 + 진실의 원 실험 + 저주 해제.
//   물질별 반응은 js/physics/act2/magnetism.js (철 강하게 끌림 / 알루미늄 아주 약하게 끌림 / 구리·흑연 아주 약하게 밀림)
//   V: 앞쪽 가장 가까운 열쇠로 갈고리를 던진다. 저주: 모든 열쇠가 철처럼 붙어 온다. 해방: 철 열쇠만 끌려오고
//      알루미늄은 살짝 끌리듯, 구리는 살짝 밀리듯 움직일 뿐(손으로 줍는다).
//   Z: 열쇠 줍기 / 금고 앞이면 가장 가까운 칸에 넣기 / 그 밖이면 내려놓기 / 진실의 원 안(저주)이면 실험
//   저주: 금고는 어떤 열쇠도 받아 주지 않는다. 해방: 맞는 칸(망치 = 철, 깃털 = 알루미늄)이 열린다.
//   둘째 묶음: 동전(구리) 칸 자물쇠는 옆 자석 받침과 이어져 있다. 흑연판(반자성)을 받침에 올려 떠오르게 해야 풀린다.
//      저주 상태에서는 흑연판이 그냥 얹혀 있을 뿐이다.
//   셋째 묶음: 세 칸이 다 열리면 자석 장갑 전투(bgm_midboss) → 시험 10 → 오른쪽 끝으로 5층.
//      V 장갑: 철갑 기사는 끌려와 창을 빼앗기고(Z로 던짐), 구리 갑옷 병사는 장갑이 안 통한다. X 지팡이 번개는 둘 다에게.
class VaultScene extends ChapterScene {
  static MATERIALS = ['iron', 'aluminum', 'copper'];
  static NAMES = { iron: '철', aluminum: '알루미늄', copper: '구리', graphite: '흑연' };
  static SIGNS = { iron: '망치', aluminum: '깃털', copper: '동전' };

  constructor() {
    super('Ch2_4');
  }

  buildWorld() {
    const cfg = GAME_CONFIG.act2.ch2_4;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    const saved = Save.chapter(this.scene.key);
    // 세 칸 금고 (몸체 바닥 = 바닥선) + 칸 문 셋 (JSON top_left_in_vault)
    const v = cfg.vault;
    const body = this.add.image(v.x, this.groundY, O.vault_3.states.body)
      .setOrigin(O.vault_3.pivot.x / O.vault_3.width, O.vault_3.pivot.y / O.vault_3.height).setDepth(-1);
    this.worldLayer.add(body);
    this.opened = Object.assign({}, saved.vaultOpen || {});
    this.doors = {};
    for (const m of VaultScene.MATERIALS) {
      const d = O['vault_3_door_' + m];
      const x = v.left + d.top_left_in_vault[0] + d.width / 2;
      const img = this.add.image(x, v.top + d.top_left_in_vault[1], d.states[this.opened[m] ? 'open' : 'closed'])
        .setOrigin(0.5, 0).setDepth(0);
      this.worldLayer.add(img);
      this.doors[m] = { img, x };
    }
    // 열쇠 셋 (금고에 넣은 열쇠는 보이지 않는다)
    this.keys = VaultScene.MATERIALS.map((m) => {
      const img = this.add.image(cfg.keys[m], this.groundY - 4, O['key_' + m].key).setOrigin(0.5, 1).setScale(cfg.keyScale).setDepth(2);
      this.worldLayer.add(img);
      const k = { material: m, img, x: cfg.keys[m], placed: !!this.opened[m] };
      img.setVisible(!k.placed);
      return k;
    });
    // 자석 받침 + 흑연판 (흑연판도 갈고리·줍기는 열쇠와 같다: material 'graphite')
    const gc = cfg.graphite;
    this.stand = this.add.image(gc.standX, this.groundY, O.graphite_stand.key)
      .setOrigin(O.graphite_stand.pivot.x / O.graphite_stand.width, 1).setScale(gc.scale).setDepth(1);
    this.worldLayer.add(this.stand);
    const plate = this.add.image(gc.plateX, this.groundY - 4, O.graphite_plate.key).setOrigin(0.5, 1).setScale(gc.scale).setDepth(2);
    this.worldLayer.add(plate);
    this.plate = { material: 'graphite', img: plate, x: gc.plateX, placed: false, onStand: !!saved.graphiteOn };
    this.keys.push(this.plate);
    this.floating = false;
    if (this.plate.onStand) { this.plate.placed = true; this.setFloating(!this.curse.cursed); }
    this.carried = null;
    this.tested = new Set(saved.tested || []);   // 갈고리로 시험해 본 물질 (숫자판에 그 줄만 채운다 — 총괄지시 2막리뷰 32번)
    // 자석 갈고리 (줄 + 말굽 자석)
    this.hookLine = this.add.graphics().setDepth(5);
    this.hookImg = this.add.image(0, 0, O.magnet_hook.key).setDepth(6).setVisible(false);
    this.worldLayer.add([this.hookLine, this.hookImg]);
    this.hook = null;
    // 약한 반응 표시(화살표·글자)
    this.hint = this.add.graphics().setDepth(7);
    this.hintText = UIKit.text(this, 0, 0, '', { fontSize: '22px', color: '#cfe3f5', backgroundColor: '#0b1320cc', padding: { x: 8, y: 4 } })
      .setOrigin(0.5, 1).setDepth(8).setVisible(false);
    this.worldLayer.add([this.hint, this.hintText]);

    this.circle = this.curse.addTruthCircle({ centerX: cfg.circleX, groundY: this.groundY, diameter: 3.6, domeHeight: 2.6 });
    this.curse.setCircleActive(this.circle, !this.curse.cursed || !!saved.circleLit);

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, this.groundY).setDepth(4);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, this.groundY).setDepth(3);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });

    const kb = this.input.keyboard;
    this.keysIn = kb.addKeys({ left: 'LEFT', right: 'RIGHT', act: 'Z', pull: 'V' });
    kb.addCapture(['Z', 'V']);
    this.keysIn.act.on('down', () => this.interact());
    this.keysIn.pull.on('down', () => this.throwHook());
    this.flags = {};
    this.lab = new MagLab(this, this.uiLayer);
  }

  addPrompts() {
    const c = this.cfg, PX = this.PX;
    const ahead = () => {
      const f = this.ian.flipX ? -1 : 1;
      const k = this.keys.filter((o) => !o.placed && (o.x - this.ian.x) * f > c.reach * PX && Math.abs(o.x - this.ian.x) <= c.hook.reach * PX)
        .sort((a, b) => Math.abs(a.x - this.ian.x) - Math.abs(b.x - this.ian.x))[0];
      return k ? k.x : null;
    };
    this.addPrompt({ key: 'Z', text: '자석 실험', x: () => this.cfg.circleX * this.PX, range: 1.8 * this.PX,
      when: () => this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x) });
    this.addPrompt({ key: 'Z', text: () => (this.keys.find((o) => !o.placed && this.near(o.x)) === this.plate ? '흑연판 줍기' : '열쇠 줍기'),
      x: () => { const k = this.keys.find((o) => !o.placed && this.near(o.x)); return k ? k.x : null; }, when: () => !this.carried && !this.battle });
    this.addPrompt({ key: 'V', text: '자석 갈고리 던지기', x: ahead, range: c.hook.reach * PX, y: this.groundY - 220, when: () => !this.carried && !this.hook && !this.battle,
      newKey: '자석 갈고리 — 바라보는 쪽 열쇠에 던진다' });
    this.addPrompt({ key: 'Z', text: '가까운 칸에 넣기', x: c.vault.x, range: 188 + c.reach * PX * 0.5, when: () => !!this.carried && this.carried !== this.plate && !this.battle });
    this.addPrompt({ key: 'Z', text: '자석 받침에 올리기', x: c.graphite.standX, when: () => this.carried === this.plate });
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  onReady() {
    this.addPrompts();
    this.helpText = UIKit.text(this, 1900, 1070, '← → 걷기   V 자석 갈고리   Z 열쇠 줍기·금고에 넣기·내려놓기   M 마법서', {
      fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(300);
    this.uiLayer.add(this.helpText);
    // 이미 전투를 끝냈으면 시험 버튼부터
    const saved = Save.chapter(this.scene.key);
    if (saved.battleDone && !saved.examPassed) {
      this.battle = { done: true, enemies: [] };
      this.examBtn = this.showExamIntro(() => this.startExam());
    }
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1136, 150);
    this.message.setText(this.curse.cursed ? 'V: 자석 갈고리로 열쇠를 끌어와 보자' : '');   // 해방된 장에 다시 들어오면 저주 때 안내를 띄우지 않는다 (총괄지시 2막리뷰 44번 — 목표 줄이 해방 상태 안내)
    // 교사용: 약한 반응(상자성·반자성)을 화면에서 키워 보이는 배율
    this.teacherExtra = {
      label: () => `약한 반응 과장 배율 ×${GAME_CONFIG.act2.magnetism.exaggerate} (바꾸기)`,
      toggle: () => {
        const list = [1, 20, 60, 120], m = GAME_CONFIG.act2.magnetism;
        m.exaggerate = list[(list.indexOf(m.exaggerate) + 1) % list.length] || 60;
      },
    };
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 모든 금속이 자석에 강하게 붙는다?'
      : '진짜 법칙: 철은 강하게 끌리고(강자성), 알루미늄은 아주 약하게 끌리고(상자성), 구리·흑연은 아주 약하게 밀린다(반자성)';
  }

  near(x) {
    return Math.abs(this.ian.x - x) <= this.cfg.reach * this.PX;
  }

  nearVault() {
    const v = this.cfg.vault;
    return Math.abs(this.ian.x - v.x) <= 188 + this.cfg.reach * this.PX * 0.5;
  }

  allOpen() {
    return VaultScene.MATERIALS.every((m) => this.opened[m]);
  }

  canLeave() {
    return !!Save.chapter(this.scene.key).examPassed;
  }

  // ------------------------------------------------------------------ Z
  interact() {
    if (this.isBlocked() || this.hook) return;
    if (this.battle && !this.battle.done) { this.throwSpear(); return; }
    // 진실의 원 안(저주): 자석 실험
    if (this.curse.cursed && this.circle.active && this.curse.inCircle(this.ian.x) && !this.carried) {
      const open = () => this.lab.open(() => this.onLabDone());
      if (this.flags.labTalked) { open(); return; }
      this.flags.labTalked = true;
      this.say('lab_start', open);
      return;
    }
    if (this.carried) {
      if (this.carried === this.plate) {
        if (Math.abs(this.ian.x - this.cfg.graphite.standX) <= this.cfg.reach * this.PX) { this.putOnStand(); return; }
        if (this.nearVault()) { this.message.setText('흑연판은 열쇠가 아니다 — 옆의 자석 받침에 올려 보자').setColor('#ffd27a'); return; }
      }
      if (this.nearVault()) { this.putInVault(this.carried); return; }
      this.dropKey(this.carried, this.ian.x + (this.ian.flipX ? -1 : 1) * 50);
      return;
    }
    const k = this.keys.find((o) => !o.placed && this.near(o.x));
    if (k) {
      this.carried = k;
      Sound.play('sfx_ui_click');
      this.message.setText(k === this.plate ? '흑연판을 손으로 주웠다' : `${VaultScene.NAMES[k.material]} 열쇠를 손으로 주웠다`).setColor('#ffe08a');
    }
  }

  dropKey(k, x) {
    this.carried = null;
    k.x = Phaser.Math.Clamp(x, 40, this.worldW - 40);
  }

  // 금고 앞: 이안과 가장 가까운 칸에 넣는다
  putInVault(k) {
    const slot = VaultScene.MATERIALS.reduce((a, b) => (Math.abs(this.doors[a].x - this.ian.x) <= Math.abs(this.doors[b].x - this.ian.x) ? a : b));
    const door = this.doors[slot];
    if (this.opened[slot]) { this.message.setText(`${VaultScene.SIGNS[slot]} 칸은 이미 열렸다`).setColor('#ffd27a'); return; }
    Characters.play(this.ian, 'push', false);
    this.actT = 0.4;
    // 저주: 어떤 열쇠도 받아 주지 않는다
    if (this.curse.cursed || k.material !== slot) {
      Sound.play('sfx_exam_wrong');
      door.img.setTint(0xff9a9a);
      this.time.delayedCall(250, () => door.img.clearTint());
      this.message.setText(this.curse.cursed
        ? `${VaultScene.SIGNS[slot]} 칸이 열쇠를 밀어낸다… 열리지 않는다`
        : `${VaultScene.SIGNS[slot]} 칸이 ${VaultScene.NAMES[k.material]} 열쇠를 받지 않는다 — 다른 칸일까?`).setColor('#c79bff');
      if (this.curse.cursed && !this.flags.rejected) {
        this.flags.rejected = true;
        this.time.delayedCall(900, () => this.say('vault_reject', () => { this.lightCircle(); this.say('circle_found'); }));
      }
      return;
    }
    // 구리 칸: 자석 받침 위에 흑연판이 떠 있어야 자물쇠가 풀린다
    if (slot === 'copper' && !this.floating) {
      Sound.play('sfx_magnet_none');
      this.message.setText('동전 칸의 자물쇠가 꿈쩍하지 않는다 — 옆의 자석 받침과 이어져 있다').setColor('#ffd27a');
      if (!this.flags.copperTalk) { this.flags.copperTalk = true; this.say('copper_locked'); }
      return;
    }
    this.openSlot(slot);
    this.carried = null;
    k.placed = true;
    k.img.setVisible(false);
  }

  openSlot(slot) {
    this.opened[slot] = true;
    this.doors[slot].img.setTexture(MANIFEST.objects['vault_3_door_' + slot].states.open);
    Sound.play('sfx_door_open');
    Save.setChapter(this.scene.key, { vaultOpen: Object.assign({}, this.opened) });
    this.message.setText(`${VaultScene.SIGNS[slot]} 칸이 열렸다! (${VaultScene.NAMES[slot]} 열쇠)`).setColor(UIKit.SKY);
    // 세 칸이 다 열리면: 대사 → 전투 (전투는 이 대사가 끝난 뒤에만 — 둘이 겹쳐 전투가 시작되지 않던 것, 총괄지시 49번)
    if (this.allOpen()) {
      this.flags.battleQueued = true;
      this.time.delayedCall(900, () => {
        this.message.setText('금고 세 칸이 모두 열렸다! 오른쪽에서 무언가 다가온다').setColor(UIKit.SKY);
        this.say('vault_all_open', () => this.time.delayedCall(600, () => this.startBattle()));
      });
    }
  }

  // 흑연판을 자석 받침에 올린다: 해방이면 반자성으로 밀려나 떠오른다 (저주: 그냥 얹힘)
  putOnStand() {
    const p = this.plate;
    this.carried = null;
    p.placed = true;
    p.onStand = true;
    if (!this.curse.cursed && !this.tested.has('graphite')) { this.tested.add('graphite'); Save.setChapter(this.scene.key, { tested: [...this.tested] }); }
    Characters.play(this.ian, 'push', false);
    this.actT = 0.4;
    Save.setChapter(this.scene.key, { graphiteOn: true });
    if (this.curse.cursed) {
      this.setFloating(false);
      Sound.play('sfx_magnet_none');
      this.message.setText('흑연판을 받침에 올렸다… 아무 일도 없다').setColor('#c79bff');
      return;
    }
    this.setFloating(true);
    Sound.play('sfx_graphite_float');
    this.message.setText('흑연판이 둥실 떠올랐다! — 동전 칸 자물쇠가 풀렸다').setColor(UIKit.SKY);
    this.stand.setTint(0x9fe0ff);
    this.time.delayedCall(300, () => this.stand.clearTint());
    // 확대 창과 글은 대사와 같은 순간에 (총괄지시 65번)
    if (!this.flags.floatTalk) {
      this.flags.floatTalk = true;
      this.time.delayedCall(700, () => { this.showFloatZoom(true); this.say('graphite_float', () => this.hideFloatZoomLater()); });
    } else this.showFloatZoom();
  }

  // 확대 창: 받침과 흑연판을 크게 — 받침 윗면과 판 아랫면 사이 틈을 하늘빛 선 두 개와 위 화살표로 (방 안에도 같은 표시)
  showFloatZoom(untilTalkEnds = false) {
    const Z = this.cfg.graphite.zoom, O = MANIFEST.objects;
    if (!this.zoomBox) {
      const c = this.add.container(Z.x, Z.y).setScrollFactor(0).setDepth(1500);   // 숫자판 위, 대사창은 아래쪽이라 겹치지 않음
      const w = 640, h = 380;
      c.add(this.add.rectangle(0, 0, w, h, 0x0b1320, 1).setStrokeStyle(3, 0x9fd8ff, 0.9));
      c.add(UIKit.text(this, -w / 2 + 16, -h / 2 + 10, '확대', { fontSize: '22px', fontStyle: 'bold', color: UIKit.SKY }));
      const stand = this.add.image(0, 70, O.graphite_stand.key).setOrigin(0.5, 1).setScale(Z.scale);
      const plate = this.add.image(0, 0, O.graphite_plate.key).setOrigin(0.5, 1).setScale(Z.scale);
      const g = this.add.graphics();
      const label = UIKit.text(this, 0, h / 2 - 16, '자석 받침 위에 떠 있다!\n(흑연은 반자성 — 자석에 아주 약하게 밀려난다)',
        { fontSize: '24px', fontStyle: 'bold', color: UIKit.SKY, align: 'center' }).setOrigin(0.5, 1);
      c.add([stand, plate, g, label]);
      this.uiLayer.add(c);
      this.zoomBox = { c, stand, plate, g };
      this.zoomWorldG = this.add.graphics().setDepth(3);
      this.worldLayer.add(this.zoomWorldG);
    }
    if (this.zoomHide) { this.zoomHide.remove(); this.zoomHide = null; }
    this.zoomBox.c.setVisible(true);
    this.zoomWorldG.setVisible(true);
    if (!untilTalkEnds) this.hideFloatZoomLater();
  }

  hideFloatZoomLater() {
    if (!this.zoomBox) return;
    if (this.zoomHide) this.zoomHide.remove();
    this.zoomHide = this.time.delayedCall(this.cfg.graphite.zoom.seconds * 1000, () => {
      this.zoomBox.c.setVisible(false);
      this.zoomWorldG.setVisible(false).clear();
      this.zoomHide = null;
    });
  }

  // 틈 표시: 아래 선(받침 윗면) · 위 선(판 아랫면) · 그 사이 위 화살표
  drawGap(g, x, w, yLow, yHigh, thick) {
    g.clear();
    if (yLow - yHigh < 2) return;
    g.lineStyle(thick, 0x9fe0ff, 1);
    g.lineBetween(x - w / 2, yLow, x + w / 2, yLow);
    g.lineBetween(x - w / 2, yHigh, x + w / 2, yHigh);
    const ax = x + w / 2 + thick * 6, head = Math.min(thick * 4, (yLow - yHigh) / 2);
    g.lineBetween(ax, yLow, ax, yHigh);
    g.fillStyle(0x9fe0ff, 1);
    g.fillTriangle(ax, yHigh, ax - head, yHigh + head, ax + head, yHigh + head);
  }

  setFloating(on) {
    this.floating = on;
    this.floatT = 0;
  }

  // 받침 위 흑연판 자리: 얹힘(restY) → 뜨면 그림 JSON 자리(floatY)까지 올라가 살짝 둥실
  updatePlate(dt) {
    const p = this.plate, gc = this.cfg.graphite, O = MANIFEST.objects;
    if (!p.onStand) return;
    const top = this.groundY - O.graphite_stand.height * gc.scale;      // 받침 그림의 위 모서리
    const bottomAt = (y) => top + (y + O.graphite_plate.height) * gc.scale;   // 판 그림 왼쪽 위 y → 판 아래 모서리
    this.floatT = (this.floatT || 0) + dt;
    const k = this.floating ? Math.min(1, this.floatT / 0.8) : 0;
    const y = bottomAt(gc.restY) + (bottomAt(gc.floatY) - bottomAt(gc.restY)) * k + (this.floating ? Math.sin(this.floatT * 2.5) * gc.bob * k : 0);
    p.img.setVisible(true).setPosition(gc.standX, y).setDepth(2).setAngle(0);
    // 확대 창이 떠 있으면 같은 틈을 크게 (방 안 틈 × 확대 배율 ÷ 방 배율)
    if (this.zoomBox && this.zoomBox.c.visible) {
      const Z = gc.zoom, zb = this.zoomBox, rest = bottomAt(gc.restY);
      const standTop = zb.stand.y - O.graphite_stand.height * Z.scale + (gc.restY + O.graphite_plate.height) * Z.scale;
      const gapZ = (rest - y) / gc.scale * Z.scale;
      zb.plate.setPosition(0, standTop - gapZ);
      const pw = O.graphite_plate.width * Z.scale;
      this.drawGap(zb.g, 0, pw, standTop, standTop - gapZ, 4);
      this.drawGap(this.zoomWorldG, gc.standX, O.graphite_plate.width * gc.scale, rest, y, 2);
    }
  }

  // ------------------------------------------------------------------ V 자석 갈고리
  throwHook() {
    if (this.battle && !this.battle.done) { this.glovePull(); return; }
    if (this.isBlocked() || this.hook || this.actT > 0) return;
    if (this.carried) { this.message.setText('열쇠를 들고 있다 — 먼저 내려놓거나 금고에 넣자 (Z)').setColor('#ffd27a'); return; }
    const cfg = this.cfg.hook, PX = this.PX, f = this.ian.flipX ? -1 : 1;
    const ahead = this.keys.filter((k) => !k.placed && (k.x - this.ian.x) * f > 0 && Math.abs(k.x - this.ian.x) <= cfg.reach * PX)
      .sort((a, b) => Math.abs(a.x - this.ian.x) - Math.abs(b.x - this.ian.x));
    const target = ahead[0] || null;
    const endX = target ? target.x - f * cfg.gap * PX : this.ian.x + f * cfg.reach * PX;
    Characters.play(this.ian, 'magnet_pull', false);
    this.actT = 0.3;
    this.hook = { phase: 'out', x: this.ian.x + f * 50, endX, f, target, carry: null };
    this.hookImg.setVisible(true);
  }

  // 갈고리가 열쇠 앞에 닿았을 때: 물질별 반응
  hookArrive(h) {
    const k = h.target;
    if (!k) { h.phase = 'back'; return; }
    const r = Magnetism.response(k.material, this.cfg.hook.gap, { cursed: this.curse.cursed });
    if (!this.curse.cursed && !this.tested.has(k.material)) {
      this.tested.add(k.material);
      Save.setChapter(this.scene.key, { tested: [...this.tested] });
    }
    if (r.lift) {
      Sound.play('sfx_magnet_iron');
      h.carry = k;
      if (this.curse.cursed && !this.flags.firstPull) { this.flags.firstPull = true; this.pendingSay = 'first_pull'; }
      this.message.setText(this.curse.cursed ? `${VaultScene.NAMES[k.material]} 열쇠가 자석에 착 붙었다!`
        : '철 열쇠가 강하게 끌려와 붙었다!').setColor(this.curse.cursed ? '#c79bff' : UIKit.SKY);
    } else {
      // 알루미늄: 아주 약하게 끌림 / 구리: 아주 약하게 밀림 — 1~2px 움직이고 살짝 기운다 (화살표로 보이게)
      Sound.play('sfx_magnet_none');
      const toward = -h.f * r.dir;   // 갈고리(이안) 쪽이 + 끌림
      const px = Math.max(1, Math.min(2, r.shown * 2));
      k.x += toward * px;
      this.tweens.add({ targets: k.img, angle: toward * 6, duration: 160, yoyo: true });
      this.showHint(k, toward, r);
      this.message.setText(r.dir > 0 ? '알루미늄 열쇠가 아주 약하게 끌릴 뿐, 붙지 않는다 — 손으로 줍자 (Z)'
        : `${k === this.plate ? '흑연판은' : '구리 열쇠는'} 오히려 아주 약하게 밀려난다 — 손으로 줍자 (Z)`).setColor('#ffd27a');
    }
    h.phase = 'back';
  }

  // 약한 반응: 열쇠 위에 화살표(과장 배율만큼 길게)와 글자
  showHint(k, toward, r) {
    const g = this.hint, x = k.img.x, y = k.img.y - 80;
    const len = 20 + 60 * r.shown;
    g.clear().lineStyle(5, 0x9fe0ff, 1).lineBetween(x, y, x + toward * len, y);
    g.fillStyle(0x9fe0ff, 1).fillTriangle(x + toward * (len + 14), y, x + toward * len, y - 9, x + toward * len, y + 9);
    this.hintText.setPosition(x, y - 16).setVisible(true)
      .setText(`${r.dir > 0 ? '아주 약하게 끌림' : '아주 약하게 밀림'} (화살표 ×${GAME_CONFIG.act2.magnetism.exaggerate})`);
    if (this.hintTimer) this.hintTimer.remove();
    this.hintTimer = this.time.delayedCall(2200, () => { g.clear(); this.hintText.setVisible(false); });
  }

  lightCircle() {
    this.curse.setCircleActive(this.circle, true);
    this.circle.image.setAlpha(0);
    this.tweens.add({ targets: this.circle.image, alpha: 1, duration: 1200 });
    Sound.play('sfx_truth_circle_enter');
    Save.setChapter(this.scene.key, { circleLit: true });
    this.message.setText('금고 앞 바닥에 진실의 원이 나타났다! 가 보자').setColor('#ffe08a');
  }

  // 실험 뒤: 깨달음 → 저주 풀기(카드 10 + 마법서 10장) → 대사
  onLabDone() {
    this.realizing = true;
    this.ian.setFlipX(false);
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        this.message.setText('이제 진짜 법칙대로! 열쇠의 반응을 보고 칸에 나눠 넣자').setColor(UIKit.SKY);
        if (this.plate.onStand) { this.setFloating(true); Sound.play('sfx_graphite_float'); this.showFloatZoom(); }
        this.say('after_free');
      }));
    });
  }

  // ------------------------------------------------------------------ 매 프레임
  update(time, deltaMs) {
    super.update(time, deltaMs);
    // 대사 중에도 흑연판은 떠오르고 둥실거린다 — 대사와 같은 순간에 떠 있음이 보이게 (총괄지시 65번)
    if (this.isBlocked() && this.plate) this.updatePlate(Math.min(deltaMs, 50) / 1000);
  }

  updateWorld(dt) {
    const cfg = this.cfg, PX = this.PX;
    this.actT = Math.max(0, (this.actT || 0) - dt);
    const busy = this.actT > 0 || this.hook || this.realizing;
    const dir = busy ? 0 : (this.keysIn.right.isDown ? 1 : 0) - (this.keysIn.left.isDown ? 1 : 0);
    this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * cfg.walkSpeed * PX * dt, 60, this.worldW - 60);
    if (dir) this.ian.setFlipX(dir < 0);
    if (!busy) Characters.play(this.ian, dir ? 'walk' : 'idle');
    this.updateHook(dt);
    this.updatePlate(dt);
    if (this.pendingSay && !this.hook && !this.dialogue.active) { const k = this.pendingSay; this.pendingSay = null; this.say(k); }
    // 열쇠: 들고 있으면 이안 손 앞, 아니면 바닥
    for (const k of this.keys) {
      if (k.placed) continue;
      if (k === this.carried) {
        const f = this.ian.flipX ? -1 : 1;
        k.img.setPosition(this.ian.x + f * 46, this.ian.y - 70).setDepth(5);
      } else if (!(this.hook && this.hook.carry === k)) {
        k.img.setPosition(k.x, this.groundY - 4).setDepth(2);
      }
    }
    this.updateBattle(dt);
    // 세 칸이 다 열리면 전투 (대사가 끝난 뒤)
    if (this.allOpen() && !this.battle && !this.dialogue.active && !this.realizing && !this.canLeave() && !this.flags.battleQueued) {
      this.flags.battleQueued = true;
      this.time.delayedCall(800, () => this.startBattle());
    }
    // 시험을 통과하면 오른쪽 끝으로 나간다
    if (this.canLeave() && this.ian.x >= cfg.exitX && !this.flags.leaving) {
      this.leaveRoom({ x: cfg.exitX });
    }
    if (this.battle && !this.battle.done) this.updateBattleText(); else this.updatePanel();
  }

  // ------------------------------------------------------------------ 자석 장갑 전투 (ACT2_PLAN 4단계 6번)
  startBattle() {
    if (this.battle) return;
    if (this.dialogue.active) { this.time.delayedCall(500, () => this.startBattle()); return; }
    if (this.carried) this.dropKey(this.carried, this.ian.x - 60);
    this.battle = { wave: 0, enemies: [], done: false };
    this.ianHp = 1;
    this.fireT = 0;
    this.spear = false;
    this.spearShot = null;
    this.setMusicMode('midboss');
    this.helpText.setText('← → 걷기   X 지팡이 번개   V 자석 장갑   Z 빼앗은 창 던지기   M 마법서');
    this.fireKey = this.input.keyboard.addKey('X');
    this.input.keyboard.addCapture(['X']);
    this.boltG = this.add.graphics().setDepth(7);
    this.spearG = this.add.graphics().setDepth(7);
    this.worldLayer.add([this.boltG, this.spearG]);
    this.say('battle_start', () => {
      this.introKey('V', '자석 장갑 — 앞쪽 적을 끌어당긴다 (철만)');
      this.time.delayedCall(3300, () => this.introKey('Z', '빼앗은 창 던지기'));
      this.spawnWave();
    });
  }

  spawnWave() {
    const B = this.cfg.battle, BT = this.battle;
    for (const e of BT.enemies) if (e.s.active) e.s.destroy();
    BT.enemies = [];
    BT.wave += 1;
    if (BT.wave > B.waves.length) { this.endBattle(); return; }
    B.waves[BT.wave - 1].forEach((kind, i) => {
      const c = B[kind];
      const s = Characters.create(this, kind === 'knight' ? 'iron_knight' : 'copper_soldier', B.startX + i * B.gap, this.groundY, 'walk').setDepth(5);
      this.worldLayer.add(s);
      BT.enemies.push({ s, kind, hp: c.hp, max: c.hp, armed: kind === 'knight', cool: 1.5 + i * 0.5, drag: false });
    });
  }

  endBattle() {
    this.battle.done = true;
    Sound.stopAllLoops();   // 전투 중 켜진 반복 소리가 시험·다음 층까지 남지 않게 (총괄지시 61번)
    this.boltG.clear();
    this.spearG.clear();
    this.setMusicMode(null);
    this.helpText.setText('← → 걷기   M 마법서').setColor(UIKit.LIGHT);
    Save.setChapter(this.scene.key, { battleDone: true });
    this.say('battle_done', () => {
      this.message.setText('철갑 기사와 구리 병사를 모두 물리쳤다!').setColor(UIKit.SKY);
      this.examBtn = this.showExamIntro(() => this.startExam());
    });
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      if (this.examBtn) this.examBtn.setVisible(false);
      Save.setChapter(this.scene.key, { examPassed: true });
      this.message.setText('2-4 물질의 자성 — 마법서 시험 통과! 오른쪽 끝으로 가 5층으로 올라가자').setColor(UIKit.SKY);
    });
  }

  // 바라보는 쪽 가장 가까운 살아 있는 적
  enemyAhead(range, kind) {
    const dir = this.ian.flipX ? -1 : 1;
    return this.battle.enemies.filter((e) => !e.gone && (!kind || e.kind === kind) && Math.sign(e.s.x - this.ian.x) === dir && Math.abs(e.s.x - this.ian.x) <= range)
      .sort((a, b) => Math.abs(a.s.x - this.ian.x) - Math.abs(b.s.x - this.ian.x))[0];
  }

  // X: 지팡이 번개 (철·구리 모두에게)
  fireStaff() {
    const S = this.cfg.battle.staff, PX = this.PX;
    if (this.fireT > 0 || this.actT > 0) return;
    this.fireT = S.every;
    const dir = this.ian.flipX ? -1 : 1, e = this.enemyAhead(S.range * PX);
    Characters.play(this.ian, 'attack_lightning', false);
    this.actT = 0.3;
    Sound.play('sfx_bolt_thin');
    const x0 = this.ian.x + dir * 60, y0 = this.ian.y - 130;
    const x1 = e ? e.s.x : x0 + dir * S.range * PX, y1 = e ? e.s.y - 140 : y0;
    const pts = [{ x: x0, y: y0 }];
    for (let i = 1; i < 7; i++) pts.push({ x: x0 + (x1 - x0) * i / 7, y: y0 + (y1 - y0) * i / 7 + (Math.random() - 0.5) * 30 });
    pts.push({ x: x1, y: y1 });
    this.boltG.clear().lineStyle(6, 0xffe9a0, 0.45).strokePoints(pts).lineStyle(2, 0xfffbe6, 1).strokePoints(pts);
    this.time.delayedCall(120, () => this.boltG.clear());
    if (e) this.hitEnemy(e, S.damage);
  }

  // V: 자석 장갑 — 철갑 기사(강자성)는 끌려와 창을 빼앗기고, 구리 병사(반자성)는 꿈쩍 않는다
  glovePull() {
    if (this.isBlocked() || this.actT > 0) return;
    const G = this.cfg.battle.glove, PX = this.PX;
    Characters.play(this.ian, 'magnet_pull', false);
    this.actT = 0.4;
    // 자석은 철을 끌어당긴다 — 구리 병사가 앞에 서 있어도 사거리 안 철갑 기사를 끌어온다 (총괄지시 56번: 빠른 구리 병사가 늘 앞에 서서 기사를 끌 수 없었다)
    // 창을 든 기사를 먼저 (총괄지시 58번)
    const dir = this.ian.flipX ? -1 : 1;
    const armed = this.battle.enemies.filter((o) => !o.gone && o.kind === 'knight' && o.armed && !o.drag && Math.sign(o.s.x - this.ian.x) === dir && Math.abs(o.s.x - this.ian.x) <= G.range * PX)
      .sort((a, b) => Math.abs(a.s.x - this.ian.x) - Math.abs(b.s.x - this.ian.x))[0];
    const e = armed || this.enemyAhead(G.range * PX, 'knight') || this.enemyAhead(G.range * PX);
    if (!e) { Sound.play('sfx_magnet_none'); return; }
    if (e.kind === 'knight' && !e.armed) {
      Sound.play('sfx_magnet_none');
      this.message.setText('이 기사는 지금 창이 없다 — 예비 창을 꺼내면 다시 빼앗자').setColor('#ffd27a');
      return;
    }
    const r = Magnetism.response(e.kind === 'knight' ? 'iron' : 'copper', this.cfg.hook.gap);
    if (r.lift) {
      e.drag = true;
      Characters.play(e.s, 'magnet_dragged');
      Sound.play('sfx_armor_drag');
      this.message.setText('철갑 기사가 자석 장갑에 끌려온다!').setColor(UIKit.SKY);
    } else {
      Characters.play(e.s, 'magnet_resist', false);
      Sound.play('sfx_armor_copper_tong');
      this.message.setText('구리 갑옷에는 자석 장갑이 통하지 않는다! — 지팡이 번개(X)로').setColor('#ffd27a');
      if (!this.flags.copperTip) { this.flags.copperTip = true; this.say('copper_tip'); }
    }
  }

  // Z: 빼앗은 창을 앞으로 던진다
  throwSpear() {
    if (this.actT > 0 || this.spearShot) return;
    if (!this.spear) { this.message.setText('던질 창이 없다 — 철갑 기사를 장갑(V)으로 끌어와 창을 빼앗자').setColor('#ffd27a'); return; }
    this.spear -= 1;
    if (!this.spear) this.setSpearHelp(false);
    const dir = this.ian.flipX ? -1 : 1;
    Characters.play(this.ian, 'throw', false);
    this.actT = 0.4;
    Sound.play('sfx_throw_whoosh');
    this.spearShot = { x: this.ian.x + dir * 40, y: this.ian.y - 120, dir };
  }

  hitEnemy(e, dmg) {
    e.hp -= dmg;
    if (e.hp <= 0) {
      e.gone = true;
      e.drag = false;
      Characters.play(e.s, 'defeat', false);
      Sound.play('sfx_push_impact');
      return;
    }
    if (!e.drag) Characters.play(e.s, 'hurt', false);
    Sound.play('sfx_troll_hurt');
  }

  updateBattle(dt) {
    const BT = this.battle;
    if (!BT || BT.done || !BT.wave) return;
    const B = this.cfg.battle, PX = this.PX;
    this.fireT = Math.max(0, this.fireT - dt);
    if (this.fireKey.isDown && !this.isBlocked()) this.fireStaff();
    for (const e of BT.enemies) {
      if (e.gone) continue;
      const c = B[e.kind], d = this.ian.x - e.s.x;
      e.s.setFlipX(d > 0);   // 그림은 왼쪽을 본다 — 이안이 오른쪽에 있으면 뒤집는다
      if (e.drag) {
        // 장갑에 끌려온다 → 이안 앞에서 창을 빼앗긴다
        e.s.x += Math.sign(d) * B.glove.dragSpeed * PX * dt;
        if (Math.abs(this.ian.x - e.s.x) <= B.glove.stopDist * PX) {
          e.drag = false;
          e.cool = 1.2;
          Characters.play(e.s, 'disarmed');
          if (e.armed) {
            e.armed = false;
            e.rearmT = B.knight.rearmSeconds;   // 잠시 뒤 등에서 예비 창을 꺼낸다
            this.spear = (this.spear || 0) + 1;   // 빼앗을 때마다 창 하나
            Sound.play('sfx_magnet_iron');
            this.message.setText(`창을 빼앗았다! Z로 던지자 — 창 피해 ${B.spear.damage} (번개는 ${B.staff.damage})`).setColor(UIKit.SKY);
            this.setSpearHelp(true);
          }
        }
        continue;
      }
      // 창을 빼앗긴 기사: rearmSeconds 동안 disarmed 그림으로 서 있다가 예비 창을 꺼내 다시 다가온다 (창 없이 걷는 그림이 없어서)
      if (e.kind === 'knight' && !e.armed) {
        e.rearmT = (e.rearmT ?? c.rearmSeconds) - dt;
        if (e.rearmT > 0) {
          if (!e.s.anims.isPlaying && e.s.anims.currentAnim?.key !== 'iron_knight_disarmed') Characters.play(e.s, 'disarmed');   // 맞는 그림(hurt)은 끝까지
          continue;
        }
        e.armed = true;
        e.cool = c.attackEvery;
        Characters.play(e.s, 'idle');
        Sound.play('sfx_armor_drag');
        this.message.setText('철갑 기사가 예비 창을 꺼냈다! 장갑(V)으로 또 빼앗을 수 있다').setColor('#ffd27a');
      }
      const idle = 'idle';
      if (Math.abs(d) > c.attackRange * PX) {
        e.s.x += Math.sign(d) * c.speed * PX * dt;
        if (!e.s.anims.isPlaying) Characters.play(e.s, 'walk');
      } else if (!e.s.anims.isPlaying) Characters.play(e.s, idle);
      e.cool -= dt;
      const canHit = e.kind === 'soldier' || e.armed;   // 창을 빼앗긴 기사는 공격하지 못한다
      if (canHit && e.cool <= 0 && Math.abs(d) <= c.attackRange * PX) {
        e.cool = c.attackEvery;
        Characters.play(e.s, 'attack', false);
        this.ianHp = Math.max(0, this.ianHp - c.damage);
        if (this.hud) this.hud.set('health', this.ianHp);
        Sound.play('sfx_ian_hurt');
        if (this.ianHp <= 0) { this.battleLost(); return; }
      }
    }
    // 날아가는 창 (나무 자루 + 쇠 날, 엔진 그림)
    this.spearG.clear();
    if (this.spear) {   // 빼앗은 창을 이안이 어깨 위로 들고 있다
      const f = this.ian.flipX ? -1 : 1, hx = this.ian.x + f * 30, hy = this.ian.y - 150;
      this.spearG.lineStyle(6, 0x6b4a2a, 1).lineBetween(hx - f * 70, hy + 14, hx + f * 50, hy - 10)
        .fillStyle(0xcfd6dc, 1).fillTriangle(hx + f * 76, hy - 15, hx + f * 50, hy - 19, hx + f * 50, hy - 1);
    }
    const sp = this.spearShot;
    if (sp) {
      sp.x += sp.dir * B.spear.speed * PX * dt;
      this.spearG.lineStyle(6, 0x6b4a2a, 1).lineBetween(sp.x - sp.dir * 110, sp.y, sp.x, sp.y)
        .fillStyle(0xcfd6dc, 1).fillTriangle(sp.x + sp.dir * 26, sp.y, sp.x, sp.y - 9, sp.x, sp.y + 9);
      const e = BT.enemies.find((o) => !o.gone && Math.abs(o.s.x - sp.x) < 40);
      if (e) {
        this.hitEnemy(e, B.spear.damage);
        this.spearShot = null;
        this.message.setText(`창 명중! 피해 ${B.spear.damage} — 지팡이 번개 ${Math.round(B.spear.damage / B.staff.damage)}번만큼`).setColor(UIKit.SKY);
      }
      else if (sp.x < 0 || sp.x > this.worldW) this.spearShot = null;
    }
    if (!BT.waiting && BT.enemies.length && BT.enemies.every((e) => e.gone)) {
      BT.waiting = true;
      this.time.delayedCall(1200, () => { BT.waiting = false; this.spawnWave(); });
    }
  }

  // 창을 들고 있는 동안 아래 도움말의 "Z 창 던지기"를 밝게
  setSpearHelp(on) {
    const B = this.cfg.battle;
    this.helpText.setText(on ? `Z 창 던지기 (피해 ${B.spear.damage})   ← → 걷기   X 지팡이 번개 (피해 ${B.staff.damage})   V 자석 장갑   M 마법서`
      : '← → 걷기   X 지팡이 번개   V 자석 장갑   Z 빼앗은 창 던지기   M 마법서').setColor(on ? '#ffe08a' : UIKit.LIGHT);
  }

  battleLost() {
    const BT = this.battle;
    for (const e of BT.enemies) if (e.s.active) e.s.destroy();
    BT.enemies = [];
    BT.wave -= 1;
    this.ianHp = 1;
    this.spear = false;
    this.spearShot = null;
    this.setSpearHelp(false);
    if (this.hud) this.hud.set('health', 1);
    this.message.setText('이안이 쓰러졌다… 이 무리를 처음부터').setColor('#ff9a9a');
    this.cameras.main.flash(400, 40, 0, 0);
    this.time.delayedCall(1500, () => this.spawnWave());
  }

  updateBattleText() {
    const BT = this.battle, B = this.cfg.battle;
    const alive = BT.enemies.filter((e) => !e.gone);
    this.speedPanel.setLines([
      ...alive.map((e) => (e.kind === 'knight' ? `철갑 기사 (강자성 — 장갑에 끌림${e.armed ? '' : `, 창 없음 — 예비 창까지 ${Math.max(0, Math.ceil(e.rearmT ?? 0))}초`})` : '구리 갑옷 병사 (반자성 — 장갑 안 통함)') + `: ${Math.ceil(e.hp)} / ${e.max}`),
      `X 지팡이 번개 ${B.staff.damage}   Z 빼앗은 창 ${B.spear.damage}${this.spear ? ` — 들고 있음${this.spear > 1 ? ' ×' + this.spear : ''}` : ''}`,
      `무리 ${Math.max(1, BT.wave)} / ${B.waves.length}`,
    ]);
  }

  updateHook(dt) {
    const h = this.hook;
    this.hookLine.clear();
    if (!h) return;
    const PX = this.PX, sp = this.cfg.hook.speed * PX * dt;
    const handX = this.ian.x + h.f * 50, handY = this.ian.y - 110, y = this.groundY - 40;
    if (h.phase === 'out') {
      h.x += h.f * sp;
      if ((h.endX - h.x) * h.f <= 0) { h.x = h.endX; this.hookArrive(h); }
    } else {
      h.x -= h.f * sp;
      if ((h.x - handX) * h.f <= 0) {
        this.hook = null;
        this.hookImg.setVisible(false);
        if (h.carry) { this.carried = h.carry; }
        return;
      }
    }
    this.hookImg.setPosition(h.x, y).setFlipX(h.f < 0);
    this.hookLine.lineStyle(3, 0xc9b38a, 1).lineBetween(handX, handY, h.x, y - 20);
    if (h.carry) h.carry.img.setPosition(h.x + h.f * 30, y + 10).setDepth(6);
  }

  updatePanel() {
    const m = GAME_CONFIG.act2.magnetism;
    const row = (mat) => {
      const c = m.materials[mat];
      const kind = { ferro: '강자성', para: '상자성', dia: '반자성' }[c.kind];
      if (this.curse.cursed) return `${VaultScene.NAMES[mat] || '흑연'}: 저주 — 강하게 붙음`;
      if (!this.tested.has(mat) && !this.answersShown()) return `${VaultScene.NAMES[mat] || '흑연'}: ? (갈고리로 시험해 보자)`;
      return `${VaultScene.NAMES[mat] || '흑연'} (${kind}): ${c.response > 0 ? '끌림' : '밀림'}, 상대 크기 ${Math.abs(c.response)}`;
    };
    const lines = (this.curse.cursed ? VaultScene.MATERIALS : ['iron', 'aluminum', 'copper', 'graphite']).map(row);   // 저주는 "모든 금속"이라 흑연은 빼고
    lines.push(`약한 반응 화살표 과장 배율 ×${m.exaggerate}`);
    lines.push('열린 칸: ' + (VaultScene.MATERIALS.filter((x) => this.opened[x]).map((x) => VaultScene.SIGNS[x]).join(' · ') || '없음')
      + (this.plate.onStand ? (this.floating ? '   흑연판: 떠 있음' : '   흑연판: 얹힘') : ''));
    this.speedPanel.setLines(lines);
  }
}
window.VaultScene = VaultScene;

// ------------------------------------------------------------------ 진실의 원 실험: 센 자석 가까이에 철·알루미늄·구리 조각을 차례로
// 실이 달린 조각을 자석 옆에 가져가면 철은 붙고, 알루미늄은 아주 약하게 끌리고, 구리는 아주 약하게 밀린다.
// 약한 반응은 실제 크기로는 거의 안 보여서 확대 창(과장 배율)과 화살표로 보인다.
class MagLab {
  static ORDER = ['iron', 'aluminum', 'copper'];

  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const O = MANIFEST.objects;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 60, '진실의 원 — 자석 실험', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    this.help = UIKit.text(scene, 960, 118, '', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5);
    c.add(this.help);
    // 센 자석 (말굽 자석을 크게)
    this.magnetX = 520;
    c.add(scene.add.image(this.magnetX, 520, O.magnet_hook.key).setScale(4).setAngle(90));
    c.add(UIKit.text(scene, this.magnetX, 660, '센 자석', { fontSize: '24px' }).setOrigin(0.5, 0));
    // 실에 매달린 조각 (열쇠 그림을 조각으로)
    this.thread = scene.add.graphics();
    c.add(this.thread);
    this.restX = 820;
    this.piece = scene.add.image(this.restX, 560, O.key_iron.key).setScale(3);
    c.add(this.piece);
    // 확대 창
    c.add(scene.add.rectangle(1450, 520, 560, 300, 0x0b1a28, 1).setStrokeStyle(3, 0x9fe0ff));
    this.zoomTitle = UIKit.text(scene, 1450, 382, '', { fontSize: '22px', color: UIKit.SKY }).setOrigin(0.5, 0);
    c.add(this.zoomTitle);
    this.zoomPiece = scene.add.image(1450, 540, O.key_iron.key).setScale(5);
    c.add(this.zoomPiece);
    c.add(scene.add.rectangle(1450, 640, 2, 40, 0xf3ead6));   // 처음 자리 표시
    this.arrow = scene.add.graphics();   // 확대 창 위에 그리는 반응 방향 화살표
    c.add(this.arrow);
    this.results = UIKit.text(scene, 960, 760, '', { fontSize: '28px', align: 'left', lineSpacing: 10 }).setOrigin(0.5, 0);
    c.add(this.results);
    this.info = UIKit.text(scene, 960, 180, '', { fontSize: '28px', align: 'center' }).setOrigin(0.5, 0);
    c.add(this.info);
    scene.input.keyboard.on('keydown-SPACE', () => this.next());
    scene.input.keyboard.on('keydown-ESC', () => this.close());
    ['ONE', 'TWO', 'THREE'].forEach((k, i) => scene.input.keyboard.on('keydown-' + k, () => this.isOpen && this.bring(MagLab.ORDER[i])));
    scene.labUpdate((t, d) => this.update(Math.min(d, 50) / 1000));
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.done = false;
    this.step = -1;
    this.t = 0;
    this.lines = [];
    this.tried = new Set();
    this.current = null;
    this.container.setVisible(true);
    this.piece.setVisible(false);
    this.zoomPiece.setVisible(false);
    this.zoomTitle.setText('');
    this.results.setText('');
    this.arrow.clear();
    this.help.setText('1 철 · 2 알루미늄 · 3 구리 조각을 골라 자석 가까이 (Space: 차례로)    Esc: 닫기');
    this.info.setText('조각을 골라 센 자석 가까이 가져가 보자').setColor('#ffe08a');
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  // Space: 아직 안 해 본 조각을 차례로
  next() {
    if (!this.isOpen) return;   // 실험 창을 열기 전(tried 없음)에 스페이스가 오면 오류가 나 대사 넘기기까지 막혔다 (총괄지시 54번)
    const m = MagLab.ORDER.find((x) => !this.tried.has(x));
    if (m) this.bring(m);
  }

  // 1·2·3: 학생이 고른 조각을 자석 가까이 (총괄지시 2막리뷰 40번)
  bring(m) {
    if (!this.isOpen || this.done || (this.current && this.t < 2.0)) return;
    this.step += 1;
    // 진실의 원 안: 진짜 법칙 (거리는 갈고리와 같게)
    this.current = { m, r: Magnetism.response(m, this.scene.cfg.hook.gap) };
    this.t = 0;
    const key = MANIFEST.objects['key_' + m].key;
    this.piece.setTexture(key).setVisible(true).setPosition(this.restX + 200, 560).setAngle(0);
    this.zoomPiece.setTexture(key).setVisible(true).setPosition(1450, 540);
    this.zoomTitle.setText(m === 'iron' ? '확대 창 (철은 확대하지 않아도 보인다)' : `확대 창 — 움직임을 ×${GAME_CONFIG.act2.magnetism.exaggerate} 크게`);
    this.arrow.clear();
    this.info.setText(`${VaultScene.NAMES[m]} 조각을 자석 가까이…`).setColor('#ffe08a');
  }

  update(dt) {
    if (!this.isOpen || !this.current) return;
    const { m, r } = this.current;
    const prev = this.t;
    this.t += dt;
    // 0~0.8초: 다가간다 / 0.8초~: 반응
    const k = Math.min(1, this.t / 0.8);
    let x = this.restX + 200 * (1 - k);
    if (this.t > 0.8) {
      const p = Math.min(1, (this.t - 0.8) / 0.5);
      if (r.lift) x = this.restX - (this.restX - (this.magnetX + 110)) * p;          // 철: 자석에 붙는다
      else x = this.restX - r.dir * 2 * p;                                              // 실제 화면: 1~2px
      this.zoomPiece.setX(1450 - r.dir * (r.lift ? 0 : 160 * r.shown) * p);           // 확대 창: 과장 배율
      if (!r.lift) this.piece.setAngle(-r.dir * 4 * p);
    }
    this.piece.setX(x);
    this.thread.clear().lineStyle(2, 0xf3ead6, 0.8).lineBetween(this.restX, 250, x, 520);
    if (prev <= 0.8 && this.t > 0.8) Sound.play(r.lift ? 'sfx_magnet_iron' : 'sfx_magnet_none');
    if (prev <= 1.8 && this.t > 1.8) {   // 반응을 1초 먼저 보여 준 뒤 글 (총괄지시 2막리뷰 32번)
      const name = VaultScene.NAMES[m];
      const text = r.lift ? `${name}: 강하게 끌려와 붙는다 (강자성)` : r.dir > 0 ? `${name}: 아주 약하게 끌린다 (상자성)` : `${name}: 아주 약하게 밀려난다 (반자성)`;
      if (!this.tried.has(m)) { this.lines.push(text); this.results.setText(this.lines.join('\n')); }
      this.tried.add(m);
      this.info.setText(text).setColor(UIKit.SKY);
      if (!r.lift) {
        const g = this.arrow, ax = 1450, ay = 450, d = -r.dir;
        g.clear().lineStyle(6, 0x9fe0ff, 1).lineBetween(ax, ay, ax + d * 120, ay);
        g.fillStyle(0x9fe0ff, 1).fillTriangle(ax + d * 140, ay, ax + d * 120, ay - 12, ax + d * 120, ay + 12);
      }
      if (this.tried.size === MagLab.ORDER.length && !this.done) {
        this.done = true;
        this.help.setText('');
        this.scene.time.delayedCall(1500, () => this.info.setText('모든 금속이 자석에 붙지는 않는다 — 철만 강하게 끌리고, 알루미늄·구리는 아주 약하게 반응한다').setColor(UIKit.SKY));
        UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
      }
    }
  }
}
window.MagLab = MagLab;
