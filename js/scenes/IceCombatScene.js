// 1-2 얼음 위 전투 (1단계 1-D) — 배경 02(얼음 회랑)를 한 번 더 쓴다. 승인대기 [1] 승인안대로.
//
// 이안·가론은 왼쪽 출발 돌바닥(0~2m) 위에 있고, 나머지는 마찰 없는 얼음이다.
// 돌 골렘(20kg 셋, 80kg 하나)이 오른쪽 문에서 하나씩 나와 1 m/s로 미끄러져 다가온다 (얼음이라 스스로 못 멈춤).
// 돌바닥 가장자리에 닿으면 멈춰서 주먹질을 한다.
// X: 공격 — 미는 힘을 0.5초 동안 준다. 속도 변화 = 힘 × 시간 ÷ 질량
//   가론 방패 돌진 80N → 20kg은 2 m/s, 80kg은 0.5 m/s 바뀜 / 이안 지팡이 20N → 20kg은 0.5 m/s 바뀜
// 되밀린 골렘은 얼음 위라 멈추지 않고 문 너머로 미끄러져 나간다. 모두 내보내면 승리 → 마법서 시험.
class IceCombatScene extends ChapterScene {
  constructor() {
    super('Ch1_2d');
  }

  startCursed() {
    return false;
  }

  buildWorld() {
    const cfg = GAME_CONFIG.iceCombat;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    this.padEnd = cfg.padEnd * PX;

    const place = (name, x, y, depth) => {
      const o = O[name];
      const img = this.add.image(x, y, o.key).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };
    place('start_stone_floor', this.padEnd - O.start_stone_floor.width, this.groundY, -3);
    // 골렘이 나오는 문 (열려 있다)
    place('corridor_door', cfg.doorX * PX, this.groundY + 6 - 440, -1);

    const P = GAME_CONFIG.physics;
    this.heroes = {
      ian: { id: 'ian', name: '이안', force: cfg.heroes.ian.force, reach: cfg.heroes.ian.reach * PX, hp: 1,
        attackAnim: 'attack_light', sound: 'sfx_push_impact', sprite: Characters.create(this, 'ian', cfg.heroes.ian.startX * PX, this.groundY) },
      garon: { id: 'garon', name: '가론', force: cfg.heroes.garon.force, reach: cfg.heroes.garon.reach * PX, hp: 1,
        attackAnim: 'shield_charge', sound: 'sfx_shield_bash', sprite: Characters.create(this, 'garon', cfg.heroes.garon.startX * PX, this.groundY) },
    };
    for (const h of Object.values(this.heroes)) Object.assign(h, { attackT: 0, cooldown: 0, hurtT: 0 });
    this.heroes.ian.sprite.setDepth(4);
    this.heroes.garon.sprite.setDepth(3);
    this.worldLayer.add([this.heroes.ian.sprite, this.heroes.garon.sprite]);
    // 가론 방패 돌진이 주인공이라 가론부터 조작한다
    this.control = 'garon';
    this.player = this.heroes.garon.sprite;
    this.bounds = { x: 0, y: 0, width: this.worldW, height: this.worldH };
    this.curse.followTarget(this.player, this.bounds);

    // 골렘 (나올 차례를 기다린다)
    this.golemHalf = cfg.golemHalfWidth * PX;
    this.golems = cfg.golems.map((g, i) => {
      const sprite = Characters.create(this, 'stone_golem', 0, this.groundY).setVisible(false).setDepth(2);
      const label = UIKit.text(this, 0, 0, `${g.mass}kg`, {
        fontSize: '22px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 6, y: 2 },
      }).setOrigin(0.5, 1).setDepth(5).setVisible(false);
      this.worldLayer.add([sprite, label]);
      return { i, mass: g.mass, sprite, label, state: 'waiting', v: 0, punchT: 0, hitT: 0 };
    });
    this.fightT = 0;
    this.won = false;
    this.winAt = undefined;
    // 골렘이 나타날 때 피어오르는 보랏빛 연기 (게임 시계로 퍼지며 사라진다)
    this.smoke = this.add.graphics().setDepth(6);
    this.worldLayer.add(this.smoke);
    this.puffs = [];

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT', tab: 'TAB', attack: 'X', reset: 'R' });
    kb.addCapture(['TAB', 'X']);
    this.keys.tab.on('down', () => { if (!this.isBlocked()) this.switchControl(); });
    this.keys.attack.on('down', () => { if (!this.isBlocked()) this.attack(); });
    this.keys.reset.on('down', () => { if (!this.isBlocked()) this.confirmRestart(() => this.scene.restart()); });
  }

