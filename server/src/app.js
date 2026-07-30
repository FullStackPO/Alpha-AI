import express from 'express'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import handleError from './middleware/error.middleware.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

console.log("app.JS IS RUNNING");

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use('/api/auth', authRouter)

app.use(handleError)

export default app