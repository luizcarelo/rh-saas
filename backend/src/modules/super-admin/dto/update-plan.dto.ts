import {
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class UpdatePlanDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
