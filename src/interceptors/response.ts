import { ApiResponseInterface, RqInfo } from "../interface";
import { CallHandler, ExecutionContext, HttpStatus, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class Response<T> implements NestInterceptor<T, ApiResponseInterface> {
  constructor() {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponseInterface> {
    return next.handle().pipe(
      map((response: any) => {
        const request = context.switchToHttp().getRequest();
        const info: RqInfo = request["@info"];

        const api: ApiResponseInterface = {
          request: info.id,
          timestamp: info.start,
          statusCode: HttpStatus.OK,
          response
        };

        context.switchToHttp().getResponse().status(200);
        return api;
      })
    );
  }
}
