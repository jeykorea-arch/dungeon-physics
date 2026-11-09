// 1-3 얼음 호수 (ACT1_PLAN 3단계 1~3번) — 배경 05
//
// 이안과 주민 넷이 호수 한가운데(22m)에 갇혀 있다. 마찰 없는 얼음이라 걸을 수 없다.
// 저주: 무언가를 던져도(밀어도) 던진 쪽은 아무 힘도 받지 않는다 → 주민들이 짐을 던져도 꿈쩍 안 함.
// 진실의 원(이안 발밑) 실험: 정지한 이안(50kg)이 10kg 돌을 2m/s로 던지면 이안은 반대로 0.4m/s (10×2 = 50×0.4).
// 해방: 운동량 보존. 이안은 10kg 돌 3개를 들고 있다. ← → 로 던질 방향, X 로 던지기.
//   던지기 전후 운동량 합이 같다: 이안 속도 변화 = −(돌 질량 × 던지는 속력) ÷ (던진 뒤 이안+남은 돌 질량)
//   (던지는 속력은 이안에 대한 속력 2m/s) → 돌 3개를 모두 오른쪽으로: 0.29 + 0.33 + 0.40 = 1.02 m/s 왼쪽
// 왼쪽 호숫가(4m, 가론이 기다림)에 닿으면 성공. 주민들도 짐을 호수 안쪽으로 던져 하나둘 빠져나간다.
class IceLakeScene extends ChapterScene {
  constructor() {
    super('Ch1_3');
  }

  // 도착 해설 동안 대화창을 위로 (해설하는 것이 얼음판·바닥에 있어 가리지 않게) — 총괄지시 2차 17번
  get arrivalOnTop() { return true; }

  buildWorld() {
    const cfg = GAME_CONFIG.iceLake;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    this.shoreX = cfg.shoreX * PX;
    this.farShoreX = cfg.farShoreX * PX;

    IceLakeScene.drawShores(this, this.shoreX, this.farShoreX);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, this.groundY).setDepth(3);
    this.worldLayer.add(this.garon);
    IceLakeScene.drawBoat(this, cfg.boatX * PX, this.groundY);

    // 진실의 원 (호수 한가운데, 이안 발밑)
    this.curse.addTruthCircle({ centerX: cfg.centerX, groundY: this.groundY, diameter: cfg.circleDiameter, domeHeight: 2.6 });
    this.circleHint = UIKit.text(this, cfg.centerX * PX, this.groundY - 300, 'Z: 던지기 실험', {
      fontSize: '26px', color: UIKit.SKY, backgroundColor: '#0b1320cc', padding: { x: 10, y: 6 },
    }).setOrigin(0.5).setVisible(false);
    this.worldLayer.add(this.circleHint);

    // 주민 (각자 짐 하나)
    this.villagers = cfg.villagers.map((v) => {
      const sprite = Characters.create(this, v.id, v.x * PX, this.groundY).setDepth(2);
      const it = O[v.item];
      const item = this.add.image(0, 0, it.key).setOrigin(0.5, 1).setDepth(3);
      this.worldLayer.add([sprite, item]);
      return { ...v, itemKey: it.key, sprite, item, itemH: it.height, x: v.x * PX, v: 0, state: 'stuck', t: Math.random() * 2, thrown: null };
    });
    // 한 번 구한 주민은 기억한다 (R·되돌아오기·다시 들어오기). 처음으로 되돌리는 것은 교사용 메뉴 "저장 지우기"에서만
    const rescued = Save.chapter(this.scene.key).rescued || [];
    rescued.forEach((id, i) => {
      const v = this.villagers.find((o) => o.id === id);
      if (!v) return;
      const slot = this.villagers.length - 1 - i;   // 먼저 구한 주민이 바깥쪽 자리 (던질 때와 같은 규칙)
      Object.assign(v, { state: 'safe', slot, x: this.slotX(slot), itemCool: 999 });
      v.sprite.x = v.x;
    });

