import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/interfaces/valid-roles.interface';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from "uuid"
import { extname } from 'path';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post()
  @Auth(ValidRoles.user, ValidRoles.admin)
  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: "./uploads/profiles",
      filename: (req, file, cb) => {
        const fileExtName = extname(file.originalname);
        const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
        if (!allowedExt.includes(fileExtName)) {
          return cb(new Error("Invalid file type"), "")
        }
        const fileName = `profile-${uuid()}${fileExtName}`;
        cb(null, fileName);
      }
    })
  }))
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User
  ) {
    const imageUrl = file ? file.filename : null;
    return this.profileService.create(
      { ...createProfileDto, photoUrl: imageUrl },
      user
    );
  }

  @Put(':id')
  @Auth(ValidRoles.user, ValidRoles.admin)
  // si actualiza su foto de perfil, se debe eliminar la foto anterior
  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: "./uploads/profiles",
      filename: (req, file, cb) => {
        const fileExtName = extname(file.originalname);
        const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
        if (!allowedExt.includes(fileExtName)) {
          return cb(new Error("Invalid file type"), "")
        }
        const fileName = `profile-${uuid()}${fileExtName}`;
        cb(null, fileName);
      }
    })
  }))
  updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User
  ) {

    const imageUrl = file ? file.filename : null;

    return this.profileService.update(id, user, { ...updateProfileDto, photoUrl: imageUrl });
  }

  @Delete(':id')
  removeProfile(@Param('id') id: string) {
    return this.profileService.remove(id);
  }


  @Get()
  getAllProfile() {
    return this.profileService.findAll();
  }

  @Get(':id')
  getOneProfile(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }


}
