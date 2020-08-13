import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';
import { Parking } from '@modules/parking/infra/typeorm/entities/Parking';

@Entity('park')
class Park {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: false })
  vehicle_id: string;

  @Column({ nullable: false })
  parking_id: string;

  @ManyToOne(() => User, users => users.park)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Vehicle, users_vehicles => users_vehicles.park)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ManyToOne(() => Parking, parking_lot => parking_lot.park, { eager: true })
  @JoinColumn({ name: 'parking_id' })
  parking: Parking;

  @Column({ nullable: false })
  payment_method: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Park };
