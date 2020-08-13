import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

import { ParkController } from '../controllers/ParkController';

const parkRoutes = Router();
const parkController = new ParkController();

parkRoutes.use(ensureAuthentication);

parkRoutes.get('/one/:id', parkController.index);
parkRoutes.post('/', parkController.create);

export { parkRoutes };
