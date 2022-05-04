import { doc, updateDoc, arrayUnion, getDoc, setDoc, increment } from "firebase/firestore";
import { db } from '../firebase'

const useFollow = () => {

    
    const handleFollow = async (currentUser: any, searchedUserEmail: string, setIsFollowing: any) => {

            // create the reference and check if it exists in the db before following
            const followingRef = doc(db, 'users', currentUser?.email, 'social', 'following')
            const docSnap = await getDoc(followingRef)

            // if it exists then just update it by following
            if(docSnap.exists()){
                // follow the searched user
                followSearchedUser(followingRef, searchedUserEmail)

                // update searched users followers
                UpdateFollowedUser(currentUser, searchedUserEmail)

                //increment following of current user
                incrementFollowing(currentUser)

                //increment searched users followers
                incrementFollowers(searchedUserEmail)

                // update the ui 
                setIsFollowing(true)
            }
            else {
                // else create it then update it by following
                createDocAndAddFollower(followingRef, searchedUserEmail)

                // update searched users followers
                UpdateFollowedUser(currentUser, searchedUserEmail)

                //increment following of current user
                incrementFollowing(currentUser)

                //increment searched users followers
                incrementFollowers(searchedUserEmail)

                // update the ui 
                setIsFollowing(true)
            }
            
    }

    // function to update db with new follower info
    const followSearchedUser = (followingRef:any, searchedUserEmail:string) => {
        updateDoc(followingRef, {
            following: arrayUnion(searchedUserEmail)
        }
        )
        .then(()=>{
            console.log('done')
        })
    }

    // function to create and add follower to logged in users db
    const createDocAndAddFollower = async (ref:any, data:any) => {
        const addDocRef = await setDoc(ref, {
            following: arrayUnion(data)
        }).then(()=>{
            
        })

    }

    // increment following count of current user

    const incrementFollowing = async (currentUser: any) => {
        const userRef = doc(db, 'users', currentUser?.email)

        await updateDoc(userRef, {
            followingCount: increment(1)
        })
        .then(()=>{
            console.log('following incremented')
        })
    }

    // increment follower count of searched and followed user
    const incrementFollowers = async (searchedUser:any) => {
        const userRef = doc(db, 'users', searchedUser)
        await updateDoc(userRef, {
            followerCount: increment(1)
        })
        .then(()=>{
            console.log('followers incremented')
        })
    }


    // =========================== UPDATE FOLLOWERS AFTER FOLLOWING ============== //

    // update followed user's followers info
    const UpdateFollowedUser = async (currentUser: any, searchedUserEmail: string) => {
        // create the reference and check if followes doc exists in searched user
        const followersRef = doc(db, 'users', searchedUserEmail, 'social', 'followers')
        const docSnap = await getDoc(followersRef)

        // if it exsits update it 
        if(docSnap.exists()){
            updateDoc(followersRef, {
                followers: arrayUnion(currentUser?.email)
            }
            )
            .then(()=>{
                console.log('done')
            })
        }
        else {
            // else create it and update it 
            const addDocRef = await setDoc(followersRef, {
                followers: arrayUnion(currentUser?.email)
            }).then(()=>{
                console.log('done')
            })
        }

    }

   


    return { handleFollow }

}

export default useFollow