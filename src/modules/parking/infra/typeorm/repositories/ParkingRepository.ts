import { Repository, getRepository } from 'typeorm';

import { IParkingRepository } from '@modules/parking/repositories/IParkingRepository';
import { ICreateParkingDTO } from '@modules/parking/dtos/ICreateParkingDTO';
import { Parking } from '@modules/parking/infra/typeorm/entities/Parking';

class ParkingRepository implements IParkingRepository {
  private ormRepository: Repository<Parking>;

  constructor() {
    this.ormRepository = getRepository(Parking);
  }

  public async create({
    name,
    email,
    phone,
    address,
    five_minuts_price,
  }: ICreateParkingDTO): Promise<Parking> {
    const parking = this.ormRepository.create({
      name,
      email,
      phone,
      address,
      five_minuts_price,
    });

    await this.ormRepository.save(parking);

    return parking;
  }

  public async findById(parking_id: string): Promise<Parking | undefined> {
    const parking = await this.ormRepository.findOne({
      where: { id: parking_id },
    });

    return parking;
  }

  public async findByEmail(
    parking_email: string,
  ): Promise<Parking | undefined> {
    const parking = await this.ormRepository.findOne({
      where: { email: parking_email },
    });

    return parking;
  }

  public async findByName(parking_name: string): Promise<Parking | undefined> {
    const parking = await this.ormRepository.findOne({
      where: { name: parking_name },
    });

    return parking;
  }

  public async findByPhone(
    parking_phone: string,
  ): Promise<Parking | undefined> {
    const parking = await this.ormRepository.findOne({
      where: { phone: parking_phone },
    });

    return parking;
  }
}

export { ParkingRepository };
