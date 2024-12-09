import React from 'react'

const Label = ({ value, ...options }) => {
  return (<label className="w-max-content ml-sm mb-sm text-sm font-bold color" {...options}>{value}</label>)
}

export default Label
