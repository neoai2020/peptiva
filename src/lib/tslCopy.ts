import type { Peptide } from '../data/peptides'
import type { QuizAnswers } from '../types/quiz'
import { goalLabel, pillarDetailSummary, durationLabel } from './quizLabels'

/** Short, results-page headline tied to their pillar detail + top SKU. */
export function resultsHeadline(answers: QuizAnswers, primary: Peptide): string {
  const detail = pillarDetailSummary(answers)
  return `Based on "${detail}", your #1 catalogue match is ${primary.sku}.`
}

export function resultsSubhead(answers: QuizAnswers, primary: Peptide): string {
  const g = answers.goal ? goalLabel(answers.goal) : 'your goal'
  return `${primary.compound} fits the ${g} path you selected — here is how we weighted it.`
}

/** 2–3 sentences: purely reflective of quiz fields + peptides. */
export function resultsNarrative(
  answers: QuizAnswers,
  primary: Peptide,
  secondary: Peptide | null,
): string {
  const parts: string[] = []

  if (answers.goal) {
    parts.push(
      `You chose ${goalLabel(answers.goal)} and told us: ${pillarDetailSummary(answers).toLowerCase()}.`,
    )
  }

  if (answers.duration === 'just_starting') {
    parts.push('You\'re just getting started, so we prioritised gentler, well-documented options.')
  } else if (answers.duration === 'years') {
    parts.push('You\'ve been at this for years — we allowed stronger, more advanced matches.')
  }

  if (answers.energy === 'exhausted' || answers.energy === 'low_all_day') {
    parts.push('Because you flagged low energy, compounds with recovery and energy support scored higher.')
  }

  parts.push(
    `Top pick: ${primary.sku} — ${primary.tagline}${secondary ? ` Secondary: ${secondary.sku} complements this stack without duplicating the same mechanism.` : ''}`,
  )

  return parts.join(' ')
}

export function headlineFor(answers: QuizAnswers, primary: Peptide): string {
  return resultsHeadline(answers, primary)
}

export function subheadFor(answers: QuizAnswers, primary: Peptide): string {
  return resultsSubhead(answers, primary)
}

export function storyParagraph(answers: QuizAnswers, primary: Peptide): string {
  const dur = answers.duration ? durationLabel(answers.duration) : 'your timeline'
  const energyNote =
    answers.energy === 'exhausted' || answers.energy === 'low_all_day'
      ? 'You flagged significant fatigue, which boosted recovery-forward compounds.'
      : 'Energy was not a primary signal for your profile.'
  return `${energyNote} On your journey, you said: ${dur.toLowerCase()}. That is how ${primary.sku} ended up first: ${primary.description}`
}
