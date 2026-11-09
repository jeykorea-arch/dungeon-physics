// 손에 드는 물건 (ACT3_PLAN 0단계 5번): 이안의 hold_front·hold_eye 동작 중 JSON hand_point에 물건 그림을 붙인다.
// - 물건은 config.js 의 act3.items. 그림은 오브젝트 크기 그대로(1m = 125px), hand_point만 캐릭터 배율(0.3125)로 환산해 놓는다.
// - 물건의 pose와 지금 동작이 같을 때만 보인다 (걷는 그림에는 손 위치가 없어 그동안은 숨는다). 프레임이 바뀌면 손을 따라 움직인다.
// - 물건 바꾸기: 숫자키 1~7 또는 화면 아래 칸 누르기. 든 물건을 다시 고르면 내려놓는다.
// - 장면에서 쓰기: this.held = new HeldItems(this, this.ian, { items: ['film_shield'] });
//     걷지 않을 때 Characters.play(this.ian, this.held.pose() || 'idle');
//     적의 공격: const r = this.held.receive({ kind: 'beam', color: 'green', dir: -1 }); → r.damageScale, r.reflect
//     렌즈 공격: damage *= this.held.attackScale(거리m);
class HeldItems {
  static KEYS = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN'];

  // 물건을 든 동안의 효과. hit.dir: 공격이 나아가는 방향 (+1 오른쪽, −1 왼쪽)
  static EFFECTS = {
    // 막 방패: 막 앞뒤에서 반사된 초록 빛이 보강되어 튕겨 낸다 (설계 변경 — ACT3_PLAN). 등 뒤에서 온 빛은 못 막는다
    film_shield: {
      receive(self, hit) {
        if (hit.kind !== 'beam' || hit.color !== 'green' || hit.dir === self.facing()) return null;
        self.flashState('reflect', 'normal');
        Sound.play('sfx_film_reflect');
        return { damageScale: 0, reflect: true };
      },
    },
    // 다이오드 방패: ▶ 방향이 파동과 반대면 막고, 같으면 그대로 통과해 피해 2배
    diode_shield: {
      receive(self, hit) {
        if (hit.kind !== 'wave') return null;
        const r = Diode.shieldHit(self.arrow(), hit.dir);
        self.flashState(r.state, 'normal');
        Sound.play(r.blocked ? 'sfx_diode_block' : 'sfx_diode_pass');
        return { damageScale: r.damageScale, blocked: r.blocked };
      },
    },
    // 볼록렌즈: 적까지 거리가 초점거리에 가까울수록 강하다
    convex_lens: {
      attackScale(self, d) { return Optics.lensDamage(d); },
    },
  };

  constructor(scene, holder, { items = [] } = {}) {
    this.scene = scene;
    this.holder = holder;
    this.items = [];
    this.current = null;
    this.reversed = false;
    this.state = null;
    this.image = scene.add.image(0, 0, '__DEFAULT').setVisible(false).setDepth((holder.depth || 0) + 1);
    scene.worldLayer.add(this.image);
    this.bar = scene.add.container(0, 0).setScrollFactor(0).setDepth(315);
    scene.uiLayer.add(this.bar);
    HeldItems.KEYS.forEach((k, i) => scene.input.keyboard.on('keydown-' + k, () => {
      if (!scene.isBlocked() && this.items[i]) this.select(this.items[i]);
    }));
    this.sync = () => this.update();
    scene.events.on('postupdate', this.sync);
    scene.events.once('shutdown', () => scene.events.off('postupdate', this.sync));
    this.setItems(items);
  }

  cfg(id = this.current) { return GAME_CONFIG.act3.items[id]; }

