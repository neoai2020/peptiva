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

function menInterstitials(): InterstitialScreen[] {
  return [
    {
      type: 'interstitial',
      id: 'inter_story',
      variant: 'story',
      image: '/quiz/men/m-beforeafter.png',
      badge: 'REAL PEPTIVA CUSTOMER',
      headline: '"I lost 11kg in 8 weeks — after years of nothing working."',
      body: 'Mark, 41, from Leeds tried every diet going. Nothing stuck. After his Peptiva match, he started seeing changes in week 2. By week 8, his mates barely recognised him. Same gym routine. Same meals. Different compound.',
      author: 'Mark D. — Leeds, UK',
      cta: 'Let\'s find yours →',
    },
    {
      type: 'interstitial',
      id: 'inter_stat',
      variant: 'stat',
      image: '/quiz/facts/fact-vial.png',
      badge: '99.3% PURITY · THIRD-PARTY VERIFIED',
      headline: '92% of Peptiva customers see visible results in 30 days.',
      body: 'Every compound is third-party lab tested with 99.3%+ verified purity. That\'s not luck — that\'s what happens when you use pharmaceutical-grade peptides matched to YOUR body.',
      cta: 'Almost there →',
    },
    {
      type: 'interstitial',
      id: 'inter_tease',
      variant: 'tease',
      image: '/quiz/facts/fact-dna.png',
      badge: 'YOUR PROTOCOL IS FORMING',
      headline: 'We\'re already building something for you.',
      body: 'Our algorithm is scoring 12 compounds against your profile. A strong match is forming. Just 2–3 more questions and we\'ll lock in your personalised protocol — including your dosing guide and a quiz-taker discount.',
      cta: 'Keep going →',
    },
    {
      type: 'interstitial',
      id: 'inter_reveal',
      variant: 'reveal',
      image: '/quiz/facts/fact-shield.png',
      badge: 'YOUR MATCH IS ALMOST READY',
      headline: 'Last step — one more answer to lock in your #1 match.',
      body: 'You\'re seconds away from your personalised results — your #1 compound, custom dosing protocol, and exclusive pricing. Plus, every order includes access to Peptiva Concierge, where a certified practitioner guides your protocol.',
      cta: 'Finish & see my match →',
    },
  ]
}

function womenInterstitials(): InterstitialScreen[] {
  return [
    {
      type: 'interstitial',
      id: 'inter_story',
      variant: 'story',
      image: '/quiz/women/f-beforeafter.png',
      badge: 'REAL PEPTIVA CUSTOMER',
      headline: '"My skin is glowing and I\'ve dropped 2 dress sizes. I wish I\'d found this sooner."',
      body: 'Sophie, 36, from Bristol had tried creams, supplements, and calorie counting for years. After her Peptiva match, she noticed firmer skin in week 1 and steady weight loss by week 3. She said it was the first thing that actually worked.',
      author: 'Sophie R. — Bristol, UK',
      cta: 'Let\'s find yours →',
    },
    {
      type: 'interstitial',
      id: 'inter_stat',
      variant: 'stat',
      image: '/quiz/facts/fact-vial.png',
      badge: '99.3% PURITY · THIRD-PARTY VERIFIED',
      headline: '92% of Peptiva customers see visible results in 30 days.',
      body: 'Every compound is third-party lab tested with 99.3%+ verified purity. Not from guessing. Not from another fad. From pharmaceutical-grade peptides matched to your specific body and goals.',
      cta: 'Almost there →',
    },
    {
      type: 'interstitial',
      id: 'inter_tease',
      variant: 'tease',
      image: '/quiz/facts/fact-dna.png',
      badge: 'YOUR PROTOCOL IS FORMING',
      headline: 'We\'re already building something for you.',
      body: 'Our algorithm is scoring 12 compounds against your profile. We\'re narrowing it down. Just 2–3 more questions and we\'ll have your personalised results — including dosing guide and an exclusive quiz-taker discount.',
      cta: 'Keep going →',
    },
    {
      type: 'interstitial',
      id: 'inter_reveal',
      variant: 'reveal',
      image: '/quiz/facts/fact-shield.png',
      badge: 'YOUR MATCH IS ALMOST READY',
      headline: 'Last step — one more answer to lock in your perfect match.',
      body: 'You\'re seconds away from your personalised results — your #1 compound, custom protocol, and exclusive pricing. Plus, every order includes Peptiva Concierge access, where a certified practitioner guides your journey.',
      cta: 'Finish & see my match →',
    },
  ]
}

