import { useEffect } from 'react'
import useAuth from './useAuth'

export default function Logout ({ onSuccess = () => null }: { onSuccess(): any }) {
  const { logout } = useAuth()

  useEffect(() => {
    if (logout) {
      logout().then(() => {
        if (onSuccess) {
          onSuccess()
        }
      })
    }
  }, [])

  return null
}
