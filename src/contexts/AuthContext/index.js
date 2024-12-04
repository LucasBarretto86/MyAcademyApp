import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const login = useCallback((newToken) => {
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem('token')
  }, [])

  const value = useMemo(() => ({ token, login, logout }), [token, login, logout])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
