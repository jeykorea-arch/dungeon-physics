// 2-3 축전기 계산 (ACT2_PLAN 3단계). 값은 config.js 의 act2.capacitor
// 같은 전압(전지)에서 모을 수 있는 양 ∝ 판 넓이 ÷ 간격 → large_close > small_close > large_wide > small_wide
window.Capacitor = {
  cfg() { return GAME_CONFIG.act2.capacitor; },

  // 상자 종류별로 담을 수 있는 양 (small_wide = 1 인 상대값)
  capacity(type) {
    const c = this.cfg(), b = c.boxes[type], ref = c.boxes.small_wide;
    return (b.plateWidth / b.gap) / (ref.plateWidth / ref.gap) * c.unit;
  },

  // 큰 것부터 차례 (확인용)
  order() {
    return Object.keys(this.cfg().boxes).sort((a, b) => this.capacity(b) - this.capacity(a));
  },

  // 충전: fill(0~1)이 fullSeconds 만에 0 → 1. connected가 아니면 그대로 (해방) / 저주에서는 떼는 순간 0
  charge(fill, dt, { connected, cursed = false }) {
    if (!connected) return cursed ? 0 : fill;
    return Math.min(1, fill + dt / this.cfg().fullSeconds);
  },

  // 지금 들어 있는 양 = 담을 수 있는 양 × 채운 비율
  stored(type, fill) {
    return this.capacity(type) * fill;
  },

  // 상자 빛 그림 단계 (box_charge_glow 00 / 30 / 70 / 100)
  glowState(fill) {
    if (fill >= 0.999) return '100';
    if (fill >= 0.7) return '70';
    if (fill >= 0.3) return '30';
    return '00';
  },

  // 철문: 한꺼번에 기준값 이상 흘러야 열린다
  opensDoor(type, fill) {
    return this.stored(type, fill) >= this.cfg().doorNeed;
  },
};
