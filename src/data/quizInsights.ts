/** Short lines above the question (aligned to current step numbers). */
export const insightForStep = (step: number): string | null => {
  switch (step) {
    case 2:
      return 'We use this answer to pick a mechanism family — not a trendy name.'
    case 3:
      return 'Naming the real bottleneck beats only picking a “goal” — it is what sharpens the match.'
    case 4:
      return 'Your timeline preference nudges how direct we are with pathway choices.'
    case 6:
      return 'Repair-forward SKUs score higher when you say yes here.'
    default:
      return null
  }
}
