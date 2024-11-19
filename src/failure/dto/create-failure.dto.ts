import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateFailureDto {
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  Type: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  pumpId: number;

  @IsDate()
  @Type(() => Date)
  readonly Date: Date;
}
