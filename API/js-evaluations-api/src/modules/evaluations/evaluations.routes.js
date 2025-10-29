import express from 'express';
import EvaluationsController from './evaluations.controller.js';

const router = express.Router();
const evaluationsController = new EvaluationsController();

// Routes for evaluations
router.post('/', evaluationsController.createEvaluation.bind(evaluationsController));
router.get('/', evaluationsController.getEvaluations.bind(evaluationsController));
router.get('/:id', evaluationsController.getEvaluationById.bind(evaluationsController));
router.put('/:id', evaluationsController.updateEvaluation.bind(evaluationsController));
router.delete('/:id', evaluationsController.deleteEvaluation.bind(evaluationsController));

export default router;