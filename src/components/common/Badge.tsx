import { colors } from '@/styles/color'
import styled from '@emotion/styled'
import Text from './Text'

interface BadgeProps {
  label: string
}

const Badge = ({ label }: BadgeProps) => {
  return (
    <BadgeContainerStyles>
      <Text bold typography="t7" color="white">
        {label}
      </Text>
    </BadgeContainerStyles>
  )
}

const BadgeContainerStyles = styled.div`
  border-radius: 12px;
  background-color: ${colors.blue};
  padding: 2px 8px;
`

export default Badge
