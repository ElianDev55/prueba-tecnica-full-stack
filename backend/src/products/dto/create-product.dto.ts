import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsDefined()
  @IsUUID()
  created_by: string;
}
