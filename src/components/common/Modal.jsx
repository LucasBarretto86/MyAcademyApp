import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from '../../contexts/ModalContext'

const Modal = ({ isOpen, onClose, heading = '', content, footer, loading, error }) => {
  const { modal, openModal, closeModal } = useModal()

  useEffect(() => {
    if (isOpen) {
      openModal()
    }
  }, [isOpen, openModal])

  const handleClose = () => {
    onClose()
    closeModal()
  }

  return isOpen && (
    createPortal(
      <div className="modal-wrapper">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="text-marine">{heading}</h5>
            <div className="modal-close" onClick={handleClose}>{'\u00D7'}</div>
          </div>

          <div className="modal-body">
            {loading ? 'Loading...' : error ? <p className="error-message">{error}</p> : content || 'No content at this moment'}
          </div>

          {footer && <footer className="modal-footer">{footer}</footer>}
        </div>

        <div className="modal-overlay" onClick={handleClose} />
      </div>, modal)
  )
}

export default Modal
