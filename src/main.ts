import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { json } from "body-parser";
import helmet from "helmet";
import { RqInfoMiddleware } from "./middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '1mb' }));
  app.use(helmet());
  // app.use(csrf());
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   methods:'GET',
  //   credentials:true
  // })
  const infoMiddleware = new RqInfoMiddleware();
  app.use(infoMiddleware.use.bind(infoMiddleware));

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Sample')
    .setDescription('Sample Backend Application With Nestjs')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(3000);
}
bootstrap();
