export default class ErrorHandler {
    public onError(e: any): void {
        const errorCode: number = e.response.status;

        // some GA logs?

        switch (errorCode) {
            case 400:
            case 500:
            case 409:
            case 401:
            case 429:
            case 403:
            default:
                console.log('errorCode', e)
        }
    }
}
