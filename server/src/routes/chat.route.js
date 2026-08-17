import { Router } from 'express'
import identifyUser from '../middleware/identifyUser.middleware.js'
import { getChats, getMessage, sendMessage, deleteChat } from '../controller/chat.controller.js'

const chatRouter = Router()

chatRouter.post('/message', identifyUser, sendMessage)

chatRouter.get('/', identifyUser, getChats)

chatRouter.get('/:chatId/messages', identifyUser, getMessage)

chatRouter.delete("/delete/:chatId", identifyUser, deleteChat)


export default chatRouter