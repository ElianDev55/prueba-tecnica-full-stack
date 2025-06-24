import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { DrinksEntity } from './entities/drink.entity';

@Injectable()
export class DrinksService {
  constructor(
    @InjectRepository(DrinksEntity)
    private drinksRepository: Repository<DrinksEntity>,
  ) {}

  async create(createDrinkDto: CreateDrinkDto) {
    try {
      const drink = this.drinksRepository.create(createDrinkDto);
      return this.drinksRepository.save(drink);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return this.drinksRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const drink = await this.drinksRepository.findOne({ where: { id } });
      if (!drink) {
        throw new NotFoundException('Drink not found');
      }
      return drink;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateDrinkDto: UpdateDrinkDto) {
    try {
      const drink = await this.drinksRepository.findOne({ where: { id } });
      if (!drink) {
        throw new NotFoundException('Drink not found');
      }
      await this.drinksRepository.update(id, updateDrinkDto);
      const updatedDrink = await this.drinksRepository.findOne({
        where: { id },
      });

      return updatedDrink;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const drink = await this.drinksRepository.findOne({ where: { id } });
      if (!drink) {
        throw new NotFoundException('Drink not found');
      }
      return this.drinksRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
