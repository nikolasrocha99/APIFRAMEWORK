const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/db/client');

describe('Evaluations Integration Tests', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a new evaluation', async () => {
        const response = await request(app)
            .post('/api/evaluations')
            .send({
                title: 'Test Evaluation',
                description: 'This is a test evaluation',
                score: 85
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Evaluation');
    });

    it('should retrieve all evaluations', async () => {
        const response = await request(app).get('/api/evaluations');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve a single evaluation by ID', async () => {
        const createResponse = await request(app)
            .post('/api/evaluations')
            .send({
                title: 'Another Evaluation',
                description: 'This is another test evaluation',
                score: 90
            });
        const evaluationId = createResponse.body.id;

        const response = await request(app).get(`/api/evaluations/${evaluationId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', evaluationId);
    });

    it('should update an evaluation', async () => {
        const createResponse = await request(app)
            .post('/api/evaluations')
            .send({
                title: 'Update Evaluation',
                description: 'This evaluation will be updated',
                score: 75
            });
        const evaluationId = createResponse.body.id;

        const response = await request(app)
            .put(`/api/evaluations/${evaluationId}`)
            .send({
                title: 'Updated Evaluation',
                description: 'This evaluation has been updated',
                score: 95
            });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Evaluation');
    });

    it('should delete an evaluation', async () => {
        const createResponse = await request(app)
            .post('/api/evaluations')
            .send({
                title: 'Delete Evaluation',
                description: 'This evaluation will be deleted',
                score: 60
            });
        const evaluationId = createResponse.body.id;

        const response = await request(app).delete(`/api/evaluations/${evaluationId}`);
        expect(response.status).toBe(204);
    });
});