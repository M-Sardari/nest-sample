import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Payload } from "../dto/payload";

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
