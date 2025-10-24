import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // вот это важно
import { join } from 'path'
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://admin:4173', 'http://frontend:4174', "http://85.193.87.111:4173/" , 'http://85.193.87.111:4174/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });


  app.useStaticAssets(join(process.cwd(), 'images'), {
    prefix: '/images/',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
