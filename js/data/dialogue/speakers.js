// 대화에 나오는 인물: 이름, 글자음, 기본 표정, 표정 이름 → 초상화 파일
// 대사 파일에서는 아래 한글 표정 이름을 그대로 쓰면 된다. 예) { who: 'garon', face: '자신만만', text: '...' }
window.SPEAKERS = {
  ian: {
    name: '이안', blip: 'sfx_text_blip_ian', defaultFace: '기본',
    faces: { 기본: 'default', 놀람: 'surprised', 깨달음: 'realization', 고민: 'thinking' },
  },
  garon: {
    name: '가론', blip: 'sfx_text_blip_garon', defaultFace: '자신만만',
    faces: { 자신만만: 'confident', 당황: 'embarrassed', '크게 웃음': 'laugh', 시무룩: 'sulky' },
  },
  granny: {
    name: '스톤 할멈', blip: 'sfx_text_blip_granny', defaultFace: '온화한 미소',
    faces: { '온화한 미소': 'warm_smile', 진지함: 'thoughtful', 걱정: 'worried', '크게 웃음': 'laugh' },
  },
  wizard: {
    name: '뒤틀림의 마법사', blip: 'sfx_text_blip_wizard', defaultFace: '냉소',
    faces: { 냉소: 'sarcastic', 분노: 'angry', 당황: 'startled', '후회하는 미소': 'remorseful' },
  },
  silent_statue: {   // 2-5 침묵의 석상 (스피커를 끼우면 말한다)
    name: '침묵의 석상', blip: null, defaultFace: '말함',
    faces: { 침묵: 'silent', 말함: 'talk' },
  },
  // 마을 주민 (초상화가 없어 이름과 대사만 나온다)
  villager_farmer: { name: '농부', blip: null },
  villager_child: { name: '아이', blip: null },
  villager_fisher: { name: '어부', blip: null },
  villager_merchant: { name: '상인', blip: null },
  merchant: { name: '광장 상인', blip: null },
};
window.DIALOGUE = window.DIALOGUE || {};
