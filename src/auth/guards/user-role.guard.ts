import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/const/meta-roles';


@Injectable()
export class UserRoleGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {


        // obtener los roles validos de la metadata
        const validRoles: string[] = this.reflector.get<string[]>(META_ROLES, context.getHandler());

        if (!validRoles) return true;
        if (validRoles.length === 0) return true;

        const req = context.switchToHttp().getRequest();
        const user = req.user as any;
        if (!user) {
            throw new BadRequestException("No se ha encontrado el usuario en la petición");
        }

        for (const role of user.role) {
            if (validRoles.includes(role)) {
                return true
            }
        }

        throw new ForbiddenException(`El usuario ${user.name} necesita tener uno de los siguientes roles: ${validRoles.join(", ")} para acceder a esta ruta`)
    }
}