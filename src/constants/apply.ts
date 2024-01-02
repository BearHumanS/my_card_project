import { APPLY_STATUS, Option, Term } from '@/types/apply'

export const applyList = [
  {
    id: '01',
    title: '카드신청 관련 안내 및 필수 동의',
  },
  {
    id: '02',
    title: '(필수) 개인정보 요약동의서',
    link: 'https://www.naver.com',
  },
] as Term[]

export const annualIncomeOptions = [
  { label: '600만원 ~ 5,000만원', value: '600만원 ~ 5,000만원' },
  { label: '5,000만원 ~ 1억원', value: '5,000만원 ~ 1억원' },
  { label: '1억원 초과', value: '1억원 초과' },
] as Option[]

export const creditScoreOptions = [
  { label: '600점 이상', value: '600점 이상' },
  { label: '600점 미만', value: '600점 미만' },
] as Option[]

export const paymentDateOptions = [
  { label: '1일', value: '1일' },
  { label: '25일', value: '25일' },
] as Option[]

export const STATUS_MESSAGE = {
  [APPLY_STATUS.READY]: '카드 심사를 기다리고 있어요.',
  [APPLY_STATUS.PROGRESS]: '카드 심사 진행 중에 있어요. 잠시만 기다려주세요.',
  [APPLY_STATUS.COMPLETE]: '카드 신청이 완료되었어요.',
}
