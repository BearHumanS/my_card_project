import { signOut } from 'firebase/auth'
import { auth } from '@/remote/firebase'
import useUser from '@hooks/auth/useUser'
import Button from '@components/common/Button'
import Flex from '@components/common/Flex'
import Text from '@components/common/Text'
import { useCallback } from 'react'
import MyImage from '@/components/my/MyImage'
import Space from '@/components/common/Space'

const MyPage = () => {
  const user = useUser()

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  return (
    <Flex direction="column" align="center">
      <Space size={40} />
      <MyImage size={80} mode="upload" />
      <Space size={20} />
      <Text bold>{user?.displayName}</Text>
      <Space size={20} />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  )
}

export default MyPage
