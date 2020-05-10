import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cloudinary = require('cloudinary').v2;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  cloudinary.config({ 
    // eslint-disable-next-line @typescript-eslint/camelcase
    cloud_name: 'dsienryym', 
    // eslint-disable-next-line @typescript-eslint/camelcase
    api_key: '836386262572753',
    // eslint-disable-next-line @typescript-eslint/camelcase 
    api_secret: 'fmB0KlxAqzjtafe9-ozZZhdk1Qc' 
  });
  await app.listen(3000);
}
bootstrap();
