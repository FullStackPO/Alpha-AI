import React, { useState } from 'react'
import { Link } from 'react-router'

const Register = () => {

  const[username, setUsername] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <div className='min-h-screen flex items-center justify-center'>

      <form
      className='flex flex-col border-2 border-amber-50 pt-10 pb-10 pr-18 pl-18 rounded-xl gap-5 transition hover:scale-102' 
      onSubmit={submitHandler}>

        <h1 className='text-center text-4xl font-bold'>Regsiter</h1>

        <div className='flex flex-col gap-2'>
          <label htmlFor="username"
          className='font-semibold text-lg'>Username</label>
          <input
          className='border-2 rounded-sm p-2' 
          type='text' 
          id='username'
          name='username'
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
          placeholder='Enter username'
          required
          />
        </div>

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

        <p>Already have an account ? <Link to='/login' className='text-blue-600'>Login</Link></p>

      </form>
    </div>
    </div>
  )
}

export default Register
