import React from 'react'
import styles from './styles.module.css'

interface Props {
    imageUrl: string,
    userName: string
}

const Story: React.FC<Props> = ({imageUrl, userName}) => {
  return (
    <div className={styles.container}>
        <div className={styles.imageBox}>
        <img src={imageUrl} alt="" className={styles.image}/>
        </div>

        <p>{userName}</p>
    </div>
  )
}

export default Story