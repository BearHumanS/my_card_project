import { parse } from 'qs'
import Flex from '@components/common/Flex'
import FixedBottomButton from '@/components/common/FixedBottomButton'
import PageLoader from '@/components/common/PageLoader'

const ApplyDone = () => {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string }

  return (
    <Flex direction="column">
      <PageLoader
        message={
          success ? '카드가 발급되었습니다.' : '카드 발급에 실패했습니다.'
        }
      />

      <FixedBottomButton
        label="확인"
        onClick={() => {
          window.history.back()
        }}
      />
    </Flex>
  )
}

export default ApplyDone
