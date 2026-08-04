import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './App.routes'

const App = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
