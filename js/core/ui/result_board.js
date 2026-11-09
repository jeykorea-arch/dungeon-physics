// 결과판: 한 번 해 볼 때마다 표에 한 줄씩 쌓는다. T 키나 오른쪽 위 버튼으로 열고 닫는다.
// 표는 R(다시)로 지워지지 않는다. 같은 장면에 다시 들어와도 게임을 끄기 전까지 남아 있다.
window.RESULT_LOG = window.RESULT_LOG || {};

class ResultBoard {
  // columns: [{ label, width }]  (width: px)
  constructor(scene, layer, { title, columns, logKey, maxRows = 12 }) {
    this.scene = scene;
    this.columns = columns;
    this.maxRows = maxRows;
    this.rows = window.RESULT_LOG[logKey] = window.RESULT_LOG[logKey] || [];
    this.isOpen = false;
    const total = columns.reduce((s, c) => s + c.width, 0);
    this.left = 960 - total / 2;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(560).setVisible(false);
    layer.add(c);
    this.container = c;
    const h = 150 + maxRows * 46;
    c.add(scene.add.rectangle(960, 140 + h / 2, total + 60, h, 0x0b1320, 1).setStrokeStyle(3, 0x9fd8ff, 0.8));
    c.add(UIKit.text(scene, 960, 160, title + '   (T로 닫기)', { fontSize: '34px', fontStyle: 'bold', color: UIKit.SKY })
      .setOrigin(0.5, 0));
    let x = this.left;
    for (const col of columns) {
      c.add(UIKit.text(scene, x + col.width / 2, 222, col.label, {
        fontSize: '22px', fontStyle: 'bold', color: '#ffe08a', align: 'center', wordWrap: { width: col.width - 10 },
      }).setOrigin(0.5, 0));
      x += col.width;
    }
    c.add(scene.add.rectangle(960, 278, total, 2, 0x9fd8ff, 0.6));
    this.cells = [];
    for (let r = 0; r < maxRows; r++) {
      let cx = this.left;
      this.cells.push(columns.map((col) => {
        const t = UIKit.text(scene, cx + col.width / 2, 292 + r * 46, '', { fontSize: '24px' }).setOrigin(0.5, 0);
        cx += col.width;
        c.add(t);
        return t;
      }));
    }
    this.empty = UIKit.text(scene, 960, 330, '아직 결과가 없어요', { fontSize: '26px', color: '#9fb0c4' }).setOrigin(0.5, 0);
    c.add(this.empty);

    this.button = UIKit.button(scene, 1890, 120, '결과판 (T)', () => this.toggle(), { originX: 1, originY: 0, fontSize: 24 })
      .setScrollFactor(0).setDepth(320);
    layer.add(this.button);
    scene.input.keyboard.on('keydown-T', () => this.toggle());
    this.render();
  }

  // cells: 열 순서대로 글자. color: 줄 색 (성공 하늘빛 / 실패 붉은빛 등)
  addRow(cells, color = '#ffffff') {
    this.rows.push({ cells, color });
    this.render();
  }

  render() {
    const shown = this.rows.slice(-this.maxRows);
    this.cells.forEach((row, r) => {
      const data = shown[r];
      row.forEach((t, i) => t.setText(data ? String(data.cells[i]) : '').setColor(data ? data.color : '#ffffff'));
    });
    this.empty.setVisible(this.rows.length === 0);
  }

  toggle() {
    if (this.scene.teacher && this.scene.teacher.isOpen) return;
    this.isOpen = !this.isOpen;
    this.container.setVisible(this.isOpen);
    Sound.play('sfx_ui_click');
  }
}
window.ResultBoard = ResultBoard;
