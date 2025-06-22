import { IsBoolean, IsDefined, IsUUID } from 'class-validator';

export class CreateBillDto {
  @IsDefined()
  @IsUUID()
  id: string;

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
