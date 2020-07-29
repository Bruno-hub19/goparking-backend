import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';

interface IRequest {
  license_plate: string;
  owner_id: string;
}

@injectable()
class RemoveVehicleService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { } // eslint-disable-line

  public async execute({ license_plate, owner_id }: IRequest): Promise<void> {
    const findOwner = await this.usersRepository.findById(owner_id);

    if (!findOwner) {
      throw new AppError('This user does not exists');
    }

    const findVehicleByOwner = await this.vehiclesRepository.findByOwner(
      owner_id,
    );

    const findVehicleByLicensePlate = await this.vehiclesRepository.findByLicensePlate(
      license_plate,
    );

    if (!findVehicleByOwner || !findVehicleByLicensePlate) {
      throw new AppError('Vehicle not found');
    }

    await this.vehiclesRepository.remove({ license_plate, owner_id });
  }
}

export default RemoveVehicleService;
