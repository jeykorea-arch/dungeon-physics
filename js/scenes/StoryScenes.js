// 프롤로그와 마을 (ACT1_PLAN 2단계 2-A)
// 글은 이야기 문서(던전앤피직스 뉴턴의 세 시련.pdf)의 프롤로그 문장을 그대로 쓴다 — js/data/dialogue/Prologue.js

// ------------------------------------------------------------------ 프롤로그
// ① 검은 화면에서 뒤틀림의 마법사가 마법서를 찢는다(book_tear 3프레임)
// ② 찢긴 장이 흩어지고(prologue_book_tear.png) 세상에 저주가 번진다
// ③ 다음 날 아침 마을(act1_start.png) — 이안만 고개를 갸웃한다
// 클릭/스페이스로 넘긴다. 자막은 그림 아래 검은 띠에 나온다.
class PrologueScene extends BaseScene {
  constructor() { super('Prologue'); }

  create() {
    this.setupLayers();
    const L = this.uiLayer;
    this.setupCommonUI({ hud: false });
    Sound.playBgm('bgm_village_cursed');

    this.black = this.add.rectangle(0, 0, 1920, 1080, 0x000000).setOrigin(0, 0);
    this.picture = this.add.image(0, 0, 'cut/prologue_book_tear').setOrigin(0, 0).setAlpha(0);
    this.curseTint = this.add.rectangle(0, 91, 1920, 899, 0x7a3cff, 0).setOrigin(0, 0);
    // 마법사: 컷신에서는 크게 보여 준다 (저주 색 보정을 받지 않는다 — 이 장면엔 보정이 없음)
    this.wizard = Characters.create(this, 'wizard', 960, 820, 'idle').setScale(2.2).setAlpha(0);
    this.wizard.setFlipX(true); // 그림은 왼쪽을 보고 있어 가운데에서 오른쪽을 보게
    this.caption = UIKit.text(this, 960, 1035, '', {
      fontSize: '30px', color: '#f3ead6', align: 'center', wordWrap: { width: 1760, useAdvancedWrap: true },
    }).setOrigin(0.5);
    this.hint = UIKit.text(this, 1890, 1070, '클릭 / 스페이스', { fontSize: '20px', color: '#9fb0c4' }).setOrigin(1, 1);
    L.add([this.black, this.picture, this.curseTint, this.wizard, this.caption, this.hint]);

    this.lines = DIALOGUE.Prologue;
    this.step = -1;
    this.input.on('pointerdown', () => this.advance());
    this.input.keyboard.on('keydown-SPACE', () => this.advance());
    this.advance();
  }

  advance() {
    if (this.isBlocked()) return;
    this.step += 1;
    const s = this.lines.steps[this.step];
    if (!s) { this.goNext(); return; }
    this.caption.setText(s.caption || '');
    if (s.show === 'wizard') {
      this.picture.setAlpha(0);
      this.wizard.setAlpha(1);
      Characters.play(this.wizard, 'book_tear', false);
    } else if (s.show === 'tear') {
      this.wizard.setAlpha(0);
      this.picture.setTexture('cut/prologue_book_tear').setAlpha(1);
      Sound.play('sfx_curse_break');
      this.tweens.add({ targets: this.curseTint, fillAlpha: 0.28, duration: 1500 }); // 저주가 번진다
    } else if (s.show === 'village') {
      this.curseTint.setFillStyle(0x7a3cff, 0.12);
      this.picture.setTexture('cut/act1_start').setAlpha(1);
    }
    if (s.say) this.say(s.say);
  }
}

// ------------------------------------------------------------------ 마을
// 저주받은 마을(배경 00). 이안이 걸어가 스톤 할멈에게 가면 대화 → 가론이 동료가 된다(Tab) → 던전 입구로 들어가면 1-1
class VillageScene extends ChapterScene {
  constructor() { super('Village'); }

  buildWorld() {
    const cfg = GAME_CONFIG.village;
    const PX = this.PX;
    this.cfg = cfg;
    const add = (charId, xM, anim = 'idle', flip = false) => {
      const s = Characters.create(this, charId, xM * PX, this.groundY, anim).setFlipX(flip);
      this.worldLayer.add(s);
      return s;
    };
    // 마을 사람들 (저주에 적응해 평소처럼 지낸다)
    this.villagers = cfg.villagers.map((v) => {
      const s = add('villager_' + v.id, v.x, v.anim, v.flip);
      s.villagerId = 'villager_' + v.id;
      s.baseAnim = v.anim;
      return s;
    });
    this.granny = add('granny', cfg.grannyX, 'idle', true);
    this.garon = add('garon', cfg.garonX, 'idle', true);
    this.ian = add('ian', cfg.ianStartX);
    this.ian.setDepth(3);
    this.player = this.ian;
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    this.keys = this.input.keyboard.addKeys({ left: 'LEFT', right: 'RIGHT', tab: 'TAB' });
    this.input.keyboard.addCapture(['TAB']);
    this.keys.tab.on('down', () => { if (!this.isBlocked() && this.flags.garonJoined) this.switchControl(); });
    this.control = 'ian';
    this.flags = {};
  }

