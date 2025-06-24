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

  @Column({ type: 'uuid', nullable: true })
  bill_details_id: string;

  @ManyToOne(() => BillsDetailEntity)
  @JoinColumn({ name: 'bill_details_id' })
  billDetails: BillsDetailEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'boolean', nullable: true })
  is_deleted: boolean;

  // Relations

  @Column({ type: 'uuid', nullable: true })
  created_by: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;
}
