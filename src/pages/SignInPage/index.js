import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../contexts/SessionContext'
import MainLayout from '../../layouts/MainLayout'
import InputField from '../../components/forms/InputField'
import Button from '../../components/common/Button'

const SignInPage = () => {
  const [params, setParams] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const { signIn } = useSession()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await signIn(params)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

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

        <Button type="submit" style={{ marginTop: '2rem' }} onClick={handleSubmit}>Sign in</Button>
      </form>
    </MainLayout>
  )
}

export default SignInPage
