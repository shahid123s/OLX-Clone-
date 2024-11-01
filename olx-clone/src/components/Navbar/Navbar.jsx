import OlxLogo from '../../assets/Olx_logo'
import Select from 'react-select'
import Search from './navbar-components/Sreach'
import SellButton from '../../assets/SellButton'
import SellButtonPlus from '../../assets/SellPlusButton'
import './navbar.css'
import { useState , useContext, useCallback} from 'react'
import UserContext from '../../store/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'
import { useNavigate } from 'react-router-dom'


const Navbar = () =>  {

    const navigate = useNavigate()

    const [selectedLanguage, setSelectedLanguage] = useState('english');

    const {user} = useContext(UserContext)

    const locationOptions = [
        { value: 'new-york', label: 'New York' },
        { value: 'los-angeles', label: 'Los Angeles' },
        { value: 'chicago', label: 'Chicago' },
        { value: 'houston', label: 'Houston' },
        { value: 'miami', label: 'Miami' }
      ];
    
      const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value)
      }

      const handleLogout = useCallback(async () => {
        try {
          await signOut(auth)
          navigate('/')
        } catch (error) {
          console.log(`error in logout ${error.message}`)
        }
      } , [auth, navigate])

      const handleSell = () => {
        navigate('/sell-product')
      }

    return (
       <nav className='navbar'>
            <OlxLogo></OlxLogo>
            <Select  className='options'
                options={locationOptions}
                isSearchable={true}
                placeholder ='Search Location'
            ></Select>
            <Search/>
            <select name="langugae" id="language" className=' language' value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="english">English</option>
                <option value="hindi">हिन्दी</option>
            </select>

            <div className="third-section">
            { user!== null?<a href="/home" className='link login' onClick={handleLogout}>Logout</a>:
              <a href="/login" className='link login'>Login</a>
            }
            <button className="sellMenu" onClick={ handleSell}>
            <SellButton></SellButton>
            <div className="sellMenuContent">
            <SellButtonPlus/>
            <span>SELL</span>
            </div>
            </button>
            </div>
            
       </nav>
    )
}

export default Navbar