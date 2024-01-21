import { type JwtPayload } from 'jsonwebtoken'
import { type Repository } from '../../../Shared/domain/Repository'
import { validateRefreshToken } from '../../domain/VerifyRefreshToken'

export class RefreshToken {
  constructor (private readonly repository: Repository) {}

  async run ({ refreshToken }: { refreshToken: JwtPayload | string }): Promise<void> {
    const refreshTokenDecoded = validateRefreshToken(refreshToken)
  }
}
