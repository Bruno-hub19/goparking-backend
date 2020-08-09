import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthentication';

import VehiclesController from '@modules/vehicles/infra/http/controllers/VehiclesController';

const vehiclesRoutes = Router();
const vehiclesController = new VehiclesController();

vehiclesRoutes.use(ensureAuthenticate);

vehiclesRoutes.get('/', vehiclesController.index);
vehiclesRoutes.post('/add', vehiclesController.create);
vehiclesRoutes.delete('/delete/:id', vehiclesController.delete);

export default vehiclesRoutes;
