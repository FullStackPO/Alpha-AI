import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const identifyUser = (req, res, next) => {

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "Invalid Token",
            success : false,
            err : "Token not found"
        })
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        
        next()

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "Invalid token"
        })
    }

}

export default identifyUser