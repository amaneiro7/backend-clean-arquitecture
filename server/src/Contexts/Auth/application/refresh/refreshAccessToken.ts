import { type JwtPayload } from 'jsonwebtoken'
import { type Repository } from '../../../Shared/domain/Repository'
import { validateToken } from '../../domain/VerifyToken'

export class RefreshToken {
  constructor(private readonly repository: Repository) { }

  async run({ refreshToken }: { refreshToken: JwtPayload }): Promise<void> {
    const refreshTokenDecoded = validateToken(String(refreshToken))
  }
}
