import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getAdBanner } from '@/remote/banner'
import Flex from '@common/Flex'
import Text from '@common/Text'
import { colors } from '@/styles/color'
import 'swiper/css'

const AddBanners = () => {
  const { data } = useQuery(['adBanners'], () => getAdBanner())

  if (data == null) {
    return null
  }
  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`

const Container = styled.div`
  padding: 24px;
`

export default AddBanners
