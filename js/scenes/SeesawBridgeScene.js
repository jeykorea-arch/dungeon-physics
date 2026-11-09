// 1-1 시소 다리 전투 (ACT1_PLAN 2단계 4번) — 배경 01을 한 번 더 쓴다
//
// 돌 골렘들이 오른쪽에서 걸어와 시소 다리 오른쪽 끝으로 기어오른 뒤, 판자를 건너 이안에게 온다.
// 이안은 지팡이로 바위를 띄워 시소 왼쪽 팔 위 0.5m 칸에 떨어뜨린다 (← → 칸 고르기, Space/Z 떨어뜨리기).
// 해방(진짜 법칙): 바위가 판자를 돌리는 세기(돌림힘)는 받침점에서 떨어뜨린 거리 d에 비례한다.
//   → 판자가 도는 빠르기 ω = (1m당 회전 빠르기) × d,  오른쪽 팔 위 골렘이 튕기는 속력 v = ω × r (r: 골렘의 받침점 거리)
//   골렘은 60° 위로 포물선을 그리며 날아간다. 날아간 거리 R = v² sin120° / g (같은 높이로 돌아올 때까지)
//   R이 부서지는 거리 이상이면 세게 떨어져 부서진다(crumble). 모자라면 떨어진 곳에서 다시 걸어온다.
// 저주: 어디에 떨어뜨려도 똑같이 약하게 튕긴다 (교사용 메뉴로 바꿔 비교).
// 골렘을 모두 부수면 1-1 마법서 시험 → 1-2로.
class SeesawBridgeScene extends ChapterScene {
  constructor() {
    super('Ch1_1d');
  }

  startCursed() {
    return false;
  }

