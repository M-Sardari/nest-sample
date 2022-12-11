import {
  ArgumentsHost, Catch,
  ExceptionFilter, HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";
import { RqInfo } from "../interface";
import { ApiExceptionInterface } from "../interface/exception";

@Catch()
export class Exception implements ExceptionFilter {
  constructor() {
  }

  catch(exception: any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();
    const statusCode: number = exception
      ? exception.status
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const error: string | string[] = exception
      ? exception.message
      : 'Unknown Error';
    const messages: string[] = typeof error === 'string' ? [error] : error;

    const request: RqInfo = req['@info'];

    const api :ApiExceptionInterface={
      request:request.id,
      timestamp:request.start,
      statusCode,
      messages,
    }

    res.status(statusCode
    ).json(api);
  }

}
