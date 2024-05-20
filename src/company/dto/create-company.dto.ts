import { IsString, IsArray, IsNotEmpty, IsOptional, IsNumber, IsUUID } from "class-validator"

export class CreateCompanyDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsOptional()
    logoUrl: string

    @IsString()
    @IsNotEmpty()
    location: string

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    links: string[]

    @IsNumber()
    @IsNotEmpty()
    sectorId: number

    @IsUUID()
    @IsOptional()
    userId: string
}
