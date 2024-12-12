import React, { useCallback, useState } from 'react'

const Accordion = ({ heading, isOpen, content, icon }) => {
  const [open, setOpen] = useState(isOpen || false)

  const handleClick = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <details className="accordion" open={open}>
      <summary className="trigger" onClick={() => handleClick}>
        {heading && <h6 className="title text-marine">{heading}</h6>}
        <span className="icon" onClick={() => handleClick}>{icon || '\u00B1'}</span>
      </summary>
      <div className="body">
        {content}
      </div>
    </details>
  )
}

export default Accordion
