import { useCallback, useState } from 'react'
import { apiURL, headers } from '../utils/requests'

export const useRegistration = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const signUp = useCallback(async (params) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(apiURL + '/sign-up', {
        method: 'post',
        headers: headers(),
        body: JSON.stringify({ registration: params })
      })

      return response.json()

    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { signUp, error, loading }
}
