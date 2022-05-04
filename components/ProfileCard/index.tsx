import styles from './styles.module.css'
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
            <i className='fas fa-heart' />
                {likes}
                </div>

                <div>
            <i className='fas fa-comment' />
                {commentsNumber}
                </div>
            </div>

            <img src={imageUrl} alt="post" />

        </div>
    )
}

export default ProfileCard