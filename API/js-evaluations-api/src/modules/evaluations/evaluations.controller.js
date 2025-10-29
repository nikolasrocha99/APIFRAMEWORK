class EvaluationsController {
    constructor(evaluationsService) {
        this.evaluationsService = evaluationsService;
    }

    async createEvaluation(req, res) {
        try {
            const evaluation = await this.evaluationsService.create(req.body);
            res.status(201).json(evaluation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getEvaluations(req, res) {
        try {
            const evaluations = await this.evaluationsService.findAll();
            res.status(200).json(evaluations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getEvaluationById(req, res) {
        try {
            const evaluation = await this.evaluationsService.findById(req.params.id);
            if (!evaluation) {
                return res.status(404).json({ message: 'Evaluation not found' });
            }
            res.status(200).json(evaluation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateEvaluation(req, res) {
        try {
            const updatedEvaluation = await this.evaluationsService.update(req.params.id, req.body);
            if (!updatedEvaluation) {
                return res.status(404).json({ message: 'Evaluation not found' });
            }
            res.status(200).json(updatedEvaluation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteEvaluation(req, res) {
        try {
            const deleted = await this.evaluationsService.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Evaluation not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default EvaluationsController;