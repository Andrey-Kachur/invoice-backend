import { User } from '@prisma/client'

export interface AuthResponse {
  user: User
  token: string
}
