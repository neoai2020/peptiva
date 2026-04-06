export interface MealPlan {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  meals: Meal[]
  tags: string[]
}

export interface Meal {
  time: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  items: string[]
}

export interface Workout {
  id: string
  name: string
  day: string
  duration: string
  focus: string
  exercises: Exercise[]
}

export interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
  notes?: string
}

export interface WeightEntry {
  date: string
  weight: number
}

export interface WaterEntry {
  date: string
  glasses: number
}

export interface DoseEntry {
  date: string
  taken: boolean
  time?: string
}

export interface SupportArticle {
  id: string
  title: string
  category: string
  body: string
}

export const MEAL_PLANS: MealPlan[] = [
  {
    id: 'cut-1800',
    name: 'Lean Cut — 1800 cal',
    calories: 1800,
    protein: 160,
    carbs: 150,
    fat: 65,
    tags: ['weight-loss', 'high-protein'],
    meals: [
      { time: '7:30 AM', name: 'Breakfast', calories: 420, protein: 35, carbs: 40, fat: 14, items: ['3 egg omelette with spinach & feta', '1 slice sourdough toast', 'Black coffee or green tea'] },
      { time: '10:30 AM', name: 'Snack', calories: 180, protein: 25, carbs: 10, fat: 5, items: ['Greek yoghurt (0% fat, 170g)', '10 almonds'] },
      { time: '1:00 PM', name: 'Lunch', calories: 480, protein: 42, carbs: 45, fat: 16, items: ['Grilled chicken breast (150g)', 'Sweet potato (120g)', 'Mixed salad with olive oil dressing', 'Steamed broccoli'] },
      { time: '4:00 PM', name: 'Snack', calories: 200, protein: 30, carbs: 12, fat: 5, items: ['Protein shake (30g whey in water)', '1 small banana'] },
      { time: '7:00 PM', name: 'Dinner', calories: 520, protein: 38, carbs: 43, fat: 25, items: ['Salmon fillet (150g)', 'Brown rice (100g cooked)', 'Roasted Mediterranean vegetables', 'Lemon & herb dressing'] },
    ],
  },
  {
    id: 'maintain-2200',
    name: 'Maintenance — 2200 cal',
    calories: 2200,
    protein: 175,
    carbs: 220,
    fat: 72,
    tags: ['maintenance', 'balanced'],
    meals: [
      { time: '7:00 AM', name: 'Breakfast', calories: 520, protein: 38, carbs: 55, fat: 16, items: ['Overnight oats (60g oats, 200ml milk)', 'Scoop of protein powder', 'Blueberries & sliced banana', 'Drizzle of honey'] },
      { time: '10:00 AM', name: 'Snack', calories: 250, protein: 20, carbs: 28, fat: 8, items: ['Rice cakes (2) with peanut butter', 'Sliced apple'] },
      { time: '1:00 PM', name: 'Lunch', calories: 580, protein: 45, carbs: 55, fat: 18, items: ['Turkey & avocado wrap (wholemeal tortilla)', 'Mixed leaf salad', 'Hummus (2 tbsp)', 'Cherry tomatoes'] },
      { time: '4:00 PM', name: 'Snack', calories: 220, protein: 30, carbs: 15, fat: 6, items: ['Cottage cheese (150g)', 'Handful of walnuts', 'Celery sticks'] },
      { time: '7:30 PM', name: 'Dinner', calories: 630, protein: 42, carbs: 67, fat: 24, items: ['Lean beef stir-fry (150g sirloin strips)', 'Basmati rice (130g cooked)', 'Pak choi, peppers, mushrooms', 'Soy & ginger sauce'] },
    ],
  },
  {
    id: 'bulk-2800',
    name: 'Lean Bulk — 2800 cal',
    calories: 2800,
    protein: 200,
    carbs: 310,
    fat: 85,
    tags: ['muscle-gain', 'high-protein'],
    meals: [
      { time: '7:00 AM', name: 'Breakfast', calories: 650, protein: 45, carbs: 70, fat: 20, items: ['4 scrambled eggs', '2 slices wholemeal toast with butter', 'Large banana', 'Glass of orange juice'] },
      { time: '10:00 AM', name: 'Snack', calories: 350, protein: 35, carbs: 35, fat: 10, items: ['Protein smoothie (whey, oats, milk, berries)', 'Handful of cashews'] },
      { time: '1:00 PM', name: 'Lunch', calories: 720, protein: 50, carbs: 75, fat: 22, items: ['Double chicken breast (250g)', 'Large jacket potato', 'Coleslaw', 'Side of baked beans'] },
      { time: '4:00 PM', name: 'Post-Workout', calories: 380, protein: 40, carbs: 45, fat: 8, items: ['Protein shake with milk', '2 rice cakes with jam', 'Banana'] },
      { time: '7:30 PM', name: 'Dinner', calories: 700, protein: 30, carbs: 85, fat: 25, items: ['Pasta bolognese (lean mince 150g)', 'Wholemeal pasta (120g dry)', 'Parmesan cheese', 'Side salad with olive oil'] },
    ],
  },
]

