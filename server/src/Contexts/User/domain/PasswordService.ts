/* eslint-disable @typescript-eslint/no-extraneous-class */
import bcrypt from 'bcrypt'

export class PasswordService {
  // Define the function that takes in a password and returns a hashed string
  static hash (password: string): string {
    // Define the number of salt rounds
    const saltRounds = 10

    // Use the bcrypt library to hash the password with the specified number of salt rounds
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    // Return the hashed password
    return hashedPassword
  }

  // Define a function named 'compare' that takes in two parameters: 'password' and 'hash'
  static compare (password: string, hash: string): boolean {
    // Use the 'bcrypt.compareSync' method to compare the 'password' with the 'hash'
    // Return the result of the comparison
    return bcrypt.compareSync(password, hash)
  }
}
