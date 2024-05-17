import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { jwtPayload } from 'src/interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async register(createAuthDto: RegisterUserDto) {
        const { email } = createAuthDto

        const userExists = await this.prisma.user.findUnique({ where: { email } })
        if (userExists) throw new ConflictException("User already exists")

        const user = await this.prisma.user.create({
            data: {
                ...createAuthDto,
                password: bcrypt.hashSync(createAuthDto.password, 10)
            }
        })

        const { password, createdAt, updatedAt, ...restUser } = user
        
        return {
            ...restUser,
            token: this.getJwtToken({ id: user.id })
        }
    }


    async login(createAuthDto: LoginUserDto) {
        const user = await this.prisma.user.findUnique({ where: { email: createAuthDto.email } })
        if (!user) throw new UnauthorizedException("Invalid credentials");

        const isPasswordValid = bcrypt.compareSync(createAuthDto.password, user.password)
        if (!isPasswordValid) throw new BadRequestException("Invalid password")

        const { password, createdAt, updatedAt, ...restUser } = user

        return {
            ...restUser,
            token: this.getJwtToken({ id: user.id })
        }
    }

    private getJwtToken(payload: jwtPayload) {
        const token = this.jwtService.sign(payload)
        return token
    }
}