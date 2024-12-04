import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginUserDto } from '../users/dto/login.dto'
import { AuthResponse } from './auth-response.interface'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    if (
      user &&
      (await this.usersService.comparePasswords(password, user.password))
    ) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthResponse> {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password
    )
    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }
    const payload = { email: user.email, sub: user.id }
    return {
      user,
      token: this.jwtService.sign(payload)
    }
  }

  async validateToken(token: string): Promise<any> {
    if (!token) {
      throw new UnauthorizedException('Token is missing')
    }

    try {
      const { sub } = this.jwtService.verify(token)

      const user = await this.usersService.findUserById(+sub)

      if (!user) {
        throw new UnauthorizedException('User not found')
      }
      return user
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
