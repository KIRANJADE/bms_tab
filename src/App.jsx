// import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Import global styles
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
