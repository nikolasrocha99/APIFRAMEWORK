class EvaluationsService {
    constructor(evaluationsModel) {
        this.evaluationsModel = evaluationsModel;
    }

    async createEvaluation(data) {
        try {
            const evaluation = await this.evaluationsModel.create(data);
            return evaluation;
        } catch (error) {
            throw new Error('Error creating evaluation: ' + error.message);
        }
    }

    async getEvaluations() {
        try {
            const evaluations = await this.evaluationsModel.findAll();
            return evaluations;
        } catch (error) {
            throw new Error('Error fetching evaluations: ' + error.message);
        }
    }

    async getEvaluationById(id) {
        try {
            const evaluation = await this.evaluationsModel.findByPk(id);
            if (!evaluation) {
                throw new Error('Evaluation not found');
            }
            return evaluation;
        } catch (error) {
            throw new Error('Error fetching evaluation: ' + error.message);
        }
    }

    async updateEvaluation(id, data) {
        try {
            const evaluation = await this.evaluationsModel.findByPk(id);
            if (!evaluation) {
                throw new Error('Evaluation not found');
            }
            await evaluation.update(data);
            return evaluation;
        } catch (error) {
            throw new Error('Error updating evaluation: ' + error.message);
        }
    }

    async deleteEvaluation(id) {
        try {
            const evaluation = await this.evaluationsModel.findByPk(id);
            if (!evaluation) {
                throw new Error('Evaluation not found');
            }
            await evaluation.destroy();
            return { message: 'Evaluation deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting evaluation: ' + error.message);
        }
    }
}

export default EvaluationsService;