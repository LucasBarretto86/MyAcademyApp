import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '../contexts/SessionContext'

const PrivateRoutes = () => {
  const { token } = useSession()
  console.log(token)

  return (token ? <Outlet /> : <Navigate to="/sign-in" replace />)
}

export default PrivateRoutes
