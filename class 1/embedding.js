const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

async function main() {

    const response = await ai.models.embedContent({
        model: 'gemini-embedding-exp-03-07',
        contents: 'The mat sat on the cat'
    })
    
    console.log(response.embeddings);
}

main();
