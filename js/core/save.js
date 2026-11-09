// 저장: 챕터 진행과 복원한 마법서 장을 브라우저(localStorage)에 저장한다.
// 저장이 막힌 환경(시크릿 창, 학교 PC 설정 등)에서도 게임은 그대로 동작하도록 모두 try/catch로 감싼다.
window.Save = {
  KEY: 'dungeon_and_physics_act1',
  data: null,

  blank() {
    return {
      restoredPages: [],   // 복원한 마법서 장 번호 ['01', '02', ...]
      chapters: {},        // 장면 키 → { freed: true, examPassed: true }
      lastScene: null,     // 마지막으로 들어간 장면 (이어하기)
      endingSeen: false,   // 3막 엔딩을 끝까지 봤나 (제목 화면 "챕터 다시 하기", ACT3_PLAN 6단계)
      settings: { showRuler: true, showSpeed: true, showAnswers: false, muted: false },   // showAnswers: 실험 전에도 답 숫자 보이기 (교사용)
    };
  },

  failed: false,   // 이 PC에서 저장이 안 되면 true — 화면 아래에 알림을 띄운다 (평가단 제안: 학생이 모른 채 진행을 잃지 않게)

  load() {
    this.data = this.blank();
    try {   // 저장이 되는지 먼저 시험해 본다 (시크릿 창·학교 PC 설정)
      window.localStorage.setItem(this.KEY + '_test', '1');
      window.localStorage.removeItem(this.KEY + '_test');
    } catch (e) {
      this.failed = true;
    }
    try {
      const raw = window.localStorage.getItem(this.KEY);
      if (raw) {
        const d = JSON.parse(raw);
        this.data = { ...this.blank(), ...d, settings: { ...this.blank().settings, ...(d.settings || {}) } };
      }
    } catch (e) {
      console.warn('저장 내용을 읽지 못함 (저장 없이 진행)', e);
    }
    return this.data;
  },

  write() {
    try {
      window.localStorage.setItem(this.KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('저장하지 못함 (게임은 계속 진행)', e);
      this.failed = true;
    }
  },

  reset() {
    this.data = this.blank();
    this.write();
  },

  // 제목 화면 "처음부터": 진행(장면 기록·도착 대사 arrived·마법서·마지막 방)만 지우고 교사용 설정(눈금·숫자판)은 남긴다
  resetProgress() {
    const settings = this.data.settings;
    this.data = { ...this.blank(), settings };
    this.write();
    for (const k in window.RESULT_LOG || {}) delete window.RESULT_LOG[k];   // 결과판 기록(메모리)도 비운다
  },

  // 스톤 할멈에게 마법서 표지를 받았나 (총괄지시 53번). 마을 뒤의 방에 들어간 적이 있거나(교사용 바로 가기 포함) 장을 복원했으면 받은 것으로 본다
  hasBook() {
    const d = this.data;
    return !!d.hasBook || d.restoredPages.length > 0 || Object.keys(d.chapters).some((k) => k !== 'Village' && k !== 'Prologue');
  },

  giveBook() {
    this.data.hasBook = true;
    this.write();
  },

  setEndingSeen() {
    this.data.endingSeen = true;
    this.write();
  },

  // 챕터 다시 하기: 그 방의 저장만 지운다 (되찾은 마법서 장은 그대로)
  resetChapter(key) {
    delete this.data.chapters[key];
    this.write();
  },

  hasSeenEnding() {
    return !!this.data.endingSeen;
  },

  isRestored(page) {
    return this.data.restoredPages.includes(page);
  },

  restorePage(page) {
    if (!this.isRestored(page)) {
      this.data.restoredPages.push(page);
      this.data.restoredPages.sort();
    }
    this.write();
  },

  chapter(key) {
    return this.data.chapters[key] || {};
  },

  setChapter(key, values) {
    this.data.chapters[key] = { ...this.chapter(key), ...values };
    this.write();
  },

  setLastScene(key) {
    this.data.lastScene = key;
    this.write();
  },

  setting(name) {
    return this.data.settings[name];
  },

  setSetting(name, value) {
    this.data.settings[name] = value;
    this.write();
  },
};
Save.load();
