import { HashComparer, HashGenerator } from '@domain/contracts/gateways/hash'
import { hash, compare } from 'bcryptjs'

export class HashHandler implements HashGenerator, HashComparer {
  async generate (password: string): Promise<string> {
    return hash(password, 8)
  }

  async compare (password: string, hash: string): Promise<boolean> {
    return compare(password, hash)
  }
}
