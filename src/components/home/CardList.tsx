import { useCallback, useEffect, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import { getCards } from '@remote/card'
import { useNavigate } from 'react-router-dom'
import ListRow from '@common/ListRow'
import Badge from '../common/Badge'
import { css } from '@emotion/react'

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

  const navigate = useNavigate()

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
      <ul css={cardStyles}>
        {cards.map((card, index) => {
          return (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={card.payback ? <Badge label={card.payback} /> : null}
              arrow
              onClick={() => {
                navigate(`/card/${card.id}`)
              }}
            />
          )
        })}
      </ul>
      {hasNextPage && <div ref={loader}></div>}
    </div>
  )
}

const cardStyles = css`
  cursor: pointer;
`

export default CardList
