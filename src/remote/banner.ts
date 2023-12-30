import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import { COLLECTIONS } from '@/constants'
import { AdBanner } from '@/types/card'

export const getAdBanner = async () => {
  const ADBANNERSnapShot = await getDocs(collection(db, COLLECTIONS.ADBANNER))

  return ADBANNERSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}
