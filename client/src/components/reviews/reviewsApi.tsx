import axios from 'axios';

type Review = {
    id: number;
    author: string;
    content: string;
    rating: number;
    createdAt: string;
};

export type GetReviewsResponse = {
    summary: string | null;
    reviews: Review[];
};

export type SummarizeResponse = {
    summary: string;
};

export const reviewsApi = {
    fetchReviews(productId: number) {
        // const { data } = await axios.get<GetReviewsResponse>(
        //     `/api/products/${productId}/reviews`
        // );
        // return data;

        // A cleaner version of the above
        return axios
            .get<GetReviewsResponse>(`/api/products/${productId}/reviews`)
            .then((res) => res.data);
    },

    summarizeReviews(productId: number) {
        return axios
            .post<SummarizeResponse>(
                `/api/products/${productId}/reviews/summarize`
            )
            .then((res) => res.data);
    },
};
