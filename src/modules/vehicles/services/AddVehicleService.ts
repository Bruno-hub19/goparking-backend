import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';

import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';

interface IRequest {
  license_plate: string;
  owner_id: string;
}

@injectable()
class AddVehicleService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { } // eslint-disable-line

  public async execute({
    license_plate,
    owner_id,
  }: IRequest): Promise<Vehicle> {
    const findOwner = await this.usersRepository.findById(owner_id);

    if (!findOwner) {
      throw new AppError('This user does not exists');
    }

    const findVehicleByLicensePlate = await this.vehiclesRepository.findOneByLicensePlate(
      license_plate,
    );

    if (findVehicleByLicensePlate) {
      throw new AppError('This vehicle is already registered');
    }

    const vehicle = await this.vehiclesRepository.add({
      license_plate,
      owner_id,
    });

    return vehicle;
  }
}

export default AddVehicleService;
