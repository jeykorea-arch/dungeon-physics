// 3-1 간섭 계산 (ACT3_PLAN 0단계 6번·1단계). 값은 config.js 의 act3.interference
// 스크린 벽 밝기 I = I₀ × cos²(π × (y − y중심) ÷ 간격), 줄무늬 간격 = K ÷ 틈 간격
// 저주 상태: 두 틈의 빛이 그냥 더해져 어디서나 고르게 밝다 (어두운 줄 없음)
window.Interference = {
  cfg() { return GAME_CONFIG.act3.interference; },

  // 틈 판 이름(gap_narrow·gap_mid·gap_wide) → 줄무늬 간격 (px)
  spacing(plate) {
    const c = this.cfg();
    return c.K / c.slitGap[plate];
  },

  // 스크린 벽 높이 y(px)의 밝기. i0: 광원 세기 (횃불을 더하면 커진다)
  intensity(y, plate, { i0 = 1, cursed = false } = {}) {
    if (cursed) return i0;
    return i0 * Math.cos(Math.PI * (y - this.cfg().centerY) / this.spacing(plate)) ** 2;
  },

  // 어두운 줄 자리: 가운데에서 잰 거리 (m + ½) × 간격 (px). range: 가운데에서 위아래로 볼 거리
  darkOffsets(plate, range = 250) {
    const d = this.spacing(plate), out = [];
    for (let m = 0; (m + 0.5) * d <= range; m++) out.push(-(m + 0.5) * d, (m + 0.5) * d);
    return out.sort((a, b) => a - b);
  },

  brightOffsets(plate, range = 250) {
    const d = this.spacing(plate), out = [0];
    for (let m = 1; m * d <= range; m++) out.push(-m * d, m * d);
    return out.sort((a, b) => a - b);
  },

  // 숨은 룬: 룬 자리가 어두운 줄 안에 들어올 때만 보인다. 저주 상태에는 어두운 줄이 없다
  runeVisible(plate, { cursed = false } = {}) {
    if (cursed) return false;
    const r = this.cfg().rune;
    return this.darkOffsets(plate, Math.abs(r.offset) + r.tolerance + this.spacing(plate))
      .some((o) => Math.abs(o - r.offset) <= r.tolerance);
  },

  // 망령 두 마리의 빛이 바닥에 만드는 띠: 받는 피해 비율 (어두운 띠 안이면 작다). cursed면 띠가 없다
  floorDamage(x, centerX, { cursed = false } = {}) {
    if (cursed) return 1;
    const b = this.cfg().floorBand;
    const bright = Math.cos(Math.PI * (x - centerX) / b.spacing) ** 2;
    return bright < 0.15 ? b.darkDamage : 1;
  },

  // 물결 수조: 두 파원에서 온 원형 파동의 합 (−2 ~ 2). sources: [{x, y, on}]. 마루끼리 ±2, 마루와 골이 만나면 0
  rippleHeight(x, y, t, sources) {
    const w = this.cfg().wave;
    let h = 0;
    for (const s of sources) {
      if (s.on === false) continue;
      h += Math.cos(2 * Math.PI * (Math.hypot(x - s.x, y - s.y) - w.speed * t) / w.wavelength);
    }
    return h;
  },
};
