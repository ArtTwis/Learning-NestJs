import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Learning NestJS')
    .setDescription('Simplify API development for users, teams with the Swagger and it can help us design and document our APIs at scale.')
    .setVersion('1.0')
    .addTag('learning nestjs')
    .build();

  app.enableCors();
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
