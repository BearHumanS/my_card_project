import { db } from '@remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import Button from '@common/Button'
import { card_list } from '@/mocking/data'
import { COLLECTIONS } from '@/constants'

const AddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(db)

    card_list.forEach((card) => {
      const docRef = doc(collection(db, COLLECTIONS.CARD))

      batch.set(docRef, card)
    })

    await batch.commit()

    alert('완료')
  }
  return <Button onClick={handleButtonClick}>추가</Button>
}

export default AddButton
