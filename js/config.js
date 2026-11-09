// =====================================================================
// 물리 값과 장면 설정 — 수업 중 숫자를 바꾸고 싶으면 이 파일만 고치면 된다.
// (메모장으로 열어 숫자를 바꾸고 저장 → 브라우저에서 F5)
// =====================================================================
window.GAME_CONFIG = {
  pxPerMeter: 125, // 세계 기준: 1m = 125px (바꾸지 말 것)

  teacherCode: '1905', // 교사용 메뉴를 여는 숫자 코드 (4자리 권장). 학생에게 알리지 말고 원하는 숫자로 바꾸세요

  // 배경 그림과 발 기준선(y, px)이 어긋난 곳 바로잡기 — 배경 JSON 값(ground_y_px_art_estimate) 대신 이 값을 쓴다
  // 08 상인 광장: JSON 값 929는 광장 앞 석축(벽) 한가운데라 인물이 땅에 반쯤 묻혀 보였다.
  //   그림에서 잰 광장 바닥돌 앞 가장자리 ≈ 845 → 발은 그보다 조금 안쪽인 835 (선생님 지적 2026-10-24)
  groundYFix: {
    '08_merchant_plaza': 835,
  },

  // 1막 공통 물리 값
  physics: {
    g: 10,                          // 중력 가속도 (m/s²)
    ian: { mass: 50, maxForce: 20 },   // 이안: 질량 (kg), 낼 수 있는 최대 힘 (N)
    garon: { mass: 100, maxForce: 80 }, // 가론: 질량 (kg), 낼 수 있는 최대 힘 (N)
    friction: {
      ice: 0,             // 얼음: 마찰 없음
      roughStone: null,   // 거친 돌바닥: 1-5에서 정한다
    },
  },

  // 챕터 안 특별한 곳의 배경음악 (탐험 음악은 js/data/scenes.js 에서 장면마다 정한다)
  music: {
    truthCircle: 'bgm_truth_circle', // 진실의 원 안 (저주 상태일 때)
    puzzle: 'bgm_puzzle',            // 퍼즐 방
    boss: 'bgm_boss_act1_v2',        // 1막 보스전 (1-6 영구기관 상인) — 선생님이 고름 2026-10-24
    midboss: 'bgm_midboss_v2',       // 중간 보스전 (1-2 관성의 골렘, 1-3 얼음 트롤)
    realize: 'jingle_realize_a',     // 깨달음 징글 (저주가 풀릴 때, 유리 깨지는 소리 다음)
    chapterClear: 'jingle_chapter_clear_a_v3', // 챕터 클리어 팡파르 (다음 장으로 넘어갈 때)
    act1Clear: 'bgm_act1_clear_v2',  // 1막 완료
    battle: 'bgm_battle',            // 일반 전투
  },

  curse: {
    fadeSeconds: 1.5,   // 깨달음 뒤 저주 색이 걷히는 데 걸리는 시간 (초)
  },

  text: {
    charsPerSecond: 32, // 대화 글자가 나오는 속도 (글자/초)
    blipInterval: 0.07, // 글자음 사이 최소 간격 (초)
  },

  // 1-2 얼음 회랑 (길이 30m). 위치는 모두 회랑 왼쪽 끝 = 0m 기준 (m)
  iceCorridor: {
    walkSpeed: 2.0,     // 걷는 속력, 그리고 미끄러지기 시작하는 속력 — 발판·고리·벽을 밀고 출발 (m/s)
    wallMargin: 0.5,    // 회랑 양 끝 벽까지 남기는 거리 (m)
    startCursed: true,  // R(처음부터)을 눌렀을 때 저주 상태로 시작할지
    friction: false,    // 해방 상태의 얼음 바닥 마찰 (false = 마찰 없음)

    // 회랑 배치
    padEnd: 2.0,        // 출발 돌바닥: 0m ~ 이 위치 (발로 밀고 출발할 수 있는 곳, 그림 250px)
    pitWidth: 3.44,     // 구덩이(외나무다리) 너비 — 돌바닥 바로 오른쪽 2.0~5.44m (그림 430px)
    doorX: 28.76,       // 문(성문 그림) 가운데 위치. 문 앞면은 27.52m
    rings: [12, 20, 27],// 벽 고리 위치
    ringGrabRange: 0.6, // 고리에서 이만큼(m) 안에서 방향키를 누르면 잡는다
    // 벽 고리 모양 (총괄지시 수정목록 4번): 그림 0.5배, 고리 가운데가 이안 grab_ring 손 높이(발에서 160px)에 오게.
    // 잡는 동안 손이 고리에 닿게 캐릭터를 handDx(px)만큼 뒤로, 가론은 주먹이 235px 높이라 그동안만 고리가 올라간다 (그림에서 잰 값)
    ringLook: { scale: 0.5, handY: 160, garonHandY: 235, handDx: { ian: 52, garon: 45 } },

    ian: { startX: 0.65, pushReach: 0.75 },  // pushReach: 밀 때 발 중심에서 손끝까지 (m). startX = 수레(2.6) − 수레 반폭(1.2) − 0.75: 처음부터 손이 수레에 닿는다
                                             // (가론 0.6도 수레 − 1.2 − 0.8 = 손이 닿는 자리)
    garon: { startX: 0.6, pushReach: 0.8 },  // 가론은 방패 끝까지

    // 진실의 원: 이 안에서는 저주 상태여도 진짜 법칙(해방 상태 물리)이 적용된다
    truthCircle: {
      centerX: 9.8,     // 원 중심 위치 (m)
      diameter: 3.6,    // 원 지름 (m) — 그림 크기(450px)와 맞춘 값
      domeHeight: 2.6,  // 저주 색이 빠지는 둥근 공간의 높이 (m)
    },
    circleNoticeDistance: 1.0, // 진실의 원 가장자리까지 이만큼(m) 다가가면 "발견" 대사

    // 실험용 돌
    stone: {
      mass: 10,         // 질량 (kg) — 화면 표시용
      startX: 8.8,      // 처음 위치 (m) — 원 왼쪽 가장자리. 이안이 원 밖(발 디딜 곳)에서 밀어 원 안으로 보낸다
      pushSpeed: 1.5,   // 저주 상태에서 밀며 걷는 속력 (m/s)
    },

    // 돌 수레 (바퀴가 있어 돌바닥에서도 굴러간다)
    cart: {
      startX: 2.6,      // 처음 위치 = 출발 돌바닥 끝 (가운데, m)
      pushSpeed: 1.0,   // 저주 상태에서 밀며 걷는 속력 (m/s)
      launchSpeed: 2.0, // 해방 후 돌바닥에서 한 번 밀면 나가는 속력 (m/s)
      hpPerMeter: { garon: 0.025, ian: 0.05 }, // 저주 상태에서 1m 밀 때 줄어드는 체력 비율
    },

    // 관성의 골렘
    golem: {
      speed: 3.0,          // 돌진 속력 (m/s) — 얼음 위라 스스로 멈추지 못한다
      startDistance: 30,   // 깨어날 때 외나무다리(구덩이 오른쪽 끝)까지 거리 (m) → 30 ÷ 3 = 10초
      wakeMargin: 3,       // 돌바닥에서 Z를 누를 여유(초). 이안이 돌바닥까지 (10초 − 이 값) 안에 올 수 있을 때만 깨어난다
                           // → 12m 고리(5초, 여유 5초)에서는 깨어나고 20m 고리(9초)에서는 안 깨어난다
      kickRange: 1.2,      // 돌바닥에서 다리 끝까지 이만큼(m) 안이면 Z로 걷어찰 수 있다
      hitDamage: 0.3,      // 골렘에 부딪혔을 때 줄어드는 체력 비율
      lodgeDepth: 239,     // 떨어진 골렘이 구덩이에 끼는 깊이(px) — 서기 그림의 등 꼭대기(발에서 239px)가 바닥 높이에 오게
      holeDepth: 50,       // 구덩이 그림에서 구멍이 보이는 깊이(px) — 골렘은 이 선 아래로는 그리지 않는다
      lodgePause: 1.2,     // 골렘이 낀 순간 멈추고 구덩이를 보여 주는 시간 (초)
      backLift: 22,        // 낀 골렘 등 윗면이 바닥선보다 높은 정도(px, 골렘 낀 구덩이 그림에서 잰 값) — 그 높이로 밟고 걷는다
      backRamp: 0.3,       // 구덩이 가장자리에서 등 높이까지 올라가는 거리 (m)
    },
  },

  // 1-2 무너지는 다리 (배경 03, 다리 10m = 판자 10개, x 447~1697)
  // 건너는 시간 t = √(2 × 10m × 돌 질량 ÷ 미는 힘) — 힘은 physics의 maxForce (이안 20N, 가론 80N)
  collapsingBridge: {
    stones: [10, 15, 20, 40, 160], // 고를 수 있는 돌 (kg) — 오브젝트 그림이 있는 질량만
    collapseSeconds: 4,  // 첫발을 디딘 순간부터 무너질 때까지 (초)
    crack1At: 2,         // 판자에 금이 가기 시작 (초)
    crack2At: 3,         // 금이 크게 벌어짐 (초)
    plateX: 15.52,       // 건너편 압력판 가운데 (m)
    waitX: 0.3,          // 밀지 않는 사람이 기다리는 곳 (m) — 출발 발판 왼쪽 끝 (뒤쪽 줄의 돌을 가리지 않게, 2차 16번)
    grannyX: 0.6,        // 스톤 할멈이 나타나는 곳 (m)
    failsBeforeHint: 3,  // 이만큼 실패하면 스톤 할멈 힌트
    handInset: { ian: 25, garon: 35 }, // 미는 손·방패가 돌에 딱 붙어 보이게 당기는 거리 (px, 그림에서 잰 값 — 물리 계산과 상관없음)
    // 아래는 보이는 배치·연출만 (물리 계산과 상관없음) — 총괄지시 2차 16번
    signX: 0.45,         // 출발 발판의 돌 비석 안내판 (m)
    ianEnterX: 3.0,      // 처음 들어올 때 이안이 서 있다가 안내판 앞으로 걸어가는 곳 (m)
    stoneRow: { startX: 0.85, scale: 0.6, gap: 4, lift: 26 }, // 고르지 않은 돌이 놓인 뒤쪽 줄: 시작 (m), 크기 배율(멀리 있어 작게), 간격·높이 (px)
    rollSeconds: 0.7,    // 고른 돌이 다리 앞으로 굴러 나오는 시간 (초)
    gateScale: 0.75,     // 썰매 길로 가는 성문 (회랑 문 그림, 회랑 오른쪽 끝)
    exitWalkSpeed: 2.0,  // 성공한 뒤 열린 문으로 걸어가는 속력 (m/s)
  },

  // 1-2 썰매 길 (배경 04). 제동 거리 = 속력² ÷ (2 × 감속도)
  sledPath: {
    speeds: [1, 2, 3, 4],  // 1~4 키로 고르는 출발 속력 (m/s)
    brakeDecel: 2,         // 브레이크 감속도 (m/s²)
    brakeLineX: 9.0,       // 제동 시작선 위치 (m) — 썰매 앞부분이 지나면 브레이크
    stopLineGap: 1.5,      // 제동 시작선에서 정지선까지 (m)
    ianX: 1.0,             // 이안이 서서 미는 곳 (돌바닥 위, m)
    signX: 6.5,            // 속도 제한 표지판 위치 (m)
    childMinX: 11.0,       // 마을 아이가 왔다 갔다 하는 구간 (m)
    childMaxX: 12.6,
    childSpeed: 0.6,       // 아이 걷는 속력 (m/s, 보이는 연출)
    childBehind: 40,       // 아이는 썰매보다 이만큼(px) 뒤쪽(화면 위)을 지나간다
    trackY0: 700,          // 배경 속 얼음 길의 발 기준선: 왼쪽 끝 y (px, 그림에서 잰 값)
    trackSlope: 0.066,     // 오른쪽으로 갈수록 내려가는 정도 (px당 px)
  },

  // 1-2 얼음 위 전투 (배경 02). 승인대기 [1]에서 승인한 숫자. 속도 변화 = 힘 × 시간 ÷ 질량
  iceCombat: {
    padEnd: 2.0,           // 이안·가론이 서는 출발 돌바닥 0 ~ 이 위치 (m)
    wallMargin: 0.4,       // 왼쪽 벽까지 남기는 거리 (m)
    heroEdgeGap: 0.15,     // 돌바닥 끝에서 이만큼 안쪽까지만 걸어간다 (m)
    heroes: {
      ian: { startX: 0.6, force: 20, reach: 1.0 },   // 지팡이 공격: 힘 (N), 손이 닿는 거리 (m)
      garon: { startX: 1.4, force: 80, reach: 1.0 }, // 방패 돌진
    },
    contactTime: 0.5,      // 공격 때 힘을 주는 시간 (초)
    attackCooldown: 0.7,   // 다음 공격까지 (초)
    approachSpeed: 1.0,    // 골렘이 다가오는 속력 (m/s)
    golems: [              // 나오는 순서와 질량 (kg). 첫 골렘은 시작부터, 다음은 앞 골렘이 되밀리기 시작하면 나온다
      { mass: 20 },
      { mass: 20 },
      { mass: 80 },
      { mass: 20 },
    ],
    golemHalfWidth: 0.34,  // 돌 골렘 몸 절반 폭 (m, 그림에서 잰 값)
    spawnX: 14,            // 골렘이 나타나는 곳 (m) — 총괄지시: 대기 시간을 줄이려고 문(28.5m) 대신 14m
    exitX: 29.4,           // 이 위치를 지나면 문 너머로 밀려 나간 것 (m)
    winDelay: 2,           // 마지막 골렘이 되밀려 문 쪽으로 미끄러지기 시작한 뒤 승리까지 (초) — 총괄지시 수정목록 14번
    doorX: 28.76,          // 문 그림 가운데 (m)
    punchInterval: 1.5,    // 돌바닥 앞에서 주먹질하는 간격 (초)
    punchReach: 0.8,       // 주먹이 닿는 거리 (m)
    punchDamage: 0.1,      // 한 대 맞을 때 줄어드는 체력 비율
  },

  // 마을 (배경 00, 폭 21.6m). 위치는 m
  village: {
    ianStartX: 1.6,
    villagers: [               // 마을 사람: id, 위치, 동작, 왼쪽 보기
      { id: 'farmer', x: 4.5, anim: 'idle', flip: false },
      { id: 'fisher', x: 7.2, anim: 'wave', flip: true },
      { id: 'merchant', x: 10.0, anim: 'idle', flip: true },
      { id: 'child', x: 12.0, anim: 'idle', flip: false },
    ],
    grannyX: 15.6,
    garonX: 16.6,
    talkDistance: 1.6,         // 스톤 할멈에게 이만큼 다가가면 대화
    villagerTalkDistance: 1.0, // 마을 주민에게 이만큼 다가가면 한 줄 말한다
    entranceX: 19.2,           // 던전 입구 (여기를 지나면 1-1)
  },

  // 1-1 성문의 저울 (배경 01). 위치는 m, 받침점은 px
  seesawGate: {
    pivotX: 1477,          // 받침점 (px, act1_objects scene_layout)
    plankSeat: 8,          // 판자 아랫면이 받침대 윗면보다 이만큼(px) 아래에 얹힌다 (그림 맞춤)
    maxTilt: 9,            // 기울 때 판자 각도 (도)
    tiltSpeed: 30,         // 기우는 빠르기 (도/초)
    spotStep: 0.5,         // 저울 위에서 서는 칸 간격 (m)
    holdSeconds: 1,        // 이만큼 수평을 유지하면 성문이 열린다 (초)
    ianStartX: 8.2,        // 진실의 원(3.2~6.8 m)에서 떨어진 곳 — 먼저 저주받은 저울에 올라가 실패해 보게 (총괄지시 2차 17번)
    garonStartX: 7.4,
    wallMargin: 0.5,
    circleX: 5.0,          // 진실의 원 (작은 저울 실험대) 위치 (m)
    gateX: 20.5,           // 성문 위치 (m)
    // 진실의 원 안의 작은 저울 실험 — 승인대기 [2]
    lab: {
      stones: [
        { mass: 20, startD: -1.0 },  // 무거운 돌: 처음에 왼쪽 1m
        { mass: 10, startD: 1.0 },   // 가벼운 돌: 처음에 오른쪽 1m (같은 거리라 기운다)
      ],
    },
  },

  // 1-1 상자 저울 (성문 너머 방, 배경 01) — 승인대기 [3]: 60kg·20kg (3:1)
  // 판자 칸(±2.5m) 안의 정답: 60kg 0.5m · 20kg 1.5m (60kg 1m · 20kg 3m는 판자 밖)
  boxScale: {
    pivotX: 1477,          // 받침점 (px) — 1m 눈금 그림과 맞춤
    slotStep: 0.5,         // 상자를 놓는 칸 간격 (m)
    reach: 0.9,            // 이만큼(m) 안의 상자를 Z로 든다
    boxes: [               // 돌 상자: 질량 (kg), 처음 위치 (m)
      { mass: 60, x: 4.0 },
      { mass: 20, x: 6.0 },
    ],
    ianStartX: 1.5,
    garonStartX: 2.5,
    gateX: 20.5,           // 다음으로 가는 문 (m)
  },

  // 1-1 기울어진 탑 (상자 저울 다음 방, 배경 01) — 승인대기 [5]
  // 안정 조건: 어느 층이든 그 위 블록 전체의 무게중심이 맞닿은 면(받침면) 안에 있어야 한다
  tower: {
    baseX: 11.8,           // 탑을 쌓는 자리 (맨 아래 블록 가운데, m)
    targetCount: 5,        // 이만큼 쌓아야 한다 (블록 1개 = 폭 1m, 높이 0.39m, 모두 같은 질량)
    reach: 0.8,            // 맨 위 블록 가운데가 맨 아래 블록보다 이만큼 오른쪽(하늘빛 표시)까지 닿고 서 있으면 문이 열린다 (m)
                           //   0.1m 칸으로 가능한 최대는 1.0m. 0.8m 이상인 배치는 62가지
    step: 0.1,             // 블록을 옮기는 칸 (m)
    maxOffset: 0.9,        // 아래 블록보다 최대 이만큼까지 옮길 수 있다 (m)
    leaningCount: 5,       // 처음에 서 있다가 무너지는 기울어진 탑의 블록 수
    leaningShift: 0.3,     // 그 탑에서 층마다 어긋난 거리 (m) → 맨 위는 1.2m까지 뻗지만, 2층부터 위 블록 4개의 무게중심(0.75m)이
                           //   맨 아래 블록과의 받침면(0.5m까지) 밖이라 무너진다
    holdGap: 60,           // 들고 있는 블록이 탑 위에 떠 있는 높이 (px)
    ianX: 7.5, garonX: 6.5,
    gateX: 20.5,
  },

  // 1-1 시소 다리 전투 (기울어진 탑 다음 방, 배경 01) — 승인대기 [6]
  // 판자가 도는 빠르기 ω = spinPerMeter × d (d: 바위를 떨어뜨린 곳의 받침점 거리) — 돌림힘이 d에 비례하므로
  // 골렘이 튕기는 속력 v = ω × r (r: 골렘의 받침점 거리), 60° 위로 날아 R = v² sin120° / g
  //   끝(2.4m)에 선 골렘 (g = 10): d 2.5m → 6.0 m/s, 3.12m (부서짐) / 2.0m → 4.8 m/s, 2.00m (부서짐) / 1.5m → 3.6 m/s, 1.12m (다시 옴)
  seesawBridge: {
    rockMass: 20,          // 바위 질량 (kg) — 그림 stone_20kg
    rockImage: 'stone_20kg',
    slotStep: 0.5,         // 바위를 떨어뜨리는 칸 (m)
    maxSlot: 2.5,          // 받침점에서 가장 먼 칸 (m) — 판자 왼쪽 팔 2.6m 안
    startSlot: 1.0,
    dropHeight: 1.5,       // 판자 위 이 높이에서 떨어뜨린다 (m)
    rockCooldown: 1.2,     // 다음 바위까지 (초)
    spinPerMeter: 1.0,     // 바위 거리 1m당 판자가 도는 빠르기 (rad/s)
    launchAngle: 60,       // 골렘이 튕겨 오르는 각도 (도)
    breakDistance: 1.5,    // 이만큼(m) 이상 날아가면 세게 떨어져 부서진다
    cursedSpeed: 1.2,      // 저주: 어디에 떨어뜨려도 이 속력 (m/s) → 0.12m
    golemCount: 4,         // 부숴야 하는 골렘 수
    walkSpeed: 0.5,        // 골렘 걷는 속력 (m/s)
    retreatSpeed: 1.5,     // 주먹질 뒤 물러나는 속력 (m/s)
    retreatTo: 1.5,        // 판자 끝에서 이만큼 오른쪽까지 물러났다가 다시 온다 (m)
    tipStand: 2.4,         // 골렘이 올라서는 판자 끝 자리 (받침점에서, m)
    climbGap: 0.5,         // 판자 끝 이만큼 앞에서 기어오르기 시작 (m)
    climbTime: 0.6,        // 기어오르기·뛰어내리기 시간 (초)
    tipPause: 1.2,         // 판자 끝에서 멈춰 있는 시간 (초)
    punchReach: 0.9,       // 이안에게 주먹이 닿는 거리 (m)
    punchDamage: 0.2,      // 한 대 맞을 때 줄어드는 체력 비율
    spawnX: 19.5,          // 골렘이 나타나는 곳 (m)
    spawnDelay: 1.5,       // 앞 골렘이 부서진 뒤 다음 골렘까지 (초)
    spawnEvery: 12,        // 앞 골렘이 남아 있어도 이만큼 지나면 다음 골렘 (초)
    ianX: 8.3, garonX: 7.3, // 카메라 왼쪽 끝(6.1m)보다 안쪽, 판자 왼쪽 끝(9.2m)보다 왼쪽 (총괄지시 수정목록 8번)
    cameraX: 13.8,         // 화면 가운데 (m)
    // 판자 흔들림 (보기용)
    tiltKick: 14, tiltSpring: 60, tiltDamp: 6, maxTilt: 12,
  },

  // 1-3 얼음 호수 (배경 05, 폭 40m) — 승인대기 [8]
  // 운동량 보존: 던지기 전후 (이안 + 돌) 운동량의 합이 같다
  iceLake: {
    centerX: 22,           // 호수 한가운데 = 이안·진실의 원 (m)
    shoreX: 4,             // 왼쪽 호숫가 끝 (m) — 한가운데에서 20m (ACT1_PLAN)
    farShoreX: 38,         // 오른쪽(반대편) 호숫가 시작 (m)
    garonX: 3.4,           // 호숫가에서 기다리는 가론 (m) — 물가 가까이 (주민 자리는 그 뒤쪽, 총괄지시 3차 26번)
    boatX: 22.9,           // 얼어붙은 나룻배 (m) — 미끄러져 온 이안이 여기에 부딪혀 한가운데에 멈췄다 (보이는 배치, 총괄지시 2차 17번)
    circleDiameter: 3.6,
    stone: { count: 3, mass: 10, throwSpeed: 2 },   // 이안이 든 돌: 개수, 질량 (kg), 이안에 대해 던지는 속력 (m/s)
    // 진실의 원 실험: 정지한 이안 50kg이 10kg 돌을 2m/s로 → 이안 0.4m/s (ACT1_PLAN)
    lab: { ianMass: 50, stoneMass: 10, throwSpeed: 2, showSeconds: 2.5 },
    // 주민: 짐을 호수 안쪽으로 던지고 그 반작용으로 호숫가로 (50kg, 짐 10kg을 4m/s → 0.8m/s, 약 23초)
    villager: { mass: 50, itemMass: 10, itemThrowSpeed: 4, throwGap: 1.0, shoreGap: 0.75, shoreBack: 0.6 }, // 호숫가 자리 = 물가 − shoreBack − shoreGap × (1 + 자리 번호): 0.4~2.65 m, 가론(3.4 m)과 겹치지 않게 // throwGap: 앞 주민이 던진 뒤 다음 주민이 이어서 던질 때까지 (초) — 함께 탈출 (총괄지시 3차 26번)
    villagers: [           // 갇힌 주민: 위치 (m), 짐 그림
      { id: 'villager_farmer', x: 19.6, item: 'herb_basket', flip: true },
      { id: 'villager_child', x: 20.6, item: 'child_pouch', flip: true },
      { id: 'villager_fisher', x: 23.6, item: 'rope_coil', flip: false },
      { id: 'villager_merchant', x: 24.6, item: 'merchant_parcel', flip: false },
    ],
  },

  // 1-3 얼음 트롤 보스 (배경 05) — 승인대기 [9]
  // 서로 미는 힘 200N × 0.5초: 이안 50kg → 2 m/s, 트롤 100kg → 1 m/s, 반대 방향 (ACT1_PLAN)
  //   얼음문은 2.5 m/s 넘게 부딪혀야 깨진다 → 미리 돌 2개 이상을 트롤 쪽으로 던져 출구 쪽으로 움직이는 중에 밀려야 한다
  //   (돌 0개 2.00 / 1개 2.29 / 2개 2.62 / 3개 3.02 m/s)
  iceTroll: {
    gateX: 4,              // 얼음문 = 왼쪽 호숫가 (m)
    gateBreakSpeed: 2.5,   // 얼음문을 깨는 속력 (m/s)
    ianX: 20, trollX: 32,  // 처음 위치 (m)
    trollMass: 100,
    pushForce: 200,        // 서로 미는 힘 (N)
    pushTime: 0.5,         // 미는 시간 (초)
    waitTime: 2,           // 처음 기다리는 시간 (초)
    chargeSpeed: 2,        // 트롤이 다가오는 속력 (m/s)
    skateAccel: 1,         // 돌에 맞아 느려지면 이만큼씩 속력을 되찾음 (m/s²)
    contact: 1.2,          // 이 거리(m)에서 멈춰 서서 민다
    slideTime: 1.5,        // 밀고 난 뒤 반동으로 미끄러지는 시간 (초), 그다음 발톱으로 멈춤
    digTime: 0.8,          // 멈춘 뒤 다시 달려들 때까지 (초)
    stone: { count: 3, mass: 10, throwSpeed: 2 },
  },

  // 1-4 광차 탑 (배경 06, 한 화면) — 승인대기 [12]
  // 에너지 보존: mgh + ½mv² = 일정. 범퍼: ½kx² = ½mv² → v = x√(k/m) = 10x
  //   6m 발판을 넘는 최소 출발 속력 √(2g×1m) ≈ 4.47 m/s (ACT1_PLAN) → 범퍼 0.40m(4.0)는 실패, 0.45m(4.5)부터 성공
  minecart: {
    cartMass: 100,         // 광차 질량 (kg)
    springK: 10000,        // 범퍼 용수철 상수 (N/m)
    compressStep: 0.05,    // 범퍼를 누르는 칸 (m)
    maxCompress: 0.5,      // 가장 많이 누를 수 있는 길이 (m) → 5 m/s
    startCompress: 0,
    cursedRefMass: 200,    // 저주: 이 질량보다 가벼우면 내리막에서 그만큼 덜 빨라진다 (100kg → 절반)
    clackEvery: 1.25,      // 레일 덜컹 소리 간격 (m) — 빠를수록 자주 들린다
    stopperX: 1760,        // 오른쪽 발판 끝 멈춤 막대 (px)
    circleX: 1.6,          // 진실의 원 (골짜기 바닥, m)
    garonX: 3.2,
    // 진실의 원 실험: 가벼운·무거운 광차를 같은 5m에서 → 바닥에서 둘 다 10 m/s (ACT1_PLAN)
    lab: { masses: [100, 200], height: 5 },
  },

  // 1-4 바위 굴리기 전투 (광차 탑 다음 방, 배경 06) — 승인대기 [13]
  // 높이 h0에서 놓은 바위가 높이 h에서 내는 속력 √(2g(h0 − h)), 크기와 상관없음.
  //   6 m/s 넘게 부딪혀야 부서짐 → 5m에서 굴리면 3.2m보다 낮은 골렘, 4m면 2.2m, 3m면 1.2m보다 낮은 골렘만 부서짐
  rockRoll: {
    rocks: [               // 굴릴 바위: 이름, 질량 (kg), 그림 (1-2 돌 그림)
      { label: '작은', mass: 10, image: 'stone_10kg' },
      { label: '큰', mass: 40, image: 'stone_40kg' },
    ],
    startHeight: 5,        // 처음 고른 굴릴 높이 (m, 1~5)
    rollCooldown: 1.0,     // 다음 바위까지 (초)
    breakSpeed: 6,         // 골렘이 부서지는 부딪힘 속력 (m/s)
    hitReach: 0.5,         // 바위와 골렘이 이만큼(m) 가까워지면 부딪힘
    golemCount: 4,         // 부숴야 하는 골렘 수
    maxAlive: 2,           // 한꺼번에 레일 위에 있는 골렘 수
    spawnEvery: 9,         // 골렘이 나오는 간격 (초)
    walkSpeed: 0.5,        // 골렘이 레일을 따라 걷는 속력 (m/s)
    retreatSpeed: 2,       // 주먹질 뒤 오른쪽 발판으로 물러나는 속력 (m/s)
    punchDamage: 0.2,
    cursedRefMass: 40,     // 저주: 이 질량보다 가벼운 바위는 내리막에서 그만큼 덜 빨라진다 (10kg → 4분의 1)
    ianX: 230, garonX: 110, // 왼쪽 발판 위 (px)
  },

  // 1-5 거친 돌바닥 (배경 07: 0~9.72m 얼음, 그 오른쪽 거친 돌바닥) — 승인대기 [15]
  // 범퍼 ½kx² = 수레 운동 에너지 → 돌바닥에서 마찰력 μmg = 200N으로 멈춤, 미끄러진 거리 = 에너지 ÷ 200N
  //   0.6m → 900J → 4.5m (열쇠 칸 3~4m를 다 지나감) / 0.5m → 625J → 3.13m (열쇠 칸에 25J만)
  roughFloor: {
    cartMass: 50,          // 돌 수레 질량 (kg)
    mu: 0.4,               // 거친 돌바닥 마찰 계수 → 마찰력 = 0.4 × 50 × 10 = 200N
    springK: 5000,         // 범퍼 용수철 상수 (N/m)
    compressStep: 0.1,     // 범퍼를 누르는 칸 (m)
    maxCompress: 0.6,      // 가장 많이 누를 수 있는 길이 (m)
    cellCount: 5,          // 돌바닥 틈 얼어붙은 웅덩이 수 (돌바닥 0~5m, 1m 칸마다 하나)
    keyCell: 3,            // 열쇠가 든 칸 (3~4m)
    meltHeat: 200,         // 한 칸의 얼음이 다 녹는 열 (J) — 수레가 1m 칸을 다 지나가면 200J
    holeScale: 0.5,        // 녹은 홈 그림 크기 (4단계 250px → 125px = 1칸)
    puddleY: 40,           // 웅덩이를 바닥선보다 이만큼 앞(아래)에 그린다 (px)
    pickReach: 0.8,        // 이 거리(m) 안에서 Z로 열쇠를 줍는다
    resetDelay: 1.8,       // 멈춘 수레를 가론이 처음 자리로 끌어 오기까지 (초)
    circleX: 17.4,         // 진실의 원 (m)
    ianX: 12, garonX: 10.8, // 가론은 이안 옆 돌바닥 (범퍼·수레를 가리지 않게)
    // 진실의 원 실험: 10kg 추가 2m 내려가며 물 0.1kg 속 날개를 돌림 → 200J, 한 번에 +0.48°C
    lab: { weightMass: 10, dropHeight: 2, waterMass: 0.1, startTemp: 4, dropSeconds: 2, dropsToRealize: 3 },
  },

  // 1-5 얼음 정령 전투 (거친 돌바닥 다음 방, 배경 07) — 승인대기 [17]
  // 공격: 속도 변화 = 힘 × 0.5초 ÷ 5kg (가론 80N → 8 m/s, 이안 20N → 2 m/s). 얼음 위 마찰 0 → 열 0
  // 돌바닥 μ 0.4 → 마찰력 20N, 멈출 때까지 생긴 열 = 운동 에너지 (가론에게 멈춘 상태로 맞으면 ½×5×8² = 160J)
  //   240J 쌓이면 다 녹음 → 가론 두 번 (160 + 160)
  iceSpirit: {
    padEnd: 2.0,           // 이안·가론이 서는 출발 돌바닥 0 ~ 이 위치 (m)
    heroes: {
      ian: { startX: 0.7, force: 20 },
      garon: { startX: 1.5, force: 80 },
    },
    contactTime: 0.5,      // 공격 때 힘을 주는 시간 (초)
    attackCooldown: 0.7,
    reach: 1.4,            // 공격이 닿는 거리 (m)
    spiritMass: 5,         // 얼음 정령 질량 (kg)
    mu: 0.4,               // 거친 돌바닥 마찰 계수 (1-5 거친 돌바닥과 같음)
    meltHeat: 240,         // 정령이 다 녹는 열 (J) — 60J마다 한 단계씩 4단계
    stageScale: [1, 0.85, 0.7, 0.55], // 녹은 단계마다 정령 크기 (그림 설명의 scale_rule 그대로) — 모든 동작에 같이 적용
    approachSpeed: 1.5,    // 떠서 다가오는 속력 (m/s)
    attackGap: 0.6,        // 돌바닥 끝에서 이만큼 떨어져 멈춰 공격 (m)
    attackReach: 1.6,      // 정령 공격이 닿는 거리 (m)
    attackInterval: 1.6,
    attackDamage: 0.1,
    restTime: 1.2,         // 미끄러져 멈춘 뒤 다시 떠오르기까지 (초)
    spiritCount: 3,
    spawnX: 17,            // 나타나는 곳 (m)
    spawnDelay: 1.5,
  },

  // 1-6 상인 광장 (배경 08, 폭 23.8m) — 승인대기 [19]
  merchantPlaza: {
    displayX: 12,          // 상인 진열대 (m)
    displayReach: 1.6,     // 진열대 앞 이 거리(m) 안에서 Z
    wheelX: 8.3, golemX: 16.2,
    circleX: 3.2,          // 진실의 원 (m)
    ianX: 5.2, garonX: 4.4,
    fastForward: 10,       // F를 누르는 동안 바퀴·골렘 시간 배수
    // 영원의 바퀴: 처음 6 rad/s, 마찰로 1초마다 0.05 rad/s씩 줄어 120초 뒤 멈춤 (관성 모멘트 20 → 회전 에너지 360J → 모두 열)
    wheel: { omega0: 6, alpha: 0.05, inertia: 20 },
    // 증기 골렘: 2초마다 일 100J, 연료 400J을 써서 나머지 300J은 김(버려지는 열) → 연료 4000J이면 10번 일하고 멈춤
    golem: { fuel: 4000, fuelPerWork: 400, workPerCycle: 100, workEvery: 2 },
  },

  // 1-6 상인 보스전 (상인 광장 다음 방, 배경 08) — 승인대기 [20]
  // 연료선이 끊긴 골렘: 1초마다 power만큼 에너지를 쓰고, 속력 = speed × √(남은 에너지 ÷ 처음 에너지)
  //   600J ÷ 60J/초 → 끊고 10초 뒤 멈춤 (5초 뒤엔 속력이 0.71배)
  merchantBoss: {
    merchantX: 20.5,       // 상인 (m), 연료통은 그 왼쪽 1.1m
    ianX: 5, garonX: 3.8,
    reach: 1.4,            // 이안이 연료선을 끊을 수 있는 거리 (m)
    attackCooldown: 0.5,
    golemCount: 3,         // 불러내는 골렘 수
    maxActive: 2,          // 한꺼번에 움직이는 골렘 수
    summonEvery: 6,        // 불러내는 간격 (초)
    golem: {
      energy: 600,         // 몸속 에너지 (J) — 연료선이 이어져 있으면 계속 이만큼으로 채워짐
      power: 60,           // 연료선이 끊기면 1초마다 쓰는 에너지 (J/s)
      speed: 0.8,          // 에너지가 가득할 때 걷는 속력 (m/s)
      punchReach: 1.1, punchEvery: 1.6, punchDamage: 0.06,
      steamEvery: 1.2,     // 김을 내뿜는 간격 (초, 느려지면 길어짐)
    },
  },

  // ================================================================ 2막 '번개의 탑' (ACT2_PLAN.md) — 계산 모듈(js/physics/act2/)이 쓰는 값  — 새로 정한 숫자는 승인됨(승인대기 [33])
  // 전기·자기 효과는 실제 단위를 화면에 내세우지 않는다(2-2만 실제 값 12V·6Ω·5A). 교사가 바꿀 수 있게 여기 한곳에 둔다.
  act2: {
    // 2-1 탑 1층 실험실 방 배치·연출 (보이는 값 — 물리 계산은 아래 electric)
    ch2_1: {
      ianX: 2.4, garonX: 1.6,     // 처음 위치 (m) — 탑 입구(0~2.4m) 바로 안쪽
      feather: { standX: 4.8, hangY: 300, thread: 154 }, // 깃털 받침대 (m), 매다는 곳 높이·실 길이 (px, 발 기준선에서) → 깃털은 바닥 위 146px = 막대 끝 높이
      rodTip: { dx: 16, dy: 146 },  // 문지른 뒤 손에 든 호박 막대 끝 (이안 기준점에서 px — charge_rub 그림에서 잰 값 ×0.3125)
      touchDist: 0.15,            // 막대 끝과 깃털이 이 거리(m) 안이면 "닿음"
      forceAccel: 260,            // 전기력 1(상대값)이 깃털에 주는 가속도 (px/s²) — 보이는 흔들림 크기
      swingDamp: 0.6,             // 깃털 흔들림이 잦아드는 정도 (1/s)
      touchKick: 3.2,             // 저주: 닿는 순간 깃털이 튕기는 각속도 (rad/s)
      circleX: 8.0,               // 진실의 원 = 탁자 위 진공 유리관 (m)
      tubeX: 999,                 // 진공 유리관 (px, 배경 JSON vacuum_tube_suggested 962 + 반폭 37)
      walkSpeed: 2.0,
      // 전기 언덕 퍼즐 (ACT2_PLAN 1단계 4번): 두 금속판 안쪽 면 사이 375px = 3m (배경 JSON)
      hill: {
        plateLeft: 1881, plateRight: 2275,   // 금속판 그림 왼쪽 위 x (px, JSON scene_placements)
        innerLeft: 1900, innerRight: 2275,   // 안쪽 면
        stoneAccel: 150,                     // 판 사이 힘 1(electric.plateForce)이 돌에 주는 가속도 (px/s²) — 가운데에서 판까지 약 1.6초
        padWidth: 56,                        // 판 바로 안쪽 발판 너비 (px)
        switchX: 1760,                       // 전위 스위치 — 큰 레버 (px, 왼쪽 판 앞, 이안이 양쪽에서 밀 자리를 두고, 총괄지시 2막리뷰 46번)
        reach: 0.8,                          // 스위치를 누를 수 있는 거리 (m)
        doorsX: [2490, 2590],                // 계단 입구의 문(번개 빗장) 2개 (px) — 왼쪽 발판 = 첫째 문, 오른쪽 발판 = 둘째 문
        exitX: 2620,                         // 두 문이 열린 뒤 이 x를 지나면 다음 방
      },
      // 불꽃 요정 전투 (ACT2_PLAN 1단계 5번) — 두 문이 열리면 계단에서 내려온다
      fairies: {
        waves: [['minus', 'plus'], ['minus', 'plus', 'minus']],  // 나오는 차례 (minus = − 요정, plus = + 요정)
        spawnX: 2380, flyY: 170,             // 나오는 곳 (px), 나는 높이 (바닥 위 px — 막대 끝 높이 146과 비슷하게)
        approach: 0.7,                       // 이안 쪽으로 다가오는 속력 (m/s)
        accel: 300,                          // 전기력 1(상대값)이 요정에게 주는 가속도 (px/s²)
        drag: 1.5,                           // 밀리거나 끌린 뒤 속도가 줄어드는 정도 (1/s)
        crashSpeed: 1.2,                     // 이 속력(m/s) 넘게 벽(금속판·계단 입구 벽)에 부딪히면 쓰러짐, 느리면 튕겨 돌아옴
        wallX: 2440,                         // 계단 입구 벽 (px) — 요정이 이보다 오른쪽으로 밀려나지 않는다
        holdDist: 0.35,                      // + 요정이 막대에 이 거리(m) 안으로 끌려오면 붙잡힘
        attackRange: 0.7, attackEvery: 1.6, damage: 0.08,   // 요정 공격: 거리 (m), 간격 (초), 체력 피해
        hitRange: 0.8, hitsCursed: 2,        // 저주 상태: 막대로 직접 때려야(X) 효과 — 닿는 거리 (m), 쓰러뜨리는 데 필요한 횟수
      },
    },
    // 2-2 탑 2층 등불의 방 배치·연출 (보이는 값 — 회로 계산은 아래 circuit)
    ch2_2: {
      ianX: 1.2, garonX: 0.6,       // 처음 위치 (m) — 1층에서 올라온 왼쪽 입구
      walkSpeed: 2.0,
      boardX: [510, 1010],          // 벽의 회로판 (px, JSON reserved) — 이 앞에서 Z로 회로판 화면
      lampRings: [[141, 167], [722, 134], [1140, 168], [1641, 135]], // 등불 고리 1~4 (JSON) — 1~3 = 회로판 칸 1~3, 4 = 계단 등불
      stairs: { x: 1690, exitX: 1600 }, // 나타나는 계단 (아래 가운데 px, 그림 1500~1880), 계단 아래(첫 단)에 닿으면 멈추고 어두워지는 x (총괄지시 63번)
      circleX: 10.2,                // 진실의 원 (m) — 회로판과 계단 사이
      dotSpeed: 90,                 // 전류 1A일 때 전류 점이 전선을 따라 흐르는 빠르기 (px/s, 전류에 비례)
      meters: { ampMax: 6, wattMax: 30 }, // 진실의 원 계기판 눈금 최대값 (전류계 A, 전력계 W)
      // 등불 빛 번짐 보이는 크기·진하기 (밝기 단계마다, 그림 위에 곱한다) — 직렬·병렬 차이가 눈에 띄게 (총괄지시 62번)
      lampGlow: { dim: { scale: 0.6, alpha: 0.5 }, normal: { scale: 1.0, alpha: 0.85 }, bright: { scale: 1.6, alpha: 1 } },
      // 번개 지팡이 전투 (ACT2_PLAN 2단계 7번): 피해·마력 소모는 전력에 비례 (직렬 12W = 1배, 병렬 48W = 4배 — circuit.staff)
      battle: {
        boltRange: 4.5,          // 번개가 닿는 거리 (m)
        fireEvery: 0.4,          // 쏘는 간격 (초)
        baseDamage: 1,           // 직렬 번개 한 방의 피해 (병렬은 × 4)
        manaMax: 100, baseMana: 4, manaRegen: 6,   // 마력: 최대, 직렬 한 방 소모(병렬은 × 4), 1초마다 회복
        heatPerShot: 7.5,        // 한 방마다 과열 게이지 (× 전력 배율 — 직렬 7.5, 병렬 30)
        heatCool: 15,            // 1초마다 식는 양
        overheatLock: 2.5,       // 게이지가 100이 되면 이만큼(초) 못 쏨
        enemyStartX: 1880,       // 적이 나오는 곳 (px, 계단 쪽)
        fairies: { count: 3, hp: 1, speed: 0.6, gap: 160 },    // 불꽃 요정 무리: 약함 — 직렬로 충분 (마력 아끼기)
        knight: { hp: 24, regen: 1.5, speed: 0.4 },            // 철갑 기사: 단단하고 갑옷이 스스로 회복(1초마다) — 병렬로 빨리
        attackRange: 1.0, attackEvery: 1.5, damage: 0.1,        // 적 공격: 거리 (m), 간격 (초), 체력 피해
      },
    },
    // 2-3 탑 3층 번개 문 배치·연출 (보이는 값 — 저장량 계산은 아래 capacitor)
    ch2_3: {
      ianX: 1.2, garonX: 0.6, walkSpeed: 2.0,
      boxSlots: { small_close: 300, small_wide: 430, large_close: 560, large_wide: 690 },  // 상자 4종이 처음 놓인 곳 (px)
      chargerX: 880,               // 충전대(번개 전지) (px) — 이 오른쪽 바닥에 상자를 놓으면 충전
      reach: 0.9,                  // 집기·놓기·문에 대기 거리 (m)
      door: { x: 1200, exitX: 1200 },   // 큰 철문 가운데 (px, JSON 1044~1356), 열린 뒤 들어가는 x
      slab: { x: 1762 },           // 터치 석판 가운데 (px, JSON 1700~1825)
      circleX: 16.8,               // 진실의 원 (m) — 석판 오른쪽 (철문·석판과 겹치지 않게, 총괄지시 2막리뷰 33번)
      // 차지 공격 전투 (ACT2_PLAN 3단계 7번): X를 누르고 있는 동안 상자(큰 판·좁은 간격)에 모으고, 떼면 한순간에 방출
      battle: {
        fullSeconds: 2,            // 가득 찰 때까지 (초) — 그동안 움직일 수 없다 (무방비)
        tapSeconds: 0.25,          // 이보다 짧게 누르면 보통 공격 (1막처럼)
        tapDamage: 0.5, tapRange: 1.2,
        fullDamage: 4,             // 가득 모아 방출한 피해 (피해 ∝ 모은 양)
        range: 5,                  // 방출 사거리 (m) — 앞쪽 가장 가까운 적
        catchAdd: 0.5,             // 모으는 자세로 요정의 번개를 받으면 상자에 더해지는 양 (가득 = 1)
        fairies: { waves: [2, 3], hp: 3, keepDist: 3.0, speed: 0.8, shootEvery: 3.0, boltSpeed: 4, damage: 0.12, flyY: 210 },
      },
    },
    fairyScale: 1.4,     // 불꽃 요정 그림 크기 (작아 보여서 키움 — 총괄지시 2막리뷰 35번)
    // 2-4 탑 4층 자석 금고 (ACT2_PLAN 4단계) — 물질별 반응은 magnetism
    ch2_4: {
      ianX: 0.8, garonX: 0.3, walkSpeed: 2.0,
      keys: { aluminum: 160, iron: 330, copper: 500 },   // 열쇠가 처음 흩어진 곳 (px, 계획서 x 0~900)
      keyScale: 2.0,               // 열쇠 그림(40px)이 작아 화면에서 2배 (총괄지시 2막리뷰 35번: 1.5 → 2)
      reach: 0.9,                  // 줍기·금고에 넣기 거리 (m)
      hook: { reach: 3.5, speed: 12, gap: 0.2 },   // 자석 갈고리: 앞으로 닿는 거리(m), 날아가는 빠르기(m/s), 열쇠 앞에 멈추는 거리(m, 자석과 열쇠 사이)
      vault: { x: 1200, left: 1012, top: 565 },    // 세 칸 금고 (JSON 1012~1388, 바닥 865), 칸 문 자리는 objects JSON
      circleX: 6.4,                // 진실의 원 (m) — 열쇠 흩어진 곳과 금고 사이
      graphite: { standX: 1530, plateX: 1440, scale: 1.5, restY: 12, floatY: -20, bob: 6, zoom: { x: 920, y: 330, scale: 3, seconds: 4 } },   // 자석 받침(동전 칸 자물쇠와 이어짐)·흑연판 처음 자리 (px). 받침 그림 왼쪽 위에서 판 왼쪽 위까지 세로: 얹힘 12(받침 윗면이 그림 23px 아래), 떠 있음 −20(그림 JSON). 둥실거림 (px). zoom: 뜨는 순간 확대 창(화면 가운데 x·y, 배율, 대사가 끝난 뒤 남는 초 — 총괄지시 65번)
      exitX: 2330,                 // 시험을 통과하면 이 오른쪽 끝으로 나가 5층
      // 자석 장갑 전투 (ACT2_PLAN 4단계 6번, 전투 공간 x 1600~2400): V 장갑으로 철갑 기사를 끌어와 창을 빼앗고(Z로 던짐), 구리 병사는 장갑이 안 통함 → X 지팡이 번개
      battle: {
        startX: 2300, gap: 170,     // 적이 나타나는 곳 (px)과 간격
        waves: [['knight', 'soldier'], ['soldier', 'knight', 'soldier']],
        staff: { damage: 0.5, every: 0.5, range: 4.5 },     // X 지팡이 번개: 피해, 쏘는 간격(초), 사거리(m)
        glove: { range: 4.0, dragSpeed: 6, stopDist: 1.0 }, // V 자석 장갑: 닿는 거리(m), 끌려오는 빠르기(m/s), 이만큼 앞에서 멈춤(m)
        spear: { damage: 4, speed: 14 },                    // 빼앗은 창 던지기 (Z): 피해, 날아가는 빠르기(m/s)
        knight: { hp: 8, speed: 0.5, attackRange: 1.2, attackEvery: 1.8, damage: 0.1, rearmSeconds: 3 },   // 철갑 기사 (창을 빼앗기면 공격 못 함, rearmSeconds초 뒤 등에서 예비 창을 꺼냄 — 총괄지시 58번)
        soldier: { hp: 4, speed: 0.7, attackRange: 1.1, attackEvery: 1.6, damage: 0.08 }, // 구리 갑옷 병사
      },
    },
    // 2-5 탑 5층 승강기와 석상의 방 (ACT2_PLAN 5단계) — 전동기·나침반 계산은 magnetism
    ch2_5: {
      ianX: 7.2, garonX: 9.4, walkSpeed: 2.0,   // 가론은 나침반을 가리지 않게 오른쪽에
      reach: 0.9,                  // 전동기·스위치·나침반 앞 거리 (m)
      elevator: { x: 356, left: 200, right: 512, topY: 4 },   // 승강기 통로 (px, 바닥 없음) — 이안은 통로 오른쪽 끝(minX)까지만. topY: 승강기 바닥 그림에서 윗면 줄(그림 위에서 px) — 타는 동안 발을 여기에 (총괄지시 67번)
      minX: 560,
      motorX: 640,                 // 전동기 (Z: 전류 켜기·끄기)
      switchX: 830,                // 방향 스위치 — 큰 레버 (Z: 전류 방향 바꾸기, 총괄지시 2막리뷰 46번)
      compassX: 950,               // 전선 옆 나침반 (레버를 양쪽에서 밀 자리를 두고 오른쪽으로)
      circleX: 12.4,               // 진실의 원 (m) — 전자석 함정과 석상 사이
      statueX: 1900,               // 침묵의 석상 (계획서 x 1750~2050)
      trapX: 1187,                 // 전자석 함정 (JSON 1000~1375, 바닥 865~915)
      start: { turns: 3, magnet: 'small', dir: -1 },   // 처음 끼워진 코일·자석(힘 3)과 전류 방향(−1 = 내려가는 쪽 — 방향도 찾아야 한다)
      lift: { top: 2.0, brake: 0.5 },
      trapRange: [1000, 1375],     // 전자석 함정 철판 (px) — 이 위에 선 철갑 기사만 붙잡힌다
      // 전자석 함정 전투 (ACT2_PLAN 5단계 6번): V 함정 켜기·끄기, Q 함정 전류 방향, X 지팡이 번개. 적은 오른쪽(석상 쪽)에서 온다
      battle: {
        ianX: 860, startX: 2000, gap: 170,   // 전투가 시작되면 이안은 함정 왼쪽(px)으로
        waves: [['knight', 'soldier'], ['knight', 'soldier', 'knight']],
        staff: { damage: 0.5, every: 0.5, range: 4.5 },
        knight: { hp: 6, speed: 0.5, attackRange: 1.2, attackEvery: 1.8, damage: 0.12 },   // 철갑 기사 (함정이 켜져 있으면 붙잡힘)
        soldier: { hp: 4, speed: 0.7, attackRange: 1.1, attackEvery: 1.6, damage: 0.08 }, // 구리 갑옷 병사 (안 잡힘)
      },
      ride: { exitHeight: 6 },     // 시험 뒤 승강기를 타고 이만큼(m) 올라가면 6층   // 승강기 시험: 바닥에서 이만큼(m) 올라가 멈춘다 / 전류를 끄면 이 빠르기(m/s)로 천천히 내려온다
    },
    // 2-6 탑 꼭대기 봉화대 (ACT2_PLAN 6단계) — 유도 계산은 induction
    ch2_6: {
      ianX: 2.4, garonX: 1.6, walkSpeed: 2.0,
      reach: 0.9,
      floorCoilX: 560,             // 바닥에 떨어진 코일과 작은 등불 (Z: 자석 흔들기)
      beaconFire: { seconds: 3, fadeSeconds: 1.5 }, // 봉화 불꽃 소리: 켜진 뒤 이만큼(초) 들리고 서서히 사라짐 (총괄지시 68번)
      waveSpeed: 1.0,              // 자석을 흔드는 빠르기 (m/s) — 유도 전류 = currentPerSpeed × 속력
      circleX: 8.4,                // 진실의 원 (m) — 바닥 코일과 코일 문 사이
      gateX: 1500,                 // 코일 문 (JSON 1312~1687, 바닥 865)
      beaconX: 2750,               // 봉화대 (JSON 2650~2850)
      golemX: 2450,                // 자석 골렘이 처음 서 있는 곳 (px)
      // 자석 골렘 보스전 (ACT2_PLAN 6단계 5번) — 돌진 속력·질량·통과 비율·봉화 기준은 induction
      boss: {
        minX: 820, maxX: 2550,     // 골렘이 다니는 범위 (px) — 봉화대 앞까지
        stopBefore: 2.5,           // 돌진은 이안 앞 이만큼(m)에서 멈춘다
        waitTime: 1.2,             // 돌진 뒤 쉬는 시간 (초)
        approachSpeed: 0.8,        // 같은 쪽에 있을 때 다가오는 빠르기 (m/s)
        punch: { range: 1.8, every: 2.2, damage: 0.15 },
        pull: { every: 7, range: 6, dist: 1.0 },   // 쇠붙이 끌어당기기: 간격(초), 거리(m), 끌려가는 거리(m)
        final: { fullSeconds: 2, range: 5 },       // 마지막 일격: 축전기 상자 가득 모으는 시간(초), 사거리(m)
        flickerRange: 3, flickerShare: 0.3,        // 골렘이 바닥 코일 이 거리(m) 안에서 움직이면 작은 등불이 깜빡 (유도 전류 = 속력 × 이 비율)
      },
      // 무선 전달 퍼즐 (ACT2_PLAN 6단계 6번) — 전달 정도 계산·기준은 induction.wireless
      wireless: {
        senderX: 2560, senderAngle: 90,    // 송신 코일: 봉화 옆, 처음엔 축이 세로
        receiverX: 300, receiverAngle: 0,  // 수신 코일: 옥상 왼쪽 끝(마을 쪽), 축이 가로
        turnStep: 45,                      // C 한 번에 돌아가는 각도
      },
      lab: { steps: [               // 진실의 원 실험: Space마다 한 단계 (속력 m/s, + 넣기 / − 빼기, 0 멈춤), 시간(초)
        { v: 0.5, t: 1.6, text: '천천히 넣는다' },
        { v: 0, t: 1.6, text: '코일 안에 그대로 둔다' },
        { v: -0.5, t: 1.6, text: '천천히 뺀다' },
        { v: 1.5, t: 0.55, text: '빨리 넣는다' },
        { v: -1.5, t: 0.55, text: '빨리 뺀다' },
      ] },
    },
    // 2-1 전기력·전기장 (electric.js)
    electric: {
      k: 0.9,              // 힘 = k × |전하 곱| ÷ 거리² (상대값). 거리 1m에서 0.9, 0.5m에서 3.6
      maxForce: 4,         // 너무 가까울 때 힘의 최댓값 (거리 0.47m 안쪽)
      range: 1.5,          // 이 거리(m) 밖에서는 힘을 0으로 본다 ("약 1.5m 밖에서는 거의 반응 없음")
      neutralAttract: 0.25, // 전하 없는(중성) 물체는 대전체에 아주 약하게 끌린다 (정전기 유도, 총괄지시 2번) — 같은 거리 힘의 이 배율
      rodCharge: -1,       // 털가죽으로 문지른 호박 막대 = − 전하
      rodFull: 1.0,        // 문질러 채운 전하량
      rodLossPerUse: 0.2,  // 한 번 쓸 때마다 줄어드는 전하
      rodLossPerSecond: 0.02, // 시간이 지나며 줄어드는 전하 (1초마다)
      plateForce: 1.0,     // 두 판 사이 대전된 돌이 받는 힘 (어디서나 같음, 상대값)
    },
    // 2-2 회로 (circuit.js) — 실제 값
    circuit: {
      voltage: 12,         // 전지 (V)
      lampOhm: 6,          // 등불 하나 (Ω)
      resistorOhm: 6,      // 저항 수정 (Ω)
      wireOhm: 0,          // 전선 조각 (Ω) — 0
      shortOhm: 0.01,      // 회로 전체 저항이 0이 되면(합선) 0으로 나누지 않도록 이 값으로 계산한다 (총괄지시 3번)
      breakAmp: 5,         // 전체 전류가 이 값을 넘으면 퓨즈가 끊어짐
      hotAmp: 4,           // 이 값 이상이면 끊어지기 전 경고로 달아오름
      brightW: { dim: 0, normal: 8, bright: 20 }, // 등불 하나의 전력(W): 0 초과 dim, 8 이상 normal, 20 이상 bright
      stairW: 48,          // 등불 전력 합이 이 값 이상 + 퓨즈가 안 끊어지면 계단이 열림
      staff: { voltage: 12, crystalOhm: 6 }, // 번개 지팡이: 저항 수정 2개 — 직렬 12Ω 1A 12W / 병렬 3Ω 4A 48W
    },
    // 2-3 축전기 (capacitor.js) — 모을 수 있는 양 ∝ 판 넓이 ÷ 간격 (그림 JSON plate_geometry의 판 너비·간격, px)
    capacitor: {
      boxes: {
        small_close: { plateWidth: 30, gap: 6 },   // 30 ÷ 6 = 5.0
        small_wide: { plateWidth: 30, gap: 30 },   // 1.0
        large_close: { plateWidth: 80, gap: 6 },   // 13.3
        large_wide: { plateWidth: 80, gap: 30 },   // 2.7
      },
      unit: 1,             // small_wide를 1로 둔 상대값
      fullSeconds: 2,      // 같은 전지에서 가득 찰 때까지 (초)
      doorNeed: 9,         // 철문이 열리는 기준 — large_close(13.3)만 넘고 다음(small_close 5.0)은 확실히 못 넘게 (총괄지시 2번: 둘의 가운데 9.2 → 9)
    },
    // 2-4·2-5 자성 (magnetism.js)
    magnetism: {
      materials: {          // kind: 강자성 ferro / 상자성 para / 반자성 dia, response: + 끌림 − 밀림 (상대 크기)
        iron: { kind: 'ferro', response: 1.0 },
        aluminum: { kind: 'para', response: 0.02 },
        copper: { kind: 'dia', response: -0.01 },
        graphite: { kind: 'dia', response: -0.015 },
      },
      exaggerate: 60,       // 아주 작은 반응(상자성·반자성)을 화면에 보이게 키우는 배율 (교사용 메뉴에서 조절)
      range: 1.2,           // 자석이 영향을 주는 거리 (m)
      motor: {
        turns: [3, 6, 12],  // 코일 감은 수
        magnets: { small: 1, medium: 2, large: 4 }, // 자석 세기
        need: 24,           // 승강기를 올리는 데 필요한 힘 (감은 수 × 자석 세기, 전류는 같음)
        max: 40,            // 이보다 힘이 크면 너무 빨라 천장에 부딪힌다 → 24 이상 40 이하만 성공 (총괄지시 2막리뷰 43번, 승인대기 [58])
        speedPerForce: 0.05, // 올라가는 빠르기 (m/s) = (힘 − 24) × 이 값
        minSpeed: 0.3,      // 올라갈 수 있으면 최소 이 빠르기는 보장 (힘이 정확히 24인 6×4·12×2도 천천히 올라감, 총괄지시 2번)
      },
    },
    // 2-6 전자기 유도 (induction.js)
    induction: {
      currentPerSpeed: 1.0, // 코일 속 자석이 움직일 때 유도 전류 = 이 값 × 속력 (멈추면 0, 넣을 때 +, 뺄 때 −)
      golemStartSpeed: 4,   // 자석 골렘 돌진 시작 속력 (m/s)
      golemMass: 300,       // 운동 에너지 계산용 질량 (kg, 상대값)
      passShare: 0.3,       // 코일 문을 통과할 때마다 운동 에너지의 이 비율을 봉화로 넘김
      beaconFull: 1500,     // 봉화가 켜지는 에너지 (J) — 4m/s 골렘(처음 2400J)이 3번 지나면 참 (720+504+353 = 1577J)
      wireless: { near: 3, need: 0.5 }, // 무선 전달 = 두 코일 축이 마주 보는 정도 × 1/(1+(거리÷near)²), need 넘으면 마을 등불
    },
  },

  // ================================================================ 3막 '빛의 심연' (ACT3_PLAN.md) — 계산 모듈(js/physics/act3/)이 쓰는 값
  // 3막은 화면에서 계산시키지 않는 정성적 내용이지만, 빛·전자·전차의 움직임은 아래 값으로 계산한다.
  act3: {
    ambience: ['amb_abyss_drip', 'amb_abyss_hum'], // 심연 장면 환경음 (음량은 sound_volumes.js)
    // 3-1 간섭: 스크린 벽 밝기 = 세기 × cos²(π × (y − y중심) ÷ 간격), 간격 = K ÷ 틈 간격
    interference: {
      centerY: 615,         // 스크린 가운데 y (px)
      K: 4000,              // 줄무늬 간격(px) × 틈 간격(px)
      slitGap: { gap_narrow: 20, gap_mid: 40, gap_wide: 60 }, // 틈 판별 틈 간격 (px, 그림 JSON) → 줄무늬 간격 200 / 100 / 67
      rune: { offset: -150, tolerance: 10 },   // 숨은 룬: 가운데에서 150px 위, 어두운 줄이 ±10px 안에 오면 보인다
      floorBand: { spacing: 150, darkDamage: 0.2 },  // 망령 두 마리의 빛이 바닥에 만드는 띠 간격 (px), 어두운 띠 안에서 받는 피해 비율
      wave: { wavelength: 60, speed: 90 },     // 물결 수조: 파장 (px), 물결 빠르기 (px/s) — 보이는 값
    },
    // 3-1 어두운 줄무늬의 벽: 방 배치 (px, 배경 JSON zones)·전투 (빛의 세기 규칙은 interference)
    ch3_1: {
      ianX: 2.2, garonX: 1.5, walkSpeed: 2.0, reach: 0.9, garonFollow: 1.4, cameraLeft: 130,
      sourceX: 360, sourceBeamY: 700, slitX: 730, screenX: 1930, tankX: 2200, wallTop: 365, exitX: 2330,
      lightColor: 0x7dff9a,          // 초록 빛 한 가지 색
      maxTorches: 2,                 // 광원 세기 단계: 저주 때 1, 해방 뒤 1 더 (총괄지시 70번)
      brightness: { cursed: [0.35, 0.85], freed: [0.45, 0.45, 1], flashSeconds: 0.5, zoomSeconds: 4.5, talkDelay: 1.5 },   // 단계별로 화면에 그리는 밝기 (보이는 값). 어두운 줄은 곱하기라 0으로 남는다
      lab: { sourceX: 130, sourceGap: 200, probeX: 880, oneSeconds: 2, bothSeconds: 4 },   // 물결 수조: 파원 자리·간격, 찌 자리 (px), 한쪽·양쪽을 보아야 하는 시간 (초)
      battle: {
        waves: [1, 2], hp: 3, floatY: 620, bob: 8,                 // 첫 무리는 하나로 따라 하게 (총괄지시 71번)
        speed: 0.5, keepDist: [4.0, 5.5], spawnAhead: 5, spawnGap: 1.6,   // m/s, m. 망령마다 거리를 달리해 겹치지 않게
        attackEvery: 3.2, chargeSeconds: 0.7, beamSeconds: 0.25,
        damage: 0.12, reflectDamage: 1,                            // 빛줄기 피해 (체력 1 기준), 튕겨 낸 빛줄기 피해
        staff: { damage: 0.25, every: 0.5, range: 5 },             // X 빛 공격: 피해, 쏘는 간격(초), 사거리(m)
      },
    },
    // 3-2 굴절·렌즈 (거리는 m)
    optics: {
      nWater: 1.33,
      keyDepth: 1.5,        // 금 열쇠 실제 깊이 (m)
      focal: 1,             // 볼록렌즈 초점거리 (m)
      railLength: 6,        // 렌즈 레일 길이 (m)
      stencilHeight: 1.2,   // 문양판 높이 (m)
      plateHeight: 0.4,     // 수정판 높이 (m) → 필요한 배율 1/3 이하
      sharpWindow: 0.05,    // 상 받는 판이 상 위치에서 이 거리(m) 안이면 선명
      blurRange: 0.5,       // 그보다 이 거리(m)만큼 더 멀어지면 완전히 흐림
      lensAttack: { extra: 3, width: 0.25 }, // 렌즈 공격 피해 배율 = 1 + extra × e^(−((d − 초점) ÷ width)²)
    },
    // 3-2 물웅덩이와 렌즈의 방: 방 배치 (px, 배경 JSON zones)·조작·전투 (빛의 규칙은 optics)
    ch3_2: {
      ianX: 2, garonX: 1.3, walkSpeed: 2.0, reach: 0.9, garonFollow: 1.4,
      keyX: 900, keyRestDepth: 1.32,      // 금 열쇠 x (px), 저주 때 바닥에 놓여 보이는 깊이 (m)
      grabTolerance: 0.15, handSpeed: 0.7, handMax: 1.6,   // 잡히는 깊이 오차 (m), 손 내리는 빠르기 (m/s), 손이 닿는 깊이 (m)
      circleX: 1325,
      railX: 1450, railEnd: 2200, lensStart: 1700, screenStart: 2050, plateY: 700,
      benchSlow: 0.12, benchFast: 1.0, benchSlowSeconds: 0.5, benchGap: 0.3,   // 렌즈·판 옮기는 빠르기: 처음 천천히 (m/s), 누르고 있으면 빠르게, 서로 떨어지는 거리 (m)
      benchView: { x: 460, y: 330, w: 420, h: 380, pxPerM: 400, blurPx: 34 },  // 상 받는 판 확대 창 (화면 px)
      doorX: 2305,
      lab: { turnSpeed: 30, slantAngle: 30, holdSeconds: 1 },   // 입사각 바꾸는 빠르기 (°/s), 비스듬함으로 치는 각도, 수직·비스듬히 각각 보아야 하는 시간 (초)
      battle: {
        waves: [2, 2], hp: 3, speed: 0.8, depthMid: 0.8, depthAmp: 0.55, depthRate: 0.9,   // 물고기: 실제 깊이 = 가운데 ± 폭 (m)
        lensDamage: 0.5, burnScale: 3, every: 0.5, aimSpeed: 0.9, lensHeight: 90,          // 렌즈 기본 피해, "초점에 딱" 배율, 쏘는 간격, 겨누는 빠르기 (m/s), 렌즈 높이 (px)
        hitX: 90, hitDepth: 0.2,                                                            // 맞는 범위: 가로 (px), 실제 깊이 차이 (m)
        damage: 0.1, biteRange: 90, biteDepth: 0.55, biteEvery: 2.5,                        // 물기
      },
    },
    // 3-3 점 찍기
    dots: {
      total: 3000,          // 그림이 드러나는 점 수
      startPerSecond: 40,   // 처음 1초에 찍는 점 수 (승인됨(승인대기 [72]): 4면 3,000점까지 2분 40초라 올림 → 약 26초)
      endPerSecond: 600,    // 마지막 1초에 찍는 점 수 (점점 빠르게)
      maxPerFrame: 12,      // 한 프레임에 찍는 점의 최대 수 (학교 PC·크롬북용)
      electronEnvelope: 0.6, // 전자 무늬의 넓은 봉우리 너비 (화면 반폭 대비)
      electronFringes: 7,    // 전자 무늬의 줄 촘촘한 정도 (보이는 값)
      cursedBandAt: 0.3, cursedBandWidth: 0.12, // 저주: 전자 띠 두 개의 자리·너비 (화면 반폭 대비)
    },
    // 3-3 너무 작은 룬 문자의 방: 방 배치 (px, 배경 JSON zones)·실험·전투 (점 찍기 규칙은 dots)
    ch3_3: {
      ianX: 1.5, garonX: 0.9, walkSpeed: 2.0, garonFollow: 1.4,
      wallTop: 400, tabletX: 600, plateX: 1350, apparatusX: 2000, circleX: 1680, exitX: 2330,
      tabletReach: 2.4, plateReach: 1.8, apparatusReach: 1.6,   // Z가 닿는 거리 (m)
      cursedGlow: 0.8, cursedGlowSeconds: 4,   // 저주: 그림 전체가 고르게 밝아지는 정도와 시간
      skipSpeed: 4, tickEvery: 0.12,           // Space를 누를 때 배속, 점 찍는 소리 간격 (초)
      electronView: { x: 460, y: 330, w: 400, h: 280, count: 500, perSecond: 90, holdSeconds: 1.5 },   // 전자 장치 작은 창 (화면 px), 쌓는 전자 수, 초당
      lab: {
        w: 400, h: 350, lightX: 520, elecX: 1400, skipSpeed: 4,
        light: { count: 1500, start: 20, end: 800 },     // 약한 빛: 점 수, 처음·마지막 초당
        electron: { count: 1200, start: 30, end: 600 },  // 전자
      },
      battle: {
        waves: [4, 5], hp: 1, damageDealt: 1, every: 0.45, speed: 0.7, spawnDist: 6, attackRange: 0.8,   // m/s, m
        damage: 0.08, attackEvery: 1.8, eyeHeight: 130,   // 물기 피해 (체력 1 기준), 간격 (초), 전자의 눈 원 중심 높이 (바닥에서 px)
      },
    },
    // 3-4 스펙트럼: 원소별 선 파장 (nm). 그리는 띠는 380~700 nm
    spectrum: {
      bandNm: [380, 700],
      lines: {
        hydrogen: [410, 434, 486, 656],
        sodium: [589.0, 589.6],
        neon: [585, 588, 594, 603, 607, 614, 617, 621, 626, 633, 638, 640, 650, 659, 667, 671, 693, 703],
        mercury: [405, 436, 546, 577, 579],
      },
      rydberg: 13.6,        // 수소 에너지 준위 = −13.6 ÷ n² (eV)
      hc: 1240,             // 파장(nm) = 1240 ÷ 에너지 차(eV)
      stairsLevels: [2, 3, 4, 5, 6], // 에너지 계단 5단의 n (아래부터)
      doorElement: 'mercury',        // 문 바코드 = 수은
      lampOrder: ['hydrogen', 'sodium', 'neon', 'mercury'], // 받침 4곳 등불 배치
    },
    // 3-4 바코드 등불의 방: 방 배치 (px, 배경 JSON zones)·실험·전투 (선 규칙은 spectrum)
    ch3_4: {
      ianX: 3.6, garonX: 3.0, walkSpeed: 2.0, reach: 0.9, garonFollow: 1.4,
      stairsX: 250, pedestals: [650, 950, 1250, 1550], doorPedestalX: 1790, doorX: 2050, barcodeY: 290,
      lookNeeded: 2,        // 저주: 등불을 이만큼 보면 진실의 원이 나타난다
      view: { x: 960, y: 490 },   // 분광 수정 화면 자리 (화면 px, 오른쪽 위 숫자판과 겹치지 않게)
      sealPanel: { x: 20, y: 560, w: 470, rowH: 44 },
      lab: {
        x: 170, y: 290, scale: 2,       // 계단 그림 자리·배율 (그림 위 공 자리는 그림 JSON ball_positions)
        ball: [[30, 215], [90, 95], [150, 50], [210, 28], [270, 15]],
        stripX: 900, stripY1: 330, stripY2: 560, stripW: 810, stripH: 110,
        upSeconds: 0.25, waitSeconds: 0.25, fallSeconds: 0.35,
      },
      battle: {
        waves: [['neon', 'hydrogen'], ['mercury', 'sodium']], hp: 3, floatY: 640, bob: 8,
        speed: 0.6, keepDist: 2.6, spawnAhead: 5, spawnGap: 1.6,   // m/s, m
        attackEvery: 3.4, damage: 0.1,                             // 정령의 공격
        scanRange: 7, sealRange: 6, sealRight: 2, sealWrong: 0.1,  // 분광 수정·봉인이 닿는 거리 (m), 맞는·틀린 봉인 피해
      },
    },
    // 3-5 다이오드 회로
    diode: {
      conduct: { metal: 'bright', silicon: 'dim', glass: 'off' }, // 재질별 시험기 밝기 (저주에서는 유리도 흐름)
      shieldWrongDamage: 2, // 다이오드 방패를 거꾸로 들었을 때 받는 피해 배율
    },
    // 3-5 수정 다리: 방 배치 (px, 배경 JSON zones)·전투 (회로 규칙은 diode)
    ch3_5: {
      ianX: 1.0, garonX: 0.5, walkSpeed: 2.0, garonFollow: 1.4,   // 시작 자리: 전도 시험기와 떨어뜨려 Z 안내가 겹치지 않게
      crystalX: 250, testerX: 360, circleX: 170, bridgeX: 400, bridgeEnd: 2600, exitX: 2860,
      tileCount: 18, ledCount: 17,   // 다리 판 수 (구간당 6장), LED 수 (1 m마다)
      plusY: 78, minusY: 6, symbolY: 100, diodeHeight: 150, diodeX: 2540,   // + 줄·− 줄·LED 기호·귀환선 높이 (바닥에서 px), 다이오드 자리 (px)
      flowSeconds: 2.2, fallSeconds: 2.2, flowLoopSpeed: 500,                // 저주: 역류가 다리를 지나는 시간, 무너지는 시간 / 해방: 반복 역류 빠르기 (px/s)
      lab: { holdSeconds: 1.5 },     // 순방향·역방향을 각각 보아야 하는 시간 (초)
      battle: {
        sequence: [1, 1, 1, -1, -1, 1, -1, 1],   // 저주 파동이 오는 쪽 (+1 오른쪽, −1 왼쪽)
        every: 2.4, speed: 3.5, waveHeight: 110, hitRange: 40, wizardDist: 7.5,   // 간격 (초), m/s, 파동 높이·맞는 거리 (px), 마법사 거리 (m)
        damage: 0.15,                            // 방패 없이 맞는 피해 (체력 1 기준). 거꾸로 들면 diode.shieldWrongDamage배
      },
    },
    // 3-6 상대론
    relativity: {
      beta: 0.76,           // 전차 속력 v ÷ c → γ ≈ 1.54, 시간·길이 비율 ≈ 0.65 (전차 수축 그림과 같음)
      arrowSpeed: 1600,     // 빛 화살 게임 속도 (px/s) = c
      hourglassSteps: 5,    // 모래시계 01 → 06 (5단계)
    },
    // 3-6 심연의 끝: 방 배치 (px, 배경 JSON zones)·실험 (상대론 값은 relativity)
    ch3_6: {
      ianX: 2.4, garonX: 1.7, walkSpeed: 2.0, garonFollow: 1.4,
      doorX: 2775, circleX: 900, chariotX: 1250,
      cursedChariotRatio: 1.3, raceSeconds: 1.8,   // 저주: 전차가 빛 화살의 이 배로 달아나 보인다 (보이는 값)
      glassSeconds: 5,                             // 모래시계가 01 → 06까지 흐르는 시간 (초)
      revealSeconds: 2.5,                          // 문 앞에서 고른 뒤 모래를 보여 주는 시간 (초)
      lab: { trackY: 455, startX: -260, endX: 2200, gateA: 420, gateB: 1500, restLength: 458, compareY: 750, seconds: 5 },   // A→B를 지나는 시간 (초), restLength: 멈췄을 때 전차 길이 (px)
    },
    // 최종 보스: 1·2단계 (진짜 법칙 고르기), 3단계 (전차 추격). 저주 문장은 data/boss_curses.js
    finalBoss: {
      sampleRate: 44100,
      ianX: 800, wizardDist: 7, arena: [600, 2400], walkSpeed: 2.0,
      answerSeconds: 8, stunSeconds: 4, retrySeconds: 1.2,   // 고르는 시간, 마법사가 멈추는 시간, 다음 저주까지 (초)
      wrongDamage: 0.2, hitsPerCurse: 3, fireEvery: 0.4,     // 틀렸을 때 피해 (체력 1 기준), 저주 하나당 맞힐 화살 수, 쏘는 간격 (초)
      view: { bannerX: 1000, bannerY: 125, bannerScale: 1.5, bannerTextW: 700, barY: 240, choiceY: 310, choiceDx: 470, choiceW: 880 },
      chase: { ianX: 300, chariotX: 1500, hitsNeeded: 3, fireEvery: 1.0, arrowHeight: 120, hitDist: 110, arrowStartX: -60, groundView: { x0: 120, x1: 1040, y: 250 } },
    },
    // 손에 드는 물건: 그림은 오브젝트 크기 그대로(1m = 125px). grip = 물건 그림 안에서 손 hand_point에 놓는 자리 (px)
    items: {
      film_shield: { name: '막 방패', object: 'film_shield', state: 'normal', icon: 'film_shield_icon', pose: 'hold_front', grip: [50, 50] },
      convex_lens: { name: '볼록렌즈', object: 'convex_lens_icon', state: 'default', icon: 'convex_lens_icon', pose: 'hold_front', grip: [48, 48] }, // 요청서 3a: 아이콘이 손에 드는 렌즈 (convex_lens는 받침대)
      light_eye: { name: '빛의 돋보기', object: 'light_eye', state: 'default', icon: 'light_eye_icon', pose: 'hold_eye', grip: [25, 25] },
      electron_eye: { name: '전자의 눈', object: 'electron_eye', state: 'default', icon: 'electron_eye_icon', pose: 'hold_eye', grip: [25, 25] },
      spectroscope: { name: '분광 수정', object: 'spectroscope', state: 'default', icon: 'spectroscope_icon', pose: 'hold_eye', grip: [25, 25] },
      diode_shield: { name: '다이오드 방패', object: 'diode_shield', state: 'normal', icon: 'diode_shield_icon', pose: 'hold_front', grip: [50, 50] },
      hourglass: { name: '모래시계', object: 'hourglass', state: '01', icon: 'hourglass_icon', pose: 'hold_front', grip: [30, 75] },
    },
  },
};
