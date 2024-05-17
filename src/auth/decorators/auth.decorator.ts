import { UseGuards, applyDecorators } from "@nestjs/common";
import { UserRoleGuard } from "../guards/user-role.guard";
import { ValidRoles } from "src/interfaces/valid-roles.interface";
import { RoleProtected } from "./role-protected.decorator";
import { AuthGuard } from "@nestjs/passport";

export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard('jwt'), UserRoleGuard)
    )
}