import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ModalProvider, useModal } from '../index';
import Modal from '../../../components/common/Modal';

const TestComponent = () => {
  const { openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <button onClick={closeModal}>Close Modal</button>
      <Modal content="Modal content" />
    </>
  );
};


test('opens and closes modal correctly', async () => {
  render(
    <ModalProvider>
      <TestComponent />
    </ModalProvider>
  );

  const openButton = screen.getByText('Open Modal');
  const closeButton = screen.getByText('Close Modal');
  const modalContainer = document.getElementById('modal');

  fireEvent.click(openButton);
  await waitFor(() => expect(modalContainer).toHaveAttribute('data-open', 'true'));

  fireEvent.click(closeButton);
  await waitFor(() => expect(modalContainer).toHaveAttribute('data-open', 'false'));
});
