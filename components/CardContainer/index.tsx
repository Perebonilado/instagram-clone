import React from 'react'
import Card from '../Card'
import styles from './styles.module.css'

interface Props {
  posts: any
}

const Container:React.FC<Props> = ({posts}) => {
  
  return (
    <section className={styles.container}>
        {posts.map((item:any, index:any)=>{
        
        const { id, displayPicture, imageUrl, likes, username, caption, postedBy, commentCount } = item
        
        return (
          <Card 
          id={id}
          userImage={displayPicture}
          postImage={imageUrl}
          likes={likes}
          userName={username}
          caption={caption}
          postedBy={postedBy}
          commentCount={commentCount}
          key={id}/>
        )
      })}
    </section>
  )
}

export default Container