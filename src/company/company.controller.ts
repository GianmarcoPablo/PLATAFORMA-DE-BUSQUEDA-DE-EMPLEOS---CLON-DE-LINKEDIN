import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/interfaces/valid-roles.interface';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from "uuid"
import { extname } from 'path';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.user)
  @UseInterceptors(FileInterceptor("logo", {
    storage: diskStorage({
      destination: "./uploads/companies",
      filename: (req, file, cb) => {
        const fileExtName = extname(file.originalname);
        const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
        if (!allowedExt.includes(fileExtName)) {
          return cb(new Error("Invalid file type"), "")
        }
        const fileName = `company-${uuid()}${fileExtName}`;
        cb(null, fileName);
      }
    })
  }))
  createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File
  ) {
    const logoUrl = file ? file.filename : null;
    return this.companyService.createCompany({ ...createCompanyDto, userId: user.id, logoUrl });
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }

  @Post('create/sector')
  @Auth(ValidRoles.admin)
  createSector(@Body() createSectorDto: CreateSectorDto) {
    return this.companyService.createSector(createSectorDto);
  }

  @Put('update/sector/:id')
  @Auth(ValidRoles.admin)
  updateSector(@Param('id') id: string, @Body() updateSectorDto: UpdateSectorDto) {
    return this.companyService.updateSector(+id, updateSectorDto);
  }
}
