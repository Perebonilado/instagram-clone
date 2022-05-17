import styles from './styles.module.css'
import { TextInput } from '../Input'
import Modal from '../Modal'
import UploadCard from '../UploadCard'
import React, { useState } from 'react'
import { AppContext, AppTypes } from '../../context/AppContext';
import Link from 'next/link'
import { faHome, faUpload, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'

interface Props {
    profilePic?: string
}

const Navbar: React.FC<Props> = ({ profilePic }) => {

    const [ isUploadCard, setIsUploadCard ] = useState<boolean>(false)
    const { setIsModal } = React.useContext(AppContext) as AppTypes
    const router = useRouter()

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
                <FontAwesomeIcon icon={faHome} className={styles.icon} onClick={()=>{
                    router.push('/')
                }}/>
                <FontAwesomeIcon icon={faUpload} className={styles.icon} onClick={handleUploadCardOpen}/>
                <FontAwesomeIcon icon={faEnvelope} className={styles.icon}/>
                <Link href={'/Auth'} passHref>
                <img src={profilePic || "https://res.cloudinary.com/dt0wfaxft/image/upload/v1642514040/98BD2D98-CB82-4D0F-AC85-EDAF24BC86E1_ewrujw.jpg"} alt="profile picture" className={styles.profilePic} referrerPolicy='no-referrer'/>
                </Link>
            </div>

        </nav>
        </>
    )
}

export default Navbar