import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' })


const client = new OpenAI({
  apiKey: process.env['OPEN_API_KEY'],
});

// Zero shot prompting
const completion = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { "role": "user", "content": "What is 2 + 2 * 0" }
  ], 
});

console.log(completion.choices[0].message.content);