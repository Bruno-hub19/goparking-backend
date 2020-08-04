import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateParkingService } from '@modules/parking/services/CreateParkingService';

class ParkingController {
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
