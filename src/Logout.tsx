import React, { useEffect } from 'react'
import useAuth from './useAuth'

export default function Logout ({ onSuccess = () => null }: { onSuccess() }) {
  const { logout } = useAuth()

  useEffect(() => {
    logout().then(() => {
      if (onSuccess) {
        onSuccess()
      }
    })
  }, [])

  return null
}
