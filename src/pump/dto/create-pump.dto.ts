export class PumpDto {}
import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export class CreatePumpDto {
  @IsNotEmpty()
  @IsString()
  Name: string;
}
