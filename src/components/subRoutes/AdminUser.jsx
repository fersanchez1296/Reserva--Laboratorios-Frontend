import React from 'react'
import { useEffect } from 'react'

export const AdminUser = () => {
  useEffect(() => {
    alert("montado");
    return () => {
      alert("desmontado");
    }
  },[])

  return (
    <div>adminUser</div>
  )
}
