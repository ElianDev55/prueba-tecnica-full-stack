import { IsDefined, IsOptional, IsUUID } from 'class-validator';

export class CreateDetailsDishDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsDefined()
  @IsUUID()
  createdBy: string;

  @IsDefined()
  @IsUUID()
  dishesId: string;

  @IsDefined()
  @IsUUID()
  productsId: string;
}
