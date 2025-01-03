export interface User {
  id: string
  name: string
  email: string
  role: string
  image: string
}

export interface Session {
  user: User
}
