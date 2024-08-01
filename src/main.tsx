import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LoadingProvider } from './context/loadingContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ApiStatusProvider } from './context/apiSatus.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiStatusProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </ApiStatusProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
