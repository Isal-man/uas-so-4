import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'

// Components
import App from './App.jsx'

// CSS
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { FCFS, Home, PS, RRS, SJFS } from './pages/index.js'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/fcfs",
        element: <FCFS />
      },
      {
        path: "/ps",
        element: <PS/>
      },
      {
        path: "/rrs",
        element: <RRS />
      },
      {
        path: "/sjfs",
        element: <SJFS />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
