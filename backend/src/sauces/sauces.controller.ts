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
import { CreateSauceDto } from './dto/create-sauce.dto';
import { UpdateSauceDto } from './dto/update-sauce.dto';
import { SaucesService } from './sauces.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('sauces')
export class SaucesController {
  constructor(private readonly saucesService: SaucesService) {}

  @Post()
  async create(@Body() createSauceDto: CreateSauceDto) {
    return await this.saucesService.create(createSauceDto);
  }

  @Get()
  async findAll() {
    return await this.saucesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.saucesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSauceDto: UpdateSauceDto,
  ) {
    return await this.saucesService.update(id, updateSauceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.saucesService.remove(id);
  }
}
