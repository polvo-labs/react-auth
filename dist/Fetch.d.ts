/// <reference types="react" />
import { AxiosRequestConfig } from 'axios';
import { RequestData, UseRequestArgs } from './types';
export default function Fetch(props: AxiosRequestConfig & FetchProps): JSX.Element;
interface FetchProps extends UseRequestArgs {
    children: (props: RequestData) => JSX.Element;
    lazy?: boolean;
    loader?: () => JSX.Element;
}
export {};
