import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateParkingService } from '@modules/parking/services/CreateParkingService';
import { ShowParkingInfoService } from '@modules/parking/services/ShowParkingInfoService';

class ParkingController {
  public async index(request: Request, response: Response): Promise<Response> {
    const parking_id = request.params.id;

    const showParkingInfoService = container.resolve(ShowParkingInfoService);

    const parking = await showParkingInfoService.execute(parking_id);

    return response.json(parking);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, address, five_minuts_price } = request.body;

    const createParkingService = container.resolve(CreateParkingService);

    const parking = await createParkingService.execute({
      name,
      email,
      phone,
      address,
      five_minuts_price,
    });

    return response.json(parking);
  }
}

export { ParkingController };
