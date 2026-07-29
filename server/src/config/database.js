import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

async function connectToDB(){
    
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to db`)   
    } 
    catch (error) {
        console.log(error)
    }

}

export default connectToDB