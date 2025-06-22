import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailsDishDto } from './dto/create-details-dish.dto';
import { UpdateDetailsDishDto } from './dto/update-details-dish.dto';
import { DishesDetailsEntity } from './entities/details-dish.entity';

@Injectable()
export class DetailsDishesService {
  constructor(
    @InjectRepository(DishesDetailsEntity)
    private detailsDishesRepository: Repository<DishesDetailsEntity>,
  ) {}

  async create(createDetailsDishDto: CreateDetailsDishDto) {
    try {
      const detailsDish =
        this.detailsDishesRepository.create(createDetailsDishDto);
      return this.detailsDishesRepository.save(detailsDish);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return this.detailsDishesRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const detailsDish = await this.detailsDishesRepository.findOne({
        where: { id },
      });
      if (!detailsDish) {
        throw new NotFoundException('Details dish not found');
      }
      return detailsDish;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateDetailsDishDto: UpdateDetailsDishDto) {
    try {
      const detailsDish = await this.detailsDishesRepository.findOne({
        where: { id },
      });
      if (!detailsDish) {
        throw new NotFoundException('Details dish not found');
      }
      return this.detailsDishesRepository.update(id, updateDetailsDishDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const detailsDish = await this.detailsDishesRepository.findOne({
        where: { id },
      });
      if (!detailsDish) {
        throw new NotFoundException('Details dish not found');
      }
      return this.detailsDishesRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
