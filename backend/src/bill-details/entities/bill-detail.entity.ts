import { AdditionalProductEntity } from 'src/additional-products/entities/additional-product.entity';
import { BillEntity } from 'src/bills/entities/bill.entity';
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

  @Column({ type: 'uuid', nullable: true })
  bill_id: string;

  @ManyToOne(() => BillEntity)
  @JoinColumn({ name: 'bill_id' })
  bill: BillEntity;

  @Column({ type: 'uuid', nullable: true })
  diches_id: string;

  @ManyToOne(() => DishesEntity)
  @JoinColumn({ name: 'diches_id' })
  diches: DishesEntity;

  @Column({ type: 'uuid', nullable: true })
  add_id: string;

  @ManyToOne(() => AdditionalProductEntity)
  @JoinColumn({ name: 'add_id' })
  add: AdditionalProductEntity;

  @Column({ type: 'uuid', nullable: true })
  souces_id: string;

  @ManyToOne(() => SaucesEntity)
  @JoinColumn({ name: 'souces_id' })
  souces: SaucesEntity;

  @Column({ type: 'uuid', nullable: true })
  drinks_id: string;

  @ManyToOne(() => DrinksEntity)
  @JoinColumn({ name: 'drinks_id' })
  drinks: DrinksEntity;

  @Column({ type: 'uuid', nullable: true })
  chips_id: string;

  @ManyToOne(() => ChipsEntity)
  @JoinColumn({ name: 'chips_id' })
  chips: ChipsEntity;

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
