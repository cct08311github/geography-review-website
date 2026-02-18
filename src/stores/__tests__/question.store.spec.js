import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useQuestionStore } from '../question.store'
import { mockQuestionService } from '@/services/mock-question.service'

describe('Question Store (Refactored)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should lazy load questions on first call', async () => {
    const store = useQuestionStore()
    
    // Mock the service
    const mockData = [{ id: 1, question: 'Mock Q' }]
    vi.spyOn(mockQuestionService, 'generateQuestions').mockReturnValue(mockData)
    
    // First call: Should trigger service
    const questions1 = await store.loadQuestions(1) // Subject 1
    expect(mockQuestionService.generateQuestions).toHaveBeenCalledTimes(1)
    expect(questions1).toHaveLength(1)
    expect(store.subjectQuestions[1]).toHaveLength(1)

    // Second call: Should return from cache (no service call)
    const questions2 = await store.loadQuestions(1)
    expect(mockQuestionService.generateQuestions).toHaveBeenCalledTimes(1) // Still 1
    // In Pinia, the returned value might be a Proxy, so reference equality check (toBe) can fail
    // We check for deep equality instead
    expect(questions2).toStrictEqual(questions1)
  })

  it('should store questions in questionBank map for fast lookup', async () => {
    const store = useQuestionStore()
    const mockData = [{ id: 101, question: 'Q101', subjectId: 2 }]
    vi.spyOn(mockQuestionService, 'generateQuestions').mockReturnValue(mockData)

    await store.loadQuestions(2)
    
    // Verify Map lookup
    const q = store.getQuestionById(101)
    expect(q).toBeDefined()
    expect(q.question).toBe('Q101')
  })

  it('should handle geography (subject 5) using internal loader', async () => {
    const store = useQuestionStore()
    // Subject 5 uses _loadGeographyQuestions, not the mock service
    // We expect it NOT to call mockQuestionService.generateQuestions
    vi.spyOn(mockQuestionService, 'generateQuestions')

    await store.loadQuestions(5)
    
    expect(mockQuestionService.generateQuestions).not.toHaveBeenCalled()
    expect(store.subjectQuestions[5].length).toBeGreaterThan(0) // Should load real data
  })
})
