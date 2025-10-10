import dayjs from 'dayjs';
import { PrismaClient, type Review } from '../generated/prisma';

const prisma = new PrismaClient();

export const reviewRepository = {
    async getReviews(productId: number, limit?: number): Promise<Review[]> {
        // At runtime, Prisma will generate a SQL query like this:
        // SELECT * FROM reviews WHERE productId = @productId ORDER BY createdAt DESC;
        // This is the benefit with using an ORM like Prisma, we don't have to write raw SQL queries.
        /*
            const reviews = await prisma.review.findMany({
                where: { productId },
                orderBy: { createdAt: 'desc' },
            });
            return reviews;
    */
        // We can combine the above together and make it even simpler:
        return prisma.review.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    },

    storeReviewSummary(productId: number, summary: string) {
        const now = new Date();
        const expiresAt = dayjs().add(7, 'days').toDate();
        const data = {
            content: summary,
            expiresAt,
            generatedAt: now,
            productId,
        };

        return prisma.summary.upsert({
            where: { productId },
            create: data,
            update: data,
        });
    },

    async getReviewSummary(productId: number): Promise<string | null> {
        const summary = await prisma.summary.findFirst({
            where: { AND: [{ productId }, { expiresAt: { gt: new Date() } }] },
        });

        return summary ? summary.content : null;
    },
};
