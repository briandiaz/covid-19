import { Test, TestingModule } from '@nestjs/testing';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { Gender } from './case.model';

describe('CasesService', () => {
  let service: CasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasesController],
      providers: [CasesService],
    }).compile();

    service = module.get<CasesService>(CasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCases()', () => {
    it('should return an array of cases', () => {
      const getAllCases = service.getAllCases();
      expect(getAllCases).toBeInstanceOf(Array);        
    });
  });

  describe('createCase()', () => {
    const params = {
      name: 'Michael Vargas',
      'national_id': '031-54466556-9',
      latitude: 18.9912,
      longitude: 60.949904,
      'infection_stage': 1,
      gender: Gender.MALE,
      recovered: false,
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
});
