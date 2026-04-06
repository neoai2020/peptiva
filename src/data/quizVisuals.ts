import type { PrimaryGoal } from '../types/quiz'

/** One rotating visual per step — catalogue photography, not a single static collage. */
export const STOCK_LAB =
  'https://images.unsplash.com/photo-1532187863486-deab9e12a318?w=900&q=82&auto=format&fit=crop'

const POOL = {
  lab: STOCK_LAB,
  vialA:
    'https://admin.apexpharma.io/uploads/products/17/mmexport1764074055151_b066e6863290.jpg',
  vialB:
    'https://admin.apexpharma.io/uploads/products/2/KlikJARO_20mg_e0a5899f1cca.jpg',
  vialC:
    'https://admin.apexpharma.io/uploads/products/8/Klik157_62fbea9efea6.jpg',
  vialD:
    'https://admin.apexpharma.io/uploads/products/20/p9_080a60aa409866769d07_4b00e1eb2726.jpg',
  vialE:
    'https://admin.apexpharma.io/uploads/products/4/Klik-GHK_7c99071e3415.jpg',
  vialF:
    'https://admin.apexpharma.io/uploads/products/19/Klikmots-c_618d197e22cf.jpg',
  brand: 'https://www.apexpharma.io/images/corrected_apex_pharma_hero.png',
} as const

export const APEX_HERO = POOL.brand

const byGoal: Record<NonNullable<PrimaryGoal>, string> = {
  metabolic: POOL.vialB,
  recovery: POOL.vialD,
  skin_aging: POOL.vialE,
  cellular_energy: POOL.vialF,
}

/** Returns hero image + short caption for the current step. */
export function visualForStep(
  step: number,
  goal: PrimaryGoal | null,
): { src: string; caption: string } {
  const g = goal ? byGoal[goal] : POOL.vialA
  const seq = [
    { src: POOL.brand, caption: 'Verified supplier catalogue' },
    { src: g, caption: 'Matched to research-grade SKUs' },
    { src: POOL.vialC, caption: 'Tissue repair & recovery lines' },
    { src: POOL.lab, caption: 'Laboratory use context' },
    { src: goal ? byGoal[goal] : POOL.vialB, caption: 'Aligned to your timeline' },
    { src: POOL.vialF, caption: 'Experience-aware routing' },
    { src: POOL.vialD, caption: 'Inflammation-aware weighting' },
  ]
  const i = Math.min(Math.max(step - 1, 0), seq.length - 1)
  return seq[i]
}