  onReady() {
    this.setMusicMode('battle');
    this.speedPanel.moveTo(1136, 150);
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '← → 돌바닥 위 걷기   X 공격 (가론 방패 돌진 80N · 이안 지팡이 20N)   Tab 바꾸기   T 결과판   R 다시', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '골렘들이 얼음 위로 미끄러져 온다! X로 밀어내자', {
      fontSize: '36px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 24, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.board = new ResultBoard(this, this.uiLayer, {
      title: '얼음 위 전투 결과판 (+ 는 문 쪽, − 는 다가오는 쪽)', logKey: 'Ch1_2d', columns: [
        { label: '맞힌 사람 (힘)', width: 220 }, { label: '골렘 질량 (kg)', width: 200 },
        { label: '맞기 전 속도 (m/s)', width: 240 }, { label: '맞은 뒤 속도 (m/s)', width: 240 },
        { label: '속도 변화 (m/s)', width: 220 },
      ],
    });
  }

  curseRuleText() {
    return '같은 힘을 같은 시간 주면, 무거울수록 속도가 조금 바뀐다';
  }

  switchControl() {
    this.control = this.control === 'ian' ? 'garon' : 'ian';
    this.player = this.heroes[this.control].sprite;
    this.curse.followTarget(this.player, this.bounds);
    Sound.play('sfx_ui_click');
  }

  // ------------------------------------------------------------------ 공격: 0.5초 동안 힘 F → 속도 변화 F×t÷m
  attack() {
    const h = this.heroes[this.control];
    if (h.cooldown > 0 || h.hp <= 0) return;
    h.cooldown = this.cfg.attackCooldown;
    h.attackT = 0.45;
    Characters.play(h.sprite, h.attackAnim, false);
    // 가장 가까운, 손이 닿는 골렘
    const target = this.golems
      .filter((g) => (g.state === 'ice' || g.state === 'edge') && g.sprite.x - h.sprite.x <= h.reach + this.golemHalf)
      .sort((a, b) => a.sprite.x - b.sprite.x)[0];
    if (!target) return;
    const before = target.v;
    const dv = h.force * this.cfg.contactTime / target.mass;
    target.v = before + dv;
    target.state = 'ice';     // 가장자리에서 맞아도 다시 얼음 위로 (뒤로 밀림)
    target.hitT = 0.3;
    if (target.firstHitT == null) target.firstHitT = this.fightT;
    Sound.play(h.sound);
    const fmt = (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(2);
    this.board.addRow([`${h.name} (${h.force}N)`, target.mass, fmt(before), fmt(target.v), fmt(dv)],
      target.v > 0 ? UIKit.SKY : '#ffd27a');
    this.message.setText(`${h.name} ${h.force}N × ${this.cfg.contactTime}초 → ${target.mass}kg 골렘 속도 ${fmt(before)} → ${fmt(target.v)} m/s`)
      .setColor(target.v > 0 ? UIKit.SKY : '#ffd27a');
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const cfg = this.cfg, PX = this.PX;
    this.fightT += dt;
    // 이안·가론: 돌바닥 위에서만 걷는다 (얼음으로 나가면 멈출 수 없으니 가장자리에서 멈춤)
    const dir = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    for (const h of Object.values(this.heroes)) {
      h.cooldown = Math.max(0, h.cooldown - dt);
      h.attackT = Math.max(0, h.attackT - dt);
      h.hurtT = Math.max(0, h.hurtT - dt);
      const d = h.id === this.control && h.hp > 0 ? dir : 0;
      h.sprite.x = Phaser.Math.Clamp(h.sprite.x + d * GAME_CONFIG.iceCorridor.walkSpeed * PX * dt,
        cfg.wallMargin * PX, this.padEnd - cfg.heroEdgeGap * PX);
      if (d) h.sprite.setFlipX(d < 0);
      let anim = h.hp <= 0 ? 'hurt' : h.hurtT > 0 ? 'hurt' : h.attackT > 0 ? h.attackAnim : d ? 'walk' : 'idle';
      Characters.play(h.sprite, anim);
    }

    // 첫 골렘은 처음부터 14m에서 미끄러져 오고, 다음 골렘은 앞 골렘이 되밀려 문 쪽으로 미끄러지기 시작하면 나온다
    const next = this.golems.find((g) => g.state === 'waiting');
    const prev = next && this.golems[next.i - 1];
    if (next && (!prev || prev.state === 'gone' || (prev.state === 'ice' && prev.v > 0))) this.spawnGolem(next);
    for (const g of this.golems) this.updateGolem(g, dt);
    this.updateSmoke(dt);

    // 되밀려 문 쪽으로 미끄러지기 시작한 골렘은 쓰러진 것으로 친다 (얼음이라 다시 돌아오지 못한다).
    // 마지막 골렘까지 되밀리면 2초 뒤 승리 — 골렘들은 계속 문 밖으로 미끄러져 나간다 (총괄지시 수정목록 14번)
    const out = (g) => g.state === 'gone' || (g.state === 'ice' && g.v > 0);
    if (!this.won && this.winAt === undefined && this.golems.every(out)) this.winAt = this.fightT + this.cfg.winDelay;
    if (!this.won && this.winAt !== undefined && this.fightT >= this.winAt) this.win();
    // 조작하는 사람이 쓰러지면 다시
    const ctrl = this.heroes[this.control];
    if (ctrl.hp <= 0 && !this.flags_down) {
      this.flags_down = true;
      this.message.setText(`${ctrl.name}이(가) 쓰러졌다… R로 다시`).setColor('#ff9a9a');
    }
    if (this.hud) this.hud.set('health', ctrl.hp);
    this.updatePanel();
  }

  spawnGolem(g) {
    const PX = this.PX;
    g.state = 'ice';
    g.v = -this.cfg.approachSpeed;
    g.spawnT = this.fightT;
    g.sprite.setPosition(this.cfg.spawnX * PX, this.groundY).setVisible(true).setAlpha(1);
    g.label.setVisible(true);
    this.puffs.push({ x: g.sprite.x, y: this.groundY - 40, t: 0 }); // 등장 소리는 맞는 효과음이 없어 넣지 않음
  }

  updateSmoke(dt) {
    const g = this.smoke;
    g.clear();
    this.puffs = this.puffs.filter((p) => (p.t += dt) < 0.9);
    for (const p of this.puffs) {
      const k = p.t / 0.9;
      for (let i = 0; i < 5; i++) {
        const a = i * 1.26 + k * 2;
        g.fillStyle(i % 2 ? 0x8a3cff : 0xc28bff, 0.55 * (1 - k));
        g.fillCircle(p.x + Math.cos(a) * 40 * k, p.y - 60 * k + Math.sin(a) * 25 * k, 30 + 40 * k);
      }
    }
  }

  updateGolem(g, dt) {
    const cfg = this.cfg, PX = this.PX;
    if (g.state === 'waiting') return;
    if (g.state === 'gone') return;
    g.hitT = Math.max(0, g.hitT - dt);

    if (g.state === 'ice') {
      // 마찰 없는 얼음: 속도 그대로
      g.sprite.x += g.v * PX * dt;
      // 돌바닥 가장자리에 앞부분이 닿으면 멈춘다
      if (g.sprite.x - this.golemHalf <= this.padEnd) {
        g.sprite.x = this.padEnd + this.golemHalf;
        g.v = 0;
        g.state = 'edge';
        g.punchT = cfg.punchInterval * 0.5;
      }
      // 문 너머로 미끄러져 나가면 쓰러진 것
      if (g.sprite.x >= cfg.exitX * PX) {
        g.state = 'gone';
        g.sprite.setVisible(false);
        g.label.setVisible(false);
        Sound.play('sfx_golem_crumble');
      }
    } else if (g.state === 'edge') {
      // 가장자리에서 주먹질: 손이 닿는 사람의 체력이 준다
      g.punchT -= dt;
      if (g.punchT <= 0) {
        g.punchT = cfg.punchInterval;
        Characters.play(g.sprite, 'punch', false);
        const h = Object.values(this.heroes).filter((x) => x.hp > 0
          && g.sprite.x - this.golemHalf - x.sprite.x <= cfg.punchReach * PX)
          .sort((a, b) => b.sprite.x - a.sprite.x)[0];
        if (h) {
          h.hp = Math.max(0, h.hp - cfg.punchDamage);
          h.hurtT = 0.4;
          Sound.play('sfx_ian_hurt');
        }
      }
    }
    let anim = 'idle';
    if (g.hitT > 0) anim = 'hit';
    else if (g.v > 0) anim = 'launch';
    else if (g.state === 'edge' && g.sprite.anims.currentAnim?.key === 'stone_golem_punch' && g.sprite.anims.isPlaying) anim = 'punch';
    Characters.play(g.sprite, anim);
    g.label.setPosition(g.sprite.x, g.sprite.y - 90);
  }

  win() {
    this.won = true;
    this.setMusicMode(null);
    Save.setChapter(this.scene.key, { won: true });
    this.message.setText('골렘을 모두 얼음 밖으로 밀어냈다!').setColor(UIKit.SKY);
    this.examBtn = this.showExamIntro(() => this.startExam());   // 빛나는 마법서 장 → 안내 → 시험 버튼
  }

  // 1-2의 마지막: 마법서 시험을 다 맞히면 다음 장(1-3)으로
  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      this.examBtn.setVisible(false);
      this.message.setText('1-2 관성과 가속도 — 마법서 시험 통과!').setColor(UIKit.SKY);
      this.uiLayer.add(UIKit.button(this, 960, 985, '다음 장: 1-3 얼음 호수 ▶', () => this.goNext(), { fontSize: 30 })
        .setScrollFactor(0).setDepth(320));
    });
  }

  updatePanel() {
    const fmt = (v) => (v > 0 ? '+' : v < 0 ? '−' : ' ') + Math.abs(v).toFixed(2);
    const where = { waiting: '대기', ice: '얼음 위', edge: '돌바닥 앞', gone: '밀려 나감' };
    const lines = [`조작: ${this.heroes[this.control].name} (Tab)   이안 체력 ${Math.round(this.heroes.ian.hp * 100)}% · 가론 ${Math.round(this.heroes.garon.hp * 100)}%`];
    for (const g of this.golems) {
      if (g.state === 'waiting') continue;
      lines.push(`골렘 ${g.mass}kg  ${fmt(g.v)} m/s  ${where[g.state]}${g.state !== 'gone' ? `  ${(g.sprite.x / this.PX).toFixed(1)} m` : ''}`);
    }
    this.speedPanel.setLines(lines);
  }
}
window.IceCombatScene = IceCombatScene;
