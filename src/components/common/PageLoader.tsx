import { css } from '@emotion/react'
import Flex from './Flex'
import Space from './Space'
import Text from './Text'

const PageLoader = ({ message }: { message?: string }) => {
  return (
    <Flex css={containerStyles} justify="center" align="center">
      <Flex direction="column" align="center">
        <img
          width={120}
          src="https://cdn.pixabay.com/animation/2023/06/13/15/13/15-13-37-55_512.gif"
          alt="로딩이미지"
        />

        {message ? (
          <>
            <Space size={120} />
            <Text typography="t4" bold>
              {message}
            </Text>
          </>
        ) : null}
      </Flex>
    </Flex>
  )
}

const containerStyles = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export default PageLoader
