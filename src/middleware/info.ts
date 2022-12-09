import { Injectable, NestMiddleware } from "@nestjs/common";
import { RqInfo } from "../interface";
import * as uuid from "uuid";
import * as requestIp from "request-ip";
@Injectable()
export class RqInfoMiddleware implements NestMiddleware {
  public async use(req: Request, res: Response, next: () => void) {
    const info: RqInfo = {
      id: uuid.v4(),
      start: new Date().getTime(),
      ip: requestIp.getClientIp(req),
    };

    Object.assign(req, { '@info': info });
    next();
  }

}
