import {
  IsDecimal,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSauceDto {
  @IsUUID()
  id?: string;

  @IsString()
  name?: string;

  @IsDecimal()
  price?: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsUUID()
  createdBy?: string;
}
