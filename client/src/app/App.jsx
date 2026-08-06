import React, { useEffect } from 'react'
import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './App.routes'
import { useAuth } from '../feature/auth/hook/useAuth'

const App = () => {

  const auth = useAuth()

  useEffect(() => {
    auth.getMeHandler()
  }, [])

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
