import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {

  @IsUUID()
  tenantId: string;

  @IsUUID()
  employeeId: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

}
