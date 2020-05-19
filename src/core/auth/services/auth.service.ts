import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { CreateUserDto } from '../../../dtos/create-user.dto';
import { User } from '../../../models/user.entity';
import { CredentialsDto } from '../../../dtos/credentials.dto';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private _authRepository: AuthRepository, private _jwtService: JwtService) {
    }

    public async signUp(createUserDto: CreateUserDto): Promise<User> {
        return await this._authRepository.signUp(createUserDto);
    }

    public async signIn(credentialsDto: CredentialsDto): Promise<{ token: string }> { 
        const { email, password } = credentialsDto;
        const user = await this._authRepository.findOne({ email });
        const username = await this._authRepository.verifyUserPassword(email, password);
        if (!username) {
            throw new UnauthorizedException(`Invalid credentials`);
        }
        delete user.password;
        const payload = { user };
        const token = this._jwtService.sign(payload);
        return { token };
    }
}
