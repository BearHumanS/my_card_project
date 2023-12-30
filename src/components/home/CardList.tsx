import { useInfiniteQuery } from 'react-query'
import { getCards } from '@remote/card'
import ListRow from '@common/ListRow'
import Button from '../common/Button'
import { useCallback, useEffect, useRef } from 'react'

const CardList = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam)
    },
    {
      getNextPageParam: (snapShot) => {
        return snapShot.lastVisible
      },
      refetchOnWindowFocus: false,
    },
  )

  const loader = useRef(null)

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  useEffect(() => {
    const currentLoader = loader.current

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          loadMore()
        }
      },
      { threshold: 1 },
    )

    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [fetchNextPage, hasNextPage, loadMore])

  if (data == null) {
    return null
  }

  const cards = data.pages.map(({ items }) => items).flat()

  return (
    <div>
      <Button onClick={() => fetchNextPage()}>더보기</Button>
      <ul>
        {cards.map((card, index) => {
          return (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={card.payback !== null ? <div>{card.payback}</div> : null}
              arrow
            />
          )
        })}
      </ul>
      {hasNextPage && <div ref={loader}></div>}
    </div>
  )
}

export default CardList
