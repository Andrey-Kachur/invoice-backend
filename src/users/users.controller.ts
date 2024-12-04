import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { UsersService } from './users.service'
import { RegisterUserDto } from './dto/register.dto'
import { LoginUserDto } from './dto/login.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    try {
      return await this.usersService.register(dto)
    } catch (e) {
      throw new UnauthorizedException('Email already exists')
    }
  }
}
