import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export async function register(req, res, next) {
    try {
        const { username, email, password } = req.body;

        const isUserAlreadyExist = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserAlreadyExist) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this username or email."
            });
        }

        const user = await userModel.create({
            username,
            email,
            password
        });

        const emailVerificationToken = jwt.sign({
            email : user.email
        }, process.env.JWT_SECRET)

        try {
            await sendEmail({
                to: email,
                subject: "Welcome to Alpha-AI",
                html: `
                    <p>Hello ${username},</p>
                    <p>Thanks for registering at <strong>Alpha-AI</strong>.</p>
                    <p>Click on the link below for verification</p>
                    <a href = "http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify me now</a>
                    <p>Ignore if you don't create an account.</p>
                    <p>Best Regards,<br>Alpha-AI Team</p>
                `
            });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
        }

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        next(err);
    }
}

export async function verifyEmail(req, res, next) {

    const { token } = req.query

    try{

        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({ email : decoded.email })

        if(!user){
            return res.status(404).json({
                message : "Invalid Token",
                success : false,
                err : 'user not found'
            })
        }

        user.verified = true

        await user.save()

        const html = `
        <h1>Email verified successfully !</h1>
        <p>Your Email has been verified successfully. You can login into account</p>
        <a href="http://localhost:3000/login">Go to Login.</a>
        `

        res.send(html)

    }
    catch(err){
        err.status = 404
        err.message = "Invalid or Expired Token"
        success = false
        next(err)
    }
    
}

export async function getME(req, res, next) {

    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password")

    if(!user){
        return res.status(404).json({
            message : "user not found",
            success : false,
            err : "user not found"
        })
    }

    res.status(200).json({
        message : "Successfully - get user details",
        user
    })

}

export async function login(req, res, next) {

   try {
    
    const { email, password } = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message : "User Not Found",
            success : false,
            err : "User Not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch){
        return res.status(409).json({
            message : "Invalid or error in password",
            success : false,
            err : "Invalid Password"
        })
    }

    if(!user.verified){
        return res.status(400).json({
            message : "Email is not verified",
            success : false,
            err : "Email not verified"
        })
    }

    const token = jwt.sign({
        id : user.id,
        username : user.username,
        email : user.email
    }, process.env.JWT_SECRET, {expiresIn : '1d'})

    res.cookie("token", token)

    res.status(200).json({
        message : "Login successfully",
        user : {
            id : user.id,
            username : user.username,
            email : user.email
        }
    })

   } catch (err) {
        next(err)
   }

}