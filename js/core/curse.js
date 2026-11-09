// 저주 시스템 (모든 장면 공통)
// - 저주 색 보정: 세계를 찍는 카메라 전체에 채도 낮추기 + 보랏빛.
//   (화면보다 넓은 그림에 물체별 필터를 달면 그림이 밀려 그려지는 문제가 있어 카메라에 단다.)
// - 진실의 원: 필터 없는 카메라로 원 안쪽 모양만 다시 찍어 저주 색이 빠져 보이게 한다.
//   원 안에서는 저주 상태여도 진짜 법칙(해방 상태 물리)이 적용된다 → isFree(x)
// - 글자·메뉴(UI 층)는 따로 UI 카메라가 찍으므로 저주 색을 받지 않는다.
// - 뒤틀림의 마법사처럼 저주 색을 빼야 하는 물체는 addUncursed(obj)로 등록한다.

window.CurseGrade = {
  // 보랏빛 행렬 (빨강·파랑은 살리고 초록을 눌러 보랏빛으로)
  PURPLE: [
    0.95, 0, 0, 0, 18,
    0, 0.78, 0, 0, 0,
    0, 0, 1.1, 0, 28,
    0, 0, 0, 1, 0,
  ],
  VEIL_ALPHA: 0.35,

  // 카메라에 색 보정 필터를 달아 둔다. 세기(amount)는 0 = 원래 색, 1 = 저주 색.
  // WebGL이 아니면(postFX 없음) 보라색 반투명 막으로 대신한다.
  attach(scene, camera) {
    if (camera.postFX) {
      camera.curseFx = camera.postFX.addColorMatrix();
      camera.curseFx.saturate(-0.6);
      camera.curseFx.multiply(this.PURPLE, true);
      camera.curseFx.alpha = 0;
    } else {
      camera.curseVeil = scene.add.rectangle(0, 0, camera.width, camera.height, 0x6a4a9a, 0)
        .setOrigin(0, 0).setScrollFactor(0).setDepth(90);
    }
    return camera.curseVeil;
  },

  setAmount(camera, amount) {
    if (camera.curseFx) camera.curseFx.alpha = amount;
    if (camera.curseVeil) camera.curseVeil.fillAlpha = amount * this.VEIL_ALPHA;
  },

  getAmount(camera) {
    if (camera.curseFx) return camera.curseFx.alpha;
    if (camera.curseVeil) return camera.curseVeil.fillAlpha / this.VEIL_ALPHA;
    return 0;
  },
};

class CurseSystem {
  // worldLayer: 세계 물체가 들어 있는 층, uiLayer: 글자·메뉴 층
  constructor(scene, { worldLayer, uiLayer, cursed }) {
    this.scene = scene;
    this.worldLayer = worldLayer;
    this.uiLayer = uiLayer;
    this.main = scene.cameras.main;
    this.circles = [];
    this.fade = null;
    this.follow = null;
    this.uncursedLayer = scene.add.layer(); // 저주 색을 받지 않는 물체 (마법사 등)
    this.uncursedLayer.setDepth(50);
    const veil = CurseGrade.attach(scene, this.main);
    if (veil) worldLayer.add(veil);
    this.main.ignore([uiLayer, this.uncursedLayer]);
    this.cleanCam = null;
    this.uiCam = null;
    this.set(cursed);
  }

  // 카메라는 만든 순서대로 겹쳐 그려진다: 세계(저주 색) → 진실의 원들 → 늘 원래 색인 물체 → UI.
  // 그래서 진실의 원을 모두 놓은 다음 마지막에 이 함수를 불러 나머지 두 카메라를 만든다.
  finishCameras() {
    const { width, height } = this.scene.scale;
    this.cleanCam = this.scene.cameras.add(0, 0, width, height);
    this.cleanCam.ignore([this.worldLayer, this.uiLayer]);
    this.applyFollow(this.cleanCam);
    this.uiCam = this.scene.cameras.add(0, 0, width, height);
    this.uiCam.ignore([this.worldLayer, this.uncursedLayer]);
    return this.uiCam;
  }

  // 모든 세계 카메라가 같은 대상을 같은 방식으로 따라가야 화면이 정확히 겹친다
  followTarget(target, bounds, lerp = 0.12) {
    this.follow = { target, bounds, lerp };
    for (const cam of this.worldCameras()) this.applyFollow(cam);
  }

