import {
  ArgumentsHost, Catch,
  ExceptionFilter, HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";
import { RqInfo } from "../interface";
import { ApiExceptionInterface } from "../interface/exception";

@Catch(HttpException)
export class Exception implements ExceptionFilter {
  constructor() {
  }

  catch(exception: any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();
    const status: number = exception.getResponse
      ? exception.getResponse().statusCode
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const error: string | string[] = exception.getResponse
      ? exception.getResponse().message
      : 'Unknown Error';
    const messages: string[] = typeof error === 'string' ? [error] : error;

    const request: RqInfo = req['@info'];

    const api :ApiExceptionInterface={
      request:request.id,
      timestamp:request.start,
      status,
      messages,
    }

    res.status(status).json(api);
  }

}
