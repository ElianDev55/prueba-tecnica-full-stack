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
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  async create(@Body() createDishDto: CreateDishDto) {
    return await this.dishesService.create(createDishDto);
  }

  @Get()
  async findAll() {
    return await this.dishesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dishesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return await this.dishesService.update(id, updateDishDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dishesService.remove(id);
  }
}
