// 1-1 기울어진 탑 (ACT1_PLAN 2단계 3번 추가 퍼즐 ②) — 배경 01을 한 번 더 쓴다
//
// 방에 들어오면 블록이 한 칸씩 0.3m 어긋나게 쌓인 기울어진 탑이 스스로 무너진다.
// 블록을 하나씩 다시 쌓는다: ← →로 0.1m씩 옮기고 Space(또는 Z)로 내려놓는다.
// 안정 조건(평형): 어느 층에서든, 그 위에 올라간 블록 전체의 무게중심이
//                 그 층과 바로 위 블록이 맞닿은 면(받침면) 안에 있어야 한다.
// 벗어나면 그 층부터 위가 기울어 떨어지고(탑이 쓰러짐) 처음부터 다시 쌓는다.
// 블록 5개를 쌓아 맨 위 블록이 오른쪽 하늘빛 표시(0.8m)까지 닿은 채 서 있으면 문이 열린다.
// 하늘빛 점선은 맨 아래 블록 위에 얹힌 블록 전체의 무게중심.
class TowerScene extends ChapterScene {
  constructor() {
    super('Ch1_1c');
  }

  startCursed() {
    return false;
  }

  buildWorld() {
    const cfg = GAME_CONFIG.tower;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    this.B = O.tower_block;                     // 125×49 = 1m × 0.39m
    this.baseX = cfg.baseX * PX;
    this.blocks = [];                            // { x(px, 가운데), img }
    this.layer = this.add.container(0, 0).setDepth(2);
    this.worldLayer.add(this.layer);
    this.guide = this.add.graphics().setDepth(3);     // 무게중심 선
    this.worldLayer.add(this.guide);
    this.gateX = cfg.gateX * PX;
    this.gate = this.add.image(this.gateX, this.groundY + 4, O.castle_gate.key)
      .setOrigin(O.castle_gate.pivot.x / O.castle_gate.width, 1).setDepth(-1);
    this.worldLayer.add(this.gate);
    this.gateOpen = false;
    // 맨 위 블록이 닿아야 할 곳 (하늘빛 표시)
    this.reachX = this.baseX + cfg.reach * PX;
    const topY = this.groundY - (cfg.targetCount - 1) * this.B.height;
    this.goal = this.add.graphics().setDepth(1);
    this.goal.lineStyle(4, 0x9fe0ff, 0.95).lineBetween(this.reachX, topY - this.B.height - 30, this.reachX, topY + 6);
    this.goal.fillStyle(0x9fe0ff, 0.25).fillRect(this.reachX, topY - this.B.height, this.B.width / 2, this.B.height);
    this.worldLayer.add(this.goal);

    // 내려놓을 블록 (들고 있는 블록)
    this.held = this.add.image(0, 0, this.B.key).setOrigin(0.5, 1).setAlpha(0.85).setDepth(4);
    this.worldLayer.add(this.held);
    this.heldOffset = 0;                         // 바로 아래 블록 가운데 기준 (m)

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, this.groundY).setDepth(5);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, this.groundY).setDepth(5);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.held, { x: 0, y: 0, width: this.worldW, height: this.worldH });

    const kb = this.input.keyboard;
    kb.addCapture(['SPACE', 'Z']);
    kb.on('keydown-LEFT', () => this.nudge(-1));
    kb.on('keydown-RIGHT', () => this.nudge(1));
    kb.on('keydown-Z', () => this.drop());
    kb.on('keydown-SPACE', () => this.drop());
    kb.on('keydown-R', () => { if (!this.isBlocked() && !this.falling) this.confirmRestart(() => { if (!this.falling) this.startOver(); }); });
    this.flags = {};
    this.falling = null;
  }

  onReady() {
    this.setMusicMode('puzzle');
    this.speedPanel.moveTo(1136, 150);
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '← → 0.1m씩 옮기기   Space/Z 내려놓기   R 처음부터   M 마법서', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    // 기울어진 탑이 놓여 있다가 스스로 무너진다
    this.buildLeaningTower();
  }

  curseRuleText() {
    return '평형: 위 블록들의 무게중심이 받침면 안에 있으면 쓰러지지 않는다';
  }

  // ------------------------------------------------------------------ 블록
  blockY(level) {          // level 0 = 맨 아래. 블록 아랫면 y
    return this.groundY - level * this.B.height;
  }

  addBlock(xPx) {
    const img = this.add.image(xPx, this.blockY(this.blocks.length), this.B.key).setOrigin(0.5, 1);
    this.layer.add(img);
    this.blocks.push({ x: xPx, img });
  }

  buildLeaningTower() {
    this.clearBlocks();
    const cfg = this.cfg;
    for (let i = 0; i < cfg.leaningCount; i++) this.addBlock(this.baseX + i * cfg.leaningShift * this.PX);
    this.held.setVisible(false);
    this.message.setText('기울어진 탑이 흔들린다…').setColor('#ffd27a');
    this.time.delayedCall(1200, () => {
      const k = this.firstUnstable();
      if (k !== null) this.topple(k, () => this.startOver('탑이 무너졌다! 블록을 다시 쌓아 보자'));
      else this.startOver();
    });
  }

  clearBlocks() {
    for (const b of this.blocks) b.img.destroy();
    this.blocks = [];
  }

  startOver(msg) {
    this.clearBlocks();
    this.falling = null;
    this.heldOffset = 0;
    this.held.setVisible(true);
    this.message.setText(msg || '← →로 0.1 m씩 옮기고 Space(Z)로 내려놓기').setColor('#ffe08a');
    this.placeHeld();
  }

  topX() {
    return this.blocks.length ? this.blocks[this.blocks.length - 1].x : this.baseX;
  }

  placeHeld() {
    const n = this.blocks.length;
    this.held.setPosition(this.topX() + this.heldOffset * this.PX, this.blockY(n) - this.cfg.holdGap);
  }

  nudge(dir) {
    if (this.isBlocked() || this.falling || this.gateOpen || !this.held.visible) return;
    const step = this.cfg.step;
    this.heldOffset = Math.round((this.heldOffset + dir * step) / step) * step;
    this.heldOffset = Phaser.Math.Clamp(this.heldOffset, -this.cfg.maxOffset, this.cfg.maxOffset);
    if (this.blocks.length === 0) this.heldOffset = 0;   // 맨 아래 블록은 받침 위 가운데
    this.placeHeld();
    Sound.play('sfx_ui_click');
  }

  drop() {
    if (this.isBlocked() || this.falling || this.gateOpen || !this.held.visible) return;
    this.addBlock(this.topX() + this.heldOffset * this.PX);
    Sound.play('sfx_rock_drop_launch');
    const k = this.firstUnstable();
    if (k !== null) {
      this.held.setVisible(false);
      this.topple(k, () => this.startOver('탑이 쓰러졌다… 처음부터 다시 쌓자'));
      return;
    }
    this.heldOffset = 0;
    if (this.blocks.length >= this.cfg.targetCount) {
      this.held.setVisible(false);
      if (this.topX() >= this.reachX - 1e-6) this.openGate();
      else this.message.setText(`쓰러지지 않고 섰지만, 맨 위 블록이 하늘빛 표시까지 닿지 않았다 — R로 다시`).setColor('#ffd27a');
    } else {
      this.placeHeld();
    }
  }

  // 위에서부터가 아니라 아래 층부터 살펴, 가장 아래의 불안정한 맞닿은 면을 찾는다.
  // k: 블록 k와 k+1이 맞닿은 면. 블록 k+1..끝의 무게중심(같은 질량이라 가운데 x의 평균)이
  // 두 블록이 겹친 구간 안에 있어야 한다. 불안정하면 k를, 모두 안정이면 null.
  firstUnstable() {
    const half = this.B.width / 2;
    for (let k = 0; k < this.blocks.length - 1; k++) {
      const above = this.blocks.slice(k + 1);
      const com = above.reduce((s, b) => s + b.x, 0) / above.length;
      const lo = Math.max(this.blocks[k].x, this.blocks[k + 1].x) - half;
      const hi = Math.min(this.blocks[k].x, this.blocks[k + 1].x) + half;
      if (com < lo - 1e-6 || com > hi + 1e-6) return { k, com, lo, hi };
    }
    return null;
  }

  // 무게중심이 벗어난 쪽 모서리를 축으로 위 블록들이 기울어 떨어진다 (게임 시계로 움직임)
  topple(info, onDone) {
    const { k, com, lo, hi } = info;
    const dir = com > hi ? 1 : -1;
    const pivotX = dir > 0 ? hi : lo;
    const pivotY = this.blockY(k + 1);
    const moving = this.blocks.slice(k + 1);
    this.falling = { t: 0, dir, pivotX, pivotY, moving, onDone,
      start: moving.map((b) => ({ x: b.img.x, y: b.img.y })) };
    Sound.play('sfx_tower_collapse');
  }

  updateWorld(dt) {
    const f = this.falling;
    if (f) {
      f.t += dt;
      // 앞 0.6초: 모서리 둘레로 기울기, 뒤: 중력으로 떨어지기
      const ang = Math.min(1, f.t / 0.6) * 70 * f.dir;
      const drop = Math.max(0, f.t - 0.6);
      const r = ang * Math.PI / 180;
      f.moving.forEach((b, i) => {
        const s = f.start[i];
        const dx = s.x - f.pivotX, dy = s.y - f.pivotY;
        const x = f.pivotX + dx * Math.cos(r) - dy * Math.sin(r);
        const y = f.pivotY + dx * Math.sin(r) + dy * Math.cos(r) + 0.5 * GAME_CONFIG.physics.g * drop * drop * this.PX;
        b.img.setPosition(x + f.dir * drop * 120, y).setAngle(ang).setAlpha(Math.max(0, 1 - drop * 1.2));
      });
      if (f.t > 1.5) { this.falling = null; f.onDone(); }
    }
    this.drawGuide();
    this.updatePanel();
    // 열린 문으로 지나가기 (조작 없이 연출로 걸어 나감)
    if (this.gateOpen && !this.flags.leaving && this.time.now > this.leaveAt) {
      this.flags.leaving = true;
      this.cameras.main.fadeOut(600, 0, 0, 0);
      this.time.delayedCall(650, () => this.goNext());
    }
  }

  // 하늘빛 세로선: 들고 있는 블록까지 포함해 맨 아래 블록 위 전체의 무게중심
  drawGuide() {
    const g = this.guide;
    g.clear();
    if (this.blocks.length < 1 || this.falling) return;
    const xs = this.blocks.slice(1).map((b) => b.x);
    if (this.held.visible && this.blocks.length >= 1) xs.push(this.held.x);
    if (!xs.length) return;
    const com = xs.reduce((s, x) => s + x, 0) / xs.length;
    const top = this.blockY(this.blocks.length + 1) - 40;
    g.lineStyle(3, 0x9fe0ff, 0.9);
    for (let y = top; y < this.groundY; y += 16) g.lineBetween(com, y, com, Math.min(y + 9, this.groundY));
    g.fillStyle(0x9fe0ff, 1);
    g.fillCircle(com, top, 7);
  }

  openGate() {
    this.gateOpen = true;
    Sound.play('sfx_lever_balance');
    Sound.play('sfx_door_open');
    this.tweens.add({ targets: this.gate, y: this.gate.y - 440, duration: 1200, ease: 'Sine.easeIn' });
    Save.setChapter(this.scene.key, { solved: true });
    this.message.setText(`블록 ${this.blocks.length}개가 쓰러지지 않고 표시까지 닿았다! 문이 열렸다`).setColor(UIKit.SKY);
    this.leaveAt = this.time.now + 3000;
  }

  updatePanel() {
    const reachNow = this.blocks.length ? (this.topX() - this.baseX) / this.PX : 0;
    const lines = [`쌓은 블록 ${this.blocks.length} / ${this.cfg.targetCount}   맨 위: ${reachNow.toFixed(1)}m / ${this.cfg.reach.toFixed(1)}m`];
    if (this.held.visible && this.blocks.length) {
      lines.push(`들고 있는 블록: 아래 블록보다 ${this.heldOffset >= 0 ? '오른쪽' : '왼쪽'} ${Math.abs(this.heldOffset).toFixed(1)}m`);
    }
    for (let k = this.blocks.length - 1; k >= 1; k--) {
      const d = (this.blocks[k].x - this.blocks[k - 1].x) / this.PX;
      lines.push(`${k + 1}층: 아래보다 ${d >= 0 ? '+' : '−'}${Math.abs(d).toFixed(1)}m`);
    }
    this.speedPanel.setLines(lines.slice(0, 8));
  }
}
window.TowerScene = TowerScene;
