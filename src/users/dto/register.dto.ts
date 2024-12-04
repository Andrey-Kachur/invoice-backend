import { IsString, IsEmail, IsArray, MinLength } from 'class-validator'

export class RegisterUserDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(5)
  password: string

  @IsString()
  name: string
}
