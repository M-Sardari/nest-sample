import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtGuard implements CanActivate{
  constructor(private readonly jwtService:JwtService)
  {}
  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();
      const authorization = request.headers['authorization'];
      if (!authorization || Array.isArray(authorization)) {
        throw new HttpException('Invalid Authorization Header', HttpStatus.FORBIDDEN);
      }
      const token = authorization.replace('Bearer', '').trim();
      request.user = this.jwtService.verify(token);
      return true;
    }catch (e) {
      return false;
    }





    return undefined;
  }

}
