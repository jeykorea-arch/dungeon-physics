// 3-6 심연의 끝 + 최종 보스 대사 (ACT3_PLAN 6단계)
// 한 줄 = { who: 인물, face: 표정, text: 대사 }   (인물·표정 이름은 speakers.js)
// 마법사 "빛보다 빨리 달리면…"은 ACT3_PLAN 문장. 나머지는 Claude Code가 씀 — 승인됨(승인대기 [75])
DIALOGUE.Ch3_6 = {
  end_arrive: [
    { text: '심연의 끝. 저 안쪽에 커다란 모래시계 문이 있고, 그 앞에 마법 전차를 탄 마법사가 기다리고 있다.' },
    { who: 'wizard', face: '냉소', text: '빛보다 빨리 달리면 아무도 날 볼 수 없지!' },
    { who: 'ian', face: '고민', text: '정말 빛보다 빠를 수 있을까? 빛 화살을 쏘아 보자(Z).' },
  ],
  race_cursed: [
    { who: 'wizard', face: '냉소', text: '봤지? 네 빛 화살도 내 전차를 못 따라온다!' },
    { who: 'garon', face: '당황', text: '빛보다 빠르다고? 그럼 시간은? 땅과 전차에 모래시계를 하나씩 두고 비교해 보자!' },
  ],
  glass_cursed: [
    { who: 'garon', face: '자신만만', text: '거봐, 똑같이 흘렀네. 시간은 누구에게나 똑같은 거야.' },
    { who: 'ian', face: '고민', text: '저주 속에서는 그렇게 보여. 진짜는 어떨까?' },
  ],
  circle_found: [
    { who: 'ian', face: '놀람', text: '저쪽 바닥에 진실의 원이 빛나! 저기서 모래시계 두 개를 제대로 비교해 보자.' },
  ],
  lab_start: [
    { who: 'ian', face: '고민', text: '똑같은 모래시계를 하나는 땅에 두고, 하나는 지나가는 전차에 싣자.' },
  ],
  realize: [
    { who: 'ian', face: '깨달음', text: '빛의 속력은 전차 위에서 재도 땅에서 재도 똑같이 c야!' },
    { who: 'ian', face: '깨달음', text: '그래서 땅에서 보면 지나가는 전차의 시간이 느리게 가고, 길이도 진행 방향으로 짧아져. 빛보다 빨리 달릴 수는 없어!' },
  ],
  after_free: [
    { who: 'wizard', face: '당황', text: '내 전차의 비밀을 알아내다니… 이 문 너머에서 끝장을 내 주마!' },
    { who: 'ian', face: '기본', text: '문 홈에는 모래시계를 끼워야 해. 땅에 있던 것과 전차에 실렸던 것, 어느 쪽이 맞을지 생각해 보자.' },
  ],
  door_open: [
    { who: 'ian', face: '기본', text: '땅에 멈춰 있던 모래시계가 맞았어. 땅에서 보면 지나가는 전차의 시간이 느리게 가서 전차의 모래시계는 덜 흘렀으니까.' },
  ],
};

DIALOGUE.FinalBoss = {
  phase1_start: [
    { who: 'wizard', face: '분노', text: '여기까지 오다니. 네가 되찾은 법칙들을 도로 비틀어 주마!' },
    { who: 'ian', face: '기본', text: '저주가 걸리면 진짜 법칙을 골라(1·2) 깨고, 마법사가 멈춘 틈에 빛 화살을 쏘자(X)!' },
  ],
  phase1_end: [
    { who: 'wizard', face: '당황', text: '역학의 저주가 모두 깨졌다고? 그렇다면 탑의 저주다!' },
  ],
  phase2_start: [
    { who: 'garon', face: '자신만만', text: '이건 번개의 탑에서 다 겪은 거야! 침착하게 고르자!' },
  ],
  phase2_end: [
    { who: 'wizard', face: '당황', text: '이럴 수가… 하지만 내 전차는 아무도 못 잡아!' },
  ],
  phase3_start: [
    { who: 'wizard', face: '냉소', text: '빛에 가까운 속력이다! 따라와 보시지!' },
    { who: 'ian', face: '기본', text: '빛의 속력은 누구에게나 c야. 전차가 아무리 빨라도 빛 화살은 따라잡아!' },
  ],
  phase3_end: [
    { who: 'wizard', face: '후회하는 미소', text: '…졌다. 네 화살은 정말로 빛의 속력이었구나.' },
  ],
};
