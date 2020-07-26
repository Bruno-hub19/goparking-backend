import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepostory';
import FakeHashProvider from '@shared/containers/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Linus',
        email: 'torvalds@mail.com',
        phone: '41999990000',
        password: 'torvalds123',
      }),
    );
  });

  it('should not be able to create a new user passing an email already in use', async () => {
    await createUserService.execute({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    await expect(
      createUserService.execute({
        name: 'Linus 2',
        email: 'torvalds@mail.com',
        phone: '41999990000',
        password: 'torvalds123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user passing a phone number already in use', async () => {
    await createUserService.execute({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    await expect(
      createUserService.execute({
        name: 'Elon',
        email: 'musk@mail.com',
        phone: '41999990000',
        password: 'musk123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
