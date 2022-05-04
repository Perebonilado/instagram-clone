import styles from './styles.module.css'
import { joinString } from '../../utils/Helpers'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useLike from '../../hooks/useLike'
import { AppContext, AppTypes } from '../../context/AppContext'
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase'


interface Props {
    userImage: string,
    postImage: string,
    likes: number,
    userName: string,
    caption: string,
    commentsNumber: number,
    id: any,
    postedBy: string
}

const Card: React.FC<Props> = ({
    postImage,
    likes,
    caption,
    commentsNumber,
    id,
    postedBy
}) => {
    
    const { currentUser, token } = React.useContext(AppContext) as AppTypes
    const { likePost, unlikePost } = useLike()
    const [ isLiked, setIsLiked ] = useState<boolean>(false)
    const [ username, setUsername ] = useState<string>('')
    const [ displayPic, setDisplayPic ] = useState<string>('')
    
    const handleLike =  () => {
        setIsLiked(true)
        if(id && currentUser){
            likePost(id, currentUser)
        }
    }

    const handleUnlike = () => {
        setIsLiked(false)
        if(id && currentUser){
            unlikePost(id, currentUser)
        }
    }

    const checkLiked = async (id:any, token: any) => {
        // if the user exists in the likedBy then the post should be liked on load
        
            const docRef = doc(db, 'posts', id, 'likedBy', token.email)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setIsLiked(true)
            }
            // else its false by default
    }

    // once theres a current user, check if the user liked that post
    useEffect(()=>{
    
        if(token) checkLiked(id, token)

    },[token])

    // fetch the users username and display picture based who posted
    const getUsernamePic = async () => {
        const docRef = doc(db, "users", postedBy);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            setUsername(docSnap.data().username)
            setDisplayPic(docSnap.data().displayPicture)
        }

    }

    useEffect(()=>{
        
        if(postedBy) getUsernamePic()

    },[postedBy])


    return (
        <div className={styles.container} id={id}>
            <header>
                <div>
                        
                    <Link href={`/${username}`} passHref>
                    <img src={displayPic} alt="user image" className={styles.userImage} referrerPolicy='no-referrer'/>
                    </Link>

                    <Link href={`/${username}`} passHref>
                    <p className={styles.userName}>{username}</p>
                    </Link>
                        
                </div>

                <div className={styles.ellipsis}>
                    ...
                </div>
            </header>

            <img src={postImage} alt="post image" className={styles.postImage}/>

            <div className={styles.icons}>
                {isLiked && <i className={`fas fa-heart ${styles.likeIcon}`} onClick={handleUnlike}/>}
                {!isLiked && <i className={`far fa-heart`} onClick={handleLike}/>}
                <i className='far fa-comment' />
                <i className='far fa-paper-plane' />
            </div>

            <div className={styles.likes}>
                {likes} like{likes > 1 && 's'}
            </div>

            <p className={styles.caption}>
                <b>{username}</b> {caption}
            </p>

            <div className={styles.comments}>
                <p>View all {commentsNumber} comments</p>
                {/* comments */}
            </div>
        </div>
    )
}

export default Card