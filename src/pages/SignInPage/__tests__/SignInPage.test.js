import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { useSession } from '../../../contexts/SessionContext'
import SignInPage from '../index'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}))

jest.mock('../../../contexts/SessionContext', () => ({
  useSession: jest.fn()
}))
describe('SignInPage', () => {
  const mockSignIn = jest.fn()
  const mockNavigate = jest.fn()

  beforeEach(() => {
    useSession.mockReturnValue({
      signIn: mockSignIn
    })
    useNavigate.mockReturnValue(mockNavigate)
  })

  it('renders input fields and button', () => {
    render(
      <BrowserRouter>
        <SignInPage />
      </BrowserRouter>
    )

    expect(screen.getByPlaceholderText('E.g. example@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Entry your password')).toBeInTheDocument()
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  it('submits the form successfully', async () => {
    mockSignIn.mockResolvedValueOnce()

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
    fireEvent.click(screen.getByText('Sign in'))

    await waitFor(() => expect(mockSignIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'))
  })

  it('displays an error message on failed sign-in', async () => {
    mockSignIn.mockRejectedValueOnce(new Error('Invalid credentials'))

    render(
      <BrowserRouter>
        <SignInPage />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('E.g. example@example.com'), {
      target: { value: 'wrong@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('Entry your password'), {
      target: { value: 'wrongpassword' }
    })
    fireEvent.click(screen.getByText('Sign in'))

    await waitFor(() =>
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    )

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'wrong@example.com',
      password: 'wrongpassword'
    })
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
