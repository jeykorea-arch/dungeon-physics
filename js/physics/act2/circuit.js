// 2-2 회로 계산기 (ACT2_PLAN 2단계). 값은 config.js 의 act2.circuit (12V, 6Ω, 5A — 실제 값 그대로)
// 회로판: 'series'(빈 자리 3칸이 한 줄) / 'parallel'(빈 자리 3칸이 세 갈래)
// 칸에 꽂는 부품: 'lamp'(등불) / 'resistor'(저항 수정) / 'wire'(전선 조각) / null(빈 칸)
//   옴의 법칙 I = V ÷ R, 전력 P = V × I = I² × R
//   합선(회로 전체 저항 0): 0으로 나누지 않도록 shortOhm으로 계산 → 전류가 매우 커서 바로 끊어짐 (총괄지시 3번)
window.Circuit = {
  cfg() { return GAME_CONFIG.act2.circuit; },

  ohm(part) {
    const c = this.cfg();
    return { lamp: c.lampOhm, resistor: c.resistorOhm, wire: c.wireOhm }[part];
  },

  brightness(watts) {
    const b = this.cfg().brightW;
    if (watts <= b.dim) return 'off';
    if (watts < b.normal) return 'dim';
    if (watts < b.bright) return 'normal';
    return 'bright';
  },

  // 반환: { total: 전체 전류(A), parts: [{ part, amp, watt, level }], lampWatt: 등불 전력 합,
  //        open: 회로가 끊겼나(빈 칸), short: 합선, hot: 달아오름(4A 이상), broken: 퓨즈 끊어짐(5A 초과), stairs: 계단이 열리나 }
  solve(board, slots) {
    const c = this.cfg(), V = c.voltage;
    const parts = slots.map((part) => ({ part, amp: 0, watt: 0, level: part === 'lamp' ? 'off' : null }));
    let total = 0, short = false, open = false;
    if (board === 'series') {
      if (slots.some((p) => !p)) open = true;               // 빈 칸이 하나라도 있으면 전류가 흐르지 않는다
      else {
        let R = slots.reduce((s, p) => s + this.ohm(p), 0);
        if (R <= 0) { R = c.shortOhm; short = true; }
        total = V / R;
        for (const p of parts) { p.amp = total; p.watt = total * total * this.ohm(p.part); }
      }
    } else {
      for (const p of parts) {
        if (!p.part) continue;                               // 빈 갈래는 끊긴 갈래
        let R = this.ohm(p.part);
        if (R <= 0) { R = c.shortOhm; short = true; }        // 전선 조각만 꽂힌 갈래 = 합선
        p.amp = V / R;
        p.watt = p.part === 'wire' ? 0 : V * p.amp;
        total += p.amp;
      }
      if (total === 0) open = true;
    }
    const broken = total > c.breakAmp;
    if (broken) for (const p of parts) { p.amp = 0; p.watt = 0; }   // 끊어지면 모두 꺼진다
    for (const p of parts) if (p.part === 'lamp') p.level = this.brightness(p.watt);
    const lampWatt = parts.filter((p) => p.part === 'lamp').reduce((s, p) => s + p.watt, 0);
    return {
      total: broken ? 0 : total, wouldBe: total, parts, lampWatt, open, short, broken,
      hot: !broken && total >= c.hotAmp,
      stairs: !broken && lampWatt >= c.stairW,
    };
  },

  // 저주: 등불을 이을수록 모두 더 밝아지고 전선은 절대 안 끊어진다. 그래도 계단은 열리지 않는다 (거짓 빛)
  solveCursed(board, slots) {
    const n = slots.filter((p) => p === 'lamp').length;
    const level = ['off', 'normal', 'bright', 'bright'][Math.min(3, n)];
    return {
      total: 0, wouldBe: 0, lampWatt: 0, open: false, short: false, broken: false, hot: false, stairs: false, cursed: true,
      parts: slots.map((part) => ({ part, amp: 0, watt: 0, level: part === 'lamp' ? level : null })),
    };
  },

  // 번개 지팡이: 저항 수정 2개를 직렬/병렬로. 피해·마력 소모는 전력에 비례 (직렬 12W를 1배로)
  staff(mode) {
    const s = this.cfg().staff;
    const R = mode === 'parallel' ? s.crystalOhm / 2 : s.crystalOhm * 2;
    const I = s.voltage / R, P = s.voltage * I;
    const base = s.voltage * s.voltage / (s.crystalOhm * 2);
    return { ohm: R, amp: I, watt: P, power: P / base };
  },
};
