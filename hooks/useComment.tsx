import { useEffect, useState } from "react"
import { collection, serverTimestamp, setDoc, doc, updateDoc, increment } from "firebase/firestore"; 
import { db } from "../firebase";

const useComment = () => {
    
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<any>(null)

    // send the comment
    const sendComment = (id:any, comment: string, senderID:string) => {
        
        setLoading(true)

        const commentRef = doc(collection(db, 'posts', id, 'comments'))
        const payload = {
            comment: comment,
            senderID: senderID,
            likes: 0,
            timestamp: serverTimestamp()
        }
        setDoc(commentRef, payload)
        .then(()=>{
            // increment the comment count
            incrementCommentCount(id)
        })
        .catch((error)=>{
            console.error(error)
            setLoading(false)
            setError(error)
        })

    }

    // increment the comment count on the post
    const incrementCommentCount = async (id:any) => {
        const postRef = doc(db, 'posts', id)
        updateDoc(postRef, {
            commentCount: increment(1)
        }).then(()=>{
            setLoading(false)

        }).catch((error)=>{
            console.error(error)
        })

    }

    

    useEffect(()=>{
        
        if(error) {
            setTimeout(()=>{setError(null)}, 5000)
        }

    },[error])

    return { sendComment, loading, error }

}

export default useComment