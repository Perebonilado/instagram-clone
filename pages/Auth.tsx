import type { NextPage } from 'next'
import Button from '../components/Button'
import { app } from '../firebase'
import { getAuth, signInWithRedirect } from "firebase/auth";
import styles from './AuthStyles.module.css'
import GoogleProvider from '../Providers/GoogleProvider';
import useUser from '../hooks/useUser';
import React, { useEffect } from 'react';
import { AppContext, AppTypes } from '../context/AppContext';
import useSignOut from '../hooks/useSignOut';
import Loader from '../components/Loader';
import useCreateUser from '../hooks/useCreateUser';
import { useRouter } from "next/router";

const Auth: NextPage = () => {
    const { token, setToken, currentUser } = React.useContext(AppContext) as AppTypes
    const { CreateUser } = useCreateUser()
    const auth = app && getAuth()
    const user = useUser({enabled:true})
    const signOut = useSignOut()
    const router = useRouter()

    useEffect(()=>{
        if(token) {

            // handle create user
            CreateUser(token)
        }
    },[token])

    
    
    return (
        <main className={styles.container}>
            <div>
            <h1>Instagram</h1>
            {!token && <Button
            onClick={()=>{
                signInWithRedirect(auth, GoogleProvider)
                }} 
            text='Sign in with Google' />}
            {token && (signOut.loading===true ? <Loader /> : <Button text={'Sign out'} buttonType='link' onClick={signOut.handleSignOut}/>)}
            {token && <Button text='Proceed to home page' style={{marginTop:'1rem'}} onClick={()=>router.push('/')}/>}
            </div>
        </main>
    )
}

export default Auth
