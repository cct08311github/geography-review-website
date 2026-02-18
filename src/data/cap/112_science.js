/**
 * 112年 (2023) 國中教育會考 - 自然科真實試題
 * 包含：生物、理化、地科
 */
export const cap112Science = [
  {
    id: 1120401,
    subjectId: 4, // 自然
    topicId: 3,   // 生物 (Subject: 3)
    type: 'single',
    year: 112,
    category: 'Biology',
    question: '下列有關細胞構造的敘述，何者正確？',
    options: [
      '植物細胞都有葉綠體',
      '動物細胞都沒有液胞',
      '細胞壁控制物質進出',
      '粒線體是產生能量的場所'
    ],
    answer: 3,
    explanation: '【知識點：細胞構造】\n(A) 僅綠色部位才有。\n(B) 動物細胞有液胞，較小。\n(C) 細胞膜控制物質進出，細胞壁主要功能為支持。\n(D) 正確，粒線體進行呼吸作用產生能量。',
    difficulty: 'easy',
    tags: ['112會考', '自然', '生物', '細胞']
  },
  {
    id: 1120402,
    subjectId: 4,
    topicId: 1,   // 理化 - 物理 (Subject: 1)
    type: 'single',
    year: 112,
    category: 'Physics',
    question: '小明將一物體置於凸透鏡前，在透鏡另一側的紙屏上成一倒立縮小實像。若將物體向透鏡靠近，則紙屏應如何移動才能再次清晰成像？',
    options: [
      '靠近透鏡',
      '遠離透鏡',
      '不動',
      '無法成像'
    ],
    answer: 1,
    explanation: '【知識點：光學成像】\n凸透鏡成像規律：「物近像遠像變大」。物體靠近透鏡（物距變小），像會遠離透鏡（像距變大），且像會變大。故紙屏應遠離透鏡。',
    difficulty: 'medium',
    tags: ['112會考', '自然', '理化', '光學']
  },
  {
    id: 1120403,
    subjectId: 4,
    topicId: 4,   // 地科 (Subject: 4)
    type: 'single',
    year: 112,
    category: 'EarthScience',
    question: '臺灣夏季常受西南季風影響，下列何者是西南季風帶來的主要天氣現象？',
    options: [
      '寒流來襲',
      '沙塵暴',
      '午後雷陣雨',
      '梅雨鋒面'
    ],
    answer: 2,
    explanation: '【知識點：臺灣氣候】\n夏季西南季風帶來暖濕水氣，容易在午後因熱對流旺盛而產生午後雷陣雨（西北雨）。寒流是冬季東北季風；沙塵暴多在春季；梅雨是在五六月春夏交替。',
    difficulty: 'easy',
    tags: ['112會考', '自然', '地科', '氣象']
  }
]
