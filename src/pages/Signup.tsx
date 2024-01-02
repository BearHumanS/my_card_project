import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@remote/firebase'
import Form from '@/components/signup/Form'
import { FormValues } from '@/types/signup'
import { COLLECTIONS } from '@/constants'

const SignupPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const profileUpdate = updateProfile(user, { displayName: name })
      const docSet = setDoc(doc(collection(db, COLLECTIONS.USER), user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: name,
      })

      await Promise.all([profileUpdate, docSet])

      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignupPage
