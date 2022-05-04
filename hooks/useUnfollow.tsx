import { doc, updateDoc, arrayRemove, increment } from "firebase/firestore";
import { db } from '../firebase'


const useUnfollow = () => {

    const unfollow = async (currentUser: any, searchedUser: any, setIsFollowing: any) => {
        if(searchedUser && currentUser){
            unfollowSearchedUser(currentUser, searchedUser)
            updateSearchedUserFollowers(currentUser, searchedUser)

            // decrement current user following
            decrementFollowing(currentUser)

            // decrement searched users follower count
            decrementFollowers(searchedUser)
    
            // update the ui by setting isFollowing to false
            setIsFollowing(false)
        }

        
    }

    const unfollowSearchedUser = async (currentUser: any, searchedUser: any) => {
        // navigate to the current users following and remove the searched user
        const followingRef = doc(db, 'users', currentUser?.email, 'social', 'following')
        updateDoc(followingRef, {
            following: arrayRemove(searchedUser.email)
        }
        )
        .then(()=>{
            console.log('done')
        })

    }

    const updateSearchedUserFollowers = async (currentUser: any, searchedUser: any) => {
        // naviagate to the searched users db and remove the current user from following
        const followersRef = doc(db, 'users', searchedUser?.email, 'social', 'followers')
        updateDoc(followersRef, {
            followers: arrayRemove(currentUser?.email)
        }
        )
        .then(()=>{
            console.log('done')
        })
    }

    // decrement following count of current user

    const decrementFollowing = async (currentUser: any) => {
        const userRef = doc(db, 'users', currentUser?.email)

        await updateDoc(userRef, {
            followingCount: increment(-1)
        })
        .then(()=>{
            console.log('following decremented')
        })
    }

    // decrement follower count of searched and followed user
    const decrementFollowers = async (searchedUser:any) => {
        const userRef = doc(db, 'users', searchedUser?.email)
        await updateDoc(userRef, {
            followerCount: increment(-1)
        })
        .then(()=>{
            console.log('followers decremented')
        })
    }


    return { unfollow }

}

export default useUnfollow