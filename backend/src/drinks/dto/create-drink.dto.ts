import {
  IsDecimal,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDrinkDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  created_by: string;
}
