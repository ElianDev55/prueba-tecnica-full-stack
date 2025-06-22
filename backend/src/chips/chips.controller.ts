import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChipsService } from './chips.service';
import { CreateChipDto } from './dto/create-chip.dto';
import { UpdateChipDto } from './dto/update-chip.dto';

@Controller('chips')
export class ChipsController {
  constructor(private readonly chipsService: ChipsService) {}

  @Post()
  async create(@Body() createChipDto: CreateChipDto) {
    return await this.chipsService.create(createChipDto);
  }

  @Get()
  async findAll() {
    return await this.chipsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.chipsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChipDto: UpdateChipDto) {
    return await this.chipsService.update(id, updateChipDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.chipsService.remove(id);
  }
}
