import {
  IsDecimal,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAdditionalProductDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsDecimal()
  price: number;

  @IsDefined()
  @IsUUID()
  created_by: string;
}
