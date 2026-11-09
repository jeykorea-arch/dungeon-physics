// 3-4 스펙트럼 (ACT3_PLAN 0단계 6번·4단계). 값은 config.js 의 act3.spectrum
// 원소별 선 파장(nm) → 띠 위 위치와 색. 저주 상태: 선 대신 연속 띠(drawStrip에 cursed)
window.Spectrum = {
  cfg() { return GAME_CONFIG.act3.spectrum; },

  lines(element) { return this.cfg().lines[element]; },

  // 그림 띠(380~700 nm) 안에 들어오는 선만 (네온 703 nm는 띠 밖이라 그리지 않는다)
  linesOnBand(element) {
    const [a, b] = this.cfg().bandNm;
    return this.lines(element).filter((nm) => nm >= a && nm <= b);
  },

  // 파장 → 띠 위 위치 (rect: [왼쪽, 위, 오른쪽, 아래] — ui.json strip_rect)
  xOnStrip(nm, rect) {
    const [a, b] = this.cfg().bandNm;
    return rect[0] + (nm - a) / (b - a) * (rect[2] - rect[0]);
  },

  // 파장 → 색 (0xRRGGBB). 가시광 근사식
  color(nm) {
    let r = 0, g = 0, b = 0;
    if (nm < 440) { r = (440 - nm) / 60; b = 1; }
    else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
    else if (nm < 510) { g = 1; b = (510 - nm) / 20; }
    else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
    else if (nm < 645) { r = 1; g = (645 - nm) / 65; }
    else { r = 1; }
    const fade = nm < 420 ? 0.45 + 0.55 * (nm - 380) / 40 : (nm > 645 ? 0.45 + 0.55 * (700 - nm) / 55 : 1);
    const v = (c) => Math.round(255 * Math.max(0, c * fade) ** 0.8);
    return (v(r) << 16) | (v(g) << 8) | v(b);
  },

  // 띠 그리기 (Phaser Graphics): 저주 = 연속 띠, 해방 = 정해진 선만
  drawStrip(g, rect, element, { cursed = false, lineWidth = 3 } = {}) {
    const h = rect[3] - rect[1];
    if (cursed) {
      const [a, b] = this.cfg().bandNm;
      for (let x = rect[0]; x < rect[2]; x++) {
        g.fillStyle(this.color(a + (x - rect[0]) / (rect[2] - rect[0]) * (b - a)), 1).fillRect(x, rect[1], 1, h);
      }
      return;
    }
    for (const nm of this.linesOnBand(element)) {
      g.fillStyle(this.color(nm), 1).fillRect(this.xOnStrip(nm, rect) - lineWidth / 2, rect[1], lineWidth, h);
    }
  },

  // 수소 에너지 준위 (eV)
  level(n) { return -this.cfg().rydberg / (n * n); },

  // n단에서 m단으로 떨어질 때 나오는 빛의 파장 (nm)
  emittedNm(n, m = 2) {
    return this.cfg().hc / (this.level(n) - this.level(m));
  },

  // 문 바코드와 같은 원소인가 (바코드 퍼즐)
  matchesDoor(element) { return element === this.cfg().doorElement; },
};
