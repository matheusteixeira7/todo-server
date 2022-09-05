import { NextFunction, Request, Response } from 'express'
import { JwtTokenHandler } from '@infra/gateways'
import { CustomError } from '@application/errors'

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new CustomError(401, 'Token não informado')
  }
  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = await new JwtTokenHandler().validate(token)

    req.user = {
      id: decodedToken
    }

    return next()
  } catch {
    throw new CustomError(401, 'Token inválido')
  }
}
