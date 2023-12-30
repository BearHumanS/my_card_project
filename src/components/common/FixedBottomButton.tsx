import { createPortal } from 'react-dom'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { colors } from '@/styles/color'
import Button from './Button'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
}

const FixedBottomButton = ({ label, onClick }: FixedBottomButtonProps) => {
  const $portal = document.getElementById('portal')

  if ($portal == null) {
    return null
  }

  return createPortal(
    <Container>
      <Button full size="medium" onClick={onClick} css={buttonStyles}>
        {label}
      </Button>
    </Container>,
    $portal,
  )
}

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
`

const buttonStyles = css`
  border-radius: 8px;
`

export default FixedBottomButton
