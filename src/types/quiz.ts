export type Gender = 'men' | 'women'

/** Three Apex catalog pillars — set on home before quiz. */
export type PrimaryGoal = 'weight_management' | 'strength_recovery' | 'cellular_repair'

/** Q1 shared — how long working toward this goal */
export type Duration = 'just_starting' | 'few_months' | 'over_a_year' | 'years'

/** Q2 shared — current energy levels */
export type EnergyLevel = 'great' | 'afternoon_crash' | 'low_all_day' | 'exhausted'

/** Q3 weight branch */
export type WeightChallenge = 'cravings' | 'slow_metabolism' | 'belly_fat' | 'yo_yo'

/** Q3 strength branch */
export type FitnessChallenge = 'soreness' | 'plateau' | 'nagging_injury' | 'slower_recovery'

/** Q3 cellular branch */
export type AgingConcern = 'skin' | 'energy_mental' | 'joint_stiffness' | 'all_of_it'

/** Q4 weight branch */
export type WeightApproach = 'dieting' | 'supplements' | 'prescription' | 'none'

/** Q4 strength branch */
export type ActivityLevel = '1_2_days' | '3_4_days' | '5_6_days' | 'every_day'

/** Q4 cellular branch */
export type HealthApproach = 'eat_exercise' | 'vitamins' | 'biohacking' | 'just_starting'

/** Q5 weight branch */
export type WeightOutcome = 'lose_5_10' | 'clothing_size' | 'major_transform' | 'stop_gaining'

/** Q5 strength branch */
export type FitnessOutcome = 'pain_free' | 'break_plateaus' | 'recover_faster' | 'stay_strong_aging'

/** Q5 cellular branch */
export type AgingOutcome = 'skin_hair' | 'energy_clarity' | 'sleep_stress' | 'overall_vitality'

/** Q6 shared — research acknowledgment gate */
export type ResearchOpenness = 'yes_open' | 'learn_more'

export interface LeadInfo {
  firstName: string
  email: string
  phone: string
}

export interface QuizAnswers {
  gender: Gender | null
  goal: PrimaryGoal | null
  duration: Duration | null
  energy: EnergyLevel | null
  weightChallenge: WeightChallenge | null
  fitnessChallenge: FitnessChallenge | null
  agingConcern: AgingConcern | null
  weightApproach: WeightApproach | null
  activityLevel: ActivityLevel | null
  healthApproach: HealthApproach | null
  weightOutcome: WeightOutcome | null
  fitnessOutcome: FitnessOutcome | null
  agingOutcome: AgingOutcome | null
  researchOpenness: ResearchOpenness | null
  researchAck: boolean
  lead: LeadInfo | null
}

export const defaultQuizAnswers = (): QuizAnswers => ({
  gender: null,
  goal: null,
  duration: null,
  energy: null,
  weightChallenge: null,
  fitnessChallenge: null,
  agingConcern: null,
  weightApproach: null,
  activityLevel: null,
  healthApproach: null,
  weightOutcome: null,
  fitnessOutcome: null,
  agingOutcome: null,
  researchOpenness: null,
  researchAck: false,
  lead: null,
})
