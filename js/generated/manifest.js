// 자동 생성 파일: work/prepare_game_assets.py 가 만든다. 직접 고치지 말 것.
window.MANIFEST = {
 "characters": {
  "ian": {
   "name": "이안",
   "frameWidth": 390,
   "frameHeight": 240,
   "pivot": {
    "x": 147.8125,
    "y": 236.25
   },
   "facing": "right",
   "animations": {
    "idle": {
     "key": "char/ian/idle",
     "frames": 4,
     "fps": 6,
     "loop": true
    },
    "walk": {
     "key": "char/ian/walk",
     "frames": 6,
     "fps": 10,
     "loop": true
    },
    "push": {
     "key": "char/ian/push",
     "frames": 4,
     "fps": 8,
     "loop": true
    },
    "push_ice": {
     "key": "char/ian/push_ice",
     "frames": 3,
     "fps": 8,
     "loop": false
    },
    "throw": {
     "key": "char/ian/throw",
     "frames": 4,
     "fps": 10,
     "loop": false
    },
    "throw_recoil": {
     "key": "char/ian/throw_recoil",
     "frames": 2,
     "fps": 8,
     "loop": false
    },
    "slide_flail": {
     "key": "char/ian/slide_flail",
     "frames": 2,
     "fps": 6,
     "loop": true
    },
    "slide_steady": {
     "key": "char/ian/slide_steady",
     "frames": 1,
     "fps": 1,
     "loop": true
    },
    "grab_ring": {
     "key": "char/ian/grab_ring",
     "frames": 4,
     "fps": 8,
     "loop": false
    },
    "hurt": {
     "key": "char/ian/hurt",
     "frames": 2,
     "fps": 8,
     "loop": false
    },
    "fall": {
     "key": "char/ian/fall",
     "frames": 3,
     "fps": 6,
     "loop": false
    },
    "realize": {
     "key": "char/ian/realize",
     "frames": 3,
     "fps": 6,
     "loop": false
    },
    "attack_light": {
     "key": "char/ian/attack_light",
     "frames": 4,
     "fps": 10,
     "loop": false
    },
    "attack_lightning": {
     "key": "char/ian/attack_lightning",
     "frames": 4,
     "fps": 10,
     "loop": false
    },
    "kick": {
     "key": "char/ian/kick",
     "frames": 4,
     "fps": 10,
     "loop": false
    },
    "rope_hang": {
     "key": "char/ian/rope_hang",
     "frames": 2,
     "fps": 6,
     "loop": true
    },
    "charge_rub": {
     "key": "char/ian/charge_rub",
     "frames": 3,
     "fps": 10,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "magnet_pull": {
     "key": "char/ian/magnet_pull",
     "frames": 3,
     "fps": 10,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "box_charge_release": {
     "key": "char/ian/box_charge_release",
     "frames": 4,
     "fps": 12,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "hold_front": {
     "key": "char/ian/hold_front",
     "frames": 2,
     "fps": 3,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     },
     "handPoints": [
      {
       "x": 243.75,
       "y": 134.0625
      },
      {
       "x": 244.375,
       "y": 133.4375
      }
     ]
    },
    "hold_eye": {
     "key": "char/ian/hold_eye",
     "frames": 2,
     "fps": 3,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     },
     "handPoints": [
      {
       "x": 222.8125,
       "y": 86.875
      },
      {
       "x": 222.8125,
       "y": 86.875
      }
     ]
    },
    "reach_down": {
     "key": "char/ian/reach_down",
     "frames": 3,
     "fps": 6,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     },
     "handPoints": [
      {
       "x": 254.375,
       "y": 221.875
      },
      {
       "x": 262.5,
       "y": 224.375
      },
      {
       "x": 253.75,
       "y": 275.625
      }
     ]
    }
   },
   "portraits": {
    "default": {
     "key": "portrait/ian/default",
     "width": 540,
     "height": 540
    },
    "surprised": {
     "key": "portrait/ian/surprised",
     "width": 540,
     "height": 540
    },
    "realization": {
     "key": "portrait/ian/realization",
     "width": 540,
     "height": 540
    },
    "thinking": {
     "key": "portrait/ian/thinking",
     "width": 540,
     "height": 540
    }
   }
  },
  "garon": {
   "name": "가론",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "right",
   "animations": {
    "idle": {
     "key": "char/garon/idle",
     "frames": 4,
     "fps": 6,
     "loop": true
    },
    "walk": {
     "key": "char/garon/walk",
     "frames": 6,
     "fps": 10,
     "loop": true
    },
    "push": {
     "key": "char/garon/push",
     "frames": 4,
     "fps": 8,
     "loop": true
    },
    "shield_charge": {
     "key": "char/garon/shield_charge",
     "frames": 4,
     "fps": 12,
     "loop": false
    },
    "ice_fall": {
     "key": "char/garon/ice_fall",
     "frames": 4,
     "fps": 8,
     "loop": false
    },
    "surprised": {
     "key": "char/garon/surprised",
     "frames": 3,
     "fps": 7,
     "loop": false
    },
    "pant": {
     "key": "char/garon/pant",
     "frames": 3,
     "fps": 6,
     "loop": true
    },
    "ice_push_recoil": {
     "key": "char/garon/ice_push_recoil",
     "frames": 3,
     "fps": 8,
     "loop": false
    },
    "shield_block": {
     "key": "char/garon/shield_block",
     "frames": 3,
     "fps": 8,
     "loop": false
    },
    "hurt": {
     "key": "char/garon/hurt",
     "frames": 2,
     "fps": 8,
     "loop": false
    },
    "rope_hang": {
     "key": "char/garon/rope_hang",
     "frames": 2,
     "fps": 6,
     "loop": true,
     "pivot": {
      "x": 200.0,
      "y": 303.125
     }
    },
    "embarrassed": {
     "key": "char/garon/embarrassed",
     "frames": 2,
     "fps": 5,
     "loop": true
    },
    "wall_push": {
     "key": "char/garon/wall_push",
     "frames": 2,
     "fps": 6,
     "loop": true
    },
    "battle_ko": {
     "key": "char/garon/battle_ko",
     "frames": 3,
     "fps": 6,
     "loop": false
    },
    "grab_ring": {
     "key": "char/garon/grab_ring",
     "frames": 4,
     "fps": 8,
     "loop": false
    },
    "slide_steady": {
     "key": "char/garon/slide_steady",
     "frames": 1,
     "fps": 1,
     "loop": true
    },
    "slip": {
     "key": "char/garon/slip",
     "frames": 2,
     "fps": 6,
     "loop": true
    },
    "kick": {
     "key": "char/garon/kick",
     "frames": 4,
     "fps": 10,
     "loop": false
    },
    "reach_down": {
     "key": "char/garon/reach_down",
     "frames": 3,
     "fps": 6,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     },
     "handPoints": [
      {
       "x": 292.1875,
       "y": 222.5
      },
      {
       "x": 305.3125,
       "y": 224.0625
      },
      {
       "x": 297.5,
       "y": 262.5
      }
     ]
    },
    "carry_torch": {
     "key": "char/garon/carry_torch",
     "frames": 2,
     "fps": 3,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     },
     "handPoints": [
      {
       "x": 289.6875,
       "y": 68.75
      },
      {
       "x": 273.75,
       "y": 77.5
      }
     ]
    }
   },
   "portraits": {
    "embarrassed": {
     "key": "portrait/garon/embarrassed",
     "width": 530,
     "height": 540
    },
    "sulky": {
     "key": "portrait/garon/sulky",
     "width": 530,
     "height": 540
    },
    "confident": {
     "key": "portrait/garon/confident",
     "width": 530,
     "height": 540
    },
    "laugh": {
     "key": "portrait/garon/laugh",
     "width": 530,
     "height": 540
    }
   },
   "torchFlame": {
    "key": "char/garon/torch_flame",
    "width": 25,
    "height": 33,
    "pivot": {
     "x": 12.5,
     "y": 32.5
    },
    "attach": [
     {
      "x": 289.6875,
      "y": 40.625
     },
     {
      "x": 273.75,
      "y": 40.625
     }
    ]
   }
  },
  "granny": {
   "name": "스톤 할멈",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "right",
   "animations": {
    "idle": {
     "key": "char/granny/idle",
     "frames": 4,
     "fps": 4,
     "loop": true
    },
    "hint": {
     "key": "char/granny/hint",
     "frames": 3,
     "fps": 6,
     "loop": false
    },
    "staff_magic": {
     "key": "char/granny/staff_magic",
     "frames": 4,
     "fps": 5,
     "loop": false
    },
    "nod_laugh": {
     "key": "char/granny/nod_laugh",
     "frames": 2,
     "fps": 5,
     "loop": false
    },
    "walk": {
     "key": "char/granny/walk",
     "frames": 6,
     "fps": 8,
     "loop": true
    },
    "surprise": {
     "key": "char/granny/surprise",
     "frames": 2,
     "fps": 6,
     "loop": false
    }
   },
   "portraits": {
    "laugh": {
     "key": "portrait/granny/laugh",
     "width": 620,
     "height": 550
    },
    "thoughtful": {
     "key": "portrait/granny/thoughtful",
     "width": 620,
     "height": 550
    },
    "warm_smile": {
     "key": "portrait/granny/warm_smile",
     "width": 620,
     "height": 550
    },
    "worried": {
     "key": "portrait/granny/worried",
     "width": 620,
     "height": 550
    }
   }
  },
  "wizard": {
   "name": "뒤틀림의 마법사",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "left",
   "animations": {
    "idle": {
     "key": "char/wizard/idle",
     "frames": 4,
     "fps": 5,
     "loop": true
    },
    "cast": {
     "key": "char/wizard/cast",
     "frames": 4,
     "fps": 8,
     "loop": false
    },
    "hurt": {
     "key": "char/wizard/hurt",
     "frames": 2,
     "fps": 8,
     "loop": false
    },
    "defeat": {
     "key": "char/wizard/defeat",
     "frames": 3,
     "fps": 5,
     "loop": false
    },
    "teleport": {
     "key": "char/wizard/teleport",
     "frames": 3,
     "fps": 7,
     "loop": false
    },
    "book_tear": {
     "key": "char/wizard/book_tear",
     "frames": 3,
     "fps": 4,
     "loop": false
    },
    "reconcile": {
     "key": "char/wizard/reconcile",
     "frames": 2,
     "fps": 3,
     "loop": false
    }
   },
   "portraits": {
    "sarcastic": {
     "key": "portrait/wizard/sarcastic",
     "width": 701,
     "height": 540
    },
    "angry": {
     "key": "portrait/wizard/angry",
     "width": 701,
     "height": 540
    },
    "startled": {
     "key": "portrait/wizard/startled",
     "width": 701,
     "height": 540
    },
    "remorseful": {
     "key": "portrait/wizard/remorseful",
     "width": 701,
     "height": 540
    }
   }
  },
  "chariot": {
   "name": "마법 전차",
   "frameWidth": 600,
   "frameHeight": 320,
   "pivot": {
    "x": 300.0,
    "y": 250.0
   },
   "facing": "left",
   "animations": {
    "ride": {
     "key": "char/chariot/ride",
     "frames": 3,
     "fps": 6,
     "loop": true
    }
   },
   "portraits": {},
   "vehicles": {
    "vehicle_normal": "char/chariot/vehicle_normal",
    "vehicle_contracted": "char/chariot/vehicle_contracted"
   },
   "lengthContraction": 0.65
  },
  "villager_child": {
   "name": "아이",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "right",
   "animations": {
    "idle": {
     "key": "char/villager_child/idle",
     "frames": 2,
     "fps": 2,
     "loop": true
    },
    "walk": {
     "key": "char/villager_child/walk",
     "frames": 4,
     "fps": 6,
     "loop": true
    },
    "wave": {
     "key": "char/villager_child/wave",
     "frames": 2,
     "fps": 4,
     "loop": true
    },
    "throw": {
     "key": "char/villager_child/throw",
     "frames": 2,
     "fps": 6,
     "loop": false
    }
   },
   "portraits": {}
  },
  "villager_merchant": {
   "name": "상인",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "right",
   "animations": {
    "idle": {
     "key": "char/villager_merchant/idle",
     "frames": 2,
     "fps": 2,
     "loop": true
    },
    "walk": {
     "key": "char/villager_merchant/walk",
     "frames": 4,
     "fps": 6,
     "loop": true
    },
    "wave": {
     "key": "char/villager_merchant/wave",
     "frames": 2,
     "fps": 4,
     "loop": true
    },
    "throw": {
     "key": "char/villager_merchant/throw",
     "frames": 2,
     "fps": 6,
     "loop": false
    }
   },
   "portraits": {}
  },
  "villager_farmer": {
   "name": "농부",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "right",
   "animations": {
    "idle": {
     "key": "char/villager_farmer/idle",
     "frames": 2,
     "fps": 2,
     "loop": true
    },
    "walk": {
     "key": "char/villager_farmer/walk",
     "frames": 4,
     "fps": 6,
     "loop": true
    },
    "wave": {
     "key": "char/villager_farmer/wave",
     "frames": 2,
     "fps": 4,
     "loop": true
    },
    "throw": {
     "key": "char/villager_farmer/throw",
     "frames": 2,
     "fps": 6,
     "loop": false
    }
   },
   "portraits": {}
  },
  "villager_fisher": {
   "name": "어부",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "right",
   "animations": {
    "idle": {
     "key": "char/villager_fisher/idle",
     "frames": 2,
     "fps": 2,
     "loop": true
    },
    "walk": {
     "key": "char/villager_fisher/walk",
     "frames": 4,
     "fps": 6,
     "loop": true
    },
    "wave": {
     "key": "char/villager_fisher/wave",
     "frames": 2,
     "fps": 4,
     "loop": true
    },
    "throw": {
     "key": "char/villager_fisher/throw",
     "frames": 2,
     "fps": 6,
     "loop": false
    }
   },
   "portraits": {}
  },
  "stone_golem": {
   "name": "돌 골렘",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "left",
   "animations": {
    "idle": {
     "key": "char/stone_golem/idle",
     "frames": 2,
     "fps": 3,
     "loop": true
    },
    "walk": {
     "key": "char/stone_golem/walk",
     "frames": 4,
     "fps": 6,
     "loop": true
    },
    "punch": {
     "key": "char/stone_golem/punch",
     "frames": 3,
     "fps": 8,
     "loop": false
    },
    "hit": {
     "key": "char/stone_golem/hit",
     "frames": 1,
     "fps": 1,
     "loop": false
    },
    "launch": {
     "key": "char/stone_golem/launch",
     "frames": 2,
     "fps": 8,
     "loop": false
    },
    "crumble": {
     "key": "char/stone_golem/crumble",
     "frames": 3,
     "fps": 7,
     "loop": false
    }
   },
   "portraits": {}
  },
  "inertia_golem": {
   "name": "관성의 골렘",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "left",
   "animations": {
    "idle": {
     "key": "char/inertia_golem/idle",
     "frames": 2,
     "fps": 1,
     "loop": true
    },
    "charge": {
     "key": "char/inertia_golem/charge",
     "frames": 3,
     "fps": 8,
     "loop": true
    },
    "struggle": {
     "key": "char/inertia_golem/struggle",
     "frames": 3,
     "fps": 7,
     "loop": true
    },
    "fall": {
     "key": "char/inertia_golem/fall",
     "frames": 3,
     "fps": 7,
     "loop": false
    }
   },
   "portraits": {}
  },
  "ice_troll": {
   "name": "얼음 트롤",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "left",
   "animations": {
    "idle": {
     "key": "char/ice_troll/idle",
     "frames": 2,
     "fps": 2,
     "loop": true
    },
    "push": {
     "key": "char/ice_troll/push",
     "frames": 3,
     "fps": 8,
     "loop": false
    },
    "recoil": {
     "key": "char/ice_troll/recoil",
     "frames": 2,
     "fps": 7,
     "loop": false
    },
    "hit": {
     "key": "char/ice_troll/hit",
     "frames": 1,
     "fps": 1,
     "loop": false
    },
    "defeat": {
     "key": "char/ice_troll/defeat",
     "frames": 2,
     "fps": 6,
     "loop": false
    }
   },
   "portraits": {}
  },
  "ice_spirit": {
   "name": "얼음 정령",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "left",
   "animations": {
    "hover": {
     "key": "char/ice_spirit/hover",
     "frames": 2,
     "fps": 3,
     "loop": true
    },
    "attack": {
     "key": "char/ice_spirit/attack",
     "frames": 3,
     "fps": 7,
     "loop": false
    },
    "deflect": {
     "key": "char/ice_spirit/deflect",
     "frames": 1,
     "fps": 1,
     "loop": false
    },
    "melt": {
     "key": "char/ice_spirit/melt",
     "frames": 4,
     "fps": 6,
     "loop": false
    }
   },
   "portraits": {}
  },
  "merchant": {
   "name": "영구기관 상인",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "left",
   "animations": {
    "idle": {
     "key": "char/merchant/idle",
     "frames": 2,
     "fps": 2,
     "loop": true
    },
    "boast": {
     "key": "char/merchant/boast",
     "frames": 2,
     "fps": 5,
     "loop": false
    },
    "summon": {
     "key": "char/merchant/summon",
     "frames": 2,
     "fps": 5,
     "loop": false
    },
    "panic": {
     "key": "char/merchant/panic",
     "frames": 2,
     "fps": 5,
     "loop": false
    }
   },
   "portraits": {}
  },
  "steam_golem": {
   "name": "증기 골렘",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "left",
   "animations": {
    "idle": {
     "key": "char/steam_golem/idle",
     "frames": 2,
     "fps": 2,
     "loop": true
    },
    "work": {
     "key": "char/steam_golem/work",
     "frames": 3,
     "fps": 7,
     "loop": true
    },
    "fuel_stop": {
     "key": "char/steam_golem/fuel_stop",
     "frames": 2,
     "fps": 4,
     "loop": false
    }
   },
   "portraits": {}
  },
  "wheel": {
   "name": "영원의 바퀴",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "rotorAxis": {
    "x": 199.6875,
    "y": 150.9375
   },
   "layers": {
    "stand": "char/wheel/stand",
    "rotor": "char/wheel/rotor"
   },
   "animations": {},
   "portraits": {}
  },
  "spark_fairy_positive": {
   "name": "불꽃 요정(+)",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 168.75
   },
   "facing": "left",
   "animations": {
    "float": {
     "key": "char/spark_fairy_positive/float",
     "frames": 3,
     "fps": 5,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "pushed": {
     "key": "char/spark_fairy_positive/pushed",
     "frames": 2,
     "fps": 8,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "pulled": {
     "key": "char/spark_fairy_positive/pulled",
     "frames": 2,
     "fps": 8,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "attack": {
     "key": "char/spark_fairy_positive/attack",
     "frames": 3,
     "fps": 10,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "vanish": {
     "key": "char/spark_fairy_positive/vanish",
     "frames": 3,
     "fps": 10,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    }
   },
   "portraits": {}
  },
  "spark_fairy_negative": {
   "name": "불꽃 요정(−)",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 168.75
   },
   "facing": "left",
   "animations": {
    "float": {
     "key": "char/spark_fairy_negative/float",
     "frames": 3,
     "fps": 5,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "pushed": {
     "key": "char/spark_fairy_negative/pushed",
     "frames": 2,
     "fps": 8,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "pulled": {
     "key": "char/spark_fairy_negative/pulled",
     "frames": 2,
     "fps": 8,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "attack": {
     "key": "char/spark_fairy_negative/attack",
     "frames": 3,
     "fps": 10,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "vanish": {
     "key": "char/spark_fairy_negative/vanish",
     "frames": 3,
     "fps": 10,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    }
   },
   "portraits": {}
  },
  "silent_statue": {
   "name": "침묵의 석상",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "right",
   "animations": {
    "silent": {
     "key": "char/silent_statue/silent",
     "frames": 1,
     "fps": 3,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "speaker_on": {
     "key": "char/silent_statue/speaker_on",
     "frames": 1,
     "fps": 3,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "talk": {
     "key": "char/silent_statue/talk",
     "frames": 2,
     "fps": 3,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    }
   },
   "portraits": {
    "silent": {
     "key": "portrait/silent_statue/silent",
     "width": 540,
     "height": 540
    },
    "talk": {
     "key": "portrait/silent_statue/talk",
     "width": 540,
     "height": 540
    }
   }
  },
  "iron_knight": {
   "name": "철 기사",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "left",
   "animations": {
    "idle": {
     "key": "char/iron_knight/idle",
     "frames": 2,
     "fps": 2,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "walk": {
     "key": "char/iron_knight/walk",
     "frames": 4,
     "fps": 8,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "attack": {
     "key": "char/iron_knight/attack",
     "frames": 3,
     "fps": 10,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "hurt": {
     "key": "char/iron_knight/hurt",
     "frames": 1,
     "fps": 5,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "defeat": {
     "key": "char/iron_knight/defeat",
     "frames": 3,
     "fps": 6,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "magnet_dragged": {
     "key": "char/iron_knight/magnet_dragged",
     "frames": 2,
     "fps": 5,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "disarmed": {
     "key": "char/iron_knight/disarmed",
     "frames": 2,
     "fps": 5,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    }
   },
   "portraits": {}
  },
  "copper_soldier": {
   "name": "구리 병사",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "left",
   "animations": {
    "idle": {
     "key": "char/copper_soldier/idle",
     "frames": 2,
     "fps": 2,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "walk": {
     "key": "char/copper_soldier/walk",
     "frames": 4,
     "fps": 8,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "attack": {
     "key": "char/copper_soldier/attack",
     "frames": 3,
     "fps": 10,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "hurt": {
     "key": "char/copper_soldier/hurt",
     "frames": 1,
     "fps": 5,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "defeat": {
     "key": "char/copper_soldier/defeat",
     "frames": 3,
     "fps": 6,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "magnet_resist": {
     "key": "char/copper_soldier/magnet_resist",
     "frames": 1,
     "fps": 5,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    }
   },
   "portraits": {}
  },
  "magnet_golem": {
   "name": "자석 골렘",
   "frameWidth": 454,
   "frameHeight": 363,
   "pivot": {
    "x": 226.80412371134022,
    "y": 283.50515463917526
   },
   "facing": "left",
   "animations": {
    "idle": {
     "key": "char/magnet_golem/idle",
     "frames": 2,
     "fps": 2,
     "loop": true,
     "frameWidth": 454,
     "frameHeight": 363,
     "pivot": {
      "x": 226.80412371134022,
      "y": 283.50515463917526
     }
    },
    "walk": {
     "key": "char/magnet_golem/walk",
     "frames": 4,
     "fps": 7,
     "loop": true,
     "frameWidth": 454,
     "frameHeight": 363,
     "pivot": {
      "x": 226.80412371134022,
      "y": 283.50515463917526
     }
    },
    "attack": {
     "key": "char/magnet_golem/attack",
     "frames": 3,
     "fps": 9,
     "loop": false,
     "frameWidth": 454,
     "frameHeight": 363,
     "pivot": {
      "x": 226.80412371134022,
      "y": 283.50515463917526
     }
    },
    "magnet_pull": {
     "key": "char/magnet_golem/magnet_pull",
     "frames": 3,
     "fps": 7,
     "loop": false,
     "frameWidth": 454,
     "frameHeight": 363,
     "pivot": {
      "x": 226.80412371134022,
      "y": 283.50515463917526
     }
    },
    "hurt": {
     "key": "char/magnet_golem/hurt",
     "frames": 2,
     "fps": 5,
     "loop": false,
     "frameWidth": 454,
     "frameHeight": 363,
     "pivot": {
      "x": 226.80412371134022,
      "y": 283.50515463917526
     }
    },
    "slowing": {
     "key": "char/magnet_golem/slowing",
     "frames": 2,
     "fps": 5,
     "loop": false,
     "frameWidth": 454,
     "frameHeight": 363,
     "pivot": {
      "x": 226.80412371134022,
      "y": 283.50515463917526
     }
    },
    "defeat": {
     "key": "char/magnet_golem/defeat",
     "frames": 3,
     "fps": 5,
     "loop": false,
     "frameWidth": 454,
     "frameHeight": 363,
     "pivot": {
      "x": 226.80412371134022,
      "y": 283.50515463917526
     }
    }
   },
   "portraits": {},
   "displayScale": 0.3543814432989691
  },
  "light_wraith": {
   "name": "빛의 망령",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 197.5,
    "y": 160.0
   },
   "facing": "left",
   "animations": {
    "float": {
     "key": "char/light_wraith/float",
     "frames": 3,
     "fps": 3,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 197.5,
      "y": 160.0
     }
    },
    "attack": {
     "key": "char/light_wraith/attack",
     "frames": 3,
     "fps": 8,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 197.5,
      "y": 160.0
     },
     "beamPoints": [
      {
       "x": 153.75,
       "y": 156.25
      },
      {
       "x": 82.8125,
       "y": 139.0625
      },
      {
       "x": 83.125,
       "y": 130.9375
      }
     ]
    },
    "hurt": {
     "key": "char/light_wraith/hurt",
     "frames": 1,
     "fps": 1,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 197.5,
      "y": 160.0
     }
    },
    "vanish": {
     "key": "char/light_wraith/vanish",
     "frames": 3,
     "fps": 7,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 197.5,
      "y": 160.0
     }
    }
   },
   "portraits": {},
   "collisionBox": [
    153.125,
    73.4375,
    93.75,
    190.625
   ]
  },
  "crystal_fish": {
   "name": "수정 물고기",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 168.75
   },
   "facing": "left",
   "animations": {
    "swim": {
     "key": "char/crystal_fish/swim",
     "frames": 3,
     "fps": 5,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "hurt": {
     "key": "char/crystal_fish/hurt",
     "frames": 1,
     "fps": 1,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "defeat": {
     "key": "char/crystal_fish/defeat",
     "frames": 2,
     "fps": 5,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    }
   },
   "portraits": {},
   "collisionBox": [
    153.125,
    137.5,
    93.75,
    62.5
   ]
  },
  "shadow_bug": {
   "name": "그림자 벌레",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 250.0
   },
   "facing": "left",
   "animations": {
    "crawl": {
     "key": "char/shadow_bug/crawl",
     "frames": 3,
     "fps": 8,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "attack": {
     "key": "char/shadow_bug/attack",
     "frames": 2,
     "fps": 8,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    },
    "defeat": {
     "key": "char/shadow_bug/defeat",
     "frames": 2,
     "fps": 5,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 250.0
     }
    }
   },
   "portraits": {},
   "collisionBox": [
    181.25,
    212.5,
    37.5,
    37.5
   ]
  },
  "elemental_hydrogen": {
   "name": "원소 정령(수소)",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 168.75
   },
   "facing": "left",
   "animations": {
    "float": {
     "key": "char/elemental_hydrogen/float",
     "frames": 3,
     "fps": 3,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "attack": {
     "key": "char/elemental_hydrogen/attack",
     "frames": 3,
     "fps": 8,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "hurt": {
     "key": "char/elemental_hydrogen/hurt",
     "frames": 1,
     "fps": 7,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "vanish": {
     "key": "char/elemental_hydrogen/vanish",
     "frames": 3,
     "fps": 7,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    }
   },
   "portraits": {},
   "collisionBox": [
    153.125,
    118.75,
    93.75,
    100.0
   ],
   "glow": {
    "key": "char/elemental_hydrogen/glow",
    "width": 250,
    "height": 250,
    "pivot": {
     "x": 125.0,
     "y": 125.0
    }
   },
   "emissionColor": [
    241,
    99,
    132
   ]
  },
  "elemental_sodium": {
   "name": "원소 정령(나트륨)",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 168.75
   },
   "facing": "left",
   "animations": {
    "float": {
     "key": "char/elemental_sodium/float",
     "frames": 3,
     "fps": 3,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "attack": {
     "key": "char/elemental_sodium/attack",
     "frames": 3,
     "fps": 8,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "hurt": {
     "key": "char/elemental_sodium/hurt",
     "frames": 1,
     "fps": 7,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "vanish": {
     "key": "char/elemental_sodium/vanish",
     "frames": 3,
     "fps": 7,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    }
   },
   "portraits": {},
   "collisionBox": [
    153.125,
    118.75,
    93.75,
    100.0
   ],
   "glow": {
    "key": "char/elemental_sodium/glow",
    "width": 250,
    "height": 250,
    "pivot": {
     "x": 125.0,
     "y": 125.0
    }
   },
   "emissionColor": [
    255,
    177,
    52
   ]
  },
  "elemental_neon": {
   "name": "원소 정령(네온)",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 168.75
   },
   "facing": "left",
   "animations": {
    "float": {
     "key": "char/elemental_neon/float",
     "frames": 3,
     "fps": 3,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "attack": {
     "key": "char/elemental_neon/attack",
     "frames": 3,
     "fps": 8,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "hurt": {
     "key": "char/elemental_neon/hurt",
     "frames": 1,
     "fps": 7,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "vanish": {
     "key": "char/elemental_neon/vanish",
     "frames": 3,
     "fps": 7,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    }
   },
   "portraits": {},
   "collisionBox": [
    153.125,
    118.75,
    93.75,
    100.0
   ],
   "glow": {
    "key": "char/elemental_neon/glow",
    "width": 250,
    "height": 250,
    "pivot": {
     "x": 125.0,
     "y": 125.0
    }
   },
   "emissionColor": [
    245,
    85,
    47
   ]
  },
  "elemental_mercury": {
   "name": "원소 정령(수은)",
   "frameWidth": 400,
   "frameHeight": 320,
   "pivot": {
    "x": 200.0,
    "y": 168.75
   },
   "facing": "left",
   "animations": {
    "float": {
     "key": "char/elemental_mercury/float",
     "frames": 3,
     "fps": 3,
     "loop": true,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "attack": {
     "key": "char/elemental_mercury/attack",
     "frames": 3,
     "fps": 8,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "hurt": {
     "key": "char/elemental_mercury/hurt",
     "frames": 1,
     "fps": 7,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    },
    "vanish": {
     "key": "char/elemental_mercury/vanish",
     "frames": 3,
     "fps": 7,
     "loop": false,
     "frameWidth": 400,
     "frameHeight": 320,
     "pivot": {
      "x": 200.0,
      "y": 168.75
     }
    }
   },
   "portraits": {},
   "collisionBox": [
    153.125,
    118.75,
    93.75,
    100.0
   ],
   "glow": {
    "key": "char/elemental_mercury/glow",
    "width": 250,
    "height": 250,
    "pivot": {
     "x": 125.0,
     "y": 125.0
    }
   },
   "emissionColor": [
    134,
    240,
    171
   ]
  }
 },
 "backgrounds": {
  "00_village_entrance": {
   "key": "bg/00_village_entrance",
   "pack": "bg_00_village_entrance",
   "title": "마을과 던전 입구",
   "worldWidth": 2701,
   "worldHeight": 1080,
   "groundY": 844
  },
  "01_castle_lever": {
   "key": "bg/01_castle_lever",
   "pack": "bg_01_castle_lever",
   "title": "1-1 시소 성",
   "worldWidth": 2954,
   "worldHeight": 1080,
   "groundY": 883,
   "ruler": "ruler/01_castle_lever"
  },
  "02_ice_corridor": {
   "key": "bg/02_ice_corridor",
   "pack": "bg_02_ice_corridor",
   "title": "1-2 얼음 회랑 30m",
   "worldWidth": 3750,
   "worldHeight": 1080,
   "groundY": 865,
   "ruler": "ruler/02_ice_corridor"
  },
  "03_collapsing_bridge": {
   "key": "bg/03_collapsing_bridge",
   "pack": "bg_03_collapsing_bridge",
   "title": "1-2 붕괴 다리",
   "worldWidth": 2141,
   "worldHeight": 1080,
   "groundY": 599,
   "ruler": "ruler/03_collapsing_bridge"
  },
  "04_sled_path": {
   "key": "bg/04_sled_path",
   "pack": "bg_04_sled_path",
   "title": "1-2 썰매 길",
   "worldWidth": 3240,
   "worldHeight": 1080,
   "groundY": 806
  },
  "05_ice_lake": {
   "key": "bg/05_ice_lake",
   "pack": "bg_05_ice_lake",
   "title": "1-3 얼음 호수",
   "worldWidth": 5000,
   "worldHeight": 1080,
   "groundY": 858
  },
  "06_minecart_tower": {
   "key": "bg/06_minecart_tower",
   "pack": "bg_06_minecart_tower",
   "title": "1-4 광차 탑",
   "worldWidth": 1920,
   "worldHeight": 1080,
   "groundY": 1050,
   "ruler": "ruler/06_minecart_tower"
  },
  "07_rough_stone": {
   "key": "bg/07_rough_stone",
   "pack": "bg_07_rough_stone",
   "title": "1-5 마찰 바닥",
   "worldWidth": 2430,
   "worldHeight": 1080,
   "groundY": 872
  },
  "08_merchant_plaza": {
   "key": "bg/08_merchant_plaza",
   "pack": "bg_08_merchant_plaza",
   "title": "1-6 상인 광장",
   "worldWidth": 2970,
   "worldHeight": 1080,
   "groundY": 929
  },
  "tower_f1": {
   "key": "bg/tower_f1",
   "pack": "bg_tower_f1",
   "title": "2-1 탑 1층 실험실",
   "worldWidth": 2700,
   "worldHeight": 1080,
   "groundY": 865
  },
  "tower_f2": {
   "key": "bg/tower_f2",
   "pack": "bg_tower_f2",
   "title": "2-2 탑 2층 등불의 방",
   "worldWidth": 1920,
   "worldHeight": 1080,
   "groundY": 865
  },
  "tower_f3": {
   "key": "bg/tower_f3",
   "pack": "bg_tower_f3",
   "title": "2-3 탑 3층 번개 문",
   "worldWidth": 2400,
   "worldHeight": 1080,
   "groundY": 865
  },
  "tower_f4": {
   "key": "bg/tower_f4",
   "pack": "bg_tower_f4",
   "title": "2-4 탑 4층 자석 금고",
   "worldWidth": 2400,
   "worldHeight": 1080,
   "groundY": 865
  },
  "tower_f5": {
   "key": "bg/tower_f5",
   "pack": "bg_tower_f5",
   "title": "2-5 승강기와 석상의 방",
   "worldWidth": 2400,
   "worldHeight": 1080,
   "groundY": 865
  },
  "tower_top": {
   "key": "bg/tower_top",
   "pack": "bg_tower_top",
   "title": "2-6 탑 꼭대기 봉화대",
   "worldWidth": 3000,
   "worldHeight": 1080,
   "groundY": 865
  },
  "abyss_1": {
   "key": "bg/abyss_1",
   "pack": "bg_abyss_1",
   "title": "3-1 어두운 줄무늬의 벽",
   "worldWidth": 2400,
   "worldHeight": 1080,
   "groundY": 865,
   "zones": {
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
   }
  },
  "abyss_2": {
   "key": "bg/abyss_2",
   "pack": "bg_abyss_2",
   "title": "3-2 물웅덩이와 렌즈의 방",
   "worldWidth": 2400,
   "worldHeight": 1080,
   "groundY": 865,
   "zones": {
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
   "pool": {
    "x": [
     600,
     1200
    ],
    "surface_y": 865,
    "bottom_y": 1050,
    "contains_water": false
   }
  },
  "abyss_3": {
   "key": "bg/abyss_3",
   "pack": "bg_abyss_3",
   "title": "3-3 너무 작은 룬 문자의 방",
   "worldWidth": 2400,
   "worldHeight": 1080,
   "groundY": 865,
   "zones": {
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
  "abyss_4": {
   "key": "bg/abyss_4",
   "pack": "bg_abyss_4",
   "title": "3-4 바코드 등불의 방",
   "worldWidth": 2400,
   "worldHeight": 1080,
   "groundY": 865,
   "zones": {
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
   }
  },
  "abyss_5": {
   "key": "bg/abyss_5",
   "pack": "bg_abyss_5",
   "title": "3-5 수정 다리",
   "worldWidth": 3000,
   "worldHeight": 1080,
   "groundY": 865,
   "zones": {
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
   "chasmX": [
    400,
    2600
   ]
  },
  "abyss_end": {
   "key": "bg/abyss_end",
   "pack": "bg_abyss_end",
   "title": "3-6 심연의 끝",
   "worldWidth": 3000,
   "worldHeight": 1080,
   "groundY": 865,
   "zones": {
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
   }
  },
  "abyss_chase": {
   "key": "bg/abyss_chase",
   "pack": "bg_abyss_chase",
   "title": "최종 보스 추격",
   "worldWidth": 3840,
   "worldHeight": 1080,
   "groundY": 865,
   "zones": {},
   "repeatable": true
  }
 },
 "truthCircle": {
  "key": "truth_circle",
  "width": 450,
  "height": 135,
  "diameterM": 3.6
 },
 "objects": {
  "seesaw_plank": {
   "key": "obj/seesaw_plank",
   "pack": "obj_1-1",
   "width": 650,
   "height": 63,
   "pivot": {
    "x": 325,
    "y": 63
   }
  },
  "seesaw_fulcrum": {
   "key": "obj/seesaw_fulcrum",
   "pack": "obj_1-1",
   "width": 170,
   "height": 107,
   "pivot": {
    "x": 85,
    "y": 107
   }
  },
  "castle_gate": {
   "key": "obj/castle_gate",
   "pack": "obj_1-1",
   "width": 309,
   "height": 440,
   "pivot": {
    "x": 154,
    "y": 440
   }
  },
  "tower_block": {
   "key": "obj/tower_block",
   "pack": "obj_1-1",
   "width": 125,
   "height": 49,
   "pivot": {
    "x": 62,
    "y": 49
   }
  },
  "stone_cart": {
   "key": "obj/stone_cart",
   "pack": "obj_1-2",
   "width": 300,
   "height": 136,
   "pivot": {
    "x": 150,
    "y": 136
   }
  },
  "wall_ring": {
   "key": "obj/wall_ring",
   "pack": "obj_1-2",
   "width": 105,
   "height": 149,
   "pivot": {
    "x": 52,
    "y": 149
   }
  },
  "bridge_segment": {
   "key": "obj/bridge_segment",
   "pack": "obj_1-2",
   "width": 125,
   "height": 20,
   "pivot": {
    "x": 62,
    "y": 20
   }
  },
  "bridge_segment_crack_01": {
   "key": "obj/bridge_segment_crack_01",
   "pack": "obj_1-2",
   "width": 125,
   "height": 20,
   "pivot": {
    "x": 62,
    "y": 20
   }
  },
  "bridge_segment_crack_02": {
   "key": "obj/bridge_segment_crack_02",
   "pack": "obj_1-2",
   "width": 125,
   "height": 20,
   "pivot": {
    "x": 62,
    "y": 20
   }
  },
  "pressure_plate": {
   "key": "obj/pressure_plate",
   "pack": "obj_1-2",
   "width": 165,
   "height": 37,
   "pivot": {
    "x": 82,
    "y": 37
   }
  },
  "pit_opening": {
   "key": "obj/pit_opening",
   "pack": "obj_1-2",
   "width": 430,
   "height": 105,
   "pivot": {
    "x": 215,
    "y": 105
   }
  },
  "narrow_beam": {
   "key": "obj/narrow_beam",
   "pack": "obj_1-2",
   "width": 430,
   "height": 34,
   "pivot": {
    "x": 215,
    "y": 34
   }
  },
  "bridge_phase_marker": {
   "key": "obj/bridge_phase_marker",
   "pack": "obj_1-2",
   "width": 55,
   "height": 23,
   "pivot": {
    "x": 27,
    "y": 23
   }
  },
  "stone_10kg": {
   "key": "obj/stone_10kg",
   "pack": "obj_1-2",
   "width": 70,
   "height": 70,
   "pivot": {
    "x": 35,
    "y": 70
   },
   "mass_kg": 10,
   "radius_px": 35
  },
  "stone_15kg": {
   "key": "obj/stone_15kg",
   "pack": "obj_1-2",
   "width": 80,
   "height": 80,
   "pivot": {
    "x": 40,
    "y": 80
   },
   "mass_kg": 15,
   "radius_px": 40
  },
  "stone_20kg": {
   "key": "obj/stone_20kg",
   "pack": "obj_1-2",
   "width": 88,
   "height": 88,
   "pivot": {
    "x": 44,
    "y": 88
   },
   "mass_kg": 20,
   "radius_px": 44
  },
  "stone_40kg": {
   "key": "obj/stone_40kg",
   "pack": "obj_1-2",
   "width": 111,
   "height": 111,
   "pivot": {
    "x": 55,
    "y": 111
   },
   "mass_kg": 40,
   "radius_px": 55
  },
  "stone_160kg": {
   "key": "obj/stone_160kg",
   "pack": "obj_1-2",
   "width": 177,
   "height": 177,
   "pivot": {
    "x": 88,
    "y": 177
   },
   "mass_kg": 160,
   "radius_px": 88
  },
  "stone_10kg_label": {
   "key": "obj/stone_10kg_label",
   "pack": "obj_1-2",
   "width": 70,
   "height": 26,
   "pivot": {
    "x": 35,
    "y": 26
   }
  },
  "stone_15kg_label": {
   "key": "obj/stone_15kg_label",
   "pack": "obj_1-2",
   "width": 80,
   "height": 26,
   "pivot": {
    "x": 40,
    "y": 26
   }
  },
  "stone_20kg_label": {
   "key": "obj/stone_20kg_label",
   "pack": "obj_1-2",
   "width": 88,
   "height": 26,
   "pivot": {
    "x": 44,
    "y": 26
   }
  },
  "stone_40kg_label": {
   "key": "obj/stone_40kg_label",
   "pack": "obj_1-2",
   "width": 111,
   "height": 26,
   "pivot": {
    "x": 55,
    "y": 26
   }
  },
  "stone_160kg_label": {
   "key": "obj/stone_160kg_label",
   "pack": "obj_1-2",
   "width": 177,
   "height": 26,
   "pivot": {
    "x": 88,
    "y": 26
   }
  },
  "sled": {
   "key": "obj/sled",
   "pack": "obj_1-2_sled",
   "width": 290,
   "height": 124,
   "pivot": {
    "x": 145,
    "y": 124
   }
  },
  "stop_line": {
   "key": "obj/stop_line",
   "pack": "obj_1-2_sled",
   "width": 145,
   "height": 15,
   "pivot": {
    "x": 72,
    "y": 15
   }
  },
  "speed_sign": {
   "key": "obj/speed_sign",
   "pack": "obj_1-2_sled",
   "width": 157,
   "height": 195,
   "pivot": {
    "x": 78,
    "y": 195
   }
  },
  "speed_sign_2ms_overlay": {
   "key": "obj/speed_sign_2ms_overlay",
   "pack": "obj_1-2_sled",
   "width": 157,
   "height": 195,
   "pivot": {
    "x": 78,
    "y": 195
   }
  },
  "herb_basket": {
   "key": "obj/herb_basket",
   "pack": "obj_1-3",
   "width": 70,
   "height": 58,
   "pivot": {
    "x": 35,
    "y": 58
   }
  },
  "rope_coil": {
   "key": "obj/rope_coil",
   "pack": "obj_1-3",
   "width": 65,
   "height": 38,
   "pivot": {
    "x": 32,
    "y": 38
   }
  },
  "merchant_parcel": {
   "key": "obj/merchant_parcel",
   "pack": "obj_1-3",
   "width": 65,
   "height": 50,
   "pivot": {
    "x": 32,
    "y": 50
   }
  },
  "child_pouch": {
   "key": "obj/child_pouch",
   "pack": "obj_1-3",
   "width": 55,
   "height": 68,
   "pivot": {
    "x": 27,
    "y": 68
   }
  },
  "minecart": {
   "key": "obj/minecart",
   "pack": "obj_1-4",
   "width": 230,
   "height": 116,
   "pivot": {
    "x": 115,
    "y": 116
   }
  },
  "spring_bumper": {
   "key": "obj/spring_bumper",
   "pack": "obj_1-4",
   "width": 155,
   "height": 105,
   "pivot": {
    "x": 77,
    "y": 105
   }
  },
  "spring_plate": {
   "key": "obj/spring_plate",
   "pack": "obj_future_jump",
   "width": 175,
   "height": 80,
   "pivot": {
    "x": 87,
    "y": 80
   }
  },
  "rail_segment": {
   "key": "obj/rail_segment",
   "pack": "obj_1-4",
   "width": 125,
   "height": 34,
   "pivot": {
    "x": 62,
    "y": 34
   }
  },
  "melting_ice_hole_01": {
   "key": "obj/melting_ice_hole_01",
   "pack": "obj_1-5",
   "width": 95,
   "height": 38,
   "pivot": {
    "x": 47,
    "y": 19
   }
  },
  "melting_ice_hole_02": {
   "key": "obj/melting_ice_hole_02",
   "pack": "obj_1-5",
   "width": 140,
   "height": 56,
   "pivot": {
    "x": 70,
    "y": 28
   }
  },
  "melting_ice_hole_03": {
   "key": "obj/melting_ice_hole_03",
   "pack": "obj_1-5",
   "width": 195,
   "height": 77,
   "pivot": {
    "x": 97,
    "y": 38
   }
  },
  "melting_ice_hole_04": {
   "key": "obj/melting_ice_hole_04",
   "pack": "obj_1-5",
   "width": 250,
   "height": 99,
   "pivot": {
    "x": 125,
    "y": 49
   }
  },
  "merchant_display": {
   "key": "obj/merchant_display",
   "pack": "obj_1-6",
   "width": 460,
   "height": 128,
   "pivot": {
    "x": 230,
    "y": 128
   }
  },
  "rail_path": {
   "key": "obj/rail_path",
   "pack": "obj_1-4",
   "width": 1920,
   "height": 1080,
   "pivot": {
    "x": 0,
    "y": 0
   }
  },
  "start_stone_floor": {
   "key": "obj/start_stone_floor",
   "pack": "obj_1-2",
   "width": 250,
   "height": 60,
   "pivot": {
    "x": 0,
    "y": 0
   }
  },
  "corridor_door": {
   "key": "obj/corridor_door",
   "pack": "obj_1-1",
   "width": 309,
   "height": 440,
   "pivot": {
    "x": 154,
    "y": 440
   }
  },
  "curse_seal": {
   "key": "obj/curse_seal",
   "pack": "obj_1-2",
   "width": 309,
   "height": 440,
   "pivot": {
    "x": 154,
    "y": 440
   }
  },
  "pit_with_golem": {
   "key": "obj/pit_with_golem",
   "pack": "obj_1-2",
   "width": 430,
   "height": 105,
   "pivot": {
    "x": 215,
    "y": 105
   }
  },
  "brake_line": {
   "key": "obj/brake_line",
   "pack": "obj_1-2_sled",
   "width": 145,
   "height": 15,
   "pivot": {
    "x": 72,
    "y": 15
   }
  },
  "lake_shore_left": {
   "key": "obj/lake_shore_left",
   "pack": "obj_1-3",
   "width": 500,
   "height": 90,
   "pivot": {
    "x": 0,
    "y": 30
   }
  },
  "lake_shore_right": {
   "key": "obj/lake_shore_right",
   "pack": "obj_1-3",
   "width": 500,
   "height": 90,
   "pivot": {
    "x": 0,
    "y": 30
   }
  },
  "ice_gate": {
   "key": "obj/ice_gate",
   "pack": "obj_1-3",
   "width": 310,
   "height": 440,
   "pivot": {
    "x": 155,
    "y": 440
   }
  },
  "ice_gate_broken": {
   "key": "obj/ice_gate_broken",
   "pack": "obj_1-3",
   "width": 310,
   "height": 440,
   "pivot": {
    "x": 155,
    "y": 440
   }
  },
  "frozen_puddle": {
   "key": "obj/frozen_puddle",
   "pack": "obj_1-5",
   "width": 250,
   "height": 99,
   "pivot": {
    "x": 125,
    "y": 49
   }
  },
  "frozen_key": {
   "key": "obj/frozen_key",
   "pack": "obj_1-5",
   "width": 96,
   "height": 48,
   "pivot": {
    "x": 48,
    "y": 24
   }
  },
  "stone_box_20kg": {
   "key": "obj/stone_box_20kg",
   "pack": "obj_1-1",
   "width": 90,
   "height": 62,
   "pivot": {
    "x": 45,
    "y": 62
   }
  },
  "stone_box_60kg": {
   "key": "obj/stone_box_60kg",
   "pack": "obj_1-1",
   "width": 125,
   "height": 90,
   "pivot": {
    "x": 62,
    "y": 90
   }
  },
  "warning_stele": {
   "key": "obj/warning_stele",
   "pack": "obj_1-2",
   "width": 100,
   "height": 160,
   "pivot": {
    "x": 50,
    "y": 160
   }
  },
  "frozen_rowboat": {
   "key": "obj/frozen_rowboat",
   "pack": "obj_1-3",
   "width": 260,
   "height": 120,
   "pivot": {
    "x": 130,
    "y": 92
   }
  },
  "amber_rod": {
   "loop": false,
   "key": "obj/amber_rod/default",
   "states": {
    "default": "obj/amber_rod/default"
   },
   "pack": "obj_2-1",
   "chapter": "2-1",
   "width": 75,
   "height": 20,
   "pivot": {
    "x": 37,
    "y": 10
   }
  },
  "amber_rod_icon": {
   "loop": false,
   "key": "obj/amber_rod_icon/default",
   "states": {
    "default": "obj/amber_rod_icon/default"
   },
   "pack": "obj_2-1",
   "chapter": "2-1",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   }
  },
  "fur": {
   "loop": false,
   "key": "obj/fur/default",
   "states": {
    "default": "obj/fur/default"
   },
   "pack": "obj_2-1",
   "chapter": "2-1",
   "width": 50,
   "height": 40,
   "pivot": {
    "x": 25,
    "y": 20
   }
  },
  "fur_icon": {
   "loop": false,
   "key": "obj/fur_icon/default",
   "states": {
    "default": "obj/fur_icon/default"
   },
   "pack": "obj_2-1",
   "chapter": "2-1",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   }
  },
  "feather": {
   "loop": false,
   "key": "obj/feather/normal",
   "states": {
    "normal": "obj/feather/normal",
    "charged": "obj/feather/charged"
   },
   "pack": "obj_2-1",
   "chapter": "2-1",
   "width": 50,
   "height": 20,
   "pivot": {
    "x": 25,
    "y": 10
   }
  },
  "charged_stone": {
   "loop": false,
   "key": "obj/charged_stone/neutral",
   "states": {
    "neutral": "obj/charged_stone/neutral",
    "plus": "obj/charged_stone/plus",
    "minus": "obj/charged_stone/minus"
   },
   "pack": "obj_2-1",
   "chapter": "2-1",
   "width": 63,
   "height": 63,
   "pivot": {
    "x": 31,
    "y": 63
   }
  },
  "spark_small": {
   "loop": true,
   "key": "obj/spark_small/01",
   "states": {
    "01": "obj/spark_small/01",
    "02": "obj/spark_small/02",
    "03": "obj/spark_small/03",
    "04": "obj/spark_small/04"
   },
   "pack": "obj_2-1",
   "chapter": "2-1",
   "width": 64,
   "height": 64,
   "pivot": {
    "x": 32,
    "y": 32
   }
  },
  "vacuum_tube": {
   "loop": false,
   "key": "obj/vacuum_tube/default",
   "states": {
    "default": "obj/vacuum_tube/default"
   },
   "pack": "obj_2-1",
   "chapter": "2-1",
   "width": 75,
   "height": 188,
   "pivot": {
    "x": 37,
    "y": 188
   }
  },
  "metal_plate": {
   "loop": false,
   "key": "obj/metal_plate/neutral",
   "states": {
    "neutral": "obj/metal_plate/neutral",
    "plus": "obj/metal_plate/plus",
    "minus": "obj/metal_plate/minus"
   },
   "pack": "obj_2-1",
   "chapter": "2-1",
   "width": 19,
   "height": 312,
   "pivot": {
    "x": 9,
    "y": 312
   }
  },
  "metal_plate_glow": {
   "loop": false,
   "key": "obj/metal_plate_glow/plus",
   "states": {
    "plus": "obj/metal_plate_glow/plus",
    "minus": "obj/metal_plate_glow/minus"
   },
   "pack": "obj_2-1",
   "chapter": "2-1",
   "width": 19,
   "height": 312,
   "pivot": {
    "x": 9,
    "y": 312
   }
  },
  "circuit_board": {
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
   },
   "key": "obj/circuit_board/series",
   "states": {
    "series": "obj/circuit_board/series",
    "parallel": "obj/circuit_board/parallel"
   },
   "pack": "obj_2-2",
   "chapter": "2-2",
   "width": 500,
   "height": 312,
   "pivot": {
    "x": 250,
    "y": 0
   }
  },
  "lamp": {
   "loop": false,
   "key": "obj/lamp/off",
   "states": {
    "off": "obj/lamp/off",
    "dim": "obj/lamp/dim",
    "normal": "obj/lamp/normal",
    "bright": "obj/lamp/bright"
   },
   "pack": "obj_2-2",
   "chapter": "2-2",
   "width": 60,
   "height": 100,
   "pivot": {
    "x": 30,
    "y": 0
   }
  },
  "lamp_glow": {
   "loop": false,
   "notes": "Place the 300x300 overlay at the same world pivot as lamp; off has no overlay.",
   "glow_diameter_px": {
    "dim": 80,
    "normal": 160,
    "bright": 280
   },
   "key": "obj/lamp_glow/off",
   "states": {
    "off": "obj/lamp_glow/off",
    "dim": "obj/lamp_glow/dim",
    "normal": "obj/lamp_glow/normal",
    "bright": "obj/lamp_glow/bright"
   },
   "pack": "obj_2-2",
   "chapter": "2-2",
   "width": 300,
   "height": 300,
   "pivot": {
    "x": 150,
    "y": 100
   }
  },
  "mana_stone": {
   "loop": false,
   "key": "obj/mana_stone/default",
   "states": {
    "default": "obj/mana_stone/default"
   },
   "pack": "obj_2-2",
   "chapter": "2-2",
   "width": 50,
   "height": 50,
   "pivot": {
    "x": 25,
    "y": 25
   }
  },
  "resistor_crystal": {
   "loop": false,
   "key": "obj/resistor_crystal/default",
   "states": {
    "default": "obj/resistor_crystal/default"
   },
   "pack": "obj_2-2",
   "chapter": "2-2",
   "width": 38,
   "height": 38,
   "pivot": {
    "x": 19,
    "y": 19
   }
  },
  "wire_straight": {
   "loop": false,
   "key": "obj/wire_straight/normal",
   "states": {
    "normal": "obj/wire_straight/normal",
    "hot": "obj/wire_straight/hot",
    "broken": "obj/wire_straight/broken"
   },
   "pack": "obj_2-2",
   "chapter": "2-2",
   "width": 64,
   "height": 64,
   "pivot": {
    "x": 32,
    "y": 32
   }
  },
  "wire_corner": {
   "loop": false,
   "key": "obj/wire_corner/normal",
   "states": {
    "normal": "obj/wire_corner/normal",
    "hot": "obj/wire_corner/hot",
    "broken": "obj/wire_corner/broken"
   },
   "pack": "obj_2-2",
   "chapter": "2-2",
   "width": 64,
   "height": 64,
   "pivot": {
    "x": 32,
    "y": 32
   }
  },
  "wire_branch": {
   "loop": false,
   "key": "obj/wire_branch/normal",
   "states": {
    "normal": "obj/wire_branch/normal",
    "hot": "obj/wire_branch/hot",
    "broken": "obj/wire_branch/broken"
   },
   "pack": "obj_2-2",
   "chapter": "2-2",
   "width": 64,
   "height": 64,
   "pivot": {
    "x": 32,
    "y": 32
   }
  },
  "stairs_f2": {
   "loop": false,
   "top_left": [
    1500,
    280
   ],
   "key": "obj/stairs_f2/01",
   "states": {
    "01": "obj/stairs_f2/01",
    "02": "obj/stairs_f2/02",
    "03": "obj/stairs_f2/03",
    "04": "obj/stairs_f2/04"
   },
   "pack": "obj_2-2",
   "chapter": "2-2",
   "width": 380,
   "height": 585,
   "pivot": {
    "x": 190,
    "y": 585
   }
  },
  "lightning_box": {
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
   },
   "key": "obj/lightning_box/small_close",
   "states": {
    "small_close": "obj/lightning_box/small_close",
    "small_wide": "obj/lightning_box/small_wide",
    "large_close": "obj/lightning_box/large_close",
    "large_wide": "obj/lightning_box/large_wide"
   },
   "pack": "obj_2-3",
   "chapter": "2-3",
   "width": 125,
   "height": 125,
   "pivot": {
    "x": 62,
    "y": 125
   }
  },
  "box_charge_glow_small_close": {
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
   },
   "key": "obj/box_charge_glow_small_close/00",
   "states": {
    "00": "obj/box_charge_glow_small_close/00",
    "30": "obj/box_charge_glow_small_close/30",
    "70": "obj/box_charge_glow_small_close/70",
    "100": "obj/box_charge_glow_small_close/100"
   },
   "pack": "obj_2-3",
   "chapter": "2-3",
   "width": 125,
   "height": 125,
   "pivot": {
    "x": 62,
    "y": 125
   }
  },
  "box_charge_glow_small_wide": {
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
   },
   "key": "obj/box_charge_glow_small_wide/00",
   "states": {
    "00": "obj/box_charge_glow_small_wide/00",
    "30": "obj/box_charge_glow_small_wide/30",
    "70": "obj/box_charge_glow_small_wide/70",
    "100": "obj/box_charge_glow_small_wide/100"
   },
   "pack": "obj_2-3",
   "chapter": "2-3",
   "width": 125,
   "height": 125,
   "pivot": {
    "x": 62,
    "y": 125
   }
  },
  "box_charge_glow_large_close": {
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
   },
   "key": "obj/box_charge_glow_large_close/00",
   "states": {
    "00": "obj/box_charge_glow_large_close/00",
    "30": "obj/box_charge_glow_large_close/30",
    "70": "obj/box_charge_glow_large_close/70",
    "100": "obj/box_charge_glow_large_close/100"
   },
   "pack": "obj_2-3",
   "chapter": "2-3",
   "width": 125,
   "height": 125,
   "pivot": {
    "x": 62,
    "y": 125
   }
  },
  "box_charge_glow_large_wide": {
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
   },
   "key": "obj/box_charge_glow_large_wide/00",
   "states": {
    "00": "obj/box_charge_glow_large_wide/00",
    "30": "obj/box_charge_glow_large_wide/30",
    "70": "obj/box_charge_glow_large_wide/70",
    "100": "obj/box_charge_glow_large_wide/100"
   },
   "pack": "obj_2-3",
   "chapter": "2-3",
   "width": 125,
   "height": 125,
   "pivot": {
    "x": 62,
    "y": 125
   }
  },
  "iron_door": {
   "loop": false,
   "key": "obj/iron_door/closed",
   "states": {
    "closed": "obj/iron_door/closed",
    "opening_01": "obj/iron_door/opening_01",
    "opening_02": "obj/iron_door/opening_02",
    "opening_03": "obj/iron_door/opening_03",
    "opening_04": "obj/iron_door/opening_04"
   },
   "pack": "obj_2-3",
   "chapter": "2-3",
   "width": 312,
   "height": 437,
   "pivot": {
    "x": 156,
    "y": 437
   }
  },
  "touch_slab": {
   "loop": false,
   "key": "obj/touch_slab/off",
   "states": {
    "off": "obj/touch_slab/off",
    "on": "obj/touch_slab/on",
    "no_response": "obj/touch_slab/no_response"
   },
   "pack": "obj_2-3",
   "chapter": "2-3",
   "width": 125,
   "height": 175,
   "pivot": {
    "x": 62,
    "y": 0
   }
  },
  "touch_slab_glow": {
   "loop": false,
   "key": "obj/touch_slab_glow/off",
   "states": {
    "off": "obj/touch_slab_glow/off",
    "on": "obj/touch_slab_glow/on",
    "no_response": "obj/touch_slab_glow/no_response"
   },
   "pack": "obj_2-3",
   "chapter": "2-3",
   "width": 125,
   "height": 175,
   "pivot": {
    "x": 62,
    "y": 0
   }
  },
  "rubber_glove": {
   "loop": false,
   "key": "obj/rubber_glove/default",
   "states": {
    "default": "obj/rubber_glove/default"
   },
   "pack": "obj_2-3",
   "chapter": "2-3",
   "width": 50,
   "height": 50,
   "pivot": {
    "x": 25,
    "y": 25
   }
  },
  "rubber_glove_icon": {
   "loop": false,
   "key": "obj/rubber_glove_icon/default",
   "states": {
    "default": "obj/rubber_glove_icon/default"
   },
   "pack": "obj_2-3",
   "chapter": "2-3",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   }
  },
  "wooden_stick": {
   "loop": false,
   "key": "obj/wooden_stick/default",
   "states": {
    "default": "obj/wooden_stick/default"
   },
   "pack": "obj_2-3",
   "chapter": "2-3",
   "width": 50,
   "height": 50,
   "pivot": {
    "x": 25,
    "y": 25
   }
  },
  "wooden_stick_icon": {
   "loop": false,
   "key": "obj/wooden_stick_icon/default",
   "states": {
    "default": "obj/wooden_stick_icon/default"
   },
   "pack": "obj_2-3",
   "chapter": "2-3",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   }
  },
  "vault_3": {
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
   },
   "key": "obj/vault_3/body",
   "states": {
    "body": "obj/vault_3/body"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 376,
   "height": 300,
   "pivot": {
    "x": 188,
    "y": 300
   }
  },
  "vault_3_door_iron": {
   "top_left_in_vault": [
    18,
    91
   ],
   "hinge_local": [
    5,
    78
   ],
   "key": "obj/vault_3_door_iron/closed",
   "states": {
    "closed": "obj/vault_3_door_iron/closed",
    "open": "obj/vault_3_door_iron/open"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 112,
   "height": 157,
   "pivot": {
    "x": 56,
    "y": 0
   }
  },
  "vault_3_door_aluminum": {
   "top_left_in_vault": [
    132,
    91
   ],
   "hinge_local": [
    5,
    78
   ],
   "key": "obj/vault_3_door_aluminum/closed",
   "states": {
    "closed": "obj/vault_3_door_aluminum/closed",
    "open": "obj/vault_3_door_aluminum/open"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 112,
   "height": 157,
   "pivot": {
    "x": 56,
    "y": 0
   }
  },
  "vault_3_door_copper": {
   "top_left_in_vault": [
    246,
    91
   ],
   "hinge_local": [
    5,
    78
   ],
   "key": "obj/vault_3_door_copper/closed",
   "states": {
    "closed": "obj/vault_3_door_copper/closed",
    "open": "obj/vault_3_door_copper/open"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 112,
   "height": 157,
   "pivot": {
    "x": 56,
    "y": 0
   }
  },
  "key_iron": {
   "key": "obj/key_iron/default",
   "states": {
    "default": "obj/key_iron/default"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 40,
   "height": 40,
   "pivot": {
    "x": 20,
    "y": 20
   }
  },
  "key_iron_icon": {
   "key": "obj/key_iron_icon/default",
   "states": {
    "default": "obj/key_iron_icon/default"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   }
  },
  "key_aluminum": {
   "key": "obj/key_aluminum/default",
   "states": {
    "default": "obj/key_aluminum/default"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 40,
   "height": 40,
   "pivot": {
    "x": 20,
    "y": 20
   }
  },
  "key_aluminum_icon": {
   "key": "obj/key_aluminum_icon/default",
   "states": {
    "default": "obj/key_aluminum_icon/default"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   }
  },
  "key_copper": {
   "key": "obj/key_copper/default",
   "states": {
    "default": "obj/key_copper/default"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 40,
   "height": 40,
   "pivot": {
    "x": 20,
    "y": 20
   }
  },
  "key_copper_icon": {
   "key": "obj/key_copper_icon/default",
   "states": {
    "default": "obj/key_copper_icon/default"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   }
  },
  "magnet_hook": {
   "key": "obj/magnet_hook/default",
   "states": {
    "default": "obj/magnet_hook/default"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 60,
   "height": 60,
   "pivot": {
    "x": 30,
    "y": 30
   }
  },
  "magnet_hook_icon": {
   "key": "obj/magnet_hook_icon/default",
   "states": {
    "default": "obj/magnet_hook_icon/default"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   }
  },
  "graphite_stand": {
   "key": "obj/graphite_stand/default",
   "states": {
    "default": "obj/graphite_stand/default"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 125,
   "height": 40,
   "pivot": {
    "x": 62,
    "y": 40
   }
  },
  "graphite_plate": {
   "suggested_offset_from_stand_top_left": [
    12,
    -20
   ],
   "key": "obj/graphite_plate/default",
   "states": {
    "default": "obj/graphite_plate/default"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 100,
   "height": 12,
   "pivot": {
    "x": 50,
    "y": 12
   }
  },
  "magnet_glove_icon": {
   "key": "obj/magnet_glove_icon/default",
   "states": {
    "default": "obj/magnet_glove_icon/default"
   },
   "pack": "obj_2-4",
   "chapter": "2-4",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   }
  },
  "elevator_platform": {
   "key": "obj/elevator_platform/default",
   "states": {
    "default": "obj/elevator_platform/default"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 312,
   "height": 40,
   "pivot": {
    "x": 156,
    "y": 40
   }
  },
  "elevator_rope": {
   "tile_axis": "y",
   "tile_period_px": 64,
   "rope_center_x": [
    24,
    288
   ],
   "key": "obj/elevator_rope/tile",
   "states": {
    "tile": "obj/elevator_rope/tile"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 312,
   "height": 64,
   "pivot": {
    "x": 156,
    "y": 0
   }
  },
  "motor": {
   "rotor_mount_local": [
    62,
    61
   ],
   "key": "obj/motor/body",
   "states": {
    "body": "obj/motor/body"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 125,
   "height": 125,
   "pivot": {
    "x": 62,
    "y": 125
   }
  },
  "motor_rotor": {
   "rotation_axis_local": [
    31,
    31
   ],
   "mount_in_motor": [
    62,
    61
   ],
   "rotational_symmetry_degrees": 90,
   "key": "obj/motor_rotor/default",
   "states": {
    "default": "obj/motor_rotor/default"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 62,
   "height": 62,
   "pivot": {
    "x": 31,
    "y": 31
   }
  },
  "compass": {
   "needle_mount_local": [
    31,
    31
   ],
   "key": "obj/compass/base",
   "states": {
    "base": "obj/compass/base"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 63,
   "height": 63,
   "pivot": {
    "x": 31,
    "y": 31
   }
  },
  "compass_needle": {
   "rotation_axis_local": [
    31,
    31
   ],
   "mount_in_compass": [
    31,
    31
   ],
   "key": "obj/compass_needle/default",
   "states": {
    "default": "obj/compass_needle/default"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 63,
   "height": 63,
   "pivot": {
    "x": 31,
    "y": 31
   }
  },
  "coil": {
   "turns": {
    "few": 3,
    "normal": 6,
    "many": 12
   },
   "key": "obj/coil/few",
   "states": {
    "few": "obj/coil/few",
    "normal": "obj/coil/normal",
    "many": "obj/coil/many"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 100,
   "height": 60,
   "pivot": {
    "x": 50,
    "y": 60
   }
  },
  "bar_magnet_small": {
   "key": "obj/bar_magnet_small/default",
   "states": {
    "default": "obj/bar_magnet_small/default"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 50,
   "height": 15,
   "pivot": {
    "x": 25,
    "y": 7
   }
  },
  "bar_magnet_medium": {
   "key": "obj/bar_magnet_medium/default",
   "states": {
    "default": "obj/bar_magnet_medium/default"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 80,
   "height": 22,
   "pivot": {
    "x": 40,
    "y": 11
   }
  },
  "bar_magnet_large": {
   "key": "obj/bar_magnet_large/default",
   "states": {
    "default": "obj/bar_magnet_large/default"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 120,
   "height": 32,
   "pivot": {
    "x": 60,
    "y": 16
   }
  },
  "direction_switch": {
   "key": "obj/direction_switch/left",
   "states": {
    "left": "obj/direction_switch/left",
    "right": "obj/direction_switch/right"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 50,
   "height": 50,
   "pivot": {
    "x": 25,
    "y": 50
   }
  },
  "speaker_part_magnet": {
   "key": "obj/speaker_part_magnet/default",
   "states": {
    "default": "obj/speaker_part_magnet/default"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 50,
   "height": 50,
   "pivot": {
    "x": 25,
    "y": 25
   }
  },
  "speaker_part_coil": {
   "key": "obj/speaker_part_coil/default",
   "states": {
    "default": "obj/speaker_part_coil/default"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 50,
   "height": 50,
   "pivot": {
    "x": 25,
    "y": 25
   }
  },
  "speaker_part_cone": {
   "key": "obj/speaker_part_cone/default",
   "states": {
    "default": "obj/speaker_part_cone/default"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 50,
   "height": 50,
   "pivot": {
    "x": 25,
    "y": 25
   }
  },
  "speaker_assembled": {
   "key": "obj/speaker_assembled/default",
   "states": {
    "default": "obj/speaker_assembled/default"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 75,
   "height": 75,
   "pivot": {
    "x": 37,
    "y": 75
   }
  },
  "electromagnet_trap": {
   "key": "obj/electromagnet_trap/off",
   "states": {
    "off": "obj/electromagnet_trap/off",
    "on": "obj/electromagnet_trap/on"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 375,
   "height": 50,
   "pivot": {
    "x": 187,
    "y": 50
   }
  },
  "electromagnet_trap_glow": {
   "body_asset": "electromagnet_trap",
   "body_state": "on",
   "key": "obj/electromagnet_trap_glow/on",
   "states": {
    "on": "obj/electromagnet_trap_glow/on"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 525,
   "height": 180,
   "pivot": {
    "x": 262,
    "y": 130
   }
  },
  "coil_gate": {
   "key": "obj/coil_gate/off",
   "states": {
    "off": "obj/coil_gate/off",
    "glow": "obj/coil_gate/glow",
    "open_01": "obj/coil_gate/open_01",
    "open_02": "obj/coil_gate/open_02",
    "open_03": "obj/coil_gate/open_03",
    "open_04": "obj/coil_gate/open_04"
   },
   "pack": "obj_2-6",
   "chapter": "2-6",
   "width": 375,
   "height": 500,
   "pivot": {
    "x": 187,
    "y": 500
   }
  },
  "coil_gate_glow": {
   "body_asset": "coil_gate",
   "key": "obj/coil_gate_glow/glow",
   "states": {
    "glow": "obj/coil_gate_glow/glow"
   },
   "pack": "obj_2-6",
   "chapter": "2-6",
   "width": 575,
   "height": 650,
   "pivot": {
    "x": 287,
    "y": 575
   }
  },
  "beacon": {
   "fire_mount_local": [
    100,
    35
   ],
   "key": "obj/beacon/off",
   "states": {
    "off": "obj/beacon/off"
   },
   "pack": "obj_2-6",
   "chapter": "2-6",
   "width": 200,
   "height": 190,
   "pivot": {
    "x": 100,
    "y": 190
   }
  },
  "beacon_fire": {
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
   },
   "key": "obj/beacon_fire/01",
   "states": {
    "01": "obj/beacon_fire/01",
    "02": "obj/beacon_fire/02",
    "03": "obj/beacon_fire/03",
    "04": "obj/beacon_fire/04"
   },
   "pack": "obj_2-6",
   "chapter": "2-6",
   "width": 300,
   "height": 300,
   "pivot": {
    "x": 150,
    "y": 230
   }
  },
  "beacon_glow": {
   "body_asset": "beacon",
   "center_alpha_approx": 153,
   "glow_center_local": [
    300,
    245
   ],
   "key": "obj/beacon_glow/on",
   "states": {
    "on": "obj/beacon_glow/on"
   },
   "pack": "obj_2-6",
   "chapter": "2-6",
   "width": 600,
   "height": 600,
   "pivot": {
    "x": 300,
    "y": 500
   }
  },
  "coil_sender": {
   "coil_mount_local": [
    62,
    36
   ],
   "key": "obj/coil_sender/base",
   "states": {
    "base": "obj/coil_sender/base"
   },
   "pack": "obj_2-6",
   "chapter": "2-6",
   "width": 125,
   "height": 125,
   "pivot": {
    "x": 62,
    "y": 125
   }
  },
  "coil_sender_body": {
   "rotation_axis_local": [
    46,
    32
   ],
   "mount_in_base": [
    62,
    36
   ],
   "key": "obj/coil_sender_body/default",
   "states": {
    "default": "obj/coil_sender_body/default"
   },
   "pack": "obj_2-6",
   "chapter": "2-6",
   "width": 92,
   "height": 64,
   "pivot": {
    "x": 46,
    "y": 32
   }
  },
  "coil_receiver": {
   "coil_mount_local": [
    62,
    36
   ],
   "key": "obj/coil_receiver/base",
   "states": {
    "base": "obj/coil_receiver/base"
   },
   "pack": "obj_2-6",
   "chapter": "2-6",
   "width": 125,
   "height": 125,
   "pivot": {
    "x": 62,
    "y": 125
   }
  },
  "coil_receiver_body": {
   "rotation_axis_local": [
    46,
    32
   ],
   "mount_in_base": [
    62,
    36
   ],
   "key": "obj/coil_receiver_body/default",
   "states": {
    "default": "obj/coil_receiver_body/default"
   },
   "pack": "obj_2-6",
   "chapter": "2-6",
   "width": 92,
   "height": 64,
   "pivot": {
    "x": 46,
    "y": 32
   }
  },
  "village_lamp": {
   "key": "obj/village_lamp/off",
   "states": {
    "off": "obj/village_lamp/off",
    "on": "obj/village_lamp/on"
   },
   "pack": "obj_2-6",
   "chapter": "2-6",
   "width": 24,
   "height": 24,
   "pivot": {
    "x": 12,
    "y": 0
   }
  },
  "village_lamp_glow": {
   "body_asset": "village_lamp",
   "key": "obj/village_lamp_glow/on",
   "states": {
    "on": "obj/village_lamp_glow/on"
   },
   "pack": "obj_2-6",
   "chapter": "2-6",
   "width": 80,
   "height": 80,
   "pivot": {
    "x": 40,
    "y": 28
   }
  },
  "feather_stand": {
   "key": "obj/feather_stand",
   "states": {
    "default": "obj/feather_stand"
   },
   "pack": "obj_2-1",
   "chapter": "2-1",
   "width": 100,
   "height": 320,
   "pivot": {
    "x": 86,
    "y": 20
   }
  },
  "battery_cell": {
   "key": "obj/battery_cell",
   "states": {
    "default": "obj/battery_cell"
   },
   "pack": "obj_battery",
   "chapter": "2-2",
   "width": 120,
   "height": 90,
   "pivot": {
    "x": 60,
    "y": 88
   }
  },
  "lever_switch": {
   "key": "obj/lever_switch/left",
   "states": {
    "left": "obj/lever_switch/left",
    "middle": "obj/lever_switch/middle",
    "right": "obj/lever_switch/right"
   },
   "pack": "obj_2-5",
   "chapter": "2-5",
   "width": 160,
   "height": 220,
   "pivot": {
    "x": 80,
    "y": 218
   },
   "axis_local": [
    80,
    175
   ]
  },
  "light_source": {
   "act3": true,
   "key": "obj/light_source/off",
   "states": {
    "off": "obj/light_source/off",
    "on": "obj/light_source/on"
   },
   "pack": "obj_3-1",
   "chapter": "3-1",
   "width": 120,
   "height": 240,
   "pivot": {
    "x": 60,
    "y": 240
   },
   "kind": "object"
  },
  "light_source_glow": {
   "act3": true,
   "key": "obj/light_source_glow/default",
   "states": {
    "default": "obj/light_source_glow/default"
   },
   "pack": "obj_3-1",
   "chapter": "3-1",
   "width": 240,
   "height": 360,
   "pivot": {
    "x": 120,
    "y": 360
   },
   "kind": "effect",
   "align_to": "light_source_on",
   "body_pivot": [
    60,
    240
   ]
  },
  "slit_wall": {
   "act3": true,
   "key": "obj/slit_wall/default",
   "states": {
    "default": "obj/slit_wall/default"
   },
   "pack": "obj_3-1",
   "chapter": "3-1",
   "width": 60,
   "height": 500,
   "pivot": {
    "x": 30,
    "y": 0
   },
   "kind": "wall",
   "insert_rect": [
    5,
    150,
    55,
    350
   ]
  },
  "slit_plate": {
   "act3": true,
   "key": "obj/slit_plate/gap_narrow",
   "states": {
    "gap_narrow": "obj/slit_plate/gap_narrow",
    "gap_mid": "obj/slit_plate/gap_mid",
    "gap_wide": "obj/slit_plate/gap_wide"
   },
   "pack": "obj_3-1",
   "chapter": "3-1",
   "width": 60,
   "height": 200,
   "pivot": {
    "x": 30,
    "y": 0
   },
   "kind": "wall",
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
   "slit_vertical_length": 6,
   "stateInfo": {
    "gap_mid": {
     "slit_centers": [
      [
       30,
       80
      ],
      [
       30,
       120
      ]
     ]
    },
    "gap_wide": {
     "slit_centers": [
      [
       30,
       70
      ],
      [
       30,
       130
      ]
     ]
    }
   }
  },
  "screen_wall": {
   "act3": true,
   "key": "obj/screen_wall/default",
   "states": {
    "default": "obj/screen_wall/default"
   },
   "pack": "obj_3-1",
   "chapter": "3-1",
   "width": 60,
   "height": 500,
   "pivot": {
    "x": 30,
    "y": 0
   },
   "kind": "wall",
   "projection_rect": [
    8,
    8,
    52,
    492
   ]
  },
  "ripple_tank": {
   "act3": true,
   "key": "obj/ripple_tank/default",
   "states": {
    "default": "obj/ripple_tank/default"
   },
   "pack": "obj_3-1",
   "chapter": "3-1",
   "width": 300,
   "height": 120,
   "pivot": {
    "x": 150,
    "y": 120
   },
   "kind": "object"
  },
  "hidden_rune_01": {
   "act3": true,
   "key": "obj/hidden_rune_01/clear",
   "states": {
    "clear": "obj/hidden_rune_01/clear",
    "faint": "obj/hidden_rune_01/faint"
   },
   "pack": "obj_3-1",
   "chapter": "3-1",
   "width": 80,
   "height": 80,
   "pivot": {
    "x": 40,
    "y": 0
   },
   "kind": "wall"
  },
  "hidden_rune_02": {
   "act3": true,
   "key": "obj/hidden_rune_02/clear",
   "states": {
    "clear": "obj/hidden_rune_02/clear",
    "faint": "obj/hidden_rune_02/faint"
   },
   "pack": "obj_3-1",
   "chapter": "3-1",
   "width": 80,
   "height": 80,
   "pivot": {
    "x": 40,
    "y": 0
   },
   "kind": "wall"
  },
  "hidden_rune_03": {
   "act3": true,
   "key": "obj/hidden_rune_03/clear",
   "states": {
    "clear": "obj/hidden_rune_03/clear",
    "faint": "obj/hidden_rune_03/faint"
   },
   "pack": "obj_3-1",
   "chapter": "3-1",
   "width": 80,
   "height": 80,
   "pivot": {
    "x": 40,
    "y": 0
   },
   "kind": "wall"
  },
  "torch": {
   "act3": true,
   "key": "obj/torch/default",
   "states": {
    "default": "obj/torch/default"
   },
   "pack": "obj_3-1",
   "chapter": "3-1",
   "width": 40,
   "height": 100,
   "pivot": {
    "x": 20,
    "y": 100
   },
   "kind": "object"
  },
  "torch_flame": {
   "act3": true,
   "key": "obj/torch_flame/01",
   "states": {
    "01": "obj/torch_flame/01",
    "02": "obj/torch_flame/02",
    "03": "obj/torch_flame/03",
    "04": "obj/torch_flame/04"
   },
   "pack": "obj_3-1",
   "chapter": "3-1",
   "width": 100,
   "height": 150,
   "pivot": {
    "x": 50,
    "y": 150
   },
   "kind": "effect",
   "align_to": "torch",
   "body_pivot": [
    20,
    100
   ],
   "loop": true
  },
  "film_shield": {
   "act3": true,
   "key": "obj/film_shield/normal",
   "states": {
    "normal": "obj/film_shield/normal",
    "reflect": "obj/film_shield/reflect"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 100,
   "height": 100,
   "pivot": {
    "x": 50,
    "y": 100
   },
   "kind": "object"
  },
  "film_shield_reflect_glint": {
   "act3": true,
   "key": "obj/film_shield_reflect_glint/default",
   "states": {
    "default": "obj/film_shield_reflect_glint/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 160,
   "height": 160,
   "pivot": {
    "x": 80,
    "y": 160
   },
   "kind": "effect",
   "align_to": "film_shield_reflect",
   "body_pivot": [
    50,
    100
   ]
  },
  "film_shield_icon": {
   "act3": true,
   "key": "obj/film_shield_icon/default",
   "states": {
    "default": "obj/film_shield_icon/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   },
   "kind": "icon"
  },
  "water_body": {
   "act3": true,
   "key": "obj/water_body/default",
   "states": {
    "default": "obj/water_body/default"
   },
   "pack": "obj_3-2",
   "chapter": "3-2",
   "width": 600,
   "height": 185,
   "pivot": {
    "x": 300,
    "y": 0
   },
   "kind": "effect",
   "opacity": 0.35,
   "world_rect": [
    600,
    865,
    1200,
    1050
   ]
  },
  "water_surface": {
   "act3": true,
   "key": "obj/water_surface/01",
   "states": {
    "01": "obj/water_surface/01",
    "02": "obj/water_surface/02",
    "03": "obj/water_surface/03",
    "04": "obj/water_surface/04"
   },
   "pack": "obj_3-2",
   "chapter": "3-2",
   "width": 600,
   "height": 30,
   "pivot": {
    "x": 300,
    "y": 0
   },
   "kind": "effect",
   "loop": true,
   "align_to": "water_body",
   "body_pivot": [
    300,
    0
   ]
  },
  "golden_key": {
   "act3": true,
   "key": "obj/golden_key/default",
   "states": {
    "default": "obj/golden_key/default"
   },
   "pack": "obj_3-2",
   "chapter": "3-2",
   "width": 40,
   "height": 40,
   "pivot": {
    "x": 20,
    "y": 20
   },
   "kind": "item"
  },
  "golden_key_icon": {
   "act3": true,
   "key": "obj/golden_key_icon/default",
   "states": {
    "default": "obj/golden_key_icon/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   },
   "kind": "icon"
  },
  "convex_lens": {
   "act3": true,
   "key": "obj/convex_lens/default",
   "states": {
    "default": "obj/convex_lens/default"
   },
   "pack": "obj_3-2",
   "chapter": "3-2",
   "width": 60,
   "height": 200,
   "pivot": {
    "x": 30,
    "y": 200
   },
   "kind": "object"
  },
  "convex_lens_icon": {
   "act3": true,
   "key": "obj/convex_lens_icon/default",
   "states": {
    "default": "obj/convex_lens_icon/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   },
   "kind": "icon"
  },
  "lens_screen": {
   "act3": true,
   "key": "obj/lens_screen/default",
   "states": {
    "default": "obj/lens_screen/default"
   },
   "pack": "obj_3-2",
   "chapter": "3-2",
   "width": 40,
   "height": 200,
   "pivot": {
    "x": 20,
    "y": 200
   },
   "kind": "object"
  },
  "pattern_stencil": {
   "act3": true,
   "key": "obj/pattern_stencil/default",
   "states": {
    "default": "obj/pattern_stencil/default"
   },
   "pack": "obj_3-2",
   "chapter": "3-2",
   "width": 60,
   "height": 150,
   "pivot": {
    "x": 30,
    "y": 0
   },
   "kind": "wall",
   "top_pattern": "star",
   "bottom_pattern": "wave"
  },
  "optical_rail": {
   "act3": true,
   "key": "obj/optical_rail/default",
   "states": {
    "default": "obj/optical_rail/default"
   },
   "pack": "obj_3-2",
   "chapter": "3-2",
   "width": 750,
   "height": 20,
   "pivot": {
    "x": 375,
    "y": 20
   },
   "kind": "object"
  },
  "crystal_plate": {
   "act3": true,
   "key": "obj/crystal_plate/blank",
   "states": {
    "blank": "obj/crystal_plate/blank",
    "engraved": "obj/crystal_plate/engraved"
   },
   "pack": "obj_3-2",
   "chapter": "3-2",
   "width": 50,
   "height": 50,
   "pivot": {
    "x": 25,
    "y": 25
   },
   "kind": "item"
  },
  "light_door": {
   "act3": true,
   "key": "obj/light_door/closed",
   "states": {
    "closed": "obj/light_door/closed",
    "opening_01": "obj/light_door/opening_01",
    "opening_02": "obj/light_door/opening_02",
    "opening_03": "obj/light_door/opening_03",
    "opening_04": "obj/light_door/opening_04"
   },
   "pack": "obj_3-2",
   "chapter": "3-2",
   "width": 150,
   "height": 500,
   "pivot": {
    "x": 75,
    "y": 0
   },
   "kind": "wall",
   "doorway_rect": [
    42,
    50,
    108,
    455
   ],
   "slab_raise_px": 0,
   "stateInfo": {
    "opening_01": {
     "slab_raise_px": 70
    },
    "opening_02": {
     "slab_raise_px": 165
    },
    "opening_03": {
     "slab_raise_px": 290
    },
    "opening_04": {
     "slab_raise_px": 470
    }
   }
  },
  "rune_tablet": {
   "act3": true,
   "key": "obj/rune_tablet/sharp",
   "states": {
    "sharp": "obj/rune_tablet/sharp",
    "blurred": "obj/rune_tablet/blurred"
   },
   "pack": "obj_3-3",
   "chapter": "3-3",
   "width": 500,
   "height": 350,
   "pivot": {
    "x": 250,
    "y": 0
   },
   "kind": "wall",
   "rune_region": [
    28,
    38,
    472,
    315
   ],
   "stateInfo": {
    "blurred": {
     "rune_region": [
      55,
      65,
      445,
      285
     ]
    }
   }
  },
  "photo_plate": {
   "act3": true,
   "key": "obj/photo_plate/default",
   "states": {
    "default": "obj/photo_plate/default"
   },
   "pack": "obj_3-3",
   "chapter": "3-3",
   "width": 400,
   "height": 350,
   "pivot": {
    "x": 200,
    "y": 0
   },
   "kind": "wall",
   "photosensitive_region": [
    18,
    18,
    382,
    332
   ]
  },
  "photo_target": {
   "act3": true,
   "key": "obj/photo_target/default",
   "states": {
    "default": "obj/photo_target/default"
   },
   "pack": "obj_3-3",
   "chapter": "3-3",
   "width": 400,
   "height": 350,
   "pivot": {
    "x": 200,
    "y": 0
   },
   "kind": "wall",
   "grayscale": true,
   "depiction": "open magic book and one old key, black silhouette on white"
  },
  "electron_apparatus": {
   "act3": true,
   "key": "obj/electron_apparatus/default",
   "states": {
    "default": "obj/electron_apparatus/default"
   },
   "pack": "obj_3-3",
   "chapter": "3-3",
   "width": 400,
   "height": 165,
   "pivot": {
    "x": 200,
    "y": 165
   },
   "kind": "object",
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
   "act3": true,
   "key": "obj/electron_eye/default",
   "states": {
    "default": "obj/electron_eye/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 50,
   "height": 50,
   "pivot": {
    "x": 25,
    "y": 25
   },
   "kind": "item"
  },
  "electron_eye_icon": {
   "act3": true,
   "key": "obj/electron_eye_icon/default",
   "states": {
    "default": "obj/electron_eye_icon/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   },
   "kind": "icon"
  },
  "light_eye": {
   "act3": true,
   "key": "obj/light_eye/default",
   "states": {
    "default": "obj/light_eye/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 50,
   "height": 50,
   "pivot": {
    "x": 25,
    "y": 25
   },
   "kind": "item"
  },
  "light_eye_icon": {
   "act3": true,
   "key": "obj/light_eye_icon/default",
   "states": {
    "default": "obj/light_eye_icon/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   },
   "kind": "icon"
  },
  "lamp_pedestal": {
   "act3": true,
   "key": "obj/lamp_pedestal/default",
   "states": {
    "default": "obj/lamp_pedestal/default"
   },
   "pack": "obj_3-4",
   "chapter": "3-4",
   "width": 120,
   "height": 200,
   "pivot": {
    "x": 60,
    "y": 200
   },
   "kind": "object"
  },
  "spectrum_lamp": {
   "act3": true,
   "key": "obj/spectrum_lamp/hydrogen",
   "states": {
    "hydrogen": "obj/spectrum_lamp/hydrogen",
    "sodium": "obj/spectrum_lamp/sodium",
    "neon": "obj/spectrum_lamp/neon",
    "mercury": "obj/spectrum_lamp/mercury"
   },
   "pack": "obj_3-4",
   "chapter": "3-4",
   "width": 60,
   "height": 100,
   "pivot": {
    "x": 30,
    "y": 0
   },
   "kind": "object"
  },
  "spectrum_lamp_hydrogen_glow": {
   "act3": true,
   "key": "obj/spectrum_lamp_hydrogen_glow/default",
   "states": {
    "default": "obj/spectrum_lamp_hydrogen_glow/default"
   },
   "pack": "obj_3-4",
   "chapter": "3-4",
   "width": 300,
   "height": 300,
   "pivot": {
    "x": 150,
    "y": 100
   },
   "kind": "effect",
   "align_to": "spectrum_lamp_hydrogen",
   "body_pivot": [
    30,
    0
   ]
  },
  "spectrum_lamp_sodium_glow": {
   "act3": true,
   "key": "obj/spectrum_lamp_sodium_glow/default",
   "states": {
    "default": "obj/spectrum_lamp_sodium_glow/default"
   },
   "pack": "obj_3-4",
   "chapter": "3-4",
   "width": 300,
   "height": 300,
   "pivot": {
    "x": 150,
    "y": 100
   },
   "kind": "effect",
   "align_to": "spectrum_lamp_sodium",
   "body_pivot": [
    30,
    0
   ]
  },
  "spectrum_lamp_neon_glow": {
   "act3": true,
   "key": "obj/spectrum_lamp_neon_glow/default",
   "states": {
    "default": "obj/spectrum_lamp_neon_glow/default"
   },
   "pack": "obj_3-4",
   "chapter": "3-4",
   "width": 300,
   "height": 300,
   "pivot": {
    "x": 150,
    "y": 100
   },
   "kind": "effect",
   "align_to": "spectrum_lamp_neon",
   "body_pivot": [
    30,
    0
   ]
  },
  "spectrum_lamp_mercury_glow": {
   "act3": true,
   "key": "obj/spectrum_lamp_mercury_glow/default",
   "states": {
    "default": "obj/spectrum_lamp_mercury_glow/default"
   },
   "pack": "obj_3-4",
   "chapter": "3-4",
   "width": 300,
   "height": 300,
   "pivot": {
    "x": 150,
    "y": 100
   },
   "kind": "effect",
   "align_to": "spectrum_lamp_mercury",
   "body_pivot": [
    30,
    0
   ]
  },
  "spectroscope": {
   "act3": true,
   "key": "obj/spectroscope/default",
   "states": {
    "default": "obj/spectroscope/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 50,
   "height": 50,
   "pivot": {
    "x": 25,
    "y": 25
   },
   "kind": "object"
  },
  "spectroscope_icon": {
   "act3": true,
   "key": "obj/spectroscope_icon/default",
   "states": {
    "default": "obj/spectroscope_icon/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   },
   "kind": "object"
  },
  "barcode_panel": {
   "act3": true,
   "key": "obj/barcode_panel/default",
   "states": {
    "default": "obj/barcode_panel/default"
   },
   "pack": "obj_3-4",
   "chapter": "3-4",
   "width": 200,
   "height": 60,
   "pivot": {
    "x": 100,
    "y": 0
   },
   "kind": "object"
  },
  "energy_stairs": {
   "act3": true,
   "key": "obj/energy_stairs/default",
   "states": {
    "default": "obj/energy_stairs/default"
   },
   "pack": "obj_3-4",
   "chapter": "3-4",
   "width": 300,
   "height": 250,
   "pivot": {
    "x": 150,
    "y": 250
   },
   "kind": "object"
  },
  "energy_ball": {
   "act3": true,
   "key": "obj/energy_ball/default",
   "states": {
    "default": "obj/energy_ball/default"
   },
   "pack": "obj_3-4",
   "chapter": "3-4",
   "width": 30,
   "height": 30,
   "pivot": {
    "x": 15,
    "y": 15
   },
   "kind": "object"
  },
  "spectrum_door": {
   "act3": true,
   "key": "obj/spectrum_door/closed",
   "states": {
    "closed": "obj/spectrum_door/closed",
    "opening_01": "obj/spectrum_door/opening_01",
    "opening_02": "obj/spectrum_door/opening_02",
    "opening_03": "obj/spectrum_door/opening_03",
    "opening_04": "obj/spectrum_door/opening_04"
   },
   "pack": "obj_3-4",
   "chapter": "3-4",
   "width": 300,
   "height": 500,
   "pivot": {
    "x": 150,
    "y": 500
   },
   "kind": "object"
  },
  "bridge_tile_metal": {
   "act3": true,
   "key": "obj/bridge_tile_metal/default",
   "states": {
    "default": "obj/bridge_tile_metal/default"
   },
   "pack": "obj_3-5",
   "chapter": "3-5",
   "width": 125,
   "height": 40,
   "pivot": {
    "x": 62,
    "y": 40
   },
   "kind": "object"
  },
  "bridge_tile_glass": {
   "act3": true,
   "key": "obj/bridge_tile_glass/default",
   "states": {
    "default": "obj/bridge_tile_glass/default"
   },
   "pack": "obj_3-5",
   "chapter": "3-5",
   "width": 125,
   "height": 40,
   "pivot": {
    "x": 62,
    "y": 40
   },
   "kind": "object"
  },
  "bridge_tile_silicon": {
   "act3": true,
   "key": "obj/bridge_tile_silicon/default",
   "states": {
    "default": "obj/bridge_tile_silicon/default"
   },
   "pack": "obj_3-5",
   "chapter": "3-5",
   "width": 125,
   "height": 40,
   "pivot": {
    "x": 62,
    "y": 40
   },
   "kind": "object"
  },
  "led_crystal": {
   "act3": true,
   "key": "obj/led_crystal/off",
   "states": {
    "off": "obj/led_crystal/off",
    "on": "obj/led_crystal/on"
   },
   "pack": "obj_3-5",
   "chapter": "3-5",
   "width": 40,
   "height": 60,
   "pivot": {
    "x": 20,
    "y": 60
   },
   "kind": "object"
  },
  "led_crystal_glow": {
   "act3": true,
   "key": "obj/led_crystal_glow/default",
   "states": {
    "default": "obj/led_crystal_glow/default"
   },
   "pack": "obj_3-5",
   "chapter": "3-5",
   "width": 160,
   "height": 160,
   "pivot": {
    "x": 80,
    "y": 130
   },
   "kind": "effect",
   "align_to": "led_crystal_on",
   "body_pivot": [
    20,
    60
   ]
  },
  "diode_crystal": {
   "act3": true,
   "key": "obj/diode_crystal/default",
   "states": {
    "default": "obj/diode_crystal/default"
   },
   "pack": "obj_3-5",
   "chapter": "3-5",
   "width": 50,
   "height": 50,
   "pivot": {
    "x": 25,
    "y": 25
   },
   "kind": "object"
  },
  "diode_crystal_icon": {
   "act3": true,
   "key": "obj/diode_crystal_icon/default",
   "states": {
    "default": "obj/diode_crystal_icon/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   },
   "kind": "object"
  },
  "power_crystal": {
   "act3": true,
   "key": "obj/power_crystal/default",
   "states": {
    "default": "obj/power_crystal/default"
   },
   "pack": "obj_3-5",
   "chapter": "3-5",
   "width": 80,
   "height": 120,
   "pivot": {
    "x": 40,
    "y": 120
   },
   "kind": "object"
  },
  "diode_shield": {
   "act3": true,
   "key": "obj/diode_shield/normal",
   "states": {
    "normal": "obj/diode_shield/normal",
    "block": "obj/diode_shield/block",
    "pass": "obj/diode_shield/pass"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 100,
   "height": 100,
   "pivot": {
    "x": 50,
    "y": 50
   },
   "kind": "object"
  },
  "diode_shield_icon": {
   "act3": true,
   "key": "obj/diode_shield_icon/default",
   "states": {
    "default": "obj/diode_shield_icon/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 48
   },
   "kind": "object"
  },
  "diode_shield_block_effect": {
   "act3": true,
   "key": "obj/diode_shield_block_effect/default",
   "states": {
    "default": "obj/diode_shield_block_effect/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 200,
   "height": 200,
   "pivot": {
    "x": 100,
    "y": 100
   },
   "kind": "effect",
   "align_to": "diode_shield_block",
   "body_pivot": [
    50,
    50
   ]
  },
  "diode_shield_pass_effect": {
   "act3": true,
   "key": "obj/diode_shield_pass_effect/default",
   "states": {
    "default": "obj/diode_shield_pass_effect/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 200,
   "height": 200,
   "pivot": {
    "x": 100,
    "y": 100
   },
   "kind": "effect",
   "align_to": "diode_shield_pass",
   "body_pivot": [
    50,
    50
   ]
  },
  "curse_backflow": {
   "act3": true,
   "key": "obj/curse_backflow/01",
   "states": {
    "01": "obj/curse_backflow/01",
    "02": "obj/curse_backflow/02",
    "03": "obj/curse_backflow/03",
    "04": "obj/curse_backflow/04"
   },
   "pack": "obj_3-5",
   "chapter": "3-5",
   "width": 200,
   "height": 60,
   "pivot": {
    "x": 100,
    "y": 30
   },
   "kind": "effect"
  },
  "tester_lamp": {
   "act3": true,
   "key": "obj/tester_lamp/off",
   "states": {
    "off": "obj/tester_lamp/off",
    "dim": "obj/tester_lamp/dim",
    "bright": "obj/tester_lamp/bright"
   },
   "pack": "obj_3-5",
   "chapter": "3-5",
   "width": 60,
   "height": 80,
   "pivot": {
    "x": 30,
    "y": 80
   },
   "kind": "object"
  },
  "tester_lamp_dim_glow": {
   "act3": true,
   "key": "obj/tester_lamp_dim_glow/default",
   "states": {
    "default": "obj/tester_lamp_dim_glow/default"
   },
   "pack": "obj_3-5",
   "chapter": "3-5",
   "width": 180,
   "height": 180,
   "pivot": {
    "x": 90,
    "y": 135
   },
   "kind": "effect",
   "align_to": "tester_lamp_dim",
   "body_pivot": [
    30,
    80
   ]
  },
  "tester_lamp_bright_glow": {
   "act3": true,
   "key": "obj/tester_lamp_bright_glow/default",
   "states": {
    "default": "obj/tester_lamp_bright_glow/default"
   },
   "pack": "obj_3-5",
   "chapter": "3-5",
   "width": 180,
   "height": 180,
   "pivot": {
    "x": 90,
    "y": 135
   },
   "kind": "effect",
   "align_to": "tester_lamp_bright",
   "body_pivot": [
    30,
    80
   ]
  },
  "hourglass": {
   "act3": true,
   "key": "obj/hourglass/01",
   "states": {
    "01": "obj/hourglass/01",
    "02": "obj/hourglass/02",
    "03": "obj/hourglass/03",
    "04": "obj/hourglass/04",
    "05": "obj/hourglass/05",
    "06": "obj/hourglass/06"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 60,
   "height": 100,
   "pivot": {
    "x": 30,
    "y": 100
   },
   "kind": "object"
  },
  "hourglass_icon": {
   "act3": true,
   "key": "obj/hourglass_icon/default",
   "states": {
    "default": "obj/hourglass_icon/default"
   },
   "pack": "obj_3_items",
   "chapter": "3_items",
   "width": 96,
   "height": 96,
   "pivot": {
    "x": 48,
    "y": 96
   },
   "kind": "object"
  },
  "hourglass_door": {
   "act3": true,
   "key": "obj/hourglass_door/closed",
   "states": {
    "closed": "obj/hourglass_door/closed",
    "opening_01": "obj/hourglass_door/opening_01",
    "opening_02": "obj/hourglass_door/opening_02",
    "opening_03": "obj/hourglass_door/opening_03",
    "opening_04": "obj/hourglass_door/opening_04"
   },
   "pack": "obj_3-6",
   "chapter": "3-6",
   "width": 250,
   "height": 500,
   "pivot": {
    "x": 125,
    "y": 500
   },
   "kind": "object"
  },
  "light_arrow": {
   "act3": true,
   "key": "obj/light_arrow/01",
   "states": {
    "01": "obj/light_arrow/01",
    "02": "obj/light_arrow/02",
    "03": "obj/light_arrow/03",
    "04": "obj/light_arrow/04"
   },
   "pack": "obj_3-6",
   "chapter": "3-6",
   "width": 120,
   "height": 30,
   "pivot": {
    "x": 60,
    "y": 15
   },
   "kind": "effect"
  },
  "light_arrow_hit": {
   "act3": true,
   "key": "obj/light_arrow_hit/01",
   "states": {
    "01": "obj/light_arrow_hit/01",
    "02": "obj/light_arrow_hit/02",
    "03": "obj/light_arrow_hit/03",
    "04": "obj/light_arrow_hit/04"
   },
   "pack": "obj_3-6",
   "chapter": "3-6",
   "width": 128,
   "height": 128,
   "pivot": {
    "x": 64,
    "y": 64
   },
   "kind": "effect"
  },
  "light_arrow_tail": {
   "act3": true,
   "key": "obj/light_arrow_tail/default",
   "states": {
    "default": "obj/light_arrow_tail/default"
   },
   "pack": "obj_3-6",
   "chapter": "3-6",
   "width": 240,
   "height": 60,
   "pivot": {
    "x": 120,
    "y": 30
   },
   "kind": "effect",
   "align_to": "light_arrow_01",
   "body_pivot": [
    60,
    15
   ]
  },
  "speed_lines": {
   "act3": true,
   "key": "obj/speed_lines/01",
   "states": {
    "01": "obj/speed_lines/01",
    "02": "obj/speed_lines/02",
    "03": "obj/speed_lines/03"
   },
   "pack": "obj_3-6",
   "chapter": "3-6",
   "width": 400,
   "height": 200,
   "pivot": {
    "x": 200,
    "y": 100
   },
   "kind": "effect"
  },
  "spellbook_complete": {
   "act3": true,
   "key": "obj/spellbook_complete/01",
   "states": {
    "01": "obj/spellbook_complete/01",
    "02": "obj/spellbook_complete/02",
    "03": "obj/spellbook_complete/03",
    "04": "obj/spellbook_complete/04",
    "05": "obj/spellbook_complete/05",
    "06": "obj/spellbook_complete/06"
   },
   "pack": "obj_3-6",
   "chapter": "3-6",
   "width": 600,
   "height": 600,
   "pivot": {
    "x": 300,
    "y": 300
   },
   "kind": "effect"
  },
  "pool_bridge": {
   "act3": true,
   "key": "obj/pool_bridge/default",
   "states": {
    "default": "obj/pool_bridge/default"
   },
   "pack": "obj_3-2",
   "chapter": "3-2",
   "width": 600,
   "height": 40,
   "pivot": {
    "x": 300,
    "y": 4
   }
  }
 },
 "ui": {
  "images": {
   "title_bg": {
    "key": "ui/title_bg",
    "width": 1920,
    "height": 1080
   },
   "title_logo": {
    "key": "ui/title_logo",
    "width": 1200,
    "height": 400
   },
   "dialogue_overlay": {
    "key": "ui/dialogue_overlay",
    "width": 1920,
    "height": 1080
   },
   "hud_bar": {
    "key": "ui/hud_bar",
    "width": 480,
    "height": 132
   },
   "icon_health": {
    "key": "ui/icon_health",
    "width": 96,
    "height": 96
   },
   "icon_mana": {
    "key": "ui/icon_mana",
    "width": 96,
    "height": 96
   },
   "icon_weapon": {
    "key": "ui/icon_weapon",
    "width": 96,
    "height": 96
   },
   "unlock_blank": {
    "key": "ui/unlock_blank",
    "width": 920,
    "height": 230
   },
   "exam_blank": {
    "key": "ui/exam_blank",
    "width": 1536,
    "height": 1024
   },
   "blank_spread": {
    "key": "ui/blank_spread",
    "width": 1536,
    "height": 1024
   },
   "book_cover": {
    "key": "ui/book_cover",
    "width": 1254,
    "height": 1254
   },
   "prologue_book_tear": {
    "key": "cut/prologue_book_tear"
   },
   "act1_start": {
    "key": "cut/act1_start"
   },
   "act1_end": {
    "key": "cut/act1_end"
   }
  },
  "chapters": [
   {
    "chapter": "01",
    "topic": "돌림힘과 지레",
    "scene": "시소의 받침점",
    "law": "물체에 작용하는 알짜힘과 돌림힘이 모두 0일 때 물체는 평형을 이룬다.",
    "torn": "ui/torn_01",
    "illustration": "ui/illust_01"
   },
   {
    "chapter": "02",
    "topic": "관성과 가속도",
    "scene": "얼음 회랑",
    "law": "힘이 작용하지 않으면 물체는 운동 상태를 유지하고, 힘이 작용하면 힘에 비례하고 질량에 반비례하는 가속도가 생긴다.",
    "torn": "ui/torn_02",
    "illustration": "ui/illust_02"
   },
   {
    "chapter": "03",
    "topic": "작용과 반작용",
    "scene": "얼음 호수",
    "law": "힘은 언제나 쌍으로 작용하고, 외부 힘이 없으면 물체들의 운동량 총합은 보존된다.",
    "torn": "ui/torn_03",
    "illustration": "ui/illust_03"
   },
   {
    "chapter": "04",
    "topic": "에너지 보존",
    "scene": "광차 탑",
    "law": "물체에 해 준 일만큼 운동 에너지가 변하고, 마찰이 없으면 위치 에너지와 운동 에너지의 합인 역학적 에너지는 보존된다.",
    "torn": "ui/torn_04",
    "illustration": "ui/illust_04"
   },
   {
    "chapter": "05",
    "topic": "마찰과 열",
    "scene": "거친 돌바닥",
    "law": "역학적 에너지가 열로 전환될 때도 에너지의 총량은 변하지 않는다.",
    "torn": "ui/torn_05",
    "illustration": "ui/illust_05"
   },
   {
    "chapter": "06",
    "topic": "열과 영구기관",
    "scene": "영원의 바퀴",
    "law": "열을 역학적 에너지로 바꾸는 효율은 100%가 될 수 없으며, 영구기관은 만들 수 없다.",
    "torn": "ui/torn_06",
    "illustration": "ui/illust_06"
   }
  ],
  "regions": {
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
  "subtitle": "오개념의 저주",
  "examTitle": "마법서 시험",
  "act2": {
   "07_electric_force": {
    "kind": "spellbook_illustration",
    "pivot": [
     256,
     256
    ],
    "spellbook_overlay_top_left": [
     810,
     256
    ],
    "content_role": "07_electric_force",
    "key": "ui/illust_07",
    "width": 512,
    "height": 512
   },
   "08_circuit": {
    "kind": "spellbook_illustration",
    "pivot": [
     256,
     256
    ],
    "spellbook_overlay_top_left": [
     810,
     256
    ],
    "content_role": "08_circuit",
    "key": "ui/illust_08",
    "width": 512,
    "height": 512
   },
   "09_capacitor": {
    "kind": "spellbook_illustration",
    "pivot": [
     256,
     256
    ],
    "spellbook_overlay_top_left": [
     810,
     256
    ],
    "content_role": "09_capacitor",
    "key": "ui/illust_09",
    "width": 512,
    "height": 512
   },
   "10_magnetism": {
    "kind": "spellbook_illustration",
    "pivot": [
     256,
     256
    ],
    "spellbook_overlay_top_left": [
     810,
     256
    ],
    "content_role": "10_magnetism",
    "key": "ui/illust_10",
    "width": 512,
    "height": 512
   },
   "11_current_magnetism": {
    "kind": "spellbook_illustration",
    "pivot": [
     256,
     256
    ],
    "spellbook_overlay_top_left": [
     810,
     256
    ],
    "content_role": "11_current_magnetism",
    "key": "ui/illust_11",
    "width": 512,
    "height": 512
   },
   "12_induction": {
    "kind": "spellbook_illustration",
    "pivot": [
     256,
     256
    ],
    "spellbook_overlay_top_left": [
     810,
     256
    ],
    "content_role": "12_induction",
    "key": "ui/illust_12",
    "width": 512,
    "height": 512
   },
   "circuit_ui_series": {
    "kind": "circuit_ui",
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
    ],
    "key": "ui2/circuit_ui_series",
    "width": 1400,
    "height": 800
   },
   "circuit_ui_parallel": {
    "kind": "circuit_ui",
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
    ],
    "key": "ui2/circuit_ui_parallel",
    "width": 1400,
    "height": 800
   },
   "current_dot": {
    "kind": "circuit_effect",
    "pivot": [
     8,
     8
    ],
    "loop_along": "wire_path_segments",
    "key": "ui2/current_dot",
    "width": 16,
    "height": 16
   },
   "part_icon_mana_stone": {
    "kind": "part_icon",
    "pivot": [
     48,
     48
    ],
    "source_asset": "mana_stone.png",
    "key": "ui2/part_icon_mana_stone",
    "width": 96,
    "height": 96
   },
   "part_icon_resistor_crystal": {
    "kind": "part_icon",
    "pivot": [
     48,
     48
    ],
    "source_asset": "resistor_crystal.png",
    "key": "ui2/part_icon_resistor_crystal",
    "width": 96,
    "height": 96
   },
   "part_icon_lamp": {
    "kind": "part_icon",
    "pivot": [
     48,
     48
    ],
    "source_asset": "lamp_normal.png",
    "key": "ui2/part_icon_lamp",
    "width": 96,
    "height": 96
   },
   "part_icon_wire": {
    "kind": "part_icon",
    "pivot": [
     48,
     48
    ],
    "source_asset": "wire_straight_normal.png",
    "key": "ui2/part_icon_wire",
    "width": 96,
    "height": 96
   },
   "part_icon_switch_off": {
    "kind": "part_icon",
    "pivot": [
     48,
     48
    ],
    "source_asset": "direction_switch_left.png",
    "key": "ui2/part_icon_switch_off",
    "width": 96,
    "height": 96
   },
   "part_icon_switch_on": {
    "kind": "part_icon",
    "pivot": [
     48,
     48
    ],
    "source_asset": "direction_switch_right.png",
    "key": "ui2/part_icon_switch_on",
    "width": 96,
    "height": 96
   },
   "part_icon_lightning_box": {
    "kind": "part_icon",
    "pivot": [
     48,
     48
    ],
    "source_asset": "lightning_box_large_close.png",
    "key": "ui2/part_icon_lightning_box",
    "width": 96,
    "height": 96
   },
   "part_icon_coil": {
    "kind": "part_icon",
    "pivot": [
     48,
     48
    ],
    "source_asset": "coil_normal.png",
    "key": "ui2/part_icon_coil",
    "width": 96,
    "height": 96
   },
   "part_icon_bar_magnet": {
    "kind": "part_icon",
    "pivot": [
     48,
     48
    ],
    "source_asset": "bar_magnet_medium.png",
    "key": "ui2/part_icon_bar_magnet",
    "width": 96,
    "height": 96
   },
   "ammeter": {
    "kind": "meter",
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
    ],
    "key": "ui2/ammeter",
    "width": 360,
    "height": 360
   },
   "ammeter_needle": {
    "kind": "meter_needle",
    "pivot": [
     180,
     190
    ],
    "rotation_axis_local": [
     180,
     190
    ],
    "default_angle_degrees": 90,
    "mount_on": "ammeter.png",
    "key": "ui2/ammeter_needle",
    "width": 360,
    "height": 360
   },
   "wattmeter": {
    "kind": "meter",
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
    ],
    "key": "ui2/wattmeter",
    "width": 360,
    "height": 360
   },
   "wattmeter_needle": {
    "kind": "meter_needle",
    "pivot": [
     180,
     190
    ],
    "rotation_axis_local": [
     180,
     190
    ],
    "default_angle_degrees": 90,
    "mount_on": "wattmeter.png",
    "key": "ui2/wattmeter_needle",
    "width": 360,
    "height": 360
   },
   "result_board": {
    "kind": "result_board",
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
    ],
    "key": "ui2/result_board",
    "width": 1200,
    "height": 700
   },
   "act2_intro": {
    "kind": "cutscene",
    "pivot": [
     960,
     540
    ],
    "optional_caption_text_rect": [
     100,
     905,
     1820,
     1025
    ],
    "key": "cut/act2_intro",
    "width": 1920,
    "height": 1080
   },
   "act2_ending": {
    "kind": "cutscene",
    "pivot": [
     960,
     540
    ],
    "optional_caption_text_rect": [
     100,
     905,
     1820,
     1025
    ],
    "key": "cut/act2_ending",
    "width": 1920,
    "height": 1080
   },
   "tower_floor_01_locked": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_01_locked",
    "width": 160,
    "height": 160
   },
   "tower_floor_01_open": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_01_open",
    "width": 160,
    "height": 160
   },
   "tower_floor_01_cleared": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_01_cleared",
    "width": 160,
    "height": 160
   },
   "tower_floor_02_locked": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_02_locked",
    "width": 160,
    "height": 160
   },
   "tower_floor_02_open": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_02_open",
    "width": 160,
    "height": 160
   },
   "tower_floor_02_cleared": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_02_cleared",
    "width": 160,
    "height": 160
   },
   "tower_floor_03_locked": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_03_locked",
    "width": 160,
    "height": 160
   },
   "tower_floor_03_open": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_03_open",
    "width": 160,
    "height": 160
   },
   "tower_floor_03_cleared": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_03_cleared",
    "width": 160,
    "height": 160
   },
   "tower_floor_04_locked": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_04_locked",
    "width": 160,
    "height": 160
   },
   "tower_floor_04_open": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_04_open",
    "width": 160,
    "height": 160
   },
   "tower_floor_04_cleared": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_04_cleared",
    "width": 160,
    "height": 160
   },
   "tower_floor_05_locked": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_05_locked",
    "width": 160,
    "height": 160
   },
   "tower_floor_05_open": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_05_open",
    "width": 160,
    "height": 160
   },
   "tower_floor_05_cleared": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_05_cleared",
    "width": 160,
    "height": 160
   },
   "tower_floor_06_locked": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_06_locked",
    "width": 160,
    "height": 160
   },
   "tower_floor_06_open": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_06_open",
    "width": 160,
    "height": 160
   },
   "tower_floor_06_cleared": {
    "kind": "map_icon",
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
    ],
    "key": "ui2/tower_floor_06_cleared",
    "width": 160,
    "height": 160
   },
   "part_icon_battery": {
    "key": "ui2/part_icon_battery",
    "width": 96,
    "height": 96,
    "kind": "part_icon"
   }
  },
  "act2Placement": {
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
  "act3": {
   "13_interference": {
    "kind": "illustration",
    "overlay_top_left": [
     810,
     256
    ],
    "pivot": [
     256,
     256
    ],
    "key": "ui/illust_13",
    "width": 512,
    "height": 512
   },
   "14_refraction_lens": {
    "kind": "illustration",
    "overlay_top_left": [
     810,
     256
    ],
    "pivot": [
     256,
     256
    ],
    "key": "ui/illust_14",
    "width": 512,
    "height": 512
   },
   "15_duality": {
    "kind": "illustration",
    "overlay_top_left": [
     810,
     256
    ],
    "pivot": [
     256,
     256
    ],
    "key": "ui/illust_15",
    "width": 512,
    "height": 512
   },
   "16_line_spectrum": {
    "kind": "illustration",
    "overlay_top_left": [
     810,
     256
    ],
    "pivot": [
     256,
     256
    ],
    "key": "ui/illust_16",
    "width": 512,
    "height": 512
   },
   "17_semiconductor": {
    "kind": "illustration",
    "overlay_top_left": [
     810,
     256
    ],
    "pivot": [
     256,
     256
    ],
    "key": "ui/illust_17",
    "width": 512,
    "height": 512
   },
   "18_relativity": {
    "kind": "illustration",
    "overlay_top_left": [
     810,
     256
    ],
    "pivot": [
     256,
     256
    ],
    "key": "ui/illust_18",
    "width": 512,
    "height": 512
   },
   "act3_intro": {
    "pivot": [
     960,
     540
    ],
    "text_regions": [],
    "key": "cut/act3_intro",
    "width": 1920,
    "height": 1080
   },
   "act3_final": {
    "pivot": [
     960,
     540
    ],
    "text_regions": [],
    "key": "cut/act3_final",
    "width": 1920,
    "height": 1080
   },
   "epilogue": {
    "pivot": [
     960,
     540
    ],
    "text_regions": [],
    "key": "cut/epilogue",
    "width": 1920,
    "height": 1080
   },
   "credits_bg": {
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
    ],
    "key": "cut/credits_bg",
    "width": 1920,
    "height": 1080
   },
   "spectroscope_view": {
    "pivot": [
     600,
     200
    ],
    "strip_rect": [
     195,
     126,
     1005,
     275
    ],
    "key": "ui3/spectroscope_view",
    "width": 1200,
    "height": 400
   },
   "hourglass_compare": {
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
    ],
    "key": "ui3/hourglass_compare",
    "width": 900,
    "height": 500
   },
   "boss_phase_banner": {
    "pivot": [
     600,
     100
    ],
    "text_rect": [
     225,
     42,
     975,
     160
    ],
    "key": "ui3/boss_phase_banner",
    "width": 1200,
    "height": 200
   },
   "lens_bench_ui": {
    "pivot": [
     800,
     60
    ],
    "tick_start_x": 50,
    "tick_end_x": 1550,
    "pixels_per_meter": 125,
    "minor_tick_m": 0.1,
    "major_tick_m": 1,
    "key": "ui3/lens_bench_ui",
    "width": 1600,
    "height": 120
   },
   "electron_eye_overlay": {
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
    "scanline_spacing_px": 8,
    "key": "ui3/electron_eye_overlay",
    "width": 1920,
    "height": 1080
   },
   "abyss_floor_01_locked": {
    "pivot": [
     80,
     80
    ],
    "room": 1,
    "state": "locked",
    "emblem_source": "slit_wall.png",
    "key": "ui3/abyss_floor_01_locked",
    "width": 160,
    "height": 160
   },
   "abyss_floor_01_open": {
    "pivot": [
     80,
     80
    ],
    "room": 1,
    "state": "open",
    "emblem_source": "slit_wall.png",
    "key": "ui3/abyss_floor_01_open",
    "width": 160,
    "height": 160
   },
   "abyss_floor_01_cleared": {
    "pivot": [
     80,
     80
    ],
    "room": 1,
    "state": "cleared",
    "emblem_source": "slit_wall.png",
    "key": "ui3/abyss_floor_01_cleared",
    "width": 160,
    "height": 160
   },
   "abyss_floor_02_locked": {
    "pivot": [
     80,
     80
    ],
    "room": 2,
    "state": "locked",
    "emblem_source": "convex_lens_icon.png",
    "key": "ui3/abyss_floor_02_locked",
    "width": 160,
    "height": 160
   },
   "abyss_floor_02_open": {
    "pivot": [
     80,
     80
    ],
    "room": 2,
    "state": "open",
    "emblem_source": "convex_lens_icon.png",
    "key": "ui3/abyss_floor_02_open",
    "width": 160,
    "height": 160
   },
   "abyss_floor_02_cleared": {
    "pivot": [
     80,
     80
    ],
    "room": 2,
    "state": "cleared",
    "emblem_source": "convex_lens_icon.png",
    "key": "ui3/abyss_floor_02_cleared",
    "width": 160,
    "height": 160
   },
   "abyss_floor_03_locked": {
    "pivot": [
     80,
     80
    ],
    "room": 3,
    "state": "locked",
    "emblem_source": "electron_eye_icon.png",
    "key": "ui3/abyss_floor_03_locked",
    "width": 160,
    "height": 160
   },
   "abyss_floor_03_open": {
    "pivot": [
     80,
     80
    ],
    "room": 3,
    "state": "open",
    "emblem_source": "electron_eye_icon.png",
    "key": "ui3/abyss_floor_03_open",
    "width": 160,
    "height": 160
   },
   "abyss_floor_03_cleared": {
    "pivot": [
     80,
     80
    ],
    "room": 3,
    "state": "cleared",
    "emblem_source": "electron_eye_icon.png",
    "key": "ui3/abyss_floor_03_cleared",
    "width": 160,
    "height": 160
   },
   "abyss_floor_04_locked": {
    "pivot": [
     80,
     80
    ],
    "room": 4,
    "state": "locked",
    "emblem_source": "spectroscope_icon.png",
    "key": "ui3/abyss_floor_04_locked",
    "width": 160,
    "height": 160
   },
   "abyss_floor_04_open": {
    "pivot": [
     80,
     80
    ],
    "room": 4,
    "state": "open",
    "emblem_source": "spectroscope_icon.png",
    "key": "ui3/abyss_floor_04_open",
    "width": 160,
    "height": 160
   },
   "abyss_floor_04_cleared": {
    "pivot": [
     80,
     80
    ],
    "room": 4,
    "state": "cleared",
    "emblem_source": "spectroscope_icon.png",
    "key": "ui3/abyss_floor_04_cleared",
    "width": 160,
    "height": 160
   },
   "abyss_floor_05_locked": {
    "pivot": [
     80,
     80
    ],
    "room": 5,
    "state": "locked",
    "emblem_source": "diode_crystal_icon.png",
    "key": "ui3/abyss_floor_05_locked",
    "width": 160,
    "height": 160
   },
   "abyss_floor_05_open": {
    "pivot": [
     80,
     80
    ],
    "room": 5,
    "state": "open",
    "emblem_source": "diode_crystal_icon.png",
    "key": "ui3/abyss_floor_05_open",
    "width": 160,
    "height": 160
   },
   "abyss_floor_05_cleared": {
    "pivot": [
     80,
     80
    ],
    "room": 5,
    "state": "cleared",
    "emblem_source": "diode_crystal_icon.png",
    "key": "ui3/abyss_floor_05_cleared",
    "width": 160,
    "height": 160
   },
   "abyss_floor_06_locked": {
    "pivot": [
     80,
     80
    ],
    "room": 6,
    "state": "locked",
    "emblem_source": "hourglass_icon.png",
    "key": "ui3/abyss_floor_06_locked",
    "width": 160,
    "height": 160
   },
   "abyss_floor_06_open": {
    "pivot": [
     80,
     80
    ],
    "room": 6,
    "state": "open",
    "emblem_source": "hourglass_icon.png",
    "key": "ui3/abyss_floor_06_open",
    "width": 160,
    "height": 160
   },
   "abyss_floor_06_cleared": {
    "pivot": [
     80,
     80
    ],
    "room": 6,
    "state": "cleared",
    "emblem_source": "hourglass_icon.png",
    "key": "ui3/abyss_floor_06_cleared",
    "width": 160,
    "height": 160
   }
  }
 },
 "sounds": {
  "bgm_title": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_title.ogg",
   "duration": 69.818,
   "rms": -21.1,
   "description": "모험 시작. 물리의 마법서 주제 선율",
   "ogg": "assets/audio/bgm_title.ogg"
  },
  "bgm_village_cursed": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_village_cursed.ogg",
   "duration": 85.333,
   "rms": -21.1,
   "description": "평화로운 마을 선율의 미묘하게 어긋난 저주 버전",
   "ogg": "assets/audio/bgm_village_cursed.ogg"
  },
  "bgm_castle_freed": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_castle_freed.ogg",
   "duration": 80.0,
   "rms": -21.2,
   "description": "해방된 돌의 성, 나무 악기와 묵직한 타악기",
   "ogg": "assets/audio/bgm_castle_freed.ogg"
  },
  "bgm_castle_cursed": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_castle_cursed.ogg",
   "duration": 80.0,
   "rms": -21.2,
   "description": "돌의 성 동일 선율·동일 길이의 탁한 저주 버전",
   "ogg": "assets/audio/bgm_castle_cursed.ogg"
  },
  "bgm_truth_circle": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_truth_circle.ogg",
   "duration": 101.053,
   "rms": -21.1,
   "description": "진실의 원, 맑은 피아노와 부드러운 현",
   "ogg": "assets/audio/bgm_truth_circle.ogg"
  },
  "bgm_puzzle": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_puzzle.ogg",
   "duration": 91.429,
   "rms": -21.2,
   "description": "사고를 방해하지 않는 절제된 퍼즐 반복",
   "ogg": "assets/audio/bgm_puzzle.ogg"
  },
  "bgm_battle": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_battle.ogg",
   "duration": 68.571,
   "rms": -21.1,
   "description": "빠른 일반 전투와 타악기",
   "ogg": "assets/audio/bgm_battle.ogg"
  },
  "bgm_boss_act1": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_boss_act1.ogg",
   "duration": 76.19,
   "rms": -21.1,
   "description": "돌의 성 주제의 긴박한 1막 보스 편곡",
   "ogg": "assets/audio/bgm_boss_act1.ogg"
  },
  "bgm_exam": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_exam.ogg",
   "duration": 106.667,
   "rms": -21.3,
   "description": "차분한 시험, 시계 같은 박자",
   "ogg": "assets/audio/bgm_exam.ogg"
  },
  "bgm_act1_clear": {
   "type": "bgm",
   "loop": false,
   "mp3": "assets/audio/bgm_act1_clear.mp3",
   "duration": 12.8,
   "rms": -21.2,
   "description": "1막 완료, 밝게 마무리되는 마법서 주제 선율"
  },
  "sfx_curse_break": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_curse_break.mp3",
   "duration": 2.2,
   "rms": -20.3,
   "description": "저주 균열, 파쇄, 종 울림"
  },
  "sfx_page_restore": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_page_restore.mp3",
   "duration": 1.65,
   "rms": -20.3,
   "description": "종이 펄럭임과 책 착, 하프 상승음"
  },
  "sfx_truth_circle_enter": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_truth_circle_enter.mp3",
   "duration": 1.25,
   "rms": -18.8,
   "description": "진실의 원 진입 차임"
  },
  "sfx_door_open": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_door_open.mp3",
   "duration": 2.6,
   "rms": -18.5,
   "description": "무거운 돌문 마찰과 열림"
  },
  "sfx_puzzle_reset": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_puzzle_reset.mp3",
   "duration": 1.1,
   "rms": -15.6,
   "description": "장난스러운 뿅과 되감기"
  },
  "sfx_exam_correct": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_exam_correct.mp3",
   "duration": 0.95,
   "rms": -16.5,
   "description": "깃펜 체크와 밝은 확인음"
  },
  "sfx_exam_wrong": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_exam_wrong.mp3",
   "duration": 0.8,
   "rms": -16.3,
   "description": "부드러운 낮은 오답 알림"
  },
  "sfx_weapon_unlock": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_weapon_unlock.mp3",
   "duration": 1.55,
   "rms": -17.6,
   "description": "지팡이 빛 모임과 해금음"
  },
  "sfx_text_blip_ian": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_text_blip_ian.mp3",
   "duration": 0.085,
   "rms": -10.8,
   "description": "이안 중간 높이 글자음"
  },
  "sfx_text_blip_garon": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_text_blip_garon.mp3",
   "duration": 0.085,
   "rms": -10.8,
   "description": "가론 낮은 글자음"
  },
  "sfx_text_blip_granny": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_text_blip_granny.mp3",
   "duration": 0.1,
   "rms": -11.0,
   "description": "할멈 살짝 떨리는 글자음"
  },
  "sfx_text_blip_wizard": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_text_blip_wizard.mp3",
   "duration": 0.095,
   "rms": -12.5,
   "description": "마법사 낮고 차가운 글자음"
  },
  "sfx_ian_hurt": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_ian_hurt.mp3",
   "duration": 0.55,
   "rms": -16.3,
   "description": "이안 피격 숨과 타격"
  },
  "sfx_ui_click": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_ui_click.mp3",
   "duration": 0.16,
   "rms": -17.8,
   "description": "가벼운 나무 메뉴 클릭"
  },
  "sfx_step_stone": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_step_stone.mp3",
   "duration": 0.28,
   "rms": -13.6,
   "description": "돌바닥 한 걸음"
  },
  "sfx_step_ice": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_step_ice.mp3",
   "duration": 0.35,
   "rms": -18.3,
   "description": "얼음 위 한 걸음과 미끄러짐"
  },
  "sfx_lever_tilt": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_lever_tilt.mp3",
   "duration": 1.2,
   "rms": -18.6,
   "description": "나무 시소 경첩과 무게 이동"
  },
  "sfx_lever_balance": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_lever_balance.mp3",
   "duration": 0.85,
   "rms": -16.5,
   "description": "시소 균형과 문 잠금 해제"
  },
  "sfx_rock_drop_launch": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_rock_drop_launch.mp3",
   "duration": 1.2,
   "rms": -16.0,
   "description": "큰 돌 낙하와 시소 발사"
  },
  "sfx_golem_fly": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_golem_fly.mp3",
   "duration": 0.72,
   "rms": -17.0,
   "description": "돌 골렘 비행"
  },
  "sfx_golem_crumble": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_golem_crumble.mp3",
   "duration": 1.1,
   "rms": -16.2,
   "description": "돌 골렘 부서짐"
  },
  "sfx_tower_collapse": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_tower_collapse.mp3",
   "duration": 1.65,
   "rms": -14.6,
   "description": "블록 미끄러짐과 와르르"
  },
  "sfx_ice_slide_loop": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_ice_slide_loop.ogg",
   "duration": 2.5,
   "rms": -15.7,
   "description": "일정한 얼음 미끄러짐 반복",
   "ogg": "assets/audio/sfx_ice_slide_loop.ogg"
  },
  "sfx_cursed_stop": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_cursed_stop.mp3",
   "duration": 0.45,
   "rms": -17.0,
   "description": "저주 상태의 급정거"
  },
  "sfx_wall_ring_grab": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_wall_ring_grab.mp3",
   "duration": 0.8,
   "rms": -21.4,
   "description": "쇠고리 잡고 몸이 당겨짐"
  },
  "sfx_golem_charge_loop": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_golem_charge_loop.ogg",
   "duration": 2.5,
   "rms": -13.2,
   "description": "헛도는 발과 낮은 얼음 마찰 반복",
   "ogg": "assets/audio/sfx_golem_charge_loop.ogg"
  },
  "sfx_beam_kick": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_beam_kick.mp3",
   "duration": 1.05,
   "rms": -16.4,
   "description": "외나무다리 차기와 구르기"
  },
  "sfx_golem_fall_pit": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_golem_fall_pit.mp3",
   "duration": 2.25,
   "rms": -19.0,
   "description": "골렘 낙하와 먼 곳 충돌"
  },
  "sfx_bridge_crack_1": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_bridge_crack_1.mp3",
   "duration": 0.52,
   "rms": -15.9,
   "description": "판자 작은 금"
  },
  "sfx_bridge_crack_2": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_bridge_crack_2.mp3",
   "duration": 0.75,
   "rms": -14.3,
   "description": "판자 큰 금"
  },
  "sfx_bridge_collapse": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_bridge_collapse.mp3",
   "duration": 1.45,
   "rms": -16.3,
   "description": "판자 연속 붕괴"
  },
  "sfx_pressure_plate": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_pressure_plate.mp3",
   "duration": 0.58,
   "rms": -15.8,
   "description": "돌 압력판과 잠금 클릭"
  },
  "sfx_sled_brake_loop": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_sled_brake_loop.ogg",
   "duration": 2.5,
   "rms": -13.8,
   "description": "썰매 날의 반복 얼음 긁힘",
   "ogg": "assets/audio/sfx_sled_brake_loop.ogg"
  },
  "sfx_shield_bash": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_shield_bash.mp3",
   "duration": 0.72,
   "rms": -21.3,
   "description": "방패 금속 충돌"
  },
  "sfx_throw_whoosh": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_throw_whoosh.mp3",
   "duration": 0.5,
   "rms": -16.0,
   "description": "물건 던지는 공기"
  },
  "sfx_push_impact": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_push_impact.mp3",
   "duration": 0.58,
   "rms": -14.5,
   "description": "서로 미는 둔탁한 충돌"
  },
  "sfx_troll_roar": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_troll_roar.mp3",
   "duration": 1.35,
   "rms": -14.8,
   "description": "우스꽝스러운 얼음 트롤 포효"
  },
  "sfx_troll_hurt": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_troll_hurt.mp3",
   "duration": 0.67,
   "rms": -14.7,
   "description": "얼음 트롤 피격"
  },
  "sfx_rail_clack": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_rail_clack.mp3",
   "duration": 0.3,
   "rms": -18.5,
   "description": "광차 레일 이음새 한 번"
  },
  "sfx_minecart_creak": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_minecart_creak.mp3",
   "duration": 1.0,
   "rms": -16.6,
   "description": "광차 언덕 정점 멈칫"
  },
  "sfx_spring_bumper": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spring_bumper.mp3",
   "duration": 0.9,
   "rms": -20.2,
   "description": "가로 용수철과 광차 출발"
  },
  "sfx_boulder_roll_loop": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_boulder_roll_loop.ogg",
   "duration": 2.5,
   "rms": -11.9,
   "description": "바위 굴러가는 반복 소리",
   "ogg": "assets/audio/sfx_boulder_roll_loop.ogg"
  },
  "sfx_rough_scrape_loop": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_rough_scrape_loop.ogg",
   "duration": 2.5,
   "rms": -11.8,
   "description": "거친 돌바닥의 반복 긁힘",
   "ogg": "assets/audio/sfx_rough_scrape_loop.ogg"
  },
  "sfx_ice_sizzle": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_ice_sizzle.mp3",
   "duration": 1.2,
   "rms": -18.9,
   "description": "얼음과 뜨거운 돌의 마찰열"
  },
  "sfx_spirit_attack": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spirit_attack.mp3",
   "duration": 0.75,
   "rms": -16.7,
   "description": "정령 얼음 조각 발사"
  },
  "sfx_spirit_deflect": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spirit_deflect.mp3",
   "duration": 0.65,
   "rms": -16.1,
   "description": "정령이 무기를 튕김"
  },
  "sfx_spirit_melt": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spirit_melt.mp3",
   "duration": 1.65,
   "rms": -18.5,
   "description": "정령 녹음과 물방울"
  },
  "sfx_wheel_tick": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_wheel_tick.mp3",
   "duration": 0.15,
   "rms": -18.4,
   "description": "영원의 바퀴 기계 틱 한 번"
  },
  "sfx_steam_vent": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_steam_vent.mp3",
   "duration": 1.15,
   "rms": -18.7,
   "description": "증기 골렘 분출"
  },
  "sfx_fuel_snap": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_fuel_snap.mp3",
   "duration": 0.45,
   "rms": -19.3,
   "description": "연료선 끊김"
  },
  "sfx_machine_powerdown": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_machine_powerdown.mp3",
   "duration": 2.1,
   "rms": -15.1,
   "description": "기계 톱니 연속 감속"
  },
  "sfx_merchant_panic": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_merchant_panic.mp3",
   "duration": 0.95,
   "rms": -15.6,
   "description": "상인의 짧은 당황 음성풍 효과"
  },
  "bgm_castle_freed_v2a": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_castle_freed_v2a.mp3",
   "duration": 80.0,
   "description": "저주가 풀린 돌의 성. D장조 144 BPM, 칩튠 리드와 종·실로폰의 밝은 모험",
   "ogg": "assets/audio/bgm_castle_freed_v2a.ogg"
  },
  "jingle_realize_a": {
   "type": "jingle",
   "loop": false,
   "mp3": "assets/audio/jingle_realize_a.mp3",
   "duration": 3.6,
   "description": "깨달음과 저주 해제. 상승 아르페지오, D장조 환호 화음, 반짝이는 마무리"
  },
  "jingle_chapter_clear_a_v3": {
   "type": "jingle",
   "loop": false,
   "mp3": "assets/audio/jingle_chapter_clear_a_v3.mp3",
   "duration": 6.15,
   "description": "밝고 경쾌한 챕터 전환 징글 A. D장조, 빠른 금관·글로켄슈필·가벼운 북"
  },
  "bgm_midboss_v2": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_midboss_v2.mp3",
   "duration": 77.838,
   "description": "중간 보스전. D단조 148 BPM, 시계 박자·빠른 타악기·낮은 현악의 긴박한 추격",
   "ogg": "assets/audio/bgm_midboss_v2.ogg"
  },
  "bgm_act1_clear_v2": {
   "type": "jingle",
   "loop": false,
   "mp3": "assets/audio/bgm_act1_clear_v2.mp3",
   "duration": 14.2,
   "description": "1막 완료. 확장된 챕터 팡파르 후 물리의 마법서 주제 선율로 마무리"
  },
  "bgm_boss_act1_v2": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_boss_act1_v2.mp3",
   "duration": 86.154,
   "description": "1막 최종 보스전. D단조 156 BPM, 금관 경고 선율·연속 북·점층적 긴장",
   "ogg": "assets/audio/bgm_boss_act1_v2.ogg"
  },
  "sfx_golem_roar": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_golem_roar.mp3",
   "duration": 1.82,
   "description": "관성의 골렘 울부짖음",
   "ogg": "assets/audio/sfx_golem_roar.ogg"
  },
  "bgm_tower_cursed": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_tower_cursed.mp3",
   "duration": 98.181814,
   "description": "저주받은 탑: 낮은 전기 울림과 어긋난 오르골, 마법서 주제의 단조 변주",
   "act": 2,
   "ogg": "assets/audio/bgm_tower_cursed.ogg",
   "rms": -19.2,
   "loopSamples": 4329818
  },
  "bgm_tower_freed": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_tower_freed.mp3",
   "duration": 94.647891,
   "description": "해방된 탑: 밝은 칩튠·신시사이저·현악과 종, 마법서 주제의 경쾌한 변주",
   "act": 2,
   "ogg": "assets/audio/bgm_tower_freed.ogg",
   "rms": -21.1,
   "loopSamples": 4173972
  },
  "bgm_boss_act2": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_boss_act2.mp3",
   "duration": 120.0,
   "description": "자석 골렘: 무거운 금속 타악과 빠른 현악, 마법서 주제의 짧은 단조 변주",
   "act": 2,
   "ogg": "assets/audio/bgm_boss_act2.ogg",
   "rms": -19.9,
   "loopSamples": 5292000
  },
  "bgm_act2_clear": {
   "type": "bgm",
   "loop": false,
   "mp3": "assets/audio/bgm_act2_clear.mp3",
   "duration": 56.0,
   "description": "봉화와 마을의 불빛: 따뜻하게 커지는 현악·종의 2막 엔딩",
   "act": 2,
   "rms": -21.1
  },
  "sfx_rub_charge": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_rub_charge.mp3",
   "duration": 1.0,
   "description": "호박 막대를 털가죽에 문지른 뒤 작은 충전 틱",
   "act": 2,
   "rms": -18.51
  },
  "sfx_spark_small": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spark_small.mp3",
   "duration": 0.3,
   "description": "작은 전기 불꽃 두 번",
   "act": 2,
   "rms": -17.41
  },
  "sfx_repel_soft": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_repel_soft.mp3",
   "duration": 0.4,
   "description": "깃털과 돌이 부드럽게 밀려남",
   "act": 2,
   "rms": -17.16
  },
  "sfx_attract_snap": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_attract_snap.mp3",
   "duration": 0.3,
   "description": "끌려온 물체가 착 붙음",
   "act": 2,
   "rms": -17.26
  },
  "sfx_plate_charge": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_plate_charge.mp3",
   "duration": 0.8,
   "description": "금속판에 전하가 차는 상승음",
   "act": 2,
   "rms": -17.2
  },
  "sfx_spark_fairy_hit": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spark_fairy_hit.mp3",
   "duration": 0.4,
   "description": "불꽃 요정이 맞는 전기 파직",
   "act": 2,
   "rms": -18.88
  },
  "sfx_spark_fairy_vanish": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spark_fairy_vanish.mp3",
   "duration": 0.4,
   "description": "불꽃 요정이 사라지는 하강음",
   "act": 2,
   "rms": -17.3
  },
  "sfx_lamp_on_bright": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_lamp_on_bright.mp3",
   "duration": 0.5,
   "description": "등불이 밝게 켜지는 따뜻한 소리",
   "act": 2,
   "rms": -17.13
  },
  "sfx_lamp_on_dim": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_lamp_on_dim.mp3",
   "duration": 0.5,
   "description": "등불이 희미하게 켜지는 낮은 소리",
   "act": 2,
   "rms": -17.12
  },
  "sfx_lamp_off": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_lamp_off.mp3",
   "duration": 0.3,
   "description": "등불이 꺼지는 짧은 소리",
   "act": 2,
   "rms": -17.48
  },
  "sfx_wire_heat": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_wire_heat.mp3",
   "duration": 2.0,
   "description": "마력선이 일정하게 달아오르는 지글거림",
   "act": 2,
   "ogg": "assets/audio/sfx_wire_heat.ogg",
   "rms": -17.77,
   "loopSamples": 88200
  },
  "sfx_wire_snap": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_wire_snap.mp3",
   "duration": 0.8,
   "description": "마력선이 타서 끊어지고 식는 소리",
   "act": 2,
   "rms": -20.8
  },
  "sfx_bolt_thin": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_bolt_thin.mp3",
   "duration": 0.8,
   "description": "직렬 회로의 가늘고 긴 번개",
   "act": 2,
   "rms": -17.46
  },
  "sfx_bolt_thick": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_bolt_thick.mp3",
   "duration": 0.5,
   "description": "병렬 회로의 굵고 짧은 번개",
   "act": 2,
   "rms": -19.96
  },
  "sfx_overheat_warn": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_overheat_warn.mp3",
   "duration": 0.4,
   "description": "과열 경고음 두 번",
   "act": 2,
   "rms": -17.09
  },
  "sfx_box_charge": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_box_charge.mp3",
   "duration": 2.0,
   "description": "번개 상자 충전 중 일정한 전기 웅웅거림",
   "act": 2,
   "ogg": "assets/audio/sfx_box_charge.ogg",
   "rms": -17.57,
   "loopSamples": 88200
  },
  "sfx_box_full": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_box_full.mp3",
   "duration": 0.5,
   "description": "번개 상자가 가득 찬 맑은 딩",
   "act": 2,
   "rms": -17.26
  },
  "sfx_box_discharge": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_box_discharge.mp3",
   "duration": 1.2,
   "description": "번개 상자가 한꺼번에 방전됨",
   "act": 2,
   "rms": -22.12
  },
  "sfx_touch_on": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_touch_on.mp3",
   "duration": 0.5,
   "description": "터치 석판이 손바닥에 반응하는 맑은 링",
   "act": 2,
   "rms": -17.25
  },
  "sfx_touch_none": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_touch_none.mp3",
   "duration": 0.3,
   "description": "석판이 반응하지 않는 둔한 톡",
   "act": 2,
   "rms": -17.46
  },
  "sfx_door_electric_open": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_door_electric_open.mp3",
   "duration": 2.0,
   "description": "큰 철문이 위로 올라가며 열림",
   "act": 2,
   "rms": -17.81
  },
  "sfx_magnet_iron": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_magnet_iron.mp3",
   "duration": 0.4,
   "description": "철이 자석에 강하게 달라붙음",
   "act": 2,
   "rms": -19.51
  },
  "sfx_magnet_none": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_magnet_none.mp3",
   "duration": 0.5,
   "description": "비자성 열쇠가 굴러떨어짐",
   "act": 2,
   "rms": -22.19
  },
  "sfx_graphite_float": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_graphite_float.mp3",
   "duration": 1.0,
   "description": "흑연판이 살짝 떠오르는 신비로운 울림",
   "act": 2,
   "rms": -17.11
  },
  "sfx_armor_drag": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_armor_drag.mp3",
   "duration": 1.0,
   "description": "철갑 기사가 끌려가며 갑옷이 긁힘",
   "act": 2,
   "rms": -17.18
  },
  "sfx_armor_copper_tong": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_armor_copper_tong.mp3",
   "duration": 0.4,
   "description": "구리 갑옷이 자석에 반응하지 않는 금속 텅",
   "act": 2,
   "rms": -17.27
  },
  "sfx_knight_step": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_knight_step.mp3",
   "duration": 0.3,
   "description": "철갑 기사의 발소리 한 걸음",
   "act": 2,
   "rms": -17.58
  },
  "sfx_compass_tick": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_compass_tick.mp3",
   "duration": 0.2,
   "description": "나침반 바늘이 돌아가는 작은 틱",
   "act": 2,
   "rms": -17.35
  },
  "sfx_motor_hum": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_motor_hum.mp3",
   "duration": 2.0,
   "description": "전동기가 일정하게 도는 위잉",
   "act": 2,
   "ogg": "assets/audio/sfx_motor_hum.ogg",
   "rms": -17.57,
   "loopSamples": 88200
  },
  "sfx_elevator_stop": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_elevator_stop.mp3",
   "duration": 0.6,
   "description": "승강기가 멈추는 무거운 쿵",
   "act": 2,
   "rms": -19.86
  },
  "sfx_switch_flip": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_switch_flip.mp3",
   "duration": 0.2,
   "description": "스위치가 뒤집히는 딸칵",
   "act": 2,
   "rms": -17.15
  },
  "sfx_statue_voice": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_statue_voice.mp3",
   "duration": 2.0,
   "description": "목소리 없는 석상 스피커 지지직 잡음",
   "act": 2,
   "ogg": "assets/audio/sfx_statue_voice.ogg",
   "rms": -17.77,
   "loopSamples": 88200
  },
  "sfx_electromagnet_on": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_electromagnet_on.mp3",
   "duration": 0.6,
   "description": "전자석 함정이 켜지는 낮은 웅웅거림",
   "act": 2,
   "rms": -17.13
  },
  "sfx_electromagnet_off": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_electromagnet_off.mp3",
   "duration": 0.5,
   "description": "전자석 함정이 꺼지는 하강음",
   "act": 2,
   "rms": -17.17
  },
  "sfx_coil_gate": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_coil_gate.mp3",
   "duration": 1.0,
   "description": "자석이 코일 문을 통과하는 슈우웅",
   "act": 2,
   "rms": -17.33
  },
  "sfx_wireless_beep": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_wireless_beep.mp3",
   "duration": 0.5,
   "description": "수신 코일에 신호가 도착하는 짧은 삐리릭",
   "act": 2,
   "rms": -17.1
  },
  "sfx_beacon_ignite": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_beacon_ignite.mp3",
   "duration": 1.5,
   "description": "봉화가 크게 켜지는 불길",
   "act": 2,
   "rms": -19.09
  },
  "sfx_beacon_fire": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_beacon_fire.mp3",
   "duration": 3.0,
   "description": "일정하게 타는 봉화 장작불",
   "act": 2,
   "ogg": "assets/audio/sfx_beacon_fire.ogg",
   "rms": -22.38,
   "loopSamples": 132300
  },
  "sfx_village_lamp": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_village_lamp.mp3",
   "duration": 0.3,
   "description": "먼 마을 등불이 하나 켜지는 작은 맑은 톡",
   "act": 2,
   "rms": -18.98
  },
  "sfx_golem_magnet_step": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_golem_magnet_step.mp3",
   "duration": 0.6,
   "description": "자석 골렘의 무거운 금속 발소리",
   "act": 2,
   "rms": -19.48
  },
  "sfx_golem_magnet_pull": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_golem_magnet_pull.mp3",
   "duration": 1.5,
   "description": "자석 골렘이 주변 쇠를 끌어당김",
   "act": 2,
   "rms": -17.14
  },
  "amb_tower_hum": {
   "type": "amb",
   "loop": true,
   "mp3": "assets/audio/amb_tower_hum.mp3",
   "duration": 10.0,
   "description": "탑 내부 전기 장치의 아주 작은 지속 웅웅거림",
   "act": 2,
   "ogg": "assets/audio/amb_tower_hum.ogg",
   "rms": -25.98,
   "loopSamples": 441000
  },
  "amb_tower_wind": {
   "type": "amb",
   "loop": true,
   "mp3": "assets/audio/amb_tower_wind.mp3",
   "duration": 10.0,
   "description": "탑 꼭대기에 일정하게 부는 바람",
   "act": 2,
   "ogg": "assets/audio/amb_tower_wind.ogg",
   "rms": -26.07,
   "loopSamples": 441000
  },
  "bgm_abyss_cursed": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_abyss_cursed.mp3",
   "duration": 110.0,
   "description": "탁한 심연, 어긋난 유리 종과 낮은 울림; 타이틀 주제의 그림자 변주",
   "act": 3,
   "ogg": "assets/audio/bgm_abyss_cursed.ogg",
   "rms": -18.9,
   "loopSamples": 4851000
  },
  "bgm_abyss_freed": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_abyss_freed.mp3",
   "duration": 104.0,
   "description": "해방된 심연, 맑은 유리 종·현악과 경쾌한 마법서 선율",
   "act": 3,
   "ogg": "assets/audio/bgm_abyss_freed.ogg",
   "rms": -20.8,
   "loopSamples": 4586400
  },
  "bgm_final_phase1": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_final_phase1.mp3",
   "duration": 80.0,
   "description": "최종전 1단계: 돌의 성 주제와 현악·타악의 긴장",
   "act": 3,
   "ogg": "assets/audio/bgm_final_phase1.ogg",
   "rms": -20.9,
   "loopSamples": 3528000,
   "barSamples": 88200,
   "bars": 40,
   "bpm": 120
  },
  "bgm_final_phase2": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_final_phase2.mp3",
   "duration": 80.0,
   "description": "최종전 2단계: 번개의 탑 주제와 더 거센 금속 리듬",
   "act": 3,
   "ogg": "assets/audio/bgm_final_phase2.ogg",
   "rms": -21.0,
   "loopSamples": 3528000,
   "barSamples": 88200,
   "bars": 40,
   "bpm": 120
  },
  "bgm_final_phase3": {
   "type": "bgm",
   "loop": true,
   "mp3": "assets/audio/bgm_final_phase3.mp3",
   "duration": 80.0,
   "description": "최종전 3단계: 심연·성·탑 주제의 웅장한 전차 추격",
   "act": 3,
   "ogg": "assets/audio/bgm_final_phase3.ogg",
   "rms": -21.0,
   "loopSamples": 3528000,
   "barSamples": 88200,
   "bars": 40,
   "bpm": 120
  },
  "bgm_ending": {
   "type": "bgm",
   "loop": false,
   "mp3": "assets/audio/bgm_ending.mp3",
   "duration": 91.0,
   "description": "열여덟 장이 돌아온 마법서: 완전한 주제와 따뜻한 관현악, 다음 이야기의 여운",
   "act": 3,
   "rms": -21.0
  },
  "sfx_wraith_beam": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_wraith_beam.mp3",
   "duration": 0.8,
   "description": "망령의 날카로운 빛줄기",
   "act": 3,
   "rms": -18.56
  },
  "sfx_film_reflect": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_film_reflect.mp3",
   "duration": 0.5,
   "description": "막 방패가 빛을 맑게 튕김",
   "act": 3,
   "rms": -18.97
  },
  "sfx_dark_fringe_enter": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_dark_fringe_enter.mp3",
   "duration": 0.5,
   "description": "어두운 간섭 줄에서 먹먹해짐",
   "act": 3,
   "rms": -18.6
  },
  "sfx_slit_adjust": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_slit_adjust.mp3",
   "duration": 0.4,
   "description": "두 틈 돌판을 밀어 고정",
   "act": 3,
   "rms": -18.6
  },
  "sfx_rune_reveal": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_rune_reveal.mp3",
   "duration": 1.0,
   "description": "숨은 룬이 드러나는 낮은 종",
   "act": 3,
   "rms": -18.67
  },
  "sfx_torch_add": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_torch_add.mp3",
   "duration": 0.5,
   "description": "횃불을 더 놓는 짧은 불길",
   "act": 3,
   "rms": -20.61
  },
  "sfx_wraith_vanish": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_wraith_vanish.mp3",
   "duration": 0.6,
   "description": "망령이 가볍게 흩어짐",
   "act": 3,
   "rms": -21.23
  },
  "sfx_lens_focus": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_lens_focus.mp3",
   "duration": 2.0,
   "description": "가까워지는 초점의 일정한 열 마찰",
   "act": 3,
   "ogg": "assets/audio/sfx_lens_focus.ogg",
   "rms": -20.26,
   "loopSamples": 88200
  },
  "sfx_lens_burn": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_lens_burn.mp3",
   "duration": 0.6,
   "description": "맞은 초점에서 번지는 불꽃",
   "act": 3,
   "rms": -21.93
  },
  "sfx_water_miss": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_water_miss.mp3",
   "duration": 0.4,
   "description": "빗나간 물체의 물 튀김",
   "act": 3,
   "rms": -19.34
  },
  "sfx_water_hit": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_water_hit.mp3",
   "duration": 0.3,
   "description": "물속의 둔한 타격",
   "act": 3,
   "rms": -20.69
  },
  "sfx_hand_splash": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_hand_splash.mp3",
   "duration": 0.5,
   "description": "웅덩이에 손을 담그는 물 튀김",
   "act": 3,
   "rms": -21.23
  },
  "sfx_image_sharp": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_image_sharp.mp3",
   "duration": 0.4,
   "description": "상이 선명해지는 맑은 종",
   "act": 3,
   "rms": -18.68
  },
  "sfx_engrave": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_engrave.mp3",
   "duration": 1.5,
   "description": "빛으로 수정판에 문양을 새김",
   "act": 3,
   "rms": -18.57
  },
  "sfx_electron_eye_on": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_electron_eye_on.mp3",
   "duration": 0.6,
   "description": "전자의 눈이 켜지며 시야가 좁아짐",
   "act": 3,
   "rms": -20.35
  },
  "sfx_electron_eye_off": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_electron_eye_off.mp3",
   "duration": 0.4,
   "description": "전자의 눈이 꺼지며 시야가 풀림",
   "act": 3,
   "rms": -20.27
  },
  "sfx_bug_swarm": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_bug_swarm.mp3",
   "duration": 3.0,
   "description": "그림자 벌레 떼의 일정한 사각거림",
   "act": 3,
   "ogg": "assets/audio/sfx_bug_swarm.ogg",
   "rms": -20.31,
   "loopSamples": 132300
  },
  "sfx_dot_tick": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_dot_tick.mp3",
   "duration": 0.08,
   "description": "감광판에 점 하나가 찍힘",
   "act": 3,
   "rms": -18.54
  },
  "sfx_bug_defeat": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_bug_defeat.mp3",
   "duration": 0.4,
   "description": "벌레가 부스러져 흩어짐",
   "act": 3,
   "rms": -20.67
  },
  "sfx_electron_fire": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_electron_fire.mp3",
   "duration": 0.1,
   "description": "전자총의 짧은 발사음",
   "act": 3,
   "rms": -18.56
  },
  "sfx_spectro_look": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spectro_look.mp3",
   "duration": 0.6,
   "description": "분광 수정의 유리 울림",
   "act": 3,
   "rms": -18.63
  },
  "sfx_spectrum_hydrogen": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spectrum_hydrogen.mp3",
   "duration": 1.2,
   "description": "수소의 정해진 네 음",
   "act": 3,
   "rms": -19.05
  },
  "sfx_spectrum_sodium": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spectrum_sodium.mp3",
   "duration": 1.2,
   "description": "나트륨의 매우 가까운 두 음",
   "act": 3,
   "rms": -18.67
  },
  "sfx_spectrum_neon": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spectrum_neon.mp3",
   "duration": 1.2,
   "description": "낮은 쪽에 모인 네온의 여러 음",
   "act": 3,
   "rms": -18.7
  },
  "sfx_spectrum_mercury": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spectrum_mercury.mp3",
   "duration": 1.2,
   "description": "수은의 정해진 다섯 음",
   "act": 3,
   "rms": -19.99
  },
  "sfx_identity_reveal": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_identity_reveal.mp3",
   "duration": 0.6,
   "description": "원소 화음이 또렷해짐",
   "act": 3,
   "rms": -18.66
  },
  "sfx_ball_step": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_ball_step.mp3",
   "duration": 0.4,
   "description": "에너지 계단 공의 낙하와 반짝임",
   "act": 3,
   "rms": -18.63
  },
  "sfx_diode_pass": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_diode_pass.mp3",
   "duration": 0.4,
   "description": "순방향 다이오드를 부드럽게 통과",
   "act": 3,
   "rms": -22.04
  },
  "sfx_diode_block": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_diode_block.mp3",
   "duration": 0.3,
   "description": "역방향 다이오드에 금속성으로 막힘",
   "act": 3,
   "rms": -18.64
  },
  "sfx_led_on": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_led_on.mp3",
   "duration": 0.3,
   "description": "LED가 켜지는 짧은 맑은 종",
   "act": 3,
   "rms": -18.64
  },
  "sfx_curse_backflow": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_curse_backflow.mp3",
   "duration": 3.0,
   "description": "저주 마력의 일정한 낮은 역류",
   "act": 3,
   "ogg": "assets/audio/sfx_curse_backflow.ogg",
   "rms": -20.07,
   "loopSamples": 132300
  },
  "sfx_tile_place": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_tile_place.mp3",
   "duration": 0.4,
   "description": "다리 판을 놓는 묵직한 소리",
   "act": 3,
   "rms": -19.49
  },
  "sfx_tester_beep": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_tester_beep.mp3",
   "duration": 0.2,
   "description": "전도 시험기 짧은 전자음",
   "act": 3,
   "rms": -18.55
  },
  "sfx_chariot_launch": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_chariot_launch.mp3",
   "duration": 1.5,
   "description": "전차가 바람을 가르며 멀어짐",
   "act": 3,
   "rms": -21.62
  },
  "sfx_chariot_run": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_chariot_run.mp3",
   "duration": 3.0,
   "description": "전차의 일정한 주행 바람",
   "act": 3,
   "ogg": "assets/audio/sfx_chariot_run.ogg",
   "rms": -20.13,
   "loopSamples": 132300
  },
  "sfx_hourglass_normal": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_hourglass_normal.mp3",
   "duration": 2.0,
   "description": "일정하게 흐르는 모래",
   "act": 3,
   "ogg": "assets/audio/sfx_hourglass_normal.ogg",
   "rms": -20.38,
   "loopSamples": 88200
  },
  "sfx_hourglass_slow": {
   "type": "sfx",
   "loop": true,
   "mp3": "assets/audio/sfx_hourglass_slow.mp3",
   "duration": 2.0,
   "description": "낮고 늘어진 듯한 모래 흐름",
   "act": 3,
   "ogg": "assets/audio/sfx_hourglass_slow.ogg",
   "rms": -20.27,
   "loopSamples": 88200
  },
  "sfx_light_arrow_hit": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_light_arrow_hit.mp3",
   "duration": 0.5,
   "description": "빛 화살의 맑은 폭발",
   "act": 3,
   "rms": -22.71
  },
  "sfx_phase_shift": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_phase_shift.mp3",
   "duration": 2.0,
   "description": "저주 울림이 겹친 뒤 유리처럼 깨짐",
   "act": 3,
   "rms": -23.02
  },
  "sfx_spellbook_complete": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_spellbook_complete.mp3",
   "duration": 3.0,
   "description": "열여덟 장 복원과 큰 관현악 화음",
   "act": 3,
   "rms": -23.35
  },
  "sfx_wizard_cast": {
   "type": "sfx",
   "loop": false,
   "mp3": "assets/audio/sfx_wizard_cast.mp3",
   "duration": 0.8,
   "description": "목소리 없는 뒤틀린 주문음",
   "act": 3,
   "rms": -18.62
  },
  "amb_abyss_drip": {
   "type": "amb",
   "loop": true,
   "mp3": "assets/audio/amb_abyss_drip.mp3",
   "duration": 10.0,
   "description": "동굴의 물방울과 먼 잔향",
   "act": 3,
   "ogg": "assets/audio/amb_abyss_drip.ogg",
   "rms": -30.01,
   "loopSamples": 441000
  },
  "amb_abyss_hum": {
   "type": "amb",
   "loop": true,
   "mp3": "assets/audio/amb_abyss_hum.mp3",
   "duration": 10.0,
   "description": "수정 동굴의 일정한 낮은 공명",
   "act": 3,
   "ogg": "assets/audio/amb_abyss_hum.ogg",
   "rms": -29.98,
   "loopSamples": 441000
  }
 },
 "act3": {
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
   },
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
  "energy_stairs_top_y": [
   230,
   110,
   65,
   43,
   30
  ]
 },
 "packs": {
  "char_ian": [
   {
    "key": "char/ian/idle",
    "path": "assets/char/ian/idle.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/walk",
    "path": "assets/char/ian/walk.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/push",
    "path": "assets/char/ian/push.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/push_ice",
    "path": "assets/char/ian/push_ice.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/throw",
    "path": "assets/char/ian/throw.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/throw_recoil",
    "path": "assets/char/ian/throw_recoil.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/slide_flail",
    "path": "assets/char/ian/slide_flail.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/slide_steady",
    "path": "assets/char/ian/slide_steady.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/grab_ring",
    "path": "assets/char/ian/grab_ring.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/hurt",
    "path": "assets/char/ian/hurt.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/fall",
    "path": "assets/char/ian/fall.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/realize",
    "path": "assets/char/ian/realize.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/attack_light",
    "path": "assets/char/ian/attack_light.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/attack_lightning",
    "path": "assets/char/ian/attack_lightning.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/kick",
    "path": "assets/char/ian/kick.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   },
   {
    "key": "char/ian/rope_hang",
    "path": "assets/char/ian/rope_hang.png",
    "type": "sheet",
    "frameWidth": 390,
    "frameHeight": 240
   }
  ],
  "ui": [
   {
    "key": "portrait/ian/default",
    "path": "assets/portrait/ian/default.png",
    "type": "image"
   },
   {
    "key": "portrait/ian/surprised",
    "path": "assets/portrait/ian/surprised.png",
    "type": "image"
   },
   {
    "key": "portrait/ian/realization",
    "path": "assets/portrait/ian/realization.png",
    "type": "image"
   },
   {
    "key": "portrait/ian/thinking",
    "path": "assets/portrait/ian/thinking.png",
    "type": "image"
   },
   {
    "key": "portrait/garon/embarrassed",
    "path": "assets/portrait/garon/embarrassed.png",
    "type": "image"
   },
   {
    "key": "portrait/garon/sulky",
    "path": "assets/portrait/garon/sulky.png",
    "type": "image"
   },
   {
    "key": "portrait/garon/confident",
    "path": "assets/portrait/garon/confident.png",
    "type": "image"
   },
   {
    "key": "portrait/garon/laugh",
    "path": "assets/portrait/garon/laugh.png",
    "type": "image"
   },
   {
    "key": "portrait/granny/laugh",
    "path": "assets/portrait/granny/laugh.png",
    "type": "image"
   },
   {
    "key": "portrait/granny/thoughtful",
    "path": "assets/portrait/granny/thoughtful.png",
    "type": "image"
   },
   {
    "key": "portrait/granny/warm_smile",
    "path": "assets/portrait/granny/warm_smile.png",
    "type": "image"
   },
   {
    "key": "portrait/granny/worried",
    "path": "assets/portrait/granny/worried.png",
    "type": "image"
   },
   {
    "key": "portrait/wizard/sarcastic",
    "path": "assets/portrait/wizard/sarcastic.png",
    "type": "image"
   },
   {
    "key": "portrait/wizard/angry",
    "path": "assets/portrait/wizard/angry.png",
    "type": "image"
   },
   {
    "key": "portrait/wizard/startled",
    "path": "assets/portrait/wizard/startled.png",
    "type": "image"
   },
   {
    "key": "portrait/wizard/remorseful",
    "path": "assets/portrait/wizard/remorseful.png",
    "type": "image"
   },
   {
    "key": "ui/dialogue_overlay",
    "path": "assets/ui/dialogue/dialogue_overlay.png",
    "type": "image"
   },
   {
    "key": "ui/hud_bar",
    "path": "assets/ui/hud/hud_bar.png",
    "type": "image"
   },
   {
    "key": "ui/icon_health",
    "path": "assets/ui/hud/health_96.png",
    "type": "image"
   },
   {
    "key": "ui/icon_mana",
    "path": "assets/ui/hud/mana_96.png",
    "type": "image"
   },
   {
    "key": "ui/icon_weapon",
    "path": "assets/ui/hud/weapon_96.png",
    "type": "image"
   },
   {
    "key": "ui/unlock_blank",
    "path": "assets/ui/notifications/weapon_unlock_blank.png",
    "type": "image"
   }
  ],
  "char_garon": [
   {
    "key": "char/garon/idle",
    "path": "assets/char/garon/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/walk",
    "path": "assets/char/garon/walk.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/push",
    "path": "assets/char/garon/push.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/shield_charge",
    "path": "assets/char/garon/shield_charge.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/ice_fall",
    "path": "assets/char/garon/ice_fall.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/surprised",
    "path": "assets/char/garon/surprised.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/pant",
    "path": "assets/char/garon/pant.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/ice_push_recoil",
    "path": "assets/char/garon/ice_push_recoil.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/shield_block",
    "path": "assets/char/garon/shield_block.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/hurt",
    "path": "assets/char/garon/hurt.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/rope_hang",
    "path": "assets/char/garon/rope_hang.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/embarrassed",
    "path": "assets/char/garon/embarrassed.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/wall_push",
    "path": "assets/char/garon/wall_push.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/battle_ko",
    "path": "assets/char/garon/battle_ko.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/grab_ring",
    "path": "assets/char/garon/grab_ring.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/slide_steady",
    "path": "assets/char/garon/slide_steady.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/slip",
    "path": "assets/char/garon/slip.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/kick",
    "path": "assets/char/garon/kick.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_granny": [
   {
    "key": "char/granny/idle",
    "path": "assets/char/granny/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/granny/hint",
    "path": "assets/char/granny/hint.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/granny/staff_magic",
    "path": "assets/char/granny/staff_magic.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/granny/nod_laugh",
    "path": "assets/char/granny/nod_laugh.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/granny/walk",
    "path": "assets/char/granny/walk.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/granny/surprise",
    "path": "assets/char/granny/surprise.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_wizard": [
   {
    "key": "char/wizard/idle",
    "path": "assets/char/wizard/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/wizard/cast",
    "path": "assets/char/wizard/cast.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/wizard/hurt",
    "path": "assets/char/wizard/hurt.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/wizard/defeat",
    "path": "assets/char/wizard/defeat.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/wizard/teleport",
    "path": "assets/char/wizard/teleport.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/wizard/book_tear",
    "path": "assets/char/wizard/book_tear.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/wizard/reconcile",
    "path": "assets/char/wizard/reconcile.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_chariot": [
   {
    "key": "char/chariot/vehicle_normal",
    "path": "assets/char/chariot/vehicle_normal.png",
    "type": "image"
   },
   {
    "key": "char/chariot/vehicle_contracted",
    "path": "assets/char/chariot/vehicle_contracted.png",
    "type": "image"
   },
   {
    "key": "char/chariot/ride",
    "path": "assets/char/chariot/ride.png",
    "type": "sheet",
    "frameWidth": 600,
    "frameHeight": 320
   }
  ],
  "char_villager_child": [
   {
    "key": "char/villager_child/idle",
    "path": "assets/char/villager_child/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/villager_child/walk",
    "path": "assets/char/villager_child/walk.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/villager_child/wave",
    "path": "assets/char/villager_child/wave.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/villager_child/throw",
    "path": "assets/char/villager_child/throw.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_villager_merchant": [
   {
    "key": "char/villager_merchant/idle",
    "path": "assets/char/villager_merchant/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/villager_merchant/walk",
    "path": "assets/char/villager_merchant/walk.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/villager_merchant/wave",
    "path": "assets/char/villager_merchant/wave.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/villager_merchant/throw",
    "path": "assets/char/villager_merchant/throw.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_villager_farmer": [
   {
    "key": "char/villager_farmer/idle",
    "path": "assets/char/villager_farmer/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/villager_farmer/walk",
    "path": "assets/char/villager_farmer/walk.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/villager_farmer/wave",
    "path": "assets/char/villager_farmer/wave.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/villager_farmer/throw",
    "path": "assets/char/villager_farmer/throw.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_villager_fisher": [
   {
    "key": "char/villager_fisher/idle",
    "path": "assets/char/villager_fisher/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/villager_fisher/walk",
    "path": "assets/char/villager_fisher/walk.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/villager_fisher/wave",
    "path": "assets/char/villager_fisher/wave.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/villager_fisher/throw",
    "path": "assets/char/villager_fisher/throw.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_stone_golem": [
   {
    "key": "char/stone_golem/idle",
    "path": "assets/char/stone_golem/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/stone_golem/walk",
    "path": "assets/char/stone_golem/walk.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/stone_golem/punch",
    "path": "assets/char/stone_golem/punch.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/stone_golem/hit",
    "path": "assets/char/stone_golem/hit.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/stone_golem/launch",
    "path": "assets/char/stone_golem/launch.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/stone_golem/crumble",
    "path": "assets/char/stone_golem/crumble.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_inertia_golem": [
   {
    "key": "char/inertia_golem/idle",
    "path": "assets/char/inertia_golem/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/inertia_golem/charge",
    "path": "assets/char/inertia_golem/charge.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/inertia_golem/struggle",
    "path": "assets/char/inertia_golem/struggle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/inertia_golem/fall",
    "path": "assets/char/inertia_golem/fall.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_ice_troll": [
   {
    "key": "char/ice_troll/idle",
    "path": "assets/char/ice_troll/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/ice_troll/push",
    "path": "assets/char/ice_troll/push.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/ice_troll/recoil",
    "path": "assets/char/ice_troll/recoil.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/ice_troll/hit",
    "path": "assets/char/ice_troll/hit.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/ice_troll/defeat",
    "path": "assets/char/ice_troll/defeat.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_ice_spirit": [
   {
    "key": "char/ice_spirit/hover",
    "path": "assets/char/ice_spirit/hover.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/ice_spirit/attack",
    "path": "assets/char/ice_spirit/attack.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/ice_spirit/deflect",
    "path": "assets/char/ice_spirit/deflect.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/ice_spirit/melt",
    "path": "assets/char/ice_spirit/melt.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_merchant": [
   {
    "key": "char/merchant/idle",
    "path": "assets/char/merchant/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/merchant/boast",
    "path": "assets/char/merchant/boast.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/merchant/summon",
    "path": "assets/char/merchant/summon.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/merchant/panic",
    "path": "assets/char/merchant/panic.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_steam_golem": [
   {
    "key": "char/steam_golem/idle",
    "path": "assets/char/steam_golem/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/steam_golem/work",
    "path": "assets/char/steam_golem/work.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/steam_golem/fuel_stop",
    "path": "assets/char/steam_golem/fuel_stop.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_wheel": [
   {
    "key": "char/wheel/stand",
    "path": "assets/char/wheel/stand.png",
    "type": "image"
   },
   {
    "key": "char/wheel/rotor",
    "path": "assets/char/wheel/rotor.png",
    "type": "image"
   }
  ],
  "char_ian_act2": [
   {
    "key": "char/ian/charge_rub",
    "path": "assets/act2/char/ian/charge_rub.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/ian/magnet_pull",
    "path": "assets/act2/char/ian/magnet_pull.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/ian/box_charge_release",
    "path": "assets/act2/char/ian/box_charge_release.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_spark_fairy_positive": [
   {
    "key": "char/spark_fairy_positive/float",
    "path": "assets/act2/char/spark_fairy_positive/float.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/spark_fairy_positive/pushed",
    "path": "assets/act2/char/spark_fairy_positive/pushed.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/spark_fairy_positive/pulled",
    "path": "assets/act2/char/spark_fairy_positive/pulled.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/spark_fairy_positive/attack",
    "path": "assets/act2/char/spark_fairy_positive/attack.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/spark_fairy_positive/vanish",
    "path": "assets/act2/char/spark_fairy_positive/vanish.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_spark_fairy_negative": [
   {
    "key": "char/spark_fairy_negative/float",
    "path": "assets/act2/char/spark_fairy_negative/float.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/spark_fairy_negative/pushed",
    "path": "assets/act2/char/spark_fairy_negative/pushed.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/spark_fairy_negative/pulled",
    "path": "assets/act2/char/spark_fairy_negative/pulled.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/spark_fairy_negative/attack",
    "path": "assets/act2/char/spark_fairy_negative/attack.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/spark_fairy_negative/vanish",
    "path": "assets/act2/char/spark_fairy_negative/vanish.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_silent_statue": [
   {
    "key": "char/silent_statue/silent",
    "path": "assets/act2/char/silent_statue/silent.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/silent_statue/speaker_on",
    "path": "assets/act2/char/silent_statue/speaker_on.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/silent_statue/talk",
    "path": "assets/act2/char/silent_statue/talk.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "ui_act2": [
   {
    "key": "portrait/silent_statue/silent",
    "path": "assets/act2/portrait/silent_statue/silent.png",
    "type": "image"
   },
   {
    "key": "portrait/silent_statue/talk",
    "path": "assets/act2/portrait/silent_statue/talk.png",
    "type": "image"
   },
   {
    "key": "ui2/circuit_ui_series",
    "path": "assets/act2/ui/circuit_ui_series.png",
    "type": "image"
   },
   {
    "key": "ui2/circuit_ui_parallel",
    "path": "assets/act2/ui/circuit_ui_parallel.png",
    "type": "image"
   },
   {
    "key": "ui2/current_dot",
    "path": "assets/act2/ui/current_dot.png",
    "type": "image"
   },
   {
    "key": "ui2/part_icon_mana_stone",
    "path": "assets/act2/ui/part_icon_mana_stone.png",
    "type": "image"
   },
   {
    "key": "ui2/part_icon_resistor_crystal",
    "path": "assets/act2/ui/part_icon_resistor_crystal.png",
    "type": "image"
   },
   {
    "key": "ui2/part_icon_lamp",
    "path": "assets/act2/ui/part_icon_lamp.png",
    "type": "image"
   },
   {
    "key": "ui2/part_icon_wire",
    "path": "assets/act2/ui/part_icon_wire.png",
    "type": "image"
   },
   {
    "key": "ui2/part_icon_switch_off",
    "path": "assets/act2/ui/part_icon_switch_off.png",
    "type": "image"
   },
   {
    "key": "ui2/part_icon_switch_on",
    "path": "assets/act2/ui/part_icon_switch_on.png",
    "type": "image"
   },
   {
    "key": "ui2/part_icon_lightning_box",
    "path": "assets/act2/ui/part_icon_lightning_box.png",
    "type": "image"
   },
   {
    "key": "ui2/part_icon_coil",
    "path": "assets/act2/ui/part_icon_coil.png",
    "type": "image"
   },
   {
    "key": "ui2/part_icon_bar_magnet",
    "path": "assets/act2/ui/part_icon_bar_magnet.png",
    "type": "image"
   },
   {
    "key": "ui2/ammeter",
    "path": "assets/act2/ui/ammeter.png",
    "type": "image"
   },
   {
    "key": "ui2/ammeter_needle",
    "path": "assets/act2/ui/ammeter_needle.png",
    "type": "image"
   },
   {
    "key": "ui2/wattmeter",
    "path": "assets/act2/ui/wattmeter.png",
    "type": "image"
   },
   {
    "key": "ui2/wattmeter_needle",
    "path": "assets/act2/ui/wattmeter_needle.png",
    "type": "image"
   },
   {
    "key": "ui2/result_board",
    "path": "assets/act2/ui/result_board.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_01_locked",
    "path": "assets/act2/ui/tower_floor_01_locked.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_01_open",
    "path": "assets/act2/ui/tower_floor_01_open.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_01_cleared",
    "path": "assets/act2/ui/tower_floor_01_cleared.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_02_locked",
    "path": "assets/act2/ui/tower_floor_02_locked.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_02_open",
    "path": "assets/act2/ui/tower_floor_02_open.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_02_cleared",
    "path": "assets/act2/ui/tower_floor_02_cleared.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_03_locked",
    "path": "assets/act2/ui/tower_floor_03_locked.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_03_open",
    "path": "assets/act2/ui/tower_floor_03_open.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_03_cleared",
    "path": "assets/act2/ui/tower_floor_03_cleared.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_04_locked",
    "path": "assets/act2/ui/tower_floor_04_locked.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_04_open",
    "path": "assets/act2/ui/tower_floor_04_open.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_04_cleared",
    "path": "assets/act2/ui/tower_floor_04_cleared.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_05_locked",
    "path": "assets/act2/ui/tower_floor_05_locked.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_05_open",
    "path": "assets/act2/ui/tower_floor_05_open.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_05_cleared",
    "path": "assets/act2/ui/tower_floor_05_cleared.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_06_locked",
    "path": "assets/act2/ui/tower_floor_06_locked.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_06_open",
    "path": "assets/act2/ui/tower_floor_06_open.png",
    "type": "image"
   },
   {
    "key": "ui2/tower_floor_06_cleared",
    "path": "assets/act2/ui/tower_floor_06_cleared.png",
    "type": "image"
   },
   {
    "key": "ui2/part_icon_battery",
    "path": "assets/act2/ui/part_icon_battery.png",
    "type": "image"
   }
  ],
  "char_iron_knight": [
   {
    "key": "char/iron_knight/idle",
    "path": "assets/act2/char/iron_knight/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/iron_knight/walk",
    "path": "assets/act2/char/iron_knight/walk.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/iron_knight/attack",
    "path": "assets/act2/char/iron_knight/attack.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/iron_knight/hurt",
    "path": "assets/act2/char/iron_knight/hurt.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/iron_knight/defeat",
    "path": "assets/act2/char/iron_knight/defeat.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/iron_knight/magnet_dragged",
    "path": "assets/act2/char/iron_knight/magnet_dragged.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/iron_knight/disarmed",
    "path": "assets/act2/char/iron_knight/disarmed.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_copper_soldier": [
   {
    "key": "char/copper_soldier/idle",
    "path": "assets/act2/char/copper_soldier/idle.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/copper_soldier/walk",
    "path": "assets/act2/char/copper_soldier/walk.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/copper_soldier/attack",
    "path": "assets/act2/char/copper_soldier/attack.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/copper_soldier/hurt",
    "path": "assets/act2/char/copper_soldier/hurt.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/copper_soldier/defeat",
    "path": "assets/act2/char/copper_soldier/defeat.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/copper_soldier/magnet_resist",
    "path": "assets/act2/char/copper_soldier/magnet_resist.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_magnet_golem": [
   {
    "key": "char/magnet_golem/idle",
    "path": "assets/act2/char/magnet_golem/idle.png",
    "type": "sheet",
    "frameWidth": 454,
    "frameHeight": 363
   },
   {
    "key": "char/magnet_golem/walk",
    "path": "assets/act2/char/magnet_golem/walk.png",
    "type": "sheet",
    "frameWidth": 454,
    "frameHeight": 363
   },
   {
    "key": "char/magnet_golem/attack",
    "path": "assets/act2/char/magnet_golem/attack.png",
    "type": "sheet",
    "frameWidth": 454,
    "frameHeight": 363
   },
   {
    "key": "char/magnet_golem/magnet_pull",
    "path": "assets/act2/char/magnet_golem/magnet_pull.png",
    "type": "sheet",
    "frameWidth": 454,
    "frameHeight": 363
   },
   {
    "key": "char/magnet_golem/hurt",
    "path": "assets/act2/char/magnet_golem/hurt.png",
    "type": "sheet",
    "frameWidth": 454,
    "frameHeight": 363
   },
   {
    "key": "char/magnet_golem/slowing",
    "path": "assets/act2/char/magnet_golem/slowing.png",
    "type": "sheet",
    "frameWidth": 454,
    "frameHeight": 363
   },
   {
    "key": "char/magnet_golem/defeat",
    "path": "assets/act2/char/magnet_golem/defeat.png",
    "type": "sheet",
    "frameWidth": 454,
    "frameHeight": 363
   }
  ],
  "char_ian_act3": [
   {
    "key": "char/ian/hold_front",
    "path": "assets/act3/char/ian/hold_front.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/ian/hold_eye",
    "path": "assets/act3/char/ian/hold_eye.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/ian/reach_down",
    "path": "assets/act3/char/ian/reach_down.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_garon_act3": [
   {
    "key": "char/garon/reach_down",
    "path": "assets/act3/char/garon/reach_down.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/carry_torch",
    "path": "assets/act3/char/garon/carry_torch.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/garon/torch_flame",
    "path": "assets/act3/char/garon/garon_torch_flame.png",
    "type": "image"
   }
  ],
  "char_light_wraith": [
   {
    "key": "char/light_wraith/float",
    "path": "assets/act3/char/light_wraith/float.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/light_wraith/attack",
    "path": "assets/act3/char/light_wraith/attack.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/light_wraith/hurt",
    "path": "assets/act3/char/light_wraith/hurt.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/light_wraith/vanish",
    "path": "assets/act3/char/light_wraith/vanish.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_crystal_fish": [
   {
    "key": "char/crystal_fish/swim",
    "path": "assets/act3/char/crystal_fish/swim.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/crystal_fish/hurt",
    "path": "assets/act3/char/crystal_fish/hurt.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/crystal_fish/defeat",
    "path": "assets/act3/char/crystal_fish/defeat.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_shadow_bug": [
   {
    "key": "char/shadow_bug/crawl",
    "path": "assets/act3/char/shadow_bug/crawl.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/shadow_bug/attack",
    "path": "assets/act3/char/shadow_bug/attack.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/shadow_bug/defeat",
    "path": "assets/act3/char/shadow_bug/defeat.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   }
  ],
  "char_elemental_hydrogen": [
   {
    "key": "char/elemental_hydrogen/float",
    "path": "assets/act3/char/elemental_hydrogen/float.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_hydrogen/attack",
    "path": "assets/act3/char/elemental_hydrogen/attack.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_hydrogen/hurt",
    "path": "assets/act3/char/elemental_hydrogen/hurt.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_hydrogen/vanish",
    "path": "assets/act3/char/elemental_hydrogen/vanish.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_hydrogen/glow",
    "path": "assets/act3/char/elemental_hydrogen/elemental_hydrogen_glow.png",
    "type": "image"
   }
  ],
  "char_elemental_sodium": [
   {
    "key": "char/elemental_sodium/float",
    "path": "assets/act3/char/elemental_sodium/float.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_sodium/attack",
    "path": "assets/act3/char/elemental_sodium/attack.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_sodium/hurt",
    "path": "assets/act3/char/elemental_sodium/hurt.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_sodium/vanish",
    "path": "assets/act3/char/elemental_sodium/vanish.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_sodium/glow",
    "path": "assets/act3/char/elemental_sodium/elemental_sodium_glow.png",
    "type": "image"
   }
  ],
  "char_elemental_neon": [
   {
    "key": "char/elemental_neon/float",
    "path": "assets/act3/char/elemental_neon/float.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_neon/attack",
    "path": "assets/act3/char/elemental_neon/attack.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_neon/hurt",
    "path": "assets/act3/char/elemental_neon/hurt.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_neon/vanish",
    "path": "assets/act3/char/elemental_neon/vanish.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_neon/glow",
    "path": "assets/act3/char/elemental_neon/elemental_neon_glow.png",
    "type": "image"
   }
  ],
  "char_elemental_mercury": [
   {
    "key": "char/elemental_mercury/float",
    "path": "assets/act3/char/elemental_mercury/float.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_mercury/attack",
    "path": "assets/act3/char/elemental_mercury/attack.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_mercury/hurt",
    "path": "assets/act3/char/elemental_mercury/hurt.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_mercury/vanish",
    "path": "assets/act3/char/elemental_mercury/vanish.png",
    "type": "sheet",
    "frameWidth": 400,
    "frameHeight": 320
   },
   {
    "key": "char/elemental_mercury/glow",
    "path": "assets/act3/char/elemental_mercury/elemental_mercury_glow.png",
    "type": "image"
   }
  ],
  "bg_00_village_entrance": [
   {
    "key": "bg/00_village_entrance",
    "path": "assets/bg/00_village_entrance.png",
    "type": "image"
   }
  ],
  "bg_01_castle_lever": [
   {
    "key": "bg/01_castle_lever",
    "path": "assets/bg/01_castle_lever.png",
    "type": "image"
   },
   {
    "key": "ruler/01_castle_lever",
    "path": "assets/bg/ruler/01_seesaw_1m_ticks.png",
    "type": "image"
   }
  ],
  "bg_02_ice_corridor": [
   {
    "key": "bg/02_ice_corridor",
    "path": "assets/bg/02_ice_corridor.png",
    "type": "image"
   },
   {
    "key": "ruler/02_ice_corridor",
    "path": "assets/bg/ruler/02_corridor_5m_markers.png",
    "type": "image"
   }
  ],
  "bg_03_collapsing_bridge": [
   {
    "key": "bg/03_collapsing_bridge",
    "path": "assets/bg/03_collapsing_bridge.png",
    "type": "image"
   },
   {
    "key": "ruler/03_collapsing_bridge",
    "path": "assets/bg/ruler/03_bridge_10m_endpoints.png",
    "type": "image"
   }
  ],
  "bg_04_sled_path": [
   {
    "key": "bg/04_sled_path",
    "path": "assets/bg/04_sled_path.png",
    "type": "image"
   }
  ],
  "bg_05_ice_lake": [
   {
    "key": "bg/05_ice_lake",
    "path": "assets/bg/05_ice_lake.png",
    "type": "image"
   }
  ],
  "bg_06_minecart_tower": [
   {
    "key": "bg/06_minecart_tower",
    "path": "assets/bg/06_minecart_tower.png",
    "type": "image"
   },
   {
    "key": "ruler/06_minecart_tower",
    "path": "assets/bg/ruler/06_minecart_height_ruler.png",
    "type": "image"
   }
  ],
  "bg_07_rough_stone": [
   {
    "key": "bg/07_rough_stone",
    "path": "assets/bg/07_rough_stone.png",
    "type": "image"
   }
  ],
  "bg_08_merchant_plaza": [
   {
    "key": "bg/08_merchant_plaza",
    "path": "assets/bg/08_merchant_plaza.png",
    "type": "image"
   }
  ],
  "common": [
   {
    "key": "truth_circle",
    "path": "assets/bg/truth_circle.png",
    "type": "image"
   }
  ],
  "bg_tower_f1": [
   {
    "key": "bg/tower_f1",
    "path": "assets/act2/bg/tower_f1.png",
    "type": "image"
   }
  ],
  "bg_tower_f2": [
   {
    "key": "bg/tower_f2",
    "path": "assets/act2/bg/tower_f2.png",
    "type": "image"
   }
  ],
  "bg_tower_f3": [
   {
    "key": "bg/tower_f3",
    "path": "assets/act2/bg/tower_f3.png",
    "type": "image"
   }
  ],
  "bg_tower_f4": [
   {
    "key": "bg/tower_f4",
    "path": "assets/act2/bg/tower_f4.png",
    "type": "image"
   }
  ],
  "bg_tower_f5": [
   {
    "key": "bg/tower_f5",
    "path": "assets/act2/bg/tower_f5.png",
    "type": "image"
   }
  ],
  "bg_tower_top": [
   {
    "key": "bg/tower_top",
    "path": "assets/act2/bg/tower_top.png",
    "type": "image"
   }
  ],
  "bg_abyss_1": [
   {
    "key": "bg/abyss_1",
    "path": "assets/act3/bg/abyss_1.png",
    "type": "image"
   }
  ],
  "bg_abyss_2": [
   {
    "key": "bg/abyss_2",
    "path": "assets/act3/bg/abyss_2.png",
    "type": "image"
   }
  ],
  "bg_abyss_3": [
   {
    "key": "bg/abyss_3",
    "path": "assets/act3/bg/abyss_3.png",
    "type": "image"
   }
  ],
  "bg_abyss_4": [
   {
    "key": "bg/abyss_4",
    "path": "assets/act3/bg/abyss_4.png",
    "type": "image"
   }
  ],
  "bg_abyss_5": [
   {
    "key": "bg/abyss_5",
    "path": "assets/act3/bg/abyss_5.png",
    "type": "image"
   }
  ],
  "bg_abyss_end": [
   {
    "key": "bg/abyss_end",
    "path": "assets/act3/bg/abyss_end.png",
    "type": "image"
   }
  ],
  "bg_abyss_chase": [
   {
    "key": "bg/abyss_chase",
    "path": "assets/act3/bg/abyss_chase.png",
    "type": "image"
   }
  ],
  "obj_1-1": [
   {
    "key": "obj/seesaw_plank",
    "path": "assets/obj/1-1/seesaw_plank.png",
    "type": "image"
   },
   {
    "key": "obj/seesaw_fulcrum",
    "path": "assets/obj/1-1/seesaw_fulcrum.png",
    "type": "image"
   },
   {
    "key": "obj/castle_gate",
    "path": "assets/obj/1-1/castle_gate.png",
    "type": "image"
   },
   {
    "key": "obj/tower_block",
    "path": "assets/obj/1-1/tower_block.png",
    "type": "image"
   },
   {
    "key": "obj/corridor_door",
    "path": "assets/obj/extra/corridor_door.png",
    "type": "image"
   },
   {
    "key": "obj/stone_box_20kg",
    "path": "assets/obj/extra/stone_box_20kg.png",
    "type": "image"
   },
   {
    "key": "obj/stone_box_60kg",
    "path": "assets/obj/extra/stone_box_60kg.png",
    "type": "image"
   }
  ],
  "obj_1-2": [
   {
    "key": "obj/stone_cart",
    "path": "assets/obj/1-2/stone_cart.png",
    "type": "image"
   },
   {
    "key": "obj/wall_ring",
    "path": "assets/obj/1-2/wall_ring.png",
    "type": "image"
   },
   {
    "key": "obj/bridge_segment",
    "path": "assets/obj/1-2/bridge_segment.png",
    "type": "image"
   },
   {
    "key": "obj/bridge_segment_crack_01",
    "path": "assets/obj/1-2/bridge_segment_crack_01.png",
    "type": "image"
   },
   {
    "key": "obj/bridge_segment_crack_02",
    "path": "assets/obj/1-2/bridge_segment_crack_02.png",
    "type": "image"
   },
   {
    "key": "obj/pressure_plate",
    "path": "assets/obj/1-2/pressure_plate.png",
    "type": "image"
   },
   {
    "key": "obj/pit_opening",
    "path": "assets/obj/1-2/pit_opening.png",
    "type": "image"
   },
   {
    "key": "obj/narrow_beam",
    "path": "assets/obj/1-2/narrow_beam.png",
    "type": "image"
   },
   {
    "key": "obj/bridge_phase_marker",
    "path": "assets/obj/1-2/bridge_phase_marker.png",
    "type": "image"
   },
   {
    "key": "obj/stone_10kg",
    "path": "assets/obj/1-2/stone_10kg.png",
    "type": "image"
   },
   {
    "key": "obj/stone_15kg",
    "path": "assets/obj/1-2/stone_15kg.png",
    "type": "image"
   },
   {
    "key": "obj/stone_20kg",
    "path": "assets/obj/1-2/stone_20kg.png",
    "type": "image"
   },
   {
    "key": "obj/stone_40kg",
    "path": "assets/obj/1-2/stone_40kg.png",
    "type": "image"
   },
   {
    "key": "obj/stone_160kg",
    "path": "assets/obj/1-2/stone_160kg.png",
    "type": "image"
   },
   {
    "key": "obj/stone_10kg_label",
    "path": "assets/obj/1-2/stone_10kg_label.png",
    "type": "image"
   },
   {
    "key": "obj/stone_15kg_label",
    "path": "assets/obj/1-2/stone_15kg_label.png",
    "type": "image"
   },
   {
    "key": "obj/stone_20kg_label",
    "path": "assets/obj/1-2/stone_20kg_label.png",
    "type": "image"
   },
   {
    "key": "obj/stone_40kg_label",
    "path": "assets/obj/1-2/stone_40kg_label.png",
    "type": "image"
   },
   {
    "key": "obj/stone_160kg_label",
    "path": "assets/obj/1-2/stone_160kg_label.png",
    "type": "image"
   },
   {
    "key": "obj/start_stone_floor",
    "path": "assets/obj/extra/start_stone_floor.png",
    "type": "image"
   },
   {
    "key": "obj/curse_seal",
    "path": "assets/obj/extra/curse_seal.png",
    "type": "image"
   },
   {
    "key": "obj/pit_with_golem",
    "path": "assets/obj/extra/pit_with_golem.png",
    "type": "image"
   },
   {
    "key": "obj/warning_stele",
    "path": "assets/obj/extra/warning_stele.png",
    "type": "image"
   }
  ],
  "obj_1-2_sled": [
   {
    "key": "obj/sled",
    "path": "assets/obj/1-2_sled/sled.png",
    "type": "image"
   },
   {
    "key": "obj/stop_line",
    "path": "assets/obj/1-2_sled/stop_line.png",
    "type": "image"
   },
   {
    "key": "obj/speed_sign",
    "path": "assets/obj/1-2_sled/speed_sign.png",
    "type": "image"
   },
   {
    "key": "obj/speed_sign_2ms_overlay",
    "path": "assets/obj/1-2_sled/speed_sign_2ms_overlay.png",
    "type": "image"
   },
   {
    "key": "obj/brake_line",
    "path": "assets/obj/extra/brake_line.png",
    "type": "image"
   }
  ],
  "obj_1-3": [
   {
    "key": "obj/herb_basket",
    "path": "assets/obj/1-3/herb_basket.png",
    "type": "image"
   },
   {
    "key": "obj/rope_coil",
    "path": "assets/obj/1-3/rope_coil.png",
    "type": "image"
   },
   {
    "key": "obj/merchant_parcel",
    "path": "assets/obj/1-3/merchant_parcel.png",
    "type": "image"
   },
   {
    "key": "obj/child_pouch",
    "path": "assets/obj/1-3/child_pouch.png",
    "type": "image"
   },
   {
    "key": "obj/lake_shore_left",
    "path": "assets/obj/extra/lake_shore_left.png",
    "type": "image"
   },
   {
    "key": "obj/lake_shore_right",
    "path": "assets/obj/extra/lake_shore_right.png",
    "type": "image"
   },
   {
    "key": "obj/ice_gate",
    "path": "assets/obj/extra/ice_gate.png",
    "type": "image"
   },
   {
    "key": "obj/ice_gate_broken",
    "path": "assets/obj/extra/ice_gate_broken.png",
    "type": "image"
   },
   {
    "key": "obj/frozen_rowboat",
    "path": "assets/obj/extra/frozen_rowboat.png",
    "type": "image"
   }
  ],
  "obj_1-4": [
   {
    "key": "obj/minecart",
    "path": "assets/obj/1-4/minecart.png",
    "type": "image"
   },
   {
    "key": "obj/spring_bumper",
    "path": "assets/obj/1-4/spring_bumper.png",
    "type": "image"
   },
   {
    "key": "obj/rail_segment",
    "path": "assets/obj/1-4/rail_segment.png",
    "type": "image"
   },
   {
    "key": "obj/rail_path",
    "path": "assets/obj/1-4/rail_path_1920x1080.png",
    "type": "image"
   }
  ],
  "obj_future_jump": [
   {
    "key": "obj/spring_plate",
    "path": "assets/obj/future_jump/spring_plate.png",
    "type": "image"
   }
  ],
  "obj_1-5": [
   {
    "key": "obj/melting_ice_hole_01",
    "path": "assets/obj/1-5/melting_ice_hole_01.png",
    "type": "image"
   },
   {
    "key": "obj/melting_ice_hole_02",
    "path": "assets/obj/1-5/melting_ice_hole_02.png",
    "type": "image"
   },
   {
    "key": "obj/melting_ice_hole_03",
    "path": "assets/obj/1-5/melting_ice_hole_03.png",
    "type": "image"
   },
   {
    "key": "obj/melting_ice_hole_04",
    "path": "assets/obj/1-5/melting_ice_hole_04.png",
    "type": "image"
   },
   {
    "key": "obj/frozen_puddle",
    "path": "assets/obj/extra/frozen_puddle.png",
    "type": "image"
   },
   {
    "key": "obj/frozen_key",
    "path": "assets/obj/extra/frozen_key.png",
    "type": "image"
   }
  ],
  "obj_1-6": [
   {
    "key": "obj/merchant_display",
    "path": "assets/obj/1-6/merchant_display.png",
    "type": "image"
   }
  ],
  "obj_2-1": [
   {
    "key": "obj/amber_rod/default",
    "path": "assets/act2/obj/2-1/amber_rod.png",
    "type": "image"
   },
   {
    "key": "obj/amber_rod_icon/default",
    "path": "assets/act2/obj/2-1/amber_rod_icon.png",
    "type": "image"
   },
   {
    "key": "obj/fur/default",
    "path": "assets/act2/obj/2-1/fur.png",
    "type": "image"
   },
   {
    "key": "obj/fur_icon/default",
    "path": "assets/act2/obj/2-1/fur_icon.png",
    "type": "image"
   },
   {
    "key": "obj/feather/normal",
    "path": "assets/act2/obj/2-1/feather_normal.png",
    "type": "image"
   },
   {
    "key": "obj/feather/charged",
    "path": "assets/act2/obj/2-1/feather_charged.png",
    "type": "image"
   },
   {
    "key": "obj/charged_stone/neutral",
    "path": "assets/act2/obj/2-1/charged_stone_neutral.png",
    "type": "image"
   },
   {
    "key": "obj/charged_stone/plus",
    "path": "assets/act2/obj/2-1/charged_stone_plus.png",
    "type": "image"
   },
   {
    "key": "obj/charged_stone/minus",
    "path": "assets/act2/obj/2-1/charged_stone_minus.png",
    "type": "image"
   },
   {
    "key": "obj/spark_small/01",
    "path": "assets/act2/obj/2-1/spark_small_01.png",
    "type": "image"
   },
   {
    "key": "obj/spark_small/02",
    "path": "assets/act2/obj/2-1/spark_small_02.png",
    "type": "image"
   },
   {
    "key": "obj/spark_small/03",
    "path": "assets/act2/obj/2-1/spark_small_03.png",
    "type": "image"
   },
   {
    "key": "obj/spark_small/04",
    "path": "assets/act2/obj/2-1/spark_small_04.png",
    "type": "image"
   },
   {
    "key": "obj/vacuum_tube/default",
    "path": "assets/act2/obj/2-1/vacuum_tube.png",
    "type": "image"
   },
   {
    "key": "obj/metal_plate/neutral",
    "path": "assets/act2/obj/2-1/metal_plate_neutral.png",
    "type": "image"
   },
   {
    "key": "obj/metal_plate/plus",
    "path": "assets/act2/obj/2-1/metal_plate_plus.png",
    "type": "image"
   },
   {
    "key": "obj/metal_plate/minus",
    "path": "assets/act2/obj/2-1/metal_plate_minus.png",
    "type": "image"
   },
   {
    "key": "obj/metal_plate_glow/plus",
    "path": "assets/act2/obj/2-1/metal_plate_glow_plus.png",
    "type": "image"
   },
   {
    "key": "obj/metal_plate_glow/minus",
    "path": "assets/act2/obj/2-1/metal_plate_glow_minus.png",
    "type": "image"
   },
   {
    "key": "obj/feather_stand",
    "path": "assets/act2/obj/extra/feather_stand.png",
    "type": "image"
   }
  ],
  "obj_2-2": [
   {
    "key": "obj/circuit_board/series",
    "path": "assets/act2/obj/2-2/circuit_board_series.png",
    "type": "image"
   },
   {
    "key": "obj/circuit_board/parallel",
    "path": "assets/act2/obj/2-2/circuit_board_parallel.png",
    "type": "image"
   },
   {
    "key": "obj/lamp/off",
    "path": "assets/act2/obj/2-2/lamp_off.png",
    "type": "image"
   },
   {
    "key": "obj/lamp/dim",
    "path": "assets/act2/obj/2-2/lamp_dim.png",
    "type": "image"
   },
   {
    "key": "obj/lamp/normal",
    "path": "assets/act2/obj/2-2/lamp_normal.png",
    "type": "image"
   },
   {
    "key": "obj/lamp/bright",
    "path": "assets/act2/obj/2-2/lamp_bright.png",
    "type": "image"
   },
   {
    "key": "obj/lamp_glow/off",
    "path": "assets/act2/obj/2-2/lamp_glow_off.png",
    "type": "image"
   },
   {
    "key": "obj/lamp_glow/dim",
    "path": "assets/act2/obj/2-2/lamp_glow_dim.png",
    "type": "image"
   },
   {
    "key": "obj/lamp_glow/normal",
    "path": "assets/act2/obj/2-2/lamp_glow_normal.png",
    "type": "image"
   },
   {
    "key": "obj/lamp_glow/bright",
    "path": "assets/act2/obj/2-2/lamp_glow_bright.png",
    "type": "image"
   },
   {
    "key": "obj/mana_stone/default",
    "path": "assets/act2/obj/2-2/mana_stone.png",
    "type": "image"
   },
   {
    "key": "obj/resistor_crystal/default",
    "path": "assets/act2/obj/2-2/resistor_crystal.png",
    "type": "image"
   },
   {
    "key": "obj/wire_straight/normal",
    "path": "assets/act2/obj/2-2/wire_straight_normal.png",
    "type": "image"
   },
   {
    "key": "obj/wire_straight/hot",
    "path": "assets/act2/obj/2-2/wire_straight_hot.png",
    "type": "image"
   },
   {
    "key": "obj/wire_straight/broken",
    "path": "assets/act2/obj/2-2/wire_straight_broken.png",
    "type": "image"
   },
   {
    "key": "obj/wire_corner/normal",
    "path": "assets/act2/obj/2-2/wire_corner_normal.png",
    "type": "image"
   },
   {
    "key": "obj/wire_corner/hot",
    "path": "assets/act2/obj/2-2/wire_corner_hot.png",
    "type": "image"
   },
   {
    "key": "obj/wire_corner/broken",
    "path": "assets/act2/obj/2-2/wire_corner_broken.png",
    "type": "image"
   },
   {
    "key": "obj/wire_branch/normal",
    "path": "assets/act2/obj/2-2/wire_branch_normal.png",
    "type": "image"
   },
   {
    "key": "obj/wire_branch/hot",
    "path": "assets/act2/obj/2-2/wire_branch_hot.png",
    "type": "image"
   },
   {
    "key": "obj/wire_branch/broken",
    "path": "assets/act2/obj/2-2/wire_branch_broken.png",
    "type": "image"
   },
   {
    "key": "obj/stairs_f2/01",
    "path": "assets/act2/obj/2-2/stairs_f2_01.png",
    "type": "image"
   },
   {
    "key": "obj/stairs_f2/02",
    "path": "assets/act2/obj/2-2/stairs_f2_02.png",
    "type": "image"
   },
   {
    "key": "obj/stairs_f2/03",
    "path": "assets/act2/obj/2-2/stairs_f2_03.png",
    "type": "image"
   },
   {
    "key": "obj/stairs_f2/04",
    "path": "assets/act2/obj/2-2/stairs_f2_04.png",
    "type": "image"
   }
  ],
  "obj_2-3": [
   {
    "key": "obj/lightning_box/small_close",
    "path": "assets/act2/obj/2-3/lightning_box_small_close.png",
    "type": "image"
   },
   {
    "key": "obj/lightning_box/small_wide",
    "path": "assets/act2/obj/2-3/lightning_box_small_wide.png",
    "type": "image"
   },
   {
    "key": "obj/lightning_box/large_close",
    "path": "assets/act2/obj/2-3/lightning_box_large_close.png",
    "type": "image"
   },
   {
    "key": "obj/lightning_box/large_wide",
    "path": "assets/act2/obj/2-3/lightning_box_large_wide.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_small_close/00",
    "path": "assets/act2/obj/2-3/box_charge_glow_small_close_00.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_small_close/30",
    "path": "assets/act2/obj/2-3/box_charge_glow_small_close_30.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_small_close/70",
    "path": "assets/act2/obj/2-3/box_charge_glow_small_close_70.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_small_close/100",
    "path": "assets/act2/obj/2-3/box_charge_glow_small_close_100.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_small_wide/00",
    "path": "assets/act2/obj/2-3/box_charge_glow_small_wide_00.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_small_wide/30",
    "path": "assets/act2/obj/2-3/box_charge_glow_small_wide_30.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_small_wide/70",
    "path": "assets/act2/obj/2-3/box_charge_glow_small_wide_70.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_small_wide/100",
    "path": "assets/act2/obj/2-3/box_charge_glow_small_wide_100.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_large_close/00",
    "path": "assets/act2/obj/2-3/box_charge_glow_large_close_00.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_large_close/30",
    "path": "assets/act2/obj/2-3/box_charge_glow_large_close_30.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_large_close/70",
    "path": "assets/act2/obj/2-3/box_charge_glow_large_close_70.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_large_close/100",
    "path": "assets/act2/obj/2-3/box_charge_glow_large_close_100.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_large_wide/00",
    "path": "assets/act2/obj/2-3/box_charge_glow_large_wide_00.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_large_wide/30",
    "path": "assets/act2/obj/2-3/box_charge_glow_large_wide_30.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_large_wide/70",
    "path": "assets/act2/obj/2-3/box_charge_glow_large_wide_70.png",
    "type": "image"
   },
   {
    "key": "obj/box_charge_glow_large_wide/100",
    "path": "assets/act2/obj/2-3/box_charge_glow_large_wide_100.png",
    "type": "image"
   },
   {
    "key": "obj/iron_door/closed",
    "path": "assets/act2/obj/2-3/iron_door_closed.png",
    "type": "image"
   },
   {
    "key": "obj/iron_door/opening_01",
    "path": "assets/act2/obj/2-3/iron_door_opening_01.png",
    "type": "image"
   },
   {
    "key": "obj/iron_door/opening_02",
    "path": "assets/act2/obj/2-3/iron_door_opening_02.png",
    "type": "image"
   },
   {
    "key": "obj/iron_door/opening_03",
    "path": "assets/act2/obj/2-3/iron_door_opening_03.png",
    "type": "image"
   },
   {
    "key": "obj/iron_door/opening_04",
    "path": "assets/act2/obj/2-3/iron_door_opening_04.png",
    "type": "image"
   },
   {
    "key": "obj/touch_slab/off",
    "path": "assets/act2/obj/2-3/touch_slab_off.png",
    "type": "image"
   },
   {
    "key": "obj/touch_slab/on",
    "path": "assets/act2/obj/2-3/touch_slab_on.png",
    "type": "image"
   },
   {
    "key": "obj/touch_slab/no_response",
    "path": "assets/act2/obj/2-3/touch_slab_no_response.png",
    "type": "image"
   },
   {
    "key": "obj/touch_slab_glow/off",
    "path": "assets/act2/obj/2-3/touch_slab_glow_off.png",
    "type": "image"
   },
   {
    "key": "obj/touch_slab_glow/on",
    "path": "assets/act2/obj/2-3/touch_slab_glow_on.png",
    "type": "image"
   },
   {
    "key": "obj/touch_slab_glow/no_response",
    "path": "assets/act2/obj/2-3/touch_slab_glow_no_response.png",
    "type": "image"
   },
   {
    "key": "obj/rubber_glove/default",
    "path": "assets/act2/obj/2-3/rubber_glove.png",
    "type": "image"
   },
   {
    "key": "obj/rubber_glove_icon/default",
    "path": "assets/act2/obj/2-3/rubber_glove_icon.png",
    "type": "image"
   },
   {
    "key": "obj/wooden_stick/default",
    "path": "assets/act2/obj/2-3/wooden_stick.png",
    "type": "image"
   },
   {
    "key": "obj/wooden_stick_icon/default",
    "path": "assets/act2/obj/2-3/wooden_stick_icon.png",
    "type": "image"
   }
  ],
  "obj_2-4": [
   {
    "key": "obj/vault_3/body",
    "path": "assets/act2/obj/2-4/vault_3_body.png",
    "type": "image"
   },
   {
    "key": "obj/vault_3_door_iron/closed",
    "path": "assets/act2/obj/2-4/vault_3_door_iron_closed.png",
    "type": "image"
   },
   {
    "key": "obj/vault_3_door_iron/open",
    "path": "assets/act2/obj/2-4/vault_3_door_iron_open.png",
    "type": "image"
   },
   {
    "key": "obj/vault_3_door_aluminum/closed",
    "path": "assets/act2/obj/2-4/vault_3_door_aluminum_closed.png",
    "type": "image"
   },
   {
    "key": "obj/vault_3_door_aluminum/open",
    "path": "assets/act2/obj/2-4/vault_3_door_aluminum_open.png",
    "type": "image"
   },
   {
    "key": "obj/vault_3_door_copper/closed",
    "path": "assets/act2/obj/2-4/vault_3_door_copper_closed.png",
    "type": "image"
   },
   {
    "key": "obj/vault_3_door_copper/open",
    "path": "assets/act2/obj/2-4/vault_3_door_copper_open.png",
    "type": "image"
   },
   {
    "key": "obj/key_iron/default",
    "path": "assets/act2/obj/2-4/key_iron.png",
    "type": "image"
   },
   {
    "key": "obj/key_iron_icon/default",
    "path": "assets/act2/obj/2-4/key_iron_icon.png",
    "type": "image"
   },
   {
    "key": "obj/key_aluminum/default",
    "path": "assets/act2/obj/2-4/key_aluminum.png",
    "type": "image"
   },
   {
    "key": "obj/key_aluminum_icon/default",
    "path": "assets/act2/obj/2-4/key_aluminum_icon.png",
    "type": "image"
   },
   {
    "key": "obj/key_copper/default",
    "path": "assets/act2/obj/2-4/key_copper.png",
    "type": "image"
   },
   {
    "key": "obj/key_copper_icon/default",
    "path": "assets/act2/obj/2-4/key_copper_icon.png",
    "type": "image"
   },
   {
    "key": "obj/magnet_hook/default",
    "path": "assets/act2/obj/2-4/magnet_hook.png",
    "type": "image"
   },
   {
    "key": "obj/magnet_hook_icon/default",
    "path": "assets/act2/obj/2-4/magnet_hook_icon.png",
    "type": "image"
   },
   {
    "key": "obj/graphite_stand/default",
    "path": "assets/act2/obj/2-4/graphite_stand.png",
    "type": "image"
   },
   {
    "key": "obj/graphite_plate/default",
    "path": "assets/act2/obj/2-4/graphite_plate.png",
    "type": "image"
   },
   {
    "key": "obj/magnet_glove_icon/default",
    "path": "assets/act2/obj/2-4/magnet_glove_icon.png",
    "type": "image"
   }
  ],
  "obj_2-5": [
   {
    "key": "obj/elevator_platform/default",
    "path": "assets/act2/obj/2-5/elevator_platform.png",
    "type": "image"
   },
   {
    "key": "obj/elevator_rope/tile",
    "path": "assets/act2/obj/2-5/elevator_rope_tile.png",
    "type": "image"
   },
   {
    "key": "obj/motor/body",
    "path": "assets/act2/obj/2-5/motor_body.png",
    "type": "image"
   },
   {
    "key": "obj/motor_rotor/default",
    "path": "assets/act2/obj/2-5/motor_rotor.png",
    "type": "image"
   },
   {
    "key": "obj/compass/base",
    "path": "assets/act2/obj/2-5/compass_base.png",
    "type": "image"
   },
   {
    "key": "obj/compass_needle/default",
    "path": "assets/act2/obj/2-5/compass_needle.png",
    "type": "image"
   },
   {
    "key": "obj/coil/few",
    "path": "assets/act2/obj/2-5/coil_few.png",
    "type": "image"
   },
   {
    "key": "obj/coil/normal",
    "path": "assets/act2/obj/2-5/coil_normal.png",
    "type": "image"
   },
   {
    "key": "obj/coil/many",
    "path": "assets/act2/obj/2-5/coil_many.png",
    "type": "image"
   },
   {
    "key": "obj/bar_magnet_small/default",
    "path": "assets/act2/obj/2-5/bar_magnet_small.png",
    "type": "image"
   },
   {
    "key": "obj/bar_magnet_medium/default",
    "path": "assets/act2/obj/2-5/bar_magnet_medium.png",
    "type": "image"
   },
   {
    "key": "obj/bar_magnet_large/default",
    "path": "assets/act2/obj/2-5/bar_magnet_large.png",
    "type": "image"
   },
   {
    "key": "obj/direction_switch/left",
    "path": "assets/act2/obj/2-5/direction_switch_left.png",
    "type": "image"
   },
   {
    "key": "obj/direction_switch/right",
    "path": "assets/act2/obj/2-5/direction_switch_right.png",
    "type": "image"
   },
   {
    "key": "obj/speaker_part_magnet/default",
    "path": "assets/act2/obj/2-5/speaker_part_magnet.png",
    "type": "image"
   },
   {
    "key": "obj/speaker_part_coil/default",
    "path": "assets/act2/obj/2-5/speaker_part_coil.png",
    "type": "image"
   },
   {
    "key": "obj/speaker_part_cone/default",
    "path": "assets/act2/obj/2-5/speaker_part_cone.png",
    "type": "image"
   },
   {
    "key": "obj/speaker_assembled/default",
    "path": "assets/act2/obj/2-5/speaker_assembled.png",
    "type": "image"
   },
   {
    "key": "obj/electromagnet_trap/off",
    "path": "assets/act2/obj/2-5/electromagnet_trap_off.png",
    "type": "image"
   },
   {
    "key": "obj/electromagnet_trap/on",
    "path": "assets/act2/obj/2-5/electromagnet_trap_on.png",
    "type": "image"
   },
   {
    "key": "obj/electromagnet_trap_glow/on",
    "path": "assets/act2/obj/2-5/electromagnet_trap_glow_on.png",
    "type": "image"
   },
   {
    "key": "obj/lever_switch/left",
    "path": "assets/act2/obj/extra/lever_switch_left.png",
    "type": "image"
   },
   {
    "key": "obj/lever_switch/middle",
    "path": "assets/act2/obj/extra/lever_switch_middle.png",
    "type": "image"
   },
   {
    "key": "obj/lever_switch/right",
    "path": "assets/act2/obj/extra/lever_switch_right.png",
    "type": "image"
   }
  ],
  "obj_2-6": [
   {
    "key": "obj/coil_gate/off",
    "path": "assets/act2/obj/2-6/coil_gate_off.png",
    "type": "image"
   },
   {
    "key": "obj/coil_gate/glow",
    "path": "assets/act2/obj/2-6/coil_gate_glow.png",
    "type": "image"
   },
   {
    "key": "obj/coil_gate/open_01",
    "path": "assets/act2/obj/2-6/coil_gate_open_01.png",
    "type": "image"
   },
   {
    "key": "obj/coil_gate/open_02",
    "path": "assets/act2/obj/2-6/coil_gate_open_02.png",
    "type": "image"
   },
   {
    "key": "obj/coil_gate/open_03",
    "path": "assets/act2/obj/2-6/coil_gate_open_03.png",
    "type": "image"
   },
   {
    "key": "obj/coil_gate/open_04",
    "path": "assets/act2/obj/2-6/coil_gate_open_04.png",
    "type": "image"
   },
   {
    "key": "obj/coil_gate_glow/glow",
    "path": "assets/act2/obj/2-6/coil_gate_glow_glow.png",
    "type": "image"
   },
   {
    "key": "obj/beacon/off",
    "path": "assets/act2/obj/2-6/beacon_off.png",
    "type": "image"
   },
   {
    "key": "obj/beacon_fire/01",
    "path": "assets/act2/obj/2-6/beacon_fire_01.png",
    "type": "image"
   },
   {
    "key": "obj/beacon_fire/02",
    "path": "assets/act2/obj/2-6/beacon_fire_02.png",
    "type": "image"
   },
   {
    "key": "obj/beacon_fire/03",
    "path": "assets/act2/obj/2-6/beacon_fire_03.png",
    "type": "image"
   },
   {
    "key": "obj/beacon_fire/04",
    "path": "assets/act2/obj/2-6/beacon_fire_04.png",
    "type": "image"
   },
   {
    "key": "obj/beacon_glow/on",
    "path": "assets/act2/obj/2-6/beacon_glow_on.png",
    "type": "image"
   },
   {
    "key": "obj/coil_sender/base",
    "path": "assets/act2/obj/2-6/coil_sender_base.png",
    "type": "image"
   },
   {
    "key": "obj/coil_sender_body/default",
    "path": "assets/act2/obj/2-6/coil_sender_body.png",
    "type": "image"
   },
   {
    "key": "obj/coil_receiver/base",
    "path": "assets/act2/obj/2-6/coil_receiver_base.png",
    "type": "image"
   },
   {
    "key": "obj/coil_receiver_body/default",
    "path": "assets/act2/obj/2-6/coil_receiver_body.png",
    "type": "image"
   },
   {
    "key": "obj/village_lamp/off",
    "path": "assets/act2/obj/2-6/village_lamp_off.png",
    "type": "image"
   },
   {
    "key": "obj/village_lamp/on",
    "path": "assets/act2/obj/2-6/village_lamp_on.png",
    "type": "image"
   },
   {
    "key": "obj/village_lamp_glow/on",
    "path": "assets/act2/obj/2-6/village_lamp_glow_on.png",
    "type": "image"
   }
  ],
  "obj_battery": [
   {
    "key": "obj/battery_cell",
    "path": "assets/act2/obj/extra/battery_cell.png",
    "type": "image"
   }
  ],
  "obj_3-1": [
   {
    "key": "obj/light_source/off",
    "path": "assets/act3/obj/3-1/light_source_off.png",
    "type": "image"
   },
   {
    "key": "obj/light_source/on",
    "path": "assets/act3/obj/3-1/light_source_on.png",
    "type": "image"
   },
   {
    "key": "obj/light_source_glow/default",
    "path": "assets/act3/obj/3-1/light_source_glow.png",
    "type": "image"
   },
   {
    "key": "obj/slit_wall/default",
    "path": "assets/act3/obj/3-1/slit_wall.png",
    "type": "image"
   },
   {
    "key": "obj/slit_plate/gap_narrow",
    "path": "assets/act3/obj/3-1/slit_plate_gap_narrow.png",
    "type": "image"
   },
   {
    "key": "obj/slit_plate/gap_mid",
    "path": "assets/act3/obj/3-1/slit_plate_gap_mid.png",
    "type": "image"
   },
   {
    "key": "obj/slit_plate/gap_wide",
    "path": "assets/act3/obj/3-1/slit_plate_gap_wide.png",
    "type": "image"
   },
   {
    "key": "obj/screen_wall/default",
    "path": "assets/act3/obj/3-1/screen_wall.png",
    "type": "image"
   },
   {
    "key": "obj/ripple_tank/default",
    "path": "assets/act3/obj/3-1/ripple_tank.png",
    "type": "image"
   },
   {
    "key": "obj/hidden_rune_01/clear",
    "path": "assets/act3/obj/3-1/hidden_rune_01_clear.png",
    "type": "image"
   },
   {
    "key": "obj/hidden_rune_01/faint",
    "path": "assets/act3/obj/3-1/hidden_rune_01_faint.png",
    "type": "image"
   },
   {
    "key": "obj/hidden_rune_02/clear",
    "path": "assets/act3/obj/3-1/hidden_rune_02_clear.png",
    "type": "image"
   },
   {
    "key": "obj/hidden_rune_02/faint",
    "path": "assets/act3/obj/3-1/hidden_rune_02_faint.png",
    "type": "image"
   },
   {
    "key": "obj/hidden_rune_03/clear",
    "path": "assets/act3/obj/3-1/hidden_rune_03_clear.png",
    "type": "image"
   },
   {
    "key": "obj/hidden_rune_03/faint",
    "path": "assets/act3/obj/3-1/hidden_rune_03_faint.png",
    "type": "image"
   },
   {
    "key": "obj/torch/default",
    "path": "assets/act3/obj/3-1/torch.png",
    "type": "image"
   },
   {
    "key": "obj/torch_flame/01",
    "path": "assets/act3/obj/3-1/torch_flame_01.png",
    "type": "image"
   },
   {
    "key": "obj/torch_flame/02",
    "path": "assets/act3/obj/3-1/torch_flame_02.png",
    "type": "image"
   },
   {
    "key": "obj/torch_flame/03",
    "path": "assets/act3/obj/3-1/torch_flame_03.png",
    "type": "image"
   },
   {
    "key": "obj/torch_flame/04",
    "path": "assets/act3/obj/3-1/torch_flame_04.png",
    "type": "image"
   }
  ],
  "obj_3_items": [
   {
    "key": "obj/film_shield/normal",
    "path": "assets/act3/obj/3_items/film_shield_normal.png",
    "type": "image"
   },
   {
    "key": "obj/film_shield/reflect",
    "path": "assets/act3/obj/3_items/film_shield_reflect.png",
    "type": "image"
   },
   {
    "key": "obj/film_shield_reflect_glint/default",
    "path": "assets/act3/obj/3_items/film_shield_reflect_glint.png",
    "type": "image"
   },
   {
    "key": "obj/film_shield_icon/default",
    "path": "assets/act3/obj/3_items/film_shield_icon.png",
    "type": "image"
   },
   {
    "key": "obj/golden_key_icon/default",
    "path": "assets/act3/obj/3_items/golden_key_icon.png",
    "type": "image"
   },
   {
    "key": "obj/convex_lens_icon/default",
    "path": "assets/act3/obj/3_items/convex_lens_icon.png",
    "type": "image"
   },
   {
    "key": "obj/electron_eye/default",
    "path": "assets/act3/obj/3_items/electron_eye.png",
    "type": "image"
   },
   {
    "key": "obj/electron_eye_icon/default",
    "path": "assets/act3/obj/3_items/electron_eye_icon.png",
    "type": "image"
   },
   {
    "key": "obj/light_eye/default",
    "path": "assets/act3/obj/3_items/light_eye.png",
    "type": "image"
   },
   {
    "key": "obj/light_eye_icon/default",
    "path": "assets/act3/obj/3_items/light_eye_icon.png",
    "type": "image"
   },
   {
    "key": "obj/spectroscope/default",
    "path": "assets/act3/obj/3_items/spectroscope.png",
    "type": "image"
   },
   {
    "key": "obj/spectroscope_icon/default",
    "path": "assets/act3/obj/3_items/spectroscope_icon.png",
    "type": "image"
   },
   {
    "key": "obj/diode_crystal_icon/default",
    "path": "assets/act3/obj/3_items/diode_crystal_icon.png",
    "type": "image"
   },
   {
    "key": "obj/diode_shield/normal",
    "path": "assets/act3/obj/3_items/diode_shield_normal.png",
    "type": "image"
   },
   {
    "key": "obj/diode_shield_icon/default",
    "path": "assets/act3/obj/3_items/diode_shield_icon.png",
    "type": "image"
   },
   {
    "key": "obj/diode_shield/block",
    "path": "assets/act3/obj/3_items/diode_shield_block.png",
    "type": "image"
   },
   {
    "key": "obj/diode_shield/pass",
    "path": "assets/act3/obj/3_items/diode_shield_pass.png",
    "type": "image"
   },
   {
    "key": "obj/diode_shield_block_effect/default",
    "path": "assets/act3/obj/3_items/diode_shield_block_effect.png",
    "type": "image"
   },
   {
    "key": "obj/diode_shield_pass_effect/default",
    "path": "assets/act3/obj/3_items/diode_shield_pass_effect.png",
    "type": "image"
   },
   {
    "key": "obj/hourglass/01",
    "path": "assets/act3/obj/3_items/hourglass_01.png",
    "type": "image"
   },
   {
    "key": "obj/hourglass/02",
    "path": "assets/act3/obj/3_items/hourglass_02.png",
    "type": "image"
   },
   {
    "key": "obj/hourglass/03",
    "path": "assets/act3/obj/3_items/hourglass_03.png",
    "type": "image"
   },
   {
    "key": "obj/hourglass/04",
    "path": "assets/act3/obj/3_items/hourglass_04.png",
    "type": "image"
   },
   {
    "key": "obj/hourglass/05",
    "path": "assets/act3/obj/3_items/hourglass_05.png",
    "type": "image"
   },
   {
    "key": "obj/hourglass/06",
    "path": "assets/act3/obj/3_items/hourglass_06.png",
    "type": "image"
   },
   {
    "key": "obj/hourglass_icon/default",
    "path": "assets/act3/obj/3_items/hourglass_icon.png",
    "type": "image"
   }
  ],
  "obj_3-2": [
   {
    "key": "obj/water_body/default",
    "path": "assets/act3/obj/3-2/water_body.png",
    "type": "image"
   },
   {
    "key": "obj/water_surface/01",
    "path": "assets/act3/obj/3-2/water_surface_01.png",
    "type": "image"
   },
   {
    "key": "obj/water_surface/02",
    "path": "assets/act3/obj/3-2/water_surface_02.png",
    "type": "image"
   },
   {
    "key": "obj/water_surface/03",
    "path": "assets/act3/obj/3-2/water_surface_03.png",
    "type": "image"
   },
   {
    "key": "obj/water_surface/04",
    "path": "assets/act3/obj/3-2/water_surface_04.png",
    "type": "image"
   },
   {
    "key": "obj/golden_key/default",
    "path": "assets/act3/obj/3-2/golden_key.png",
    "type": "image"
   },
   {
    "key": "obj/convex_lens/default",
    "path": "assets/act3/obj/3-2/convex_lens.png",
    "type": "image"
   },
   {
    "key": "obj/lens_screen/default",
    "path": "assets/act3/obj/3-2/lens_screen.png",
    "type": "image"
   },
   {
    "key": "obj/pattern_stencil/default",
    "path": "assets/act3/obj/3-2/pattern_stencil.png",
    "type": "image"
   },
   {
    "key": "obj/optical_rail/default",
    "path": "assets/act3/obj/3-2/optical_rail.png",
    "type": "image"
   },
   {
    "key": "obj/crystal_plate/blank",
    "path": "assets/act3/obj/3-2/crystal_plate_blank.png",
    "type": "image"
   },
   {
    "key": "obj/crystal_plate/engraved",
    "path": "assets/act3/obj/3-2/crystal_plate_engraved.png",
    "type": "image"
   },
   {
    "key": "obj/light_door/closed",
    "path": "assets/act3/obj/3-2/light_door_closed.png",
    "type": "image"
   },
   {
    "key": "obj/light_door/opening_01",
    "path": "assets/act3/obj/3-2/light_door_opening_01.png",
    "type": "image"
   },
   {
    "key": "obj/light_door/opening_02",
    "path": "assets/act3/obj/3-2/light_door_opening_02.png",
    "type": "image"
   },
   {
    "key": "obj/light_door/opening_03",
    "path": "assets/act3/obj/3-2/light_door_opening_03.png",
    "type": "image"
   },
   {
    "key": "obj/light_door/opening_04",
    "path": "assets/act3/obj/3-2/light_door_opening_04.png",
    "type": "image"
   },
   {
    "key": "obj/pool_bridge/default",
    "path": "assets/act3/obj/3-2/pool_bridge.png",
    "type": "image"
   }
  ],
  "obj_3-3": [
   {
    "key": "obj/rune_tablet/sharp",
    "path": "assets/act3/obj/3-3/rune_tablet_sharp.png",
    "type": "image"
   },
   {
    "key": "obj/rune_tablet/blurred",
    "path": "assets/act3/obj/3-3/rune_tablet_blurred.png",
    "type": "image"
   },
   {
    "key": "obj/photo_plate/default",
    "path": "assets/act3/obj/3-3/photo_plate.png",
    "type": "image"
   },
   {
    "key": "obj/photo_target/default",
    "path": "assets/act3/obj/3-3/photo_target.png",
    "type": "image"
   },
   {
    "key": "obj/electron_apparatus/default",
    "path": "assets/act3/obj/3-3/electron_apparatus.png",
    "type": "image"
   }
  ],
  "obj_3-4": [
   {
    "key": "obj/lamp_pedestal/default",
    "path": "assets/act3/obj/3-4/lamp_pedestal.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_lamp/hydrogen",
    "path": "assets/act3/obj/3-4/spectrum_lamp_hydrogen.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_lamp_hydrogen_glow/default",
    "path": "assets/act3/obj/3-4/spectrum_lamp_hydrogen_glow.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_lamp/sodium",
    "path": "assets/act3/obj/3-4/spectrum_lamp_sodium.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_lamp_sodium_glow/default",
    "path": "assets/act3/obj/3-4/spectrum_lamp_sodium_glow.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_lamp/neon",
    "path": "assets/act3/obj/3-4/spectrum_lamp_neon.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_lamp_neon_glow/default",
    "path": "assets/act3/obj/3-4/spectrum_lamp_neon_glow.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_lamp/mercury",
    "path": "assets/act3/obj/3-4/spectrum_lamp_mercury.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_lamp_mercury_glow/default",
    "path": "assets/act3/obj/3-4/spectrum_lamp_mercury_glow.png",
    "type": "image"
   },
   {
    "key": "obj/barcode_panel/default",
    "path": "assets/act3/obj/3-4/barcode_panel.png",
    "type": "image"
   },
   {
    "key": "obj/energy_stairs/default",
    "path": "assets/act3/obj/3-4/energy_stairs.png",
    "type": "image"
   },
   {
    "key": "obj/energy_ball/default",
    "path": "assets/act3/obj/3-4/energy_ball.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_door/closed",
    "path": "assets/act3/obj/3-4/spectrum_door_closed.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_door/opening_01",
    "path": "assets/act3/obj/3-4/spectrum_door_opening_01.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_door/opening_02",
    "path": "assets/act3/obj/3-4/spectrum_door_opening_02.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_door/opening_03",
    "path": "assets/act3/obj/3-4/spectrum_door_opening_03.png",
    "type": "image"
   },
   {
    "key": "obj/spectrum_door/opening_04",
    "path": "assets/act3/obj/3-4/spectrum_door_opening_04.png",
    "type": "image"
   }
  ],
  "obj_3-5": [
   {
    "key": "obj/bridge_tile_metal/default",
    "path": "assets/act3/obj/3-5/bridge_tile_metal.png",
    "type": "image"
   },
   {
    "key": "obj/bridge_tile_glass/default",
    "path": "assets/act3/obj/3-5/bridge_tile_glass.png",
    "type": "image"
   },
   {
    "key": "obj/bridge_tile_silicon/default",
    "path": "assets/act3/obj/3-5/bridge_tile_silicon.png",
    "type": "image"
   },
   {
    "key": "obj/led_crystal/off",
    "path": "assets/act3/obj/3-5/led_crystal_off.png",
    "type": "image"
   },
   {
    "key": "obj/led_crystal/on",
    "path": "assets/act3/obj/3-5/led_crystal_on.png",
    "type": "image"
   },
   {
    "key": "obj/led_crystal_glow/default",
    "path": "assets/act3/obj/3-5/led_crystal_glow.png",
    "type": "image"
   },
   {
    "key": "obj/diode_crystal/default",
    "path": "assets/act3/obj/3-5/diode_crystal.png",
    "type": "image"
   },
   {
    "key": "obj/power_crystal/default",
    "path": "assets/act3/obj/3-5/power_crystal.png",
    "type": "image"
   },
   {
    "key": "obj/curse_backflow/01",
    "path": "assets/act3/obj/3-5/curse_backflow_01.png",
    "type": "image"
   },
   {
    "key": "obj/curse_backflow/02",
    "path": "assets/act3/obj/3-5/curse_backflow_02.png",
    "type": "image"
   },
   {
    "key": "obj/curse_backflow/03",
    "path": "assets/act3/obj/3-5/curse_backflow_03.png",
    "type": "image"
   },
   {
    "key": "obj/curse_backflow/04",
    "path": "assets/act3/obj/3-5/curse_backflow_04.png",
    "type": "image"
   },
   {
    "key": "obj/tester_lamp/off",
    "path": "assets/act3/obj/3-5/tester_lamp_off.png",
    "type": "image"
   },
   {
    "key": "obj/tester_lamp/dim",
    "path": "assets/act3/obj/3-5/tester_lamp_dim.png",
    "type": "image"
   },
   {
    "key": "obj/tester_lamp_dim_glow/default",
    "path": "assets/act3/obj/3-5/tester_lamp_dim_glow.png",
    "type": "image"
   },
   {
    "key": "obj/tester_lamp/bright",
    "path": "assets/act3/obj/3-5/tester_lamp_bright.png",
    "type": "image"
   },
   {
    "key": "obj/tester_lamp_bright_glow/default",
    "path": "assets/act3/obj/3-5/tester_lamp_bright_glow.png",
    "type": "image"
   }
  ],
  "obj_3-6": [
   {
    "key": "obj/hourglass_door/closed",
    "path": "assets/act3/obj/3-6/hourglass_door_closed.png",
    "type": "image"
   },
   {
    "key": "obj/hourglass_door/opening_01",
    "path": "assets/act3/obj/3-6/hourglass_door_opening_01.png",
    "type": "image"
   },
   {
    "key": "obj/hourglass_door/opening_02",
    "path": "assets/act3/obj/3-6/hourglass_door_opening_02.png",
    "type": "image"
   },
   {
    "key": "obj/hourglass_door/opening_03",
    "path": "assets/act3/obj/3-6/hourglass_door_opening_03.png",
    "type": "image"
   },
   {
    "key": "obj/hourglass_door/opening_04",
    "path": "assets/act3/obj/3-6/hourglass_door_opening_04.png",
    "type": "image"
   },
   {
    "key": "obj/light_arrow/01",
    "path": "assets/act3/obj/3-6/light_arrow_01.png",
    "type": "image"
   },
   {
    "key": "obj/light_arrow_hit/01",
    "path": "assets/act3/obj/3-6/light_arrow_hit_01.png",
    "type": "image"
   },
   {
    "key": "obj/light_arrow/02",
    "path": "assets/act3/obj/3-6/light_arrow_02.png",
    "type": "image"
   },
   {
    "key": "obj/light_arrow_hit/02",
    "path": "assets/act3/obj/3-6/light_arrow_hit_02.png",
    "type": "image"
   },
   {
    "key": "obj/light_arrow/03",
    "path": "assets/act3/obj/3-6/light_arrow_03.png",
    "type": "image"
   },
   {
    "key": "obj/light_arrow_hit/03",
    "path": "assets/act3/obj/3-6/light_arrow_hit_03.png",
    "type": "image"
   },
   {
    "key": "obj/light_arrow/04",
    "path": "assets/act3/obj/3-6/light_arrow_04.png",
    "type": "image"
   },
   {
    "key": "obj/light_arrow_hit/04",
    "path": "assets/act3/obj/3-6/light_arrow_hit_04.png",
    "type": "image"
   },
   {
    "key": "obj/light_arrow_tail/default",
    "path": "assets/act3/obj/3-6/light_arrow_tail.png",
    "type": "image"
   },
   {
    "key": "obj/speed_lines/01",
    "path": "assets/act3/obj/3-6/speed_lines_01.png",
    "type": "image"
   },
   {
    "key": "obj/speed_lines/02",
    "path": "assets/act3/obj/3-6/speed_lines_02.png",
    "type": "image"
   },
   {
    "key": "obj/speed_lines/03",
    "path": "assets/act3/obj/3-6/speed_lines_03.png",
    "type": "image"
   },
   {
    "key": "obj/spellbook_complete/01",
    "path": "assets/act3/obj/3-6/spellbook_complete_01.png",
    "type": "image"
   },
   {
    "key": "obj/spellbook_complete/02",
    "path": "assets/act3/obj/3-6/spellbook_complete_02.png",
    "type": "image"
   },
   {
    "key": "obj/spellbook_complete/03",
    "path": "assets/act3/obj/3-6/spellbook_complete_03.png",
    "type": "image"
   },
   {
    "key": "obj/spellbook_complete/04",
    "path": "assets/act3/obj/3-6/spellbook_complete_04.png",
    "type": "image"
   },
   {
    "key": "obj/spellbook_complete/05",
    "path": "assets/act3/obj/3-6/spellbook_complete_05.png",
    "type": "image"
   },
   {
    "key": "obj/spellbook_complete/06",
    "path": "assets/act3/obj/3-6/spellbook_complete_06.png",
    "type": "image"
   }
  ],
  "title": [
   {
    "key": "ui/title_bg",
    "path": "assets/ui/title/background.png",
    "type": "image"
   },
   {
    "key": "ui/title_logo",
    "path": "assets/ui/title/logo.png",
    "type": "image"
   }
  ],
  "exam": [
   {
    "key": "ui/exam_blank",
    "path": "assets/ui/trial/exam_blank.png",
    "type": "image"
   }
  ],
  "spellbook": [
   {
    "key": "ui/blank_spread",
    "path": "assets/ui/spellbook/blank_spread.png",
    "type": "image"
   },
   {
    "key": "ui/book_cover",
    "path": "assets/ui/spellbook/book_cover.png",
    "type": "image"
   },
   {
    "key": "ui/illust_01",
    "path": "assets/ui/spellbook/illustrations/01.png",
    "type": "image"
   },
   {
    "key": "ui/illust_02",
    "path": "assets/ui/spellbook/illustrations/02.png",
    "type": "image"
   },
   {
    "key": "ui/illust_03",
    "path": "assets/ui/spellbook/illustrations/03.png",
    "type": "image"
   },
   {
    "key": "ui/illust_04",
    "path": "assets/ui/spellbook/illustrations/04.png",
    "type": "image"
   },
   {
    "key": "ui/illust_05",
    "path": "assets/ui/spellbook/illustrations/05.png",
    "type": "image"
   },
   {
    "key": "ui/illust_06",
    "path": "assets/ui/spellbook/illustrations/06.png",
    "type": "image"
   }
  ],
  "cutscenes": [
   {
    "key": "cut/prologue_book_tear",
    "path": "assets/ui/cutscenes/prologue_book_tear.png",
    "type": "image"
   },
   {
    "key": "cut/act1_start",
    "path": "assets/ui/cutscenes/act1_start.png",
    "type": "image"
   },
   {
    "key": "cut/act1_end",
    "path": "assets/ui/cutscenes/act1_end.png",
    "type": "image"
   }
  ],
  "spellbook_act2": [
   {
    "key": "ui/illust_07",
    "path": "assets/act2/ui/07_electric_force.png",
    "type": "image"
   },
   {
    "key": "ui/illust_08",
    "path": "assets/act2/ui/08_circuit.png",
    "type": "image"
   },
   {
    "key": "ui/illust_09",
    "path": "assets/act2/ui/09_capacitor.png",
    "type": "image"
   },
   {
    "key": "ui/illust_10",
    "path": "assets/act2/ui/10_magnetism.png",
    "type": "image"
   },
   {
    "key": "ui/illust_11",
    "path": "assets/act2/ui/11_current_magnetism.png",
    "type": "image"
   },
   {
    "key": "ui/illust_12",
    "path": "assets/act2/ui/12_induction.png",
    "type": "image"
   }
  ],
  "cutscenes_act2": [
   {
    "key": "cut/act2_intro",
    "path": "assets/act2/ui/act2_intro.png",
    "type": "image"
   },
   {
    "key": "cut/act2_ending",
    "path": "assets/act2/ui/act2_ending.png",
    "type": "image"
   }
  ],
  "spellbook_act3": [
   {
    "key": "ui/illust_13",
    "path": "assets/act3/ui/13_interference.png",
    "type": "image"
   },
   {
    "key": "ui/illust_14",
    "path": "assets/act3/ui/14_refraction_lens.png",
    "type": "image"
   },
   {
    "key": "ui/illust_15",
    "path": "assets/act3/ui/15_duality.png",
    "type": "image"
   },
   {
    "key": "ui/illust_16",
    "path": "assets/act3/ui/16_line_spectrum.png",
    "type": "image"
   },
   {
    "key": "ui/illust_17",
    "path": "assets/act3/ui/17_semiconductor.png",
    "type": "image"
   },
   {
    "key": "ui/illust_18",
    "path": "assets/act3/ui/18_relativity.png",
    "type": "image"
   }
  ],
  "torn_07": [
   {
    "key": "ui/torn_07",
    "path": "assets/act3/ui/07_torn.png",
    "type": "image"
   }
  ],
  "torn_08": [
   {
    "key": "ui/torn_08",
    "path": "assets/act3/ui/08_torn.png",
    "type": "image"
   }
  ],
  "torn_09": [
   {
    "key": "ui/torn_09",
    "path": "assets/act3/ui/09_torn.png",
    "type": "image"
   }
  ],
  "torn_10": [
   {
    "key": "ui/torn_10",
    "path": "assets/act3/ui/10_torn.png",
    "type": "image"
   }
  ],
  "torn_11": [
   {
    "key": "ui/torn_11",
    "path": "assets/act3/ui/11_torn.png",
    "type": "image"
   }
  ],
  "torn_12": [
   {
    "key": "ui/torn_12",
    "path": "assets/act3/ui/12_torn.png",
    "type": "image"
   }
  ],
  "torn_13": [
   {
    "key": "ui/torn_13",
    "path": "assets/act3/ui/13_torn.png",
    "type": "image"
   }
  ],
  "torn_14": [
   {
    "key": "ui/torn_14",
    "path": "assets/act3/ui/14_torn.png",
    "type": "image"
   }
  ],
  "torn_15": [
   {
    "key": "ui/torn_15",
    "path": "assets/act3/ui/15_torn.png",
    "type": "image"
   }
  ],
  "torn_16": [
   {
    "key": "ui/torn_16",
    "path": "assets/act3/ui/16_torn.png",
    "type": "image"
   }
  ],
  "torn_17": [
   {
    "key": "ui/torn_17",
    "path": "assets/act3/ui/17_torn.png",
    "type": "image"
   }
  ],
  "torn_18": [
   {
    "key": "ui/torn_18",
    "path": "assets/act3/ui/18_torn.png",
    "type": "image"
   }
  ],
  "torn_01": [
   {
    "key": "ui/torn_01",
    "path": "assets/act3/ui/01_torn.png",
    "type": "image"
   }
  ],
  "torn_02": [
   {
    "key": "ui/torn_02",
    "path": "assets/act3/ui/02_torn.png",
    "type": "image"
   }
  ],
  "torn_03": [
   {
    "key": "ui/torn_03",
    "path": "assets/act3/ui/03_torn.png",
    "type": "image"
   }
  ],
  "torn_04": [
   {
    "key": "ui/torn_04",
    "path": "assets/act3/ui/04_torn.png",
    "type": "image"
   }
  ],
  "torn_05": [
   {
    "key": "ui/torn_05",
    "path": "assets/act3/ui/05_torn.png",
    "type": "image"
   }
  ],
  "torn_06": [
   {
    "key": "ui/torn_06",
    "path": "assets/act3/ui/06_torn.png",
    "type": "image"
   }
  ],
  "cutscenes_act3": [
   {
    "key": "cut/act3_intro",
    "path": "assets/act3/ui/act3_intro.png",
    "type": "image"
   },
   {
    "key": "cut/act3_final",
    "path": "assets/act3/ui/act3_final.png",
    "type": "image"
   },
   {
    "key": "cut/epilogue",
    "path": "assets/act3/ui/epilogue.png",
    "type": "image"
   },
   {
    "key": "cut/credits_bg",
    "path": "assets/act3/ui/credits_bg.png",
    "type": "image"
   }
  ],
  "ui_act3": [
   {
    "key": "ui3/spectroscope_view",
    "path": "assets/act3/ui/spectroscope_view.png",
    "type": "image"
   },
   {
    "key": "ui3/hourglass_compare",
    "path": "assets/act3/ui/hourglass_compare.png",
    "type": "image"
   },
   {
    "key": "ui3/boss_phase_banner",
    "path": "assets/act3/ui/boss_phase_banner.png",
    "type": "image"
   },
   {
    "key": "ui3/lens_bench_ui",
    "path": "assets/act3/ui/lens_bench_ui.png",
    "type": "image"
   },
   {
    "key": "ui3/electron_eye_overlay",
    "path": "assets/act3/ui/electron_eye_overlay.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_01_locked",
    "path": "assets/act3/ui/abyss_floor_01_locked.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_01_open",
    "path": "assets/act3/ui/abyss_floor_01_open.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_01_cleared",
    "path": "assets/act3/ui/abyss_floor_01_cleared.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_02_locked",
    "path": "assets/act3/ui/abyss_floor_02_locked.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_02_open",
    "path": "assets/act3/ui/abyss_floor_02_open.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_02_cleared",
    "path": "assets/act3/ui/abyss_floor_02_cleared.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_03_locked",
    "path": "assets/act3/ui/abyss_floor_03_locked.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_03_open",
    "path": "assets/act3/ui/abyss_floor_03_open.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_03_cleared",
    "path": "assets/act3/ui/abyss_floor_03_cleared.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_04_locked",
    "path": "assets/act3/ui/abyss_floor_04_locked.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_04_open",
    "path": "assets/act3/ui/abyss_floor_04_open.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_04_cleared",
    "path": "assets/act3/ui/abyss_floor_04_cleared.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_05_locked",
    "path": "assets/act3/ui/abyss_floor_05_locked.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_05_open",
    "path": "assets/act3/ui/abyss_floor_05_open.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_05_cleared",
    "path": "assets/act3/ui/abyss_floor_05_cleared.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_06_locked",
    "path": "assets/act3/ui/abyss_floor_06_locked.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_06_open",
    "path": "assets/act3/ui/abyss_floor_06_open.png",
    "type": "image"
   },
   {
    "key": "ui3/abyss_floor_06_cleared",
    "path": "assets/act3/ui/abyss_floor_06_cleared.png",
    "type": "image"
   }
  ]
 }
};
