import { container } from 'tsyringe';

import '@shared/containers/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';
import VehiclesRepository from '@modules/vehicles/infra/typeorm/repositories/VehiclesRepository';

import { IParkingRepository } from '@modules/parking/repositories/IParkingRepository';
import { ParkingRepository } from '@modules/parking/infra/typeorm/repositories/ParkingRepository';

import { IParkRepository } from '@modules/park/repositories/IParkRepository';
import { ParkRepository } from '@modules/park/infra/typeorm/repositories/ParkRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IVehiclesRepository>(
  'VehiclesRepository',
  VehiclesRepository,
);

container.registerSingleton<IParkingRepository>(
  'ParkingRepository',
  ParkingRepository,
);

container.registerSingleton<IParkRepository>('ParkRepository', ParkRepository);
