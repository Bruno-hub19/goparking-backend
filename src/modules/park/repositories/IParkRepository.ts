import { Park } from '../infra/typeorm/entities/Park';
import { ICreateParkDTO } from '../dtos/ICreateParkDTO';

interface IParkRepository {
  create(data: ICreateParkDTO): Promise<Park>;
  findById(park_id: string): Promise<Park | undefined>;
}

export { IParkRepository };
