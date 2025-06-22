import { IsDecimal, IsDefined, IsUUID } from 'class-validator';

export class CreateBillDetailDto {
  @IsDefined()
  @IsUUID()
  id: string;

  @IsDefined()
  @IsUUID()
  dichesId: string;

  @IsDefined()
  @IsUUID()
  addId: string;

  @IsDefined()
  @IsUUID()
  soucesId: string;

  @IsDefined()
  @IsUUID()
  drinksId: string;

  @IsDefined()
  @IsUUID()
  chipsId: string;

  @IsDefined()
  @IsUUID()
  additionalProductsId: string;

  @IsDefined()
  @IsDecimal()
  total: number;

  @IsDefined()
  @IsUUID()
  createdBy: string;
}
