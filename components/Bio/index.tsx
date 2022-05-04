import styles from './styles.module.css'
import Button from '../Button'

interface Props {
    imageUrl: string,
    username: string,
    postsNumber: number,
    followers: number,
    following: number,
    role?: string,
    website?: string,
    bio?: string,
    currentUser: any,
    searchedUser: any,
    handleFollow?: any,
    handleUnfollow: any,
    isFollowing: boolean
}

const Bio: React.FC<Props> = ({
    imageUrl,
    username,
    postsNumber,
    followers,
    following,
    role,
    website,
    bio,
    currentUser,
    searchedUser,
    handleFollow,
    handleUnfollow,
    isFollowing=false
}) => {


    return (
        <section className={styles.container}>
            <div className={styles.profilePicBox}>
                <img src={imageUrl} alt="profile picture" />
            </div>

            <div className={styles.infoBox}>

                {currentUser?.email && searchedUser?.email &&
                <div>
                    <p>{username}</p>
                    {currentUser?.email === searchedUser?.email && <Button text='Edit Profile' buttonType='outline' style={{marginRight: '1rem'}}/>}
                    {currentUser?.email !== searchedUser?.email && <Button buttonType='outline' text='Message' style={{marginRight: '1rem'}}/>}
                    {currentUser?.email !== searchedUser?.email && (isFollowing === true && <Button text='Unfollow' buttonType='outline' onClick={()=>handleUnfollow()}/>)}
                    {currentUser?.email !== searchedUser?.email && (isFollowing === false && <Button text='Follow' onClick={()=>handleFollow()}/>)}
                </div>
                }
                

                <div>
                    <p><b>{postsNumber}</b> posts</p>
                    <p><b>{followers}</b> followers</p>
                    <p><b>{following}</b> following</p>
                </div>

                <div>
                    <h4>{username}</h4>
                    <p style={{color: 'gray'}}>{role}</p>
                    <p>{bio}</p>
                    <p className={styles.website}>{website}</p>
                </div>

            </div>
        </section>
    )
}

export default Bio