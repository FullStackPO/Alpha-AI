import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { ChatMistralAI } from '@langchain/mistralai'
import { AIMessage, HumanMessage, SystemMessage, tool, createAgent } from 'langchain'
import { searchInternet } from './internet.service.js'
import * as z from "zod"
import 'dotenv/config'

const geminiModel = new ChatGoogleGenerativeAI({
    model : 'gemini-flash-latest',
    apiKey : process.env.GEMINI_API_KEY
})

const mistralModel = new ChatMistralAI({
    model : "mistral-small-latest",
    apiKey : process.env.MISTRAL_API_KEY
})

const searchInternetTool = tool(
    searchInternet,
    {
        name : "searchInternet",
        description : "Use this tool to get the latest information from the internet",
        schema : z.object({
            query : z.string().describe("The search query to look up on the internet.")
        })
    }
)

const agent = createAgent({ 
    model : mistralModel,
    tools : [ searchInternetTool ]
})



export const generateResponse = async( message ) => {
    const response = await agent.invoke({
        messages : [
            new SystemMessage(`
                    You are a helpful and precise assistant for answering questions.
                    If you don't know the answer, say you don't know.
                    If the questions requires up-to-date information, use the "searchInternet" tool to get the
                    latest information from the internet and then answer based on the search results.
                `), 
            ...(message.map(msg=>{
        if(msg.role == "user"){
            return new HumanMessage(msg.content)
        }
        else if(msg.role == "ai"){
            return new AIMessage(msg.content)
        }
    }))]
})
    return response.messages[ response.messages.length - 1 ].text;
}

export const generateTitle = async(message) => {
    const response = await mistralModel.invoke([
        new SystemMessage(`generate a concise title of the message make it of 1-3 words`),
        new HumanMessage(`generate the title of the first message - ${message}`)
    ])
    return response.text
}

