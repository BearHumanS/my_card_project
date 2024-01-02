import styled from '@emotion/styled'
import { ReactNode, useEffect, useState } from 'react'
import Button from './Button'

interface ScrollIndicatorProps {
  targetId: string
  children: ReactNode
}

const ScrollIndicator = ({ targetId, children }: ScrollIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(true)

  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId)
    targetElement?.scrollIntoView({ behavior: 'smooth' })
  }

  const checkScroll = () => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top
      setIsVisible(targetPosition > window.innerHeight)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId])

  if (!isVisible) return null

  return (
    <Indicator onClick={scrollToTarget}>
      <Button weak>{children}</Button>
    </Indicator>
  )
}

const Indicator = styled.div({
  cursor: 'pointer',
  textAlign: 'center',
  padding: 10,
})

export default ScrollIndicator
