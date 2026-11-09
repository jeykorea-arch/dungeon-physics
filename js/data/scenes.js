// 장면 순서와 각 장면이 쓰는 것들.
// - title: 화면·메뉴에 보이는 이름
// - bg: 배경 (배경/1막/v2 의 장면 id)
// - chapter: 마법서 장 번호 (복원·해금 카드·시험에 쓰임)
// - bgm: 탐험 음악 { cursed: 저주 상태, freed: 해방 상태 } — 두 곡은 같은 위치에서 바뀐다
//        (진실의 원·퍼즐 방·보스전 음악은 config.js 의 music 에서 정한다)
// - packs: 이 장면에서 더 불러올 그림 묶음 (data/packs/)
// - config: config.js 안의 이 장면 설정 이름
// - dialogue: 다른 장면의 대사 파일을 같이 쓸 때 그 장면 이름 (예: 무너지는 다리 → Ch1_2)
const CASTLE_BGM = { cursed: 'bgm_castle_cursed', freed: 'bgm_castle_freed_v2a' };   // 해방판: 선생님이 고름 2026-10-24

const TOWER_BGM = { cursed: 'bgm_tower_cursed', freed: 'bgm_tower_freed' };   // 2막 번개의 탑 (해방판은 처음부터 — 1막과 같은 흐름)

const ABYSS_BGM = { cursed: 'bgm_abyss_cursed', freed: 'bgm_abyss_freed' };   // 3막 빛의 심연

