// 모든 장면의 바탕
// - 세계 층(worldLayer)과 UI 층(uiLayer)을 나눈다. UI 층은 저주 색 보정을 받지 않는다.
// - 대화창·마법서·해금 카드·시험·교사용 메뉴를 만들고 키를 연결한다 (M: 마법서, F1: 교사용 메뉴, Esc: 닫기)
class BaseScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  // data: scene.start/restart 때 넘긴 값 (예: { forceCursed: true })
  init(data) {
    // 같은 장면에 다시 들어오면(R·교사용 메뉴·다음 장에서 되돌아오기) 장면 객체를 다시 쓰므로,
    // 지난번에 만든(이미 지워진) 글자·그림을 가리키는 값을 비워 둔다 — 안 그러면 새 화면을 만들기 전에 옛 글자를 고치려다 멈춘다.
    for (const k of Object.keys(this)) {
      if (this[k] instanceof Phaser.GameObjects.GameObject) this[k] = null;
    }
    this.speedPanel = null;   // 일반 객체라 위 반복에서 안 비워진다. 남으면 2-2 재입장 때 지워진 판을 고치려다 멈춘다 (팀장검토 Q1)
    this.battle = null;   // 지난 전투가 남으면 지워진 그림을 쓰다 오류가 난다 (ACT3_PLAN 7단계에서 찾음)
    this.info = SceneFlow.info(this.scene.key) || {};
    this.sceneData = data || {};
  }

  preload() {
    Packs.unloadExcept(this, SceneFlow.packsFor(this.scene.key));   // 지난 장면에서만 쓴 그림 비우기
    Assets.preload(this, SceneFlow.packsFor(this.scene.key));
  }

  setupLayers() {
    this.worldLayer = this.add.layer();
    this.uiLayer = this.add.layer().setDepth(1000);
  }

  // 공통 UI. hud: 체력·마력 표시 여부
  setupCommonUI({ hud = true } = {}) {
    const L = this.uiLayer;
    this.hud = hud ? new Hud(this, L) : null;
    this.dialogue = new DialogueBox(this, L);
    this.unlockCard = new UnlockCard(this, L);
    this.spellbook = new Spellbook(this, L);
    this.exam = new ExamScreen(this, L);
    this.teacher = new TeacherMenu(this, L);

    const kb = this.input.keyboard;
    kb.addCapture(['SPACE', 'F1', 'UP', 'DOWN', 'LEFT', 'RIGHT']);
    kb.on('keydown-SPACE', () => this.dialogue.advance());
    kb.on('keydown-M', () => {
      if (this.teacher.isOpen || this.exam.isOpen || this.dialogue.active) return;
      if (!this.spellbook.isOpen && !Save.hasBook()) { if (this.toast) this.toast('아직 마법서가 없다'); return; }   // 스톤 할멈에게 표지를 받기 전 (총괄지시 53번)
      this.spellbook.toggle();
    });
    kb.on('keydown-F1', () => this.teacher.toggle());
    // 화면 오른쪽 위 작은 버튼: 소리 끄기(N), 교사용 (크롬북에는 F1 키가 따로 없어 버튼으로도 연다)
    const soundLabel = () => (Sound.isMuted() ? '소리 꺼짐 (N)' : '소리 켜짐 (N)');
    const smallBtn = { originX: 1, originY: 0, fontSize: 20, padX: 12, padY: 6, bg: '#0b1320', hover: '#2f4a70' };
    const soundBtn = UIKit.button(this, 1908, 10, soundLabel(), () => { Sound.toggleMute(); soundBtn.setText(soundLabel()); }, smallBtn);
    const teacherBtn = UIKit.button(this, soundBtn.x - soundBtn.width - 8, 10, '교사용', () => this.teacher.toggle(), smallBtn);
    for (const b of [soundBtn, teacherBtn]) { b.setScrollFactor(0).setDepth(310).setAlpha(0.8); L.add(b); }
    kb.on('keydown-N', () => { Sound.toggleMute(); soundBtn.setText(soundLabel()); });
    kb.on('keydown-ESC', () => {
      if (this.teacher.isOpen) this.teacher.close();
      else if (this.spellbook.isOpen) this.spellbook.close();
    });
    kb.on('keydown-LEFT', () => { if (this.spellbook.isOpen) this.spellbook.turn(-1); });
    kb.on('keydown-RIGHT', () => { if (this.spellbook.isOpen) this.spellbook.turn(1); });
    this.input.on('pointerdown', () => { if (this.dialogue.active) this.dialogue.advance(); });
  }

  // 대화·마법서·시험·메뉴가 열려 있으면 세계를 멈춘다
  isBlocked() {
    return !!(this.dialogue?.active || this.spellbook?.isOpen || this.exam?.isOpen || this.teacher?.isOpen
      || this.cutscene || this.predicting);
  }

  // 실험 화면의 매 프레임 일: 장면이 끝나면 함께 뗀다 (남으면 지워진 그림을 쓰다 오류가 난다 — ACT3_PLAN 7단계에서 찾음)
  labUpdate(fn) {
    this.events.on('update', fn);
    this.events.once('shutdown', () => this.events.off('update', fn));
  }

  say(dialogueKey, onDone) {
    const lines = (DIALOGUE[this.info.dialogue || this.scene.key] || {})[dialogueKey]; // dialogue: 다른 장면의 대사 파일을 쓸 때
    this.dialogue.play(lines, onDone);
  }

  // 이 장의 마법서 시험. onDone(passed): 다 맞히면 true, 중간에 닫으면 false
  openExam(onDone) {
    const ch = this.info.chapter;
    const q = ch && EXAMS[ch];
    if (q) {
      this.exam.open(q, (passed) => {
        if (passed) Save.setChapter('exam' + ch, { passed: true });
        if (onDone) onDone(passed);
      });
    }
  }

  // 교사용 메뉴에서 부르는 것들 (장면에 따라 덮어쓴다)
  teacherToggleCurse() {}
  teacherSetRuler(v) { Save.setSetting('showRuler', v); this.teacher.refresh(); }
  teacherSetSpeed(v) { Save.setSetting('showSpeed', v); this.teacher.refresh(); }
  answersShown() { return !!Save.setting('showAnswers'); }   // 교사용: 실험 전에도 답 숫자 보이기

  // 계단·문·출구에 닿으면: 이안(과 가론)을 그 자리에 멈추고 화면을 서서히 어둡게 한 뒤 다음 방
  // (총괄지시 63번 — 계단을 오르는 그림이 없어, 어두워지는 동안 계속 걸으면 계단 옆을 지나가 보였다)
  leaveRoom({ x = null, ms = 900 } = {}) {
    this.flags = this.flags || {};
    if (this.flags.leaving) return;
    this.flags.leaving = true;
    this.cutscene = true;   // 걷기·조작 멈춤 (updateWorld를 부르지 않는다)
    if (x != null) this.ian.x = x;
    for (const c of [this.ian, this.garon]) if (c) Characters.play(c, 'idle');
    this.cameras.main.fadeOut(ms, 0, 0, 0);
    this.time.delayedCall(ms + 50, () => this.goNext());
  }

  goNext() {
    if (this.leavingNow) return;
    // "다음"으로 넘어갈 때만 다음 방에서 이어 주는 해설을 보여 준다 (교사용 메뉴로 바로 갈 때는 안 보임)
    const next = SceneFlow.nextOf(this.scene.key);
    SceneFlow.pendingTransition = next;
    // 한 장(챕터)이 끝나 다음 장으로 갈 때만 챕터 클리어 팡파르 → 끝나면 다음 장면 (같은 장 안의 방 사이는 안 틂)
    const a = this.info.chapter, b = (SceneFlow.info(next) || {}).chapter;
    if (a && b && a !== b) {
      this.leavingNow = true;
      this.cutscene = true;                                         // 팡파르 동안 조작 멈춤
      if (this.uiLayer) {
        const act = this.info.act || 1;
        const label = `${act}-${Number(a) - (act - 1) * 6}`;   // 2막은 장 번호 07~12 → 2-1~2-6, 3막은 13~18 → 3-1~3-6
        this.uiLayer.add(UIKit.text(this, 960, 470, `${label} 클리어!`, {
          fontSize: '72px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08dd', padding: { x: 40, y: 20 },
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1900));
      }
      Sound.playJingle(GAME_CONFIG.music.chapterClear, () => SceneFlow.go(this, next));
      return;
    }
    SceneFlow.go(this, next);
  }

  // R(방 다시 하기)은 2초 안에 한 번 더 눌러야 실행한다 — 잘못 눌러 방 진행을 잃지 않게 (평가단 제안, T 결과판 옆 키)
  confirmRestart(fn) {
    const now = this.time.now;
    if (this.restartArmedUntil && now < this.restartArmedUntil) { this.restartArmedUntil = 0; fn(); return; }
    this.restartArmedUntil = now + 2000;
    if (this.toast) this.toast('처음부터 다시 하려면 R을 한 번 더 누르세요');
  }

  // 이 PC에서 저장이 안 되면 화면 아래에 계속 알린다 (save.js의 Save.failed — 평가단 제안)
  checkSaveWarning() {
    if (!Save.failed || !this.uiLayer || (this.saveWarn && this.saveWarn.active)) return;
    this.saveWarn = UIKit.text(this, 960, 1076, '이 PC에서는 저장이 되지 않습니다 — 창을 닫으면 진행이 사라져요', {
      fontSize: '20px', color: '#ffd27a', backgroundColor: '#3a0d0dcc', padding: { x: 14, y: 4 },
    }).setOrigin(0.5, 1).setScrollFactor(0).setDepth(650);
    this.uiLayer.add(this.saveWarn);
  }

  update(time, deltaMs) {
    const dt = Math.min(deltaMs, 50) / 1000; // 창 전환 등으로 한 번에 크게 뛰지 않도록
    this.checkSaveWarning();
    if (this.dialogue) this.dialogue.update(dt);
    if (this.curse) this.curse.update(dt);
    if (!this.isBlocked()) this.updateWorld(dt);
  }

  updateWorld(dt) {}
}
window.BaseScene = BaseScene;

