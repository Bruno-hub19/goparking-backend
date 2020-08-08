import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepostory';
import FakeVehiclesRepository from '@modules/vehicles/repositories/fakes/FakeVehiclesRepository';

import AddVehicleService from './AddVehicleService';

let fakeUsersRepository: FakeUsersRepository;
let fakeVehiclesRepository: FakeVehiclesRepository;

let addVehicleService: AddVehicleService;

describe('AddVehicle', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVehiclesRepository = new FakeVehiclesRepository();

    addVehicleService = new AddVehicleService(
      fakeVehiclesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to add a new vehicle', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    const vehicle = await addVehicleService.execute({
      name: 'vehicle1',
      license_plate: 'aaaa9999',
      owner_id: user.id,
    });

    expect(vehicle).toEqual(
      expect.objectContaining({
        owner_id: user.id,
        license_plate: 'aaaa9999',
      }),
    );
  });

  it('should not be able to add a new vehicle by pass a non-existing owner_id', async () => {
    await expect(
      addVehicleService.execute({
        name: 'vehicle1',
        license_plate: 'aaaa9999',
        owner_id: 'any-owner-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a vehicle that already exists', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    await addVehicleService.execute({
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
      addVehicleService.execute({
        name: 'vehicle1',
        license_plate: 'aaaa9999',
        owner_id: user1.id,
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      addVehicleService.execute({
        name: 'vehicle1',
        license_plate: 'aaaa9999',
        owner_id: user2.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