window.SCENE_LIST = [
  { key: 'Title', title: '제목', packs: ['title'] },
  { key: 'Prologue', title: '프롤로그', packs: ['cutscenes', 'char_wizard'] },
  { key: 'Village', title: '마을', bg: '00_village_entrance', config: 'village',
    packs: ['char_garon', 'char_granny', 'char_villager_farmer', 'char_villager_fisher', 'char_villager_merchant',
      'char_villager_child'], bgm: { cursed: 'bgm_village_cursed', freed: 'bgm_village_cursed' } },
  { key: 'Ch1_1', title: '1-1 시소 성', bg: '01_castle_lever', chapter: '01', config: 'seesawGate',
    packs: ['obj_1-1', 'obj_1-2', 'char_garon'], bgm: CASTLE_BGM },
  { key: 'Ch1_1b', title: '1-1 상자 저울', bg: '01_castle_lever', chapter: '01', config: 'boxScale',
    dialogue: 'Ch1_1', packs: ['obj_1-1', 'char_garon'], bgm: CASTLE_BGM },
  { key: 'Ch1_1c', title: '1-1 기울어진 탑', bg: '01_castle_lever', chapter: '01', config: 'tower',
    dialogue: 'Ch1_1', packs: ['obj_1-1', 'char_garon'], bgm: CASTLE_BGM },
  { key: 'Ch1_1d', title: '1-1 시소 다리 전투', bg: '01_castle_lever', chapter: '01', config: 'seesawBridge',
    dialogue: 'Ch1_1', packs: ['obj_1-1', 'obj_1-2', 'char_garon', 'char_stone_golem'], bgm: CASTLE_BGM },
  { key: 'Ch1_2', title: '1-2 얼음 회랑', bg: '02_ice_corridor', chapter: '02', config: 'iceCorridor',
    packs: ['obj_1-2', 'obj_1-1', 'char_garon', 'char_inertia_golem'], bgm: CASTLE_BGM },
  { key: 'Ch1_2b', title: '1-2 무너지는 다리', bg: '03_collapsing_bridge', chapter: '02', config: 'collapsingBridge',
    dialogue: 'Ch1_2', packs: ['obj_1-2', 'obj_1-1', 'char_garon', 'char_granny'], bgm: CASTLE_BGM }, // obj_1-1: 썰매 길로 가는 성문 그림
  { key: 'Ch1_2c', title: '1-2 썰매 길', bg: '04_sled_path', chapter: '02', config: 'sledPath',
    dialogue: 'Ch1_2', packs: ['obj_1-2', 'obj_1-2_sled', 'char_villager_child'], bgm: CASTLE_BGM },
  { key: 'Ch1_2d', title: '1-2 얼음 위 전투', bg: '02_ice_corridor', chapter: '02', config: 'iceCombat',
    dialogue: 'Ch1_2', packs: ['obj_1-2', 'obj_1-1', 'char_garon', 'char_stone_golem'], bgm: CASTLE_BGM },
  { key: 'Ch1_3', title: '1-3 얼음 호수', bg: '05_ice_lake', chapter: '03', config: 'iceLake',
    packs: ['obj_1-2', 'obj_1-3', 'char_garon', 'char_villager_farmer', 'char_villager_child', 'char_villager_fisher',
      'char_villager_merchant'], bgm: CASTLE_BGM },
  { key: 'Ch1_3b', title: '1-3 얼음 트롤', bg: '05_ice_lake', chapter: '03', config: 'iceTroll',
    dialogue: 'Ch1_3', packs: ['obj_1-1', 'obj_1-2', 'obj_1-3', 'char_ice_troll'], bgm: CASTLE_BGM },
  { key: 'Ch1_4', title: '1-4 광차 탑', bg: '06_minecart_tower', chapter: '04', config: 'minecart',
    packs: ['obj_1-4', 'char_garon'], bgm: CASTLE_BGM },
  { key: 'Ch1_4b', title: '1-4 바위 미끄러뜨리기', bg: '06_minecart_tower', chapter: '04', config: 'rockRoll', dialogue: 'Ch1_4',
    packs: ['obj_1-4', 'obj_1-2', 'char_garon', 'char_stone_golem'], bgm: CASTLE_BGM },
  { key: 'Ch1_5', title: '1-5 거친 돌바닥', bg: '07_rough_stone', chapter: '05', config: 'roughFloor',
    packs: ['obj_1-5', 'obj_1-4', 'obj_1-2', 'char_garon'], bgm: CASTLE_BGM },
  { key: 'Ch1_5b', title: '1-5 얼음 정령', bg: '07_rough_stone', chapter: '05', config: 'iceSpirit', dialogue: 'Ch1_5',
    packs: ['obj_1-2', 'char_garon', 'char_ice_spirit'], bgm: CASTLE_BGM },
  { key: 'Ch1_6', title: '1-6 상인 광장', bg: '08_merchant_plaza', chapter: '06', config: 'merchantPlaza',
    packs: ['obj_1-6', 'char_garon', 'char_merchant', 'char_steam_golem', 'char_wheel'], bgm: CASTLE_BGM },
  { key: 'Ch1_6b', title: '1-6 상인 보스전', bg: '08_merchant_plaza', chapter: '06', config: 'merchantBoss',
    dialogue: 'Ch1_6', packs: ['char_garon', 'char_merchant', 'char_steam_golem'], bgm: CASTLE_BGM },
  { key: 'Act1Complete', title: '1막 완료', packs: ['cutscenes'] },

  // ---------------- 2막 '번개의 탑' (ACT2_PLAN.md) — act: 2 (교사용 메뉴 2막 탭), 마법서 7~12장
  { key: 'Act2Intro', act: 2, title: '2막 시작', packs: ['cutscenes_act2'] },
  { key: 'Ch2_1', act: 2, title: '2-1 탑 1층 실험실', bg: 'tower_f1', chapter: '07', config: 'ch2_1',
    packs: ['char_ian_act2', 'char_garon', 'obj_2-1', 'obj_2-5', 'char_spark_fairy_positive', 'char_spark_fairy_negative'], bgm: TOWER_BGM }, // obj_2-5: 전위 스위치 그림(direction_switch)
  { key: 'Ch2_2', act: 2, title: '2-2 탑 2층 등불의 방', bg: 'tower_f2', chapter: '08', config: 'ch2_2',
    packs: ['char_ian_act2', 'char_garon', 'char_granny', 'obj_2-2', 'obj_battery', 'ui_act2', 'char_spark_fairy_positive', 'char_spark_fairy_negative', 'char_iron_knight'], bgm: TOWER_BGM },
  { key: 'Ch2_3', act: 2, title: '2-3 탑 3층 번개 문', bg: 'tower_f3', chapter: '09', config: 'ch2_3',
    packs: ['char_ian_act2', 'char_garon', 'obj_2-3', 'obj_2-2', 'obj_battery', 'char_spark_fairy_positive', 'char_spark_fairy_negative'], bgm: TOWER_BGM }, // obj_battery: 충전대 번개 전지 그림
  { key: 'Ch2_4', act: 2, title: '2-4 탑 4층 자석 금고', bg: 'tower_f4', chapter: '10', config: 'ch2_4',
    packs: ['char_ian_act2', 'char_garon', 'obj_2-4', 'char_iron_knight', 'char_copper_soldier'], bgm: TOWER_BGM },
  { key: 'Ch2_5', act: 2, title: '2-5 승강기와 석상의 방', bg: 'tower_f5', chapter: '11', config: 'ch2_5',
    packs: ['char_ian_act2', 'char_garon', 'char_granny', 'obj_2-5', 'char_silent_statue', 'char_iron_knight', 'char_copper_soldier'], bgm: TOWER_BGM },
  { key: 'Ch2_6', act: 2, title: '2-6 탑 꼭대기 봉화대', bg: 'tower_top', chapter: '12', config: 'ch2_6',
    packs: ['char_ian_act2', 'char_garon', 'obj_2-6', 'obj_2-5', 'char_magnet_golem'], bgm: TOWER_BGM },   // obj_2-5: 코일·막대자석
  { key: 'Act2Ending', act: 2, title: '2막 엔딩', packs: ['cutscenes_act2'] },
  { key: 'Act2Complete', act: 2, title: '2막 완료', packs: ['cutscenes_act2'] },

  // ---------------- 3막 '빛의 심연' (ACT3_PLAN.md) — act: 3 (교사용 메뉴 3막 탭), 마법서 13~18장
  { key: 'Act3Intro', act: 3, title: '3막 시작', packs: ['cutscenes_act3'] },
  { key: 'Ch3_1', act: 3, title: '3-1 어두운 줄무늬 벽', bg: 'abyss_1', chapter: '13', config: 'ch3_1',
    packs: ['char_garon', 'char_garon_act3', 'obj_3-1', 'char_light_wraith'], bgm: ABYSS_BGM },
  { key: 'Ch3_2', act: 3, title: '3-2 물웅덩이와 렌즈', bg: 'abyss_2', chapter: '14', config: 'ch3_2',
    packs: ['char_garon', 'char_garon_act3', 'obj_3-2', 'char_crystal_fish'], bgm: ABYSS_BGM },
  { key: 'Ch3_3', act: 3, title: '3-3 작은 룬 문자의 방', bg: 'abyss_3', chapter: '15', config: 'ch3_3',
    packs: ['char_garon', 'char_granny', 'obj_3-3', 'char_shadow_bug'], bgm: ABYSS_BGM },
  { key: 'Ch3_4', act: 3, title: '3-4 바코드 등불의 방', bg: 'abyss_4', chapter: '16', config: 'ch3_4',
    packs: ['char_garon', 'char_granny', 'obj_3-4', 'char_elemental_hydrogen', 'char_elemental_sodium', 'char_elemental_neon', 'char_elemental_mercury'], bgm: ABYSS_BGM },
  { key: 'Ch3_5', act: 3, title: '3-5 수정 다리', bg: 'abyss_5', chapter: '17', config: 'ch3_5',
    packs: ['char_garon', 'obj_3-5', 'char_wizard'], bgm: ABYSS_BGM },
  { key: 'Ch3_6', act: 3, title: '3-6 심연의 끝', bg: 'abyss_end', chapter: '18', config: 'ch3_6',
    packs: ['char_garon', 'obj_3-6', 'char_wizard', 'char_chariot', 'ui_act3'], bgm: ABYSS_BGM },
  { key: 'FinalBoss1', act: 3, dialogue: 'FinalBoss', title: '최종 보스 1단계', bg: 'abyss_end', config: 'finalBoss',
    packs: ['char_garon', 'obj_3-6', 'char_wizard'], bgm: { cursed: 'bgm_final_phase1', freed: 'bgm_final_phase1' } },
  { key: 'FinalBoss2', act: 3, dialogue: 'FinalBoss', title: '최종 보스 2단계', bg: 'abyss_end', config: 'finalBoss',
    packs: ['char_garon', 'obj_3-6', 'char_wizard'], bgm: { cursed: 'bgm_final_phase2', freed: 'bgm_final_phase2' } },
  { key: 'FinalBoss3', act: 3, dialogue: 'FinalBoss', title: '최종 보스 3단계', bg: 'abyss_chase', config: 'finalBoss',
    packs: ['char_garon', 'obj_3-6', 'char_wizard', 'char_chariot'], bgm: { cursed: 'bgm_final_phase3', freed: 'bgm_final_phase3' } },
  { key: 'Act3Reconcile', act: 3, title: '화해 컷신', bg: 'abyss_end', packs: ['char_wizard'] },
  { key: 'Act3BookComplete', act: 3, title: '마법서 완성', packs: ['obj_3-6'] },
  { key: 'Act3Epilogue', act: 3, title: '에필로그', packs: ['cutscenes_act3'] },
  { key: 'Act3Credits', act: 3, title: '크레딧', packs: ['cutscenes_act3'] },
];
