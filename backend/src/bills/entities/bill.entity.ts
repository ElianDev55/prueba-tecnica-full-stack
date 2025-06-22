import { BillsDetailEntity } from 'src/bill-details/entities/bill-detail.entity';
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

@Entity('bills')
export class BillEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BillsDetailEntity)
  @JoinColumn({ name: 'bill_details_id' })
  billDetails: BillsDetailEntity;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'boolean', nullable: true })
  is_deleted: boolean;

  // Relations
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  created_by: UserEntity;
}
