import type { QuizAnswers } from '../types/quiz'
import { defaultQuizAnswers } from '../types/quiz'

const KEY = 'peptiva-quiz-v1'

export function loadQuiz(): QuizAnswers {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return defaultQuizAnswers()
    const parsed = JSON.parse(raw) as QuizAnswers
    return { ...defaultQuizAnswers(), ...parsed }
  } catch {
    return defaultQuizAnswers()
  }
}

export function saveQuiz(answers: QuizAnswers): void {
  sessionStorage.setItem(KEY, JSON.stringify(answers))
}

export function clearQuiz(): void {
  sessionStorage.removeItem(KEY)
}
