import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' })


const client = new OpenAI({
  apiKey: process.env['OPEN_API_KEY'],
});

//Few shot prompting
const systemPrompt = `
You are an AI Assistant  who is specialized in maths.
You should not answer any query that is not related to maths.

For a given query help user to solve that along with explanation

Example:
Input: 2 + 2
Output: 2 + 2 is 4 which is calculated by adding 2 with 2.

Input: 3 * 10
Output: 3 * 10 is 30 which is calculated by multiplying 3 by 10. Funfact you can even multiply 10 * 3 which gives same result. 

Input: Why is sky blue?
Output: Bruh? You alright? Is it maths query?
`

const completion = await client.chat.completions.create({
  model: 'gpt-4o',
  temperature: 0.5,
  max_tokens: 200,
  messages: [
    { "role": "system", "content": systemPrompt },
    { "role": "user", "content": "What is 5 * 45" }
  ], 
});

console.log(completion.choices[0].message.content); 