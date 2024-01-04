import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import { getAdBanner } from '@/remote/banner'
import Flex from '@common/Flex'
import Text from '@common/Text'
import { colors } from '@/styles/color'
import 'swiper/css'
import 'swiper/css/autoplay'
import { motion } from 'framer-motion'

const AddBanners = () => {
  const { data, isLoading } = useQuery(['adBanners'], () => getAdBanner())

  if (data == null || isLoading) {
    return (
      <Container>
        <Flex direction="column" css={bannerContainerStyles}>
          <Text bold>&nbsp;</Text>
          <Text typography="t7">&nbsp;</Text>
        </Flex>
      </Container>
    )
  }
  return (
    <motion.div whileHover={{ scale: 1.15 }}>
      <Container>
        <Swiper
          spaceBetween={8}
          modules={[Autoplay]}
          autoplay={{ delay: 2500 }}
          loop={true}
        >
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
    </motion.div>
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
