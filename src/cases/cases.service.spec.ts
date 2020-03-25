import { Test, TestingModule } from '@nestjs/testing';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';

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

  describe('GET -> /', () => {
    it('should return an array of cases', () => {
      const getAllCases = service.getAllCases();
      expect(getAllCases).toBeInstanceOf(Array);        
    });
  });

});
