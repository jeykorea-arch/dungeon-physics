// 대화창: ui_manifest의 위치대로 초상화·이름·대사를 보여 준다.
// 글자가 하나씩 나오며 캐릭터별 글자음(sfx_text_blip_*)이 난다. 클릭/스페이스로 진행.
// 대사 내용은 js/data/dialogue/ 의 장면별 파일에 있다.
class DialogueBox {
  constructor(scene, layer) {
    this.scene = scene;
    this.active = false;
    const R = MANIFEST.ui.regions.dialogue;
    this.R = R;
    const c = scene.add.container(0, 0).setScrollFactor(0).setDepth(500).setVisible(false);
    layer.add(c);
    this.container = c;

    this.portrait = scene.add.image(0, 0, '__DEFAULT').setOrigin(0, 0).setVisible(false);
    this.overlay = scene.add.image(0, 0, MANIFEST.ui.images.dialogue_overlay.key).setOrigin(0, 0);
    // 이름 칸: ui_manifest의 name 좌표(590, 663)는 왼쪽 보석 장식과 겹쳐서,
    // dialogue_overlay.png에서 어두운 이름 판의 안쪽 경계를 직접 재어 쓴다.
    const P = DialogueBox.NAME_PLATE;
    this.nameMaxWidth = P.w - P.padLeft * 2;
    this.nameFontSize = Math.round(P.h * 0.5); // 칸 높이(78px)에 맞춘 글자 크기 → 39px
    // 한글 글자는 글자 상자 가운데보다 2px쯤 위에 그려져서 그만큼 내린다 (화면에서 재어 확인)
    this.name = UIKit.text(scene, P.x + P.padLeft, P.y + P.h / 2 + 2, '', {
      fontSize: this.nameFontSize + 'px', fontStyle: 'bold', color: UIKit.LIGHT,
    }).setOrigin(0, 0.5);
    this.body = UIKit.text(scene, R.body[0], R.body[1], '', {
      fontSize: '34px', color: UIKit.INK, lineSpacing: 10, wordWrap: { width: R.body[2], useAdvancedWrap: true },
    });
    this.more = UIKit.text(scene, R.body[0] + R.body[2] - 10, R.body[1] + R.body[3] + 4, '▼', {
      fontSize: '26px', color: UIKit.INK,
    }).setOrigin(1, 1);
    scene.tweens.add({ targets: this.more, alpha: 0.2, yoyo: true, repeat: -1, duration: 500 });
    c.add([this.portrait, this.overlay, this.name, this.body, this.more]);
  }

  // 대화창을 화면 위쪽으로 올린다 (아래쪽 장면을 보여 주며 읽게 할 때, 예: 1-2 무너지는 다리 안내판). false면 제자리
  setTop(on) {
    this.container.y = on ? -520 : 0;
  }

  // lines: [{ who: 'ian', face: 'thinking', text: '...' }, ...]  who 가 없으면 해설(초상화 없음)
  // 대사가 열려 있는 동안 새 대사가 오면 줄을 세워 앞 대사가 끝난 뒤에 튼다 (앞 대사의 "끝나면 할 일"도 지킴).
  // 덮어쓰면 앞 콜백이 사라져 전투 등이 시작되지 않고 멈췄다 (총괄지시 49·59번)
  play(lines, onDone) {
    if (!lines || lines.length === 0) { if (onDone) onDone(); return; }
    if (this.active) { (this.queue = this.queue || []).push([lines, onDone]); return; }
    this.lines = lines;
    this.index = -1;
    this.onDone = onDone;
    this.active = true;
    this.container.setVisible(true);
    this.next();
  }