    // 이안
    this.ian = Characters.create(this, 'ian', cfg.centerX * PX, this.groundY).setDepth(4);
    this.worldLayer.add(this.ian);
    this.player = this.ian;
    this.ianV = 0;
    this.facing = 1;                 // 던질 방향 (1 = 오른쪽)
    this.stones = cfg.stone.count;
    this.throwT = 0;
    this.arrived = false;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    this.flying = [];                // 던져진 돌·짐: { img, vx, t, y0 }
    this.stoneKey = O[`stone_${cfg.stone.mass}kg`].key;
    this.lastThrow = null;

    const kb = this.input.keyboard;
    kb.addCapture(['X', 'Z']);
    kb.on('keydown-LEFT', () => this.face(-1));
    kb.on('keydown-RIGHT', () => this.face(1));
    kb.on('keydown-X', () => this.throwStone());
    kb.on('keydown-Z', () => this.tryExperiment());
    kb.on('keydown-R', () => { if (!this.isBlocked()) this.confirmRestart(() => this.scene.restart()); });
    this.flags = {};
    this.villagerOrder = undefined;   // R로 다시 할 때 주민 차례를 되돌림
    this.throwsPaused = false;        // 실험을 연 때부터 해방 대사가 끝날 때까지 아무도 던지지 않는다 (총괄지시 3차 23번)
    // 지금 짐을 던지는(던져서 미끄러지는) 주민 머리 위 표시
    this.throwMark = UIKit.text(this, 0, 0, '▼', { fontSize: '44px', color: UIKit.SKY }).setOrigin(0.5, 1).setDepth(6).setVisible(false);
    this.worldLayer.add(this.throwMark);
    this.realizing = false;
    this.lab = new ThrowLab(this, this.uiLayer);
  }

  isBlocked() {
    return super.isBlocked() || (this.lab && this.lab.isOpen);
  }

  onReady() {
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '← → 던질 방향   X 돌 던지기   Z 실험 (진실의 원)   R 다시   M 마법서', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.speedPanel.moveTo(1136, 150);
    this.setMessage();
    if (this.curse.cursed) this.say('intro', () => this.cursedDemo());
    else {
      this.villagerOrder = 0;
      this.villagerT = 1.5;
      if (this.villagers.every((v) => v.state === 'safe')) {
        this.uiLayer.add(UIKit.button(this, 960, 985, '주민을 모두 구했다 — 트롤 방으로 ▶', () => this.goNext(), { fontSize: 30 })
          .setScrollFactor(0).setDepth(320));
      }
    }
  }

  setMessage() {
    this.message.setText(this.curse.cursed
      ? '호수 한가운데에 갇혔다. 걸을 수도 없다… 발밑의 진실의 원에서 Z'
      : `← → 던질 방향 고르기 · X 돌 던지기 (남은 돌 ${this.stones}개)`)
      .setColor(this.curse.cursed ? '#ffe08a' : UIKit.SKY);
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 미는 쪽은 아무 힘도 받지 않는다?'
      : '작용·반작용: 미는 만큼 나도 밀린다 — 운동량의 합은 그대로';
  }

  onCurseChanged() {
    super.onCurseChanged();
    if (this.message) this.setMessage();
  }

  // ------------------------------------------------------------------ 이안: 방향·던지기
  face(dir) {
    if (this.isBlocked() || this.arrived) return;
    this.facing = dir;
    this.ian.setFlipX(dir < 0);
  }

  ianMass() {      // 이안 + 들고 있는 돌
    return GAME_CONFIG.physics.ian.mass + this.stones * this.cfg.stone.mass;
  }

  throwStone() {
    if (this.isBlocked() || this.arrived || this.stones <= 0 || this.throwT > 0) return;
    const s = this.cfg.stone;
    const before = { v: this.ianV, m: this.ianMass() };
    this.stones--;
    const rest = this.ianMass();
    const stoneV = this.ianV + this.facing * s.throwSpeed;      // 땅에서 본 돌 속도
    if (!this.curse.cursed) this.ianV -= this.facing * s.mass * s.throwSpeed / rest;
    this.lastThrow = { before, stoneV, stoneM: s.mass, after: { v: this.ianV, m: rest } };
    this.throwT = 0.45;
    Characters.play(this.ian, 'throw', false);
    Sound.play('sfx_throw_whoosh');
    const img = this.add.image(this.ian.x + this.facing * 40, this.groundY, this.stoneKey).setOrigin(0.5, 1).setDepth(5);
    this.worldLayer.add(img);
    this.flying.push({ img, vx: stoneV, t: 0 });
    if (this.curse.cursed) {
      this.message.setText('돌은 날아갔는데… 이안은 꿈쩍도 안 한다').setColor('#c79bff');
    } else {
      const fmt = (v) => `${v < 0 ? '왼쪽' : v > 0 ? '오른쪽' : ''} ${Math.abs(v).toFixed(2)} m/s`;
      this.message.setText(`${s.mass}kg 돌을 ${this.facing > 0 ? '오른쪽' : '왼쪽'}으로 → 이안 ${fmt(this.ianV)} (남은 돌 ${this.stones}개)`)
        .setColor(UIKit.SKY);
    }
  }

  // ------------------------------------------------------------------ 진실의 원 실험
  tryExperiment() {
    if (this.isBlocked() || !this.curse.cursed || !this.curse.inCircle(this.ian.x)) return;
    this.throwsPaused = true;
    this.clearFlying();
    const open = () => this.lab.open(() => this.onLabDone());
    if (this.flags.labTalked) { open(); return; }
    this.flags.labTalked = true;
    this.say('lab_start', open);
  }

  onLabDone() {
    this.realizing = true;
    Characters.play(this.ian, 'realize', false);
    this.ian.once('animationcomplete', () => {
      this.say('realize', () => this.breakCurse(() => {
        this.realizing = false;
        // 주민들이 흩어진 돌을 모아 다시 3개를 쥐여 준다 (저주 때 던진 돌은 호수 멀리 미끄러져 갔다)
        this.stones = this.cfg.stone.count;
        this.ianV = 0;
        this.clearFlying();
        this.setMessage();
        // after_free 대사가 끝난 뒤에야 주민이 한 명씩 던지기 시작한다
        this.say('after_free', () => { this.throwsPaused = false; this.villagerOrder = 0; this.villagerT = 0.6; });
      }));
    });
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const cfg = this.cfg, PX = this.PX;
    // 이안: 얼음 위라 속도가 그대로 (걸을 수 없다)
    if (!this.arrived) {
      this.ian.x += this.ianV * PX * dt;
      if (this.ian.x <= this.shoreX) this.reachShore();
      else if (this.ian.x >= this.farShoreX) {
        this.ian.x = this.farShoreX;
        this.ianV = 0;
        if (!this.flags.farShore) {
          this.flags.farShore = true;
          this.message.setText('반대편 호숫가에 닿았다… 가론은 왼쪽에 있다. R로 다시').setColor('#ffd27a');
        }
      }
    }
    this.throwT = Math.max(0, this.throwT - dt);
    if (!this.realizing) {
      let a = 'idle';
      if (this.throwT > 0) a = 'throw';
      else if (this.arrived) a = 'idle';
      else if (Math.abs(this.ianV) > 0.001) a = 'slide_steady';
      Characters.play(this.ian, a);
    }
    this.circleHint.setVisible(this.curse.cursed && this.curse.inCircle(this.ian.x) && !this.isBlocked());
    if (!this.curse.cursed && !this.arrived && this.stones === 0 && this.ianV >= 0 && !this.flags.stuck && !this.flags.farShore) {
      this.flags.stuck = true;
      this.message.setText('돌을 다 던졌는데 호숫가 쪽으로 가지 않는다… R로 다시').setColor('#ffd27a');
    }

    this.updateVillagers(dt);
    // 던져진 것: 얼음 위를 미끄러져 멀어진다 (처음엔 살짝 떠서 날아감)
    this.flying = this.flying.filter((f) => {
      f.t += dt;
      f.img.x += f.vx * PX * dt;
      f.img.y = this.groundY - Math.max(0, 60 * Math.sin(Math.min(1, f.t / 0.5) * Math.PI));
      if (f.t > 3) f.img.setAlpha(Math.max(0, 1 - (f.t - 3)));
      if (f.t > 4) { f.img.destroy(); return false; }
      return true;
    });
    this.updatePanel();
  }

  reachShore() {
    this.arrived = true;
    this.ian.x = this.shoreX;
    this.ianV = 0;
    Sound.play('sfx_step_stone');
    Save.setChapter(this.scene.key, { crossed: true, freed: true });
    this.message.setText('호숫가에 닿았다! 던진 돌의 반작용으로 건넜다').setColor(UIKit.SKY);
    this.say('arrive', () => {
      this.wantNext = true;
      if (!this.villagers.every((v) => v.state === 'safe')) this.message.setText('주민들이 모두 호숫가에 닿으면 다음 방으로').setColor(UIKit.SKY);
    });
  }

  // 날고 있던 돌·짐을 모두 치운다 (실험·저주 풀림 연출 동안 공중에 멈춰 있다가 한꺼번에 움직이지 않게)
  clearFlying() {
    for (const f of this.flying) f.img.destroy();
    this.flying = [];
  }

  // 저주 상태: intro 대사 뒤 농부가 짐을 한 번만 던져 본다 — 던져도 꿈쩍 안 한다 (반복하지 않는다)
  cursedDemo() {
    const v = this.villagers.find((o) => o.id === 'villager_farmer' && o.state === 'stuck');
    if (!v || !this.curse.cursed || this.flags.cursedDemo) return;
    this.flags.cursedDemo = true;
    this.villagerThrow(v, false);
    this.message.setText('짐을 던졌는데… 주민은 꿈쩍도 안 한다').setColor('#c79bff');
    this.time.delayedCall(3000, () => { if (this.curse.cursed) this.setMessage(); });
  }

  // 주민: 저주 땐 짐을 던져도 제자리. 해방 뒤엔 차례로 짐을 호수 안쪽(오른쪽)으로 던지고 왼쪽으로 미끄러져 나간다
  updateVillagers(dt) {
    const cfg = this.cfg, PX = this.PX;
    const V = cfg.villager;
    // 해방 뒤: 한 명씩 차례로 던지되 기다리지 않는다 — 앞 주민이 던지고 throwGap(초) 뒤 다음 주민 (총괄지시 3차 26번)
    // 이미 던진(미끄러지는·구한) 주민은 건너뛴다
    const cur = this.villagerOrder !== undefined && !this.throwsPaused ? this.villagers[this.villagerOrder] : null;
    if (cur) {
      if (cur.state === 'stuck') {
        this.villagerT -= dt;
        if (this.villagerT <= 0) {
          this.villagerThrow(cur, true);
          this.markOn = cur;
          this.markT = V.throwGap + 0.6;
          this.villagerOrder++;
          this.villagerT = V.throwGap;
        }
      } else {
        this.villagerOrder++;
      }
    }
    // 누가 던지는지 보이게: 방금 던진 주민 머리 위 ▼ (다음 주민이 던지면 옮겨 가고, 마지막 주민은 잠시 뒤 사라짐)
    this.markT = Math.max(0, (this.markT || 0) - dt);
    const m = this.markOn;
    this.throwMark.setVisible(!!m && m.state === 'sliding' && this.markT > 0);
    if (m) this.throwMark.setPosition(m.x, this.groundY - 270);
    if (this.wantNext && !this.nextBtn && this.villagers.every((v) => v.state === 'safe')) {
      this.nextBtn = UIKit.button(this, 960, 985, '다음 ▶', () => this.goNext(), { fontSize: 30 }).setScrollFactor(0).setDepth(320);
      this.uiLayer.add(this.nextBtn);
    }
    for (const v of this.villagers) {
      v.t += dt;
      if (v.state === 'sliding') {
        v.x += v.v * PX * dt;
        if (v.x <= this.slotX(v.slot)) {
          v.x = this.slotX(v.slot);
          v.v = 0;
          v.state = 'safe';
        }
      }
      v.sprite.x = v.x;
      v.itemCool = Math.max(0, (v.itemCool || 0) - dt);
      v.item.setVisible(v.state === 'stuck' && v.itemCool <= 0).setPosition(v.x + 30, this.groundY - 70);
      const busy = v.sprite.anims.currentAnim?.key.endsWith('_throw') && v.sprite.anims.isPlaying;
      if (!busy) {
        Characters.play(v.sprite, v.state === 'safe' ? 'wave' : 'idle');
        v.sprite.setFlipX(v.state === 'safe' ? false : v.flip);
      }
    }
  }

  // 호숫가에서 주민이 서는 자리 (px). 자리 번호가 클수록 바깥쪽(왼쪽)
  slotX(slot) {
    const V = this.cfg.villager;
    return this.shoreX - (V.shoreBack + V.shoreGap * (1 + slot)) * this.PX;
  }

  villagerThrow(v, real) {
    const V = this.cfg.villager;
    v.flip = false;                                      // 호수 안쪽(오른쪽)을 보고 던진다
    v.sprite.setFlipX(false);
    Characters.play(v.sprite, 'throw', false);
    v.itemCool = real ? 999 : 1.5;                       // 저주 땐(한 번 던져 보는 장면) 잠시 뒤 다시 짐을 든다
    const img = this.add.image(v.x + 30, this.groundY - 70, v.itemKey).setOrigin(0.5, 1).setDepth(5);
    this.worldLayer.add(img);
    this.flying.push({ img, vx: V.itemThrowSpeed, t: 0 });
    Sound.play('sfx_throw_whoosh');
    if (real) {
      v.state = 'sliding';
      v.v = -V.itemMass * V.itemThrowSpeed / V.mass;     // 0 = 주민 × v + 짐 × 4
      // 호숫가 자리: 먼저 던진(먼저 닿는) 주민일수록 바깥쪽(왼쪽 먼) 자리 — 뒤에 오는 주민이 앞사람을 지나치며 겹치지 않게
      const taken = this.villagers.filter((o) => o !== v && (o.state === 'sliding' || o.state === 'safe')).map((o) => o.slot);
      let slot = this.villagers.length - 1;
      while (taken.includes(slot) && slot > 0) slot--;
      v.slot = slot;
      // 짐을 던진 순간 이미 호숫가로 가는 중이므로 구한 것으로 기억한다 (미끄러지는 중에 R을 눌러도 다시 갇히지 않게)
      const saved = Save.chapter(this.scene.key).rescued || [];
      if (!saved.includes(v.id)) Save.setChapter(this.scene.key, { rescued: [...saved, v.id] });
    }
  }

  updatePanel() {
    const m = this.ianMass();
    const lines = [
      `이안 ${GAME_CONFIG.physics.ian.mass}kg + 돌 ${this.stones}개 = ${m}kg   속도 ${this.ianV < 0 ? '−' : this.ianV > 0 ? '+' : ' '}${Math.abs(this.ianV).toFixed(2)} m/s`,
      `호숫가까지 ${Math.max(0, (this.ian.x - this.shoreX) / this.PX).toFixed(1)} m   (+ 는 오른쪽)`,
    ];
    const t = this.lastThrow;
    if (t && !this.curse.cursed) {
      const p0 = t.before.m * t.before.v;
      const p1 = t.after.m * t.after.v + t.stoneM * t.stoneV;
      lines.push(`던지기 전 운동량 합 ${p0.toFixed(1)} kg·m/s`);
      lines.push(`던진 뒤: 이안 ${(t.after.m * t.after.v).toFixed(1)} + 돌 ${(t.stoneM * t.stoneV).toFixed(1)} = ${p1.toFixed(1)}`);
    }
    this.speedPanel.setLines(lines);
  }
}
// 눈 덮인 호숫가 바닥 (요청서 05 그림, 기준점 = 왼쪽 끝·눈 윗면). 인물의 발이 눈 윗면(groundY)에 선다.
// 왼쪽 호숫가는 leftX에서 끝나고(왼쪽으로 이어 붙임), 오른쪽 호숫가는 rightX에서 시작한다.
// 호수에 얼어붙은 나룻배 (그림이 올 때까지 엔진으로 — 요청서 09). x = 배 가운데, y = 얼음 윗면(발 기준선)
// 반쯤 얼음에 잠긴 나무배: 이안은 미끄러져 와서 여기에 부딪혀 멈췄다
IceLakeScene.drawBoat = function (scene, x, y) {
  const B = MANIFEST.objects.frozen_rowboat;
  if (B && scene.textures.exists(B.key)) {
    const img = scene.add.image(x, y, B.key).setOrigin(B.pivot.x / B.width, B.pivot.y / B.height).setDepth(1);
    scene.worldLayer.add(img);
    return img;
  }
  const g = scene.add.graphics().setDepth(1);
  const w = 210, h = 62;
  // 뱃전 (위가 넓은 사다리꼴), 판자 줄, 노
  g.fillStyle(0x3b2616, 1).fillPoints([{ x: x - w / 2 - 6, y: y - h }, { x: x + w / 2 + 6, y: y - h }, { x: x + w / 2 - 22, y: y + 6 }, { x: x - w / 2 + 22, y: y + 6 }], true);
  g.fillStyle(0x6b4a2e, 1).fillPoints([{ x: x - w / 2, y: y - h + 6 }, { x: x + w / 2, y: y - h + 6 }, { x: x + w / 2 - 24, y: y }, { x: x - w / 2 + 24, y: y }], true);
  g.lineStyle(3, 0x4a311c, 1);
  for (let i = 1; i < 3; i++) g.lineBetween(x - w / 2 + 8 + i * 6, y - h + 6 + i * 18, x + w / 2 - 8 - i * 6, y - h + 6 + i * 18);
  g.lineStyle(6, 0x7a5a36, 1).lineBetween(x - 30, y - h - 34, x + 40, y - h + 10);
  // 뱃전에 낀 서리·눈, 배를 붙잡고 있는 얼음 턱
  g.fillStyle(0xeaf7ff, 0.95).fillRect(x - w / 2 - 6, y - h - 4, w + 12, 7);
  g.fillStyle(0xcfefff, 0.9).fillEllipse(x, y + 4, w + 40, 26);
  g.fillStyle(0xffffff, 0.8).fillEllipse(x - 40, y - 2, 60, 10).fillEllipse(x + 55, y, 40, 8);
  scene.worldLayer.add(g);
  return g;
};

