import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IParkingRepository } from '@modules/parking/repositories/IParkingRepository';
import { Parking } from '@modules/parking/infra/typeorm/entities/Parking';

interface IRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  five_minuts_price: number;
}

@injectable()
class CreateParkingService {
  constructor(
    @inject('ParkingRepository')
    private parkingRepository: IParkingRepository,
  ) { } // eslint-disable-line

  public async execute({
    name,
    email,
    phone,
    address,
    five_minuts_price,
  }: IRequest): Promise<Parking> {
    const findParkingWithSameName = await this.parkingRepository.findByName(
      name,
    );

    const findParkingWithSameEmail = await this.parkingRepository.findByEmail(
      email,
    );

    const findParkingWithSamePhone = await this.parkingRepository.findByPhone(
      phone,
    );

    if (
      findParkingWithSameName ||
      findParkingWithSameEmail ||
      findParkingWithSamePhone
    ) {
      throw new AppError('This parking is already registered');
    }

    const parking = await this.parkingRepository.create({
      name,
      email,
      phone,
      address,
      five_minuts_price,
    });

    return parking;
  }
}

export { CreateParkingService };