// 속력·위치 같은 숫자를 보여 주는 판 (교사용 메뉴에서 켜고 끈다)
class SpeedPanel {
  constructor(scene, layer, x = 24, y = 190) {
    this.panel = scene.add.rectangle(x, y, 760, 60, 0x0b1320, 0.72).setOrigin(0, 0).setStrokeStyle(2, 0x9fd8ff, 0.6);
    this.mode = UIKit.text(scene, x + 22, y + 14, '', { fontSize: '30px', fontStyle: 'bold' });
    // 저주 문구가 길면 판 안에서 줄을 바꾼다 (3-3·2-6 문구가 화면 오른쪽 밖으로 잘렸다 — 평가단 제안)
    this.rule = UIKit.text(scene, x + 22, y + 56, '', { fontSize: '22px', color: '#dfe8f2', wordWrap: { width: 716, useAdvancedWrap: true } });
    this.lines = UIKit.text(scene, x + 22, y + 92, '', { fontSize: '30px', lineSpacing: 10 });
    this.parts = [this.panel, this.mode, this.rule, this.lines];
    for (const p of this.parts) { p.setScrollFactor(0).setDepth(300); layer.add(p); }
    this.setLines([]);
  }

  setMode(cursed, rule) {
    this.mode.setText(cursed ? '저주 상태' : '해방 상태 — 진짜 법칙').setColor(cursed ? UIKit.CURSE : UIKit.SKY);
    this.rule.setText(rule || '');
    this.layout();
  }

  setLines(lines) {
    this.lines.setText(lines.join('\n'));
    this.lineCount = lines.length;
    this.layout();
  }

  layout() {
    // 저주 문구가 여러 줄이면 아래 숫자 줄을 그만큼 내린다
    const ruleH = this.rule.text ? this.rule.height : 0;
    this.lines.setY(this.rule.y + Math.max(36, ruleH + 8));   // 한 줄이면 예전 자리(판 위에서 92) 그대로
    // 긴 줄이 있으면 판을 그만큼 넓힌다 (글자가 판 밖으로 나가지 않게)
    const w = Math.max(760, this.lines.width + 44, this.rule.width + 44, this.mode.width + 44);
    this.panel.setSize(w, (this.lines.y - this.panel.y) + 12 + (this.lineCount || 0) * 42);
    // 넓어진 판이 화면 오른쪽 밖으로 나가면 왼쪽으로 당긴다 (원래 자리 homeX보다 오른쪽으로는 가지 않음)
    const x = Math.min(this.homeX ?? this.panel.x, 1900 - w);
    if (x !== this.panel.x) this.shift(x - this.panel.x, 0);
  }

