import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DishesDetailsEntity } from 'src/details-dishes/entities/details-dish.entity';
import { Repository } from 'typeorm';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { DishesEntity } from './entities/dish.entity';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(DishesEntity)
    private dishesRepository: Repository<DishesEntity>,

    @InjectRepository(DishesDetailsEntity)
    private dishesDetailsRepository: Repository<DishesDetailsEntity>,
  ) {}

  async create(createDishDto: CreateDishDto) {
    try {
      const dish = this.dishesRepository.create(createDishDto);
      return this.dishesRepository.save(dish);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const dishesDetails = await this.dishesDetailsRepository.find({
        relations: ['dishes_id', 'products_id'],
      });

      const grouped: {
        [key: string]: (typeof dishesDetails)[number]['dishes_id'] & {
          products: any[];
        };
      } = {};

      for (const detail of dishesDetails) {
        const dishId = detail.dishes_id.id;
        if (!grouped[dishId]) {
          grouped[dishId] = {
            ...detail.dishes_id,
            products: [],
          };
        }
        grouped[dishId].products.push(detail.products_id);
      }

      // Retornar como array
      return Object.values(grouped);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const dish = await this.dishesRepository.findOne({ where: { id } });
      if (!dish) {
        throw new NotFoundException('Dish not found');
      }
      return dish;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateDishDto: UpdateDishDto) {
    try {
      const dish = await this.dishesRepository.findOne({ where: { id } });
      if (!dish) {
        throw new NotFoundException('Dish not found');
      }
      return this.dishesRepository.update(id, updateDishDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const dish = await this.dishesRepository.findOne({ where: { id } });
      if (!dish) {
        throw new NotFoundException('Dish not found');
      }
      return this.dishesRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
