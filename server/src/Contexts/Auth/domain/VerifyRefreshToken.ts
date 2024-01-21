import { JsonWebTokenError, type JwtPayload, NotBeforeError, verify, TokenExpiredError } from 'jsonwebtoken'
import { config } from '../../Shared/infrastructure/config'
import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError'

export function validateRefreshToken (refreshToken: string): string | JwtPayload {
  try {
    // Get the secret from the config
    const secret = config.accessTokenSecret

    // Verify the refresh token using the secret
    const decoded = verify(refreshToken, secret) as JwtPayload

    // Return the decoded token
    return decoded
  } catch (err) {
    let message

    // Set the error message based on the type of error
    if (err instanceof JsonWebTokenError) {
      message = `Invalid token: ${err.message}`
    } else if (err instanceof NotBeforeError) {
      message = `Token is not yet valid: ${err.message}`
    } else if (err instanceof TokenExpiredError) {
      message = `Token has expired: ${err.message}`
    } else {
      message = `Unknown error: ${(err as Error).message}`
    }

    // Throw an InvalidArgumentError with the error message
    throw new InvalidArgumentError(message)
  }
}
