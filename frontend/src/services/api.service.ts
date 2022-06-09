import axios, {AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse, Method} from 'axios';
import ErrorHandler from './errorHandler.service';
import IRequestOption from './requestOption.interface';

export class ApiService {
    public instance: AxiosInstance = axios.create();
    private errorHandler: ErrorHandler = new ErrorHandler();

    constructor() {
        this.instance.interceptors.response.use(
            (response: any) => response,
            (error: any) => {
                this.errorHandler.onError(error);
                return Promise.reject(error);
            },
        );
    }

    private static createUrl(path = '', optionsParams?: Record<string, any>): string {
        let params = '';
        if (optionsParams) {
            for (const [key, value] of Object.entries(optionsParams)) {
                params += `${params ? '&' : ''}${key}=${value}`;
            }
        }
        return `${path}${params ? `?${params}` : ''}`;
    }

    public createRequest(method: Method, path: string, options: IRequestOption = {}): AxiosPromise {
        this.instance.defaults.headers.post['Content-Type'] = 'application/json';
        return this.instance({
            method,
            url: ApiService.createUrl(path, options.params),
            data: options.data,
            responseType: options.responseType,
        } as AxiosRequestConfig);
    }
}
