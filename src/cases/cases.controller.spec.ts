import { Test, TestingModule } from '@nestjs/testing';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { Gender } from './case.model';
import { UpdateCaseDTO } from './dtos/update-case.dto';

describe('Cases Controller', () => {
  let controller: CasesController;
  let mockCase = null;
  let mockCaseParams = null;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasesController],
      providers: [CasesService],
    }).compile();

    controller = module.get<CasesController>(CasesController);

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
    mockCase = await controller.createCase(mockCaseParams);
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
    it('should return an object of case entity when created', async () => {
      const expectedResult = mockCaseParams;
      const response = await controller.createCase(mockCaseParams);
      expect(response).toBeDefined();
      delete response.id;
      expect(response).toStrictEqual(expectedResult);
    });
  });

  describe('GET /:id', () => {
    it('should return a case by given id', async () => {
      const expectedResult = mockCase;
      const response = await controller.getCaseById(mockCase.id);
      expect(response).toBe(expectedResult);
    });
  });

  describe('PUT /:id', () => {
    it('should update a case and return the data', async () => {
      const params: UpdateCaseDTO = {
        recovered: true,
      };
      const response = await controller.updateCase(mockCase.id, params);
      expect(response).toBeDefined();
      expect(response).toStrictEqual({ ...mockCase, ...params });
    });
  });
});
