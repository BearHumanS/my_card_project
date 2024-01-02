import styled from '@emotion/styled'
import { colors } from '@styles/color'

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarStep progress={progress} />
    </ProgressBarContainer>
  )
}

const ProgressBarStep = styled.div<{ progress: number }>(({ progress }) => ({
  height: 10,
  backgroundColor: colors.blue,
  transform: `scaleX(${progress})`,
  transition: 'transform 0.3s',
  transformOrigin: 'left',
}))

const ProgressBarContainer = styled.div(() => ({
  width: '100%',
  height: 10,
  backgroundColor: colors.grey,
  overflow: 'hidden',
  borderRadius: 6,
}))

export default ProgressBar
