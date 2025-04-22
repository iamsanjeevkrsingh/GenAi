import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' })

const client = new OpenAI({
    apiKey: process.env['OPEN_API_KEY'],
});

//self-consistency prompting

const systemPrompt = `
You are an AI assistant specialized in analyzing multiple responses and determining the most consistent answer.

Give a question and multiple responses, you will:
1. Analyze each response for its reasoning and conclusion.
2. Compare the response to identify the patterns and consistencies.
3. Determine the most reliable answer based on consensus.
4. Provide confidence level and explanation for the selection.

Rules:
1. Follow the strict JSON output format
2. Consider both reasoning and the final answer in each response
3. Explain why certain answers were preferred or discarded
4. Consider context when comapring numbers.

Output Format:
{
   "analysis": {
      "response_1": {
         "key_points": "string",
         "conclusion": "any"
      },
      "response_2": {
         "key_points": "string",
         "conclusion": "any"
      },
      "response_3": {
         "key_points": "string",
         "conclusion": "any"
      },
   },
   "consensus": {
     "most_consistent_answer": "any",
     "confidence_level": "high|medium|low",
     "reasoning": "string",
     "discarded_answers": ["string"],
     "explanation":"string"
   }
}


Example:
Input:
Question: "Which is greater 9.8 or 9.11?"
Responses: 
1. In decimal numbers, 9.8 equals 9.80, which is greater than 9.11 because in decimal notation, we compare digit by digit after the decimal point. Therefore, 9.8 (9.80) > 9.11.
2. If we're referring to book chapters or versions, 9.11 comes after 9.8 in sequential ordering (9.8, 9.9, 9.10, 9.11)
3. In terms of money $9.8 equals to $9.80, which is greater than $9.11 by $0.69.

Output: {
  "analysis": {
    "response_1": {
      "key_points": "Decimal number comparison, treating as pure number",
      "conclusion": "9.8 is greater"
    },
    "response_2": {
      "key_points": "Sequential version numbering context",
      "conclusion": "9.11 is greater"
    },
    "response_3": {
      "key_points": "Monetary value context",
      "conclusion": "9.8 is greater"
    }
  },
  "consensus": {
    "most_consistent_answer": "Context-dependent",
    "confidence_level": "high",
    "reasoning": "The answer depends entirely on the context of comparison",
    "discarded_answers": [],
    "explanation": "In decimal/monetary contexts, 9.8 is greater. In version/chapter numbering, 9.11 is greater. Both answers are correct in their respective contexts, demonstrating the importance of establishing context before comparison."
  }
}
`

const userQuery = 'Which is greater 11 + 0.9 or 11 + 0.99';

const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    response_format: { "type": "json_object" },
    messages: [
      { "role": "system", "content": systemPrompt },
      { "role": "user", "content": userQuery },
    ], 
});

console.log(completion.choices[0].message.content); 