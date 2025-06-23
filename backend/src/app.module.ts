import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'config/database.config';
import { AdditionalProductsModule } from './additional-products/additional-products.module';
import { AdditionalProductEntity } from './additional-products/entities/additional-product.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BillDetailsModule } from './bill-details/bill-details.module';
import { BillsDetailEntity } from './bill-details/entities/bill-detail.entity';
import { BillsModule } from './bills/bills.module';
import { BillEntity } from './bills/entities/bill.entity';
import { ChipsModule } from './chips/chips.module';
import { ChipsEntity } from './chips/entities/chip.entity';
import { DetailsDishesModule } from './details-dishes/details-dishes.module';
import { DishesDetailsEntity } from './details-dishes/entities/details-dish.entity';
import { DishesModule } from './dishes/dishes.module';
import { DishesEntity } from './dishes/entities/dish.entity';
import { DrinksModule } from './drinks/drinks.module';
import { DrinksEntity } from './drinks/entities/drink.entity';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ProductsEntity } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { SaucesEntity } from './sauces/entities/sauce.entity';
import { SaucesModule } from './sauces/sauces.module';
import { UserEntity } from './users/entities/user.entity';
import { SendGridModule } from './send-grid/send-grid.module';

const entities = [
  UserEntity,
  DishesEntity,
  DishesDetailsEntity,
  ProductsEntity,
  BillEntity,
  BillsDetailEntity,
  DrinksEntity,
  AdditionalProductEntity,
  ChipsEntity,
  SaucesEntity,
];

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature(entities),
    AuthModule,
    DishesModule,
    DetailsDishesModule,
    ProductsModule,
    BillsModule,
    BillDetailsModule,
    DrinksModule,
    SaucesModule,
    ChipsModule,
    AdditionalProductsModule,
    SendGridModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
