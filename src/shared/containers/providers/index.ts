import { container } from 'tsyringe';

import IHashProvider from '@shared/containers/providers/HashProvider/models/IHashProvider';
import BcryptHashProvider from '@shared/containers/providers/HashProvider/implementations/BcryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
