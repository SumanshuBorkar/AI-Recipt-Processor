const { CohereClient } = require('cohere-ai');
require('dotenv').config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

async function extractReceiptData(text) {
  try {
    const truncatedText = text.substring(0, 4000);

    const response = await cohere.generate({
      model: 'command',
      prompt: `Extract receipt details from this text in JSON format with these keys: 
      merchant_name (string), 
      total_amount (number), 
      purchased_at (date string in ISO format),
      items (array of objects with quantity, description, price).

      Text: ${truncatedText}

      JSON:`,
      max_tokens: 500,
      temperature: 0.3,
      stop_sequences: ['\n\n'],
      return_likelihoods: 'NONE'
    });

    const jsonMatch = response.generations[0].text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in Cohere response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Cohere extraction failed:', error);
    throw new Error('Cohere processing failed');
  }
}

module.exports = { extractReceiptData };
