import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from './services/jwt-strategy.service';

@Module({
  providers: [AuthService, JwtStrategyService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: '3da0a21d003d70459099e8967fd29afeb8d662ea886b284e515ea870ade5565c',
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
