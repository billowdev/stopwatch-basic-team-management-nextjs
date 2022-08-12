import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  
  SwaggerModule.setup('/', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(3333);
}
bootstrap();
