import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(user_id: string): Promise<User | undefined> {
    const user = this.users.find(eachUser => eachUser.id === user_id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(eachUser => eachUser.email === email);

    return user;
  }

  public async findByPhone(phone: string): Promise<User | undefined> {
    const user = this.users.find(eachUser => eachUser.phone === phone);

    return user;
  }

  public async create({
    name,
    email,
    phone,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      phone,
      password,
    });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findUserIndex = this.users.findIndex(
      eachUser => eachUser.id === user.id,
    );

    this.users[findUserIndex] = user;

    return user;
  }
}

export default UsersRepository;
