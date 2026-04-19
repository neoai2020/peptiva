export interface SynergyPartner {
  id: string
  reason: string
  discountPct: number
}

/**
 * Curated synergy pairings for each peptide.
 * Cross-pillar stacks are intentional (e.g. weight + recovery).
 * Combos avoid recommending sub-components of pre-built stacks
 * (Wolverine = BPC-157+TB-500, Glow = BPC-157+TB-500+GHK-Cu).
 */
export const SYNERGY: Record<string, SynergyPartner[]> = {
  /* ═══ WEIGHT MANAGEMENT ═══ */
  '17': [ // Reta
    { id: '8',  reason: 'BPC-157 supports gut lining integrity during aggressive metabolic protocols', discountPct: 10 },
    { id: '19', reason: 'MOTS-C boosts mitochondrial energy output to sustain your metabolism', discountPct: 10 },
  ],
  '21': [ // Reta 2.0
    { id: '8',  reason: 'BPC-157 protects gut health alongside the enhanced retatrutide formulation', discountPct: 10 },
    { id: '7',  reason: 'NAD+ restores cellular energy systems that support long-term fat metabolism', discountPct: 10 },
  ],
  '2': [ // Tirzepatide
    { id: '8',  reason: 'BPC-157 supports gut health and tissue repair during sustained weight loss', discountPct: 10 },
    { id: '19', reason: 'MOTS-C enhances cellular energy so you feel sharper while cutting', discountPct: 10 },
  ],
  '18': [ // Cagrilintide
    { id: '19', reason: 'MOTS-C provides real cellular energy to complement satiety-based weight management', discountPct: 10 },
    { id: '4',  reason: 'GHK-Cu supports skin elasticity as your body composition changes', discountPct: 10 },
  ],

  /* ═══ STRENGTH & RECOVERY ═══ */
  '8': [ // BPC157
    { id: '10', reason: 'TB-500 adds systemic cell migration to complement localised tissue repair', discountPct: 10 },
    { id: '4',  reason: 'GHK-Cu accelerates collagen remodelling alongside tendon and ligament healing', discountPct: 10 },
  ],
  '10': [ // TB500
    { id: '8',  reason: 'BPC-157 targets localised tissue repair to complement TB-500\'s systemic action', discountPct: 10 },
    { id: '19', reason: 'MOTS-C boosts mitochondrial recovery so you bounce back faster between sessions', discountPct: 10 },
  ],
  '20': [ // Wolverine (already contains BPC-157 + TB-500)
    { id: '4',  reason: 'GHK-Cu adds collagen renewal on top of the dual repair pathways you already have', discountPct: 10 },
    { id: '7',  reason: 'NAD+ supports deep cellular recovery alongside structural tissue repair', discountPct: 10 },
  ],

  /* ═══ CELLULAR REPAIR & ANTI-AGING ═══ */
  '6': [ // Glow (already contains BPC-157 + TB-500 + GHK-Cu)
    { id: '7',  reason: 'NAD+ amplifies the regenerative cascade by restoring cellular energy reserves', discountPct: 10 },
    { id: '19', reason: 'MOTS-C adds mitochondrial support for sustained energy alongside visible renewal', discountPct: 10 },
  ],
  '4': [ // GHKCU
    { id: '8',  reason: 'BPC-157 accelerates tissue healing to complement collagen and skin renewal', discountPct: 10 },
    { id: '7',  reason: 'NAD+ supports the cellular energy needed for sustained collagen production', discountPct: 10 },
  ],
  '19': [ // MOTC
    { id: '7',  reason: 'NAD+ and MOTS-C target complementary mitochondrial pathways for peak cellular output', discountPct: 10 },
    { id: '4',  reason: 'GHK-Cu adds visible skin and tissue renewal alongside cellular energy gains', discountPct: 10 },
  ],
  '7': [ // NAD 1000mg
    { id: '19', reason: 'MOTS-C works the metabolic side of mitochondria while NAD+ fuels the energy side', discountPct: 10 },
    { id: '6',  reason: 'Glow adds structural repair and visible renewal to your cellular foundation', discountPct: 10 },
  ],
}
