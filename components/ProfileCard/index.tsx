import styles from './styles.module.css'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
    imageUrl: string,
    likes: number,
    commentsNumber: number
}

const ProfileCard: React.FC<Props> = ({
    imageUrl,
    likes,
    commentsNumber
}) => {
    return (
        <div className={styles.container}>

            <div className={styles.modal}>

                <div>
                <FontAwesomeIcon icon={faHeart} className={styles.icon}/>
                {likes}
                </div>

                <div>
                <FontAwesomeIcon icon={faComment} className={styles.icon}/>
                {commentsNumber}
                </div>
            </div>

            <img src={imageUrl} alt="post" />

        </div>
    )
}

export default ProfileCard