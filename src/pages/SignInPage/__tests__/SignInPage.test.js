import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useSession } from '../../../contexts/SessionContext'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import SignInPage from '../index'

jest.mock('react-router-dom', () => ({ ...jest.requireActual('react-router-dom'), useNavigate: jest.fn() }))
jest.mock('../../../contexts/SessionContext', () => ({ useSession: jest.fn() }))

describe('SignInPage', () => {
  const mockNavigate = jest.fn()

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate)
  })

  it('renders the sign in form correctly', () => {
    useSession.mockReturnValue({ signIn: jest.fn(), session: null, error: null })

    render(
      <BrowserRouter>
        <SignInPage />
      </BrowserRouter>
    )

    expect(screen.getByPlaceholderText('E.g. example@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Entry your password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('handles sign in form submission', async () => {
    const mockSignIn = jest.fn()
    useSession.mockReturnValue({ signIn: mockSignIn, session: null, error: null })

    render(
      <BrowserRouter>
        <SignInPage />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('E.g. example@example.com'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('Entry your password'), {
      target: { value: 'password123' }
    })

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => expect(mockSignIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    }))
  })

  it('displays an error message if sign in fails', async () => {
    const mockSignIn = jest.fn()
    useSession.mockReturnValue({ signIn: mockSignIn, session: null, error: 'Invalid credentials' })

    render(
      <BrowserRouter>
        <SignInPage />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('E.g. example@example.com'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('Entry your password'), {
      target: { value: 'wrongpassword' }
    })

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => expect(screen.getByText('Invalid credentials')).toBeInTheDocument())
  })

  it('redirects to the home page if session exists', async () => {
    const mockSignIn = jest.fn()
    useSession.mockReturnValue({ signIn: mockSignIn, session: { 'user': { 'id': 1, 'name': 'Test User' } }, error: null })

    render(
      <BrowserRouter>
        <SignInPage />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })
})
