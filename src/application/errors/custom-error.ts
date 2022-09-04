export class CustomError extends Error {
  message: string
  statusCode: number

  constructor (statusCode: number, message: string) {
    super(message)
    this.message = message
    this.statusCode = statusCode
  }
}
