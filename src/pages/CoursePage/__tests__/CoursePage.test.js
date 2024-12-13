import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CoursePage from '../index'
import { useCourse } from '../../../hooks/courses/useCourse'
import React from 'react'

jest.mock('../../../hooks/courses/useCourse')
// eslint-disable-next-line react/display-name
jest.mock('../../../layouts/PrivateLayout', () => ({ children }) => <div data-testid="private-layout">{children}</div>)

describe('CoursePage', () => {
  it('uses private-layout', () => {
    useCourse.mockReturnValue({
      getCourse: jest.fn(),
      loading: false,
      error: null
    })

    render(<CoursePage />)

    expect(screen.getByTestId('private-layout')).toBeInTheDocument()
  })

  it('fetches course and shows lessons', async () => {
    const mockCourse = {
      title: 'Test Course',
      lessons: [{ id: 1, number: 1, title: 'Lesson 1', description: 'Description' }]
    }
    useCourse.mockReturnValue({
      getCourse: jest.fn().mockResolvedValue(mockCourse),
      loading: false,
      error: null
    })

    render(
      <BrowserRouter>
        <CoursePage />
      </BrowserRouter>
    )

    await waitFor(() => screen.getByText('Test Course'))
    expect(screen.getByText(/Test Course/)).toBeInTheDocument()
    expect(screen.getByText(/Lesson 1/)).toBeInTheDocument()
  })
})
