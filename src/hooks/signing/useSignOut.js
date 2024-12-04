import { useCallback, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { apiURL } from '../../utils/requests'

export const useSignOut = () => {
  const { logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  const signOut = useCallback(async () => {
    setLoading(true)

    const { data, error } = await fetch(apiURL + '/sign-out')

    if (error) {
      setError(error)
      setLoading(false)
    } else if (data) {
      logout()
      setLoading(false)
    }
  }, [logout, setLoading, setError])

  return { signOut, loading, error }
}

