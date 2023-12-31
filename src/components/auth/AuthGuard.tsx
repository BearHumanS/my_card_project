import { ReactNode, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@atoms/user'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/remote/firebase'

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const [init, setInit] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      setUser(null)
    }

    setInit(true)
  })

  if (init === false) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
