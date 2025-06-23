import {
  IsDecimal,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateChipDto {
  @IsDefined()
  @IsUUID()
  id: string;

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
  createdBy: string;
}
