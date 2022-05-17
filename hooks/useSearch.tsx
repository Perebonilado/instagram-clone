import { collection, getDocs, query, where } from "firebase/firestore"
import { useState } from "react"
import { db } from "../firebase"

const useSearch = () => {

    const [ loading, setLoading ] = useState(false)
    const [ data, setData ] = useState<any>(null)
    let searchRes:any = []

    const search = async (value:string) => {
        
        searchRes = []
        setLoading(true)
        
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('username', '==', value))

        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc)=>{
            searchRes.push({id: doc.id, ...doc.data()})
        })

        if(searchRes.length) {
            setData(searchRes)
            setLoading(false)
        }
        setLoading(false)

    }


    return { search, loading, data, setData }

}


export default useSearch