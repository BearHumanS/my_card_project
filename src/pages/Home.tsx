import { Suspense } from 'react'
import AddBanners from '@components/home/AdBanners'
import CardList from '@components/home/CardList'
import Top from '@common/Top'

import ListRow from '@components/common/ListRow'

const HomePage = () => {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택이 좋은 카드를 모아봤습니다."
      />
      <AddBanners />
      <Suspense
        fallback={[...new Array(10)].map((_, index) => (
          <ListRow.Skeleton key={index} />
        ))}
      >
        <CardList />
      </Suspense>
    </div>
  )
}

export default HomePage
