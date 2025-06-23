import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { DishesEntity } from './entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DishesEntity]), AuthModule],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
