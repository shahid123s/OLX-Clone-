import { useState , useContext, useEffect} from "react";
import { auth, db } from "../../config/firebase-config";
import {setDoc, doc} from 'firebase/firestore'
import {createUserWithEmailAndPassword as userEmail , GoogleAuthProvider , signInWithEmailAndPassword}  from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import OlxLogo from "../../assets/olx-seeklogo.svg";
import UserContext from "../../store/UserContext";
import './signIn.css'

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error , setError] = useState(null);

    const {user,} = useContext(UserContext)

    const navigate =useNavigate()

    useEffect(() => {
        if(user){
            navigate('/')
        }
    },[user, navigate])


    const handleSignIn = async (event) => {
        event.preventDefault()
        try {
            const regex = /^[A-Za-z\s-]{2,}$/ 
            if(!regex.test(userName)){
                setError('Name should be Letter Space And Hyphens Not a Number and must be more than 2 words')
            } else {
                const userAuth = await userEmail(auth, email, password);

                await setDoc(doc(db, 'users', userAuth.user.uid), {
                    uid: userAuth.user.uid,
                    email: email,
                    username : userName,
                    createdAt : new Date()
                })
                navigate('/login')
            }
        } catch (error) {
            console.log(error.message);
            if(error.message == 'Firebase: Error (auth/email-already-in-use).') {
                setError('Email is already exists')
            }else if(error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
                setError('Password should be at least 6 characters ')
            }
            else if(error.message == 'Firebase: Error (auth/invalid-email).'){
                setError('Invalid Email ')
            }
            else {
                setError(error.message)
            }
            
        }   
    }

    const handleOnChange = (event) =>{
        const {name, value} = event.target;

        event.preventDefault();
        if(name== 'username'){
            setUserName(value);
        } else if(name == 'email'){
            setEmail(value)
        } else if(name == 'password'){
            setPassword(value)
        }
    }

    return (
        <div className="signIn-page">
            <div className="signIn-box">
                <div className="content">
                    <img src={OlxLogo} alt="" />
                    {error && <p color="red" className="error">{error}</p>}
                    <form action="" onSubmit={handleSignIn}>
                        <input type="text" 
                        name="username" 
                        id="username" 
                        onChange={handleOnChange} 
                        placeholder="Name.."/>
                        <input type="text" 
                        name="email" 
                        id="email" 
                        onChange={handleOnChange} 
                        placeholder="Email.."/>
                        <input type="text" 
                        name="password" 
                        id="password" 
                        onChange={handleOnChange} 
                        placeholder="Password...."/>
                        <input type="submit" value="Sign In" />
                    </form>
                    <a href="/login" className="redirect-link">Already have Account?....</a>
                </div>
            </div>
        </div>
        
    )

}


export default SignIn ;