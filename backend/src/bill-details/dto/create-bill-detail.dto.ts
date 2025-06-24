import { IsDecimal, IsDefined, IsOptional, IsUUID } from 'class-validator';

export class CreateBillDetailDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  @IsOptional()
  diches_id?: string;

  @IsUUID()
  @IsOptional()
  bill_id?: string;

  @IsUUID()
  @IsOptional()
  add_id?: string;

  @IsUUID()
  @IsOptional()
  souces_id?: string;

  @IsUUID()
  @IsOptional()
  drinks_id?: string;

  @IsUUID()
  @IsOptional()
  chips_id?: string;

  @IsOptional()
  @IsDecimal()
  total?: number;

  @IsDefined()
  @IsUUID()
  created_by: string;
}
