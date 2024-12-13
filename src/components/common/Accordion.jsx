import React, { useCallback, useState } from 'react'

const Accordion = ({ heading, isOpen, content, icon }) => {
  const [open, setOpen] = useState(isOpen || false)

  const defaultIcon = (
    <svg className="accordion-icon-default" viewBox="0 0 24 24" fill="none" stroke="#235784" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
      <path d="M9 11L11.6002 13.6002V13.6002C11.821 13.821 12.179 13.821 12.3998 13.6002V13.6002L15 11" />
    </svg>
  )

  const handleClick = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <details className="accordion" open={open}>
      <summary className="accordion-trigger" onClick={() => handleClick}>
        {heading && <h6 className="accordion-heading text-marine">{heading}</h6>}
        <span className="accordion-trigger-icon" onClick={() => handleClick}>{icon || defaultIcon}</span>
      </summary>
      <div className="accordion-body">
        {content}
      </div>
    </details>
  )
}

export default Accordion
