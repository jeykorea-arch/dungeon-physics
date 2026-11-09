// 2-6 전자기 유도 계산 (ACT2_PLAN 6단계). 값은 config.js 의 act2.induction
//   코일을 지나는 자기장이 "변할 때만" 전류가 유도된다 — 자석이 멈춰 있으면(코일 안에 있어도) 0, 빨리 움직일수록 크다.
//   에너지를 내준 쪽은 느려진다: 골렘이 코일 문을 지날 때마다 운동 에너지의 passShare(30%)가 봉화로.
//   (학생 화면에는 "빨리 지날수록 더 많은 전기가 생긴다 / 내준 에너지만큼 골렘이 느려진다"까지만 쓴다 — 총괄지시 2번)
window.Induction = {
  cfg() { return GAME_CONFIG.act2.induction; },

  // 코일 속 막대자석: velocity(m/s, + = 넣는 쪽, − = 빼는 쪽). 저주: 전선으로 잇지 않으면 0
  coilCurrent(velocity, { cursed = false } = {}) {
    if (cursed) return 0;
    return this.cfg().currentPerSpeed * velocity;
  },

  kinetic(mass, v) {
    return 0.5 * mass * v * v;
  },

  // 골렘이 코일 문을 한 번 지난다. 반환 { given: 봉화로 간 에너지, speed: 지난 뒤 속력, before, after }
  //   before = after + given (합이 같다 — 교사용 표시)
  golemPass(speed, { cursed = false } = {}) {
    const c = this.cfg();
    const before = this.kinetic(c.golemMass, speed);
    if (cursed) return { given: 0, speed, before, after: before };
    const given = before * c.passShare;
    const after = before - given;
    return { given, speed: Math.sqrt(2 * after / c.golemMass) * Math.sign(speed || 1), before, after };
  },

  // 무선 전달: 두 코일 축이 마주 보는 정도(각도 차이가 작을수록 1) × 거리 감쇠(가까울수록 1)
  //   angleDiff(도), dist(m). 반환 { amount: 0~1, lit: 기준을 넘었나 }
  wireless(angleDiff, dist) {
    const w = this.cfg().wireless;
    const face = Math.max(0, Math.cos(angleDiff * Math.PI / 180));
    const amount = face / (1 + (dist / w.near) ** 2);
    return { amount, lit: amount >= w.need };
  },
};
