import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: (origin, callback) => callback(null, origin),
    credentials: true,
  });
  // Set the global prefix to /api
  app.setGlobalPrefix('api');
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
