import Axios, { AxiosRequestConfig } from 'axios';
import { setDefaultHeadersRequest } from '../helpers';
import { logins } from './logins';

enum ILogin {
    'user' = 'tst_ruk_24',
}

enum INTERSAPTION {
    'NOINTERCEPT' = 'NOINTERCEPT',
    'CSRF' = 'CSRF',
}

Axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config && config.headers) {
        if (config.headers.hasOwnProperty(INTERSAPTION.NOINTERCEPT)) {
            return config;
        }

        const CSRF = sessionStorage.getItem(INTERSAPTION.CSRF);

        if (config.url) {
            config.url = process.env.REACT_APP_HOST + config.url;
            const requestToken = config.url.includes('IXCSRFToken');
            if (CSRF && CSRF !== 'undefined' && !requestToken) {
                config.headers['x-csrf-token'] = CSRF;
            }
        }
        setDefaultHeadersRequest(config, {
            ['Accept-Language']: 'ru-RU, ru;q=0.9, en-US;q=0.8, en',
            ['Cache-Control']: 'no-cache',
            ['Expires']: '-1',
            ['Authorization']: process.env.REACT_APP_ENV === 'dev' ? logins[ILogin.user] : '',
            ['Content-Type']: 'application/json;odata.metadata=minimal;charset=utf-8',
        });
    }
    return config;
});
export default Axios;
