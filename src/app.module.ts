import { Module } from "@nestjs/common";
import { UserService } from "./service/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { validationSchema } from "./config";
import { dataSource, UserEntity } from "./database";
import { UserController } from "./controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema
    }),
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class AppModule {
}
