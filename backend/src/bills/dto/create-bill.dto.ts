import { IsBoolean, IsDefined, IsOptional, IsUUID } from 'class-validator';

export class CreateBillDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsDefined()
  @IsUUID()
  billDetailsId: string;

  @IsDefined()
  @IsBoolean()
  isDeleted: boolean;

  @IsDefined()
  @IsUUID()
  createdBy: string;
}
