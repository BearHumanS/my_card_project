import { colors } from '@/styles/color'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const opacity = keyframes`
    0%{
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }

    100% {
        opacity: 1;
    }
`

const Skeleton = styled.div<{ width: number; height: number }>(
  ({ width, height }) => ({
    backgroundColor: colors.grey,
    animation: `${opacity} 2s ease-in out 0.5s`,
    width,
    height,
  }),
)

export default Skeleton