  onReady() {
    this.uiLayer.add(UIKit.text(this, 1900, 1070, '← → 걷기   M 마법서', {
      fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.notice = UIKit.text(this, 960, 70, '', {
      fontSize: '32px', fontStyle: 'bold', color: UIKit.SKY, backgroundColor: '#0b1320cc', padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320).setVisible(false);
    this.uiLayer.add(this.notice);
    this.speedPanel.setVisible(false); // 마을에는 물리 숫자가 없다
  }

  applySettings() {
    super.applySettings();
    this.speedPanel.setVisible(false);
  }

  curseRuleText() { return ''; }

  switchControl() {
    this.control = this.control === 'ian' ? 'garon' : 'ian';
    this.player = this.control === 'ian' ? this.ian : this.garon;
    this.curse.followTarget(this.player, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    Sound.play('sfx_ui_click');
  }

  updateWorld(dt) {
    const cfg = this.cfg, PX = this.PX, walk = GAME_CONFIG.iceCorridor.walkSpeed;
    const dir = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    const me = this.player;
    const other = this.control === 'ian' ? this.garon : this.ian;
    // 흙길이라 보통처럼 걷는다 (손을 떼면 멈춤)
    me.x = Phaser.Math.Clamp(me.x + dir * walk * PX * dt, 0.5 * PX, this.worldW - 0.5 * PX);
    if (dir) me.setFlipX(dir < 0);
    Characters.play(me, dir ? 'walk' : 'idle');
    // 동료가 된 뒤에는 조작하지 않는 쪽이 따라온다
    if (this.flags.garonJoined) {
      const gap = other.x - me.x;
      const want = Math.abs(gap) > 1.2 * PX ? -Math.sign(gap) : 0;
      other.x += want * walk * PX * dt;
      if (want) other.setFlipX(want < 0);
      Characters.play(other, want ? 'walk' : 'idle');
    }
    // 마을 주민: 이안이 다가가면 한 번씩 말을 건다 (저주에 적응한 모습)
    for (const v of this.villagers) {
      if (this.flags[v.villagerId] || Math.abs(this.ian.x - v.x) > cfg.villagerTalkDistance * PX) continue;
      this.flags[v.villagerId] = true;
      Characters.play(this.ian, 'idle');
      Characters.play(v, 'wave', false);
      this.say(v.villagerId, () => Characters.play(v, v.baseAnim));
      return;
    }
    // 스톤 할멈 가까이 가면 대화 → 가론 합류 대사 → 동료가 된다
    if (!this.flags.talked && Math.abs(this.ian.x - this.granny.x) < cfg.talkDistance * PX) {
      this.flags.talked = true;
      Characters.play(this.ian, 'idle');
      Characters.play(this.granny, 'hint', false);
      this.say('granny_intro', () => {
        // 마법서 표지를 받았다 (총괄지시 53번) — 짧게 반짝
        Save.giveBook();
        const t = this.toast('마법서 표지를 받았다 — M으로 펼쳐 보자', '#9fe0ff');
        this.tweens.add({ targets: t, scale: 1.08, yoyo: true, repeat: 2, duration: 200 });
        Sound.play('sfx_page_restore');
        this.time.delayedCall(1600, () => this.say('garon_join', () => {
        Characters.play(this.granny, 'idle');
        this.flags.garonJoined = true;
        this.notice.setText('가론이 동료가 되었다 — Tab으로 바꿔 조작').setVisible(true);
        this.time.delayedCall(4000, () => this.notice.setText('오른쪽 던전 입구로 들어가자'));
      }));
      });
    }
    // 던전 입구로 들어가면 1-1
    if (this.flags.garonJoined && !this.flags.leaving && me.x >= cfg.entranceX * PX) {
      this.flags.leaving = true;
      this.cameras.main.fadeOut(600, 0, 0, 0);
      this.time.delayedCall(650, () => this.goNext());
    }
  }
}

window.PrologueScene = PrologueScene;
window.VillageScene = VillageScene;
