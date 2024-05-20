import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs'

@Injectable()
export class CurriculumService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async uploadCurriculum(createCurriculumDto: CreateCurriculumDto, user: User) {
    try {
      const curriculum = await this.prisma.curriculum.create({
        data: {
          ...createCurriculumDto,
          userId: user.id
        }
      })
      return curriculum
    } catch (error) {
      console.log(error)
    }
  }

  async update(id: string, updateCurriculumDto: UpdateCurriculumDto, user: User) {

    console.log({ id, updateCurriculumDto, user })

    try {
      const curriculum = await this.prisma.curriculum.findUnique({ where: { id } })
      if (!curriculum) throw new NotFoundException('Curriculum not found')
      if (curriculum.userId !== user.id) throw new UnauthorizedException("You don't have permission to update this curriculum")

      // sie le archivo es diferente al que ya tiene, lo elimina

      if (curriculum.fileUrl && curriculum.fileUrl !== updateCurriculumDto.fileUrl) {
        fs.unlinkSync(`./uploads/curriculums/${curriculum.fileUrl}`)
      } else if (!updateCurriculumDto.fileUrl) {
        fs.unlinkSync(`./uploads/curriculums/${curriculum.fileUrl}`)
      }


      return await this.prisma.curriculum.update({ where: { id }, data: updateCurriculumDto })
    } catch (error) {
      console.log(error)
    }
  }

  findAll() {
    return `This action returns all curriculum`;
  }

  findOne(id: string) {
    return `This action returns a #${id} curriculum`;
  }



  remove(id: string) {
    return `This action removes a #${id} curriculum`;
  }
}
