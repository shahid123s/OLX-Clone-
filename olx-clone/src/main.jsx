import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  { UserProvider } from './store/UserContext.jsx'
import { ProductProvider } from './store/ProductContext.jsx'
 './store/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <UserProvider>
    <ProductProvider>
     <App />
    </ProductProvider>
  </UserProvider>

  </StrictMode>
)
