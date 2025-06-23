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
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Post()
  async create(@Body() createDrinkDto: CreateDrinkDto) {
    return await this.drinksService.create(createDrinkDto);
  }

  @Get()
  async findAll() {
    return await this.drinksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.drinksService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDrinkDto: UpdateDrinkDto,
  ) {
    return await this.drinksService.update(id, updateDrinkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.drinksService.remove(id);
  }
}
