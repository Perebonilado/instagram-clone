import { collection, getDoc, getDocs, query, limit, doc } from "firebase/firestore";
import { useState } from 'react'
import { db } from "../firebase";

const useFetchComments = () => {

    const [ comments, setComments ] = useState<any>(null)
    const boostedComments:{}[] = [] //an array of the comments after fetching each users data
    
    // function to fetch just two comments to display on each post
    const fetchComments = async (id:any) => {
        const commentsArray:any[] = [] //an array of the pure comments
        
        // fetch the comments for each post
        const q = query(collection(db, 'posts', id, 'comments'), limit(2))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async(docSnap)=>{
            let newItem:any = {id: docSnap.id, ...docSnap.data()}
            if(newItem.senderID){
                let userData = await getDoc(doc(db, 'users', newItem.senderID));
                if(userData.exists()){
                    newItem.userData = userData.data()
                }
                commentsArray.push(newItem)
            }
            
            setComments(commentsArray)
        })
    }
    

    return { comments, fetchComments }

}

export default useFetchComments