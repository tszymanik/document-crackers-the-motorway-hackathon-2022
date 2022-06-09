import {ApiService} from "./api.service";
import {AxiosPromise} from "axios";

export class ImagesService {
    private apiService: ApiService = new ApiService();


    /*
            just example
     */

    public uploadImage(payload: any): AxiosPromise {
        return this.apiService.createRequest("POST", `/v5c`);
    }

    // public getImage(id: string): AxiosPromise {
    //     return this.apiService.createRequest("GET", `/some-url`);
    // }
}
