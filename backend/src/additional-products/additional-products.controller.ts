import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdditionalProductsService } from './additional-products.service';
import { CreateAdditionalProductDto } from './dto/create-additional-product.dto';
import { UpdateAdditionalProductDto } from './dto/update-additional-product.dto';

@Controller('additional-products')
export class AdditionalProductsController {
  constructor(
    private readonly additionalProductsService: AdditionalProductsService,
  ) {}

  @Post()
  create(@Body() createAdditionalProductDto: CreateAdditionalProductDto) {
    return this.additionalProductsService.create(createAdditionalProductDto);
  }

  @Get()
  findAll() {
    return this.additionalProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.additionalProductsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdditionalProductDto: UpdateAdditionalProductDto,
  ) {
    return this.additionalProductsService.update(
      id,
      updateAdditionalProductDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.additionalProductsService.remove(+id);
  }
}
