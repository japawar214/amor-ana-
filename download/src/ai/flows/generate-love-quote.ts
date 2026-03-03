'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating romantic love quotes.
 *
 * - generateLoveQuote - A function that triggers the love quote generation process.
 * - GenerateLoveQuoteInput - The input type for the generateLoveQuote function.
 * - GenerateLoveQuoteOutput - The return type for the generateLoveQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLoveQuoteInputSchema = z.object({});
export type GenerateLoveQuoteInput = z.infer<typeof GenerateLoveQuoteInputSchema>;

const GenerateLoveQuoteOutputSchema = z.object({
  quote: z.string().describe('A romantic love quote in Brazilian Portuguese.'),
});
export type GenerateLoveQuoteOutput = z.infer<typeof GenerateLoveQuoteOutputSchema>;

export async function generateLoveQuote(): Promise<GenerateLoveQuoteOutput> {
  return generateLoveQuoteFlow({});
}

const prompt = ai.definePrompt({
  name: 'generateLoveQuotePrompt',
  input: {schema: GenerateLoveQuoteInputSchema},
  output: {schema: GenerateLoveQuoteOutputSchema},
  system: 'Você é um poeta romântico especializado em frases curtas e impactantes sobre o amor e a conexão além da distância.',
  prompt: `Gere uma única citação de amor romântica em Português do Brasil. 
  Foque em temas como saudade, conexão, tempo e como o amor supera a distância física (milhares de quilômetros).
  Certifique-se de que a citação seja original, profunda e cheia de sentimento.`,
});

const generateLoveQuoteFlow = ai.defineFlow(
  {
    name: 'generateLoveQuoteFlow',
    inputSchema: GenerateLoveQuoteInputSchema,
    outputSchema: GenerateLoveQuoteOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("No output generated from prompt");
    }
    return output;
  }
);
