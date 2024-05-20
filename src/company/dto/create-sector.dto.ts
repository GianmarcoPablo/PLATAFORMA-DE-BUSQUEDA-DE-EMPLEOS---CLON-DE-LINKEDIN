import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateSectorDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string
}