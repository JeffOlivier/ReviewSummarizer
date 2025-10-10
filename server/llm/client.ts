import { Ollama } from 'ollama';
import OpenAI from 'openai';
import { InferenceClient } from '@huggingface/inference';
import summarizePrompt from './prompts/summarize-reviews-llama.txt';

const openAiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

const ollamaClient = new Ollama();

export const llmClient = {
    async summarizeReviews(reviews: string) {
        // const chatCompletion = await inferenceClient.chatCompletion({
        //     provider: 'nebius',
        //     model: 'meta-llama/Llama-3.1-8B-Instruct',
        //     messages: [
        //         {
        //             role: 'system',
        //             content: summarizePrompt,
        //         },
        //         {
        //             role: 'user',
        //             content: reviews,
        //         },
        //     ],
        // });

        // return chatCompletion.choices[0]?.message.content || '';

        const response = await ollamaClient.chat({
            model: 'tinyllama',
            messages: [
                {
                    role: 'system',
                    content: summarizePrompt,
                },
                {
                    role: 'user',
                    content: reviews,
                },
            ],
        });

        return response.message.content || '';
    },
};
