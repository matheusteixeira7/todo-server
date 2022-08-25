import { NextFunction, Request, Response } from 'express'
import { JwtTokenHandler } from '@infra/gateways'
import { InvalidParamError } from '@application/errors'

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new InvalidParamError('JWT Token is missing.')
  }
  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = await new JwtTokenHandler().validate(token)

    req.user = {
      id: decodedToken
    }

    return next()
  } catch {
    throw new InvalidParamError('Invalid JWT Token.')
  }
}
