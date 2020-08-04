import { Parking } from '@modules/parking/infra/typeorm/entities/Parking';
import { ICreateParkingDTO } from '@modules/parking/dtos/ICreateParkingDTO';

interface IParkingRepository {
  create(data: ICreateParkingDTO): Promise<Parking>;
  findById(parking_id: string): Promise<Parking | undefined>;
  findByName(parking_name: string): Promise<Parking | undefined>;
  findByEmail(parking_email: string): Promise<Parking | undefined>;
  findByPhone(parking_phone: string): Promise<Parking | undefined>;
}

export { IParkingRepository };