IceLakeScene.drawShores = function (scene, leftX, rightX) {
  const L = MANIFEST.objects.lake_shore_left, R = MANIFEST.objects.lake_shore_right;
  const put = (o, x, depth) => {
    // 인물 그림의 발바닥이 기준점보다 조금 위에 그려져 있어, 눈 윗면을 그만큼(화면에서 잰 18px) 올린다
    const img = scene.add.image(x, scene.groundY - 18, o.key).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
    scene.worldLayer.add(img);
  };
  // 그림의 호수 쪽 끝(약 240px)은 얼음으로 비스듬히 내려가는 부분이라, 이어 붙일 때는 240px씩 겹치고
  // 먼저 놓은 조각을 위에 그려 다음 조각의 비탈을 가린다.
  // 호숫가 끝(이안이 멈추는 곳)이 그림의 평평한 눈 윗면 끝에 오게: 왼쪽 그림 x 250, 오른쪽 그림 x 280 (그림에서 잰 값)
  const slope = 240, edgeL = 250, edgeR = 280;
  let d = -3;
  for (let x = leftX - edgeL; x > -L.width; x -= slope) put(L, x, (d -= 0.01));
  d = -3;
  for (let x = rightX - edgeR; x < scene.worldW; x += slope) put(R, x, (d -= 0.01));
};
window.IceLakeScene = IceLakeScene;

