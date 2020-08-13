import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import { Park } from '@modules/park/infra/typeorm/entities/Park';

@Entity('users_vehicles')
class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  license_plate: string;

  @Column({ nullable: false })
  owner_id: string;

  @ManyToOne(() => User, users => users.vehicles)
  @JoinColumn({ name: 'owner_id' })
  user: User;

  @OneToMany(() => Park, park => park.vehicle)
  park: Park[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Vehicle;
