// 화면 글자·버튼 공통 모양
window.UIKit = {
  FONT: '"Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
  INK: '#3b2814',      // 양피지 위 글자색
  LIGHT: '#f3ead6',    // 어두운 바탕 위 글자색
  SKY: '#9fe0ff',      // 하늘빛 = 법칙을 되찾는 색
  CURSE: '#c9a6ff',    // 보랏빛 = 저주

  text(scene, x, y, str, style = {}) {
    return scene.add.text(x, y, str, { fontFamily: this.FONT, fontSize: '28px', color: this.LIGHT, ...style });
  },

  // 글자 버튼. 누르면 클릭 소리와 함께 onClick
  button(scene, x, y, label, onClick, opts = {}) {
    const bg = opts.bg || '#1d2c44';
    const hover = opts.hover || '#2f4a70';
    const btn = this.text(scene, x, y, label, {
      fontSize: (opts.fontSize || 28) + 'px', color: opts.color || '#ffffff', backgroundColor: bg,
      padding: { x: opts.padX ?? 20, y: opts.padY ?? 10 }, fixedWidth: opts.width || 0, align: 'center',
    }).setOrigin(opts.originX ?? 0.5, opts.originY ?? 0.5).setInteractive({ useHandCursor: true });
    btn.on('pointerdown', (pointer, lx, ly, event) => {
      if (btn.disabled) return;
      event?.stopPropagation?.();
      Sound.play('sfx_ui_click');
      onClick();
    });
    btn.on('pointerover', () => { if (!btn.disabled) btn.setBackgroundColor(hover); });
    btn.on('pointerout', () => btn.setBackgroundColor(bg));
    btn.setDisabled = (d) => { btn.disabled = d; btn.setAlpha(d ? 0.4 : 1); return btn; };
    return btn;
  },

  // 실험이 끝난 뒤 결과를 다 읽고 넘어가도록, 시간이 아니라 "다음" 버튼(Space·Enter·클릭)으로 닫는다 (평가단 제안 —
  // 1-1 "평형!"이 1.5초, 1-3이 0.8초 만에 닫혔다). finish: 원래 시간이 지나면 하던 일(닫기 + 다음 진행).
  // 다른 방법(Esc 등)으로 실험 화면이 먼저 닫혀도 예전처럼 finish를 불러 진행이 멈추지 않게 한다.
  labNext(lab, finish) {
    const scene = lab.scene;
    const kb = scene.input.keyboard;
    let fired = false;
    const readyAt = scene.time.now + 600;   // 실험을 진행하던 Space를 연달아 눌러 바로 넘어가지 않게
    const btn = this.button(scene, 1890, 1066, '다음 ▶  (Space)', () => go(), {
      originX: 1, originY: 1, fontSize: 30, padX: 22, padY: 10, bg: '#1f6b2a', hover: '#2c8f3a',
    });
    btn.setScrollFactor(0).setDepth(1500);
    scene.uiLayer.add(btn);
    const cleanup = () => { btn.destroy(); kb.off('keydown-SPACE', onKey); kb.off('keydown-ENTER', onKey); ev.remove(); };
    const go = () => { if (fired) return; fired = true; cleanup(); finish(); };
    // 같은 키로 뒤 장면 동작까지 실행되지 않게 다음 프레임에 넘긴다. 대화가 떠 있으면 대화만 넘긴다
    const onKey = () => { if (scene.time.now >= readyAt && !scene.dialogue?.active) scene.time.delayedCall(1, go); };
    kb.on('keydown-SPACE', onKey);
    kb.on('keydown-ENTER', onKey);
    const ev = scene.time.addEvent({ delay: 100, loop: true, callback: () => { if (!lab.isOpen) go(); } });
    return btn;
  },
};
