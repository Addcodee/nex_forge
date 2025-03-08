import { IsArray, IsEmail, IsEnum, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsEmail({}, { message: 'Wrong format of the email' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must contain at leadt 8 symbols' })
    password: string;
}
