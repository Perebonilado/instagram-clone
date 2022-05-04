import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { app } from '../firebase'
import { AppContext, AppTypes } from '../context/AppContext'

const useSignOut = () => {
    const auth = app && getAuth()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<boolean>(false)
    const { token, setToken } = React.useContext(AppContext) as AppTypes
    
    const handleSignOut = () => {
        setLoading(true)
        signOut(auth)
        .then(() => {
            setLoading(false)
            localStorage.removeItem('token')
            setToken(null)
          }).catch((error) => {
            
          });
    }

    return { loading, error, handleSignOut}

}

export default useSignOut