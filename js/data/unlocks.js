// 해금 카드 (장 번호별): 저주가 풀리면 화면 위에 잠시 나타난다
// { title: 카드 제목, description: 설명, icon: 아이콘 그림 (ui/icon_weapon, ui/icon_health, ui/icon_mana),
//   seconds: 보여 주는 시간(초) }
window.UNLOCKS = {
  '12': {   // Claude Code가 씀 — 승인됨(승인대기 [51])
    title: '전자기 유도',
    description: '코일을 지나는 자기장이 변할 때만 전류가 생긴다. 자석이 멈춰 있으면 코일 안에 있어도 전류가 없고, 빨리 움직일수록 전류가 크다. 넣을 때와 뺄 때 전류 방향은 반대다.',
    icon: 'ui/icon_mana',
    seconds: 6,
  },
  '11': {   // Claude Code가 씀 — 승인됨(승인대기 [47])
    title: '전류의 자기 작용',
    description: '전류가 흐르는 도선 둘레에는 도선을 빙 둘러싸는 자기장이 생겨 나침반 바늘이 그 방향으로 선다. 전류 방향을 바꾸면 자기장도 반대가 된다.',   // 총괄지시 66번
    icon: 'ui/icon_mana',
    seconds: 6,
  },
  '18': {   // Claude Code가 씀 — 승인됨(승인대기 [75])
    title: '특수 상대성 이론',
    description: '빛의 속력은 누구에게나 같다. 그래서 땅에서 보면 빠르게 지나가는 전차의 시간은 느리게 가고, 길이는 진행 방향으로 짧아진다. 전차에서 보면 반대로 땅의 시계가 느리게 간다.',
    icon: 'ui/icon_weapon',
    seconds: 6,
  },
  '17': {   // Claude Code가 씀 — 승인됨(승인대기 [74])
    title: '에너지띠와 다이오드',
    description: '도체·반도체·부도체는 에너지띠가 달라 전기가 흐르는 정도가 다르다. p형과 n형 반도체를 붙인 다이오드는 전류를 한 방향으로만 흐르게 한다.',
    icon: 'ui/icon_weapon',
    seconds: 6,
  },
  '16': {   // Claude Code가 씀 — 승인됨(승인대기 [73])
    title: '선스펙트럼과 에너지 준위',
    description: '원자의 에너지 준위는 띄엄띄엄 정해져 있다. 원자는 준위 차이에 해당하는 빛만 내므로, 원소마다 정해진 색의 선만 나타난다. 선은 원소의 지문과 같다.',
    icon: 'ui/icon_weapon',
    seconds: 6,
  },
  '15': {   // Claude Code가 씀 — 승인됨(승인대기 [72])
    title: '빛과 물질의 이중성',
    description: '빛과 물질은 파동성과 입자성을 모두 가진다. 약한 빛은 한 점씩 찍히고, 전자는 쌓이면 간섭무늬를 만든다. 전자의 물질파는 파장이 빛보다 훨씬 짧아 더 작은 것을 볼 수 있다.',
    icon: 'ui/icon_weapon',
    seconds: 6,
  },
  '14': {   // Claude Code가 씀 — 승인됨(승인대기 [71])
    title: '빛의 굴절과 렌즈',
    description: '빛은 경계에서 꺾여 물속 물체가 얕게 보인다. 볼록렌즈는 초점 밖 물체의 거꾸로 선 상을 맺고, 초점 안 물체는 크게 보인다(돋보기).',
    icon: 'ui/icon_weapon',
    seconds: 6,
  },
  '13': {   // Claude Code가 씀 — 승인됨(승인대기 [70])
    title: '빛의 간섭',
    description: '빛은 파동이라 겹치면 간섭한다. 마루와 마루가 만나면 밝아지고, 마루와 골이 만나면 어두워진다. 광원을 더 세게 해도 어두운 줄은 어둡다. 두 틈의 간격이 좁을수록 줄무늬 간격은 넓어진다.',
    icon: 'ui/icon_weapon',
    seconds: 6,
  },
  '10': {   // Claude Code가 씀 — 승인됨(승인대기 [44])
    title: '물질의 자성',
    description: '철은 자석에 강하게 끌린다(강자성). 알루미늄은 아주 약하게 끌리고(상자성), 구리·흑연은 아주 약하게 밀려난다(반자성). 자석 갈고리로 끌어올 수 있는 것은 철뿐이다.',
    icon: 'ui/icon_weapon',
    seconds: 6,
  },
  '01': {
    title: '돌림힘의 법칙',
    description: '받침점에서 멀수록 같은 힘도 더 크게 돌린다. 바위를 시소 끝 멀리 떨어뜨릴수록 반대쪽 적이 더 멀리 튕겨 나간다.',
    icon: 'ui/icon_weapon',
    seconds: 6,
  },
  '02': {
    title: '관성의 법칙',
    description: '얼음 위에서는 한 번 밀린 것이 멈추지 않는다. (이 게임의 얼음은 마찰이 없다고 본다. 실제 얼음은 마찰이 아주 작다.)',
    icon: 'ui/icon_weapon',
    seconds: 6,
  },
  // 03~06: 총괄지시 수정목록 12번 문구 그대로 (아이콘은 Claude Code가 고름: 던지기는 무기, 에너지 법칙은 마력)
  '03': {
    title: '작용·반작용의 법칙',
    description: '밀면 똑같은 크기로 되밀린다. 물건을 던지면 그 반동으로 내가 반대쪽으로 움직인다.',
    icon: 'ui/icon_weapon',
    seconds: 6,
  },
  '04': {
    title: '역학적 에너지 보존',
    description: '위치 에너지와 운동 에너지의 합은 그대로다. 같은 높이에서 내려오면 무게와 상관없이 같은 속력이 된다.',
    icon: 'ui/icon_mana',
    seconds: 6,
  },
  '05': {
    title: '에너지는 사라지지 않는다',
    description: '마찰로 줄어든 에너지는 열이 된다. 거친 바닥 위로 미끄러뜨리면 얼음 정령도 녹는다.',
    icon: 'ui/icon_mana',
    seconds: 6,
  },
  '06': {
    title: '영원히 도는 기계는 없다',
    description: '에너지를 받지 않으면 어떤 기계도 결국 멈춘다. 열을 모두 일로 바꾸는 기계도 없다.',
    icon: 'ui/icon_mana',
    seconds: 6,
  },
  // ---- 2막 (Claude Code가 씀 — 승인됨(승인대기 [35]))
  '09': {   // Claude Code가 씀 — 승인됨(승인대기 [42])
    title: '축전기',
    description: '축전기는 두 판에 +, − 전하를 나누어 모아 전기 에너지를 저장한다. 판이 넓고 간격이 좁을수록 같은 전압에서 더 많이 저장하고, 연결을 떼어도 남아 한꺼번에 내보낼 수 있다.',
    icon: 'ui/icon_mana',
    seconds: 6,
  },
  '08': {   // Claude Code가 씀 — 승인됨(승인대기 [39])
    title: '전류와 전력',
    description: '전류 = 전압 ÷ 저항, 전력 = 전압 × 전류. 번개 지팡이의 저항 수정을 병렬로 바꾸면 전력이 4배인 굵은 번개가 나간다.',
    icon: 'ui/icon_weapon',
    seconds: 6,
  },
  '07': {
    title: '전기력과 전기장',
    description: '전하는 떨어져 있어도 힘을 준다. 문지른 막대를 가까이 대면, 같은 전하는 닿기 전에 밀려나고 다른 전하는 끌려온다.',
    icon: 'ui/icon_weapon',
    seconds: 6,
  },
};
