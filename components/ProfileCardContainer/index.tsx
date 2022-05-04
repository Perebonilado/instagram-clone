import ProfileCard from '../ProfileCard'
import styles from './styles.module.css'
interface Props {
    posts: any
}

const ProfileCardContainer: React.FC<Props> = ({ posts }) => {
    
    return (
        <section className={styles.container}>
            {posts.map((post:any)=>{
                const { imageUrl, likes, id} = post
                return (
                    <ProfileCard 
                    key={id} 
                    likes={likes} 
                    commentsNumber={0} 
                    imageUrl={imageUrl}/>
                )
            })}
        </section>
    )
}

export default ProfileCardContainer