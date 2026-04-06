import type { Peptide } from '../data/peptides'
import { PEPTIDES } from '../data/peptides'
import type { QuizAnswers } from '../types/quiz'

export interface RecommendationResult {
  primary: Peptide
  secondary: Peptide | null
  scores: Record<string, number>
}

function scoreFor(answers: QuizAnswers): Record<string, number> {
  const scores: Record<string, number> = {}
  for (const p of PEPTIDES) scores[p.id] = 0

  const add = (id: string, n: number) => {
    if (scores[id] !== undefined) scores[id] += n
  }

  const { goal } = answers
  if (!goal) return scores

  if (goal === 'metabolic') {
    add('17', 4)
    add('2', 4)
    add('3', 3)
    add('18', 3)
    add('1', 2)
  } else if (goal === 'recovery') {
    add('8', 5)
    add('10', 4)
    add('20', 5)
    add('6', 1)
  } else if (goal === 'skin_aging') {
    add('4', 5)
    add('6', 5)
    add('19', 2)
    add('7', 2)
  } else if (goal === 'cellular_energy') {
    add('19', 6)
    add('7', 5)
    add('6', 2)
  }

  if (goal === 'metabolic' && answers.metabolicFocus) {
    switch (answers.metabolicFocus) {
      case 'appetite_control':
        add('3', 5)
        add('18', 5)
        add('2', 3)
        break
      case 'triple_pathway':
        add('17', 8)
        add('2', 4)
        break
      case 'recomp_stubborn':
        add('1', 8)
        add('17', 2)
        break
    }
  }

  if (goal === 'recovery' && answers.recoveryFocus) {
    switch (answers.recoveryFocus) {
      case 'injury':
        add('8', 5)
        add('20', 6)
        break
      case 'training':
        add('10', 5)
        add('8', 2)
        break
      case 'both':
        add('20', 7)
        add('8', 3)
        break
    }
  }

  if (goal === 'skin_aging' && answers.skinFocus) {
    if (answers.skinFocus === 'collagen_visible') {
      add('4', 6)
      add('6', 2)
    } else {
      add('6', 8)
      add('4', 3)
    }
  }

  if (goal === 'cellular_energy' && answers.cellularFocus) {
    if (answers.cellularFocus === 'mitochondrial') {
      add('19', 6)
    } else {
      add('7', 6)
    }
  }

  // Main issue — strongest signal for “what’s wrong”
  if (answers.mainIssue) {
    switch (answers.mainIssue) {
      case 'stubborn_weight':
        add('1', 6)
        add('17', 4)
        add('2', 3)
        break
      case 'constant_hunger':
        add('18', 7)
        add('3', 6)
        add('2', 4)
        break
      case 'low_energy_crash':
        add('19', 6)
        add('7', 6)
        break
      case 'injury_or_pain':
        add('8', 7)
        add('20', 7)
        break
      case 'slow_recovery':
        add('10', 6)
        add('20', 5)
        add('8', 4)
        break
      case 'skin_hair_aging':
        add('4', 7)
        add('6', 6)
        break
      case 'metabolism_feels_off':
        add('17', 5)
        add('2', 5)
        add('19', 3)
        break
      case 'stress_sleep_focus':
        add('7', 5)
        add('19', 4)
        add('4', 2)
        break
    }
  }

  if (answers.timeline === 'asap') {
    add('2', 2)
    add('17', 2)
    add('8', 2)
  } else if (answers.timeline === 'long_game') {
    add('4', 2)
    add('19', 2)
    add('7', 2)
  }

  if (answers.experience === 'new') {
    add('3', 4)
    add('8', 2)
    add('4', 2)
  } else if (answers.experience === 'advanced') {
    add('17', 4)
    add('20', 2)
  }

  if (answers.inflammation === 'yes') {
    add('8', 5)
    add('20', 4)
    add('6', 1)
  }

  return scores
}

function pickTopTwo(
  scores: Record<string, number>,
  answers: QuizAnswers,
): { primary: Peptide; secondary: Peptide | null } {
  const ranked = [...PEPTIDES].sort((a, b) => scores[b.id] - scores[a.id])
  const primary = ranked[0]
  let secondary: Peptide | null = ranked[1]

  if (!secondary || scores[secondary.id] < 1) {
    return { primary, secondary: null }
  }

  const similar =
    primary.tags[0] === secondary.tags[0] &&
    primary.category === secondary.category &&
    Math.abs(scores[primary.id] - scores[secondary.id]) < 3

  if (similar && ranked[2]) {
    secondary = ranked[2]
  }

  if (answers.goal === 'metabolic' && answers.metabolicFocus === 'triple_pathway') {
    if (primary.id === '17' && secondary.id === '2') {
      const alt = PEPTIDES.find((p) => p.id === '18')
      if (alt && scores[alt.id] >= 4) secondary = alt
    }
  }

  return { primary, secondary }
}

export function recommendPeptides(answers: QuizAnswers): RecommendationResult {
  const scores = scoreFor(answers)
  const { primary, secondary } = pickTopTwo(scores, answers)
  return { primary, secondary, scores }
}
