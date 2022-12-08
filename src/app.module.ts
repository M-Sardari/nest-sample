import { Module } from "@nestjs/common";
import { UserService } from "./service/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { validationSchema } from "./config";
import { dataSource, UserEntity } from "./database";
import { UserController } from "./controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtHandler } from "./guard/jwt-handler.service";
import { readFileSync } from "fs";
import * as process from "process";
import { RedisModule } from "gadin-redis";


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
  providers: [UserService, JwtHandler]
})
export class AppModule {
}
