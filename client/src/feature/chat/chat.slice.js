import { createSlice, current } from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name : 'chat',
    initialState : {
        chats : {},
        currentChatId : null,
        isLoading : false,
        error : null
    },
    reducers : {
        setChats : (state, action) => {
            state.data = action.payload
        },
        setcurrentChatId : (state, action) => {
            state.currentChatId = action.payload
        },
        setIsloading : (state, action) => {
            state.isLoading = action.payload
        },
        setError : (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setChats, setcurrentChatId, setIsloading, setError } = chatSlice.actions
export default chatSlice.reducer