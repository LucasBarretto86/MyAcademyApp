import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import HomePage from '../index'
import { useCourses } from '../../../hooks/courses/useCourses'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../../../hooks/courses/useCourses')
jest.mock('../../../layouts/PrivateLayout', () => ({ children }) => <div data-testid="private-layout">{children}</div>)

describe('HomePage', () => {
  it('uses private-layout', () => {
    useCourses.mockReturnValue({
      getCourses: jest.fn(),
      error: null,
      loading: true
    })

    render(<HomePage />)

    expect(screen.getByTestId('private-layout')).toBeInTheDocument()
  })

  it('renders loading state initially', () => {
    useCourses.mockReturnValue({
      getCourses: jest.fn(),
      error: null,
      loading: true
    })

    render(<HomePage />)

    expect(screen.getByText(/loading.../i)).toBeInTheDocument()
  })

  it('displays courses when fetched successfully', async () => {
    const mockCourses = [
      { id: 1, title: 'Course 1', description: 'Description 1', lessons_count: 10 },
      { id: 2, title: 'Course 2', description: 'Description 2', lessons_count: 8 }
    ]

    useCourses.mockReturnValue({
      getCourses: jest.fn().mockResolvedValue(mockCourses),
      error: null,
      loading: false
    })

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    await waitFor(() => screen.getByText('Course 1'))

    expect(screen.getByText('Course 1')).toBeInTheDocument()
    expect(screen.getByText('Course 2')).toBeInTheDocument()
  })

  it('displays error message when fetching courses fails', async () => {
    useCourses.mockReturnValue({
      getCourses: jest.fn().mockResolvedValue({ error: 'Failed to fetch courses' }),
      error: 'Failed to fetch courses',
      loading: false
    })

    render(<HomePage />)

    await waitFor(() => screen.getByText(/Failed to fetch courses/i))

    expect(screen.getByText(/Failed to fetch courses/i)).toBeInTheDocument()
  })
})
