import { colors } from '@/styles/color'
import { css } from '@emotion/react'
import { ReactNode, MouseEvent } from 'react'
import Flex from './Flex'
import Text from './Text'

const Agreement = ({ children }: { children: ReactNode }) => {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  )
}

const AgreementTitle = ({
  children,
  checked,
  onChange,
}: {
  children: ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) => {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <IconCheck checked={checked} circle />
      <Text bold>{children}</Text>
    </Flex>
  )
}

const AgreementDescription = ({
  children,
  checked,
  onChange,
  link,
}: {
  children: ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
  link?: string
}) => {
  return (
    <Flex justify="space-between">
      <Flex as="li" onClick={(e) => onChange(e, !checked)}>
        <IconCheck checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link != null ? (
        <a href={link} rel="noreferrer">
          <Text typography="t6">링크</Text>
        </a>
      ) : null}
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

const agreementContainerStyles = css`
  padding: 24px;

  & li {
    cursor: pointer;
  }
`

const IconCheck = ({
  checked,
  circle = false,
}: {
  checked: boolean
  circle?: boolean
}) => {
  return (
    <svg
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {circle ? (
        <path
          d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
          fill={checked ? colors.blue : colors.grey}
        />
      ) : null}

      <path
        d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"
        fill={checked ? colors.blue : colors.grey}
      />
    </svg>
  )
}

export default Agreement
