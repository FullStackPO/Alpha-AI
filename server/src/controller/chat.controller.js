import { generateResponse, generateTitle } from "../services/ai.service.js"
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"

export async function sendMessage(req, res, next) {
  console.log("🔥 sendMessage controller reached")

  try {
    const { message, chat: chatId } = req.body

    console.log("1️⃣ message:", message)
    console.log("2️⃣ chatId:", chatId)

    let title = null
    let chat = null

    if (!chatId) {
      console.log("3️⃣ Generating title...")

      title = await generateTitle(message)

      console.log("4️⃣ Title generated:", title)

      chat = await chatModel.create({
        user: req.user.id,
        title
      })

      console.log("5️⃣ Chat created:", chat._id)
    } else {
      console.log("3️⃣ Existing chat")

      chat = await chatModel.findById(chatId)

      console.log("4️⃣ Chat found:", chat?._id)
    }

    const userMessage = await messageModel.create({
      chat: chat._id,
      content: message,
      role: "user"
    })

    console.log("6️⃣ User message created")

    const messages = await messageModel.find({
      chat: chat._id
    })

    console.log("7️⃣ Messages fetched:", messages.length)

    console.log("8️⃣ Generating AI response...")

    const result = await generateResponse(messages)

    console.log("9️⃣ AI response generated")

    const aiMessage = await messageModel.create({
      chat: chat._id,
      content: result,
      role: "ai"
    })

    console.log("🔟 AI message saved")

    res.status(201).json({
      title: chat.title,
      chat,
      aiMessage
    })

  } catch (err) {
    console.log("❌ ERROR:", err)
    console.log("❌ ERROR MESSAGE:", err.message)
    console.log("❌ ERROR STATUS:", err.status)
    console.log("❌ ERROR RESPONSE:", err.response?.data)

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