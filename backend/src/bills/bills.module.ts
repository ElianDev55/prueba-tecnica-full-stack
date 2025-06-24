import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillsDetailEntity } from 'src/bill-details/entities/bill-detail.entity';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';
import { BillEntity } from './entities/bill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillEntity, BillsDetailEntity])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
