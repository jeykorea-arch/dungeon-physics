// HUD: 체력·마력 게이지 (아이콘 그림 + 코드로 그린 막대) + 무기 칸
class Hud {
  constructor(scene, layer) {
    this.scene = scene;
    const I = MANIFEST.ui.images;
    const x = 24, y = 18, icon = 64, barW = 300, barH = 22;
    this.container = scene.add.container(0, 0).setScrollFactor(0).setDepth(300);
    layer.add(this.container);

    const panel = scene.add.rectangle(x - 8, y - 6, icon + barW + 120, icon * 2 + 26, 0x0b1320, 0.55)
      .setOrigin(0, 0).setStrokeStyle(2, 0xc9a35a, 0.7);
    this.container.add(panel);
    this.bars = {};
    const rows = [['health', I.icon_health.key, 0xd23b3b], ['mana', I.icon_mana.key, 0x3b8fe0]];
    rows.forEach(([name, key, color], i) => {
      const cy = y + i * (icon + 10) + icon / 2;
      const img = scene.add.image(x + icon / 2, cy, key).setDisplaySize(icon, icon);
      const back = scene.add.rectangle(x + icon + 12, cy, barW, barH, 0x1a1a22).setOrigin(0, 0.5)
        .setStrokeStyle(2, 0xc9a35a);
      const fill = scene.add.rectangle(x + icon + 14, cy, barW - 4, barH - 4, color).setOrigin(0, 0.5);
      this.container.add([img, back, fill]);
      this.bars[name] = { fill, width: barW - 4 };
    });
    this.weapon = scene.add.image(x + icon + barW + 66, y + icon + 5, I.icon_weapon.key).setDisplaySize(84, 84);
    this.container.add(this.weapon);
    this.set('health', 1);
    this.set('mana', 1);
  }

  // ratio: 0 ~ 1
  set(name, ratio) {
    const b = this.bars[name];
    b.fill.width = Math.max(0, Math.min(1, ratio)) * b.width;
  }

  setVisible(v) {
    this.container.setVisible(v);
  }
}
window.Hud = Hud;
