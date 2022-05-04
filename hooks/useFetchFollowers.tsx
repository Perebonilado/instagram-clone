import { useState } from 'react'
import {getDoc ,doc, query, where, collection, getDocs } from "firebase/firestore";  
import { db } from '../firebase'

const useFetchFollowers = () => {

    const [ followers, setFollowers ] = useState<any>(null)
    let followersArr:any=[]

    // check if the followers doc exists, if it does then get all the ids of the followers
    // and fetch the followers based on the ids of the followers gotten
    const checkFollowerDocAndFetch = async (currentUser:any) => {
        const userRef = doc(db, 'users', currentUser?.email, 'social', 'followers')
        const docSnap = await getDoc(userRef)

        if (docSnap.exists()) {
            FetchFollowers(docSnap.data()?.followers)
        } else {
         // doc.data() will be undefined in this case
            setFollowers([])
        }
    }

    // function to fetch followers based on followers that exist in followers array in the db
    const FetchFollowers = async (arr:any) => {

    const userRef = collection(db, 'users')
    const q = query(userRef, where('email', 'in', arr))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
     followersArr.push(doc.data().email)
     setFollowers(followersArr)
    })
    }


    return { followers, checkFollowerDocAndFetch }

}

export default useFetchFollowers