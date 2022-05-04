import { useState } from 'react'
import {getDoc ,doc, query, where, collection, getDocs } from "firebase/firestore";  
import { db } from '../firebase'

const useCheckFollowing = () => {

    const [ isFollowing, setIsFollowing ] = useState<any>(false)

    // function to check if the current user is following the searched user
    const checkFollowing = async (currentUser:any, searchedUser:any) => {

        const colRef = collection(db, 'users', currentUser?.email, 'social')
        const q = query(colRef, where('following', 'array-contains', searchedUser?.email))
        const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                
                // if the current user is following the searched user then update the following status
                setIsFollowing(true)
            });

    }


    return { checkFollowing, isFollowing, setIsFollowing }


}

export default useCheckFollowing