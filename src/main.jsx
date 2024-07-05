import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 브라우저의 현재주소를 저장하고 감지하는 역할
  <BrowserRouter> 
    <App />
  </BrowserRouter>,
)
