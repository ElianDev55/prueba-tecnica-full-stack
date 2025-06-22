import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetailsDishesService } from './details-dishes.service';
import { CreateDetailsDishDto } from './dto/create-details-dish.dto';
import { UpdateDetailsDishDto } from './dto/update-details-dish.dto';

@Controller('details-dishes')
export class DetailsDishesController {
  constructor(private readonly detailsDishesService: DetailsDishesService) {}

  @Post()
  create(@Body() createDetailsDishDto: CreateDetailsDishDto) {
    return this.detailsDishesService.create(createDetailsDishDto);
  }

  @Get()
  findAll() {
    return this.detailsDishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailsDishesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetailsDishDto: UpdateDetailsDishDto,
  ) {
    return this.detailsDishesService.update(+id, updateDetailsDishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailsDishesService.remove(+id);
  }
}
