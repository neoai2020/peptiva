import type { PrimaryGoal } from '../types/quiz'

/** One rotating visual per step — catalogue photography, not a single static collage. */
export const STOCK_LAB =
  'https://images.unsplash.com/photo-1532187863486-deab9e12a318?w=900&q=82&auto=format&fit=crop'

const POOL = {
  lab: STOCK_LAB,
  vialA:
    '/images/products/17.jpg',
  vialB:
    '/images/products/2.jpg',
  vialC:
    '/images/products/8.webp',
  vialD:
    '/images/products/20.jpg',
  vialE:
    '/images/products/4.jpg',
  vialF:
    '/images/products/19.webp',
  brand: 'https://www.apexpharma.io/images/corrected_apex_pharma_hero.png',
} as const

export const APEX_HERO = POOL.brand

const byGoal: Record<NonNullable<PrimaryGoal>, string> = {
  weight_management: POOL.vialB,
  strength_recovery: POOL.vialD,
  cellular_repair: POOL.vialE,
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
