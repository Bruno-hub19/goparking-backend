import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IParkingRepository } from '@modules/parking/repositories/IParkingRepository';
import { Parking } from '@modules/parking/infra/typeorm/entities/Parking';

@injectable()
class ShowParkingInfoService {
  constructor(
    @inject('ParkingRepository')
    private parkingRepository: IParkingRepository,
  ) { } // eslint-disable-line

  public async execute(parking_id: string): Promise<Parking | undefined> {
    const parking = await this.parkingRepository.findById(parking_id);

    if (!parking) {
      throw new AppError('Parking not found');
    }

    return parking;
  }
}

export { ShowParkingInfoService };
