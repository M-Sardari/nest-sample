import { Module } from "@nestjs/common";
import { UserService } from "./service/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { validationSchema } from "./config";
import { dataSource, UserEntity } from "./database";
import { UserController } from "./controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtHandler } from "./guard/jwt-handler.service";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema
    }),
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret:process.env.JWT_SECRET_KEY,
    })
  ],
  controllers: [UserController],
  providers: [UserService,JwtHandler]
})
export class AppModule {
}
