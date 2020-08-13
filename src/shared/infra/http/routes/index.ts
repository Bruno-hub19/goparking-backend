import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import vehiclesRoutes from '@modules/vehicles/infra/http/routes/vehicles.routes';
import { parkingRoutes } from '@modules/parking/infra/http/routes/parking.routes';
import { parkRoutes } from '@modules/park/infra/http/routes/park.routes';

const routes = Router();

routes.use('/user', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/vehicles', vehiclesRoutes);
routes.use('/parking', parkingRoutes);
routes.use('/park', parkRoutes);

export default routes;
