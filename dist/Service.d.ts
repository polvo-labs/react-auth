import { AuthProviderConfig, RequestTokenResponse } from './types';
export default class Service {
    private config;
    constructor(config: AuthProviderConfig);
    requestToken(username: string, password: string): Promise<RequestTokenResponse>;
    requestUser(token: string): Promise<any>;
}
