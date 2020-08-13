import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepostory';
import FakeVehiclesRepository from '@modules/vehicles/repositories/fakes/FakeVehiclesRepository';
import { FakeParkingRepository } from '@modules/parking/repositories/fakes/FakeParkingRepository';
import { FakeParkRepository } from '@modules/park/repositories/fakes/FakeParkRepository';

import AppError from '@shared/errors/AppError';
import { CreateParkService } from './CreateParkService';

let fakeUsersRepository: FakeUsersRepository;
let fakeVehiclesRepository: FakeVehiclesRepository;
let fakeParkingRepository: FakeParkingRepository;
let fakeParkRepository: FakeParkRepository;

let createParkSerive: CreateParkService;

describe('CreatePark', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVehiclesRepository = new FakeVehiclesRepository();
    fakeParkingRepository = new FakeParkingRepository();
    fakeParkRepository = new FakeParkRepository();

    createParkSerive = new CreateParkService(
      fakeParkRepository,
      fakeUsersRepository,
      fakeVehiclesRepository,
      fakeParkingRepository,
    );
  });

  it('should be able to park a vehicle', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    const vehicle = await fakeVehiclesRepository.add({
      owner_id: user.id,
      name: 'porsche',
      license_plate: 'ABC0000',
    });

    const parkingLot = await fakeParkingRepository.create({
      name: 'CWB Parking',
      email: 'cwb@parking.com',
      phone: '41999991111',
      address: 'Rua Pedro Bento 900',
      five_minuts_price: 1.4,
    });

    const park = await createParkSerive.execute({
      user_id: user.id,
      vehicle_id: vehicle.id,
      parking_id: parkingLot.id,
      payment_method: 'money',
    });

    expect(park).toEqual(
      expect.objectContaining({
        user_id: user.id,
        vehicle_id: vehicle.id,
        parking_id: parkingLot.id,
        payment_method: 'money',
      }),
    );
  });

  it('should not be able to park a vehicle by passing invalid data', async () => {
    await expect(
      createParkSerive.execute({
        user_id: 'non-existing-id',
        vehicle_id: 'non-existing-id',
        parking_id: 'non-existing-id',
        payment_method: 'non-existing-method',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
