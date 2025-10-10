import express from 'express';
import { reviewController } from './controllers/review.controller';

const router = express.Router();

// Health check
router.get('/api/health', (_req, res) =>
    res.json({ ok: true, time: new Date().toISOString() })
);

// Reviews
router.get('/api/products/:id/reviews', reviewController.getReviews);
router.post(
    '/api/products/:id/reviews/summarize',
    reviewController.summarizeReviews
);

export default router;
