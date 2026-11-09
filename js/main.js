// 게임 시작
// 장면 순서: 제목 → 프롤로그 → 마을 → 1-1 → 1-2 → 1-3 → 1-4 → 1-5 → 1-6 → 1막 완료 (js/data/scenes.js)
// 아직 만들지 않은 장면은 임시 장면(PlaceholderChapterScene)으로 둔다.
window.game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: '#0b1320',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  loader: { imageLoadType: 'HTMLImageElement' }, // file:// 로 더블클릭 실행 가능하게
  audio: { noAudio: true },                     // 소리는 Sound(js/core/sound.js)가 따로 맡는다
  scene: [
    BootScene,
    TitleScene,
    PrologueScene,
    VillageScene,
    SeesawGateScene,
    BoxScaleScene,
    TowerScene,
    SeesawBridgeScene,
    IceCorridorScene,
    BridgeScene,
    SledScene,
    IceCombatScene,
    IceLakeScene,
    IceTrollScene,
    MinecartScene,
    RockRollScene,
    RoughFloorScene,
    IceSpiritScene,
    MerchantPlazaScene,
    MerchantBossScene,
    Act1CompleteScene,
    // 2막 '번개의 탑'
    Act2IntroScene,
    LabScene,
    LampScene,
    BoxScene,
    VaultScene,
    LiftScene,
    BeaconScene,
    ...ACT2_PLACEHOLDERS,
    Act2EndingScene,
    Act2CompleteScene,
    // 3막 '빛의 심연'
    Act3IntroScene,
    FringeScene,
    LensScene,
    DualityScene,
    SpectrumScene,
    BridgeDiodeScene,
    RelativityScene,
    FinalBoss1Scene,
    FinalBoss2Scene,
    FinalBoss3Scene,
    ...ACT3_PLACEHOLDERS,
    Act3ReconcileScene,
    Act3BookCompleteScene,
    Act3EpilogueScene,
    Act3CreditsScene,
  ],
});

// 첫 클릭·키 입력 때 소리 잠금 해제 (제목 화면 "시작하기"가 기본, 교사용 메뉴로 바로 갈 때를 위해 한 번 더)
window.addEventListener('pointerdown', () => Sound.unlock(), { once: true });
window.addEventListener('keydown', () => Sound.unlock(), { once: true });
