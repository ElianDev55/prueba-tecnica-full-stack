import { IsDecimal, IsString, IsUUID } from 'class-validator';

export class CreateSauceDto {
  @IsUUID()
  id?: string;

  @IsString()
  name?: string;

  @IsDecimal()
  price?: number;

  @IsUUID()
  createdBy?: string;
}
