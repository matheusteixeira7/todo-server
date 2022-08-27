export default {
  jwt: {
    secret: process.env.APP_SECRET || 'todo_secret',
    expiresIn: '1d'
  }
}
