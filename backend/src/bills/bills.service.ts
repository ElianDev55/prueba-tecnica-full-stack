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

interface GroupedBillItem {
  diches: string;
  add: string;
  souces: string;
  drinks: string;
  chips: string;
  price: string;
  quantity: number;
  billDetailTotal: number;
}

export interface FinalBillItem {
  diches: string;
  add: string;
  souces: string;
  drinks: string;
  chips: string;
  price: string;
  quantity: number;
  billDetailTotal: string;
  billTotal: string;
  createdBy: string;
  createdByEmail: string;
  createdByPhone: string;
  createdByAddress: string;
}

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

      if (bills.length === 0) {
        throw new NotFoundException('No bills found');
      }

      const billDetails = await this.billDetailRepository.find({
        where: { bill_id: In(bills.map((bill) => bill.id)) },
        relations: ['diches', 'add', 'souces', 'drinks', 'chips', 'bill'],
      });

      const groupedDetails = billDetails.reduce(
        (acc, detail) => {
          const dichesId = detail.diches?.id;
          if (dichesId) {
            if (!acc[dichesId]) {
              acc[dichesId] = [];
            }
            acc[dichesId].push(detail);
          }
          return acc;
        },
        {} as Record<string, BillsDetailEntity[]>,
      );

      return groupedDetails;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async SendBillToEmail(bill_id: string): Promise<FinalBillItem[]> {
    try {
      const dichesDetailsByDishId = await this.billDetailRepository.find({
        where: { bill_id },
        relations: [
          'diches',
          'add',
          'souces',
          'drinks',
          'chips',
          'bill',
          'createdBy',
        ],
      });

      if (dichesDetailsByDishId.length === 0) {
        return [];
      }

      const groupedItems = new Map<string, GroupedBillItem>();

      for (const detail of dichesDetailsByDishId) {
        const dichesName = detail.diches?.name || '';
        const addName = detail.add?.name || '';
        const soucesName = detail.souces?.name || '';
        const drinksName = detail.drinks?.name || '';
        const chipsName = detail.chips?.name || '';
        const priceAsNumber = parseFloat(String(detail.total)) || 0;

        const key = `${dichesName}-${addName}-${soucesName}-${drinksName}-${chipsName}-${priceAsNumber}`;

        if (groupedItems.has(key)) {
          const existingItem = groupedItems.get(key);
          if (existingItem) {
            existingItem.quantity += 1;
            existingItem.billDetailTotal += priceAsNumber;
          }
        } else {
          groupedItems.set(key, {
            diches: dichesName,
            add: addName,
            souces: soucesName,
            drinks: drinksName,
            chips: chipsName,
            price: priceAsNumber.toString(),
            quantity: 1,
            billDetailTotal: priceAsNumber,
          });
        }
      }

      const firstDetail = dichesDetailsByDishId[0];
      const billInfo = {
        billTotal: firstDetail.bill?.total?.toString() || '0',
        createdBy: firstDetail.createdBy.name || '',
        createdByEmail: firstDetail.createdBy.email || '',
        createdByPhone: firstDetail.createdBy.phone || '',
        createdByAddress: firstDetail.createdBy.address || '',
      };

      const bill: FinalBillItem[] = Array.from(groupedItems.values()).map(
        (item) => {
          return {
            diches: item.diches,
            add: item.add,
            souces: item.souces,
            drinks: item.drinks,
            chips: item.chips,
            price: item.price,
            quantity: item.quantity,
            billDetailTotal: item.billDetailTotal.toFixed(2),
            billTotal: billInfo.billTotal,
            createdBy: billInfo.createdBy,
            createdByEmail: billInfo.createdByEmail,
            createdByPhone: billInfo.createdByPhone,
            createdByAddress: billInfo.createdByAddress,
          };
        },
      );

      return bill;
    } catch (error) {
      console.log(error);
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