  buildWorld() {
    const cfg = GAME_CONFIG.seesawBridge;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    this.pivotX = GAME_CONFIG.seesawGate.pivotX;
    const fulcrum = O.seesaw_fulcrum, plank = O.seesaw_plank;
    this.arm = plank.width / 2;                        // 받침점에서 판자 끝까지 (px, 그림 2.6m)
    this.pivotY = this.groundY - fulcrum.height + GAME_CONFIG.seesawGate.plankSeat;
    this.plankH = plank.height;
    const f = this.add.image(this.pivotX, this.groundY, fulcrum.key)
      .setOrigin(fulcrum.pivot.x / fulcrum.width, fulcrum.pivot.y / fulcrum.height).setDepth(-1);
    this.plank = this.add.image(this.pivotX, this.pivotY - plank.height / 2, plank.key).setDepth(0);
    this.worldLayer.add([f, this.plank]);
    this.angle = 0;          // 판자 기울기 (도). + 는 오른쪽이 내려감
    this.tiltV = 0;

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, this.groundY).setDepth(4);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, this.groundY).setDepth(3);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.hp = 1;
    this.hurtT = 0;
    this.throwT = 0;
    // 카메라는 시소와 골렘이 오는 길이 함께 보이는 곳에 고정
    this.camTarget = this.add.rectangle(cfg.cameraX * PX, this.worldH / 2, 1, 1).setVisible(false);
    this.worldLayer.add(this.camTarget);
    this.curse.followTarget(this.camTarget, { x: 0, y: 0, width: this.worldW, height: this.worldH }, 1);

    // 바위: 떨어뜨릴 칸 표시(반투명)와 떨어지는 바위
    const R = O[cfg.rockImage];
    this.rockKey = R.key;
    this.slot = cfg.startSlot;
    this.ghost = this.add.image(0, 0, R.key).setOrigin(0.5, 1).setAlpha(0.45).setDepth(5);
    this.marker = this.add.graphics().setDepth(5);
    this.rock = this.add.image(0, 0, R.key).setOrigin(0.5, 1).setDepth(5).setVisible(false);
    this.worldLayer.add([this.ghost, this.marker, this.rock]);
    this.falling = null;     // { y, v, d }
    this.rockCool = 0;

    // 골렘
    this.golems = [];
    this.spawned = 0;
    this.spawnWait = 0.5;
    this.broken = 0;
    this.won = false;
    this.lost = false;

    const kb = this.input.keyboard;
    kb.addCapture(['Z']);
    kb.on('keydown-LEFT', () => this.moveSlot(1));     // 왼쪽 = 받침점에서 멀리
    kb.on('keydown-RIGHT', () => this.moveSlot(-1));
    kb.on('keydown-Z', () => this.dropRock());
    kb.on('keydown-SPACE', () => this.dropRock());
    kb.on('keydown-R', () => { if (!this.isBlocked()) this.confirmRestart(() => this.scene.restart()); });
  }

  onReady() {
    this.setMusicMode('battle');
    this.speedPanel.moveTo(1050, 150);
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '← → 바위 떨어뜨릴 곳 (0.5m 칸)   Space/Z 떨어뜨리기   T 결과판   R 다시', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '← → 바위 떨어뜨릴 곳 고르기 · Space(Z) 떨어뜨리기', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.board = new ResultBoard(this, this.uiLayer, {
      title: '시소 다리 결과판', logKey: 'Ch1_1d', columns: [
        { label: '바위 거리 d (m)', width: 220 }, { label: '골렘 거리 r (m)', width: 220 },
        { label: '튕긴 속력 (m/s)', width: 220 }, { label: '날아간 거리 (m)', width: 230 },
        { label: '결과', width: 200 },
      ],
    });
    this.placeGhost();
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 바위 무게만 중요 — 어디에 떨어뜨려도 세기가 같다?'
      : '돌림힘 = 힘 × 받침점까지 거리 — 멀리 떨어뜨릴수록 세게 튕긴다';
  }

  // ------------------------------------------------------------------ 판자 위 높이
  plankTopY(x) {
    return this.pivotY - this.plankH + (x - this.pivotX) * Math.tan(this.angle * Math.PI / 180);
  }

  onPlankX(x) {
    return Math.abs(x - this.pivotX) <= this.arm;
  }

  // ------------------------------------------------------------------ 바위
  moveSlot(dir) {
    if (this.isBlocked() || this.won || this.lost) return;
    const c = this.cfg;
    this.slot = Phaser.Math.Clamp(Math.round((this.slot + dir * c.slotStep) / c.slotStep) * c.slotStep, c.slotStep, c.maxSlot);
    this.placeGhost();
    Sound.play('sfx_ui_click');
  }

  slotX() {
    return this.pivotX - this.slot * this.PX;
  }

  placeGhost() {
    const x = this.slotX();
    const top = this.plankTopY(x) - this.cfg.dropHeight * this.PX;
    this.ghost.setPosition(x, top).setVisible(this.rockCool <= 0 && !this.falling && !this.won);
    const g = this.marker;
    g.clear();
    if (this.won) return;
    g.lineStyle(3, 0x9fe0ff, 0.9);
    const py = this.plankTopY(x);
    for (let y = top + 6; y < py - 4; y += 14) g.lineBetween(x, y, x, Math.min(y + 7, py - 4));
    g.fillStyle(0x9fe0ff, 1);
    g.fillTriangle(x - 12, py - 22, x + 12, py - 22, x, py - 4);
  }

  dropRock() {
    if (this.isBlocked() || this.won || this.lost || this.falling || this.rockCool > 0) return;
    const x = this.slotX();
    this.falling = { y: this.plankTopY(x) - this.cfg.dropHeight * this.PX, v: 0, d: this.slot, x };
    this.rock.setPosition(x, this.falling.y).setVisible(true).setAlpha(1).setAngle(0);
    this.ghost.setVisible(false);
    this.throwT = 0.5;
    Characters.play(this.ian, 'throw', false);
    Sound.play('sfx_throw_whoosh');
  }

  // 바위가 판자에 닿는 순간: 판자가 왼쪽으로 홱 기울고 오른쪽 팔 위 골렘이 튕겨 오른다
  rockHits(d) {
    const c = this.cfg, PX = this.PX;
    Sound.play('sfx_rock_drop_launch');
    this.angle = 0;
    this.tiltV = -c.tiltKick * (this.curse.cursed ? c.cursedSpeed / (c.spinPerMeter * c.tipStand) : d);
    this.rockCool = c.rockCooldown;
    const targets = this.golems.filter((g) => g.state === 'plank' || g.state === 'tip');
    targets.filter((g) => g.x > this.pivotX).forEach((g) => {
      const r = (g.x - this.pivotX) / PX;
      const v = this.curse.cursed ? c.cursedSpeed : c.spinPerMeter * d * r;
      const a = c.launchAngle * Math.PI / 180;
      const range = v * v * Math.sin(2 * a) / GAME_CONFIG.physics.g;
      const breaks = range >= c.breakDistance;
      Object.assign(g, { state: 'fly', vx: v * Math.cos(a), vy: -v * Math.sin(a), breaks, launchY: g.y });
      Characters.play(g.sprite, 'launch', false);
      Sound.play('sfx_golem_fly');
      const res = breaks ? '부서짐' : '다시 옴';
      this.board.addRow([d.toFixed(1), r.toFixed(1), v.toFixed(1), range.toFixed(2), res], breaks ? UIKit.SKY : '#ffd27a');
      this.message.setText(this.curse.cursed
        ? `저주: ${d.toFixed(1)}m에 떨어뜨렸는데도 ${v.toFixed(1)} m/s — ${range.toFixed(2)}m밖에 못 날아간다`
        : `받침점에서 ${d.toFixed(1)}m → 골렘 ${v.toFixed(1)} m/s로 튕겨 ${range.toFixed(2)}m — ${breaks ? '부서진다!' : `${c.breakDistance}m 안 돼서 다시 온다`}`)
        .setColor(breaks ? UIKit.SKY : '#ffd27a');
    });
    if (!targets.some((g) => g.x > this.pivotX)) {
      this.message.setText('오른쪽 팔 위에 골렘이 없다… 골렘이 올라선 뒤에 떨어뜨리자').setColor('#ffd27a');
    }
  }

  // ------------------------------------------------------------------ 골렘
  spawnGolem() {
    const c = this.cfg;
    const sprite = Characters.create(this, 'stone_golem', c.spawnX * this.PX, this.groundY).setDepth(2);
    this.worldLayer.add(sprite);
    this.golems.push({ sprite, x: sprite.x, y: this.groundY, state: 'walk', t: 0, vx: 0, vy: 0 });
    this.spawned++;
  }

  updateGolem(g, dt) {
    const c = this.cfg, PX = this.PX;
    const tipX = this.pivotX + c.tipStand * PX;
    const leftEnd = this.pivotX - this.arm;
    g.t += dt;
    let anim = 'walk';
    switch (g.state) {
      case 'walk':      // 땅 위: 시소 끝까지 걸어온다
        g.x -= c.walkSpeed * PX * dt;
        g.y = this.groundY;
        if (g.x <= tipX + c.climbGap * PX) { g.state = 'climb'; g.t = 0; g.fromY = g.y; g.fromX = g.x; }
        break;
      case 'climb': {   // 판자 끝으로 기어오른다
        const k = Math.min(1, g.t / c.climbTime);
        g.x = Phaser.Math.Linear(g.fromX, tipX, k);
        g.y = Phaser.Math.Linear(g.fromY, this.plankTopY(tipX), k) - Math.sin(k * Math.PI) * 30;
        anim = 'idle';
        if (k >= 1) { g.state = 'tip'; g.t = 0; }
        break;
      }
      case 'tip':       // 끝에서 잠깐 숨 고르기
        g.y = this.plankTopY(g.x);
        anim = 'idle';
        if (g.t >= c.tipPause) { g.state = 'plank'; g.t = 0; }
        break;
      case 'plank':     // 판자를 건너 이안 쪽으로
        g.x -= c.walkSpeed * PX * dt;
        g.y = this.plankTopY(g.x);
        if (g.x <= leftEnd) { g.state = 'hop'; g.t = 0; g.fromX = g.x; g.fromY = g.y; }
        break;
      case 'hop': {     // 판자 왼쪽 끝에서 땅으로
        const k = Math.min(1, g.t / c.climbTime);
        g.x = g.fromX - k * 0.4 * PX;
        g.y = Phaser.Math.Linear(g.fromY, this.groundY, k);
        anim = 'idle';
        if (k >= 1) g.state = 'approach';
        break;
      }
      case 'approach':  // 이안에게 닿으면 주먹 한 방, 그리고 뒤로 물러난다
        g.x -= c.walkSpeed * PX * dt;
        g.y = this.groundY;
        if (g.x <= this.ian.x + c.punchReach * PX) {
          g.state = 'punch'; g.t = 0;
          Characters.play(g.sprite, 'punch', false);
        }
        break;
      case 'punch':
        anim = null;
        if (g.t >= 0.35 && !g.punched) {
          g.punched = true;
          this.hp = Math.max(0, this.hp - c.punchDamage);
          this.hurtT = 0.5;
          Sound.play('sfx_ian_hurt');
        }
        if (g.t >= 0.9) { g.state = 'retreat'; g.punched = false; }
        break;
      case 'retreat':   // 판자 밑을 지나 다시 오른쪽 땅으로
        g.x += c.retreatSpeed * PX * dt;
        g.y = this.groundY;
        g.sprite.setFlipX(true);
        if (g.x >= tipX + c.retreatTo * PX) { g.state = 'walk'; g.sprite.setFlipX(false); }
        break;
      case 'fly': {     // 포물선 (게임 시계로 계산)
        g.vy += GAME_CONFIG.physics.g * dt;
        g.x += g.vx * PX * dt;
        g.y += g.vy * PX * dt;
        anim = 'launch';
        const floor = this.onPlankX(g.x) ? this.plankTopY(g.x) : this.groundY;
        if (g.vy > 0 && g.y >= floor) {
          g.y = floor;
          if (g.breaks) {
            g.state = 'crumble'; g.t = 0;
            Characters.play(g.sprite, 'crumble', false);
            Sound.play('sfx_golem_crumble');
            this.broken++;
          } else {
            g.state = this.onPlankX(g.x) ? 'plank' : 'walk'; g.t = 0;
            g.hitT = 0.5;
            Sound.play('sfx_push_impact');
          }
        }
        break;
      }
      case 'crumble':
        anim = null;
        if (g.t > 1.0) g.sprite.setAlpha(Math.max(0, 1 - (g.t - 1.0) * 2));
        if (g.t > 1.5) { g.state = 'gone'; g.sprite.setVisible(false); }
        break;
      default:
        return;
    }
    if (g.hitT > 0) { g.hitT -= dt; anim = 'hit'; }
    g.sprite.setPosition(g.x, g.y);
    if (anim) Characters.play(g.sprite, anim);
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const c = this.cfg, PX = this.PX;
    // 판자: 바위에 맞아 기울었다가 용수철처럼 되돌아온다 (보기용 — 튕기는 속력은 위 공식으로 정해짐)
    this.tiltV += (-this.angle * c.tiltSpring - this.tiltV * c.tiltDamp) * dt;
    this.angle = Phaser.Math.Clamp(this.angle + this.tiltV * dt, -c.maxTilt, c.maxTilt);
    this.plank.setAngle(this.angle);

    // 떨어지는 바위
    if (this.falling) {
      const fr = this.falling;
      fr.v += GAME_CONFIG.physics.g * dt;
      fr.y += fr.v * PX * dt;
      const top = this.plankTopY(fr.x);
      if (fr.y >= top) {
        this.falling = null;
        this.rock.setY(top);
        this.rockHits(fr.d);
        this.rockFade = 0.8;
      } else this.rock.setY(fr.y);
    } else if (this.rockFade > 0) {
      this.rockFade -= dt;
      this.rock.setY(this.plankTopY(this.rock.x)).setAngle(this.angle).setAlpha(Math.max(0, this.rockFade / 0.8));
      if (this.rockFade <= 0) this.rock.setVisible(false);
    }
    this.rockCool = Math.max(0, this.rockCool - dt);
    this.placeGhost();

    // 골렘 나오기: 한 번에 하나씩, 앞 골렘이 부서지거나 일정 시간이 지나면 다음
    const alive = this.golems.filter((g) => g.state !== 'gone' && g.state !== 'crumble');
    this.spawnWait -= dt;
    if (!this.won && this.spawned < c.golemCount && (alive.length === 0 ? this.spawnWait <= 0 : this.spawnWait <= -c.spawnEvery)) {
      this.spawnGolem();
      this.spawnWait = c.spawnDelay;
    }
    if (alive.length === 0 && this.spawnWait > c.spawnDelay) this.spawnWait = c.spawnDelay;
    for (const g of this.golems) this.updateGolem(g, dt);

    // 이안·가론
    this.hurtT = Math.max(0, this.hurtT - dt);
    this.throwT = Math.max(0, this.throwT - dt);
    Characters.play(this.ian, this.hp <= 0 ? 'hurt' : this.hurtT > 0 ? 'hurt' : this.throwT > 0 ? 'throw' : 'idle');
    Characters.play(this.garon, 'idle');
    if (this.hud) this.hud.set('health', this.hp);
    if (this.hp <= 0 && !this.lost) {
      this.lost = true;
      this.message.setText('이안이 쓰러졌다… R로 다시').setColor('#ff9a9a');
    }
    if (!this.won && this.broken >= c.golemCount) this.win();
    this.updatePanel();
  }

  win() {
    this.won = true;
    this.setMusicMode(null);
    Save.setChapter(this.scene.key, { won: true });
    this.message.setText('골렘을 모두 튕겨 부쉈다!').setColor(UIKit.SKY);
    this.examBtn = this.showExamIntro(() => this.startExam());   // 빛나는 마법서 장 → 안내 → 시험 버튼
  }

  // 1-1의 마지막: 마법서 시험을 다 맞히면 다음 장(1-2)으로
  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      this.examBtn.setVisible(false);
      this.message.setText('1-1 돌림힘과 평형 — 마법서 시험 통과!').setColor(UIKit.SKY);
      this.uiLayer.add(UIKit.button(this, 960, 985, '다음 장: 1-2 얼음 회랑 ▶', () => this.goNext(), { fontSize: 30 })
        .setScrollFactor(0).setDepth(320));
    });
  }

  updatePanel() {
    const c = this.cfg;
    const v = this.curse.cursed ? c.cursedSpeed : c.spinPerMeter * this.slot * c.tipStand;
    const range = v * v * Math.sin(2 * c.launchAngle * Math.PI / 180) / GAME_CONFIG.physics.g;
    this.speedPanel.setLines([
      `부순 골렘 ${this.broken} / ${c.golemCount}   이안 체력 ${Math.round(this.hp * 100)}%`,
      `바위 ${c.rockMass}kg → 무게 ${c.rockMass * GAME_CONFIG.physics.g} N, 받침점에서 ${this.slot.toFixed(1)} m`,
      `돌림힘 ${c.rockMass * GAME_CONFIG.physics.g} N × ${this.slot.toFixed(1)} m = ${(c.rockMass * GAME_CONFIG.physics.g * this.slot).toFixed(0)} N·m`,
      `끝(${c.tipStand}m)에 선 골렘: ${v.toFixed(1)} m/s → ${range.toFixed(2)}m 날아감`,
      `${c.breakDistance}m 넘게 날아가면 부서짐`,
    ]);
  }
}
window.SeesawBridgeScene = SeesawBridgeScene;
