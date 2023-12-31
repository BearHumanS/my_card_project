import { User } from './user'

export interface Term {
  id: string
  link?: string
  title: string
}

export interface ApplyValues {
  userId: User['uid']
  terms: Array<Term['id']>
  appliedAt: Date
  cardId: string
  annualIncome: string
  creditScore: string
  paymentDate: string
  isMaster: boolean
  isTransit: boolean
  isHiPass: boolean
  staus: keyof typeof APPLY_STATUS
}

export interface Option {
  label: string
  value: string | number | undefined
}

export const APPLY_STATUS = {
  READY: 'READY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
} as const
