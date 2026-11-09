// 1-1 상자 저울 (ACT1_PLAN 2단계 3번 추가 퍼즐 ①) — 배경 01을 한 번 더 쓴다 (성문 너머의 방)
//
// 무게가 다른 돌 상자(60kg, 20kg — 승인대기 [3]에서 3:1로 정함)를 저울 양쪽에 놓아 수평을 맞추면 문이 열린다.
// 저주가 풀린 뒤라 진짜 법칙: 돌림힘 = 무게(N) × 받침점까지 거리가 양쪽에서 같으면 평형 (예: 600N × 0.5m = 200N × 1.5m).
// Z: 가까운 상자 들기 / 들고 있을 때 Z: 내려놓기 (저울 위면 가장 가까운 0.5m 칸에)
// 사람은 저울 앞을 지나다닐 뿐 저울에 올라가지 않는다 (상자만 저울에 실린다).
class BoxScaleScene extends ChapterScene {
  constructor() {
    super('Ch1_1b');
  }

  startCursed() {
    return false;
  }

  buildWorld() {
    const cfg = GAME_CONFIG.boxScale;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    this.pivotX = cfg.pivotX;
    const fulcrum = O.seesaw_fulcrum, plank = O.seesaw_plank;
    this.halfLen = plank.width / 2;
    this.pivotY = this.groundY - fulcrum.height + GAME_CONFIG.seesawGate.plankSeat;
    this.plankTopY = this.pivotY - plank.height;
    this.plankH = plank.height;
    const add = (name, x, y, depth) => {
      const o = O[name];
      const img = this.add.image(x, y, o.key).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };
    add('seesaw_fulcrum', this.pivotX, this.groundY, -1);
    this.plank = this.add.image(this.pivotX, this.pivotY - plank.height / 2, plank.key).setDepth(0);
    this.worldLayer.add(this.plank);
    this.angle = 0;
    this.gateX = cfg.gateX * PX;
    this.gate = add('castle_gate', this.gateX, this.groundY + 4, -1);
    this.gateOpen = false;
    this.balanceT = 0;

    // 돌 상자 (요청서 04 그림 stone_box_20kg·60kg, 질량에 맞는 그림이 없으면 1-1 돌 블록) + 질량 글자
    this.boxes = cfg.boxes.map((b) => {
      const B = O[`stone_box_${b.mass}kg`] || O.tower_block;
      const img = this.add.image(b.x * PX, this.groundY, B.key).setOrigin(0.5, 1).setDepth(2);
      const label = UIKit.text(this, 0, 0, `${b.mass}kg (${b.mass * GAME_CONFIG.physics.g} N)`, {
        fontSize: '24px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 6, y: 2 },
      }).setOrigin(0.5, 1).setDepth(5);
      this.worldLayer.add([img, label]);
      return { mass: b.mass, img, label, slot: null, carriedBy: null, h: B.height };
    });

    const P = GAME_CONFIG.physics;
    this.chars = {
      ian: { id: 'ian', name: '이안', sprite: Characters.create(this, 'ian', cfg.ianStartX * PX, this.groundY), carry: null },
      garon: { id: 'garon', name: '가론', sprite: Characters.create(this, 'garon', cfg.garonStartX * PX, this.groundY), carry: null },
    };
    this.chars.ian.sprite.setDepth(4);
    this.chars.garon.sprite.setDepth(3);
    this.worldLayer.add([this.chars.ian.sprite, this.chars.garon.sprite]);
    this.control = 'garon';
    this.player = this.chars.garon.sprite;
    this.bounds = { x: 0, y: 0, width: this.worldW, height: this.worldH };
    this.curse.followTarget(this.player, this.bounds);

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT', tab: 'TAB', act: 'Z' });
    kb.addCapture(['TAB', 'Z']);
    this.keys.tab.on('down', () => { if (!this.isBlocked()) this.switchControl(); });
    this.keys.act.on('down', () => { if (!this.isBlocked()) this.pickOrDrop(); });
    this.flags = {};
  }

