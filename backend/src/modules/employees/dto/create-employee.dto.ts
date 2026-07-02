import { IsString, IsEmail, IsNotEmpty, IsDateString, Length } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsEmail()
  email: string;

  @IsString()
  department: string;

  @IsString()
  jobTitle: string;

  @IsDateString()
  admissionDate: string;
}
