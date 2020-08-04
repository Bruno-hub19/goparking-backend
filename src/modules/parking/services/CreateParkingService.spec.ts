import AppError from '@shared/errors/AppError';

import { FakeParkingRepository } from '@modules/parking/repositories/fakes/FakeParkingRepository';

import { CreateParkingService } from './CreateParkingService';

let fakeParkingRepository: FakeParkingRepository;

let createParkingService: CreateParkingService;

describe('CreateParking', () => {
  beforeEach(() => {
    fakeParkingRepository = new FakeParkingRepository();

    createParkingService = new CreateParkingService(fakeParkingRepository);
  });

  it('should be able to create a new parking', async () => {
    const parking = await createParkingService.execute({
      name: 'CWB Parking',
      email: 'cwb@parking.com',
      phone: '41999990000',
      address: 'Rua Nelson Martins, 749 - Portão',
      five_minuts_price: 1.55,
    });

    expect(parking).toEqual(
      expect.objectContaining({
        name: 'CWB Parking',
        email: 'cwb@parking.com',
        phone: '41999990000',
        address: 'Rua Nelson Martins, 749 - Portão',
        five_minuts_price: 1.55,
      }),
    );
  });

  it('should not be able to create a new parking with same credentials', async () => {
    await createParkingService.execute({
      name: 'CWB Parking',
      email: 'cwb@parking.com',
      phone: '41999990000',
      address: 'Rua Nelson Martins, 749 - Portão',
      five_minuts_price: 1.55,
    });

    await expect(
      createParkingService.execute({
        name: 'CWB Parking',
        email: 'cwb2@parking2.com',
        phone: '41999991111',
        address: 'Rua Nelson Martins, 749 - Portão',
        five_minuts_price: 1.55,
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createParkingService.execute({
        name: 'CWB Parking 2',
        email: 'cwb@parking.com',
        phone: '41999992222',
        address: 'Rua Nelson Martins, 749 - Portão',
        five_minuts_price: 1.55,
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createParkingService.execute({
        name: 'CWB Parking 3',
        email: 'cwb3@parking3.com',
        phone: '41999990000',
        address: 'Rua Nelson Martins, 749 - Portão',
        five_minuts_price: 1.55,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
