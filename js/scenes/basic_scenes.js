// 시작·제목·프롤로그·1막 완료 장면, 그리고 아직 만들지 않은 챕터의 임시 장면

// 처음: 제목 화면에 필요한 그림 묶음을 불러온 뒤 제목으로
class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }
  create() {
    UIKit.text(this, 960, 540, '불러오는 중…', { fontSize: '48px' }).setOrigin(0.5);
    Packs.load(SceneFlow.packsFor('Title')).then(() => this.scene.start('Title'));
  }
}

class TitleScene extends BaseScene {
  constructor() { super('Title'); }
  create() {
    this.setupLayers();
    const I = MANIFEST.ui.images;
    const L = this.uiLayer;
    L.add(this.add.image(0, 0, I.title_bg.key).setOrigin(0, 0));
    L.add(this.add.image(960, 30, I.title_logo.key).setOrigin(0.5, 0));
    const ian = Characters.create(this, 'ian', 1700, 845).setFlipX(true);
    L.add(ian);

    // "처음부터"(진행을 모두 지우고 새로) / "이어하기"(마지막 방부터) — 여러 학생이 한 PC를 쓰므로 나눈다 (총괄지시 2차 22번)
    const last = Save.data.lastScene;
    const hasProgress = !!(last || Object.keys(Save.data.chapters).length || Save.data.restoredPages.length);
    const begin = () => {
      Sound.unlock();
      Save.resetProgress();
      this.goNext();
    };
    L.add(UIKit.button(this, 960, 820, '처음부터', () => (hasProgress ? this.confirmNew(begin) : begin()),
      { fontSize: 44, width: 360, padY: 16, bg: '#1b2a40', hover: '#2c4668' }));
    if (last && SceneFlow.info(last)) {
      L.add(UIKit.button(this, 960, 925, '이어하기 — ' + SceneFlow.info(last).title, () => {
        Sound.unlock();
        SceneFlow.go(this, last);
      }, { fontSize: 30, width: 600 }));
    }
    if (Save.hasSeenEnding()) {   // 엔딩을 본 뒤에만 (ACT3_PLAN 6단계)
      L.add(UIKit.button(this, 960, 1015, '챕터 다시 하기', () => this.openChapterMenu(), { fontSize: 28, width: 360 }));
    }
    this.setupCommonUI({ hud: false });
    Sound.playBgm('bgm_title');
  }

  // 챕터 다시 하기: 그 장의 저장을 지우고 첫 방부터. 되찾은 마법서 장은 그대로
  openChapterMenu() {
    if (this.chapterBox) return;
    const firsts = [], seen = new Set();
    for (const s of SCENE_LIST) if (s.chapter && !seen.has(s.chapter)) { seen.add(s.chapter); firsts.push(s); }
    const parts = [
      this.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.7).setOrigin(0, 0).setInteractive(),
      this.add.rectangle(960, 540, 1500, 800, 0x0b1320, 0.97).setStrokeStyle(3, 0x9fd8ff, 0.8),
      UIKit.text(this, 960, 190, '챕터 다시 하기', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5),
    ];
    const close = () => { parts.forEach((p) => p.destroy()); this.chapterBox = null; };
    firsts.forEach((s, i) => {
      const x = 480 + (i % 3) * 480, y = 280 + Math.floor(i / 3) * 90;
      parts.push(UIKit.button(this, x, y, s.title, () => {
        Sound.unlock();
        for (const o of SCENE_LIST) if (o.chapter === s.chapter) Save.resetChapter(o.key);
        SceneFlow.go(this, s.key);
      }, { fontSize: 24, width: 450 }));
    });
    parts.push(UIKit.button(this, 960, 880, '닫기', close, { fontSize: 30, width: 240 }));
    parts.forEach((p) => p.setDepth(900));
    this.uiLayer.add(parts);
    this.chapterBox = parts;
  }

  // "처음부터" 확인 창: 예 → 진행(저주 해제·마법서·도착 대사 기록·마지막 방)을 모두 지우고 새로 시작
  confirmNew(onYes) {
    if (this.confirmBox) return;
    const parts = [
      this.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.6).setOrigin(0, 0).setInteractive(),
      this.add.rectangle(960, 540, 980, 360, 0x0b1320, 0.96).setStrokeStyle(3, 0x9fd8ff, 0.8),
      UIKit.text(this, 960, 455, '정말 처음부터 할까요?', { fontSize: '44px', fontStyle: 'bold', color: UIKit.SKY }).setOrigin(0.5),
      UIKit.text(this, 960, 530, '지금까지의 진행(풀어 낸 저주, 되찾은 마법서, 본 대사)이 모두 지워집니다.', {
        fontSize: '26px', color: '#dfe8f2',
      }).setOrigin(0.5),
    ];
    const close = () => { parts.forEach((p) => p.destroy()); this.confirmBox = null; };
    parts.push(UIKit.button(this, 820, 625, '예, 처음부터', () => { close(); onYes(); }, { fontSize: 32, width: 240 }));
    parts.push(UIKit.button(this, 1100, 625, '아니요', () => close(), { fontSize: 32, width: 240 }));
    parts.forEach((p) => p.setDepth(900));
    this.uiLayer.add(parts);
    this.confirmBox = parts;
  }
}

