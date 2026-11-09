// 1-5 얼음 정령 전투 (ACT1_PLAN 5단계 5번) — 배경 07을 한 번 더 쓴다
//
// 이안·가론은 왼쪽 출발 돌바닥(0~2m) 위. 그 오른쪽 9.72m까지는 마찰 없는 얼음, 그 너머는 거친 돌바닥.
// 얼음 정령(5kg)이 오른쪽에서 떠서 다가와 공격한다. 무기에 맞으면 튕겨 날 뿐(deflect) 체력은 줄지 않는다.
// X 공격: 0.5초 동안 힘을 준다 → 속도 변화 = 힘 × 시간 ÷ 질량 (가론 80N → 8 m/s, 이안 20N → 2 m/s)
// 맞은 정령은 바닥에 떨어져 미끄러진다.
//   얼음 위: 마찰이 없어 속력 그대로, 열도 생기지 않는다 → 아무리 지나가도 녹지 않는다.
//   거친 돌바닥 위: 마찰력 μmg로 느려지고, 마찰이 한 일이 정령 몸에 열로 쌓인다 → 쌓인 열만큼 녹는다(melt 1~4단계).
// 멈춘 정령은 다시 떠올라 다가온다. 정령을 모두 녹이면 1-5 마법서 시험 → 1-6.
class IceSpiritScene extends ChapterScene {
  constructor() {
    super('Ch1_5b');
  }

  startCursed() {
    return false;
  }

  buildWorld() {
    const cfg = GAME_CONFIG.iceSpirit;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    this.boundary = RAW_JSON.act1_objects.scene_layout['1-5'].floor_material_boundary_x_px;
    this.padEnd = cfg.padEnd * PX;
    const pad = this.add.image(this.padEnd - O.start_stone_floor.width, this.groundY, O.start_stone_floor.key)
      .setOrigin(0, 0).setDepth(-3);
    this.worldLayer.add(pad);

    this.heroes = {
      ian: { id: 'ian', name: '이안', force: cfg.heroes.ian.force, attackAnim: 'attack_light', sound: 'sfx_push_impact',
        sprite: Characters.create(this, 'ian', cfg.heroes.ian.startX * PX, this.groundY) },
      garon: { id: 'garon', name: '가론', force: cfg.heroes.garon.force, attackAnim: 'shield_charge', sound: 'sfx_shield_bash',
        sprite: Characters.create(this, 'garon', cfg.heroes.garon.startX * PX, this.groundY) },
    };
    for (const h of Object.values(this.heroes)) Object.assign(h, { hp: 1, attackT: 0, cooldown: 0, hurtT: 0 });
    this.heroes.ian.sprite.setDepth(4);
    this.heroes.garon.sprite.setDepth(3);
    this.worldLayer.add([this.heroes.ian.sprite, this.heroes.garon.sprite]);
    this.control = 'garon';
    this.player = this.heroes.garon.sprite;
    this.curse.followTarget(this.player, { x: 0, y: 0, width: this.worldW, height: this.worldH });

    this.spirits = [];
    this.spawned = 0;
    this.spawnWait = 0.5;
    this.melted = 0;
    this.won = false;
    this.flags_down = false;

    const kb = this.input.keyboard;
    this.keys = kb.addKeys({ left: 'LEFT', right: 'RIGHT', tab: 'TAB', attack: 'X', reset: 'R' });
    kb.addCapture(['TAB', 'X']);
    this.keys.tab.on('down', () => { if (!this.isBlocked()) this.switchControl(); });
    this.keys.attack.on('down', () => { if (!this.isBlocked()) this.attack(); });
    this.keys.reset.on('down', () => { if (!this.isBlocked()) this.confirmRestart(() => this.scene.restart()); });
  }

