export interface HashGenerator {
  generate (password: string): Promise<string>
}

export interface HashComparer {
  compare (password: string, hash: string): Promise<boolean>
}
