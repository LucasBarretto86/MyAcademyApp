import React, { useId } from 'react'
import Label from './Label'

const InputField = ({ type, label, error, ...options }) => {
  const id = useId()

  return (
    <div className="flex flex-col gap-y-1 w-[100%] text-left">
      {label && <Label htmlFor={id} value={label} />}
      <input className="p-3 border-2 border-gray focus-within:outline-black rounded-sm" id={id} key={id} type={type} {...options} />
      {error && <small className="error-message">{error}</small>}
    </div>
  )
}

export default InputField
