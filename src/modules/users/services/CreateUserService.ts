import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { } // eslint-disable-line

  public async execute({
    name,
    email,
    phone,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.create({
      name,
      email,
      phone,
      password,
    });

    return user;
  }
}

export default CreateUserService;
