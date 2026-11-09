// 1-3 얼음 트롤 (ACT1_PLAN 3단계 4번 보스) — 배경 05를 한 번 더 쓴다
//
// 얼음 호수 위. 왼쪽 호숫가에 출구를 막은 얼음문, 오른쪽에서 얼음 트롤(100kg)이 미끄러져 온다.
// 트롤은 이안 앞에서 발톱으로 멈춰 서서 0.5초 동안 200N으로 민다 → 이안도 트롤을 똑같이 200N으로 민다(작용·반작용).
//   이안(50kg) 속도 변화 = 200 × 0.5 ÷ 50 = 2 m/s,  트롤(100kg) = 200 × 0.5 ÷ 100 = 1 m/s, 서로 반대 방향
// 얼음문은 2.5 m/s 이상으로 부딪혀야 깨진다 → 트롤의 밀기(2 m/s)만으로는 모자라다.
// 이안은 10kg 돌 3개를 든다(X로 던지기, 1-3 호수와 같은 계산). 트롤 쪽으로 던지면 반동으로 이안은 출구 쪽으로 밀리고,
// 돌이 트롤에 맞으면 돌과 트롤이 한 덩어리로 운동량을 나눈다(트롤이 잠깐 느려졌다가 발톱으로 다시 속력을 냄).
// 출구를 등지고 서서, 미리 돌을 던져 출구 쪽으로 움직이는 중에 밀리면 2.5 m/s를 넘어 문을 깨고 빠져나간다.
class IceTrollScene extends ChapterScene {
  constructor() {
    super('Ch1_3b');
  }

  startCursed() {
    return false;
  }

  // 도착 해설 동안 대화창을 위로 (해설하는 것이 얼음판·바닥에 있어 가리지 않게) — 총괄지시 2차 17번
  get arrivalOnTop() { return true; }

