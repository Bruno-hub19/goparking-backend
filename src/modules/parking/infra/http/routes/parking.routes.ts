import { Router } from 'express';

import { ParkingController } from '@modules/parking/infra/http/controllers/ParkingController';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const parkingRoutes = Router();
const parkingController = new ParkingController();

parkingRoutes.use(ensureAuthentication);

parkingRoutes.get('/:id/info', parkingController.index);
parkingRoutes.post('/', parkingController.create);

export { parkingRoutes };
