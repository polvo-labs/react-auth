/// <reference types="react" />
import { AuthProviderValue } from './types';
declare const Context: import("react").Context<Partial<AuthProviderValue>>;
export declare const Provider: import("react").ProviderExoticComponent<import("react").ProviderProps<Partial<AuthProviderValue>>>, Consumer: import("react").ExoticComponent<import("react").ConsumerProps<Partial<AuthProviderValue>>>;
export default Context;
