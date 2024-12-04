import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import InputField from '../../components/forms/InputField'
import Button from '../../components/common/Button'
import { useSignIn } from '../../hooks/signing/useSignIn'

const SignInPage = () => {
  const [params, setParams] = useState({ email: '', password: '' })
  const { signIn } = useSignIn()

  const handleSubmit = () => {
    signIn(params)
  }

  return (
    <MainLayout>
      <form className="flex flex-col items-center gap-4 w-[80vw] max-w-[25rem]">
        <InputField
          type="text"
          placeholder="E.g. example@example.com"
          value={params.email}
          onChange={(e) => setParams({ ...params, email: e.target.value })}
        />

        <InputField
          type="password"
          placeholder="Entry your password"
          value={params.password}
          onChange={(e) => setParams({ ...params, password: e.target.value })}
        />

        <Button type="submit" style={{ marginTop: '2rem' }} onClick={handleSubmit}>Sign in</Button>
      </form>
    </MainLayout>
  )
}

export default SignInPage
