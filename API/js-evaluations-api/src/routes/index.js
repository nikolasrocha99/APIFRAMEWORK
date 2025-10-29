import express from 'express';
import authRoutes from './auth.routes';
import evaluationsRoutes from './evaluations.routes';

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// Evaluations routes
router.use('/evaluations', evaluationsRoutes);

// Health check route
router.get('/', (req, res) => res.json({ ok: true, message: 'API running' }));

export default router;