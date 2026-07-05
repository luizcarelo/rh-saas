
import { IsString } from 'class-validator';

export class UpdateClientStatusDto {

  @IsString()
  status: string;
}
