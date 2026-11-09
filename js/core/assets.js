// 그림 불러오기 도우미
// - 그림 내용은 data/packs/<묶음>.js 에 글자(data URI)로 들어 있다 (file:// 에서 크롬의 WebGL 차단을 피하려고).
// - 장면에 들어가기 전에 그 장면에 필요한 묶음 .js 를 <script>로 붙여 불러온다.
// - 각 장면의 preload()에서 Assets.preload(this, 묶음목록)을 부르면 Phaser 텍스처로 등록된다.

window.ASSET_DATA = window.ASSET_DATA || {};

// 그림 경로 → 데이터. 없으면 원래 경로 그대로 (웹 서버로 열 때를 위해)
function assetUrl(path) {
  return window.ASSET_DATA[path] || path;
}

window.Packs = {
  loaded: {},
  scripts: {},

  // 묶음 .js 파일들을 불러온다. 이미 불러온 것은 건너뛴다.
  load(names) {
    const jobs = names.filter((n) => !this.loaded[n]).map((name) => new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = 'data/packs/' + name + '.js';
      this.scripts[name] = s;
      s.onload = () => { this.loaded[name] = true; resolve(); };
      s.onerror = () => { console.warn('그림 묶음을 불러오지 못함:', name); resolve(); };
      document.head.appendChild(s);
    }));
    return Promise.all(jobs);
  },

  // 다음 장면에 필요 없는 묶음의 그림을 메모리에서 비운다 (학교 PC·크롬북용).
  // 지난 장면이 멈춘 뒤(새 장면의 preload)에 부른다. 다시 그 장면에 가면 묶음을 다시 불러온다.
  unloadExcept(scene, keepNames) {
    const keep = new Set(keepNames);
    const keepKeys = new Set(), keepPaths = new Set();
    for (const name of keep) {
      for (const it of (MANIFEST.packs[name] || [])) { keepKeys.add(it.key); keepPaths.add(it.path); }
    }
    for (const name of Object.keys(this.loaded)) {
      if (!this.loaded[name] || keep.has(name)) continue;
      const removed = new Set();
      for (const it of (MANIFEST.packs[name] || [])) {
        if (!keepKeys.has(it.key) && scene.textures.exists(it.key)) { scene.textures.remove(it.key); removed.add(it.key); }
        if (!keepPaths.has(it.path)) delete window.ASSET_DATA[it.path];
      }
      // 지운 그림을 쓰던 캐릭터 애니메이션도 지운다 (다시 오면 새 그림으로 다시 만든다)
      for (const [charId, c] of Object.entries(MANIFEST.characters)) {
        for (const [anim, a] of Object.entries(c.animations)) {
          if (removed.has(a.key) && scene.anims.exists(charId + '_' + anim)) scene.anims.remove(charId + '_' + anim);
        }
      }
      if (this.scripts[name]) { this.scripts[name].remove(); delete this.scripts[name]; }
      this.loaded[name] = false;
    }
  },
};

window.Assets = {
  // 묶음 안의 그림을 Phaser 로더에 등록 (이미 있는 텍스처는 건너뜀)
  preload(scene, packNames) {
    for (const name of packNames) {
      for (const it of (MANIFEST.packs[name] || [])) {
        if (scene.textures.exists(it.key)) continue;
        if (it.type === 'sheet') {
          scene.load.spritesheet(it.key, assetUrl(it.path), { frameWidth: it.frameWidth, frameHeight: it.frameHeight });
        } else {
          scene.load.image(it.key, assetUrl(it.path));
        }
      }
    }
  },

  // 캐릭터 애니메이션 만들기 (게임 전체에서 한 번만). 애니메이션 이름: '<캐릭터>_<동작>' 예) ian_walk
  createAnims(scene, charId) {
    const c = MANIFEST.characters[charId];
    for (const [name, a] of Object.entries(c.animations)) {
      const key = charId + '_' + name;
      if (scene.anims.exists(key) || !scene.textures.exists(a.key)) continue;
      scene.anims.create({
        key,
        frames: scene.anims.generateFrameNumbers(a.key, { start: 0, end: a.frames - 1 }),
        frameRate: a.fps,
        repeat: a.loop ? -1 : 0,
      });
    }
  },
};

// 캐릭터 스프라이트: 기준점(발바닥 중앙)을 원점으로 삼는다. 동작마다 기준점이 다르면(가론 rope_hang) 바꿔 준다.
window.Characters = {
  create(scene, charId, x, y, anim = 'idle') {
    Assets.createAnims(scene, charId);
    const c = MANIFEST.characters[charId];
    const s = scene.add.sprite(x, y, c.animations[anim].key);
    s.charId = charId;
    this.play(s, anim);
    return s;
  },

  play(sprite, anim, ignoreIfPlaying = true) {
    const c = MANIFEST.characters[sprite.charId];
    const a = c.animations[anim];
    const pivot = a.pivot || c.pivot;
    // 동작마다 캔버스 크기가 다를 수 있다 (이안 2막 동작 1280×1024 ↔ 이안 v4 1248×768): 그 동작의 크기로 나눈다
    sprite.setOrigin(pivot.x / (a.frameWidth || c.frameWidth), pivot.y / (a.frameHeight || c.frameHeight));
    sprite.play(sprite.charId + '_' + anim, ignoreIfPlaying);
    sprite.currentAction = anim;
  },
};
