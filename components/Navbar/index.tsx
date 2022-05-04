import styles from './styles.module.css'
import { TextInput } from '../Input'
import Modal from '../Modal'
import UploadCard from '../UploadCard'
import React, { useState } from 'react'
import { AppContext, AppTypes } from '../../context/AppContext';
import Link from 'next/link'

interface Props {
    profilePic?: string
}

const Navbar: React.FC<Props> = ({ profilePic }) => {

    const [ isUploadCard, setIsUploadCard ] = useState<boolean>(false)
    const { setIsModal } = React.useContext(AppContext) as AppTypes

    const handleUploadCardOpen = () => {
        setIsModal(true)
        setIsUploadCard(true)
    }

    const handleUploadCardClose = () => {
        setIsModal(false)
        setIsUploadCard(false)
    }

    return (
        <>
        <Modal handleClose={handleUploadCardClose}>
            {isUploadCard && <UploadCard isOpen={isUploadCard}/>}
        </Modal>

        <nav className={styles.nav}>

            <div className={styles.logoSearchBox}>
                <Link href={'/'} passHref>
                <h1>Instagram</h1>
                </Link>

                <div className={styles.searchBox}>
                <i className='fas fa-search'/>
                <TextInput className={styles.search} placeholder='Search'/>
                </div>
            </div>

            <div className={styles.iconsBox}>
                <i className='fas fa-home'/>
                <i className='fas fa-upload' onClick={handleUploadCardOpen}/>
                <i className='fas fa-regular fa-envelope'/>
                <i className='fas fa-map-marker-alt'/>
                <i className='far fa-heart'/>
                <Link href={'/Auth'} passHref>
                <img src={profilePic || "https://res.cloudinary.com/dt0wfaxft/image/upload/v1642514040/98BD2D98-CB82-4D0F-AC85-EDAF24BC86E1_ewrujw.jpg"} alt="profile picture" className={styles.profilePic} referrerPolicy='no-referrer'/>
                </Link>
            </div>

        </nav>
        </>
    )
}

export default Navbar