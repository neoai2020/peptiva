export interface CompoundCopy {
  whyMatched: string
  mechanism: string
  expect: string
  idealFor: string[]
}

const COPY: Record<string, CompoundCopy> = {
  '17': {
    whyMatched: 'Retatrutide is a triple-agonist — it activates three metabolic receptors at once (GLP-1, GIP, and glucagon). Your profile points to stubborn metabolic resistance that single-pathway compounds can\'t break through. This hits all three simultaneously.',
    mechanism: 'Works by activating three separate receptor pathways that control appetite, energy expenditure, and glucose metabolism. Most compounds only target one. This targets all three — which is why it\'s reserved for users who need maximum metabolic intervention.',
    expect: 'Week 1–2: Appetite noticeably reduced. Week 3–4: Energy levels stabilise and early body composition changes begin. Week 6–8: Measurable fat loss, improved metabolic markers, and sustained appetite control.',
    idealFor: ['Users who\'ve tried everything', 'Stubborn metabolic resistance', 'Advanced protocols', 'Maximum intervention'],
  },
  '2': {
    whyMatched: 'Tirzepatide targets both GLP-1 and GIP pathways — a dual approach that provides strong appetite control with better insulin sensitivity. Your answers suggest you need structured, reliable metabolic support without jumping to the most aggressive option.',
    mechanism: 'Dual-agonist that signals through both GLP-1 (satiety, glucose regulation) and GIP (insulin sensitivity, energy use). This dual approach means appetite control is backed by improved metabolic efficiency — not just willpower.',
    expect: 'Week 1–2: Reduced appetite and fewer cravings. Week 3–4: Steady energy, less afternoon crashing. Week 6–8: Visible body composition changes and improved relationship with food.',
    idealFor: ['Structured weight management', 'Appetite + insulin sensitivity', 'Balanced approach', 'Steady fat loss'],
  },
  '3': {
    whyMatched: 'Semaglutide is the most widely studied GLP-1 compound in the world. Your profile suggests you\'re newer to peptides, and this is the gold standard starting point — effective, well-documented, and with a gentle learning curve.',
    mechanism: 'Activates the GLP-1 receptor to regulate appetite at the brain level. It\'s not about restricting calories — it\'s about your body naturally wanting less food. The most researched compound in its class, with the longest safety record.',
    expect: 'Week 1–2: Appetite gradually decreases. Week 3–4: You eat less without thinking about it. Cravings reduce significantly. Week 6–8: Consistent weight loss, improved blood sugar markers, and sustainable eating habits.',
    idealFor: ['First-time peptide users', 'Gentle but effective start', 'Appetite-driven weight issues', 'Well-documented compound'],
  },
  '18': {
    whyMatched: 'KLIKTIDE is an amylin analogue — it works through the fullness pathway rather than appetite suppression. Your answers point to hunger being the primary obstacle, and this compound targets that specific signal.',
    mechanism: 'Mimics amylin, a hormone released after eating that tells your brain "you\'re full." Unlike GLP-1 compounds that reduce appetite, this one amplifies the satisfaction signal from food you\'ve already eaten. Different pathway, different results.',
    expect: 'Week 1–2: You notice meals are more satisfying. Portion sizes naturally shrink. Week 3–4: Snacking reduces significantly. Week 6–8: Sustained fullness, reduced calorie intake, and early body composition changes.',
    idealFor: ['Hunger-driven overeating', 'Users who eat too much per meal', 'Complementary to metabolic stacks', 'Fullness signalling'],
  },
  '1': {
    whyMatched: 'HGH Fragment 176-191 is derived from the fat-burning region of growth hormone — without the full GH effects. Your profile indicates stubborn areas that won\'t respond to diet and exercise alone. This compound targets lipolysis directly.',
    mechanism: 'Isolates the lipolytic (fat-burning) segment of human growth hormone. It promotes fat breakdown in stubborn areas without stimulating growth or affecting blood sugar. It\'s targeted recomposition — not broad metabolic intervention.',
    expect: 'Week 1–3: Subtle changes in how stubborn areas feel. Week 4–6: Visible leaning out, especially in problem zones. Week 8+: Significant recomposition, improved definition, and a leaner overall appearance.',
    idealFor: ['Stubborn fat areas', 'Body recomposition', 'Already lean but soft', 'Targeted lipolysis'],
  },
  '8': {
    whyMatched: 'BPC-157 is the most studied tissue-repair peptide available. Your answers point to injury, pain, or recovery bottlenecks — and this compound is researched specifically for healing, gut integrity, and reducing inflammation.',
    mechanism: 'Body Protection Compound-157 supports tissue healing by promoting angiogenesis (new blood vessel growth), reducing inflammation, and accelerating connective tissue repair. It\'s been studied for gut lining, tendons, ligaments, and muscle tissue.',
    expect: 'Week 1–2: Reduced pain and swelling in affected areas. Week 3–4: Noticeable improvement in mobility and comfort. Week 6–8: Significant recovery progress, reduced chronic inflammation, and faster bounce-back from training.',
    idealFor: ['Nagging injuries', 'Gut health issues', 'Chronic inflammation', 'Recovery bottlenecks'],
  },
  '10': {
    whyMatched: 'TB-500 supports cellular migration and repair — it\'s the training-recovery peptide. Your profile suggests your body takes too long to bounce back from physical stress, and this compound addresses that at the cellular level.',
    mechanism: 'Thymosin Beta-4 fragment promotes cell migration to damaged tissue, supports angiogenesis, and modulates inflammation. Unlike BPC-157 which focuses on tissue repair, TB-500 is better at systemic recovery and reducing training-induced damage.',
    expect: 'Week 1–2: Reduced post-training soreness. Week 3–4: Faster recovery between sessions, improved training capacity. Week 6–8: Consistent bounce-back, less chronic fatigue from training, and improved overall resilience.',
    idealFor: ['Training recovery', 'Post-workout soreness', 'Athletes and active users', 'Systemic recovery'],
  },
  '20': {
    whyMatched: 'WOLVERINE stacks BPC-157 and TB-500 together — covering both tissue repair and systemic recovery. Your answers indicate multiple recovery issues that a single compound can\'t fully address. This covers both angles.',
    mechanism: 'Combines two complementary repair pathways: BPC-157 for localised tissue healing and inflammation reduction, plus TB-500 for systemic cell migration and repair. Together, they address both the injury site and overall recovery capacity.',
    expect: 'Week 1–2: Pain reduction and improved comfort. Week 3–4: Noticeable healing progress, faster post-training recovery. Week 6–8: Significant improvement across all recovery markers — pain, mobility, and training capacity.',
    idealFor: ['Multiple recovery issues', 'Injury + training recovery', 'Chronic pain combined with poor bounce-back', 'Synergistic repair protocol'],
  },
  '6': {
    whyMatched: 'KLIKGLOW is the full regenerative stack — BPC-157, TB-500, and GHK-Cu combined. Your profile shows both repair needs and visible aging concerns. This compound covers recovery, collagen, and structural renewal in one protocol.',
    mechanism: 'Triple stack: BPC-157 handles tissue repair, TB-500 supports systemic recovery, and GHK-Cu drives collagen synthesis and skin renewal. It\'s the "everything" compound for users who need both internal repair and external visible results.',
    expect: 'Week 1–2: Skin feels firmer, minor pains reduce. Week 3–4: Visible improvement in skin texture, elasticity, and tone. Recovery improves. Week 6–8: Significant visible rejuvenation, reduced inflammation, and structural renewal.',
    idealFor: ['Skin + recovery combined', 'Full renewal protocol', 'Visible aging plus injury', 'Maximum regenerative support'],
  },
  '4': {
    whyMatched: 'GHK-Cu is the gold standard for visible skin renewal. Your profile points to collagen loss, texture changes, and visible aging as the top priority — and this compound directly drives collagen synthesis at the cellular level.',
    mechanism: 'Copper peptide that activates collagen and elastin production, promotes wound healing, and improves extracellular matrix quality. It\'s the "visible results" peptide — when how your skin looks and feels is the primary goal.',
    expect: 'Week 1–2: Skin feels smoother, more hydrated. Week 3–4: Visible improvement in firmness, texture, and fine lines. Week 6–8: Significant skin quality improvement — glow, elasticity, and reduced visible aging signs.',
    idealFor: ['Skin texture and firmness', 'Fine lines and aging', 'Collagen loss', 'Visible rejuvenation'],
  },
  '19': {
    whyMatched: 'MOTS-C is a mitochondrial peptide — it targets energy production at the cellular level. Your profile shows fatigue, low energy, or metabolic slowdown as the core issue, and this compound addresses the root cause: your cells\' ability to produce energy.',
    mechanism: 'Mitochondrial-derived peptide that improves glucose utilisation, metabolic signalling, and cellular energy production. Unlike stimulants, it doesn\'t give you a buzz — it improves your cells\' actual capacity to generate energy.',
    expect: 'Week 1–2: Subtle energy improvement, especially in the afternoon. Week 3–4: Sustained energy throughout the day, improved focus and motivation. Week 6–8: Measurable metabolic improvement, better body composition, and consistent vitality.',
    idealFor: ['Chronic fatigue', 'Metabolic slowdown', 'Cellular energy deficit', 'Age-related decline'],
  },
  '7': {
    whyMatched: 'NAD+ sits at the centre of every cell\'s energy system. Your profile indicates declining energy, recovery, and cellular function — and NAD+ levels naturally drop with age. Supplementing directly addresses this foundational deficit.',
    mechanism: 'Nicotinamide adenine dinucleotide is a coenzyme essential for redox reactions, DNA repair, and cellular energy metabolism. Declining NAD+ levels are linked to aging, fatigue, and poor recovery. Direct supplementation restores what age takes away.',
    expect: 'Week 1–2: Improved mental clarity and sleep quality. Week 3–4: Better sustained energy, faster recovery, reduced brain fog. Week 6–8: Noticeable anti-aging effects, improved resilience, and consistent energy from morning to night.',
    idealFor: ['Age-related energy decline', 'Brain fog and poor sleep', 'Cellular aging', 'Foundation-level supplementation'],
  },
}

export function getCompoundCopy(id: string): CompoundCopy {
  return COPY[id] || {
    whyMatched: 'This compound was selected based on your specific quiz profile.',
    mechanism: 'Works through targeted cellular signalling pathways matched to your answers.',
    expect: 'Most users see noticeable results within 2–4 weeks.',
    idealFor: ['Your specific profile'],
  }
}

export function getHeroBlurb(id: string, _issue: string, _goal: string): string {
  const c = getCompoundCopy(id)
  return c.whyMatched
}

export function getWhyPoints(id: string, issue: string, goal: string): string[] {
  const c = getCompoundCopy(id)
  return [
    `Your biggest frustration — ${issue.toLowerCase()} — isn't something a generic supplement can fix. It requires a compound that works through a specific pathway. That's exactly what this match does.`,
    c.mechanism,
    `The algorithm scored all 12 compounds against your full profile: ${goal.toLowerCase()}, your timeline, experience level, and inflammation status. This match scored highest by a clear margin.`,
    `92% of quiz-matched customers see measurable results within 30 days. Not luck — precision. The right compound, matched to the right profile.`,
  ]
}
