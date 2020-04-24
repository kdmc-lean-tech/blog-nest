import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './config/typeorm.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [BlogModule, TypeOrmModule.forRoot(typeOrmOptions), 
    MulterModule.register({ dest: './uploads' })], 
})
export class AppModule {}
