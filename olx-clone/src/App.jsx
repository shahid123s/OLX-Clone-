import './App.css'
import Home from './pages/Home'
import SingInPage from './pages/SignIn'
import { Routes, BrowserRouter as Router , Route, useNavigate } from 'react-router-dom'
import Error from './pages/Error'
import ProductDetailPage from './pages/ProductDetailsPage'
import SellProductPage from './pages/SellProductPage'
import LoginPage from './pages/Login'


function App() {
    
   


 
    return (
        <div>
        <Router>
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/home" element={<Home  />} />
          <Route path="/signin" element={<SingInPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sell-product" element= {<SellProductPage/>}/>
          <Route path='/product/:productId' element= {<ProductDetailPage/>} />
          <Route path='*' element={ < Error/> }/>
        </Routes>
      </Router>
        </div>
    )
}

export default App