function menQuestions(): QuizStep[] {
  return [
    {
      type: 'question',
      id: 'goal',
      title: "What would you fix about your body if you could?",
      subtitle: 'Be honest. There are no wrong answers — just a better match.',
      field: 'goal',
      image: '/quiz/men/m-tired.png',
      options: [
        { value: 'metabolic', label: 'I\'d lose this stubborn weight for good', icon: '🔥' },
        { value: 'recovery', label: 'I\'d get rid of the pain and recover faster', icon: '💪' },
        { value: 'skin_aging', label: 'I\'d look 10 years younger', icon: '✨' },
        { value: 'cellular_energy', label: 'I\'d have real energy again — all day', icon: '⚡' },
      ],
    },
    {
      type: 'question',
      id: 'focus_metabolic',
      title: "What have you already tried for your weight?",
      subtitle: 'Most men have tried everything. That\'s exactly why peptides work differently.',
      field: 'metabolicFocus',
      image: '/quiz/men/m-weight.png',
      showWhen: (a) => a.goal === 'metabolic',
      options: [
        { value: 'appetite_control', label: 'Diets — but the hunger always wins', icon: '🍔' },
        { value: 'triple_pathway', label: 'Gym & clean eating — but nothing shifts', icon: '⚖️' },
        { value: 'recomp_stubborn', label: 'Cardio, weights, everything — still soft', icon: '🎯' },
      ],
    },
    {
      type: 'question',
      id: 'focus_recovery',
      title: "How long have you been dealing with this?",
      subtitle: 'The longer it\'s been, the more your body needs targeted support — not rest.',
      field: 'recoveryFocus',
      image: '/quiz/men/m-pain.png',
      showWhen: (a) => a.goal === 'recovery',
      options: [
        { value: 'injury', label: 'Months or years — an injury that won\'t go', icon: '🩹' },
        { value: 'training', label: 'Every workout — I\'m wrecked for days after', icon: '🏋️' },
        { value: 'both', label: 'Both — chronic pain AND slow recovery', icon: '😤' },
      ],
    },
    {
      type: 'question',
      id: 'focus_skin',
      title: "When did you first notice the aging?",
      subtitle: 'Most men ignore it until it\'s obvious. There\'s a compound for both stages.',
      field: 'skinFocus',
      image: '/quiz/men/m-aging.png',
      showWhen: (a) => a.goal === 'skin_aging',
      options: [
        { value: 'collagen_visible', label: 'Recently — fine lines and tired-looking skin', icon: '🪞' },
        { value: 'full_regen', label: 'A while — face, hair, skin, all declining', icon: '🧬' },
      ],
    },
    {
      type: 'question',
      id: 'focus_cellular',
      title: "How badly is the tiredness affecting your life?",
      subtitle: 'This isn\'t laziness — it\'s a signal your cells need help.',
      field: 'cellularFocus',
      image: '/quiz/men/m-tired.png',
      showWhen: (a) => a.goal === 'cellular_energy',
      options: [
        { value: 'mitochondrial', label: 'It ruins my day — I can barely function', icon: '🔋' },
        { value: 'nad_systems', label: 'I feel myself slowing down year after year', icon: '🧪' },
      ],
    },
    {
      type: 'question',
      id: 'issue',
      title: "Right now — what frustrates you the most?",
      subtitle: 'Pick the ONE thing. We\'ll match a compound specifically to it.',
      field: 'mainIssue',
      image: '/quiz/men/m-weight.png',
      options: [
        { value: 'stubborn_weight', label: 'Stubborn weight that won\'t shift', icon: '⚖️' },
        { value: 'constant_hunger', label: 'Hunger and cravings I can\'t control', icon: '🍕' },
        { value: 'low_energy_crash', label: 'No energy — I crash every afternoon', icon: '😴' },
        { value: 'injury_or_pain', label: 'Pain or an injury holding me back', icon: '🩹' },
        { value: 'skin_hair_aging', label: 'Looking older than I should', icon: '🪞' },
        { value: 'metabolism_feels_off', label: 'My metabolism feels completely broken', icon: '🔧' },
      ],
    },
    {
      type: 'question',
      id: 'timeline',
      title: "How quickly do you want to see changes?",
      subtitle: 'This helps us pick the right compound intensity for your profile.',
      field: 'timeline',
      image: '/quiz/men/m-recovery.png',
      options: [
        { value: 'asap', label: 'Fast — I want to feel it this month', icon: '🚀' },
        { value: 'weeks', label: 'Steady — a few weeks is fine', icon: '📈' },
        { value: 'long_game', label: 'Deep, lasting change over months', icon: '♾️' },
      ],
    },
    {
      type: 'question',
      id: 'experience',
      title: "Have you ever tried anything like peptides before?",
      subtitle: 'Most men haven\'t — and that\'s exactly who sees the biggest results.',
      field: 'experience',
      image: '/quiz/men/m-transform.png',
      options: [
        { value: 'new', label: 'No — this is brand new to me', icon: '🆕' },
        { value: 'some', label: 'I\'ve looked into it / tried supplements', icon: '🧐' },
        { value: 'advanced', label: 'Yes — I\'ve used peptides before', icon: '🎓' },
      ],
    },
    {
      type: 'question',
      id: 'inflammation',
      title: "Last one — do your joints ache or feel stiff?",
      subtitle: 'Inflammation changes your match completely. Don\'t skip this.',
      field: 'inflammation',
      image: '/quiz/men/m-pain.png',
      options: [
        { value: 'yes', label: 'Yes — it bothers me most days', icon: '🦴' },
        { value: 'no', label: 'No, my joints are fine', icon: '👍' },
      ],
    },
  ]
}

