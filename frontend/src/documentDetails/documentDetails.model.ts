export interface IDocumentDetails {
    fieldName: string;
    left: number
    top: number
    matches?: any[]
    value: Record<string, any> | null
    id?: string
    [key: string]: any

}
