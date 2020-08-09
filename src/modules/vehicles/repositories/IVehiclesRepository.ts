import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';

import ICreateVehicleDTO from '@modules/vehicles/dtos/ICreateVehicleDTO';

export default interface IVehiclesRepository {
  add(data: ICreateVehicleDTO): Promise<Vehicle>;
  remove(vehicle_id: string): Promise<void>;
  findOneById(vehicle_id: string): Promise<Vehicle | undefined>;
  findAllByOwner(owner_id: string): Promise<Vehicle[] | undefined>;
  findOneByLicensePlate(license_plate: string): Promise<Vehicle | undefined>;
}
