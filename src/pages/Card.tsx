import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getCard } from '@/remote/card'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import Top from '@/components/common/Top'
import ListRow from '@/components/common/ListRow'
import FixedBottomButton from '@/components/common/FixedBottomButton'
import Flex from '@common/Flex'
import Text from '@common/Text'

const CardPage = () => {
  const { id = '' } = useParams()

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  })

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle = promotion ? removeTags(promotion.title) : tags.join(', ')

  return (
    <div>
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

      {promotion ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold>유의사항</Text>
          <Text typography="t7">{removeTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton label="신청하기" onClick={() => {}} />
    </div>
  )
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`

const removeTags = (text: string) => {
  let output = ''

  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j += 1) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }
  return output
}

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
