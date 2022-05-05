import { collection, getDoc, getDocs, query, limit, doc } from "firebase/firestore";
import { useState } from 'react'
import { db } from "../firebase";

const useFetchComments = () => {

    const [ commentSnippets, setCommentSnippets ] = useState<any>(null)
    
    // function to fetch just two comments to display on each post
    const fetchCommentSnippets =  async (id:any) => {
        
            const commentsArray:any = [] //an array of the pure comments

            // fetch the comments for each post
            const q = query(collection(db, 'posts', id, 'comments'), limit(2))
            const querySnapshot = await getDocs(q)

            querySnapshot.forEach((docSnap)=>{
                let newItem:any = {id: docSnap.id, ...docSnap.data()}
                commentsArray.push(newItem)
            })

            // initialize a new array to push comments with users
            let commentsWithUsersArr:any = []

            if(commentsArray.length){
                for (let i = 0; i < commentsArray.length; i++) {
                    // for each comment, fetch the user, mutate the data and push into commentsWithUsersArr
                    let userDataAdded = await getDoc(doc(db, 'users', commentsArray[i].senderID))
                    if(userDataAdded.exists()){
                        commentsWithUsersArr.push({...commentsArray[i], userData: userDataAdded.data()})
                    }
                    
                }
            }

            setCommentSnippets(commentsWithUsersArr)

    }
    

    return { commentSnippets, fetchCommentSnippets, }

}

export default useFetchComments