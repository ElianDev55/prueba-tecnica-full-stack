import { IsDecimal, IsDefined, IsUUID } from 'class-validator';

export class CreateBillDetailDto {
  @IsDefined()
  @IsUUID()
  diches_id: string;

  @IsDefined()
  @IsUUID()
  add_id: string;

  @IsDefined()
  @IsUUID()
  souces_id: string;

  @IsDefined()
  @IsUUID()
  drinks_id: string;

  @IsDefined()
  @IsUUID()
  chips_id: string;

  @IsDefined()
  @IsDecimal()
  total: number;

  @IsDefined()
  @IsUUID()
  created_by: string;
}
