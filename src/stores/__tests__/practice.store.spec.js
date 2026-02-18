import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePracticeStore } from '../practice.store'
import { useQuestionStore } from '../question.store'

// Mock LocalStorage with 5MB Limit Simulation
const localStorageMock = (function() {
  let store = {};
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      const strVal = value.toString();
      // Calculate current total size
      let currentSize = 0;
      for (let k in store) {
          currentSize += store[k].length;
      }
      
      if (currentSize + strVal.length > MAX_SIZE) {
          throw new Error('QuotaExceededError: DOM Exception 22');
      }
      store[key] = strVal;
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Practice Store (Critical Quality Audit)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    window.localStorage.clear()
    vi.clearAllMocks()
  })

  it('FAIL: Should persist active session on page refresh (Data Loss Check)', async () => {
    const questionStore = useQuestionStore()
    vi.spyOn(questionStore, 'loadQuestions').mockResolvedValue([])
    vi.spyOn(questionStore, 'getRandomQuestions').mockReturnValue([
      { id: 1, question: 'Q1', options: ['A'], answer: 0 }
    ])

    const store = usePracticeStore()
    
    // 1. Start session
    await store.startPracticeSession({ subjectId: 1, mode: 'exam' })
    expect(store.currentSession).toBeTruthy()
    
    // 2. Verify NO persistence happened (White-box test: verify localStorage is empty for active session key)
    // We assume the key would be 'current_practice_session' or similar.
    // Since we know the code DOES NOT persist, we expect this key to be missing.
    const savedSession = window.localStorage.getItem('current_practice_session');
    
    // If savedSession is null, it means data IS LOST on refresh.
    // The previous test logic was flawed because it checked store state directly which might persist in test env.
    // Real test: Can we restore from localStorage?
    
    // Simulate new load
    const newStore = usePracticeStore()
    // Trigger init() or load() if it exists
    // The store calls init() automatically.
    
    // ASSERTION: The active session should be gone in the new store.
    if (!newStore.currentSession) {
         // This confirms the bug exists!
         throw new Error('CRITICAL BUG CONFIRMED: Active session data is LOST. newStore.currentSession is null.');
    }
  })

  it('FAIL: Should handle storage quota limits gracefully (Scalability Check)', () => {
    const store = usePracticeStore()
    
    // 1. Mock massive data (6MB string to force quota error)
    // Using a simple large string to be faster
    const massiveString = new Array(6 * 1024 * 1024).join('a'); 
    
    const massivePayload = {
      id: 1, 
      data: massiveString
    }

    store.wrongQuestions.set(1, { count: 1, lastWrong: new Date().toISOString(), question: massivePayload })

    // 2. Trigger save and expect CRASH
    try {
        store.markQuestionMastered(999) // Triggers saveWrongQuestions
        
        // If we get here, either save didn't happen or mock didn't throw
        // Let's verify if data was saved (it shouldn't be possible)
        const stored = window.localStorage.getItem('wrong_questions');
        if (stored) {
             throw new Error('TEST SETUP ERROR: Mock allowed >5MB storage.');
        }
    } catch (e) {
        if (e.message.includes('QuotaExceededError')) {
             // The system threw an error. 
             // DID THE STORE CATCH IT?
             // In practice.store.js: saveWrongQuestions has try-catch with console.error.
             // So it catches it, but does it warn the user?
             // If it just console.errors, the data is lost silently.
             // For a "Strict Audit", silent data loss is a failure.
             throw new Error(`CRITICAL BUG CONFIRMED: Storage failed with ${e.message}. Data lost silently.`);
        }
        throw e;
    }
  })
})
