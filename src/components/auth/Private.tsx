import useUser from '@hooks/auth/useUser'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

const Private = ({ children }: { children: ReactNode }) => {
  const user = useUser()

  if (user == null) {
    return <Navigate to="/signin" replace={true} />
  }

  return <>{children}</>
}

export default Private
