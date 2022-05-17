import styles from './styles.module.css'
import { TextInput } from '../Input'
import Modal from '../Modal'
import UploadCard from '../UploadCard'
import React, { useEffect, useState } from 'react'
import { AppContext, AppTypes } from '../../context/AppContext';
import Link from 'next/link'
import { faHome, faUpload, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import SearchBox from '../SearchBox'
import useSearch from '../../hooks/useSearch'

interface Props {
    profilePic?: string
}

const Navbar: React.FC<Props> = ({ profilePic }) => {

    const [ isUploadCard, setIsUploadCard ] = useState<boolean>(false)
    const [ searching, setSearching ] = useState<boolean>(false)
    const [ searchVal, setSearchVal ] = useState<string>('')
    const { setIsModal } = React.useContext(AppContext) as AppTypes
    const router = useRouter()

    const { 
        search, 
        loading, data: 
        searchResults,
        setData: setSearchResults 
     } = useSearch()


    // handles displaying of search modal
    useEffect(()=>{
        
        if(searchVal.trim() && !searching){
            setSearching(true)
        }
        if(!searchVal) {
            setSearching(false)
            setSearchResults(null)
        }

    },[searchVal])

        
    const handleUploadCardOpen = () => {
        setIsModal(true)
        setIsUploadCard(true)
    }

    const handleUploadCardClose = () => {
        setIsModal(false)
        setIsUploadCard(false)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' || e.keyCode === 13){
            if(searchVal)search(searchVal)
        }
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
                <TextInput
                value={searchVal}
                onChange={(e)=>setSearchVal(e.target.value.trimStart())} 
                onKeyDown={(e)=>handleKeyPress(e)}
                className={styles.search} 
                placeholder='Search'/>
                
                <div className={styles.searchBoxContainer}>
                    {searching && <SearchBox result={searchResults} setSearching={setSearching}/>}
                </div>

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