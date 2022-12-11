export interface ApiExceptionInterface {
    request: string;
    timestamp: number;
    statusCode: number;
    messages: string[];
}
