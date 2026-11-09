// 3-5 수정 다리 대사 (ACT3_PLAN 5단계)
// 한 줄 = { who: 인물, face: 표정, text: 대사 }   (인물·표정 이름은 speakers.js)
// Claude Code가 씀 — 승인됨(승인대기 [74])
DIALOGUE.Ch3_5 = {
  bridge_arrive: [
    { text: '끝이 보이지 않는 낭떠러지 위로 수정 다리가 놓여 있다. 금속, 유리, 규소 수정 판이 차례로 이어지고, 난간에는 LED가 줄지어 있다.' },
    { who: 'ian', face: '고민', text: '다리 판이 재질마다 달라. 전도 시험기로 전기가 얼마나 흐르는지 시험해 보자(Z).' },
  ],
  test_cursed: [
    { who: 'garon', face: '자신만만', text: '봐, 유리든 금속이든 똑같이 환해! 전기는 어떤 물질이든 어느 방향이든 똑같이 흐르는 거야.' },
  ],
  power_cursed: [
    { who: 'garon', face: '자신만만', text: 'LED도 방향 상관없이 전부 켜졌잖아. 이제 건너기만 하면…' },
    { who: 'ian', face: '놀람', text: '잠깐, 다리 끝에서 뭔가 거꾸로 흘러 들어와!' },
  ],
  collapse: [
    { who: 'wizard', face: '냉소', text: '어느 방향이든 똑같이 흐른다면, 내 저주도 그 길로 들어갈 수 있지.' },
    { who: 'ian', face: '고민', text: '일방통행 문이 없어서 저주 마력이 역류했어. 전기가 정말 어느 방향으로든 흐르는 걸까?' },
  ],
  circle_found: [
    { who: 'ian', face: '놀람', text: '마력 수정 앞 바닥에 진실의 원이 빛나! 규소 수정을 살펴보자.' },
  ],
  lab_start: [
    { who: 'ian', face: '고민', text: 'p형과 n형 규소 수정을 붙여 전지에 이어 보자. 전지를 뒤집으면 어떻게 될까?' },
  ],
  realize: [
    { who: 'ian', face: '깨달음', text: '전기는 아무 데나 똑같이 흐르지 않아! 금속·규소·유리는 에너지띠가 달라서 흐르는 정도가 달라.' },
    { who: 'ian', face: '깨달음', text: 'p-n 접합은 전류를 한 방향으로만 흘려. 다이오드가 바로 일방통행 문이야!' },
  ],
  after_free: [
    { who: 'garon', face: '당황', text: 'LED가 반쯤 꺼졌어! 다리도 아직 흔들리는데.' },
    { who: 'ian', face: '기본', text: 'LED는 삼각형 쪽이 + 줄, 막대 쪽이 − 줄을 향할 때만 켜져. 꺼진 것을 돌려서 모두 켜고, 다리 끝 귀환선에 다이오드를 끼워 역류를 막자.' },
  ],
  bridge_solid: [
    { who: 'ian', face: '깨달음', text: 'LED가 모두 켜지고 역류도 막혔어! 다이오드가 저주 마력을 못 넘어오게 했어.' },
    { who: 'garon', face: '자신만만', text: '다리가 단단해졌다! 어, 저기 저 사람은…?' },
  ],
  battle_start: [
    { who: 'wizard', face: '분노', text: '내 길을 막았겠다? 그럼 직접 쏘아 주지!' },
    { who: 'ian', face: '기본', text: '다이오드 방패(1)로 막자. ▶ 방향이 파동과 반대여야 막혀. 거꾸로면 순방향이라 그대로 통과해!' },
  ],
  battle_done: [
    { who: 'wizard', face: '당황', text: '방향을 맞춰 막아 내다니… 심연의 끝에서 보자!' },
    { who: 'ian', face: '기본', text: '사라졌어. 마법서의 장이 빛나고 있어.' },
  ],
};
