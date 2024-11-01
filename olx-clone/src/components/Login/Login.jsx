import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth , db} from "../../config/firebase-config";
import { getDoc,doc } from "firebase/firestore";
import UserContext from "../../store/UserContext";
import OlxLogo from "../../assets/olx-seeklogo.svg";
import Spinner from "../Spinner/Spinner";
import './login.css'

const Login = () => {

    const {setUser, user} = useContext(UserContext)


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate('');


    useEffect(() => {
        if(user){
            navigate('/')
        }
    },[user, navigate])


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            
            setLoading(true)
            const userAuth = await signInWithEmailAndPassword(auth, email, password);
        
            const userId = userAuth.user.uid;

            const userDocRef = doc(db, 'users', userId);

            const userData = await getDoc(userDocRef);
            const userName = userData.data().username;

            

            setUser(userData.data());
            console.log(user)
            navigate('/')
            

        } catch (error) {
            console.log(error.message)
            if(error.message == 'Firebase: Error (auth/invalid-credential).'){
                setError('Invalid  Password')
                setLoading(false)
            }
            else if(error.message == 'Firebase: Error (auth/invalid-email).') {
                setError('Invalid Email')
                setLoading(false)

            }
            else {
                setError(error.message)
                setLoading(false)

            }
        }
    }

    
    const handleChange = (event) => {
        const {name, value} = event.target;
        if(name == 'email') setEmail(value);
        else if (name == 'password') setPassword(value);
     }

    return(
        <div className="login-page">
            <div className="login-box">
            {loading && <Spinner/>}
            {!loading && <div className="login-content">
                <img className='login-logo'src={OlxLogo} alt="" />
            {error && <p className="error">{error}</p>}
            
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="email"></label>
                <input type="text" name="email" id="email"  placeholder="Email..." onChange={handleChange}/>
                <label htmlFor="password"></label>
                <input type="text" name="password" id="password" placeholder="Password..."  onChange={handleChange}/>
                <input type="submit" value={'Login'} />
            </form>
            <a href="/signin" className="redirect-link">Register..!</a>
            </div>}
         </div>
        </div>
    )
}

export default Login;

