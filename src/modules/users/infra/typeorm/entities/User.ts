import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';
import { Park } from '@modules/park/infra/typeorm/entities/Park';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @OneToMany(() => Vehicle, users_vehicles => users_vehicles.user, {
    eager: true,
  })
  vehicles: Vehicle[];

  @OneToMany(() => Park, park => park.user)
  park: Park[];

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
