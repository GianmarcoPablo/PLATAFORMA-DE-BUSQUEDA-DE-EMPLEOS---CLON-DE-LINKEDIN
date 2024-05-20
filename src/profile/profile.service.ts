import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs'
import path from 'path'

@Injectable()
export class ProfileService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createProfileDto: CreateProfileDto, user: User) {
    const userId = user.id
    try {
      const profile = await this.prisma.profile.create({
        data: {
          ...createProfileDto,
          userId
        }
      })
      return profile
    } catch (error) {
      console.log(error)
    }
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: string) {
    return `This action returns a #${id} profile`;
  }

  async update(id: string, user: User, updateProfileDto: UpdateProfileDto) {
    const { photoUrl } = updateProfileDto
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { id: id }
      })

      if (profile.userId !== user.id) {
        throw new UnauthorizedException("You don't have permission to update this profile")
      }

      if (profile.photoUrl && photoUrl) { // si ya tiene foto y actualiza la foto
        fs.unlinkSync(`./uploads/profiles/${profile.photoUrl}`)
      } else if (profile.photoUrl && !photoUrl) { // si tiene foto y no actualiza la foto
        fs.unlinkSync(`./uploads/profiles/${profile.photoUrl}`)
      } else if (!profile.photoUrl && photoUrl) { // si no tiene foto y actualiza la foto
        fs.unlinkSync(`./uploads/profiles/${photoUrl}`)
      }

      const profileUpdated = await this.prisma.profile.update({
        where: { id },
        data: updateProfileDto
      })

      return profileUpdated

    } catch (error) {
      console.log(error)
    }
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }
}
