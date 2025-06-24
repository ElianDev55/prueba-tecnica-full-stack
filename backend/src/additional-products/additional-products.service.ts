import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async create(createAdditionalProductDto: CreateAdditionalProductDto) {
    try {
      const additionalProduct = this.additionalProductRepository.create(
        createAdditionalProductDto,
      );
      return this.additionalProductRepository.save(additionalProduct);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return this.additionalProductRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const additionalProduct = await this.additionalProductRepository.findOne({
        where: { id },
      });
      if (!additionalProduct) {
        throw new NotFoundException('Additional product not found');
      }
      return additionalProduct;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: string,
    updateAdditionalProductDto: UpdateAdditionalProductDto,
  ) {
    try {
      const additionalProduct = await this.additionalProductRepository.findOne({
        where: { id },
      });
      if (!additionalProduct) {
        throw new NotFoundException('Additional product not found');
      }
      return this.additionalProductRepository.update(
        id,
        updateAdditionalProductDto,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const additionalProduct = await this.additionalProductRepository.findOne({
        where: { id },
      });
      if (!additionalProduct) {
        throw new NotFoundException('Additional product not found');
      }
      return this.additionalProductRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
