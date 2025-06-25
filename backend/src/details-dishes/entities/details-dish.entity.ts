import { DishesEntity } from 'src/dishes/entities/dish.entity';
import { ProductsEntity } from 'src/products/entities/product.entity';
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

@Entity('dishes_details')
export class DishesDetailsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DishesEntity)
  @JoinColumn({ name: 'dishes_id' })
  dishes_id: DishesEntity;

  @ManyToOne(() => ProductsEntity)
  @JoinColumn({ name: 'products_id' })
  products_id: ProductsEntity;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'boolean', nullable: true })
  is_deleted: boolean;

  //Relations

  @Column({ type: 'uuid', nullable: true })
  created_by: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;
}
