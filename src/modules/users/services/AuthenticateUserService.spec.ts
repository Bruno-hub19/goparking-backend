import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepostory';
import FakeHashProvider from '@shared/containers/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate an user by passing the email and password', async () => {
    await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    const { token, user } = await authenticateUserService.execute({
      email: 'torvalds@mail.com',
      password: 'torvalds123',
    });

    expect(token).toBeTruthy();
    expect(user?.email).toBe('torvalds@mail.com');
  });

  it('should not be able to authenticate an user that does not exist', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'torvalds@mail.com',
        password: 'torvalds123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user by passing wrong credentials', async () => {
    await fakeUsersRepository.create({
      name: 'Linus',
      email: 'torvalds@mail.com',
      phone: '41999990000',
      password: 'torvalds123',
    });

    await expect(
      authenticateUserService.execute({
        email: 'torvalds@mail.com',
        password: 'Torvalds12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
