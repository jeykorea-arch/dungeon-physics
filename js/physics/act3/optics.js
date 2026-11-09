// 3-2 굴절·렌즈 계산 (ACT3_PLAN 0단계 6번·2단계). 값은 config.js 의 act3.optics. 거리는 m, 각도는 도(°)
window.Optics = {
  cfg() { return GAME_CONFIG.act3.optics; },

  // 스넬 법칙 n₁ sinθ₁ = n₂ sinθ₂ → 굴절각. 전반사면 null
  refract(theta1, n1 = 1, n2 = this.cfg().nWater) {
    const s = n1 * Math.sin(theta1 * Math.PI / 180) / n2;
    return Math.abs(s) > 1 ? null : Math.asin(s) * 180 / Math.PI;
  },

  // 겉보기 깊이 = 실제 깊이 ÷ n. 저주 상태: 보이는 곳 = 실제 위치
  apparentDepth(depth, { cursed = false } = {}) {
    return cursed ? depth : depth / this.cfg().nWater;
  },

  // 얇은 렌즈 1/f = 1/a + 1/b → 상의 거리 b = a × f ÷ (a − f). a ≤ f면 상이 맺히지 않는다(null)
  imageDistance(a, f = this.cfg().focal) {
    return a <= f ? null : a * f / (a - f);
  },

  // 배율 = b ÷ a (상은 거꾸로 맺힌다). 상이 없으면 null
  magnification(a, f = this.cfg().focal) {
    const b = this.imageDistance(a, f);
    return b === null ? null : b / a;
  },

  // 문양판-렌즈 거리 a와 렌즈-판 거리 screen으로 본 상. sharpness: 1 = 또렷 ~ 0 = 흐림
  image(a, screen, f = this.cfg().focal) {
    const b = this.imageDistance(a, f);
    if (b === null) return { b: null, m: null, inverted: false, sharp: false, sharpness: 0 };
    const c = this.cfg(), off = Math.abs(screen - b);
    return {
      b, m: b / a, inverted: true,
      sharp: off <= c.sharpWindow,
      sharpness: off <= c.sharpWindow ? 1 : Math.max(0, 1 - (off - c.sharpWindow) / c.blurRange),
    };
  },

  // 수정판 새기기: 상이 수정판에 들어갈 만큼 작고(배율 ≤ 수정판 ÷ 문양판), 레일 안에 있고, 선명할 때
  canEngrave(a, screen) {
    const c = this.cfg(), im = this.image(a, screen);
    return im.sharp && im.m <= c.plateHeight / c.stencilHeight + 1e-9 && a + screen <= c.railLength;
  },

  // 볼록렌즈 공격: 적까지 거리 d(m)가 초점거리에 가까울수록 강하다
  lensDamage(d) {
    const c = this.cfg(), L = c.lensAttack;
    return 1 + L.extra * Math.exp(-(((d - c.focal) / L.width) ** 2));
  },
};