function womenQuestions(): QuizStep[] {
  return [
    {
      type: 'question',
      id: 'goal',
      title: "If you could change one thing about how you feel — what is it?",
      subtitle: 'Thousands of women feel the same. Your answer helps us find the right solution.',
      field: 'goal',
      image: '/quiz/women/f-tired.png',
      options: [
        { value: 'metabolic', label: 'I\'d finally lose this stubborn weight', icon: '🔥' },
        { value: 'recovery', label: 'I\'d be free of pain and soreness', icon: '💪' },
        { value: 'skin_aging', label: 'I\'d look in the mirror and love what I see', icon: '✨' },
        { value: 'cellular_energy', label: 'I\'d have energy to actually live my life', icon: '⚡' },
      ],
    },
    {
      type: 'question',
      id: 'focus_metabolic',
      title: "What have you already tried to lose weight?",
      subtitle: 'Most women have tried everything. That\'s exactly why peptides are different.',
      field: 'metabolicFocus',
      image: '/quiz/women/f-weight.png',
      showWhen: (a) => a.goal === 'metabolic',
      options: [
        { value: 'appetite_control', label: 'Dieting — but the cravings always win', icon: '🍫' },
        { value: 'triple_pathway', label: 'Clean eating & gym — but nothing budges', icon: '⚖️' },
        { value: 'recomp_stubborn', label: 'I\'ve tried everything for these stubborn areas', icon: '🎯' },
      ],
    },
    {
      type: 'question',
      id: 'focus_recovery',
      title: "How long have you been living with this pain?",
      subtitle: 'The longer you\'ve had it, the more your body needs real support — not just rest.',
      field: 'recoveryFocus',
      image: '/quiz/women/f-pain.png',
      showWhen: (a) => a.goal === 'recovery',
      options: [
        { value: 'injury', label: 'Months or years — it never fully heals', icon: '🩹' },
        { value: 'training', label: 'After every workout — I\'m sore for days', icon: '🏋️' },
        { value: 'both', label: 'Both — ongoing pain AND slow recovery', icon: '😤' },
      ],
    },
    {
      type: 'question',
      id: 'focus_skin',
      title: "When did you start noticing the change in your skin?",
      subtitle: 'Peptides rebuild collagen at the cellular level. The earlier you start, the better.',
      field: 'skinFocus',
      image: '/quiz/women/f-aging.png',
      showWhen: (a) => a.goal === 'skin_aging',
      options: [
        { value: 'collagen_visible', label: 'Recently — lines, dullness, less glow', icon: '🪞' },
        { value: 'full_regen', label: 'For a while now — skin, hair, everything', icon: '🧬' },
      ],
    },
    {
      type: 'question',
      id: 'focus_cellular',
      title: "How much is the exhaustion affecting your daily life?",
      subtitle: 'This isn\'t normal tiredness — it\'s your cells asking for help.',
      field: 'cellularFocus',
      image: '/quiz/women/f-tired.png',
      showWhen: (a) => a.goal === 'cellular_energy',
      options: [
        { value: 'mitochondrial', label: 'It\'s ruining everything — I can barely get through the day', icon: '🔋' },
        { value: 'nad_systems', label: 'I just feel like my body is shutting down slowly', icon: '🧪' },
      ],
    },
    {
      type: 'question',
      id: 'issue',
      title: "Right now — what frustrates you the absolute most?",
      subtitle: 'Pick the ONE thing. We\'ll match a compound specifically to it.',
      field: 'mainIssue',
      image: '/quiz/women/f-weight.png',
      options: [
        { value: 'stubborn_weight', label: 'Stubborn weight that won\'t budge', icon: '⚖️' },
        { value: 'constant_hunger', label: 'Cravings I can\'t control', icon: '🍕' },
        { value: 'low_energy_crash', label: 'No energy — I crash every afternoon', icon: '😴' },
        { value: 'injury_or_pain', label: 'Pain that limits what I can do', icon: '🩹' },
        { value: 'skin_hair_aging', label: 'My skin and hair are aging too fast', icon: '🪞' },
        { value: 'metabolism_feels_off', label: 'My metabolism is completely shot', icon: '🔧' },
      ],
    },
    {
      type: 'question',
      id: 'timeline',
      title: "How quickly do you want to see changes?",
      subtitle: 'This helps us match the right compound intensity for you.',
      field: 'timeline',
      image: '/quiz/women/f-recovery.png',
      options: [
        { value: 'asap', label: 'Fast — I want to feel it this month', icon: '🚀' },
        { value: 'weeks', label: 'Gradual — a few weeks is fine', icon: '📈' },
        { value: 'long_game', label: 'Deep, lasting change over months', icon: '♾️' },
      ],
    },
    {
      type: 'question',
      id: 'experience',
      title: "Have you ever heard of peptides before?",
      subtitle: 'Most women haven\'t — and honestly, they see the biggest transformations.',
      field: 'experience',
      image: '/quiz/women/f-transform.png',
      options: [
        { value: 'new', label: 'No — this is completely new to me', icon: '🆕' },
        { value: 'some', label: 'I\'ve read a bit about them', icon: '🧐' },
        { value: 'advanced', label: 'Yes — I\'ve used them before', icon: '🎓' },
      ],
    },
    {
      type: 'question',
      id: 'inflammation',
      title: "Last question — do your joints ache or feel stiff?",
      subtitle: 'Inflammation changes your match completely. Don\'t skip this.',
      field: 'inflammation',
      image: '/quiz/women/f-pain.png',
      options: [
        { value: 'yes', label: 'Yes — it bothers me regularly', icon: '🦴' },
        { value: 'no', label: 'No, my joints are fine', icon: '👍' },
      ],
    },
  ]
}

export function getQuestions(gender: Gender): QuizStep[] {
  return gender === 'men' ? menQuestions() : womenQuestions()
}

export function buildSteps(gender: Gender, answers: QuizAnswers): Step[] {
  const questions = getQuestions(gender)
  const interstitials = gender === 'men' ? menInterstitials() : womenInterstitials()
  const active = questions.filter((q) => !q.showWhen || q.showWhen(answers))
  const steps: Step[] = []
  let interIdx = 0
  for (let i = 0; i < active.length; i++) {
    steps.push(active[i])
    if ((i + 1) % 2 === 0 && interIdx < interstitials.length) {
      steps.push(interstitials[interIdx])
      interIdx++
    }
  }
  return steps
}

export function getTeaseMessage(answers: QuizAnswers, questionNum: number, totalQuestions: number): string | null {
  const pct = Math.round((questionNum / totalQuestions) * 100)
  if (pct < 20) return null
  if (pct < 40) return '🧬 Scanning 12 compounds...'
  if (pct < 55) return '🔬 Strong match forming — keep going'
  if (pct < 70) return '📊 3 compounds shortlisted for you'
  if (pct < 85) return '🎯 Narrowing to your #1 match...'
  return '✅ Your personalised protocol is almost ready'
}
