import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './config/typeorm.config';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles/roles.guard';
import { UserMiddleware } from './middlewares/user.middleware';

@Module({
  imports: [BlogModule, TypeOrmModule.forRoot(typeOrmOptions), 
    MulterModule.register({ dest: './uploads' }), AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('publication');
  }
}
