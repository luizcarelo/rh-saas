import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class RegisterMobileDeviceDto {
  @IsOptional()
  @IsUUID()
  employeeProfileId?: string;

  @IsString()
  @MaxLength(255)
  deviceUid: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  platform?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  model?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  appVersion?: string;
}