  applyFollow(cam) {
    const f = this.follow;
    if (!f) return;
    cam.setBounds(f.bounds.x, f.bounds.y, f.bounds.width, f.bounds.height);
    cam.startFollow(f.target, true, f.lerp, f.lerp);
  }

  worldCameras() {
    return [this.main, ...this.circles.map((c) => c.cam), this.cleanCam].filter(Boolean);
  }

  // 진실의 원 놓기. centerX(m), groundY(px), 지름(m), 저주 색이 빠지는 둥근 공간의 높이(m)
  addTruthCircle({ centerX, groundY, diameter, domeHeight = 2.6 }) {
    const PX = GAME_CONFIG.pxPerMeter;
    const t = MANIFEST.truthCircle;
    const x = centerX * PX;
    const r = diameter / 2 * PX;
    const image = this.scene.add.image(x, groundY, t.key);
    image.setDisplaySize(diameter * PX, diameter * PX * t.height / t.width);
    this.worldLayer.add(image);
    image.setDepth(-5); // 바닥 위, 캐릭터 아래

    // 원 안쪽 모양: 아래는 바닥의 원(타원), 위는 캐릭터가 들어갈 만큼 둥근 지붕
    const g = this.scene.make.graphics({}, false);
    const floorRy = r * t.height / t.width;
    const domeRy = domeHeight * PX;
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const a = Math.PI + Math.PI * i / 64;
      pts.push(new Phaser.Math.Vector2(x + r * Math.cos(a), groundY + domeRy * Math.sin(a)));
    }
    for (let i = 1; i < 64; i++) {
      const a = Math.PI * i / 64;
      pts.push(new Phaser.Math.Vector2(x + r * Math.cos(a), groundY + floorRy * Math.sin(a)));
    }
    g.fillStyle(0xffffff);
    g.fillPoints(pts, true);

    const cam = this.scene.cameras.add(0, 0, this.scene.scale.width, this.scene.scale.height);
    cam.setMask(g.createGeometryMask(), false);
    cam.ignore([this.uiLayer, this.uncursedLayer]);
    this.applyFollow(cam);

    const circle = { x, r, image, cam, active: true, contains: (px) => circle.active && Math.abs(px - x) < r };
    this.circles.push(circle);
    this.updateCameras();
    return circle;
  }

  // 진실의 원 켜고 끄기 (꺼져 있으면 보이지 않고 진짜 법칙도 통하지 않는다)
  setCircleActive(circle, active) {
    const revealed = active && !circle.active && this.scene.sceneReady && this.cursed;
    circle.active = active;
    if (revealed && this.scene.onCircleRevealed) this.scene.onCircleRevealed();
    circle.image.setVisible(active);
    this.updateCameras();
  }

  addUncursed(obj) {
    this.uncursedLayer.add(obj);
    return obj;
  }

  inCircle(x) {
    return this.circles.some((c) => c.contains(x));
  }

  // 이 위치에서 진짜 법칙이 통하는가
  isFree(x) {
    return !this.cursed || this.inCircle(x);
  }

  // 원 가장자리: 원 안의 x에서 dir(+1/-1) 방향으로 나갈 때 경계 위치
  circleEdge(x, dir) {
    const c = this.circles.find((cc) => cc.contains(x));
    return c ? c.x + Math.sign(dir) * c.r : x;
  }

  set(cursed) {
    this.cursed = cursed;
    this.fade = null;
    CurseGrade.setAmount(this.main, cursed ? 1 : 0);
    this.updateCameras();
  }

  // 저주 색을 서서히 바꾼다 (게임 시간 기준이라 물리와 같은 박자로 움직인다)
  fadeTo(cursed, seconds) {
    this.cursed = cursed;
    this.fade = { from: CurseGrade.getAmount(this.main), to: cursed ? 1 : 0, t: 0, duration: seconds };
    this.updateCameras();
  }

  update(dt) {
    if (this.fade) {
      const f = this.fade;
      f.t = Math.min(f.t + dt, f.duration);
      CurseGrade.setAmount(this.main, f.from + (f.to - f.from) * (f.duration > 0 ? f.t / f.duration : 1));   // 0초면 바로 끝 (0÷0 방지)
      if (f.t >= f.duration) this.fade = null;
      this.updateCameras();
    }
  }

  // 저주가 완전히 걷힌 뒤에는 원 카메라를 꺼서 쓸데없이 두 번 그리지 않는다
  updateCameras() {
    const needed = this.cursed || this.fade !== null;
    for (const c of this.circles) c.cam.setVisible(needed && c.active);
  }
}
window.CurseSystem = CurseSystem;