// ------------------------------------------------------------------ 진실의 원 안의 던지기 실험 (실험 화면)
// 정지한 이안(50kg)이 10kg 돌을 2m/s로 던진다. Space로 던지고, 다시 보려면 R.
class ThrowLab {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    const cfg = GAME_CONFIG.iceLake.lab;
    this.cfg = cfg;
    const PX = GAME_CONFIG.pxPerMeter;
    this.PX = PX;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(640).setVisible(false);
    layer.add(c);
    this.container = c;
    this.cx = 960;
    this.baseY = 720;
    c.add(scene.add.rectangle(0, 0, 1920, 1080, 0x061018, 1).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(scene, 960, 120, '진실의 원 — 던지기 실험', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    c.add(UIKit.text(scene, 960, 180, 'Space: 돌 던지기    R: 처음으로    Esc: 닫기', { fontSize: '26px', color: '#cfe3f5' }).setOrigin(0.5));
    c.add(scene.add.rectangle(160, this.baseY, 1600, 6, 0xbfe6ff, 0.8).setOrigin(0, 0));
    for (let d = -5; d <= 5; d++) {
      const x = this.cx + d * PX;
      c.add(scene.add.rectangle(x, this.baseY + 10, 3, 16, 0xf3ead6).setOrigin(0.5, 0));
      c.add(UIKit.text(scene, x, this.baseY + 30, `${d}m`, { fontSize: '20px' }).setOrigin(0.5, 0));
    }
    this.ian = Characters.create(scene, 'ian', this.cx, this.baseY);
    const so = MANIFEST.objects[`stone_${cfg.stoneMass}kg`];
    this.stone = scene.add.image(this.cx + 50, this.baseY, so.key).setOrigin(0.5, 1);
    c.add([this.ian, this.stone]);
    this.info = UIKit.text(scene, 960, 840, '', { fontSize: '32px', align: 'center', lineSpacing: 10 }).setOrigin(0.5, 0);
    c.add(this.info);
    const kb = scene.input.keyboard;
    kb.on('keydown-SPACE', () => this.throwIt());
    kb.on('keydown-R', () => this.reset());
    kb.on('keydown-ESC', () => this.close());
    scene.labUpdate((t, delta) => this.update(Math.min(delta, 50) / 1000));
  }

  open(onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.container.setVisible(true);
    this.reset();
    Sound.play('sfx_truth_circle_enter');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
  }

  reset() {
    if (!this.isOpen) return;
    this.t = null;
    this.vI = 0; this.vS = 0;
    this.ian.setPosition(this.cx, this.baseY);
    this.stone.setPosition(this.cx + 50, this.baseY);
    Characters.play(this.ian, 'idle');
    this.info.setText(`정지한 이안 ${this.cfg.ianMass}kg이 ${this.cfg.stoneMass}kg 돌을 ${this.cfg.throwSpeed} m/s로 던지면?\n(Space)`).setColor('#ffe08a');
  }

  throwIt() {
    if (!this.isOpen || this.t !== null) return;
    const c = this.cfg;
    this.t = 0;
    this.vS = c.throwSpeed;
    this.vI = -c.stoneMass * c.throwSpeed / c.ianMass;    // 0 = 50 × vI + 10 × 2
    Characters.play(this.ian, 'throw_recoil', false);
    Sound.play('sfx_throw_whoosh');
  }

  update(dt) {
    if (!this.isOpen || this.t === null) return;
    const c = this.cfg;
    this.t += dt;
    this.ian.x = this.cx + this.vI * this.PX * this.t;
    this.stone.x = this.cx + 50 + this.vS * this.PX * this.t;
    const pI = c.ianMass * this.vI, pS = c.stoneMass * this.vS;
    this.info.setText(
      `돌 ${c.stoneMass}kg × (+${this.vS.toFixed(1)} m/s) = +${pS.toFixed(0)} kg·m/s     이안 ${c.ianMass}kg × (${this.vI.toFixed(1)} m/s) = ${pI.toFixed(0)} kg·m/s\n`
      + `던지기 전 합 0  →  던진 뒤 합 ${(pI + pS).toFixed(0)}   (밀어낸 만큼 나도 반대로 밀렸다)`).setColor(UIKit.SKY);
    if (this.t >= c.showSeconds && !this.done) {
      this.done = true;
      Sound.play('sfx_lever_balance');
      UIKit.labNext(this, () => { this.close(); if (this.onDone) this.onDone(); });
    }
  }
}
window.ThrowLab = ThrowLab;
