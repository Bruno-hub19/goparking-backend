import { getRepository, Repository } from 'typeorm';

import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';
import ICreateVehicleDTO from '@modules/vehicles/dtos/ICreateVehicleDTO';

import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';

class VehiclesRepository implements IVehiclesRepository {
  private ormRepository: Repository<Vehicle>;

  constructor() {
    this.ormRepository = getRepository(Vehicle);
  }

  public async findOneById(vehicle_id: string): Promise<Vehicle | undefined> {
    const vehicle = await this.ormRepository.findOne({
      where: { id: vehicle_id },
    });

    return vehicle;
  }

  public async findAllByOwner(
    owner_id: string,
  ): Promise<Vehicle[] | undefined> {
    const vehicle = await this.ormRepository.find({
      where: { owner_id },
    });

    return vehicle;
  }

  public async findOneByLicensePlate(
    license_plate: string,
  ): Promise<Vehicle | undefined> {
    const vehicle = await this.ormRepository.findOne({
      where: { license_plate },
    });

    return vehicle;
  }

  public async add({
    name,
    license_plate,
    owner_id,
  }: ICreateVehicleDTO): Promise<Vehicle> {
    const vehicle = this.ormRepository.create({
      name,
      license_plate,
      owner_id,
    });

    await this.ormRepository.save(vehicle);

    return vehicle;
  }

  public async remove(vehicle_id: string): Promise<void> {
    await this.ormRepository.delete({ id: vehicle_id });
  }
}

export default VehiclesRepository;
