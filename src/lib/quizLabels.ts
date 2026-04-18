import type { QuizAnswers } from '../types/quiz'

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'

export function getExperienceLevel(a: QuizAnswers): ExperienceLevel {
  if (a.duration === 'years' && a.researchOpenness === 'yes_open') return 'advanced'
  if (a.duration === 'over_a_year' && a.researchOpenness === 'yes_open') return 'intermediate'
  if (a.duration === 'just_starting' || a.researchOpenness === 'learn_more') return 'beginner'
  return 'intermediate'
}

export function goalLabel(goal: NonNullable<QuizAnswers['goal']>): string {
  const m: Record<NonNullable<QuizAnswers['goal']>, string> = {
    weight_management: 'Weight management',
    strength_recovery: 'Strength & recovery',
    cellular_repair: 'Cellular repair & anti-aging',
  }
  return m[goal]
}

/** Lowercase phrase for analyse / UX sentences. */
export function goalProfileWord(goal: QuizAnswers['goal']): string {
  if (goal === 'weight_management') return 'weight management'
  if (goal === 'strength_recovery') return 'strength and recovery'
  if (goal === 'cellular_repair') return 'cellular repair and anti-aging'
  return 'focus'
}

/** Human-readable detail line for results, TSL, and voice payloads. */
export function pillarDetailSummary(a: QuizAnswers): string {
  if (a.goal === 'weight_management' && a.weightChallenge) {
    const m: Record<string, string> = {
      cravings: 'Cravings and appetite as the main lever',
      slow_metabolism: 'Slow metabolism and metabolic resistance',
      belly_fat: 'Stubborn fat that won\'t budge',
      yo_yo: 'Weight cycling — losing then regaining',
    }
    return m[a.weightChallenge] ?? 'Weight management'
  }
  if (a.goal === 'strength_recovery' && a.fitnessChallenge) {
    const m: Record<string, string> = {
      soreness: 'Post-training soreness and slow recovery',
      plateau: 'Strength plateau',
      nagging_injury: 'Nagging injury that won\'t heal',
      slower_recovery: 'Age-related recovery decline',
    }
    return m[a.fitnessChallenge] ?? 'Strength & recovery'
  }
  if (a.goal === 'cellular_repair' && a.agingConcern) {
    const m: Record<string, string> = {
      skin: 'Skin changes — wrinkles and firmness',
      energy_mental: 'Energy and mental sharpness decline',
      joint_stiffness: 'Joint stiffness and slower recovery',
      all_of_it: 'Overall aging — wanting to age better',
    }
    return m[a.agingConcern] ?? 'Cellular repair & anti-aging'
  }
  return 'Your category and answers'
}

export function durationLabel(d: NonNullable<QuizAnswers['duration']>): string {
  const m: Record<string, string> = {
    just_starting: 'Just getting started',
    few_months: 'A few months',
    over_a_year: 'Over a year',
    years: 'Years of effort',
  }
  return m[d] ?? d
}

export function energyLabel(e: NonNullable<QuizAnswers['energy']>): string {
  const m: Record<string, string> = {
    great: 'Great energy',
    afternoon_crash: 'Afternoon crashes',
    low_all_day: 'Low all day',
    exhausted: 'Exhausted',
  }
  return m[e] ?? e
}

/** Powerful, benefit-driven headline based on the user's specific challenge. */
export function benefitHeadline(a: QuizAnswers): string {
  if (a.goal === 'weight_management') {
    switch (a.weightChallenge) {
      case 'cravings': return 'Finally Silence the Cravings — Without Willpower'
      case 'slow_metabolism': return 'Kickstart Your Metabolism — Even When Nothing Else Has Worked'
      case 'belly_fat': return 'Target the Stubborn Fat That Diets Can\'t Touch'
      case 'yo_yo': return 'Lose the Weight — And Actually Keep It Off This Time'
    }
  }
  if (a.goal === 'strength_recovery') {
    switch (a.fitnessChallenge) {
      case 'soreness': return 'Wake Up Ready to Train Again — Not Sore for Days'
      case 'plateau': return 'Smash Through Your Plateau and Get Stronger'
      case 'nagging_injury': return 'Heal What\'s Been Holding You Back'
      case 'slower_recovery': return 'Recover Like You Did 10 Years Ago'
    }
  }
  if (a.goal === 'cellular_repair') {
    switch (a.agingConcern) {
      case 'skin': return 'Turn Back the Clock on Your Skin'
      case 'energy_mental': return 'Get Your Energy and Sharpness Back — From the Inside Out'
      case 'joint_stiffness': return 'Move Freely Again — Without the Stiffness'
      case 'all_of_it': return 'Feel Younger, Look Better, Live Sharper'
    }
  }
  return 'Your Personalised Match Is Ready'
}

/** Short benefit descriptor for the hero subheadline. */
export function benefitSubline(_a: QuizAnswers, sku: string, price: number): string {
  return `Your #1 match: ${sku} — now just £${price} with quiz-taker pricing`
}

export function subFocusSummary(a: QuizAnswers): string | null {
  if (a.goal === 'weight_management' && a.weightOutcome) {
    const m: Record<string, string> = {
      lose_5_10: 'Lose 5–10 lbs',
      clothing_size: 'Drop a clothing size',
      major_transform: 'Major transformation',
      stop_gaining: 'Stop gaining',
    }
    return m[a.weightOutcome] ?? null
  }
  if (a.goal === 'strength_recovery' && a.fitnessOutcome) {
    const m: Record<string, string> = {
      pain_free: 'Train pain-free',
      break_plateaus: 'Break plateaus',
      recover_faster: 'Recover faster',
      stay_strong_aging: 'Stay strong with age',
    }
    return m[a.fitnessOutcome] ?? null
  }
  if (a.goal === 'cellular_repair' && a.agingOutcome) {
    const m: Record<string, string> = {
      skin_hair: 'Skin & hair improvements',
      energy_clarity: 'Energy & mental clarity',
      sleep_stress: 'Sleep & stress recovery',
      overall_vitality: 'Overall vitality',
    }
    return m[a.agingOutcome] ?? null
  }
  return null
}
