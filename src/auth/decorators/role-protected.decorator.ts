import { SetMetadata } from "@nestjs/common";
import { META_ROLES } from "../const/meta-roles";
import { ValidRoles } from "src/interfaces/valid-roles.interface";


export const RoleProtected = (...args: ValidRoles[]) => {
    return SetMetadata(META_ROLES, args);
}