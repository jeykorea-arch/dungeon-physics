// 2막 조작 키 (ACT2_PLAN 0단계 8번). 1막 배치를 그대로 두고 새 동작만 비어 있는 키에 더한다.
//   1막: ← → 걷기 · Z 실험·줍기·상호작용 · X 공격 · Space 결정·대사 넘기기 · Tab 이안/가론 · R 다시 · T 결과판 · M 마법서
//   2막 새 동작:
//     C  문지르기 (호박 막대를 털가죽에, 2-1)
//     V  자석 갈고리·자석 장갑으로 당기기 (2-4, 2-6 골렘의 쇠붙이 끌기와 짝)
//     X  누르고 있으면 축전기 상자에 모으기 → 떼면 쏘기 (2-3, 1막 X 공격과 같은 키 — 짧게 누르면 보통 공격)
//     Q  번개 지팡이 직렬/병렬 바꾸기 (2-2)
//   회로판·코일·스피커 부품처럼 퍼즐 화면의 부품은 마우스로 끌어다 놓는다.
window.ACT2_KEYS = {
  rub: { key: 'C', label: 'C 문지르기' },
  pull: { key: 'V', label: 'V 자석으로 당기기' },
  charge: { key: 'X', label: 'X 누르기: 상자에 모으기 → 떼면 쏘기' },
  staffMode: { key: 'Q', label: 'Q 지팡이 직렬/병렬' },
  // 장면마다 화면 오른쪽 아래 도움말: Act2Help('rub', 'pull') → 1막 공통 키 앞에 붙인다
};
window.Act2Help = (...ids) => {
  const extra = ids.map((id) => (ACT2_KEYS[id] || {}).label).filter(Boolean);
  return ['← → 걷기', ...extra, 'M 마법서'].join('   ');
};
