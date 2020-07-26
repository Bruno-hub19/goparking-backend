import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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
    const findUserEmail = await this.usersRepository.findByEmail(email);

    const findUserPhoneNumber = await this.usersRepository.findByPhone(phone);

    if (findUserEmail) {
      throw new AppError('This email is already in use');
    }

    if (findUserPhoneNumber) {
      throw new AppError('This phone number is already in use');
    }

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
