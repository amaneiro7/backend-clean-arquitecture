export class UserEmail {
  private readonly validEmailRegExp = /^([a-zA-Z0-9._%-]+@(bnc\.com\.ve|banconacionaldecredito\.com\.ve))$/
  constructor (readonly value: string) {
    this.value = value

    this.ensureValueIsDefined(value)
    this.ensureIsValidEmail(value)
  }

  private ensureValueIsDefined (value: string | undefined | null): void {
    if (value === null || value === undefined || value === '') {
      throw new Error('Value must be defined')
    }
  }

  private ensureIsValidEmail (value: string): void {
    if (!this.validEmailRegExp.test(value)) {
      throw new Error('Email is not valid')
    }
  }
}
