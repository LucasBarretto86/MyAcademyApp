import React from 'react'
import { render, screen } from '@testing-library/react'
import AboutPage from '../index'

// eslint-disable-next-line react/display-name
jest.mock('../../../layouts/PrivateLayout', () => ({ children }) => <div data-testid="private-layout">{children}</div>)

describe('AboutPage', () => {
  it('uses private-layout', () => {
    render(<AboutPage />)

    expect(screen.getByTestId('private-layout')).toBeInTheDocument()
  })

  it('renders the page with essential elements', () => {
    render(<AboutPage />)

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument()

    expect(screen.getByText(/My Academy/i)).toBeInTheDocument()

    expect(screen.getByText(/enhance the user experience/i)).toBeInTheDocument()
  })
})
