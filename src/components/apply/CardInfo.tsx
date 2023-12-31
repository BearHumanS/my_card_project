import { useCallback, useState, MouseEvent } from 'react'
import Button from '@common/Button'
import Space from '@common/Space'
import { ApplyValues } from '@/types/apply'
import FixedBottomButton from '../common/FixedBottomButton'

type CardInfoValues = Pick<ApplyValues, 'isMaster' | 'isTransit' | 'isHiPass'>

const CardInfo = ({
  onNext,
}: {
  onNext: (infoValues: CardInfoValues) => void
}) => {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isMaster: false,
    isTransit: false,
    isHiPass: false,
  })

  const { isMaster, isTransit, isHiPass } = cardInfoValues

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement

    setCardInfoValues((prev) => ({
      ...prev,
      [$button.name]: Boolean($button.dataset.value),
    }))
  }, [])

  console.log(cardInfoValues)

  return (
    <div>
      <Button.Group title="해외결제">
        <Button
          name="isMaster"
          size="medium"
          weak={isMaster === false}
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          size="medium"
          weak={isMaster === true}
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>

      <Space size={14} />

      <Button.Group title="후불교통카드">
        <Button
          name="isTransit"
          size="medium"
          weak={isTransit === true}
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isTransit"
          size="medium"
          weak={isTransit === false}
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <Space size={14} />

      <Button.Group title="후불하이패스">
        <Button
          name="isHiPass"
          size="medium"
          weak={isHiPass === true}
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHiPass"
          size="medium"
          weak={isHiPass === false}
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(cardInfoValues)
        }}
      />
    </div>
  )
}

export default CardInfo
