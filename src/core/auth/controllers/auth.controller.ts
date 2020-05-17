import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../../dtos/create-user.dto';
import { CredentialsDto } from '../../../dtos/credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService) {
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() createUserDto: CreateUserDto) {
        return await this._authService.signUp(createUserDto);
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async signIn(@Body() credentialsDto: CredentialsDto) {
        return await this._authService.signIn(credentialsDto);
    }
}
