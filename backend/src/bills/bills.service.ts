import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillsDetailEntity } from 'src/bill-details/entities/bill-detail.entity';
import { DataSource, In, Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { BillEntity } from './entities/bill.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(BillEntity)
    private billRepository: Repository<BillEntity>,
    @InjectRepository(BillsDetailEntity)
    private billDetailRepository: Repository<BillsDetailEntity>,
    private dataSource: DataSource,
  ) {}

  async create(createBillDto: CreateBillDto) {
    try {
      const bill = this.billRepository.create(createBillDto);
      return this.billRepository.save(bill);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return this.billRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const bill = await this.billRepository.findOne({ where: { id } });
      if (!bill) {
        throw new NotFoundException('Bill not found');
      }
      return bill;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByUserId(userId: string) {
    try {
      const bills = await this.billRepository.find({
        where: { createdBy: { id: userId } },
      });
      console.log(bills);

      const billDetails = await this.billDetailRepository.find({
        where: { bill_id: In(bills.map((bill) => bill.id)) },
        relations: ['diches', 'add', 'souces', 'drinks', 'chips'],
      });

      if (bills.length === 0) {
        throw new NotFoundException('No bills found');
      }

      return billDetails;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateBillDto: UpdateBillDto) {
    try {
      const bill = await this.billRepository.findOne({ where: { id } });
      if (!bill) {
        throw new NotFoundException('Bill not found');
      }
      return this.billRepository.update(id, updateBillDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const bill = await this.billRepository.findOne({ where: { id } });
      if (!bill) {
        throw new NotFoundException('Bill not found');
      }
      return this.billRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
