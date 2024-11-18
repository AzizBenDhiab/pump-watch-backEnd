import { IsEnum } from 'class-validator';
import { IsEmail, IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';

export class UserSubscribeDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  companyId: number;
}
