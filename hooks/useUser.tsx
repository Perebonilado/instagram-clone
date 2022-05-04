import React, { useEffect, useState } from "react"
import { getAuth, getRedirectResult } from "firebase/auth";
import { app } from '../firebase'
import { AppContext, AppTypes } from '../context/AppContext'


const useUser = ({enabled=false}) => {
    
    const auth = app && getAuth()
    const { token, setToken } = React.useContext(AppContext) as AppTypes

    const [ loading, setLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<boolean>(false)

    const fetchUser = () => {

        const existingToken = localStorage.getItem('token')
        if(existingToken) {
            setToken(JSON.parse(existingToken))
        }
        
        else{
            setLoading(true)
            getRedirectResult(auth)
            .then((result) => {

             // The signed-in user info.
            if(result?.user) {
                setLoading(false)
                setToken(result?.user)
                localStorage.setItem('token', JSON.stringify(result?.user))
            }
    
            })
            .catch((error:any) => {
        
                const errorMessage = error.message;
        
            });
        }
    }

    useEffect(()=>{
        if(enabled) fetchUser()
    },[enabled])

    return { loading, error, fetchUser }
}

export default useUser