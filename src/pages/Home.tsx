import AddBanners from '@/components/home/AddBanners'
import CardList from '@/components/home/CardList'
import Top from '@common/Top'

const Home = () => {
  return (
    <div>
      <Top title="하이" subTitle="바이" />
      <AddBanners />
      <CardList />
    </div>
  )
}

export default Home
