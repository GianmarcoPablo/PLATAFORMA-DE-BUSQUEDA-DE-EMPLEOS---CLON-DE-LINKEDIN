import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';



export class RegisterUserDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsOptional()
    @IsArray()
    roles: string[];

}