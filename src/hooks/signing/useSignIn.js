import { useCallback, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { apiURL } from '../../utils/requests'

export const useSignIn = () => {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  const signIn = useCallback(async ({ params }) => {
    setLoading(true)

    const { data, error } = await fetch(apiURL + '/sign-in', {
      method: 'POST',
      params: { session: params }
    })

    if (error) {
      setError(error)
      setLoading(false)
    } else if (data) {
      login()
      setLoading(false)
    }
  }, [login, setLoading, setError])

  return { signIn, loading, error }
}
