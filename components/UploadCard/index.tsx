import Button from "../Button"
import styles from './styles.module.css'
import React, { useEffect, useRef, useState } from 'react'
import { storage } from '../../firebase'
import { ref, uploadBytesResumable } from "firebase/storage";
import { TextArea } from "../Input";
import useUploadPost from '../../hooks/useUploadPost'
import { AppContext, AppTypes } from '../../context/AppContext';
import Loader from "../Loader";

interface Props {
    isOpen: boolean
}


const UploadCard:React.FC<Props> = ({ isOpen }) => {
    const { currentUser, setIsModal } = React.useContext(AppContext) as AppTypes
    const [ file, setFile ] = useState<any>(null)
    const [ imageUrl, setImageUrl ] = useState<string>('')
    const [ caption, setCaption ] = useState<string>('')
    
    const hiddenFileInput = useRef<any>(null)
    
    const { 
        loading, 
        error, 
        uploadProgress, 
        UploadPost, 
        setUploadProgress, 
        setLoading 
    } = useUploadPost()
    
    const handlePseudoClick = () => {
        hiddenFileInput.current.click()
    }

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        if(e.target.files?.length && e.target.files[0].type === 'image/jpeg'){
            
            setFile(e.target.files[0])
            setImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    // close modal on post upload complete and reset
    useEffect(()=>{
        if(loading == false && uploadProgress===100) {
            setIsModal(false)
            setFile(null)
            setImageUrl('')
            setCaption('')
            setUploadProgress(0)
        }
    },[loading])

    const handleUpload = () => {
        if(imageUrl && file && currentUser) {
            const imagesRef = ref(storage, `images/${currentUser?.username}/${file.name}`)
            UploadPost({imagesRef: imagesRef, file: file, caption: caption, user: currentUser.email})
        }
    }


    return (
        <div className={`${styles.container} ${isOpen===true ? styles.containerOpen : ''}`}>
        
            <h4>Create new post</h4>
            {uploadProgress > 0 && <div className={styles.progressBar} style={{width: `${uploadProgress}%`}}></div>}

            {file && 
            <div className={styles.uploadContentBox}>
                <img src={imageUrl} alt="uploaded" className={styles.uploadedImage}/>
                
                <div className={styles.captionBox}>
                <TextArea placeholder="Write a caption" value={caption} onChange={(e)=>setCaption(e.target.value)}/>
                </div>

            </div>
            }
            
            <div className={styles.buttonBox}>
                <p>Upload photos and videos here</p>
                {!file && <Button text="Select from computer" onClick={handlePseudoClick}/>}
                {loading === false && imageUrl && file && <Button text="Upload Post" onClick={handleUpload}/>}
                {loading === true && <Loader />}
                <input type="file" ref={hiddenFileInput} onChange={(e)=>handleSelectFile(e)}/>
            </div>

        </div>
    )

}

export default UploadCard