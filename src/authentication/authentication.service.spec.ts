import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpCredentialsDTO } from './dtos/signup-credentials.dto';
import { UserRO } from './user.interface';

const mockUserRepository = () => ({
  signUp: jest.fn(),
  save: jest.fn(),
});

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: getRepositoryToken(UserRepository),
          useFactory: mockUserRepository
        }
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('signUp', () => {
    it('should return a session of credentials provided.', async () => {
      const mock: SignUpCredentialsDTO = {
        name: 'Brad Paulsen',
        email: 'brad.paulsen@mydomain.com',
        username: 'bradpaulsen',
        password: 'Br4dhey2320',
      };
      const expectedResult: UserRO = {
        name: mock.name,
        username: mock.username,
        email: mock.email,
      };
      jest.spyOn(userRepository, 'signUp').mockResolvedValue(expectedResult);
      expect(userRepository.signUp).not.toHaveBeenCalled();

      const response = await service.signUp(mock);

      expect(userRepository.signUp).toHaveBeenCalled();
      expect(response).toBeDefined();
      expect(response).toStrictEqual(expectedResult);
    });
  });
});
