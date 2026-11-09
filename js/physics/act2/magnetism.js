// 2-4·2-5 자성 계산 (ACT2_PLAN 4·5단계). 값은 config.js 의 act2.magnetism
//   2-4 물질별 반응: 철(강자성) 강하게 끌림 / 알루미늄(상자성) 아주 약하게 끌림 / 구리·흑연(반자성) 아주 약하게 밀림
//   2-5 전류의 자기 작용: 전자석(켜져 있을 때만, 방향과 상관없이 철을 끌어당김), 나침반, 전동기
window.Magnetism = {
  cfg() { return GAME_CONFIG.act2.magnetism; },

  // 자석 근처(거리 m)에 놓인 물질의 반응. 저주: 모든 금속이 철처럼 강하게 붙는다
  //   반환 { dir: +1 끌림 / −1 밀림 / 0, size: 실제 상대 크기, shown: 화면에 보일 크기(약한 반응은 과장 배율), lift: 들어 올릴 수 있나 }
  response(material, dist, { cursed = false, exaggerate } = {}) {
    const c = this.cfg();
    const m = c.materials[material];
    if (!m || dist > c.range) return { dir: 0, size: 0, shown: 0, lift: false };
    const near = 1 - dist / c.range;                       // 가까울수록 1에 가깝다
    if (cursed) return { dir: 1, size: near, shown: near, lift: true };
    const size = Math.abs(m.response) * near;
    const ex = m.kind === 'ferro' ? 1 : (exaggerate ?? c.exaggerate);
    return { dir: Math.sign(m.response), size, shown: Math.min(1, size * ex), lift: m.kind === 'ferro', kind: m.kind };
  },

  // 전자석 함정: 전류가 흐르는 동안만 철을 붙잡는다. 전류 방향을 바꿔도 철은 계속 끌린다(극이 바뀌어도 철은 끌림)
  trapHolds(material, { on, cursed = false }) {
    if (cursed || !on) return false;
    return this.cfg().materials[material]?.kind === 'ferro';
  },

  // 전선 옆 나침반: 전류가 흐르면 바늘이 돌아가고, 방향을 바꾸면 반대로, 끄면 북쪽(0°)
  //   current: +1 / −1 / 0, 반환: 바늘이 북쪽에서 돌아간 각도(도)
  compassAngle(current, { cursed = false } = {}) {
    if (cursed || !current) return 0;
    return 90 * Math.sign(current);
  },

  // 전동기: 힘 = 감은 수 × 자석 세기 (전류는 같다). 24 이상이면 승강기가 올라간다
  //   direction: +1 올라가는 쪽 / −1 반대. 반환 { force, lifts, speed(m/s, + 위), spin(회전자 상대 빠르기) }
  motor(turns, magnet, direction = 1, { cursed = false } = {}) {
    const m = this.cfg().motor;
    const force = turns * (m.magnets[magnet] ?? magnet);
    if (cursed) return { force, lifts: false, speed: 0, spin: 0 };
    const lifts = force >= m.need;
    const speed = lifts ? Math.max(m.minSpeed, (force - m.need) * m.speedPerForce) : 0;
    return { force, lifts, speed: speed * direction, spin: direction * (lifts ? speed : 0.15) };
  },
};
