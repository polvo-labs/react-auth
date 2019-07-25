import { useContext } from 'react'
import Context from './Context'

export default function useAuth () {
  return useContext(Context)
}
