import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(AuthRepository)
        private _authRepository: AuthRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'cMa9Ld71RZiOqrXYgoElGyDvtw6KBsfh'
        });
    }

    async validate( payload ) {
        const { email } = payload.user;
        const user = await this._authRepository.findOne({ email });
        if (!user) {
            throw new UnauthorizedException(`You are not authorized to perform this action`);
        }
        return user;
    }
}
