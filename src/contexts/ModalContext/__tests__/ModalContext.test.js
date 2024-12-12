import React, { useState } from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ModalProvider, useModal } from '../index'
import TaskForm from '../../../pages/PrivatePages/TasksPage/components/TaskForm'
import Modal from '../../../components/common/Modal'

const TestComponent = () => {
  const { openModal, closeModal, modal } = useModal()
  const [open, setOpen] = useState(false)

  const testOpen = jest.fn(() => {
    openModal()
    setOpen(true)
  })

  const testClose = jest.fn(() => {
    openModal()
    setOpen(false)
  })

  return (
    <>
      <button onClick={testOpen}>Open Modal</button>
      <button onClick={testClose}>Close Modal</button>
      <div id="modal-content">{open}</div>
    </>
  )
}
test('opens and closes modal correctly', () => {
  render(
    <ModalProvider>
      <TestComponent />
    </ModalProvider>
  )

  const openButton = screen.getByText('Open Modal')
  const closeButton = screen.getByText('Close Modal')
  const modalContent = screen.getByText('false')

  expect(modalContent).toHaveTextContent('false')

  fireEvent.click(openButton)
  expect(modalContent).toHaveTextContent('true')

  fireEvent.click(closeButton)
  expect(modalContent).toHaveTextContent('false')
})
