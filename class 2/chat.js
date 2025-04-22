import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' })


const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
    
    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Explain why sky is blue?",
    });

    console.log(response.text);
  }
  
  main();