// 1-4 바위 미끄러뜨리기 전투 (ACT1_PLAN 4단계 6번) — 배경 06을 한 번 더 쓴다
// 바위는 구르지 않고 레일·비탈을 따라 미끄러진다(총괄지시 수정목록 3번): 구르면 에너지 일부가 회전에 쓰여
// 바닥 속력이 √(2gh)보다 작아지므로, 미끄러져야 "같은 높이 → 질량과 무관하게 같은 속력"이 정확하다.
//
// 돌 골렘들이 오른쪽 6m 발판에서 레일을 따라 내려와 골짜기를 건너 왼쪽 발판(이안·가론)으로 올라온다.
// 이안은 왼쪽 비탈 위 원하는 높이(1~5m)에 바위를 놓아 미끄러뜨린다 (↑↓ 높이, Tab 바위 크기, Space 놓기).
// 해방(진짜 법칙): 에너지 보존 — 높이 h0에서 놓은 바위가 높이 h인 곳에서 내는 속력 v = √(2g(h0 − h)).
//   바위 크기(10kg·40kg)와 상관없이 같은 속력. 골렘은 바위가 6 m/s 이상으로 부딪혀야 부서진다.
//   → 높은 곳에서 놓을수록, 골렘이 낮은 곳에 있을 때 맞힐수록 빠르다.
// 저주(교사용 F1로 비교): 무거운 바위일수록 빨라진다 → 10kg 바위는 내리막에서 4분의 1만큼만 빨라짐.
class RockRollScene extends ChapterScene {
  constructor() {
    super('Ch1_4b');
  }

  startCursed() {
    return false;
  }

