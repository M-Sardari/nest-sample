import { ApiResponseInterface } from "../interface";
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { Payload } from "../dto/payload";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponseInterface> {
  constructor(){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponseInterface> {
    return next.handle().pipe(
      map((response: any) => {
        const request = context.switchToHttp().getRequest();

        const user: Payload = request.user;

        const api: ApiResponseInterface = {
          request: "1111",
          timestamp: 0,
          user: {
            id: user.id,
            email: user.email
          },
          response
        };

        context.switchToHttp().getResponse().status(200);
        return api;
      })
    );
  }
}
