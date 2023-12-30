import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@remote/firebase'
import Form from '@/components/signup/Form'
import { FormValues } from '@/types/signup'
import { COLLECTIONS } from '@/constants'

const SignupPage = () => {
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues

    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(user, {
      displayName: name,
    })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }

    await setDoc(doc(collection(db, COLLECTIONS.USER), user.uid), newUser)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignupPage
