import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import HomePage from '../pages/HomePage'
import CoursePage from '../pages/CoursePage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" exact element={<SignUpPage />} />
        <Route path="/sign-in" exact element={<SignInPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/course/:id" element={<CoursePage />} />
        </Route>
      </Routes>
    </BrowserRouter>)
}

export default AppRoutes
