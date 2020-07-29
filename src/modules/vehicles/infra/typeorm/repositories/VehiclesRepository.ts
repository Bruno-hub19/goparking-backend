import { getRepository, Repository } from 'typeorm';

import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';
import IAddAndRemoveVehicleDTO from '@modules/vehicles/dtos/IAddAndRemoveVehicleDTO';

import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';

class VehiclesRepository implements IVehiclesRepository {
  private ormRepository: Repository<Vehicle>;

  constructor() {
    this.ormRepository = getRepository(Vehicle);
  }

  public async add({
    license_plate,
    owner_id,
  }: IAddAndRemoveVehicleDTO): Promise<Vehicle> {
    const vehicle = this.ormRepository.create({
      license_plate,
      owner_id,
    });

    await this.ormRepository.save(vehicle);

    return vehicle;
  }

  public async remove({
    license_plate,
    owner_id,
  }: IAddAndRemoveVehicleDTO): Promise<void> {
    await this.ormRepository.delete({ license_plate, owner_id });
  }
}

export default VehiclesRepository;
