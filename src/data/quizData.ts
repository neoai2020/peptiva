import type { Gender, QuizAnswers } from '../types/quiz'

export interface QuizOption {
  value: string
  label: string
  icon: string
}

export interface QuizStep {
  type: 'question'
  id: string
  title: string
  subtitle: string
  field: keyof QuizAnswers
  image: string
  options: QuizOption[]
  showWhen?: (a: QuizAnswers) => boolean
}

export interface InterstitialScreen {
  type: 'interstitial'
  id: string
  variant: 'story' | 'stat' | 'reveal' | 'tease'
  image: string
  headline: string
  body: string
  cta: string
  badge?: string
  author?: string
}

export type Step = QuizStep | InterstitialScreen

function oneInterstitial(_gender: Gender): InterstitialScreen {
  return {
    type: 'interstitial',
    id: 'inter_trust',
    variant: 'stat',
    image: '/quiz/facts/fact-vial.png',
    badge: 'PHARMACEUTICAL GRADE · VERIFIED',
    headline: 'Your match is already forming.',
    body: 'Based on what you\'ve told us, we\'re narrowing down the best option from our verified UK catalogue — tailored to your goals, not generic advice.',
    cta: 'Continue →',
  }
}

function menQuestions(): QuizStep[] {
  return [
    // Q1 — shared: duration
    {
      type: 'question',
      id: 'duration',
      title: 'How long have you been working toward this goal?',
      subtitle: 'There are no wrong answers — this helps us calibrate.',
      field: 'duration',
      image: '/quiz/men/m-tired.png',
      options: [
        { value: 'just_starting', label: 'Just getting started', icon: '🌱' },
        { value: 'few_months', label: 'A few months', icon: '📅' },
        { value: 'over_a_year', label: 'Over a year, but stuck on a plateau', icon: '⏳' },
        { value: 'years', label: 'Years — I\'ve tried everything', icon: '🔄' },
      ],
    },
    // Q2 — shared: energy
    {
      type: 'question',
      id: 'energy',
      title: 'How would you describe your energy levels right now?',
      subtitle: 'This tells us a lot about what your body actually needs.',
      field: 'energy',
      image: '/quiz/men/m-recovery.png',
      options: [
        { value: 'great', label: 'I feel great, plenty of energy', icon: '⚡' },
        { value: 'afternoon_crash', label: 'Okay, but I crash in the afternoon', icon: '☕' },
        { value: 'low_all_day', label: 'Low most of the day', icon: '🔋' },
        { value: 'exhausted', label: 'Exhausted no matter what I try', icon: '😴' },
      ],
    },
    // Q3 — weight branch
    {
      type: 'question',
      id: 'weight_challenge',
      title: 'What\'s been the hardest part about managing your weight?',
      subtitle: 'Be honest — this is how we find the right fit for you.',
      field: 'weightChallenge',
      image: '/quiz/men/m-weight.png',
      showWhen: (a) => a.goal === 'weight_management',
      options: [
        { value: 'cravings', label: 'Constant cravings and appetite', icon: '🍔' },
        { value: 'slow_metabolism', label: 'Slow metabolism — doesn\'t matter what I eat', icon: '🐢' },
        { value: 'belly_fat', label: 'Belly fat that won\'t budge', icon: '🎯' },
        { value: 'yo_yo', label: 'I lose weight, then gain it all back', icon: '🔄' },
      ],
    },
    // Q3 — strength branch
    {
      type: 'question',
      id: 'fitness_challenge',
      title: 'What\'s your main frustration right now?',
      subtitle: 'This helps us understand what kind of support you need.',
      field: 'fitnessChallenge',
      image: '/quiz/men/m-pain.png',
      showWhen: (a) => a.goal === 'strength_recovery',
      options: [
        { value: 'soreness', label: 'I\'m sore for days after training', icon: '😣' },
        { value: 'plateau', label: 'I\'ve hit a strength plateau', icon: '📊' },
        { value: 'nagging_injury', label: 'A nagging injury that won\'t heal', icon: '🩹' },
        { value: 'slower_recovery', label: 'My body recovers slower than it used to', icon: '⏰' },
      ],
    },
    // Q3 — cellular branch
    {
      type: 'question',
      id: 'aging_concern',
      title: 'What concerns you most about aging?',
      subtitle: 'We\'ll match you to the right solution based on this.',
      field: 'agingConcern',
      image: '/quiz/men/m-aging.png',
      showWhen: (a) => a.goal === 'cellular_repair',
      options: [
        { value: 'skin', label: 'Skin changes — wrinkles, thinning, dullness', icon: '🪞' },
        { value: 'energy_mental', label: 'Less energy and mental sharpness', icon: '🧠' },
        { value: 'joint_stiffness', label: 'Joint stiffness and slower recovery', icon: '🦴' },
        { value: 'all_of_it', label: 'All of it — I want to age better overall', icon: '✨' },
      ],
    },
    // Q4 — weight branch
    {
      type: 'question',
      id: 'weight_approach',
      title: 'Have you tried any of these before?',
      subtitle: 'This helps us avoid recommending something that hasn\'t worked for you.',
      field: 'weightApproach',
      image: '/quiz/men/m-transform.png',
      showWhen: (a) => a.goal === 'weight_management',
      options: [
        { value: 'dieting', label: 'Dieting and calorie counting', icon: '🥗' },
        { value: 'supplements', label: 'Supplements or fat burners', icon: '💊' },
        { value: 'prescription', label: 'Prescription medication', icon: '💉' },
        { value: 'none', label: 'None of the above', icon: '🆕' },
      ],
    },
    // Q4 — strength branch
    {
      type: 'question',
      id: 'activity_level',
      title: 'How many days per week are you active?',
      subtitle: 'More active means your body needs different support.',
      field: 'activityLevel',
      image: '/quiz/men/m-recovery.png',
      showWhen: (a) => a.goal === 'strength_recovery',
      options: [
        { value: '1_2_days', label: '1–2 days', icon: '🚶' },
        { value: '3_4_days', label: '3–4 days', icon: '🏃' },
        { value: '5_6_days', label: '5–6 days', icon: '💪' },
        { value: 'every_day', label: 'Every day', icon: '🔥' },
      ],
    },
    // Q4 — cellular branch
    {
      type: 'question',
      id: 'health_approach',
      title: 'How would you describe your approach to health so far?',
      subtitle: 'This helps us pick the right starting point for you.',
      field: 'healthApproach',
      image: '/quiz/men/m-transform.png',
      showWhen: (a) => a.goal === 'cellular_repair',
      options: [
        { value: 'eat_exercise', label: 'I eat well and exercise regularly', icon: '🥦' },
        { value: 'vitamins', label: 'I take vitamins and supplements', icon: '💊' },
        { value: 'biohacking', label: 'I actively research longevity and biohacking', icon: '🧬' },
        { value: 'just_starting', label: 'Just starting to take it seriously', icon: '🌱' },
      ],
    },
    // Q5 — weight branch
    {
      type: 'question',
      id: 'weight_outcome',
      title: 'What would success look like for you in 90 days?',
      subtitle: 'Dream big or keep it realistic — both are valid.',
      field: 'weightOutcome',
      image: '/quiz/men/m-weight.png',
      showWhen: (a) => a.goal === 'weight_management',
      options: [
        { value: 'lose_5_10', label: 'Lose 5–10 lbs and feel lighter', icon: '🎯' },
        { value: 'clothing_size', label: 'Drop a full clothing size', icon: '👕' },
        { value: 'major_transform', label: 'Major transformation — 20+ lbs', icon: '🚀' },
        { value: 'stop_gaining', label: 'Just stop gaining, honestly', icon: '✋' },
      ],
    },
    // Q5 — strength branch
    {
      type: 'question',
      id: 'fitness_outcome',
      title: 'What does your ideal outcome look like?',
      subtitle: 'This is the last piece we need to lock in your match.',
      field: 'fitnessOutcome',
      image: '/quiz/men/m-pain.png',
      showWhen: (a) => a.goal === 'strength_recovery',
      options: [
        { value: 'pain_free', label: 'Get back to training pain-free', icon: '🎯' },
        { value: 'break_plateaus', label: 'Break through plateaus and get stronger', icon: '📈' },
        { value: 'recover_faster', label: 'Recover faster between sessions', icon: '⚡' },
        { value: 'stay_strong_aging', label: 'Stay active and strong as I age', icon: '🏔️' },
      ],
    },
    // Q5 — cellular branch
    {
      type: 'question',
      id: 'aging_outcome',
      title: 'Where would you like to see results first?',
      subtitle: 'This is the last piece we need to lock in your match.',
      field: 'agingOutcome',
      image: '/quiz/men/m-aging.png',
      showWhen: (a) => a.goal === 'cellular_repair',
      options: [
        { value: 'skin_hair', label: 'Visible improvements in skin and hair', icon: '✨' },
        { value: 'energy_clarity', label: 'More energy and mental clarity', icon: '🧠' },
        { value: 'sleep_stress', label: 'Better sleep and stress recovery', icon: '😴' },
        { value: 'overall_vitality', label: 'Overall vitality — I want to feel younger', icon: '💫' },
      ],
    },
    // Q6 — shared: research openness
    {
      type: 'question',
      id: 'research_openness',
      title: 'One last thing — are you comfortable with research-backed wellness products?',
      subtitle: 'Our recommendations are grounded in published science, not trends.',
      field: 'researchOpenness',
      image: '/quiz/men/m-transform.png',
      options: [
        { value: 'yes_open', label: 'Yes — I\'m open to science-backed solutions', icon: '✅' },
        { value: 'learn_more', label: 'I\'d like to learn more first', icon: '📖' },
      ],
    },
  ]
}

