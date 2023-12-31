import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'
import useUser from '@hooks/auth/useUser'
import { colors } from '@/styles/color'
import Button from './Button'
import Flex from './Flex'
import { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/remote/firebase'

const Navbar = () => {
  const { pathname } = useLocation()
  const user = useUser()

  const showButton = ['/signup', '/signin'].includes(pathname) === false

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  const renderButton = useCallback(() => {
    if (user !== null) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }

    if (showButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [handleLogout, showButton, user])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`

export default Navbar
