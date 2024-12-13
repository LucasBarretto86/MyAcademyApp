import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRegistration } from '../../../hooks/useRegistration'
import { useNavigate } from 'react-router-dom'
import SignUpPage from '../index'

jest.mock('../../../hooks/useRegistration')
jest.mock('react-router-dom', () => ({ ...jest.requireActual('react-router-dom'), useNavigate: jest.fn() }))

describe('SignUpPage', () => {
  const mockSignUp = jest.fn()
  const mockNavigate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useRegistration.mockReturnValue({
      signUp: mockSignUp, error: null
    })
    useNavigate.mockReturnValue(mockNavigate)
  })

  test('renders form fields and submit button', () => {
    render(<SignUpPage />)

    expect(screen.getByPlaceholderText(/e.g. example@example.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/entry your password/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/repeat your password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  test('navigates to /sign-in on successful submission', async () => {
    mockSignUp.mockResolvedValueOnce({ errors: null })

    render(<SignUpPage />)

    fireEvent.change(screen.getByPlaceholderText(/e.g. example@example.com/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText(/entry your password/i), {
      target: { value: 'password123' }
    })
    fireEvent.change(screen.getByPlaceholderText(/repeat your password/i), {
      target: { value: 'password123' }
    })

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com', password: 'password123', password_confirmation: 'password123'
      })
      expect(mockNavigate).toHaveBeenCalledWith('/sign-in')
    })
  })

  test('displays validation errors on failed submission', async () => {
    mockSignUp.mockResolvedValueOnce({
      errors: {
        email: ['Email is invalid'], password: ['Password is too short']
      }
    })

    render(<SignUpPage />)

    fireEvent.change(screen.getByPlaceholderText(/e.g. example@example.com/i), {
      target: { value: 'invalid-email' }
    })
    fireEvent.change(screen.getByPlaceholderText(/entry your password/i), {
      target: { value: '123' }
    })
    fireEvent.change(screen.getByPlaceholderText(/repeat your password/i), {
      target: { value: '123' }
    })

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/email is invalid/i)).toBeInTheDocument()
      expect(screen.getByText(/password is too short/i)).toBeInTheDocument()
    })
  })

  test('displays general error message from hook', () => {
    useRegistration.mockReturnValue({
      signUp: mockSignUp, error: 'Something went wrong!'
    })

    render(<SignUpPage />)

    expect(screen.getByText(/something went wrong!/i)).toBeInTheDocument()
  })
})
