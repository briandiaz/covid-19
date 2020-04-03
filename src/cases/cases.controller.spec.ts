import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { UpdateCaseDTO } from './dtos/update-case.dto';
import { Gender, Status } from './case.enum';
import { CaseRepository } from './case.repository';
import { CreateCaseDTO } from './dtos/create-case.dto';
import { CaseEntity } from './cases.entity';
import { CaseRO } from './interfaces/case.interface';
import { UserEntity } from '../authentication/user.entity';

const mockCaseRepository = () => ({
  findOne: jest.fn(),
  createCase: jest.fn(),
  updateCase: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
});

describe('Cases Controller', () => {
  let controller: CasesController;
  let casesService: CasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasesController],
      providers: [
        CasesService,
        {
          provide: getRepositoryToken(CaseRepository),
          useFactory: mockCaseRepository
        }
      ],
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
      ],
    }).compile();

    controller = module.get<CasesController>(CasesController);
    casesService = module.get<CasesService>(CasesService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(casesService).toBeDefined();
  });

  describe('GET /', () => {
    it('should return a empty array of cases', async () => {
      const expectedResult: CaseEntity[] = [];
      jest.spyOn(casesService, 'getCases').mockResolvedValue(expectedResult);
      const response = await controller.getCases({});
      expect(response).toBeInstanceOf(Array);
      expect(response).toBe(expectedResult);
    });
    it('should return an array of cases', async () => {
      const expectedResult = new CaseEntity();
      jest.spyOn(casesService, 'getCases').mockResolvedValue([expectedResult]);
      const response = await controller.getCases({});
      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(CaseEntity);
      expect(response[0]).toStrictEqual(expectedResult);
    });
  });

  describe('GET /:id', () => {
    it('should return a case by given id', async () => {
      const expectedResult = new CaseEntity();
      jest.spyOn(casesService, 'getCaseById').mockResolvedValue(expectedResult);
      const response = await controller.getCaseById('my-id');
      expect(response).toBeInstanceOf(CaseEntity);
      expect(response).toBe(expectedResult);
    });
    it('should throw not found error on non-existent id given', async () => {
      const expectedResult = new CaseEntity();
      jest.spyOn(casesService, 'getCaseById').mockResolvedValue(expectedResult);

      try {
        await controller.getCaseById('not-found-id');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(`Case with id 'not-found-id' was not found.`);
      }
    });
  });

  describe('POST /', () => {
    it('should return an object of case entity when created', async () => {
      const mockCaseParams: CreateCaseDTO = {
        name: 'Michael Vargas',
        nationalId: '031-54466556-9',
        latitude: 18.9912,
        longitude: 60.949904,
        infectionStage: 1,
        gender: Gender.MALE,
        status: Status.ACTIVE,
      };
      const expectedResult: CaseRO = { id: 'weoawoeawe', ...mockCaseParams };
      const mockUser = new UserEntity();

      jest.spyOn(casesService, 'createCase').mockResolvedValue(expectedResult);
      const response = await controller.createCase(mockCaseParams, mockUser);

      expect(response).toBeDefined();
      expect(response).toStrictEqual(expectedResult);
    });
  });

  describe('PATCH /:id', () => {
    it('should update a case and return the data', async () => {
      const updateParams: UpdateCaseDTO = {
        status: Status.RECOVERED,
      };
      const expectedResult = new CaseEntity();
      expectedResult.id = 'my-id';
      expectedResult.status = Status.RECOVERED;

      jest.spyOn(casesService, 'updateCase').mockResolvedValue(expectedResult);
      const response = await controller.updateCase('my-id', updateParams);
      expect(response).toBeDefined();
      expect(response).toStrictEqual(expectedResult);
    });
  });
});
