import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();

export const dataSource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  synchronize: true,
  logging: ['error'],
  // entities:null,
  // migrations:null
})