import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { posts as postConst } from '../utils/constants'
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../firebase'

import CardContainer from '../components/CardContainer'
import StoryContainer from '../components/StoryContainer'
import Navbar from '../components/Navbar'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AppContext, AppTypes } from '../context/AppContext';
import useFetchUserData from '../hooks/useFetchUserData'
import useFetchFollowing from '../hooks/useFetchFollowing';

import { faCoffee, faHeart, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Home: NextPage = () => {
  
  const router = useRouter()
  const { token, setCurrentUser, currentUser } = React.useContext(AppContext) as AppTypes
  const user = useFetchUserData()
  const { following, checkFollowingDocAndFetch } = useFetchFollowing()
  const [ feed, setFeed ] = useState<any>([])
  

  // redirect if user is not logged in
  useEffect(()=>{
    localStorage.getItem('token') === null && router.push('/Auth')
  },[])

  // set the current user globally
  // get users followings
  useEffect(()=>{
    setCurrentUser(user?.user)
    if(user?.user) checkFollowingDocAndFetch(user?.user)
  },[user?.user])

  
  // listen for changes and fetch
  useEffect(()=>{
      let unsub:any

      if(following && currentUser){
        const q = query(collection(db, 'posts'), where('postedBy', 'in', [...following, currentUser?.email]), orderBy('timestamp', 'desc'))
        unsub = onSnapshot(q, (querySnapShot)=>{
          const feedArr:any= []
          querySnapShot.forEach((doc)=>{
            feedArr.push({...doc.data(), id: doc.id})
          })
          
          setFeed(feedArr)
        })
        
      }

      return ()=>{unsub}
  },[following, currentUser])


    
  if ( token === null) return <></>

  return (
    <>
    <Navbar profilePic={currentUser?.displayPicture}/>
    <div className={styles.container}>
      <StoryContainer posts={postConst}/>
      <CardContainer posts={feed}/>
    </div>
    </>
  )
}

export default Home
