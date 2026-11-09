// 3-5 다이오드 회로 (ACT3_PLAN 0단계 6번·5단계). 값은 config.js 의 act3.diode
// 소자 방향 dir: ▶ 쪽이 + 줄을 향하면 'forward', 반대면 'reverse'. 소자는 순방향일 때만 전류를 흘린다
// 저주 상태: 방향과 상관없이 흐른다
window.Diode = {
  cfg() { return GAME_CONFIG.act3.diode; },

  flows(dir, { cursed = false } = {}) {
    return cursed || dir === 'forward';
  },

  // 수정이 뒤집히면 +·− 줄이 바뀌어 소자 방향도 반대가 된다
  flip(dir) { return dir === 'forward' ? 'reverse' : 'forward'; },

  // 병렬 회로: 가지마다 따로 판정한다. branches: 가지별 소자 방향 목록 [['forward'], ['reverse', 'forward'], …]
  // 한 가지 안의 소자는 직렬이라 전부 순방향이어야 흐른다. 반환: 가지별 전류 여부 [true, false, …]
  solve(branches, { cursed = false, crystalReversed = false } = {}) {
    return branches.map((devs) => devs.every((d) => this.flows(crystalReversed ? this.flip(d) : d, { cursed })));
  },

  allOn(branches, opts) {
    return this.solve(branches, opts).every(Boolean);
  },

  // 재질별 전도 시험기 밝기: 'bright' / 'dim' / 'off'. 저주 상태에서는 유리도 전기가 흐른다
  conduct(material, { cursed = false } = {}) {
    const c = this.cfg().conduct[material];
    return cursed && c === 'off' ? 'bright' : c;
  },

  // 귀환선 역류: 저주 마력은 귀환선을 거꾸로 흐른다. 귀환선의 다이오드가 그 방향에 대해 역방향이어야 막힌다.
  // diode: 끼운 방향 (null = 아직 없음). 저주 상태에서는 막을 수 없다
  backflow(diode, { cursed = false } = {}) {
    return cursed || diode !== 'reverse';
  },

  // 다이오드 방패: 파동의 진행 방향(flow)과 ▶ 방향(arrow)이 같으면(+1, −1) 그대로 통과 → 피해 2배, 반대면 막는다
  shieldHit(arrow, flow) {
    return arrow === flow
      ? { blocked: false, damageScale: this.cfg().shieldWrongDamage, state: 'pass' }
      : { blocked: true, damageScale: 0, state: 'block' };
  },
};
