import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListOneParkService } from '@modules/park/services/ListOneParkService';
import { CreateParkService } from '@modules/park/services/CreateParkService';

class ParkController {
  public async index(request: Request, response: Response): Promise<Response> {
    const park_id = request.params.id;

    const listOneParkService = container.resolve(ListOneParkService);

    const park = await listOneParkService.execute({
      park_id,
    });

    return response.json(park);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { vehicle_id, parking_id, payment_method } = request.body;

    const createParkService = container.resolve(CreateParkService);

    const park = await createParkService.execute({
      user_id,
      vehicle_id,
      parking_id,
      payment_method,
    });

    return response.json(park);
  }
}

export { ParkController };
