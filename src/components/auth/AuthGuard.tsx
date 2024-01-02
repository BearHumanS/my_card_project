import { ReactNode, useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@atoms/user'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/remote/firebase'

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const [init, setInit] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email ?? '',
          displayName: user.displayName ?? '',
          photoURL: user.photoURL ?? '',
        })
      } else {
        setUser(null)
      }
      setInit(true)
    })

    return () => unsubscribe()
  }, [setUser])

  if (!init) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
