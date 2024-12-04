import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from '../users/dto/login.dto'
import { AuthResponse } from './auth-response.interface'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<AuthResponse> {
    try {
      return await this.authService.login(loginUserDto)
    } catch (e) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED
      )
    }
  }
}
