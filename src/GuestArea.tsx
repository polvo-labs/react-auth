import React, { useEffect } from 'react'
import { Text } from 'react-native'
import useAuth from './useAuth'

export default function GuestArea ({ children }: { children: any }) {
  const { authenticated, handleUnauthorizedGuestAccess } = useAuth()

  useEffect(() => {
    if (authenticated) {
      handleUnauthorizedGuestAccess()
      return
    }
  }, [authenticated])

  if (!authenticated) {
    return children
  }

  return <Text>guest access</Text>
}
