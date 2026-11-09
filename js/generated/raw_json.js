// 자동 생성 파일: work/prepare_game_assets.py 가 만든다. 직접 고치지 말 것.
// 원본 패키지의 JSON을 그대로 옮긴 것 (좌표·설명 참고용)
window.RAW_JSON = {
 "ian_sprites": {
  "character": "이안",
  "frame_width": 1248,
  "frame_height": 768,
  "pivot": {
   "x": 473,
   "y": 756,
   "note": "발바닥 중앙, 모든 프레임 공통"
  },
  "animations": {
   "idle": {
    "name_ko": "서기",
    "sheet": "sheets/idle.png",
    "frames": 4,
    "fps": 6,
    "loop": true
   },
   "walk": {
    "name_ko": "걷기",
    "sheet": "sheets/walk.png",
    "frames": 6,
    "fps": 10,
    "loop": true
   },
   "push": {
    "name_ko": "밀기",
    "sheet": "sheets/push.png",
    "frames": 4,
    "fps": 8,
    "loop": true
   },
   "push_ice": {
    "name_ko": "얼음밀기",
    "sheet": "sheets/push_ice.png",
    "frames": 3,
    "fps": 8,
    "loop": false
   },
   "throw": {
    "name_ko": "던지기",
    "sheet": "sheets/throw.png",
    "frames": 4,
    "fps": 10,
    "loop": false
   },
   "throw_recoil": {
    "name_ko": "던지기반동",
    "sheet": "sheets/throw_recoil.png",
    "frames": 2,
    "fps": 8,
    "loop": false
   },
   "slide_flail": {
    "name_ko": "미끄러지기",
    "sheet": "sheets/slide_flail.png",
    "frames": 2,
    "fps": 6,
    "loop": true
   },
   "slide_steady": {
    "name_ko": "안정미끄러지기",
    "sheet": "sheets/slide_steady.png",
    "frames": 1,
    "fps": 1,
    "loop": true
   },
   "grab_ring": {
    "name_ko": "고리잡기",
    "sheet": "sheets/grab_ring.png",
    "frames": 4,
    "fps": 8,
    "loop": false
   },
   "hurt": {
    "name_ko": "피격",
    "sheet": "sheets/hurt.png",
    "frames": 2,
    "fps": 8,
    "loop": false
   },
   "fall": {
    "name_ko": "쓰러짐",
    "sheet": "sheets/fall.png",
    "frames": 3,
    "fps": 6,
    "loop": false
   },
   "realize": {
    "name_ko": "깨달음",
    "sheet": "sheets/realize.png",
    "frames": 3,
    "fps": 6,
    "loop": false
   },
   "attack_light": {
    "name_ko": "빛화살",
    "sheet": "sheets/attack_light.png",
    "frames": 4,
    "fps": 10,
    "loop": false
   },
   "attack_lightning": {
    "name_ko": "번개",
    "sheet": "sheets/attack_lightning.png",
    "frames": 4,
    "fps": 10,
    "loop": false
   }
  }
 },
 "ian_extra": {
  "canvas": [
   1248,
   768
  ],
  "pivot": [
   473,
   756
  ],
  "facing": "right",
  "actions": {
   "kick": [
    "kick_01.png",
    "kick_02.png",
    "kick_03.png",
    "kick_04.png"
   ],
   "rope_hang": [
    "rope_hang_01.png",
    "rope_hang_02.png"
   ]
  }
 },
 "ui_manifest": {
  "version": "3.0",
  "screen": [
   1920,
   1080
  ],
  "chapter_order": [
   {
    "chapter": "01",
    "topic": "돌림힘과 지레",
    "scene": "시소의 받침점",
    "torn": "spellbook/01_torn.png",
    "illustration": "spellbook/illustrations/01.png",
    "law_sentence": "물체에 작용하는 알짜힘과 돌림힘이 모두 0일 때 물체는 평형을 이룬다.",
    "restored_preview": "spellbook/01_restored.png"
   },
   {
    "chapter": "02",
    "topic": "관성과 가속도",
    "scene": "얼음 회랑",
    "torn": "spellbook/02_torn.png",
    "illustration": "spellbook/illustrations/02.png",
    "law_sentence": "힘이 작용하지 않으면 물체는 운동 상태를 유지하고, 힘이 작용하면 힘에 비례하고 질량에 반비례하는 가속도가 생긴다.",
    "restored_preview": "spellbook/02_restored.png"
   },
   {
    "chapter": "03",
    "topic": "작용과 반작용",
    "scene": "얼음 호수",
    "torn": "spellbook/03_torn.png",
    "illustration": "spellbook/illustrations/03.png",
    "law_sentence": "힘은 언제나 쌍으로 작용하고, 외부 힘이 없으면 물체들의 운동량 총합은 보존된다.",
    "restored_preview": "spellbook/03_restored.png"
   },
   {
    "chapter": "04",
    "topic": "에너지 보존",
    "scene": "광차 탑",
    "torn": "spellbook/04_torn.png",
    "illustration": "spellbook/illustrations/04.png",
    "law_sentence": "물체에 해 준 일만큼 운동 에너지가 변하고, 마찰이 없으면 위치 에너지와 운동 에너지의 합인 역학적 에너지는 보존된다.",
    "restored_preview": "spellbook/04_restored.png"
   },
   {
    "chapter": "05",
    "topic": "마찰과 열",
    "scene": "거친 돌바닥",
    "torn": "spellbook/05_torn.png",
    "illustration": "spellbook/illustrations/05.png",
    "law_sentence": "역학적 에너지가 열로 전환될 때도 에너지의 총량은 변하지 않는다.",
    "restored_preview": "spellbook/05_restored.png"
   },
   {
    "chapter": "06",
    "topic": "열과 영구기관",
    "scene": "영원의 바퀴",
    "torn": "spellbook/06_torn.png",
    "illustration": "spellbook/illustrations/06.png",
    "law_sentence": "열을 역학적 에너지로 바꾸는 효율은 100%가 될 수 없으며, 영구기관은 만들 수 없다.",
    "restored_preview": "spellbook/06_restored.png"
   }
  ],
  "runtime_text_regions": {
   "dialogue": {
    "name": [
     590,
     663,
     1100,
     80
    ],
    "body": [
     590,
     830,
     1180,
     150
    ],
    "portrait": [
     112,
     657,
     385,
     340
    ]
   },
   "exam": {
    "question": [
     260,
     328,
     990,
     230
    ],
    "answer_left": [
     280,
     747,
     400,
     90
    ],
    "answer_right": [
     870,
     747,
     400,
     90
    ]
   },
   "spellbook": {
    "chapter_title": [
     278,
     175,
     450,
     110
    ],
    "law_sentence": [
     278,
     400,
     440,
     350
    ],
    "illustration": [
     810,
     225,
     525,
     530
    ]
   },
   "weapon_unlock": {
    "title": [
     267,
     38,
     580,
     56
    ],
    "description": [
     268,
     126,
     580,
     70
    ],
    "icon": [
     70,
     67,
     96,
     96
    ]
   }
  },
  "notes": [
   "Title, dialogue, exam, spellbook and unlock card have separate reusable blanks or art layers.",
   "Spellbook chapter title and law sentence are runtime text, transcribed from the supplied story PDF.",
   "Portraits are 540x540 with the same face placement.",
   "At runtime compose restored chapters from the blank spread, chapter illustration, title, and law text. Do not layer a restored_preview image over these elements.",
   "Each restored_preview PNG is for review only; it already contains the illustration.",
   "Torn pages show the lower parchment leaf and a narrow ragged remnant of the upper leaf."
  ],
  "subtitle": "오개념의 저주",
  "exam_title": "마법서 시험",
  "ian_portraits": {
   "default": "portraits/ian_default.png",
   "surprised": "portraits/ian_surprised.png",
   "realization": "portraits/ian_realization.png",
   "thinking": "portraits/ian_thinking.png"
  },
  "spellbook_runtime_composition": {
   "base": "spellbook/blank_spread.png",
   "illustration_field": "chapter_order[].illustration",
   "title_field": "chapter_order[].topic",
   "law_field": "chapter_order[].law_sentence",
   "restored_preview_only": "chapter_order[].restored_preview",
   "torn_image_field": "chapter_order[].torn"
  }
 },
 "garon_sprites": {
  "character": "가론",
  "frame_width": 1280,
  "frame_height": 1024,
  "pivot": {
   "x": 640,
   "y": 800,
   "note": "발 기준선; 공중 동작은 발이 떠 보이도록 엔진에서 조절 가능"
  },
  "standing_height_target": 740,
  "animations": {
   "idle": {
    "frames": 4,
    "fps": 6,
    "loop": true,
    "sheet": "sheets/idle.png",
    "frame_files": [
     "frames/idle_01.png",
     "frames/idle_02.png",
     "frames/idle_03.png",
     "frames/idle_04.png"
    ]
   },
   "walk": {
    "frames": 6,
    "fps": 10,
    "loop": true,
    "sheet": "sheets/walk.png",
    "frame_files": [
     "frames/walk_01.png",
     "frames/walk_02.png",
     "frames/walk_03.png",
     "frames/walk_04.png",
     "frames/walk_05.png",
     "frames/walk_06.png"
    ]
   },
   "push": {
    "frames": 4,
    "fps": 8,
    "loop": true,
    "sheet": "sheets/push.png",
    "frame_files": [
     "frames/push_01.png",
     "frames/push_02.png",
     "frames/push_03.png",
     "frames/push_04.png"
    ]
   },
   "shield_charge": {
    "frames": 4,
    "fps": 12,
    "loop": false,
    "sheet": "sheets/shield_charge.png",
    "frame_files": [
     "frames/shield_charge_01.png",
     "frames/shield_charge_02.png",
     "frames/shield_charge_03.png",
     "frames/shield_charge_04.png"
    ]
   },
   "ice_fall": {
    "frames": 4,
    "fps": 8,
    "loop": false,
    "sheet": "sheets/ice_fall.png",
    "frame_files": [
     "frames/ice_fall_01.png",
     "frames/ice_fall_02.png",
     "frames/ice_fall_03.png",
     "frames/ice_fall_04.png"
    ]
   },
   "surprised": {
    "frames": 3,
    "fps": 7,
    "loop": false,
    "sheet": "sheets/surprised.png",
    "frame_files": [
     "frames/surprised_01.png",
     "frames/surprised_02.png",
     "frames/surprised_03.png"
    ]
   },
   "pant": {
    "frames": 3,
    "fps": 6,
    "loop": true,
    "sheet": "sheets/pant.png",
    "frame_files": [
     "frames/pant_01.png",
     "frames/pant_02.png",
     "frames/pant_03.png"
    ]
   },
   "ice_push_recoil": {
    "frames": 3,
    "fps": 8,
    "loop": false,
    "sheet": "sheets/ice_push_recoil.png",
    "frame_files": [
     "frames/ice_push_recoil_01.png",
     "frames/ice_push_recoil_02.png",
     "frames/ice_push_recoil_03.png"
    ]
   },
   "shield_block": {
    "frames": 3,
    "fps": 8,
    "loop": false,
    "sheet": "sheets/shield_block.png",
    "frame_files": [
     "frames/shield_block_01.png",
     "frames/shield_block_02.png",
     "frames/shield_block_03.png"
    ]
   },
   "hurt": {
    "frames": 2,
    "fps": 8,
    "loop": false,
    "sheet": "sheets/hurt.png",
    "frame_files": [
     "frames/hurt_01.png",
     "frames/hurt_02.png"
    ]
   },
   "rope_hang": {
    "frames": 2,
    "fps": 6,
    "loop": true,
    "sheet": "sheets/rope_hang.png",
    "frame_files": [
     "frames/rope_hang_01.png",
     "frames/rope_hang_02.png"
    ],
    "pivot": {
     "x": 640,
     "y": 970,
     "note": "매달린 몸의 발 높이. 밧줄은 화면 위로 이어짐"
    }
   },
   "embarrassed": {
    "frames": 2,
    "fps": 5,
    "loop": true,
    "sheet": "sheets/embarrassed.png",
    "frame_files": [
     "frames/embarrassed_01.png",
     "frames/embarrassed_02.png"
    ]
   },
   "wall_push": {
    "frames": 2,
    "fps": 6,
    "loop": true,
    "sheet": "sheets/wall_push.png",
    "frame_files": [
     "frames/wall_push_01.png",
     "frames/wall_push_02.png"
    ]
   },
   "battle_ko": {
    "frames": 3,
    "fps": 6,
    "loop": false,
    "sheet": "sheets/battle_ko.png",
    "frame_files": [
     "frames/battle_ko_01.png",
     "frames/battle_ko_02.png",
     "frames/battle_ko_03.png"
    ]
   }
  }
 },
 "character_registry": {
  "ian": {
   "frame_size": [
    1248,
    768
   ],
   "pivot": [
    473,
    756
   ]
  },
  "garon": {
   "frame_size": [
    1280,
    1024
   ],
   "pivot": [
    640,
    800
   ],
   "action_pivots": {
    "rope_hang": [
     640,
     970
    ]
   }
  },
  "note": "캐릭터별 프레임 크기와 기준점을 엔진에서 따로 적용하세요."
 },
 "garon_extra": {
  "canvas": [
   1280,
   1024
  ],
  "pivot": [
   640,
   800
  ],
  "facing": "right",
  "actions": {
   "grab_ring": [
    "grab_ring_01.png",
    "grab_ring_02.png",
    "grab_ring_03.png",
    "grab_ring_04.png"
   ],
   "slide_steady": [
    "slide_steady_01.png"
   ],
   "slip": [
    "slip_01.png",
    "slip_02.png"
   ],
   "kick": [
    "kick_01.png",
    "kick_02.png",
    "kick_03.png",
    "kick_04.png"
   ]
  }
 },
 "stone_granny_sprites": {
  "character": "스톤 할멈",
  "frame_size": [
   1280,
   1024
  ],
  "pivot": [
   640,
   800
  ],
  "portrait_size": [
   620,
   550
  ],
  "animations": {
   "idle": {
    "frames": 4,
    "fps": 4,
    "loop": true,
    "frame_files": [
     "frames/idle_01.png",
     "frames/idle_02.png",
     "frames/idle_03.png",
     "frames/idle_04.png"
    ],
    "sheet": "sheets/idle.png"
   },
   "hint": {
    "frames": 3,
    "fps": 6,
    "loop": false,
    "frame_files": [
     "frames/hint_01.png",
     "frames/hint_02.png",
     "frames/hint_03.png"
    ],
    "sheet": "sheets/hint.png"
   },
   "staff_magic": {
    "frames": 4,
    "fps": 5,
    "loop": false,
    "frame_files": [
     "frames/staff_magic_01.png",
     "frames/staff_magic_02.png",
     "frames/staff_magic_03.png",
     "frames/staff_magic_04.png"
    ],
    "sheet": "sheets/staff_magic.png"
   },
   "nod_laugh": {
    "frames": 2,
    "fps": 5,
    "loop": false,
    "frame_files": [
     "frames/nod_laugh_01.png",
     "frames/nod_laugh_02.png"
    ],
    "sheet": "sheets/nod_laugh.png"
   },
   "walk": {
    "frames": 6,
    "fps": 8,
    "loop": true,
    "frame_files": [
     "frames/walk_01.png",
     "frames/walk_02.png",
     "frames/walk_03.png",
     "frames/walk_04.png",
     "frames/walk_05.png",
     "frames/walk_06.png"
    ],
    "sheet": "sheets/walk.png",
    "size_reference": "walk_01; 04~06 source art corrected to remove growth"
   },
   "surprise": {
    "frames": 2,
    "fps": 6,
    "loop": false,
    "frame_files": [
     "frames/surprise_01.png",
     "frames/surprise_02.png"
    ],
    "sheet": "sheets/surprise.png"
   }
  },
  "version": 3
 },
 "wizard_sprites": {
  "character": "뒤틀림의 마법사",
  "frame_size": [
   1280,
   1024
  ],
  "pivot": [
   640,
   800
  ],
  "facing": "left",
  "animations": {
   "idle": {
    "frames": 4,
    "fps": 5,
    "loop": true,
    "frame_files": [
     "frames/idle_01.png",
     "frames/idle_02.png",
     "frames/idle_03.png",
     "frames/idle_04.png"
    ],
    "sheet": "sheets/idle.png"
   },
   "cast": {
    "frames": 4,
    "fps": 8,
    "loop": false,
    "frame_files": [
     "frames/cast_01.png",
     "frames/cast_02.png",
     "frames/cast_03.png",
     "frames/cast_04.png"
    ],
    "sheet": "sheets/cast.png"
   },
   "hurt": {
    "frames": 2,
    "fps": 8,
    "loop": false,
    "frame_files": [
     "frames/hurt_01.png",
     "frames/hurt_02.png"
    ],
    "sheet": "sheets/hurt.png"
   },
   "defeat": {
    "frames": 3,
    "fps": 5,
    "loop": false,
    "frame_files": [
     "frames/defeat_01.png",
     "frames/defeat_02.png",
     "frames/defeat_03.png"
    ],
    "sheet": "sheets/defeat.png"
   },
   "teleport": {
    "frames": 3,
    "fps": 7,
    "loop": false,
    "frame_files": [
     "frames/teleport_01.png",
     "frames/teleport_02.png",
     "frames/teleport_03.png"
    ],
    "sheet": "sheets/teleport.png"
   }
  },
  "portraits": {
   "frame_size": [
    701,
    540
   ],
   "expressions": {
    "sarcastic": "portraits/sarcastic.png",
    "angry": "portraits/angry.png",
    "startled": "portraits/startled.png",
    "remorseful": "portraits/remorseful.png"
   },
   "sheet": "portraits/portrait_sheet.png"
  }
 },
 "wizard_cutscenes": {
  "character": "뒤틀림의 마법사",
  "canvas": [
   1280,
   1024
  ],
  "pivot": [
   640,
   800
  ],
  "facing": "left",
  "animations": {
   "book_tear": {
    "frames": 3,
    "fps": 4,
    "loop": false,
    "sheet": "sheets/book_tear.png",
    "frame_files": [
     "frames/book_tear_01.png",
     "frames/book_tear_02.png",
     "frames/book_tear_03.png"
    ]
   },
   "reconcile": {
    "frames": 2,
    "fps": 3,
    "loop": false,
    "sheet": "sheets/reconcile.png",
    "frame_files": [
     "frames/reconcile_01.png",
     "frames/reconcile_02.png"
    ]
   }
  }
 },
 "chariot_sprites": {
  "character": "뒤틀림의 마법사",
  "asset": "3-6 마법 전차",
  "canvas": [
   1920,
   1024
  ],
  "pivot": [
   960,
   800
  ],
  "facing": "left",
  "travel_direction": "left",
  "rider_fps": 6,
  "rider_loop": true,
  "length_contraction_ratio": 0.65,
  "vehicle_normal": "vehicles/chariot_normal.png",
  "vehicle_contracted": "vehicles/chariot_contracted_65pct.png",
  "rider_frames": [
   "frames/ride_01.png",
   "frames/ride_02.png",
   "frames/ride_03.png"
  ],
  "combined_normal": [
   "composites/ride_normal_01.png",
   "composites/ride_normal_02.png",
   "composites/ride_normal_03.png"
  ],
  "combined_contracted": [
   "composites/ride_contracted_01.png",
   "composites/ride_contracted_02.png",
   "composites/ride_contracted_03.png"
  ],
  "vehicle_bbox_normal": [
   228,
   306,
   1693,
   800
  ],
  "vehicle_bbox_contracted": [
   484,
   306,
   1436,
   800
  ],
  "rider_placements": [
   [
    760,
    224,
    819,
    506
   ],
   [
    760,
    222,
    861,
    508
   ],
   [
    760,
    222,
    824,
    508
   ]
  ],
  "notes": "짧은 버전은 동일한 원본을 진행 방향(x축)으로만 65% 수축. 세로 크기 유지."
 },
 "villagers_sprites": {
  "format_version": 1,
  "canvas": [
   1280,
   1024
  ],
  "pivot": [
   640,
   800
  ],
  "facing": "right",
  "directions": "Mirror sprites horizontally for left-facing display; mirror movement/effects consistently.",
  "animation_status": "Idle 2 frames, walk 4, wave 2, throw 2. In the four-frame walk, 01 and 03 are alternating wide strides.",
  "characters": {
   "child": {
    "idle": {
     "sheet": "sheets/child_idle.png",
     "frame_count": 2,
     "frames": [
      {
       "file": "frames/child/idle_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/child/idle_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": true
    },
    "walk": {
     "sheet": "sheets/child_walk.png",
     "frame_count": 4,
     "frames": [
      {
       "file": "frames/child/walk_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/child/walk_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/child/walk_03.png",
       "sheet_rect": [
        2560,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/child/walk_04.png",
       "sheet_rect": [
        3840,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": true
    },
    "wave": {
     "sheet": "sheets/child_wave.png",
     "frame_count": 2,
     "frames": [
      {
       "file": "frames/child/wave_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/child/wave_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": true
    },
    "throw": {
     "sheet": "sheets/child_throw.png",
     "frame_count": 2,
     "frames": [
      {
       "file": "frames/child/throw_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/child/throw_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": false
    }
   },
   "merchant": {
    "idle": {
     "sheet": "sheets/merchant_idle.png",
     "frame_count": 2,
     "frames": [
      {
       "file": "frames/merchant/idle_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/merchant/idle_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": true
    },
    "walk": {
     "sheet": "sheets/merchant_walk.png",
     "frame_count": 4,
     "frames": [
      {
       "file": "frames/merchant/walk_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/merchant/walk_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/merchant/walk_03.png",
       "sheet_rect": [
        2560,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/merchant/walk_04.png",
       "sheet_rect": [
        3840,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": true
    },
    "wave": {
     "sheet": "sheets/merchant_wave.png",
     "frame_count": 2,
     "frames": [
      {
       "file": "frames/merchant/wave_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/merchant/wave_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": true
    },
    "throw": {
     "sheet": "sheets/merchant_throw.png",
     "frame_count": 2,
     "frames": [
      {
       "file": "frames/merchant/throw_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/merchant/throw_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": false
    }
   },
   "farmer": {
    "idle": {
     "sheet": "sheets/farmer_idle.png",
     "frame_count": 2,
     "frames": [
      {
       "file": "frames/farmer/idle_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/farmer/idle_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": true
    },
    "walk": {
     "sheet": "sheets/farmer_walk.png",
     "frame_count": 4,
     "frames": [
      {
       "file": "frames/farmer/walk_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/farmer/walk_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/farmer/walk_03.png",
       "sheet_rect": [
        2560,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/farmer/walk_04.png",
       "sheet_rect": [
        3840,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": true
    },
    "wave": {
     "sheet": "sheets/farmer_wave.png",
     "frame_count": 2,
     "frames": [
      {
       "file": "frames/farmer/wave_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/farmer/wave_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": true
    },
    "throw": {
     "sheet": "sheets/farmer_throw.png",
     "frame_count": 2,
     "frames": [
      {
       "file": "frames/farmer/throw_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/farmer/throw_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": false
    }
   },
   "fisher": {
    "idle": {
     "sheet": "sheets/fisher_idle.png",
     "frame_count": 2,
     "frames": [
      {
       "file": "frames/fisher/idle_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/fisher/idle_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": true
    },
    "walk": {
     "sheet": "sheets/fisher_walk.png",
     "frame_count": 4,
     "frames": [
      {
       "file": "frames/fisher/walk_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/fisher/walk_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/fisher/walk_03.png",
       "sheet_rect": [
        2560,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/fisher/walk_04.png",
       "sheet_rect": [
        3840,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": true
    },
    "wave": {
     "sheet": "sheets/fisher_wave.png",
     "frame_count": 2,
     "frames": [
      {
       "file": "frames/fisher/wave_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/fisher/wave_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": true
    },
    "throw": {
     "sheet": "sheets/fisher_throw.png",
     "frame_count": 2,
     "frames": [
      {
       "file": "frames/fisher/throw_01.png",
       "sheet_rect": [
        0,
        0,
        1280,
        1024
       ]
      },
      {
       "file": "frames/fisher/throw_02.png",
       "sheet_rect": [
        1280,
        0,
        1280,
        1024
       ]
      }
     ],
     "loop": false
    }
   }
  }
 },
 "stone_golem_sprites": {
  "canvas": [
   1280,
   1024
  ],
  "pivot": [
   640,
   800
  ],
  "facing": "left",
  "nominal_standing_height": 240,
  "actions": {
   "idle": {
    "frame_count": 2,
    "fps": 3,
    "loop": true,
    "sheet": "sheets/idle.png",
    "frames": [
     {
      "file": "frames/idle_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/idle_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "walk": {
    "frame_count": 4,
    "fps": 6,
    "loop": true,
    "sheet": "sheets/walk.png",
    "frames": [
     {
      "file": "frames/walk_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/walk_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/walk_03.png",
      "sheet_rect": [
       2560,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/walk_04.png",
      "sheet_rect": [
       3840,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "punch": {
    "frame_count": 3,
    "fps": 8,
    "loop": false,
    "sheet": "sheets/punch.png",
    "frames": [
     {
      "file": "frames/punch_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/punch_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/punch_03.png",
      "sheet_rect": [
       2560,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "hit": {
    "frame_count": 1,
    "fps": 1,
    "loop": false,
    "sheet": "sheets/hit.png",
    "frames": [
     {
      "file": "frames/hit_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "launch": {
    "frame_count": 2,
    "fps": 8,
    "loop": false,
    "sheet": "sheets/launch.png",
    "frames": [
     {
      "file": "frames/launch_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/launch_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "crumble": {
    "frame_count": 3,
    "fps": 7,
    "loop": false,
    "sheet": "sheets/crumble.png",
    "frames": [
     {
      "file": "frames/crumble_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/crumble_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/crumble_03.png",
      "sheet_rect": [
       2560,
       0,
       1280,
       1024
      ]
     }
    ]
   }
  }
 },
 "inertia_golem_sprites": {
  "canvas": [
   1280,
   1024
  ],
  "pivot": [
   640,
   800
  ],
  "facing": "left",
  "standing_height_px": 760,
  "scale_rule": "Every frame uses the same scale derived from the original standing reference: 760 / 1037. Crouches and tumbles retain their natural height.",
  "animation_note": "Move charge and fall in the engine. Charge keeps horizontal velocity during struggle; fall follows gravity after crossing the pit edge. Visual foot rotation alone must not change velocity.",
  "actions": {
   "idle": {
    "frame_count": 2,
    "fps": 1,
    "loop": true,
    "sheet": "sheets/idle.png",
    "frames": [
     {
      "file": "frames/idle_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/idle_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "charge": {
    "frame_count": 3,
    "fps": 8,
    "loop": true,
    "sheet": "sheets/charge.png",
    "frames": [
     {
      "file": "frames/charge_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/charge_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/charge_03.png",
      "sheet_rect": [
       2560,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "struggle": {
    "frame_count": 3,
    "fps": 7,
    "loop": true,
    "sheet": "sheets/struggle.png",
    "frames": [
     {
      "file": "frames/struggle_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/struggle_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/struggle_03.png",
      "sheet_rect": [
       2560,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "fall": {
    "frame_count": 3,
    "fps": 7,
    "loop": false,
    "sheet": "sheets/fall.png",
    "frames": [
     {
      "file": "frames/fall_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/fall_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/fall_03.png",
      "sheet_rect": [
       2560,
       0,
       1280,
       1024
      ]
     }
    ]
   }
  }
 },
 "ice_troll_sprites": {
  "canvas": [
   1280,
   1024
  ],
  "pivot": [
   640,
   800
  ],
  "facing": "left",
  "idle_height_px": 740,
  "scale_rule": "Use one scale for all source frames derived from idle_01: 740 / its source alpha-bounds height. Pose heights vary naturally.",
  "physics_note": "During push the troll exerts force leftward on Ian; at release apply rightward recoil velocity to troll and leftward velocity to Ian. Keep both sliding according to friction. Recoil frames do not set displacement by themselves.",
  "actions": {
   "idle": {
    "frame_count": 2,
    "fps": 2,
    "loop": true,
    "sheet": "sheets/idle.png",
    "frames": [
     {
      "file": "frames/idle_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/idle_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "push": {
    "frame_count": 3,
    "fps": 8,
    "loop": false,
    "sheet": "sheets/push.png",
    "frames": [
     {
      "file": "frames/push_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/push_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/push_03.png",
      "sheet_rect": [
       2560,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "recoil": {
    "frame_count": 2,
    "fps": 7,
    "loop": false,
    "sheet": "sheets/recoil.png",
    "frames": [
     {
      "file": "frames/recoil_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/recoil_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "hit": {
    "frame_count": 1,
    "fps": 1,
    "loop": false,
    "sheet": "sheets/hit.png",
    "frames": [
     {
      "file": "frames/hit_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "defeat": {
    "frame_count": 2,
    "fps": 6,
    "loop": false,
    "sheet": "sheets/defeat.png",
    "frames": [
     {
      "file": "frames/defeat_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/defeat_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   }
  }
 },
 "ice_spirit_sprites": {
  "canvas": [
   1280,
   1024
  ],
  "pivot": [
   640,
   800
  ],
  "facing": "left",
  "nominal_hover_height": 350,
  "hover_sprite_bottom_y": 650,
  "scale_rule": "Hover, attack and deflect share the base source scale. Melting deliberately reduces remaining creature scale by 1.0, 0.85, 0.70, 0.55 as its ice turns to water; stages descend toward ground y=800.",
  "physics_note": "Ordinary weapon contact plays deflect without reducing HP. On rough stone, kinetic energy is lost to frictional heating; after sufficient sliding distance or accumulated friction work, play melt. Do not trigger melting from mere passage of time over frictionless ice.",
  "actions": {
   "hover": {
    "frame_count": 2,
    "fps": 3,
    "loop": true,
    "sheet": "sheets/hover.png",
    "frames": [
     {
      "file": "frames/hover_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/hover_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "attack": {
    "frame_count": 3,
    "fps": 7,
    "loop": false,
    "sheet": "sheets/attack.png",
    "frames": [
     {
      "file": "frames/attack_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/attack_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/attack_03.png",
      "sheet_rect": [
       2560,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "deflect": {
    "frame_count": 1,
    "fps": 1,
    "loop": false,
    "sheet": "sheets/deflect.png",
    "frames": [
     {
      "file": "frames/deflect_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "melt": {
    "frame_count": 4,
    "fps": 6,
    "loop": false,
    "sheet": "sheets/melt.png",
    "frames": [
     {
      "file": "frames/melt_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/melt_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/melt_03.png",
      "sheet_rect": [
       2560,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/melt_04.png",
      "sheet_rect": [
       3840,
       0,
       1280,
       1024
      ]
     }
    ]
   }
  }
 },
 "merchant_sprites": {
  "entity": "merchant",
  "canvas": [
   1280,
   1024
  ],
  "pivot": [
   640,
   800
  ],
  "facing": "left",
  "nominal_height_px": 620,
  "scale_rule": "Every frame uses the SAME source-to-game scale: 620 / 1339. Pose heights are not independently normalized.",
  "actions": {
   "idle": {
    "frame_count": 2,
    "fps": 2,
    "loop": true,
    "sheet": "sheets/idle.png",
    "frames": [
     {
      "file": "frames/idle_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/idle_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "boast": {
    "frame_count": 2,
    "fps": 5,
    "loop": false,
    "sheet": "sheets/boast.png",
    "frames": [
     {
      "file": "frames/boast_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/boast_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "summon": {
    "frame_count": 2,
    "fps": 5,
    "loop": false,
    "sheet": "sheets/summon.png",
    "frames": [
     {
      "file": "frames/summon_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/summon_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "panic": {
    "frame_count": 2,
    "fps": 5,
    "loop": false,
    "sheet": "sheets/panic.png",
    "frames": [
     {
      "file": "frames/panic_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/panic_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   }
  },
  "story_note": "The merchant claims the wheel and steam golem work forever. Panic animation follows the demonstration slowing and the fuel supply being exposed."
 },
 "steam_golem_sprites": {
  "entity": "steam_golem",
  "canvas": [
   1280,
   1024
  ],
  "pivot": [
   640,
   800
  ],
  "facing": "left",
  "nominal_height_px": 700,
  "scale_rule": "Every frame uses the SAME source-to-game scale: 700 / 1102. Pose heights are not independently normalized.",
  "actions": {
   "idle": {
    "frame_count": 2,
    "fps": 2,
    "loop": true,
    "sheet": "sheets/idle.png",
    "frames": [
     {
      "file": "frames/idle_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/idle_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "work": {
    "frame_count": 3,
    "fps": 7,
    "loop": true,
    "sheet": "sheets/work.png",
    "frames": [
     {
      "file": "frames/work_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/work_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/work_03.png",
      "sheet_rect": [
       2560,
       0,
       1280,
       1024
      ]
     }
    ]
   },
   "fuel_stop": {
    "frame_count": 2,
    "fps": 4,
    "loop": false,
    "sheet": "sheets/fuel_stop.png",
    "frames": [
     {
      "file": "frames/fuel_stop_01.png",
      "sheet_rect": [
       0,
       0,
       1280,
       1024
      ]
     },
     {
      "file": "frames/fuel_stop_02.png",
      "sheet_rect": [
       1280,
       0,
       1280,
       1024
      ]
     }
    ]
   }
  },
  "physics_note": "Steam venting during work visualizes waste heat: heat supplied by fuel cannot all become mechanical work. When fuel supply ends, pressure and furnace light fall, then play fuel_stop."
 },
 "wheel_layers": {
  "format_version": 2,
  "canvas": [
   1280,
   1024
  ],
  "pivot": [
   640,
   800
  ],
  "render_order": [
   "layers/stand.png",
   "layers/rotor.png"
  ],
  "stand_file": "layers/stand.png",
  "rotor_file": "layers/rotor.png",
  "rotor_axis_px": [
   639,
   483
  ],
  "rotor_initial_angle_degrees": 0,
  "rotation_direction": "clockwise when looking at the screen",
  "animation": "Rotate ONLY the rotor layer around rotor_axis_px. Keep the stand fixed. Lower angular velocity continuously under a friction torque until it reaches zero, then hold the final rotor angle. Do not cycle through the old four drawn spin frames.",
  "physics": "For a simple prototype with constant friction torque: angular_velocity = max(0, angular_velocity - angular_deceleration * dt); angle += angular_velocity * dt. The lost rotational energy is dissipated as heat and sound. Tune parameters for gameplay; the GIF is illustrative, not a measured simulation.",
  "art_notes": "The rotor has six permanent spokes and six attached copper weights. The stand is separate. Both layers use identical 1280x1024 transparent canvases and share the same axle position."
 },
 "act2_characters": {
  "parts": {
   "1a": {
    "canvas": [
     1280,
     1024
    ],
    "pivot": [
     640,
     800
    ],
    "characters": {
     "ian": {
      "target_height_px": 640,
      "animations": {
       "charge_rub": {
        "frames": [
         "frames/ian/charge_rub_01.png",
         "frames/ian/charge_rub_02.png",
         "frames/ian/charge_rub_03.png"
        ],
        "fps": 10,
        "loop": false,
        "anchor": [
         640,
         800
        ],
        "collision": [
         520,
         175,
         240,
         625
        ]
       },
       "magnet_pull": {
        "frames": [
         "frames/ian/magnet_pull_01.png",
         "frames/ian/magnet_pull_02.png",
         "frames/ian/magnet_pull_03.png"
        ],
        "fps": 10,
        "loop": false,
        "anchor": [
         640,
         800
        ],
        "collision": [
         520,
         175,
         240,
         625
        ]
       },
       "box_charge_release": {
        "frames": [
         "frames/ian/box_charge_release_01.png",
         "frames/ian/box_charge_release_02.png",
         "frames/ian/box_charge_release_03.png",
         "frames/ian/box_charge_release_04.png"
        ],
        "fps": 12,
        "loop": false,
        "anchor": [
         640,
         800
        ],
        "collision": [
         520,
         175,
         240,
         625
        ]
       }
      }
     },
     "spark_fairy_positive": {
      "target_height_px": 220,
      "animations": {
       "float": {
        "frames": [
         "frames/spark_fairy_positive/float_01.png",
         "frames/spark_fairy_positive/float_02.png",
         "frames/spark_fairy_positive/float_03.png"
        ],
        "fps": 5,
        "loop": true,
        "anchor": [
         640,
         540
        ],
        "collision": null
       },
       "pushed": {
        "frames": [
         "frames/spark_fairy_positive/pushed_01.png",
         "frames/spark_fairy_positive/pushed_02.png"
        ],
        "fps": 8,
        "loop": false,
        "anchor": [
         640,
         540
        ],
        "collision": null
       },
       "pulled": {
        "frames": [
         "frames/spark_fairy_positive/pulled_01.png",
         "frames/spark_fairy_positive/pulled_02.png"
        ],
        "fps": 8,
        "loop": false,
        "anchor": [
         640,
         540
        ],
        "collision": null
       },
       "attack": {
        "frames": [
         "frames/spark_fairy_positive/attack_01.png",
         "frames/spark_fairy_positive/attack_02.png",
         "frames/spark_fairy_positive/attack_03.png"
        ],
        "fps": 10,
        "loop": false,
        "anchor": [
         640,
         540
        ],
        "collision": null
       },
       "vanish": {
        "frames": [
         "frames/spark_fairy_positive/vanish_01.png",
         "frames/spark_fairy_positive/vanish_02.png",
         "frames/spark_fairy_positive/vanish_03.png"
        ],
        "fps": 10,
        "loop": false,
        "anchor": [
         640,
         540
        ],
        "collision": null
       }
      },
      "uniform_scale_from_v1": 1.375,
      "body_center": [
       640,
       540
      ]
     },
     "spark_fairy_negative": {
      "target_height_px": 220,
      "animations": {
       "float": {
        "frames": [
         "frames/spark_fairy_negative/float_01.png",
         "frames/spark_fairy_negative/float_02.png",
         "frames/spark_fairy_negative/float_03.png"
        ],
        "fps": 5,
        "loop": true,
        "anchor": [
         640,
         540
        ],
        "collision": null
       },
       "pushed": {
        "frames": [
         "frames/spark_fairy_negative/pushed_01.png",
         "frames/spark_fairy_negative/pushed_02.png"
        ],
        "fps": 8,
        "loop": false,
        "anchor": [
         640,
         540
        ],
        "collision": null
       },
       "pulled": {
        "frames": [
         "frames/spark_fairy_negative/pulled_01.png",
         "frames/spark_fairy_negative/pulled_02.png"
        ],
        "fps": 8,
        "loop": false,
        "anchor": [
         640,
         540
        ],
        "collision": null
       },
       "attack": {
        "frames": [
         "frames/spark_fairy_negative/attack_01.png",
         "frames/spark_fairy_negative/attack_02.png",
         "frames/spark_fairy_negative/attack_03.png"
        ],
        "fps": 10,
        "loop": false,
        "anchor": [
         640,
         540
        ],
        "collision": null
       },
       "vanish": {
        "frames": [
         "frames/spark_fairy_negative/vanish_01.png",
         "frames/spark_fairy_negative/vanish_02.png",
         "frames/spark_fairy_negative/vanish_03.png"
        ],
        "fps": 10,
        "loop": false,
        "anchor": [
         640,
         540
        ],
        "collision": null
       }
      },
      "uniform_scale_from_v1": 1.375,
      "body_center": [
       640,
       540
      ]
     },
     "silent_statue": {
      "target_height_px": 760,
      "animations": {
       "silent": {
        "frames": [
         "frames/silent_statue/silent_01.png"
        ],
        "fps": 3,
        "loop": true,
        "anchor": [
         640,
         800
        ],
        "collision": [
         430,
         40,
         420,
         760
        ]
       },
       "speaker_on": {
        "frames": [
         "frames/silent_statue/speaker_on_01.png"
        ],
        "fps": 3,
        "loop": true,
        "anchor": [
         640,
         800
        ],
        "collision": [
         430,
         40,
         420,
         760
        ]
       },
       "talk": {
        "frames": [
         "frames/silent_statue/talk_01.png",
         "frames/silent_statue/talk_02.png"
        ],
        "fps": 3,
        "loop": true,
        "anchor": [
         640,
         800
        ],
        "collision": [
         430,
         40,
         420,
         760
        ]
       }
      },
      "body_reference": "speaker_on_01.png"
     }
    },
    "note": "이안 위치만 보정, 석상 몸통을 speaker_on_01 기준으로 통일, 요정 전체에 동일 1.375배 적용. 초상화 2장은 v1과 동일.",
    "portraits": {
     "silent": "portraits/statue_silent.png",
     "talk": "portraits/statue_talk.png",
     "size": [
      540,
      540
     ]
    },
    "version": "1A_v2",
    "ian_vertical_shift_px": {
     "charge_rub_01.png": 35,
     "charge_rub_02.png": 35,
     "charge_rub_03.png": 35,
     "magnet_pull_01.png": 16,
     "magnet_pull_02.png": 13,
     "magnet_pull_03.png": 14,
     "box_charge_release_01.png": 26,
     "box_charge_release_02.png": 19,
     "box_charge_release_03.png": 13,
     "box_charge_release_04.png": 40
    }
   },
   "1b": {
    "canvas": [
     1280,
     1024
    ],
    "foot_baseline_y": 800,
    "format": "RGBA PNG",
    "characters": {
     "iron_knight": {
      "target_height_px": 700,
      "pivot": [
       640,
       800
      ],
      "facing": "left",
      "actions": {
       "idle": {
        "frames": [
         {
          "file": "iron_knight_idle_01.png",
          "visible_bbox": [
           386,
           29,
           821,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "iron_knight_idle_02.png",
          "visible_bbox": [
           385,
           29,
           828,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 2,
        "loop": true
       },
       "walk": {
        "frames": [
         {
          "file": "iron_knight_walk_01.png",
          "visible_bbox": [
           366,
           19,
           868,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "iron_knight_walk_02.png",
          "visible_bbox": [
           337,
           6,
           790,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "iron_knight_walk_03.png",
          "visible_bbox": [
           356,
           18,
           857,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "iron_knight_walk_04.png",
          "visible_bbox": [
           373,
           16,
           802,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 8,
        "loop": true
       },
       "attack": {
        "frames": [
         {
          "file": "iron_knight_attack_01.png",
          "visible_bbox": [
           204,
           181,
           928,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "iron_knight_attack_02.png",
          "visible_bbox": [
           18,
           207,
           1020,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 650
         },
         {
          "file": "iron_knight_attack_03.png",
          "visible_bbox": [
           212,
           180,
           909,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 10,
        "loop": false
       },
       "hurt": {
        "frames": [
         {
          "file": "iron_knight_hurt_01.png",
          "visible_bbox": [
           282,
           82,
           840,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 5,
        "loop": false
       },
       "defeat": {
        "frames": [
         {
          "file": "iron_knight_defeat_01.png",
          "visible_bbox": [
           290,
           105,
           910,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "iron_knight_defeat_02.png",
          "visible_bbox": [
           421,
           377,
           893,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "iron_knight_defeat_03.png",
          "visible_bbox": [
           258,
           521,
           954,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 6,
        "loop": false
       },
       "magnet_dragged": {
        "frames": [
         {
          "file": "iron_knight_magnet_dragged_01.png",
          "visible_bbox": [
           268,
           37,
           1033,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "iron_knight_magnet_dragged_02.png",
          "visible_bbox": [
           340,
           39,
           972,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 5,
        "loop": false
       },
       "disarmed": {
        "frames": [
         {
          "file": "iron_knight_disarmed_01.png",
          "visible_bbox": [
           373,
           164,
           874,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "iron_knight_disarmed_02.png",
          "visible_bbox": [
           353,
           139,
           854,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 5,
        "loop": false
       }
      }
     },
     "copper_soldier": {
      "target_height_px": 700,
      "pivot": [
       640,
       800
      ],
      "facing": "left",
      "actions": {
       "idle": {
        "frames": [
         {
          "file": "copper_soldier_idle_01.png",
          "visible_bbox": [
           386,
           29,
           821,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "copper_soldier_idle_02.png",
          "visible_bbox": [
           385,
           29,
           828,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 2,
        "loop": true
       },
       "walk": {
        "frames": [
         {
          "file": "copper_soldier_walk_01.png",
          "visible_bbox": [
           366,
           19,
           868,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "copper_soldier_walk_02.png",
          "visible_bbox": [
           337,
           6,
           790,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "copper_soldier_walk_03.png",
          "visible_bbox": [
           356,
           18,
           857,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "copper_soldier_walk_04.png",
          "visible_bbox": [
           373,
           16,
           802,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 8,
        "loop": true
       },
       "attack": {
        "frames": [
         {
          "file": "copper_soldier_attack_01.png",
          "visible_bbox": [
           204,
           181,
           928,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "copper_soldier_attack_02.png",
          "visible_bbox": [
           18,
           207,
           1020,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 650
         },
         {
          "file": "copper_soldier_attack_03.png",
          "visible_bbox": [
           212,
           180,
           909,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 10,
        "loop": false
       },
       "hurt": {
        "frames": [
         {
          "file": "copper_soldier_hurt_01.png",
          "visible_bbox": [
           282,
           82,
           840,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 5,
        "loop": false
       },
       "defeat": {
        "frames": [
         {
          "file": "copper_soldier_defeat_01.png",
          "visible_bbox": [
           290,
           105,
           910,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "copper_soldier_defeat_02.png",
          "visible_bbox": [
           421,
           377,
           893,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "copper_soldier_defeat_03.png",
          "visible_bbox": [
           258,
           521,
           954,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 6,
        "loop": false
       },
       "magnet_resist": {
        "frames": [
         {
          "file": "copper_soldier_magnet_resist_01.png",
          "visible_bbox": [
           406,
           90,
           829,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 5,
        "loop": false
       }
      }
     },
     "magnet_golem": {
      "requested_target_height_px": 880,
      "rendered_idle_height_px": 776,
      "pivot": [
       640,
       800
      ],
      "facing": "left",
      "actions": {
       "idle": {
        "frames": [
         {
          "file": "magnet_golem_idle_01.png",
          "visible_bbox": [
           197,
           25,
           1010,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "magnet_golem_idle_02.png",
          "visible_bbox": [
           215,
           34,
           1006,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 2,
        "loop": true
       },
       "walk": {
        "frames": [
         {
          "file": "magnet_golem_walk_01.png",
          "visible_bbox": [
           265,
           30,
           959,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "magnet_golem_walk_02.png",
          "visible_bbox": [
           299,
           37,
           979,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "magnet_golem_walk_03.png",
          "visible_bbox": [
           288,
           30,
           959,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "magnet_golem_walk_04.png",
          "visible_bbox": [
           308,
           30,
           954,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 7,
        "loop": true
       },
       "attack": {
        "frames": [
         {
          "file": "magnet_golem_attack_01.png",
          "visible_bbox": [
           247,
           46,
           980,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "magnet_golem_attack_02.png",
          "visible_bbox": [
           182,
           167,
           1017,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "magnet_golem_attack_03.png",
          "visible_bbox": [
           266,
           145,
           987,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 9,
        "loop": false
       },
       "magnet_pull": {
        "frames": [
         {
          "file": "magnet_golem_magnet_pull_01.png",
          "visible_bbox": [
           59,
           51,
           1045,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "magnet_golem_magnet_pull_02.png",
          "visible_bbox": [
           47,
           72,
           1023,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "magnet_golem_magnet_pull_03.png",
          "visible_bbox": [
           272,
           52,
           972,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 7,
        "loop": false
       },
       "hurt": {
        "frames": [
         {
          "file": "magnet_golem_hurt_01.png",
          "visible_bbox": [
           267,
           66,
           1009,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "magnet_golem_hurt_02.png",
          "visible_bbox": [
           358,
           59,
           962,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 5,
        "loop": false
       },
       "slowing": {
        "frames": [
         {
          "file": "magnet_golem_slowing_01.png",
          "visible_bbox": [
           362,
           113,
           1047,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "magnet_golem_slowing_02.png",
          "visible_bbox": [
           400,
           163,
           992,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 5,
        "loop": false
       },
       "defeat": {
        "frames": [
         {
          "file": "magnet_golem_defeat_01.png",
          "visible_bbox": [
           257,
           47,
           994,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "magnet_golem_defeat_02.png",
          "visible_bbox": [
           319,
           135,
           1085,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         },
         {
          "file": "magnet_golem_defeat_03.png",
          "visible_bbox": [
           360,
           263,
           1106,
           801
          ],
          "foot_y": 800,
          "torso_anchor_x": 640
         }
        ],
        "fps": 5,
        "loop": false
       }
      }
     }
    },
    "notes": [
     "Copper soldier frames are the exact pose and silhouette of the iron knight, with steel armor recolored to copper.",
     "Animation speed controls the magnet golem slowing action; the walk sheet is one step.",
     "Foot baseline is for ground poses. The farthest opaque ground pixel is y=800.",
     "An 880px-tall visible sprite cannot fit entirely in a 1024px canvas with feet at y=800; the golem is rendered at 776px idle height without clipping.",
     "v2 changes positions only, except attack_02 uses the complete original spear-thrust source pose to avoid left-edge clipping.",
     "v3 patch changes only four attack PNG frames and their JSON visible_bbox values; apply over 1b_v2."
    ],
    "version": "1b_v3_attack_patch",
    "alignment": "torso center x=640; feet y=800",
    "patch_files": [
     "iron_knight_attack_01.png",
     "iron_knight_attack_02.png",
     "copper_soldier_attack_01.png",
     "copper_soldier_attack_02.png"
    ]
   }
  },
  "characters": {
   "ian": {
    "target_height_px": 640,
    "animations": {
     "charge_rub": {
      "frames": [
       "frames/ian/charge_rub_01.png",
       "frames/ian/charge_rub_02.png",
       "frames/ian/charge_rub_03.png"
      ],
      "fps": 10,
      "loop": false,
      "anchor": [
       640,
       800
      ],
      "collision": [
       520,
       175,
       240,
       625
      ]
     },
     "magnet_pull": {
      "frames": [
       "frames/ian/magnet_pull_01.png",
       "frames/ian/magnet_pull_02.png",
       "frames/ian/magnet_pull_03.png"
      ],
      "fps": 10,
      "loop": false,
      "anchor": [
       640,
       800
      ],
      "collision": [
       520,
       175,
       240,
       625
      ]
     },
     "box_charge_release": {
      "frames": [
       "frames/ian/box_charge_release_01.png",
       "frames/ian/box_charge_release_02.png",
       "frames/ian/box_charge_release_03.png",
       "frames/ian/box_charge_release_04.png"
      ],
      "fps": 12,
      "loop": false,
      "anchor": [
       640,
       800
      ],
      "collision": [
       520,
       175,
       240,
       625
      ]
     }
    }
   },
   "spark_fairy_positive": {
    "target_height_px": 220,
    "animations": {
     "float": {
      "frames": [
       "frames/spark_fairy_positive/float_01.png",
       "frames/spark_fairy_positive/float_02.png",
       "frames/spark_fairy_positive/float_03.png"
      ],
      "fps": 5,
      "loop": true,
      "anchor": [
       640,
       540
      ],
      "collision": null
     },
     "pushed": {
      "frames": [
       "frames/spark_fairy_positive/pushed_01.png",
       "frames/spark_fairy_positive/pushed_02.png"
      ],
      "fps": 8,
      "loop": false,
      "anchor": [
       640,
       540
      ],
      "collision": null
     },
     "pulled": {
      "frames": [
       "frames/spark_fairy_positive/pulled_01.png",
       "frames/spark_fairy_positive/pulled_02.png"
      ],
      "fps": 8,
      "loop": false,
      "anchor": [
       640,
       540
      ],
      "collision": null
     },
     "attack": {
      "frames": [
       "frames/spark_fairy_positive/attack_01.png",
       "frames/spark_fairy_positive/attack_02.png",
       "frames/spark_fairy_positive/attack_03.png"
      ],
      "fps": 10,
      "loop": false,
      "anchor": [
       640,
       540
      ],
      "collision": null
     },
     "vanish": {
      "frames": [
       "frames/spark_fairy_positive/vanish_01.png",
       "frames/spark_fairy_positive/vanish_02.png",
       "frames/spark_fairy_positive/vanish_03.png"
      ],
      "fps": 10,
      "loop": false,
      "anchor": [
       640,
       540
      ],
      "collision": null
     }
    },
    "uniform_scale_from_v1": 1.375,
    "body_center": [
     640,
     540
    ]
   },
   "spark_fairy_negative": {
    "target_height_px": 220,
    "animations": {
     "float": {
      "frames": [
       "frames/spark_fairy_negative/float_01.png",
       "frames/spark_fairy_negative/float_02.png",
       "frames/spark_fairy_negative/float_03.png"
      ],
      "fps": 5,
      "loop": true,
      "anchor": [
       640,
       540
      ],
      "collision": null
     },
     "pushed": {
      "frames": [
       "frames/spark_fairy_negative/pushed_01.png",
       "frames/spark_fairy_negative/pushed_02.png"
      ],
      "fps": 8,
      "loop": false,
      "anchor": [
       640,
       540
      ],
      "collision": null
     },
     "pulled": {
      "frames": [
       "frames/spark_fairy_negative/pulled_01.png",
       "frames/spark_fairy_negative/pulled_02.png"
      ],
      "fps": 8,
      "loop": false,
      "anchor": [
       640,
       540
      ],
      "collision": null
     },
     "attack": {
      "frames": [
       "frames/spark_fairy_negative/attack_01.png",
       "frames/spark_fairy_negative/attack_02.png",
       "frames/spark_fairy_negative/attack_03.png"
      ],
      "fps": 10,
      "loop": false,
      "anchor": [
       640,
       540
      ],
      "collision": null
     },
     "vanish": {
      "frames": [
       "frames/spark_fairy_negative/vanish_01.png",
       "frames/spark_fairy_negative/vanish_02.png",
       "frames/spark_fairy_negative/vanish_03.png"
      ],
      "fps": 10,
      "loop": false,
      "anchor": [
       640,
       540
      ],
      "collision": null
     }
    },
    "uniform_scale_from_v1": 1.375,
    "body_center": [
     640,
     540
    ]
   },
   "silent_statue": {
    "target_height_px": 760,
    "animations": {
     "silent": {
      "frames": [
       "frames/silent_statue/silent_01.png"
      ],
      "fps": 3,
      "loop": true,
      "anchor": [
       640,
       800
      ],
      "collision": [
       430,
       40,
       420,
       760
      ]
     },
     "speaker_on": {
      "frames": [
       "frames/silent_statue/speaker_on_01.png"
      ],
      "fps": 3,
      "loop": true,
      "anchor": [
       640,
       800
      ],
      "collision": [
       430,
       40,
       420,
       760
      ]
     },
     "talk": {
      "frames": [
       "frames/silent_statue/talk_01.png",
       "frames/silent_statue/talk_02.png"
      ],
      "fps": 3,
      "loop": true,
      "anchor": [
       640,
       800
      ],
      "collision": [
       430,
       40,
       420,
       760
      ]
     }
    },
    "body_reference": "speaker_on_01.png"
   },
   "iron_knight": {
    "target_height_px": 700,
    "pivot": [
     640,
     800
    ],
    "facing": "left",
    "actions": {
     "idle": {
      "frames": [
       {
        "file": "iron_knight_idle_01.png",
        "visible_bbox": [
         386,
         29,
         821,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "iron_knight_idle_02.png",
        "visible_bbox": [
         385,
         29,
         828,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 2,
      "loop": true
     },
     "walk": {
      "frames": [
       {
        "file": "iron_knight_walk_01.png",
        "visible_bbox": [
         366,
         19,
         868,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "iron_knight_walk_02.png",
        "visible_bbox": [
         337,
         6,
         790,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "iron_knight_walk_03.png",
        "visible_bbox": [
         356,
         18,
         857,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "iron_knight_walk_04.png",
        "visible_bbox": [
         373,
         16,
         802,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 8,
      "loop": true
     },
     "attack": {
      "frames": [
       {
        "file": "iron_knight_attack_01.png",
        "visible_bbox": [
         204,
         181,
         928,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "iron_knight_attack_02.png",
        "visible_bbox": [
         18,
         207,
         1020,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 650
       },
       {
        "file": "iron_knight_attack_03.png",
        "visible_bbox": [
         212,
         180,
         909,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 10,
      "loop": false
     },
     "hurt": {
      "frames": [
       {
        "file": "iron_knight_hurt_01.png",
        "visible_bbox": [
         282,
         82,
         840,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 5,
      "loop": false
     },
     "defeat": {
      "frames": [
       {
        "file": "iron_knight_defeat_01.png",
        "visible_bbox": [
         290,
         105,
         910,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "iron_knight_defeat_02.png",
        "visible_bbox": [
         421,
         377,
         893,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "iron_knight_defeat_03.png",
        "visible_bbox": [
         258,
         521,
         954,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 6,
      "loop": false
     },
     "magnet_dragged": {
      "frames": [
       {
        "file": "iron_knight_magnet_dragged_01.png",
        "visible_bbox": [
         268,
         37,
         1033,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "iron_knight_magnet_dragged_02.png",
        "visible_bbox": [
         340,
         39,
         972,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 5,
      "loop": false
     },
     "disarmed": {
      "frames": [
       {
        "file": "iron_knight_disarmed_01.png",
        "visible_bbox": [
         373,
         164,
         874,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "iron_knight_disarmed_02.png",
        "visible_bbox": [
         353,
         139,
         854,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 5,
      "loop": false
     }
    }
   },
   "copper_soldier": {
    "target_height_px": 700,
    "pivot": [
     640,
     800
    ],
    "facing": "left",
    "actions": {
     "idle": {
      "frames": [
       {
        "file": "copper_soldier_idle_01.png",
        "visible_bbox": [
         386,
         29,
         821,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "copper_soldier_idle_02.png",
        "visible_bbox": [
         385,
         29,
         828,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 2,
      "loop": true
     },
     "walk": {
      "frames": [
       {
        "file": "copper_soldier_walk_01.png",
        "visible_bbox": [
         366,
         19,
         868,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "copper_soldier_walk_02.png",
        "visible_bbox": [
         337,
         6,
         790,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "copper_soldier_walk_03.png",
        "visible_bbox": [
         356,
         18,
         857,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "copper_soldier_walk_04.png",
        "visible_bbox": [
         373,
         16,
         802,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 8,
      "loop": true
     },
     "attack": {
      "frames": [
       {
        "file": "copper_soldier_attack_01.png",
        "visible_bbox": [
         204,
         181,
         928,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "copper_soldier_attack_02.png",
        "visible_bbox": [
         18,
         207,
         1020,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 650
       },
       {
        "file": "copper_soldier_attack_03.png",
        "visible_bbox": [
         212,
         180,
         909,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 10,
      "loop": false
     },
     "hurt": {
      "frames": [
       {
        "file": "copper_soldier_hurt_01.png",
        "visible_bbox": [
         282,
         82,
         840,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 5,
      "loop": false
     },
     "defeat": {
      "frames": [
       {
        "file": "copper_soldier_defeat_01.png",
        "visible_bbox": [
         290,
         105,
         910,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "copper_soldier_defeat_02.png",
        "visible_bbox": [
         421,
         377,
         893,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "copper_soldier_defeat_03.png",
        "visible_bbox": [
         258,
         521,
         954,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 6,
      "loop": false
     },
     "magnet_resist": {
      "frames": [
       {
        "file": "copper_soldier_magnet_resist_01.png",
        "visible_bbox": [
         406,
         90,
         829,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 5,
      "loop": false
     }
    }
   },
   "magnet_golem": {
    "requested_target_height_px": 880,
    "rendered_idle_height_px": 776,
    "pivot": [
     640,
     800
    ],
    "facing": "left",
    "actions": {
     "idle": {
      "frames": [
       {
        "file": "magnet_golem_idle_01.png",
        "visible_bbox": [
         197,
         25,
         1010,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "magnet_golem_idle_02.png",
        "visible_bbox": [
         215,
         34,
         1006,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 2,
      "loop": true
     },
     "walk": {
      "frames": [
       {
        "file": "magnet_golem_walk_01.png",
        "visible_bbox": [
         265,
         30,
         959,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "magnet_golem_walk_02.png",
        "visible_bbox": [
         299,
         37,
         979,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "magnet_golem_walk_03.png",
        "visible_bbox": [
         288,
         30,
         959,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "magnet_golem_walk_04.png",
        "visible_bbox": [
         308,
         30,
         954,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 7,
      "loop": true
     },
     "attack": {
      "frames": [
       {
        "file": "magnet_golem_attack_01.png",
        "visible_bbox": [
         247,
         46,
         980,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "magnet_golem_attack_02.png",
        "visible_bbox": [
         182,
         167,
         1017,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "magnet_golem_attack_03.png",
        "visible_bbox": [
         266,
         145,
         987,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 9,
      "loop": false
     },
     "magnet_pull": {
      "frames": [
       {
        "file": "magnet_golem_magnet_pull_01.png",
        "visible_bbox": [
         59,
         51,
         1045,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "magnet_golem_magnet_pull_02.png",
        "visible_bbox": [
         47,
         72,
         1023,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "magnet_golem_magnet_pull_03.png",
        "visible_bbox": [
         272,
         52,
         972,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 7,
      "loop": false
     },
     "hurt": {
      "frames": [
       {
        "file": "magnet_golem_hurt_01.png",
        "visible_bbox": [
         267,
         66,
         1009,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "magnet_golem_hurt_02.png",
        "visible_bbox": [
         358,
         59,
         962,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 5,
      "loop": false
     },
     "slowing": {
      "frames": [
       {
        "file": "magnet_golem_slowing_01.png",
        "visible_bbox": [
         362,
         113,
         1047,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "magnet_golem_slowing_02.png",
        "visible_bbox": [
         400,
         163,
         992,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 5,
      "loop": false
     },
     "defeat": {
      "frames": [
       {
        "file": "magnet_golem_defeat_01.png",
        "visible_bbox": [
         257,
         47,
         994,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "magnet_golem_defeat_02.png",
        "visible_bbox": [
         319,
         135,
         1085,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       },
       {
        "file": "magnet_golem_defeat_03.png",
        "visible_bbox": [
         360,
         263,
         1106,
         801
        ],
        "foot_y": 800,
        "torso_anchor_x": 640
       }
      ],
      "fps": 5,
      "loop": false
     }
    }
   }
  },
  "portraits": {
   "silent": "portraits/statue_silent.png",
   "talk": "portraits/statue_talk.png",
   "size": [
    540,
    540
   ]
  },
  "png_files": [
   "copper_soldier_attack_01.png",
   "copper_soldier_attack_02.png",
   "copper_soldier_attack_03.png",
   "copper_soldier_defeat_01.png",
   "copper_soldier_defeat_02.png",
   "copper_soldier_defeat_03.png",
   "copper_soldier_hurt_01.png",
   "copper_soldier_idle_01.png",
   "copper_soldier_idle_02.png",
   "copper_soldier_magnet_resist_01.png",
   "copper_soldier_walk_01.png",
   "copper_soldier_walk_02.png",
   "copper_soldier_walk_03.png",
   "copper_soldier_walk_04.png",
   "frames/ian/box_charge_release_01.png",
   "frames/ian/box_charge_release_02.png",
   "frames/ian/box_charge_release_03.png",
   "frames/ian/box_charge_release_04.png",
   "frames/ian/charge_rub_01.png",
   "frames/ian/charge_rub_02.png",
   "frames/ian/charge_rub_03.png",
   "frames/ian/magnet_pull_01.png",
   "frames/ian/magnet_pull_02.png",
   "frames/ian/magnet_pull_03.png",
   "frames/silent_statue/silent_01.png",
   "frames/silent_statue/speaker_on_01.png",
   "frames/silent_statue/talk_01.png",
   "frames/silent_statue/talk_02.png",
   "frames/spark_fairy_negative/attack_01.png",
   "frames/spark_fairy_negative/attack_02.png",
   "frames/spark_fairy_negative/attack_03.png",
   "frames/spark_fairy_negative/float_01.png",
   "frames/spark_fairy_negative/float_02.png",
   "frames/spark_fairy_negative/float_03.png",
   "frames/spark_fairy_negative/pulled_01.png",
   "frames/spark_fairy_negative/pulled_02.png",
   "frames/spark_fairy_negative/pushed_01.png",
   "frames/spark_fairy_negative/pushed_02.png",
   "frames/spark_fairy_negative/vanish_01.png",
   "frames/spark_fairy_negative/vanish_02.png",
   "frames/spark_fairy_negative/vanish_03.png",
   "frames/spark_fairy_positive/attack_01.png",
   "frames/spark_fairy_positive/attack_02.png",
   "frames/spark_fairy_positive/attack_03.png",
   "frames/spark_fairy_positive/float_01.png",
   "frames/spark_fairy_positive/float_02.png",
   "frames/spark_fairy_positive/float_03.png",
   "frames/spark_fairy_positive/pulled_01.png",
   "frames/spark_fairy_positive/pulled_02.png",
   "frames/spark_fairy_positive/pushed_01.png",
   "frames/spark_fairy_positive/pushed_02.png",
   "frames/spark_fairy_positive/vanish_01.png",
   "frames/spark_fairy_positive/vanish_02.png",
   "frames/spark_fairy_positive/vanish_03.png",
   "iron_knight_attack_01.png",
   "iron_knight_attack_02.png",
   "iron_knight_attack_03.png",
   "iron_knight_defeat_01.png",
   "iron_knight_defeat_02.png",
   "iron_knight_defeat_03.png",
   "iron_knight_disarmed_01.png",
   "iron_knight_disarmed_02.png",
   "iron_knight_hurt_01.png",
   "iron_knight_idle_01.png",
   "iron_knight_idle_02.png",
   "iron_knight_magnet_dragged_01.png",
   "iron_knight_magnet_dragged_02.png",
   "iron_knight_walk_01.png",
   "iron_knight_walk_02.png",
   "iron_knight_walk_03.png",
   "iron_knight_walk_04.png",
   "magnet_golem_attack_01.png",
   "magnet_golem_attack_02.png",
   "magnet_golem_attack_03.png",
   "magnet_golem_defeat_01.png",
   "magnet_golem_defeat_02.png",
   "magnet_golem_defeat_03.png",
   "magnet_golem_hurt_01.png",
   "magnet_golem_hurt_02.png",
   "magnet_golem_idle_01.png",
   "magnet_golem_idle_02.png",
   "magnet_golem_magnet_pull_01.png",
   "magnet_golem_magnet_pull_02.png",
   "magnet_golem_magnet_pull_03.png",
   "magnet_golem_slowing_01.png",
   "magnet_golem_slowing_02.png",
   "magnet_golem_walk_01.png",
   "magnet_golem_walk_02.png",
   "magnet_golem_walk_03.png",
   "magnet_golem_walk_04.png",
   "portraits/statue_silent.png",
   "portraits/statue_talk.png"
  ]
 },
 "act3_characters": {
  "1a": {
   "version": "1a_v3_patch",
   "canvas": [
    1280,
    1024
   ],
   "pivot": [
    640,
    800
   ],
   "frames": {
    "ian_hold_front_01": {
     "file": "ian_hold_front_01.png",
     "visible_bbox": [
      388,
      100,
      810,
      800
     ],
     "hand_point": [
      780,
      429
     ],
     "source": "act3_characters_1a_v1 body + v2 eye hand (where applicable) + one continuous generated staff",
     "source_scale": 0.637,
     "patch": "one continuous backpack staff; tilted with torso in reach_down"
    },
    "ian_hold_front_02": {
     "file": "ian_hold_front_02.png",
     "visible_bbox": [
      388,
      100,
      812,
      800
     ],
     "hand_point": [
      782,
      427
     ],
     "source": "act3_characters_1a_v1 body + v2 eye hand (where applicable) + one continuous generated staff",
     "source_scale": 0.637,
     "patch": "one continuous backpack staff; tilted with torso in reach_down"
    },
    "ian_hold_eye_01": {
     "file": "ian_hold_eye_01.png",
     "visible_bbox": [
      410,
      100,
      777,
      800
     ],
     "hand_point": [
      713,
      278
     ],
     "source": "act3_characters_1a_v1 body + v2 eye hand (where applicable) + one continuous generated staff",
     "source_scale": 0.696,
     "patch": "one continuous backpack staff; tilted with torso in reach_down"
    },
    "ian_hold_eye_02": {
     "file": "ian_hold_eye_02.png",
     "visible_bbox": [
      410,
      100,
      784,
      800
     ],
     "hand_point": [
      713,
      278
     ],
     "source": "act3_characters_1a_v1 body + v2 eye hand (where applicable) + one continuous generated staff",
     "source_scale": 0.696,
     "patch": "one continuous backpack staff; tilted with torso in reach_down"
    },
    "ian_reach_down_01": {
     "file": "ian_reach_down_01.png",
     "visible_bbox": [
      342,
      265,
      866,
      800
     ],
     "hand_point": [
      814,
      710
     ],
     "source": "act3_characters_1a_v1 body + v2 eye hand (where applicable) + one continuous generated staff",
     "source_scale": 0.52,
     "patch": "one continuous backpack staff; tilted with torso in reach_down"
    },
    "ian_reach_down_02": {
     "file": "ian_reach_down_02.png",
     "visible_bbox": [
      337,
      283,
      897,
      800
     ],
     "hand_point": [
      840,
      718
     ],
     "source": "act3_characters_1a_v1 body + v2 eye hand (where applicable) + one continuous generated staff",
     "source_scale": 0.52,
     "patch": "one continuous backpack staff; tilted with torso in reach_down"
    },
    "ian_reach_down_03": {
     "file": "ian_reach_down_03.png",
     "visible_bbox": [
      339,
      275,
      864,
      898
     ],
     "hand_point": [
      812,
      882
     ],
     "source": "act3_characters_1a_v1 body + v2 eye hand (where applicable) + one continuous generated staff",
     "source_scale": 0.52,
     "patch": "one continuous backpack staff; tilted with torso in reach_down"
    },
    "garon_reach_down_01": {
     "file": "garon_reach_down_01.png",
     "visible_bbox": [
      378,
      313,
      956,
      800
     ],
     "hand_point": [
      935,
      712
     ],
     "source": "1a existing Garon body + generated v3-matched single round shield",
     "source_scale": 0.56,
     "patch": "round wooden shield behind back; body and hand unchanged"
    },
    "garon_reach_down_02": {
     "file": "garon_reach_down_02.png",
     "visible_bbox": [
      360,
      341,
      1001,
      800
     ],
     "hand_point": [
      977,
      717
     ],
     "source": "1a existing Garon body + generated v3-matched single round shield",
     "source_scale": 0.56,
     "patch": "round wooden shield behind back; body and hand unchanged"
    },
    "garon_reach_down_03": {
     "file": "garon_reach_down_03.png",
     "visible_bbox": [
      358,
      328,
      975,
      861
     ],
     "hand_point": [
      952,
      840
     ],
     "source": "1a existing Garon body + generated v3-matched single round shield",
     "source_scale": 0.56,
     "patch": "round wooden shield behind back; body and hand unchanged"
    },
    "garon_carry_torch_01": {
     "file": "garon_carry_torch_01.png",
     "visible_bbox": [
      324,
      60,
      989,
      800
     ],
     "hand_point": [
      927,
      220
     ],
     "source": "1a existing Garon body + generated v3-matched single round shield",
     "source_scale": 0.71,
     "patch": "round wooden shield behind back; body and hand unchanged"
    },
    "garon_carry_torch_02": {
     "file": "garon_carry_torch_02.png",
     "visible_bbox": [
      304,
      60,
      941,
      800
     ],
     "hand_point": [
      876,
      248
     ],
     "source": "1a existing Garon body + generated v3-matched single round shield",
     "source_scale": 0.71,
     "patch": "round wooden shield behind back; body and hand unchanged"
    }
   },
   "animations": {
    "ian_hold_front": {
     "frames": [
      "ian_hold_front_01.png",
      "ian_hold_front_02.png"
     ],
     "fps": 3,
     "loop": true
    },
    "ian_hold_eye": {
     "frames": [
      "ian_hold_eye_01.png",
      "ian_hold_eye_02.png"
     ],
     "fps": 3,
     "loop": true
    },
    "ian_reach_down": {
     "frames": [
      "ian_reach_down_01.png",
      "ian_reach_down_02.png",
      "ian_reach_down_03.png"
     ],
     "fps": 6,
     "loop": false
    },
    "garon_reach_down": {
     "frames": [
      "garon_reach_down_01.png",
      "garon_reach_down_02.png",
      "garon_reach_down_03.png"
     ],
     "fps": 6,
     "loop": false
    },
    "garon_carry_torch": {
     "frames": [
      "garon_carry_torch_01.png",
      "garon_carry_torch_02.png"
     ],
     "fps": 3,
     "loop": true
    }
   },
   "effects": {
    "garon_torch_flame": {
     "file": "garon_torch_flame.png",
     "size": [
      80,
      105
     ],
     "pivot": [
      40,
      104
     ],
     "attachment": {
      "garon_carry_torch_01": [
       927,
       130
      ],
      "garon_carry_torch_02": [
       876,
       130
      ]
     },
     "note": "Flame pivot [40,104] attaches to basket top center. Flame file unchanged from 1a v1."
    }
   },
   "notes": [
    "Patch contains only the 12 revised frame PNGs, JSON and enlarged preview.",
    "Ian body, scale, position and hand_point are carried from v2. Garon body, hand_point and torch flame attachment are carried from v2.",
    "Each staff/shield is one uninterrupted source object placed behind the unchanged body."
   ]
  },
  "1b": {
   "canvas": [
    1280,
    1024
   ],
   "scale_px_per_m": 125,
   "characters": {
    "light_wraith": {
     "target_size_px": 700,
     "pivot": [
      632,
      512
     ],
     "scale_factor": 0.654206,
     "actions": {
      "float": {
       "frames": [
        {
         "file": "light_wraith_float_01.png",
         "visible_bbox": [
          429,
          308,
          1005,
          1008
         ],
         "medallion_point": [
          632,
          512
         ]
        },
        {
         "file": "light_wraith_float_02.png",
         "visible_bbox": [
          429,
          308,
          1005,
          1008
         ],
         "medallion_point": [
          632,
          512
         ]
        },
        {
         "file": "light_wraith_float_03.png",
         "visible_bbox": [
          429,
          308,
          1005,
          1008
         ],
         "medallion_point": [
          632,
          512
         ]
        }
       ],
       "fps": 3,
       "loop": true
      },
      "attack": {
       "frames": [
        {
         "file": "light_wraith_attack_01.png",
         "visible_bbox": [
          477,
          325,
          984,
          953
         ],
         "beam_point": [
          492,
          500
         ],
         "medallion_point": [
          632,
          512
         ]
        },
        {
         "file": "light_wraith_attack_02.png",
         "visible_bbox": [
          264,
          306,
          1101,
          986
         ],
         "beam_point": [
          265,
          445
         ],
         "medallion_point": [
          632,
          512
         ]
        },
        {
         "file": "light_wraith_attack_03.png",
         "visible_bbox": [
          205,
          349,
          1073,
          875
         ],
         "beam_point": [
          266,
          419
         ],
         "medallion_point": [
          632,
          512
         ]
        }
       ],
       "fps": 8,
       "loop": false
      },
      "hurt": {
       "frames": [
        {
         "file": "light_wraith_hurt_01.png",
         "visible_bbox": [
          466,
          326,
          1105,
          993
         ],
         "medallion_point": [
          632,
          512
         ]
        }
       ],
       "fps": 1,
       "loop": false
      },
      "vanish": {
       "frames": [
        {
         "file": "light_wraith_vanish_01.png",
         "visible_bbox": [
          389,
          299,
          1217,
          1015
         ],
         "medallion_point": [
          632,
          512
         ]
        },
        {
         "file": "light_wraith_vanish_02.png",
         "visible_bbox": [
          389,
          299,
          1217,
          1011
         ],
         "medallion_point": [
          632,
          512
         ]
        },
        {
         "file": "light_wraith_vanish_03.png",
         "visible_bbox": [
          389,
          299,
          1217,
          982
         ],
         "medallion_point": [
          632,
          512
         ]
        }
       ],
       "fps": 7,
       "loop": false
      }
     },
     "collision_box": [
      490,
      235,
      300,
      610
     ],
     "target_height_px": 700,
     "torso_anchor": [
      632,
      512
     ],
     "notes": "Frames translated only. Round chest medallion aligned to (632,512); no artwork rescaling or repainting.",
     "normalization": "Match hood and torso to float_01, then apply 700/515 common display enlargement to v2 float reference. Vanish tails fade before canvas edge."
    },
    "crystal_fish": {
     "target_size_px": 300,
     "pivot": [
      640,
      540
     ],
     "scale_factor": 0.660793,
     "actions": {
      "swim": {
       "frames": [
        {
         "file": "crystal_fish_swim_01.png",
         "visible_bbox": [
          490,
          439,
          790,
          641
         ]
        },
        {
         "file": "crystal_fish_swim_02.png",
         "visible_bbox": [
          482,
          450,
          797,
          643
         ]
        },
        {
         "file": "crystal_fish_swim_03.png",
         "visible_bbox": [
          480,
          436,
          800,
          635
         ]
        }
       ],
       "fps": 5,
       "loop": true
      },
      "hurt": {
       "frames": [
        {
         "file": "crystal_fish_hurt_01.png",
         "visible_bbox": [
          488,
          431,
          793,
          649
         ]
        }
       ],
       "fps": 1,
       "loop": false
      },
      "defeat": {
       "frames": [
        {
         "file": "crystal_fish_defeat_01.png",
         "visible_bbox": [
          478,
          486,
          802,
          678
         ]
        },
        {
         "file": "crystal_fish_defeat_02.png",
         "visible_bbox": [
          488,
          540,
          791,
          693
         ]
        }
       ],
       "fps": 5,
       "loop": false
      }
     },
     "collision_box": [
      490,
      440,
      300,
      200
     ]
    },
    "shadow_bug": {
     "target_size_px": 120,
     "pivot": [
      640,
      800
     ],
     "scale_factor": 0.315928,
     "actions": {
      "crawl": {
       "frames": [
        {
         "file": "shadow_bug_crawl_01.png",
         "visible_bbox": [
          580,
          674,
          700,
          801
         ]
        },
        {
         "file": "shadow_bug_crawl_02.png",
         "visible_bbox": [
          584,
          686,
          695,
          801
         ]
        },
        {
         "file": "shadow_bug_crawl_03.png",
         "visible_bbox": [
          584,
          689,
          697,
          801
         ]
        }
       ],
       "fps": 8,
       "loop": true
      },
      "attack": {
       "frames": [
        {
         "file": "shadow_bug_attack_01.png",
         "visible_bbox": [
          589,
          672,
          691,
          801
         ]
        },
        {
         "file": "shadow_bug_attack_02.png",
         "visible_bbox": [
          588,
          669,
          693,
          801
         ]
        }
       ],
       "fps": 8,
       "loop": false
      },
      "defeat": {
       "frames": [
        {
         "file": "shadow_bug_defeat_01.png",
         "visible_bbox": [
          578,
          662,
          703,
          801
         ]
        },
        {
         "file": "shadow_bug_defeat_02.png",
         "visible_bbox": [
          576,
          663,
          705,
          801
         ]
        }
       ],
       "fps": 5,
       "loop": false
      }
     },
     "collision_box": [
      580,
      680,
      120,
      120
     ],
     "target_length_px": 120
    },
    "elemental_hydrogen": {
     "target_height_px": 400,
     "pivot": [
      640,
      540
     ],
     "scale_factor": 1.433692,
     "body_shared_with": "elemental_hydrogen",
     "emission_color_rgb": [
      241,
      99,
      132
     ],
     "collision_box": [
      490,
      380,
      300,
      320
     ],
     "glow": {
      "canvas": [
       800,
       800
      ],
      "pivot": [
       400,
       400
      ],
      "file": "elemental_hydrogen_glow.png",
      "scale_factor_from_v1": 1.3333333333333333
     },
     "actions": {
      "float": {
       "frames": [
        {
         "file": "elemental_hydrogen_float_01.png",
         "visible_bbox": [
          411,
          274,
          871,
          807
         ]
        },
        {
         "file": "elemental_hydrogen_float_02.png",
         "visible_bbox": [
          392,
          266,
          887,
          815
         ]
        },
        {
         "file": "elemental_hydrogen_float_03.png",
         "visible_bbox": [
          395,
          286,
          884,
          793
         ]
        }
       ],
       "fps": 3,
       "loop": true
      },
      "attack": {
       "frames": [
        {
         "file": "elemental_hydrogen_attack_01.png",
         "visible_bbox": [
          389,
          268,
          889,
          813
         ]
        },
        {
         "file": "elemental_hydrogen_attack_02.png",
         "visible_bbox": [
          394,
          292,
          885,
          789
         ]
        },
        {
         "file": "elemental_hydrogen_attack_03.png",
         "visible_bbox": [
          422,
          254,
          859,
          827
         ]
        }
       ],
       "fps": 8,
       "loop": false
      },
      "hurt": {
       "frames": [
        {
         "file": "elemental_hydrogen_hurt_01.png",
         "visible_bbox": [
          389,
          266,
          889,
          813
         ]
        }
       ],
       "fps": 7,
       "loop": false
      },
      "vanish": {
       "frames": [
        {
         "file": "elemental_hydrogen_vanish_01.png",
         "visible_bbox": [
          392,
          257,
          887,
          821
         ]
        },
        {
         "file": "elemental_hydrogen_vanish_02.png",
         "visible_bbox": [
          403,
          238,
          879,
          841
         ]
        },
        {
         "file": "elemental_hydrogen_vanish_03.png",
         "visible_bbox": [
          403,
          257,
          876,
          824
         ]
        }
       ],
       "fps": 7,
       "loop": false
      }
     },
     "visible_height_reference_px": 533
    },
    "elemental_sodium": {
     "target_height_px": 400,
     "pivot": [
      640,
      540
     ],
     "scale_factor": 1.433692,
     "body_shared_with": "elemental_hydrogen",
     "emission_color_rgb": [
      255,
      177,
      52
     ],
     "collision_box": [
      490,
      380,
      300,
      320
     ],
     "glow": {
      "canvas": [
       800,
       800
      ],
      "pivot": [
       400,
       400
      ],
      "file": "elemental_sodium_glow.png",
      "scale_factor_from_v1": 1.3333333333333333
     },
     "actions": {
      "float": {
       "frames": [
        {
         "file": "elemental_sodium_float_01.png",
         "visible_bbox": [
          411,
          274,
          871,
          807
         ]
        },
        {
         "file": "elemental_sodium_float_02.png",
         "visible_bbox": [
          392,
          266,
          887,
          815
         ]
        },
        {
         "file": "elemental_sodium_float_03.png",
         "visible_bbox": [
          395,
          286,
          884,
          793
         ]
        }
       ],
       "fps": 3,
       "loop": true
      },
      "attack": {
       "frames": [
        {
         "file": "elemental_sodium_attack_01.png",
         "visible_bbox": [
          389,
          268,
          889,
          813
         ]
        },
        {
         "file": "elemental_sodium_attack_02.png",
         "visible_bbox": [
          394,
          292,
          885,
          789
         ]
        },
        {
         "file": "elemental_sodium_attack_03.png",
         "visible_bbox": [
          422,
          254,
          859,
          827
         ]
        }
       ],
       "fps": 8,
       "loop": false
      },
      "hurt": {
       "frames": [
        {
         "file": "elemental_sodium_hurt_01.png",
         "visible_bbox": [
          389,
          266,
          889,
          813
         ]
        }
       ],
       "fps": 7,
       "loop": false
      },
      "vanish": {
       "frames": [
        {
         "file": "elemental_sodium_vanish_01.png",
         "visible_bbox": [
          392,
          257,
          887,
          821
         ]
        },
        {
         "file": "elemental_sodium_vanish_02.png",
         "visible_bbox": [
          403,
          238,
          879,
          841
         ]
        },
        {
         "file": "elemental_sodium_vanish_03.png",
         "visible_bbox": [
          403,
          257,
          876,
          824
         ]
        }
       ],
       "fps": 7,
       "loop": false
      }
     },
     "visible_height_reference_px": 533
    },
    "elemental_neon": {
     "target_height_px": 400,
     "pivot": [
      640,
      540
     ],
     "scale_factor": 1.433692,
     "body_shared_with": "elemental_hydrogen",
     "emission_color_rgb": [
      245,
      85,
      47
     ],
     "collision_box": [
      490,
      380,
      300,
      320
     ],
     "glow": {
      "canvas": [
       800,
       800
      ],
      "pivot": [
       400,
       400
      ],
      "file": "elemental_neon_glow.png",
      "scale_factor_from_v1": 1.3333333333333333
     },
     "actions": {
      "float": {
       "frames": [
        {
         "file": "elemental_neon_float_01.png",
         "visible_bbox": [
          411,
          274,
          871,
          807
         ]
        },
        {
         "file": "elemental_neon_float_02.png",
         "visible_bbox": [
          392,
          266,
          887,
          815
         ]
        },
        {
         "file": "elemental_neon_float_03.png",
         "visible_bbox": [
          395,
          286,
          884,
          793
         ]
        }
       ],
       "fps": 3,
       "loop": true
      },
      "attack": {
       "frames": [
        {
         "file": "elemental_neon_attack_01.png",
         "visible_bbox": [
          389,
          268,
          889,
          813
         ]
        },
        {
         "file": "elemental_neon_attack_02.png",
         "visible_bbox": [
          394,
          292,
          885,
          789
         ]
        },
        {
         "file": "elemental_neon_attack_03.png",
         "visible_bbox": [
          422,
          254,
          859,
          827
         ]
        }
       ],
       "fps": 8,
       "loop": false
      },
      "hurt": {
       "frames": [
        {
         "file": "elemental_neon_hurt_01.png",
         "visible_bbox": [
          389,
          266,
          889,
          813
         ]
        }
       ],
       "fps": 7,
       "loop": false
      },
      "vanish": {
       "frames": [
        {
         "file": "elemental_neon_vanish_01.png",
         "visible_bbox": [
          392,
          257,
          887,
          821
         ]
        },
        {
         "file": "elemental_neon_vanish_02.png",
         "visible_bbox": [
          403,
          238,
          879,
          841
         ]
        },
        {
         "file": "elemental_neon_vanish_03.png",
         "visible_bbox": [
          403,
          257,
          876,
          824
         ]
        }
       ],
       "fps": 7,
       "loop": false
      }
     },
     "visible_height_reference_px": 533
    },
    "elemental_mercury": {
     "target_height_px": 400,
     "pivot": [
      640,
      540
     ],
     "scale_factor": 1.433692,
     "body_shared_with": "elemental_hydrogen",
     "emission_color_rgb": [
      134,
      240,
      171
     ],
     "collision_box": [
      490,
      380,
      300,
      320
     ],
     "glow": {
      "canvas": [
       800,
       800
      ],
      "pivot": [
       400,
       400
      ],
      "file": "elemental_mercury_glow.png",
      "scale_factor_from_v1": 1.3333333333333333
     },
     "actions": {
      "float": {
       "frames": [
        {
         "file": "elemental_mercury_float_01.png",
         "visible_bbox": [
          411,
          274,
          871,
          807
         ]
        },
        {
         "file": "elemental_mercury_float_02.png",
         "visible_bbox": [
          392,
          266,
          887,
          815
         ]
        },
        {
         "file": "elemental_mercury_float_03.png",
         "visible_bbox": [
          395,
          286,
          884,
          793
         ]
        }
       ],
       "fps": 3,
       "loop": true
      },
      "attack": {
       "frames": [
        {
         "file": "elemental_mercury_attack_01.png",
         "visible_bbox": [
          389,
          268,
          889,
          813
         ]
        },
        {
         "file": "elemental_mercury_attack_02.png",
         "visible_bbox": [
          394,
          292,
          885,
          789
         ]
        },
        {
         "file": "elemental_mercury_attack_03.png",
         "visible_bbox": [
          422,
          254,
          859,
          827
         ]
        }
       ],
       "fps": 8,
       "loop": false
      },
      "hurt": {
       "frames": [
        {
         "file": "elemental_mercury_hurt_01.png",
         "visible_bbox": [
          389,
          266,
          889,
          813
         ]
        }
       ],
       "fps": 7,
       "loop": false
      },
      "vanish": {
       "frames": [
        {
         "file": "elemental_mercury_vanish_01.png",
         "visible_bbox": [
          392,
          257,
          887,
          821
         ]
        },
        {
         "file": "elemental_mercury_vanish_02.png",
         "visible_bbox": [
          403,
          238,
          879,
          841
         ]
        },
        {
         "file": "elemental_mercury_vanish_03.png",
         "visible_bbox": [
          403,
          257,
          876,
          824
         ]
        }
       ],
       "fps": 7,
       "loop": false
      }
     },
     "visible_height_reference_px": 533
    }
   },
   "notes": [
    "All source poses were generated as image sheets and separated into transparent frames.",
    "Elemental species use the same body pixels and poses; only emission color differs.",
    "Glow PNGs are independent 600x600 overlays aligned by center pivot."
   ]
  },
  "preview_index": {
   "crystal_fish_defeat_01.png": [
    24,
    24,
    178,
    142
   ],
   "crystal_fish_defeat_02.png": [
    194,
    24,
    348,
    142
   ],
   "crystal_fish_hurt_01.png": [
    364,
    24,
    518,
    142
   ],
   "crystal_fish_swim_01.png": [
    534,
    24,
    688,
    142
   ],
   "crystal_fish_swim_02.png": [
    704,
    24,
    858,
    142
   ],
   "crystal_fish_swim_03.png": [
    874,
    24,
    1028,
    142
   ],
   "elemental_hydrogen_attack_01.png": [
    1044,
    24,
    1198,
    142
   ],
   "elemental_hydrogen_attack_02.png": [
    1214,
    24,
    1368,
    142
   ],
   "elemental_hydrogen_attack_03.png": [
    24,
    174,
    178,
    292
   ],
   "elemental_hydrogen_float_01.png": [
    194,
    174,
    348,
    292
   ],
   "elemental_hydrogen_float_02.png": [
    364,
    174,
    518,
    292
   ],
   "elemental_hydrogen_float_03.png": [
    534,
    174,
    688,
    292
   ],
   "elemental_hydrogen_glow.png": [
    704,
    174,
    858,
    292
   ],
   "elemental_hydrogen_hurt_01.png": [
    874,
    174,
    1028,
    292
   ],
   "elemental_hydrogen_vanish_01.png": [
    1044,
    174,
    1198,
    292
   ],
   "elemental_hydrogen_vanish_02.png": [
    1214,
    174,
    1368,
    292
   ],
   "elemental_hydrogen_vanish_03.png": [
    24,
    324,
    178,
    442
   ],
   "elemental_mercury_attack_01.png": [
    194,
    324,
    348,
    442
   ],
   "elemental_mercury_attack_02.png": [
    364,
    324,
    518,
    442
   ],
   "elemental_mercury_attack_03.png": [
    534,
    324,
    688,
    442
   ],
   "elemental_mercury_float_01.png": [
    704,
    324,
    858,
    442
   ],
   "elemental_mercury_float_02.png": [
    874,
    324,
    1028,
    442
   ],
   "elemental_mercury_float_03.png": [
    1044,
    324,
    1198,
    442
   ],
   "elemental_mercury_glow.png": [
    1214,
    324,
    1368,
    442
   ],
   "elemental_mercury_hurt_01.png": [
    24,
    474,
    178,
    592
   ],
   "elemental_mercury_vanish_01.png": [
    194,
    474,
    348,
    592
   ],
   "elemental_mercury_vanish_02.png": [
    364,
    474,
    518,
    592
   ],
   "elemental_mercury_vanish_03.png": [
    534,
    474,
    688,
    592
   ],
   "elemental_neon_attack_01.png": [
    704,
    474,
    858,
    592
   ],
   "elemental_neon_attack_02.png": [
    874,
    474,
    1028,
    592
   ],
   "elemental_neon_attack_03.png": [
    1044,
    474,
    1198,
    592
   ],
   "elemental_neon_float_01.png": [
    1214,
    474,
    1368,
    592
   ],
   "elemental_neon_float_02.png": [
    24,
    624,
    178,
    742
   ],
   "elemental_neon_float_03.png": [
    194,
    624,
    348,
    742
   ],
   "elemental_neon_glow.png": [
    364,
    624,
    518,
    742
   ],
   "elemental_neon_hurt_01.png": [
    534,
    624,
    688,
    742
   ],
   "elemental_neon_vanish_01.png": [
    704,
    624,
    858,
    742
   ],
   "elemental_neon_vanish_02.png": [
    874,
    624,
    1028,
    742
   ],
   "elemental_neon_vanish_03.png": [
    1044,
    624,
    1198,
    742
   ],
   "elemental_sodium_attack_01.png": [
    1214,
    624,
    1368,
    742
   ],
   "elemental_sodium_attack_02.png": [
    24,
    774,
    178,
    892
   ],
   "elemental_sodium_attack_03.png": [
    194,
    774,
    348,
    892
   ],
   "elemental_sodium_float_01.png": [
    364,
    774,
    518,
    892
   ],
   "elemental_sodium_float_02.png": [
    534,
    774,
    688,
    892
   ],
   "elemental_sodium_float_03.png": [
    704,
    774,
    858,
    892
   ],
   "elemental_sodium_glow.png": [
    874,
    774,
    1028,
    892
   ],
   "elemental_sodium_hurt_01.png": [
    1044,
    774,
    1198,
    892
   ],
   "elemental_sodium_vanish_01.png": [
    1214,
    774,
    1368,
    892
   ],
   "elemental_sodium_vanish_02.png": [
    24,
    924,
    178,
    1042
   ],
   "elemental_sodium_vanish_03.png": [
    194,
    924,
    348,
    1042
   ],
   "garon_carry_torch_01.png": [
    364,
    924,
    518,
    1042
   ],
   "garon_carry_torch_02.png": [
    534,
    924,
    688,
    1042
   ],
   "garon_reach_down_01.png": [
    704,
    924,
    858,
    1042
   ],
   "garon_reach_down_02.png": [
    874,
    924,
    1028,
    1042
   ],
   "garon_reach_down_03.png": [
    1044,
    924,
    1198,
    1042
   ],
   "garon_torch_flame.png": [
    1214,
    924,
    1368,
    1042
   ],
   "ian_hold_eye_01.png": [
    24,
    1074,
    178,
    1192
   ],
   "ian_hold_eye_02.png": [
    194,
    1074,
    348,
    1192
   ],
   "ian_hold_front_01.png": [
    364,
    1074,
    518,
    1192
   ],
   "ian_hold_front_02.png": [
    534,
    1074,
    688,
    1192
   ],
   "ian_reach_down_01.png": [
    704,
    1074,
    858,
    1192
   ],
   "ian_reach_down_02.png": [
    874,
    1074,
    1028,
    1192
   ],
   "ian_reach_down_03.png": [
    1044,
    1074,
    1198,
    1192
   ],
   "light_wraith_attack_01.png": [
    1214,
    1074,
    1368,
    1192
   ],
   "light_wraith_attack_02.png": [
    24,
    1224,
    178,
    1342
   ],
   "light_wraith_attack_03.png": [
    194,
    1224,
    348,
    1342
   ],
   "light_wraith_float_01.png": [
    364,
    1224,
    518,
    1342
   ],
   "light_wraith_float_02.png": [
    534,
    1224,
    688,
    1342
   ],
   "light_wraith_float_03.png": [
    704,
    1224,
    858,
    1342
   ],
   "light_wraith_hurt_01.png": [
    874,
    1224,
    1028,
    1342
   ],
   "light_wraith_vanish_01.png": [
    1044,
    1224,
    1198,
    1342
   ],
   "light_wraith_vanish_02.png": [
    1214,
    1224,
    1368,
    1342
   ],
   "light_wraith_vanish_03.png": [
    24,
    1374,
    178,
    1492
   ],
   "shadow_bug_attack_01.png": [
    194,
    1374,
    348,
    1492
   ],
   "shadow_bug_attack_02.png": [
    364,
    1374,
    518,
    1492
   ],
   "shadow_bug_crawl_01.png": [
    534,
    1374,
    688,
    1492
   ],
   "shadow_bug_crawl_02.png": [
    704,
    1374,
    858,
    1492
   ],
   "shadow_bug_crawl_03.png": [
    874,
    1374,
    1028,
    1492
   ],
   "shadow_bug_defeat_01.png": [
    1044,
    1374,
    1198,
    1492
   ],
   "shadow_bug_defeat_02.png": [
    1214,
    1374,
    1368,
    1492
   ]
  }
 },
 "act1_backgrounds": {
  "version": "2.0",
  "viewport_px": [
   1920,
   1080
  ],
  "world_scale_px_per_meter": 125,
  "recommended_character_render_scale": 0.3125,
  "color_language": {
   "truth": "pale sky blue",
   "curse": "purple engine color grade; exclude curse wizard",
   "ice": "muted gray-cyan"
  },
  "render_note": "Scene art is 1080px tall with variable world width. 1920x1080 previews are camera crops. Numeric puzzle geometry is explicit in scene metadata; rulers are separate transparent objects.",
  "scenes": [
   {
    "id": "00_village_entrance",
    "title_ko": "마을과 던전 입구",
    "background_png": "00_village_entrance.png",
    "source_png": "원본/00_village_entrance.png",
    "world_size_px": [
     2701,
     1080
    ],
    "camera_size_px": [
     1920,
     1080
    ],
    "ground_y_px_art_estimate": 844,
    "collision_geometry_status": "draft_from_art; validate in engine",
    "parallax_factor": 1.0,
    "separate_interactive_objects_required": [
     "dungeon_gate",
     "villagers"
    ]
   },
   {
    "id": "01_castle_lever",
    "title_ko": "1-1 시소 성",
    "background_png": "01_castle_lever.png",
    "source_png": "원본/01_castle_lever.png",
    "world_size_px": [
     2954,
     1080
    ],
    "camera_size_px": [
     1920,
     1080
    ],
    "ground_y_px_art_estimate": 883,
    "collision_geometry_status": "draft_from_art; validate in engine",
    "parallax_factor": 1.0,
    "separate_interactive_objects_required": [
     "seesaw_lever",
     "falling_blocks",
     "castle_gate"
    ],
    "markers": {
     "fulcrum_x_px": 1477,
     "arm_distance_px": {
      "1m": 125,
      "2m": 250
     }
    }
   },
   {
    "id": "02_ice_corridor",
    "title_ko": "1-2 얼음 회랑 30m",
    "background_png": "02_ice_corridor.png",
    "source_png": "원본/02_ice_corridor.png",
    "world_size_px": [
     3750,
     1080
    ],
    "camera_size_px": [
     1920,
     1080
    ],
    "ground_y_px_art_estimate": 865,
    "collision_geometry_status": "draft_from_art; validate in engine",
    "parallax_factor": 1.0,
    "separate_interactive_objects_required": [
     "wall_ring",
     "pit",
     "inertia_golem"
    ],
    "length_px": 3750,
    "distance_marker_x_px": [
     0,
     625,
     1250,
     1875,
     2500,
     3125,
     3750
    ],
    "continuation": "independently generated non-mirrored panel"
   },
   {
    "id": "03_collapsing_bridge",
    "title_ko": "1-2 붕괴 다리",
    "background_png": "03_collapsing_bridge.png",
    "source_png": "원본/03_collapsing_bridge.png",
    "world_size_px": [
     2141,
     1080
    ],
    "camera_size_px": [
     1920,
     1080
    ],
    "ground_y_px_art_estimate": 599,
    "collision_geometry_status": "measured_fixed_geometry",
    "parallax_factor": 1.0,
    "separate_interactive_objects_required": [
     "bridge_segments",
     "far_pressure_plate",
     "phase_markers"
    ],
    "bridge_length_px": 1250,
    "collapse_delay_seconds": 4,
    "gap": {
     "left_edge_x_px": 447,
     "right_edge_x_px": 1697,
     "width_px": 1250,
     "width_m": 10
    }
   },
   {
    "id": "04_sled_path",
    "title_ko": "1-2 썰매 길",
    "background_png": "04_sled_path.png",
    "source_png": "원본/04_sled_path.png",
    "world_size_px": [
     3240,
     1080
    ],
    "camera_size_px": [
     1920,
     1080
    ],
    "ground_y_px_art_estimate": 806,
    "collision_geometry_status": "draft_from_art; validate in engine",
    "parallax_factor": 1.0,
    "separate_interactive_objects_required": [
     "sled",
     "stop_line",
     "speed_limit_sign"
    ]
   },
   {
    "id": "05_ice_lake",
    "title_ko": "1-3 얼음 호수",
    "background_png": "05_ice_lake.png",
    "source_png": "원본/05_ice_lake.png",
    "world_size_px": [
     5000,
     1080
    ],
    "camera_size_px": [
     1920,
     1080
    ],
    "ground_y_px_art_estimate": 858,
    "collision_geometry_status": "draft_from_art; validate in engine",
    "parallax_factor": 1.0,
    "separate_interactive_objects_required": [
     "stranded_villagers",
     "ice_troll",
     "ice_spirit"
    ],
    "center_to_shore_px": 2500,
    "continuation": "independently generated non-mirrored panel"
   },
   {
    "id": "06_minecart_tower",
    "title_ko": "1-4 광차 탑",
    "background_png": "06_minecart_tower.png",
    "source_png": "원본/06_minecart_tower.png",
    "world_size_px": [
     1920,
     1080
    ],
    "camera_size_px": [
     1920,
     1080
    ],
    "ground_y_px_art_estimate": 1050,
    "collision_geometry_status": "measured_fixed_geometry",
    "parallax_factor": 1.0,
    "separate_interactive_objects_required": [
     "rail",
     "minecart",
     "height_ruler"
    ],
    "height_reference_px": {
     "launch_5m": 625,
     "opposite_ledge_6m": 750
    },
    "height_geometry": {
     "valley_floor_y_px": 1050,
     "left_launch_top_y_px": 425,
     "right_landing_top_y_px": 300,
     "left_height_px": 625,
     "right_height_px": 750,
     "height_difference_px": 125,
     "height_difference_m": 1
    },
    "ledge_horizontal_geometry": {
     "left_platform_end_x_px": 385,
     "right_platform_start_x_px": 1525,
     "horizontal_gap_px": 1140,
     "horizontal_gap_m": 9.12,
     "coordinate_status": "visually checked art anchors; finalize collider edges in engine"
    }
   },
   {
    "id": "07_rough_stone",
    "title_ko": "1-5 마찰 바닥",
    "background_png": "07_rough_stone.png",
    "source_png": "원본/07_rough_stone.png",
    "world_size_px": [
     2430,
     1080
    ],
    "camera_size_px": [
     1920,
     1080
    ],
    "ground_y_px_art_estimate": 872,
    "collision_geometry_status": "draft_from_art; validate in engine",
    "parallax_factor": 1.0,
    "separate_interactive_objects_required": [
     "melting_ice_holes",
     "ice_spirit"
    ],
    "floor_material_boundary_x_px_art_estimate": 1215
   },
   {
    "id": "08_merchant_plaza",
    "title_ko": "1-6 상인 광장",
    "background_png": "08_merchant_plaza.png",
    "source_png": "원본/08_merchant_plaza.png",
    "world_size_px": [
     2970,
     1080
    ],
    "camera_size_px": [
     1920,
     1080
    ],
    "ground_y_px_art_estimate": 929,
    "collision_geometry_status": "draft_from_art; validate in engine",
    "parallax_factor": 1.0,
    "separate_interactive_objects_required": [
     "merchant_display",
     "eternal_wheel",
     "steam_golem",
     "spectators"
    ]
   }
  ],
  "truth_circle_effect": {
   "png": "truth_circle_effect_3_6m.png",
   "display_width_px": 450,
   "display_diameter_m": 3.6,
   "blend": "alpha",
   "placement": "dynamic floor overlay; do not bake into scenery"
  },
  "ruler_overlay_mode": "Separate transparent PNG game objects; place at world (0,0), toggle or adjust independently of scenery.",
  "ruler_overlays": {
   "01_castle_lever": "눈금_오브젝트/01_seesaw_1m_ticks.png",
   "02_ice_corridor": "눈금_오브젝트/02_corridor_5m_markers.png",
   "03_collapsing_bridge": "눈금_오브젝트/03_bridge_10m_endpoints.png",
   "06_minecart_tower": "눈금_오브젝트/06_minecart_height_ruler.png"
  }
 },
 "act2_backgrounds": {
  "parts": {
   "2a": {
    "pixel_per_meter": 125,
    "coordinate_convention": "half-open [x0,y0,x1,y1]; x1 and y1 are excluded",
    "canvas_height": 1080,
    "floor_top_y": 865,
    "layer_order": [
     "background"
    ],
    "notes": [
     "Each scene is one fully painted opaque RGB PNG; preview guide lines are separate.",
     "Long scenes are single generated compositions and are not mirrored or tiled.",
     "The prior reserved-space and entrance rectangles are unchanged.",
     "F2 stair reservation retains the earlier assumed upper bound y=280 because the request did not give a top y."
    ],
    "scenes": {
     "tower_f1": {
      "size": [
       2700,
       1080
      ],
      "ground_y": 865,
      "files": {
       "background": "tower_f1.png",
       "preview": "tower_f1_preview.png"
      },
      "reserved": {
       "laboratory_table_space": {
        "rect": [
         900,
         500,
         1100,
         865
        ],
        "width": 200,
        "height": 365
       },
       "metal_plate_left": {
        "rect": [
         1881,
         553,
         1900,
         865
        ],
        "width": 19,
        "height": 312
       },
       "metal_plate_right": {
        "rect": [
         2275,
         553,
         2294,
         865
        ],
        "width": 19,
        "height": 312
       },
       "plate_puzzle_clear_zone": {
        "rect": [
         1881,
         553,
         2294,
         865
        ],
        "width": 413,
        "height": 312
       }
      },
      "lamp_ring_centers": [],
      "entrances": {
       "tower_entrance": [
        0,
        405,
        300,
        865
       ],
       "stairs_to_f2": [
        2450,
        380,
        2700,
        865
       ]
      },
      "physics": {
       "metal_plate_inside_gap_px": 375,
       "metal_plate_inside_gap_m": 3,
       "metal_plate_thickness_px": 19,
       "metal_plate_height_px": 312
      }
     },
     "tower_f2": {
      "size": [
       1920,
       1080
      ],
      "ground_y": 865,
      "files": {
       "background": "tower_f2.png",
       "preview": "tower_f2_preview.png"
      },
      "reserved": {
       "circuit_board": {
        "rect": [
         510,
         420,
         1010,
         732
        ],
        "width": 500,
        "height": 312
       },
       "appearing_stairs": {
        "rect": [
         1500,
         280,
         1880,
         865
        ],
        "width": 380,
        "height": 585
       }
      },
      "lamp_ring_centers": [
       [
        141,
        167
       ],
       [
        722,
        134
       ],
       [
        1140,
        168
       ],
       [
        1641,
        135
       ]
      ],
      "entrances": {
       "arrival_from_f1": [
        0,
        430,
        150,
        865
       ],
       "stairs_to_f3": [
        1500,
        280,
        1880,
        865
       ]
      }
     },
     "tower_f3": {
      "size": [
       2400,
       1080
      ],
      "ground_y": 865,
      "files": {
       "background": "tower_f3.png",
       "preview": "tower_f3_preview.png"
      },
      "reserved": {
       "iron_door": {
        "rect": [
         1044,
         428,
         1356,
         865
        ],
        "width": 312,
        "height": 437
       },
       "touch_tablet": {
        "rect": [
         1700,
         590,
         1825,
         765
        ],
        "width": 125,
        "height": 175
       }
      },
      "lamp_ring_centers": [],
      "entrances": {
       "arrival_from_f2": [
        0,
        430,
        150,
        865
       ],
       "iron_door": [
        1044,
        428,
        1356,
        865
       ]
      }
     }
    }
   },
   "2b": {
    "pixel_per_meter": 125,
    "coordinate_convention": "half-open [x0,y0,x1,y1]; x1 and y1 are excluded",
    "canvas_height": 1080,
    "floor_top_y": 865,
    "layer_order": [
     "background"
    ],
    "notes": [
     "One fully painted opaque RGB PNG per scene; preview guide lines are separate.",
     "Elevator shaft [200,512) is the only interruption to the y=865 walkway.",
     "All fixed machinery is part of the background; later interactive objects are excluded.",
     "Village windows are dark in the background. Their suggested overlay centers are listed per scene."
    ],
    "scenes": {
     "tower_f4": {
      "size": [
       2400,
       1080
      ],
      "ground_y": 865,
      "reserved": {
       "three_compartment_vault": {
        "rect": [
         1012,
         565,
         1388,
         865
        ],
        "width": 376,
        "height": 300
       }
      },
      "play_zones": {
       "scattered_keys_x": [
        0,
        900
       ],
       "knight_combat_x": [
        1600,
        2400
       ]
      },
      "entrances": {
       "arrival_from_f3": [
        0,
        430,
        150,
        865
       ],
       "stairs_to_f5": [
        2250,
        430,
        2400,
        865
       ]
      },
      "files": {
       "background": "tower_f4.png",
       "preview": "tower_f4_preview.png"
      }
     },
     "tower_f5": {
      "size": [
       2400,
       1080
      ],
      "ground_y": 865,
      "reserved": {
       "electromagnet_trap": {
        "rect": [
         1000,
         865,
         1375,
         915
        ],
        "width": 375,
        "height": 50
       },
       "statue_placement": {
        "rect": [
         1750,
         420,
         2050,
         865
        ],
        "width": 300,
        "height": 445
       }
      },
      "elevator_shaft": {
       "rect": [
        200,
        0,
        512,
        1080
       ],
       "width": 312,
       "height": 1080
      },
      "shaft_floor_gap": [
       200,
       512
      ],
      "shaft_guide_rails_x": [
       200,
       512
      ],
      "entrances": {
       "arrival_from_f4": [
        0,
        430,
        150,
        865
       ],
       "elevator_shaft": [
        200,
        0,
        512,
        1080
       ],
       "stairs_to_top": [
        2250,
        430,
        2400,
        865
       ]
      },
      "files": {
       "background": "tower_f5.png",
       "preview": "tower_f5_preview.png"
      }
     },
     "tower_top": {
      "size": [
       3000,
       1080
      ],
      "ground_y": 865,
      "reserved": {
       "coil_door": {
        "rect": [
         1312,
         365,
         1687,
         865
        ],
        "width": 375,
        "height": 500
       },
       "beacon": {
        "rect": [
         2650,
         675,
         2850,
         865
        ],
        "width": 200,
        "height": 190
       }
      },
      "entrances": {
       "arrival_from_f5": [
        0,
        365,
        220,
        865
       ],
       "coil_door": [
        1312,
        365,
        1687,
        865
       ]
      },
      "village_lights_unlit": [
       [
        565,
        703
       ],
       [
        605,
        714
       ],
       [
        637,
        731
       ],
       [
        710,
        635
       ],
       [
        815,
        678
       ],
       [
        951,
        704
       ],
       [
        982,
        735
       ],
       [
        1035,
        707
       ],
       [
        1161,
        621
       ],
       [
        1283,
        716
       ],
       [
        1331,
        709
       ],
       [
        1397,
        727
       ]
      ],
      "files": {
       "background": "tower_top.png",
       "preview": "tower_top_preview.png"
      }
     }
    }
   }
  },
  "scenes": {
   "tower_f1": {
    "size": [
     2700,
     1080
    ],
    "ground_y": 865,
    "files": {
     "background": "tower_f1.png",
     "preview": "tower_f1_preview.png"
    },
    "reserved": {
     "laboratory_table_space": {
      "rect": [
       900,
       500,
       1100,
       865
      ],
      "width": 200,
      "height": 365
     },
     "metal_plate_left": {
      "rect": [
       1881,
       553,
       1900,
       865
      ],
      "width": 19,
      "height": 312
     },
     "metal_plate_right": {
      "rect": [
       2275,
       553,
       2294,
       865
      ],
      "width": 19,
      "height": 312
     },
     "plate_puzzle_clear_zone": {
      "rect": [
       1881,
       553,
       2294,
       865
      ],
      "width": 413,
      "height": 312
     }
    },
    "lamp_ring_centers": [],
    "entrances": {
     "tower_entrance": [
      0,
      405,
      300,
      865
     ],
     "stairs_to_f2": [
      2450,
      380,
      2700,
      865
     ]
    },
    "physics": {
     "metal_plate_inside_gap_px": 375,
     "metal_plate_inside_gap_m": 3,
     "metal_plate_thickness_px": 19,
     "metal_plate_height_px": 312
    }
   },
   "tower_f2": {
    "size": [
     1920,
     1080
    ],
    "ground_y": 865,
    "files": {
     "background": "tower_f2.png",
     "preview": "tower_f2_preview.png"
    },
    "reserved": {
     "circuit_board": {
      "rect": [
       510,
       420,
       1010,
       732
      ],
      "width": 500,
      "height": 312
     },
     "appearing_stairs": {
      "rect": [
       1500,
       280,
       1880,
       865
      ],
      "width": 380,
      "height": 585
     }
    },
    "lamp_ring_centers": [
     [
      141,
      167
     ],
     [
      722,
      134
     ],
     [
      1140,
      168
     ],
     [
      1641,
      135
     ]
    ],
    "entrances": {
     "arrival_from_f1": [
      0,
      430,
      150,
      865
     ],
     "stairs_to_f3": [
      1500,
      280,
      1880,
      865
     ]
    }
   },
   "tower_f3": {
    "size": [
     2400,
     1080
    ],
    "ground_y": 865,
    "files": {
     "background": "tower_f3.png",
     "preview": "tower_f3_preview.png"
    },
    "reserved": {
     "iron_door": {
      "rect": [
       1044,
       428,
       1356,
       865
      ],
      "width": 312,
      "height": 437
     },
     "touch_tablet": {
      "rect": [
       1700,
       590,
       1825,
       765
      ],
      "width": 125,
      "height": 175
     }
    },
    "lamp_ring_centers": [],
    "entrances": {
     "arrival_from_f2": [
      0,
      430,
      150,
      865
     ],
     "iron_door": [
      1044,
      428,
      1356,
      865
     ]
    }
   },
   "tower_f4": {
    "size": [
     2400,
     1080
    ],
    "ground_y": 865,
    "reserved": {
     "three_compartment_vault": {
      "rect": [
       1012,
       565,
       1388,
       865
      ],
      "width": 376,
      "height": 300
     }
    },
    "play_zones": {
     "scattered_keys_x": [
      0,
      900
     ],
     "knight_combat_x": [
      1600,
      2400
     ]
    },
    "entrances": {
     "arrival_from_f3": [
      0,
      430,
      150,
      865
     ],
     "stairs_to_f5": [
      2250,
      430,
      2400,
      865
     ]
    },
    "files": {
     "background": "tower_f4.png",
     "preview": "tower_f4_preview.png"
    }
   },
   "tower_f5": {
    "size": [
     2400,
     1080
    ],
    "ground_y": 865,
    "reserved": {
     "electromagnet_trap": {
      "rect": [
       1000,
       865,
       1375,
       915
      ],
      "width": 375,
      "height": 50
     },
     "statue_placement": {
      "rect": [
       1750,
       420,
       2050,
       865
      ],
      "width": 300,
      "height": 445
     }
    },
    "elevator_shaft": {
     "rect": [
      200,
      0,
      512,
      1080
     ],
     "width": 312,
     "height": 1080
    },
    "shaft_floor_gap": [
     200,
     512
    ],
    "shaft_guide_rails_x": [
     200,
     512
    ],
    "entrances": {
     "arrival_from_f4": [
      0,
      430,
      150,
      865
     ],
     "elevator_shaft": [
      200,
      0,
      512,
      1080
     ],
     "stairs_to_top": [
      2250,
      430,
      2400,
      865
     ]
    },
    "files": {
     "background": "tower_f5.png",
     "preview": "tower_f5_preview.png"
    }
   },
   "tower_top": {
    "size": [
     3000,
     1080
    ],
    "ground_y": 865,
    "reserved": {
     "coil_door": {
      "rect": [
       1312,
       365,
       1687,
       865
      ],
      "width": 375,
      "height": 500
     },
     "beacon": {
      "rect": [
       2650,
       675,
       2850,
       865
      ],
      "width": 200,
      "height": 190
     }
    },
    "entrances": {
     "arrival_from_f5": [
      0,
      365,
      220,
      865
     ],
     "coil_door": [
      1312,
      365,
      1687,
      865
     ]
    },
    "village_lights_unlit": [
     [
      565,
      703
     ],
     [
      605,
      714
     ],
     [
      637,
      731
     ],
     [
      710,
      635
     ],
     [
      815,
      678
     ],
     [
      951,
      704
     ],
     [
      982,
      735
     ],
     [
      1035,
      707
     ],
     [
      1161,
      621
     ],
     [
      1283,
      716
     ],
     [
      1331,
      709
     ],
     [
      1397,
      727
     ]
    ],
    "files": {
     "background": "tower_top.png",
     "preview": "tower_top_preview.png"
    }
   }
  },
  "png_files": [
   "tower_f1.png",
   "tower_f1_preview.png",
   "tower_f2.png",
   "tower_f2_preview.png",
   "tower_f3.png",
   "tower_f3_preview.png",
   "tower_f4.png",
   "tower_f4_preview.png",
   "tower_f5.png",
   "tower_f5_preview.png",
   "tower_top.png",
   "tower_top_preview.png"
  ]
 },
 "act3_backgrounds": {
  "2a": {
   "version": "1.0",
   "pixel_scale": "1m = 125px",
   "scenes": {
    "abyss_1": {
     "size": [
      2400,
      1080
     ],
     "floor_top_y": 865,
     "reserved_zones": {
      "light_source_stand": [
       300,
       625,
       420,
       865
      ],
      "slit_wall": [
       700,
       365,
       760,
       865
      ],
      "light_spread": [
       760,
       0,
       1900,
       865
      ],
      "screen_wall": [
       1900,
       365,
       1960,
       865
      ],
      "ripple_tank": [
       2050,
       745,
       2350,
       865
      ]
     },
     "entrances": {
      "left": [
       0,
       250
      ],
      "right": [
       2250,
       2400
      ]
     }
    },
    "abyss_2": {
     "size": [
      2400,
      1080
     ],
     "floor_top_y": 865,
     "reserved_zones": {
      "optical_rail": [
       1450,
       845,
       2200,
       865
      ],
      "door": [
       2230,
       365,
       2380,
       865
      ]
     },
     "entrances": {
      "left": [
       0,
       160
      ],
      "right": [
       2230,
       2380
      ]
     },
     "dry_pool": {
      "x": [
       600,
       1200
      ],
      "surface_y": 865,
      "bottom_y": 1050,
      "contains_water": false
     },
     "art_revision": "v2: natural wet cave, stalactites, pale quartz and convex crystal lens; full scene regenerated; walking ledge registered to y=865."
    },
    "abyss_3": {
     "size": [
      2400,
      1080
     ],
     "floor_top_y": 865,
     "reserved_zones": {
      "rune_tablet": [
       350,
       400,
       850,
       750
      ],
      "photo_plate": [
       1150,
       400,
       1550,
       750
      ],
      "electron_apparatus": [
       1800,
       700,
       2200,
       865
      ]
     },
     "entrances": {
      "left": [
       0,
       160
      ],
      "right": [
       2250,
       2400
      ]
     }
    }
   },
   "notes": [
    "Each scene began as one image-generated complete background; no mirrored horizontal extension.",
    "Only placement zones were cleaned with feathered copies of image-generated stone texture.",
    "Floor y=865 was aligned by a coordinate warp of the generated scene; stage 3-2 pit is dry and has no water layer."
   ]
  },
  "2b": {
   "pixels_per_meter": 125,
   "floor_y": 865,
   "scenes": {
    "abyss_4": {
     "size": [
      2400,
      1080
     ],
     "floor_y": 865,
     "reserved_spaces": {
      "stair_model": [
       100,
       615,
       400,
       865
      ],
      "lamp_pedestals": [
       [
        590,
        665,
        710,
        865
       ],
       [
        890,
        665,
        1010,
        865
       ],
       [
        1190,
        665,
        1310,
        865
       ],
       [
        1490,
        665,
        1610,
        865
       ]
      ],
      "large_door": [
       1900,
       365,
       2200,
       865
      ],
      "barcode_panel": [
       1950,
       290,
       2150,
       350
      ]
     },
     "chasm_x": null,
     "repeatable": false,
     "floor_bright_start_samples": {
      "100": 865,
      "200": 865,
      "300": 865,
      "400": 865,
      "500": 865,
      "600": 865,
      "700": 865,
      "800": 865,
      "900": 865,
      "1000": 865,
      "1100": 865,
      "1200": 865,
      "1300": 865,
      "1400": 865,
      "1500": 865,
      "1600": 865,
      "1700": 865,
      "1800": 865,
      "1900": 865,
      "2000": 865,
      "2100": 865,
      "2200": 865,
      "2300": 865
     },
     "source_generated_image": "exec-5f24cc17-6a1c-4be9-9539-c7dc3f9c800d.png"
    },
    "abyss_5": {
     "size": [
      3000,
      1080
     ],
     "floor_y": 865,
     "reserved_spaces": {
      "crystal_plinth": [
       200,
       745,
       300,
       865
      ],
      "exit_door": [
       2800,
       365,
       2950,
       865
      ],
      "bridge_void": [
       400,
       700,
       2600,
       1080
      ]
     },
     "chasm_x": [
      400,
      2600
     ],
     "repeatable": false,
     "floor_bright_start_samples": {
      "100": 865,
      "200": 865,
      "300": 865,
      "2700": 865,
      "2800": 865,
      "2900": 865
     },
     "source_generated_image": "exec-4e1582cc-5609-4574-837e-ea865e255380.png"
    },
    "abyss_end": {
     "size": [
      3000,
      1080
     ],
     "floor_y": 865,
     "reserved_spaces": {
      "hourglass_door": [
       2650,
       365,
       2900,
       865
      ],
      "battle_arena": [
       600,
       365,
       2400,
       865
      ]
     },
     "chasm_x": null,
     "repeatable": false,
     "floor_bright_start_samples": {
      "100": 865,
      "200": 865,
      "300": 865,
      "400": 865,
      "500": 865,
      "600": 865,
      "700": 865,
      "800": 865,
      "900": 865,
      "1000": 865,
      "1100": 865,
      "1200": 865,
      "1300": 865,
      "1400": 865,
      "1500": 865,
      "1600": 865,
      "1700": 865,
      "1800": 865,
      "1900": 865,
      "2000": 865,
      "2100": 865,
      "2200": 865,
      "2300": 865,
      "2400": 865,
      "2500": 865,
      "2600": 865,
      "2700": 865,
      "2800": 865,
      "2900": 865
     },
     "source_generated_image": "exec-4a4ab131-f40a-44e8-aa9c-71a8992ce5cc.png"
    },
    "abyss_chase": {
     "size": [
      3840,
      1080
     ],
     "floor_y": 865,
     "reserved_spaces": {},
     "chasm_x": null,
     "repeatable": true,
     "floor_bright_start_samples": {
      "100": 865,
      "200": 865,
      "300": 865,
      "400": 865,
      "500": 865,
      "600": 865,
      "700": 865,
      "800": 865,
      "900": 865,
      "1000": 865,
      "1100": 865,
      "1200": 865,
      "1300": 865,
      "1400": 865,
      "1500": 865,
      "1600": 865,
      "1700": 865,
      "1800": 865,
      "1900": 865,
      "2000": 865,
      "2100": 865,
      "2200": 865,
      "2300": 865,
      "2400": 865,
      "2500": 865,
      "2600": 865,
      "2700": 865,
      "2800": 865,
      "2900": 865,
      "3000": 865,
      "3100": 865,
      "3200": 865,
      "3300": 865,
      "3400": 865,
      "3500": 865,
      "3600": 865,
      "3700": 865,
      "3800": 865
     },
     "source_generated_image": "exec-1e70717f-fb5a-4562-8572-73e22b869794.png",
     "seam_method": "Stone pillar split at source columns 2027/2028, 200px pure pillar on each edge and 100px feathered transition inward."
    }
   }
  },
  "preview_index": {
   "abyss_1.png": [
    24,
    24,
    368,
    202
   ],
   "abyss_2.png": [
    384,
    24,
    728,
    202
   ],
   "abyss_3.png": [
    744,
    24,
    1088,
    202
   ],
   "abyss_4.png": [
    24,
    234,
    368,
    412
   ],
   "abyss_5.png": [
    384,
    234,
    728,
    412
   ],
   "abyss_chase.png": [
    744,
    234,
    1088,
    412
   ],
   "abyss_chase_seam_4x.png": [
    24,
    444,
    368,
    622
   ],
   "abyss_end.png": [
    384,
    444,
    728,
    622
   ]
  }
 },
 "act1_objects": {
  "version": "3.0",
  "units": "game world pixels",
  "world_scale_px_per_meter": 125,
  "viewport_px": [
   1920,
   1080
  ],
  "sprite_format": "cropped transparent PNG; sprite origin top-left; pivot and collider listed per object",
  "objects": {
   "seesaw_plank": {
    "png": "assets/1-1/seesaw_plank.png",
    "size_px": [
     650,
     63
    ],
    "pivot_px": [
     325,
     63
    ],
    "collider": "rotating plank about center axle",
    "note": "Fulcrum at world x=1477. 1m and 2m marks are separate backdrop overlay."
   },
   "seesaw_fulcrum": {
    "png": "assets/1-1/seesaw_fulcrum.png",
    "size_px": [
     170,
     107
    ],
    "pivot_px": [
     85,
     107
    ],
    "collider": "static triangle"
   },
   "castle_gate": {
    "png": "assets/1-1/castle_gate.png",
    "size_px": [
     309,
     440
    ],
    "pivot_px": [
     154,
     440
    ],
    "collider": "vertical sliding rectangle"
   },
   "tower_block": {
    "png": "assets/1-1/tower_block.png",
    "size_px": [
     125,
     49
    ],
    "pivot_px": [
     62,
     49
    ],
    "collider": "stackable rectangle"
   },
   "stone_cart": {
    "png": "assets/1-2/stone_cart.png",
    "size_px": [
     300,
     136
    ],
    "pivot_px": [
     150,
     136
    ],
    "collider": "wheeled body"
   },
   "wall_ring": {
    "png": "assets/1-2/wall_ring.png",
    "size_px": [
     105,
     149
    ],
    "pivot_px": [
     52,
     149
    ],
    "collider": "grab trigger"
   },
   "bridge_segment": {
    "png": "assets/1-2/bridge_segment.png",
    "size_px": [
     125,
     20
    ],
    "pivot_px": [
     62,
     20
    ],
    "collider": "separate collapsing segment"
   },
   "bridge_segment_crack_01": {
    "png": "assets/1-2/bridge_segment_crack_01.png",
    "size_px": [
     125,
     20
    ],
    "pivot_px": [
     62,
     20
    ],
    "collider": "separate collapsing segment",
    "note": "First visible cracking stage; collision still active."
   },
   "bridge_segment_crack_02": {
    "png": "assets/1-2/bridge_segment_crack_02.png",
    "size_px": [
     125,
     20
    ],
    "pivot_px": [
     62,
     20
    ],
    "collider": "separate collapsing segment",
    "note": "Severe cracking stage; disable collision on collapse."
   },
   "pressure_plate": {
    "png": "assets/1-2/pressure_plate.png",
    "size_px": [
     165,
     37
    ],
    "pivot_px": [
     82,
     37
    ],
    "collider": "top trigger"
   },
   "pit_opening": {
    "png": "assets/1-2/pit_opening.png",
    "size_px": [
     430,
     105
    ],
    "pivot_px": [
     215,
     105
    ],
    "collider": "pit trigger; disable ice-floor collision underneath"
   },
   "narrow_beam": {
    "png": "assets/1-2/narrow_beam.png",
    "size_px": [
     430,
     34
    ],
    "pivot_px": [
     215,
     34
    ],
    "collider": "narrow balance beam"
   },
   "bridge_phase_marker": {
    "png": "assets/1-2/bridge_phase_marker.png",
    "size_px": [
     55,
     23
    ],
    "pivot_px": [
     27,
     23
    ],
    "collider": "none; cue only"
   },
   "stone_10kg": {
    "png": "assets/1-2/stone_10kg.png",
    "size_px": [
     70,
     70
    ],
    "pivot_px": [
     35,
     70
    ],
    "collider": "circle",
    "mass_kg": 10,
    "radius_px": 35,
    "note": "One consistent stone design; linear size varies approximately with cube root of mass."
   },
   "stone_15kg": {
    "png": "assets/1-2/stone_15kg.png",
    "size_px": [
     80,
     80
    ],
    "pivot_px": [
     40,
     80
    ],
    "collider": "circle",
    "mass_kg": 15,
    "radius_px": 40,
    "note": "One consistent stone design; linear size varies approximately with cube root of mass."
   },
   "stone_20kg": {
    "png": "assets/1-2/stone_20kg.png",
    "size_px": [
     88,
     88
    ],
    "pivot_px": [
     44,
     88
    ],
    "collider": "circle",
    "mass_kg": 20,
    "radius_px": 44,
    "note": "One consistent stone design; linear size varies approximately with cube root of mass."
   },
   "stone_40kg": {
    "png": "assets/1-2/stone_40kg.png",
    "size_px": [
     111,
     111
    ],
    "pivot_px": [
     55,
     111
    ],
    "collider": "circle",
    "mass_kg": 40,
    "radius_px": 55,
    "note": "One consistent stone design; linear size varies approximately with cube root of mass."
   },
   "stone_160kg": {
    "png": "assets/1-2/stone_160kg.png",
    "size_px": [
     177,
     177
    ],
    "pivot_px": [
     88,
     177
    ],
    "collider": "circle",
    "mass_kg": 160,
    "radius_px": 88,
    "note": "One consistent stone design; linear size varies approximately with cube root of mass."
   },
   "stone_10kg_label": {
    "png": "assets/1-2/stone_10kg_label.png",
    "size_px": [
     70,
     26
    ],
    "pivot_px": [
     35,
     26
    ],
    "collider": "none; optional mass label",
    "note": "Optional classroom overlay. Stone diameters are deliberately exaggerated for gameplay readability; kilograms come from physics metadata."
   },
   "stone_15kg_label": {
    "png": "assets/1-2/stone_15kg_label.png",
    "size_px": [
     80,
     26
    ],
    "pivot_px": [
     40,
     26
    ],
    "collider": "none; optional mass label",
    "note": "Optional classroom overlay. Stone diameters are deliberately exaggerated for gameplay readability; kilograms come from physics metadata."
   },
   "stone_20kg_label": {
    "png": "assets/1-2/stone_20kg_label.png",
    "size_px": [
     88,
     26
    ],
    "pivot_px": [
     44,
     26
    ],
    "collider": "none; optional mass label",
    "note": "Optional classroom overlay. Stone diameters are deliberately exaggerated for gameplay readability; kilograms come from physics metadata."
   },
   "stone_40kg_label": {
    "png": "assets/1-2/stone_40kg_label.png",
    "size_px": [
     111,
     26
    ],
    "pivot_px": [
     55,
     26
    ],
    "collider": "none; optional mass label",
    "note": "Optional classroom overlay. Stone diameters are deliberately exaggerated for gameplay readability; kilograms come from physics metadata."
   },
   "stone_160kg_label": {
    "png": "assets/1-2/stone_160kg_label.png",
    "size_px": [
     177,
     26
    ],
    "pivot_px": [
     88,
     26
    ],
    "collider": "none; optional mass label",
    "note": "Optional classroom overlay. Stone diameters are deliberately exaggerated for gameplay readability; kilograms come from physics metadata."
   },
   "sled": {
    "png": "assets/1-2_sled/sled.png",
    "size_px": [
     290,
     124
    ],
    "pivot_px": [
     145,
     124
    ],
    "collider": "ice runner"
   },
   "stop_line": {
    "png": "assets/1-2_sled/stop_line.png",
    "size_px": [
     145,
     15
    ],
    "pivot_px": [
     72,
     15
    ],
    "collider": "none; visual line"
   },
   "speed_sign": {
    "png": "assets/1-2_sled/speed_sign.png",
    "size_px": [
     157,
     195
    ],
    "pivot_px": [
     78,
     195
    ],
    "collider": "none; speed rule in engine"
   },
   "speed_sign_2ms_overlay": {
    "png": "assets/1-2_sled/speed_sign_2ms_overlay.png",
    "size_px": [
     157,
     195
    ],
    "pivot_px": [
     78,
     195
    ],
    "collider": "none; visual label",
    "note": "Place over speed_sign at identical top-left coordinate; toggle off to ask students to infer a safe speed."
   },
   "herb_basket": {
    "png": "assets/1-3/herb_basket.png",
    "size_px": [
     70,
     58
    ],
    "pivot_px": [
     35,
     58
    ],
    "collider": "throwable"
   },
   "rope_coil": {
    "png": "assets/1-3/rope_coil.png",
    "size_px": [
     65,
     38
    ],
    "pivot_px": [
     32,
     38
    ],
    "collider": "throwable"
   },
   "merchant_parcel": {
    "png": "assets/1-3/merchant_parcel.png",
    "size_px": [
     65,
     50
    ],
    "pivot_px": [
     32,
     50
    ],
    "collider": "throwable"
   },
   "child_pouch": {
    "png": "assets/1-3/child_pouch.png",
    "size_px": [
     55,
     68
    ],
    "pivot_px": [
     27,
     68
    ],
    "collider": "throwable"
   },
   "minecart": {
    "png": "assets/1-4/minecart.png",
    "size_px": [
     230,
     116
    ],
    "pivot_px": [
     115,
     116
    ],
    "collider": "cart body on rail"
   },
   "spring_bumper": {
    "png": "assets/1-4/spring_bumper.png",
    "size_px": [
     155,
     105
    ],
    "pivot_px": [
     77,
     105
    ],
    "collider": "horizontal spring launcher",
    "note": "Fixed plate on left, contact plate on right; applies impulse along +x on the rail."
   },
   "spring_plate": {
    "png": "assets/future_jump/spring_plate.png",
    "size_px": [
     175,
     80
    ],
    "pivot_px": [
     87,
     80
    ],
    "collider": "vertical spring launcher",
    "note": "Reserved for a later jump puzzle; do not use for Act 1-4 minecart launch."
   },
   "rail_segment": {
    "png": "assets/1-4/rail_segment.png",
    "size_px": [
     125,
     34
    ],
    "pivot_px": [
     62,
     34
    ],
    "collider": "rail segment visual; use rail_path for collision"
   },
   "melting_ice_hole_01": {
    "png": "assets/1-5/melting_ice_hole_01.png",
    "size_px": [
     95,
     38
    ],
    "pivot_px": [
     47,
     19
    ],
    "collider": "hole region; changes with stage",
    "stage": 1
   },
   "melting_ice_hole_02": {
    "png": "assets/1-5/melting_ice_hole_02.png",
    "size_px": [
     140,
     56
    ],
    "pivot_px": [
     70,
     28
    ],
    "collider": "hole region; changes with stage",
    "stage": 2
   },
   "melting_ice_hole_03": {
    "png": "assets/1-5/melting_ice_hole_03.png",
    "size_px": [
     195,
     77
    ],
    "pivot_px": [
     97,
     38
    ],
    "collider": "hole region; changes with stage",
    "stage": 3
   },
   "melting_ice_hole_04": {
    "png": "assets/1-5/melting_ice_hole_04.png",
    "size_px": [
     250,
     99
    ],
    "pivot_px": [
     125,
     49
    ],
    "collider": "hole region; changes with stage",
    "stage": 4
   },
   "merchant_display": {
    "png": "assets/1-6/merchant_display.png",
    "size_px": [
     460,
     128
    ],
    "pivot_px": [
     230,
     128
    ],
    "collider": "static display"
   },
   "rail_path": {
    "png": "assets/1-4/rail_path_1920x1080.png",
    "size_px": [
     1920,
     1080
    ],
    "pivot_px": [
     0,
     0
    ],
    "collider": "polyline of rail_centerline_px; cart follows tangent",
    "note": "Transparent full-scene overlay, world origin (0,0)."
   }
  },
  "scene_layout": {
   "1-1": {
    "fulcrum_x_px": 1477,
    "ground_y_px": 883,
    "lever_length_px": 650,
    "arm_marks_from_pivot_px": [
     125,
     250
    ]
   },
   "1-2_corridor": {
    "ground_y_px": 865,
    "stone_masses_kg": [
     10,
     15,
     20,
     40,
     160
    ]
   },
   "1-2_bridge": {
    "left_edge_x_px": 447,
    "right_edge_x_px": 1697,
    "gap_px": 1250,
    "top_y_px": 599,
    "segments": [
     {
      "index": 1,
      "x_px": 447,
      "width_px": 125
     },
     {
      "index": 2,
      "x_px": 572,
      "width_px": 125
     },
     {
      "index": 3,
      "x_px": 697,
      "width_px": 125
     },
     {
      "index": 4,
      "x_px": 822,
      "width_px": 125
     },
     {
      "index": 5,
      "x_px": 947,
      "width_px": 125
     },
     {
      "index": 6,
      "x_px": 1072,
      "width_px": 125
     },
     {
      "index": 7,
      "x_px": 1197,
      "width_px": 125
     },
     {
      "index": 8,
      "x_px": 1322,
      "width_px": 125
     },
     {
      "index": 9,
      "x_px": 1447,
      "width_px": 125
     },
     {
      "index": 10,
      "x_px": 1572,
      "width_px": 125
     }
    ],
    "collapse_after_seconds": 4,
    "segment_visual_stages": [
     "bridge_segment",
     "bridge_segment_crack_01",
     "bridge_segment_crack_02"
    ]
   },
   "1-3": {
    "throwable_objects": [
     "herb_basket",
     "rope_coil",
     "merchant_parcel",
     "child_pouch"
    ]
   },
   "1-4": {
    "valley_floor_y_px": 1050,
    "left_platform_end_x_px": 385,
    "left_platform_top_y_px": 425,
    "right_platform_start_x_px": 1525,
    "right_platform_top_y_px": 300,
    "horizontal_gap_px": 1140,
    "horizontal_gap_m": 9.12,
    "left_height_px": 625,
    "right_height_px": 750,
    "height_difference_px": 125,
    "ledge_x_note": "Visual art anchors (~385, ~1525); verify final collider edge in the game engine.",
    "launch_object": "spring_bumper",
    "launch_axis_xy": [
     1,
     0
    ],
    "launch_bumper_placement": {
     "top_left_x_px": 0,
     "top_left_y_px": 320,
     "contact_x_px": 155
    },
    "resting_cart_placement": {
     "top_left_x_px": 155,
     "bottom_y_px": 425,
     "right_edge_x_px": 385
    },
    "rail_centerline_px": [
     [
      385,
      425
     ],
     [
      394,
      425
     ],
     [
      402,
      426
     ],
     [
      411,
      427
     ],
     [
      418,
      429
     ],
     [
      426,
      432
     ],
     [
      433,
      434
     ],
     [
      440,
      438
     ],
     [
      447,
      441
     ],
     [
      454,
      446
     ],
     [
      460,
      450
     ],
     [
      466,
      455
     ],
     [
      472,
      461
     ],
     [
      478,
      466
     ],
     [
      483,
      473
     ],
     [
      489,
      479
     ],
     [
      494,
      486
     ],
     [
      499,
      493
     ],
     [
      503,
      501
     ],
     [
      508,
      508
     ],
     [
      513,
      516
     ],
     [
      517,
      525
     ],
     [
      521,
      533
     ],
     [
      526,
      542
     ],
     [
      530,
      551
     ],
     [
      534,
      561
     ],
     [
      538,
      570
     ],
     [
      542,
      580
     ],
     [
      546,
      590
     ],
     [
      549,
      600
     ],
     [
      553,
      610
     ],
     [
      557,
      621
     ],
     [
      561,
      631
     ],
     [
      565,
      642
     ],
     [
      568,
      653
     ],
     [
      572,
      663
     ],
     [
      576,
      674
     ],
     [
      580,
      685
     ],
     [
      584,
      696
     ],
     [
      588,
      707
     ],
     [
      592,
      718
     ],
     [
      597,
      729
     ],
     [
      601,
      740
     ],
     [
      606,
      751
     ],
     [
      610,
      762
     ],
     [
      615,
      773
     ],
     [
      620,
      784
     ],
     [
      625,
      795
     ],
     [
      630,
      805
     ],
     [
      636,
      816
     ],
     [
      641,
      826
     ],
     [
      647,
      836
     ],
     [
      653,
      847
     ],
     [
      659,
      857
     ],
     [
      666,
      866
     ],
     [
      672,
      876
     ],
     [
      679,
      885
     ],
     [
      686,
      895
     ],
     [
      694,
      904
     ],
     [
      702,
      912
     ],
     [
      710,
      921
     ],
     [
      718,
      929
     ],
     [
      727,
      937
     ],
     [
      736,
      944
     ],
     [
      745,
      952
     ],
     [
      755,
      959
     ],
     [
      765,
      965
     ],
     [
      776,
      972
     ],
     [
      786,
      978
     ],
     [
      798,
      983
     ],
     [
      809,
      988
     ],
     [
      821,
      993
     ],
     [
      834,
      997
     ],
     [
      847,
      1001
     ],
     [
      860,
      1005
     ],
     [
      874,
      1008
     ],
     [
      888,
      1010
     ],
     [
      903,
      1012
     ],
     [
      918,
      1014
     ],
     [
      934,
      1015
     ],
     [
      950,
      1015
     ],
     [
      966,
      1014
     ],
     [
      981,
      1013
     ],
     [
      995,
      1012
     ],
     [
      1009,
      1009
     ],
     [
      1023,
      1006
     ],
     [
      1036,
      1003
     ],
     [
      1049,
      998
     ],
     [
      1062,
      994
     ],
     [
      1074,
      989
     ],
     [
      1085,
      983
     ],
     [
      1097,
      977
     ],
     [
      1107,
      970
     ],
     [
      1118,
      963
     ],
     [
      1128,
      955
     ],
     [
      1138,
      947
     ],
     [
      1148,
      939
     ],
     [
      1157,
      930
     ],
     [
      1166,
      921
     ],
     [
      1174,
      911
     ],
     [
      1183,
      901
     ],
     [
      1191,
      891
     ],
     [
      1198,
      880
     ],
     [
      1206,
      869
     ],
     [
      1213,
      858
     ],
     [
      1220,
      847
     ],
     [
      1227,
      835
     ],
     [
      1233,
      823
     ],
     [
      1240,
      811
     ],
     [
      1246,
      799
     ],
     [
      1252,
      787
     ],
     [
      1258,
      774
     ],
     [
      1263,
      761
     ],
     [
      1269,
      748
     ],
     [
      1274,
      735
     ],
     [
      1279,
      722
     ],
     [
      1284,
      709
     ],
     [
      1289,
      696
     ],
     [
      1294,
      682
     ],
     [
      1299,
      669
     ],
     [
      1303,
      656
     ],
     [
      1308,
      642
     ],
     [
      1312,
      629
     ],
     [
      1316,
      616
     ],
     [
      1321,
      602
     ],
     [
      1325,
      589
     ],
     [
      1329,
      576
     ],
     [
      1334,
      563
     ],
     [
      1338,
      550
     ],
     [
      1342,
      538
     ],
     [
      1346,
      525
     ],
     [
      1350,
      512
     ],
     [
      1355,
      500
     ],
     [
      1359,
      488
     ],
     [
      1363,
      476
     ],
     [
      1368,
      465
     ],
     [
      1372,
      453
     ],
     [
      1377,
      442
     ],
     [
      1381,
      432
     ],
     [
      1386,
      421
     ],
     [
      1391,
      411
     ],
     [
      1396,
      401
     ],
     [
      1401,
      392
     ],
     [
      1406,
      383
     ],
     [
      1411,
      374
     ],
     [
      1417,
      366
     ],
     [
      1423,
      358
     ],
     [
      1428,
      350
     ],
     [
      1435,
      343
     ],
     [
      1441,
      337
     ],
     [
      1447,
      331
     ],
     [
      1454,
      325
     ],
     [
      1461,
      320
     ],
     [
      1468,
      315
     ],
     [
      1475,
      311
     ],
     [
      1483,
      308
     ],
     [
      1491,
      305
     ],
     [
      1499,
      303
     ],
     [
      1507,
      301
     ],
     [
      1516,
      300
     ],
     [
      1525,
      300
     ]
    ]
   },
   "1-5": {
    "floor_material_boundary_x_px": 1215,
    "hole_stage_count": 4
   }
  }
 },
 "start_stone_floor": {
  "file": "start_stone_floor.png",
  "size_px": [
   250,
   60
  ],
  "world_scale": "1m=125px",
  "width_m": 2,
  "top_y_px": 865,
  "placement": {
   "top_left_y_px": 865,
   "right_edge_x_px": "set equal to narrow_beam left edge x",
   "example_x_px": 250
  },
  "pivot_px": [
   0,
   0
  ],
  "walkable_top_local_y_px": 0,
  "collision": {
   "type": "static_rough_stone",
   "friction": "higher than ice; engine sets coefficient",
   "rect_local_px": [
    0,
    0,
    250,
    60
   ]
  },
  "notes": [
   "Place the object with its top edge at the corridor character foot baseline y=865.",
   "The right edge contains a small frost seam and meets the narrow beam at the same top height.",
   "The 250px top is a full 2m rough-stone launch surface; background ice remains smooth beyond its boundary."
  ]
 },
 "extra_objects_v1": {
  "corridor_door.png": {
   "size": [
    309,
    440
   ]
  },
  "curse_seal.png": {
   "size": [
    309,
    440
   ]
  },
  "pit_with_golem.png": {
   "size": [
    430,
    105
   ]
  },
  "brake_line.png": {
   "size": [
    145,
    15
   ]
  },
  "lake_shore_left.png": {
   "size": [
    500,
    90
   ],
   "pivot": [
    0,
    30
   ],
   "scene": "1-3_ice_lake"
  },
  "lake_shore_right.png": {
   "size": [
    500,
    90
   ],
   "pivot": [
    0,
    30
   ],
   "scene": "1-3_ice_lake"
  },
  "frozen_puddle.png": {
   "size": [
    250,
    99
   ],
   "pivot": [
    125,
    49
   ],
   "scene": "1-5_rough_floor",
   "stage": 0
  },
  "frozen_key.png": {
   "size": [
    96,
    48
   ],
   "pivot": [
    48,
    24
   ],
   "scene": "1-5_rough_floor"
  },
  "stone_box_20kg.png": {
   "size": [
    90,
    62
   ],
   "pivot": [
    45,
    62
   ],
   "scene": "1-1_castle_lever"
  },
  "stone_box_60kg.png": {
   "size": [
    125,
    90
   ],
   "pivot": [
    62,
    90
   ],
   "scene": "1-1_castle_lever"
  },
  "ice_gate.png": {
   "size": [
    310,
    440
   ],
   "pivot": [
    155,
    440
   ],
   "scene": "1-3_ice_lake"
  },
  "ice_gate_broken.png": {
   "size": [
    310,
    440
   ],
   "pivot": [
    155,
    440
   ],
   "scene": "1-3_ice_lake"
  }
 },
 "act2_objects": {
  "parts": {
   "3a": {
    "pixel_per_meter": 125,
    "coordinate_convention": "half-open [x0,y0,x1,y1]; x1,y1 excluded",
    "assets": {
     "amber_rod": {
      "kind": "2-1",
      "size": [
       75,
       20
      ],
      "pivot": [
       37,
       10
      ],
      "states": {
       "default": "amber_rod.png"
      },
      "loop": false
     },
     "amber_rod_icon": {
      "kind": "2-1",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "states": {
       "default": "amber_rod_icon.png"
      },
      "loop": false
     },
     "fur": {
      "kind": "2-1",
      "size": [
       50,
       40
      ],
      "pivot": [
       25,
       20
      ],
      "states": {
       "default": "fur.png"
      },
      "loop": false
     },
     "fur_icon": {
      "kind": "2-1",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "states": {
       "default": "fur_icon.png"
      },
      "loop": false
     },
     "feather": {
      "kind": "2-1",
      "size": [
       50,
       20
      ],
      "pivot": [
       25,
       10
      ],
      "states": {
       "normal": "feather_normal.png",
       "charged": "feather_charged.png"
      },
      "loop": false
     },
     "charged_stone": {
      "kind": "2-1",
      "size": [
       63,
       63
      ],
      "pivot": [
       31,
       63
      ],
      "states": {
       "neutral": "charged_stone_neutral.png",
       "plus": "charged_stone_plus.png",
       "minus": "charged_stone_minus.png"
      },
      "loop": false
     },
     "spark_small": {
      "kind": "2-1",
      "size": [
       64,
       64
      ],
      "pivot": [
       32,
       32
      ],
      "states": {
       "01": "spark_small_01.png",
       "02": "spark_small_02.png",
       "03": "spark_small_03.png",
       "04": "spark_small_04.png"
      },
      "loop": true
     },
     "vacuum_tube": {
      "kind": "2-1",
      "size": [
       75,
       188
      ],
      "pivot": [
       37,
       188
      ],
      "states": {
       "default": "vacuum_tube.png"
      },
      "loop": false
     },
     "metal_plate": {
      "kind": "2-1",
      "size": [
       19,
       312
      ],
      "pivot": [
       9,
       312
      ],
      "states": {
       "neutral": "metal_plate_neutral.png",
       "plus": "metal_plate_plus.png",
       "minus": "metal_plate_minus.png"
      },
      "loop": false
     },
     "metal_plate_glow": {
      "kind": "2-1",
      "size": [
       19,
       312
      ],
      "pivot": [
       9,
       312
      ],
      "states": {
       "plus": "metal_plate_glow_plus.png",
       "minus": "metal_plate_glow_minus.png"
      },
      "loop": false
     },
     "circuit_board": {
      "kind": "2-2",
      "size": [
       500,
       312
      ],
      "pivot": [
       250,
       0
      ],
      "states": {
       "series": "circuit_board_series.png",
       "parallel": "circuit_board_parallel.png"
      },
      "loop": false,
      "slot_centers_by_state": {
       "series": {
        "mana_stone": [
         68,
         156
        ],
        "resistors": [
         [
          174,
          156
         ],
         [
          279,
          156
         ],
         [
          384,
          156
         ]
        ]
       },
       "parallel": {
        "mana_stone": [
         68,
         156
        ],
        "resistors": [
         [
          276,
          82
         ],
         [
          276,
          156
         ],
         [
          276,
          230
         ]
        ]
       }
      }
     },
     "lamp": {
      "kind": "2-2",
      "size": [
       60,
       100
      ],
      "pivot": [
       30,
       0
      ],
      "states": {
       "off": "lamp_off.png",
       "dim": "lamp_dim.png",
       "normal": "lamp_normal.png",
       "bright": "lamp_bright.png"
      },
      "loop": false
     },
     "lamp_glow": {
      "kind": "2-2",
      "size": [
       300,
       300
      ],
      "pivot": [
       150,
       100
      ],
      "states": {
       "off": "lamp_glow_off.png",
       "dim": "lamp_glow_dim.png",
       "normal": "lamp_glow_normal.png",
       "bright": "lamp_glow_bright.png"
      },
      "loop": false,
      "notes": "Place the 300x300 overlay at the same world pivot as lamp; off has no overlay.",
      "glow_diameter_px": {
       "dim": 80,
       "normal": 160,
       "bright": 280
      }
     },
     "mana_stone": {
      "kind": "2-2",
      "size": [
       50,
       50
      ],
      "pivot": [
       25,
       25
      ],
      "states": {
       "default": "mana_stone.png"
      },
      "loop": false
     },
     "resistor_crystal": {
      "kind": "2-2",
      "size": [
       38,
       38
      ],
      "pivot": [
       19,
       19
      ],
      "states": {
       "default": "resistor_crystal.png"
      },
      "loop": false
     },
     "wire_straight": {
      "kind": "2-2",
      "size": [
       64,
       64
      ],
      "pivot": [
       32,
       32
      ],
      "states": {
       "normal": "wire_straight_normal.png",
       "hot": "wire_straight_hot.png",
       "broken": "wire_straight_broken.png"
      },
      "loop": false
     },
     "wire_corner": {
      "kind": "2-2",
      "size": [
       64,
       64
      ],
      "pivot": [
       32,
       32
      ],
      "states": {
       "normal": "wire_corner_normal.png",
       "hot": "wire_corner_hot.png",
       "broken": "wire_corner_broken.png"
      },
      "loop": false
     },
     "wire_branch": {
      "kind": "2-2",
      "size": [
       64,
       64
      ],
      "pivot": [
       32,
       32
      ],
      "states": {
       "normal": "wire_branch_normal.png",
       "hot": "wire_branch_hot.png",
       "broken": "wire_branch_broken.png"
      },
      "loop": false
     },
     "stairs_f2": {
      "kind": "2-2",
      "size": [
       380,
       585
      ],
      "pivot": [
       190,
       585
      ],
      "states": {
       "01": "stairs_f2_01.png",
       "02": "stairs_f2_02.png",
       "03": "stairs_f2_03.png",
       "04": "stairs_f2_04.png"
      },
      "loop": false,
      "top_left": [
       1500,
       280
      ]
     },
     "lightning_box": {
      "kind": "2-3",
      "size": [
       125,
       125
      ],
      "pivot": [
       62,
       125
      ],
      "states": {
       "small_close": "lightning_box_small_close.png",
       "small_wide": "lightning_box_small_wide.png",
       "large_close": "lightning_box_large_close.png",
       "large_wide": "lightning_box_large_wide.png"
      },
      "loop": false,
      "plate_geometry": {
       "large_wide": {
        "x0": 22,
        "x1": 102,
        "upper_y": 42,
        "lower_y": 80,
        "plate_height": 8,
        "plate_width": 80,
        "clear_gap": 30,
        "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
       },
       "small_close": {
        "x0": 47,
        "x1": 77,
        "upper_y": 54,
        "lower_y": 68,
        "plate_height": 8,
        "plate_width": 30,
        "clear_gap": 6,
        "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
       },
       "small_wide": {
        "x0": 47,
        "x1": 77,
        "upper_y": 42,
        "lower_y": 80,
        "plate_height": 8,
        "plate_width": 30,
        "clear_gap": 30,
        "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
       },
       "large_close": {
        "x0": 22,
        "x1": 102,
        "upper_y": 54,
        "lower_y": 68,
        "plate_height": 8,
        "plate_width": 80,
        "clear_gap": 6,
        "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
       }
      }
     },
     "box_charge_glow_small_close": {
      "kind": "2-3",
      "size": [
       125,
       125
      ],
      "pivot": [
       62,
       125
      ],
      "states": {
       "00": "box_charge_glow_small_close_00.png",
       "30": "box_charge_glow_small_close_30.png",
       "70": "box_charge_glow_small_close_70.png",
       "100": "box_charge_glow_small_close_100.png"
      },
      "loop": false,
      "plate_geometry": {
       "x0": 47,
       "x1": 77,
       "upper_y": 54,
       "lower_y": 68,
       "plate_height": 8,
       "plate_width": 30,
       "clear_gap": 6,
       "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
      }
     },
     "box_charge_glow_small_wide": {
      "kind": "2-3",
      "size": [
       125,
       125
      ],
      "pivot": [
       62,
       125
      ],
      "states": {
       "00": "box_charge_glow_small_wide_00.png",
       "30": "box_charge_glow_small_wide_30.png",
       "70": "box_charge_glow_small_wide_70.png",
       "100": "box_charge_glow_small_wide_100.png"
      },
      "loop": false,
      "plate_geometry": {
       "x0": 47,
       "x1": 77,
       "upper_y": 42,
       "lower_y": 80,
       "plate_height": 8,
       "plate_width": 30,
       "clear_gap": 30,
       "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
      }
     },
     "box_charge_glow_large_close": {
      "kind": "2-3",
      "size": [
       125,
       125
      ],
      "pivot": [
       62,
       125
      ],
      "states": {
       "00": "box_charge_glow_large_close_00.png",
       "30": "box_charge_glow_large_close_30.png",
       "70": "box_charge_glow_large_close_70.png",
       "100": "box_charge_glow_large_close_100.png"
      },
      "loop": false,
      "plate_geometry": {
       "x0": 22,
       "x1": 102,
       "upper_y": 54,
       "lower_y": 68,
       "plate_height": 8,
       "plate_width": 80,
       "clear_gap": 6,
       "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
      }
     },
     "box_charge_glow_large_wide": {
      "kind": "2-3",
      "size": [
       125,
       125
      ],
      "pivot": [
       62,
       125
      ],
      "states": {
       "00": "box_charge_glow_large_wide_00.png",
       "30": "box_charge_glow_large_wide_30.png",
       "70": "box_charge_glow_large_wide_70.png",
       "100": "box_charge_glow_large_wide_100.png"
      },
      "loop": false,
      "plate_geometry": {
       "x0": 22,
       "x1": 102,
       "upper_y": 42,
       "lower_y": 80,
       "plate_height": 8,
       "plate_width": 80,
       "clear_gap": 30,
       "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
      }
     },
     "iron_door": {
      "kind": "2-3",
      "size": [
       312,
       437
      ],
      "pivot": [
       156,
       437
      ],
      "states": {
       "closed": "iron_door_closed.png",
       "opening_01": "iron_door_opening_01.png",
       "opening_02": "iron_door_opening_02.png",
       "opening_03": "iron_door_opening_03.png",
       "opening_04": "iron_door_opening_04.png"
      },
      "loop": false
     },
     "touch_slab": {
      "kind": "2-3",
      "size": [
       125,
       175
      ],
      "pivot": [
       62,
       0
      ],
      "states": {
       "off": "touch_slab_off.png",
       "on": "touch_slab_on.png",
       "no_response": "touch_slab_no_response.png"
      },
      "loop": false
     },
     "touch_slab_glow": {
      "kind": "2-3",
      "size": [
       125,
       175
      ],
      "pivot": [
       62,
       0
      ],
      "states": {
       "off": "touch_slab_glow_off.png",
       "on": "touch_slab_glow_on.png",
       "no_response": "touch_slab_glow_no_response.png"
      },
      "loop": false
     },
     "rubber_glove": {
      "kind": "2-3",
      "size": [
       50,
       50
      ],
      "pivot": [
       25,
       25
      ],
      "states": {
       "default": "rubber_glove.png"
      },
      "loop": false
     },
     "rubber_glove_icon": {
      "kind": "2-3",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "states": {
       "default": "rubber_glove_icon.png"
      },
      "loop": false
     },
     "wooden_stick": {
      "kind": "2-3",
      "size": [
       50,
       50
      ],
      "pivot": [
       25,
       25
      ],
      "states": {
       "default": "wooden_stick.png"
      },
      "loop": false
     },
     "wooden_stick_icon": {
      "kind": "2-3",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "states": {
       "default": "wooden_stick_icon.png"
      },
      "loop": false
     }
    },
    "scene_placements": {
     "tower_f1": {
      "metal_plate_left": {
       "top_left": [
        1881,
        553
       ],
       "asset": "metal_plate"
      },
      "metal_plate_right": {
       "top_left": [
        2275,
        553
       ],
       "asset": "metal_plate"
      },
      "vacuum_tube_suggested": {
       "top_left": [
        962,
        677
       ],
       "asset": "vacuum_tube"
      }
     },
     "tower_f2": {
      "circuit_board": {
       "top_left": [
        510,
        420
       ]
      },
      "lamps": [
       {
        "top_left": [
         111,
         167
        ],
        "hanging_center": [
         141,
         167
        ]
       },
       {
        "top_left": [
         692,
         134
        ],
        "hanging_center": [
         722,
         134
        ]
       },
       {
        "top_left": [
         1110,
         168
        ],
        "hanging_center": [
         1140,
         168
        ]
       },
       {
        "top_left": [
         1611,
         135
        ],
        "hanging_center": [
         1641,
         135
        ]
       }
      ],
      "stairs_f2": {
       "top_left": [
        1500,
        280
       ]
      }
     },
     "tower_f3": {
      "iron_door": {
       "top_left": [
        1044,
        428
       ]
      },
      "touch_slab": {
       "top_left": [
        1700,
        590
       ]
      }
     }
    },
    "notes": [
     "Every state of one object has an identical RGBA canvas and pivot.",
     "Glow and charge light PNGs contain no solid body; composite them above the matching body.",
     "Use the 2a_v2 background rectangles without resizing these objects.",
     "Preview sheets use dark backing only; all game asset PNGs remain transparent.",
     "3a patch: stairs 02-04 moved down 43 px; lamp glow uses a 300x300 top-centred overlay; capacitor plate coordinates are half-open."
    ],
    "asset_file_count": 78
   },
   "3b": {
    "pixel_per_meter": 125,
    "coordinate_convention": "half-open rectangles [x0,y0,x1,y1]",
    "assets": {
     "vault_3": {
      "scene": "2-4",
      "size": [
       376,
       300
      ],
      "pivot": [
       188,
       300
      ],
      "states": {
       "body": "vault_3_body.png"
      },
      "mount": "wall-face; base at floor",
      "door_placements": {
       "iron": {
        "top_left_in_vault": [
         18,
         91
        ],
        "size": [
         112,
         157
        ]
       },
       "aluminum": {
        "top_left_in_vault": [
         132,
         91
        ],
        "size": [
         112,
         157
        ]
       },
       "copper": {
        "top_left_in_vault": [
         246,
         91
        ],
        "size": [
         112,
         157
        ]
       }
      }
     },
     "vault_3_door_iron": {
      "scene": "2-4",
      "size": [
       112,
       157
      ],
      "pivot": [
       56,
       0
      ],
      "states": {
       "closed": "vault_3_door_iron_closed.png",
       "open": "vault_3_door_iron_open.png"
      },
      "top_left_in_vault": [
       18,
       91
      ],
      "hinge_local": [
       5,
       78
      ]
     },
     "vault_3_door_aluminum": {
      "scene": "2-4",
      "size": [
       112,
       157
      ],
      "pivot": [
       56,
       0
      ],
      "states": {
       "closed": "vault_3_door_aluminum_closed.png",
       "open": "vault_3_door_aluminum_open.png"
      },
      "top_left_in_vault": [
       132,
       91
      ],
      "hinge_local": [
       5,
       78
      ]
     },
     "vault_3_door_copper": {
      "scene": "2-4",
      "size": [
       112,
       157
      ],
      "pivot": [
       56,
       0
      ],
      "states": {
       "closed": "vault_3_door_copper_closed.png",
       "open": "vault_3_door_copper_open.png"
      },
      "top_left_in_vault": [
       246,
       91
      ],
      "hinge_local": [
       5,
       78
      ]
     },
     "key_iron": {
      "scene": "2-4",
      "size": [
       40,
       40
      ],
      "pivot": [
       20,
       20
      ],
      "states": {
       "default": "key_iron.png"
      }
     },
     "key_iron_icon": {
      "scene": "2-4",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "states": {
       "default": "key_iron_icon.png"
      }
     },
     "key_aluminum": {
      "scene": "2-4",
      "size": [
       40,
       40
      ],
      "pivot": [
       20,
       20
      ],
      "states": {
       "default": "key_aluminum.png"
      }
     },
     "key_aluminum_icon": {
      "scene": "2-4",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "states": {
       "default": "key_aluminum_icon.png"
      }
     },
     "key_copper": {
      "scene": "2-4",
      "size": [
       40,
       40
      ],
      "pivot": [
       20,
       20
      ],
      "states": {
       "default": "key_copper.png"
      }
     },
     "key_copper_icon": {
      "scene": "2-4",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "states": {
       "default": "key_copper_icon.png"
      }
     },
     "magnet_hook": {
      "scene": "2-4",
      "size": [
       60,
       60
      ],
      "pivot": [
       30,
       30
      ],
      "states": {
       "default": "magnet_hook.png"
      }
     },
     "magnet_hook_icon": {
      "scene": "2-4",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "states": {
       "default": "magnet_hook_icon.png"
      }
     },
     "graphite_stand": {
      "scene": "2-4",
      "size": [
       125,
       40
      ],
      "pivot": [
       62,
       40
      ],
      "states": {
       "default": "graphite_stand.png"
      }
     },
     "graphite_plate": {
      "scene": "2-4",
      "size": [
       100,
       12
      ],
      "pivot": [
       50,
       12
      ],
      "states": {
       "default": "graphite_plate.png"
      },
      "suggested_offset_from_stand_top_left": [
       12,
       -20
      ]
     },
     "magnet_glove_icon": {
      "scene": "2-4",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "states": {
       "default": "magnet_glove_icon.png"
      }
     },
     "elevator_platform": {
      "scene": "2-5",
      "size": [
       312,
       40
      ],
      "pivot": [
       156,
       40
      ],
      "states": {
       "default": "elevator_platform.png"
      }
     },
     "elevator_rope": {
      "scene": "2-5",
      "size": [
       312,
       64
      ],
      "pivot": [
       156,
       0
      ],
      "states": {
       "tile": "elevator_rope_tile.png"
      },
      "tile_axis": "y",
      "tile_period_px": 64,
      "rope_center_x": [
       24,
       288
      ]
     },
     "motor": {
      "scene": "2-5",
      "size": [
       125,
       125
      ],
      "pivot": [
       62,
       125
      ],
      "states": {
       "body": "motor_body.png"
      },
      "rotor_mount_local": [
       62,
       61
      ]
     },
     "motor_rotor": {
      "scene": "2-5",
      "size": [
       62,
       62
      ],
      "pivot": [
       31,
       31
      ],
      "states": {
       "default": "motor_rotor.png"
      },
      "rotation_axis_local": [
       31,
       31
      ],
      "mount_in_motor": [
       62,
       61
      ],
      "rotational_symmetry_degrees": 90
     },
     "compass": {
      "scene": "2-5",
      "size": [
       63,
       63
      ],
      "pivot": [
       31,
       31
      ],
      "states": {
       "base": "compass_base.png"
      },
      "needle_mount_local": [
       31,
       31
      ]
     },
     "compass_needle": {
      "scene": "2-5",
      "size": [
       63,
       63
      ],
      "pivot": [
       31,
       31
      ],
      "states": {
       "default": "compass_needle.png"
      },
      "rotation_axis_local": [
       31,
       31
      ],
      "mount_in_compass": [
       31,
       31
      ]
     },
     "coil": {
      "scene": "2-5",
      "size": [
       100,
       60
      ],
      "pivot": [
       50,
       60
      ],
      "states": {
       "few": "coil_few.png",
       "normal": "coil_normal.png",
       "many": "coil_many.png"
      },
      "turns": {
       "few": 3,
       "normal": 6,
       "many": 12
      }
     },
     "bar_magnet_small": {
      "scene": "2-5",
      "size": [
       50,
       15
      ],
      "pivot": [
       25,
       7
      ],
      "states": {
       "default": "bar_magnet_small.png"
      }
     },
     "bar_magnet_medium": {
      "scene": "2-5",
      "size": [
       80,
       22
      ],
      "pivot": [
       40,
       11
      ],
      "states": {
       "default": "bar_magnet_medium.png"
      }
     },
     "bar_magnet_large": {
      "scene": "2-5",
      "size": [
       120,
       32
      ],
      "pivot": [
       60,
       16
      ],
      "states": {
       "default": "bar_magnet_large.png"
      }
     },
     "direction_switch": {
      "scene": "2-5",
      "size": [
       50,
       50
      ],
      "pivot": [
       25,
       50
      ],
      "states": {
       "left": "direction_switch_left.png",
       "right": "direction_switch_right.png"
      }
     },
     "speaker_part_magnet": {
      "scene": "2-5",
      "size": [
       50,
       50
      ],
      "pivot": [
       25,
       25
      ],
      "states": {
       "default": "speaker_part_magnet.png"
      }
     },
     "speaker_part_coil": {
      "scene": "2-5",
      "size": [
       50,
       50
      ],
      "pivot": [
       25,
       25
      ],
      "states": {
       "default": "speaker_part_coil.png"
      }
     },
     "speaker_part_cone": {
      "scene": "2-5",
      "size": [
       50,
       50
      ],
      "pivot": [
       25,
       25
      ],
      "states": {
       "default": "speaker_part_cone.png"
      }
     },
     "speaker_assembled": {
      "scene": "2-5",
      "size": [
       75,
       75
      ],
      "pivot": [
       37,
       75
      ],
      "states": {
       "default": "speaker_assembled.png"
      }
     },
     "electromagnet_trap": {
      "scene": "2-5",
      "size": [
       375,
       50
      ],
      "pivot": [
       187,
       50
      ],
      "states": {
       "off": "electromagnet_trap_off.png",
       "on": "electromagnet_trap_on.png"
      }
     },
     "electromagnet_trap_glow": {
      "scene": "2-5",
      "size": [
       525,
       180
      ],
      "pivot": [
       262,
       130
      ],
      "states": {
       "on": "electromagnet_trap_glow_on.png"
      },
      "body_asset": "electromagnet_trap",
      "body_state": "on"
     },
     "coil_gate": {
      "scene": "2-6",
      "size": [
       375,
       500
      ],
      "pivot": [
       187,
       500
      ],
      "states": {
       "off": "coil_gate_off.png",
       "glow": "coil_gate_glow.png",
       "open_01": "coil_gate_open_01.png",
       "open_02": "coil_gate_open_02.png",
       "open_03": "coil_gate_open_03.png",
       "open_04": "coil_gate_open_04.png"
      }
     },
     "coil_gate_glow": {
      "scene": "2-6",
      "size": [
       575,
       650
      ],
      "pivot": [
       287,
       575
      ],
      "states": {
       "glow": "coil_gate_glow_glow.png"
      },
      "body_asset": "coil_gate"
     },
     "beacon": {
      "scene": "2-6",
      "size": [
       200,
       190
      ],
      "pivot": [
       100,
       190
      ],
      "states": {
       "off": "beacon_off.png"
      },
      "fire_mount_local": [
       100,
       35
      ]
     },
     "beacon_fire": {
      "scene": "2-6",
      "size": [
       300,
       300
      ],
      "pivot": [
       150,
       230
      ],
      "states": {
       "01": "beacon_fire_01.png",
       "02": "beacon_fire_02.png",
       "03": "beacon_fire_03.png",
       "04": "beacon_fire_04.png"
      },
      "loop": true,
      "body_asset": "beacon",
      "rotation_or_mount": "Flame base at pivot; composite this pivot onto beacon local (100,35).",
      "mount_in_beacon": [
       100,
       35
      ],
      "visible_target_px": {
       "base_width": 170,
       "height": 200
      }
     },
     "beacon_glow": {
      "scene": "2-6",
      "size": [
       600,
       600
      ],
      "pivot": [
       300,
       500
      ],
      "states": {
       "on": "beacon_glow_on.png"
      },
      "body_asset": "beacon",
      "center_alpha_approx": 153,
      "glow_center_local": [
       300,
       245
      ]
     },
     "coil_sender": {
      "scene": "2-6",
      "size": [
       125,
       125
      ],
      "pivot": [
       62,
       125
      ],
      "states": {
       "base": "coil_sender_base.png"
      },
      "coil_mount_local": [
       62,
       36
      ]
     },
     "coil_sender_body": {
      "scene": "2-6",
      "size": [
       92,
       64
      ],
      "pivot": [
       46,
       32
      ],
      "states": {
       "default": "coil_sender_body.png"
      },
      "rotation_axis_local": [
       46,
       32
      ],
      "mount_in_base": [
       62,
       36
      ]
     },
     "coil_receiver": {
      "scene": "2-6",
      "size": [
       125,
       125
      ],
      "pivot": [
       62,
       125
      ],
      "states": {
       "base": "coil_receiver_base.png"
      },
      "coil_mount_local": [
       62,
       36
      ]
     },
     "coil_receiver_body": {
      "scene": "2-6",
      "size": [
       92,
       64
      ],
      "pivot": [
       46,
       32
      ],
      "states": {
       "default": "coil_receiver_body.png"
      },
      "rotation_axis_local": [
       46,
       32
      ],
      "mount_in_base": [
       62,
       36
      ]
     },
     "village_lamp": {
      "scene": "2-6",
      "size": [
       24,
       24
      ],
      "pivot": [
       12,
       0
      ],
      "states": {
       "off": "village_lamp_off.png",
       "on": "village_lamp_on.png"
      }
     },
     "village_lamp_glow": {
      "scene": "2-6",
      "size": [
       80,
       80
      ],
      "pivot": [
       40,
       28
      ],
      "states": {
       "on": "village_lamp_glow_on.png"
      },
      "body_asset": "village_lamp"
     }
    },
    "scene_placements": {
     "tower_f4": {
      "vault_3": {
       "top_left": [
        1012,
        565
       ],
       "size": [
        376,
        300
       ]
      },
      "vault_door_top_left_in_vault": {
       "iron": {
        "top_left_in_vault": [
         18,
         91
        ],
        "size": [
         112,
         157
        ]
       },
       "aluminum": {
        "top_left_in_vault": [
         132,
         91
        ],
        "size": [
         112,
         157
        ]
       },
       "copper": {
        "top_left_in_vault": [
         246,
         91
        ],
        "size": [
         112,
         157
        ]
       }
      },
      "graphite_plate_relative_to_stand": [
       12,
       -20
      ]
     },
     "tower_f5": {
      "elevator_shaft": [
       200,
       0,
       512,
       1080
      ],
      "elevator_platform_suggested_top_left": [
       200,
       825
      ],
      "electromagnet_trap": {
       "top_left": [
        1000,
        865
       ],
       "size": [
        375,
        50
       ]
      },
      "electromagnet_trap_glow_shared_world_pivot": [
       1187,
       915
      ]
     },
     "tower_top": {
      "coil_gate": {
       "top_left": [
        1312,
        365
       ],
       "size": [
        375,
        500
       ]
      },
      "beacon": {
       "top_left": [
        2650,
        675
       ],
       "size": [
        200,
        190
       ]
      },
      "village_lamps": [
       {
        "center": [
         565,
         703
        ],
        "body_top_left": [
         553,
         691
        ],
        "world_pivot": [
         565,
         691
        ]
       },
       {
        "center": [
         605,
         714
        ],
        "body_top_left": [
         593,
         702
        ],
        "world_pivot": [
         605,
         702
        ]
       },
       {
        "center": [
         637,
         731
        ],
        "body_top_left": [
         625,
         719
        ],
        "world_pivot": [
         637,
         719
        ]
       },
       {
        "center": [
         710,
         635
        ],
        "body_top_left": [
         698,
         623
        ],
        "world_pivot": [
         710,
         623
        ]
       },
       {
        "center": [
         815,
         678
        ],
        "body_top_left": [
         803,
         666
        ],
        "world_pivot": [
         815,
         666
        ]
       },
       {
        "center": [
         951,
         704
        ],
        "body_top_left": [
         939,
         692
        ],
        "world_pivot": [
         951,
         692
        ]
       },
       {
        "center": [
         982,
         735
        ],
        "body_top_left": [
         970,
         723
        ],
        "world_pivot": [
         982,
         723
        ]
       },
       {
        "center": [
         1035,
         707
        ],
        "body_top_left": [
         1023,
         695
        ],
        "world_pivot": [
         1035,
         695
        ]
       },
       {
        "center": [
         1161,
         621
        ],
        "body_top_left": [
         1149,
         609
        ],
        "world_pivot": [
         1161,
         609
        ]
       },
       {
        "center": [
         1283,
         716
        ],
        "body_top_left": [
         1271,
         704
        ],
        "world_pivot": [
         1283,
         704
        ]
       },
       {
        "center": [
         1331,
         709
        ],
        "body_top_left": [
         1319,
         697
        ],
        "world_pivot": [
         1331,
         697
        ]
       },
       {
        "center": [
         1397,
         727
        ],
        "body_top_left": [
         1385,
         715
        ],
        "world_pivot": [
         1397,
         715
        ]
       }
      ]
     }
    },
    "notes": [
     "All gameplay PNGs have a true transparent background.",
     "For each object, replace state PNGs at the same pivot without changing world position.",
     "Light overlays have their own size and pivot but share the world pivot with the body.",
     "Rotate rotor, compass needle, and coils about the listed local axes.",
     "3b patch: key silhouettes redrawn; fire overlay pivot [150,230] mounts at beacon [100,35]. Only listed sprite files changed."
    ],
    "asset_file_count": 59
   }
  },
  "assets": {
   "amber_rod": {
    "kind": "2-1",
    "size": [
     75,
     20
    ],
    "pivot": [
     37,
     10
    ],
    "states": {
     "default": "amber_rod.png"
    },
    "loop": false
   },
   "amber_rod_icon": {
    "kind": "2-1",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "states": {
     "default": "amber_rod_icon.png"
    },
    "loop": false
   },
   "fur": {
    "kind": "2-1",
    "size": [
     50,
     40
    ],
    "pivot": [
     25,
     20
    ],
    "states": {
     "default": "fur.png"
    },
    "loop": false
   },
   "fur_icon": {
    "kind": "2-1",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "states": {
     "default": "fur_icon.png"
    },
    "loop": false
   },
   "feather": {
    "kind": "2-1",
    "size": [
     50,
     20
    ],
    "pivot": [
     25,
     10
    ],
    "states": {
     "normal": "feather_normal.png",
     "charged": "feather_charged.png"
    },
    "loop": false
   },
   "charged_stone": {
    "kind": "2-1",
    "size": [
     63,
     63
    ],
    "pivot": [
     31,
     63
    ],
    "states": {
     "neutral": "charged_stone_neutral.png",
     "plus": "charged_stone_plus.png",
     "minus": "charged_stone_minus.png"
    },
    "loop": false
   },
   "spark_small": {
    "kind": "2-1",
    "size": [
     64,
     64
    ],
    "pivot": [
     32,
     32
    ],
    "states": {
     "01": "spark_small_01.png",
     "02": "spark_small_02.png",
     "03": "spark_small_03.png",
     "04": "spark_small_04.png"
    },
    "loop": true
   },
   "vacuum_tube": {
    "kind": "2-1",
    "size": [
     75,
     188
    ],
    "pivot": [
     37,
     188
    ],
    "states": {
     "default": "vacuum_tube.png"
    },
    "loop": false
   },
   "metal_plate": {
    "kind": "2-1",
    "size": [
     19,
     312
    ],
    "pivot": [
     9,
     312
    ],
    "states": {
     "neutral": "metal_plate_neutral.png",
     "plus": "metal_plate_plus.png",
     "minus": "metal_plate_minus.png"
    },
    "loop": false
   },
   "metal_plate_glow": {
    "kind": "2-1",
    "size": [
     19,
     312
    ],
    "pivot": [
     9,
     312
    ],
    "states": {
     "plus": "metal_plate_glow_plus.png",
     "minus": "metal_plate_glow_minus.png"
    },
    "loop": false
   },
   "circuit_board": {
    "kind": "2-2",
    "size": [
     500,
     312
    ],
    "pivot": [
     250,
     0
    ],
    "states": {
     "series": "circuit_board_series.png",
     "parallel": "circuit_board_parallel.png"
    },
    "loop": false,
    "slot_centers_by_state": {
     "series": {
      "mana_stone": [
       68,
       156
      ],
      "resistors": [
       [
        174,
        156
       ],
       [
        279,
        156
       ],
       [
        384,
        156
       ]
      ]
     },
     "parallel": {
      "mana_stone": [
       68,
       156
      ],
      "resistors": [
       [
        276,
        82
       ],
       [
        276,
        156
       ],
       [
        276,
        230
       ]
      ]
     }
    }
   },
   "lamp": {
    "kind": "2-2",
    "size": [
     60,
     100
    ],
    "pivot": [
     30,
     0
    ],
    "states": {
     "off": "lamp_off.png",
     "dim": "lamp_dim.png",
     "normal": "lamp_normal.png",
     "bright": "lamp_bright.png"
    },
    "loop": false
   },
   "lamp_glow": {
    "kind": "2-2",
    "size": [
     300,
     300
    ],
    "pivot": [
     150,
     100
    ],
    "states": {
     "off": "lamp_glow_off.png",
     "dim": "lamp_glow_dim.png",
     "normal": "lamp_glow_normal.png",
     "bright": "lamp_glow_bright.png"
    },
    "loop": false,
    "notes": "Place the 300x300 overlay at the same world pivot as lamp; off has no overlay.",
    "glow_diameter_px": {
     "dim": 80,
     "normal": 160,
     "bright": 280
    }
   },
   "mana_stone": {
    "kind": "2-2",
    "size": [
     50,
     50
    ],
    "pivot": [
     25,
     25
    ],
    "states": {
     "default": "mana_stone.png"
    },
    "loop": false
   },
   "resistor_crystal": {
    "kind": "2-2",
    "size": [
     38,
     38
    ],
    "pivot": [
     19,
     19
    ],
    "states": {
     "default": "resistor_crystal.png"
    },
    "loop": false
   },
   "wire_straight": {
    "kind": "2-2",
    "size": [
     64,
     64
    ],
    "pivot": [
     32,
     32
    ],
    "states": {
     "normal": "wire_straight_normal.png",
     "hot": "wire_straight_hot.png",
     "broken": "wire_straight_broken.png"
    },
    "loop": false
   },
   "wire_corner": {
    "kind": "2-2",
    "size": [
     64,
     64
    ],
    "pivot": [
     32,
     32
    ],
    "states": {
     "normal": "wire_corner_normal.png",
     "hot": "wire_corner_hot.png",
     "broken": "wire_corner_broken.png"
    },
    "loop": false
   },
   "wire_branch": {
    "kind": "2-2",
    "size": [
     64,
     64
    ],
    "pivot": [
     32,
     32
    ],
    "states": {
     "normal": "wire_branch_normal.png",
     "hot": "wire_branch_hot.png",
     "broken": "wire_branch_broken.png"
    },
    "loop": false
   },
   "stairs_f2": {
    "kind": "2-2",
    "size": [
     380,
     585
    ],
    "pivot": [
     190,
     585
    ],
    "states": {
     "01": "stairs_f2_01.png",
     "02": "stairs_f2_02.png",
     "03": "stairs_f2_03.png",
     "04": "stairs_f2_04.png"
    },
    "loop": false,
    "top_left": [
     1500,
     280
    ]
   },
   "lightning_box": {
    "kind": "2-3",
    "size": [
     125,
     125
    ],
    "pivot": [
     62,
     125
    ],
    "states": {
     "small_close": "lightning_box_small_close.png",
     "small_wide": "lightning_box_small_wide.png",
     "large_close": "lightning_box_large_close.png",
     "large_wide": "lightning_box_large_wide.png"
    },
    "loop": false,
    "plate_geometry": {
     "large_wide": {
      "x0": 22,
      "x1": 102,
      "upper_y": 42,
      "lower_y": 80,
      "plate_height": 8,
      "plate_width": 80,
      "clear_gap": 30,
      "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
     },
     "small_close": {
      "x0": 47,
      "x1": 77,
      "upper_y": 54,
      "lower_y": 68,
      "plate_height": 8,
      "plate_width": 30,
      "clear_gap": 6,
      "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
     },
     "small_wide": {
      "x0": 47,
      "x1": 77,
      "upper_y": 42,
      "lower_y": 80,
      "plate_height": 8,
      "plate_width": 30,
      "clear_gap": 30,
      "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
     },
     "large_close": {
      "x0": 22,
      "x1": 102,
      "upper_y": 54,
      "lower_y": 68,
      "plate_height": 8,
      "plate_width": 80,
      "clear_gap": 6,
      "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
     }
    }
   },
   "box_charge_glow_small_close": {
    "kind": "2-3",
    "size": [
     125,
     125
    ],
    "pivot": [
     62,
     125
    ],
    "states": {
     "00": "box_charge_glow_small_close_00.png",
     "30": "box_charge_glow_small_close_30.png",
     "70": "box_charge_glow_small_close_70.png",
     "100": "box_charge_glow_small_close_100.png"
    },
    "loop": false,
    "plate_geometry": {
     "x0": 47,
     "x1": 77,
     "upper_y": 54,
     "lower_y": 68,
     "plate_height": 8,
     "plate_width": 30,
     "clear_gap": 6,
     "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
    }
   },
   "box_charge_glow_small_wide": {
    "kind": "2-3",
    "size": [
     125,
     125
    ],
    "pivot": [
     62,
     125
    ],
    "states": {
     "00": "box_charge_glow_small_wide_00.png",
     "30": "box_charge_glow_small_wide_30.png",
     "70": "box_charge_glow_small_wide_70.png",
     "100": "box_charge_glow_small_wide_100.png"
    },
    "loop": false,
    "plate_geometry": {
     "x0": 47,
     "x1": 77,
     "upper_y": 42,
     "lower_y": 80,
     "plate_height": 8,
     "plate_width": 30,
     "clear_gap": 30,
     "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
    }
   },
   "box_charge_glow_large_close": {
    "kind": "2-3",
    "size": [
     125,
     125
    ],
    "pivot": [
     62,
     125
    ],
    "states": {
     "00": "box_charge_glow_large_close_00.png",
     "30": "box_charge_glow_large_close_30.png",
     "70": "box_charge_glow_large_close_70.png",
     "100": "box_charge_glow_large_close_100.png"
    },
    "loop": false,
    "plate_geometry": {
     "x0": 22,
     "x1": 102,
     "upper_y": 54,
     "lower_y": 68,
     "plate_height": 8,
     "plate_width": 80,
     "clear_gap": 6,
     "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
    }
   },
   "box_charge_glow_large_wide": {
    "kind": "2-3",
    "size": [
     125,
     125
    ],
    "pivot": [
     62,
     125
    ],
    "states": {
     "00": "box_charge_glow_large_wide_00.png",
     "30": "box_charge_glow_large_wide_30.png",
     "70": "box_charge_glow_large_wide_70.png",
     "100": "box_charge_glow_large_wide_100.png"
    },
    "loop": false,
    "plate_geometry": {
     "x0": 22,
     "x1": 102,
     "upper_y": 42,
     "lower_y": 80,
     "plate_height": 8,
     "plate_width": 80,
     "clear_gap": 30,
     "coordinate_convention": "half-open; upper_y/lower_y are plate top edges"
    }
   },
   "iron_door": {
    "kind": "2-3",
    "size": [
     312,
     437
    ],
    "pivot": [
     156,
     437
    ],
    "states": {
     "closed": "iron_door_closed.png",
     "opening_01": "iron_door_opening_01.png",
     "opening_02": "iron_door_opening_02.png",
     "opening_03": "iron_door_opening_03.png",
     "opening_04": "iron_door_opening_04.png"
    },
    "loop": false
   },
   "touch_slab": {
    "kind": "2-3",
    "size": [
     125,
     175
    ],
    "pivot": [
     62,
     0
    ],
    "states": {
     "off": "touch_slab_off.png",
     "on": "touch_slab_on.png",
     "no_response": "touch_slab_no_response.png"
    },
    "loop": false
   },
   "touch_slab_glow": {
    "kind": "2-3",
    "size": [
     125,
     175
    ],
    "pivot": [
     62,
     0
    ],
    "states": {
     "off": "touch_slab_glow_off.png",
     "on": "touch_slab_glow_on.png",
     "no_response": "touch_slab_glow_no_response.png"
    },
    "loop": false
   },
   "rubber_glove": {
    "kind": "2-3",
    "size": [
     50,
     50
    ],
    "pivot": [
     25,
     25
    ],
    "states": {
     "default": "rubber_glove.png"
    },
    "loop": false
   },
   "rubber_glove_icon": {
    "kind": "2-3",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "states": {
     "default": "rubber_glove_icon.png"
    },
    "loop": false
   },
   "wooden_stick": {
    "kind": "2-3",
    "size": [
     50,
     50
    ],
    "pivot": [
     25,
     25
    ],
    "states": {
     "default": "wooden_stick.png"
    },
    "loop": false
   },
   "wooden_stick_icon": {
    "kind": "2-3",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "states": {
     "default": "wooden_stick_icon.png"
    },
    "loop": false
   },
   "vault_3": {
    "scene": "2-4",
    "size": [
     376,
     300
    ],
    "pivot": [
     188,
     300
    ],
    "states": {
     "body": "vault_3_body.png"
    },
    "mount": "wall-face; base at floor",
    "door_placements": {
     "iron": {
      "top_left_in_vault": [
       18,
       91
      ],
      "size": [
       112,
       157
      ]
     },
     "aluminum": {
      "top_left_in_vault": [
       132,
       91
      ],
      "size": [
       112,
       157
      ]
     },
     "copper": {
      "top_left_in_vault": [
       246,
       91
      ],
      "size": [
       112,
       157
      ]
     }
    }
   },
   "vault_3_door_iron": {
    "scene": "2-4",
    "size": [
     112,
     157
    ],
    "pivot": [
     56,
     0
    ],
    "states": {
     "closed": "vault_3_door_iron_closed.png",
     "open": "vault_3_door_iron_open.png"
    },
    "top_left_in_vault": [
     18,
     91
    ],
    "hinge_local": [
     5,
     78
    ]
   },
   "vault_3_door_aluminum": {
    "scene": "2-4",
    "size": [
     112,
     157
    ],
    "pivot": [
     56,
     0
    ],
    "states": {
     "closed": "vault_3_door_aluminum_closed.png",
     "open": "vault_3_door_aluminum_open.png"
    },
    "top_left_in_vault": [
     132,
     91
    ],
    "hinge_local": [
     5,
     78
    ]
   },
   "vault_3_door_copper": {
    "scene": "2-4",
    "size": [
     112,
     157
    ],
    "pivot": [
     56,
     0
    ],
    "states": {
     "closed": "vault_3_door_copper_closed.png",
     "open": "vault_3_door_copper_open.png"
    },
    "top_left_in_vault": [
     246,
     91
    ],
    "hinge_local": [
     5,
     78
    ]
   },
   "key_iron": {
    "scene": "2-4",
    "size": [
     40,
     40
    ],
    "pivot": [
     20,
     20
    ],
    "states": {
     "default": "key_iron.png"
    }
   },
   "key_iron_icon": {
    "scene": "2-4",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "states": {
     "default": "key_iron_icon.png"
    }
   },
   "key_aluminum": {
    "scene": "2-4",
    "size": [
     40,
     40
    ],
    "pivot": [
     20,
     20
    ],
    "states": {
     "default": "key_aluminum.png"
    }
   },
   "key_aluminum_icon": {
    "scene": "2-4",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "states": {
     "default": "key_aluminum_icon.png"
    }
   },
   "key_copper": {
    "scene": "2-4",
    "size": [
     40,
     40
    ],
    "pivot": [
     20,
     20
    ],
    "states": {
     "default": "key_copper.png"
    }
   },
   "key_copper_icon": {
    "scene": "2-4",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "states": {
     "default": "key_copper_icon.png"
    }
   },
   "magnet_hook": {
    "scene": "2-4",
    "size": [
     60,
     60
    ],
    "pivot": [
     30,
     30
    ],
    "states": {
     "default": "magnet_hook.png"
    }
   },
   "magnet_hook_icon": {
    "scene": "2-4",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "states": {
     "default": "magnet_hook_icon.png"
    }
   },
   "graphite_stand": {
    "scene": "2-4",
    "size": [
     125,
     40
    ],
    "pivot": [
     62,
     40
    ],
    "states": {
     "default": "graphite_stand.png"
    }
   },
   "graphite_plate": {
    "scene": "2-4",
    "size": [
     100,
     12
    ],
    "pivot": [
     50,
     12
    ],
    "states": {
     "default": "graphite_plate.png"
    },
    "suggested_offset_from_stand_top_left": [
     12,
     -20
    ]
   },
   "magnet_glove_icon": {
    "scene": "2-4",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "states": {
     "default": "magnet_glove_icon.png"
    }
   },
   "elevator_platform": {
    "scene": "2-5",
    "size": [
     312,
     40
    ],
    "pivot": [
     156,
     40
    ],
    "states": {
     "default": "elevator_platform.png"
    }
   },
   "elevator_rope": {
    "scene": "2-5",
    "size": [
     312,
     64
    ],
    "pivot": [
     156,
     0
    ],
    "states": {
     "tile": "elevator_rope_tile.png"
    },
    "tile_axis": "y",
    "tile_period_px": 64,
    "rope_center_x": [
     24,
     288
    ]
   },
   "motor": {
    "scene": "2-5",
    "size": [
     125,
     125
    ],
    "pivot": [
     62,
     125
    ],
    "states": {
     "body": "motor_body.png"
    },
    "rotor_mount_local": [
     62,
     61
    ]
   },
   "motor_rotor": {
    "scene": "2-5",
    "size": [
     62,
     62
    ],
    "pivot": [
     31,
     31
    ],
    "states": {
     "default": "motor_rotor.png"
    },
    "rotation_axis_local": [
     31,
     31
    ],
    "mount_in_motor": [
     62,
     61
    ],
    "rotational_symmetry_degrees": 90
   },
   "compass": {
    "scene": "2-5",
    "size": [
     63,
     63
    ],
    "pivot": [
     31,
     31
    ],
    "states": {
     "base": "compass_base.png"
    },
    "needle_mount_local": [
     31,
     31
    ]
   },
   "compass_needle": {
    "scene": "2-5",
    "size": [
     63,
     63
    ],
    "pivot": [
     31,
     31
    ],
    "states": {
     "default": "compass_needle.png"
    },
    "rotation_axis_local": [
     31,
     31
    ],
    "mount_in_compass": [
     31,
     31
    ]
   },
   "coil": {
    "scene": "2-5",
    "size": [
     100,
     60
    ],
    "pivot": [
     50,
     60
    ],
    "states": {
     "few": "coil_few.png",
     "normal": "coil_normal.png",
     "many": "coil_many.png"
    },
    "turns": {
     "few": 3,
     "normal": 6,
     "many": 12
    }
   },
   "bar_magnet_small": {
    "scene": "2-5",
    "size": [
     50,
     15
    ],
    "pivot": [
     25,
     7
    ],
    "states": {
     "default": "bar_magnet_small.png"
    }
   },
   "bar_magnet_medium": {
    "scene": "2-5",
    "size": [
     80,
     22
    ],
    "pivot": [
     40,
     11
    ],
    "states": {
     "default": "bar_magnet_medium.png"
    }
   },
   "bar_magnet_large": {
    "scene": "2-5",
    "size": [
     120,
     32
    ],
    "pivot": [
     60,
     16
    ],
    "states": {
     "default": "bar_magnet_large.png"
    }
   },
   "direction_switch": {
    "scene": "2-5",
    "size": [
     50,
     50
    ],
    "pivot": [
     25,
     50
    ],
    "states": {
     "left": "direction_switch_left.png",
     "right": "direction_switch_right.png"
    }
   },
   "speaker_part_magnet": {
    "scene": "2-5",
    "size": [
     50,
     50
    ],
    "pivot": [
     25,
     25
    ],
    "states": {
     "default": "speaker_part_magnet.png"
    }
   },
   "speaker_part_coil": {
    "scene": "2-5",
    "size": [
     50,
     50
    ],
    "pivot": [
     25,
     25
    ],
    "states": {
     "default": "speaker_part_coil.png"
    }
   },
   "speaker_part_cone": {
    "scene": "2-5",
    "size": [
     50,
     50
    ],
    "pivot": [
     25,
     25
    ],
    "states": {
     "default": "speaker_part_cone.png"
    }
   },
   "speaker_assembled": {
    "scene": "2-5",
    "size": [
     75,
     75
    ],
    "pivot": [
     37,
     75
    ],
    "states": {
     "default": "speaker_assembled.png"
    }
   },
   "electromagnet_trap": {
    "scene": "2-5",
    "size": [
     375,
     50
    ],
    "pivot": [
     187,
     50
    ],
    "states": {
     "off": "electromagnet_trap_off.png",
     "on": "electromagnet_trap_on.png"
    }
   },
   "electromagnet_trap_glow": {
    "scene": "2-5",
    "size": [
     525,
     180
    ],
    "pivot": [
     262,
     130
    ],
    "states": {
     "on": "electromagnet_trap_glow_on.png"
    },
    "body_asset": "electromagnet_trap",
    "body_state": "on"
   },
   "coil_gate": {
    "scene": "2-6",
    "size": [
     375,
     500
    ],
    "pivot": [
     187,
     500
    ],
    "states": {
     "off": "coil_gate_off.png",
     "glow": "coil_gate_glow.png",
     "open_01": "coil_gate_open_01.png",
     "open_02": "coil_gate_open_02.png",
     "open_03": "coil_gate_open_03.png",
     "open_04": "coil_gate_open_04.png"
    }
   },
   "coil_gate_glow": {
    "scene": "2-6",
    "size": [
     575,
     650
    ],
    "pivot": [
     287,
     575
    ],
    "states": {
     "glow": "coil_gate_glow_glow.png"
    },
    "body_asset": "coil_gate"
   },
   "beacon": {
    "scene": "2-6",
    "size": [
     200,
     190
    ],
    "pivot": [
     100,
     190
    ],
    "states": {
     "off": "beacon_off.png"
    },
    "fire_mount_local": [
     100,
     35
    ]
   },
   "beacon_fire": {
    "scene": "2-6",
    "size": [
     300,
     300
    ],
    "pivot": [
     150,
     230
    ],
    "states": {
     "01": "beacon_fire_01.png",
     "02": "beacon_fire_02.png",
     "03": "beacon_fire_03.png",
     "04": "beacon_fire_04.png"
    },
    "loop": true,
    "body_asset": "beacon",
    "rotation_or_mount": "Flame base at pivot; composite this pivot onto beacon local (100,35).",
    "mount_in_beacon": [
     100,
     35
    ],
    "visible_target_px": {
     "base_width": 170,
     "height": 200
    }
   },
   "beacon_glow": {
    "scene": "2-6",
    "size": [
     600,
     600
    ],
    "pivot": [
     300,
     500
    ],
    "states": {
     "on": "beacon_glow_on.png"
    },
    "body_asset": "beacon",
    "center_alpha_approx": 153,
    "glow_center_local": [
     300,
     245
    ]
   },
   "coil_sender": {
    "scene": "2-6",
    "size": [
     125,
     125
    ],
    "pivot": [
     62,
     125
    ],
    "states": {
     "base": "coil_sender_base.png"
    },
    "coil_mount_local": [
     62,
     36
    ]
   },
   "coil_sender_body": {
    "scene": "2-6",
    "size": [
     92,
     64
    ],
    "pivot": [
     46,
     32
    ],
    "states": {
     "default": "coil_sender_body.png"
    },
    "rotation_axis_local": [
     46,
     32
    ],
    "mount_in_base": [
     62,
     36
    ]
   },
   "coil_receiver": {
    "scene": "2-6",
    "size": [
     125,
     125
    ],
    "pivot": [
     62,
     125
    ],
    "states": {
     "base": "coil_receiver_base.png"
    },
    "coil_mount_local": [
     62,
     36
    ]
   },
   "coil_receiver_body": {
    "scene": "2-6",
    "size": [
     92,
     64
    ],
    "pivot": [
     46,
     32
    ],
    "states": {
     "default": "coil_receiver_body.png"
    },
    "rotation_axis_local": [
     46,
     32
    ],
    "mount_in_base": [
     62,
     36
    ]
   },
   "village_lamp": {
    "scene": "2-6",
    "size": [
     24,
     24
    ],
    "pivot": [
     12,
     0
    ],
    "states": {
     "off": "village_lamp_off.png",
     "on": "village_lamp_on.png"
    }
   },
   "village_lamp_glow": {
    "scene": "2-6",
    "size": [
     80,
     80
    ],
    "pivot": [
     40,
     28
    ],
    "states": {
     "on": "village_lamp_glow_on.png"
    },
    "body_asset": "village_lamp"
   }
  },
  "scene_placements": {
   "tower_f1": {
    "metal_plate_left": {
     "top_left": [
      1881,
      553
     ],
     "asset": "metal_plate"
    },
    "metal_plate_right": {
     "top_left": [
      2275,
      553
     ],
     "asset": "metal_plate"
    },
    "vacuum_tube_suggested": {
     "top_left": [
      962,
      677
     ],
     "asset": "vacuum_tube"
    }
   },
   "tower_f2": {
    "circuit_board": {
     "top_left": [
      510,
      420
     ]
    },
    "lamps": [
     {
      "top_left": [
       111,
       167
      ],
      "hanging_center": [
       141,
       167
      ]
     },
     {
      "top_left": [
       692,
       134
      ],
      "hanging_center": [
       722,
       134
      ]
     },
     {
      "top_left": [
       1110,
       168
      ],
      "hanging_center": [
       1140,
       168
      ]
     },
     {
      "top_left": [
       1611,
       135
      ],
      "hanging_center": [
       1641,
       135
      ]
     }
    ],
    "stairs_f2": {
     "top_left": [
      1500,
      280
     ]
    }
   },
   "tower_f3": {
    "iron_door": {
     "top_left": [
      1044,
      428
     ]
    },
    "touch_slab": {
     "top_left": [
      1700,
      590
     ]
    }
   },
   "tower_f4": {
    "vault_3": {
     "top_left": [
      1012,
      565
     ],
     "size": [
      376,
      300
     ]
    },
    "vault_door_top_left_in_vault": {
     "iron": {
      "top_left_in_vault": [
       18,
       91
      ],
      "size": [
       112,
       157
      ]
     },
     "aluminum": {
      "top_left_in_vault": [
       132,
       91
      ],
      "size": [
       112,
       157
      ]
     },
     "copper": {
      "top_left_in_vault": [
       246,
       91
      ],
      "size": [
       112,
       157
      ]
     }
    },
    "graphite_plate_relative_to_stand": [
     12,
     -20
    ]
   },
   "tower_f5": {
    "elevator_shaft": [
     200,
     0,
     512,
     1080
    ],
    "elevator_platform_suggested_top_left": [
     200,
     825
    ],
    "electromagnet_trap": {
     "top_left": [
      1000,
      865
     ],
     "size": [
      375,
      50
     ]
    },
    "electromagnet_trap_glow_shared_world_pivot": [
     1187,
     915
    ]
   },
   "tower_top": {
    "coil_gate": {
     "top_left": [
      1312,
      365
     ],
     "size": [
      375,
      500
     ]
    },
    "beacon": {
     "top_left": [
      2650,
      675
     ],
     "size": [
      200,
      190
     ]
    },
    "village_lamps": [
     {
      "center": [
       565,
       703
      ],
      "body_top_left": [
       553,
       691
      ],
      "world_pivot": [
       565,
       691
      ]
     },
     {
      "center": [
       605,
       714
      ],
      "body_top_left": [
       593,
       702
      ],
      "world_pivot": [
       605,
       702
      ]
     },
     {
      "center": [
       637,
       731
      ],
      "body_top_left": [
       625,
       719
      ],
      "world_pivot": [
       637,
       719
      ]
     },
     {
      "center": [
       710,
       635
      ],
      "body_top_left": [
       698,
       623
      ],
      "world_pivot": [
       710,
       623
      ]
     },
     {
      "center": [
       815,
       678
      ],
      "body_top_left": [
       803,
       666
      ],
      "world_pivot": [
       815,
       666
      ]
     },
     {
      "center": [
       951,
       704
      ],
      "body_top_left": [
       939,
       692
      ],
      "world_pivot": [
       951,
       692
      ]
     },
     {
      "center": [
       982,
       735
      ],
      "body_top_left": [
       970,
       723
      ],
      "world_pivot": [
       982,
       723
      ]
     },
     {
      "center": [
       1035,
       707
      ],
      "body_top_left": [
       1023,
       695
      ],
      "world_pivot": [
       1035,
       695
      ]
     },
     {
      "center": [
       1161,
       621
      ],
      "body_top_left": [
       1149,
       609
      ],
      "world_pivot": [
       1161,
       609
      ]
     },
     {
      "center": [
       1283,
       716
      ],
      "body_top_left": [
       1271,
       704
      ],
      "world_pivot": [
       1283,
       704
      ]
     },
     {
      "center": [
       1331,
       709
      ],
      "body_top_left": [
       1319,
       697
      ],
      "world_pivot": [
       1331,
       697
      ]
     },
     {
      "center": [
       1397,
       727
      ],
      "body_top_left": [
       1385,
       715
      ],
      "world_pivot": [
       1397,
       715
      ]
     }
    ]
   }
  },
  "png_files": [
   "amber_rod.png",
   "amber_rod_icon.png",
   "bar_magnet_large.png",
   "bar_magnet_medium.png",
   "bar_magnet_small.png",
   "beacon_fire_01.png",
   "beacon_fire_02.png",
   "beacon_fire_03.png",
   "beacon_fire_04.png",
   "beacon_glow_on.png",
   "beacon_off.png",
   "box_charge_glow_large_close_00.png",
   "box_charge_glow_large_close_100.png",
   "box_charge_glow_large_close_30.png",
   "box_charge_glow_large_close_70.png",
   "box_charge_glow_large_wide_00.png",
   "box_charge_glow_large_wide_100.png",
   "box_charge_glow_large_wide_30.png",
   "box_charge_glow_large_wide_70.png",
   "box_charge_glow_small_close_00.png",
   "box_charge_glow_small_close_100.png",
   "box_charge_glow_small_close_30.png",
   "box_charge_glow_small_close_70.png",
   "box_charge_glow_small_wide_00.png",
   "box_charge_glow_small_wide_100.png",
   "box_charge_glow_small_wide_30.png",
   "box_charge_glow_small_wide_70.png",
   "charged_stone_minus.png",
   "charged_stone_neutral.png",
   "charged_stone_plus.png",
   "circuit_board_parallel.png",
   "circuit_board_series.png",
   "coil_few.png",
   "coil_gate_glow.png",
   "coil_gate_glow_glow.png",
   "coil_gate_off.png",
   "coil_gate_open_01.png",
   "coil_gate_open_02.png",
   "coil_gate_open_03.png",
   "coil_gate_open_04.png",
   "coil_many.png",
   "coil_normal.png",
   "coil_receiver_base.png",
   "coil_receiver_body.png",
   "coil_sender_base.png",
   "coil_sender_body.png",
   "compass_base.png",
   "compass_needle.png",
   "direction_switch_left.png",
   "direction_switch_right.png",
   "electromagnet_trap_glow_on.png",
   "electromagnet_trap_off.png",
   "electromagnet_trap_on.png",
   "elevator_platform.png",
   "elevator_rope_tile.png",
   "feather_charged.png",
   "feather_normal.png",
   "fur.png",
   "fur_icon.png",
   "graphite_plate.png",
   "graphite_stand.png",
   "iron_door_closed.png",
   "iron_door_opening_01.png",
   "iron_door_opening_02.png",
   "iron_door_opening_03.png",
   "iron_door_opening_04.png",
   "key_aluminum.png",
   "key_aluminum_icon.png",
   "key_copper.png",
   "key_copper_icon.png",
   "key_iron.png",
   "key_iron_icon.png",
   "lamp_bright.png",
   "lamp_dim.png",
   "lamp_glow_bright.png",
   "lamp_glow_dim.png",
   "lamp_glow_normal.png",
   "lamp_glow_off.png",
   "lamp_normal.png",
   "lamp_off.png",
   "lightning_box_large_close.png",
   "lightning_box_large_wide.png",
   "lightning_box_small_close.png",
   "lightning_box_small_wide.png",
   "magnet_glove_icon.png",
   "magnet_hook.png",
   "magnet_hook_icon.png",
   "mana_stone.png",
   "metal_plate_glow_minus.png",
   "metal_plate_glow_plus.png",
   "metal_plate_minus.png",
   "metal_plate_neutral.png",
   "metal_plate_plus.png",
   "motor_body.png",
   "motor_rotor.png",
   "resistor_crystal.png",
   "rubber_glove.png",
   "rubber_glove_icon.png",
   "spark_small_01.png",
   "spark_small_02.png",
   "spark_small_03.png",
   "spark_small_04.png",
   "speaker_assembled.png",
   "speaker_part_coil.png",
   "speaker_part_cone.png",
   "speaker_part_magnet.png",
   "stairs_f2_01.png",
   "stairs_f2_02.png",
   "stairs_f2_03.png",
   "stairs_f2_04.png",
   "touch_slab_glow_no_response.png",
   "touch_slab_glow_off.png",
   "touch_slab_glow_on.png",
   "touch_slab_no_response.png",
   "touch_slab_off.png",
   "touch_slab_on.png",
   "vacuum_tube.png",
   "vault_3_body.png",
   "vault_3_door_aluminum_closed.png",
   "vault_3_door_aluminum_open.png",
   "vault_3_door_copper_closed.png",
   "vault_3_door_copper_open.png",
   "vault_3_door_iron_closed.png",
   "vault_3_door_iron_open.png",
   "village_lamp_glow_on.png",
   "village_lamp_off.png",
   "village_lamp_on.png",
   "wire_branch_broken.png",
   "wire_branch_hot.png",
   "wire_branch_normal.png",
   "wire_corner_broken.png",
   "wire_corner_hot.png",
   "wire_corner_normal.png",
   "wire_straight_broken.png",
   "wire_straight_hot.png",
   "wire_straight_normal.png",
   "wooden_stick.png",
   "wooden_stick_icon.png"
  ]
 },
 "act3_objects": {
  "3a": {
   "pixels_per_meter": 125,
   "assets": {
    "light_source_off": {
     "file": "light_source_off.png",
     "size": [
      120,
      240
     ],
     "kind": "object",
     "pivot": [
      60,
      240
     ]
    },
    "light_source_on": {
     "file": "light_source_on.png",
     "size": [
      120,
      240
     ],
     "kind": "object",
     "pivot": [
      60,
      240
     ]
    },
    "light_source_glow": {
     "file": "light_source_glow.png",
     "size": [
      240,
      360
     ],
     "kind": "effect",
     "pivot": [
      120,
      360
     ],
     "align_to": "light_source_on",
     "body_pivot": [
      60,
      240
     ]
    },
    "slit_wall": {
     "file": "slit_wall.png",
     "size": [
      60,
      500
     ],
     "kind": "wall",
     "pivot": [
      30,
      0
     ],
     "insert_rect": [
      5,
      150,
      55,
      350
     ]
    },
    "slit_plate_gap_narrow": {
     "file": "slit_plate_gap_narrow.png",
     "size": [
      60,
      200
     ],
     "kind": "wall",
     "pivot": [
      30,
      0
     ],
     "slit_centers": [
      [
       30,
       90
      ],
      [
       30,
       110
      ]
     ],
     "slit_width": 6,
     "slit_vertical_length": 6
    },
    "slit_plate_gap_mid": {
     "file": "slit_plate_gap_mid.png",
     "size": [
      60,
      200
     ],
     "kind": "wall",
     "pivot": [
      30,
      0
     ],
     "slit_centers": [
      [
       30,
       80
      ],
      [
       30,
       120
      ]
     ],
     "slit_width": 6,
     "slit_vertical_length": 6
    },
    "slit_plate_gap_wide": {
     "file": "slit_plate_gap_wide.png",
     "size": [
      60,
      200
     ],
     "kind": "wall",
     "pivot": [
      30,
      0
     ],
     "slit_centers": [
      [
       30,
       70
      ],
      [
       30,
       130
      ]
     ],
     "slit_width": 6,
     "slit_vertical_length": 6
    },
    "screen_wall": {
     "file": "screen_wall.png",
     "size": [
      60,
      500
     ],
     "kind": "wall",
     "pivot": [
      30,
      0
     ],
     "projection_rect": [
      8,
      8,
      52,
      492
     ]
    },
    "ripple_tank": {
     "file": "ripple_tank.png",
     "size": [
      300,
      120
     ],
     "kind": "object",
     "pivot": [
      150,
      120
     ]
    },
    "hidden_rune_01_clear": {
     "file": "hidden_rune_01_clear.png",
     "size": [
      80,
      80
     ],
     "kind": "wall",
     "pivot": [
      40,
      0
     ]
    },
    "hidden_rune_01_faint": {
     "file": "hidden_rune_01_faint.png",
     "size": [
      80,
      80
     ],
     "kind": "wall",
     "pivot": [
      40,
      0
     ]
    },
    "hidden_rune_02_clear": {
     "file": "hidden_rune_02_clear.png",
     "size": [
      80,
      80
     ],
     "kind": "wall",
     "pivot": [
      40,
      0
     ]
    },
    "hidden_rune_02_faint": {
     "file": "hidden_rune_02_faint.png",
     "size": [
      80,
      80
     ],
     "kind": "wall",
     "pivot": [
      40,
      0
     ]
    },
    "hidden_rune_03_clear": {
     "file": "hidden_rune_03_clear.png",
     "size": [
      80,
      80
     ],
     "kind": "wall",
     "pivot": [
      40,
      0
     ]
    },
    "hidden_rune_03_faint": {
     "file": "hidden_rune_03_faint.png",
     "size": [
      80,
      80
     ],
     "kind": "wall",
     "pivot": [
      40,
      0
     ]
    },
    "torch": {
     "file": "torch.png",
     "size": [
      40,
      100
     ],
     "kind": "object",
     "pivot": [
      20,
      100
     ]
    },
    "torch_flame_01": {
     "file": "torch_flame_01.png",
     "size": [
      100,
      150
     ],
     "kind": "effect",
     "pivot": [
      50,
      150
     ],
     "align_to": "torch",
     "body_pivot": [
      20,
      100
     ],
     "loop": true
    },
    "torch_flame_02": {
     "file": "torch_flame_02.png",
     "size": [
      100,
      150
     ],
     "kind": "effect",
     "pivot": [
      50,
      150
     ],
     "align_to": "torch",
     "body_pivot": [
      20,
      100
     ],
     "loop": true
    },
    "torch_flame_03": {
     "file": "torch_flame_03.png",
     "size": [
      100,
      150
     ],
     "kind": "effect",
     "pivot": [
      50,
      150
     ],
     "align_to": "torch",
     "body_pivot": [
      20,
      100
     ],
     "loop": true
    },
    "torch_flame_04": {
     "file": "torch_flame_04.png",
     "size": [
      100,
      150
     ],
     "kind": "effect",
     "pivot": [
      50,
      150
     ],
     "align_to": "torch",
     "body_pivot": [
      20,
      100
     ],
     "loop": true
    },
    "film_shield_normal": {
     "file": "film_shield_normal.png",
     "size": [
      100,
      100
     ],
     "kind": "object",
     "pivot": [
      50,
      100
     ]
    },
    "film_shield_reflect": {
     "file": "film_shield_reflect.png",
     "size": [
      100,
      100
     ],
     "kind": "object",
     "pivot": [
      50,
      100
     ]
    },
    "film_shield_reflect_glint": {
     "file": "film_shield_reflect_glint.png",
     "size": [
      160,
      160
     ],
     "kind": "effect",
     "pivot": [
      80,
      160
     ],
     "align_to": "film_shield_reflect",
     "body_pivot": [
      50,
      100
     ]
    },
    "film_shield_icon": {
     "file": "film_shield_icon.png",
     "size": [
      96,
      96
     ],
     "kind": "icon",
     "pivot": [
      48,
      48
     ]
    },
    "water_body": {
     "file": "water_body.png",
     "size": [
      600,
      185
     ],
     "kind": "effect",
     "pivot": [
      300,
      0
     ],
     "opacity": 0.35,
     "world_rect": [
      600,
      865,
      1200,
      1050
     ]
    },
    "water_surface_01": {
     "file": "water_surface_01.png",
     "size": [
      600,
      30
     ],
     "kind": "effect",
     "pivot": [
      300,
      0
     ],
     "loop": true,
     "align_to": "water_body",
     "body_pivot": [
      300,
      0
     ]
    },
    "water_surface_02": {
     "file": "water_surface_02.png",
     "size": [
      600,
      30
     ],
     "kind": "effect",
     "pivot": [
      300,
      0
     ],
     "loop": true,
     "align_to": "water_body",
     "body_pivot": [
      300,
      0
     ]
    },
    "water_surface_03": {
     "file": "water_surface_03.png",
     "size": [
      600,
      30
     ],
     "kind": "effect",
     "pivot": [
      300,
      0
     ],
     "loop": true,
     "align_to": "water_body",
     "body_pivot": [
      300,
      0
     ]
    },
    "water_surface_04": {
     "file": "water_surface_04.png",
     "size": [
      600,
      30
     ],
     "kind": "effect",
     "pivot": [
      300,
      0
     ],
     "loop": true,
     "align_to": "water_body",
     "body_pivot": [
      300,
      0
     ]
    },
    "golden_key": {
     "file": "golden_key.png",
     "size": [
      40,
      40
     ],
     "kind": "item",
     "pivot": [
      20,
      20
     ]
    },
    "golden_key_icon": {
     "file": "golden_key_icon.png",
     "size": [
      96,
      96
     ],
     "kind": "icon",
     "pivot": [
      48,
      48
     ]
    },
    "convex_lens": {
     "file": "convex_lens.png",
     "size": [
      60,
      200
     ],
     "kind": "object",
     "pivot": [
      30,
      200
     ]
    },
    "convex_lens_icon": {
     "file": "convex_lens_icon.png",
     "size": [
      96,
      96
     ],
     "kind": "icon",
     "pivot": [
      48,
      48
     ]
    },
    "lens_screen": {
     "file": "lens_screen.png",
     "size": [
      40,
      200
     ],
     "kind": "object",
     "pivot": [
      20,
      200
     ]
    },
    "pattern_stencil": {
     "file": "pattern_stencil.png",
     "size": [
      60,
      150
     ],
     "kind": "wall",
     "pivot": [
      30,
      0
     ],
     "top_pattern": "star",
     "bottom_pattern": "wave"
    },
    "optical_rail": {
     "file": "optical_rail.png",
     "size": [
      750,
      20
     ],
     "kind": "object",
     "pivot": [
      375,
      20
     ]
    },
    "crystal_plate_blank": {
     "file": "crystal_plate_blank.png",
     "size": [
      50,
      50
     ],
     "kind": "item",
     "pivot": [
      25,
      25
     ]
    },
    "crystal_plate_engraved": {
     "file": "crystal_plate_engraved.png",
     "size": [
      50,
      50
     ],
     "kind": "item",
     "pivot": [
      25,
      25
     ]
    },
    "light_door_closed": {
     "file": "light_door_closed.png",
     "size": [
      150,
      500
     ],
     "kind": "wall",
     "pivot": [
      75,
      0
     ],
     "doorway_rect": [
      42,
      50,
      108,
      455
     ],
     "slab_raise_px": 0
    },
    "light_door_opening_01": {
     "file": "light_door_opening_01.png",
     "size": [
      150,
      500
     ],
     "kind": "wall",
     "pivot": [
      75,
      0
     ],
     "doorway_rect": [
      42,
      50,
      108,
      455
     ],
     "slab_raise_px": 70
    },
    "light_door_opening_02": {
     "file": "light_door_opening_02.png",
     "size": [
      150,
      500
     ],
     "kind": "wall",
     "pivot": [
      75,
      0
     ],
     "doorway_rect": [
      42,
      50,
      108,
      455
     ],
     "slab_raise_px": 165
    },
    "light_door_opening_03": {
     "file": "light_door_opening_03.png",
     "size": [
      150,
      500
     ],
     "kind": "wall",
     "pivot": [
      75,
      0
     ],
     "doorway_rect": [
      42,
      50,
      108,
      455
     ],
     "slab_raise_px": 290
    },
    "light_door_opening_04": {
     "file": "light_door_opening_04.png",
     "size": [
      150,
      500
     ],
     "kind": "wall",
     "pivot": [
      75,
      0
     ],
     "doorway_rect": [
      42,
      50,
      108,
      455
     ],
     "slab_raise_px": 470
    },
    "rune_tablet_sharp": {
     "file": "rune_tablet_sharp.png",
     "size": [
      500,
      350
     ],
     "kind": "wall",
     "pivot": [
      250,
      0
     ],
     "rune_region": [
      28,
      38,
      472,
      315
     ]
    },
    "rune_tablet_blurred": {
     "file": "rune_tablet_blurred.png",
     "size": [
      500,
      350
     ],
     "kind": "wall",
     "pivot": [
      250,
      0
     ],
     "rune_region": [
      55,
      65,
      445,
      285
     ]
    },
    "photo_plate": {
     "file": "photo_plate.png",
     "size": [
      400,
      350
     ],
     "kind": "wall",
     "pivot": [
      200,
      0
     ],
     "photosensitive_region": [
      18,
      18,
      382,
      332
     ]
    },
    "photo_target": {
     "file": "photo_target.png",
     "size": [
      400,
      350
     ],
     "kind": "wall",
     "pivot": [
      200,
      0
     ],
     "grayscale": true,
     "depiction": "open magic book and one old key, black silhouette on white"
    },
    "electron_apparatus": {
     "file": "electron_apparatus.png",
     "size": [
      400,
      165
     ],
     "kind": "object",
     "pivot": [
      200,
      165
     ],
     "electron_gun_tip": [
      154,
      70
     ],
     "slit_centers": [
      [
       205,
       68
      ],
      [
       212,
       68
      ]
     ],
     "screen_rect": [
      277,
      30,
      378,
      116
     ]
    },
    "electron_eye": {
     "file": "electron_eye.png",
     "size": [
      50,
      50
     ],
     "kind": "item",
     "pivot": [
      25,
      25
     ]
    },
    "electron_eye_icon": {
     "file": "electron_eye_icon.png",
     "size": [
      96,
      96
     ],
     "kind": "icon",
     "pivot": [
      48,
      48
     ]
    },
    "light_eye": {
     "file": "light_eye.png",
     "size": [
      50,
      50
     ],
     "kind": "item",
     "pivot": [
      25,
      25
     ]
    },
    "light_eye_icon": {
     "file": "light_eye_icon.png",
     "size": [
      96,
      96
     ],
     "kind": "icon",
     "pivot": [
      48,
      48
     ]
    }
   },
   "state_groups": {
    "light_source": [
     "light_source_off",
     "light_source_on"
    ],
    "slit_plate": [
     "slit_plate_gap_narrow",
     "slit_plate_gap_mid",
     "slit_plate_gap_wide"
    ],
    "hidden_rune_01": [
     "hidden_rune_01_faint",
     "hidden_rune_01_clear"
    ],
    "hidden_rune_02": [
     "hidden_rune_02_faint",
     "hidden_rune_02_clear"
    ],
    "hidden_rune_03": [
     "hidden_rune_03_faint",
     "hidden_rune_03_clear"
    ],
    "torch_flame": [
     "torch_flame_01",
     "torch_flame_02",
     "torch_flame_03",
     "torch_flame_04"
    ],
    "film_shield": [
     "film_shield_normal",
     "film_shield_reflect"
    ],
    "water_surface": [
     "water_surface_01",
     "water_surface_02",
     "water_surface_03",
     "water_surface_04"
    ],
    "crystal_plate": [
     "crystal_plate_blank",
     "crystal_plate_engraved"
    ],
    "light_door": [
     "light_door_closed",
     "light_door_opening_01",
     "light_door_opening_02",
     "light_door_opening_03",
     "light_door_opening_04"
    ],
    "rune_tablet": [
     "rune_tablet_blurred",
     "rune_tablet_sharp"
    ]
   },
   "placements": {
    "abyss_1": {
     "light_source": [
      300,
      625,
      420,
      865
     ],
     "slit_wall": [
      700,
      365,
      760,
      865
     ],
     "screen_wall": [
      1900,
      365,
      1960,
      865
     ],
     "ripple_tank": [
      2050,
      745,
      2350,
      865
     ]
    },
    "abyss_2": {
     "water_body": [
      600,
      865,
      1200,
      1050
     ],
     "optical_rail": [
      1450,
      845,
      2200,
      865
     ],
     "light_door": [
      2230,
      365,
      2380,
      865
     ]
    },
    "abyss_3": {
     "rune_tablet": [
      350,
      400,
      850,
      750
     ],
     "photo_plate": [
      1150,
      400,
      1550,
      750
     ],
     "electron_apparatus": [
      1800,
      700,
      2200,
      865
     ]
    }
   },
   "slit_centers": {
    "gap_narrow": [
     [
      30,
      90
     ],
     [
      30,
      110
     ]
    ],
    "gap_mid": [
     [
      30,
      80
     ],
     [
      30,
      120
     ]
    ],
    "gap_wide": [
     [
      30,
      70
     ],
     [
      30,
      130
     ]
    ]
   },
   "light_alignments": {
    "light_source_glow": {
     "body": "light_source_on",
     "glow_pivot": [
      120,
      360
     ],
     "body_pivot": [
      60,
      240
     ]
    },
    "torch_flame": {
     "body": "torch",
     "flame_pivot": [
      50,
      150
     ],
     "body_pivot": [
      20,
      100
     ]
    },
    "film_shield_reflect_glint": {
     "body": "film_shield_reflect",
     "effect_pivot": [
      80,
      160
     ],
     "body_pivot": [
      50,
      100
     ]
    }
   },
   "notes": [
    "All state images in a group share exact canvas and pivot.",
    "Rune tablet and photo plate are fully opaque wall panels.",
    "Interference fringes, electron dots and water wave simulation are rendered by the engine."
   ]
  },
  "3b": {
   "pixels_per_meter": 125,
   "assets": {
    "lamp_pedestal": {
     "file": "lamp_pedestal.png",
     "size": [
      120,
      200
     ],
     "kind": "object",
     "pivot": [
      60,
      200
     ]
    },
    "spectrum_lamp_hydrogen": {
     "file": "spectrum_lamp_hydrogen.png",
     "size": [
      60,
      100
     ],
     "kind": "object",
     "pivot": [
      30,
      0
     ]
    },
    "spectrum_lamp_hydrogen_glow": {
     "file": "spectrum_lamp_hydrogen_glow.png",
     "size": [
      300,
      300
     ],
     "kind": "effect",
     "pivot": [
      150,
      100
     ],
     "align_to": "spectrum_lamp_hydrogen",
     "body_pivot": [
      30,
      0
     ]
    },
    "spectrum_lamp_sodium": {
     "file": "spectrum_lamp_sodium.png",
     "size": [
      60,
      100
     ],
     "kind": "object",
     "pivot": [
      30,
      0
     ]
    },
    "spectrum_lamp_sodium_glow": {
     "file": "spectrum_lamp_sodium_glow.png",
     "size": [
      300,
      300
     ],
     "kind": "effect",
     "pivot": [
      150,
      100
     ],
     "align_to": "spectrum_lamp_sodium",
     "body_pivot": [
      30,
      0
     ]
    },
    "spectrum_lamp_neon": {
     "file": "spectrum_lamp_neon.png",
     "size": [
      60,
      100
     ],
     "kind": "object",
     "pivot": [
      30,
      0
     ]
    },
    "spectrum_lamp_neon_glow": {
     "file": "spectrum_lamp_neon_glow.png",
     "size": [
      300,
      300
     ],
     "kind": "effect",
     "pivot": [
      150,
      100
     ],
     "align_to": "spectrum_lamp_neon",
     "body_pivot": [
      30,
      0
     ]
    },
    "spectrum_lamp_mercury": {
     "file": "spectrum_lamp_mercury.png",
     "size": [
      60,
      100
     ],
     "kind": "object",
     "pivot": [
      30,
      0
     ]
    },
    "spectrum_lamp_mercury_glow": {
     "file": "spectrum_lamp_mercury_glow.png",
     "size": [
      300,
      300
     ],
     "kind": "effect",
     "pivot": [
      150,
      100
     ],
     "align_to": "spectrum_lamp_mercury",
     "body_pivot": [
      30,
      0
     ]
    },
    "spectroscope": {
     "file": "spectroscope.png",
     "size": [
      50,
      50
     ],
     "kind": "object",
     "pivot": [
      25,
      25
     ]
    },
    "spectroscope_icon": {
     "file": "spectroscope_icon.png",
     "size": [
      96,
      96
     ],
     "kind": "object",
     "pivot": [
      48,
      48
     ]
    },
    "barcode_panel": {
     "file": "barcode_panel.png",
     "size": [
      200,
      60
     ],
     "kind": "object",
     "pivot": [
      100,
      0
     ]
    },
    "energy_stairs": {
     "file": "energy_stairs.png",
     "size": [
      300,
      250
     ],
     "kind": "object",
     "pivot": [
      150,
      250
     ]
    },
    "energy_ball": {
     "file": "energy_ball.png",
     "size": [
      30,
      30
     ],
     "kind": "object",
     "pivot": [
      15,
      15
     ]
    },
    "spectrum_door_closed": {
     "file": "spectrum_door_closed.png",
     "size": [
      300,
      500
     ],
     "kind": "object",
     "pivot": [
      150,
      500
     ]
    },
    "spectrum_door_opening_01": {
     "file": "spectrum_door_opening_01.png",
     "size": [
      300,
      500
     ],
     "kind": "object",
     "pivot": [
      150,
      500
     ]
    },
    "spectrum_door_opening_02": {
     "file": "spectrum_door_opening_02.png",
     "size": [
      300,
      500
     ],
     "kind": "object",
     "pivot": [
      150,
      500
     ]
    },
    "spectrum_door_opening_03": {
     "file": "spectrum_door_opening_03.png",
     "size": [
      300,
      500
     ],
     "kind": "object",
     "pivot": [
      150,
      500
     ]
    },
    "spectrum_door_opening_04": {
     "file": "spectrum_door_opening_04.png",
     "size": [
      300,
      500
     ],
     "kind": "object",
     "pivot": [
      150,
      500
     ]
    },
    "bridge_tile_metal": {
     "file": "bridge_tile_metal.png",
     "size": [
      125,
      40
     ],
     "kind": "object",
     "pivot": [
      62,
      40
     ]
    },
    "bridge_tile_glass": {
     "file": "bridge_tile_glass.png",
     "size": [
      125,
      40
     ],
     "kind": "object",
     "pivot": [
      62,
      40
     ]
    },
    "bridge_tile_silicon": {
     "file": "bridge_tile_silicon.png",
     "size": [
      125,
      40
     ],
     "kind": "object",
     "pivot": [
      62,
      40
     ]
    },
    "led_crystal_off": {
     "file": "led_crystal_off.png",
     "size": [
      40,
      60
     ],
     "kind": "object",
     "pivot": [
      20,
      60
     ]
    },
    "led_crystal_on": {
     "file": "led_crystal_on.png",
     "size": [
      40,
      60
     ],
     "kind": "object",
     "pivot": [
      20,
      60
     ]
    },
    "led_crystal_glow": {
     "file": "led_crystal_glow.png",
     "size": [
      160,
      160
     ],
     "kind": "effect",
     "pivot": [
      80,
      130
     ],
     "align_to": "led_crystal_on",
     "body_pivot": [
      20,
      60
     ]
    },
    "diode_crystal": {
     "file": "diode_crystal.png",
     "size": [
      50,
      50
     ],
     "kind": "object",
     "pivot": [
      25,
      25
     ]
    },
    "diode_crystal_icon": {
     "file": "diode_crystal_icon.png",
     "size": [
      96,
      96
     ],
     "kind": "object",
     "pivot": [
      48,
      48
     ]
    },
    "power_crystal": {
     "file": "power_crystal.png",
     "size": [
      80,
      120
     ],
     "kind": "object",
     "pivot": [
      40,
      120
     ]
    },
    "diode_shield_normal": {
     "file": "diode_shield_normal.png",
     "size": [
      100,
      100
     ],
     "kind": "object",
     "pivot": [
      50,
      50
     ]
    },
    "diode_shield_icon": {
     "file": "diode_shield_icon.png",
     "size": [
      96,
      96
     ],
     "kind": "object",
     "pivot": [
      48,
      48
     ]
    },
    "diode_shield_block": {
     "file": "diode_shield_block.png",
     "size": [
      100,
      100
     ],
     "kind": "object",
     "pivot": [
      50,
      50
     ]
    },
    "diode_shield_pass": {
     "file": "diode_shield_pass.png",
     "size": [
      100,
      100
     ],
     "kind": "object",
     "pivot": [
      50,
      50
     ]
    },
    "diode_shield_block_effect": {
     "file": "diode_shield_block_effect.png",
     "size": [
      200,
      200
     ],
     "kind": "effect",
     "pivot": [
      100,
      100
     ],
     "align_to": "diode_shield_block",
     "body_pivot": [
      50,
      50
     ]
    },
    "diode_shield_pass_effect": {
     "file": "diode_shield_pass_effect.png",
     "size": [
      200,
      200
     ],
     "kind": "effect",
     "pivot": [
      100,
      100
     ],
     "align_to": "diode_shield_pass",
     "body_pivot": [
      50,
      50
     ]
    },
    "curse_backflow_01": {
     "file": "curse_backflow_01.png",
     "size": [
      200,
      60
     ],
     "kind": "effect",
     "pivot": [
      100,
      30
     ]
    },
    "curse_backflow_02": {
     "file": "curse_backflow_02.png",
     "size": [
      200,
      60
     ],
     "kind": "effect",
     "pivot": [
      100,
      30
     ]
    },
    "curse_backflow_03": {
     "file": "curse_backflow_03.png",
     "size": [
      200,
      60
     ],
     "kind": "effect",
     "pivot": [
      100,
      30
     ]
    },
    "curse_backflow_04": {
     "file": "curse_backflow_04.png",
     "size": [
      200,
      60
     ],
     "kind": "effect",
     "pivot": [
      100,
      30
     ]
    },
    "tester_lamp_off": {
     "file": "tester_lamp_off.png",
     "size": [
      60,
      80
     ],
     "kind": "object",
     "pivot": [
      30,
      80
     ]
    },
    "tester_lamp_dim": {
     "file": "tester_lamp_dim.png",
     "size": [
      60,
      80
     ],
     "kind": "object",
     "pivot": [
      30,
      80
     ]
    },
    "tester_lamp_dim_glow": {
     "file": "tester_lamp_dim_glow.png",
     "size": [
      180,
      180
     ],
     "kind": "effect",
     "pivot": [
      90,
      135
     ],
     "align_to": "tester_lamp_dim",
     "body_pivot": [
      30,
      80
     ]
    },
    "tester_lamp_bright": {
     "file": "tester_lamp_bright.png",
     "size": [
      60,
      80
     ],
     "kind": "object",
     "pivot": [
      30,
      80
     ]
    },
    "tester_lamp_bright_glow": {
     "file": "tester_lamp_bright_glow.png",
     "size": [
      180,
      180
     ],
     "kind": "effect",
     "pivot": [
      90,
      135
     ],
     "align_to": "tester_lamp_bright",
     "body_pivot": [
      30,
      80
     ]
    },
    "hourglass_01": {
     "file": "hourglass_01.png",
     "size": [
      60,
      100
     ],
     "kind": "object",
     "pivot": [
      30,
      100
     ]
    },
    "hourglass_02": {
     "file": "hourglass_02.png",
     "size": [
      60,
      100
     ],
     "kind": "object",
     "pivot": [
      30,
      100
     ]
    },
    "hourglass_03": {
     "file": "hourglass_03.png",
     "size": [
      60,
      100
     ],
     "kind": "object",
     "pivot": [
      30,
      100
     ]
    },
    "hourglass_04": {
     "file": "hourglass_04.png",
     "size": [
      60,
      100
     ],
     "kind": "object",
     "pivot": [
      30,
      100
     ]
    },
    "hourglass_05": {
     "file": "hourglass_05.png",
     "size": [
      60,
      100
     ],
     "kind": "object",
     "pivot": [
      30,
      100
     ]
    },
    "hourglass_06": {
     "file": "hourglass_06.png",
     "size": [
      60,
      100
     ],
     "kind": "object",
     "pivot": [
      30,
      100
     ]
    },
    "hourglass_icon": {
     "file": "hourglass_icon.png",
     "size": [
      96,
      96
     ],
     "kind": "object",
     "pivot": [
      48,
      96
     ]
    },
    "hourglass_door_closed": {
     "file": "hourglass_door_closed.png",
     "size": [
      250,
      500
     ],
     "kind": "object",
     "pivot": [
      125,
      500
     ]
    },
    "hourglass_door_opening_01": {
     "file": "hourglass_door_opening_01.png",
     "size": [
      250,
      500
     ],
     "kind": "object",
     "pivot": [
      125,
      500
     ]
    },
    "hourglass_door_opening_02": {
     "file": "hourglass_door_opening_02.png",
     "size": [
      250,
      500
     ],
     "kind": "object",
     "pivot": [
      125,
      500
     ]
    },
    "hourglass_door_opening_03": {
     "file": "hourglass_door_opening_03.png",
     "size": [
      250,
      500
     ],
     "kind": "object",
     "pivot": [
      125,
      500
     ]
    },
    "hourglass_door_opening_04": {
     "file": "hourglass_door_opening_04.png",
     "size": [
      250,
      500
     ],
     "kind": "object",
     "pivot": [
      125,
      500
     ]
    },
    "light_arrow_01": {
     "file": "light_arrow_01.png",
     "size": [
      120,
      30
     ],
     "kind": "effect",
     "pivot": [
      60,
      15
     ]
    },
    "light_arrow_hit_01": {
     "file": "light_arrow_hit_01.png",
     "size": [
      128,
      128
     ],
     "kind": "effect",
     "pivot": [
      64,
      64
     ]
    },
    "light_arrow_02": {
     "file": "light_arrow_02.png",
     "size": [
      120,
      30
     ],
     "kind": "effect",
     "pivot": [
      60,
      15
     ]
    },
    "light_arrow_hit_02": {
     "file": "light_arrow_hit_02.png",
     "size": [
      128,
      128
     ],
     "kind": "effect",
     "pivot": [
      64,
      64
     ]
    },
    "light_arrow_03": {
     "file": "light_arrow_03.png",
     "size": [
      120,
      30
     ],
     "kind": "effect",
     "pivot": [
      60,
      15
     ]
    },
    "light_arrow_hit_03": {
     "file": "light_arrow_hit_03.png",
     "size": [
      128,
      128
     ],
     "kind": "effect",
     "pivot": [
      64,
      64
     ]
    },
    "light_arrow_04": {
     "file": "light_arrow_04.png",
     "size": [
      120,
      30
     ],
     "kind": "effect",
     "pivot": [
      60,
      15
     ]
    },
    "light_arrow_hit_04": {
     "file": "light_arrow_hit_04.png",
     "size": [
      128,
      128
     ],
     "kind": "effect",
     "pivot": [
      64,
      64
     ]
    },
    "light_arrow_tail": {
     "file": "light_arrow_tail.png",
     "size": [
      240,
      60
     ],
     "kind": "effect",
     "pivot": [
      120,
      30
     ],
     "align_to": "light_arrow_01",
     "body_pivot": [
      60,
      15
     ]
    },
    "speed_lines_01": {
     "file": "speed_lines_01.png",
     "size": [
      400,
      200
     ],
     "kind": "effect",
     "pivot": [
      200,
      100
     ]
    },
    "speed_lines_02": {
     "file": "speed_lines_02.png",
     "size": [
      400,
      200
     ],
     "kind": "effect",
     "pivot": [
      200,
      100
     ]
    },
    "speed_lines_03": {
     "file": "speed_lines_03.png",
     "size": [
      400,
      200
     ],
     "kind": "effect",
     "pivot": [
      200,
      100
     ]
    },
    "spellbook_complete_01": {
     "file": "spellbook_complete_01.png",
     "size": [
      600,
      600
     ],
     "kind": "effect",
     "pivot": [
      300,
      300
     ]
    },
    "spellbook_complete_02": {
     "file": "spellbook_complete_02.png",
     "size": [
      600,
      600
     ],
     "kind": "effect",
     "pivot": [
      300,
      300
     ]
    },
    "spellbook_complete_03": {
     "file": "spellbook_complete_03.png",
     "size": [
      600,
      600
     ],
     "kind": "effect",
     "pivot": [
      300,
      300
     ]
    },
    "spellbook_complete_04": {
     "file": "spellbook_complete_04.png",
     "size": [
      600,
      600
     ],
     "kind": "effect",
     "pivot": [
      300,
      300
     ]
    },
    "spellbook_complete_05": {
     "file": "spellbook_complete_05.png",
     "size": [
      600,
      600
     ],
     "kind": "effect",
     "pivot": [
      300,
      300
     ]
    },
    "spellbook_complete_06": {
     "file": "spellbook_complete_06.png",
     "size": [
      600,
      600
     ],
     "kind": "effect",
     "pivot": [
      300,
      300
     ]
    }
   },
   "state_groups": {
    "spectrum_lamp": [
     "spectrum_lamp_hydrogen",
     "spectrum_lamp_sodium",
     "spectrum_lamp_neon",
     "spectrum_lamp_mercury"
    ],
    "spectrum_door": [
     "spectrum_door_closed",
     "spectrum_door_opening_01",
     "spectrum_door_opening_02",
     "spectrum_door_opening_03",
     "spectrum_door_opening_04"
    ],
    "led_crystal": [
     "led_crystal_off",
     "led_crystal_on"
    ],
    "diode_shield": [
     "diode_shield_normal",
     "diode_shield_block",
     "diode_shield_pass"
    ],
    "curse_backflow": [
     "curse_backflow_01",
     "curse_backflow_02",
     "curse_backflow_03",
     "curse_backflow_04"
    ],
    "tester_lamp": [
     "tester_lamp_off",
     "tester_lamp_dim",
     "tester_lamp_bright"
    ],
    "hourglass": [
     "hourglass_01",
     "hourglass_02",
     "hourglass_03",
     "hourglass_04",
     "hourglass_05",
     "hourglass_06"
    ],
    "hourglass_door": [
     "hourglass_door_closed",
     "hourglass_door_opening_01",
     "hourglass_door_opening_02",
     "hourglass_door_opening_03",
     "hourglass_door_opening_04"
    ],
    "light_arrow": [
     "light_arrow_01",
     "light_arrow_02",
     "light_arrow_03",
     "light_arrow_04"
    ],
    "light_arrow_hit": [
     "light_arrow_hit_01",
     "light_arrow_hit_02",
     "light_arrow_hit_03",
     "light_arrow_hit_04"
    ],
    "speed_lines": [
     "speed_lines_01",
     "speed_lines_02",
     "speed_lines_03"
    ],
    "spellbook_complete": [
     "spellbook_complete_01",
     "spellbook_complete_02",
     "spellbook_complete_03",
     "spellbook_complete_04",
     "spellbook_complete_05",
     "spellbook_complete_06"
    ]
   },
   "placements": {
    "lamp_pedestal_hook_point": [
     88,
     20
    ],
    "barcode_panel_strip": [
     29,
     13,
     171,
     47
    ],
    "energy_stairs_ball_centers": [
     [
      30,
      215
     ],
     [
      90,
      95
     ],
     [
      150,
      50
     ],
     [
      210,
      28
     ],
     [
      270,
      15
     ]
    ],
    "hourglass_door_slot": [
     72,
     145,
     179,
     342
    ],
    "scene_slots": {
     "abyss_4": {
      "energy_stairs": [
       100,
       615,
       400,
       865
      ],
      "lamp_pedestals": [
       [
        590,
        665,
        710,
        865
       ],
       [
        890,
        665,
        1010,
        865
       ],
       [
        1190,
        665,
        1310,
        865
       ],
       [
        1490,
        665,
        1610,
        865
       ]
      ],
      "spectrum_door": [
       1900,
       365,
       2200,
       865
      ],
      "barcode_panel": [
       1950,
       290,
       2150,
       350
      ]
     },
     "abyss_5": {
      "bridge_span": [
       400,
       2600
      ],
      "power_crystal": [
       200,
       745,
       280,
       865
      ],
      "exit": [
       2800,
       365,
       2950,
       865
      ]
     },
     "abyss_end": {
      "hourglass_door": [
       2650,
       365,
       2900,
       865
      ]
     }
    },
    "spectrum_door_centerline_x": 150,
    "ball_positions": [
     [
      30,
      215
     ],
     [
      90,
      95
     ],
     [
      150,
      50
     ],
     [
      210,
      28
     ],
     [
      270,
      15
     ]
    ]
   },
   "notes": [
    "Only the listed PNGs change. Keep all other act3_objects_3b files and JSON entries."
   ],
   "preview": "preview_sheet.png",
   "energy_stairs_top_y": [
    230,
    110,
    65,
    43,
    30
   ]
  },
  "preview_index": {
   "barcode_panel.png": [
    24,
    24,
    178,
    142
   ],
   "bridge_tile_glass.png": [
    194,
    24,
    348,
    142
   ],
   "bridge_tile_metal.png": [
    364,
    24,
    518,
    142
   ],
   "bridge_tile_silicon.png": [
    534,
    24,
    688,
    142
   ],
   "convex_lens.png": [
    704,
    24,
    858,
    142
   ],
   "convex_lens_icon.png": [
    874,
    24,
    1028,
    142
   ],
   "crystal_plate_blank.png": [
    1044,
    24,
    1198,
    142
   ],
   "crystal_plate_engraved.png": [
    1214,
    24,
    1368,
    142
   ],
   "curse_backflow_01.png": [
    24,
    174,
    178,
    292
   ],
   "curse_backflow_02.png": [
    194,
    174,
    348,
    292
   ],
   "curse_backflow_03.png": [
    364,
    174,
    518,
    292
   ],
   "curse_backflow_04.png": [
    534,
    174,
    688,
    292
   ],
   "diode_crystal.png": [
    704,
    174,
    858,
    292
   ],
   "diode_crystal_icon.png": [
    874,
    174,
    1028,
    292
   ],
   "diode_shield_block.png": [
    1044,
    174,
    1198,
    292
   ],
   "diode_shield_block_effect.png": [
    1214,
    174,
    1368,
    292
   ],
   "diode_shield_icon.png": [
    24,
    324,
    178,
    442
   ],
   "diode_shield_normal.png": [
    194,
    324,
    348,
    442
   ],
   "diode_shield_pass.png": [
    364,
    324,
    518,
    442
   ],
   "diode_shield_pass_effect.png": [
    534,
    324,
    688,
    442
   ],
   "electron_apparatus.png": [
    704,
    324,
    858,
    442
   ],
   "electron_eye.png": [
    874,
    324,
    1028,
    442
   ],
   "electron_eye_icon.png": [
    1044,
    324,
    1198,
    442
   ],
   "energy_ball.png": [
    1214,
    324,
    1368,
    442
   ],
   "energy_stairs.png": [
    24,
    474,
    178,
    592
   ],
   "film_shield_icon.png": [
    194,
    474,
    348,
    592
   ],
   "film_shield_normal.png": [
    364,
    474,
    518,
    592
   ],
   "film_shield_reflect.png": [
    534,
    474,
    688,
    592
   ],
   "film_shield_reflect_glint.png": [
    704,
    474,
    858,
    592
   ],
   "golden_key.png": [
    874,
    474,
    1028,
    592
   ],
   "golden_key_icon.png": [
    1044,
    474,
    1198,
    592
   ],
   "hidden_rune_01_clear.png": [
    1214,
    474,
    1368,
    592
   ],
   "hidden_rune_01_faint.png": [
    24,
    624,
    178,
    742
   ],
   "hidden_rune_02_clear.png": [
    194,
    624,
    348,
    742
   ],
   "hidden_rune_02_faint.png": [
    364,
    624,
    518,
    742
   ],
   "hidden_rune_03_clear.png": [
    534,
    624,
    688,
    742
   ],
   "hidden_rune_03_faint.png": [
    704,
    624,
    858,
    742
   ],
   "hourglass_01.png": [
    874,
    624,
    1028,
    742
   ],
   "hourglass_02.png": [
    1044,
    624,
    1198,
    742
   ],
   "hourglass_03.png": [
    1214,
    624,
    1368,
    742
   ],
   "hourglass_04.png": [
    24,
    774,
    178,
    892
   ],
   "hourglass_05.png": [
    194,
    774,
    348,
    892
   ],
   "hourglass_06.png": [
    364,
    774,
    518,
    892
   ],
   "hourglass_door_closed.png": [
    534,
    774,
    688,
    892
   ],
   "hourglass_door_opening_01.png": [
    704,
    774,
    858,
    892
   ],
   "hourglass_door_opening_02.png": [
    874,
    774,
    1028,
    892
   ],
   "hourglass_door_opening_03.png": [
    1044,
    774,
    1198,
    892
   ],
   "hourglass_door_opening_04.png": [
    1214,
    774,
    1368,
    892
   ],
   "hourglass_icon.png": [
    24,
    924,
    178,
    1042
   ],
   "lamp_pedestal.png": [
    194,
    924,
    348,
    1042
   ],
   "led_crystal_glow.png": [
    364,
    924,
    518,
    1042
   ],
   "led_crystal_off.png": [
    534,
    924,
    688,
    1042
   ],
   "led_crystal_on.png": [
    704,
    924,
    858,
    1042
   ],
   "lens_screen.png": [
    874,
    924,
    1028,
    1042
   ],
   "light_arrow_01.png": [
    1044,
    924,
    1198,
    1042
   ],
   "light_arrow_02.png": [
    1214,
    924,
    1368,
    1042
   ],
   "light_arrow_03.png": [
    24,
    1074,
    178,
    1192
   ],
   "light_arrow_04.png": [
    194,
    1074,
    348,
    1192
   ],
   "light_arrow_hit_01.png": [
    364,
    1074,
    518,
    1192
   ],
   "light_arrow_hit_02.png": [
    534,
    1074,
    688,
    1192
   ],
   "light_arrow_hit_03.png": [
    704,
    1074,
    858,
    1192
   ],
   "light_arrow_hit_04.png": [
    874,
    1074,
    1028,
    1192
   ],
   "light_arrow_tail.png": [
    1044,
    1074,
    1198,
    1192
   ],
   "light_door_closed.png": [
    1214,
    1074,
    1368,
    1192
   ],
   "light_door_opening_01.png": [
    24,
    1224,
    178,
    1342
   ],
   "light_door_opening_02.png": [
    194,
    1224,
    348,
    1342
   ],
   "light_door_opening_03.png": [
    364,
    1224,
    518,
    1342
   ],
   "light_door_opening_04.png": [
    534,
    1224,
    688,
    1342
   ],
   "light_eye.png": [
    704,
    1224,
    858,
    1342
   ],
   "light_eye_icon.png": [
    874,
    1224,
    1028,
    1342
   ],
   "light_source_glow.png": [
    1044,
    1224,
    1198,
    1342
   ],
   "light_source_off.png": [
    1214,
    1224,
    1368,
    1342
   ],
   "light_source_on.png": [
    24,
    1374,
    178,
    1492
   ],
   "optical_rail.png": [
    194,
    1374,
    348,
    1492
   ],
   "pattern_stencil.png": [
    364,
    1374,
    518,
    1492
   ],
   "photo_plate.png": [
    534,
    1374,
    688,
    1492
   ],
   "photo_target.png": [
    704,
    1374,
    858,
    1492
   ],
   "power_crystal.png": [
    874,
    1374,
    1028,
    1492
   ],
   "ripple_tank.png": [
    1044,
    1374,
    1198,
    1492
   ],
   "rune_tablet_blurred.png": [
    1214,
    1374,
    1368,
    1492
   ],
   "rune_tablet_sharp.png": [
    24,
    1524,
    178,
    1642
   ],
   "screen_wall.png": [
    194,
    1524,
    348,
    1642
   ],
   "slit_plate_gap_mid.png": [
    364,
    1524,
    518,
    1642
   ],
   "slit_plate_gap_narrow.png": [
    534,
    1524,
    688,
    1642
   ],
   "slit_plate_gap_wide.png": [
    704,
    1524,
    858,
    1642
   ],
   "slit_wall.png": [
    874,
    1524,
    1028,
    1642
   ],
   "spectroscope.png": [
    1044,
    1524,
    1198,
    1642
   ],
   "spectroscope_icon.png": [
    1214,
    1524,
    1368,
    1642
   ],
   "spectrum_door_closed.png": [
    24,
    1674,
    178,
    1792
   ],
   "spectrum_door_opening_01.png": [
    194,
    1674,
    348,
    1792
   ],
   "spectrum_door_opening_02.png": [
    364,
    1674,
    518,
    1792
   ],
   "spectrum_door_opening_03.png": [
    534,
    1674,
    688,
    1792
   ],
   "spectrum_door_opening_04.png": [
    704,
    1674,
    858,
    1792
   ],
   "spectrum_lamp_hydrogen.png": [
    874,
    1674,
    1028,
    1792
   ],
   "spectrum_lamp_hydrogen_glow.png": [
    1044,
    1674,
    1198,
    1792
   ],
   "spectrum_lamp_mercury.png": [
    1214,
    1674,
    1368,
    1792
   ],
   "spectrum_lamp_mercury_glow.png": [
    24,
    1824,
    178,
    1942
   ],
   "spectrum_lamp_neon.png": [
    194,
    1824,
    348,
    1942
   ],
   "spectrum_lamp_neon_glow.png": [
    364,
    1824,
    518,
    1942
   ],
   "spectrum_lamp_sodium.png": [
    534,
    1824,
    688,
    1942
   ],
   "spectrum_lamp_sodium_glow.png": [
    704,
    1824,
    858,
    1942
   ],
   "speed_lines_01.png": [
    874,
    1824,
    1028,
    1942
   ],
   "speed_lines_02.png": [
    1044,
    1824,
    1198,
    1942
   ],
   "speed_lines_03.png": [
    1214,
    1824,
    1368,
    1942
   ],
   "spellbook_complete_01.png": [
    24,
    1974,
    178,
    2092
   ],
   "spellbook_complete_02.png": [
    194,
    1974,
    348,
    2092
   ],
   "spellbook_complete_03.png": [
    364,
    1974,
    518,
    2092
   ],
   "spellbook_complete_04.png": [
    534,
    1974,
    688,
    2092
   ],
   "spellbook_complete_05.png": [
    704,
    1974,
    858,
    2092
   ],
   "spellbook_complete_06.png": [
    874,
    1974,
    1028,
    2092
   ],
   "tester_lamp_bright.png": [
    1044,
    1974,
    1198,
    2092
   ],
   "tester_lamp_bright_glow.png": [
    1214,
    1974,
    1368,
    2092
   ],
   "tester_lamp_dim.png": [
    24,
    2124,
    178,
    2242
   ],
   "tester_lamp_dim_glow.png": [
    194,
    2124,
    348,
    2242
   ],
   "tester_lamp_off.png": [
    364,
    2124,
    518,
    2242
   ],
   "torch.png": [
    534,
    2124,
    688,
    2242
   ],
   "torch_flame_01.png": [
    704,
    2124,
    858,
    2242
   ],
   "torch_flame_02.png": [
    874,
    2124,
    1028,
    2242
   ],
   "torch_flame_03.png": [
    1044,
    2124,
    1198,
    2242
   ],
   "torch_flame_04.png": [
    1214,
    2124,
    1368,
    2242
   ],
   "water_body.png": [
    24,
    2274,
    178,
    2392
   ],
   "water_surface_01.png": [
    194,
    2274,
    348,
    2392
   ],
   "water_surface_02.png": [
    364,
    2274,
    518,
    2392
   ],
   "water_surface_03.png": [
    534,
    2274,
    688,
    2392
   ],
   "water_surface_04.png": [
    704,
    2274,
    858,
    2392
   ]
  }
 },
 "ui_act2": {
  "parts": {
   "ui": {
    "format": "RGBA PNG except cutscenes, which are opaque RGB PNG",
    "coordinate_convention": "half-open [x0,y0,x1,y1]; positions are local to each asset",
    "assets": {
     "07_electric_force.png": {
      "kind": "spellbook_illustration",
      "size": [
       512,
       512
      ],
      "pivot": [
       256,
       256
      ],
      "spellbook_overlay_top_left": [
       810,
       256
      ],
      "content_role": "07_electric_force"
     },
     "08_circuit.png": {
      "kind": "spellbook_illustration",
      "size": [
       512,
       512
      ],
      "pivot": [
       256,
       256
      ],
      "spellbook_overlay_top_left": [
       810,
       256
      ],
      "content_role": "08_circuit"
     },
     "09_capacitor.png": {
      "kind": "spellbook_illustration",
      "size": [
       512,
       512
      ],
      "pivot": [
       256,
       256
      ],
      "spellbook_overlay_top_left": [
       810,
       256
      ],
      "content_role": "09_capacitor"
     },
     "10_magnetism.png": {
      "kind": "spellbook_illustration",
      "size": [
       512,
       512
      ],
      "pivot": [
       256,
       256
      ],
      "spellbook_overlay_top_left": [
       810,
       256
      ],
      "content_role": "10_magnetism"
     },
     "11_current_magnetism.png": {
      "kind": "spellbook_illustration",
      "size": [
       512,
       512
      ],
      "pivot": [
       256,
       256
      ],
      "spellbook_overlay_top_left": [
       810,
       256
      ],
      "content_role": "11_current_magnetism"
     },
     "12_induction.png": {
      "kind": "spellbook_illustration",
      "size": [
       512,
       512
      ],
      "pivot": [
       256,
       256
      ],
      "spellbook_overlay_top_left": [
       810,
       256
      ],
      "content_role": "12_induction"
     },
     "circuit_ui_series.png": {
      "kind": "circuit_ui",
      "size": [
       1400,
       800
      ],
      "pivot": [
       700,
       400
      ],
      "slot_centers": {
       "mana_stone": [
        190,
        400
       ],
       "parts": [
        [
         487,
         400
        ],
        [
         781,
         400
        ],
        [
         1075,
         400
        ]
       ]
      },
      "wire_path_segments": [
       [
        [
         266,
         400
        ],
        [
         406,
         400
        ]
       ],
       [
        [
         571,
         400
        ],
        [
         700,
         400
        ]
       ],
       [
        [
         865,
         400
        ],
        [
         994,
         400
        ]
       ],
       [
        [
         1159,
         400
        ],
        [
         1218,
         400
        ]
       ]
      ],
      "title_text_rect": [
       90,
       34,
       1310,
       110
      ],
      "instruction_text_rect": [
       90,
       690,
       1310,
       770
      ]
     },
     "circuit_ui_parallel.png": {
      "kind": "circuit_ui",
      "size": [
       1400,
       800
      ],
      "pivot": [
       700,
       400
      ],
      "slot_centers": {
       "mana_stone": [
        190,
        400
       ],
       "parts": [
        [
         773,
         210
        ],
        [
         773,
         400
        ],
        [
         773,
         590
        ]
       ]
      },
      "wire_path_segments": [
       [
        [
         266,
         400
        ],
        [
         389,
         400
        ]
       ],
       [
        [
         389,
         210
        ],
        [
         389,
         590
        ]
       ],
       [
        [
         389,
         210
        ],
        [
         686,
         210
        ]
       ],
       [
        [
         389,
         400
        ],
        [
         686,
         400
        ]
       ],
       [
        [
         389,
         590
        ],
        [
         686,
         590
        ]
       ],
       [
        [
         860,
         210
        ],
        [
         1095,
         210
        ]
       ],
       [
        [
         860,
         400
        ],
        [
         1095,
         400
        ]
       ],
       [
        [
         860,
         590
        ],
        [
         1095,
         590
        ]
       ],
       [
        [
         1095,
         210
        ],
        [
         1095,
         590
        ]
       ],
       [
        [
         1095,
         400
        ],
        [
         1190,
         400
        ]
       ]
      ],
      "title_text_rect": [
       90,
       34,
       1310,
       110
      ],
      "instruction_text_rect": [
       90,
       690,
       1310,
       770
      ]
     },
     "current_dot.png": {
      "kind": "circuit_effect",
      "size": [
       16,
       16
      ],
      "pivot": [
       8,
       8
      ],
      "loop_along": "wire_path_segments"
     },
     "part_icon_mana_stone.png": {
      "kind": "part_icon",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "source_asset": "mana_stone.png"
     },
     "part_icon_resistor_crystal.png": {
      "kind": "part_icon",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "source_asset": "resistor_crystal.png"
     },
     "part_icon_lamp.png": {
      "kind": "part_icon",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "source_asset": "lamp_normal.png"
     },
     "part_icon_wire.png": {
      "kind": "part_icon",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "source_asset": "wire_straight_normal.png"
     },
     "part_icon_switch_off.png": {
      "kind": "part_icon",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "source_asset": "direction_switch_left.png"
     },
     "part_icon_switch_on.png": {
      "kind": "part_icon",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "source_asset": "direction_switch_right.png"
     },
     "part_icon_lightning_box.png": {
      "kind": "part_icon",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "source_asset": "lightning_box_large_close.png"
     },
     "part_icon_coil.png": {
      "kind": "part_icon",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "source_asset": "coil_normal.png"
     },
     "part_icon_bar_magnet.png": {
      "kind": "part_icon",
      "size": [
       96,
       96
      ],
      "pivot": [
       48,
       48
      ],
      "source_asset": "bar_magnet_medium.png"
     },
     "ammeter.png": {
      "kind": "meter",
      "size": [
       360,
       360
      ],
      "pivot": [
       180,
       190
      ],
      "needle_asset": "ammeter_needle.png",
      "rotation_axis_local": [
       180,
       190
      ],
      "zero_angle_degrees": 210,
      "maximum_angle_degrees": -30,
      "angle_convention": "mathematical degrees; positive x is 0, up is 90; sweep from 210 down to -30",
      "value_text_rect": [
       110,
       254,
       250,
       308
      ]
     },
     "ammeter_needle.png": {
      "kind": "meter_needle",
      "size": [
       360,
       360
      ],
      "pivot": [
       180,
       190
      ],
      "rotation_axis_local": [
       180,
       190
      ],
      "default_angle_degrees": 90,
      "mount_on": "ammeter.png"
     },
     "wattmeter.png": {
      "kind": "meter",
      "size": [
       360,
       360
      ],
      "pivot": [
       180,
       190
      ],
      "needle_asset": "wattmeter_needle.png",
      "rotation_axis_local": [
       180,
       190
      ],
      "zero_angle_degrees": 210,
      "maximum_angle_degrees": -30,
      "angle_convention": "mathematical degrees; positive x is 0, up is 90; sweep from 210 down to -30",
      "value_text_rect": [
       110,
       254,
       250,
       308
      ]
     },
     "wattmeter_needle.png": {
      "kind": "meter_needle",
      "size": [
       360,
       360
      ],
      "pivot": [
       180,
       190
      ],
      "rotation_axis_local": [
       180,
       190
      ],
      "default_angle_degrees": 90,
      "mount_on": "wattmeter.png"
     },
     "result_board.png": {
      "kind": "result_board",
      "size": [
       1200,
       700
      ],
      "pivot": [
       600,
       350
      ],
      "table_rows": 5,
      "table_columns": 5,
      "cell_rects": [
       [
        [
         100,
         205,
         300,
         290
        ],
        [
         300,
         205,
         500,
         290
        ],
        [
         500,
         205,
         700,
         290
        ],
        [
         700,
         205,
         900,
         290
        ],
        [
         900,
         205,
         1100,
         290
        ]
       ],
       [
        [
         100,
         290,
         300,
         375
        ],
        [
         300,
         290,
         500,
         375
        ],
        [
         500,
         290,
         700,
         375
        ],
        [
         700,
         290,
         900,
         375
        ],
        [
         900,
         290,
         1100,
         375
        ]
       ],
       [
        [
         100,
         375,
         300,
         460
        ],
        [
         300,
         375,
         500,
         460
        ],
        [
         500,
         375,
         700,
         460
        ],
        [
         700,
         375,
         900,
         460
        ],
        [
         900,
         375,
         1100,
         460
        ]
       ],
       [
        [
         100,
         460,
         300,
         545
        ],
        [
         300,
         460,
         500,
         545
        ],
        [
         500,
         460,
         700,
         545
        ],
        [
         700,
         460,
         900,
         545
        ],
        [
         900,
         460,
         1100,
         545
        ]
       ],
       [
        [
         100,
         545,
         300,
         630
        ],
        [
         300,
         545,
         500,
         630
        ],
        [
         500,
         545,
         700,
         630
        ],
        [
         700,
         545,
         900,
         630
        ],
        [
         900,
         545,
         1100,
         630
        ]
       ]
      ],
      "title_text_rect": [
       125,
       125,
       1075,
       190
      ],
      "cell_text_inset_px": [
       12,
       8
      ]
     },
     "act2_intro.png": {
      "kind": "cutscene",
      "size": [
       1920,
       1080
      ],
      "pivot": [
       960,
       540
      ],
      "optional_caption_text_rect": [
       100,
       905,
       1820,
       1025
      ]
     },
     "act2_ending.png": {
      "kind": "cutscene",
      "size": [
       1920,
       1080
      ],
      "pivot": [
       960,
       540
      ],
      "optional_caption_text_rect": [
       100,
       905,
       1820,
       1025
      ]
     },
     "tower_floor_01_locked.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 1,
      "state": "locked",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_01_open.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 1,
      "state": "open",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_01_cleared.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 1,
      "state": "cleared",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_02_locked.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 2,
      "state": "locked",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_02_open.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 2,
      "state": "open",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_02_cleared.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 2,
      "state": "cleared",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_03_locked.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 3,
      "state": "locked",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_03_open.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 3,
      "state": "open",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_03_cleared.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 3,
      "state": "cleared",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_04_locked.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 4,
      "state": "locked",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_04_open.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 4,
      "state": "open",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_04_cleared.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 4,
      "state": "cleared",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_05_locked.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 5,
      "state": "locked",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_05_open.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 5,
      "state": "open",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_05_cleared.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 5,
      "state": "cleared",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_06_locked.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 6,
      "state": "locked",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_06_open.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 6,
      "state": "open",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     },
     "tower_floor_06_cleared.png": {
      "kind": "map_icon",
      "size": [
       160,
       160
      ],
      "pivot": [
       80,
       80
      ],
      "floor_index_runtime_only": 6,
      "state": "cleared",
      "tooltip_text_rect": [
       24,
       124,
       136,
       150
      ]
     }
    },
    "spellbook_runtime_placement": {
     "base_file": "../1막/v3/spellbook/blank_spread.png",
     "base_size": [
      1536,
      1024
     ],
     "illustration_top_left": [
      810,
      256
     ],
     "illustration_size": [
      512,
      512
     ],
     "chapter_title_text_rect": [
      180,
      155,
      650,
      245
     ],
     "law_statement_text_rect": [
      175,
      270,
      655,
      760
     ],
     "optional_caption_text_rect": [
      840,
      790,
      1350,
      855
     ]
    },
    "notes": [
     "No text or numbers are baked into the images.",
     "Application renders chapter titles, law statements, labels, and meter values from its own font.",
     "Map floors are distinguished by object silhouettes rather than digits."
    ],
    "file_count": 43
   }
  },
  "assets": {
   "07_electric_force.png": {
    "kind": "spellbook_illustration",
    "size": [
     512,
     512
    ],
    "pivot": [
     256,
     256
    ],
    "spellbook_overlay_top_left": [
     810,
     256
    ],
    "content_role": "07_electric_force"
   },
   "08_circuit.png": {
    "kind": "spellbook_illustration",
    "size": [
     512,
     512
    ],
    "pivot": [
     256,
     256
    ],
    "spellbook_overlay_top_left": [
     810,
     256
    ],
    "content_role": "08_circuit"
   },
   "09_capacitor.png": {
    "kind": "spellbook_illustration",
    "size": [
     512,
     512
    ],
    "pivot": [
     256,
     256
    ],
    "spellbook_overlay_top_left": [
     810,
     256
    ],
    "content_role": "09_capacitor"
   },
   "10_magnetism.png": {
    "kind": "spellbook_illustration",
    "size": [
     512,
     512
    ],
    "pivot": [
     256,
     256
    ],
    "spellbook_overlay_top_left": [
     810,
     256
    ],
    "content_role": "10_magnetism"
   },
   "11_current_magnetism.png": {
    "kind": "spellbook_illustration",
    "size": [
     512,
     512
    ],
    "pivot": [
     256,
     256
    ],
    "spellbook_overlay_top_left": [
     810,
     256
    ],
    "content_role": "11_current_magnetism"
   },
   "12_induction.png": {
    "kind": "spellbook_illustration",
    "size": [
     512,
     512
    ],
    "pivot": [
     256,
     256
    ],
    "spellbook_overlay_top_left": [
     810,
     256
    ],
    "content_role": "12_induction"
   },
   "circuit_ui_series.png": {
    "kind": "circuit_ui",
    "size": [
     1400,
     800
    ],
    "pivot": [
     700,
     400
    ],
    "slot_centers": {
     "mana_stone": [
      190,
      400
     ],
     "parts": [
      [
       487,
       400
      ],
      [
       781,
       400
      ],
      [
       1075,
       400
      ]
     ]
    },
    "wire_path_segments": [
     [
      [
       266,
       400
      ],
      [
       406,
       400
      ]
     ],
     [
      [
       571,
       400
      ],
      [
       700,
       400
      ]
     ],
     [
      [
       865,
       400
      ],
      [
       994,
       400
      ]
     ],
     [
      [
       1159,
       400
      ],
      [
       1218,
       400
      ]
     ]
    ],
    "title_text_rect": [
     90,
     34,
     1310,
     110
    ],
    "instruction_text_rect": [
     90,
     690,
     1310,
     770
    ]
   },
   "circuit_ui_parallel.png": {
    "kind": "circuit_ui",
    "size": [
     1400,
     800
    ],
    "pivot": [
     700,
     400
    ],
    "slot_centers": {
     "mana_stone": [
      190,
      400
     ],
     "parts": [
      [
       773,
       210
      ],
      [
       773,
       400
      ],
      [
       773,
       590
      ]
     ]
    },
    "wire_path_segments": [
     [
      [
       266,
       400
      ],
      [
       389,
       400
      ]
     ],
     [
      [
       389,
       210
      ],
      [
       389,
       590
      ]
     ],
     [
      [
       389,
       210
      ],
      [
       686,
       210
      ]
     ],
     [
      [
       389,
       400
      ],
      [
       686,
       400
      ]
     ],
     [
      [
       389,
       590
      ],
      [
       686,
       590
      ]
     ],
     [
      [
       860,
       210
      ],
      [
       1095,
       210
      ]
     ],
     [
      [
       860,
       400
      ],
      [
       1095,
       400
      ]
     ],
     [
      [
       860,
       590
      ],
      [
       1095,
       590
      ]
     ],
     [
      [
       1095,
       210
      ],
      [
       1095,
       590
      ]
     ],
     [
      [
       1095,
       400
      ],
      [
       1190,
       400
      ]
     ]
    ],
    "title_text_rect": [
     90,
     34,
     1310,
     110
    ],
    "instruction_text_rect": [
     90,
     690,
     1310,
     770
    ]
   },
   "current_dot.png": {
    "kind": "circuit_effect",
    "size": [
     16,
     16
    ],
    "pivot": [
     8,
     8
    ],
    "loop_along": "wire_path_segments"
   },
   "part_icon_mana_stone.png": {
    "kind": "part_icon",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "source_asset": "mana_stone.png"
   },
   "part_icon_resistor_crystal.png": {
    "kind": "part_icon",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "source_asset": "resistor_crystal.png"
   },
   "part_icon_lamp.png": {
    "kind": "part_icon",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "source_asset": "lamp_normal.png"
   },
   "part_icon_wire.png": {
    "kind": "part_icon",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "source_asset": "wire_straight_normal.png"
   },
   "part_icon_switch_off.png": {
    "kind": "part_icon",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "source_asset": "direction_switch_left.png"
   },
   "part_icon_switch_on.png": {
    "kind": "part_icon",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "source_asset": "direction_switch_right.png"
   },
   "part_icon_lightning_box.png": {
    "kind": "part_icon",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "source_asset": "lightning_box_large_close.png"
   },
   "part_icon_coil.png": {
    "kind": "part_icon",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "source_asset": "coil_normal.png"
   },
   "part_icon_bar_magnet.png": {
    "kind": "part_icon",
    "size": [
     96,
     96
    ],
    "pivot": [
     48,
     48
    ],
    "source_asset": "bar_magnet_medium.png"
   },
   "ammeter.png": {
    "kind": "meter",
    "size": [
     360,
     360
    ],
    "pivot": [
     180,
     190
    ],
    "needle_asset": "ammeter_needle.png",
    "rotation_axis_local": [
     180,
     190
    ],
    "zero_angle_degrees": 210,
    "maximum_angle_degrees": -30,
    "angle_convention": "mathematical degrees; positive x is 0, up is 90; sweep from 210 down to -30",
    "value_text_rect": [
     110,
     254,
     250,
     308
    ]
   },
   "ammeter_needle.png": {
    "kind": "meter_needle",
    "size": [
     360,
     360
    ],
    "pivot": [
     180,
     190
    ],
    "rotation_axis_local": [
     180,
     190
    ],
    "default_angle_degrees": 90,
    "mount_on": "ammeter.png"
   },
   "wattmeter.png": {
    "kind": "meter",
    "size": [
     360,
     360
    ],
    "pivot": [
     180,
     190
    ],
    "needle_asset": "wattmeter_needle.png",
    "rotation_axis_local": [
     180,
     190
    ],
    "zero_angle_degrees": 210,
    "maximum_angle_degrees": -30,
    "angle_convention": "mathematical degrees; positive x is 0, up is 90; sweep from 210 down to -30",
    "value_text_rect": [
     110,
     254,
     250,
     308
    ]
   },
   "wattmeter_needle.png": {
    "kind": "meter_needle",
    "size": [
     360,
     360
    ],
    "pivot": [
     180,
     190
    ],
    "rotation_axis_local": [
     180,
     190
    ],
    "default_angle_degrees": 90,
    "mount_on": "wattmeter.png"
   },
   "result_board.png": {
    "kind": "result_board",
    "size": [
     1200,
     700
    ],
    "pivot": [
     600,
     350
    ],
    "table_rows": 5,
    "table_columns": 5,
    "cell_rects": [
     [
      [
       100,
       205,
       300,
       290
      ],
      [
       300,
       205,
       500,
       290
      ],
      [
       500,
       205,
       700,
       290
      ],
      [
       700,
       205,
       900,
       290
      ],
      [
       900,
       205,
       1100,
       290
      ]
     ],
     [
      [
       100,
       290,
       300,
       375
      ],
      [
       300,
       290,
       500,
       375
      ],
      [
       500,
       290,
       700,
       375
      ],
      [
       700,
       290,
       900,
       375
      ],
      [
       900,
       290,
       1100,
       375
      ]
     ],
     [
      [
       100,
       375,
       300,
       460
      ],
      [
       300,
       375,
       500,
       460
      ],
      [
       500,
       375,
       700,
       460
      ],
      [
       700,
       375,
       900,
       460
      ],
      [
       900,
       375,
       1100,
       460
      ]
     ],
     [
      [
       100,
       460,
       300,
       545
      ],
      [
       300,
       460,
       500,
       545
      ],
      [
       500,
       460,
       700,
       545
      ],
      [
       700,
       460,
       900,
       545
      ],
      [
       900,
       460,
       1100,
       545
      ]
     ],
     [
      [
       100,
       545,
       300,
       630
      ],
      [
       300,
       545,
       500,
       630
      ],
      [
       500,
       545,
       700,
       630
      ],
      [
       700,
       545,
       900,
       630
      ],
      [
       900,
       545,
       1100,
       630
      ]
     ]
    ],
    "title_text_rect": [
     125,
     125,
     1075,
     190
    ],
    "cell_text_inset_px": [
     12,
     8
    ]
   },
   "act2_intro.png": {
    "kind": "cutscene",
    "size": [
     1920,
     1080
    ],
    "pivot": [
     960,
     540
    ],
    "optional_caption_text_rect": [
     100,
     905,
     1820,
     1025
    ]
   },
   "act2_ending.png": {
    "kind": "cutscene",
    "size": [
     1920,
     1080
    ],
    "pivot": [
     960,
     540
    ],
    "optional_caption_text_rect": [
     100,
     905,
     1820,
     1025
    ]
   },
   "tower_floor_01_locked.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 1,
    "state": "locked",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_01_open.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 1,
    "state": "open",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_01_cleared.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 1,
    "state": "cleared",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_02_locked.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 2,
    "state": "locked",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_02_open.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 2,
    "state": "open",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_02_cleared.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 2,
    "state": "cleared",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_03_locked.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 3,
    "state": "locked",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_03_open.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 3,
    "state": "open",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_03_cleared.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 3,
    "state": "cleared",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_04_locked.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 4,
    "state": "locked",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_04_open.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 4,
    "state": "open",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_04_cleared.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 4,
    "state": "cleared",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_05_locked.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 5,
    "state": "locked",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_05_open.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 5,
    "state": "open",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_05_cleared.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 5,
    "state": "cleared",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_06_locked.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 6,
    "state": "locked",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_06_open.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 6,
    "state": "open",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   },
   "tower_floor_06_cleared.png": {
    "kind": "map_icon",
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "floor_index_runtime_only": 6,
    "state": "cleared",
    "tooltip_text_rect": [
     24,
     124,
     136,
     150
    ]
   }
  },
  "png_files": [
   "07_electric_force.png",
   "08_circuit.png",
   "09_capacitor.png",
   "10_magnetism.png",
   "11_current_magnetism.png",
   "12_induction.png",
   "act2_ending.png",
   "act2_intro.png",
   "ammeter.png",
   "ammeter_needle.png",
   "circuit_ui_parallel.png",
   "circuit_ui_series.png",
   "current_dot.png",
   "part_icon_bar_magnet.png",
   "part_icon_coil.png",
   "part_icon_lamp.png",
   "part_icon_lightning_box.png",
   "part_icon_mana_stone.png",
   "part_icon_resistor_crystal.png",
   "part_icon_switch_off.png",
   "part_icon_switch_on.png",
   "part_icon_wire.png",
   "result_board.png",
   "tower_floor_01_cleared.png",
   "tower_floor_01_locked.png",
   "tower_floor_01_open.png",
   "tower_floor_02_cleared.png",
   "tower_floor_02_locked.png",
   "tower_floor_02_open.png",
   "tower_floor_03_cleared.png",
   "tower_floor_03_locked.png",
   "tower_floor_03_open.png",
   "tower_floor_04_cleared.png",
   "tower_floor_04_locked.png",
   "tower_floor_04_open.png",
   "tower_floor_05_cleared.png",
   "tower_floor_05_locked.png",
   "tower_floor_05_open.png",
   "tower_floor_06_cleared.png",
   "tower_floor_06_locked.png",
   "tower_floor_06_open.png",
   "wattmeter.png",
   "wattmeter_needle.png"
  ]
 },
 "act3_ui": {
  "4a": {
   "format": "transparent RGBA PNG",
   "assets": {
    "13_interference.png": {
     "kind": "illustration",
     "size": [
      512,
      512
     ],
     "overlay_top_left": [
      810,
      256
     ],
     "pivot": [
      256,
      256
     ]
    },
    "14_refraction_lens.png": {
     "kind": "illustration",
     "size": [
      512,
      512
     ],
     "overlay_top_left": [
      810,
      256
     ],
     "pivot": [
      256,
      256
     ]
    },
    "15_duality.png": {
     "kind": "illustration",
     "size": [
      512,
      512
     ],
     "overlay_top_left": [
      810,
      256
     ],
     "pivot": [
      256,
      256
     ]
    },
    "16_line_spectrum.png": {
     "kind": "illustration",
     "size": [
      512,
      512
     ],
     "overlay_top_left": [
      810,
      256
     ],
     "pivot": [
      256,
      256
     ]
    },
    "17_semiconductor.png": {
     "kind": "illustration",
     "size": [
      512,
      512
     ],
     "overlay_top_left": [
      810,
      256
     ],
     "pivot": [
      256,
      256
     ]
    },
    "18_relativity.png": {
     "kind": "illustration",
     "size": [
      512,
      512
     ],
     "overlay_top_left": [
      810,
      256
     ],
     "pivot": [
      256,
      256
     ]
    },
    "07_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "08_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "09_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "10_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "11_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "12_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "13_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "14_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "15_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "16_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "17_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "18_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "01_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "02_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "03_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "04_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "05_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    },
    "06_torn.png": {
     "kind": "torn_spread",
     "size": [
      1536,
      1024
     ],
     "overlay_top_left": [
      0,
      0
     ],
     "pivot": [
      768,
      512
     ]
    }
   },
   "spellbook_runtime_placement": {
    "base_file": "../1막/v3/spellbook/blank_spread.png",
    "base_size": [
     1536,
     1024
    ],
    "illustration_top_left": [
     810,
     256
    ],
    "illustration_size": [
     512,
     512
    ],
    "chapter_title_text_rect": [
     180,
     155,
     650,
     245
    ],
    "law_statement_text_rect": [
     175,
     270,
     655,
     760
    ],
    "optional_caption_text_rect": [
     840,
     790,
     1350,
     855
    ],
    "torn_spread_top_left": [
     0,
     0
    ]
   },
   "physics_checks": {
    "14_refraction_lens": {
     "ray_parallel_after_lens_through_right_focus": true,
     "center_ray_unbent": true,
     "image_inverted_and_smaller": true,
     "source_geometry_hi_res": {
      "lens_x": 640,
      "axis_y": 600,
      "focal_offset": 160,
      "object_x": 130,
      "image_x": 873
     }
    },
    "16_line_spectrum": {
     "order": [
      "violet_410",
      "blue_434",
      "cyan_486",
      "red_656"
     ],
     "line_x": {
      "violet": 75,
      "blue": 109,
      "cyan": 183,
      "red": 423
     },
     "higher_level_spacings_decrease": true
    },
    "17_semiconductor": {
     "gap_order": [
      "overlap",
      "narrow",
      "wide"
     ],
     "diode_direction": "right"
    },
    "18_relativity": {
     "cart_heights_equal": true,
     "moving_cart_width_smaller": true,
     "moving_hourglass_less_sand_fallen": true
    }
   },
   "illustration_count": 6,
   "torn_count": 18
  },
  "4b": {
   "format": "PNG",
   "coordinate_origin": "top_left",
   "assets": {
    "act3_intro.png": {
     "size": [
      1920,
      1080
     ],
     "pivot": [
      960,
      540
     ],
     "text_regions": []
    },
    "act3_final.png": {
     "size": [
      1920,
      1080
     ],
     "pivot": [
      960,
      540
     ],
     "text_regions": []
    },
    "epilogue.png": {
     "size": [
      1920,
      1080
     ],
     "pivot": [
      960,
      540
     ],
     "text_regions": []
    },
    "credits_bg.png": {
     "size": [
      1920,
      1080
     ],
     "pivot": [
      960,
      540
     ],
     "text_regions": [
      [
       510,
       80,
       1410,
       1020
      ]
     ]
    },
    "spectroscope_view.png": {
     "size": [
      1200,
      400
     ],
     "pivot": [
      600,
      200
     ],
     "strip_rect": [
      195,
      126,
      1005,
      275
     ]
    },
    "hourglass_compare.png": {
     "size": [
      900,
      500
     ],
     "pivot": [
      450,
      250
     ],
     "slot_centers": [
      [
       250,
       252
      ],
      [
       650,
       252
      ]
     ],
     "slot_size": [
      260,
      320
     ]
    },
    "boss_phase_banner.png": {
     "size": [
      1200,
      200
     ],
     "pivot": [
      600,
      100
     ],
     "text_rect": [
      225,
      42,
      975,
      160
     ]
    },
    "lens_bench_ui.png": {
     "size": [
      1600,
      120
     ],
     "pivot": [
      800,
      60
     ],
     "tick_start_x": 50,
     "tick_end_x": 1550,
     "pixels_per_meter": 125,
     "minor_tick_m": 0.1,
     "major_tick_m": 1
    },
    "electron_eye_overlay.png": {
     "size": [
      1920,
      1080
     ],
     "pivot": [
      960,
      540
     ],
     "circle_center": [
      960,
      540
     ],
     "circle_radius": 300,
     "outside_opacity": 0.9019607843137255,
     "scanline_spacing_px": 8
    },
    "abyss_floor_01_locked.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 1,
     "state": "locked",
     "emblem_source": "slit_wall.png"
    },
    "abyss_floor_01_open.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 1,
     "state": "open",
     "emblem_source": "slit_wall.png"
    },
    "abyss_floor_01_cleared.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 1,
     "state": "cleared",
     "emblem_source": "slit_wall.png"
    },
    "abyss_floor_02_locked.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 2,
     "state": "locked",
     "emblem_source": "convex_lens_icon.png"
    },
    "abyss_floor_02_open.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 2,
     "state": "open",
     "emblem_source": "convex_lens_icon.png"
    },
    "abyss_floor_02_cleared.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 2,
     "state": "cleared",
     "emblem_source": "convex_lens_icon.png"
    },
    "abyss_floor_03_locked.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 3,
     "state": "locked",
     "emblem_source": "electron_eye_icon.png"
    },
    "abyss_floor_03_open.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 3,
     "state": "open",
     "emblem_source": "electron_eye_icon.png"
    },
    "abyss_floor_03_cleared.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 3,
     "state": "cleared",
     "emblem_source": "electron_eye_icon.png"
    },
    "abyss_floor_04_locked.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 4,
     "state": "locked",
     "emblem_source": "spectroscope_icon.png"
    },
    "abyss_floor_04_open.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 4,
     "state": "open",
     "emblem_source": "spectroscope_icon.png"
    },
    "abyss_floor_04_cleared.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 4,
     "state": "cleared",
     "emblem_source": "spectroscope_icon.png"
    },
    "abyss_floor_05_locked.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 5,
     "state": "locked",
     "emblem_source": "diode_crystal_icon.png"
    },
    "abyss_floor_05_open.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 5,
     "state": "open",
     "emblem_source": "diode_crystal_icon.png"
    },
    "abyss_floor_05_cleared.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 5,
     "state": "cleared",
     "emblem_source": "diode_crystal_icon.png"
    },
    "abyss_floor_06_locked.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 6,
     "state": "locked",
     "emblem_source": "hourglass_icon.png"
    },
    "abyss_floor_06_open.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 6,
     "state": "open",
     "emblem_source": "hourglass_icon.png"
    },
    "abyss_floor_06_cleared.png": {
     "size": [
      160,
      160
     ],
     "pivot": [
      80,
      80
     ],
     "room": 6,
     "state": "cleared",
     "emblem_source": "hourglass_icon.png"
    }
   },
   "map_icons": {
    "size": [
     160,
     160
    ],
    "pivot": [
     80,
     80
    ],
    "states": [
     "locked",
     "open",
     "cleared"
    ]
   }
  },
  "preview_index": {
   "01_torn.png": [
    24,
    24,
    228,
    167
   ],
   "02_torn.png": [
    244,
    24,
    448,
    167
   ],
   "03_torn.png": [
    464,
    24,
    668,
    167
   ],
   "04_torn.png": [
    684,
    24,
    888,
    167
   ],
   "05_torn.png": [
    904,
    24,
    1108,
    167
   ],
   "06_torn.png": [
    1124,
    24,
    1328,
    167
   ],
   "07_torn.png": [
    24,
    199,
    228,
    342
   ],
   "08_torn.png": [
    244,
    199,
    448,
    342
   ],
   "09_torn.png": [
    464,
    199,
    668,
    342
   ],
   "10_torn.png": [
    684,
    199,
    888,
    342
   ],
   "11_torn.png": [
    904,
    199,
    1108,
    342
   ],
   "12_torn.png": [
    1124,
    199,
    1328,
    342
   ],
   "13_interference.png": [
    24,
    374,
    228,
    517
   ],
   "13_torn.png": [
    244,
    374,
    448,
    517
   ],
   "14_refraction_lens.png": [
    464,
    374,
    668,
    517
   ],
   "14_torn.png": [
    684,
    374,
    888,
    517
   ],
   "15_duality.png": [
    904,
    374,
    1108,
    517
   ],
   "15_torn.png": [
    1124,
    374,
    1328,
    517
   ],
   "16_line_spectrum.png": [
    24,
    549,
    228,
    692
   ],
   "16_torn.png": [
    244,
    549,
    448,
    692
   ],
   "17_semiconductor.png": [
    464,
    549,
    668,
    692
   ],
   "17_torn.png": [
    684,
    549,
    888,
    692
   ],
   "18_relativity.png": [
    904,
    549,
    1108,
    692
   ],
   "18_torn.png": [
    1124,
    549,
    1328,
    692
   ],
   "abyss_floor_01_cleared.png": [
    24,
    724,
    228,
    867
   ],
   "abyss_floor_01_locked.png": [
    244,
    724,
    448,
    867
   ],
   "abyss_floor_01_open.png": [
    464,
    724,
    668,
    867
   ],
   "abyss_floor_02_cleared.png": [
    684,
    724,
    888,
    867
   ],
   "abyss_floor_02_locked.png": [
    904,
    724,
    1108,
    867
   ],
   "abyss_floor_02_open.png": [
    1124,
    724,
    1328,
    867
   ],
   "abyss_floor_03_cleared.png": [
    24,
    899,
    228,
    1042
   ],
   "abyss_floor_03_locked.png": [
    244,
    899,
    448,
    1042
   ],
   "abyss_floor_03_open.png": [
    464,
    899,
    668,
    1042
   ],
   "abyss_floor_04_cleared.png": [
    684,
    899,
    888,
    1042
   ],
   "abyss_floor_04_locked.png": [
    904,
    899,
    1108,
    1042
   ],
   "abyss_floor_04_open.png": [
    1124,
    899,
    1328,
    1042
   ],
   "abyss_floor_05_cleared.png": [
    24,
    1074,
    228,
    1217
   ],
   "abyss_floor_05_locked.png": [
    244,
    1074,
    448,
    1217
   ],
   "abyss_floor_05_open.png": [
    464,
    1074,
    668,
    1217
   ],
   "abyss_floor_06_cleared.png": [
    684,
    1074,
    888,
    1217
   ],
   "abyss_floor_06_locked.png": [
    904,
    1074,
    1108,
    1217
   ],
   "abyss_floor_06_open.png": [
    1124,
    1074,
    1328,
    1217
   ],
   "act3_final.png": [
    24,
    1249,
    228,
    1392
   ],
   "act3_intro.png": [
    244,
    1249,
    448,
    1392
   ],
   "boss_phase_banner.png": [
    464,
    1249,
    668,
    1392
   ],
   "credits_bg.png": [
    684,
    1249,
    888,
    1392
   ],
   "electron_eye_overlay.png": [
    904,
    1249,
    1108,
    1392
   ],
   "epilogue.png": [
    1124,
    1249,
    1328,
    1392
   ],
   "hourglass_compare.png": [
    24,
    1424,
    228,
    1567
   ],
   "lens_bench_ui.png": [
    244,
    1424,
    448,
    1567
   ],
   "spectroscope_view.png": [
    464,
    1424,
    668,
    1567
   ]
  }
 },
 "audio_manifest": {
  "format": "MP3; listed repeating files also supplied as OGG Vorbis",
  "sample_rate_hz": 44100,
  "files": [
   {
    "file": "bgm_title.mp3",
    "type": "bgm",
    "loop": true,
    "duration_seconds": 69.818,
    "description": "모험 시작. 물리의 마법서 주제 선율",
    "sample_rate_hz": 44100,
    "channels": 2,
    "rms_dbfs": -21.1,
    "ogg_file": "bgm_title.ogg"
   },
   {
    "file": "bgm_village_cursed.mp3",
    "type": "bgm",
    "loop": true,
    "duration_seconds": 85.333,
    "description": "평화로운 마을 선율의 미묘하게 어긋난 저주 버전",
    "sample_rate_hz": 44100,
    "channels": 2,
    "rms_dbfs": -21.1,
    "ogg_file": "bgm_village_cursed.ogg"
   },
   {
    "file": "bgm_castle_freed.mp3",
    "type": "bgm",
    "loop": true,
    "duration_seconds": 80.0,
    "description": "해방된 돌의 성, 나무 악기와 묵직한 타악기",
    "sample_rate_hz": 44100,
    "channels": 2,
    "rms_dbfs": -21.2,
    "ogg_file": "bgm_castle_freed.ogg"
   },
   {
    "file": "bgm_castle_cursed.mp3",
    "type": "bgm",
    "loop": true,
    "duration_seconds": 80.0,
    "description": "돌의 성 동일 선율·동일 길이의 탁한 저주 버전",
    "sample_rate_hz": 44100,
    "channels": 2,
    "rms_dbfs": -21.2,
    "ogg_file": "bgm_castle_cursed.ogg"
   },
   {
    "file": "bgm_truth_circle.mp3",
    "type": "bgm",
    "loop": true,
    "duration_seconds": 101.053,
    "description": "진실의 원, 맑은 피아노와 부드러운 현",
    "sample_rate_hz": 44100,
    "channels": 2,
    "rms_dbfs": -21.1,
    "ogg_file": "bgm_truth_circle.ogg"
   },
   {
    "file": "bgm_puzzle.mp3",
    "type": "bgm",
    "loop": true,
    "duration_seconds": 91.429,
    "description": "사고를 방해하지 않는 절제된 퍼즐 반복",
    "sample_rate_hz": 44100,
    "channels": 2,
    "rms_dbfs": -21.2,
    "ogg_file": "bgm_puzzle.ogg"
   },
   {
    "file": "bgm_battle.mp3",
    "type": "bgm",
    "loop": true,
    "duration_seconds": 68.571,
    "description": "빠른 일반 전투와 타악기",
    "sample_rate_hz": 44100,
    "channels": 2,
    "rms_dbfs": -21.1,
    "ogg_file": "bgm_battle.ogg"
   },
   {
    "file": "bgm_boss_act1.mp3",
    "type": "bgm",
    "loop": true,
    "duration_seconds": 76.19,
    "description": "돌의 성 주제의 긴박한 1막 보스 편곡",
    "sample_rate_hz": 44100,
    "channels": 2,
    "rms_dbfs": -21.1,
    "ogg_file": "bgm_boss_act1.ogg"
   },
   {
    "file": "bgm_exam.mp3",
    "type": "bgm",
    "loop": true,
    "duration_seconds": 106.667,
    "description": "차분한 시험, 시계 같은 박자",
    "sample_rate_hz": 44100,
    "channels": 2,
    "rms_dbfs": -21.3,
    "ogg_file": "bgm_exam.ogg"
   },
   {
    "file": "bgm_act1_clear.mp3",
    "type": "bgm",
    "loop": false,
    "duration_seconds": 12.8,
    "description": "1막 완료, 밝게 마무리되는 마법서 주제 선율",
    "sample_rate_hz": 44100,
    "channels": 2,
    "rms_dbfs": -21.2
   },
   {
    "file": "sfx_curse_break.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 2.2,
    "description": "저주 균열, 파쇄, 종 울림",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -20.3
   },
   {
    "file": "sfx_page_restore.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.65,
    "description": "종이 펄럭임과 책 착, 하프 상승음",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -20.3
   },
   {
    "file": "sfx_truth_circle_enter.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.25,
    "description": "진실의 원 진입 차임",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -18.8
   },
   {
    "file": "sfx_door_open.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 2.6,
    "description": "무거운 돌문 마찰과 열림",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -18.5
   },
   {
    "file": "sfx_puzzle_reset.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.1,
    "description": "장난스러운 뿅과 되감기",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -15.6
   },
   {
    "file": "sfx_exam_correct.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.95,
    "description": "깃펜 체크와 밝은 확인음",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -16.5
   },
   {
    "file": "sfx_exam_wrong.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.8,
    "description": "부드러운 낮은 오답 알림",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -16.3
   },
   {
    "file": "sfx_weapon_unlock.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.55,
    "description": "지팡이 빛 모임과 해금음",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -17.6
   },
   {
    "file": "sfx_text_blip_ian.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.085,
    "description": "이안 중간 높이 글자음",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -10.8
   },
   {
    "file": "sfx_text_blip_garon.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.085,
    "description": "가론 낮은 글자음",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -10.8
   },
   {
    "file": "sfx_text_blip_granny.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.1,
    "description": "할멈 살짝 떨리는 글자음",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -11.0
   },
   {
    "file": "sfx_text_blip_wizard.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.095,
    "description": "마법사 낮고 차가운 글자음",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -12.5
   },
   {
    "file": "sfx_ian_hurt.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.55,
    "description": "이안 피격 숨과 타격",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -16.3
   },
   {
    "file": "sfx_ui_click.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.16,
    "description": "가벼운 나무 메뉴 클릭",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -17.8
   },
   {
    "file": "sfx_step_stone.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.28,
    "description": "돌바닥 한 걸음",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -13.6
   },
   {
    "file": "sfx_step_ice.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.35,
    "description": "얼음 위 한 걸음과 미끄러짐",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -18.3
   },
   {
    "file": "sfx_lever_tilt.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.2,
    "description": "나무 시소 경첩과 무게 이동",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -18.6
   },
   {
    "file": "sfx_lever_balance.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.85,
    "description": "시소 균형과 문 잠금 해제",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -16.5
   },
   {
    "file": "sfx_rock_drop_launch.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.2,
    "description": "큰 돌 낙하와 시소 발사",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -16.0
   },
   {
    "file": "sfx_golem_fly.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.72,
    "description": "돌 골렘 비행",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -17.0
   },
   {
    "file": "sfx_golem_crumble.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.1,
    "description": "돌 골렘 부서짐",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -16.2
   },
   {
    "file": "sfx_tower_collapse.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.65,
    "description": "블록 미끄러짐과 와르르",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -14.6
   },
   {
    "file": "sfx_ice_slide_loop.mp3",
    "type": "sfx",
    "loop": true,
    "duration_seconds": 2.5,
    "description": "일정한 얼음 미끄러짐 반복",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -15.7,
    "ogg_file": "sfx_ice_slide_loop.ogg"
   },
   {
    "file": "sfx_cursed_stop.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.45,
    "description": "저주 상태의 급정거",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -17.0
   },
   {
    "file": "sfx_wall_ring_grab.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.8,
    "description": "쇠고리 잡고 몸이 당겨짐",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -21.4
   },
   {
    "file": "sfx_golem_charge_loop.mp3",
    "type": "sfx",
    "loop": true,
    "duration_seconds": 2.5,
    "description": "헛도는 발과 낮은 얼음 마찰 반복",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -13.2,
    "ogg_file": "sfx_golem_charge_loop.ogg"
   },
   {
    "file": "sfx_beam_kick.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.05,
    "description": "외나무다리 차기와 구르기",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -16.4
   },
   {
    "file": "sfx_golem_fall_pit.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 2.25,
    "description": "골렘 낙하와 먼 곳 충돌",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -19.0
   },
   {
    "file": "sfx_bridge_crack_1.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.52,
    "description": "판자 작은 금",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -15.9
   },
   {
    "file": "sfx_bridge_crack_2.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.75,
    "description": "판자 큰 금",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -14.3
   },
   {
    "file": "sfx_bridge_collapse.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.45,
    "description": "판자 연속 붕괴",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -16.3
   },
   {
    "file": "sfx_pressure_plate.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.58,
    "description": "돌 압력판과 잠금 클릭",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -15.8
   },
   {
    "file": "sfx_sled_brake_loop.mp3",
    "type": "sfx",
    "loop": true,
    "duration_seconds": 2.5,
    "description": "썰매 날의 반복 얼음 긁힘",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -13.8,
    "ogg_file": "sfx_sled_brake_loop.ogg"
   },
   {
    "file": "sfx_shield_bash.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.72,
    "description": "방패 금속 충돌",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -21.3
   },
   {
    "file": "sfx_throw_whoosh.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.5,
    "description": "물건 던지는 공기",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -16.0
   },
   {
    "file": "sfx_push_impact.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.58,
    "description": "서로 미는 둔탁한 충돌",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -14.5
   },
   {
    "file": "sfx_troll_roar.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.35,
    "description": "우스꽝스러운 얼음 트롤 포효",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -14.8
   },
   {
    "file": "sfx_troll_hurt.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.67,
    "description": "얼음 트롤 피격",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -14.7
   },
   {
    "file": "sfx_rail_clack.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.3,
    "description": "광차 레일 이음새 한 번",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -18.5
   },
   {
    "file": "sfx_minecart_creak.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.0,
    "description": "광차 언덕 정점 멈칫",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -16.6
   },
   {
    "file": "sfx_spring_bumper.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.9,
    "description": "가로 용수철과 광차 출발",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -20.2
   },
   {
    "file": "sfx_boulder_roll_loop.mp3",
    "type": "sfx",
    "loop": true,
    "duration_seconds": 2.5,
    "description": "바위 굴러가는 반복 소리",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -11.9,
    "ogg_file": "sfx_boulder_roll_loop.ogg"
   },
   {
    "file": "sfx_rough_scrape_loop.mp3",
    "type": "sfx",
    "loop": true,
    "duration_seconds": 2.5,
    "description": "거친 돌바닥의 반복 긁힘",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -11.8,
    "ogg_file": "sfx_rough_scrape_loop.ogg"
   },
   {
    "file": "sfx_ice_sizzle.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.2,
    "description": "얼음과 뜨거운 돌의 마찰열",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -18.9
   },
   {
    "file": "sfx_spirit_attack.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.75,
    "description": "정령 얼음 조각 발사",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -16.7
   },
   {
    "file": "sfx_spirit_deflect.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.65,
    "description": "정령이 무기를 튕김",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -16.1
   },
   {
    "file": "sfx_spirit_melt.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.65,
    "description": "정령 녹음과 물방울",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -18.5
   },
   {
    "file": "sfx_wheel_tick.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.15,
    "description": "영원의 바퀴 기계 틱 한 번",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -18.4
   },
   {
    "file": "sfx_steam_vent.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 1.15,
    "description": "증기 골렘 분출",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -18.7
   },
   {
    "file": "sfx_fuel_snap.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.45,
    "description": "연료선 끊김",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -19.3
   },
   {
    "file": "sfx_machine_powerdown.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 2.1,
    "description": "기계 톱니 연속 감속",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -15.1
   },
   {
    "file": "sfx_merchant_panic.mp3",
    "type": "sfx",
    "loop": false,
    "duration_seconds": 0.95,
    "description": "상인의 짧은 당황 음성풍 효과",
    "sample_rate_hz": 44100,
    "channels": 1,
    "rms_dbfs": -15.6
   }
  ],
  "notes": [
   "The request says 15 looping files, but its explicit list contains 9 BGM and 5 SFX: 14 files. All 14 listed loops have OGG counterparts.",
   "For seamless playback use the OGG versions; MP3 codec padding may create an audible loop gap in some engines.",
   "All BGM except act1_clear are loopable 1–2 minute compositions.",
   "Castle cursed and freed share the same motif, BPM, bar count and exact length; switch them at the same playback timestamp.",
   "The ice_slide and golem_charge loops now have a stationary noise bed and immediate full-level texture.",
   "Sounds are original synthesized retro/orchestral-style assets; nonverbal character vocalizations are stylized synth effects."
  ]
 }
};
