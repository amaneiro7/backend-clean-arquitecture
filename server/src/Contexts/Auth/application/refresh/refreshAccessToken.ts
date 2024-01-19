import { InvalidArgumentError } from '../../../Shared/domain/InvalidArgumentError'
import { config } from '../../../Shared/infrastructure/config'
import { type JwtPayload, sign, verify, type VerifyErrors } from 'jsonwebtoken'

export enum ErrorType {
  InvalidToken = 'InvalidToken',
  ExpiredToken = 'ExpiredToken',
  UsedToken = 'UsedToken',
  UnknownError = 'UnknownError'
}

export class RefreshTokenValidator {
  private readonly _secret: string

  constructor (refreshToken: string) {
    this._secret = config.accessTokenSecret
    this.validateRefreshTokenAsync(refreshToken)
  }

  public validateRefreshTokenAsync (refreshToken: string): { error: ErrorType, accessToken: string, refreshToken: string } {
    verify(refreshToken, this._secret, function (err: VerifyErrors, decoded: string | JwtPayload | undefined): void {
      if (err.name === ErrorType.InvalidToken) { throw new InvalidArgumentError(err.message) }
    })
  }
}
