import React, { Component } from 'react'
import axios from 'axios'
import { Provider } from './Context'
import Service from './Service'
import { AuthProviderProps, AuthProviderState, StorageAdapter, LoginResponse } from './types'

class AuthProvider extends Component<AuthProviderProps, AuthProviderState> {
  initialState: AuthProviderState = {
    mounted: false,
    authenticated: false,
    authenticating: true,
    user: null,
    token: ''
  }

  state = this.initialState

  service: Service = new Service(this.props.config)

  storage: StorageAdapter = this.props.storageAdapter

  axios = axios.create({
    baseURL: this.props.config.baseURL
  })

  async componentDidMount () {
    const hasUser = await this.storage.hasUser(this.props.config)

    if (hasUser) {
      return this.autoLogin()
    }

    this.setState({ mounted: true, authenticated: false })
  }

  login = async (email: string, password: string): Promise<LoginResponse> => {
    this.setState({ authenticating: true })

    try {
      const tokenResponse = await this.service.requestToken(email, password)
      const user = await this.service.requestUser(tokenResponse.access_token)

      await this.storage.setUser({
        email: user.email,
        token: tokenResponse.access_token
      }, this.props.config)

      const token = tokenResponse.access_token

      this.setState({
        user,
        token,
        authenticated: true,
        authenticating: false
      })

      return { user, token }
    } catch (err) {
      this.setState({
        authenticating: false
      })
      throw err
    }
  }

  private async autoLogin () {
    try {
      const { token } = await this.storage.getUser(this.props.config)
      const user = await this.service.requestUser(token)
      this.setState({
        user,
        mounted: true,
        token: token,
        authenticated: true,
        authenticating: false
      })
    } catch (err) {
      await this.storage.clearUser(this.props.config)
      this.setState({
        mounted: true,
        authenticating: false
      })
    }
  }

  logout = async () => {
    await this.storage.clearUser(this.props.config)
    this.setState({
      ...this.initialState,
      authenticating: false,
      mounted: false
    })
  }

  setUser = (user: any) => {
    this.setState(state => ({
      user: {
        ...state.user,
        ...user
      }
    }))
  }

  render () {
    if (!this.state.mounted && this.state.authenticating) {
      return this.props.loader
    }

    return (
      <Provider
        value={{
          ...this.state,
          handleUnauthorizedPrivateAccess: this.props.handleUnauthorizedPrivateAccess,
          handleUnauthorizedGuestAccess: this.props.handleUnauthorizedGuestAccess,
          login: this.login,
          logout: this.logout,
          axios: this.axios,
          setUser: this.setUser
        }}
      >
        {this.props.children}
      </Provider>
    )
  }

  static defaultProps = {
    loader: null,
    handleUnauthorizedPrivateAccess: () => null,
    handleUnauthorizedGuestAccess: () => null
  }
}

export default AuthProvider
