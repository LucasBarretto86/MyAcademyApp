import { useCallback, useState } from 'react'
import { apiURL, headers } from '../../utils/requests'
import { useSession } from '../../contexts/SessionContext'

export const useCourse = () => {
  const { token } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getCourse = useCallback(async (id) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(apiURL + `/api/v1/courses/${id}`, {
        method: 'get', headers: headers(token)
      })

      return response.json()

    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  return {
    getCourse, loading, error
  }
}