  next() {
    this.index += 1;
    if (this.index >= this.lines.length) { this.close(); return; }
    const line = this.lines[this.index];
    const sp = line.who ? SPEAKERS[line.who] : null;
    this.name.setText(sp ? sp.name : '').setFontSize(this.nameFontSize);
    while (this.name.width > this.nameMaxWidth && this.name.style.fontSize !== '20px') {
      this.name.setFontSize(parseInt(this.name.style.fontSize, 10) - 2); // 아주 긴 이름은 칸 안에 들어가게 줄인다
    }
    this.showPortrait(line.who, line.face || (sp && sp.defaultFace));
    // 빈 틀이 고장 난 것처럼 보이지 않게 (총괄지시 2차 19번): 해설은 초상화 틀·이름 칸 없이 양피지만,
    // 초상화가 없는 인물(마을 주민·상인 등)은 이름 칸은 두고 초상화 틀만 숨긴다
    const C = DialogueBox.CROP;
    if (!line.who) this.overlay.setCrop(C.panelX, C.parchmentY, 1920 - C.panelX, 1080 - C.parchmentY);
    else if (!this.portrait.visible) this.overlay.setCrop(C.panelX, 0, 1920 - C.panelX, 1080);
    else this.overlay.setCrop();
    this.fullText = line.text;
    this.shown = 0;
    this.blipTimer = 0;
    this.blip = sp ? sp.blip : null;
    this.body.setText('');
    this.more.setVisible(false);
  }

  // 초상화: 원본 540px 기준 배율(385/540)로 줄여 상자 위쪽·가운데에 맞추고, 상자 밖은 잘라 낸다
  showPortrait(who, face) {
    const c = who && MANIFEST.characters[who];
    const sp = who && SPEAKERS[who];
    const file = (sp && sp.faces && sp.faces[face]) || face; // 한글 표정 이름 → 초상화 파일 이름
    if (c && face && !c.portraits[file]) console.warn('없는 표정:', who, face);
    const p = c && (c.portraits[file] || Object.values(c.portraits)[0]);
    if (!p || !this.scene.textures.exists(p.key)) { this.portrait.setVisible(false); return; }
    const [rx, ry, rw, rh] = this.R.portrait;
    const scale = rw / 540;
    const cw = Math.min(p.width, rw / scale);
    const ch = Math.min(p.height, rh / scale);
    const x0 = (p.width - cw) / 2;
    this.portrait.setTexture(p.key).setScale(scale).setCrop(x0, 0, cw, ch);
    this.portrait.setPosition(rx - x0 * scale + (rw - cw * scale) / 2, ry).setVisible(true);
  }

  // 클릭/스페이스: 글자가 나오는 중이면 한 번에 다 보여 주고, 다 나왔으면 다음 줄
  advance() {
    if (!this.active) return;
    if (this.shown < this.fullText.length) {
      this.shown = this.fullText.length;
      this.body.setText(this.fullText);
      this.more.setVisible(true);
    } else {
      this.next();
    }
  }

  update(dt) {
    if (!this.active || this.shown >= this.fullText.length) return;
    const cps = GAME_CONFIG.text.charsPerSecond;
    const before = Math.floor(this.shown);
    this.shown = Math.min(this.fullText.length, this.shown + cps * dt);
    const now = Math.floor(this.shown);
    if (now > before) {
      this.body.setText(this.fullText.slice(0, now));
      this.blipTimer -= dt;
      const ch = this.fullText[now - 1];
      if (this.blip && ch.trim() && this.blipTimer <= 0) {
        Sound.play(this.blip);
        this.blipTimer = GAME_CONFIG.text.blipInterval;
      }
    }
    if (this.shown >= this.fullText.length) this.more.setVisible(true);
  }

  close() {
    this.active = false;
    this.container.setVisible(false);
    const done = this.onDone;
    this.onDone = null;
    try {
      if (done) done();
    } finally {
      // 끝나면 할 일이 새 대사를 열지 않았으면 줄 선 대사를 차례로 (그 일이 오류를 내도)
      if (!this.active && this.queue && this.queue.length) { const [l, cb] = this.queue.shift(); this.play(l, cb); }
    }
  }
}
// dialogue_overlay.png 속 어두운 이름 판의 안쪽 경계 (픽셀을 재어 찾은 값)
// 위 y=659, 아래 y=737, 왼쪽 x=653(보석 장식 오른쪽 금테 안쪽), 오른쪽 x=1710
DialogueBox.NAME_PLATE = { x: 653, y: 659, w: 1057, h: 78, padLeft: 26 };
// dialogue_overlay.png에서 잰 경계: 초상화 틀 오른쪽 끝 다음(x 550)부터 이름 칸·양피지 판, 양피지 판 윗테두리(y 738)
DialogueBox.CROP = { panelX: 550, parchmentY: 738 };
window.DialogueBox = DialogueBox;
