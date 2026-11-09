// 소리 관리
// - Phaser 소리 로더는 file:// 에서 동작하지 않아 브라우저 기본 <audio>로 직접 재생한다.
// - 반복 소리는 OGG를 먼저 쓰고(끊김 없는 반복), 브라우저가 OGG를 못 틀면 MP3로 대신한다.
// - 음량은 js/data/sound_volumes.js 의 표를 따른다.
// - 브라우저는 사용자가 한 번 클릭하기 전에는 소리를 막으므로, 제목 화면 "시작하기" 클릭 때 Sound.unlock()을 부른다.
window.Sound = {
  unlocked: false,
  bgm: null,        // { id, el }
  loops: {},        // 반복 효과음 id → audio
  canOgg: (() => {
    try { return !!new Audio().canPlayType('audio/ogg; codecs="vorbis"'); } catch (e) { return false; }
  })(),

  pendingBgm: null, // 잠금 해제 전에 요청된 배경음악

  unlock() {
    if (this.unlocked) return;
    this.unlocked = true;
    if (this.pendingBgm) this.playBgm(this.pendingBgm);
    this.pendingBgm = null;
  },

  info(id) {
    const s = MANIFEST.sounds[id];
    if (!s) console.warn('없는 소리:', id);
    return s;
  },

  volume(id) {
    const V = window.SOUND_VOLUMES || {};
    const s = MANIFEST.sounds[id];
    const group = s && (s.type === 'bgm' || s.type === 'jingle') ? (V.bgm ?? 1) : (V.sfx ?? 1);
    return Math.max(0, Math.min(1, (V.master ?? 1) * group * (V[id] ?? 1)));
  },

  makeAudio(id, preferOgg) {
    const s = this.info(id);
    if (!s) return null;
    const useOgg = preferOgg && s.ogg && this.canOgg;
    const el = new Audio(useOgg ? s.ogg : s.mp3);
    if (useOgg) el.addEventListener('error', () => { el.src = s.mp3; el.play().catch(() => {}); }, { once: true });
    el.volume = this.volume(id);
    el.muted = this.isMuted();
    return el;
  },

  // 음소거 (컴퓨터실 수업용, N 키·화면 버튼). 설정은 저장되어 다음에도 유지된다
  isMuted() {
    return !!(window.Save && Save.data && Save.setting('muted'));
  },

  setMuted(m) {
    Save.setSetting('muted', m);
    const els = [this.bgm && this.bgm.el, this.jingle && this.jingle.el, ...Object.values(this.loops), ...Object.values(this.preloaded)];
    for (const el of els) if (el) el.muted = m;
  },

  toggleMute() {
    this.setMuted(!this.isMuted());
  },

  // 효과음 한 번
  play(id) {
    if (!this.unlocked) return;
    const el = this.makeAudio(id, false);
    if (el) el.play().catch(() => {});
  },

  // 곡 묶음(group)별 재생 위치. 저주판·해방판처럼 길이가 같은 곡은 같은 묶음 이름을 주면
  // 서로 바뀔 때 같은 위치에서 이어지고, 다른 곡(진실의 원 등)에 다녀와도 멈췄던 자리부터 다시 나온다.
  positions: {},
  FADE_SECONDS: 0.5,

  // 배경음악 틀기. group: 위치를 이어 갈 곡 묶음 이름 (없으면 처음부터)
  playBgm(id, { group = null } = {}) {
    if (!id) return;
    if (this.jingle) return;   // 징글·팡파르가 나오는 동안은 배경음악을 겹치지 않는다
    if (!this.unlocked) { this.pendingBgm = id; return; }
    if (this.bgm && this.bgm.id === id) return;
    const s = this.info(id);
    if (!s) return;
    const el = this.makeAudio(id, true);
    el.loop = s.loop;
    const target = el.volume;
    let t = null;
    if (group && this.bgm && this.bgm.group === group) t = this.bgm.el.currentTime; // 저주판 ↔ 해방판
    else if (group && this.positions[group] != null) t = this.positions[group];      // 다른 곡에 다녀왔을 때
    if (t != null) {
      const seek = () => { try { el.currentTime = s.duration ? t % s.duration : t; } catch (e) { /* 무시 */ } };
      if (el.readyState >= 1) seek(); else el.addEventListener('loadedmetadata', seek, { once: true });
    }
    const sameGroup = group && this.bgm && this.bgm.group === group;
    this.stopBgm(sameGroup ? 0 : this.FADE_SECONDS);
    this.bgm = { id, el, group };
    if (!sameGroup) this.fade(el, 0, target, this.FADE_SECONDS);
    el.play().catch(() => {});
  },

  // 배경음악 멈추기 (fadeSeconds 동안 줄이며)
  stopBgm(fadeSeconds = 0) {
    if (this.bgm) {
      const { el, group } = this.bgm;
      if (group) this.positions[group] = el.currentTime;
      if (fadeSeconds > 0) this.fade(el, el.volume, 0, fadeSeconds, () => el.pause());
      else el.pause();
      this.bgm = null;
    }
    this.pendingBgm = null;
  },

  // 음량을 서서히 바꾸기 (소리는 게임 화면과 상관없이 실제 시간으로 움직인다)
  fade(el, from, to, seconds, onDone) {
    const start = performance.now();
    el.volume = from;
    const iv = setInterval(() => {
      const k = Math.min(1, (performance.now() - start) / (seconds * 1000));
      el.volume = Math.max(0, Math.min(1, from + (to - from) * k));
      if (k >= 1) { clearInterval(iv); if (onDone) onDone(); }
    }, 30);
  },

  // 징글·팡파르를 미리 만들어 파일을 읽어 둔다 (장이 시작할 때). 그때 처음 만들면 파일을 읽느라 늦게 시작해,
  // 다음 장이 시작된 뒤에야 소리가 나 새 장 배경음악과 겹쳤다 (총괄지시 57번)
  preloaded: {},
  preload(id) {
    if (!id || this.preloaded[id] || !this.info(id)) return;
    const el = this.makeAudio(id, false);
    el.preload = 'auto';
    el.load();
    this.preloaded[id] = el;
  },

  // 징글·팡파르 (깨달음, 챕터 클리어): 배경음악을 멈추고 한 번만 튼 뒤 onEnd.
  // delay: 그 전에 비워 둘 시간(초, 예: 유리 깨지는 효과음이 끝날 때까지). 그동안도 배경음악은 다시 나오지 않는다.
  // 실제로 소리가 나기 시작한 때('playing')부터 곡 길이를 재고, 끝나면('ended') onEnd.
  // 소리가 막혀 있거나(잠금 전·재생 실패) START_WAIT초 안에 시작하지 못하면 소리 없이 넘어가고, 늦게라도 나지 않게 멈춘다.
  jingle: null,
  START_WAIT: 4,
  playJingle(id, onEnd, { delay = 0 } = {}) {
    const s = this.info(id);
    this.stopBgm(0);
    const j = { id, el: null, done: false };
    this.jingle = j;
    const len = ((s && s.duration) || 3) * 1000;
    const finish = () => {
      if (j.done) return;
      j.done = true;
      if (j.el && !j.el.ended) j.el.pause();   // 늦게 시작한 소리가 다음 장에서 나지 않게
      if (this.jingle === j) this.jingle = null;
      if (onEnd) onEnd();
    };
    setTimeout(() => {
      if (j.done) return;
      let el = null;
      if (this.unlocked && s) {
        el = this.preloaded[id] || this.makeAudio(id, false);
        delete this.preloaded[id];   // 한 번 쓴 것은 다음 장에서 새로 읽어 둔다
        try { el.currentTime = 0; } catch (e) { /* 무시 */ }
        el.volume = this.volume(id);
        el.muted = this.isMuted();
      }
      if (!el) { setTimeout(finish, len + 300); return; }
      j.el = el;
      el.loop = false;
      let started = false;
      el.addEventListener('playing', () => {
        if (started || j.done) return;
        started = true;
        setTimeout(finish, len + 300);   // 'ended'가 오지 않을 때를 대비 — 소리가 난 때부터 잰다
      });
      el.addEventListener('ended', finish, { once: true });
      el.play().catch(() => { if (!started) setTimeout(finish, len + 300); });
      setTimeout(() => { if (!started) finish(); }, this.START_WAIT * 1000);
    }, delay * 1000);
  },

  currentBgm() {
    return this.bgm ? this.bgm.id : this.pendingBgm;
  },

  // 반복 효과음 켜기/끄기 (예: 얼음 미끄러짐)
  startLoop(id) {
    if (!this.unlocked || this.loops[id]) return;
    const el = this.makeAudio(id, true);
    if (!el) return;
    el.loop = true;
    this.loops[id] = el;
    el.play().catch(() => {});
  },

  // 반복 소리의 재생 빠르기(높이)를 바꾼다 — 예: 상자가 찰수록 충전음이 높아진다 (ACT2_PLAN 음악 규칙)
  setLoopRate(id, rate) {
    const el = this.loops[id];
    if (el) { el.preservesPitch = false; el.playbackRate = Math.max(0.5, Math.min(2, rate)); }
  },

  // fadeSeconds: 그동안 줄이며 멈춘다 (예: 봉화 불꽃 — 켜진 뒤 몇 초만 들리고 사라진다)
  stopLoop(id, fadeSeconds = 0) {
    const el = this.loops[id];
    if (!el) return;
    delete this.loops[id];
    if (fadeSeconds > 0) this.fade(el, el.volume, 0, fadeSeconds, () => el.pause());
    else el.pause();
  },

  stopAllLoops() {
    for (const id of Object.keys(this.loops)) this.stopLoop(id);
  },
};
