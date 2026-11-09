// 1-6 상인 보스전 (ACT1_PLAN 6단계 5번) — 배경 08을 한 번 더 쓴다
//
// 광장 상인이 증기 골렘들을 불러낸다(summon). 골렘마다 상인 옆 연료통에서 연료선이 이어져 있어 에너지를 계속 보충받는다.
// 이안이 골렘 가까이에서 X로 연료선을 끊으면(sfx_fuel_snap) 골렘은 몸속에 남은 에너지만 쓰게 된다.
//   걷고 주먹질하는 데 1초마다 에너지를 쓰고, 남은 에너지가 줄수록 느려진다(속력 ∝ √남은 에너지) → 0이 되면 멈춤(fuel_stop).
// 저주(교사용 F1로 비교): 연료선을 끊어도 에너지가 줄지 않아 끝없이 움직인다 → 이길 수 없다.
// 골렘을 모두 멈추면 상인이 당황(panic)하며 마법사가 탑으로 갔다는 단서를 말한다 → 1-6 마법서 시험 → 1막 완료.
class MerchantBossScene extends ChapterScene {
  constructor() {
    super('Ch1_6b');
  }

  startCursed() {
    return false;
  }

  // 도착 해설 동안 대화창을 위로 (해설하는 것이 얼음판·바닥에 있어 가리지 않게) — 총괄지시 2차 17번
  get arrivalOnTop() { return true; }

  buildWorld() {
    const cfg = GAME_CONFIG.merchantBoss;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    this.merchant = Characters.create(this, 'merchant', cfg.merchantX * PX, this.groundY).setDepth(2);
    // 연료통 (그림이 없어 엔진으로)
    this.tankX = (cfg.merchantX - 1.1) * PX;
    const tank = this.add.graphics().setDepth(1);
    tank.fillStyle(0x6b4a2a, 1).fillRoundedRect(this.tankX - 45, this.groundY - 150, 90, 150, 14);
    tank.fillStyle(0x3a2716, 1).fillRect(this.tankX - 45, this.groundY - 110, 90, 10).fillRect(this.tankX - 45, this.groundY - 50, 90, 10);
    tank.fillStyle(0xffb347, 1).fillCircle(this.tankX, this.groundY - 160, 10);
    this.lines = this.add.graphics().setDepth(1);
    this.worldLayer.add([this.merchant, tank, this.lines]);

    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, this.groundY).setDepth(4);
    this.garon = Characters.create(this, 'garon', cfg.garonX * PX, this.groundY).setDepth(3);
    this.worldLayer.add([this.ian, this.garon]);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    this.hp = 1;
    this.attackT = 0;
    this.cool = 0;
    this.hurtT = 0;

