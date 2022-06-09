import {ResponseType} from "axios";

export default interface IRequestOption {
    data?: Record<string, any> | string; // will add to request payload
    params?: Record<string, any>; // will add to URL
    responseType?: ResponseType;
}
