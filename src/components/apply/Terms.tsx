import { useCallback, useState, MouseEvent } from 'react'
import Agreement from '@common/Agreement'
import { applyList } from '@constants/apply'
import FixedBottomButton from '../common/FixedBottomButton'
import { ApplyValues } from '@/types/apply'
import Space from '../common/Space'

const Terms = ({
  onNext,
}: {
  onNext: (trems: ApplyValues['terms']) => void
}) => {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return applyList.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const allApplyChecked = Object.values(termsAgreements).every(
    (checked) => checked,
  )

  const handleAllChecked = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prev) => {
        return Object.keys(prev).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={allApplyChecked} onChange={handleAllChecked}>
          약관에 모두 동의
        </Agreement.Title>
        <Space size={10} />
        {applyList.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prev) => ({
                ...prev,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={allApplyChecked === false}
        onClick={() => {
          onNext(Object.keys(termsAgreements))
        }}
      />
    </div>
  )
}

export default Terms
