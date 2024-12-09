import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegistration } from '../../hooks/useRegistration'
import MainLayout from '../../layouts/MainLayout'
import InputField from '../../components/forms/InputField'
import Button from '../../components/common/Button'

const SignUpPage = () => {
  const [params, setParams] = useState({ email: '', password: '', password_confirmation: '' })
  const [errors, setErrors] = useState(null)
  const { signUp, error } = useRegistration()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { errors } = await signUp(params)

    if (errors) {
      setErrors(errors)
    } else {
      navigate('/sign-in')
    }
  }

  return (
    <MainLayout>
      <form className="flex flex-col items-center gap-4 w-[80vw] max-w-[25rem]">
        <InputField
          type="text"
          placeholder="E.g. example@example.com"
          value={params.email}
          error={errors?.email?.[0]}
          required={true}
          onChange={(e) => setParams({ ...params, email: e.target.value })}
        />

        <InputField
          type="password"
          placeholder="Entry your password"
          value={params.password}
          error={errors?.password?.[0]}
          required={true}
          onChange={(e) => setParams({ ...params, password: e.target.value })}
        />

        <InputField
          type="password"
          placeholder="Repeat your password"
          value={params.password_confirmation}
          error={errors?.password_confirmation?.[0]}
          required={true}
          onChange={(e) => setParams({ ...params, password_confirmation: e.target.value })}
        />

        {error && <p className="error-message"><small>{error}</small></p>}

        <p><small>Already have an account? <a href="/sign-in">Login yourself, pal!</a></small></p>

        <Button type="submit" style={{ marginTop: '2rem' }} onClick={handleSubmit}>Sign in</Button>
      </form>
    </MainLayout>
  )
}

export default SignUpPage
