import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const productRespository = {
    getProduct(productId: number) {
        return prisma.product.findUnique({
            where: { id: productId },
        });
    },
};