  shift(dx, dy) {
    for (const p of this.parts) p.setPosition(p.x + dx, p.y + dy);
  }

  setVisible(v) {
    for (const p of this.parts) p.setVisible(v);
  }

  // 판 옮기기 (장면에 따라 인물이 가려지지 않는 곳으로)
  moveTo(x, y) {
    this.homeX = x;
    this.shift(x - this.panel.x, y - this.panel.y);
  }
}
window.SpeedPanel = SpeedPanel;

// 챕터 장면의 바탕: 배경, 눈금, 저주 시스템(진실의 원), 공통 UI, 배경음악, 저주 풀기 연출
class ChapterScene extends BaseScene {
  create() {
    this.setupLayers();
    const bg = MANIFEST.backgrounds[this.info.bg];
    this.PX = GAME_CONFIG.pxPerMeter;
    this.worldW = bg.worldWidth;
    this.worldH = bg.worldHeight;
    // 배경 JSON의 발 기준선이 그림과 어긋난 배경은 config.js 의 groundYFix 로 바로잡는다
    this.groundY = (GAME_CONFIG.groundYFix && GAME_CONFIG.groundYFix[this.info.bg]) || bg.groundY;
    this.worldLayer.add(this.add.image(0, 0, bg.key).setOrigin(0, 0).setDepth(-10));
    if (bg.ruler) {
      this.ruler = this.add.image(0, 0, bg.ruler).setOrigin(0, 0).setDepth(-4);
      this.worldLayer.add(this.ruler);
    }
    const saved = Save.chapter(this.scene.key);
    this.curse = new CurseSystem(this, {
      worldLayer: this.worldLayer, uiLayer: this.uiLayer, cursed: this.startCursed(saved),
    });
    this.cameras.main.setBounds(0, 0, this.worldW, this.worldH);

    this.buildWorld();              // 장면마다: 물체, 진실의 원, 카메라 따라가기
    this.curse.finishCameras();
    this.setupCommonUI();
    this.speedPanel = new SpeedPanel(this, this.uiLayer);
    // 2막 탑 지도·3막 심연 지도 (방에 들어오면 3초 동안 보이고, 왼쪽 아래 버튼으로 열고 닫는다)
    if (this.info.act >= 2 && this.info.chapter) {
      this.towerMap = new TowerMap(this, this.uiLayer);
      this.towerMap.show(3);
    }
    this.applySettings();
    this.musicMode = null;
    this.playerInCircle = false;
    this.updateMusic();
    if (this.info.act === 3) GAME_CONFIG.act3.ambience.forEach((id) => Sound.startLoop(id));   // 심연 환경음 (아주 작게)
    // 장 끝 팡파르·깨달음 징글을 미리 읽어 둔다 (총괄지시 57번 — 틀 때 처음 읽으면 늦게 나서 다음 장 소리와 겹쳤다)
    if (this.info.chapter) { Sound.preload(GAME_CONFIG.music.chapterClear); if (this.curse.cursed) Sound.preload(GAME_CONFIG.music.realize); }
    Save.setLastScene(this.scene.key);
    this.onCurseChanged();
    this.events.once('shutdown', () => Sound.stopAllLoops());
    this.setupStory();
    this.onReady();
    this.sceneReady = true;
    this.startStory();
  }

  // ---------- 목표 한 줄·도착 대사·방 사이 해설 (총괄지시 수정목록 10·11번) ----------
  setupStory() {
    const key = this.scene.key;
    this.goalText = UIKit.text(this, 560, 16, '', {   // HUD 무기 아이콘에 붙지 않게 (2차 20번)
      fontSize: '26px', fontStyle: 'bold', color: UIKit.SKY, backgroundColor: '#0b1320dd', padding: { x: 14, y: 6 },
    }).setOrigin(0, 0).setScrollFactor(0).setDepth(310).setVisible(false);
    this.uiLayer.add(this.goalText);
    // 처음 들어온 방이면 도착 대사를 intro 앞에 붙인다
    this.arrivalLines = null;
    const aKey = window.ARRIVALS && ARRIVALS[key];
    // 앞 장에서 "다음"으로 올라왔고 아직 저주 상태면, 예전에 한 번 들어왔던 방이어도 도착 대사를 다시 (총괄지시 54번 — 무엇을 할지 안내)
    const viaNext = SceneFlow.pendingTransition === key && this.curse && this.curse.cursed;
    if (aKey && (!Save.chapter(key).arrived || viaNext)) {
      this.arrivalLines = (DIALOGUE[this.info.dialogue || key] || {})[aKey] || null;
      Save.setChapter(key, { arrived: true });
    }
    // 앞 방에서 "다음"으로 왔으면 검은 화면 해설을 먼저 (그동안 들어온 대사는 잠시 맡아 둔다)
    const tKey = SceneFlow.pendingTransition === key && window.TRANSITIONS ? TRANSITIONS[key] : null;
    SceneFlow.pendingTransition = null;
    this.transitionLines = tKey ? (DIALOGUE.Transitions || {})[tKey] : null;
    this.heldSays = [];
    this.holdSay = !!this.transitionLines;
  }

  startStory() {
    const flush = () => {
      this.holdSay = false;
      const held = this.heldSays.splice(0);   // 해설 동안 맡아 둔 대사 모두 (대화창이 차례로 줄 세운다)
      if (held.length) held.forEach(([k, cb]) => this.say(k, cb));
      else if (this.arrivalLines) { const l = this.arrivalLines; this.arrivalLines = null; this.dialogue.play(l, this.withArrivalFocus()); }
    };
    if (this.transitionLines) {
      const black = this.add.rectangle(0, 0, 1920, 1080, 0x000000, 1).setOrigin(0, 0).setScrollFactor(0).setDepth(490); // 대화창(500) 바로 아래
      this.uiLayer.add(black);
      this.dialogue.play(this.transitionLines, () => {
        this.tweens.add({ targets: black, alpha: 0, duration: 500, onComplete: () => black.destroy() });
        flush();
      });
    } else {
      flush();
    }
  }

