import { css } from '@emotion/react'
import { colors } from './color'

export const buttonColorSet = {
  primary: css`
    background-color: ${colors.blue};
    color: ${colors.white};
  `,
  success: css`
    background-color: ${colors.green};
    color: ${colors.white};
  `,
  error: css`
    background-color: ${colors.red};
    color: ${colors.white};
  `,
}

export const buttonWeakSet = {
  primary: css`
    background-color: ${colors.white};
    color: ${colors.blue};
    border: 1px solid ${colors.blue};
  `,
  success: css`
    background-color: ${colors.white};
    color: ${colors.green};
    border: 1px solid ${colors.green};
  `,
  error: css`
    background-color: ${colors.white};
    color: ${colors.red};
    border: 1px solid ${colors.red};
  `,
}

export const buttonSizeSet = {
  small: css`
    font-size: 13px;
    padding: 8px 9px;
  `,
  medium: css`
    font-size: 15px;
    padding: 10px 15px;
  `,
  large: css`
    font-size: 18px;
    padding: 12px 10px;
  `,
}

export type ButtonColor = keyof typeof buttonColorSet
export type ButtonSize = keyof typeof buttonSizeSet
