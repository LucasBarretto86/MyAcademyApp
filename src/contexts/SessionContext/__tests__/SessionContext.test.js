import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SessionProvider, useSession } from '../index'

global.fetch = jest.fn()

describe('SessionContext', () => {
  beforeEach(() => {
    localStorage.clear()
    fetch.mockClear()
  })

  const TestComponent = () => {
    const { session, signIn, signOut, user, token } = useSession()

    return (
      <div>
        <div data-testid="session">{JSON.stringify(session)}</div>
        <div data-testid="user">{JSON.stringify(user)}</div>
        <div data-testid="token">{token}</div>
        <button onClick={() => signIn({ email: 'test@example.com', password: 'password' })}>Sign In</button>
        <button onClick={signOut}>Sign Out</button>
      </div>
    )
  }

  it('should provide session and token', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'test-token',
        session: { user: { id: 1, name: 'Test User' } }
      })
    })

    render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    )

    expect(screen.getByTestId('session').textContent).toBe('null')
    expect(screen.getByTestId('token').textContent).toBe('')

    fireEvent.click(screen.getByText('Sign In'))

    waitFor(() => {
      expect(screen.getByTestId('session').textContent).toBe(
        '{"user":{"id":1,"name":"Test User"}}'
      )
      expect(screen.getByTestId('token').textContent).toBe('test-token')
      expect(localStorage.getItem('token')).toBe('test-token')
    })
  })

  it('should handle sign-out', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'test-token',
        session: { user: { id: 1, name: 'Test User' } }
      })
    })

    render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    )

    fireEvent.click(screen.getByText('Sign In'))

    waitFor(() => {
      expect(screen.getByTestId('session').textContent).toBe(
        '{"user":{"id":1,"name":"Test User"}}'
      )
      expect(screen.getByTestId('token').textContent).toBe('test-token')
      expect(localStorage.getItem('token')).toBe('test-token')
    })

    fireEvent.click(screen.getByText('Sign Out'))

    expect(screen.getByTestId('session').textContent).toBe('null')
    expect(screen.getByTestId('token').textContent).toBe('')
    expect(localStorage.getItem('token')).toBe(null)
  })

  it('should throw error on failed sign-in', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: { message: 'Invalid credentials' } })
    })

    render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    )

    fireEvent.click(screen.getByText('Sign In'))

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
    expect(screen.getByTestId('session').textContent).toBe('null')
    expect(screen.getByTestId('token').textContent).toBe('')
  })
})