  // 대사 틀기: 해설이 끝날 때까지 맡아 두고, 도착 대사가 남아 있으면 앞에 붙인다
  say(dialogueKey, onDone) {
    if (this.holdSay) { this.heldSays.push([dialogueKey, onDone]); return; }
    // 다른 대사가 나오는 중이면 대화창(DialogueBox.play)이 줄을 세워 끝난 뒤에 튼다 (총괄지시 49·59번)
    let lines = (DIALOGUE[this.info.dialogue || this.scene.key] || {})[dialogueKey];
    if (this.arrivalLines) { lines = this.arrivalLines.concat(lines || []); this.arrivalLines = null; onDone = this.withArrivalFocus(onDone); }
    this.dialogue.play(lines, onDone);
  }

  // 도착 해설에 나오는 것(트롤·상인 등)이 화면 밖에 있으면, 해설하는 동안 카메라가 그쪽을 비추고 끝나면 돌아온다
  // 방마다 arrivalFocusX()가 비출 곳(px)을 돌려준다 (없으면 그대로) — 총괄지시 2차 17번
  // arrivalOnTop: 해설하는 것이 화면 아래쪽(대화창 자리)에 있으면 그동안 대화창을 위로 올린다
  withArrivalFocus(onDone) {
    const x = this.arrivalFocusX ? this.arrivalFocusX() : null;
    const prev = this.curse && this.curse.follow;
    const top = !!this.arrivalOnTop;
    if ((x == null || !prev) && !top) return onDone;
    let focus = null;
    if (x != null && prev) {
      focus = this.add.rectangle(x, prev.target.y - 200, 1, 1).setVisible(false);
      this.worldLayer.add(focus);
      this.curse.followTarget(focus, prev.bounds, 0.05);
    }
    if (top) this.dialogue.setTop(true);
    return () => {
      if (top) this.dialogue.setTop(false);
      if (focus) { this.curse.followTarget(prev.target, prev.bounds, prev.lerp); focus.destroy(); }
      if (onDone) onDone();
    };
  }

  updateGoal() {
    if (!this.goalText) return;
    const g = window.GOALS && GOALS[this.scene.key];
    let text = g;
    if (g && typeof g === 'object') text = this.curse.cursed ? g.cursed : g.freed;
    if (typeof text === 'function') text = text(this);
    const s = text ? '목표: ' + text : '';
    if (s !== this.goalText.text) this.goalText.setText(s);
    this.goalText.setVisible(!!text && !(this.exam && this.exam.isOpen));
  }

  // 저장에 "해방됨"으로 되어 있으면 해방 상태로 시작
  startCursed(saved) {
    return !saved.freed;
  }

  // ---------- 배경음악 ----------
  // 고르는 순서: 보스전 → 진실의 원 안(저주 상태일 때만) → 퍼즐 방 → 탐험(저주판/해방판)
  // 탐험 음악의 저주판·해방판은 같은 위치에서 바뀌고, 다른 곡에 다녀오면 멈췄던 자리부터 이어진다.
  // 퍼즐 방·전투·보스전은 장면에서 setMusicMode('puzzle' | 'battle' | 'boss' | null)로 알린다.
  setMusicMode(mode) {
    this.musicMode = mode;
    this.updateMusic();
  }

  updateMusic() {
    if (this.exam && this.exam.isOpen) return; // 시험 중에는 시험 음악
    if (Sound.jingle) return;                  // 징글·팡파르가 끝날 때까지 배경음악을 겹치지 않는다
    if (this.leavingNow) return;               // 팡파르 뒤 다음 장면을 불러오는 동안 이 방 음악을 다시 틀지 않는다
    const b = this.info.bgm || {};
    const M = GAME_CONFIG.music;
    let id;
    let group = null;
    if (this.musicMode === 'boss') id = M.boss;
    else if (this.musicMode === 'midboss') id = M.midboss;
    else if (this.musicMode === 'battle') id = M.battle;
    else if (this.curse.cursed && this.playerInCircle) id = M.truthCircle;
    else if (this.musicMode === 'puzzle') id = M.puzzle;
    else {
      id = this.curse.cursed ? b.cursed : b.freed;
      group = 'explore:' + id;   // 곡마다 따로: 다른 곡(진실의 원·퍼즐)에 다녀오면 그 곡의 멈춘 자리부터
    }
    if (id && id !== Sound.currentBgm()) Sound.playBgm(id, { group });
  }

  // ---- 물체 위 키 안내 (총괄지시 2막리뷰 34번)
  // addPrompt({ key: 'Z', text: '회로판 열기', x: 숫자 또는 () => 숫자, range: px(기본 0.9 m), when: () => bool, y })
  // 이안이 가까이 가면 가장 가까운 안내 하나가 그 물체 위에 "Z: 회로판 열기"로 뜬다. newKey: '설명'을 주면 이 장에서 그 키를 처음 볼 때 화면 가운데 큰 안내 한 번
  addPrompt(p) {
    (this.prompts = this.prompts || []).push(p);
  }

  updatePrompts() {
    if (!this.prompts || !this.player) return;
    if (!this.promptText) {
      this.promptText = UIKit.text(this, 0, 0, '', { fontSize: '26px', color: UIKit.SKY, backgroundColor: '#0b1320dd', padding: { x: 10, y: 6 } })
        .setOrigin(0.5, 1).setDepth(50).setVisible(false);
      this.worldLayer.add(this.promptText);
    }
    let best = null, bd = Infinity;
    if (!this.isBlocked() && !(this.dialogue && this.dialogue.active)) {
      for (const p of this.prompts) {
        if (p.when && !p.when()) continue;
        const x = typeof p.x === 'function' ? p.x() : p.x;
        if (x === null || x === undefined) continue;
        const d = Math.abs(this.player.x - x);
        if (d <= (p.range ?? 0.9 * this.PX) && d < bd) { bd = d; best = { p, x }; }
      }
    }
    if (!best) { this.promptText.setVisible(false); return; }
    const p = best.p, text = typeof p.text === 'function' ? p.text() : p.text;
    this.promptText.setText(p.key ? `${p.key}: ${text}` : text);
    // 화면 왼쪽 탑 지도·오른쪽 끝에 가리지 않게 화면 안쪽으로 당긴다
    const cam = this.cameras.main, half = this.promptText.width / 2;
    const px = Phaser.Math.Clamp(best.x, cam.scrollX + 300 + half, cam.scrollX + cam.width - 20 - half);
    this.promptText.setPosition(px, p.y ?? this.groundY - 300).setVisible(true);
    if (p.newKey) this.introKey(p.newKeyName || p.key, p.newKey);
  }

