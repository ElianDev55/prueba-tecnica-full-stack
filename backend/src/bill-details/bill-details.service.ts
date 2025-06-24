import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBillDetailDto } from './dto/create-bill-detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill-detail.dto';
import { BillsDetailEntity } from './entities/bill-detail.entity';

@Injectable()
export class BillDetailsService {
  constructor(
    @InjectRepository(BillsDetailEntity)
    private billDetailRepository: Repository<BillsDetailEntity>,
  ) {}

  create(createBillDetailDto: CreateBillDetailDto) {
    try {
      const billDetail = this.billDetailRepository.create(createBillDetailDto);
      return this.billDetailRepository.save(billDetail);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    try {
      return this.billDetailRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const billDetail = await this.billDetailRepository.findOne({
        where: { id },
      });
      if (!billDetail) {
        throw new NotFoundException('Bill detail not found');
      }
      return billDetail;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateBillDetailDto: UpdateBillDetailDto) {
    try {
      const billDetail = await this.billDetailRepository.findOne({
        where: { id },
      });
      if (!billDetail) {
        throw new NotFoundException('Bill detail not found');
      }
      return this.billDetailRepository.update(id, updateBillDetailDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const billDetail = await this.billDetailRepository.findOne({
        where: { id },
      });
      if (!billDetail) {
        throw new NotFoundException('Bill detail not found');
      }
      return this.billDetailRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
