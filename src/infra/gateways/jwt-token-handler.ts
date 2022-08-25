import { TokenGenerator, TokenValidator } from '@domain/contracts/gateways'
import authConfig from '@main/config/auth'
import { verify, sign, Secret } from 'jsonwebtoken'

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export class JwtTokenHandler implements TokenGenerator, TokenValidator {
  async generate (key: string): Promise<string> {
    const token = sign({}, authConfig.jwt.secret, {
      subject: key,
      expiresIn: authConfig.jwt.expiresIn
    })

    return token
  }

  async validate (token: string): Promise<string> {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret)

    const { sub } = decodedToken as ITokenPayload

    return sub
  }
}
