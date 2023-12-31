import AddBanners from '@/components/home/AddBanners'
import CardList from '@/components/home/CardList'
import Top from '@common/Top'

const HomePage = () => {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택이 좋은 카드를 모아봤습니다."
      />
      <AddBanners />
      <CardList />
    </div>
  )
}

export default HomePage
