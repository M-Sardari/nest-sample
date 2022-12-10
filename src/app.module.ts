import { Module, Scope } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { validationSchema } from "./config";
import { dataSource, UserEntity } from "./database";
import { UserController } from "./controller";
import { JwtModule } from "@nestjs/jwt";
import { readFileSync } from "fs";
import * as process from "process";
import { RedisModule } from "gadin-redis";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { Exception, Response } from "./interceptors";
import { JwtHandler } from "./guard";
import { UserService } from "./service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema
    }),
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      privateKey: readFileSync(process.env.JWT_PRV),
      publicKey: readFileSync(process.env.JWT_PUB)
    }),
    RedisModule.forRoot({
      credentials: {
        host: "localhost",
        port: 6379
      }
    })
  ],
  controllers: [UserController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: Response,
      scope: Scope.REQUEST
    },
    {
      provide: APP_FILTER,
      useClass: Exception
    },
    UserService,
    JwtHandler
  ]
})
export class AppModule {
}
