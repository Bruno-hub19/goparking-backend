import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { Park } from '../infra/typeorm/entities/Park';
import { IParkRepository } from '../repositories/IParkRepository';

interface IRequest {
  park_id: string;
}

@injectable()
class ListOneParkService {
  constructor(
    @inject('ParkRepository')
    private parkRepository: IParkRepository,
  ) { } // eslint-disable-line

  public async execute({ park_id }: IRequest): Promise<Park | undefined> {
    const park = await this.parkRepository.findById(park_id);

    if (!park) {
      throw new AppError('Park not found');
    }

    return park;
  }
}

export { ListOneParkService };
