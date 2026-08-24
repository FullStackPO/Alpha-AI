import { initializeSocketConnection } from '../service/socket.service'
import { useDispatch } from 'react-redux'
import { setChats, setcurrentChatId, setIsloading, setError } from '../chat.slice'
import { sendMessage, getChats, getMessages, deleteChat } from '../service/api.service'

export const useChat = () => {

    const dispatch = useDispatch()

    return {
        initializeSocketConnection,
    }

} 