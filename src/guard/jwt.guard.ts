import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as process from "process";
import { JwtHandler } from "./jwt-handler.service";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor() {
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const identity = request["@user"];
    if (!identity) throw new UnauthorizedException();
    return true;
  }
}
