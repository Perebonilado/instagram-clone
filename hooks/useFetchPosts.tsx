import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from '../firebase'

const useFetchPosts = () => {

    const [ posts, setPosts ] = useState<any>([])
    let allPosts:any = []

    const getPosts = async (searchedUser: any) => {
        const ref = query(collection(db, 'posts'), where('postedBy', 'in', [searchedUser?.email]))
        const querySnapshot = await getDocs(ref)
        querySnapshot.forEach((doc) => {
        
            allPosts.push({...doc.data(), id: doc.id, displayPicture: searchedUser?.displayPicture, username: searchedUser?.username})

            setPosts(allPosts)
        });
    }

    return { posts, getPosts }
}

export default useFetchPosts