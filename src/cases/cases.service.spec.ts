import { Test, TestingModule } from '@nestjs/testing';
import { CasesService } from './cases.service';
import { Gender, Status } from './case.enum';
import { CaseRepository } from './case.repository';
import { GetCaseFilterDTO } from './dtos/get-case-filter.dto';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CaseEntity } from './cases.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../authentication/user.entity';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const mockCaseRepository: () => Repository<CaseEntity> = jest.fn(() => ({
  findOne: jest.fn(),
  createCase: jest.fn(),
  updateCase: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
}));

const mockCase = {
  id: 'some-id',
  name: 'Susan Goodman',
  nationalId: '1100-54466556-9',
  latitude: 48.9912,
  longitude: 30.949904,
  infectionStage: 2,
  gender: Gender.FEMALE,
  status: Status.ACTIVE,
};

describe('CasesService', () => {
  let casesService: CasesService;
  let caseRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CasesService,
        {
          provide: getRepositoryToken(CaseRepository),
          useFactory: mockCaseRepository
        }
      ],
    }).compile();

    casesService = module.get<CasesService>(CasesService);
    caseRepository = module.get<CaseRepository>(CaseRepository);
  });

  it('should be defined', () => {
    expect(casesService).toBeDefined();
    expect(caseRepository).toBeDefined();
  });

  describe('getCases', () => {
    it('should get all cases from repository', async () => {
      caseRepository.find.mockResolvedValue('expectedValue');
      expect(caseRepository.find).not.toHaveBeenCalled();

      const result = await casesService.getCases({});

      expect(caseRepository.find).toHaveBeenCalled();
      expect(result).toEqual('expectedValue');
    });
    it('should get all cases with filter from repository', async () => {
      caseRepository.find.mockResolvedValue([mockCase]);
      expect(caseRepository.find).not.toHaveBeenCalled();

      const filters: GetCaseFilterDTO = { gender: Gender.FEMALE, status: Status.RECOVERED };
      const result = await casesService.getCases(filters);

      expect(caseRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockCase]);
    });
  });

  describe('getCaseById', () => {
    it('should get a case from repository by id', async () => {
      caseRepository.findOne.mockResolvedValue(mockCase);
      expect(caseRepository.findOne).not.toHaveBeenCalled();

      const result = await casesService.getCaseById('some-id');

      expect(caseRepository.findOne).toHaveBeenCalled();
      expect(result).toStrictEqual(mockCase);
    });
    it('should throw error getting a case by non existent id', async () => {
      caseRepository.findOne.mockResolvedValue(null);
      expect(caseRepository.findOne).not.toHaveBeenCalled();

      try {
        await casesService.getCaseById('not-found-id');
      } catch (error) {
        expect(caseRepository.findOne).toHaveBeenCalled();
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(`Case with id 'not-found-id' was not found.`);
      }
    });
  });

  describe('createCase', () => {
    it('should save a case and return its result from repository', async () => {
      const mockUser = new UserEntity();
      caseRepository.createCase.mockResolvedValue(mockCase);
      expect(caseRepository.createCase).not.toHaveBeenCalled();

      const expectedResult = mockCase;
      const result = await casesService.createCase(mockCase, mockUser);
      delete result.id;

      expect(result).toBeDefined();
      expect(caseRepository.createCase).toHaveBeenCalled();
      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('updateCase', () => {
    it('should update a case and return result from repository', async () => {
      const updateParams = {
        gender: Gender.MALE,
        status: Status.RECOVERED,
      };
      const expectedResult = {
        ...mockCase,
        ...updateParams,
      };
      caseRepository.updateCase.mockResolvedValue(expectedResult);
      caseRepository.findOne.mockResolvedValue(mockCase);

      expect(caseRepository.findOne).not.toHaveBeenCalled();
      expect(caseRepository.updateCase).not.toHaveBeenCalled();

      const result = await casesService.updateCase('some-id', updateParams);

      expect(caseRepository.findOne).toHaveBeenCalled();
      expect(caseRepository.updateCase).toHaveBeenCalled();
      expect(result).toStrictEqual(expectedResult);
    });
  });
});
