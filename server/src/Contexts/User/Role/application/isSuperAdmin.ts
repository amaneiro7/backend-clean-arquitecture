import { JwtPayloadUser } from "../../../Auth/domain/GenerateToken";
import { InvalidArgumentError } from "../../../Shared/domain/value-object/InvalidArgumentError";
import { User } from "../../user/domain/User";

export function isSuperAdmin({ user }: { user?: JwtPayloadUser }): void {
    if (user === undefined) {
        throw new InvalidArgumentError('Esta operación requiere de un usuario')
    }

    if (user?.roleId) {
        throw new InvalidArgumentError('Error con el payload del usuario')
    }
    if (!User.isSuperAdmin({ roleId: user?.roleId })) {
        throw new InvalidArgumentError('No tiene permisos para realizar esta operación')
    }
}