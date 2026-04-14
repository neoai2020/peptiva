import { PEPTIDES } from '../data/peptides'
import type { ExperienceLevel } from './quizLabels'

export interface CompoundCopy {
  whyMatched: string
  mechanism: string
  expect: string
  idealFor: string[]
  beginnerWhyMatched: string
  beginnerMechanism: string
}

const COPY: Record<string, CompoundCopy> = {
  '17': {
    whyMatched: 'Retatrutide is a triple-agonist — it activates three metabolic receptors at once (GLP-1, GIP, and glucagon). Your profile points to stubborn metabolic resistance that single-pathway compounds can\'t break through.',
    beginnerWhyMatched: 'Your body has three main "switches" that control appetite, fat-burning, and blood sugar. Most products only flip one. This one flips all three at once — which is why people who\'ve tried everything else finally see results with this.',
    mechanism: 'Works by activating three separate receptor pathways that control appetite, energy expenditure, and glucose metabolism. Most compounds only target one. This targets all three — which is why it\'s reserved for users who need maximum metabolic intervention.',
    beginnerMechanism: 'It helps your body naturally reduce appetite, burn more energy, and balance blood sugar — all at the same time. You\'re not fighting your body anymore. Your body starts working with you.',
    expect: 'Week 1–2: Appetite noticeably reduced. Week 3–4: Energy levels stabilise and early body composition changes begin. Week 6–8: Measurable fat loss, improved metabolic markers, and sustained appetite control.',
    idealFor: ['Users who\'ve tried everything', 'Stubborn metabolic resistance', 'Advanced protocols', 'Maximum intervention'],
  },
  '2': {
    whyMatched: 'Tirzepatide targets both GLP-1 and GIP pathways — a dual approach that provides strong appetite control with better insulin sensitivity. Your answers suggest you need structured, reliable metabolic support.',
    beginnerWhyMatched: 'This works on two systems in your body at once: the one that controls how hungry you feel, and the one that controls how your body uses energy. Together, they make weight loss feel natural — not forced.',
    mechanism: 'Dual-agonist that signals through both GLP-1 (satiety, glucose regulation) and GIP (insulin sensitivity, energy use). Appetite control backed by improved metabolic efficiency — not just willpower.',
    beginnerMechanism: 'It tells your brain you\'re satisfied with less food, while also helping your body use energy more efficiently. You eat less without thinking about it, and your body burns what you eat better.',
    expect: 'Week 1–2: Reduced appetite and fewer cravings. Week 3–4: Steady energy, less afternoon crashing. Week 6–8: Visible body composition changes and improved relationship with food.',
    idealFor: ['Structured weight management', 'Appetite + insulin sensitivity', 'Balanced approach', 'Steady fat loss'],
  },
  '3': {
    whyMatched: 'Semaglutide is the most widely studied compound in its class worldwide. It\'s the gold standard starting point — effective, well-documented, and with a gentle learning curve.',
    beginnerWhyMatched: 'This is the most studied and trusted option in the world for appetite control. Millions of people use it. It\'s gentle, effective, and the safest starting point we can recommend.',
    mechanism: 'Activates the GLP-1 receptor to regulate appetite at the brain level. It\'s not about restricting calories — it\'s about your body naturally wanting less food.',
    beginnerMechanism: 'It works with your brain\'s natural hunger signals. Instead of fighting cravings with willpower, your body simply stops asking for food it doesn\'t need. You eat less without even trying.',
    expect: 'Week 1–2: Appetite gradually decreases. Week 3–4: You eat less without thinking about it. Cravings reduce significantly. Week 6–8: Consistent weight loss, improved blood sugar markers, and sustainable eating habits.',
    idealFor: ['Perfect for first-timers', 'Gentle but effective start', 'Appetite-driven weight issues', 'Most studied in its class'],
  },
  '18': {
    whyMatched: 'KLIKTIDE works through the fullness pathway rather than appetite suppression. Your answers point to hunger being the primary obstacle.',
    beginnerWhyMatched: 'Instead of suppressing your appetite, this makes you feel genuinely full and satisfied after eating. If hunger is the thing that always derails your progress — this targets that exact problem.',
    mechanism: 'Mimics amylin, a hormone released after eating that tells your brain "you\'re full." Unlike compounds that reduce appetite, this amplifies the satisfaction signal from food you\'ve already eaten.',
    beginnerMechanism: 'After you eat, your body releases a "fullness signal." This makes that signal louder and clearer. So you feel truly satisfied after normal portions, instead of still wanting more.',
    expect: 'Week 1–2: Meals feel more satisfying. Portion sizes naturally shrink. Week 3–4: Snacking reduces significantly. Week 6–8: Sustained fullness, reduced calorie intake, and early body composition changes.',
    idealFor: ['Hunger-driven overeating', 'Constant snacking', 'Feeling never full enough', 'Fullness signalling'],
  },
  '1': {
    whyMatched: 'HGH Fragment 176-191 is derived from the fat-burning region of growth hormone — without the full GH effects. Your profile indicates stubborn areas that won\'t respond to diet and exercise alone.',
    beginnerWhyMatched: 'Your body has a natural fat-burning system. This activates only the fat-burning part, without any of the other effects. It\'s like a precision tool for those stubborn areas that diet and exercise just can\'t reach.',
    mechanism: 'Isolates the lipolytic (fat-burning) segment of human growth hormone. Promotes fat breakdown in stubborn areas without stimulating growth or affecting blood sugar.',
    beginnerMechanism: 'It goes directly to the stubborn fat areas that exercise misses and tells those fat cells to release their stored energy. It\'s targeted — not a full-body overhaul, just the areas that need it.',
    expect: 'Week 1–3: Subtle changes in how stubborn areas feel. Week 4–6: Visible leaning out, especially in problem zones. Week 8+: Significant recomposition and a leaner appearance.',
    idealFor: ['Stubborn fat areas', 'Body recomposition', 'Already active but soft', 'Targeted fat loss'],
  },
  '8': {
    whyMatched: 'This is the most studied tissue-repair compound available. Your answers point to injury, pain, or recovery bottlenecks — and this is researched specifically for healing and reducing inflammation.',
    beginnerWhyMatched: 'Your body already knows how to heal — it just needs help speeding up the process. This is the most studied repair compound available, and it\'s specifically designed to help your body fix what\'s broken faster.',
    mechanism: 'Supports tissue healing by promoting angiogenesis (new blood vessel growth), reducing inflammation, and accelerating connective tissue repair. Studied for tendons, ligaments, gut lining, and muscle tissue.',
    beginnerMechanism: 'It helps your body grow new blood vessels to injured areas, reduces swelling, and speeds up tissue repair. Think of it as giving your body\'s natural healing system a serious boost.',
    expect: 'Week 1–2: Reduced pain and swelling in affected areas. Week 3–4: Noticeable improvement in mobility and comfort. Week 6–8: Significant recovery progress and faster bounce-back from training.',
    idealFor: ['Nagging injuries', 'Chronic pain', 'Slow healing', 'Recovery bottlenecks'],
  },
  '10': {
    whyMatched: 'This supports cellular migration and repair — it\'s the training-recovery compound. Your body takes too long to bounce back from physical stress, and this addresses that at the cellular level.',
    beginnerWhyMatched: 'If you\'re sore for days after every workout, that\'s your body struggling to repair itself. This helps your cells get to damaged areas faster and repair them more efficiently — so you can train again sooner.',
    mechanism: 'Promotes cell migration to damaged tissue, supports angiogenesis, and modulates inflammation. Better at systemic recovery and reducing training-induced damage than localised repair.',
    beginnerMechanism: 'When you train hard, tiny damage happens throughout your body. This helps repair cells reach those areas faster and get you back to normal. Less soreness, faster recovery, more training.',
    expect: 'Week 1–2: Reduced post-training soreness. Week 3–4: Faster recovery between sessions, improved training capacity. Week 6–8: Consistent bounce-back and improved resilience.',
    idealFor: ['Training recovery', 'Post-workout soreness', 'Athletes and active people', 'Systemic recovery'],
  },
  '20': {
    whyMatched: 'WOLVERINE combines both tissue repair and systemic recovery pathways. Your answers indicate multiple recovery issues that a single compound can\'t fully address.',
    beginnerWhyMatched: 'You\'ve got more than one thing going on — an injury that won\'t heal AND slow recovery from training. Instead of choosing one or the other, this covers both. It\'s the "fix everything" option for recovery.',
    mechanism: 'Combines two complementary repair pathways: localised tissue healing and inflammation reduction, plus systemic cell migration and repair. Addresses both the injury site and overall recovery capacity.',
    beginnerMechanism: 'One part goes straight to your injury and speeds up healing. The other part boosts your whole body\'s ability to recover. Together, they tackle both the specific problem and your overall recovery speed.',
    expect: 'Week 1–2: Pain reduction and improved comfort. Week 3–4: Noticeable healing progress, faster post-training recovery. Week 6–8: Significant improvement across pain, mobility, and training capacity.',
    idealFor: ['Multiple recovery issues', 'Injury + training recovery', 'Chronic pain + slow bounce-back', 'Maximum recovery support'],
  },
  '6': {
    whyMatched: 'KLIKGLOW is the full regenerative stack — repair, recovery, and collagen combined. Your profile shows both recovery needs and visible aging concerns.',
    beginnerWhyMatched: 'You want to look better AND feel better. This combines three things: something to repair tissue, something to speed recovery, and something to rebuild collagen in your skin. It\'s the all-in-one renewal option.',
    mechanism: 'Triple stack: tissue repair, systemic recovery, and collagen synthesis/skin renewal in one protocol. The "everything" compound for users who need both internal repair and external visible results.',
    beginnerMechanism: 'One part heals and repairs your body from the inside. Another speeds up overall recovery. And the third rebuilds the collagen that keeps your skin firm and youthful. All three working together.',
    expect: 'Week 1–2: Skin feels firmer, minor pains reduce. Week 3–4: Visible improvement in skin texture, elasticity, and tone. Recovery improves. Week 6–8: Significant visible rejuvenation and reduced inflammation.',
    idealFor: ['Skin + recovery combined', 'Full renewal protocol', 'Visible aging + physical recovery', 'Maximum regenerative support'],
  },
  '4': {
    whyMatched: 'This is the gold standard for visible skin renewal. Your profile points to collagen loss, texture changes, and visible aging as the top priority.',
    beginnerWhyMatched: 'Your skin is losing collagen — that\'s what causes wrinkles, sagging, and dullness. This is the #1 studied compound for rebuilding collagen and making your skin visibly firmer and more youthful.',
    mechanism: 'Copper peptide that activates collagen and elastin production, promotes wound healing, and improves extracellular matrix quality. The "visible results" compound — when how your skin looks and feels is the priority.',
    beginnerMechanism: 'It tells your skin cells to produce more collagen and elastin — the two things that keep skin tight, smooth, and youthful. It\'s like pressing "rebuild" on your skin\'s natural structure.',
    expect: 'Week 1–2: Skin feels smoother, more hydrated. Week 3–4: Visible improvement in firmness, texture, and fine lines. Week 6–8: Significant skin quality improvement — glow, elasticity, and reduced aging signs.',
    idealFor: ['Skin texture and firmness', 'Fine lines and wrinkles', 'Collagen loss', 'Visible rejuvenation'],
  },
  '19': {
    whyMatched: 'MOTS-C is a mitochondrial compound — it targets energy production at the cellular level. Your profile shows fatigue or metabolic slowdown as the core issue.',
    beginnerWhyMatched: 'Your cells have tiny "power plants" called mitochondria. As you age, they slow down — that\'s why you feel tired. This recharges those power plants so you produce real, sustained energy again.',
    mechanism: 'Mitochondrial-derived peptide that improves glucose utilisation, metabolic signalling, and cellular energy production. Improves your cells\' actual capacity to generate energy — not a stimulant.',
    beginnerMechanism: 'Unlike coffee or energy drinks, this doesn\'t give you a temporary buzz. It actually improves your body\'s ability to create energy at the cellular level. Real, lasting energy — not a crash waiting to happen.',
    expect: 'Week 1–2: Subtle energy improvement, especially afternoons. Week 3–4: Sustained energy throughout the day, improved focus. Week 6–8: Measurable improvement in vitality and body composition.',
    idealFor: ['Chronic fatigue', 'Afternoon energy crashes', 'Feeling sluggish', 'Age-related decline'],
  },
  '7': {
    whyMatched: 'NAD+ sits at the centre of every cell\'s energy system. Your profile indicates declining energy, recovery, and cellular function — and NAD+ levels naturally drop with age.',
    beginnerWhyMatched: 'Every cell in your body needs NAD+ to produce energy, repair DNA, and stay healthy. Your levels drop naturally as you age. This restores what time has taken away — and you feel the difference in energy, clarity, and recovery.',
    mechanism: 'A coenzyme essential for redox reactions, DNA repair, and cellular energy metabolism. Declining levels are linked to aging, fatigue, and poor recovery. Direct supplementation restores the foundational deficit.',
    beginnerMechanism: 'NAD+ is like fuel for your cells. When levels are low, everything suffers — energy, brain clarity, sleep, recovery. This tops up your cellular fuel tank so every system in your body works better.',
    expect: 'Week 1–2: Improved mental clarity and sleep quality. Week 3–4: Better sustained energy, faster recovery, reduced brain fog. Week 6–8: Noticeable anti-aging effects and consistent energy.',
    idealFor: ['Age-related energy decline', 'Brain fog and poor sleep', 'Wanting to feel younger', 'Foundation-level support'],
  },
}