// 그림 한 장씩 클릭으로 넘기는 간단한 컷신 (2단계에서 제대로 만든다)
class SlideScene extends BaseScene {
  slides() { return []; }
  create() {
    this.setupLayers();
    this.setupCommonUI({ hud: false });
    this.index = -1;
    this.image = this.add.image(0, 0, '__DEFAULT').setOrigin(0, 0);
    this.caption = UIKit.text(this, 960, 1050, '', {
      fontSize: '30px', backgroundColor: '#000000aa', padding: { x: 24, y: 10 },
    }).setOrigin(0.5, 1);
    this.uiLayer.add([this.image, this.caption]);
    this.input.on('pointerdown', () => { if (!this.isBlocked()) this.nextSlide(); });
    this.input.keyboard.on('keydown-SPACE', () => { if (!this.isBlocked()) this.nextSlide(); });
    this.onStart();
    this.nextSlide();
  }
  onStart() {}
  nextSlide() {
    this.index += 1;
    const s = this.slides()[this.index];
    if (!s) { this.goNext(); return; }
    this.image.setTexture(s.image);
    if (s.center) this.image.setOrigin(0.5).setPosition(960, 480); else this.image.setOrigin(0, 0).setPosition(0, 0);
    this.caption.setText(s.caption + '   (클릭하면 계속)');
  }
}

class Act1CompleteScene extends SlideScene {
  constructor() { super('Act1Complete'); }
  onStart() {
    Sound.stopBgm();
    Sound.playBgm(GAME_CONFIG.music.act1Clear);
    Save.setChapter('act1', { complete: true });   // 1막을 끝까지 했다는 기록 (진행 저장)
  }
  slides() {
    const n = Save.data.restoredPages.length;
    return [{ image: 'cut/act1_end', caption: `1막 완료 — 마법서 ${n}/6장 복원` }];
  }
  // 1막을 끝내면 2막 시작 컷신으로 (제목 화면 "이어하기"도 2막 첫 방부터)
  goNext() {
    Save.setLastScene('Ch2_1');
    SceneFlow.go(this, 'Act2Intro');
  }
}

// 2막 시작 컷신 (act2_intro.png) → 2-1
class Act2IntroScene extends SlideScene {
  constructor() { super('Act2Intro'); }
  onStart() {
    Sound.stopBgm();
    Sound.playBgm('bgm_tower_cursed');
    Save.setLastScene('Ch2_1');
  }
  slides() {
    return (DIALOGUE.Act2Story || {}).intro || [{ image: 'cut/act2_intro', caption: '2막 — 번개의 탑' }];
  }
}

// 2막 엔딩 컷신 (act2_ending.png, 2막 완료 음악 한 번) → 2막 완료
class Act2EndingScene extends SlideScene {
  constructor() { super('Act2Ending'); }
  onStart() {
    Sound.stopAllLoops();   // 2-6 반복 소리가 엔딩까지 남지 않게 (총괄지시 68번)
    Sound.stopBgm();
    Sound.playBgm('bgm_act2_clear');
  }
  slides() {
    return (DIALOGUE.Act2Story || {}).ending || [{ image: 'cut/act2_ending', caption: '봉화가 켜졌다' }];
  }
}

// 2막 완료: 복원한 마법서 장 수(7~12장)를 보여 주고 3막 시작 컷신으로 (제목 화면 "이어하기"도 3막 첫 방부터)
class Act2CompleteScene extends SlideScene {
  constructor() { super('Act2Complete'); }
  onStart() {
    Sound.stopAllLoops();
    Save.setChapter('act2', { complete: true });
  }
  slides() {
    const n = Save.data.restoredPages.filter((p) => Number(p) >= 7 && Number(p) <= 12).length;
    return [{ image: 'cut/act2_ending', caption: `2막 완료 — 마법서 ${n}/6장 복원 (7~12장)` }];
  }
  goNext() {
    Save.setLastScene('Ch3_1');
    SceneFlow.go(this, 'Act3Intro');
  }
}

