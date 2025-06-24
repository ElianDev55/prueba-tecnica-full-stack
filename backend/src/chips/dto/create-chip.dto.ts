import {
  IsDecimal,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateChipDto {
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

  @IsDefined()
  @IsUUID()
  created_by: string;
}
