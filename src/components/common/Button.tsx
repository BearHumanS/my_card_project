import {
  ButtonColor,
  buttonColorSet,
  ButtonSize,
  buttonSizeSet,
  buttonWeakSet,
} from '@/styles/button'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface ButtonProps {
  color?: ButtonColor
  size?: ButtonSize
  weak?: boolean
  full?: boolean
  disabled?: boolean
}

const Button = styled.button<ButtonProps>(
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

export default Button
