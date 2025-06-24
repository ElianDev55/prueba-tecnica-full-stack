import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaucesEntity } from './entities/sauce.entity';
import { SaucesController } from './sauces.controller';
import { SaucesService } from './sauces.service';

@Module({
  imports: [TypeOrmModule.forFeature([SaucesEntity])],
  controllers: [SaucesController],
  providers: [SaucesService],
})
export class SaucesModule {}
