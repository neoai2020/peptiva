import type { Peptide } from '../data/peptides'
import type { QuizAnswers } from '../types/quiz'
import { goalLabel, mainIssueLabel, timelineLabel } from './quizLabels'

/** Short, results-page headline tied to their issue + top SKU. */
export function resultsHeadline(answers: QuizAnswers, primary: Peptide): string {
  const issue = answers.mainIssue ? mainIssueLabel(answers.mainIssue) : 'your priorities'
  return `Based on “${issue}”, your #1 catalogue match is ${primary.sku}.`
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

  if (answers.mainIssue) {
    parts.push(
      `You prioritised ${mainIssueLabel(answers.mainIssue).toLowerCase()} over everything else in the quiz.`,
    )
  }

  if (answers.experience === 'new') {
    parts.push('You said you are newer to research peptides, so we avoided needlessly exotic pairings.')
  } else if (answers.experience === 'advanced') {
    parts.push('You said you are advanced — we allowed stronger pathway matches where they fit your answers.')
  }

  if (answers.inflammation === 'yes') {
    parts.push('Because you flagged inflammation or joint stress, repair-forward SKUs scored higher.')
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
  const t = answers.timeline ? timelineLabel(answers.timeline) : 'your timeline'
  const inf =
    answers.inflammation === 'yes'
      ? 'You flagged inflammation or joint stress.'
      : 'You did not prioritise active inflammation.'
  return `${inf} On timing, you chose ${t}. That is how ${primary.sku} ended up first: ${primary.description}`
}
