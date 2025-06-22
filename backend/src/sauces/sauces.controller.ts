import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaucesService } from './sauces.service';
import { CreateSauceDto } from './dto/create-sauce.dto';
import { UpdateSauceDto } from './dto/update-sauce.dto';

@Controller('sauces')
export class SaucesController {
  constructor(private readonly saucesService: SaucesService) {}

  @Post()
  create(@Body() createSauceDto: CreateSauceDto) {
    return this.saucesService.create(createSauceDto);
  }

  @Get()
  findAll() {
    return this.saucesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saucesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSauceDto: UpdateSauceDto) {
    return this.saucesService.update(+id, updateSauceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saucesService.remove(+id);
  }
}
