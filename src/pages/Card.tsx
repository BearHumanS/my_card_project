import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getCard } from '@/remote/card'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import Top from '@/components/common/Top'
import ListRow from '@/components/common/ListRow'
import FixedBottomButton from '@/components/common/FixedBottomButton'
import Flex from '@common/Flex'
import Text from '@common/Text'
import useUser from '@/hooks/auth/useUser'
import { useCallback, MouseEvent } from 'react'
import { useAlertContext } from '@/contexts/AlertContext'
import Comment from '@/components/card/Comment'
import Space from '@/components/common/Space'
import ScrollIndicator from '@/components/common/ScrollIndicator '
import Button from '@/components/common/Button'
import styled from '@emotion/styled'

const CardPage = () => {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const user = useUser()

  const { open } = useAlertContext()

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  })

  const moveTo = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () => {
          navigate('/signin')
        },
      })

      return
    }

    navigate(`/apply/${id}`)
  }, [id, navigate, open, user])

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle = promotion ? promotion.title : tags.join(', ')

  const handleUpButton = (e: MouseEvent<HTMLButtonElement>) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Container>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              key={text}
              initial={{
                opacity: 0,
                translateX: -90,
              }}
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
            >
              <ListRow
                as="div"
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>
      <Space size={20} />
      <ScrollIndicator targetId="comments-section">리뷰 보기</ScrollIndicator>
      {promotion ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold>유의사항</Text>
          <Text typography="t7">{promotion.terms}</Text>
        </Flex>
      ) : null}

      <Space size={500} />

      <div id="comments-section">
        <Comment />
        <Flex justify="flex-end" css={upButtonStyles}>
          <Button weak onClick={handleUpButton}>
            <img
              width={20}
              height={20}
              src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-a-256.png"
              alt="상단으로"
            />
          </Button>
        </Flex>
      </div>

      <Space size={100} />

      <FixedBottomButton label="1분만에 신청하기" onClick={moveTo} />
    </Container>
  )
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`

const upButtonStyles = css`
  padding: 24px 24px 0 24px;
`

const Container = styled.div({
  transition: 'transform 0.3s',
})

const IconCheck = () => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 48 48"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fillOpacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  )
}

export default CardPage
