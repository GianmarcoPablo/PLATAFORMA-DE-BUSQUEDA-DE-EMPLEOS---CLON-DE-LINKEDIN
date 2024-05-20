import { CreateSectorDto } from "./create-sector.dto";
import { PartialType } from '@nestjs/mapped-types';


export class UpdateSectorDto extends PartialType(CreateSectorDto) { }