function womenQuestions(): QuizStep[] {
  return [
    // Q1 — shared: duration
    {
      type: 'question',
      id: 'duration',
      title: 'How long have you been working toward this goal?',
      subtitle: 'There are no wrong answers — this helps us calibrate.',
      field: 'duration',
      image: '/quiz/women/f-tired.png',
      options: [
        { value: 'just_starting', label: 'Just getting started', icon: '🌱' },
        { value: 'few_months', label: 'A few months', icon: '📅' },
        { value: 'over_a_year', label: 'Over a year, but stuck on a plateau', icon: '⏳' },
        { value: 'years', label: 'Years — I\'ve tried everything', icon: '🔄' },
      ],
    },
    // Q2 — shared: energy
    {
      type: 'question',
      id: 'energy',
      title: 'How would you describe your energy levels right now?',
      subtitle: 'This tells us a lot about what your body actually needs.',
      field: 'energy',
      image: '/quiz/women/f-recovery.png',
      options: [
        { value: 'great', label: 'I feel great, plenty of energy', icon: '⚡' },
        { value: 'afternoon_crash', label: 'Okay, but I crash in the afternoon', icon: '☕' },
        { value: 'low_all_day', label: 'Low most of the day', icon: '🔋' },
        { value: 'exhausted', label: 'Exhausted no matter what I try', icon: '😴' },
      ],
    },
    // Q3 — weight branch
    {
      type: 'question',
      id: 'weight_challenge',
      title: 'What\'s been the hardest part about managing your weight?',
      subtitle: 'Most women have tried everything. That\'s exactly why this is different.',
      field: 'weightChallenge',
      image: '/quiz/women/f-weight.png',
      showWhen: (a) => a.goal === 'weight_management',
      options: [
        { value: 'cravings', label: 'Constant cravings — they always win', icon: '🍫' },
        { value: 'slow_metabolism', label: 'Slow metabolism — doesn\'t matter what I eat', icon: '🐢' },
        { value: 'belly_fat', label: 'Stubborn areas that won\'t change', icon: '🎯' },
        { value: 'yo_yo', label: 'I lose it, then gain it all back', icon: '🔄' },
      ],
    },
    // Q3 — strength branch
    {
      type: 'question',
      id: 'fitness_challenge',
      title: 'What\'s been your main frustration?',
      subtitle: 'The longer it\'s been, the more your body needs real support.',
      field: 'fitnessChallenge',
      image: '/quiz/women/f-pain.png',
      showWhen: (a) => a.goal === 'strength_recovery',
      options: [
        { value: 'soreness', label: 'I\'m sore for days after every workout', icon: '😣' },
        { value: 'plateau', label: 'I\'ve hit a strength plateau', icon: '📊' },
        { value: 'nagging_injury', label: 'A nagging injury that won\'t fully heal', icon: '🩹' },
        { value: 'slower_recovery', label: 'My body just recovers slower than it used to', icon: '⏰' },
      ],
    },
    // Q3 — cellular branch
    {
      type: 'question',
      id: 'aging_concern',
      title: 'What concerns you most about aging?',
      subtitle: 'We\'ll match you to the right solution based on this.',
      field: 'agingConcern',
      image: '/quiz/women/f-aging.png',
      showWhen: (a) => a.goal === 'cellular_repair',
      options: [
        { value: 'skin', label: 'Skin changes — wrinkles, thinning, dullness', icon: '🪞' },
        { value: 'energy_mental', label: 'Less energy and mental sharpness', icon: '🧠' },
        { value: 'joint_stiffness', label: 'Joint stiffness and slower recovery', icon: '🦴' },
        { value: 'all_of_it', label: 'All of it — I want to age better overall', icon: '✨' },
      ],
    },
    // Q4 — weight branch
    {
      type: 'question',
      id: 'weight_approach',
      title: 'Have you tried any of these before?',
      subtitle: 'This helps us avoid recommending something that hasn\'t worked.',
      field: 'weightApproach',
      image: '/quiz/women/f-transform.png',
      showWhen: (a) => a.goal === 'weight_management',
      options: [
        { value: 'dieting', label: 'Dieting and calorie counting', icon: '🥗' },
        { value: 'supplements', label: 'Supplements or fat burners', icon: '💊' },
        { value: 'prescription', label: 'Prescription medication', icon: '💉' },
        { value: 'none', label: 'None of the above', icon: '🆕' },
      ],
    },
    // Q4 — strength branch
    {
      type: 'question',
      id: 'activity_level',
      title: 'How many days per week are you active?',
      subtitle: 'More active means your body needs different support.',
      field: 'activityLevel',
      image: '/quiz/women/f-recovery.png',
      showWhen: (a) => a.goal === 'strength_recovery',
      options: [
        { value: '1_2_days', label: '1–2 days', icon: '🚶' },
        { value: '3_4_days', label: '3–4 days', icon: '🏃' },
        { value: '5_6_days', label: '5–6 days', icon: '💪' },
        { value: 'every_day', label: 'Every day', icon: '🔥' },
      ],
    },
    // Q4 — cellular branch
    {
      type: 'question',
      id: 'health_approach',
      title: 'How would you describe your approach to health so far?',
      subtitle: 'This helps us pick the right starting point for you.',
      field: 'healthApproach',
      image: '/quiz/women/f-transform.png',
      showWhen: (a) => a.goal === 'cellular_repair',
      options: [
        { value: 'eat_exercise', label: 'I eat well and exercise regularly', icon: '🥦' },
        { value: 'vitamins', label: 'I take vitamins and supplements', icon: '💊' },
        { value: 'biohacking', label: 'I actively research longevity and biohacking', icon: '🧬' },
        { value: 'just_starting', label: 'Just starting to take it seriously', icon: '🌱' },
      ],
    },
    // Q5 — weight branch
    {
      type: 'question',
      id: 'weight_outcome',
      title: 'What would success look like for you in 90 days?',
      subtitle: 'Dream big or keep it realistic — both are valid.',
      field: 'weightOutcome',
      image: '/quiz/women/f-weight.png',
      showWhen: (a) => a.goal === 'weight_management',
      options: [
        { value: 'lose_5_10', label: 'Lose 5–10 lbs and feel lighter', icon: '🎯' },
        { value: 'clothing_size', label: 'Drop a full clothing size', icon: '👗' },
        { value: 'major_transform', label: 'Major transformation — 20+ lbs', icon: '🚀' },
        { value: 'stop_gaining', label: 'Just stop gaining, honestly', icon: '✋' },
      ],
    },
    // Q5 — strength branch
    {
      type: 'question',
      id: 'fitness_outcome',
      title: 'What does your ideal outcome look like?',
      subtitle: 'This is the last piece we need to lock in your match.',
      field: 'fitnessOutcome',
      image: '/quiz/women/f-pain.png',
      showWhen: (a) => a.goal === 'strength_recovery',
      options: [
        { value: 'pain_free', label: 'Get back to training pain-free', icon: '🎯' },
        { value: 'break_plateaus', label: 'Break through plateaus and get stronger', icon: '📈' },
        { value: 'recover_faster', label: 'Recover faster between sessions', icon: '⚡' },
        { value: 'stay_strong_aging', label: 'Stay active and strong as I age', icon: '🏔️' },
      ],
    },
    // Q5 — cellular branch
    {
      type: 'question',
      id: 'aging_outcome',
      title: 'Where would you like to see results first?',
      subtitle: 'This is the last piece we need to lock in your match.',
      field: 'agingOutcome',
      image: '/quiz/women/f-aging.png',
      showWhen: (a) => a.goal === 'cellular_repair',
      options: [
        { value: 'skin_hair', label: 'Visible improvements in skin and hair', icon: '✨' },
        { value: 'energy_clarity', label: 'More energy and mental clarity', icon: '🧠' },
        { value: 'sleep_stress', label: 'Better sleep and stress recovery', icon: '😴' },
        { value: 'overall_vitality', label: 'Overall vitality — I want to feel younger', icon: '💫' },
      ],
    },
    // Q6 — shared: research openness
    {
      type: 'question',
      id: 'research_openness',
      title: 'One last thing — are you comfortable with research-backed wellness products?',
      subtitle: 'Our recommendations are grounded in published science, not trends.',
      field: 'researchOpenness',
      image: '/quiz/women/f-transform.png',
      options: [
        { value: 'yes_open', label: 'Yes — I\'m open to science-backed solutions', icon: '✅' },
        { value: 'learn_more', label: 'I\'d like to learn more first', icon: '📖' },
      ],
    },
  ]
}

export function getQuestions(gender: Gender): QuizStep[] {
  return gender === 'men' ? menQuestions() : womenQuestions()
}

export function buildSteps(gender: Gender, answers: QuizAnswers): Step[] {
  const questions = getQuestions(gender)
  const active = questions.filter((q) => {
    if (q.field === 'goal' && answers.goal) return false
    return !q.showWhen || q.showWhen(answers)
  })
  const trust = oneInterstitial(gender)
  const steps: Step[] = []
  for (let i = 0; i < active.length; i++) {
    steps.push(active[i])
    if (i === 1) steps.push(trust)
  }
  return steps
}

export function getTeaseMessage(
  _answers: QuizAnswers,
  questionNum: number,
  totalQuestions: number,
): string | null {
  const pct = Math.round((questionNum / totalQuestions) * 100)
  if (pct < 25) return null
  if (pct < 45) return '🧬 Analysing your answers...'
  if (pct < 65) return '🔬 A strong match is forming — keep going'
  if (pct < 85) return '🎯 Narrowing to your top match...'
  return '✅ Your personalised result is almost ready'
}
