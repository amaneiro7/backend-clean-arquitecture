export interface PasswordCrypt {
  hash: (password: string) => string

  compare: (password: string, hash: string) => boolean
}