  onReady() {
    this.setMusicMode('puzzle');
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '← → 걷기   Z 상자 들기/내려놓기   Tab 이안/가론   M 마법서', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, 'Z로 상자를 들고 ← →로 옮긴 뒤 Z로 저울 칸에 내려놓기', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1000, 150);   // 돌림힘 줄이 길어 판이 넓어지므로 조금 왼쪽으로
  }

  curseRuleText() {
    return '진짜 법칙: 돌림힘 = 힘 × 받침점까지 거리 — 양쪽 돌림힘이 같으면 평형';
  }

  switchControl() {
    this.control = this.control === 'ian' ? 'garon' : 'ian';
    this.player = this.chars[this.control].sprite;
    this.curse.followTarget(this.player, this.bounds);
    Sound.play('sfx_ui_click');
  }

  // ------------------------------------------------------------------ 상자 들기·내려놓기
  pickOrDrop() {
    const c = this.chars[this.control];
    const PX = this.PX;
    if (c.carry) {
      const box = c.carry;
      const d = (c.sprite.x - this.pivotX) / PX;
      if (Math.abs(d) <= this.halfLen / PX) {
        // 저울 위: 가장 가까운 0.5m 칸 (받침점 위·이미 찬 칸에는 못 놓음)
        let slot = Math.round(d / this.cfg.slotStep) * this.cfg.slotStep;
        if (Math.abs(slot) < 0.01) slot = Math.sign(d || 1) * this.cfg.slotStep;
        slot = Phaser.Math.Clamp(slot, -2.5, 2.5);
        if (this.boxes.some((b) => b !== box && b.slot !== null && Math.abs(b.slot - slot) < 0.01)) {
          this.message.setText('그 칸에는 이미 상자가 있다').setColor('#ffd27a');
          return;
        }
        box.slot = slot;
      } else {
        box.slot = null;
        box.img.x = c.sprite.x + (c.sprite.flipX ? -60 : 60);
      }
      box.carriedBy = null;
      c.carry = null;
      Sound.play('sfx_rock_drop_launch');
      return;
    }
    // 가까운 상자 들기
    const box = this.boxes.filter((b) => !b.carriedBy && Math.abs(this.boxX(b) - c.sprite.x) < this.cfg.reach * PX)
      .sort((a, b) => Math.abs(this.boxX(a) - c.sprite.x) - Math.abs(this.boxX(b) - c.sprite.x))[0];
    if (!box) return;
    box.carriedBy = c;
    box.slot = null;
    c.carry = box;
    Sound.play('sfx_ui_click');
  }

  boxX(b) {
    return b.slot !== null ? this.pivotX + b.slot * this.PX : b.img.x;
  }

  // ------------------------------------------------------------------ 저울
  tiltSign() {
    let left = 0, right = 0;
    for (const b of this.boxes) {
      if (b.slot === null) continue;
      const W = b.mass * GAME_CONFIG.physics.g;            // 무게 (N)
      if (b.slot < 0) left += W * -b.slot; else right += W * b.slot;
    }
    this.sums = { left, right };
    if (Math.abs(left - right) < 1e-6) return 0;
    return left > right ? -1 : 1;
  }

  plankY(x) {
    return this.plankTopY + (x - this.pivotX) * Math.tan(this.angle * Math.PI / 180);
  }

  updateWorld(dt) {
    const cfg = this.cfg, PX = this.PX, walk = GAME_CONFIG.iceCorridor.walkSpeed;
    const dir = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    const me = this.chars[this.control];
    const other = this.chars[this.control === 'ian' ? 'garon' : 'ian'];
    me.sprite.x = Phaser.Math.Clamp(me.sprite.x + dir * walk * PX * dt, 0.5 * PX,
      this.gateOpen ? this.worldW - 40 : this.gateX - MANIFEST.objects.castle_gate.width / 2 - 20);
    if (dir) me.sprite.setFlipX(dir < 0);
    Characters.play(me.sprite, dir ? 'walk' : 'idle');
    // 조작하지 않는 쪽은 1.5m 뒤에서 따라온다
    const gap = other.sprite.x - me.sprite.x;
    const want = Math.abs(gap) > 1.5 * PX ? -Math.sign(gap) : 0;
    other.sprite.x += want * walk * PX * dt;
    if (want) other.sprite.setFlipX(want < 0);
    Characters.play(other.sprite, want ? 'walk' : 'idle');

    // 저울 기울기
    const sign = this.tiltSign();
    const target = sign * GAME_CONFIG.seesawGate.maxTilt;
    this.angle += Phaser.Math.Clamp(target - this.angle, -30 * dt, 30 * dt);
    this.plank.setAngle(this.angle);
    // 상자 위치: 들려 있으면 머리 위, 저울 위면 칸 위, 아니면 바닥
    for (const b of this.boxes) {
      if (b.carriedBy) b.img.setPosition(b.carriedBy.sprite.x, b.carriedBy.sprite.y - 235);
      else if (b.slot !== null) b.img.setPosition(this.boxX(b), this.plankY(this.boxX(b)));
      else b.img.setY(this.groundY);
      b.img.setAngle(b.slot !== null && !b.carriedBy ? this.angle : 0);
      b.label.setPosition(b.img.x, b.img.y - b.h - 4);
    }

    // 양쪽에 상자가 있고 수평이면 1초 뒤 문이 열린다
    const left = this.boxes.some((b) => b.slot !== null && b.slot < 0);
    const right = this.boxes.some((b) => b.slot !== null && b.slot > 0);
    if (!this.gateOpen && sign === 0 && left && right && Math.abs(this.angle) < 0.05) {
      this.balanceT += dt;
      if (this.balanceT >= GAME_CONFIG.seesawGate.holdSeconds) this.openGate();
    } else {
      this.balanceT = 0;
    }
    if (this.gateOpen && !this.flags.leaving && me.sprite.x > this.gateX + 40) {
      this.flags.leaving = true;
      this.cameras.main.fadeOut(600, 0, 0, 0);
      this.time.delayedCall(650, () => this.goNext());
    }
    this.updatePanel();
  }

  openGate() {
    this.gateOpen = true;
    Sound.play('sfx_lever_balance');
    Sound.play('sfx_door_open');
    this.tweens.add({ targets: this.gate, y: this.gate.y - 440, duration: 1200, ease: 'Sine.easeIn' });
    Save.setChapter(this.scene.key, { solved: true });
    const desc = this.boxes.filter((b) => b.slot !== null)
      .map((b) => `${b.mass * GAME_CONFIG.physics.g} N ${b.slot < 0 ? '왼쪽' : '오른쪽'} ${Math.abs(b.slot).toFixed(1)}m`).join(' · ');
    this.message.setText(`수평! ${desc} — 문이 열렸다`).setColor(UIKit.SKY);
  }

  updatePanel() {
    const lines = [`조작: ${this.chars[this.control].name} (Tab)`];
    const g = GAME_CONFIG.physics.g;
    for (const b of this.boxes) {
      if (b.slot === null) {
        lines.push(`상자 ${b.mass}kg → 무게 ${b.mass * g} N   ${b.carriedBy ? `${b.carriedBy.name}이(가) 듦` : '바닥'}`);
      }
    }
    const on = this.boxes.filter((b) => b.slot !== null).map((b) => ({ name: '상자', mass: b.mass, d: b.slot }));
    lines.push(...torqueLines(on, false));
    this.speedPanel.setLines(lines);
  }
}
window.BoxScaleScene = BoxScaleScene;
