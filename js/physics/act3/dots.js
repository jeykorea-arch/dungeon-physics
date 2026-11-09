// 3-3 점 찍기 (ACT3_PLAN 0단계 6번·3단계). 값은 config.js 의 act3.dots
// 목표 그림의 밝기 분포에 비례하는 확률로 점 자리를 뽑는다. rand: 0~1 난수 함수 (점검할 때 고정할 수 있게)
class DotSampler {
  // density(x, y) ≥ 0 인 함수를 w×h 칸에서 미리 누적해 둔다
  constructor(w, h, density) {
    this.w = w;
    this.h = h;
    this.cdf = new Float64Array(w * h);
    let sum = 0;
    for (let y = 0, i = 0; y < h; y++) for (let x = 0; x < w; x++, i++) { sum += Math.max(0, density(x, y)); this.cdf[i] = sum; }
    this.total = sum;
  }

  sample(rand = Math.random) {
    const r = rand() * this.total, c = this.cdf;
    let lo = 0, hi = c.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (c[mid] > r) hi = mid; else lo = mid + 1;
    }
    return { x: lo % this.w, y: Math.floor(lo / this.w) };
  }
}

window.Dots = {
  cfg() { return GAME_CONFIG.act3.dots; },

  // RGBA 픽셀(캔버스 getImageData의 data)의 밝기로 뽑기
  fromPixels(data, w, h) {
    return new DotSampler(w, h, (x, y) => {
      const i = (y * w + x) * 4;
      return (data[i] + data[i + 1] + data[i + 2]) / 3 * (data[i + 3] / 255);
    });
  },

  // Phaser 텍스처(목표 그림 photo_target)의 밝기로 뽑기
  fromTexture(scene, key) {
    const src = scene.textures.get(key).getSourceImage();
    const cv = document.createElement('canvas');
    cv.width = src.width;
    cv.height = src.height;
    const ctx = cv.getContext('2d');
    ctx.drawImage(src, 0, 0);
    return this.fromPixels(ctx.getImageData(0, 0, src.width, src.height).data, src.width, src.height);
  },

  // 전자 무늬의 밝기 (u: 화면 가운데 0, 양 끝 ±1) = cos² 무늬 × 넓은 봉우리. 저주: 틈 뒤 띠 두 개
  electronDensity(u, { cursed = false } = {}) {
    const c = this.cfg();
    if (cursed) return Math.exp(-(((Math.abs(u) - c.cursedBandAt) / c.cursedBandWidth) ** 2));
    return Math.cos(Math.PI * u * c.electronFringes / 2) ** 2 * Math.exp(-((u / c.electronEnvelope) ** 2));
  },

  electronSampler(w, h, opts) {
    return new DotSampler(w, h, (x) => this.electronDensity((x + 0.5) / w * 2 - 1, opts));
  },

  // 지금까지 count개 찍혔을 때 이번 프레임에 찍을 점 수 (점점 빠르게, 한 프레임 최대 maxPerFrame). carry는 소수점을 다음 프레임으로 넘긴다
  dotsThisFrame(count, dt, carry = 0) {
    const c = this.cfg();
    if (count >= c.total) return { n: 0, carry: 0 };
    const k = count / c.total;
    const v = carry + c.startPerSecond * (c.endPerSecond / c.startPerSecond) ** k * dt;
    const n = Math.min(Math.floor(v), c.maxPerFrame, c.total - count);
    return { n, carry: Math.min(v - n, 1) };
  },
};
window.DotSampler = DotSampler;
