import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { PasswordService } from './PasswordService'

export class UserPassword extends StringValueObject {
  private readonly HAS_MIN_LENGTH = 8
  private readonly hasUppercase = /[A-Z]/
  private readonly hasLowercase = /[a-z]/
  private readonly hasNumber = /\d/
  private readonly hasSpecialCharacter = /[!@#$%^&*]/

  constructor (
    readonly value: string
  ) {
    super(value)

    this.ensureIsValidPassword(value)

    this.value = PasswordService.hash(this.value)
  }

  toPrimitives (): string {
    return this.value
  }

  /**
 * Ensures that the provided password is valid.
 *
 * @param {string} value - The password value to be validated.
 * @throws {InvalidArgumentError} If the password is invalid, an error is thrown.
 */
  private ensureIsValidPassword (value: string): void {
  // Create an empty array to store any validation errors
    const errors = []

    // Check if the password length is less than the minimum required length
    if (value.length < this.HAS_MIN_LENGTH) {
      errors.push('La contraseña debe tener al menos 8 caracteres')
    }

    // Check if the password contains at least one uppercase letter
    if (!this.hasUppercase.test(value)) {
      errors.push('La contraseña debe contener al menos una letra mayúscula.')
    }

    // Check if the password contains at least one lowercase letter
    if (!this.hasLowercase.test(value)) {
      errors.push('La contraseña debe contener al menos una letra minúscula.')
    }

    // Check if the password contains at least one number
    if (!this.hasNumber.test(value)) {
      errors.push('La contraseña debe contener al menos un número.')
    }

    // Check if the password contains at least one special character
    if (!this.hasSpecialCharacter.test(value)) {
      errors.push('La contraseña debe contener al menos un carácter especial.')
    }

    // If there are any validation errors, throw an InvalidArgumentError with the joined error messages
    if (errors.length > 0) {
      throw new InvalidArgumentError(errors.join(' '))
    }
  }
}
