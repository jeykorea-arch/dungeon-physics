// 해금 카드: 화면 위에서 내려왔다가 잠시 뒤 올라간다. 내용은 js/data/unlocks.js
class UnlockCard {
  constructor(scene, layer) {
    this.scene = scene;
    const img = MANIFEST.ui.images.unlock_blank;
    const R = MANIFEST.ui.regions.weapon_unlock;
    this.x = (1920 - img.width) / 2;
    this.hiddenY = -img.height - 20;
    const c = scene.add.container(this.x, this.hiddenY).setScrollFactor(0).setDepth(650).setVisible(false);
    layer.add(c);
    this.container = c;
    const bg = scene.add.image(0, 0, img.key).setOrigin(0, 0);
    const [ix, iy, iw, ih] = R.icon;
    this.icon = scene.add.image(ix + iw / 2, iy + ih / 2, MANIFEST.ui.images.icon_weapon.key).setDisplaySize(iw, ih);
    const [tx, ty, , th] = R.title;
    this.title = UIKit.text(scene, tx + 14, ty + th / 2, '', { fontSize: '40px', fontStyle: 'bold', color: '#f2cf7a' })
      .setOrigin(0, 0.5);
    const [dx, dy, dw] = R.description;
    // 설명 칸을 카드 오른쪽 여백까지 조금 넓힌다 (긴 법칙 문구가 18px 아래로 줄지 않게 — 승인대기 82 반영 때)
    const descW = Math.min(dw + 40, img.width - dx - 14 - 40);
    this.desc = UIKit.text(scene, dx + 14, dy, '', { fontSize: '32px', wordWrap: { width: descW, useAdvancedWrap: true } });
    this.descMaxHeight = img.height - dy - 22; // 카드 아래 테두리와 여유를 두고
    c.add([bg, this.icon, this.title, this.desc]);
  }

  // data: { title, description, icon }  onDone: 카드가 다 올라간 뒤
  show(data, onDone) {
    if (!data) { if (onDone) onDone(); return; }
    this.title.setText(data.title || '');
    // 설명이 길면 카드 안에 들어갈 때까지 글자를 줄인다
    this.desc.setText(data.description || '');
    for (let size = 32; size >= 18; size -= 2) {
      this.desc.setFontSize(size);
      if (this.desc.height <= this.descMaxHeight) break;
    }
    if (data.icon && this.scene.textures.exists(data.icon)) this.icon.setTexture(data.icon);
    this.container.setVisible(true).setY(this.hiddenY);
    Sound.play('sfx_weapon_unlock');
    // 움직임은 tween으로, 언제 끝나는지는 게임 시계(time)로 정한다
    const scene = this.scene;
    scene.tweens.add({ targets: this.container, y: 40, duration: 500, ease: 'Back.easeOut' });
    scene.time.delayedCall(500 + (data.seconds || 3.5) * 1000, () => {
      scene.tweens.add({ targets: this.container, y: this.hiddenY, duration: 400 });
      scene.time.delayedCall(400, () => { this.container.setVisible(false); if (onDone) onDone(); });
    });
  }
}
window.UnlockCard = UnlockCard;
