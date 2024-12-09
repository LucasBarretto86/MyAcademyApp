import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" exact element={<SignUpPage />} />
        <Route path="/sign-in" exact element={<SignInPage />} />
        <Route path="/sign-out" exact element={<div><h1>Sign Out</h1></div>} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<div><h1>Home Page</h1></div>} />
        </Route>
      </Routes>
    </BrowserRouter>)
}

export default AppRoutes
