import { type JwtPayload } from 'jsonwebtoken'
import { type Repository } from '../../../Shared/domain/Repository'
import { validateRefreshToken } from '../../domain/VerifyRefreshToken'

export class RefreshToken {
  constructor (private readonly repository: Repository) {}

<<<<<<< HEAD
  async run ({ refreshToken }: { refreshToken: JwtPayload }): Promise<void> {
=======
  async run ({ refreshToken }: { refreshToken: JwtPayload | string }): Promise<void> {
>>>>>>> 2ff2c0bdba40f55abfbf24b4ccc07c1059862a80
    const refreshTokenDecoded = validateRefreshToken(String(refreshToken))
  }
}
