import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';
import { IParkingRepository } from '@modules/parking/repositories/IParkingRepository';
import { Park } from '../infra/typeorm/entities/Park';
import { IParkRepository } from '../repositories/IParkRepository';

interface IRequest {
  user_id: string;
  vehicle_id: string;
  parking_id: string;
  payment_method: string;
}

@injectable()
class CreateParkService {
  constructor(
    @inject('ParkRepository')
    private parkRepository: IParkRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,

    @inject('ParkingRepository')
    private parkingRepository: IParkingRepository,
  ) { } // eslint-disable-line

  public async execute({
    user_id,
    vehicle_id,
    parking_id,
    payment_method,
  }: IRequest): Promise<Park> {
    const findUser = await this.usersRepository.findById(user_id);
    const findVehicle = await this.vehiclesRepository.findOneById(vehicle_id);
    const findParking = await this.parkingRepository.findById(parking_id);

    if (!findUser) {
      throw new AppError('User not found');
    }

    if (!findVehicle) {
      throw new AppError('Vehicle not found');
    }

    if (!findParking) {
      throw new AppError('Parking lot not found');
    }

    const park = await this.parkRepository.create({
      user_id,
      vehicle_id,
      parking_id,
      payment_method,
    });

    return park;
  }
}

export { CreateParkService };
