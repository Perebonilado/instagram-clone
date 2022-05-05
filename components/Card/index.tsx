import styles from './styles.module.css'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useLike from '../../hooks/useLike'
import { AppContext, AppTypes } from '../../context/AppContext'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase'
import { TextArea } from '../Input'
import Button from  '../Button'
import useComment from '../../hooks/useComment'
import Loader from '../Loader'
import useFetchComments from '../../hooks/useFetchComments'
import useUnfollow from '../../hooks/useUnfollow'
import HoverCard from '../HoverCard'
import useFetchPosts from '../../hooks/useFetchPosts'
import useCheckFollowing from '../../hooks/useCheckFollowing'


interface Props {
    userImage: string,
    postImage: string,
    likes: number,
    userName: string,
    caption: string,
    commentCount: number,
    id: any,
    postedBy: string
}

const Card: React.FC<Props> = ({
    postImage,
    likes,
    caption,
    commentCount,
    id,
    postedBy
}) => {
    
    const { currentUser, token } = React.useContext(AppContext) as AppTypes
    const [ isLiked, setIsLiked ] = useState<boolean>(false)
    const [ username, setUsername ] = useState<string>('')
    const [ displayPic, setDisplayPic ] = useState<string>('')
    const [ comment, setComment ] = useState<string>('')
    const [ isHovering, setIsHovering ] = useState<boolean>(false)
    const [ followingCount, setFollowingCount ] = useState<any>(null)
    const [ followerCount, setFollowerCount ] = useState<any>(null)
    const [ postCount, setPostCount ] = useState<any>(null)
    const [ hoveredUser, setHoveredUser ] = useState<any>(null)
    const [ postsSnippet, setPostsSnippet ] = useState<any>(null)
    
    const { setIsFollowing, checkFollowing, isFollowing } = useCheckFollowing()
    const { likePost, unlikePost } = useLike()
    const sendComment = useComment()
    const { commentSnippets, fetchCommentSnippets } = useFetchComments()
    const { unfollow } = useUnfollow()
    const limitedPosts = useFetchPosts()

    
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
            setFollowerCount(docSnap.data().followerCount)
            setFollowingCount(docSnap.data().followingCount)
            setPostCount(docSnap.data().postCount)
            setHoveredUser(docSnap.data())
        }

    }

    // fetch 3 posts of the hovered user only when we hover 
    // and if we already havent fetched
    useEffect(()=>{

        if(isHovering && hoveredUser && !postsSnippet){
            setPostsSnippet(limitedPosts.getLimitedPosts(hoveredUser?.email))
        }

        // check if we are following this user
        if(currentUser && hoveredUser) {
            if(isHovering && currentUser?.email !== hoveredUser?.email){
                checkFollowing(currentUser, hoveredUser)
            }

        }
        
    },[hoveredUser, isHovering])


    // get the current cards user name and display picture
    useEffect(()=>{
        
        if(postedBy) {
            getUsernamePic()
        }

    },[postedBy])

    //fetch comments once theres an id
    useEffect(()=>{
        
        if(id) {
            fetchCommentSnippets(id)
        }
    
    },[id])


    return (
        <div 
        className={styles.container} 
        id={id}
        onMouseLeave={()=>setIsHovering(false)}
        >
            <header>
                <div onMouseEnter={()=>setIsHovering(true)}>
                        
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

            <div onMouseEnter={()=>setIsHovering(false)}>
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
                <Link href={`/${username}`} passHref>
                <b>{username} </b>
                </Link>
                 {caption}
            </p>

            <div className={styles.comments}>
                {commentCount > 1 && <p style={{cursor: 'pointer'}}>View all {commentCount} comments</p>}
                {commentCount === 1 && <p style={{cursor: 'pointer'}}>View {commentCount} comment</p>}
                {commentCount === 0 && <p>No comments</p>}
                
               {commentSnippets?.map((comment:any)=>{
                  
                   return <p key={comment.id} style={{marginTop: '1rem'}}>
                       <Link href={`/${comment.userData.username}`} passHref>
                           <b>{comment.userData.username} </b>
                        </Link>
                        {comment.comment}</p>
               })}
            </div>

            <div className={styles.sendCommentBox}>
            <TextArea 
            placeholder='Add a comment' value={comment} onChange={(e)=>setComment(e.target.value)}/>
            {!sendComment.loading && <Button style={{color:`${!comment ? 'lightgray' : ''}`}} text='Post' buttonType='link' onClick={()=>{

                if(comment.trim() && currentUser && id){
                    sendComment.sendComment(id, comment, currentUser?.email)
                    setComment('')
                }

            }}/>}
            {sendComment.loading && <Loader size='sm'/>}
            </div>
            </div>

            <div className={styles.hoverCard} onMouseLeave={()=>setIsHovering(false)}>
            {isHovering && 
            
            <HoverCard 
            username={username}
            displayPicture={displayPic}
            followerCount={followerCount}
            followingCount={followingCount}
            postCount={postCount}
            currentUser={token?.email}
            hoveredUser={hoveredUser?.email}
            posts={limitedPosts?.posts}
            handleUnfollow={()=>unfollow(currentUser, hoveredUser, setIsFollowing)}
            isFollowing={isFollowing}
            />
            }
            </div>

        </div>
    )
}

export default Card