import { useEffect, useState } from 'react'
import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { ApplyValues, APPLY_STATUS } from '@/types/apply'
import useUser from '@/hooks/auth/useUser'
import { useParams } from 'react-router-dom'
import ProgressBar from '../common/ProgressBar'
import { LAST_STEP } from '@/constants'
import Space from '../common/Space'

const Apply = ({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) => {
  const user = useUser()
  const { id } = useParams()

  const storageKey = `applied-${user?.uid}-${id}`

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const apllied = localStorage.getItem(storageKey)

    if (apllied == null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      }
    }

    return JSON.parse(apllied)
  })

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey)

      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    } else {
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
    }
  }, [applyValues, onSubmit, storageKey])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({
      ...prev,
      terms,
      step: (prev.step as number) + 1,
    }))
  }

  const handleBasicInfoChange = (
    infoValues: Pick<
      ApplyValues,
      'annualIncome' | 'creditScore' | 'paymentDate'
    >,
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      ...infoValues,
      step: (prev.step as number) + 1,
    }))
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isTransit' | 'isHiPass'>,
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      ...cardInfoValues,
      step: (prev.step as number) + 1,
    }))
  }

  return (
    <div>
      <ProgressBar progress={(applyValues.step as number) / LAST_STEP} />
      <Space size={40} />
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </div>
  )
}

export default Apply
