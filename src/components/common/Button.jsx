import React from 'react'

const Button = ({ children, color = 'teal', type = 'button', ...options }) => {
  return (
    <button
      className={`flex justify-center items-center my-2 py-2 px-5 rounded border border-${color} bg-${color} text-white font-[500] cursor-pointer hover:opacity-80 disabled:border-gray disabled:bg-gray`}
      type={type}
      {...options}
    >
      {children}
    </button>
  )
}

export default Button
