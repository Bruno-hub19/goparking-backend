import { Repository, getRepository } from 'typeorm';

import { IParkRepository } from '@modules/park/repositories/IParkRepository';
import { ICreateParkDTO } from '@modules/park/dtos/ICreateParkDTO';
import { Park } from '../entities/Park';

class ParkRepository implements IParkRepository {
  private ormRepository: Repository<Park>;

  constructor() {
    this.ormRepository = getRepository(Park);
  }

  public async findById(park_id: string): Promise<Park | undefined> {
    const park = await this.ormRepository.findOne({ where: { id: park_id } });

    return park;
  }

  public async create({
    user_id,
    vehicle_id,
    parking_id,
    payment_method,
  }: ICreateParkDTO): Promise<Park> {
    const park = this.ormRepository.create({
      user_id,
      vehicle_id,
      parking_id,
      payment_method,
    });

    await this.ormRepository.save(park);

    return park;
  }
}

export { ParkRepository };
