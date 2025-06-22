import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChipDto } from './dto/create-chip.dto';
import { UpdateChipDto } from './dto/update-chip.dto';
import { ChipsEntity } from './entities/chip.entity';

@Injectable()
export class ChipsService {
  constructor(
    @InjectRepository(ChipsEntity)
    private chipRepository: Repository<ChipsEntity>,
  ) {}

  async create(createChipDto: CreateChipDto) {
    try {
      const chip = this.chipRepository.create(createChipDto);
      return this.chipRepository.save(chip);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return this.chipRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const chip = await this.chipRepository.findOne({ where: { id } });
      if (!chip) {
        throw new NotFoundException('Chip not found');
      }
      return chip;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateChipDto: UpdateChipDto) {
    try {
      const chip = await this.chipRepository.findOne({ where: { id } });
      if (!chip) {
        throw new NotFoundException('Chip not found');
      }
      return this.chipRepository.update(id, updateChipDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const chip = await this.chipRepository.findOne({ where: { id } });
      if (!chip) {
        throw new NotFoundException('Chip not found');
      }
      return this.chipRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
