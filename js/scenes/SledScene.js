// 1-2 썰매 길 (1단계 1-C) — 배경 04
//
// 돌바닥 출발점에서 1~4 키로 1·2·3·4 m/s 중 하나를 골라 썰매를 출발시킨다.
// 얼음 위에서는 그 속력 그대로 가다가, 썰매 앞부분이 제동 시작선을 지나면 브레이크(감속도 2 m/s²)가 걸린다.
// 제동 거리 = v² ÷ (2 × 2) → 1 m/s 0.25m · 2 m/s 1m (정지선 앞에서 멈춤, 성공)
//                          3 m/s 2.25m · 4 m/s 4m (정지선 1.5m를 넘음, 실패)
// 결과판의 "제동 거리 ÷ 속력²"은 항상 1 ÷ (2 × 2) = 0.25 이다.
// 네 속력을 모두 해 보면 이안의 대사가 나오고 2 m/s 속도 제한 표지판이 세워진다.
// (배경의 길은 화면에서 오른쪽으로 조금 내려가 보이지만, 계획서대로 평평한 길로 계산한다)
class SledScene extends ChapterScene {
  constructor() {
    super('Ch1_2c');
  }

  startCursed() {
    return false;
  }

  // 배경 그림 속 얼음 길 위의 발 기준선 (px). 그림에서 재어 정한 값 — 길이 오른쪽으로 내려간다
  trackY(x) {
    return this.cfg.trackY0 + this.cfg.trackSlope * x;
  }

  buildWorld() {
    const cfg = GAME_CONFIG.sledPath;
    const O = MANIFEST.objects;
    const PX = this.PX;
    this.cfg = cfg;
    this.tilt = Math.atan(cfg.trackSlope) * 180 / Math.PI;
    this.brakeX = cfg.brakeLineX * PX;
    this.stopX = this.brakeX + cfg.stopLineGap * PX;

    const place = (name, x, y, depth) => {
      const o = O[name];
      const img = this.add.image(x, y, o.key).setOrigin(o.pivot.x / o.width, o.pivot.y / o.height).setDepth(depth);
      this.worldLayer.add(img);
      return img;
    };

    // 출발 돌바닥 (회랑과 같은 그림)
    place('start_stone_floor', 0, this.trackY(O.start_stone_floor.width / 2), -3).setAngle(this.tilt);

    // 제동 시작선과 정지선
    this.brakeLine = place('brake_line', this.brakeX, this.trackY(this.brakeX) + 8, -2).setAngle(this.tilt);
    this.stopLine = place('stop_line', this.stopX, this.trackY(this.stopX) + 8, -2).setAngle(this.tilt);
    const label = (x, text, color) => {
      const t = UIKit.text(this, x, this.trackY(x) + 30, text, {
        fontSize: '24px', fontStyle: 'bold', color, backgroundColor: '#0b1320aa', padding: { x: 8, y: 4 },
      }).setOrigin(0.5, 0).setDepth(-1);
      this.worldLayer.add(t);
      return t;
    };
    label(this.brakeX, '제동 시작', '#ffb36b');
    label(this.stopX, '정지선', '#ffe08a');

    // 속도 제한 표지판 (네 속력을 다 해 보면 세워진다)
    this.signX = cfg.signX * PX;
    this.signBaseY = this.trackY(this.signX) - 70;
    this.sign = place('speed_sign', this.signX, this.signBaseY, -1).setVisible(false);
    this.signNumber = place('speed_sign_2ms_overlay', this.signX, this.signBaseY, -1).setVisible(false);
    this.signRise = null;

    // 썰매와 이안
    this.sledInfo = O.sled;
    this.sled = place('sled', 0, 0, 2).setAngle(this.tilt);
    this.ian = Characters.create(this, 'ian', cfg.ianX * PX, this.trackY(cfg.ianX * PX)).setDepth(3);
    this.player = this.ian;
    this.ian.charId = 'ian';

    // 정지선 너머를 지나가는 마을 아이
    this.child = Characters.create(this, 'villager_child', cfg.childMinX * PX, 0, 'walk').setDepth(1);
    this.childV = cfg.childSpeed;
    this.childAlertT = 0;
    this.alert = UIKit.text(this, 0, 0, '!', { fontSize: '56px', fontStyle: 'bold', color: '#ff6b6b' })
      .setOrigin(0.5, 1).setDepth(5).setVisible(false);
    this.worldLayer.add([this.ian, this.child, this.alert]);

    this.curse.followTarget(this.sled, { x: 0, y: 0, width: this.worldW, height: this.worldH });

    const kb = this.input.keyboard;
    ['ONE', 'TWO', 'THREE', 'FOUR'].forEach((k, i) => kb.on('keydown-' + k, () => this.launch(i)));
    this.flags = {};
    this.tried = new Set();
    this.pushT = 0;
    this.resetSled();

    // 교사용 메뉴: 표지판 숫자 켜기/끄기
    this.teacherExtra = {
      label: () => '표지판 숫자 ' + (this.signNumberOn() ? '끄기' : '켜기'),
      toggle: () => { Save.setSetting('showSpeedSign', !this.signNumberOn()); this.updateSignNumber(); },
    };
  }

