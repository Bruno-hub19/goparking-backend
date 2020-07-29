import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListVehiclesService from '@modules/vehicles/services/ListVehiclesService';
import AddVehicleService from '@modules/vehicles/services/AddVehicleService';
import RemoveVehicleService from '@modules/vehicles/services/RemoveVehicleService';

class VehiclesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listVehiclesService = container.resolve(ListVehiclesService);

    const vehicles = await listVehiclesService.execute(user_id);

    return response.json(vehicles);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { license_plate } = request.body;

    const addVehicleService = container.resolve(AddVehicleService);

    const vehicle = await addVehicleService.execute({
      license_plate,
      owner_id: user_id,
    });

    return response.json(vehicle);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { license_plate } = request.body;

    const removeVehicleService = container.resolve(RemoveVehicleService);

    await removeVehicleService.execute({
      license_plate,
      owner_id: user_id,
    });

    return response.status(204).json();
  }
}

export default VehiclesController;
