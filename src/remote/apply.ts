import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { db } from './firebase'
import { COLLECTIONS } from '@/constants'
import { ApplyValues } from '@/types/apply'

export const applyCard = async (applyValues: ApplyValues) => {
  return addDoc(collection(db, COLLECTIONS.CARD_APPLY), applyValues)
}

export const updateApply = async ({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) => {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  const [applied] = snapshot.docs

  await updateDoc(applied.ref, applyValues)
}
