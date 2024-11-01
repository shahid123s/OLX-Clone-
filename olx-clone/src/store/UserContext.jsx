import {  createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase-config";

const UserContext = createContext();


export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);


    useEffect(()=> {
        const unSubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if(firebaseUser) {
                setUser(firebaseUser);
            }else {
                setUser(null);
            }
        })
    
        return () => unSubscribe()
    }, []);

    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};


export default UserContext;
