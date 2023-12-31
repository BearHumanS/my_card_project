import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Apply from '@components/apply'
import useApplyCardMutaion from '@components/apply/hooks/useApplyCardMutaion'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import { updateApply } from '@/remote/apply'
import { APPLY_STATUS } from '@/types/apply'
import useUser from '@/hooks/auth/useUser'

const ApplyPage = () => {
  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApply({
        applyValues: {
          staus: APPLY_STATUS.COMPLETE,
        },
        userId: user?.uid as string,
        cardId: id,
      })
      navigate('/apply/done?success=true', {
        replace: true,
      })
    },
    onError: async () => {
      await updateApply({
        applyValues: {
          staus: APPLY_STATUS.REJECT,
        },
        userId: user?.uid as string,
        cardId: id,
      })
      navigate('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading: applying } = useApplyCardMutaion({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  if (readyToPoll || applying) {
    return <div>로딩 중...</div>
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
