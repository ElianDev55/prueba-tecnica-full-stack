import { Injectable } from '@nestjs/common';
import { UpdateBillDetailDto } from 'src/bill-details/dto/update-bill-detail.dto';
import { CreateBillDto } from './dto/create-bill.dto';

@Injectable()
export class BillsService {
  create(createBillDto: CreateBillDto) {
    return 'This action adds a new bill';
  }

  findAll() {
    return `This action returns all bills`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: number, updateBillDto: UpdateBillDetailDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
