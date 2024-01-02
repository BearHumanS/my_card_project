import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Apply from '@components/apply'
import useApplyCardMutaion from '@components/apply/hooks/useApplyCardMutaion'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import { updateApply } from '@/remote/apply'
import { APPLY_STATUS } from '@/types/apply'
import useUser from '@/hooks/auth/useUser'
import useAppliedCard from '@/components/apply/hooks/useAppliedCard'
import { useAlertContext } from '@/contexts/AlertContext'
import PageLoader from '@/components/common/PageLoader'
import { STATUS_MESSAGE } from '@/constants/apply'

const ApplyPage = () => {
  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()

  const { open } = useAlertContext()

  const storageKey = `applied-${user?.uid}-${id}`

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          localStorage.removeItem(storageKey)
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })

          return
        }

        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  const { data: status } = usePollApplyStatus({
    onSuccess: async () => {
      await updateApply({
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
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
          status: APPLY_STATUS.REJECT,
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

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  if (readyToPoll || applying) {
    return <PageLoader message={STATUS_MESSAGE[status ?? 'READY']} />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
