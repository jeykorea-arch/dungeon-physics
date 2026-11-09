// 1-6 상인 광장 대사
// 한 줄 = { who: 인물, face: 표정, text: 대사 }   (인물·표정 이름은 speakers.js)
// ACT1_PLAN에 문장이 없어 Claude Code가 쓴 대사 — 승인됨(승인대기 [19])
DIALOGUE.Ch1_6 = {
  // 시작 (저주 상태)
  intro: [
    { who: 'merchant', text: '자, 구경들 하시오! 한 번 돌리면 영원히 도는 바퀴, 연료 없이 일하는 골렘이오!' },
    { who: 'garon', face: '크게 웃음', text: '영원히 돈다고? 하나 사면 평생 편하겠는데!' },
    { who: 'ian', face: '고민', text: '정말 그럴까… 저기 광장 왼쪽에 진실의 원이 있어.' },
  ],
  lab_start: [
    { who: 'ian', face: '고민', text: '바퀴를 오래오래 지켜보면 알 수 있을 거야. 시간을 빨리 감아 보자.' },
  ],
  realize: [
    { who: 'ian', face: '깨달음', text: '바퀴는 마찰 때문에 조금씩 느려지다 결국 멈춰. 회전 에너지가 열로 빠져나간 거야.' },
    { who: 'ian', face: '깨달음', text: '에너지를 받지 않고 영원히 움직이는 기계는 없어!' },
  ],
  after_free: [
    { who: 'garon', face: '당황', text: '골렘도 일할 때마다 김을 내뿜고 연료를 먹는구나…' },
  ],
  quiz_start: [
    { who: 'merchant', text: '흥, 내 물건이 가짜라고? 어디 하나하나 따져 보시지!' },
  ],
  quiz_done: [
    { who: 'merchant', text: '이, 이럴 수가! 다 들통나다니…' },
    { who: 'ian', face: '기본', text: '기계는 받은 에너지만큼만 일할 수 있어요. 그리고 열의 일부는 꼭 버려지고요.' },
  ],
  // 보스전 시작
  boss_intro: [
    { who: 'merchant', text: '감히 내 장사를 망쳐? 내 골렘들은 연료통이 있는 한 절대 안 멈춘다고!' },
    { who: 'ian', face: '고민', text: '연료통이 있는 한…? 그럼 연료선을 끊으면 돼!' },
  ],
  // 골렘이 모두 멈춘 뒤 — 마법사 단서
  boss_defeat: [
    { who: 'merchant', text: '아이고, 다 멈췄잖아! 영원히 움직인다는 건… 그 마법사가 가르쳐 준 거짓말이었어.' },
    { who: 'merchant', text: '마법사? 마법서를 찢고 북쪽 탑으로 올라갔지. 거기서 더 큰 저주를 준비한다더군.' },
    { who: 'garon', face: '자신만만', text: '탑이라… 다음 갈 곳은 정해졌네.' },
  ],

  // ---- 방에 처음 들어올 때 (Claude Code가 씀 — 승인됨(승인대기 [21]))
  boss_arrive: [
    { text: '거짓말이 들통난 상인이 연료통 옆으로 물러나더니 증기 골렘들을 불러낸다.' },
  ],
};
