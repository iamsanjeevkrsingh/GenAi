import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' })


const client = new OpenAI({
  apiKey: process.env['OPEN_API_KEY'],
});

//chain of thoughts prompting
const systemPrompt = `
You are an ai assistant who is expert in breaking down complex problems then resolve the user query.

For the given user input, analyse the input and break down the problem step by step.
Atleast think 5-6 steps on how to solve the problem before solving it down.

The steps are you get a user input, you analyse, you think, you again think for several times and then return an output with explanation and then finally validate the output as well before giving final result.

Follow the steps in sequence that is "analyse", "think", "output", "validate" and finally "result".

Rules:
1. Follow the strict JSON output as per Output schema.
2. Always perform one step at a time and wait for next input.
3. Carefully analyze the user query.

Output Format:
{{ "step": "string", "content": "string" }}

Example:
Input: What is 2 + 2.
Output: {{ "step": "analyse", "content": "Alright! The user us intrested in maths query and he is asking a basic arithematic operation" }}
Output: {{ "step: "think", "content": "To perform the addtion i must go from left to right and add all the operands" }}
Output: {{ "step": "output", "content": "4" }}
Output: {{ "step": "validate", "content", "seems like 4 is correct ans for 2 + 2" }}
Output: {{ "step": "result", "content", "2 + 2 = 4 and that is calculated by adding all numbers" }}
`

const messages = [
    { "role": "system", "content": systemPrompt }
]

// const userQuery = "What is 2 + 10 * 4";
// const userQuery = "What is love?"
// const userQuery = "What came first egg or chicken?"
const userQuery = "What is greater ? 9.8 or 9.11"

let response;
while(true) {
    messages.push({ "role": "user", "content": userQuery })
    response = await client.chat.completions.create({
        model: 'gpt-4o',
        response_format: { "type": "json_object" },
        messages: messages
    })

    const paresedResponse = JSON.parse(response.choices[0].message.content);
    messages.push({ "role": "assistant", "content": JSON.stringify(paresedResponse) })

    if(paresedResponse['step'] !== 'output') {
        console.log("RESPONSE: ", paresedResponse);
        continue;
    }

    console.log("Final response: ", paresedResponse);
    break;
}