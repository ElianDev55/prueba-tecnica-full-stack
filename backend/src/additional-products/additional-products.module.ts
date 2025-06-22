import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalProductsController } from './additional-products.controller';
import { AdditionalProductsService } from './additional-products.service';
import { AdditionalProductEntity } from './entities/additional-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalProductEntity])],
  controllers: [AdditionalProductsController],
  providers: [AdditionalProductsService],
})
export class AdditionalProductsModule {}
