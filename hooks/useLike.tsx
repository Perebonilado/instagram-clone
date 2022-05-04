import { doc, updateDoc, getDoc, setDoc, increment, serverTimestamp, deleteDoc } from "firebase/firestore";
import { db } from '../firebase'


const useLike = () => {

    const likePost = async (id: any, currentUser:any) => {

        // increment likes in db
        if(id){
            const docRef = doc(db, 'posts', id)
            updateDoc(docRef, {
                likes: increment(1)
            })     
        }

        // add the current user to the number of likers
        if(currentUser && id) {
            const likerRef = await setDoc(doc(db, 'posts', id, 'likedBy', currentUser.email),{
                id: currentUser.email,
                timestamp: serverTimestamp()
            })
        }


    }

    const unlikePost = async (id:any, currentUser:any) => {
        // decrement likes in db
        if(id){
            const docRef = doc(db, 'posts', id)
            updateDoc(docRef, {
                likes: increment(-1)
            })     
        }

        // remove current user from likers
        if(id && currentUser) {
            await deleteDoc(doc(db, 'posts', id, 'likedBy', currentUser.email))
                    .then(()=>{
                        console.log('deleted liker')
                    })
                    .catch((err)=>{
                        console.error(err)
                    })
        }
    }

    // check if user liked the post on load
    const checkLiked = async (id:any, currentUser: any, setIsliked:any) => {
        // if the user exists in the likedBy then the post should be liked on load
        
            const docRef = doc(db, 'posts', id, 'likedBy', currentUser.email)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setIsliked(true)
            }
            // else its false by default 
        

    }



    return { likePost, unlikePost, checkLiked }

}

export default useLike