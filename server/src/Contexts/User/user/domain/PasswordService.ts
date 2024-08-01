/* eslint-disable @typescript-eslint/no-extraneous-class */
import bcrypt from 'bcrypt'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'

export class PasswordService {
  // Define the function that takes in a password and returns a hashed string
  static hash(password: string): string {
    // Define the number of salt rounds
    const saltRounds = 10

    // Use the bcrypt library to hash the password with the specified number of salt rounds
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    // Return the hashed password
    return hashedPassword
  }

  // Define a function named 'compare' that takes in two parameters: 'password' and 'hash'
  static compare(password: string, hash: string): void {
    // Use the 'bcrypt.compareSync' method to compare the 'password' with the 'hash'
    // Return the result of the comparison
    const isMatch = bcrypt.compareSync(password, hash)
    if (!isMatch) {
      throw new InvalidArgumentError('Contraseña incorrecta')
    }
  }
}
