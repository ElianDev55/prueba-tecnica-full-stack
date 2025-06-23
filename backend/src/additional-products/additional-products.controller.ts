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
import { AdditionalProductsService } from './additional-products.service';
import { CreateAdditionalProductDto } from './dto/create-additional-product.dto';
import { UpdateAdditionalProductDto } from './dto/update-additional-product.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('additional-products')
export class AdditionalProductsController {
  constructor(
    private readonly additionalProductsService: AdditionalProductsService,
  ) {}

  @Post()
  async create(@Body() createAdditionalProductDto: CreateAdditionalProductDto) {
    return await this.additionalProductsService.create(
      createAdditionalProductDto,
    );
  }

  @Get()
  async findAll() {
    return await this.additionalProductsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.additionalProductsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdditionalProductDto: UpdateAdditionalProductDto,
  ) {
    return this.additionalProductsService.update(
      id,
      updateAdditionalProductDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.additionalProductsService.remove(id);
  }
}
