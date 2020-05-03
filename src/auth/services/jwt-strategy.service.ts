import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private _userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '3da0a21d003d70459099e8967fd29afeb8d662ea886b284e515ea870ade5565c'
        });
    }

    async validate( payload ) {
        const { email } = payload.user;
        const user = await this._userRepository.findOne({ email });
        if (!user) {
            throw new UnauthorizedException(`You are not authorized to perform this action`);
        }
        return user;
    }
}
