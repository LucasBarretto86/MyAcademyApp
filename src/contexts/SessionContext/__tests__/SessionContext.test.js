import React, { useEffect } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SessionProvider, useSession } from '../index.js'

// const mockedSignIn = jest.fn()
// const mockedSignOut = jest.fn()

beforeEach(() => {
  localStorage.clear()
  // useSession.mockReturnValue({ signIn: mockedSignIn, signOut: mockedSignOut })
})

const renderWithProviders = (ui) => {
  return render(
    <SessionProvider>{ui}</SessionProvider>
  )
}

describe('SessionProvider', () => {
  it('should call session and retrieve token in localStorage', () => {
    localStorage.setItem('token', 'mockedToken')

    const TestComponent = () => {
      const { token } = useSession()
      return <>{token}</>
    }

    renderWithProviders(<TestComponent />)

    expect(screen.getByText('mockedToken')).toBeInTheDocument()
  })

  it('should call signIn and set session in localStorage', async () => {
    const TestComponent = () => {
      const { signIn } = useSession()

      useEffect(() => {
        signIn({ email: 'example@example.com', password: 'password' })
      }, [signIn])
      return <>Test Component</>
    }

    renderWithProviders(<TestComponent />)

    await waitFor(() => expect(localStorage.getItem('token')).toBe('mockedToken'))
  })

  it('should call signOut and remove session from localStorage', async () => {
    localStorage.setItem('token', 'mockedToken')

    const TestComponent = () => {
      const { signOut } = useSession()
      useEffect(() => {
        signOut()
      }, [signOut])
      return <>Test Component</>
    }

    renderWithProviders(<TestComponent />)

    await waitFor(() => expect(localStorage.getItem('session')).toBeNull())
  })
})
