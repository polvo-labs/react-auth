import { useEffect } from 'react'
import useAuth from './useAuth'

export default function GuestArea ({ children }: { children: any }) {
  const {
    authenticated,
    handleUnauthorizedGuestAccess = () => null
  } = useAuth()

  useEffect(() => {
    if (authenticated) {
      handleUnauthorizedGuestAccess()
      return
    }
  }, [authenticated])

  if (!authenticated) {
    return children
  }

  return null
}
