import { useDispatch } from 'react-redux'
import { register, login, getMe } from '../services/auth.api'
import { setError, setLoading, setUser } from '../auth.slice'


export function useAuth(){

    const dispatch = useDispatch()

    async function registerHandler({ username, email, password }){
        try{
            dispatch(setLoading(true))
            const data = await register({ username, email, password })
        }
        catch(err){
            dispatch(setError(err.response?.data?.message || "Registration Failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    async function loginHandler({ email, password }){
        try{
            dispatch(setLoading(true))
            const data = await login({ email, password })
            dispatch(setUser(data))
        }
        catch(err){
            dispatch(setError(err.response?.data?.message || " Login Failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    async function getMeHandler(){
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data))
        }
        catch(err){
            dispatch(setError(err.response?.data?.message || "getMe failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    return { registerHandler, loginHandler, getMeHandler }

}