import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";

export async function registerController(req, res, next) {
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

        try {
            await sendEmail({
                to: email,
                subject: "Welcome to Alpha-AI",
                html: `
                    <p>Hello ${username},</p>
                    <p>Thanks for registering at <strong>Alpha-AI</strong>.</p>
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