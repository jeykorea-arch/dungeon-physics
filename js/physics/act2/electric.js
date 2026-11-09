// 2-1 전기력·전기장 계산 (ACT2_PLAN 1단계). 값은 config.js 의 act2.electric
// 전하는 +1(양) / −1(음) / 0(중성) 처럼 부호와 크기로 나타낸다(상대값).
window.Electric = {
  cfg() { return GAME_CONFIG.act2.electric; },

  // 떨어져 있는 두 전하 사이의 힘 크기 (거리 m). 가까울수록 강하다: k·|q1·q2| ÷ 거리², 최댓값 제한, range 밖은 0
  // 한쪽이 중성(0)이면 대전체 쪽으로 아주 약하게 끌린다 (정전기 유도)
  forceMagnitude(q1, q2, dist) {
    const c = this.cfg();
    if (dist > c.range) return 0;
    const qq = q1 && q2 ? Math.abs(q1 * q2) : Math.abs(q1 || q2) * c.neutralAttract;
    return Math.min(c.maxForce, c.k * qq / Math.max(dist * dist, 1e-6));
  },

  // 힘의 방향: +1 = 서로 밀어냄, −1 = 서로 끌어당김, 0 = 힘 없음
  // 같은 전하는 밀어내고, 다른 전하는 끌어당기고, 중성 물체는 끌려온다
  forceSign(q1, q2) {
    if (!q1 && !q2) return 0;
    if (!q1 || !q2) return -1;
    return Math.sign(q1) === Math.sign(q2) ? 1 : -1;
  },

  // target이 source에게서 받는 힘 (x축, + = 오른쪽). 저주: 닿아야만(touching) 힘이 있다
  forceOn(sourceQ, sourceX, targetQ, targetX, { cursed = false, touching = false } = {}) {
    const dx = targetX - sourceX, dist = Math.abs(dx);
    if (cursed && !touching) return 0;
    const sign = this.forceSign(sourceQ, targetQ);
    if (!sign) return 0;
    const mag = cursed ? this.cfg().maxForce : this.forceMagnitude(sourceQ, targetQ, dist);
    const away = Math.sign(dx) || 1;            // source에서 target으로 향하는 방향
    return sign * away * mag;                   // 밀어내면 멀어지는 쪽, 끌어당기면 가까워지는 쪽
  },

  // 두 금속판 사이의 대전된 돌: 판 사이 어디서나 같은 크기의 힘.
  // + 돌은 낮은 전위 판 쪽, − 돌은 높은 전위 판 쪽. highSide = 'left' | 'right' (높은 전위 판의 위치)
  // 반환: x 방향 힘 (+ = 오른쪽). 중성 돌은 0
  plateForce(q, highSide) {
    if (!q) return 0;
    const towardLow = highSide === 'left' ? 1 : -1;   // 전기장 방향 = 높은 전위 → 낮은 전위
    return Math.sign(q) * towardLow * this.cfg().plateForce;
  },

  // 호박 막대: 문지르면 가득, 쓸 때마다·시간이 지나며 줄어든다. 반환: 새 전하량(0~rodFull, 크기만)
  rodAfter(amount, { used = 0, seconds = 0 } = {}) {
    const c = this.cfg();
    return Math.max(0, amount - used * c.rodLossPerUse - seconds * c.rodLossPerSecond);
  },
};
