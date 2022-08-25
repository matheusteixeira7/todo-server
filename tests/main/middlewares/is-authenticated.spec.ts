import { isAuthenticated } from '@main/middlewares/is-authenticated'

describe('isAuthenticated', () => {
  it('should return a function', () => {
    expect(isAuthenticated).toBeInstanceOf(Function)
  })
})
