import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { ChatMistralAI } from '@langchain/mistralai'
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import dotenv from 'dotenv'
dotenv.config()

const geminiModel = new ChatGoogleGenerativeAI({
    model : 'gemini-flash-latest',
    apiKey : process.env.GEMINI_API_KEY
})

const mistralModel = new ChatMistralAI({
    model : "mistral-small-latest",
    apiKey : process.env.MISTRAL_API_KEY
})

export const generateResponse = async( message ) => {
    const response = await geminiModel.invoke(message.map(msg=>{
        if(msg.role == "user"){
            return new HumanMessage(msg.content)
        }
        else if(msg.role == "ai"){
            return new AIMessage(msg.content)
        }
    }))
    return response.text
}

export const generateTitle = async(message) => {
    const response = await mistralModel.invoke([
        new SystemMessage(`generate a concise title of the message make it of 1-3 words`),
        new HumanMessage(`generate the title of the first message - ${message}`)
    ])
    return response.text
}