    this.golems = [];
    this.summoned = 0;
    this.summonWait = 1.5;
    this.stopped = 0;
    this.won = false;
    this.lost = false;
    this.steam = this.add.graphics().setDepth(6);
    this.worldLayer.add(this.steam);
    this.puffs = [];

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT' });
    kb.addCapture(['X']);
    kb.on('keydown-X', () => this.attack());
    kb.on('keydown-R', () => { if (!this.isBlocked()) this.confirmRestart(() => this.scene.restart()); });
  }

  // 도착 해설 "상인이 증기 골렘들을 불러낸다" 동안 상인과 연료통을 비춘다
  arrivalFocusX() {
    return this.merchant.x - 2 * this.PX;
  }

  onReady() {
    this.setMusicMode('boss');
    this.speedPanel.moveTo(560, 140);
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '← → 걷기   X 연료선 끊기 (골렘 가까이에서)   R 다시   M 마법서', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '골렘 가까이 가서 X: 연료선 끊기', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.say('boss_intro');
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 한 번 움직이면 에너지 없이도 영원히 움직인다?'
      : '에너지를 보충받지 못하면 남은 에너지만큼만 움직이고 멈춘다';
  }

  // ------------------------------------------------------------------ 이안: 연료선 끊기
  attack() {
    if (this.isBlocked() || this.won || this.lost || this.cool > 0) return;
    const c = this.cfg;
    this.cool = c.attackCooldown;
    this.attackT = 0.45;
    Characters.play(this.ian, 'attack_light', false);
    const g = this.golems.filter((x) => x.state !== 'stopped' && x.linked && Math.abs(x.sprite.x - this.ian.x) <= c.reach * this.PX)
      .sort((a, b) => Math.abs(a.sprite.x - this.ian.x) - Math.abs(b.sprite.x - this.ian.x))[0];
    if (!g) return;
    g.linked = false;
    Sound.play('sfx_fuel_snap');
    this.message.setText(this.curse.cursed
      ? '연료선을 끊었는데… 골렘이 조금도 느려지지 않는다?!'
      : `연료선을 끊었다! 이제 몸속에 남은 ${g.energy.toFixed(0)}J만 쓸 수 있다`).setColor(this.curse.cursed ? '#c79bff' : UIKit.SKY);
  }

  // ------------------------------------------------------------------ 골렘
  summon() {
    const c = this.cfg;
    Characters.play(this.merchant, 'summon', false);
    Sound.play('sfx_steam_vent');
    const sprite = Characters.create(this, 'steam_golem', (c.merchantX - 2.2) * this.PX, this.groundY).setDepth(3);
    this.worldLayer.add(sprite);
    this.golems.push({ sprite, energy: c.golem.energy, linked: true, state: 'walk', punchT: c.golem.punchEvery * 0.5, steamT: 0 });
    this.summoned++;
  }

  updateGolem(g, dt) {
    const c = this.cfg.golem, PX = this.PX;
    if (g.state === 'stopped') return;
    // 에너지: 연료선이 이어져 있으면 계속 채워지고, 끊기면 쓰는 만큼 줄어든다 (저주: 줄지 않는다)
    if (g.linked) g.energy = c.energy;
    else if (!this.curse.cursed) g.energy = Math.max(0, g.energy - c.power * dt);
    const speed = c.speed * Math.sqrt(g.energy / c.energy);       // 남은 에너지가 줄수록 느려짐
    const gap = g.sprite.x - this.ian.x;
    if (Math.abs(gap) > c.punchReach * PX) {
      g.sprite.x -= Math.sign(gap) * speed * PX * dt;
      g.sprite.setFlipX(gap < 0);
      if (!(g.sprite.anims.isPlaying && g.sprite.currentAction === 'work')) Characters.play(g.sprite, 'idle');
    } else {
      g.punchT -= dt * Math.sqrt(g.energy / c.energy);
      if (g.punchT <= 0 && g.energy > 0) {
        g.punchT = c.punchEvery;
        Characters.play(g.sprite, 'work', false);
        this.hp = Math.max(0, this.hp - c.punchDamage);
        this.hurtT = 0.4;
        Sound.play('sfx_ian_hurt');
      }
    }
    // 일할 때마다 흰 김 (버려지는 열)
    g.steamT -= dt;
    if (g.steamT <= 0 && g.energy > 0) {
      g.steamT = c.steamEvery / Math.max(0.3, Math.sqrt(g.energy / c.energy));
      this.puffs.push({ x: g.sprite.x + 20, y: this.groundY - 230, t: 0 });
    }
    if (g.energy <= 0) {
      g.state = 'stopped';
      Characters.play(g.sprite, 'fuel_stop', false);
      Sound.play('sfx_machine_powerdown');
      this.stopped++;
      this.message.setText(`골렘이 멈췄다! (${this.stopped} / ${this.cfg.golemCount})`).setColor(UIKit.SKY);
    }
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const c = this.cfg, PX = this.PX;
    const dir = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    this.cool = Math.max(0, this.cool - dt);
    this.attackT = Math.max(0, this.attackT - dt);
    this.hurtT = Math.max(0, this.hurtT - dt);
    if (!this.lost && !this.won) {
      this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * GAME_CONFIG.iceCorridor.walkSpeed * PX * dt, 0.6 * PX, (c.merchantX - 1.8) * PX);
      if (dir) this.ian.setFlipX(dir < 0);
    }
    Characters.play(this.ian, this.hp <= 0 || this.hurtT > 0 ? 'hurt' : this.attackT > 0 ? 'attack_light' : dir ? 'walk' : 'idle');
    Characters.play(this.garon, 'idle');

    const active = this.golems.filter((g) => g.state !== 'stopped');
    this.summonWait -= dt;
    if (!this.won && this.summoned < c.golemCount && active.length < c.maxActive && this.summonWait <= 0) {
      this.summon();
      this.summonWait = c.summonEvery;
    }
    if (!(this.merchant.anims.isPlaying && this.merchant.currentAction !== 'idle') && !this.won) Characters.play(this.merchant, 'idle');
    for (const g of this.golems) this.updateGolem(g, dt);
    this.drawLines();
    this.drawSteam(dt);

    if (this.hud) this.hud.set('health', this.hp);
    if (this.hp <= 0 && !this.lost) {
      this.lost = true;
      this.message.setText('이안이 쓰러졌다… R로 다시').setColor('#ff9a9a');
    }
    if (!this.won && this.stopped >= c.golemCount) this.win();
    this.updatePanel();
  }

  drawLines() {
    const g = this.lines;
    g.clear();
    for (const m of this.golems) {
      if (!m.linked || m.state === 'stopped') continue;
      g.lineStyle(6, 0x3a2716, 1).lineBetween(this.tankX, this.groundY - 40, m.sprite.x + 30, this.groundY - 120);
      g.lineStyle(2, 0xffb347, 0.9).lineBetween(this.tankX, this.groundY - 40, m.sprite.x + 30, this.groundY - 120);
    }
  }

  drawSteam(dt) {
    const g = this.steam;
    g.clear();
    this.puffs = this.puffs.filter((p) => (p.t += dt) < 1.4);
    for (const p of this.puffs) {
      const k = p.t / 1.4;
      for (let i = 0; i < 3; i++) {
        g.fillStyle(0xffffff, 0.5 * (1 - k));
        g.fillCircle(p.x + i * 12 + k * 26, p.y - 80 * k - i * 8, 16 + 34 * k);
      }
    }
  }

  win() {
    this.won = true;
    this.setMusicMode(null);
    Characters.play(this.merchant, 'panic');
    Sound.play('sfx_merchant_panic');
    Save.setChapter(this.scene.key, { won: true });
    this.message.setText('골렘이 모두 멈췄다!').setColor(UIKit.SKY);
    this.say('boss_defeat', () => {
      this.examBtn = this.showExamIntro(() => this.startExam());   // 빛나는 마법서 장 → 안내 → 시험 버튼
    });
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      this.examBtn.setVisible(false);
      this.message.setText('1-6 에너지 보존과 열기관 — 마법서 시험 통과!').setColor(UIKit.SKY);
      this.uiLayer.add(UIKit.button(this, 960, 985, '1막 완료 ▶', () => this.goNext(), { fontSize: 30 })
        .setScrollFactor(0).setDepth(320));
    });
  }

  updatePanel() {
    const c = this.cfg;
    const lines = [`멈춘 골렘 ${this.stopped} / ${c.golemCount}   이안 체력 ${Math.round(this.hp * 100)}%`];
    for (const g of this.golems) {
      if (g.state === 'stopped') continue;
      const v = c.golem.speed * Math.sqrt(g.energy / c.golem.energy);
      lines.push(`골렘 ${g.linked ? '연료선 연결' : '연료선 끊김'}  에너지 ${g.energy.toFixed(0)}J  속력 ${v.toFixed(2)} m/s`);
    }
    this.speedPanel.setLines(lines);
  }
}
window.MerchantBossScene = MerchantBossScene;
