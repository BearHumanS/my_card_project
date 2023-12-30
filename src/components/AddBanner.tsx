import { db } from '@remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import Button from '@common/Button'
import { adBanners } from '@/mocking/data'
import { COLLECTIONS } from '@/constants'

const AddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(db)

    adBanners.forEach((banner) => {
      const docRef = doc(collection(db, COLLECTIONS.ADBANNER))

      batch.set(docRef, banner)
    })

    await batch.commit()

    alert('완료')
  }
  return <Button onClick={handleButtonClick}>추가</Button>
}

export default AddButton
