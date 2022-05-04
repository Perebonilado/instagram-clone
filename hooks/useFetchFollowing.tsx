import { useState } from 'react'
import {getDoc ,doc, query, where, collection, getDocs } from "firebase/firestore";  
import { db } from '../firebase'

const useFetchFollowing = () => {

    const [ following, setFollowing ] = useState<any>([])
    let followingArr:any=[]

    // check if the followers doc exists, if it does then get all the ids of the followers
    // and fetch the followers based on the ids of the followers gotten
    const checkFollowingDocAndFetch = async (currentUser:any) => {
        const userRef = doc(db, 'users', currentUser?.email, 'social', 'following')
        const docSnap = await getDoc(userRef)

        if (docSnap.exists()) {
            FetchFollowers(docSnap.data()?.following).catch((error)=>{
                console.error(error)
            })
        } else {
         // doc.data() will be undefined in this case
            
        }
    }

    // function to fetch followers based on followers that exist in followers array in the db
    const FetchFollowers = async (arr:any) => {

    const userRef = collection(db, 'users')
    const q = query(userRef, where('email', 'in', arr))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
     followingArr.push(doc.data()?.email)
    })
    setFollowing(followingArr)
    }


    return { following, checkFollowingDocAndFetch }

}

export default useFetchFollowing
