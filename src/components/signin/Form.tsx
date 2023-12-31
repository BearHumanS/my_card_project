import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import Button from '@components/common/Button'
import Flex from '@components/common/Flex'
import TextField from '@components/common/TextField'
import Text from '@common/Text'
import { FormValues } from '@/types/signin'
import { colors } from '@/styles/color'

const Form = ({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const submit = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        value={formValues.email}
        placeholder="이메일을 입력해주세요."
        onChange={handleFormValues}
      />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        value={formValues.password}
        placeholder="비밀번호를 입력해주세요."
        onChange={handleFormValues}
      />
      <Button
        css={loginButtonStyles}
        size="medium"
        disabled={submit === false}
        onClick={() => {
          onSubmit(formValues)
        }}
      >
        로그인
      </Button>
      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
  gap: 16px;
`

const loginButtonStyles = css`
  margin-top: 16px;
`

const linkStyles = css`
  text-align: center;

  & span:hover {
    color: ${colors.blue};
  }
`

const validate = (formValues: FormValues) => {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요.'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요.'
  }

  return errors
}

export default Form
