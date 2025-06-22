import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  async create(@Body() createBillDto: CreateBillDto) {
    return await this.billsService.create(createBillDto);
  }

  @Get()
  async findAll() {
    return await this.billsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.billsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return await this.billsService.update(id, updateBillDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.billsService.remove(id);
  }
}
