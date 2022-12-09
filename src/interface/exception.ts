export interface ApiExceptionInterface {
    request: string;
    timestamp: number;
    status: number;
    messages: string[];
}