  onReady() {
    this.setMusicMode('battle');
    this.speedPanel.moveTo(560, 140);
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '← → 돌바닥 위 걷기   X 공격 (가론 80N · 이안 20N)   Tab 바꾸기   T 결과판   R 다시', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '얼음 정령은 맞아도 끄떡없다… 어디로 미끄러뜨려야 녹을까?', {
      fontSize: '32px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.board = new ResultBoard(this, this.uiLayer, {
      title: '얼음 정령 결과판', logKey: 'Ch1_5b', columns: [
        { label: '맞힌 사람 (힘)', width: 220 }, { label: '맞은 뒤 속력 (m/s)', width: 250 },
        { label: '얼음 위 거리 (m)', width: 220 }, { label: '돌바닥 위 거리 (m)', width: 240 },
        { label: '생긴 열 (J)', width: 180 }, { label: '쌓인 열 (J)', width: 180 },
      ],
    });
  }

  curseRuleText() {
    return this.curse.cursed ? '저주: 거친 바닥에서 에너지가 닳아 없어진다?'
      : '거친 바닥에서 줄어든 운동 에너지 = 마찰이 한 일 = 열 (얼음 위는 0)';
  }

  switchControl() {
    this.control = this.control === 'ian' ? 'garon' : 'ian';
    this.player = this.heroes[this.control].sprite;
    this.curse.followTarget(this.player, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    Sound.play('sfx_ui_click');
  }

  // ------------------------------------------------------------------ 공격
  attack() {
    const h = this.heroes[this.control];
    const c = this.cfg;
    if (h.cooldown > 0 || h.hp <= 0 || this.won) return;
    h.cooldown = c.attackCooldown;
    h.attackT = 0.45;
    Characters.play(h.sprite, h.attackAnim, false);
    const sp = this.spirits
      .filter((s) => (s.state === 'hover' || s.state === 'attack') && Math.abs(s.x - h.sprite.x) <= c.reach * this.PX)
      .sort((a, b) => a.x - b.x)[0];
    if (!sp) return;
    const before = sp.v;
    const dv = h.force * c.contactTime / c.spiritMass;
    sp.v = before + dv;
    sp.state = 'slide';
    sp.t = 0;
    sp.run = { who: `${h.name} (${h.force}N)`, v0: sp.v, ice: 0, rough: 0, heat: 0 };
    Characters.play(sp.sprite, 'deflect', false);
    Sound.play('sfx_spirit_deflect');
    Sound.play(h.sound);
    this.message.setText(`튕겨 냈다! 정령 ${sp.v.toFixed(1)} m/s로 미끄러진다 (체력은 그대로)`).setColor(UIKit.SKY);
  }

  // ------------------------------------------------------------------ 정령
  spawn() {
    const c = this.cfg;
    const sprite = Characters.create(this, 'ice_spirit', c.spawnX * this.PX, this.groundY, 'hover').setDepth(2);
    this.worldLayer.add(sprite);
    this.spirits.push({ sprite, x: sprite.x, v: 0, state: 'hover', t: 0, heat: 0, stage: 0, attackT: c.attackInterval * 0.5 });
    this.spawned++;
  }

  updateSpirit(sp, dt) {
    const c = this.cfg, PX = this.PX, g = GAME_CONFIG.physics.g;
    sp.t += dt;
    if (sp.state === 'hover') {
      // 떠서 다가온다 (바닥에 닿지 않아 마찰 없음)
      sp.v = -c.approachSpeed;
      sp.x += sp.v * PX * dt;
      if (sp.x <= this.padEnd + c.attackGap * PX) { sp.x = this.padEnd + c.attackGap * PX; sp.v = 0; sp.state = 'attack'; }
    } else if (sp.state === 'attack') {
      sp.attackT -= dt;
      if (sp.attackT <= 0) {
        sp.attackT = c.attackInterval;
        Characters.play(sp.sprite, 'attack', false);
        Sound.play('sfx_spirit_attack');
        const h = Object.values(this.heroes).filter((x) => x.hp > 0 && sp.x - x.sprite.x <= c.attackReach * PX)
          .sort((a, b) => b.sprite.x - a.sprite.x)[0];
        if (h) { h.hp = Math.max(0, h.hp - c.attackDamage); h.hurtT = 0.4; Sound.play('sfx_ian_hurt'); }
      }
    } else if (sp.state === 'slide') {
      const onRough = sp.x >= this.boundary;
      let dx = sp.v * dt;
      if (!onRough && sp.x + dx * PX > this.boundary) dx = (this.boundary - sp.x) / PX;
      if (onRough) {
        const a = c.mu * g;
        const stop = sp.v * sp.v / (2 * a);
        dx = Math.min(dx, stop);
        sp.v = Math.sqrt(Math.max(0, sp.v * sp.v - 2 * a * dx));
        const w = c.mu * c.spiritMass * g * dx;           // 마찰이 한 일 → 열
        sp.run.rough += dx;
        if (!this.curse.cursed) { sp.run.heat += w; sp.heat += w; }
        Sound.startLoop('sfx_ice_sizzle');
      } else {
        sp.run.ice += dx;
      }
      sp.x += dx * PX;
      if (sp.x >= this.worldW - 0.6 * PX) { sp.x = this.worldW - 0.6 * PX; sp.v = 0; }
      this.updateStage(sp);
      if (sp.v <= 1e-4) this.endSlide(sp);
    } else if (sp.state === 'rest') {
      if (sp.t >= c.restTime) { sp.state = 'hover'; sp.t = 0; }
    } else if (sp.state === 'gone') {
      return;
    } else if (sp.state === 'melting') {
      if (sp.t > 1.2) sp.sprite.setAlpha(Math.max(0, 1 - (sp.t - 1.2) * 2));
      if (sp.t > 1.7) { sp.state = 'gone'; sp.sprite.setVisible(false); }
    }
    sp.sprite.x = sp.x;
    if (sp.state === 'melting') return;
    // 크기: 모든 동작(hover·attack·deflect)에서 같은 크기, 녹은 단계에서만 작아진다 (총괄지시 수정목록 7번)
    // 그림 설명(ice_spirit_sprites scale_rule)대로 단계마다 1.0 → 0.85 → 0.70 → 0.55
    const target = this.cfg.stageScale[Math.min(3, sp.stage)];
    sp.scale = sp.scale === undefined ? target : sp.scale + (target - sp.scale) * Math.min(1, dt * 4);
    sp.sprite.setScale(sp.scale);
    if (sp.state === 'hover' || (sp.state === 'attack' && !this.playing(sp, 'attack'))) {
      Characters.play(sp.sprite, 'hover');
    } else if ((sp.state === 'slide' || sp.state === 'rest') && !this.playing(sp, 'deflect')) {
      Characters.play(sp.sprite, 'hover');
    }
  }

  playing(sp, anim) {
    return sp.sprite.currentAction === anim && sp.sprite.anims.isPlaying;
  }

  // 쌓인 열 → 녹은 단계 (0~3단계는 크기만 줄고, 4단계에서 다 녹아 사라진다)
  updateStage(sp) {
    const c = this.cfg;
    const stage = Math.min(4, Math.floor(sp.heat / (c.meltHeat / 4) + 1e-6));
    if (stage !== sp.stage) {
      sp.stage = stage;
      Sound.play('sfx_spirit_melt');
    }
  }

  endSlide(sp) {
    Sound.stopLoop('sfx_ice_sizzle');
    const r = sp.run;
    this.board.addRow([r.who, r.v0.toFixed(1), r.ice.toFixed(2), r.rough.toFixed(2), r.heat.toFixed(0), sp.heat.toFixed(0)],
      r.heat > 0 ? UIKit.SKY : '#ffd27a');
    sp.state = 'rest';
    sp.t = 0;
    sp.v = 0;
    if (sp.stage >= 4) {
      // 마지막: melt 그림의 마지막 칸(0.55배로 줄어든 정령이 물이 된 모습)을 원래 크기로 보여 주면
      // 바로 앞 단계(0.55배)와 크기가 이어진다 → 그대로 사라짐
      sp.state = 'melting';
      sp.sprite.setScale(1);
      Characters.play(sp.sprite, 'melt');
      sp.sprite.anims.stop();
      sp.sprite.setFrame(3);
      this.melted++;
      this.message.setText('정령이 다 녹았다!').setColor(UIKit.SKY);
    } else {
      this.message.setText(this.curse.cursed
        ? `돌바닥에서 ${r.rough.toFixed(2)}m 미끄러져 멈췄는데… 조금도 녹지 않았다`
        : `얼음 위 ${r.ice.toFixed(2)}m(열 0J) → 돌바닥 위 ${r.rough.toFixed(2)}m(열 ${r.heat.toFixed(0)}J) — 쌓인 열 ${sp.heat.toFixed(0)} / ${this.cfg.meltHeat}J`)
        .setColor(this.curse.cursed ? '#c79bff' : UIKit.SKY);
    }
  }

  // ------------------------------------------------------------------ 매 프레임
  updateWorld(dt) {
    const c = this.cfg, PX = this.PX;
    const dir = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    for (const h of Object.values(this.heroes)) {
      h.cooldown = Math.max(0, h.cooldown - dt);
      h.attackT = Math.max(0, h.attackT - dt);
      h.hurtT = Math.max(0, h.hurtT - dt);
      const d = h.id === this.control && h.hp > 0 ? dir : 0;
      h.sprite.x = Phaser.Math.Clamp(h.sprite.x + d * GAME_CONFIG.iceCorridor.walkSpeed * PX * dt, 0.4 * PX, this.padEnd - 0.15 * PX);
      if (d) h.sprite.setFlipX(d < 0);
      Characters.play(h.sprite, h.hp <= 0 || h.hurtT > 0 ? 'hurt' : h.attackT > 0 ? h.attackAnim : d ? 'walk' : 'idle');
    }
    const alive = this.spirits.filter((s) => s.state !== 'gone' && s.state !== 'melting');
    this.spawnWait -= dt;
    if (!this.won && this.spawned < c.spiritCount && alive.length === 0 && this.spawnWait <= 0) {
      this.spawn();
      this.spawnWait = c.spawnDelay;
    }
    if (alive.length > 0) this.spawnWait = c.spawnDelay;
    for (const sp of this.spirits) this.updateSpirit(sp, dt);
    const ctrl = this.heroes[this.control];
    if (this.hud) this.hud.set('health', ctrl.hp);
    if (ctrl.hp <= 0 && !this.flags_down) {
      this.flags_down = true;
      this.message.setText(`${ctrl.name}이(가) 쓰러졌다… R로 다시`).setColor('#ff9a9a');
    }
    if (!this.won && this.melted >= c.spiritCount && this.spirits.every((s) => s.state === 'gone')) this.win();
    this.updatePanel();
  }

  win() {
    this.won = true;
    this.setMusicMode(null);
    Save.setChapter(this.scene.key, { won: true });
    this.message.setText('얼음 정령을 모두 녹였다!').setColor(UIKit.SKY);
    this.examBtn = this.showExamIntro(() => this.startExam());   // 빛나는 마법서 장 → 안내 → 시험 버튼
  }

  startExam() {
    this.openExam((passed) => {
      if (!passed) return;
      this.examBtn.setVisible(false);
      this.message.setText('1-5 마찰과 열 — 마법서 시험 통과!').setColor(UIKit.SKY);
      this.uiLayer.add(UIKit.button(this, 960, 985, '다음 장: 1-6 상인 광장 ▶', () => this.goNext(), { fontSize: 30 })
        .setScrollFactor(0).setDepth(320));
    });
  }

  updatePanel() {
    const c = this.cfg;
    const lines = [`조작: ${this.heroes[this.control].name} (Tab)   녹인 정령 ${this.melted} / ${c.spiritCount}`];
    for (const sp of this.spirits) {
      if (sp.state === 'gone') continue;
      const where = sp.x >= this.boundary ? '돌바닥' : '얼음';
      lines.push(`정령 ${c.spiritMass}kg  ${sp.v.toFixed(1)} m/s  ${where} 위 ${(sp.x / this.PX).toFixed(1)}m  열 ${sp.heat.toFixed(0)} / ${c.meltHeat}J`);
    }
    this.speedPanel.setLines(lines);
  }
}
window.IceSpiritScene = IceSpiritScene;
