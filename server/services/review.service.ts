// import { type Review } from '../generated/prisma';
import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';
// import template from '../llm/prompts/summarize-reviews.txt';

export const reviewService = {
    // Since there is not any business logic here, we can skip this method
    // and call the repository method directly from the controller.
    // (But in a real-world app, there would be more logic here.)
    // async getReviews(productId: number): Promise<Review[]> {
    //     return reviewRepository.getReviews(productId);
    // },

    async summarizeReviews(productId: number): Promise<string> {
        // First, check if we already have a summary for this productId
        const existingSummary =
            await reviewRepository.getReviewSummary(productId);
        if (existingSummary) {
            return existingSummary;
        }

        // Get the last 10 or 20 reviews for the given productId
        const reviews = await reviewRepository.getReviews(productId, 10);
        const joinedReviews = reviews
            .map((review) => review.content)
            .join('\n\n');

        const summary = await llmClient.summarizeReviews(joinedReviews);

        // const prompt = template.replace('{{reviews}}', joinedReviews);
        // const { text: summary } = await llmClient.generateText({
        //     prompt,
        //     maxTokens: 500,
        //     instructions:
        //         'Do not start the summary with "As an AI language model..." or "The customer reviews for ...".',
        // });

        await reviewRepository.storeReviewSummary(productId, summary);

        return summary;
    },
};
