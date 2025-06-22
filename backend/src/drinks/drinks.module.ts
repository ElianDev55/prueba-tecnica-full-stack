import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrinksController } from './drinks.controller';
import { DrinksService } from './drinks.service';
import { DrinksEntity } from './entities/drink.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrinksEntity])],
  controllers: [DrinksController],
  providers: [DrinksService],
})
export class DrinksModule {}
