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
import { UserService } from "./service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from "gadin-auth2";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema
    }),
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forFeature([UserEntity]),
    // JwtModule.register({
    //   secret:"dsadas",
    //   privateKey: readFileSync(process.env.JWT_PRV),
    //   publicKey: readFileSync(process.env.JWT_PUB)
    // }),
    RedisModule.forRoot({
      credentials: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT
      }
    }),
    AuthModule.forRoot({
      PUB_KEY: readFileSync(process.env.JWT_PUB),
      PRV_KEY: readFileSync(process.env.JWT_PRV),
      signOptions: {
        issuer: "SARDAR",
        algorithm: "ES256",
        expiresIn: "2m"
      }

    })
    // ServeStaticModule.forRoot({
    //   serveRoot: '/api/v1/upload',
    //   rootPath: process.env.UPLOAD_LOCATION,
    // }),

  ],
  controllers: [UserController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: Response,
    },
    {
      provide: APP_FILTER,
      useClass: Exception
    },
    UserService,
  ]
})
export class AppModule {
}
