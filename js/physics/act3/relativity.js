// 3-6 상대론 (ACT3_PLAN 0단계 6번·6단계). 값은 config.js 의 act3.relativity
// γ = 1/√(1 − v²/c²), 움직이는 쪽의 시간 비율 = 길이 비율 = 1/γ. 빛의 속력은 누구에게나 c
// 저주 상태: 시간은 누구에게나 똑같이 흐른다 (비율 1)
window.Relativity = {
  cfg() { return GAME_CONFIG.act3.relativity; },

  gamma(beta = this.cfg().beta) { return 1 / Math.sqrt(1 - beta * beta); },

  timeRatio(beta = this.cfg().beta, { cursed = false } = {}) { return cursed ? 1 : 1 / this.gamma(beta); },

  lengthRatio(beta = this.cfg().beta, { cursed = false } = {}) { return cursed ? 1 : 1 / this.gamma(beta); },

  // 모래시계 그림 단계 '01'~'06'. progress: 땅의 시계가 흐른 비율 (0~1), moving: 지나가는 전차에 실린 시계
  hourglassState(progress, { moving = false, cursed = false } = {}) {
    const steps = this.cfg().hourglassSteps;
    const p = Math.max(0, Math.min(1, progress)) * (moving ? this.timeRatio(undefined, { cursed }) : 1);
    return String(Math.floor(p * steps + 1e-9) + 1).padStart(2, '0');
  },

  // 게임 속도 (px/s): 빛 화살 = c, 전차 = β × c. 땅에서 볼 때 화살이 항상 따라잡는다
  arrowSpeed() { return this.cfg().arrowSpeed; },
  chariotSpeed() { return this.cfg().beta * this.cfg().arrowSpeed; },
};
