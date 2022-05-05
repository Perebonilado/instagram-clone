import { uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from 'react'
import { collection, serverTimestamp, setDoc, doc, updateDoc, increment } from "firebase/firestore"; 
import { db } from "../firebase";
import { AppContext, AppTypes } from "../context/AppContext";

const useUploadPost = () => {

    const [ uploadProgress, setUploadProgress ] = useState<any>(0)
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<any>(null)
    const { token } = React.useContext(AppContext) as AppTypes

    const UploadPost = ({
        imagesRef: imagesRef, 
        file: file,
        caption: caption,
        user: user
    }:any) => {

        setLoading(true)

        uploadBytes(imagesRef, file)
        .then((snapshot:any)=>{
            console.log('file uploaded')
        })

        // upload progress
        const uploadTask = uploadBytesResumable(imagesRef, file)
        uploadTask.on('state_changed', (snapshot:any)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress)
        },
        (error:any)=>{
            // handle errors
            if(error)setError(error)
        },

        ()=>{
        // handle success, get download url
        
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
            console.log('File available at', downloadURL);
            
            // update the db with the post
            const newDocRef = doc(collection(db, "posts"))
            const data = {
                caption: caption,
                imageUrl: downloadURL,
                likes: 0,
                timestamp: serverTimestamp(),
                postedBy: token?.email,
                commentCount: 0
            }
            setDoc(newDocRef, data).then(()=>{
                
                // increment post count on user
                const userRef = doc(db, 'users', token?.email)
                updateDoc(userRef, {
                    postCount: increment(1)
                }).then(()=>{
                    setLoading(false)

                }).catch((err)=>{
                    console.error(err)
                    
                    setLoading(false)
                })

            
            })
            
        });
        
        }
        )
    }

    

    return { uploadProgress, loading, error, UploadPost, setUploadProgress, setLoading }

}


export default useUploadPost