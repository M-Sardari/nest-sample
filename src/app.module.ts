import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { JoiConfig } from "./config";
import { dataSource } from "./database";

@Module({
  imports: [
    ConfigModule.forRoot(JoiConfig),
    TypeOrmModule.forRoot(dataSource.options)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
