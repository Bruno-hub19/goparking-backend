import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Park } from '@modules/park/infra/typeorm/entities/Park';

@Entity('parking_lot')
class Parking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({ nullable: false })
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  five_minuts_price: number;

  @OneToMany(() => Park, park => park.parking)
  park: Park[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Parking };
