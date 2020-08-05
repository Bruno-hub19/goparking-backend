import AppError from '@shared/errors/AppError';

import { FakeParkingRepository } from '@modules/parking/repositories/fakes/FakeParkingRepository';

import { ShowParkingInfoService } from './ShowParkingInfoService';

let fakeParkingRepository: FakeParkingRepository;

let showParkingInfoService: ShowParkingInfoService;

describe('ShowParkingInfo', () => {
  beforeEach(() => {
    fakeParkingRepository = new FakeParkingRepository();

    showParkingInfoService = new ShowParkingInfoService(fakeParkingRepository);
  });

  it('should be able to show the parking informations', async () => {
    const parking = await fakeParkingRepository.create({
      name: 'CWB Parking',
      email: 'cwb@parking.com',
      phone: '41999990000',
      address: 'Rua Pedro Pizatto, 380',
      five_minuts_price: 1.59,
    });

    const sameParking = await showParkingInfoService.execute(parking.id);

    expect(sameParking?.id).toBe(parking.id);
  });

  it('should not be able to show the informations of a parking that does not exists', async () => {
    await expect(
      showParkingInfoService.execute('non-existing-parking-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
