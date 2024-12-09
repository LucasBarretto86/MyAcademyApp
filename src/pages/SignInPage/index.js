import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../contexts/SessionContext'
import MainLayout from '../../layouts/MainLayout'
import InputField from '../../components/forms/InputField'
import Button from '../../components/common/Button'

const SignInPage = () => {
  const [params, setParams] = useState({ email: '', password: '' })
  const { signIn, session, error } = useSession()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signIn(params)
  }

  useEffect(() => {
    if (session) navigate('/')
  }, [navigate, session])

  return (
    <MainLayout>
      <form className="flex flex-col items-center gap-4 w-[80vw] max-w-[25rem]">
        <InputField
          type="text"
          placeholder="E.g. example@example.com"
          value={params.email}
          required={true}
          onChange={(e) => setParams({ ...params, email: e.target.value })}
        />

        <InputField
          type="password"
          placeholder="Entry your password"
          value={params.password}
          required={true}
          onChange={(e) => setParams({ ...params, password: e.target.value })}
        />


        {error && <p className="error-message"><small>{error}</small></p>}

        <p><small>New around here? <a href="/sign-up">Get yourself a login!</a></small></p>

        <Button type="submit" style={{ marginTop: '2rem' }} onClick={handleSubmit}>Sign in</Button>
      </form>
    </MainLayout>
  )
}

export default SignInPage
