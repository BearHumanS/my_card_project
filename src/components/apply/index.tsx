import { useEffect, useState } from 'react'
import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { ApplyValues, APPLY_STATUS } from '@/types/apply'
import useUser from '@/hooks/auth/useUser'
import { useParams } from 'react-router-dom'

const Apply = ({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) => {
  const user = useUser()
  const { id } = useParams()

  const [step, setStep] = useState(0)
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  })

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    }
  }, [applyValues, onSubmit, step])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({
      ...prev,
      terms,
    }))

    setStep((prev) => prev + 1)
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
    }))

    setStep((prev) => prev + 1)
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isTransit' | 'isHiPass'>,
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      ...cardInfoValues,
    }))

    setStep((prev) => prev + 1)
  }

  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </div>
  )
}

export default Apply