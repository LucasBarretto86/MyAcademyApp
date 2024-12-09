import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { apiURL, headers } from '../../utils/requests'

const SessionContext = createContext()

export const SessionProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const signIn = useCallback(async (credentials) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(apiURL + '/sign-in', {
        method: 'post',
        headers: headers(),
        body: JSON.stringify({ session: credentials })
      })

      const { error, token, session } = await response.json()

      if (error) {
        setError(error.message)
      } else {
        setToken(token)
        setSession(session)
        localStorage.setItem('token', token)
      }
    } catch (error) {
      setError(error?.message || 'Unknown authentication error')
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(() => {
    setToken(null)
    setSession(null)
    localStorage.removeItem('token')
  }, [])

  const user = useMemo(() => (session?.user), [session])

  const value = useMemo(() => ({ token, session, user, loading, error, signIn, signOut }), [token, session, user, loading, error, signIn, signOut])

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export const useSession = () => useContext(SessionContext)
