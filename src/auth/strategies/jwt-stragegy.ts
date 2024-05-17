import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { jwtPayload } from "src/interfaces/jwt-payload.interfaces";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly prisma: PrismaService,
        configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        });
    }


    async validate(payload: jwtPayload) {
        const { id } = payload;
        const user = await this.prisma.user.findUnique({
            where: { id }
        });

        if (!user)
            throw new UnauthorizedException("Token not valid");

        return user;
    }
}