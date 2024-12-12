import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const modal = useRef(document.getElementById('modal'))

  useEffect(() => {
    if (open) {
      modal.innerHTML = ''
      modal.current.dataset.open = 'true'
    } else {
      modal.current.dataset.open = 'false'
    }
  }, [open])

  const openModal = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const closeModal = useCallback(() => {
    setOpen(false)
    modal.current.dataset.open = 'false'
  }, [setOpen])

  return (
    <ModalContext.Provider value={{ modal: modal.current, openModal: openModal, closeModal: closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
