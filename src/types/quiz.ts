export type Gender = 'men' | 'women'

export type PrimaryGoal = 'metabolic' | 'recovery' | 'skin_aging' | 'cellular_energy'

export type MetabolicFocus =
  | 'appetite_control'
  | 'triple_pathway'
  | 'recomp_stubborn'

export type RecoveryFocus = 'injury' | 'training' | 'both'

export type SkinFocus = 'collagen_visible' | 'full_regen'

export type CellularFocus = 'mitochondrial' | 'nad_systems'

export type MainIssue =
  | 'stubborn_weight'
  | 'constant_hunger'
  | 'low_energy_crash'
  | 'injury_or_pain'
  | 'slow_recovery'
  | 'skin_hair_aging'
  | 'metabolism_feels_off'
  | 'stress_sleep_focus'

export type Timeline = 'asap' | 'weeks' | 'long_game'

export type Experience = 'new' | 'some' | 'advanced'

export type Inflammation = 'yes' | 'no'

export interface LeadInfo {
  firstName: string
  email: string
  phone: string
}

export interface QuizAnswers {
  gender: Gender | null
  goal: PrimaryGoal | null
  metabolicFocus: MetabolicFocus | null
  recoveryFocus: RecoveryFocus | null
  skinFocus: SkinFocus | null
  cellularFocus: CellularFocus | null
  mainIssue: MainIssue | null
  timeline: Timeline | null
  experience: Experience | null
  inflammation: Inflammation | null
  researchAck: boolean
  lead: LeadInfo | null
}

export const defaultQuizAnswers = (): QuizAnswers => ({
  gender: null,
  goal: null,
  metabolicFocus: null,
  recoveryFocus: null,
  skinFocus: null,
  cellularFocus: null,
  mainIssue: null,
  timeline: null,
  experience: null,
  inflammation: null,
  researchAck: false,
  lead: null,
})
