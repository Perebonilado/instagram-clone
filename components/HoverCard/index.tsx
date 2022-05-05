import styles from './styles.module.css'
import Button from '../Button'
import Link from 'next/link';

interface Props { 
    username?: string;
    displayPicture?: string;
    followerCount?: number;
    followingCount?: number;
    postCount?: number;
    posts?: any[];
    currentUser?: any;
    hoveredUser?: any;
    isFollowing?: boolean;
    handleFollow?: any;
    handleUnfollow?: any;
}

const HoverCard:React.FC<Props> = ({
    username,
    displayPicture,
    followerCount,
    followingCount,
    postCount,
    posts,
    currentUser,
    hoveredUser,
    isFollowing=false,
    handleUnfollow,
    handleFollow
}) => {
    return (
        <div className={styles.container}>

            <div className={styles.usernameDisplayBox}>
            <Link href={`/${username}`} passHref>
                <img src={displayPicture} alt="user profile picture" style={{cursor: 'pointer'}}/>
            </Link>

                <div>
                    <Link href={`/${username}`} passHref>
                    <p style={{cursor: 'pointer'}}>{username}</p>
                    </Link>
                </div>
            </div>

            <div className={styles.numbersBox}>

                <div>
                    <p><b>{postCount}</b></p>
                    <p>Posts</p>
                </div>

                <div>
                    <p><b>{followerCount}</b></p>
                    <p>followers</p>
                </div>

                <div>
                    <p><b>{followingCount}</b></p>
                    <p>following</p>
                </div>

            </div>

            <div className={styles.usersPostsBox}>
                {posts?.map((item:any)=>{
                    return (
                        <img key={item.id} src={item.imageUrl} alt="a post" />
                    )

                })}

            </div>

            <div className={styles.buttonsBox}>
            {currentUser === hoveredUser && <Button text='Edit Profile' buttonType='outline' style={{marginRight: '1rem'}}/>}
            {currentUser !== hoveredUser && <Button buttonType='outline' text='Message' style={{marginRight: '1rem'}}/>}
            {currentUser !== hoveredUser && ( isFollowing===true && <Button text='Unfollow' buttonType='outline' onClick={()=>handleUnfollow()}/>)}
            {currentUser !== hoveredUser && ( isFollowing===false && <Button text='Follow' buttonType='solid' onClick={()=>handleFollow()}/>)}
            </div>

        </div>
    )
}

export default HoverCard