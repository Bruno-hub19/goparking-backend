import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';
import IAddAndRemoveVehicleDTO from '@modules/vehicles/dtos/IAddAndRemoveVehicleDTO';

import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';

class FakeVehiclesRepository implements IVehiclesRepository {
  private vehicles: Vehicle[] = [];

  public async findByOwner(owner_id: string): Promise<Vehicle | undefined> {
    const vehicle = this.vehicles.find(
      eachVehicle => eachVehicle.owner_id === owner_id,
    );

    return vehicle;
  }

  public async findByLicensePlate(
    license_plate: string,
  ): Promise<Vehicle | undefined> {
    const vehicle = this.vehicles.find(
      eachVehicle => eachVehicle.license_plate === license_plate,
    );

    return vehicle;
  }

  public async add({
    license_plate,
    owner_id,
  }: IAddAndRemoveVehicleDTO): Promise<Vehicle> {
    const vehicle = new Vehicle();

    Object.assign(vehicle, {
      license_plate,
      owner_id,
    });

    this.vehicles.push(vehicle);

    return vehicle;
  }

  public async remove({
    license_plate,
    owner_id,
  }: IAddAndRemoveVehicleDTO): Promise<void> {
    const vehicleIndex = this.vehicles.findIndex(
      eachVehicle =>
        eachVehicle.license_plate === license_plate &&
        eachVehicle.owner_id === owner_id,
    );

    this.vehicles.splice(vehicleIndex, 1);
  }
}

export default FakeVehiclesRepository;
