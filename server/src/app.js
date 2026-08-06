import express from 'express'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import handleError from './middleware/error.middleware.js'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(morgan("dev"))

app.use('/api/auth', authRouter)

app.use(handleError)

export default app