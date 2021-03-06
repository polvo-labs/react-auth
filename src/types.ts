import {AxiosInstance, AxiosRequestConfig} from 'axios'

export interface AuthProviderConfig {
  baseURL: string
  clientId: number
  clientSecret: string
  grantType: string
  namespace: string
}

export interface AuthProviderProps {
  config: AuthProviderConfig
  storageAdapter: StorageAdapter
  handleUnauthorizedPrivateAccess?()
  handleUnauthorizedGuestAccess?()
  loader?: JSX.Element
  children?: JSX.Element
}

export interface AuthProviderState {
  mounted: boolean
  authenticating: boolean
  authenticated: boolean
  user: any
  token: string
  meta: any
}

export interface AuthProviderValue extends AuthProviderState {
  login(email: string, password: string, metaw: any): Promise<LoginResponse>
  logout()
  axios: AxiosInstance,
  handleUnauthorizedPrivateAccess()
  handleUnauthorizedGuestAccess()
  setUser(user: any)
  setMeta(meta: any)
}

export interface User {
  email: string
  token: string
}

export interface StorageAdapter {
  hasUser(config: AuthProviderConfig): Promise<boolean>
  getUser(config: AuthProviderConfig): Promise<User>
  setUser(user: any, config: AuthProviderConfig): Promise<void>
  clearUser(config: AuthProviderConfig): Promise<void>
}

export interface RequestTokenResponse {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

export interface RequestData {
  loading: boolean
  request(config: AxiosRequestConfig): Promise<any>
  data: any
  error: any
}

export interface UseRequestArgs {
  authorized?: boolean
  onError?(err: any)
  onSuccess?(response: any)
}

export interface LoginResponse {
  user: any
  token: string
}
