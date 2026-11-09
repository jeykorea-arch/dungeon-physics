// 장면 옮겨 가기: 필요한 그림 묶음을 먼저 불러온 뒤 장면을 시작한다.
window.SceneFlow = {
  // 어느 장면에서나 쓰는 묶음
  COMMON_PACKS: ['common', 'ui', 'spellbook', 'exam', 'char_ian'],

  info(key) {
    return SCENE_LIST.find((s) => s.key === key);
  },

  packsFor(key) {
    const s = this.info(key) || {};
    const packs = [...this.COMMON_PACKS, ...(s.packs || [])];
    if (s.bg) packs.push(MANIFEST.backgrounds[s.bg].pack);
    if (s.act === 2) packs.push('spellbook_act2', 'ui_act2');   // 2막 마법서 삽화 7~12장, 탑 지도 아이콘
    if (s.act === 3) packs.push('spellbook_act2', 'spellbook_act3', 'ui_act3', 'obj_3_items', 'char_ian_act3');   // 3막 마법서 삽화, 심연 지도, 손에 드는 물건
    return packs;
  },

  // 장면 순서에서 다음 장면
  nextOf(key) {
    const i = SCENE_LIST.findIndex((s) => s.key === key);
    return i >= 0 && i < SCENE_LIST.length - 1 ? SCENE_LIST[i + 1].key : 'Title';
  },

  go(fromScene, key) {
    if (fromScene.uiLayer) {
      fromScene.uiLayer.add(UIKit.text(fromScene, 960, 540, '불러오는 중…', {
        fontSize: '48px', backgroundColor: '#000000cc', padding: { x: 40, y: 20 },
      }).setOrigin(0.5).setScrollFactor(0).setDepth(2000));
    }
    Sound.stopAllLoops();
    Packs.load(this.packsFor(key)).then(() => fromScene.scene.start(key));
  },
};
