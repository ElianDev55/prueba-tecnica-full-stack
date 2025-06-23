import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { DetailsDishesService } from './details-dishes.service';
import { CreateDetailsDishDto } from './dto/create-details-dish.dto';
import { UpdateDetailsDishDto } from './dto/update-details-dish.dto';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('details-dishes')
export class DetailsDishesController {
  constructor(private readonly detailsDishesService: DetailsDishesService) {}

  @Post()
  async create(@Body() createDetailsDishDto: CreateDetailsDishDto) {
    return await this.detailsDishesService.create(createDetailsDishDto);
  }

  @Get()
  async findAll() {
    return await this.detailsDishesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.detailsDishesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDetailsDishDto: UpdateDetailsDishDto,
  ) {
    return await this.detailsDishesService.update(id, updateDetailsDishDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.detailsDishesService.remove(id);
  }
}
