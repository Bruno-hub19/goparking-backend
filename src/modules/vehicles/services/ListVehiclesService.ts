import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';

import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';

@injectable()
class ListVehiclesService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { } // eslint-disable-line

  public async execute(owner_id: string): Promise<Vehicle[] | undefined> {
    const findOwner = await this.usersRepository.findById(owner_id);

    if (!findOwner) {
      throw new AppError('This user does not exists');
    }

    const vehicles = await this.vehiclesRepository.findAllByOwner(owner_id);

    return vehicles;
  }
}

export default ListVehiclesService;
