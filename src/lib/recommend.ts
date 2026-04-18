import type { Peptide } from '../data/peptides'
import { PEPTIDES } from '../data/peptides'
import type { PrimaryGoal, QuizAnswers } from '../types/quiz'

export interface RecommendationResult {
  primary: Peptide
  secondary: Peptide | null
  scores: Record<string, number>
}

const PILLAR_CATEGORY: Record<PrimaryGoal, string> = {
  weight_management: 'Weight management',
  strength_recovery: 'Strength & recovery',
  cellular_repair: 'Cellular repair & anti-aging',
}

function inPillar(p: Peptide, goal: PrimaryGoal): boolean {
  return p.category === PILLAR_CATEGORY[goal]
}

function scoreFor(answers: QuizAnswers): Record<string, number> {
  const scores: Record<string, number> = {}
  for (const p of PEPTIDES) scores[p.id] = 0

  const add = (id: string, n: number) => {
    if (scores[id] === undefined) return
    const p = PEPTIDES.find((x) => x.id === id)
    if (p && answers.goal && inPillar(p, answers.goal)) scores[id] += n
  }

  const { goal } = answers
  if (!goal) return scores

  /* ═══════════ WEIGHT MANAGEMENT ═══════════
     Products: Reta (17), Reta 2.0 (21), Tirzepatide (2), Cagrilintide (18)
     Removed: Semaglutide → redirected to Cagrilintide/Tirzepatide
              HGH Fragment → redirected to Reta
  */
  if (goal === 'weight_management') {
    switch (answers.duration) {
      case 'just_starting': add('18', 4); add('2', 3); break
      case 'few_months':    add('2', 3); add('18', 2); break
      case 'over_a_year':   add('2', 3); add('17', 3); break
      case 'years':         add('17', 4); add('21', 5); add('2', 2); break
    }
    switch (answers.energy) {
      case 'afternoon_crash': add('2', 2); break
      case 'low_all_day':     add('17', 2); add('21', 2); break
      case 'exhausted':       add('17', 3); add('21', 3); break
    }
    switch (answers.weightChallenge) {
      case 'cravings':        add('18', 5); add('2', 4); break
      case 'slow_metabolism':  add('17', 5); add('21', 4); add('2', 3); break
      case 'belly_fat':       add('17', 5); add('21', 3); add('2', 2); break
      case 'yo_yo':           add('17', 4); add('2', 3); add('18', 2); break
    }
    switch (answers.weightApproach) {
      case 'dieting':      add('2', 3); add('18', 3); break
      case 'supplements':  add('17', 3); add('2', 3); break
      case 'prescription': add('17', 4); add('21', 4); add('2', 2); break
      case 'none':         add('18', 5); add('2', 3); break
    }
    switch (answers.weightOutcome) {
      case 'lose_5_10':        add('18', 4); add('2', 3); break
      case 'clothing_size':    add('2', 4); add('17', 3); break
      case 'major_transform':  add('17', 5); add('21', 6); add('2', 2); break
      case 'stop_gaining':     add('18', 4); add('2', 3); break
    }
  }

  /* ═══════════ STRENGTH & RECOVERY ═══════════
     Products: BPC157 (8), TB500 (10), Wolverine (20)
  */
  if (goal === 'strength_recovery') {
    switch (answers.duration) {
      case 'just_starting': add('8', 4); break
      case 'few_months':    add('8', 3); add('10', 2); break
      case 'over_a_year':   add('20', 3); add('8', 2); break
      case 'years':         add('20', 5); break
    }
    switch (answers.energy) {
      case 'afternoon_crash': add('10', 1); break
      case 'low_all_day':     add('20', 2); break
      case 'exhausted':       add('20', 3); break
    }
    switch (answers.fitnessChallenge) {
      case 'soreness':         add('10', 5); add('8', 3); break
      case 'plateau':          add('10', 4); add('8', 3); break
      case 'nagging_injury':   add('8', 5); add('20', 4); break
      case 'slower_recovery':  add('20', 4); add('10', 3); break
    }
    switch (answers.activityLevel) {
      case '1_2_days':  add('8', 3); break
      case '3_4_days':  add('8', 3); add('10', 3); break
      case '5_6_days':  add('10', 4); add('20', 3); break
      case 'every_day': add('20', 5); add('10', 2); break
    }
    switch (answers.fitnessOutcome) {
      case 'pain_free':        add('8', 5); add('20', 3); break
      case 'break_plateaus':   add('10', 4); add('8', 3); break
      case 'recover_faster':   add('10', 4); add('20', 3); break
      case 'stay_strong_aging': add('20', 5); add('8', 2); break
    }
  }

  /* ═══════════ CELLULAR REPAIR & ANTI-AGING ═══════════
     Products: Glow (6), GHKCU (4), MOTC (19), NAD 1000mg (7)
  */
  if (goal === 'cellular_repair') {
    switch (answers.duration) {
      case 'just_starting': add('4', 4); break
      case 'few_months':    add('4', 3); add('19', 2); break
      case 'over_a_year':   add('6', 3); add('7', 2); break
      case 'years':         add('6', 5); add('7', 2); break
    }
    switch (answers.energy) {
      case 'afternoon_crash': add('19', 3); add('7', 2); break
      case 'low_all_day':     add('7', 4); add('19', 3); break
      case 'exhausted':       add('7', 5); add('19', 3); break
    }
    switch (answers.agingConcern) {
      case 'skin':            add('4', 5); add('6', 3); break
      case 'energy_mental':   add('19', 5); add('7', 4); break
      case 'joint_stiffness': add('6', 4); add('4', 3); break
      case 'all_of_it':       add('6', 6); add('7', 3); add('4', 2); break
    }
    switch (answers.healthApproach) {
      case 'eat_exercise':  add('4', 3); add('19', 2); break
      case 'vitamins':      add('19', 3); add('7', 3); break
      case 'biohacking':    add('6', 4); add('7', 3); break
      case 'just_starting': add('4', 4); add('19', 3); break
    }
    switch (answers.agingOutcome) {
      case 'skin_hair':         add('4', 5); add('6', 3); break
      case 'energy_clarity':    add('19', 5); add('7', 4); break
      case 'sleep_stress':      add('7', 4); add('19', 3); break
      case 'overall_vitality':  add('6', 6); add('7', 3); add('4', 2); break
    }
  }

  return scores
}

function pickTopTwo(
  scores: Record<string, number>,
  answers: QuizAnswers,
): { primary: Peptide; secondary: Peptide | null } {
  const goal = answers.goal
  if (!goal) {
    const ranked = [...PEPTIDES].sort((a, b) => scores[b.id] - scores[a.id])
    return { primary: ranked[0], secondary: ranked[1] ?? null }
  }

  const cat = PILLAR_CATEGORY[goal]
  const inCat = PEPTIDES.filter((p) => p.category === cat)
  const ranked = [...inCat].sort((a, b) => scores[b.id] - scores[a.id])
  const primary = ranked[0]
  let secondary: Peptide | null = ranked[1] ?? null

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

  return { primary, secondary }
}

export function recommendPeptides(answers: QuizAnswers): RecommendationResult {
  const scores = scoreFor(answers)
  const { primary, secondary } = pickTopTwo(scores, answers)
  return { primary, secondary, scores }
}
