import { type VerifyErrors, verify } from 'jsonwebtoken'
import { config } from '../../Shared/infrastructure/config'
import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError'

export class VerifyRefreshToken {
  private readonly secret: string
  constructor (private readonly refreshToken: string) {
    this.secret = config.accessTokenSecret
    verify(refreshToken, this.secret, function (err, decoded) {
      if (err) {
        err = {

        }
      }
    })
  }

  private isTokenExpiredError (error: VerifyErrors): void {
    if (error.name === 'TokenExpiredError') {
      throw new InvalidArgumentError('El token ha expirado')
    }
  }
}