  // ---- 실험 전 예측 (총괄지시 2막리뷰 41번, 문구는 js/data/predictions.js)
  // 진실의 원 실험(this.lab)을 처음 열 때 두 보기 중 하나를 고르게 하고, 실험이 끝나면 "예측: ○ / 결과: ○" 한 줄. 저장 prediction
  wrapLabWithPrediction() {
    const lab = this.lab, P = window.PREDICTIONS && PREDICTIONS[this.scene.key];
    if (!lab || !P || lab.predWrapped) return;
    lab.predWrapped = true;
    const realOpen = lab.open.bind(lab);
    lab.open = (onDone) => {
      if (Save.chapter(this.scene.key).prediction) { realOpen(onDone); return; }   // 한 번만 묻는다
      this.askPrediction(P, () => realOpen(onDone));
    };
  }

  askPrediction(P, onPicked) {
    this.predicting = true;
    const c = this.add.container(0, 0).setScrollFactor(0).setDepth(700);
    this.uiLayer.add(c);
    c.add(this.add.rectangle(0, 0, 1920, 1080, 0x061018, 0.97).setOrigin(0, 0).setInteractive());
    c.add(UIKit.text(this, 960, 250, '실험 전에 예측해 보자', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5));
    c.add(UIKit.text(this, 960, 360, P.question, { fontSize: '34px', align: 'center', wordWrap: { width: 1400 } }).setOrigin(0.5));
    const pick = (i) => {
      if (!this.predicting) return;
      this.predicting = false;
      kb.off('keydown-ONE', k1); kb.off('keydown-TWO', k2);
      Save.setChapter(this.scene.key, { prediction: { choice: i, correct: i === P.answer } });
      Sound.play('sfx_ui_click');
      c.destroy();
      onPicked();
    };
    const order = Math.random() < 0.5 ? [0, 1] : [1, 0];   // 보기 순서를 섞는다 — 정답 자리로 답을 알 수 없게 (팀장검토 L3). 저장은 원래 번호
    order.forEach((orig, i) => c.add(UIKit.button(this, 960, 520 + i * 120, `${i + 1}  ${P.choices[orig]}`, () => pick(orig), { fontSize: 32, width: 1000 })));
    c.add(UIKit.text(this, 960, 800, '1 또는 2를 누르거나 눌러서 고르기', { fontSize: '24px', color: '#cfe3f5' }).setOrigin(0.5));
    const kb = this.input.keyboard, k1 = () => pick(order[0]), k2 = () => pick(order[1]);
    kb.on('keydown-ONE', k1); kb.on('keydown-TWO', k2);
  }

  // 실험이 끝나면(lab.done) 무엇을 물었는지와 예측·결과를 함께 (질문 없이 "예측/결과"만 있으면
  // 다른 사례를 보는 중에 그 사례의 결과로 오해할 수 있었다 — 평가단 제안 UI-01)
  updatePrediction() {
    const lab = this.lab, P = window.PREDICTIONS && PREDICTIONS[this.scene.key];
    if (!lab || !P || !lab.isOpen || !lab.done || this.predShown) return;
    const pr = Save.chapter(this.scene.key).prediction;
    if (!pr) return;
    this.predShown = true;
    const t = UIKit.text(this, 960, 1076, `${P.question}\n예측: ${P.choices[pr.choice]}   /   결과: ${P.choices[P.answer]}   ${pr.correct ? '— 예측이 맞았다!' : '— 예측과 달랐다'}`, {
      fontSize: '26px', fontStyle: 'bold', align: 'center', color: pr.correct ? '#9fe0ff' : '#ffd27a', backgroundColor: '#0b1320ee',
      padding: { x: 20, y: 8 }, wordWrap: { width: 1260, useAdvancedWrap: true },
    }).setOrigin(0.5, 1).setScrollFactor(0).setDepth(700);   // 실험 화면 맨 아래 가운데 (오른쪽 아래 "다음" 버튼과 겹치지 않게)
    this.uiLayer.add(t);
    // 실험 화면이 닫힐 때까지 둔다 (실험 결과는 "다음"을 눌러야 닫힌다)
    const ev = this.time.addEvent({ delay: 200, loop: true, callback: () => { if (!lab.isOpen) { t.destroy(); ev.remove(); } } });
  }

  // 화면 가운데 위 짧은 안내 (2초)
  toast(text, color = '#ffe08a') {
    if (this.toastText) this.toastText.destroy();
    const t = UIKit.text(this, 960, 200, text, { fontSize: '34px', fontStyle: 'bold', color, backgroundColor: '#1a0e08e6', padding: { x: 24, y: 12 } })
      .setOrigin(0.5).setScrollFactor(0).setDepth(1600);
    this.uiLayer.add(t);
    this.toastText = t;
    this.time.delayedCall(2200, () => { if (t.active) t.destroy(); });
    return t;
  }

