// import {
//   CanActivate,
//   ExecutionContext,
//   HttpException,
//   HttpStatus,
//   Injectable,
//   UnauthorizedException
// } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import * as process from "process";
// import { JwtHandler } from "./jwt-handler.service";
//
// @Injectable()
// export class JwtGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtHandler) {
//   }
//
//   async canActivate(context: ExecutionContext) {
//     let isValid = false;
//
//     const request = context.switchToHttp().getRequest();
//     const authorization = request.headers.authorization;
//     if (!authorization || Array.isArray(authorization)) {
//       isValid = false;
//     } else {
//       const token = authorization.replace("Bearer", "").trim();
//       const user = await this.jwtService.verify(token);
//       if (user === undefined) {
//         isValid = false;
//       } else {
//         request.user = user;
//         isValid = true;
//       }
//     }
//     if (!isValid) throw new UnauthorizedException();
//
//     return isValid;
//   }
// }
