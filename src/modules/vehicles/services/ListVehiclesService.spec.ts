import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepostory';
import FakeVehiclesRepository from '@modules/vehicles/repositories/fakes/FakeVehiclesRepository';

import ListVehiclesService from './ListVehiclesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeVehiclesRepository: FakeVehiclesRepository;

let listVehiclesService: ListVehiclesService;

describe('ListVehicles', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVehiclesRepository = new FakeVehiclesRepository();

    listVehiclesService = new ListVehiclesService(
      fakeVehiclesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list all user vehicles', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    const vehicle1 = await fakeVehiclesRepository.add({
      license_plate: 'aaaa9999',
      owner_id: user.id,
    });

    const vehicle2 = await fakeVehiclesRepository.add({
      license_plate: 'bbbb9999',
      owner_id: user.id,
    });

    const vehicle3 = await fakeVehiclesRepository.add({
      license_plate: 'cccc9999',
      owner_id: user.id,
    });

    const vehicles = await listVehiclesService.execute(user.id);

    expect(vehicles).toEqual(
      expect.arrayContaining([vehicle1, vehicle2, vehicle3]),
    );
  });

  it('should not be able to list the vehicles from an user that does not exists', async () => {
    await expect(
      listVehiclesService.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
