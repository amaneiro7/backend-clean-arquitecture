import { JsonWebTokenError, type JwtPayload, NotBeforeError, verify, TokenExpiredError } from 'jsonwebtoken'
import { config } from '../../Shared/infrastructure/config'
import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError'

export function validateRefreshToken (refreshToken: string): JwtPayload {
  try {
    // Get the secret from the config
    const secret = config.accessTokenSecret

    // Verify the refresh token using the secret
    const decoded = verify(refreshToken, secret) as JwtPayload

    // Return the decoded token
    return decoded
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      throw new InvalidArgumentError(`Invalid token: ${err.message}`)
    } else if (err instanceof NotBeforeError) {
      throw new InvalidArgumentError(`Token is not yet valid: ${err.message}`)
    } else if (err instanceof TokenExpiredError) {
      throw new InvalidArgumentError(`Token has expired: ${err.message}`)
    } else {
      throw new InvalidArgumentError(`Unknown error: ${(err as Error).message}`)
    }
  }
}
