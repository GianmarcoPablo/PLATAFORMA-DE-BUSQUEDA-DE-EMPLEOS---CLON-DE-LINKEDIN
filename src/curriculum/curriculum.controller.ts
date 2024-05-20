import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Put } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/interfaces/valid-roles.interface';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from "uuid"
import { extname } from 'path';

@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) { }

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.user)
  @UseInterceptors(FileInterceptor("curriculum", {
    storage: diskStorage({
      destination: "./uploads/curriculums",
      filename: (req, file, cb) => {
        const fileExtName = extname(file.originalname);

        const allowedExtensions = [".pdf", ".doc", ".docx", ".PDF", ".DOC", ".DOCX"];
        if (!allowedExtensions.includes(fileExtName)) {
          return cb(new Error("Invalid file type"), "");
        }

        const fileName = `curriculum-${uuid()}${fileExtName}`;
        cb(null, fileName);
      }
    })
  }))

  uploadCurriculum(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
    @Body() createCurriculumDto: CreateCurriculumDto
  ) {
    const fileUrl = file ? file.filename : null;
    const fileType = file ? file.mimetype : null;
    const fileName = file ? file.originalname : null;

    return this.curriculumService.uploadCurriculum({ ...createCurriculumDto, fileUrl, fileType, fileName }, user);
  }

  @Put(':id')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @UseInterceptors(FileInterceptor("curriculum", {
    storage: diskStorage({
      destination: "./uploads/curriculums",
      filename: (req, file, cb) => {
        const fileExtName = extname(file.originalname);

        const allowedExtensions = [".pdf", ".doc", ".docx", ".PDF", ".DOC", ".DOCX"];
        if (!allowedExtensions.includes(fileExtName)) {
          return cb(new Error("Invalid file type"), "");
        }

        const fileName = `curriculum-${uuid()}${fileExtName}`;
        cb(null, fileName);
      }
    })
  }))
  updateCurriculum(
    @Param('id') id: string,
    @Body() updateCurriculumDto: UpdateCurriculumDto,
    @GetUser() user: User
  ) {
    return this.curriculumService.update(id, updateCurriculumDto, user);
  }

  @Get()
  findAll() {
    return this.curriculumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.curriculumService.findOne(id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.curriculumService.remove(id);
  }
}
