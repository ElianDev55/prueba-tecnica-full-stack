import { Injectable } from '@nestjs/common';
import { CreateSauceDto } from './dto/create-sauce.dto';
import { UpdateSauceDto } from './dto/update-sauce.dto';

@Injectable()
export class SaucesService {
  create(createSauceDto: CreateSauceDto) {
    return 'This action adds a new sauce';
  }

  findAll() {
    return `This action returns all sauces`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sauce`;
  }

  update(id: number, updateSauceDto: UpdateSauceDto) {
    return `This action updates a #${id} sauce`;
  }

  remove(id: number) {
    return `This action removes a #${id} sauce`;
  }
}
