import type { UserProfile } from '../context/AuthContext'
import type { MealPlan, Meal, Workout } from './memberData'

const ACTIVITY_MULTIPLIER: Record<UserProfile['activityLevel'], number> = {
  'sedentary': 1.2,
  'light': 1.375,
  'moderate': 1.55,
  'active': 1.725,
  'very-active': 1.9,
}

export function calcBMR(p: UserProfile): number {
  if (p.gender === 'male') {
    return 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age + 5
  }
  return 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age - 161
}

export function calcTDEE(p: UserProfile): number {
  return Math.round(calcBMR(p) * ACTIVITY_MULTIPLIER[p.activityLevel])
}

export function calcTargetCalories(p: UserProfile): number {
  const tdee = calcTDEE(p)
  if (p.goal === 'lose') return Math.round(tdee * 0.8)
  if (p.goal === 'gain') return Math.round(tdee * 1.15)
  return tdee
}

export interface MacroTargets {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export function calcMacros(p: UserProfile): MacroTargets {
  const cal = calcTargetCalories(p)
  let proteinPerKg = 1.8
  if (p.goal === 'lose') proteinPerKg = 2.2
  if (p.goal === 'gain') proteinPerKg = 2.0
  if (p.dietPref === 'high-protein') proteinPerKg += 0.3

  const protein = Math.round(p.weightKg * proteinPerKg)
  const proteinCal = protein * 4

  let fatPct = 0.25
  if (p.dietPref === 'low-carb') fatPct = 0.35

  const fatCal = Math.round(cal * fatPct)
  const fat = Math.round(fatCal / 9)

  const carbCal = cal - proteinCal - fatCal
  const carbs = Math.max(50, Math.round(carbCal / 4))

