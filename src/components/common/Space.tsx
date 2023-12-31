import styled from '@emotion/styled'

interface SpaceProps {
  size: number
  direction?: 'vertical' | 'horizontal'
}

const Space = styled.div<SpaceProps>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical' ? `height: ${size}px` : `width: ${size}px`}
`

export default Space
