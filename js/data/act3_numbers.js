// 교사용 메뉴 "물리 값 보기" — 3막 챕터별 숫자 (ACT3_PLAN 각 단계 "교사용 표시").
// 값은 config.js 의 act3와 계산 모듈에서 가져온다. 장면에 teacherNumbers()가 있으면 그 장면의 지금 값(틈 판, 입사각 등)을 덧붙인다.
(function () {
  const round = (v, n = 2) => Number(v.toFixed(n));
  const list = (a) => a.map((v) => round(v, 0)).join(', ');
  const relativity = () => {
    const R = Relativity;
    return [
      `전차 속력 v = ${R.cfg().beta}c, γ = ${round(R.gamma())}`,
      `시간 비율 1/γ = ${round(R.timeRatio())}, 길이 비율 1/γ = ${round(R.lengthRatio())}`,
      `모래시계 (문 A → B): 땅 01 → 06, 전차 01 → ${R.hourglassState(1, { moving: true })}`,
      `게임 속도: 빛 화살 ${R.arrowSpeed()} px/s, 전차 ${round(R.chariotSpeed(), 0)} px/s`,
    ];
  };

  window.ACT3_NUMBERS = {
    Ch3_1: () => {
      const I = Interference, c = I.cfg();
      return [
        `스크린 밝기 = I₀ cos²(π(y − ${c.centerY}) ÷ 간격), 간격 = ${c.K} ÷ 틈 간격`,
        ...Object.entries(c.slitGap).map(([k, g]) => `${k}(틈 간격 ${g}px): 줄무늬 간격 ${round(I.spacing(k), 0)}px, 어두운 줄 ${list(I.darkOffsets(k, 200))}${I.runeVisible(k) ? '  ← 룬이 보임' : ''}`),
        `숨은 룬 위치: 가운데에서 ${c.rune.offset}px (허용 ±${c.rune.tolerance}px)`,
        `바닥 띠 간격 ${c.floorBand.spacing}px, 어두운 띠 피해 ${c.floorBand.darkDamage * 100}%`,
      ];
    },
    Ch3_2: () => {
      const O = Optics, c = O.cfg();
      return [
        `n = ${c.nWater}: 입사각 30° → 굴절각 ${round(O.refract(30), 1)}°, 45° → ${round(O.refract(45), 1)}°, 60° → ${round(O.refract(60), 1)}°`,
        `열쇠 깊이 ${c.keyDepth} m → 겉보기 ${round(O.apparentDepth(c.keyDepth))} m`,
        `렌즈 f = ${c.focal} m: a = 4 m → b = ${round(O.imageDistance(4))} m, 배율 ${round(O.magnification(4))} / a = 4.7 m → b = ${round(O.imageDistance(4.7))} m, 배율 ${round(O.magnification(4.7))}`,
        `선명 범위: 상 위치 ± ${c.sharpWindow} m, 배율 ${round(c.plateHeight / c.stencilHeight)} 이하, a + b ≤ ${c.railLength} m`,
      ];
    },
    Ch3_3: () => {
      const c = Dots.cfg();
      return [`그림이 드러나는 점 수 ${c.total}개, 찍는 속도 초당 ${c.startPerSecond} → ${c.endPerSecond}개`, '전자 분포 = cos² 무늬 × 넓은 봉우리'];
    },
    Ch3_4: () => {
      const S = Spectrum, c = S.cfg();
      return [
        ...Object.entries(c.lines).map(([k, v]) => `${k}: ${v.join(', ')} nm`),
        `계단 준위 ${c.stairsLevels.map((n) => `n=${n}: ${round(S.level(n))}eV`).join(', ')}`,
        `n → 2 빛: ${[3, 4, 5, 6].map((n) => `${n}: ${round(S.emittedNm(n), 0)}nm`).join(', ')}`,
      ];
    },
    Ch3_5: () => {
      const D = Diode, c = D.cfg();
      return [
        `재질별 전도: ${Object.entries(c.conduct).map(([k, v]) => `${k} ${v}`).join(', ')}`,
        'LED: 가지마다 따로 판정 (▶ 쪽이 + 줄을 향할 때만 켜짐)',
        `방패를 거꾸로 들면 피해 ${c.shieldWrongDamage}배`,
      ];
    },
    Ch3_6: relativity,
    FinalBoss1: relativity,
    FinalBoss2: relativity,
    FinalBoss3: relativity,
  };
})();
