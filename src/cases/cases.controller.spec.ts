import { Test, TestingModule } from '@nestjs/testing';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { Gender } from './case.model';

describe('Cases Controller', () => {
  let controller: CasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasesController],
      providers: [CasesService],
    }).compile();

    controller = module.get<CasesController>(CasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /', () => {
    it('should return an array of cases', () => {
      const getAllCases = controller.getAllCases();
      expect(getAllCases).toBeInstanceOf(Array);        
    });
  });

  describe('POST /', () => {
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
      const response = await controller.createCase(params);
      expect(response).toBeDefined();
      delete response.id;
      expect(response).toStrictEqual(expectedResult);
    });
  });
});
