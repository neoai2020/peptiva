import type { QuizAnswers } from '../types/quiz'

export function goalLabel(goal: NonNullable<QuizAnswers['goal']>): string {
  const m: Record<NonNullable<QuizAnswers['goal']>, string> = {
    metabolic: 'Metabolism & body composition',
    recovery: 'Recovery & training',
    skin_aging: 'Skin & visible aging',
    cellular_energy: 'Energy & cellular health',
  }
  return m[goal]
}

export function mainIssueLabel(issue: NonNullable<QuizAnswers['mainIssue']>): string {
  const m: Record<NonNullable<QuizAnswers['mainIssue']>, string> = {
    stubborn_weight: 'Weight not budging',
    constant_hunger: 'Hunger & cravings',
    low_energy_crash: 'Energy crashes',
    injury_or_pain: 'Pain or a problem area',
    slow_recovery: 'Slow recovery',
    skin_hair_aging: 'Skin / hair aging',
    metabolism_feels_off: 'Metabolism feels off',
    stress_sleep_focus: 'Sleep, stress, or focus',
  }
  return m[issue]
}

export function timelineLabel(t: NonNullable<QuizAnswers['timeline']>): string {
  const m = { asap: 'This month', weeks: 'Next few weeks', long_game: 'Long-term' }
  return m[t]
}

export function experienceLabel(e: NonNullable<QuizAnswers['experience']>): string {
  const m = { new: 'New to research peptides', some: 'Some experience', advanced: 'Advanced' }
  return m[e]
}

export function subFocusSummary(a: QuizAnswers): string | null {
  if (a.goal === 'metabolic' && a.metabolicFocus) {
    const m = {
      appetite_control: 'Appetite & cravings first',
      triple_pathway: 'Stronger metabolic pathways',
      recomp_stubborn: 'Recomposition / stubborn areas',
    }
    return m[a.metabolicFocus]
  }
  if (a.goal === 'recovery' && a.recoveryFocus) {
    const m = { injury: 'Injury or nagging area', training: 'Training bounce-back', both: 'Both' }
    return m[a.recoveryFocus]
  }
  if (a.goal === 'skin_aging' && a.skinFocus) {
    const m = { collagen_visible: 'Skin texture & firmness', full_regen: 'Full renewal stack' }
    return m[a.skinFocus]
  }
  if (a.goal === 'cellular_energy' && a.cellularFocus) {
    const m = { mitochondrial: 'Stamina & mitochondrial angle', nad_systems: 'NAD / energy systems' }
    return m[a.cellularFocus]
  }
  return null
}
