import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
// import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const userRouter = Router();

const usersController = new UsersController();

userRouter.post('/', usersController.create);

export default userRouter;
