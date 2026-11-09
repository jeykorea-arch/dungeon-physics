// 3-3 너무 작은 룬 문자의 방 대사 (ACT3_PLAN 3단계)
// 한 줄 = { who: 인물, face: 표정, text: 대사 }   (인물·표정 이름은 speakers.js)
// Claude Code가 씀 — 승인됨(승인대기 [72])
DIALOGUE.Ch3_3 = {
  duality_arrive: [
    { text: '구리 관이 얽힌 방이다. 작은 룬이 빽빽한 석판과 넓은 감광판, 그리고 전자 실험 장치가 놓여 있다.' },
    { who: 'ian', face: '고민', text: '룬이 너무 작아. 빛의 돋보기(1)를 들고 석판 앞에서 Z를 눌러 보자.' },
  ],
  tablet_blur: [
    { who: 'ian', face: '고민', text: '돋보기로 봐도 작은 룬은 흐릿해. 감광판과 전자 장치도 살펴보자.' },
  ],
  plate_cursed: [
    { who: 'garon', face: '자신만만', text: '봐, 빛은 파동이니까 그림 전체가 고르게 스르르 밝아지는 거야. 알갱이 같은 건 없어!' },
  ],
  electron_cursed: [
    { who: 'garon', face: '자신만만', text: '전자는 알갱이니까 두 틈 뒤에 띠 두 개로만 쌓이지. 줄무늬가 생길 리 없어!' },
  ],
  circle_found: [
    { who: 'ian', face: '놀람', text: '감광판과 전자 장치 사이 바닥에 진실의 원이 빛나! 빛과 전자를 하나씩 보내 보자.' },
  ],
  lab_start: [
    { who: 'ian', face: '고민', text: '빛을 아주 약하게, 전자를 하나씩 보내면 어떻게 쌓일까?' },
  ],
  realize: [
    { who: 'ian', face: '깨달음', text: '약한 빛은 한 점씩 찍히고, 전자는 쌓이면 간섭무늬를 만들어!' },
    { who: 'ian', face: '깨달음', text: '빛도 전자도 파동성과 입자성을 모두 가진 거야. 전자의 파동을 쓰면 더 작은 것도 볼 수 있어!' },
  ],
  after_free: [
    { who: 'garon', face: '당황', text: '전자가 줄무늬를 만들다니… 그럼 이 장치도 쓸 수 있는 거야?' },
    { who: 'ian', face: '기본', text: '전자의 눈이야. 전자의 물질파는 파장이 빛보다 훨씬 짧으니까, 이걸로 석판을 보면 작은 룬도 읽힐 거야.' },
  ],
  rune_read: [
    { who: 'ian', face: '놀람', text: '또렷하게 읽혀! "빛 알갱이를 모으면 길이 드러난다"고 적혀 있어. 감광판에 빛을 모아 보자.' },
  ],
  plate_done: [
    { who: 'granny', text: '수고했구나. 디지털 카메라의 센서도 이렇게 빛 알갱이를 하나하나 세어 사진을 만든단다.' },
    { who: 'garon', face: '당황', text: '할멈 목소리? 그런데 뭔가 발밑에서 사각거리는데…' },
  ],
  battle_start: [
    { who: 'ian', face: '놀람', text: '그림자 벌레야! 너무 작아서 빛으로는 안 보여. 전자의 눈(2)을 켜자.' },
    { who: 'ian', face: '기본', text: '시야는 좁아지지만 원 안의 벌레는 보이고 맞힐 수 있어(X).' },
  ],
  battle_done: [
    { who: 'ian', face: '기본', text: '벌레들이 모두 사라졌어. 마법서의 장이 빛나고 있어.' },
  ],
};
