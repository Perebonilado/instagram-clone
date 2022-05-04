import React from 'react'
import { useState } from 'react'

import Story from '../Story'
import styles from './styles.module.css'

interface Props {
  posts: any
}

const StoryContainer: React.FC<Props> = ({posts}) => {

  const [ sliderPosition, setSliderPosition ] = useState<number>(0)
  
  const handleRightSlide = () => {
    if(sliderPosition >= -120)setSliderPosition(sliderPosition-40)
  }

  const handleLeftSlide = () => {
    if(sliderPosition <= -10)setSliderPosition(sliderPosition+40)
  }

  return (
    <div className={styles.container}>
      {sliderPosition < 0 && <div className={`${styles.sliderButton} ${styles.sliderLeftButton}`} onClick={handleLeftSlide}> <i className='fas fa-solid fa-chevron-left'/> </div>}

      {sliderPosition >= -120 && <div className={`${styles.sliderButton} ${styles.sliderRightButton}`} onClick={handleRightSlide}> <i className='fas fa-solid fa-chevron-right'/> </div>}

        <div className={styles.slider} style={{transform: `translateX(${sliderPosition}%)`}}>
            {posts.map((item:any, index:any)=>{
                return (
                    <Story key={index} userName={item.userName} imageUrl={item.userImage}/>
                )
            })}
        </div>
    </div>
  )
}

export default StoryContainer