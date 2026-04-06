import type { QuizAnswers } from '../types/quiz'
import { recommendPeptides } from './recommend'
import { getCompoundCopy } from './compoundCopy'
import { goalLabel, mainIssueLabel } from './quizLabels'

const VAPI_API_URL = 'https://api.vapi.ai/call/phone'
const VAPI_API_KEY = import.meta.env.VITE_VAPI_API_KEY as string
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID as string
const VAPI_PHONE_NUMBER_ID = import.meta.env.VITE_VAPI_PHONE_NUMBER_ID as string

export interface VapiCallPayload {
  firstName: string
  gender: string
  goal: string
  mainIssue: string
  timeline: string
  experience: string
  inflammation: string
  primaryCompound: string
  whyMatched: string
  mechanism: string
  expect: string
  secondaryCompound: string
}

function buildPayload(answers: QuizAnswers): VapiCallPayload {
  const rec = recommendPeptides(answers)
  const copy = getCompoundCopy(rec.primary.id)

  return {
    firstName: answers.lead?.firstName ?? '',
    gender: answers.gender ?? '',
    goal: answers.goal ? goalLabel(answers.goal) : '',
    mainIssue: answers.mainIssue ? mainIssueLabel(answers.mainIssue) : '',
    timeline: answers.timeline ?? '',
    experience: answers.experience ?? '',
    inflammation: answers.inflammation ?? '',
    primaryCompound: rec.primary.compound,
    whyMatched: copy.whyMatched,
    mechanism: copy.mechanism,
    expect: copy.expect,
    secondaryCompound: rec.secondary?.compound ?? '',
  }
}

function formatPhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, '')

  if (digits.startsWith('44')) return `+${digits}`
  if (digits.startsWith('0')) return `+44${digits.slice(1)}`
  if (digits.length === 10) return `+44${digits}`

  return phone.startsWith('+') ? phone : `+${digits}`
}

export async function triggerVapiCall(answers: QuizAnswers): Promise<{ ok: boolean; callId?: string; error?: string }> {
  const phone = answers.lead?.phone
  if (!phone?.trim()) return { ok: false, error: 'No phone number provided' }

  if (!VAPI_API_KEY || !VAPI_ASSISTANT_ID || !VAPI_PHONE_NUMBER_ID) {
    console.warn('[VAPI] Missing env vars — skipping call')
    return { ok: false, error: 'VAPI not configured' }
  }

  const payload = buildPayload(answers)
  const customerNumber = formatPhoneE164(phone.trim())

  try {
    const res = await fetch(VAPI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistantId: VAPI_ASSISTANT_ID,
        phoneNumberId: VAPI_PHONE_NUMBER_ID,
        customer: {
          number: customerNumber,
          name: payload.firstName,
        },
        assistantOverrides: {
          variableValues: payload,
        },
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('[VAPI] Call failed:', res.status, body)
      return { ok: false, error: `VAPI ${res.status}` }
    }

    const data = await res.json()
    return { ok: true, callId: data.id }
  } catch (err) {
    console.error('[VAPI] Network error:', err)
    return { ok: false, error: 'Network error' }
  }
}
