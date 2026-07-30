import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        type : 'OAuth2',
        user : process.env.GOOGLE_USER,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        refreshToken : process.env.GOOGLE_REFRESH_TOKEN,
        clientId : process.env.GOOGLE_CLIENT_ID,
    }
})

transporter.verify((error, success) => {
    if(error){
        console.log(`error in connecting gmail server - ${error}`)
    }
    else{
        console.log(`connected to gmail server successfully.`)
    }
})

export async function sendEmail({to, subject, html, text}){

    const mailOptions = {
        from : process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }

    const details = await transporter.sendMail(mailOptions)
    console.log("Email sent", details)
}