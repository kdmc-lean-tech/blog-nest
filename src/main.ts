import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cloudinary = require('cloudinary').v2;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  cloudinary.config({ 
    cloud_name: 'dsienryym', 
    api_key: '836386262572753', 
    api_secret: 'fmB0KlxAqzjtafe9-ozZZhdk1Qc' 
  });
  await app.listen(8000);
}
bootstrap();
