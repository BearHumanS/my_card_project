import { useEffect, useRef, useState } from 'react'
import { USER_COMMENT } from '@/constants/comment'
import { useQuery } from 'react-query'
import ListRow from '../common/ListRow'
import Space from '../common/Space'

type CommentType = {
  id: string
  comment: string
}

const Comment = () => {
  const [comments, setComments] = useState<CommentType[]>([])

  const shuffleArray = (array: CommentType[]): CommentType[] => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  const fetchComments = () => {
    return new Promise<CommentType[]>((resolve) => {
      setTimeout(() => {
        resolve(shuffleArray(USER_COMMENT))
      }, 2000)
    })
  }

  const { data = [], isLoading } = useQuery(['comment'], fetchComments)

  useEffect(() => {
    if (data.length > 0) {
      setComments(data)
    }
  }, [data])

  const loader = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting) {
        fetchComments().then(() => {
          setComments((prevComments) => [...prevComments])
        })
      }
    })

    const currentLoader = loader.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={loader}>
      {isLoading ? (
        <>
          <ListRow.Skeleton />
          <Space size={3} />
          <ListRow.Skeleton />
        </>
      ) : (
        comments.map((item) => {
          return (
            <ListRow
              key={item.id}
              contents={
                <ListRow.Texts
                  title={`${item.id}님의 리뷰`}
                  subTitle={item.comment}
                />
              }
            />
          )
        })
      )}
    </div>
  )
}

export default Comment
