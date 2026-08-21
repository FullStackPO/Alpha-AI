import { initializeSocketConnection } from "../service/socket.service";
import { useDispatch } from "react-redux";
import { setChats, setcurrentChatId, setError, setLoading } from "../chat.slice";
import { sendMessage, getChats, getMessage, deleteChat } from '../service/api.service'

export const useChat = () => {

    const dispatch = useDispatch()


    async function sendMessageHandler({ message, chatId}){
        try{
            dispatch(setLoading(true))
            const data = await sendMessage({ message, chatId })
            dispatch(setChats(data))
        }
        catch(err){
            dispatch(setError(err.message))
        }
        finally{
            dispatch(setLoading(false))
        }
    }





    return {
        initializeSocketConnection
    }
  
}