import FakeUsersRepository from '../repositories/fakes/FakeUsersRepostory';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;

let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUserService = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999998888',
      password: 'torvalds123',
    });

    expect(user).toHaveProperty('id');
  });
});
