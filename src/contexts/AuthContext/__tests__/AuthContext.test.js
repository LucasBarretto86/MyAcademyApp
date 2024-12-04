import React, { useEffect } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../index.js'
import { BrowserRouter } from 'react-router-dom'

beforeEach(() => {
  localStorage.clear()
})

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  )
}

describe('AuthProvider', () => {
  it('should call token and retrieve token in localStorage', () => {
    localStorage.setItem('token', 'mockToken')

    const TestComponent = () => {
      const { token } = useAuth()
      return <>{token}</>
    }

    renderWithProviders(<TestComponent />)

    expect(screen.getByText('mockToken')).toBeInTheDocument()
  })

  it('should call login and set token in localStorage', async () => {
    const TestComponent = () => {
      const { login } = useAuth()

      useEffect(() => {
        login('mockToken')
      }, [login])
      return <>Test Component</>
    }

    renderWithProviders(<TestComponent />)

    await waitFor(() => expect(localStorage.getItem('token')).toBe('mockToken'))
  })

  it('should call logout and remove token from localStorage', async () => {
    localStorage.setItem('token', 'mockToken')

    const TestComponent = () => {
      const { logout } = useAuth()
      useEffect(() => {
        logout()
      }, [logout])
      return <>Test Component</>
    }

    renderWithProviders(<TestComponent />)

    await waitFor(() => expect(localStorage.getItem('token')).toBeNull())
  })
})
