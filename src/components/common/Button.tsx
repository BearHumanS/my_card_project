import {
  ButtonColor,
  buttonColorSet,
  ButtonSize,
  buttonSizeSet,
  buttonWeakSet,
} from '@/styles/button'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import Flex from './Flex'
import Space from './Space'
import Text from './Text'

interface ButtonProps {
  color?: ButtonColor
  size?: ButtonSize
  weak?: boolean
  full?: boolean
  disabled?: boolean
}

const BaseButton = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '6px',
  },
  ({ color = 'primary', weak }) =>
    weak ? buttonWeakSet[color] : buttonColorSet[color],
  ({ size = 'small' }) => buttonSizeSet[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          border-radius: 0;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.25;
          cursor: initial;
        `
      : undefined,
)

const ButtonGroup = ({
  title,
  children,
}: {
  title?: string
  children: ReactNode
}) => {
  return (
    <Flex direction="column">
      {title != null ? (
        <>
          <Text typography="t6" bold>
            {title}
          </Text>
          <Space size={8} />
        </>
      ) : null}
      <Flex css={buttonGroupStyles}>{children}</Flex>
    </Flex>
  )
}

const buttonGroupStyles = css`
  flex-wrap: wrap;
  gap: 10px;

  & button {
    flex: 1;
  }
`

const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup
}

Button.Group = ButtonGroup

export default Button
