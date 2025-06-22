import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsDefined()
  @IsUUID()
  id: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsUUID()
  createdBy: string;
}
