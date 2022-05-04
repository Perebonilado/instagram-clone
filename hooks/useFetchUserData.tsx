import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase'
import { AppContext, AppTypes } from '../context/AppContext'
import React, { useEffect, useState } from "react";

const useFetchUserData = () => {
    const { token } = React.useContext(AppContext) as AppTypes
    const [ user, setUser ] = useState<any>(null)

    const getUserData = async (token:any) => {
        const docRef = doc(db, "users", token?.email);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) setUser(docSnap.data())
    }

    useEffect(()=>{
        
        if(token && !user) getUserData(token)

    },[token])


    return { user }

}

export default useFetchUserData