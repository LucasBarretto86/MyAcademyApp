import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const { token } = useAuth()

  return (token ? <Outlet /> : <Navigate to="/sign-in" replace />)
}

export default PrivateRoutes
