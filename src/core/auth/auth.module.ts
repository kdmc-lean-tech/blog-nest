import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './repository/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from './services/jwt-strategy.service';

@Module({
  providers: [AuthService, JwtStrategyService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'cMa9Ld71RZiOqrXYgoElGyDvtw6KBsfh',
      signOptions: {
        expiresIn: 3600
      }
    }),
  ],
  exports: [
    JwtStrategyService,
    PassportModule
  ]
})
export class AuthModule {}
