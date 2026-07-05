
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateClientDto {

  @IsOptional()
  @IsString()
  tradeName?: string;

  @IsOptional()
  @IsString()
  legalName?: string;

  @IsOptional()
  @IsString()
  documentNumber?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsString()
  defaultLocale?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  planId?: string;
}
