import { forwardRef, SelectHTMLAttributes } from 'react'
import { colors } from '@/styles/color'
import styled from '@emotion/styled'
import Flex from './Flex'
import Text from './Text'
import { Option } from '@/types/apply'
import { css } from '@emotion/react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, value, ...props }, ref) => {
    return (
      <Flex direction="column" css={containerStyles}>
        {label ? (
          <Text
            typography="t7"
            color="black"
            display="inline-block"
            style={{ marginBottom: 6 }}
          >
            {label}
          </Text>
        ) : null}
        <BaseSelect required={true} ref={ref} value={value} {...props}>
          <option disabled={true} hidden={true} value="">
            {placeholder}
          </option>
          {options.map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </BaseSelect>
      </Flex>
    )
  },
)

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.grey};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: ${colors.grey2};
  }
`

const containerStyles = css`
  gap: 8px;
`

export default Select