  return { calories: cal, protein, carbs, fat }
}

interface MealTemplate {
  name: string
  timeLose: string
  timeMaintain: string
  calPct: number
  items: {
    lose: string[]
    maintain: string[]
    gain: string[]
  }
}

const MEAL_TEMPLATES: MealTemplate[] = [
  {
    name: 'Breakfast',
    timeLose: '7:30 AM', timeMaintain: '7:00 AM',
    calPct: 0.25,
    items: {
      lose: ['3 egg white omelette with spinach & peppers', '1 slice wholemeal toast', 'Black coffee or green tea'],
      maintain: ['2 whole eggs + 1 white scrambled', '1 slice sourdough with avocado', 'Mixed berries (80g)', 'Coffee or tea'],
      gain: ['4 scrambled eggs with cheese', '2 slices wholemeal toast with butter', 'Large banana', 'Glass of milk'],
    },
  },
  {
    name: 'Mid-Morning Snack',
    timeLose: '10:00 AM', timeMaintain: '10:00 AM',
    calPct: 0.1,
    items: {
      lose: ['Greek yoghurt (0% fat, 150g)', '10 almonds'],
      maintain: ['Apple with 1 tbsp peanut butter', 'Handful of mixed nuts'],
      gain: ['Protein shake (whey + milk)', 'Rice cakes with honey (2)'],
    },
  },
  {
    name: 'Lunch',
    timeLose: '1:00 PM', timeMaintain: '1:00 PM',
    calPct: 0.3,
    items: {
      lose: ['Grilled chicken breast (150g)', 'Large mixed salad with olive oil', 'Sweet potato (100g)', 'Steamed broccoli'],
      maintain: ['Turkey & avocado wrap (wholemeal)', 'Side salad with hummus', 'Cherry tomatoes', 'Small fruit'],
      gain: ['Double chicken breast (200g)', 'Large jacket potato with tuna', 'Coleslaw', 'Side of baked beans'],
    },
  },
  {
    name: 'Afternoon Snack',
    timeLose: '4:00 PM', timeMaintain: '4:00 PM',
    calPct: 0.1,
    items: {
      lose: ['Protein shake (30g whey in water)', '1 small banana'],
      maintain: ['Cottage cheese (150g) with celery', 'Handful of walnuts'],
      gain: ['Protein smoothie (whey, oats, banana, milk)', 'Handful of cashews'],
    },
  },
  {
    name: 'Dinner',
    timeLose: '7:00 PM', timeMaintain: '7:30 PM',
    calPct: 0.25,
    items: {
      lose: ['Salmon fillet (150g)', 'Brown rice (80g cooked)', 'Roasted Mediterranean vegetables', 'Lemon dressing'],
      maintain: ['Lean beef stir-fry (150g)', 'Basmati rice (100g cooked)', 'Pak choi, peppers, mushrooms', 'Soy ginger sauce'],
      gain: ['Pasta bolognese (lean mince 180g)', 'Wholemeal pasta (120g dry)', 'Parmesan cheese', 'Side salad with olive oil'],
    },
  },
]

export function generateMealPlan(p: UserProfile): MealPlan {
  const macros = calcMacros(p)
  const goalLabel = p.goal === 'lose' ? 'Fat Loss' : p.goal === 'gain' ? 'Muscle Gain' : 'Maintenance'

  const meals: Meal[] = MEAL_TEMPLATES.map(t => {
    const mealCal = Math.round(macros.calories * t.calPct)
    const mealProtein = Math.round(macros.protein * t.calPct)
    const mealCarbs = Math.round(macros.carbs * t.calPct)
    const mealFat = Math.round(macros.fat * t.calPct)
    const items = t.items[p.goal]
    const time = p.goal === 'lose' ? t.timeLose : t.timeMaintain

    return {
      time,
      name: t.name,
      calories: mealCal,
      protein: mealProtein,
      carbs: mealCarbs,
      fat: mealFat,
      items,
    }
  })

  return {
    id: 'personalised',
    name: `Your ${goalLabel} Plan — ${macros.calories} cal`,
    calories: macros.calories,
    protein: macros.protein,
    carbs: macros.carbs,
    fat: macros.fat,
    meals,
    tags: [p.goal, p.dietPref],
  }
}

const BEGINNER_EXERCISES = [
  { name: 'Goblet Squats', sets: 3, reps: '10-12', rest: '60s' },
  { name: 'Dumbbell Romanian Deadlifts', sets: 3, reps: '10-12', rest: '60s' },
  { name: 'Dumbbell Bench Press', sets: 3, reps: '10-12', rest: '60s' },
  { name: 'Seated Cable Rows', sets: 3, reps: '10-12', rest: '60s' },
  { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: '60s' },
  { name: 'Plank Hold', sets: 3, reps: '30 sec', rest: '30s' },
  { name: 'Leg Press', sets: 3, reps: '12-15', rest: '60s' },
  { name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: '60s' },
  { name: 'Bicep Curls', sets: 2, reps: '12-15', rest: '45s' },
  { name: 'Tricep Pushdowns', sets: 2, reps: '12-15', rest: '45s' },
  { name: 'Leg Curls', sets: 3, reps: '12-15', rest: '45s' },
  { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '45s' },
]

const INTERMEDIATE_EXERCISES = [
  { name: 'Barbell Back Squats', sets: 4, reps: '8-10', rest: '90s' },
  { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s' },
  { name: 'Barbell Rows', sets: 4, reps: '8-10', rest: '90s' },
  { name: 'Romanian Deadlifts', sets: 4, reps: '10-12', rest: '60s' },
  { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s' },
  { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '60s' },
  { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60s' },
  { name: 'Face Pulls', sets: 3, reps: '15', rest: '45s' },
  { name: 'Leg Press', sets: 3, reps: '10-12', rest: '60s' },
  { name: 'Cable Rows', sets: 3, reps: '10-12', rest: '60s' },
  { name: 'Hammer Curls', sets: 3, reps: '12', rest: '45s' },
  { name: 'Overhead Tricep Extension', sets: 3, reps: '12', rest: '45s' },
  { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '30s' },
  { name: 'Hanging Leg Raises', sets: 3, reps: '12', rest: '45s' },
]

const ADVANCED_EXERCISES = [
  { name: 'Barbell Back Squats', sets: 5, reps: '5-8', rest: '2-3min' },
  { name: 'Conventional Deadlifts', sets: 4, reps: '5-8', rest: '2-3min' },
  { name: 'Barbell Bench Press', sets: 5, reps: '5-8', rest: '2min' },
  { name: 'Weighted Pull-ups', sets: 4, reps: '6-8', rest: '2min' },
  { name: 'Front Squats', sets: 4, reps: '8-10', rest: '90s' },
  { name: 'Barbell Overhead Press', sets: 4, reps: '6-8', rest: '2min' },
  { name: 'Bulgarian Split Squats', sets: 3, reps: '10 each', rest: '60s' },
  { name: 'Pendlay Rows', sets: 4, reps: '8-10', rest: '90s' },
  { name: 'Close-Grip Bench Press', sets: 3, reps: '10-12', rest: '60s' },
  { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s' },
  { name: 'Weighted Dips', sets: 3, reps: '8-10', rest: '60s' },
  { name: 'Cable Lateral Raises', sets: 4, reps: '12-15', rest: '45s' },
  { name: 'Ab Wheel Rollouts', sets: 3, reps: '10-12', rest: '45s' },
  { name: 'Calf Raises', sets: 5, reps: '15-20', rest: '30s' },
]

const RECOVERY_EXERCISES = [
  { name: 'Cat-Cow Stretches', sets: 2, reps: '10', rest: '—' },
  { name: 'Hip 90/90 Rotations', sets: 2, reps: '10 each', rest: '—' },
  { name: 'World\'s Greatest Stretch', sets: 2, reps: '8 each', rest: '—' },
  { name: 'Foam Roll Full Body', sets: 1, reps: '10 min', rest: '—' },
  { name: 'Band Pull-Aparts', sets: 3, reps: '15', rest: '30s' },
  { name: 'Glute Bridges', sets: 3, reps: '15', rest: '30s' },
  { name: 'Dead Bugs', sets: 3, reps: '10 each', rest: '30s' },
  { name: 'Brisk Walking', sets: 1, reps: '20 min', rest: '—' },
]

const CARDIO_EXERCISES = [
  { name: 'Kettlebell Swings', sets: 4, reps: '15', rest: '45s' },
  { name: 'Burpees', sets: 3, reps: '10', rest: '45s' },
  { name: 'Mountain Climbers', sets: 4, reps: '20 each', rest: '30s' },
  { name: 'Box Jumps', sets: 3, reps: '10', rest: '45s' },
  { name: 'Battle Ropes', sets: 3, reps: '30 sec', rest: '30s' },
  { name: 'Dumbbell Thrusters', sets: 3, reps: '12', rest: '60s' },
]

interface WorkoutTemplate {
  name: string
  day: string
  duration: string
  focus: string
  exercisePool: 'upper' | 'lower' | 'full' | 'cardio' | 'recovery'
}

function pickExercises(pool: string, exp: UserProfile['trainingExp'], count: number) {
  const lib = exp === 'beginner' ? BEGINNER_EXERCISES
    : exp === 'advanced' ? ADVANCED_EXERCISES
    : INTERMEDIATE_EXERCISES

  const isUpper = (name: string) => /bench|press|row|pull|curl|tricep|lateral|face|dip/i.test(name)
  const isLower = (name: string) => /squat|deadlift|lunge|leg|calf|split/i.test(name)

  let filtered = lib
  if (pool === 'upper') filtered = lib.filter(e => isUpper(e.name) || /plank|ab|hang/i.test(e.name))
  if (pool === 'lower') filtered = lib.filter(e => isLower(e.name) || /plank|ab|hang/i.test(e.name))
  if (pool === 'cardio') filtered = CARDIO_EXERCISES
  if (pool === 'recovery') filtered = RECOVERY_EXERCISES

  return filtered.slice(0, count)
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function generateWorkoutPlan(p: UserProfile): Workout[] {
  const days = Math.min(p.trainingDays, 6)
  const exerciseCount = p.trainingExp === 'beginner' ? 5 : p.trainingExp === 'advanced' ? 7 : 6
  const duration = p.trainingExp === 'beginner' ? '35 min' : p.trainingExp === 'advanced' ? '55 min' : '45 min'

  const templates: WorkoutTemplate[] = []

  if (days <= 2) {
    templates.push({ name: 'Full Body A', day: DAYS[0], duration, focus: 'Full body strength', exercisePool: 'full' })
    if (days === 2) templates.push({ name: 'Full Body B', day: DAYS[3], duration, focus: 'Full body conditioning', exercisePool: 'full' })
  } else if (days === 3) {
    templates.push({ name: 'Upper Body', day: DAYS[0], duration, focus: 'Upper body strength', exercisePool: 'upper' })
    templates.push({ name: 'Lower Body', day: DAYS[2], duration, focus: 'Lower body strength', exercisePool: 'lower' })
    templates.push({ name: 'Full Body + Conditioning', day: DAYS[4], duration, focus: 'Full body + cardio', exercisePool: 'full' })
  } else if (days === 4) {
    templates.push({ name: 'Upper Strength', day: DAYS[0], duration, focus: 'Upper body push & pull', exercisePool: 'upper' })
    templates.push({ name: 'Lower Strength', day: DAYS[1], duration, focus: 'Legs & glutes', exercisePool: 'lower' })
    templates.push({ name: 'Upper Hypertrophy', day: DAYS[3], duration, focus: 'Upper body volume', exercisePool: 'upper' })
    templates.push({ name: 'Lower + Conditioning', day: DAYS[4], duration, focus: 'Legs + metabolic', exercisePool: 'lower' })
  } else {
    templates.push({ name: 'Push Day', day: DAYS[0], duration, focus: 'Chest, shoulders, triceps', exercisePool: 'upper' })
    templates.push({ name: 'Pull Day', day: DAYS[1], duration, focus: 'Back, biceps', exercisePool: 'upper' })
    templates.push({ name: 'Legs', day: DAYS[2], duration, focus: 'Quads, hamstrings, glutes', exercisePool: 'lower' })
    templates.push({ name: 'Active Recovery', day: DAYS[3], duration: '30 min', focus: 'Mobility + light cardio', exercisePool: 'recovery' })
    templates.push({ name: 'Full Body Power', day: DAYS[4], duration, focus: 'Compound lifts', exercisePool: 'full' })
    if (days >= 6) {
      templates.push({ name: 'Cardio & Core', day: DAYS[5], duration: '40 min', focus: 'Metabolic conditioning', exercisePool: 'cardio' })
    }
  }

  if (p.goal === 'lose' && days >= 3) {
    const lastIdx = templates.length - 1
    if (templates[lastIdx].exercisePool !== 'cardio' && templates[lastIdx].exercisePool !== 'recovery') {
      templates.splice(Math.min(2, lastIdx), 0, {
        name: 'HIIT Conditioning',
        day: DAYS[Math.min(2, days - 1)],
        duration: '35 min',
        focus: 'Fat-burning circuit',
        exercisePool: 'cardio',
      })
      templates.splice(days)
    }
  }

  for (let i = 0; i < templates.length; i++) {
    templates[i].day = DAYS[i]
  }

  return templates.map((t, i) => ({
    id: `pw-${i}`,
    name: t.name,
    day: t.day,
    duration: t.duration,
    focus: t.focus,
    exercises: pickExercises(
      t.exercisePool,
      t.exercisePool === 'recovery' ? 'beginner' : p.trainingExp,
      t.exercisePool === 'recovery' ? 6 : exerciseCount,
    ),
  }))
}

export function getProfileSummary(p: UserProfile): { tdee: number; target: number; macros: MacroTargets; bmi: number } {
  const tdee = calcTDEE(p)
  const target = calcTargetCalories(p)
  const macros = calcMacros(p)
  const bmi = Math.round((p.weightKg / ((p.heightCm / 100) ** 2)) * 10) / 10
  return { tdee, target, macros, bmi }
}