  // 진실의 원이 나타나는 순간 (총괄지시 53번): 이안 머리 위 작은 마법서가 하늘빛으로 빛나고, 노란 안내 앞에 "마법서 표지가 빛난다!"
  onCircleRevealed(nearby) {
    if (this.circleRevealed) return;
    this.circleRevealed = true;
    const p = this.ian || this.player;
    if (p && MANIFEST.ui.images.book_cover) {
      const img = this.add.image(p.x, p.y - 260, MANIFEST.ui.images.book_cover.key).setDepth(60);
      img.setScale(70 / img.width);
      const glow = this.add.ellipse(p.x, p.y - 260, 120, 120, 0x9fe0ff, 0.5).setDepth(59).setBlendMode('ADD');
      this.worldLayer.add([glow, img]);
      const follow = () => { if (!img.active) { this.events.off('postupdate', follow); return; } img.setPosition(p.x, p.y - 260); glow.setPosition(p.x, p.y - 260); };
      this.events.on('postupdate', follow);
      for (let i = 1; i <= 10; i++) this.time.delayedCall(i * 150, () => glow.active && glow.setAlpha(0.5 * (1 + Math.sin(i))));
      this.time.delayedCall(1800, () => { img.destroy(); glow.destroy(); });
    }
    // 같은 순간에 정해지는 노란 안내 앞에 붙인다 (다음 프레임에 — 장면이 안내를 먼저 쓰도록)
    this.time.delayedCall(30, () => {
      const PRE = '마법서 표지가 빛난다! ';
      if (nearby) this.toast('마법서 표지가 빛난다! 진실의 원이 나타났다', '#9fe0ff');   // 처음부터 있던 원에 가까이 왔을 때
      else if (this.message && this.message.text && !this.message.text.startsWith(PRE)) this.message.setText(PRE + this.message.text).setColor('#ffe08a');
      else if (!this.message || !this.message.text) this.toast('마법서 표지가 빛난다! 진실의 원이 나타났다');
    });
  }

  // ---- 큰 레버 스위치 (총괄지시 2막리뷰 46번, 요청서 12 그림 lever_switch left·middle·right, 없으면 엔진 그림)
  // makeLever({ x, state: 'left'|'right', labels: [왼쪽 뜻, 오른쪽 뜻], scale }) → 레버. 레버 위 작은 글은 지금 상태 쪽만 밝게
  makeLever({ x, state, labels, scale = 0.8 }) {
    const O = MANIFEST.objects.lever_switch;
    const lv = { x, state, scale, labels };
    if (O) {
      lv.img = this.add.image(x, this.groundY, O.states[state]).setOrigin(O.pivot.x / O.width, O.pivot.y / O.height).setScale(scale).setDepth(2);
      this.worldLayer.add(lv.img);
    } else {
      lv.g = this.add.graphics().setDepth(2);   // 그림이 오기 전: 받침 + 놋쇠 막대 + 손잡이
      this.worldLayer.add(lv.g);
    }
    const y = this.groundY - 220 * scale - 18;
    lv.texts = labels.map((t, i) => {
      const tx = UIKit.text(this, x + (i ? 1 : -1) * 8, y, t, { fontSize: '18px', color: '#f3ead6', backgroundColor: '#0b1320cc', padding: { x: 6, y: 3 } })
        .setOrigin(i ? 0 : 1, 1).setDepth(3);
      this.worldLayer.add(tx);
      return tx;
    });
    this.setLever(lv, state);
    return lv;
  }

  setLever(lv, state) {
    lv.state = state;
    const O = MANIFEST.objects.lever_switch;
    if (lv.img) lv.img.setTexture(O.states[state]);
    else {
      const s = lv.scale, gx = lv.x, gy = this.groundY, ax = gx, ay = gy - 43 * s;
      const ang = { left: -35, middle: 0, right: 35 }[state] * Math.PI / 180, L = 120 * s;
      lv.g.clear().fillStyle(0x6b5a48, 1).fillRect(gx - 55 * s, gy - 30 * s, 110 * s, 30 * s)
        .lineStyle(12 * s, 0xc9a24a, 1).lineBetween(ax, ay, ax + Math.sin(ang) * L, ay - Math.cos(ang) * L)
        .fillStyle(0xd9b25a, 1).fillCircle(ax + Math.sin(ang) * L, ay - Math.cos(ang) * L, 12 * s);
    }
    lv.texts.forEach((t, i) => t.setAlpha((state === 'left' && i === 0) || (state === 'right' && i === 1) ? 1 : 0.35));
  }

  // 이안이 레버를 민다: 레버가 넘어가 있는 쪽에 서서 반대쪽으로 민다 (반대편에 있으면 반 걸음 옮긴다).
  // push 동작 → 레버 left → middle → right(또는 반대)로 0.1초씩 → sfx_switch_flip → onDone(새 상태)
  pushLever(lv, onDone) {
    const to = lv.state === 'left' ? 'right' : 'left', dir = to === 'right' ? 1 : -1;
    // 손이 손잡이에 닿는 자리: 손잡이는 막대 끝(가운데에서 약 55px), 이안 그림은 오른쪽을 볼 때 손이 몸 앞 약 40px, 왼쪽을 볼 때 약 15px
    this.ian.x = lv.x - dir * (dir > 0 ? 95 : 70) * lv.scale / 0.8;
    this.ian.setFlipX(dir < 0);
    Characters.play(this.ian, 'push', false);
    this.actT = Math.max(this.actT || 0, 0.45);
    this.time.delayedCall(120, () => this.setLever(lv, 'middle'));
    this.time.delayedCall(220, () => {
      this.setLever(lv, to);
      Sound.play('sfx_switch_flip');
      if (onDone) onDone(to);
    });
  }

  // 불꽃 요정 머리 위 + / − 기호 (빨강·파랑 색만으로 구분하지 않게 — 총괄지시 2막리뷰 35번). 요정이 사라지면 함께 사라진다
  attachChargeSign(sprite, q) {
    const t = UIKit.text(this, sprite.x, sprite.y, q > 0 ? '+' : '−', {
      fontSize: '40px', fontStyle: 'bold', color: q > 0 ? '#ff7a6a' : '#7ab8ff', stroke: '#0b1320', strokeThickness: 6,
    }).setOrigin(0.5, 1).setDepth(sprite.depth + 1);
    this.worldLayer.add(t);
    const follow = () => {
      if (!sprite.active) { t.destroy(); this.events.off('postupdate', follow); return; }
      t.setPosition(sprite.x, sprite.y - sprite.displayHeight * 0.2).setVisible(sprite.visible);   // 요정 그림 칸은 몸보다 훨씬 커서 칸 높이의 0.2만큼 위
    };
    this.events.on('postupdate', follow);
    return t;
  }

  // 이 장에서 처음 쓰는 키: 화면 가운데 큰 안내 한 번 (저장에 남겨 다시 들어와도 한 번만)
  introKey(key, desc) {
    const done = Save.chapter(this.scene.key).keyIntro || [];
    if (done.includes(key)) return;
    Save.setChapter(this.scene.key, { keyIntro: [...done, key] });
    // 앞 안내가 아직 떠 있으면 끝난 뒤에 (두 안내가 겹치지 않게)
    const wait = Math.max(0, (this.keyBannerUntil || 0) - this.time.now);
    this.keyBannerUntil = this.time.now + wait + 3300;
    if (wait > 0) { this.time.delayedCall(wait, () => this.showKeyBanner(key, desc)); return; }
    this.showKeyBanner(key, desc);
  }

