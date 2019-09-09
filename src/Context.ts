import { createContext } from 'react'
import { AuthProviderValue } from './types'

const Context = createContext<Partial<AuthProviderValue>>({})

export const { Provider, Consumer } = Context

export default Context
