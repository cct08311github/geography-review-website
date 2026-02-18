import { cap112Social } from './112_social'
import { cap112Chinese } from './112_chinese'
import { cap112English } from './112_english'
import { cap112Math } from './112_math'
import { cap112Science } from './112_science'

// 集中管理歷屆會考題
export const capQuestions = {
  social: [ ...cap112Social ],
  chinese: [ ...cap112Chinese ],
  english: [ ...cap112English ],
  math: [ ...cap112Math ],
  science: [ ...cap112Science ]
}

