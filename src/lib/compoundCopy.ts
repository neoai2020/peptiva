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
    beginnerWhyMatched: 'Your body has three main "switches" that control appetite, fat-burning, and blood sugar. Most products only flip one. Reta flips all three at once — which is why people who\'ve tried everything else finally see results.',
    mechanism: 'Works by activating three separate receptor pathways that control appetite, energy expenditure, and glucose metabolism. Most compounds only target one. This targets all three — which is why it\'s the strongest option available.',
    beginnerMechanism: 'It helps your body naturally reduce appetite, burn more energy, and balance blood sugar — all at the same time. You\'re not fighting your body anymore. Your body starts working with you.',
    expect: 'Week 1–2: Appetite noticeably reduced. Week 3–4: Energy levels stabilise and early body composition changes begin. Week 6–8: Measurable fat loss, improved metabolic markers, and sustained appetite control.',
    idealFor: ['Users who\'ve tried everything', 'Stubborn metabolic resistance', 'Advanced protocols', 'Maximum intervention'],
  },
  '21': {
    whyMatched: 'Reta 2.0 is the next-generation retatrutide with enhanced bioavailability. Your profile shows long-term metabolic resistance and advanced experience — this is the strongest formulation we offer.',
    beginnerWhyMatched: 'This is our most advanced weight management product. It works the same way as Reta but has been engineered for better absorption and stronger results. It\'s typically chosen by people with significant experience.',
    mechanism: 'Enhanced retatrutide formulation with improved bioavailability. Same triple-agonist mechanism (GLP-1, GIP, glucagon) but optimised for maximum metabolic response. Reserved for users who need the highest level of intervention.',
    beginnerMechanism: 'It works the same way as regular Reta — controlling appetite, energy, and blood sugar — but it\'s been improved so your body absorbs it better and gets stronger results.',
    expect: 'Week 1–2: Rapid appetite reduction and energy shift. Week 3–4: Accelerated body composition changes. Week 6–8: Significant, measurable transformation in weight and metabolic health.',
    idealFor: ['Experienced users', 'Maximum metabolic intervention', 'Tried standard protocols', 'Significant transformation goals'],
  },
  '2': {
    whyMatched: 'Tirzepatide targets both GLP-1 and GIP pathways — a dual approach that provides strong appetite control with better insulin sensitivity. Your answers suggest you need structured, reliable metabolic support.',
    beginnerWhyMatched: 'This works on two systems in your body at once: the one that controls how hungry you feel, and the one that controls how your body uses energy. Together, they make weight loss feel natural — not forced.',
    mechanism: 'Dual-agonist that signals through both GLP-1 (satiety, glucose regulation) and GIP (insulin sensitivity, energy use). Appetite control backed by improved metabolic efficiency — not just willpower.',
    beginnerMechanism: 'It tells your brain you\'re satisfied with less food, while also helping your body use energy more efficiently. You eat less without thinking about it, and your body burns what you eat better.',
    expect: 'Week 1–2: Reduced appetite and fewer cravings. Week 3–4: Steady energy, less afternoon crashing. Week 6–8: Visible body composition changes and improved relationship with food.',
    idealFor: ['Structured weight management', 'Appetite + insulin sensitivity', 'Balanced approach', 'Steady fat loss'],
  },
  '18': {
    whyMatched: 'Cagrilintide works through the fullness pathway rather than appetite suppression. Your answers point to hunger being the primary obstacle — this targets that exact problem.',
    beginnerWhyMatched: 'Instead of suppressing your appetite, Cagrilintide makes you feel genuinely full and satisfied after eating. If hunger is the thing that always derails your progress — this targets that exact problem.',
    mechanism: 'Mimics amylin, a hormone released after eating that tells your brain "you\'re full." Unlike compounds that reduce appetite, this amplifies the satisfaction signal from food you\'ve already eaten.',
    beginnerMechanism: 'After you eat, your body releases a "fullness signal." This makes that signal louder and clearer. So you feel truly satisfied after normal portions, instead of still wanting more.',
    expect: 'Week 1–2: Meals feel more satisfying. Portion sizes naturally shrink. Week 3–4: Snacking reduces significantly. Week 6–8: Sustained fullness, reduced calorie intake, and early body composition changes.',
    idealFor: ['Hunger-driven overeating', 'Constant snacking', 'Feeling never full enough', 'Gentle starting point'],
  },
  '8': {
    whyMatched: 'BPC157 is the most studied tissue-repair compound available. Your answers point to injury, pain, or recovery bottlenecks — and this is researched specifically for healing and reducing inflammation.',
    beginnerWhyMatched: 'Your body already knows how to heal — it just needs help speeding up the process. BPC157 is the most studied repair compound available, and it\'s specifically designed to help your body fix what\'s broken faster.',
    mechanism: 'Supports tissue healing by promoting angiogenesis (new blood vessel growth), reducing inflammation, and accelerating connective tissue repair. Studied for tendons, ligaments, gut lining, and muscle tissue.',
    beginnerMechanism: 'It helps your body grow new blood vessels to injured areas, reduces swelling, and speeds up tissue repair. Think of it as giving your body\'s natural healing system a serious boost.',
    expect: 'Week 1–2: Reduced pain and swelling in affected areas. Week 3–4: Noticeable improvement in mobility and comfort. Week 6–8: Significant recovery progress and faster bounce-back from training.',
    idealFor: ['Nagging injuries', 'Chronic pain', 'Slow healing', 'Recovery bottlenecks'],
  },
  '10': {
    whyMatched: 'TB500 supports cellular migration and repair — it\'s the training-recovery compound. Your body takes too long to bounce back from physical stress, and this addresses that at the cellular level.',
    beginnerWhyMatched: 'If you\'re sore for days after every workout, that\'s your body struggling to repair itself. TB500 helps your cells get to damaged areas faster and repair them more efficiently — so you can train again sooner.',
    mechanism: 'Promotes cell migration to damaged tissue, supports angiogenesis, and modulates inflammation. Better at systemic recovery and reducing training-induced damage than localised repair.',
    beginnerMechanism: 'When you train hard, tiny damage happens throughout your body. This helps repair cells reach those areas faster and get you back to normal. Less soreness, faster recovery, more training.',
    expect: 'Week 1–2: Reduced post-training soreness. Week 3–4: Faster recovery between sessions, improved training capacity. Week 6–8: Consistent bounce-back and improved resilience.',
    idealFor: ['Training recovery', 'Post-workout soreness', 'Athletes and active people', 'Systemic recovery'],
  },
  '20': {
    whyMatched: 'Wolverine combines both tissue repair and systemic recovery pathways. Your answers indicate multiple recovery issues that a single compound can\'t fully address.',
    beginnerWhyMatched: 'You\'ve got more than one thing going on — an injury that won\'t heal AND slow recovery from training. Instead of choosing one or the other, Wolverine covers both. It\'s the "fix everything" option for recovery.',
    mechanism: 'Combines two complementary repair pathways: localised tissue healing and inflammation reduction (BPC-157), plus systemic cell migration and repair (TB-500). Addresses both the injury site and overall recovery capacity.',
    beginnerMechanism: 'One part goes straight to your injury and speeds up healing. The other part boosts your whole body\'s ability to recover. Together, they tackle both the specific problem and your overall recovery speed.',
    expect: 'Week 1–2: Pain reduction and improved comfort. Week 3–4: Noticeable healing progress, faster post-training recovery. Week 6–8: Significant improvement across pain, mobility, and training capacity.',
    idealFor: ['Multiple recovery issues', 'Injury + training recovery', 'Chronic pain + slow bounce-back', 'Maximum recovery support'],
  },
  '6': {
    whyMatched: 'Glow is the full regenerative stack — repair, recovery, and collagen combined. Your profile shows both recovery needs and visible aging concerns.',
    beginnerWhyMatched: 'You want to look better AND feel better. Glow combines three things: something to repair tissue, something to speed recovery, and something to rebuild collagen in your skin. It\'s the all-in-one renewal option.',
    mechanism: 'Triple stack: tissue repair (BPC-157), systemic recovery (TB-500), and collagen synthesis/skin renewal (GHK-Cu) in one protocol. The "everything" compound for users who need both internal repair and external visible results.',
    beginnerMechanism: 'One part heals and repairs your body from the inside. Another speeds up overall recovery. And the third rebuilds the collagen that keeps your skin firm and youthful. All three working together.',
    expect: 'Week 1–2: Skin feels firmer, minor pains reduce. Week 3–4: Visible improvement in skin texture, elasticity, and tone. Recovery improves. Week 6–8: Significant visible rejuvenation and reduced inflammation.',
    idealFor: ['Skin + recovery combined', 'Full renewal protocol', 'Visible aging + physical recovery', 'Maximum regenerative support'],
  },
  '4': {
    whyMatched: 'GHKCU is the gold standard for visible skin renewal. Your profile points to collagen loss, texture changes, and visible aging as the top priority.',
    beginnerWhyMatched: 'Your skin is losing collagen — that\'s what causes wrinkles, sagging, and dullness. GHKCU is the #1 studied compound for rebuilding collagen and making your skin visibly firmer and more youthful.',
    mechanism: 'Copper peptide that activates collagen and elastin production, promotes wound healing, and improves extracellular matrix quality. The "visible results" compound — when how your skin looks and feels is the priority.',
    beginnerMechanism: 'It tells your skin cells to produce more collagen and elastin — the two things that keep skin tight, smooth, and youthful. It\'s like pressing "rebuild" on your skin\'s natural structure.',
    expect: 'Week 1–2: Skin feels smoother, more hydrated. Week 3–4: Visible improvement in firmness, texture, and fine lines. Week 6–8: Significant skin quality improvement — glow, elasticity, and reduced aging signs.',
    idealFor: ['Skin texture and firmness', 'Fine lines and wrinkles', 'Collagen loss', 'Visible rejuvenation'],
  },
  '19': {
    whyMatched: 'MOTC is a mitochondrial compound — it targets energy production at the cellular level. Your profile shows fatigue or metabolic slowdown as the core issue.',
    beginnerWhyMatched: 'Your cells have tiny "power plants" called mitochondria. As you age, they slow down — that\'s why you feel tired. MOTC recharges those power plants so you produce real, sustained energy again.',
    mechanism: 'Mitochondrial-derived peptide that improves glucose utilisation, metabolic signalling, and cellular energy production. Improves your cells\' actual capacity to generate energy — not a stimulant.',
    beginnerMechanism: 'Unlike coffee or energy drinks, this doesn\'t give you a temporary buzz. It actually improves your body\'s ability to create energy at the cellular level. Real, lasting energy — not a crash waiting to happen.',
    expect: 'Week 1–2: Subtle energy improvement, especially afternoons. Week 3–4: Sustained energy throughout the day, improved focus. Week 6–8: Measurable improvement in vitality and body composition.',
    idealFor: ['Chronic fatigue', 'Afternoon energy crashes', 'Feeling sluggish', 'Age-related decline'],
  },
  '7': {
    whyMatched: 'NAD+ sits at the centre of every cell\'s energy system. Your profile indicates declining energy, recovery, and cellular function — and NAD+ levels naturally drop with age.',
    beginnerWhyMatched: 'Every cell in your body needs NAD+ to produce energy, repair DNA, and stay healthy. Your levels drop naturally as you age. NAD 1000mg restores what time has taken away — and you feel the difference in energy, clarity, and recovery.',
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

export interface AnswerReason {
  label: string
  answer: string
  reason: string
}

type AnswerReasonMap = Record<string, Record<string, string>>

const WEIGHT_REASONS: Record<string, AnswerReasonMap> = {
  '17': {
    weightChallenge: {
      cravings: 'Reta targets all three appetite pathways simultaneously — GLP-1, GIP, and glucagon — shutting down cravings at the source instead of relying on willpower.',
      slow_metabolism: 'Your metabolism has adapted. Reta activates the glucagon receptor to force metabolic reactivation — something single-pathway products can\'t do.',
      belly_fat: 'Stubborn visceral fat requires aggressive metabolic intervention. Reta\'s triple-agonist mechanism targets the hormonal drivers that keep that fat locked in place.',
      yo_yo: 'Yo-yo dieting breaks single-pathway solutions. Reta works through three separate mechanisms so your body can\'t adapt around it the way it did with diets.',
    },
    duration: {
      years: 'You\'ve been at this for years, which means simpler approaches have failed. Reta is the strongest intervention we offer — built for exactly this situation.',
      over_a_year: 'Over a year of effort signals real metabolic resistance. Reta\'s triple pathway breaks through where single-target products plateau.',
      few_months: 'Starting relatively early with a strong match means faster results. Reta gives your body clear, multi-pathway metabolic signals from day one.',
      just_starting: 'Even as a starting point, Reta\'s multi-pathway approach means you\'re not relying on one mechanism that might not be enough.',
    },
    energy: {
      exhausted: 'Exhaustion is a hallmark of deep metabolic resistance. Reta\'s glucagon pathway directly addresses the energy deficit while tackling weight.',
      low_all_day: 'Low energy all day suggests your metabolism isn\'t converting fuel efficiently. Reta\'s triple mechanism improves both appetite control and energy output.',
      afternoon_crash: 'Afternoon crashes often signal blood sugar instability. Reta helps stabilise glucose metabolism alongside appetite control.',
    },
    weightOutcome: {
      major_transform: '92% of quiz-matched customers see measurable results within 30 days. For a major transformation, Reta\'s aggressive triple-pathway approach is specifically designed.',
      clothing_size: 'Dropping a clothing size requires consistent body composition change. Reta\'s sustained appetite control and metabolic activation deliver that consistently.',
      lose_5_10: 'For targeted weight loss, Reta provides precise metabolic control without the extreme intervention some users need.',
      stop_gaining: 'Breaking the weight gain cycle requires resetting your metabolic baseline. Reta\'s multi-pathway signalling does exactly that.',
    },
  },
  '2': {
    weightChallenge: {
      cravings: 'Tirzepatide\'s dual GLP-1 + GIP action directly targets appetite signalling — you feel genuinely satisfied with less, not deprived.',
      slow_metabolism: 'The GIP pathway improves insulin sensitivity and how your body processes energy. Combined with GLP-1 appetite control, it\'s a balanced metabolic reset.',
      belly_fat: 'Tirzepatide\'s dual mechanism targets both appetite and insulin resistance — two of the key hormonal drivers behind stubborn fat storage.',
      yo_yo: 'The dual-agonist approach creates sustainable appetite change rather than the temporary suppression that leads to rebound weight gain.',
    },
    duration: {
      years: 'Years of effort suggests you need a structured, reliable approach. Tirzepatide\'s dual mechanism provides consistent results without extreme intervention.',
      over_a_year: 'After a year or more, your body needs a compound that addresses multiple pathways. Tirzepatide balances appetite control with metabolic efficiency.',
      few_months: 'A few months in is the perfect window for Tirzepatide — early enough to build momentum, structured enough to sustain it.',
      just_starting: 'As a starting point, Tirzepatide offers strong but balanced support. Two pathways working together means reliable, steady progress.',
    },
    energy: {
      exhausted: 'Tirzepatide\'s GIP pathway improves how your body uses energy, addressing the fatigue that comes with metabolic inefficiency.',
      low_all_day: 'The dual mechanism stabilises both appetite and energy metabolism — so you\'re not just eating less, you\'re functioning better.',
      afternoon_crash: 'GIP signalling directly improves insulin sensitivity, which helps prevent the blood sugar dips that cause afternoon crashes.',
    },
    weightOutcome: {
      major_transform: 'Tirzepatide delivers strong, consistent body composition changes through its dual pathway — structured enough for significant goals.',
      clothing_size: 'Steady body composition change is Tirzepatide\'s strength. The dual mechanism keeps progress consistent week over week.',
      lose_5_10: 'For moderate, targeted weight loss, Tirzepatide provides precise dual-pathway support without over-intervention.',
      stop_gaining: 'Tirzepatide\'s balanced appetite and metabolic signalling helps reset your baseline so weight stabilises naturally.',
    },
  },
  '18': {
    weightChallenge: {
      cravings: 'Cagrilintide mimics your body\'s natural "I\'m full" hormone. Instead of fighting cravings with willpower, you genuinely feel satisfied after eating.',
      slow_metabolism: 'By amplifying satiety signals, Cagrilintide naturally reduces calorie intake — giving your metabolism a chance to catch up without extreme restriction.',
      belly_fat: 'Cagrilintide targets the fullness pathway specifically, reducing overall calorie intake consistently — which is key for shifting stubborn areas over time.',
      yo_yo: 'The reason diets fail is hunger eventually wins. Cagrilintide makes you feel full naturally, breaking the restrict-binge cycle that causes rebound.',
    },
    duration: {
      just_starting: 'Cagrilintide is the gentlest entry point in our catalogue. It works with your body\'s existing fullness signals rather than overriding them.',
      few_months: 'A few months of effort means you understand the basics. Cagrilintide adds a targeted fullness mechanism that makes what you\'re already doing more effective.',
      over_a_year: 'After a year of struggling with hunger, a dedicated fullness compound targets the exact mechanism that\'s been undermining your progress.',
      years: 'Years of fighting hunger means you need something that addresses the root cause. Cagrilintide amplifies the satisfaction signal your body already has.',
    },
    energy: {
      exhausted: 'Constant hunger drains energy. By resolving the hunger signal, Cagrilintide frees up the mental and physical energy you\'ve been spending on food resistance.',
      low_all_day: 'When you\'re not constantly battling appetite, your body redirects that energy. Many users report improved sustained energy within weeks.',
      afternoon_crash: 'Afternoon crashes often coincide with snacking patterns. Cagrilintide reduces the urge to snack by making meals more satisfying.',
    },
    weightOutcome: {
      major_transform: 'Major transformations start with consistent calorie control. Cagrilintide provides that through natural satiety — no willpower required.',
      clothing_size: 'Dropping a size comes from sustained, moderate calorie reduction. Cagrilintide\'s fullness mechanism delivers exactly that.',
      lose_5_10: 'For moderate weight loss, Cagrilintide is often the perfect match — effective enough to see results, gentle enough to sustain them.',
      stop_gaining: 'Stopping weight gain is about resetting hunger signals. Cagrilintide addresses the exact mechanism that drives overeating.',
    },
  },
  '21': {
    weightChallenge: {
      slow_metabolism: 'Reta 2.0\'s enhanced bioavailability delivers stronger metabolic reactivation through the same triple-agonist pathway — maximum intervention for maximum resistance.',
      belly_fat: 'The enhanced formulation delivers a stronger hormonal signal to mobilise stubborn fat stores — built for profiles where standard formulations aren\'t enough.',
      cravings: 'Reta 2.0\'s enhanced absorption means stronger appetite suppression through all three pathways from the first week.',
      yo_yo: 'Enhanced bioavailability means your body gets a clearer, stronger metabolic signal — harder for it to adapt around, which prevents the rebound cycle.',
    },
    duration: {
      years: 'Years of metabolic resistance calls for the strongest tool available. Reta 2.0 is our most aggressive formulation — reserved for exactly this profile.',
      over_a_year: 'Extended struggle indicates deep metabolic adaptation. Reta 2.0\'s enhanced formula cuts through that resistance more effectively.',
      few_months: 'Enhanced formulation gives you a head start — stronger signals from day one mean faster initial response.',
      just_starting: 'Even starting out, the enhanced formula provides clearer metabolic direction, though your practitioner may adjust dosing for your experience level.',
    },
    energy: {
      exhausted: 'Exhaustion paired with metabolic resistance points to deep cellular inefficiency. Reta 2.0\'s enhanced delivery targets this with maximum potency.',
      low_all_day: 'The enhanced bioavailability means better absorption and utilisation — so the energy and metabolic benefits kick in faster.',
      afternoon_crash: 'Enhanced formula means more consistent metabolic signalling throughout the day, reducing the energy fluctuations that cause crashes.',
    },
    weightOutcome: {
      major_transform: 'For a major transformation, Reta 2.0\'s enhanced potency is specifically designed to deliver aggressive, measurable results.',
      clothing_size: 'Enhanced bioavailability means faster, more visible body composition changes week over week.',
      lose_5_10: 'The enhanced formula achieves targeted results efficiently — often faster than standard formulations for moderate goals.',
      stop_gaining: 'Breaking the gain cycle requires a strong reset. Reta 2.0\'s enhanced delivery provides the clearest metabolic signal available.',
    },
  },
}

const STRENGTH_REASONS: Record<string, AnswerReasonMap> = {
  '8': {
    fitnessChallenge: {
      soreness: 'BPC-157 accelerates connective tissue repair and reduces inflammation — so the micro-damage from training heals faster and you\'re not sore for days.',
      plateau: 'Plateaus often come from accumulated micro-injuries limiting intensity. BPC-157 repairs that underlying tissue damage so you can push harder again.',
      nagging_injury: 'BPC-157 is the most studied compound for tissue repair. It promotes new blood vessel growth directly to injury sites and accelerates healing.',
      slower_recovery: 'Recovery slows because tissue repair mechanisms decline with age. BPC-157 directly supports the angiogenesis and repair pathways that have weakened.',
    },
    duration: {
      just_starting: 'Starting with BPC-157 means you\'re addressing recovery from the foundation up — before cumulative damage becomes a bigger problem.',
      few_months: 'A few months of accumulated training stress responds well to targeted repair. BPC-157 clears the backlog and keeps you progressing.',
      over_a_year: 'Over a year of stress without adequate repair means tissue damage has accumulated. BPC-157 specifically targets that repair deficit.',
      years: 'Years of training means years of accumulated micro-damage. BPC-157\'s broad tissue repair mechanism addresses the full history, not just recent sessions.',
    },
    activityLevel: {
      '1_2_days': 'Even at lower training volume, recovery matters. BPC-157 ensures each session\'s damage is fully repaired before the next.',
      '3_4_days': 'Training 3–4 days creates a recovery demand that BPC-157 supports — enough repair between sessions to keep progressing.',
      '5_6_days': 'At this volume, recovery becomes the limiting factor. BPC-157\'s repair acceleration is critical to sustaining that workload.',
      every_day: 'Daily training means zero recovery margin. BPC-157 provides the tissue repair support your body needs to handle that demand.',
    },
    fitnessOutcome: {
      pain_free: 'Pain-free training starts with healing what\'s damaged. BPC-157 targets tissue repair at the source — tendons, ligaments, and connective tissue.',
      break_plateaus: 'Breaking plateaus means training harder. BPC-157 clears the tissue damage holding you back so you can increase intensity safely.',
      recover_faster: 'Faster recovery is BPC-157\'s primary mechanism. It accelerates the healing process your body already uses, cutting days off recovery time.',
      stay_strong_aging: 'Aging slows tissue repair. BPC-157 supports the repair mechanisms that decline with age, keeping recovery rates closer to your peak.',
    },
  },
  '10': {
    fitnessChallenge: {
      soreness: 'TB-500 promotes cell migration to damaged areas throughout your body — reducing the widespread soreness that comes from intense training.',
      plateau: 'TB-500 improves systemic recovery capacity, meaning you can handle more volume and intensity — the two things that break plateaus.',
      nagging_injury: 'TB-500 supports both local repair and system-wide recovery, helping resolve persistent injuries while maintaining overall training capacity.',
      slower_recovery: 'TB-500 directly addresses the cellular migration and repair processes that slow down with age — restoring recovery speed at the systemic level.',
    },
    duration: {
      just_starting: 'TB-500 sets up strong systemic recovery from the start — building the repair capacity you need as training intensity increases.',
      few_months: 'A few months of training means your body is adapting to new demands. TB-500 ensures recovery keeps pace with your increasing workload.',
      over_a_year: 'Sustained training builds cumulative systemic stress. TB-500 restores the system-wide recovery capacity that hard training depletes.',
      years: 'Years of training creates deep systemic recovery debt. TB-500\'s whole-body repair mechanism addresses recovery at the level you need.',
    },
    activityLevel: {
      '3_4_days': 'At 3–4 days, systemic recovery becomes important. TB-500 ensures your whole body — not just specific muscles — recovers between sessions.',
      '5_6_days': 'Training 5–6 days means recovery is your bottleneck. TB-500\'s systemic approach keeps pace with high training frequency.',
      every_day: 'Daily training requires exceptional recovery capacity. TB-500 accelerates cell migration and repair throughout your entire body.',
      '1_2_days': 'Even with less frequent training, systemic recovery affects how productive each session is. TB-500 ensures you get maximum benefit.',
    },
    fitnessOutcome: {
      pain_free: 'TB-500 reduces systemic inflammation and promotes repair — addressing the widespread aches that accumulate from training stress.',
      break_plateaus: 'Better systemic recovery means you can train harder and more often. TB-500 gives you the recovery capacity to push past your plateau.',
      recover_faster: 'This is TB-500\'s core function — accelerating cell migration to damaged areas so your recovery time drops measurably.',
      stay_strong_aging: 'TB-500 counteracts the systemic recovery decline that comes with age, helping maintain the training capacity you had years ago.',
    },
  },
  '20': {
    fitnessChallenge: {
      soreness: 'Wolverine combines targeted tissue repair (BPC-157) with systemic recovery (TB-500) — addressing both the injury site and overall soreness simultaneously.',
      plateau: 'Plateaus happen when recovery can\'t match training demand. Wolverine provides both localised repair and system-wide recovery to break through.',
      nagging_injury: 'Wolverine is the "fix everything" option — BPC-157 heals the specific injury while TB-500 restores the systemic recovery your body has been borrowing from.',
      slower_recovery: 'Age-related recovery decline hits both locally and systemically. Wolverine addresses both pathways simultaneously — the most comprehensive recovery option we offer.',
    },
    duration: {
      years: 'Years of accumulated damage needs a comprehensive approach. Wolverine combines local tissue repair and systemic recovery in one protocol.',
      over_a_year: 'Extended training creates both specific damage and systemic recovery debt. Wolverine addresses both — which is why it scored highest for your profile.',
      few_months: 'Even early on, combining local and systemic recovery prevents the damage accumulation that slows progress later.',
      just_starting: 'Starting with comprehensive recovery support means building on a solid foundation — addressing damage before it becomes chronic.',
    },
    activityLevel: {
      '5_6_days': 'At this frequency, you need both local repair and systemic recovery. Wolverine\'s dual mechanism matches this demand.',
      every_day: 'Daily training demands the most comprehensive recovery support available. Wolverine\'s combined pathways are built for this workload.',
      '3_4_days': 'Moderate-high training benefits from comprehensive recovery. Wolverine ensures both specific damage and overall fatigue are addressed.',
      '1_2_days': 'Even with lower volume, combining tissue repair and systemic recovery maximises the benefit from every session.',
    },
    fitnessOutcome: {
      pain_free: 'Wolverine attacks pain from both angles — BPC-157 repairs damaged tissue while TB-500 reduces systemic inflammation. The fastest path to pain-free training.',
      break_plateaus: 'Comprehensive recovery means higher training capacity. Wolverine removes recovery as the bottleneck so you can increase volume and intensity.',
      recover_faster: 'Two complementary recovery pathways working simultaneously means faster results than either compound alone.',
      stay_strong_aging: 'Aging affects both local tissue repair and systemic recovery. Wolverine addresses both declines in one protocol.',
    },
  },
}

const CELLULAR_REASONS: Record<string, AnswerReasonMap> = {
  '4': {
    agingConcern: {
      skin: 'GHK-Cu is the gold standard for collagen and elastin production. It directly tells your skin cells to rebuild the structural proteins that keep skin firm and youthful.',
      energy_mental: 'GHK-Cu supports cellular repair broadly, including skin cells that reflect your internal health. Improved skin quality often correlates with better overall cellular function.',
      joint_stiffness: 'GHK-Cu promotes connective tissue repair and collagen synthesis — which supports joint health alongside visible skin improvements.',
      all_of_it: 'GHK-Cu rebuilds the extracellular matrix — the structural foundation of your skin, joints, and connective tissue. It addresses aging at the structural level.',
    },
    duration: {
      just_starting: 'GHK-Cu is one of the best-studied and safest starting points for visible anti-aging results. You\'ll see changes in your skin within weeks.',
      few_months: 'A few months of awareness means you\'re ready for targeted action. GHK-Cu delivers visible skin results faster than most alternatives.',
      over_a_year: 'Over a year of skin changes means collagen loss has accelerated. GHK-Cu directly stimulates the production your skin needs to recover.',
      years: 'Years of collagen decline requires direct intervention. GHK-Cu is the most studied compound for rebuilding what time has taken.',
    },
    agingOutcome: {
      skin_hair: 'This is GHK-Cu\'s primary domain — collagen and elastin production for visible improvements in skin firmness, texture, and hair quality.',
      energy_clarity: 'GHK-Cu\'s cellular repair benefits extend beyond skin — improved cellular function supports energy and clarity as a secondary benefit.',
      sleep_stress: 'Better cellular health through GHK-Cu supports the repair processes your body performs during sleep, potentially improving rest quality.',
      overall_vitality: 'GHK-Cu rebuilds your body\'s structural foundation — the extracellular matrix — which supports multiple systems simultaneously.',
    },
  },
  '6': {
    agingConcern: {
      skin: 'Glow combines GHK-Cu (collagen rebuilding) with BPC-157 and TB-500 (tissue repair) — addressing skin quality from both the structural and repair pathways.',
      energy_mental: 'Glow\'s triple stack addresses cellular repair (BPC-157), recovery (TB-500), and structural renewal (GHK-Cu) — supporting energy through comprehensive cellular rejuvenation.',
      joint_stiffness: 'Glow combines tissue repair (BPC-157 + TB-500) with structural renewal (GHK-Cu) — the most comprehensive approach for joint health and visible aging.',
      all_of_it: 'You want to address everything — Glow was built for exactly that. Three complementary pathways working on repair, recovery, and renewal simultaneously.',
    },
    duration: {
      years: 'Years of aging calls for the most comprehensive intervention. Glow\'s triple stack addresses repair, recovery, and renewal in one protocol.',
      over_a_year: 'Extended concern about aging means multiple systems need attention. Glow\'s three pathways address them simultaneously.',
      few_months: 'Starting a comprehensive protocol early means you\'re ahead of the curve. Glow sets up all three renewal pathways from day one.',
      just_starting: 'Glow is comprehensive but well-studied. Each component has an established safety profile, and your practitioner guides everything.',
    },
    agingOutcome: {
      skin_hair: 'Glow delivers visible skin results through GHK-Cu while BPC-157 and TB-500 accelerate the underlying tissue repair that supports lasting improvements.',
      energy_clarity: 'The repair and recovery components (BPC-157 + TB-500) address cellular function while GHK-Cu rebuilds structure — comprehensive energy renewal.',
      sleep_stress: 'Glow\'s systemic repair mechanisms support the cellular processes your body relies on during sleep and stress recovery.',
      overall_vitality: 'Overall vitality requires a comprehensive approach. Glow\'s three pathways address repair, recovery, and renewal simultaneously — exactly what "age better" requires.',
    },
  },
  '19': {
    agingConcern: {
      energy_mental: 'MOTC targets mitochondria — your cells\' power plants. When they decline, energy and mental sharpness go first. MOTC directly recharges cellular energy production.',
      skin: 'Mitochondrial health affects every cell, including skin. MOTC improves cellular energy production, which supports skin cell renewal as a downstream benefit.',
      joint_stiffness: 'Cellular energy decline affects repair capacity. MOTC restores mitochondrial function so your cells have the energy to repair and maintain joint tissue.',
      all_of_it: 'Mitochondria power everything in your body. MOTC improves cellular energy production at the source — which cascades into energy, clarity, skin, and recovery.',
    },
    duration: {
      just_starting: 'MOTC addresses the foundational issue — cellular energy production. Starting here means every other health improvement has better fuel to work with.',
      few_months: 'A few months of declining energy points to mitochondrial slowdown. MOTC targets this at the cellular level rather than masking it with stimulants.',
      over_a_year: 'Sustained energy decline is a clear mitochondrial signal. MOTC directly restores the cellular energy machinery that\'s been declining.',
      years: 'Years of declining energy means deep mitochondrial deficit. MOTC is the most direct intervention for restoring cellular energy production.',
    },
    agingOutcome: {
      energy_clarity: 'This is exactly what MOTC does — improves mitochondrial energy production, which directly translates to sustained energy and sharper mental clarity.',
      skin_hair: 'Mitochondrial health drives skin cell turnover. MOTC improves the energy available for cellular repair and renewal, supporting skin quality.',
      sleep_stress: 'Better cellular energy production improves your body\'s capacity for recovery and stress resilience — starting at the mitochondrial level.',
      overall_vitality: 'Mitochondria are the foundation of vitality. MOTC restores energy production at the cellular level, supporting every system that depends on it.',
    },
  },
  '7': {
    agingConcern: {
      energy_mental: 'NAD+ is the central coenzyme in cellular energy metabolism. Your levels naturally decline with age — restoring them directly addresses energy and cognitive function.',
      skin: 'NAD+ supports DNA repair in every cell, including skin cells. Restored NAD+ levels improve cellular repair capacity, which benefits skin health.',
      joint_stiffness: 'NAD+ decline affects cellular repair throughout your body. Restoring levels supports the repair processes joints depend on.',
      all_of_it: 'NAD+ sits at the centre of cellular energy, DNA repair, and metabolic function. Declining levels affect everything — restoring them addresses aging at the most fundamental level.',
    },
    duration: {
      just_starting: 'NAD+ supplementation is one of the most foundational anti-aging interventions. It restores the coenzyme every cell needs to function optimally.',
      few_months: 'A few months of awareness means you\'re ready for a foundation-level intervention. NAD+ restores what time naturally depletes.',
      over_a_year: 'Over a year of concern signals real decline. NAD+ directly restores the cellular coenzyme that drops steadily with age.',
      years: 'Years of decline points to a significant NAD+ deficit. Direct supplementation restores the foundational molecule your cells have been losing.',
    },
    agingOutcome: {
      energy_clarity: 'NAD+ is the coenzyme your cells use to produce energy. Restoring levels directly improves both sustained energy and mental clarity.',
      skin_hair: 'NAD+ powers the DNA repair mechanisms that keep skin cells healthy. Restored levels support skin quality from the inside out.',
      sleep_stress: 'NAD+ supports the cellular repair processes that happen during sleep. Restored levels improve both sleep quality and stress resilience.',
      overall_vitality: 'NAD+ is the most foundational molecule in cellular health. Restoring it improves energy, repair, and metabolic function simultaneously.',
    },
  },
}

const ALL_ANSWER_REASONS: Record<string, Record<string, AnswerReasonMap>> = {
  weight_management: WEIGHT_REASONS,
  strength_recovery: STRENGTH_REASONS,
  cellular_repair: CELLULAR_REASONS,
}

export function getAnswerReasons(
  compoundId: string,
  goal: string,
  answers: Record<string, unknown>,
  level: ExperienceLevel = 'intermediate',
): AnswerReason[] {
  const goalMap = ALL_ANSWER_REASONS[goal]
  if (!goalMap) return []
  const compoundMap = goalMap[compoundId]
  if (!compoundMap) return []

  const fieldLabels: Record<string, string> = {
    weightChallenge: 'Your main challenge',
    fitnessChallenge: 'Your main frustration',
    agingConcern: 'Your top concern',
    duration: 'How long you\'ve been at this',
    energy: 'Your energy level',
    weightOutcome: 'Your 90-day goal',
    fitnessOutcome: 'Your ideal outcome',
    agingOutcome: 'Where you want results first',
    activityLevel: 'Your activity level',
  }

  const answerLabels: Record<string, Record<string, string>> = {
    weightChallenge: { cravings: 'Cravings and appetite', slow_metabolism: 'Slow metabolism', belly_fat: 'Stubborn belly fat', yo_yo: 'Yo-yo weight cycling' },
    fitnessChallenge: { soreness: 'Post-training soreness', plateau: 'Strength plateau', nagging_injury: 'Nagging injury', slower_recovery: 'Slower recovery' },
    agingConcern: { skin: 'Skin changes', energy_mental: 'Energy and sharpness decline', joint_stiffness: 'Joint stiffness', all_of_it: 'Overall aging' },
    duration: { just_starting: 'Just getting started', few_months: 'A few months', over_a_year: 'Over a year', years: 'Years of effort' },
    energy: { great: 'Great energy', afternoon_crash: 'Afternoon crashes', low_all_day: 'Low all day', exhausted: 'Exhausted' },
    weightOutcome: { lose_5_10: 'Lose 5–10 lbs', clothing_size: 'Drop a clothing size', major_transform: 'Major transformation', stop_gaining: 'Stop gaining' },
    fitnessOutcome: { pain_free: 'Train pain-free', break_plateaus: 'Break plateaus', recover_faster: 'Recover faster', stay_strong_aging: 'Stay strong with age' },
    agingOutcome: { skin_hair: 'Skin & hair', energy_clarity: 'Energy & clarity', sleep_stress: 'Sleep & stress', overall_vitality: 'Overall vitality' },
    activityLevel: { '1_2_days': '1–2 days/week', '3_4_days': '3–4 days/week', '5_6_days': '5–6 days/week', every_day: 'Every day' },
  }

  const results: AnswerReason[] = []

  const challengeField = goal === 'weight_management' ? 'weightChallenge'
    : goal === 'strength_recovery' ? 'fitnessChallenge'
    : 'agingConcern'
  const outcomeField = goal === 'weight_management' ? 'weightOutcome'
    : goal === 'strength_recovery' ? 'fitnessOutcome'
    : 'agingOutcome'
  const activityField = goal === 'strength_recovery' ? 'activityLevel' : null

  const orderedFields = [challengeField, 'duration', 'energy', ...(activityField ? [activityField] : []), outcomeField]

  for (const field of orderedFields) {
    const val = answers[field] as string | undefined
    if (!val) continue
    const reasons = compoundMap[field]
    if (!reasons || !reasons[val]) continue

    let reason = reasons[val]
    if (level === 'beginner') {
      reason = reason
        .replace(/GLP-1/g, 'appetite pathway')
        .replace(/GIP/g, 'energy pathway')
        .replace(/glucagon/g, 'fat-burning pathway')
        .replace(/angiogenesis/g, 'new blood vessel growth')
        .replace(/mitochondria/g, 'cellular power plants')
        .replace(/mitochondrial/g, 'cellular energy')
        .replace(/coenzyme/g, 'cellular molecule')
        .replace(/extracellular matrix/g, 'structural foundation')
    }

    results.push({
      label: fieldLabels[field] ?? field,
      answer: answerLabels[field]?.[val] ?? val,
      reason,
    })
  }

  return results.slice(0, 4)
}
