import { Router } from 'express';

import { ParkingController } from '@modules/parking/infra/http/controllers/ParkingController';

const parkingRoutes = Router();
const parkingController = new ParkingController();

parkingRoutes.post('/', parkingController.create);

export { parkingRoutes };
