import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { useState } from "react";
import { db } from '../firebase'

const useFetchPosts = () => {

    const [ posts, setPosts ] = useState<any>([])
    const [ loading, setLoading ] = useState<boolean>(false)
    let allPosts:any = []

    const getPosts = async (searchedUser: any) => {
        const ref = query(collection(db, 'posts'), where('postedBy', 'in', [searchedUser?.email]))
        const querySnapshot = await getDocs(ref)
        querySnapshot.forEach((doc) => {
        
            allPosts.push({...doc.data(), id: doc.id})

        });
        setPosts(allPosts)
    }

    const getLimitedPosts = async (userEmail:string) => {
        setLoading(true)
        const ref = query(collection(db, 'posts'), where('postedBy', '==', userEmail), limit(3))
        const querySnapshot = await getDocs(ref)
        querySnapshot.forEach((doc) => {
        
            allPosts.push({...doc.data()})

        });
        setPosts(allPosts)
        setLoading(false)
    }

    return { posts, getPosts, getLimitedPosts, loading }
}

export default useFetchPosts