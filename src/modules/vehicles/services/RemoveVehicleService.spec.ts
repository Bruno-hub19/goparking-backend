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
    const removeVehicle = jest.spyOn(fakeVehiclesRepository, 'remove');

    const user = await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    await fakeVehiclesRepository.add({
      license_plate: 'aaaa9999',
      owner_id: user.id,
    });

    await removeVehicleService.execute({
      license_plate: 'aaaa9999',
      owner_id: user.id,
    });

    expect(removeVehicle).toHaveBeenCalledWith({
      license_plate: 'aaaa9999',
      owner_id: user.id,
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
        license_plate: 'aaaa0000',
        owner_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a vehicle from an user that does not exist', async () => {
    await expect(
      removeVehicleService.execute({
        license_plate: 'aaaa0000',
        owner_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
