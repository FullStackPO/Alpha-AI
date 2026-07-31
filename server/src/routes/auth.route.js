import { Router } from 'express'
import { getME, login, register, verifyEmail } from '../controller/auth.controller.js'
import { loginValidation, registerValidation } from '../validator/authValidation.js'
import identifyUser from '../middleware/identifyUser.middleware.js'

const authRouter = Router()

authRouter.post('/register',  registerValidation, register)

authRouter.post('/login', loginValidation, login)

authRouter.get('/verify-email', verifyEmail)

authRouter.get('/get-me', identifyUser, getME)

export default authRouter