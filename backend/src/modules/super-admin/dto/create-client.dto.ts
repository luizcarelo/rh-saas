import {
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateClientDto {

  @IsString()
  slug: string;

  @IsString()
  tradeName: string;

  @IsString()
  legalName: string;

  @IsString()
  documentNumber: string;

  @IsUUID()
  planId: string;
}
