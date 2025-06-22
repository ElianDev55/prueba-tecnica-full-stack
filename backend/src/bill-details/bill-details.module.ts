import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillDetailsController } from './bill-details.controller';
import { BillDetailsService } from './bill-details.service';
import { BillsDetailEntity } from './entities/bill-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillsDetailEntity])],
  controllers: [BillDetailsController],
  providers: [BillDetailsService],
})
export class BillDetailsModule {}
