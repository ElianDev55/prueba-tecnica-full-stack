import { Injectable } from '@nestjs/common';
import { CreateDetailsDishDto } from './dto/create-details-dish.dto';
import { UpdateDetailsDishDto } from './dto/update-details-dish.dto';

@Injectable()
export class DetailsDishesService {
  create(createDetailsDishDto: CreateDetailsDishDto) {
    return 'This action adds a new detailsDish';
  }

  findAll() {
    return `This action returns all detailsDishes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailsDish`;
  }

  update(id: number, updateDetailsDishDto: UpdateDetailsDishDto) {
    return `This action updates a #${id} detailsDish`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailsDish`;
  }
}
