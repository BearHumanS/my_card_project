import { useAlertContext } from '@/contexts/AlertContext'
import { applyCard } from '@/remote/apply'
import { ApplyValues } from '@/types/apply'
import { useMutation } from 'react-query'

interface useApplyCardMutaionProps {
  onSuccess: () => void
  onError: () => void
}

const useApplyCardMutaion = ({
  onSuccess,
  onError,
}: useApplyCardMutaionProps) => {
  const { open } = useAlertContext()

  return useMutation((applyValues: ApplyValues) => applyCard(applyValues), {
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      open({
        title: '카드 신청에 실패했어요. 나중에 다시 시도해주세요.',
        onButtonClick: () => {
          onError()
        },
      })
    },
  })
}

export default useApplyCardMutaion