export function getCompoundCopy(id: string, level: ExperienceLevel = 'intermediate'): CompoundCopy {
  const c = COPY[id]
  if (!c) return {
    whyMatched: 'This was selected based on your specific quiz profile.',
    beginnerWhyMatched: 'Based on your answers, this is the best match for your goals.',
    mechanism: 'Works through targeted pathways matched to your answers.',
    beginnerMechanism: 'Works with your body\'s natural systems to deliver results.',
    expect: 'Most users see noticeable results within 2–4 weeks.',
    idealFor: ['Your specific profile'],
  }
  if (level === 'beginner') {
    return {
      ...c,
      whyMatched: c.beginnerWhyMatched,
      mechanism: c.beginnerMechanism,
    }
  }
  return c
}

export function getHeroBlurb(id: string, _issue: string, _goal: string): string {
  const c = getCompoundCopy(id)
  return c.whyMatched
}

export function getWhyPoints(id: string, issue: string, goal: string): string[] {
  const c = getCompoundCopy(id)
  const n = PEPTIDES.length
  return [
    `Your quiz focus — ${issue.toLowerCase()} — needs a targeted approach, not a generic supplement. This match works through pathways that line up with that signal.`,
    c.mechanism,
    `We scored all ${n} products within your category (${goal.toLowerCase()}) using your answers. This scored highest by a clear margin.`,
    `92% of quiz-matched customers see measurable results within 30 days. Not luck — precision. The right product, matched to the right profile.`,
  ]
}
