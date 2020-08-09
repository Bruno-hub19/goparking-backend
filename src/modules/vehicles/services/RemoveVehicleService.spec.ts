import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepostory';
import FakeVehiclesRepository from '@modules/vehicles/repositories/fakes/FakeVehiclesRepository';

import RemoveVehicleService from './RemoveVehicleService';

let fakeUsersRepository: FakeUsersRepository;
let fakeVehiclesRepository: FakeVehiclesRepository;

let removeVehicleService: RemoveVehicleService;

describe('RemoveVehicle', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVehiclesRepository = new FakeVehiclesRepository();

    removeVehicleService = new RemoveVehicleService(
      fakeVehiclesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to remove a vehicle', async () => {
    const removeVehicle = jest.spyOn(removeVehicleService, 'execute');

    const user = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    const vehicle = await fakeVehiclesRepository.add({
      name: 'Porsche',
      license_plate: 'aaaa9999',
      owner_id: user.id,
    });

    await removeVehicleService.execute({
      owner_id: user.id,
      vehicle_id: vehicle.id,
    });

    expect(removeVehicle).toHaveBeenCalledWith({
      owner_id: user.id,
      vehicle_id: vehicle.id,
    });
  });

  it('should not be able to remove a vehicle that does not exists', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    await expect(
      removeVehicleService.execute({
        owner_id: user.id,
        vehicle_id: 'non-existing-vehicle-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a vehicle from another user', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    const vehicleOfUser1 = await fakeVehiclesRepository.add({
      name: 'vehicle1',
      license_plate: 'aaaa9999',
      owner_id: user1.id,
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Elon',
      email: 'musk@mail.com',
      phone: '41999991111',
      password: 'musk123',
    });

    await expect(
      removeVehicleService.execute({
        owner_id: user2.id,
        vehicle_id: vehicleOfUser1.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a vehicle from an user that does not exist', async () => {
    await expect(
      removeVehicleService.execute({
        owner_id: 'non-existing-user-id',
        vehicle_id: 'non-existing-vehicle-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
