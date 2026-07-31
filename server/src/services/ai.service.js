import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import dotenv from 'dotenv'
dotenv.config()

const geminiModel = new ChatGoogleGenerativeAI({
    model : 'gemini-flash-latest',
    apiKey : process.env.GEMINI_API_KEY
})