export const WORKOUT_PLANS: Record<string, Workout[]> = {
  'weight-loss': [
    {
      id: 'wl-1', name: 'Upper Body Burn', day: 'Monday', duration: '45 min', focus: 'Upper body + conditioning',
      exercises: [
        { name: 'Dumbbell Bench Press', sets: 4, reps: '10-12', rest: '60s' },
        { name: 'Bent-Over Rows', sets: 4, reps: '10-12', rest: '60s' },
        { name: 'Overhead Press', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Bicep Curls', sets: 3, reps: '12-15', rest: '45s' },
        { name: 'Tricep Dips', sets: 3, reps: '12-15', rest: '45s' },
        { name: 'Plank Hold', sets: 3, reps: '45 sec', rest: '30s' },
      ],
    },
    {
      id: 'wl-2', name: 'Lower Body Power', day: 'Tuesday', duration: '45 min', focus: 'Legs + glutes',
      exercises: [
        { name: 'Barbell Squats', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Romanian Deadlifts', sets: 4, reps: '10-12', rest: '60s' },
        { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '60s' },
        { name: 'Leg Press', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '30s' },
        { name: 'Leg Curls', sets: 3, reps: '12-15', rest: '45s' },
      ],
    },
    {
      id: 'wl-3', name: 'Active Recovery', day: 'Wednesday', duration: '30 min', focus: 'Mobility + light cardio',
      exercises: [
        { name: 'Brisk Walking or Cycling', sets: 1, reps: '15 min', rest: '—' },
        { name: 'Foam Rolling (Full Body)', sets: 1, reps: '10 min', rest: '—' },
        { name: 'Hip Flexor Stretch', sets: 2, reps: '60 sec each', rest: '—' },
        { name: 'Cat-Cow Mobility', sets: 2, reps: '10 reps', rest: '—' },
        { name: 'Deep Breathing', sets: 1, reps: '5 min', rest: '—' },
      ],
    },
    {
      id: 'wl-4', name: 'Full Body HIIT', day: 'Thursday', duration: '40 min', focus: 'Metabolic conditioning',
      exercises: [
        { name: 'Kettlebell Swings', sets: 4, reps: '15', rest: '45s' },
        { name: 'Burpees', sets: 4, reps: '10', rest: '45s' },
        { name: 'Mountain Climbers', sets: 4, reps: '20 each', rest: '30s' },
        { name: 'Dumbbell Thrusters', sets: 3, reps: '12', rest: '60s' },
        { name: 'Battle Ropes', sets: 3, reps: '30 sec', rest: '30s' },
        { name: 'Box Jumps', sets: 3, reps: '10', rest: '45s' },
      ],
    },
    {
      id: 'wl-5', name: 'Push & Pull', day: 'Friday', duration: '50 min', focus: 'Strength + hypertrophy',
      exercises: [
        { name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', rest: '60s' },
        { name: 'Cable Rows', sets: 4, reps: '10-12', rest: '60s' },
        { name: 'Lateral Raises', sets: 3, reps: '15', rest: '45s' },
        { name: 'Face Pulls', sets: 3, reps: '15', rest: '45s' },
        { name: 'Hammer Curls', sets: 3, reps: '12', rest: '45s' },
        { name: 'Overhead Tricep Extension', sets: 3, reps: '12', rest: '45s' },
      ],
    },
  ],
  'recovery': [
    {
      id: 'rc-1', name: 'Gentle Mobility Flow', day: 'Monday', duration: '30 min', focus: 'Joint health + mobility',
      exercises: [
        { name: 'Cat-Cow Stretches', sets: 3, reps: '10', rest: '—' },
        { name: 'World\'s Greatest Stretch', sets: 2, reps: '8 each', rest: '—' },
        { name: 'Hip 90/90 Rotations', sets: 2, reps: '10 each', rest: '—' },
        { name: 'Shoulder Circles (Band)', sets: 2, reps: '10 each way', rest: '—' },
        { name: 'Foam Roll Full Body', sets: 1, reps: '10 min', rest: '—' },
      ],
    },
    {
      id: 'rc-2', name: 'Resistance Band Work', day: 'Wednesday', duration: '35 min', focus: 'Light resistance + stability',
      exercises: [
        { name: 'Band Pull-Aparts', sets: 3, reps: '15', rest: '30s' },
        { name: 'Banded Squats', sets: 3, reps: '12', rest: '45s' },
        { name: 'Banded Rows', sets: 3, reps: '12', rest: '45s' },
        { name: 'Glute Bridges', sets: 3, reps: '15', rest: '30s' },
        { name: 'Dead Bugs', sets: 3, reps: '10 each', rest: '30s' },
        { name: 'Side-Lying Clamshells', sets: 3, reps: '15 each', rest: '30s' },
      ],
    },
    {
      id: 'rc-3', name: 'Walk & Stretch', day: 'Friday', duration: '40 min', focus: 'Active recovery + flexibility',
      exercises: [
        { name: 'Brisk Walk', sets: 1, reps: '20 min', rest: '—' },
        { name: 'Standing Quad Stretch', sets: 2, reps: '45 sec each', rest: '—' },
        { name: 'Pigeon Stretch', sets: 2, reps: '60 sec each', rest: '—' },
        { name: 'Thoracic Spine Rotation', sets: 2, reps: '10 each', rest: '—' },
        { name: 'Child\'s Pose', sets: 1, reps: '2 min', rest: '—' },
      ],
    },
  ],
}

export const SUPPORT_ARTICLES: SupportArticle[] = [
  {
    id: 'sa-1', title: 'How to store your peptides correctly', category: 'Protocol',
    body: 'Store your vials in the fridge at 2–8°C once reconstituted. Keep them away from light and do not freeze. Unreconstituted vials can be stored at room temperature for short periods but refrigeration is always preferred. Reconstituted peptides typically remain stable for 28 days when refrigerated properly.',
  },
  {
    id: 'sa-2', title: 'Injection site rotation guide', category: 'Protocol',
    body: 'Rotate injection sites to prevent lipodystrophy and irritation. Common subcutaneous sites include the lower abdomen (2 inches from the navel), outer thigh, and back of the upper arm. Use a different site each time and keep at least 1 inch between injection points. Clean the area with an alcohol swab and let it dry before injecting.',
  },
  {
    id: 'sa-3', title: 'What to expect in your first week', category: 'Getting Started',
    body: 'During the first 3–5 days, most users experience minimal noticeable effects. This is normal — peptides work at the cellular level and need time to accumulate. Some users report mild injection site redness or slight appetite changes. Stay hydrated, follow your dosing schedule, and avoid judging results until at least day 14.',
  },
  {
    id: 'sa-4', title: 'Understanding your dosing guide', category: 'Getting Started',
    body: 'Your personalised dosing guide was built from your quiz answers. It accounts for your experience level, body composition goals, and timeline. Follow the titration schedule exactly — starting low and building up reduces side effects and lets your body adapt. Never skip ahead in the schedule.',
  },
  {
    id: 'sa-5', title: 'Managing appetite changes on GLP-1 peptides', category: 'Nutrition',
    body: 'GLP-1 class peptides (Semaglutide, Tirzepatide, Retatrutide) often significantly reduce appetite. This is the mechanism working — but you still need adequate nutrition. Focus on protein-first meals (minimum 30g per meal), eat slowly, stop when comfortable (not stuffed), and prioritise nutrient-dense foods. If nausea occurs, eat smaller, more frequent meals.',
  },
  {
    id: 'sa-6', title: 'Training while on a peptide protocol', category: 'Training',
    body: 'Continue training as normal unless your protocol advises otherwise. For weight-loss compounds, resistance training is critical to preserve muscle. For recovery compounds (BPC-157, TB-500), follow the rehabilitation timeline — start with mobility and progress to resistance work. Never push through sharp pain. The compound supports healing but cannot override structural damage.',
  },
  {
    id: 'sa-7', title: 'Hydration and electrolytes during protocol', category: 'Nutrition',
    body: 'Peptide protocols can increase fluid loss, especially GLP-1 compounds. Aim for at least 2.5–3 litres of water daily. Add electrolytes (sodium, potassium, magnesium) if you experience headaches, dizziness, or muscle cramps. A simple fix: 1/4 tsp salt + squeeze of lemon in 500ml water.',
  },
  {
    id: 'sa-8', title: 'When to contact our medical team', category: 'Support',
    body: 'Contact our team immediately if you experience: persistent vomiting (>24 hours), severe abdominal pain, signs of allergic reaction (rash, swelling, difficulty breathing), or significant injection site reactions that worsen over time. For non-urgent questions about your protocol, use the expert chat feature — our team typically responds within 2 hours during business hours.',
  },
]

export function getInitialWeightData(): WeightEntry[] {
  const today = new Date()
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (13 - i))
    const base = 88.5
    const loss = i * 0.15 + (Math.random() * 0.3 - 0.15)
    return {
      date: d.toISOString().split('T')[0],
      weight: Math.round((base - loss) * 10) / 10,
    }
  })
}

export function getInitialWaterData(): WaterEntry[] {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (6 - i))
    return {
      date: d.toISOString().split('T')[0],
      glasses: Math.floor(Math.random() * 4) + 5,
    }
  })
}

export function getInitialDoseData(): DoseEntry[] {
  const today = new Date()
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (13 - i))
    return {
      date: d.toISOString().split('T')[0],
      taken: i < 13 ? Math.random() > 0.1 : false,
      time: i < 13 ? '08:00' : undefined,
    }
  })
}
