import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from '../firebase'
import { joinString } from "../utils/Helpers";
import React from "react";
import { AppContext, AppTypes } from "../context/AppContext";
import { useRouter } from "next/router";

const useCreateUser = () => {

    const router = useRouter()
    
    const { token, setToken, currentUser } = React.useContext(AppContext) as AppTypes

    const CreateUser = async (token:any) => {
        // Check whether with these details exists in the online db, if not
        // create the user before any redirecting
        const docRef = doc(db, 'users', token?.email)
        const docSnap = await getDoc(docRef) 

        // check if the user exists
        if (docSnap.exists()) {
            setToken(token)
          } else {
            // doc.data() will be undefined in this case 
            // so create the user, then redirect
            const addUser = async () => {
                const addDocRef = await setDoc(doc(db, 'users', token?.email),{
                    username: joinString(token?.displayName),
                    email: token?.email,
                    displayPicture: token?.photoURL,
                    followerCount: 0,
                    followingCount: 0,
                    createdAt: serverTimestamp()
                })
            }
            
            addUser()
            .then(()=>{
                setToken(token)
            })
            
          }
    }

    return { CreateUser }

}

export default useCreateUser