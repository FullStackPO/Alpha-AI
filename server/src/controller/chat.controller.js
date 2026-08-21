import { generateResponse, generateTitle } from "../services/ai.service.js"
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"

export async function sendMessage( req, res, next ){

  try {
    const { message , chat: chatId } = req.body

    let title = null, chat = null;

    if(!chatId){
      title = await generateTitle(message)
      chat = await chatModel.create({
        user : req.user.id,
        title
      })
    }

    const userMessage = await messageModel.create({
      chat : chatId || chat._id,
      content : message,
      role : "user"
    })

    const messages = await messageModel.find({ chat : chatId || chat._id })

    const result = await generateResponse(messages)

    const aiMessage = await messageModel.create({
      chat : chatId || chat._id,
      content : result,
      role : "ai"
    })

    res.status(201).json({
      title,
      chat,
      aiMessage  
    })

  } 

  catch (err) {
    next(err)
  }

}

export async function getChats(req, res, next){
  
  try {

    const user = req.user
    
    const chats = await chatModel.find({ user : user.id })
    
    res.status(200).json({
      message : "Chat retrives successfully",
      chats
  })

  } 
  catch (err) {
    next(err)  
  }

}

export async function getMessage(req, res, next){

  try {
    
    const { chatId } = req.params;

    const chat = await chatModel.findOne({
      _id : chatId,
      user : req.user.id
    })

    if(!chat){
      return res.status(404).json({
        message : "chat not found."
      })
    }

    const message = await messageModel.find({ chat : chatId })

    res.status(200).json({
      message : "message retrieved successfully",
      message
    })

  } 
  
  catch (error){
    next(error)
  }

}

export async function deleteChat(req, res, next){

  try {
    
    const chatId = req.params;

    const chat = await chatModel.findOneAndDelete({
      _id : chatId,
      user : req.user.id
    })

    await messageModel.deleteMany({
      chat: chatId
    })

    if(!chat){
      return res.status(404).json({
        message : "Chat not found"
      })
    }

    res.status(200).json({
      message : "Chat deleted Successfully"
    })

  } 
  catch (error) {
      next(error)
  }

}