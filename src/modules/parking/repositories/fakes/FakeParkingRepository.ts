import { uuid } from 'uuidv4';

import { IParkingRepository } from '@modules/parking/repositories/IParkingRepository';
import { ICreateParkingDTO } from '@modules/parking/dtos/ICreateParkingDTO';
import { Parking } from '@modules/parking/infra/typeorm/entities/Parking';

class FakeParkingRepository implements IParkingRepository {
  private parkingLots: Parking[] = [];

  public async create({
    name,
    email,
    phone,
    address,
    five_minuts_price,
  }: ICreateParkingDTO): Promise<Parking> {
    const parking = new Parking();

    Object.assign(parking, {
      id: uuid(),
      name,
      email,
      phone,
      address,
      five_minuts_price,
    });

    this.parkingLots.push(parking);

    return parking;
  }

  public async findById(parking_id: string): Promise<Parking | undefined> {
    const parking = this.parkingLots.find(park => park.id === parking_id);

    return parking;
  }

  public async findByEmail(
    parking_email: string,
  ): Promise<Parking | undefined> {
    const parking = this.parkingLots.find(park => park.email === parking_email);

    return parking;
  }

  public async findByName(parking_name: string): Promise<Parking | undefined> {
    const parking = this.parkingLots.find(park => park.name === parking_name);

    return parking;
  }

  public async findByPhone(
    parking_phone: string,
  ): Promise<Parking | undefined> {
    const parking = this.parkingLots.find(park => park.phone === parking_phone);

    return parking;
  }
}

export { FakeParkingRepository };