  buildWorld() {
    const cfg = GAME_CONFIG.rockRoll;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    const L = RAW_JSON.act1_objects.scene_layout['1-4'];
    this.floorY = L.valley_floor_y_px;
    // 레일 길: 왼쪽 발판 끝 → 레일 중심선 → 오른쪽 발판 끝 (광차 탑과 같은 레일)
    const pts = [...L.rail_centerline_px, [GAME_CONFIG.minecart.stopperX, L.right_platform_top_y_px]];
    this.path = [];
    let s = 0;
    pts.forEach((p, i) => {
      if (i > 0) s += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]);
      this.path.push({ x: p[0], y: p[1], s });
    });
    this.pathLen = s;
    // 비탈 위 높이 → 위치(s): 왼쪽 내리막에서 그 높이가 되는 곳
    this.bottomS = this.path.reduce((b, p) => (p.y > b.y ? p : b)).s;
    this.dropS = {};
    for (let h = 1; h <= 5; h++) {
      let a = 0, b = this.bottomS;
      for (let k = 0; k < 40; k++) { const m = (a + b) / 2; if (this.height(m) > h - 0.02) a = m; else b = m; }
      this.dropS[h] = b;    // 그 높이 바로 아래 (5m는 발판 끝이라 평평한 곳에 놓이면 미끄러지지 않음)
    }
    this.worldLayer.add(this.add.image(0, 0, O.rail_path.key).setOrigin(0, 0).setDepth(-2));

    // 이안·가론: 왼쪽 발판 위
    this.ian = Characters.create(this, 'ian', cfg.ianX, L.left_platform_top_y_px).setDepth(4);
    this.garon = Characters.create(this, 'garon', cfg.garonX, L.left_platform_top_y_px).setDepth(3);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.hp = 1;

    // 놓을 자리 표시와 바위
    this.dropH = cfg.startHeight;
    this.size = 0;                                        // 0: 작은 바위, 1: 큰 바위
    this.marker = this.add.graphics().setDepth(6);
    this.markerText = UIKit.text(this, 0, 0, '', { fontSize: '24px', fontStyle: 'bold', color: UIKit.SKY, backgroundColor: '#0b1320cc', padding: { x: 8, y: 4 } })
      .setOrigin(0.5, 1).setDepth(6);
    this.worldLayer.add([this.marker, this.markerText]);
    this.rocks = [];
    this.cool = 0;

    // 골렘
    this.golems = [];
    this.spawned = 0;
    this.spawnWait = 1.0;
    this.broken = 0;
    this.won = false;
    this.lost = false;

    const kb = this.input.keyboard;
    kb.addCapture(['UP', 'DOWN', 'TAB']);
    kb.on('keydown-UP', () => this.setHeight(1));
    kb.on('keydown-DOWN', () => this.setHeight(-1));
    kb.on('keydown-TAB', () => { if (!this.isBlocked()) { this.size = 1 - this.size; Sound.play('sfx_ui_click'); } });
    kb.on('keydown-SPACE', () => this.roll());
    kb.on('keydown-R', () => { if (!this.isBlocked()) this.confirmRestart(() => this.scene.restart()); });
  }

  onReady() {
    this.setMusicMode('battle');
    this.speedPanel.moveTo(560, 140);
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '↑ ↓ 놓을 높이   Tab 바위 크기   Space 바위 놓기   T 결과판   R 다시', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '골렘이 레일을 타고 온다! ↑ ↓ 놓을 높이 · Space 바위 놓기', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.board = new ResultBoard(this, this.uiLayer, {
      title: '바위 미끄러뜨리기 결과판', logKey: 'Ch1_4b', columns: [
        { label: '바위', width: 160 }, { label: '놓은 높이 (m)', width: 200 }, { label: '골렘 높이 (m)', width: 200 },
        { label: '부딪힌 속력 (m/s)', width: 250 }, { label: '바닥에서 속력 (m/s)', width: 260 }, { label: '결과', width: 160 },
      ],
    });
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 무거운 바위일수록 내리막에서 더 빨라진다?'
      : '에너지 보존: v = √(2g × 내려온 높이) — 크기와 상관없음';
  }

  at(s) { return MinecartScene.prototype.at.call(this, s); }
  height(s) { return MinecartScene.prototype.height.call(this, s); }

  rockInfo() {
    return this.cfg.rocks[this.size];
  }

  setHeight(dir) {
    if (this.isBlocked() || this.won || this.lost) return;
    this.dropH = Phaser.Math.Clamp(this.dropH + dir, 1, 5);
    Sound.play('sfx_ui_click');
  }

  // ------------------------------------------------------------------ 바위
  roll() {
    if (this.isBlocked() || this.won || this.lost || this.cool > 0) return;
    const R = this.rockInfo();
    const o = MANIFEST.objects[R.image];
    const s0 = this.dropS[this.dropH];
    const img = this.add.image(0, 0, o.key).setOrigin(0.5, 1).setDepth(5);
    this.worldLayer.add(img);
    this.rocks.push({ img, s: s0, v: 0, h0: this.height(s0) + 0.02, mass: R.mass, r: o.width / 2, label: R.label, bottomV: null });
    this.cool = this.cfg.rollCooldown;
    Characters.play(this.ian, 'attack_lightning', false);
    this.ianCastT = 0.6;
    Sound.play('sfx_throw_whoosh');
  }

  updateRock(k, dt) {
    const g = GAME_CONFIG.physics.g, PX = this.PX;
    const n = 6;
    for (let i = 0; i < n; i++) {
      const h = dt / n;
      const ds = 2;
      const slope = (this.height(k.s + ds) - this.height(k.s - ds)) / (2 * ds / PX);
      let gEff = g;
      if (this.curse.cursed && slope * Math.sign(k.v || 1) < 0) gEff = g * k.mass / this.cfg.cursedRefMass;
      k.v += -gEff * slope * h;
      k.s += k.v * h * PX;
      if (!this.curse.cursed) {
        const v2 = 2 * g * (k.h0 - this.height(k.s));
        if (v2 > 0) k.v = Math.sign(k.v || 1) * Math.sqrt(v2);
      }
    }
    if (k.bottomV === null && k.s >= this.bottomS) k.bottomV = Math.abs(k.v);
    // 오른쪽 언덕에서 멈췄다가 되돌아오면 레일 밖으로 떨어진다 (사라짐)
    if (k.v < 0 || k.s >= this.pathLen) k.dead = true;
    const p = this.at(k.s);
    k.img.setPosition(p.x, p.y).setRotation(p.ang);   // 스스로 돌지 않고 비탈 기울기만 따른다
  }

  // ------------------------------------------------------------------ 골렘
  spawnGolem() {
    const sprite = Characters.create(this, 'stone_golem', 0, 0).setDepth(3);
    this.worldLayer.add(sprite);
    this.golems.push({ sprite, s: this.pathLen - 20, state: 'walk', t: 0 });
    this.spawned++;
  }

  updateGolem(gl, dt) {
    const c = this.cfg, PX = this.PX;
    gl.t += dt;
    let anim = 'walk';
    if (gl.state === 'walk') {
      gl.s -= c.walkSpeed * PX * dt;
      gl.sprite.setFlipX(false);
      if (gl.s <= 0) { gl.state = 'punch'; gl.t = 0; Characters.play(gl.sprite, 'punch', false); }
    } else if (gl.state === 'punch') {
      anim = null;
      if (gl.t >= 0.35 && !gl.punched) {
        gl.punched = true;
        this.hp = Math.max(0, this.hp - c.punchDamage);
        this.hurtT = 0.5;
        Sound.play('sfx_ian_hurt');
      }
      if (gl.t >= 0.9) { gl.state = 'retreat'; gl.punched = false; }
    } else if (gl.state === 'retreat') {
      gl.s += c.retreatSpeed * PX * dt;
      gl.sprite.setFlipX(true);
      if (gl.s >= this.pathLen - 20) gl.state = 'walk';
    } else if (gl.state === 'hit') {
      anim = 'hit';
      if (gl.t >= 0.6) gl.state = 'walk';
    } else if (gl.state === 'crumble') {
      anim = null;
      if (gl.t > 1.0) gl.sprite.setAlpha(Math.max(0, 1 - (gl.t - 1.0) * 2));
      if (gl.t > 1.5) { gl.state = 'gone'; gl.sprite.setVisible(false); }
    }
    const p = this.at(gl.s);
    gl.sprite.setPosition(p.x, p.y);
    if (anim) Characters.play(gl.sprite, anim);
  }

  hitCheck(k) {
    for (const gl of this.golems) {
      if (gl.state !== 'walk' && gl.state !== 'retreat' && gl.state !== 'hit') continue;
      if (Math.abs(gl.s - k.s) > this.cfg.hitReach * this.PX) continue;
      const v = Math.abs(k.v);
      const gh = this.height(gl.s);
      const breaks = v >= this.cfg.breakSpeed;
      k.dead = true;
      gl.t = 0;
      if (breaks) {
        gl.state = 'crumble';
        Characters.play(gl.sprite, 'crumble', false);
        Sound.play('sfx_golem_crumble');
        this.broken++;
      } else {
        gl.state = 'hit';
        Sound.play('sfx_push_impact');
      }
      this.board.addRow([k.label, k.h0.toFixed(1), gh.toFixed(1), v.toFixed(1),
        k.bottomV === null ? '-' : k.bottomV.toFixed(1), breaks ? '부서짐' : '버팀'], breaks ? UIKit.SKY : '#ffd27a');
      this.message.setText(`${k.label} 바위 ${k.h0.toFixed(1)}m → 골렘(높이 ${gh.toFixed(1)}m)에 ${v.toFixed(1)} m/s — ${breaks ? '부서졌다!' : `${this.cfg.breakSpeed} m/s가 안 돼서 버텼다`}`)
        .setColor(breaks ? UIKit.SKY : '#ffd27a');
      return;
    }
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const c = this.cfg;
    this.cool = Math.max(0, this.cool - dt);
    this.rocks.forEach((k) => { this.updateRock(k, dt); if (!k.dead) this.hitCheck(k); });
    this.rocks = this.rocks.filter((k) => {
      if (!k.dead) return true;
      k.img.destroy();
      return false;
    });

    const alive = this.golems.filter((g) => g.state !== 'gone' && g.state !== 'crumble');
    this.spawnWait -= dt;
    if (!this.won && this.spawned < c.golemCount && alive.length < c.maxAlive && this.spawnWait <= 0) {
      this.spawnGolem();
      this.spawnWait = c.spawnEvery;
    }
    for (const gl of this.golems) this.updateGolem(gl, dt);

    this.hurtT = Math.max(0, (this.hurtT || 0) - dt);
    this.ianCastT = Math.max(0, (this.ianCastT || 0) - dt);
    Characters.play(this.ian, this.hp <= 0 || this.hurtT > 0 ? 'hurt' : this.ianCastT > 0 ? 'attack_lightning' : 'idle');
    Characters.play(this.garon, 'idle');
    if (this.hud) this.hud.set('health', this.hp);
    if (this.hp <= 0 && !this.lost) {
      this.lost = true;
      this.message.setText('이안이 쓰러졌다… R로 다시').setColor('#ff9a9a');
    }
    if (!this.won && this.broken >= c.golemCount) this.win();
    this.drawMarker();
    this.updatePanel();
  }

  drawMarker() {
    const g = this.marker;
    g.clear();
    if (this.won) { this.markerText.setVisible(false); return; }
    const p = this.at(this.dropS[this.dropH]);
    g.fillStyle(0x9fe0ff, this.cool > 0 ? 0.35 : 1);
    g.fillTriangle(p.x - 14, p.y - 70, p.x + 14, p.y - 70, p.x, p.y - 44);
    this.markerText.setPosition(p.x, p.y - 78).setText(`${this.dropH}m · ${this.rockInfo().label}`).setVisible(true);
  }

  win() {
    this.won = true;
    this.setMusicMode(null);
    Save.setChapter(this.scene.key, { won: true });
    this.message.setText('골렘을 모두 부쉈다!').setColor(UIKit.SKY);
    this.examBtn = this.showExamIntro(() => this.startExam());   // 빛나는 마법서 장 → 안내 → 시험 버튼
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      this.examBtn.setVisible(false);
      this.message.setText('1-4 일과 에너지 — 마법서 시험 통과!').setColor(UIKit.SKY);
      this.uiLayer.add(UIKit.button(this, 960, 985, '다음 장: 1-5 거친 돌바닥 ▶', () => this.goNext(), { fontSize: 30 })
        .setScrollFactor(0).setDepth(320));
    });
  }

  updatePanel() {
    const g = GAME_CONFIG.physics.g;
    const R = this.rockInfo();
    const bottom = Math.sqrt(2 * g * (this.dropH - this.height(this.bottomS)));
    this.speedPanel.setLines([
      `부순 골렘 ${this.broken} / ${this.cfg.golemCount}   이안 체력 ${Math.round(this.hp * 100)}%`,
      `${R.label} 바위 ${R.mass}kg — ${this.dropH}m에서 놓기`,
      this.curse.cursed ? '저주: 바위 무게에 따라 빨라지는 정도가 다르다?' : `골짜기 바닥에서 ${bottom.toFixed(1)} m/s (바위 크기와 상관없음)`,
      `${this.cfg.breakSpeed} m/s 넘게 부딪히면 골렘이 부서짐`,
    ]);
  }
}
window.RockRollScene = RockRollScene;
