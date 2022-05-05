import { collection, query, where, getDocs } from "firebase/firestore";
import { doc } from "firebase/firestore";

import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import useFetchPosts from "../hooks/useFetchPosts";
import Bio from "../components/Bio";
import styles from './ProfileStyles.module.css'
import { AppContext, AppTypes } from '../context/AppContext';
import ProfileCardContainer from "../components/ProfileCardContainer";
import Navbar from "../components/Navbar";
import useFollow from "../hooks/useFollow";
import useFetchUserData from "../hooks/useFetchUserData";
import useFetchFollowers from '../hooks/useFetchFollowers'
import useFetchFollowing from "../hooks/useFetchFollowing";
import useCheckFollowing from "../hooks/useCheckFollowing";
import useUnfollow from "../hooks/useUnfollow";

const ProfilePage: NextPage = () => {
    
    const { setCurrentUser, currentUser } = React.useContext(AppContext) as AppTypes
    const [ searchedUser, setSearchedUser ] = useState<any>(null)

    // for visually increasing and decreasing the follower count 
    const [ followerCount, setFollowerCount ] = useState<any>(0)
    const [ followingCount, setFollowingCount ] = useState<any>(0)

    const router = useRouter()
    const { getPosts, posts } = useFetchPosts()
    const { handleFollow } = useFollow()
    const loggedinUser = useFetchUserData()
    const { followers, checkFollowerDocAndFetch } = useFetchFollowers()
    const { following, checkFollowingDocAndFetch} = useFetchFollowing()
    const { isFollowing, checkFollowing, setIsFollowing } = useCheckFollowing()
    const { unfollow } = useUnfollow()
    
    
    // getting the info of the searched user
    useEffect(()=>{
        
            const colRef = collection(db, 'users')
            if(router.query?.username){

                const q = query(colRef, where('username', '==', router.query?.username))
                
                const getUser = async () => {
                    const querySnapshot = await getDocs(q);
                        querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        setSearchedUser({...doc.data(), email: doc.id})
                    });
                }

                getUser()            
            }

        
    },[router.query?.username])


    // getting the posts of the searched user
    useEffect(()=>{
        if(searchedUser){
            // setFollower count
            setFollowerCount(searchedUser?.followerCount)

            // setFollowingCount
            setFollowingCount(searchedUser?.followingCount)

            // get posts
            getPosts(searchedUser)

            // get followers
            // checkFollowerDocAndFetch(searchedUser)

            // get following
            // checkFollowingDocAndFetch(searchedUser)
        }
    },[searchedUser])


    // set the current user globally
  useEffect(()=>{
    if(currentUser === null) setCurrentUser(loggedinUser?.user)
  },[loggedinUser?.user])

//   check if current user is following searched user on page load

  useEffect(()=>{
    // check if theres a current user and a searched user and ensure theyre not the same
    if(currentUser && searchedUser){
        if(currentUser.email !== searchedUser.email){
            checkFollowing(currentUser, searchedUser)
        }
    }

  },[currentUser, searchedUser])



    return (
        <>
        <Navbar profilePic={currentUser?.displayPicture}/>
        <main className={styles.container}>
            {currentUser && searchedUser && <Bio 
            postsNumber={posts?.length}
            imageUrl={searchedUser?.displayPicture}
            followers={followerCount}
            following={followingCount}
            username={searchedUser?.username}
            role={'Artiste'}
            bio={'Artiste && Developer'}
            website={'richard-portfolio-git-master-perebonilado.vercel.app'}
            searchedUser={searchedUser}
            currentUser={currentUser}
            handleFollow={()=>{
               handleFollow(currentUser, searchedUser?.email, setIsFollowing)
            //    visually increase following count
                setFollowerCount(followerCount + 1)
            }}
            handleUnfollow={()=>{
                unfollow(currentUser, searchedUser, setIsFollowing)
                // visually decrement follower count
                if(followerCount > 0){setFollowerCount(followerCount - 1)}
            }}
            isFollowing={isFollowing}
            />}

            <ProfileCardContainer posts={posts}/>
        </main>
        </>
    )
}

export default ProfilePage