  buildWorld() {
    const cfg = GAME_CONFIG.iceTroll;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    this.gateX = cfg.gateX * PX;
    this.farShoreX = GAME_CONFIG.iceLake.farShoreX * PX;

    IceLakeScene.drawShores(this, this.gateX, this.farShoreX);
    // 얼음문 (요청서 05 그림: 깨지기 전 ice_gate → 깨진 뒤 ice_gate_broken)
    const D = O.ice_gate;
    this.gate = this.add.image(this.gateX - 40, this.groundY + 6, D.key)
      .setOrigin(D.pivot.x / D.width, 1).setDepth(-1);
    this.worldLayer.add(this.gate);
    this.gateBroken = false;

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, this.groundY).setDepth(4);
    this.troll = Characters.create(this, 'ice_troll', cfg.trollX * PX, this.groundY).setDepth(3);
    this.worldLayer.add([this.ian, this.troll]);
    this.player = this.ian;
    this.ianV = 0;
    this.trollV = 0;
    this.trollState = 'wait';
    this.trollT = 0;
    this.facing = 1;
    this.stones = cfg.stone.count;
    this.throwT = 0;
    this.flying = [];
    this.stoneKey = O[`stone_${cfg.stone.mass}kg`].key;
    this.pushLog = null;
    this.ended = false;
    this.flags_fail = false;   // R(scene.restart)은 같은 장면 객체를 다시 쓰므로 여기서 되돌린다
    this.trollHitT = 0;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });

    const kb = this.input.keyboard;
    kb.addCapture(['X']);
    kb.on('keydown-LEFT', () => this.face(-1));
    kb.on('keydown-RIGHT', () => this.face(1));
    kb.on('keydown-X', () => this.throwStone());
    kb.on('keydown-R', () => { if (!this.isBlocked()) this.confirmRestart(() => this.scene.restart()); });
  }

  // 도착 해설 "호수 저편에서 커다란 그림자가 미끄러져 온다" 동안 트롤을 비춘다
  arrivalFocusX() {
    return this.troll.x;
  }

  onReady() {
    this.setMusicMode('midboss');   // 중간 보스: 얼음 트롤
    this.speedPanel.moveTo(1136, 150);
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '← → 던질 방향   X 돌 던지기   T 결과판   R 다시   M 마법서', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '트롤이 온다! ← → 던질 방향 · X 돌 던지기', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.board = new ResultBoard(this, this.uiLayer, {
      title: '트롤과 서로 밀기 결과판 (+ 는 오른쪽)', logKey: 'Ch1_3b', columns: [
        { label: '이안 50kg 전→후 (m/s)', width: 300 }, { label: '트롤 100kg 전→후 (m/s)', width: 300 },
        { label: '이안 속도 변화', width: 210 }, { label: '트롤 속도 변화', width: 210 },
      ],
    });
    this.say('troll_intro');
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 미는 쪽은 아무 힘도 받지 않는다?'
      : '작용·반작용: 트롤이 미는 힘 = 이안이 미는 힘 (반대 방향)';
  }

  // ------------------------------------------------------------------ 이안
  face(dir) {
    if (this.isBlocked() || this.ended) return;
    this.facing = dir;
    this.ian.setFlipX(dir < 0);
  }

  ianMass() {
    return GAME_CONFIG.physics.ian.mass + this.stones * this.cfg.stone.mass;
  }

  throwStone() {
    if (this.isBlocked() || this.ended || this.stones <= 0 || this.throwT > 0 || this.trollState === 'push') return;
    const s = this.cfg.stone;
    this.stones--;
    const stoneV = this.ianV + this.facing * s.throwSpeed;
    if (!this.curse.cursed) this.ianV -= this.facing * s.mass * s.throwSpeed / this.ianMass();
    this.throwT = 0.45;
    Characters.play(this.ian, 'throw', false);
    Sound.play('sfx_throw_whoosh');
    const img = this.add.image(this.ian.x + this.facing * 40, this.groundY, this.stoneKey).setOrigin(0.5, 1).setDepth(5);
    this.worldLayer.add(img);
    this.flying.push({ img, vx: stoneV, t: 0, live: true });
    this.message.setText(`돌을 ${this.facing > 0 ? '트롤 쪽(오른쪽)' : '출구 쪽(왼쪽)'}으로 → 이안 ${this.fmt(this.ianV)} m/s (남은 돌 ${this.stones}개)`)
      .setColor(UIKit.SKY);
  }

  fmt(v) {
    return (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(2);
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const cfg = this.cfg, PX = this.PX;
    this.updateTroll(dt);

    // 이안: 얼음 위 (미는 중이면 updateTroll에서 힘을 받는다)
    if (!this.ended) {
      this.ian.x += this.ianV * PX * dt;
      if (this.ian.x <= this.gateX) this.hitGate();
      if (this.ian.x >= this.farShoreX) { this.ian.x = this.farShoreX; this.ianV = 0; }
    }
    this.throwT = Math.max(0, this.throwT - dt);
    let a = 'idle';
    if (this.ended && this.gateBroken) a = 'slide_steady';
    else if (this.trollState === 'push') a = 'push';
    else if (this.throwT > 0) a = 'throw';
    else if (Math.abs(this.ianV) > 0.001) a = 'slide_steady';
    Characters.play(this.ian, a);
    if (this.trollState === 'push') this.ian.setFlipX(this.troll.x < this.ian.x);

    // 던진 돌: 트롤에 맞으면 한 덩어리처럼 운동량을 나누고 떨어진다
    this.flying = this.flying.filter((f) => {
      f.t += dt;
      const prevX = f.img.x;
      f.img.x += f.vx * PX * dt;
      f.img.y = this.groundY - Math.max(0, 60 * Math.sin(Math.min(1, f.t / 0.5) * Math.PI));
      if (f.live && Math.sign(prevX - this.troll.x) !== Math.sign(f.img.x - this.troll.x)) {
        f.live = false;
        const m = cfg.stone.mass, M = cfg.trollMass;
        const v = (M * this.trollV + m * f.vx) / (M + m);
        this.message.setText(`돌이 트롤에 맞았다: 트롤 ${this.fmt(this.trollV)} → ${this.fmt(v)} m/s`).setColor(UIKit.SKY);
        this.trollV = v;
        f.vx = v;
        this.trollHitT = 0.4;
        Sound.play('sfx_troll_hurt');
      }
      if (!f.live && f.t > 0) f.img.setAlpha(Math.max(0, f.img.alpha - dt * 1.5));
      if (f.t > 3) f.img.setAlpha(Math.max(0, 1 - (f.t - 3)));
      if (f.t > 4 || f.img.alpha <= 0) { f.img.destroy(); return false; }
      return true;
    });
    this.updatePanel();
  }

  // 트롤: 기다림 → 이안 쪽으로 미끄러져 옴 → 앞에서 멈춰 0.5초 밀기 → 반동으로 미끄러짐 → 발톱으로 멈춤 → 다시
  updateTroll(dt) {
    const cfg = this.cfg, PX = this.PX;
    this.trollT += dt;
    this.trollHitT = Math.max(0, (this.trollHitT || 0) - dt);
    const toIan = Math.sign(this.ian.x - this.troll.x) || -1;
    let anim = 'idle';
    switch (this.trollState) {
      case 'wait':
        if (this.trollT >= cfg.waitTime && !this.ended) {
          this.trollState = 'charge';
          this.trollV = toIan * cfg.chargeSpeed;
          Sound.play('sfx_troll_roar');
        }
        break;
      case 'charge':
        // 발톱으로 얼음을 긁어 다가오는 속력을 되찾는다 (돌에 맞아 느려져도)
        this.trollV += Phaser.Math.Clamp(toIan * cfg.chargeSpeed - this.trollV, -cfg.skateAccel * dt, cfg.skateAccel * dt);
        if (Math.abs(this.ian.x - this.troll.x) <= cfg.contact * PX && !this.ended) {
          // 발톱으로 얼음을 찍고 멈춰 선 뒤 민다
          this.trollV = 0;
          this.trollState = 'push';
          this.trollT = 0;
          this.pushDir = toIan;                        // 트롤이 미는 방향 (이안이 밀려 가는 쪽)
          this.pushLog = { ian0: this.ianV, troll0: this.trollV };
          Characters.play(this.troll, 'push', false);
          Sound.play('sfx_push_impact');
        }
        break;
      case 'push': {
        // 0.5초 동안 서로 200N: 이안은 F/50, 트롤은 F/100 의 가속도 (반대 방향)
        anim = null;
        const t = Math.min(dt, cfg.pushTime - (this.trollT - dt));
        if (t > 0) {
          this.ianV += this.pushDir * cfg.pushForce / GAME_CONFIG.physics.ian.mass * t;
          if (!this.curse.cursed) this.trollV -= this.pushDir * cfg.pushForce / cfg.trollMass * t;
        }
        if (this.trollT >= cfg.pushTime) {
          const L = this.pushLog;
          this.board.addRow([`${this.fmt(L.ian0)} → ${this.fmt(this.ianV)}`, `${this.fmt(L.troll0)} → ${this.fmt(this.trollV)}`,
            this.fmt(this.ianV - L.ian0), this.fmt(this.trollV - L.troll0)], UIKit.SKY);
          this.message.setText(`서로 ${cfg.pushForce}N × ${cfg.pushTime}초 — 이안 ${this.fmt(this.ianV)} m/s, 트롤 ${this.fmt(this.trollV)} m/s`)
            .setColor(UIKit.SKY);
          this.trollState = 'slide';
          this.trollT = 0;
        }
        break;
      }
      case 'slide':
        anim = 'recoil';
        if (this.trollT >= cfg.slideTime) { this.trollState = 'dig'; this.trollT = 0; this.trollV = 0; }
        break;
      case 'dig':
        if (this.trollT >= cfg.digTime && !this.ended) {
          this.trollState = 'charge';
          this.trollV = toIan * cfg.chargeSpeed;
        }
        break;
      case 'defeat':
        anim = 'defeat';
        this.trollV *= Math.max(0, 1 - dt);
        break;
      default:
        break;
    }
    this.troll.x += this.trollV * PX * dt;
    this.troll.x = Phaser.Math.Clamp(this.troll.x, this.gateX + 60, this.farShoreX);
    if (this.trollState !== 'push') this.troll.setFlipX(toIan > 0);
    if (this.trollHitT > 0 && anim) anim = 'hit';
    if (anim) Characters.play(this.troll, anim);
  }

  hitGate() {
    const speed = -this.ianV;
    this.ian.x = this.gateX;
    if (speed >= this.cfg.gateBreakSpeed) {
      this.ended = true;
      this.gateBroken = true;
      Sound.play('sfx_bridge_collapse');
      Sound.play('sfx_curse_break');
      this.gate.setTexture(MANIFEST.objects.ice_gate_broken.key);
      this.trollState = 'defeat';
      Save.setChapter(this.scene.key, { won: true });
      this.message.setText(`${speed.toFixed(2)} m/s로 얼음문을 깨고 빠져나왔다!`).setColor(UIKit.SKY);
      this.time.delayedCall(800, () => {
        this.tweens.add({ targets: this.ian, alpha: 0, duration: 800 });
        this.say('troll_escape', () => this.win());
      });
    } else {
      this.ianV = 0;
      if (!this.flags_fail) {
        this.flags_fail = true;
        Sound.play('sfx_push_impact');
        this.message.setText(`쿵! ${speed.toFixed(2)} m/s로는 얼음문이 안 깨진다 (${this.cfg.gateBreakSpeed} m/s 필요) — R로 다시`).setColor('#ffd27a');
      }
    }
  }

  win() {
    this.setMusicMode(null);
    this.examBtn = this.showExamIntro(() => this.startExam());   // 빛나는 마법서 장 → 안내 → 시험 버튼
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      this.examBtn.setVisible(false);
      this.message.setText('1-3 작용·반작용과 운동량 — 마법서 시험 통과!').setColor(UIKit.SKY);
      this.uiLayer.add(UIKit.button(this, 960, 985, '다음 장: 1-4 광차 탑 ▶', () => this.goNext(), { fontSize: 30 })
        .setScrollFactor(0).setDepth(320));
    });
  }

  updatePanel() {
    const mi = this.ianMass(), mt = this.cfg.trollMass;
    const pi = mi * this.ianV, pt = mt * this.trollV;
    this.speedPanel.setLines([
      `이안 ${mi}kg  ${this.fmt(this.ianV)} m/s   (돌 ${this.stones}개)`,
      `트롤 ${mt}kg  ${this.fmt(this.trollV)} m/s`,
      `얼음문까지 ${Math.max(0, (this.ian.x - this.gateX) / this.PX).toFixed(1)} m  — ${this.cfg.gateBreakSpeed} m/s 넘게 부딪히면 깨짐`,
      `운동량: 이안 ${pi.toFixed(0)} + 트롤 ${pt.toFixed(0)} = ${(pi + pt).toFixed(0)} kg·m/s`,
    ]);
  }
}
window.IceTrollScene = IceTrollScene;
