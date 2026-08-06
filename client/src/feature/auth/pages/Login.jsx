import React, { useState } from 'react'
import { Link, Navigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const Login = () => {

  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  const { loginHandler } = useAuth()
  const navigate = useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault()

    const payload = {
      email,
      password
    }

    await loginHandler(payload)
    navigate("/")

  }

  if(!loading && user){
    return <Navigate to='/' replace />
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>

      <form
      className='flex flex-col border-2 border-amber-50 pt-10 pb-10 pr-15 pl-15 rounded-xl gap-5 transition hover:scale-102' 
      onSubmit={submitHandler}>

        <h1 className='text-center text-4xl font-bold'>Login</h1>

        <div className='flex flex-col gap-2'>
          <label htmlFor="email"
          className='font-semibold text-lg'>Email</label>
          <input
          className='border-2 rounded-sm p-2' 
          type='text' 
          id='email'
          name='email'
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          placeholder='Enter email'
          required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="password"
          className='font-semibold text-lg'>Password</label>
          <input 
          className='border-2 rounded-sm p-2' 
          type="password"
          id='password'
          name='password'
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}} 
          placeholder='Enter password'
          required
          />
        </div>

        <button className='w-full bg-green-500 transition hover:bg-green-600 p-2 rounded-lg font-bold'>Login</button>

        <p>Don't have an account ? <Link to='/register' className='text-blue-600'>Register</Link></p>

      </form>
    </div>
  )
}

export default Login
