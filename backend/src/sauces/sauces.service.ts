import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSauceDto } from './dto/create-sauce.dto';
import { UpdateSauceDto } from './dto/update-sauce.dto';
import { SaucesEntity } from './entities/sauce.entity';

@Injectable()
export class SaucesService {
  constructor(
    @InjectRepository(SaucesEntity)
    private saucesRepository: Repository<SaucesEntity>,
  ) {}

  async create(createSauceDto: CreateSauceDto) {
    try {
      const sauce = this.saucesRepository.create(createSauceDto);
      return this.saucesRepository.save(sauce);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return this.saucesRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const sauce = await this.saucesRepository.findOne({ where: { id } });
      if (!sauce) {
        throw new NotFoundException('Sauce not found');
      }
      return sauce;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateSauceDto: UpdateSauceDto) {
    try {
      const sauce = await this.saucesRepository.findOne({ where: { id } });
      if (!sauce) {
        throw new NotFoundException('Sauce not found');
      }
      return this.saucesRepository.update(id, updateSauceDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const sauce = await this.saucesRepository.findOne({ where: { id } });
      if (!sauce) {
        throw new NotFoundException('Sauce not found');
      }
      return this.saucesRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
