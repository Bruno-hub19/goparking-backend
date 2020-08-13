import { uuid } from 'uuidv4';

import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';
import ICreateVehicleDTO from '@modules/vehicles/dtos/ICreateVehicleDTO';

import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';

class FakeVehiclesRepository implements IVehiclesRepository {
  private vehicles: Vehicle[] = [];

  public async findOneById(vehicle_id: string): Promise<Vehicle | undefined> {
    const vehicle = this.vehicles.find(
      eachVehicle => eachVehicle.id === vehicle_id,
    );

    return vehicle;
  }

  public async findAllByOwner(
    owner_id: string,
  ): Promise<Vehicle[] | undefined> {
    const vehicle = this.vehicles.filter(
      eachVehicle => eachVehicle.owner_id === owner_id,
    );

    return vehicle;
  }

  public async findOneByLicensePlate(
    license_plate: string,
  ): Promise<Vehicle | undefined> {
    const vehicle = this.vehicles.find(
      eachVehicle => eachVehicle.license_plate === license_plate,
    );

    return vehicle;
  }

  public async add({
    name,
    license_plate,
    owner_id,
  }: ICreateVehicleDTO): Promise<Vehicle> {
    const vehicle = new Vehicle();

    Object.assign(vehicle, {
      id: uuid(),
      name,
      license_plate,
      owner_id,
    });

    this.vehicles.push(vehicle);

    return vehicle;
  }

  public async remove(vehicle_id: string): Promise<void> {
    const vehicleIndex = this.vehicles.findIndex(
      eachVehicle => eachVehicle.id === vehicle_id,
    );

    this.vehicles.splice(vehicleIndex, 1);
  }
}

export default FakeVehiclesRepository;
