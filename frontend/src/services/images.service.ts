import {ApiService} from "./api.service";
import {AxiosPromise} from "axios";

export class ImagesService {
    private apiService: ApiService = new ApiService();


    public uploadImage(payload: any): AxiosPromise {
        return this.apiService.createRequest("POST", `/v5c`, {data: payload});
    }

    public getList(): AxiosPromise {
        return this.apiService.createRequest("GET", `/v5c`);
    }

    public getSingle(id: string): AxiosPromise {
        return this.apiService.createRequest("GET", `/v5c/${id}`);
    }

    public getImage(path: string): AxiosPromise {
        return this.apiService.createRequest('GET', `/v5c/${path}`)
    }

}