// ---------------- 3막 '빛의 심연' (ACT3_PLAN 0단계 2번)
// 3막 시작 컷신 (act3_intro.png) → 3-1
class Act3IntroScene extends SlideScene {
  constructor() { super('Act3Intro'); }
  onStart() {
    Sound.stopAllLoops();
    Sound.stopBgm();
    Sound.playBgm('bgm_abyss_cursed');
    Save.setLastScene('Ch3_1');
  }
  slides() { return DIALOGUE.Act3Story.intro; }
}

// 최종 보스 → 화해(마법사 reconcile) → 마법서 완성 → 에필로그 → 크레딧 → 제목.
// 아래 네 장면은 흐름을 잇는 뼈대이고, 연출·크레딧 스크롤은 6단계에서 만든다.
class Act3ReconcileScene extends SlideScene {
  constructor() { super('Act3Reconcile'); }
  onStart() {
    Sound.stopAllLoops();
    Sound.stopBgm(0.5);
    const y = MANIFEST.backgrounds.abyss_end.groundY;
    this.uiLayer.add(Characters.create(this, 'ian', 760, y));
    this.uiLayer.add(Characters.create(this, 'wizard', 1200, y, 'reconcile'));
  }
  slides() { return DIALOGUE.Act3Story.reconcile; }
}

class Act3BookCompleteScene extends SlideScene {
  constructor() { super('Act3BookComplete'); }
  onStart() {
    Sound.play('sfx_spellbook_complete');
    Save.setChapter('act3', { complete: true });
  }
  slides() {
    const n = Save.data.restoredPages.length;
    return [{ image: MANIFEST.objects.spellbook_complete.states['01'], center: true, caption: `마법서 완성 — ${n}/18장 복원` }];
  }
  // 18장이 차례로 붙으며(spellbook_complete 01 → 06) 완성된 뒤 마법서를 펼쳐 보여 준다. 닫으면 다음 장면
  nextSlide() {
    if (this.bookRun === undefined) {
      this.bookRun = 0;
      super.nextSlide();
      const S = MANIFEST.objects.spellbook_complete.states, keys = ['02', '03', '04', '05', '06'];
      keys.forEach((k, i) => this.time.delayedCall(350 * (i + 1), () => this.image.setTexture(S[k])));
      this.time.delayedCall(350 * keys.length + 700, () => {
        this.bookRun = 1;
        this.caption.setText(`마법서 완성 — ${Save.data.restoredPages.length}/18장 복원   (클릭하면 마법서를 펼친다)`);
      });
      return;
    }
    if (this.bookRun === 0) return;   // 붙는 동안은 넘어가지 않는다
    if (this.bookRun === 1) {
      this.bookRun = 2;
      this.caption.setVisible(false);   // 마법서 아래 글과 겹치지 않게
      this.spellbook.open(null, { onClose: () => this.goNext() });
    }
  }
}

class Act3EpilogueScene extends SlideScene {
  constructor() { super('Act3Epilogue'); }
  onStart() { Sound.playBgm('bgm_ending'); }
  slides() { return DIALOGUE.Act3Story.epilogue; }
}

// 크레딧 (credits_bg 가운데 빈 자리에 글자) → 끝나면 제목 화면. 여기까지 오면 엔딩을 본 것으로 저장한다
class Act3CreditsScene extends SlideScene {
  constructor() { super('Act3Credits'); }
  onStart() {
    Save.setEndingSeen();
    Save.setLastScene(null);   // 다 봤으니 제목 화면에는 "이어하기" 대신 "챕터 다시 하기"
    const [x0, y0, x1] = MANIFEST.ui.act3.credits_bg.text_regions[0];
    const text = CREDITS.map((c) => c.title || `${c.heading}\n${c.name}`).join('\n\n');
    this.creditText = UIKit.text(this, (x0 + x1) / 2, MANIFEST.ui.act3.credits_bg.text_regions[0][3], text, { fontSize: '36px', align: 'center', lineSpacing: 10 }).setOrigin(0.5, 0);
    this.uiLayer.add(this.creditText);
    this.creditStop = y0 + 120;
  }
  // 글자가 아래에서 위로 올라와 멈춘다
  updateWorld(dt) {
    if (this.creditText && this.creditText.y > this.creditStop) this.creditText.y = Math.max(this.creditStop, this.creditText.y - 90 * dt);
  }
  slides() { return [{ image: 'cut/credits_bg', caption: '끝' }]; }
}

// 아직 만들지 않은 챕터: 배경 위에서 이안이 저주 규칙대로 걸어 볼 수 있고, "다음 장면으로" 버튼이 있다
class PlaceholderChapterScene extends ChapterScene {
  buildWorld() {
    this.ian = Characters.create(this, 'ian', 3 * this.PX, this.groundY);
    this.player = this.ian;
    this.worldLayer.add(this.ian);
    this.curse.followTarget(this.ian, { x: 0, y: 0, width: this.worldW, height: this.worldH });
    this.keys = this.input.keyboard.addKeys({ left: 'LEFT', right: 'RIGHT' });
    this.v = 0;
  }

