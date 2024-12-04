import {
  IsInt,
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsBoolean,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'
import { RegisterUserDto } from '../../users/dto/register.dto'

export class InvoiceDto {
  @IsString()
  vendor_name: string

  @IsNumber()
  amount: number

  @IsDate()
  due_date: Date

  @IsOptional()
  @IsString()
  description?: string

  @IsInt()
  user_id: number

  @IsBoolean()
  paid: boolean

  @ValidateNested()
  @Type(() => RegisterUserDto)
  user: RegisterUserDto
}
