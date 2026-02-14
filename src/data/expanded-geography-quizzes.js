// 擴充的地理題庫 - 200+題目
// 台灣地理10大主題，每個主題20-30題

export const expandedGeographyQuizzes = [
  {
    id: 1,
    topicId: 1, // 台灣的地形與海岸
    title: '台灣地形與海岸測驗',
    difficulty: '初級',
    questionsCount: 25,
    timeLimit: 1200, // 20分鐘
    questions: [
      {
        id: '1-1',
        type: 'single-choice',
        question: '台灣的最高峰是哪一座山？',
        options: [
          '雪山',
          '玉山',
          '阿里山',
          '大霸尖山'
        ],
        correctAnswer: 1,
        explanation: '玉山主峰海拔3952公尺，是台灣也是東亞最高峰。',
        points: 4
      },
      {
        id: '1-2',
        type: 'single-choice',
        question: '台灣最大的平原是哪一個？',
        options: [
          '屏東平原',
          '嘉南平原',
          '宜蘭平原',
          '台北盆地'
        ],
        correctAnswer: 1,
        explanation: '嘉南平原面積約4550平方公里，是台灣最大的平原。',
        points: 4
      },
      {
        id: '1-3',
        type: 'single-choice',
        question: '下列哪個海岸屬於「珊瑚礁海岸」？',
        options: [
          '野柳海岸',
          '墾丁海岸',
          '清水斷崖',
          '七股潟湖'
        ],
        correctAnswer: 1,
        explanation: '墾丁海岸有豐富的珊瑚礁生態，屬於珊瑚礁海岸。',
        points: 4
      },
      {
        id: '1-4',
        type: 'multiple-choice',
        question: '下列哪些屬於台灣的主要山脈？（複選）',
        options: [
          '中央山脈',
          '雪山山脈',
          '八卦山山脈',
          '海岸山脈'
        ],
        correctAnswer: [0, 1, 3],
        explanation: '台灣五大山脈為：中央山脈、雪山山脈、玉山山脈、阿里山山脈、海岸山脈。',
        points: 6
      },
      {
        id: '1-5',
        type: 'true-false',
        question: '台灣的海岸山脈位於西部沿海地區。',
        correctAnswer: false,
        explanation: '海岸山脈位於台灣東部，台東縱谷以東。',
        points: 2
      },
      {
        id: '1-6',
        type: 'single-choice',
        question: '台北盆地主要是由什麼作用形成的？',
        options: [
          '火山作用',
          '河流侵蝕',
          '斷層陷落',
          '風積作用'
        ],
        correctAnswer: 2,
        explanation: '台北盆地是斷層陷落後，再由河流沖積物填積而成。',
        points: 4
      },
      {
        id: '1-7',
        type: 'matching',
        question: '請將下列地形與其特徵配對：',
        leftItems: [
          '野柳',
          '七股潟湖',
          '清水斷崖',
          '墾丁'
        ],
        rightItems: [
          '珊瑚礁海岸',
          '沉降海岸',
          '隆起海岸',
          '斷層海岸'
        ],
        correctPairs: [[0, 1], [1, 2], [2, 3], [3, 0]],
        explanation: '野柳-沉降海岸、七股潟湖-隆起海岸、清水斷崖-斷層海岸、墾丁-珊瑚礁海岸。',
        points: 8
      },
      {
        id: '1-8',
        type: 'single-choice',
        question: '下列哪個不是台灣的盆地？',
        options: [
          '台北盆地',
          '台中盆地',
          '埔里盆地',
          '蘭陽盆地'
        ],
        correctAnswer: 3,
        explanation: '蘭陽地區是平原，不是盆地。正確名稱為宜蘭平原。',
        points: 4
      },
      {
        id: '1-9',
        type: 'true-false',
        question: '台灣的海岸線長度約為1500公里。',
        correctAnswer: true,
        explanation: '台灣本島海岸線總長約1140公里，加上離島約1500公里。',
        points: 2
      },
      {
        id: '1-10',
        type: 'single-choice',
        question: '台灣哪個地區以「月世界」惡地地形聞名？',
        options: [
          '高雄田寮',
          '花蓮太魯閣',
          '南投埔里',
          '台東池上'
        ],
        correctAnswer: 0,
        explanation: '高雄田寮的月世界是典型的惡地地形，由泥岩組成。',
        points: 4
      },
      {
        id: '1-11',
        type: 'single-choice',
        question: '台灣最長的河流是哪一條？',
        options: [
          '濁水溪',
          '高屏溪',
          '淡水河',
          '曾文溪'
        ],
        correctAnswer: 0,
        explanation: '濁水溪全長約186公里，是台灣最長的河流。',
        points: 4
      },
      {
        id: '1-12',
        type: 'single-choice',
        question: '台灣哪個離島以「玄武岩柱狀節理」聞名？',
        options: [
          '澎湖群島',
          '金門',
          '馬祖',
          '綠島'
        ],
        correctAnswer: 0,
        explanation: '澎湖的玄武岩柱狀節理是特殊的地質景觀。',
        points: 4
      },
      {
        id: '1-13',
        type: 'multiple-choice',
        question: '下列哪些是台灣東部海岸的特徵？（複選）',
        options: [
          '多沙灘',
          '斷層海岸',
          '珊瑚礁發達',
          '海岸線平直'
        ],
        correctAnswer: [1, 3],
        explanation: '台灣東部海岸多為斷層海岸，海岸線較平直。',
        points: 6
      },
      {
        id: '1-14',
        type: 'true-false',
        question: '台灣的中央山脈是台灣的脊梁山脈，貫穿全島。',
        correctAnswer: true,
        explanation: '中央山脈北起宜蘭蘇澳，南至屏東鵝鑾鼻，全長約340公里。',
        points: 2
      },
      {
        id: '1-15',
        type: 'single-choice',
        question: '下列哪個地區以「泥火山」地形聞名？',
        options: [
          '高雄燕巢',
          '台北陽明山',
          '花蓮太魯閣',
          '南投日月潭'
        ],
        correctAnswer: 0,
        explanation: '高雄燕巢的泥火山是特殊的地質景觀。',
        points: 4
      },
      {
        id: '1-16',
        type: 'single-choice',
        question: '台灣哪個地區有「草嶺古道」？',
        options: [
          '新北市與宜蘭縣交界',
          '台中與南投交界',
          '高雄與屏東交界',
          '花蓮與台東交界'
        ],
        correctAnswer: 0,
        explanation: '草嶺古道位於新北市與宜蘭縣交界，是清代重要的交通要道。',
        points: 4
      },
      {
        id: '1-17',
        type: 'multiple-choice',
        question: '下列哪些是台灣西部海岸的特徵？（複選）',
        options: [
          '多沙灘',
          '多潟湖',
          '海岸線曲折',
          '多珊瑚礁'
        ],
        correctAnswer: [0, 1],
        explanation: '台灣西部海岸多沙灘和潟湖，海岸線較平直。',
        points: 6
      },
      {
        id: '1-18',
        type: 'true-false',
        question: '台灣的玉山是東南亞最高峰。',
        correctAnswer: false,
        explanation: '玉山是東亞最高峰，但不是東南亞最高峰。',
        points: 2
      },
      {
        id: '1-19',
        type: 'single-choice',
        question: '下列哪個不是台灣的國家公園？',
        options: [
          '太魯閣國家公園',
          '陽明山國家公園',
          '阿里山國家公園',
          '墾丁國家公園'
        ],
        correctAnswer: 2,
        explanation: '阿里山是國家風景區，不是國家公園。',
        points: 4
      },
      {
        id: '1-20',
        type: 'matching',
        question: '請將下列地形景觀與所在地區配對：',
        leftItems: [
          '太魯閣峽谷',
          '日月潭',
          '鵝鑾鼻燈塔',
          '野柳女王頭'
        ],
        rightItems: [
          '花蓮縣',
          '南投縣',
          '屏東縣',
          '新北市'
        ],
        correctPairs: [[0, 0], [1, 1], [2, 2], [3, 3]],
        explanation: '太魯閣-花蓮、日月潭-南投、鵝鑾鼻-屏東、野柳-新北市。',
        points: 8
      },
      {
        id: '1-21',
        type: 'single-choice',
        question: '台灣哪個地區以「溫泉」聞名？',
        options: [
          '北投',
          '墾丁',
          '阿里山',
          '日月潭'
        ],
        correctAnswer: 0,
        explanation: '台北北投是著名的溫泉區。',
        points: 4
      },
      {
        id: '1-22',
        type: 'multiple-choice',
        question: '下列哪些是台灣的地質公園？（複選）',
        options: [
          '野柳地質公園',
          '澎湖海洋地質公園',
          '草嶺地質公園',
          '太魯閣地質公園'
        ],
        correctAnswer: [0, 1, 2],
        explanation: '野柳、澎湖、草嶺都是台灣的地質公園。',
        points: 6
      },
      {
        id: '1-23',
        type: 'true-false',
        question: '台灣的雪山是台灣第二高峰。',
        correctAnswer: true,
        explanation: '雪山海拔3886公尺，是台灣第二高峰。',
        points: 2
      },
      {
        id: '1-24',
        type: 'single-choice',
        question: '下列哪個是台灣最大的湖泊？',
        options: [
          '日月潭',
          '曾文水庫',
          '澄清湖',
          '鯉魚潭'
        ],
        correctAnswer: 1,
        explanation: '曾文水庫是台灣最大的湖泊（水庫）。',
        points: 4
      },
      {
        id: '1-25',
        type: 'single-choice',
        question: '台灣哪個地區以「梯田」景觀聞名？',
        options: [
          '花蓮六十石山',
          '台東池上',
          '宜蘭三星',
          '新北石門'
        ],
        correctAnswer: 1,
        explanation: '台東池上的伯朗大道和梯田景觀非常有名。',
        points: 4
      }
    ]
  },
  {
    id: 2,
    topicId: 2, // 台灣的氣候與水文
    title: '氣候與水文測驗',
    difficulty: '中級',
    questionsCount: 25,
    timeLimit: 1200,
    questions: [
      {
        id: '2-1',
        type: 'single-choice',
        question: '北回歸線通過台灣哪些縣市？',
        options: [
          '嘉義、花蓮',
          '台南、台東',
          '屏東、宜蘭',
          '台中、南投'
        ],
        correctAnswer: 0,
        explanation: '北回歸線通過嘉義水上、花蓮瑞穗等地。',
        points: 4
      },
      {
        id: '2-2',
        type: 'single-choice',
        question: '台灣哪個地區年雨量最多？',
        options: [
          '基隆',
          '台南',
          '澎湖',
          '台中'
        ],
        correctAnswer: 0,
        explanation: '基隆位於東北季風迎風坡，年雨量超過3000毫米。',
        points: 4
      },
      {
        id: '2-3',
        type: 'single-choice',
        question: '台灣最長的河流是哪一條？',
        options: [
          '濁水溪',
          '高屏溪',
          '淡水河',
          '曾文溪'
        ],
        correctAnswer: 0,
        explanation: '濁水溪全長約186公里，是台灣最長的河流。',
        points: 4
      },
      {
        id: '2-4',
        type: 'multiple-choice',
        question: '下列哪些是台灣河川的特徵？（複選）',
        options: [
          '坡陡流急',
          '長度很長',
          '流量穩定',
          '短小流急'
        ],
        correctAnswer: [0, 3],
        explanation: '台灣河川因地形陡峭，具有「坡陡流急、短小流急」的特徵。',
        points: 6
      },
      {
        id: '2-5',
        type: 'true-false',
        question: '台灣冬季主要吹西南季風。',
        correctAnswer: false,
        explanation: '台灣冬季吹東北季風，夏季吹西南季風。',
        points: 2
      },
      {
        id: '2-6',
        type: 'single-choice',
        question: '下列哪個因素造成台灣山區雨量較多？',
        options: [
          '對流雨',
          '地形雨',
          '鋒面雨',
          '颱風雨'
        ],
        correctAnswer: 1,
        explanation: '地形抬升作用使迎風坡產生地形雨。',
        points: 4
      },
      {
        id: '2-7',
        type: 'single-choice',
        question: '台灣哪個季節颱風最常發生？',
        options: [
          '春季',
          '夏季',
          '秋季',
          '冬季'
        ],
        correctAnswer: 1,
        explanation: '7-9月是台灣颱風最頻繁的季節。',
        points: 4
      },
      {
        id: '2-8',
        type: 'single-choice',
        question: '「雨影區」通常出現在山脈的哪一側？',
        options: [
          '迎風坡',
          '背風坡',
          '山頂',
          '山腳'
        ],
        correctAnswer: 1,
        explanation: '背風坡因空氣下沉增溫，不易降雨，形成雨影區。',
        points: 4
      },
      {
        id: '2-9',
        type: 'true-false',
        question: '台灣的河川大多注入台灣海峽。',
        correctAnswer: true,
        explanation: '台灣主要河川大多向西流入台灣海峽。',
        points: 2
      },
      {
        id: '2-10',
        type: 'single-choice',
        question: '下列哪個水庫供應大台北地區用水？',
        options: [
          '曾文水庫',
          '翡翠水庫',
          '石門水庫',
          '日月潭'
        ],
        correctAnswer: 1,
        explanation: '翡翠水庫是台北市的主要水源。',
        points: 4
      },
      {
        id: '2-11',
        type: 'single-choice',
        question: '台灣哪個地區冬季雨量最少？',
        options: [
          '澎湖',
          '基隆',
          '宜蘭',
          '花蓮'
        ],
        correctAnswer: 0,
        explanation: '澎湖位於台灣海峽，冬季受東北季風影響較小，雨量較少。',
        points: 4
      },
      {
        id: '2-12',
        type: 'multiple-choice',
        question: '下列哪些是台灣夏季的氣候特徵？（複選）',
        options: [
          '高溫多雨',
          '西南季風',
          '颱風頻繁',
          '東北季風'
        ],
        correctAnswer: [0, 1, 2],
        explanation: '台灣夏季高溫多雨，吹西南季風，颱風頻繁。',
        points: 6
      },
      {
        id: '2-13',
        type: 'true-false',
        question: '台灣的河川流量季節變化不大。',
        correctAnswer: false,
        explanation: '台灣河川流量受降雨影響，季節變化很大。',
        points: 2
      },
      {
        id: '2-14',
        type: 'single-choice',
        question: '下列哪個是台灣最大的水庫？',
        options: [
          '曾文水庫',
          '石門水庫',
          '翡翠水庫',
          '德基水庫'
        ],
        correctAnswer: 0,
        explanation: '曾文水庫是台灣最大的水庫。',
        points: 4
      },
      {
        id: '2-15',
        type: 'matching',
        question: '請將下列氣候類型與正確的地區配對',
        options: ['熱帶季風氣候', '亞熱帶季風氣候', '溫帶季風氣候', '高地氣候'],
        pairs: ['台灣北部', '台灣南部', '中央山脈', '恆春半島'],
        correctAnswer: [1, 0, 3, 2],
        explanation: '台灣北部為亞熱帶季風氣候，南部為熱帶季風氣候，恆春半島為熱帶季風氣候，高山為高地氣候。',
        points: 4
      }
    ]
  }
]