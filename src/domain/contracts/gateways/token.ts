/* eslint-disable no-redeclare */
export interface TokenGenerator {
  generate: (input: string) => Promise<string>
}

export interface TokenValidator {
  validate: (input: string) => Promise<any>
}
