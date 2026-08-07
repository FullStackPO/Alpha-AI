import { Router } from 'express'
import identifyUser from '../middleware/identifyUser.middleware.js'
import { sendMessage } from '../controller/chat.controller.js'

const chatRouter = Router()

chatRouter.post('/message', identifyUser, sendMessage)

export default chatRouter