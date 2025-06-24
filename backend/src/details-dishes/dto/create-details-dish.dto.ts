import { IsDefined, IsOptional, IsUUID } from 'class-validator';

export class CreateDetailsDishDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsDefined()
  @IsUUID()
  created_by: string;

  @IsDefined()
  @IsUUID()
  dishesId: string;

  @IsDefined()
  @IsUUID()
  productsId: string;
}
