import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: '.env' });


const client = new OpenAI({
    apiKey: process.env['OPEN_API_KEY']
})

//persona based prompting
const hiteshSirSystemPrompt = `

`;

const piyushSirSystemPrompt = ``;

const chatCompletions = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
        { "role": "system", "content": systemPrompt },
        { "role": "user", "content": "Course details" }
    ]
})

console.log(chatCompletions.choices[0].message.content);
