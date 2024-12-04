import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { User } from '@prisma/client' // Assuming you have a User model in Prisma
import * as bcrypt from 'bcrypt'

import { RegisterUserDto } from './dto/register.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async register({ email, password, name }: RegisterUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      return this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name
        }
      })
    } catch (e) {
      throw new Error('Error creating user')
    }
  }

  async findUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email }
    })
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}
