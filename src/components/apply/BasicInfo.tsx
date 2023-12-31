import { ChangeEvent, useCallback, useState } from 'react'
import {
  annualIncomeOptions,
  creditScoreOptions,
  paymentDateOptions,
} from '@/constants/apply'
import Select from '@common/Select'
import { ApplyValues } from '@/types/apply'
import FixedBottomButton from '../common/FixedBottomButton'

type InfoValues = Pick<
  ApplyValues,
  'annualIncome' | 'creditScore' | 'paymentDate'
>

const BasicInfo = ({
  onNext,
}: {
  onNext: (infoValues: InfoValues) => void
}) => {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    annualIncome: '',
    creditScore: '',
    paymentDate: '',
  })

  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setInfoValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    },
    [],
  )

  const allChecked = Object.values(infoValues).every((value) => value)

  return (
    <div>
      <Select
        label="연소득"
        name="annualIncome"
        options={annualIncomeOptions}
        placeholder={annualIncomeOptions[0].label}
        value={infoValues.annualIncome}
        onChange={handleSelectChange}
      />
      <Select
        label="신용점수"
        name="creditScore"
        options={creditScoreOptions}
        placeholder={creditScoreOptions[0].label}
        value={infoValues.creditScore}
        onChange={handleSelectChange}
      />
      <Select
        label="결제일"
        name="paymentDate"
        options={paymentDateOptions}
        placeholder={paymentDateOptions[0].label}
        value={infoValues.paymentDate}
        onChange={handleSelectChange}
      />

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(infoValues)
        }}
        disabled={allChecked === false}
      />
    </div>
  )
}

export default BasicInfo
