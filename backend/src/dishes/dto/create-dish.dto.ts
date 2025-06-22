import {
  IsDecimal,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDishDto {
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
  @IsUUID()
  createdBy: string;
}
