import { Component } from 'react';
import Service from './Service';
import { AuthProviderProps, AuthProviderState, StorageAdapter } from './types';
declare class AuthProvider extends Component<AuthProviderProps, AuthProviderState> {
    initialState: AuthProviderState;
    state: AuthProviderState;
    service: Service;
    storage: StorageAdapter;
    axios: import("axios").AxiosInstance;
    componentDidMount(): Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    private autoLogin;
    logout: () => Promise<void>;
    render(): JSX.Element;
    static defaultProps: {
        loader: any;
        handleUnauthorizedPrivateAccess: () => any;
        handleUnauthorizedGuestAccess: () => any;
    };
}
export default AuthProvider;
