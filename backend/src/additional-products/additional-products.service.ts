import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdditionalProductDto } from './dto/create-additional-product.dto';
import { UpdateAdditionalProductDto } from './dto/update-additional-product.dto';
import { AdditionalProductEntity } from './entities/additional-product.entity';

@Injectable()
export class AdditionalProductsService {
  constructor(
    @InjectRepository(AdditionalProductEntity)
    private additionalProductRepository: Repository<AdditionalProductEntity>,
  ) {}

  create(createAdditionalProductDto: CreateAdditionalProductDto) {
    return 'This action adds a new additionalProduct';
  }

  findAll() {
    return `This action returns all additionalProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} additionalProduct`;
  }

  update(id: string, updateAdditionalProductDto: UpdateAdditionalProductDto) {
    return `This action updates a #${id} additionalProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} additionalProduct`;
  }
}
