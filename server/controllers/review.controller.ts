import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRespository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

// This is ONLY the logic for handling the HTTP requests
// The other part is handled in the service layer (review.service.ts)
export const reviewController = {
    async getReviews(req: Request, res: Response) {
        const productId = Number(req.params.id);

        if (isNaN(productId)) {
            res.status(400).json({ error: 'Invalid product ID.' });
            return;
        }

        const product = await productRespository.getProduct(productId);
        if (!product) {
            res.status(404).json({ error: 'Product does not exist.' });
            return;
        }

        const reviews = await reviewRepository.getReviews(productId, 10);
        const summary = await reviewRepository.getReviewSummary(productId);

        res.json({
            summary,
            reviews,
        });
    },

    async summarizeReviews(req: Request, res: Response) {
        const productId = Number(req.params.id);

        if (isNaN(productId)) {
            res.status(400).json({ error: 'Invalid product ID.' });
            return;
        }

        const product = await productRespository.getProduct(productId);
        if (!product) {
            res.status(404).json({ error: 'Product not found.' });
            return;
        }

        const reviews = await reviewRepository.getReviews(productId, 1);
        if (reviews.length === 0) {
            res.status(404).json({
                error: 'There are no reviews to summarize for this product.',
            });
            return;
        }

        const summary = await reviewService.summarizeReviews(productId);
        res.json({ summary });
    },
};
