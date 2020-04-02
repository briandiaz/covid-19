import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { SignUpCredentialsDTO } from './dtos/signup-credentials.dto';
import { UserRO } from './user.interface';
import { UserRepository } from './user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SignInCredentialsDTO } from './dtos/signin-credentials.dto';

const mockUserRepository = () => ({
  signUp: jest.fn(),
});

describe('Authentication Controller', () => {
  let controller: AuthenticationController;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        AuthenticationService,
        {
          provide: getRepositoryToken(UserRepository),
          useFactory: mockUserRepository
        }
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
    authenticationService = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authenticationService).toBeDefined();
  });

  describe('POST /signup', () => {
    it('should save user info from credentials provided.', async () => {
      const mock: SignUpCredentialsDTO = {
        name: 'Brad Paulsen',
        email: 'brad.paulsen@mydomain.com',
        username: 'bradpaulsen',
        password: 'Br4dhey2320',
      };
      const expectedResult: UserRO = {
        id: 'my-id',
        name: mock.name,
        username: mock.username,
        email: mock.email,
      };
      jest.spyOn(authenticationService, 'signUp').mockResolvedValue(expectedResult);

      const response = await controller.signUp(mock);

      expect(response).toBeDefined();
      expect(response).toStrictEqual(expectedResult);
    });
  });

  describe('POST /signin', () => {
    it('should return a session from credentials provided.', async () => {
      const mock: SignInCredentialsDTO = {
        username: 'bradpaulsen',
        password: 'Br4dhey2320',
      };
      const expectedResult: UserRO = {
        id: 'my-id',
        name: 'Hello',
        username: mock.username,
        email: mock.email,
      };
      jest.spyOn(authenticationService, 'signIn').mockResolvedValue(expectedResult);

      const response = await controller.signIn(mock);

      expect(response).toBeDefined();
      expect(response).toStrictEqual(expectedResult);
    });
  });
});
