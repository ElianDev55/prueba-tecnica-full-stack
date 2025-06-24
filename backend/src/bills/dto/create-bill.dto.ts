import { IsDecimal, IsDefined, IsOptional, IsUUID } from 'class-validator';

export class CreateBillDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsDefined()
  @IsDecimal()
  total: number;

  @IsDefined()
  @IsUUID()
  created_by: string;
}
