import { useEffect } from 'react'
import useAuth from './useAuth'

export default function PrivateArea ({ children }: { children: any }) {
  const {
    authenticated,
    handleUnauthorizedPrivateAccess = () => null
  } = useAuth()

  useEffect(() => {
    if (!authenticated) {
      handleUnauthorizedPrivateAccess()
      return
    }
  }, [authenticated])

  if (authenticated) {
    return children
  }

  return null
}
