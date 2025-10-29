const request = require('supertest');
const app = require('../../src/app');
const { EvaluationsService } = require('../../src/modules/evaluations/evaluations.service');

jest.mock('../../src/modules/evaluations/evaluations.service');

describe('Evaluations API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /evaluations', () => {
        it('should return a list of evaluations', async () => {
            const evaluations = [{ id: 1, name: 'Evaluation 1' }];
            EvaluationsService.prototype.getEvaluations = jest.fn().mockResolvedValue(evaluations);

            const response = await request(app).get('/evaluations');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(evaluations);
            expect(EvaluationsService.prototype.getEvaluations).toHaveBeenCalled();
        });
    });

    describe('POST /evaluations', () => {
        it('should create a new evaluation', async () => {
            const newEvaluation = { name: 'New Evaluation' };
            EvaluationsService.prototype.createEvaluation = jest.fn().mockResolvedValue(newEvaluation);

            const response = await request(app).post('/evaluations').send(newEvaluation);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newEvaluation);
            expect(EvaluationsService.prototype.createEvaluation).toHaveBeenCalledWith(newEvaluation);
        });
    });

    describe('GET /evaluations/:id', () => {
        it('should return a single evaluation by ID', async () => {
            const evaluation = { id: 1, name: 'Evaluation 1' };
            EvaluationsService.prototype.getEvaluationById = jest.fn().mockResolvedValue(evaluation);

            const response = await request(app).get('/evaluations/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(evaluation);
            expect(EvaluationsService.prototype.getEvaluationById).toHaveBeenCalledWith(1);
        });
    });

    describe('PUT /evaluations/:id', () => {
        it('should update an evaluation', async () => {
            const updatedEvaluation = { id: 1, name: 'Updated Evaluation' };
            EvaluationsService.prototype.updateEvaluation = jest.fn().mockResolvedValue(updatedEvaluation);

            const response = await request(app).put('/evaluations/1').send(updatedEvaluation);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedEvaluation);
            expect(EvaluationsService.prototype.updateEvaluation).toHaveBeenCalledWith(1, updatedEvaluation);
        });
    });

    describe('DELETE /evaluations/:id', () => {
        it('should delete an evaluation', async () => {
            EvaluationsService.prototype.deleteEvaluation = jest.fn().mockResolvedValue();

            const response = await request(app).delete('/evaluations/1');

            expect(response.status).toBe(204);
            expect(EvaluationsService.prototype.deleteEvaluation).toHaveBeenCalledWith(1);
        });
    });
});