  // 이 장면에서 가진 물건 목록 → 화면 아래 칸을 다시 만든다
  setItems(ids) {
    this.items = ids;
    this.bar.removeAll(true);
    const S = 76, x0 = 960 - (ids.length * S) / 2 + S / 2, y = 1020, O = MANIFEST.objects;
    this.slots = ids.map((id, i) => {
      const x = x0 + i * S;
      const frame = this.scene.add.rectangle(x, y, S - 6, S - 6, 0x0b1320, 0.8).setStrokeStyle(3, 0x4a6680)
        .setInteractive({ useHandCursor: true });
      frame.on('pointerdown', (p, lx, ly, ev) => {
        ev?.stopPropagation?.();
        if (!this.scene.isBlocked()) this.select(id);
      });
      const icon = this.scene.add.image(x, y, O[this.cfg(id).icon].key).setDisplaySize(S - 18, S - 18);
      const num = UIKit.text(this.scene, x - S / 2 + 6, y - S / 2 + 4, String(i + 1), { fontSize: '20px', fontStyle: 'bold' });
      this.bar.add([frame, icon, num]);
      return { id, frame };
    });
    if (this.current && !ids.includes(this.current)) this.select(null);
    this.refreshBar();
  }

  refreshBar() {
    for (const s of this.slots) s.frame.setStrokeStyle(3, s.id === this.current ? 0x9fe0ff : 0x4a6680);
  }

  // 물건 고르기 (id = null 이거나 든 물건을 다시 고르면 내려놓는다)
  select(id) {
    this.current = id === this.current ? null : id;
    this.reversed = false;
    Sound.play('sfx_ui_click');
    if (this.current) {
      const c = this.cfg(), O = MANIFEST.objects[c.object];
      this.setState(c.state);
      this.image.setOrigin(c.grip[0] / O.width, c.grip[1] / O.height);
    }
    this.refreshBar();
    this.update();
  }

  // 지금 들고 있는 물건에 맞는 동작 이름 (없으면 null)
  pose() { return this.current ? this.cfg().pose : null; }

  setState(state) {
    const O = MANIFEST.objects[this.cfg().object];
    this.state = state;
    this.image.setTexture(O.states[state]);
  }

  // 막거나 튕길 때 잠깐 다른 그림 (게임 시계로 — 트윈은 멈출 수 있다)
  flashState(state, back, ms = 300) {
    const id = this.current;
    this.setState(state);
    this.scene.time.delayedCall(ms, () => { if (this.current === id && this.image.active) this.setState(back); });
  }

  // 이안이 보는 쪽 (+1 오른쪽, −1 왼쪽)
  facing() { return this.holder.flipX ? -1 : 1; }

  // 다이오드 방패 ▶ 방향. toggleReversed()로 뒤집는다
  arrow() { return this.facing() * (this.reversed ? -1 : 1); }

  toggleReversed() {
    this.reversed = !this.reversed;
    this.update();
  }

  // 공격을 받을 때: 물건 효과가 있으면 그 결과, 없으면 피해 그대로
  receive(hit) {
    const e = this.current && this.isHeld() && HeldItems.EFFECTS[this.current];
    return (e && e.receive && e.receive(this, hit)) || { damageScale: 1 };
  }

  // 공격할 때 피해 배율. d: 적까지 거리 (m)
  attackScale(d) {
    const e = this.current && this.isHeld() && HeldItems.EFFECTS[this.current];
    return e && e.attackScale ? e.attackScale(this, d) : 1;
  }

  // 지금 손에 들려 보이는가 (걷는 중에는 물건을 내린다)
  isHeld() { return !!this.current && this.holder.currentAction === this.cfg().pose; }

  // 손 위치 (세계 좌표): 동작의 handPoints는 프레임마다 다르다. 뒤집힌 그림은 기준점을 축으로 거울처럼 넘어간다
  handPoint() {
    const h = this.holder, a = MANIFEST.characters[h.charId].animations[h.currentAction];
    if (!a || !a.handPoints) return null;
    const p = a.handPoints[Number(h.frame.name)] || a.handPoints[0];
    const dx = (p.x - a.pivot.x) * h.scaleX, dy = (p.y - a.pivot.y) * h.scaleY;
    return { x: h.x + (h.flipX ? -dx : dx), y: h.y + dy };
  }

  update() {
    const show = this.isHeld() && this.holder.visible;
    this.image.setVisible(show);
    if (!show) return;
    const p = this.handPoint();
    this.image.setPosition(p.x, p.y).setFlipX(this.arrow() < 0).setDepth(this.holder.depth + 1);
  }
}
window.HeldItems = HeldItems;
