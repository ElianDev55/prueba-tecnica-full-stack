import { IsDefined, IsOptional, IsUUID } from 'class-validator';

export class CreateBillDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsDefined()
  @IsUUID()
  billDetailsId: string;

  @IsDefined()
  @IsUUID()
  created_by: string;
}
