import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCurriculumDto {

    @IsString()
    @IsOptional()
    fileUrl: string;

    @IsString()
    @IsOptional()
    fileType: string;

    @IsString()
    @IsOptional()
    fileName: string;
}