  onReady() {
    this.setMusicMode('puzzle');
    this.speedPanel.moveTo(1136, 150);
    this.uiLayer.add(UIKit.text(this, 1900, 1070,
      '1~4 썰매 출발 (1·2·3·4 m/s)   T 결과판   M 마법서', {
        fontSize: '22px', backgroundColor: '#0b1320cc', padding: { x: 14, y: 8 },
      }).setOrigin(1, 1).setScrollFactor(0).setDepth(300));
    this.message = UIKit.text(this, 960, 70, '1~4 키로 썰매 속력을 골라 출발시켜 보자', {
      fontSize: '38px', fontStyle: 'bold', color: '#ffe08a', backgroundColor: '#1a0e08cc', padding: { x: 24, y: 10 },
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(320);
    this.uiLayer.add(this.message);
    this.board = new ResultBoard(this, this.uiLayer, {
      title: '썰매 길 결과판 (감속도 2 m/s²)', logKey: 'Ch1_2c', columns: [
        { label: '속력 (m/s)', width: 200 }, { label: '제동 거리 (m)', width: 220 },
        { label: '속력²', width: 180 }, { label: '제동 거리 ÷ 속력²', width: 260 },
      ],
    });
  }

  curseRuleText() {
    return '같은 브레이크(감속도 2 m/s²)라도 빠를수록 훨씬 멀리 미끄러진다';
  }

  sledFront() {
    return this.sledX + this.sledInfo.width / 2;
  }

  resetSled() {
    const cfg = this.cfg;
    this.state = 'ready';     // ready → coast → brake → stopped
    this.v = 0;
    this.sledX = cfg.ianX * this.PX + GAME_CONFIG.iceCorridor.ian.pushReach * this.PX + this.sledInfo.width / 2;
    this.placeSled();
    Sound.stopLoop('sfx_sled_brake_loop');
  }

  placeSled() {
    this.sled.setPosition(this.sledX, this.trackY(this.sledX) + 6);
  }

  // 1~4: 그 속력으로 썰매를 출발시킨다 (달리는 중에는 무시)
  launch(i) {
    if (this.isBlocked() || this.state === 'coast' || this.state === 'brake') return;
    this.resetSled();
    this.v0 = this.cfg.speeds[i];
    this.v = this.v0;
    this.state = 'coast';
    this.pushT = 0.4;
    Sound.play('sfx_push_impact');
    this.message.setText(`${this.v0} m/s로 출발!`);
  }

  updateWorld(dt) {
    const PX = this.PX, a = this.cfg.brakeDecel;
    let left = dt;
    // 등속 구간: 앞부분이 제동 시작선에 닿는 순간을 프레임 안에서도 정확히 찾는다
    if (this.state === 'coast') {
      const toLine = (this.brakeX - this.sledFront()) / PX;
      if (this.v * left >= toLine) {
        this.sledX += toLine * PX;
        left -= toLine / this.v;
        this.state = 'brake';
        Sound.startLoop('sfx_sled_brake_loop');
      } else {
        this.sledX += this.v * left * PX;
        left = 0;
      }
    }
    // 제동 구간: 감속도 a로 등가속도 운동. 이번 프레임 안에 멈추면 남은 거리 v²/(2a)만 간다
    if (this.state === 'brake' && left > 0) {
      if (this.v - a * left <= 0) {
        this.sledX += (this.v * this.v) / (2 * a) * PX;
        this.v = 0;
        this.onStopped();
      } else {
        this.sledX += (this.v * left - 0.5 * a * left * left) * PX;
        this.v -= a * left;
      }
    }
    this.placeSled();
    this.updateChild(dt);
    this.updateSign(dt);
    this.pushT = Math.max(0, this.pushT - dt);
    Characters.play(this.ian, this.pushT > 0 ? 'push' : 'idle');
    this.updatePanel();
  }

  onStopped() {
    this.state = 'stopped';
    Sound.stopLoop('sfx_sled_brake_loop');
    const v = this.v0;
    const d = (this.sledFront() - this.brakeX) / this.PX;
    const over = (this.sledFront() - this.stopX) / this.PX;
    const ok = over <= 1e-9;
    this.message.setText(ok ? `성공! 정지선 앞 ${(-over).toFixed(2)}m에 멈췄다 (제동 거리 ${d.toFixed(2)}m)`
      : `실패! 정지선을 ${over.toFixed(2)}m 넘었다 (제동 거리 ${d.toFixed(2)}m)`);
    this.message.setColor(ok ? UIKit.SKY : '#ff9a9a');
    this.board.addRow([v, d.toFixed(2), v * v, (d / (v * v)).toFixed(2)], ok ? UIKit.SKY : '#ff9a9a');
    this.tried.add(v);
    if (this.tried.size === this.cfg.speeds.length && !this.flags.signDone) {
      this.flags.signDone = true;
      this.say('sled', () => this.raiseSign());
    }
  }

  // ------------------------------------------------------------------ 마을 아이
  // 정지선 너머를 왔다 갔다 한다. 썰매가 정지선을 넘으면 놀라서 멈춘다(!)
  updateChild(dt) {
    const cfg = this.cfg, PX = this.PX;
    const crossed = this.sledFront() > this.stopX && this.state !== 'ready';
    if (crossed && this.childAlertT === 0 && !this.childAlerted) { this.childAlertT = 1.5; this.childAlerted = true; }
    if (this.state === 'ready' || this.state === 'coast') this.childAlerted = false;
    this.childAlertT = Math.max(0, this.childAlertT - dt);
    if (this.childAlertT > 0) {
      Characters.play(this.child, 'idle');
    } else {
      this.child.x += this.childV * PX * dt;
      if (this.child.x > cfg.childMaxX * PX) this.childV = -Math.abs(this.childV);
      if (this.child.x < cfg.childMinX * PX) this.childV = Math.abs(this.childV);
      this.child.setFlipX(this.childV < 0);
      Characters.play(this.child, 'walk');
    }
    this.child.y = this.trackY(this.child.x) - cfg.childBehind; // 썰매보다 조금 뒤쪽(화면 위)을 지나간다
    this.alert.setPosition(this.child.x, this.child.y - 170).setVisible(this.childAlertT > 0);
  }

  // ------------------------------------------------------------------ 속도 제한 표지판
  signNumberOn() {
    return Save.setting('showSpeedSign') !== false;
  }

  updateSignNumber() {
    this.signNumber.setVisible(this.flags.signDone && this.sign.visible && this.signNumberOn());
  }

  raiseSign() {
    this.sign.setVisible(true);
    this.signRise = 0;
    Sound.play('sfx_pressure_plate');
    this.message.setText('2 m/s 속도 제한 표지판을 세웠다').setColor(UIKit.SKY);
    this.updateSignNumber();
  }

  updateSign(dt) {
    if (this.signRise == null) return;
    this.signRise = Math.min(1, this.signRise + dt / 1.0);
    const y = this.signBaseY + 200 * (1 - this.signRise);
    this.sign.setY(y).setAlpha(this.signRise);
    this.signNumber.setY(y).setAlpha(this.signRise);
    if (this.signRise >= 1) {
      this.signRise = null;
      this.uiLayer.add(UIKit.button(this, 960, 985, '다음: 얼음 위 전투 ▶', () => this.goNext(), {
        fontSize: 30,
      }).setScrollFactor(0).setDepth(320));
    }
  }

  updatePanel() {
    const m = (x) => (x / this.PX).toFixed(2);
    const state = { ready: '출발 전', coast: '미끄러지는 중 (힘 없음)', brake: '브레이크 중 (−2 m/s²)', stopped: '멈춤' }[this.state];
    const lines = [
      `썰매 속력 ${this.v.toFixed(2)} m/s   ${state}`,
      `앞부분 ${m(this.sledFront())} m  (제동 시작 ${m(this.brakeX)} · 정지선 ${m(this.stopX)})`,
    ];
    if (this.state === 'brake' || this.state === 'stopped') {
      lines.push(`제동 시작선부터 ${Math.max(0, (this.sledFront() - this.brakeX) / this.PX).toFixed(2)} m`);
    }
    this.speedPanel.setLines(lines);
  }
}
window.SledScene = SledScene;
