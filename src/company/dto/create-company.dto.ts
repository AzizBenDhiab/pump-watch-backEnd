import { IsNotEmpty } from "class-validator";

export class CreateCompanyDto{
    @IsNotEmpty()
    Name: string;
}
 