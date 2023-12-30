import Flex from '@common/Flex'
import TextField from '@common/TextField'
import validator from 'validator'
import FixedBottomButton from '@common/FixedBottomButton'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { FormValues } from '@/types/signup'

const Form = ({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
  })

  const [used, setUsed] = useState<Partial<FormValues>>({})

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsed((prev) => ({
      ...prev,
      [e.target.name]: true,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const submit = Object.keys(errors).length === 0

  return (
    <form>
      <Flex direction="column" css={formContainerStyles}>
        <TextField
          label="이메일"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={formValues.email}
          onChange={handleFormValues}
          hasError={Boolean(used.email) && Boolean(errors.email)}
          helpMessage={Boolean(used.email) ? errors.email : null}
          onBlur={handleBlur}
        />
        <TextField
          label="패스워드"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={formValues.password}
          onChange={handleFormValues}
          hasError={Boolean(used.password) && Boolean(errors.password)}
          helpMessage={Boolean(used.password) ? errors.password : null}
          onBlur={handleBlur}
        />
        <TextField
          label="패스워드 확인"
          name="passwordCheck"
          type="password"
          placeholder="비빌번호를 재입력해주세요."
          value={formValues.passwordCheck}
          onChange={handleFormValues}
          hasError={
            Boolean(used.passwordCheck) && Boolean(errors.passwordCheck)
          }
          helpMessage={
            Boolean(used.passwordCheck) ? errors.passwordCheck : null
          }
          onBlur={handleBlur}
        />
        <TextField
          label="이름"
          name="name"
          placeholder="이름을 입력해주세요."
          value={formValues.name}
          onChange={handleFormValues}
          hasError={Boolean(used.name) && Boolean(errors.name)}
          helpMessage={Boolean(used.name) ? errors.name : null}
          onBlur={handleBlur}
        />

        <FixedBottomButton
          disabled={submit === false}
          label="회원가입"
          onClick={() => {
            onSubmit(formValues)
          }}
        />
      </Flex>
    </form>
  )
}

const formContainerStyles = css`
  padding: 24px;
  gap: 16px;
`

const validate = (formValues: FormValues) => {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요.'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요.'
  }

  if (formValues.passwordCheck.length < 8) {
    errors.passwordCheck = '비밀번호를 8글자 이상 입력해주세요.'
  } else if (
    validator.equals(formValues.passwordCheck, formValues.password) === false
  ) {
    errors.passwordCheck = '비밀번호를 확인해주세요.'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요.'
  }

  return errors
}

export default Form
