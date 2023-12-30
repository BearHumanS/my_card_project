import {
  collection,
  getDocs,
  QuerySnapshot,
  query,
  limit,
  startAfter,
  doc,
  getDoc,
} from 'firebase/firestore'
import { db } from './firebase'
import { COLLECTIONS } from '@/constants'
import { Card } from '@/types/card'

export const getCards = async (pageCursor?: QuerySnapshot<Card>) => {
  const cardQuery =
    pageCursor == null
      ? query(collection(db, COLLECTIONS.CARD), limit(10))
      : query(
          collection(db, COLLECTIONS.CARD),
          startAfter(pageCursor),
          limit(5),
        )

  const cadrSnapShot = await getDocs(cardQuery)

  const lastVisible = cadrSnapShot.docs[cadrSnapShot.docs.length - 1]

  const items = cadrSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

export const getCard = async (id: string) => {
  const snapshot = await getDoc(doc(db, COLLECTIONS.CARD, id))

  return {
    id,
    ...(snapshot.data() as Card),
  }
}
