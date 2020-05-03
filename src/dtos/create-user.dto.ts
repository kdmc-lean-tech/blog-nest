import { MaxLength, IsNotEmpty, IsEmail, IsOptional, Matches } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(50)
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;
    @IsOptional()
    img: string;
}