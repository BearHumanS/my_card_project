import { css } from '@emotion/react'

export const colorTheme = css`
  :root {
    --red: #f44336;
    --blue: #459ee5;
    --green: #4caf50;
    --white: #fff;
    --black: #212121;
    --grey: #eee;
    --grey2: #a6b5c1;
  }
`

export const colors = {
  red: 'var(--red)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  white: 'var(--white)',
  black: 'var(--black)',
  grey: 'var(--grey)',
  grey2: 'var(--grey2)',
}

export type Colors = keyof typeof colors
