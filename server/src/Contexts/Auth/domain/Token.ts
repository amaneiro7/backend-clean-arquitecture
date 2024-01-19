import { sign } from 'jsonwebtoken'
import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError'
import { config } from '../../Shared/infrastructure/config'
import { type UserPrimitives } from '../../User/domain/User'

export interface TokenPrimitives {
  access_token: string
  refresh_token: string
}

export class Token {
  private readonly secret: string
  private readonly accessToken: string
  private readonly refreshToken: string

  constructor (
    private readonly payload: Omit<UserPrimitives, 'password'>
  ) {
    this.secret = config.accessTokenSecret

    this.accessToken = sign({
      data: payload
    }, this.secret, { expiresIn: '1h' })
    this.refreshToken = sign({
      data: payload
    }, this.secret, { expiresIn: '7d' })

    this.ensureIsJWTToken(this.accessToken)
  }

  toPrimitives (): TokenPrimitives {
    return {
      access_token: this.accessToken,
      refresh_token: this.refreshToken
    }
  }

  private ensureIsJWTToken (value: string): void {
    if (!this.isAJWTValidToken(value)) {
      throw new InvalidArgumentError('is not a valid token')
    }
  }

  private isAJWTValidToken (token: string): boolean {
    const jwtRegex = /^([A-Za-z0-9-_]*\.){2}[A-Za-z0-9-_]*$/
    return jwtRegex.test(token)
  }
}
