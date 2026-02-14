// 台灣地理會考練習題庫 - 近5年題型整理
// 專為15歲國三學生設計

export const geographyQuizzes = [
  {
    id: 1,
    topicId: 1, // 台灣的地形與海岸
    title: '台灣地形基礎測驗',
    difficulty: '初級',
    questionsCount: 10,
    timeLimit: 600, // 秒數
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
        points: 10
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
        points: 10
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
        points: 10
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
        points: 15
      },
      {
        id: '1-5',
        type: 'true-false',
        question: '台灣的海岸山脈位於西部沿海地區。',
        correctAnswer: false,
        explanation: '海岸山脈位於台灣東部，台東縱谷以東。',
        points: 5
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
        points: 10
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
        points: 20
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
        points: 10
      },
      {
        id: '1-9',
        type: 'true-false',
        question: '台灣的海岸線長度約為1500公里。',
        correctAnswer: true,
        explanation: '台灣本島海岸線總長約1140公里，加上離島約1500公里。',
        points: 5
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
        points: 10
      }
    ]
  },
  {
    id: 2,
    topicId: 2, // 台灣的氣候與水文
    title: '氣候與水文測驗',
    difficulty: '中級',
    questionsCount: 10,
    timeLimit: 600,
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
        points: 10
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
        points: 10
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
        points: 10
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
        points: 15
      },
      {
        id: '2-5',
        type: 'true-false',
        question: '台灣冬季主要吹西南季風。',
        correctAnswer: false,
        explanation: '台灣冬季吹東北季風，夏季吹西南季風。',
        points: 5
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
        points: 10
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
        points: 10
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
        points: 10
      },
      {
        id: '2-9',
        type: 'true-false',
        question: '台灣的河川大多注入台灣海峽。',
        correctAnswer: true,
        explanation: '台灣主要河川大多向西流入台灣海峽。',
        points: 5
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
        points: 10
      }
    ]
  },
  {
    id: 3,
    topicId: 3, // 台灣的產業發展
    title: '產業發展測驗',
    difficulty: '中級',
    questionsCount: 8,
    timeLimit: 480,
    questions: [
      {
        id: '3-1',
        type: 'single-choice',
        question: '台灣第一個科學園區位於哪裡？',
        options: [
          '新竹',
          '台南',
          '台中',
          '台北'
        ],
        correctAnswer: 0,
        explanation: '新竹科學園區成立於1980年，是台灣第一個科學園區。',
        points: 10
      },
      {
        id: '3-2',
        type: 'single-choice',
        question: '下列哪項不是台灣精緻農業的例子？',
        options: [
          '蘭花培育',
          '有機蔬菜',
          '大規模稻作',
          '觀光果園'
        ],
        correctAnswer: 2,
        explanation: '大規模稻作是傳統農業，不屬於精緻農業。',
        points: 10
      },
      {
        id: '3-3',
        type: 'single-choice',
        question: '台灣哪個城市以重工業聞名？',
        options: [
          '高雄',
          '台北',
          '台中',
          '台南'
        ],
        correctAnswer: 0,
        explanation: '高雄有中鋼、中油等重工業工廠。',
        points: 10
      },
      {
        id: '3-4',
        type: 'multiple-choice',
        question: '下列哪些是台灣服務業的項目？（複選）',
        options: [
          '金融業',
          '觀光業',
          '半導體製造',
          '餐飲業'
        ],
        correctAnswer: [0, 1, 3],
        explanation: '半導體製造屬於工業（二級產業）。',
        points: 15
      },
      {
        id: '3-5',
        type: 'true-false',
        question: '台灣的經濟目前以農業為主。',
        correctAnswer: false,
        explanation: '台灣經濟以工業和服務業為主，農業占比很小。',
        points: 5
      },
      {
        id: '3-6',
        type: 'single-choice',
        question: '台灣哪個地區以「茶葉」聞名？',
        options: [
          '南投鹿谷',
          '高雄美濃',
          '屏東恆春',
          '花蓮玉里'
        ],
        correctAnswer: 0,
        explanation: '南投鹿谷的凍頂烏龍茶非常有名。',
        points: 10
      },
      {
        id: '3-7',
        type: 'single-choice',
        question: '「台積電」主要生產什麼產品？',
        options: [
          '鋼鐵',
          '半導體',
          '塑膠',
          '紡織品'
        ],
        correctAnswer: 1,
        explanation: '台積電是全球最大的半導體代工廠。',
        points: 10
      },
      {
        id: '3-8',
        type: 'single-choice',
        question: '台灣哪個港口是國際貨櫃轉運中心？',
        options: [
          '高雄港',
          '基隆港',
          '花蓮港',
          '台中港'
        ],
        correctAnswer: 0,
        explanation: '高雄港是世界重要的貨櫃港口之一。',
        points: 10
      }
    ]
  },
  {
    id: 4,
    topicId: 4, // 台灣的人口與都市
    title: '人口與都市測驗',
    difficulty: '初級',
    questionsCount: 8,
    timeLimit: 480,
    questions: [
      {
        id: '4-1',
        type: 'single-choice',
        question: '台灣人口最密集的都市是哪個？',
        options: [
          '台北市',
          '新北市',
          '高雄市',
          '台中市'
        ],
        correctAnswer: 0,
        explanation: '台北市人口密度每平方公里約9000人，是全台最高。',
        points: 10
      },
      {
        id: '4-2',
        type: 'single-choice',
        question: '台灣目前面臨的主要人口問題是什麼？',
        options: [
          '人口過多',
          '人口老化',
          '人口太年輕',
          '性別比例失衡'
        ],
        correctAnswer: 1,
        explanation: '少子化與高齡化是台灣嚴重的人口問題。',
        points: 10
      },
      {
        id: '4-3',
        type: 'single-choice',
        question: '台灣高速鐵路連接哪兩個主要城市？',
        options: [
          '台北-高雄',
          '基隆-屏東',
          '花蓮-台東',
          '金門-馬祖'
        ],
        correctAnswer: 0,
        explanation: '高鐵連接台北與高雄，全長約350公里。',
        points: 10
      },
      {
        id: '4-4',
        type: 'multiple-choice',
        question: '下列哪些是台灣的國際機場？（複選）',
        options: [
          '桃園國際機場',
          '松山機場',
          '高雄小港機場',
          '台東機場'
        ],
        correctAnswer: [0, 1, 2],
        explanation: '桃園、松山、高雄小港都是國際機場。',
        points: 15
      },
      {
        id: '4-5',
        type: 'true-false',
        question: '台灣的人口分布非常平均。',
        correctAnswer: false,
        explanation: '台灣人口主要集中在西部平原，東部人口稀少。',
        points: 5
      },
      {
        id: '4-6',
        type: 'single-choice',
        question: '台灣哪個都市以「古都」聞名？',
        options: [
          '台南市',
          '台北市',
          '台中市',
          '高雄市'
        ],
        correctAnswer: 0,
        explanation: '台南是台灣歷史最悠久的都市。',
        points: 10
      },
      {
        id: '4-7',
        type: 'single-choice',
        question: '下列哪個不是台灣的交通問題？',
        options: [
          '塞車',
          '停車位不足',
          '大眾運輸太發達',
          '空氣污染'
        ],
        correctAnswer: 2,
        explanation: '大眾運輸發達是優點，不是問題。',
        points: 10
      },
      {
        id: '4-8',
        type: 'single-choice',
        question: '台灣哪個縣市人口最少？',
        options: [
          '連江縣',
          '澎湖縣',
          '嘉義縣',
          '花蓮縣'
        ],
        correctAnswer: 0,
        explanation: '連江縣（馬祖）人口約1.3萬人，是全台最少。',
        points: 10
      }
    ]
  },
  {
    id: 5,
    topicId: 5, // 台灣的區域發展
    title: '區域發展綜合測驗',
    difficulty: '高級',
    questionsCount: 12,
    timeLimit: 720,
    questions: [
      {
        id: '5-1',
        type: 'single-choice',
        question: '台灣哪個區域以高科技產業聞名？',
        options: [
          '北部區域',
          '中部區域',
          '南部區域',
          '東部區域'
        ],
        correctAnswer: 0,
        explanation: '北部區域有新竹科學園區，是台灣高科技產業重鎮。',
        points: 10
      },
      {
        id: '5-2',
        type: 'single-choice',
        question: '下列哪個區域以「精密機械」聞名？',
        options: [
          '中部區域',
          '北部區域',
          '南部區域',
          '東部區域'
        ],
        correctAnswer: 0,
        explanation: '中部區域（尤其是台中）是精密機械產業聚集地。',
        points: 10
      },
      {
        id: '5-3',
        type: 'single-choice',
        question: '台灣哪個區域的自然景觀最為豐富？',
        options: [
          '東部區域',
          '北部區域',
          '中部區域',
          '南部區域'
        ],
        correctAnswer: 0,
        explanation: '東部區域有太魯閣、花東縱谷等自然景觀。',
        points: 10
      },
      {
        id: '5-4',
        type: 'multiple-choice',
        question: '下列哪些是東部區域的發展限制？（複選）',
        options: [
          '交通不便',
          '人口外流',
          '工業污染嚴重',
          '土地資源不足'
        ],
        correctAnswer: [0, 1],
        explanation: '東部區域因交通不便導致發展受限，人口外流嚴重。',
        points: 15
      },
      {
        id: '5-5',
        type: 'true-false',
        question: '南部區域的農業以熱帶作物為主。',
        correctAnswer: true,
        explanation: '南部區域氣候溫暖，適合種植芒果、蓮霧等熱帶水果。',
        points: 5
      },
      {
        id: '5-6',
        type: 'single-choice',
        question: '台灣哪個區域的「原住民文化」最豐富？',
        options: [
          '東部區域',
          '北部區域',
          '中部區域',
          '南部區域'
        ],
        correctAnswer: 0,
        explanation: '東部區域是原住民人口比例最高的地區。',
        points: 10
      },
      {
        id: '5-7',
        type: 'single-choice',
        question: '下列哪個不是北部區域的發展問題？',
        options: [
          '房價過高',
          '空氣污染',
          '交通擁擠',
          '農業技術落後'
        ],
        correctAnswer: 3,
        explanation: '北部區域農業占比較小，農業技術落後不是主要問題。',
        points: 10
      },
      {
        id: '5-8',
        type: 'single-choice',
        question: '中部區域的主要農業產品是什麼？',
        options: [
          '稻米',
          '茶葉',
          '甘蔗',
          '花卉'
        ],
        correctAnswer: 0,
        explanation: '中部區域是台灣重要的稻米產區。',
        points: 10
      },
      {
        id: '5-9',
        type: 'true-false',
        question: '南部區域有台灣最大的國際港口。',
        correctAnswer: true,
        explanation: '高雄港是台灣最大的國際港口。',
        points: 5
      },
      {
        id: '5-10',
        type: 'single-choice',
        question: '台灣哪個區域的「溫泉資源」最豐富？',
        options: [
          '北部區域',
          '中部區域',
          '南部區域',
          '東部區域'
        ],
        correctAnswer: 0,
        explanation: '北部區域的北投、陽明山等地溫泉資源豐富。',
        points: 10
      },
      {
        id: '5-11',
        type: 'single-choice',
        question: '下列哪個區域的「太陽能發電」潛力最大？',
        options: [
          '南部區域',
          '北部區域',
          '中部區域',
          '東部區域'
        ],
        correctAnswer: 0,
        explanation: '南部區域日照時數長，太陽能發電潛力最大。',
        points: 10
      },
      {
        id: '5-12',
        type: 'matching',
        question: '請將區域與其核心都市配對：',
        leftItems: [
          '北部區域',
          '中部區域',
          '南部區域',
          '東部區域'
        ],
        rightItems: [
          '高雄市',
          '台北市',
          '花蓮市',
          '台中市'
        ],
        correctPairs: [[0, 1], [1, 3], [2, 0], [3, 2]],
        explanation: '北部-台北、中部-台中、南部-高雄、東部-花蓮。',
        points: 20
      }
    ]
  }
]

// 按主題獲取測驗
export function getQuizzesByTopic(topicId) {
  return geographyQuizzes.filter(quiz => quiz.topicId === topicId)
}

// 獲取所有測驗
export function getAllQuizzes() {
  return geographyQuizzes
}

// 獲取測驗總數
export function getTotalQuizzes() {
  return geographyQuizzes.length
}

// 計算測驗總題數
export function getTotalQuestions() {
  return geographyQuizzes.reduce((total, quiz) => total + quiz.questionsCount, 0)
}