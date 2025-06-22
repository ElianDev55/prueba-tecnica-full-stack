import { IsDecimal, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDrinkDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDecimal()
  price?: number;

  @IsOptional()
  @IsUUID()
  createdBy?: string;
}
