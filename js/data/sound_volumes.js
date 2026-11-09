// 소리별 음량 표 (0 = 안 들림, 1 = 원래 크기). 메모장으로 숫자를 고치고 저장 → F5.
// 처음 값은 소리 파일의 평균 크기(rms)를 맞추도록 자동 계산한 것이다.
window.SOUND_VOLUMES = {
  master: 1.0, // 전체 음량
  bgm: 0.8,    // 배경음악 전체
  sfx: 1.0,    // 효과음 전체
  bgm_title: 0.57, // 모험 시작. 물리의 마법서 주제 선율
  bgm_village_cursed: 0.57, // 평화로운 마을 선율의 미묘하게 어긋난 저주 버전
  bgm_castle_freed: 0.58,
  // 2026-10-24 새 음악 (평균 크기를 -26dB에 맞춤: work/check_new_audio.py로 잰 값)
  bgm_castle_freed_v2a: 0.54, // 해방판 성 음악 v2a (D장조 144 BPM, 칩튠 리드·종·실로폰)
  bgm_midboss_v2: 0.53, // 중간 보스전 v2 (D단조 148 BPM, 긴박한 추격)
  bgm_boss_act1_v2: 0.56, // 1막 보스전 v2 (D단조 156 BPM)
  jingle_realize_a: 0.44, // 깨달음 징글 A (3.6초)
  jingle_chapter_clear_a_v3: 0.47, // 챕터 클리어 팡파르 A v3 (6.15초)
  bgm_act1_clear_v2: 0.53, // 1막 완료 v2 (14.2초, 한 번) // 해방된 돌의 성, 나무 악기와 묵직한 타악기
  bgm_castle_cursed: 0.58, // 돌의 성 동일 선율·동일 길이의 탁한 저주 버전
  bgm_truth_circle: 0.57, // 진실의 원, 맑은 피아노와 부드러운 현
  bgm_puzzle: 0.58, // 사고를 방해하지 않는 절제된 퍼즐 반복
  bgm_battle: 0.57, // 빠른 일반 전투와 타악기
  bgm_boss_act1: 0.57, // 돌의 성 주제의 긴박한 1막 보스 편곡
  bgm_exam: 0.58, // 차분한 시험, 시계 같은 박자
  bgm_act1_clear: 0.58, // 1막 완료, 밝게 마무리되는 마법서 주제 선율
  sfx_curse_break: 1.00, // 저주 균열, 파쇄, 종 울림
  sfx_page_restore: 1.00, // 종이 펄럭임과 책 착, 하프 상승음
  sfx_truth_circle_enter: 1.00, // 진실의 원 진입 차임
  sfx_door_open: 1.00, // 무거운 돌문 마찰과 열림
  sfx_puzzle_reset: 0.76, // 장난스러운 뿅과 되감기
  sfx_exam_correct: 0.84, // 깃펜 체크와 밝은 확인음
  sfx_exam_wrong: 0.82, // 부드러운 낮은 오답 알림
  sfx_weapon_unlock: 0.95, // 지팡이 빛 모임과 해금음
  sfx_text_blip_ian: 0.22, // 이안 중간 높이 글자음
  sfx_text_blip_garon: 0.22, // 가론 낮은 글자음
  sfx_text_blip_granny: 0.22, // 할멈 살짝 떨리는 글자음
  sfx_text_blip_wizard: 0.27, // 마법사 낮고 차가운 글자음
  sfx_ian_hurt: 0.82, // 이안 피격 숨과 타격
  sfx_ui_click: 0.98, // 가벼운 나무 메뉴 클릭
  sfx_step_stone: 0.60, // 돌바닥 한 걸음
  sfx_step_ice: 1.00, // 얼음 위 한 걸음과 미끄러짐
  sfx_lever_tilt: 1.00, // 나무 시소 경첩과 무게 이동
  sfx_lever_balance: 0.84, // 시소 균형과 문 잠금 해제
  sfx_rock_drop_launch: 0.79, // 큰 돌 낙하와 시소 발사
  sfx_golem_fly: 0.89, // 돌 골렘 비행
  sfx_golem_crumble: 0.81, // 돌 골렘 부서짐
  sfx_tower_collapse: 0.68, // 블록 미끄러짐과 와르르
  sfx_ice_slide_loop: 0.77, // 일정한 얼음 미끄러짐 반복
  sfx_cursed_stop: 0.89, // 저주 상태의 급정거
  sfx_wall_ring_grab: 1.00, // 쇠고리 잡고 몸이 당겨짐
  sfx_golem_charge_loop: 0.58, // 헛도는 발과 낮은 얼음 마찰 반복
  sfx_beam_kick: 0.83, // 외나무다리 차기와 구르기
  sfx_golem_fall_pit: 1.00, // 골렘 낙하와 먼 곳 충돌
  sfx_bridge_crack_1: 0.79, // 판자 작은 금
  sfx_bridge_crack_2: 0.65, // 판자 큰 금
  sfx_bridge_collapse: 0.82, // 판자 연속 붕괴
  sfx_pressure_plate: 0.78, // 돌 압력판과 잠금 클릭
  sfx_sled_brake_loop: 0.62, // 썰매 날의 반복 얼음 긁힘
  sfx_shield_bash: 1.00, // 방패 금속 충돌
  sfx_throw_whoosh: 0.79, // 물건 던지는 공기
  sfx_push_impact: 0.67, // 서로 미는 둔탁한 충돌
  sfx_troll_roar: 0.69, // 우스꽝스러운 얼음 트롤 포효
  sfx_golem_roar: 1.00, // 관성의 골렘 울부짖음 (요청서 07, 평균 −18.5dB → 효과음 기준 −18dB에 맞춤)
  sfx_troll_hurt: 0.68, // 얼음 트롤 피격
  sfx_rail_clack: 1.00, // 광차 레일 이음새 한 번
  sfx_minecart_creak: 0.85, // 광차 언덕 정점 멈칫
  sfx_spring_bumper: 1.00, // 가로 용수철과 광차 출발
  sfx_boulder_roll_loop: 0.50, // 바위 굴러가는 반복 소리
  sfx_rough_scrape_loop: 0.49, // 거친 돌바닥의 반복 긁힘
  sfx_ice_sizzle: 1.00, // 얼음과 뜨거운 돌의 마찰열
  sfx_spirit_attack: 0.86, // 정령 얼음 조각 발사
  sfx_spirit_deflect: 0.80, // 정령이 무기를 튕김
  sfx_spirit_melt: 1.00, // 정령 녹음과 물방울
  sfx_wheel_tick: 1.00, // 영원의 바퀴 기계 틱 한 번
  sfx_steam_vent: 1.00, // 증기 골렘 분출
  sfx_fuel_snap: 1.00, // 연료선 끊김
  sfx_machine_powerdown: 0.72, // 기계 톱니 연속 감속
  sfx_merchant_panic: 0.76, // 상인의 짧은 당황 음성풍 효과
  // 2026-10-27 2막 소리 (평균 크기를 1막과 같은 기준에 맞춤: 배경음악 −26dB, 효과음 −18dB, 바탕 소리 −30dB).
  //   ACT2_PLAN: 나침반 째깍·마을 등불은 작게(−6dB), 굵은 번개·상자 방전·봉화 점화는 크게(+4dB)
  bgm_tower_cursed: 0.46, // 저주받은 탑: 낮은 전기 울림과 어긋난 오르골, 마법서 주제의 단조 변주 (rms -19.2)
  bgm_tower_freed: 0.57, // 해방된 탑: 밝은 칩튠·신시사이저·현악과 종, 마법서 주제의 경쾌한 변주 (rms -21.1)
  bgm_boss_act2: 0.50, // 자석 골렘: 무거운 금속 타악과 빠른 현악, 마법서 주제의 짧은 단조 변주 (rms -19.9)
  bgm_act2_clear: 0.57, // 봉화와 마을의 불빛: 따뜻하게 커지는 현악·종의 2막 엔딩 (rms -21.1)
  sfx_rub_charge: 1.00, // 호박 막대를 털가죽에 문지른 뒤 작은 충전 틱 (rms -18.51)
  sfx_spark_small: 0.93, // 작은 전기 불꽃 두 번 (rms -17.41)
  sfx_repel_soft: 0.91, // 깃털과 돌이 부드럽게 밀려남 (rms -17.16)
  sfx_attract_snap: 0.92, // 끌려온 물체가 착 붙음 (rms -17.26)
  sfx_plate_charge: 0.91, // 금속판에 전하가 차는 상승음 (rms -17.2)
  sfx_spark_fairy_hit: 1.00, // 불꽃 요정이 맞는 전기 파직 (rms -18.88)
  sfx_spark_fairy_vanish: 0.92, // 불꽃 요정이 사라지는 하강음 (rms -17.3)
  sfx_lamp_on_bright: 0.90, // 등불이 밝게 켜지는 따뜻한 소리 (rms -17.13)
  sfx_lamp_on_dim: 0.90, // 등불이 희미하게 켜지는 낮은 소리 (rms -17.12)
  sfx_lamp_off: 0.94, // 등불이 꺼지는 짧은 소리 (rms -17.48)
  sfx_wire_heat: 0.97, // 전선이 일정하게 달아오르는 지글거림 (rms -17.77)
  sfx_wire_snap: 1.00, // 퓨즈·전선이 타서 끊어지고 식는 소리 (rms -20.8)
  sfx_bolt_thin: 0.94, // 직렬 회로의 가늘고 긴 번개 (rms -17.46)
  sfx_bolt_thick: 1.00, // 병렬 회로의 굵고 짧은 번개 (rms -19.96)
  sfx_overheat_warn: 0.90, // 과열 경고음 두 번 (rms -17.09)
  sfx_box_charge: 0.95, // 축전기 상자 충전 중 일정한 전기 웅웅거림 (rms -17.57)
  sfx_box_full: 0.92, // 축전기 상자가 가득 찬 맑은 딩 (rms -17.26)
  sfx_box_discharge: 1.00, // 축전기 상자가 한꺼번에 방전됨 (rms -22.12)
  sfx_touch_on: 0.92, // 터치 석판이 손바닥에 반응하는 맑은 링 (rms -17.25)
  sfx_touch_none: 0.94, // 석판이 반응하지 않는 둔한 톡 (rms -17.46)
  sfx_door_electric_open: 0.98, // 큰 철문이 위로 올라가며 열림 (rms -17.81)
  sfx_magnet_iron: 1.00, // 철이 자석에 강하게 달라붙음 (rms -19.51)
  sfx_magnet_none: 1.00, // 비자성 열쇠가 굴러떨어짐 (rms -22.19)
  sfx_graphite_float: 0.90, // 흑연판이 살짝 떠오르는 신비로운 울림 (rms -17.11)
  sfx_armor_drag: 0.91, // 철갑 기사가 끌려가며 갑옷이 긁힘 (rms -17.18)
  sfx_armor_copper_tong: 0.92, // 구리 갑옷이 자석에 반응하지 않는 금속 텅 (rms -17.27)
  sfx_knight_step: 0.95, // 철갑 기사의 발소리 한 걸음 (rms -17.58)
  sfx_compass_tick: 0.47, // 나침반 바늘이 돌아가는 작은 틱 (rms -17.35)
  sfx_motor_hum: 0.95, // 전동기가 일정하게 도는 위잉 (rms -17.57)
  sfx_elevator_stop: 1.00, // 승강기가 멈추는 무거운 쿵 (rms -19.86)
  sfx_switch_flip: 0.91, // 스위치가 뒤집히는 딸칵 (rms -17.15)
  sfx_statue_voice: 0.97, // 목소리 없는 석상 스피커 지지직 잡음 (rms -17.77)
  sfx_electromagnet_on: 0.90, // 전자석 함정이 켜지는 낮은 웅웅거림 (rms -17.13)
  sfx_electromagnet_off: 0.91, // 전자석 함정이 꺼지는 하강음 (rms -17.17)
  sfx_coil_gate: 0.93, // 자석이 코일 문을 통과하는 슈우웅 (rms -17.33)
  sfx_wireless_beep: 0.90, // 수신 코일에 신호가 도착하는 짧은 삐리릭 (rms -17.1)
  sfx_beacon_ignite: 1.00, // 봉화가 크게 켜지는 불길 (rms -19.09)
  sfx_beacon_fire: 0.55, // 일정하게 타는 봉화 장작불 (rms -22.38) — 켜진 뒤 몇 초만, 작게 (총괄지시 68번)
  sfx_village_lamp: 0.56, // 먼 마을 등불이 하나 켜지는 작은 맑은 톡 (rms -18.98)
  sfx_golem_magnet_step: 1.00, // 자석 골렘의 무거운 금속 발소리 (rms -19.48)
  sfx_golem_magnet_pull: 0.91, // 자석 골렘이 주변 쇠를 끌어당김 (rms -17.14)
  amb_tower_hum: 0.63, // 탑 내부 전기 장치의 아주 작은 지속 웅웅거림 (rms -25.98)
  amb_tower_wind: 0.64, // 탑 꼭대기에 일정하게 부는 바람 (rms -26.07)
  bgm_abyss_cursed: 0.44, // 탁한 심연, 어긋난 유리 종과 낮은 울림; 타이틀 주제의 그림자 변주 (rms -18.9)
  bgm_abyss_freed: 0.55, // 해방된 심연, 맑은 유리 종·현악과 경쾌한 마법서 선율 (rms -20.8)
  bgm_final_phase1: 0.56, // 최종전 1단계: 돌의 성 주제와 현악·타악의 긴장 (rms -20.9)
  bgm_final_phase2: 0.56, // 최종전 2단계: 번개의 탑 주제와 더 거센 금속 리듬 (rms -21.0)
  bgm_final_phase3: 0.56, // 최종전 3단계: 심연·성·탑 주제의 웅장한 전차 추격 (rms -21.0)
  bgm_ending: 0.56, // 열여덟 장이 돌아온 마법서: 완전한 주제와 따뜻한 관현악, 다음 이야기의 여운 (rms -21.0)
  sfx_wraith_beam: 0.76, // 망령의 날카로운 빛줄기 (rms -18.56)
  sfx_film_reflect: 0.79, // 막 방패가 빛을 맑게 튕김 (rms -18.97)
  sfx_dark_fringe_enter: 0.76, // 어두운 간섭 줄에서 먹먹해짐 (rms -18.6)
  sfx_slit_adjust: 0.76, // 두 틈 돌판을 밀어 고정 (rms -18.6)
  sfx_rune_reveal: 0.76, // 숨은 룬이 드러나는 낮은 종 (rms -18.67)
  sfx_torch_add: 0.96, // 횃불을 더 놓는 짧은 불길 (rms -20.61)
  sfx_wraith_vanish: 1.00, // 망령이 가볍게 흩어짐 (rms -21.23)
  sfx_lens_focus: 0.92, // 가까워지는 초점의 일정한 열 마찰 (rms -20.26)
  sfx_lens_burn: 1.00, // 맞은 초점에서 번지는 불꽃 (rms -21.93)
  sfx_water_miss: 0.83, // 빗나간 물체의 물 튀김 (rms -19.34)
  sfx_water_hit: 0.96, // 물속의 둔한 타격 (rms -20.69)
  sfx_hand_splash: 1.00, // 웅덩이에 손을 담그는 물 튀김 (rms -21.23)
  sfx_image_sharp: 0.77, // 상이 선명해지는 맑은 종 (rms -18.68)
  sfx_engrave: 0.76, // 빛으로 수정판에 문양을 새김 (rms -18.57)
  sfx_electron_eye_on: 0.93, // 전자의 눈이 켜지며 시야가 좁아짐 (rms -20.35)
  sfx_electron_eye_off: 0.92, // 전자의 눈이 꺼지며 시야가 풀림 (rms -20.27)
  sfx_bug_swarm: 0.21, // 그림자 벌레 떼의 일정한 사각거림 (rms -20.31)
  sfx_dot_tick: 0.27, // 감광판에 점 하나가 찍힘 (rms -18.54)
  sfx_bug_defeat: 0.96, // 벌레가 부스러져 흩어짐 (rms -20.67)
  sfx_electron_fire: 0.76, // 전자총의 짧은 발사음 (rms -18.56)
  sfx_spectro_look: 0.76, // 분광 수정의 유리 울림 (rms -18.63)
  sfx_spectrum_hydrogen: 0.80, // 수소의 정해진 네 음 (rms -19.05)
  sfx_spectrum_sodium: 0.76, // 나트륨의 매우 가까운 두 음 (rms -18.67)
  sfx_spectrum_neon: 0.77, // 낮은 쪽에 모인 네온의 여러 음 (rms -18.7)
  sfx_spectrum_mercury: 0.89, // 수은의 정해진 다섯 음 (rms -19.99)
  sfx_identity_reveal: 0.76, // 원소 화음이 또렷해짐 (rms -18.66)
  sfx_ball_step: 0.76, // 에너지 계단 공의 낙하와 반짝임 (rms -18.63)
  sfx_diode_pass: 1.00, // 순방향 다이오드를 부드럽게 통과 (rms -22.04)
  sfx_diode_block: 0.76, // 역방향 다이오드에 금속성으로 막힘 (rms -18.64)
  sfx_led_on: 0.30, // LED가 켜지는 짧은 맑은 종 (rms -18.64)
  sfx_curse_backflow: 0.90, // 저주 마력의 일정한 낮은 역류 (rms -20.07)
  sfx_tile_place: 0.84, // 다리 판을 놓는 묵직한 소리 (rms -19.49)
  sfx_tester_beep: 0.75, // 전도 시험기 짧은 전자음 (rms -18.55)
  sfx_chariot_launch: 1.00, // 전차가 바람을 가르며 멀어짐 (rms -21.62)
  sfx_chariot_run: 0.90, // 전차의 일정한 주행 바람 (rms -20.13)
  sfx_hourglass_normal: 0.93, // 일정하게 흐르는 모래 (rms -20.38)
  sfx_hourglass_slow: 0.92, // 낮고 늘어진 듯한 모래 흐름 (rms -20.27)
  sfx_light_arrow_hit: 1.00, // 빛 화살의 맑은 폭발 (rms -22.71)
  sfx_phase_shift: 1.00, // 저주 울림이 겹친 뒤 유리처럼 깨짐 (rms -23.02)
  sfx_spellbook_complete: 1.00, // 열여덟 장 복원과 큰 관현악 화음 (rms -23.35)
  sfx_wizard_cast: 0.76, // 목소리 없는 뒤틀린 주문음 (rms -18.62)
  amb_abyss_drip: 0.50, // 동굴의 물방울과 먼 잔향 (rms -30.01)
  amb_abyss_hum: 0.50, // 수정 동굴의 일정한 낮은 공명 (rms -29.98)
};
