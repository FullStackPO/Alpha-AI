import { generateResponse } from "../services/ai.service.js"
import { generateTitle } from "../services/ai.service.js"

export async function sendMessage( req, res, next ){

  try {
    const { message } = req.body

    const response = await generateResponse(message)

    const title = await generateTitle(message)

    res.status(201).json({
       success : true,
       message : "message from user",
       AI_message : {
            title : title,
            response : response
       } 
    })

  } 
  catch (err) {
    next(err)
  }

}