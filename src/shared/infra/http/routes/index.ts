import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import vehiclesRoutes from '@modules/vehicles/infra/http/routes/vehicles.routes';

const routes = Router();

routes.use('/user', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/vehicles', vehiclesRoutes);

export default routes;
