import {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react'
import Input from './Input'
import Text from './Text'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  hasError?: boolean
  helpMessage?: ReactNode
}
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, hasError, helpMessage, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    const labelColor = hasError ? 'red' : focused ? 'blue' : undefined

    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(true)
      onFocus?.(e)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(false)
      onBlur?.(e)
    }

    return (
      <div>
        {label ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginBottom: 6 }}
          >
            {label}
          </Text>
        ) : null}

        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {helpMessage ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginTop: 6, fontSize: 12 }}
          >
            {helpMessage}
          </Text>
        ) : null}
      </div>
    )
  },
)

export default TextField
