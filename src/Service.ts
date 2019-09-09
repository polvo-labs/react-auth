import axios from 'axios'
import { AuthProviderConfig, RequestTokenResponse } from './types'

export default class Service {
  private config: AuthProviderConfig

  constructor (config: AuthProviderConfig) {
    this.config = config
  }

  async requestToken (username: string, password: string): Promise<RequestTokenResponse> {
    const { data } = await axios.post(`${this.config.baseURL}/oauth/token`, {
      username,
      password,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      grant_type: this.config.grantType
    })

    return data
  }

  async requestUser (token: string): Promise<any> {
    const { data } = await axios.get(`${this.config.baseURL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data.data
  }
}
