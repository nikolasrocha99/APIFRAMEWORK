import request from 'supertest';
import app from '../../app';
import { EvaluationsService } from './evaluations.service';

jest.mock('./evaluations.service');

describe('Evaluations API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /evaluations', () => {
        it('should return a list of evaluations', async () => {
            const evaluations = [{ id: 1, name: 'Evaluation 1' }];
            EvaluationsService.getEvaluations.mockResolvedValue(evaluations);

            const response = await request(app).get('/evaluations');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(evaluations);
            expect(EvaluationsService.getEvaluations).toHaveBeenCalled();
        });
    });

    describe('POST /evaluations', () => {
        it('should create a new evaluation', async () => {
            const newEvaluation = { name: 'New Evaluation' };
            EvaluationsService.createEvaluation.mockResolvedValue(newEvaluation);

            const response = await request(app).post('/evaluations').send(newEvaluation);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newEvaluation);
            expect(EvaluationsService.createEvaluation).toHaveBeenCalledWith(newEvaluation);
        });
    });

    // Additional tests for other CRUD operations can be added here
});