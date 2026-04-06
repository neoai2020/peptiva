/** Twelve curated SKUs aligned with Apex Pharma catalog (research use). */
export interface Peptide {
  id: string
  sku: string
  compound: string
  category: string
  /** Short consumer-facing blurb — not medical advice */
  tagline: string
  description: string
  image: string | null
  catalogUrl: string
  /** Internal tags for scoring */
  tags: string[]
}

const PRODUCTS_BASE = 'https://www.apexpharma.io/products'

export const PEPTIDES: Peptide[] = [
  {
    id: '17',
    sku: 'RETAKLIK',
    compound: 'Retatrutide (triple agonist)',
    category: 'Weight management',
    tagline: 'Triple-pathway metabolic support for experienced protocols.',
    description:
      'Retatrutide activates GLP-1, GIP, and glucagon receptors — often chosen when appetite, energy expenditure, and glucose balance are the priority together.',
    image:
      'https://admin.apexpharma.io/uploads/products/17/mmexport1764074055151_b066e6863290.jpg',
    catalogUrl: PRODUCTS_BASE,
    tags: ['metabolic', 'triple', 'glp', 'maximum', 'advanced'],
  },
  {
    id: '2',
    sku: 'KLIKJARO',
    compound: 'Tirzepatide',
    category: 'Weight management',
    tagline: 'Dual GLP-1 + GIP signalling — strong, structured appetite control.',
    description:
      'Tirzepatide targets GLP-1 and GIP pathways to support satiety, insulin sensitivity, and steady energy use during a cut.',
    image:
      'https://admin.apexpharma.io/uploads/products/2/KlikJARO_20mg_e0a5899f1cca.jpg',
    catalogUrl: PRODUCTS_BASE,
    tags: ['metabolic', 'dual', 'glp', 'balanced', 'appetite'],
  },
  {
    id: '3',
    sku: 'KLIKZEMPIC',
    compound: 'Semaglutide',
    category: 'Weight management',
    tagline: 'GLP-1 class support with a conservative, familiar pathway.',
    description:
      'Semaglutide is widely studied for appetite regulation and glycaemic balance — a common starting point when you want a measured approach.',
    image:
      'https://admin.apexpharma.io/uploads/products/3/Image_1765185765257_a53541c878b8.jpg',
    catalogUrl: PRODUCTS_BASE,
    tags: ['metabolic', 'glp', 'gentle', 'new', 'appetite'],
  },
  {
    id: '18',
    sku: 'KLIKTIDE',
    compound: 'KLIKTIDE (amylin analogue)',
    category: 'Weight management',
    tagline: 'Satiety-first support that complements metabolic stacks.',
    description:
      'Designed around fullness signalling rather than growth pathways — useful when hunger is the hardest variable to control.',
    image:
      'https://admin.apexpharma.io/uploads/products/18/Kliktide_a05e7e7467a2.jpg',
    catalogUrl: PRODUCTS_BASE,
    tags: ['metabolic', 'appetite', 'satiation'],
  },
  {
    id: '1',
    sku: 'KLIKFRAG',
    compound: 'HGH Fragment 176-191',
    category: 'Weight management',
    tagline: 'Fragment-focused support for recomposition and stubborn areas.',
    description:
      'Derived from the lipolytic region of the GH axis — popular when the goal is lean conditioning without full GH exposure.',
    image:
      'https://admin.apexpharma.io/uploads/products/1/Image_1765185755538_557eabbc30a4.jpg',
    catalogUrl: PRODUCTS_BASE,
    tags: ['metabolic', 'recomp', 'stubborn', 'fragment'],
  },
  {
    id: '8',
    sku: 'KLIK-157',
    compound: 'BPC-157',
    category: 'Strength & recovery',
    tagline: 'Tissue-focused repair signalling for nagging setbacks.',
    description:
      'BPC-157 is researched around healing, gut lining integrity, and inflammatory balance — a staple when recovery is the bottleneck.',
    image:
      'https://admin.apexpharma.io/uploads/products/8/Klik157_62fbea9efea6.jpg',
    catalogUrl: PRODUCTS_BASE,
    tags: ['recovery', 'injury', 'inflammation', 'tissue'],
  },
  {
    id: '10',
    sku: 'KLIK500',
    compound: 'TB-500',
    category: 'Strength & recovery',
    tagline: 'Cellular migration & repair — training capacity without the drama.',
    description:
      'TB-500 (Thymosin Beta-4 fragment) is associated with repair, angiogenesis, and inflammation modulation in research models.',
    image:
      'https://admin.apexpharma.io/uploads/products/10/klik500_ee38724fe327.jpg',
    catalogUrl: PRODUCTS_BASE,
    tags: ['recovery', 'training', 'repair'],
  },
  {
    id: '20',
    sku: 'WOLVERINE',
    compound: 'BPC-157 + TB-500',
    category: 'Strength & recovery',
    tagline: 'Synergistic repair stack when you want both angles covered.',
    description:
      'Combines BPC-157 and TB-500 for overlapping repair pathways — often picked for stubborn tissue issues or high training load.',
    image:
      'https://admin.apexpharma.io/uploads/products/20/p9_080a60aa409866769d07_4b00e1eb2726.jpg',
    catalogUrl: PRODUCTS_BASE,
    tags: ['recovery', 'injury', 'synergy', 'inflammation'],
  },
  {
    id: '6',
    sku: 'KLIKGLOW',
    compound: 'BPC-157 + TB-500 + GHK-Cu',
    category: 'Cellular repair & anti-aging',
    tagline: 'Regenerative blend: repair signalling + collagen-friendly copper peptide.',
    description:
      'KLIKGLOW stacks repair peptides with GHK-Cu for structural renewal, elasticity, and recovery in one protocol.',
    image:
      'https://admin.apexpharma.io/uploads/products/6/KlikGlow_9541073eb8d1.jpg',
    catalogUrl: PRODUCTS_BASE,
    tags: ['skin_aging', 'recovery', 'collagen', 'full_stack'],
  },
  {
    id: '4',
    sku: 'KLIK-GHK',
    compound: 'GHK-Cu',
    category: 'Cellular repair & anti-aging',
    tagline: 'Copper peptide classic for skin firmness and renewal.',
    description:
      'GHK-Cu supports collagen synthesis and extracellular matrix quality — the “visible” peptide when texture and tone matter most.',
    image:
      'https://admin.apexpharma.io/uploads/products/4/Klik-GHK_7c99071e3415.jpg',
    catalogUrl: PRODUCTS_BASE,
    tags: ['skin_aging', 'collagen', 'visible'],
  },
  {
    id: '19',
    sku: 'KLIKMOTS-C',
    compound: 'MOTS-C',
    category: 'Cellular repair & anti-aging',
    tagline: 'Mitochondrial peptide for metabolic resilience.',
    description:
      'MOTS-C is studied for glucose utilisation, energy balance, and mitochondrial signalling — cellular performance without stimulants.',
    image:
      'https://admin.apexpharma.io/uploads/products/19/Klikmots-c_618d197e22cf.jpg',
    catalogUrl: PRODUCTS_BASE,
    tags: ['cellular', 'mitochondrial', 'metabolic_cell'],
  },
  {
    id: '7',
    sku: 'KLIKNAD+',
    compound: 'NAD+',
    category: 'Cellular repair & anti-aging',
    tagline: 'Coenzyme support for energy systems and aging research.',
    description:
      'NAD+ sits at the centre of redox balance and cellular energy — a common pairing when fatigue and recovery overlap.',
    image:
      'https://admin.apexpharma.io/uploads/products/7/Image_1765185762662_caaa5d252020.jpg',
    catalogUrl: PRODUCTS_BASE,
    tags: ['cellular', 'nad', 'energy_systems'],
  },
]

export function getPeptideById(id: string): Peptide | undefined {
  return PEPTIDES.find((p) => p.id === id)
}
