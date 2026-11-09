// 2막 탑 지도·3막 심연 지도 (ACT2_PLAN·ACT3_PLAN 0단계 3번): 그 막 장면에서 방 6곳의 진행 상황을 보여 준다.
// 아이콘 tower_floor_NN_(locked|open|cleared), abyss_floor_NN_(locked|open|cleared) — 그림에는 숫자가 없어 글자로 넣는다.
//   해제됨(cleared) = 그 방 시험까지 통과(저장 examPassed) / 열림(open) = 지금 있는 방, 첫 방, 또는 앞 방 시험 통과
//   잠김(locked) = 그 밖 (총괄지시 60번: 저주만 풀린 것으로는 다음 방을 열지 않는다)
// 방에 처음 들어오면 3초 동안 보이고, 화면 왼쪽 아래 버튼으로 다시 열고 닫는다.
class TowerMap {
  static MAPS = {
    2: {
      title: '번개의 탑', button: '탑 지도', floors: ['Ch2_1', 'Ch2_2', 'Ch2_3', 'Ch2_4', 'Ch2_5', 'Ch2_6'],
      icon: (i, st) => MANIFEST.ui.act2[`tower_floor_0${i + 1}_${st}`],
      label: (i) => `${i + 1}층`,
      firstOnTop: false,   // 탑: 1층이 맨 아래
    },
    3: {
      title: '빛의 심연', button: '심연 지도', floors: ['Ch3_1', 'Ch3_2', 'Ch3_3', 'Ch3_4', 'Ch3_5', 'Ch3_6'],
      icon: (i, st) => MANIFEST.ui.act3[`abyss_floor_0${i + 1}_${st}`],
      label: (i) => `3-${i + 1}`,
      firstOnTop: true,    // 심연: 내려갈수록 깊어지니 첫 방이 맨 위
      dim: { 'Ch3_1:locked': 0x808080 },   // ACT3_PLAN: 3-1 잠김 아이콘은 그림이 밝아 밝기 약 50%로
    },
  };

  static floorState(i, currentKey, act = 2) {
    const floors = TowerMap.MAPS[act].floors, key = floors[i];
    if (Save.chapter(key).examPassed) return 'cleared';
    if (i === 0 || key === currentKey || Save.chapter(floors[i - 1]).examPassed) return 'open';
    return 'locked';
  }

  constructor(scene, layer) {
    this.scene = scene;
    this.act = scene.info.act;
    const M = TowerMap.MAPS[this.act];
    this.map = M;
    const S = 0.5, size = 160 * S, gap = 8;
    const x0 = 24 + 92 + size / 2, yTop = 250;   // 화면 왼쪽 (오른쪽 위 숫자판을 가리지 않게)
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(330).setVisible(false);
    layer.add(c);
    this.container = c;
    const h = 6 * (size + gap) + 50;
    c.add(scene.add.rectangle(x0 - size / 2 - 92, yTop - 46, size + 112, h, 0x0b1320, 0.85)
      .setOrigin(0, 0).setStrokeStyle(2, 0x9fd8ff, 0.6));
    c.add(UIKit.text(scene, x0 - 36, yTop - 38, M.title, { fontSize: '24px', fontStyle: 'bold', color: UIKit.SKY })
      .setOrigin(0.5, 0));
    this.icons = M.floors.map((key, i) => {
      const row = M.firstOnTop ? i : 5 - i;
      const y = yTop + row * (size + gap) + size / 2;
      const icon = scene.add.image(x0, y, '__DEFAULT').setScale(S);
      const label = UIKit.text(scene, x0 - size / 2 - 10, y, M.label(i), { fontSize: '24px', fontStyle: 'bold' })
        .setOrigin(1, 0.5);
      const here = scene.add.rectangle(x0, y, size + 6, size + 6).setStrokeStyle(4, 0x9fe0ff, 1).setVisible(false);
      c.add([icon, label, here]);
      return { key, icon, label, here };
    });
    this.btn = UIKit.button(scene, 24, 1050, M.button, () => this.toggle(), { originX: 0, originY: 1, fontSize: 24 })
      .setScrollFactor(0).setDepth(330);
    layer.add(this.btn);
  }

  refresh() {
    const colors = { locked: '#8a96a8', open: '#ffffff', cleared: UIKit.SKY };
    this.icons.forEach((it, i) => {
      const st = TowerMap.floorState(i, this.scene.scene.key, this.act);
      const k = this.map.icon(i, st);
      if (k && this.scene.textures.exists(k.key)) it.icon.setTexture(k.key);
      const dim = this.map.dim && this.map.dim[`${it.key}:${st}`];
      if (dim) it.icon.setTint(dim); else it.icon.clearTint();
      it.label.setColor(colors[st]);
      it.here.setVisible(it.key === this.scene.scene.key);
    });
  }

  show(seconds = 0) {
    this.refresh();
    this.container.setVisible(true);
    if (this.hideTimer) this.hideTimer.remove();
    this.hideTimer = seconds ? this.scene.time.delayedCall(seconds * 1000, () => this.container.setVisible(false)) : null;
  }

  toggle() {
    if (this.container.visible) this.container.setVisible(false); else this.show();
  }
}
window.TowerMap = TowerMap;
