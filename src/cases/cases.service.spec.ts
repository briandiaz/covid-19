import { Test, TestingModule } from '@nestjs/testing';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { Gender } from './case.model';
import { UpdateCaseDTO } from './dtos/update-case.dto';

describe('CasesService', () => {
  let service: CasesService;
  let mockCase = null;
  let mockCaseParams = null;
  let cases = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasesController],
      providers: [CasesService],
    }).compile();

    service = module.get<CasesService>(CasesService);

    mockCaseParams = {
      name: 'Michael Vargas',
      'national_id': '031-54466556-9',
      latitude: 18.9912,
      longitude: 60.949904,
      'infection_stage': 1,
      gender: Gender.MALE,
      recovered: false,
      died: false
    };
    mockCase = await service.createCase(mockCaseParams);

    cases = service.getAllCases();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCases()', () => {
    it('should return an array', () => {
      expect(cases).toBeInstanceOf(Array);
    });
    it('should return an array of size 1', () => {
      expect(cases.length).toBe(1);
    });
    it('should return an array of cases', () => {
      expect(cases[0]).toBe(mockCase);
    });
  });

  describe('createCase()', () => {
    const params = {
      name: 'Susan Goodman',
      'national_id': '1100-54466556-9',
      latitude: 48.9912,
      longitude: 30.949904,
      'infection_stage': 2,
      gender: Gender.FEMALE,
      recovered: true,
      died: false
    };
    it('should return an object of case entity when created', async () => {
      const expectedResult = params;
      const result = await service.createCase(params);
      expect(result).toBeDefined();
      delete result.id;
      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('getCaseById()', () => {
    it('should return a case by given id', async () => {
      const expectedResult = mockCase;
      const response = await service.getCaseById(mockCase.id);
      expect(response).toBe(expectedResult);
    });
  });

  describe('updateCase()', () => {
    it('should update a case and return the data', async () => {
      const params: UpdateCaseDTO = {
        recovered: true,
      };
      const response = await service.updateCase(mockCase.id, params);
      expect(response).toBeDefined();
      expect(response).toStrictEqual({ ...mockCase, ...params });
    });
  });
});
