import { initializeSocketConnection } from '../service/socket.service'
import { useDispatch } from 'react-redux'
import { setChats, setcurrentChatId, setIsloading, setError, createNewChat, addNewMessage, addMessages } from '../chat.slice'
import { sendMessage, getChats, getMessages, deleteChat } from '../service/api.service'

export const useChat = () => {

    const dispatch = useDispatch()

    async function handleSendMessage({ message, chatId }) {
        dispatch(setIsloading(true))
        const data = await sendMessage({ message, chatId })
        const { chat, aiMessage } = data
        if (!chatId)
            dispatch(createNewChat({
                chatId: chat._id,
                title: chat.title,
            }))
        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: message,
            role: "user",
        }))
        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: aiMessage.content,
            role: aiMessage.role,
        }))
        dispatch(setcurrentChatId(chat._id))
    }

    async function handleGetChats(){
        try{
            dispatch(setIsloading(true))
            const data = await getChats()
            const { chats } = data
            dispatch(setChats(chats.reduce((acc, chat) => {
                acc[chat._id] = {
                    id : chat._id,
                    title : chat.title,
                    messages : [],
                    lastUpdated : chat.updateAt
                }
                return acc
            }, {})))
        }
        catch(err){
            dispatch(setError(err.message))
        }
        finally{
            dispatch(setIsloading(false))
        }
    }

    async function handleOpenChat(chatId) {
        const data = await getMessages(chatId)
        const { messages } = data

        const formattedMessages = messages.map(msg => ({
            content : msg.content,
            role : msg.role
        }))

        dispatch(addMessages({
            chatId,
            messages : formattedMessages,
        }))
        dispatch(setcurrentChatId(chatId))
    }



    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }

} 