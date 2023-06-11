import React from 'react'

export const CustomLabel = ({name,...props}) => {
  return (
    <label {...props}>{name}</label>
  )
}