  onReady() {
    this.uiLayer.add(UIKit.text(this, 1100, 120, `${this.info.title}\n(이 장면은 다음 단계에서 만들어요)`, {
      fontSize: '40px', align: 'center', backgroundColor: '#0b1320cc', padding: { x: 30, y: 18 },
    }).setOrigin(0.5).setScrollFactor(0));
    this.uiLayer.add(UIKit.button(this, 1890, 1050, '다음 장면으로 ▶', () => this.goNext(), {
      originX: 1, originY: 1, fontSize: 30,
    }).setScrollFactor(0));
  }

  updateWorld(dt) {
    const dir = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    const walk = GAME_CONFIG.iceCorridor.walkSpeed;
    if (dir) this.v = dir * walk;
    else if (!this.curse.isFree(this.ian.x)) this.v = 0;
    this.ian.x = Phaser.Math.Clamp(this.ian.x + this.v * this.PX * dt, 60, this.worldW - 60);
    if (this.v) this.ian.setFlipX(this.v < 0);
    Characters.play(this.ian, dir ? 'walk' : (this.v ? 'slide_steady' : 'idle'));
    this.speedPanel.setLines(['이안 ' + Math.abs(this.v).toFixed(2) + ' m/s']);
  }
}

window.BootScene = BootScene;
window.TitleScene = TitleScene;
window.Act1CompleteScene = Act1CompleteScene;
window.Act2IntroScene = Act2IntroScene;
window.Act2EndingScene = Act2EndingScene;
window.Act2CompleteScene = Act2CompleteScene;
window.Act3IntroScene = Act3IntroScene;
window.Act3ReconcileScene = Act3ReconcileScene;
window.Act3BookCompleteScene = Act3BookCompleteScene;
window.Act3EpilogueScene = Act3EpilogueScene;
window.Act3CreditsScene = Act3CreditsScene;
window.PlaceholderChapterScene = PlaceholderChapterScene;

// 2막 장면 (ACT2_PLAN 0단계 2번): 아직 만들지 않은 방은 임시 장면으로 둔다. 단계마다 진짜 장면으로 바꾼다
window.ACT2_PLACEHOLDERS = [].map((key) => {
  const C = class extends PlaceholderChapterScene { constructor() { super(key); } };
  Object.defineProperty(C, 'name', { value: 'Placeholder_' + key });
  return C;
});

// 3막 장면 (ACT3_PLAN 0단계 2번): 아직 만들지 않은 방. 이안이 걸어 보고, 손에 드는 물건(숫자키 1~7)을 시험하고,
// "저주 풀기"로 해금 → 마법서 장 복원을 확인할 수 있다. 단계마다 진짜 장면으로 바꾼다
class Act3PlaceholderScene extends PlaceholderChapterScene {
  buildWorld() {
    super.buildWorld();
    this.held = new HeldItems(this, this.ian, { items: Object.keys(GAME_CONFIG.act3.items) });
  }

  onReady() {
    super.onReady();
    this.speedPanel.moveTo(1130, 170);   // 왼쪽 심연 지도와 겹치지 않게
    if (this.info.chapter) {
      this.uiLayer.add(UIKit.button(this, 1890, 970, '저주 풀기 (임시) ▶', () => {
        if (this.curse.cursed && !this.isBlocked()) this.breakCurse();
      }, { originX: 1, originY: 1, fontSize: 26 }).setScrollFactor(0));
    }
  }

  updateWorld(dt) {
    const dir = (this.keys.right.isDown ? 1 : 0) - (this.keys.left.isDown ? 1 : 0);
    const walk = GAME_CONFIG.iceCorridor.walkSpeed;
    this.ian.x = Phaser.Math.Clamp(this.ian.x + dir * walk * this.PX * dt, 60, this.worldW - 60);
    if (dir) this.ian.setFlipX(dir < 0);
    Characters.play(this.ian, dir ? 'walk' : (this.held.pose() || 'idle'));
    this.speedPanel.setLines([this.held.current ? '손에 든 것: ' + GAME_CONFIG.act3.items[this.held.current].name : '1~7: 손에 드는 물건']);
  }
}

window.ACT3_PLACEHOLDERS = [].map((key) => {
  const C = class extends Act3PlaceholderScene { constructor() { super(key); } };
  Object.defineProperty(C, 'name', { value: 'Placeholder_' + key });
  return C;
});
