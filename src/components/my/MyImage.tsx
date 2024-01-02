import styled from '@emotion/styled'
import { getAuth, updateProfile } from 'firebase/auth'
import { app, db, storage } from '@/remote/firebase'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/atoms/user'
import useUser from '@/hooks/auth/useUser'
import { ChangeEvent, useState } from 'react'
import { COLLECTIONS, STORAGE_DOWNLOAD_URL } from '@/constants'
import Skeleton from '../common/Skeleton'
import { css } from '@emotion/react'
import { useAlertContext } from '@/contexts/AlertContext'
import { FirebaseError } from 'firebase/app'

const MyImage = ({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: 'default' | 'upload'
}) => {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)
  const [isLoading, setIsLoading] = useState(false)
  const { open } = useAlertContext()

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    try {
      const files = e.target.files

      const currentUser = getAuth(app).currentUser

      if (files == null || user == null || currentUser == null) {
        return
      }

      const file = files[0].name
      const storageRef = ref(storage, `users/${user.uid}/${file}`)

      if (user?.photoURL && user?.photoURL.includes(STORAGE_DOWNLOAD_URL)) {
        const imageRef = ref(storage, user?.photoURL)
        await deleteObject(imageRef).catch((error) => console.log(error))
      }

      const upload = await uploadBytes(storageRef, files[0])

      const downloadUrl = await getDownloadURL(upload.ref)

      await updateProfile(currentUser, {
        photoURL: downloadUrl,
      })

      await updateDoc(doc(collection(db, COLLECTIONS.USER), currentUser.uid), {
        photoURL: downloadUrl,
      })

      setUser({
        ...user,
        photoURL: downloadUrl,
      })
    } catch (e) {
      console.log(e)
      if (e instanceof FirebaseError) {
        if (e.code) {
          open({
            title: '나중에 다시 시도해주세요.',
            onButtonClick: () => {},
          })

          return
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      {isLoading ? (
        <Skeleton width={size} height={size} css={skeletonStyles} />
      ) : (
        <>
          <img
            src={
              user?.photoURL ||
              'https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-256.png'
            }
            alt="프로필 이미지"
            width={size}
            height={size}
          />
          {mode === 'upload' ? (
            <input type="file" accept="image/*" onChange={handleUploadImage} />
          ) : null}
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

const skeletonStyles = css`
  border-radius: 100%;
`

export default MyImage
