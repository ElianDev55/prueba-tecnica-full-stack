import { AdditionalProductEntity } from 'src/additional-products/entities/additional-product.entity';
import { ChipsEntity } from 'src/chips/entities/chip.entity';
import { DishesEntity } from 'src/dishes/entities/dish.entity';
import { DrinksEntity } from 'src/drinks/entities/drink.entity';
import { SaucesEntity } from 'src/sauces/entities/sauce.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bill_details')
export class BillsDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DishesEntity)
  @JoinColumn({ name: 'diches_id' })
  diches: DishesEntity;

  @ManyToOne(() => AdditionalProductEntity)
  @JoinColumn({ name: 'add_id' })
  add_id: AdditionalProductEntity;

  @ManyToOne(() => SaucesEntity)
  @JoinColumn({ name: 'souces_id' })
  souces: SaucesEntity;

  @ManyToOne(() => DrinksEntity)
  @JoinColumn({ name: 'drinks_id' })
  drinks: DrinksEntity;

  @ManyToOne(() => ChipsEntity)
  @JoinColumn({ name: 'chips_id' })
  chips: ChipsEntity;

  @ManyToOne(() => AdditionalProductEntity)
  @JoinColumn({ name: 'additional_products_id' })
  additionalProducts: AdditionalProductEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'boolean', nullable: true })
  is_deleted: boolean;

  // Relations
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  created_by: string;
}
