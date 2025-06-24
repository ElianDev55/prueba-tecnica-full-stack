import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChipsController } from './chips.controller';
import { ChipsService } from './chips.service';
import { ChipsEntity } from './entities/chip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChipsEntity])],
  controllers: [ChipsController],
  providers: [ChipsService],
})
export class ChipsModule {}
