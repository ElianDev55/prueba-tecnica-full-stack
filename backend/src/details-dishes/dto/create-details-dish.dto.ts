import { IsDefined, IsUUID } from 'class-validator';

export class CreateDetailsDishDto {
  @IsDefined()
  @IsUUID()
  id: string;

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
