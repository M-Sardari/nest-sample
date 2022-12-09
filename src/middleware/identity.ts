import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtHandler } from "../guard/jwt-handler.service";
import { Payload } from "../dto/payload";

@Injectable()
export class RqIdentityMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtHandler) {
  }

  public async use(req: any, res: any, next: (error?: any) => void) {
    const authorization: string = req.headers["authorization"] ?? "";
    if (!authorization) return next();

    const [type, token] = authorization.split(' ');
    if (!type || type !== 'Bearer') return next();

    const login = await this.jwtService.verifyToken(token);
    if (!login) return next();

    const user: Payload = {
      id: login.id,
      email: login.email,
      token
    }

    Object.assign(req, { "@user": user })
    next();
  }
}
