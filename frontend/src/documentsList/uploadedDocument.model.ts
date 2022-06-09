export interface IUploadedDocumentOnList {
    // imageFile: string, // url to image
    // dataFile: string, // all JSON
    // dataId: string // ID


    dataFile: string; // "https://document-crackers-2022.s3.eu-west-1.amazonaws.com/images-data/images-data/FIRST_V5_PAGE1-jpg.json"
    dataId: string; // "FIRST_V5_PAGE1-jpg.json"
    imageFile: string; // "https://document-crackers-2022.s3.eu-west-1.amazonaws.com/images/images/FIRST_V5_PAGE1.jpg"
    imagePath: string; //" /images/FIRST_V5_PAGE1.jpg"
}
