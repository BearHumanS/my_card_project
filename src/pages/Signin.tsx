import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/remote/firebase'
import { FirebaseError } from 'firebase/app'
import { FormValues } from '@/types/signin'
import Form from '@components/signin/Form'
import { useAlertContext } from '@/contexts/AlertContext'

const SigninPage = () => {
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues

      try {
        await signInWithEmailAndPassword(auth, email, password)

        navigate('/')
      } catch (e) {
        console.log(e)
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/invalid-credential') {
            open({
              title: '계정의 정보를 다시 확인해주세요.',
              onButtonClick: () => {},
            })

            return
          }
        }

        open({
          title: '다시 시도해주세요.',
          onButtonClick: () => {},
        })
      }
    },
    [navigate, open],
  )

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SigninPage
