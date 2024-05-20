import { IsString, IsNotEmpty, MaxLength, MinLength, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateProfileDto {

    @IsString()
    @MaxLength(250)
    @IsOptional()
    about?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    photoUrl?: string;

    @IsString()
    @IsOptional()
    experience?: string

    @IsString()
    @IsOptional()
    education?: string

    @IsString()
    @IsOptional()
    location?: string

    @IsArray()
    @IsOptional()
    skills?: string[]

    @IsArray()
    @IsOptional()
    languages?: string[]

    @IsArray()
    @IsOptional()
    links?: string[]
}
