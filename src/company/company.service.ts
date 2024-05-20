import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector';

@Injectable()
export class CompanyService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async createCompany(createCompanyDto: CreateCompanyDto) {

    try {
      const company = await this.prisma.company.create({
        data: {
          ...createCompanyDto
        }
      })
      return company
    } catch (error) {
      console.log(error)
    }
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: string) {
    return `This action returns a #${id} company`;
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: string) {
    return `This action removes a #${id} company`;
  }

  async createSector(createSector: CreateSectorDto) {
    try {
      const sector = await this.prisma.sector.create({
        data: createSector
      })
      return sector
    } catch (error) {
      console.log(error)
    }
  }

  async updateSector(id: number, updateSector: UpdateSectorDto) {
    try {
      const sector = await this.prisma.sector.findUnique({
        where: {
          id
        }
      })

      if (!sector) throw new NotFoundException('Sector not found')

      const updatedSector = await this.prisma.sector.update({
        where: {
          id
        },
        data: updateSector
      })

      return updatedSector
    } catch (error) {
      console.log(error)
    }
  }
}
