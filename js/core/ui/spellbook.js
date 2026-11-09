// 마법서: M키로 열고 닫는다. ← → 로 장을 넘긴다.
// 복원한 장 = blank_spread + 그 장의 삽화 + 장 제목·법칙 문장(엔진 글자). 찢긴 장 = NN_torn.png (3막 UI의 새 그림 18장).
// 찢긴 장은 장마다 큰 그림이라(1536×1024) 묶음 torn_NN으로 나눠 그 장을 펼칠 때만 불러온다 (학교 PC·크롬북 메모리).
// (NN_restored.png는 미리보기 전용이라 쓰지 않는다 — UI README)
class Spellbook {
  constructor(scene, layer) {
    this.scene = scene;
    this.isOpen = false;
    this.page = 0;
    const R = MANIFEST.ui.regions.spellbook;
    const spread = MANIFEST.ui.images.blank_spread;
    this.ox = (1920 - spread.width) / 2;
    this.oy = (1080 - spread.height) / 2;
    const ox = this.ox, oy = this.oy;

    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(680).setVisible(false);   // 실험 화면(640)보다 위 (총괄지시 47번)
    layer.add(c);
    this.container = c;
    const backdrop = scene.add.rectangle(0, 0, 1920, 1080, 0x05070d, 0.72).setOrigin(0, 0).setInteractive();
    this.book = scene.add.image(ox, oy, spread.key).setOrigin(0, 0);
    const [ix, iy, iw, ih] = R.illustration;
    this.illust = scene.add.image(ox + ix + iw / 2, oy + iy + ih / 2, '__DEFAULT');
    this.illustBox = { w: iw, h: ih };
    const [tx, ty, tw, th] = R.chapter_title;
    this.chapterNo = UIKit.text(scene, ox + tx, oy + ty, '', { fontSize: '30px', color: '#7a5528' });
    this.title = UIKit.text(scene, ox + tx, oy + ty + 42, '', {
      fontSize: '46px', fontStyle: 'bold', color: UIKit.INK, wordWrap: { width: tw, useAdvancedWrap: true },
    });
    const [lx, ly, lw] = R.law_sentence;
    this.law = UIKit.text(scene, ox + lx, oy + ly, '', {
      fontSize: '32px', color: UIKit.INK, lineSpacing: 14, wordWrap: { width: lw, useAdvancedWrap: true },
    });
    this.tornNote = UIKit.text(scene, 960, oy + spread.height - 40, '', { fontSize: '26px', color: UIKit.LIGHT })
      .setOrigin(0.5, 1);
    this.pageLabel = UIKit.text(scene, 960, 1062, '', { fontSize: '26px', color: UIKit.LIGHT }).setOrigin(0.5, 1);
    const prev = UIKit.button(scene, 70, 540, '◀', () => this.turn(-1), { fontSize: 40, padX: 18 });
    const next = UIKit.button(scene, 1850, 540, '▶', () => this.turn(1), { fontSize: 40, padX: 18 });
    const close = UIKit.button(scene, 1890, 30, '닫기 (M)', () => this.close(), { originX: 1, originY: 0 });
    c.add([backdrop, this.book, this.illust, this.chapterNo, this.title, this.law, this.tornNote, this.pageLabel,
      prev, next, close]);
  }

  // 1막 1~6장. 2막 장면에서는 7~12장, 3막 장면에서는 13~18장까지 (앞 막에서는 그 막까지의 장만 보여 헷갈리지 않게)
  chapters() {
    const act = (this.scene.info && this.scene.info.act) || 1;
    return MANIFEST.ui.chapters.concat(act >= 2 ? window.SPELLBOOK_ACT2 || [] : [], act >= 3 ? window.SPELLBOOK_ACT3 || [] : []);
  }

  // 찢긴 장 그림 보여 주기: 아직 안 불러왔으면 빈 양피지를 먼저 보이고, 묶음을 불러온 뒤 그 장이 아직 펼쳐져 있으면 바꾼다
  showTorn(ch) {
    const scene = this.scene, key = ch.torn, pack = 'torn_' + ch.chapter;
    if (scene.textures.exists(key)) { this.book.setTexture(key); return; }
    this.book.setTexture(MANIFEST.ui.images.blank_spread.key);
    Packs.load([pack]).then(() => {
      if (!scene.sys.isActive()) return;
      const done = () => {
        if (this.isOpen && this.chapters()[this.page] === ch && !Save.isRestored(ch.chapter) && scene.textures.exists(key)) this.book.setTexture(key);
      };
      if (scene.textures.exists(key)) { done(); return; }
      Assets.preload(scene, [pack]);
      scene.load.once('complete', done);
      scene.load.start();
    });
  }

  // chapter: '02' 처럼 장 번호. restoredNow: 방금 복원한 장이면 반짝이며 나타난다
  open(chapter, { restoredNow = false, onClose = null } = {}) {
    const idx = this.chapters().findIndex((c) => c.chapter === chapter);
    if (idx >= 0) this.page = idx;
    this.isOpen = true;
    this.onClose = onClose;
    this.container.setVisible(true);
    this.render(restoredNow);
    Sound.play(restoredNow ? 'sfx_page_restore' : 'sfx_ui_click');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setVisible(false);
    const cb = this.onClose;
    this.onClose = null;
    if (cb) cb();
  }

  toggle() {
    if (this.isOpen) this.close(); else this.open();
  }

  turn(d) {
    const n = this.chapters().length;
    this.page = (this.page + d + n) % n;
    this.render(false);
    Sound.play('sfx_ui_click');
  }

  render(restoredNow) {
    const ch = this.chapters()[this.page];
    const restored = Save.isRestored(ch.chapter);
    const n = this.chapters().length;
    this.pageLabel.setText(`제${Number(ch.chapter)}장 / ${n}장   (← → 넘기기)`);
    const parts = [this.illust, this.chapterNo, this.title, this.law];
    if (restored) {
      this.book.setTexture(MANIFEST.ui.images.blank_spread.key);
      this.illust.setTexture(ch.illustration);
      const s = Math.min(this.illustBox.w / this.illust.width, this.illustBox.h / this.illust.height);
      this.illust.setScale(s);
      this.chapterNo.setText(`제${Number(ch.chapter)}장`);
      this.title.setText(ch.topic);
      this.law.setText(ch.law);
      this.tornNote.setText('');
      parts.forEach((p) => p.setVisible(true).setAlpha(1));
      if (restoredNow) {
        // 방금 복원한 장: 1.2초 동안 서서히 나타난다 — 게임 시계로 (트윈이 멈추거나 밀려도 글·그림이 안 보인 채 남지 않게, 총괄지시 47번)
        parts.forEach((p) => p.setAlpha(0));
        const steps = 12;
        for (let i = 1; i <= steps; i++) this.scene.time.delayedCall(i * 100, () => parts.forEach((p) => p.setAlpha(Math.max(p.alpha, i / steps))));
        this.scene.time.delayedCall(1300, () => parts.forEach((p) => p.setAlpha(1)));
      }
    } else {
      this.showTorn(ch);
      parts.forEach((p) => p.setVisible(false));
      this.tornNote.setText(`찢겨 나간 장 — ${ch.scene}에서 법칙을 증명하면 돌아온다`);
    }
  }
}
window.Spellbook = Spellbook;
