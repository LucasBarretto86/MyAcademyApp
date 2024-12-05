import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { apiURL, headers } from '../../utils/requests'

const SessionContext = createContext()

export const SessionProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [session, setSession] = useState(null)

  const signIn = useCallback(async (credentials) => {
    const response = await fetch(apiURL + '/sign-in', {
      method: 'post',
      headers: headers(),
      body: JSON.stringify({ session: credentials })
    })

    if (response.ok) {
      const data = await response.json()
      setToken(data.token)
      setSession(data.session)
      localStorage.setItem('token', data.token)
    } else {
      const data = await response.json()

      throw new Error(data.error.message || 'Failed to Sign-in')
    }
  }, [])

  const signOut = useCallback(() => {
    setToken(null)
    setSession(null)
    localStorage.removeItem('token')
  }, [])

  const user = useMemo(() => (session?.user), [session])

  const value = useMemo(() => ({ token, session, user, signIn, signOut }), [token, session, user, signIn, signOut])

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export const useSession = () => useContext(SessionContext)