  // 전투 안전장치 (총괄지시 59번): 적은 전투 시작 대사가 끝난 뒤의 콜백에서만 나온다.
  // 전투가 시작됐는데(this.battle) 대사가 닫힌 뒤 1초가 지나도 첫 무리가 나오지 않았으면 직접 부른다.
  // (첫 무리가 나오면 wave가 처음 값에서 바뀐다 — 2-1은 -1, 나머지는 0. 그 뒤에는 쓰러져 다시 할 때 wave가 돌아가도 건드리지 않는다)
  checkBattleStall(dt) {
    const B = this.battle;
    if (!B || B.done || B.started) return;
    if (B.w0 === undefined) B.w0 = B.wave;
    if (B.wave !== B.w0) { B.started = true; return; }
    const spawn = this.spawnWave || this.nextWave;
    if (!spawn || this.dialogue.active || this.isBlocked()) { B.stallT = 0; return; }
    B.stallT = (B.stallT || 0) + Math.min(dt, 0.05);
    if (B.stallT >= 1) {
      B.started = true;
      console.warn('전투 안전장치: 첫 무리가 나오지 않아 직접 부름', this.scene.key);
      spawn.call(this);
    }
  }

  // "이 방에서 할 일" 작은 카드 (seconds 초 동안)
  showTaskCard(lines, seconds = 4) {
    if (this.taskCard && this.taskCard.active) this.taskCard.destroy();
    const c = this.add.container(0, 0).setScrollFactor(0).setDepth(330);
    const t = UIKit.text(this, 720, 480, ['이 방에서 할 일', ...lines].join('\n'), {
      fontSize: '30px', align: 'center', lineSpacing: 10, color: '#ffe08a', backgroundColor: '#0b1320ee', padding: { x: 30, y: 18 },
    }).setOrigin(0.5);
    c.add(t);
    this.uiLayer.add(c);
    this.taskCard = c;
    this.time.delayedCall(seconds * 1000, () => { if (c.active) c.destroy(); });
  }

  // 지금 해야 할 물건 위의 깜빡이는 노란 화살표. x가 null이면 숨긴다
  pointArrow(x, y) {
    if (!this.arrowG || !this.arrowG.active) {
      this.arrowG = this.add.graphics().setDepth(9);
      this.worldLayer.add(this.arrowG);
    }
    const G = this.arrowG;
    G.clear();
    if (x === null || x === undefined) return;
    const k = this.time.now / 1000, bob = Math.sin(k * 5) * 8;
    if (Math.sin(k * 6) < -0.6) return;   // 깜빡임
    G.fillStyle(0xffe08a, 1).lineStyle(3, 0x1a0e08, 1);
    G.fillTriangle(x - 20, y + bob - 26, x + 20, y + bob - 26, x, y + bob);
    G.strokeTriangle(x - 20, y + bob - 26, x + 20, y + bob - 26, x, y + bob);
  }

  // 화면 가운데 큰 차례 안내 (null이면 숨긴다)
  setStepText(text) {
    if (!this.stepText || !this.stepText.active) {
      this.stepText = UIKit.text(this, 720, 500, '', {
        fontSize: '40px', fontStyle: 'bold', align: 'center', color: '#ffe08a', backgroundColor: '#0b1320ee', padding: { x: 30, y: 16 },
      }).setOrigin(0.5).setScrollFactor(0).setDepth(330);
      this.uiLayer.add(this.stepText);
    }
    this.stepText.setVisible(!!text).setText(text || '');
  }

