import { createPortal } from 'react-dom'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { colors } from '@/styles/color'
import Button from './Button'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

const FixedBottomButton = ({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) => {
  const $portal = document.getElementById('portal')

  if ($portal == null) {
    return null
  }

  return createPortal(
    <Container>
      <Button
        full
        size="medium"
        disabled={disabled}
        onClick={onClick}
        css={buttonStyles}
      >
        {label}
      </Button>
    </Container>,
    $portal,
  )
}

const slideUp = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideUp} 0.5s ease-in-out forwards;
`

const buttonStyles = css`
  border-radius: 8px;
`

export default FixedBottomButton
