import { IParkRepository } from '@modules/park/repositories/IParkRepository';
import { ICreateParkDTO } from '@modules/park/dtos/ICreateParkDTO';
import { Park } from '@modules/park/infra/typeorm/entities/Park';

class FakeParkRepository implements IParkRepository {
  private parks: Park[] = [];

  public async findById(park_id: string): Promise<Park | undefined> {
    const park = this.parks.find(eachPark => eachPark.id === park_id);

    return park;
  }

  public async create({
    user_id,
    vehicle_id,
    parking_id,
    payment_method,
  }: ICreateParkDTO): Promise<Park> {
    const park = new Park();

    Object.assign(park, {
      user_id,
      vehicle_id,
      parking_id,
      payment_method,
    });

    this.parks.push(park);

    return park;
  }
}

export { FakeParkRepository };