  showKeyBanner(key, desc) {
    const t = UIKit.text(this, 960, 400, `새 키  ${key}\n${desc}`, {
      fontSize: '44px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08e6', padding: { x: 36, y: 20 }, align: 'center',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1500);
    this.uiLayer.add(t);
    this.keyBanner = t;
    this.tweens.add({ targets: t, alpha: 0, delay: 2600, duration: 600, onComplete: () => t.destroy() });
    this.time.delayedCall(3400, () => { if (t.active) t.destroy(); });   // 트윈이 밀려도 반드시 사라지게
  }

  // 주인공이 진실의 원에 들어가고 나가는 것 살피기 (들어가면 차임 소리)
  update(time, deltaMs) {
    super.update(time, deltaMs);
    if (this.sceneReady && !this.circleRevealed && this.curse && this.curse.cursed && this.player && !this.isBlocked()) {
      const c = this.curse.circles.find((k) => k.active && Math.abs(this.player.x - k.x) < 5 * this.PX);
      if (c) this.onCircleRevealed(true);
    }
    // 마법서·시험·실험 화면이 열려 있으면 "새 키" 큰 안내를 숨긴다 (마법서 가운데를 가리던 것, 총괄지시 47번)
    if (this.keyBanner && this.keyBanner.active) this.keyBanner.setVisible(!(this.spellbook?.isOpen || this.exam?.isOpen || this.lab?.isOpen || this.predicting));
    this.checkBattleStall(deltaMs / 1000);
    this.updatePrompts();
    this.wrapLabWithPrediction();
    this.updatePrediction();
    const p = this.player;
    const inside = !!(p && this.curse.inCircle(p.x));
    if (inside !== this.playerInCircle) {
      this.playerInCircle = inside;
      if (inside && this.curse.cursed) Sound.play('sfx_truth_circle_enter');
    }
    this.updateMusic();
    this.updateGoal();
    // 노란 안내 글이 비어 있으면 빈 검은 상자가 남지 않게 숨긴다 (2차 21번과 같은 원인)
    if (this.message && this.message.setVisible) this.message.setVisible(this.message.text !== '');
  }

  // 챕터 끝 마법서 시험 앞 (총괄지시 2차 17번): 이 장의 마법서 장이 빛나며 나타나고 안내 한 줄 → 잠시 뒤 시험 버튼.
  // 돌려주는 값은 시험 버튼 (누르면 빛나는 장은 사라진다). 복원된 장이면 삽화, 아니면 찢긴 장 그림
  showExamIntro(onStart) {
    const ch = (this.spellbook ? this.spellbook.chapters() : MANIFEST.ui.chapters || []).find((c) => c.chapter === this.info.chapter);
    const parts = [];
    if (ch) {
      const key = Save.isRestored(ch.chapter) || !this.textures.exists(ch.torn) ? ch.illustration : ch.torn;   // 찢긴 장 그림은 펼칠 때만 불러온다
      const glow = this.add.ellipse(960, 470, 560, 400, 0x9fe0ff, 0.28);
      const page = this.add.image(960, 470, key);
      page.setScale(Math.min(440 / page.width, 300 / page.height));
      const line = UIKit.text(this, 960, 690, `마법서 제${Number(ch.chapter)}장 「${ch.topic}」이 빛난다 — 시험을 통과하면 이 장의 법칙을 완성한다`, {
        fontSize: '30px', fontStyle: 'bold', color: UIKit.SKY, backgroundColor: '#0b1320dd', padding: { x: 18, y: 8 },
      }).setOrigin(0.5);
      parts.push(glow, page, line);
      for (const o of parts) { o.setScrollFactor(0).setDepth(318); this.uiLayer.add(o); }
      this.tweens.add({ targets: glow, scale: 1.08, yoyo: true, repeat: -1, duration: 900 });
      Sound.play('sfx_page_restore');
    }
    const btn = UIKit.button(this, 960, 985, '마법서 시험 보기 ▶', () => {
      parts.forEach((o) => o.setVisible(false));
      onStart();
    }, { fontSize: 30 }).setScrollFactor(0).setDepth(320).setVisible(!ch);
    this.uiLayer.add(btn);
    if (ch) this.time.delayedCall(1200, () => btn.setVisible(true));
    return btn;
  }

  // 돌 비석 안내판을 x(발 기준선 groundY)에 세운다 — 요청서 08로 받은 그림(warning_stele, ⚠ 새김).
  // 실제 글은 대화창 해설로 보여 준다. 그림이 없으면 엔진으로 그리고 mark(예: '⚠\n4초')를 새긴다
  drawStele(x, groundY, mark, depth = -1) {
    const S = MANIFEST.objects.warning_stele;
    if (S && this.textures.exists(S.key)) {
      const img = this.add.image(x, groundY, S.key).setOrigin(S.pivot.x / S.width, S.pivot.y / S.height).setDepth(depth);
      this.worldLayer.add(img);
      return { g: img, t: null };
    }
    const sw = 74, sh = 132;
    const g = this.add.graphics().setDepth(depth);
    g.fillStyle(0x3d434c, 1).fillRoundedRect(x - sw / 2 - 4, groundY - sh - 4, sw + 8, sh + 4, { tl: 30, tr: 30, bl: 0, br: 0 });
    g.fillStyle(0x6b7480, 1).fillRoundedRect(x - sw / 2, groundY - sh, sw, sh, { tl: 26, tr: 26, bl: 0, br: 0 });
    g.fillStyle(0xdff4ff, 0.85).fillRect(x - sw / 2 + 4, groundY - sh + 2, sw - 8, 6);
    g.fillStyle(0x4a515b, 1);
    for (let i = 0; i < 4; i++) g.fillRect(x - 24, groundY - sh + 64 + i * 14, i === 3 ? 30 : 48, 4);
    const t = UIKit.text(this, x, groundY - sh + 14, mark, {
      fontSize: '20px', fontStyle: 'bold', color: '#ffe08a', align: 'center', lineSpacing: -2,
    }).setOrigin(0.5, 0).setDepth(depth);
    this.worldLayer.add([g, t]);
    return { g, t };
  }

  applySettings() {
    if (this.ruler) this.ruler.setVisible(!!Save.setting('showRuler'));
    this.speedPanel.setVisible(!!Save.setting('showSpeed'));
  }

  teacherSetRuler(v) { super.teacherSetRuler(v); this.applySettings(); }
  teacherSetSpeed(v) { super.teacherSetSpeed(v); this.applySettings(); }

  // 교사용: 저주/해방 바로 전환 (테스트용)
  teacherToggleCurse() {
    this.setCursed(!this.curse.cursed);
    this.teacher.refresh();
  }

  setCursed(cursed) {
    this.curse.set(cursed);
    this.updateMusic();
    this.onCurseChanged();
  }

  // 저주 풀기: 소리 + 저주 색이 서서히 걷힘 + 음악을 같은 위치에서 해방판으로 → 해금 카드 → 마법서 장 복원
  // (진실의 원 안에서 풀려도 탐험 음악은 저주판이 멈췄던 위치에서 해방판으로 이어진다)
  breakCurse(onDone) {
    const fade = GAME_CONFIG.curse.fadeSeconds;
    // 소리: 저주판 성 음악 멈춤 → 유리 깨지는 소리 → (그 소리가 끝나면) 깨달음 징글 → 징글이 끝나면 해방판 성 음악을 처음부터
    const M = GAME_CONFIG.music;
    Sound.stopBgm(0);
    Sound.play('sfx_curse_break');
    const breakSec = (MANIFEST.sounds.sfx_curse_break || {}).duration || 1.5;
    Sound.playJingle(M.realize, () => {
      const freed = (this.info.bgm || {}).freed;
      if (freed) delete Sound.positions['explore:' + freed];      // 해방판은 처음부터
      if (this.sys.isActive()) this.updateMusic();
    }, { delay: breakSec });
    this.curse.fadeTo(false, fade);
    Save.setChapter(this.scene.key, { freed: true });
    if (this.towerMap) this.towerMap.show(3);
    this.onCurseChanged();
    this.time.delayedCall(fade * 1000, () => {
      const ch = this.info.chapter;
      this.unlockCard.show(ch && UNLOCKS[ch], () => {
        if (!ch) { if (onDone) onDone(); return; }
        Save.restorePage(ch);
        this.spellbook.open(ch, { restoredNow: true, onClose: onDone });
      });
    });
  }

  // 장면마다 덮어쓰는 것들
  buildWorld() {}
  onReady() {}
  onCurseChanged() {
    this.speedPanel.setMode(this.curse.cursed, this.curseRuleText());
  }
  curseRuleText() { return ''; }
}
window.ChapterScene = ChapterScene;
