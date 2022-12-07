import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as process from "process";

@Injectable()
export class JwtGuard implements CanActivate{
  constructor(private readonly jwtService:JwtService)
  {}
  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();
      const authorization = request.headers['authorization'];
      if (!authorization || Array.isArray(authorization)) {
        throw new HttpException('Invalid Authorization Header',HttpStatus.UNAUTHORIZED);
      }
      const token = authorization.replace('Bearer', '').trim();
      const user = this.jwtService.verify(token);
      request.user = user;
      return true;
    }catch (e) {
      throw new HttpException(`Invalid Authorization Header and error is: ${e}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
