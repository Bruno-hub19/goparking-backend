import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';

import IAddAndRemoveVehicleDTO from '@modules/vehicles/dtos/IAddAndRemoveVehicleDTO';

export default interface IVehiclesRepository {
  add(data: IAddAndRemoveVehicleDTO): Promise<Vehicle>;
  remove(data: IAddAndRemoveVehicleDTO): Promise<void>;
  findAllByOwner(owner_id: string): Promise<Vehicle[] | undefined>;
  findOneByLicensePlate(license_plate: string): Promise<Vehicle | undefined>;
}
