import {
  IsDecimal,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSauceDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsDecimal()
  price: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsUUID()
  created_by: string;
}
